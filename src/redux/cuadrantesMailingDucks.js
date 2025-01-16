import axios from 'axios';
import Constantes from "../constantes";
import {
    retornaArrayElementosAccion,
    exportarAExcel
} from './appDucks';
import { handleCloseMenuAccion } from './cuadrantesHandlersDucks';
import { stringify } from 'zipson';

//carga componentes
import FacturaPDF from "../cuadrantes/FacturaPDF";

//importación acciones
import {
    actualizarObjetoCuadranteAccion,
    actualizarCuadranteAccion
} from '../redux/cuadrantesDucks';

//pdf
import { pdf } from "@react-pdf/renderer";

//constantes
const {
    RUTA_API: rutaApi,
    FORMA_DE_PAGO: formasDePago
} = Constantes;

//constantes
const dataInicial = {
    loadingMailing: false,
    exitoEnviarMail: false,
    errorEnviarMail: false,
    procesandoLoteEstadoMailing: false,
    cuadrantesIteradosActualizarMailing: [],
    laDataMailing: [],
    finalizandoLoteEstadoMailing: false,
    exitoGenerarMailing: false,
    itemEnviando: null,
    totalEmails: 0,
    processedEmails: 0,
    isMailingComplete: false,
    isProcessing: false,
};

//types
const LOADING_MAILING = 'LOADING_MAILING';
const EXITO_ENVIAR_MAIL = 'EXITO_ENVIAR_MAIL';
const ERROR_ENVIAR_MAIL = 'ERROR_ENVIAR_MAIL';
const PROCESANDO_LOTE_MAILING = 'PROCESANDO_LOTE_MAILING';
const SET_CUADRANTESITERADOSACTUALIZAR_MAILING = 'SET_CUADRANTESITERADOSACTUALIZAR_MAILING';
const GENERAR_MAILING_EXITO = 'GENERAR_MAILING_EXITO';
const ITERACION_MAILING_EXITO = 'ITERACION_MAILING_EXITO';
const RESETEA_EXITO_MAILING = 'RESETEA_EXITO_MAILING';
const ITEM_ENVIANDO = 'ITEM_ENVIANDO';
const INICIAR_PROCESO_MAILING = 'INICIAR_PROCESO_MAILING';
const INCREMENT_PROCESSED_EMAILS = 'INCREMENT_PROCESSED_EMAILS';

//reducer
export default function cuadrantesMailingReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_MAILING:
            return { ...state, loadingMailing: true }
        case EXITO_ENVIAR_MAIL:
            return { ...state, exitoEnviarMail: true, loadingMailing: false }
        case ERROR_ENVIAR_MAIL:
            return { ...state, errorEnviarMail: true, loadingMailing: false }
        case PROCESANDO_LOTE_MAILING:
            return { ...state, procesandoLoteEstadoMailing: true }
        case SET_CUADRANTESITERADOSACTUALIZAR_MAILING:
            return { ...state, cuadrantesIteradosActualizarMailing: [...state.cuadrantesIteradosActualizarMailing, action.payload.elementoArray] }
        case ITERACION_MAILING_EXITO:
            return { ...state, laDataMailing: [...state.laDataMailing, action.payload.elementoArray1] }
        case ITEM_ENVIANDO:
            return { ...state, itemEnviando: action.payload.objeto }
        case RESETEA_EXITO_MAILING:
            return {
                ...state,
                exitoGenerarMailing: false,
                procesandoLoteEstadoMailing: false,
                itemEnviando: null,
                laDataMailing: [],
                totalEmails: 0,
                processedEmails: 0,
                isMailingComplete: false

            }
        case GENERAR_MAILING_EXITO:
            return {
                ...state,
                exitoGenerarMailing: true,
                isMailingComplete: true
            }
        case INICIAR_PROCESO_MAILING:
            return {
                ...state,
                totalEmails: action.payload,
                processedEmails: 0,
                isMailingComplete: false,
                isProcessing: true
            };
        case INCREMENT_PROCESSED_EMAILS:
            return { ...state, processedEmails: state.processedEmails + 1 };
        default:
            return { ...state }
    }
}

//acciones

const formatNumerics = (arr) => {
    return arr.map(subArray =>
        subArray.map(item =>
            typeof item === 'number' ? Number(item.toFixed(2)) : item
        )
    );
};

function gestionarFechaDePago(diaPago, mes, anyo, formaDePago) {
    const forma = formasDePago.find(fp => fp.value === formaDePago); 
    //let fecha = new Date(anyo, mes - 1, diaPago);
    //modificador: corrector venciments
    let fecha = new Date(anyo, mes, diaPago);       
    fecha.setDate(fecha.getDate() + forma.dias);  
    const fechaAjustada = new Date(fecha.getFullYear(), fecha.getMonth(), diaPago);     
    return `${String(fechaAjustada.getDate()).padStart(2, '0')}-${String(fechaAjustada.getMonth() + 1).padStart(2, '0')}-${fechaAjustada.getFullYear()}`;
};

const decodificadorItemsFactura = (objetoTotal, anyo, mes) => (dispatch, getState) => {
    const ultimoDia = new Date(anyo, mes, 0);
    const arrayElementos = dispatch(retornaArrayElementosAccion(objetoTotal));
    const arrayElementosFormateados = formatNumerics(arrayElementos);
    return {
        fecha: `${ultimoDia.getDate()}/${mes}/${anyo}`,
        nombreCentro: objetoTotal.nombreCentro,
        subNombreCentro: objetoTotal.subNombreCentro ?? "",
        domicilio: objetoTotal.domicilio,
        codigoPostal: objetoTotal.codigoPostal,
        poblacion: objetoTotal.poblacion,
        provincia: objetoTotal.provincia,
        codigo: objetoTotal.codigo,
        numero: `F${objetoTotal.procesado.numF.toString().padStart(5, '0')}-${anyo.toString().slice(-2)}`,
        formaPago: (formasDePago.find(item => item.value === objetoTotal.formaPago) || {}).label,
        nif: objetoTotal.nif,
        lineas: arrayElementosFormateados,
        total: parseFloat(objetoTotal.total.toFixed(2)),
        totalIva: parseFloat(objetoTotal.totalIva.toFixed(2)),
        totalMasIva: parseFloat(objetoTotal.totalMasIva.toFixed(2)),
        mail: objetoTotal.mail,
        mail2: objetoTotal.mail2,
        diaPago: gestionarFechaDePago(objetoTotal.diaPago, mes, anyo, (formasDePago.find(item => item.value === objetoTotal.formaPago) || {}).value) || ""
    };
};

export const gestionarMailingIndividualAccion = (objetoCuadrante) => async (dispatch, getState) => {
    try {
        dispatch(handleCloseMenuAccion());
        const [anyo, mes] = objetoCuadrante.nombre.split("-");
        const objetoFacturaPDF = await dispatch(decodificadorItemsFactura(objetoCuadrante.total, anyo, mes));
        if (!objetoFacturaPDF) {
            console.error('Error: No se pudo obtener el objeto de la factura');
            return;
        };
        const element = (
            <FacturaPDF objetoFacturaPDF={objetoFacturaPDF} />
        );
        const myPdf = pdf([]);
        myPdf.updateContainer(element);
        const blob = await myPdf.toBlob();
        //modificador: check per test 
        // if (blob) {
        //     const file = new File([blob], `Recibo-${objetoCuadrante.nombre}.pdf`, { type: 'application/pdf' });
        //     const fileURL = URL.createObjectURL(file);
        //     const pdfWindow = window.open();
        //     pdfWindow.location.href = fileURL;
        // }
        if (blob) {           
            let file = new File([blob], `${objetoFacturaPDF.numero}.pdf`, { type: 'application/pdf' });
            await dispatch(handleClickEnviarMailAccion(objetoFacturaPDF.mail, file, mes, anyo, true, objetoCuadrante, false));
            objetoFacturaPDF.mail2 && (await dispatch(handleClickEnviarMailAccion(objetoFacturaPDF.mail2, file, mes, anyo, true, objetoCuadrante, true)));
        }
    } catch (error) {
        console.error('Error al gestionar la factura PDF:', error);
    };
};

const handleClickEnviarMailAccion = (mail, file, mes, anyo, individual, objetoCuadrante, segundoMail) => async (dispatch, getState) => {
    const { usuarioActivo } = getState().variablesUsuario;
    if (individual) {
        if (!segundoMail) {
            dispatch({
                type: LOADING_MAILING
            });
        };
    };
    try {
        const formData = new FormData();
        formData.append('email', mail);
        formData.append('file', file);
        formData.append('asunto', `Factura servicios Fortise S.L. ${mes}-${anyo} adjunta al mensaje`);
        let apiUrl = rutaApi + "enviar_mail.php";
        //per test local
        //let apiUrl = rutaApi + "simulate_enviar_mail.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });        
        if (res.data.status !== "success") {
            if (individual) {
                dispatch({
                    type: ERROR_ENVIAR_MAIL
                });
            } else {
                dispatch({
                    type: ITEM_ENVIANDO,
                    payload: {
                        objeto: {
                            centro: objetoCuadrante.total.nombreCentro,
                            mail: segundoMail ? objetoCuadrante.total.mail2 : objetoCuadrante.total.mail,
                            estado: "error"
                        }
                    }
                });
                dispatch({
                    type: ITERACION_MAILING_EXITO,
                    payload: {
                        elementoArray1: {
                            id: objetoCuadrante.id,
                            centro: objetoCuadrante.total.nombreCentro,
                            mail: segundoMail ? objetoCuadrante.total.mail2 : objetoCuadrante.total.mail,
                            estado: "error"
                        }
                    }
                });
            }
        } else {
            const objetoTotales = {
                ...objetoCuadrante.total,
                mailEnviado: "si",
            };
            const options = { fullPrecisionFloats: true };
            if (individual) {
                if (!segundoMail) {
                    let fechaHoy = new Date().toLocaleString() + '';
                    let laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
                    const cuadranteAGuardar = {
                        id: objetoCuadrante.id,
                        nombre: objetoCuadrante.nombre,
                        actualizacion: laFirmaActualizacion,
                        datos_cuadrante: stringify(objetoCuadrante.datosCuadrante, options),
                        datos_servicios: stringify(objetoCuadrante.datosServicios, options),
                        datos_informe: stringify(objetoCuadrante.datosInforme, options),
                        datos_buffer: objetoCuadrante.datosBuffer ? stringify(objetoCuadrante.datosBuffer, options) : null,
                        estado: 'facturado',
                        total: stringify(objetoTotales, options),
                        horas: stringify(objetoCuadrante.horas, options)
                    };
                    dispatch(actualizarObjetoCuadranteAccion({
                        ...objetoCuadrante,
                        total: objetoTotales
                    }));
                    dispatch(actualizarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar, false, null));
                };
                dispatch({
                    type: EXITO_ENVIAR_MAIL
                });
            } else {
                if (!segundoMail) {
                    dispatch({
                        type: SET_CUADRANTESITERADOSACTUALIZAR_MAILING,
                        payload: {
                            elementoArray: {
                                id: objetoCuadrante.id,
                                total: stringify(objetoTotales, options)
                            }
                        }
                    });
                };
                dispatch({
                    type: ITERACION_MAILING_EXITO,
                    payload: {
                        elementoArray1: {
                            id: objetoCuadrante.id,
                            centro: objetoCuadrante.total.nombreCentro,
                            mail: segundoMail ? objetoCuadrante.total.mail2 : objetoCuadrante.total.mail,
                            estado: "enviado"
                        }
                    }
                });
                dispatch({
                    type: ITEM_ENVIANDO,
                    payload: {
                        objeto: {
                            centro: objetoCuadrante.total.nombreCentro,
                            mail: segundoMail ? objetoCuadrante.total.mail2 : objetoCuadrante.total.mail,
                            estado: "correcto"
                        }
                    }
                });
            };
        };
    } catch (error) {
        if (individual) {
            dispatch({
                type: ERROR_ENVIAR_MAIL
            });
        };
    };
};

export const iniciarProcesoMailing = (total) => ({ type: INICIAR_PROCESO_MAILING, payload: total });
export const incrementProcessedEmails = () => ({ type: INCREMENT_PROCESSED_EMAILS });
export const completeMailingProcess = () => ({ type: GENERAR_MAILING_EXITO });
export const resetMailingProcess = () => ({ type: RESETEA_EXITO_MAILING });

const promisePool = async (tasks, poolSize) => {
    let i = 0;
    const results = [];
    const workers = Array(poolSize).fill(null).map(async () => {
        while (i < tasks.length) {
            const task = tasks[i++];
            results.push(await task());
        };
    });
    await Promise.all(workers);
    return results;
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendEmailWithRetry = async (mail, file, mes, anyo, objetoCuadrante, dispatch, segundoMail) => {
    let attempts = 0;
    while (attempts < MAX_RETRIES) {
        try {
            dispatch({
                type: ITEM_ENVIANDO,
                payload: {
                    objeto: {
                        centro: objetoCuadrante.total.nombreCentro,
                        mail: mail,
                        estado: "enviando"
                    }
                }
            });
            await dispatch(handleClickEnviarMailAccion(mail, file, mes, anyo, false, objetoCuadrante, segundoMail));
            dispatch({
                type: ITEM_ENVIANDO,
                payload: {
                    objeto: {
                        centro: objetoCuadrante.total.nombreCentro,
                        mail: mail,
                        estado: "correcto"
                    }
                }
            });
            return true;
        } catch (error) {
            attempts++;
            console.error(`Error al enviar correo a ${mail}. Intento ${attempts} de ${MAX_RETRIES}.`, error);
            if (attempts < MAX_RETRIES) {
                console.log(`Esperando ${RETRY_DELAY / 1000} segundos antes del próximo intento...`);
                await wait(RETRY_DELAY);
            }
        }
    }
    dispatch({
        type: ITEM_ENVIANDO,
        payload: {
            objeto: {
                centro: objetoCuadrante.total.nombreCentro,
                mail: mail,
                estado: "error"
            }
        }
    });
    return false;
};

export const gestionarMailingLoteAccion = (arrayCuadrantes, anyo, mes) => async (dispatch, getState) => {
    dispatch(resetMailingProcess());
    dispatch({ type: PROCESANDO_LOTE_MAILING });
    const totalEmails = arrayCuadrantes.reduce((total, cuadrante) => {
        return total + (cuadrante.total.mail2 ? 2 : 1);
    }, 0);
    dispatch(iniciarProcesoMailing(totalEmails));
    try {
        const tasks = arrayCuadrantes.map(objetoCuadrante => async () => {
            const objetoFacturaPDF = await dispatch(decodificadorItemsFactura(objetoCuadrante.total, anyo, mes));
            if (!objetoFacturaPDF) {
                console.error(`Error: No se pudo obtener el objeto de la factura para el cuadrante ${objetoCuadrante.id}`);
                dispatch(incrementProcessedEmails());
                return;
            }
            const element = (
                <FacturaPDF objetoFacturaPDF={objetoFacturaPDF} />
            );
            const myPdf = pdf([]);
            myPdf.updateContainer(element);
            const blob = await myPdf.toBlob();
            if (blob) {
                const file = new File([blob], `${objetoFacturaPDF.numero}.pdf`, { type: 'application/pdf' });
                await sendEmailWithRetry(objetoFacturaPDF.mail, file, mes, anyo, objetoCuadrante, dispatch, false);
                dispatch(incrementProcessedEmails());
                if (objetoFacturaPDF.mail2) {   
                    await sendEmailWithRetry(objetoFacturaPDF.mail2, file, mes, anyo, objetoCuadrante, dispatch, true);
                    dispatch(incrementProcessedEmails());
                }
            }
        });
        await promisePool(tasks, 1);
        dispatch(completeMailingProcess());
    } catch (error) {
        console.error('Error al gestionar las facturas PDF en lote:', error);
    }
};

export const reseteaMailingAccion = () => (dispatch, getState) => {
    dispatch({
        type: RESETEA_EXITO_MAILING
    });
};

export const actualizarCuadrantesIteradosMailingAccion = () => async (dispatch, getState) => {
    const { usuarioActivo } = getState().variablesUsuario;
    const { cuadrantesIteradosActualizarMailing } = getState().variablesCuadrantesMailing;
    let fechaHoy = new Date().toLocaleString() + '';
    let laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
    const datos = {
        actualizacion: laFirmaActualizacion,
        estado: 'facturado',
        arrayCuadrantes: cuadrantesIteradosActualizarMailing,
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

export const generaArchivoXLSMailingAccion = (mes) => async (dispatch, getState) => {
    try {
        const { laDataMailing } = getState().variablesCuadrantesMailing;
        const cuadrantes = laDataMailing.map(cuadrante => ({
            nombreCentro: cuadrante.centro,
            mail: cuadrante.mail,
            estado: cuadrante.estado,
        })).sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));        
        const elListadoCuadrantesEnviadosImprimir = [
            [`LISTADO EMAILS ENVIADOS MES ${mes}`],
            ["CENTRO", "MAIL", "ESTADO"],
            ...cuadrantes.map(({ nombreCentro, mail, estado }) => [nombreCentro, mail, estado])
        ];
        const nombreArchivo = `listado_mails_enviados_${mes}`;
        await exportarAExcel(elListadoCuadrantesEnviadosImprimir, nombreArchivo);
        return { payload: true };
    } catch (error) {
        console.error('Error generando archivo XLS:', error);
        throw new Error('Error generando archivo XLS');
    };
};