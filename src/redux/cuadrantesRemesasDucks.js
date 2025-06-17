import axios from 'axios';
import Constantes from "../constantes";
import { create } from 'xmlbuilder2';
import { stringify } from 'zipson';

//importación acciones
import { setAlertaAccion } from './cuadrantesSettersDucks';

//constantes
const {
    RUTA_API: rutaApi,
    REMESAS: optionsRemesas,
    FORMA_DE_PAGO: formasDePago
} = Constantes;

//constantes
const dataInicial = {
    loadingRemesas: false,
    exitoGenerarRemesas: false,
    errorGenerarRemesas: false,
    isRemesaComplete: false,
    cuadrantesIteradosActualizarRemesa: [],
};

//types
const LOADING_REMESAS = 'LOADING_REMESAS';
const EXITO_GENERAR_REMESAS = 'EXITO_GENERAR_REMESAS';
const ERROR_GENERAR_REMESAS = 'ERROR_GENERAR_REMESAS';
const RESETEA_EXITO_REMESAS = 'RESETEA_EXITO_REMESAS';
const SET_CUADRANTESITERADOSACTUALIZAR_REMESA = 'SET_CUADRANTESITERADOSACTUALIZAR_REMESA';

//reducer
export default function cuadrantesRemesasReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_REMESAS:
            return { ...state, loadingRemesas: true }
        case EXITO_GENERAR_REMESAS:
            return {
                ...state,
                exitoGenerarRemesas: true,
                loadingRemesas: false,
                isRemesaComplete: true,
            }
        case ERROR_GENERAR_REMESAS:
            return { ...state, errorGenerarRemesas: true, loadingRemesas: false }
        case RESETEA_EXITO_REMESAS:
            return {
                ...state,
                exitoGenerarRemesas: false,
                procesandoLoteEstadoRemesas: false,
                isRemesaComplete: false,
                cuadrantesIteradosActualizarRemesa: []
            }
        case SET_CUADRANTESITERADOSACTUALIZAR_REMESA:
            return { ...state, cuadrantesIteradosActualizarRemesa: [...state.cuadrantesIteradosActualizarRemesa, action.payload.elementoArray] }
        default:
            return { ...state }
    }
}

//acciones

export const reseteaRemesasAccion = () => (dispatch, getState) => {
    dispatch({
        type: RESETEA_EXITO_REMESAS
    });
};

export const actualizarCuadrantesRemesasAccion = () => async (dispatch, getState) => {
    const { usuarioActivo } = getState().variablesUsuario;
    const { cuadrantesIteradosActualizarRemesa } = getState().variablesCuadrantesRemesas;
    let fechaHoy = new Date().toLocaleString() + '';
    let laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
    const datos = {
        actualizacion: laFirmaActualizacion,
        estado: 'facturado',
        arrayCuadrantes: cuadrantesIteradosActualizarRemesa,
    };
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", 'cuadrantes');
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar_lote.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data)
            return new Promise((resolve, reject) => {
                resolve({ payload: true });
            });
    } catch (err) {
        console.error(err)
    };
};

export const gestionarRemesaLoteAccion = (arrayCuadrantes, anyo, mes, remesa, objetoConfiguracion) => async (dispatch, getState) => {
    // Obtener fecha actual para comparaciones
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    // Función auxiliar para calcular fecha
    function gestionarFechaDePagoRemesas(diaPago, mes, anyo, formaDePago) {
        const forma = formasDePago.find(fp => fp.value === formaDePago);
        let fecha = new Date(anyo, mes, diaPago);
        fecha.setDate(fecha.getDate() + forma.dias);
        const fechaAjustada = new Date(fecha.getFullYear(), fecha.getMonth(), diaPago);

        // Verificar si la fecha ya pasó
        if (fechaAjustada < fechaActual) {
            fechaAjustada.setMonth(fechaAjustada.getMonth() + 1);
            console.log(`Fecha ${fechaAjustada.toISOString().split('T')[0]} ya pasada, moviendo al siguiente mes`);
        }

        return `${fechaAjustada.getFullYear()}-${String(fechaAjustada.getMonth() + 1).padStart(2, '0')}-${String(fechaAjustada.getDate()).padStart(2, '0')}`;
    }

    // Agrupar cuadrantes por fecha de vencimiento
    const cuadrantesPorFecha = {};

    arrayCuadrantes.forEach(cuadrante => {
        const fechaVencimiento = gestionarFechaDePagoRemesas(
            parseInt(cuadrante.total.diaPago),
            parseInt(mes) - 1,
            parseInt(anyo),
            cuadrante.total.formaPago
        );

        if (!cuadrantesPorFecha[fechaVencimiento]) {
            cuadrantesPorFecha[fechaVencimiento] = [];
        }
        cuadrantesPorFecha[fechaVencimiento].push(cuadrante);

    });

    console.log('Cuadrantes agrupados por fecha:', cuadrantesPorFecha);
    console.log(`Total de lotes a generar: ${Object.keys(cuadrantesPorFecha).length}`);

    // Obtener información del banco desde la remesa seleccionada
    const remesaInfo = optionsRemesas.find(r => r.value === remesa);
    const banco = remesa.includes('B') ? 'BBVA' : 'La Caixa';

    try {
        // Iterar sobre cada lote de cuadrantes por fecha
        const resultados = [];
        const cuadrantesProcesadosExitosamente = []; // Array para tracking
        for (const [fechaVencimiento, cuadrantesLote] of Object.entries(cuadrantesPorFecha)) {
            console.log(`Procesando lote para fecha ${fechaVencimiento} con ${cuadrantesLote.length} cuadrantes`);

            // Llamar a la función generadora de remesa SEPA
            const resultadoRemesa = await generarRemesaSEPA(
                cuadrantesLote,
                fechaVencimiento,
                banco,
                remesaInfo,
                anyo,
                mes,
                objetoConfiguracion
            );

            if (resultadoRemesa.success && resultadoRemesa.xmlContent) {
                // Descargar el archivo XML generado
                descargarArchivoXML(resultadoRemesa.xmlContent, resultadoRemesa.nombreArchivo);

                // Agregar estos cuadrantes al array de procesados exitosamente
                cuadrantesProcesadosExitosamente.push(...cuadrantesLote);

                // MEJORAR EL TIEMPO DE ESPERA
                const totalLotes = Object.keys(cuadrantesPorFecha).length;
                const indiceActual = Object.keys(cuadrantesPorFecha).indexOf(fechaVencimiento);

                // Solo pausar si no es el último archivo
                if (totalLotes > 1 && indiceActual < totalLotes - 1) {
                    console.log(`Esperando 2 segundos antes de generar el siguiente archivo...`);
                    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos
                }
            }

            resultados.push(resultadoRemesa);
        }

        // Actualizar SOLO los cuadrantes que se procesaron exitosamente
        if (cuadrantesProcesadosExitosamente.length > 0) {
            const options = { fullPrecisionFloats: true };

            cuadrantesProcesadosExitosamente.forEach(cuadrante => {
                const objetoTotales = {
                    ...cuadrante.total,
                    remesado: "si",
                };

                dispatch({
                    type: SET_CUADRANTESITERADOSACTUALIZAR_REMESA,
                    payload: {
                        elementoArray: {
                            id: cuadrante.id,
                            total: stringify(objetoTotales, options)
                        }
                    }
                });
            });
        }

        // Dispatch success action si todos los lotes se procesaron correctamente
        if (resultados.every(r => r.success)) {
            dispatch({
                type: EXITO_GENERAR_REMESAS
            });
            console.log('Todas las remesas se generaron correctamente');

            // Mensaje de éxito al usuario
            const mensaje = resultados.length > 1
                ? `Se han generado ${resultados.length} archivos de remesa correctamente`
                : 'Se ha generado el archivo de remesa correctamente';

            dispatch(setAlertaAccion({ tipo: 'success', mensaje }));
        } else {
            // Manejar errores parciales
            const errores = resultados.filter(r => !r.success);
            console.error('Errores en la generación de remesas:', errores);
            dispatch(setAlertaAccion({
                tipo: 'error',
                mensaje: `Error al generar ${errores.length} de ${resultados.length} remesas`
            }));
        }

        return resultados;

    } catch (error) {
        console.error('Error al generar lotes de remesas:', error);
        dispatch({
            type: ERROR_GENERAR_REMESAS
        })
        return null;
    }
};

const generarRemesaSEPA = async (cuadrantesLote, fechaVencimiento, banco, remesaInfo, anyo, mes, objetoConfiguracion) => {
    try {
        console.log(`Generando remesa SEPA para ${banco} - Fecha: ${fechaVencimiento}`);

        // Función auxiliar para formatear fechas
        const formatDate = (date, format) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            if (format === 'yyyyMMdd-HHmmss') {
                return `${year}${month}${day}-${hours}${minutes}${seconds}`;
            } else if (format === 'yyyyMMdd') {
                return `${year}${month}${day}`;
            }
            return date.toISOString();
        };

        // Determinar el grupo (1 = BBVA, 2 = La Caixa)
        const grupo = remesaInfo.value.includes('B') ? 1 : 2;

        // Configuración según grupo
        const configuracion = {
            grupo1: { // BBVA - usa cuenta2
                cod6: objetoConfiguracion.cuenta2.identificadorSepa,
                cod10: objetoConfiguracion.cuenta2.iban,
                cod11: objetoConfiguracion.cuenta2.bic
            },
            grupo2: { // La Caixa - usa cuenta1
                cod6: objetoConfiguracion.cuenta1.identificadorSepa,
                cod10: objetoConfiguracion.cuenta1.iban,
                cod11: objetoConfiguracion.cuenta1.bic
            }
        };

        const config = grupo === 1 ? configuracion.grupo1 : configuracion.grupo2;

        // Calcular el total de la remesa
        const totalRemesa = cuadrantesLote.reduce((sum, cuadrante) =>
            sum + (cuadrante.total.totalMasIva || 0), 0
        ).toFixed(2);

        // Crear el documento XML
        const doc = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('Document', {
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xmlns': 'urn:iso:std:iso:20022:tech:xsd:pain.008.001.02'
            })
            .ele('CstmrDrctDbtInitn');

        // Encabezado del grupo
        const grpHdr = doc.ele('GrpHdr');
        grpHdr.ele('MsgId').txt(`REMESA-${formatDate(new Date(), 'yyyyMMdd-HHmmss')}`);
        grpHdr.ele('CreDtTm').txt(new Date().toISOString().substring(0, 19));
        grpHdr.ele('NbOfTxs').txt(cuadrantesLote.length.toString());
        grpHdr.ele('CtrlSum').txt(totalRemesa);

        const initgPty = grpHdr.ele('InitgPty');
        initgPty.ele('Nm').txt('58692237');
        const id = initgPty.ele('Id').ele('OrgId').ele('Othr');
        id.ele('Id').txt(config.cod6);

        // Información del pago
        const pmtInf = doc.ele('PmtInf');
        pmtInf.ele('PmtInfId').txt(`REMESA-${formatDate(new Date(), 'yyyyMMdd')}-001`);
        pmtInf.ele('PmtMtd').txt('DD');
        pmtInf.ele('NbOfTxs').txt(cuadrantesLote.length.toString());
        pmtInf.ele('CtrlSum').txt(totalRemesa);

        // Tipo de pago
        const pmtTpInf = pmtInf.ele('PmtTpInf');
        pmtTpInf.ele('SvcLvl').ele('Cd').txt('SEPA');
        pmtTpInf.ele('LclInstrm').ele('Cd').txt('CORE');
        pmtTpInf.ele('SeqTp').txt('RCUR');
        pmtTpInf.ele('CtgyPurp').ele('Cd').txt('CASH');

        pmtInf.ele('ReqdColltnDt').txt(fechaVencimiento);

        // Acreedor
        pmtInf.ele('Cdtr').ele('Nm').txt('58692237');
        pmtInf.ele('CdtrAcct').ele('Id').ele('IBAN').txt(config.cod10);
        pmtInf.ele('CdtrAgt').ele('FinInstnId').ele('BIC').txt(config.cod11);

        // Esquema del acreedor
        const cdtrSchmeId = pmtInf.ele('CdtrSchmeId');
        const prvtId = cdtrSchmeId.ele('Id').ele('PrvtId').ele('Othr');
        prvtId.ele('Id').txt(config.cod6);
        prvtId.ele('SchmeNm').ele('Prtry').txt('SEPA');

        // Iterar sobre cada cuadrante para crear las transacciones
        cuadrantesLote.forEach((cuadrante, index) => {
            const drctDbtTxInf = pmtInf.ele('DrctDbtTxInf');

            // ID del pago
            const pmtId = drctDbtTxInf.ele('PmtId');
            const instrId = `${formatDate(new Date(), 'yyyyMMdd')}-${String(index + 1).padStart(3, '0')}`;
            pmtId.ele('InstrId').txt(instrId);
            pmtId.ele('EndToEndId').txt(instrId);

            // Importe
            drctDbtTxInf.ele('InstdAmt', { Ccy: 'EUR' })
                .txt(cuadrante.total.totalMasIva.toFixed(2));

            // Información del mandato
            const mndtRltdInf = drctDbtTxInf.ele('DrctDbtTx').ele('MndtRltdInf');
            const mandatoId = String(cuadrante.idCentro).padStart(12, '0');
            mndtRltdInf.ele('MndtId').txt(mandatoId);
            mndtRltdInf.ele('DtOfSgntr').txt('2009-10-31');
            mndtRltdInf.ele('AmdmntInd').txt('false');

            // Agente del deudor
            drctDbtTxInf.ele('DbtrAgt').ele('FinInstnId').ele('BIC').txt('NOTPROVIDED');

            // Deudor
            drctDbtTxInf.ele('Dbtr').ele('Nm').txt(cuadrante.nombreCentro);

            // Cuenta del deudor
            if (cuadrante.total.iban) {
                drctDbtTxInf.ele('DbtrAcct').ele('Id').ele('IBAN').txt(cuadrante.total.iban);
            }

            // Propósito
            drctDbtTxInf.ele('Purp').ele('Cd').txt('CASH');

            // Información de la remesa
            const fechaActual = new Date();
            const fechaFormateada = `${String(fechaActual.getDate()).padStart(2, '0')}/${String(fechaActual.getMonth() + 1).padStart(2, '0')}/${fechaActual.getFullYear()}`;
            const concepto = `FORTISE,S.L. Factura: ${cuadrante.nombre} de: ${fechaFormateada}`;
            drctDbtTxInf.ele('RmtInf').ele('Ustrd').txt(concepto);
        });

        const xmlString = doc.end({
            prettyPrint: true,
            headless: false  // Esto asegura que incluya <?xml version="1.0" encoding="UTF-8"?>
        });

        // Crear nombre del archivo
        const nombreArchivo = `REMESA_${banco}_${fechaVencimiento.replace(/-/g, '')}.xml`;

        return {
            success: true,
            fecha: fechaVencimiento,
            banco: banco,
            cantidadCuadrantes: cuadrantesLote.length,
            totalRemesa: totalRemesa,
            nombreArchivo: nombreArchivo,
            xmlContent: xmlString
        };

    } catch (error) {
        console.error('Error al generar remesa SEPA:', error);
        return {
            success: false,
            error: error.message,
            fecha: fechaVencimiento
        };
    }
};

const descargarArchivoXML = (xmlContent, nombreArchivo) => {
    try {
        // Crear un Blob con el contenido XML
        const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });

        // Crear un enlace temporal para la descarga
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = nombreArchivo;

        // Añadir temporalmente al DOM y hacer clic
        document.body.appendChild(link);
        link.click();

        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log(`Archivo ${nombreArchivo} descargado correctamente`);
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        throw error;
    }
};