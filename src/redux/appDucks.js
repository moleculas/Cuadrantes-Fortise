import axios from 'axios';
import Constantes from "../constantes";
import * as XLSX from "xlsx";

//constantes
const rutaApi = Constantes.RUTA_API;
const meses = Constantes.MESES;
const tipos = Constantes.TIPO_SERVICIO;
const fileExtension = ".xls";

const dataInicial = {
    loadingApp: false,
    estadoActivadoDesactivado: true,
    estadoIntervencionRegistrada: true,
    onEstem: '',
    openDialog: [false, false, false, false, false, false, false, false, false, false, false],
    exitoEnviarMail: false,
    errorEnviarMail: false,
    errorDeCargaConfiguracion: false,
    objetoConfiguracion: {
        precioHoraNormal: null,
        precioHoraExtra: null,
        mensajeMailCentros: '',
        cuenta1: {
            iban: '',
            bic: '',
            nombreBanco: '',
            entidad: '',
            oficina: '',
            digitosControl: '',
            numeroCuenta: ''
        },
    },
    exitoActualizacionConfiguracion: false,
    arrayUltimasIntervenciones: [],
    errorDeCargaUltimasIntervenciones: false,
    exitoGenerarArchivos: false,
}

//types
const LOADING_APP = 'LOADING_APP';
const ACTIVAR_DESACTIVAR_COMPONENTE = 'ACTIVAR_DESACTIVAR_COMPONENTE';
const INTERVENCION_REGISTRADA = 'INTERVENCION_REGISTRADA';
const ON_ESTEM = 'ON_ESTEM';
const ABIERTO_DIALOG = 'ABIERTO_DIALOG';
const CERRADO_DIALOG = 'CERRADO_DIALOG';
const EXITO_ENVIAR_MAIL = 'EXITO_ENVIAR_MAIL';
const ERROR_ENVIAR_MAIL = 'ERROR_ENVIAR_MAIL';
const OBTENER_CONFIGURACION_EXITO = 'OBTENER_CONFIGURACION_EXITO';
const ERROR_DE_CARGA_CONFIGURACION = 'ERROR_DE_CARGA_CONFIGURACION';
const VACIAR_DATOS_CONFIGURACION = 'VACIAR_DATOS_CONFIGURACION';
const ACTUALIZAR_CONFIGURACION_EXITO = 'ACTUALIZAR_CONFIGURACION_EXITO';
const RESETEA_EXITO_CONFIGURACION = 'RESETEA_EXITO_CONFIGURACION';
const OBTENER_ULTIMAS_INTERVENCIONES_EXITO = 'OBTENER_ULTIMAS_INTERVENCIONES_EXITO';
const VACIAR_DATOS_ULTIMAS_INTERVENCIONES = 'VACIAR_DATOS_ULTIMAS_INTERVENCIONES';
const ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES = 'ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES';
const GENERAR_ARCHIVOS_EXITO = 'GENERAR_ARCHIVOS_EXITO';

//reducer
export default function appReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_APP:
            return { ...state, loadingApp: true }
        case ACTIVAR_DESACTIVAR_COMPONENTE:
            return { ...state, estadoActivadoDesactivado: action.payload.estado }
        case INTERVENCION_REGISTRADA:
            return { ...state, estadoIntervencionRegistrada: action.payload.estado }
        case ON_ESTEM:
            return { ...state, onEstem: action.payload.lloc }
        case ABIERTO_DIALOG:
            return { ...state, openDialog: action.payload.array }
        case CERRADO_DIALOG:
            return { ...state, openDialog: dataInicial.openDialog }
        case EXITO_ENVIAR_MAIL:
            return { ...state, exitoEnviarMail: true, loadingApp: false }
        case ERROR_ENVIAR_MAIL:
            return { ...state, errorEnviarMail: true, loadingApp: false }
        case OBTENER_CONFIGURACION_EXITO:
            return { ...state, objetoConfiguracion: action.payload.objeto, errorDeCargaConfiguracion: false, loadingApp: false }
        case ERROR_DE_CARGA_CONFIGURACION:
            return { ...state, errorDeCargaConfiguracion: true, loadingApp: false }
        case VACIAR_DATOS_CONFIGURACION:
            return { ...state, objetoConfiguracion: action.payload }
        case ACTUALIZAR_CONFIGURACION_EXITO:
            return { ...state, errorDeCargaConfiguracion: false, loadingApp: false, exitoActualizacionConfiguracion: true }
        case RESETEA_EXITO_CONFIGURACION:
            return { ...state, exitoActualizacionConfiguracion: false, exitoGenerarArchivos: false }
        case OBTENER_CONFIGURACION_EXITO:
            return { ...state, objetoConfiguracion: action.payload.objeto, errorDeCargaConfiguracion: false, loadingApp: false }
        case OBTENER_ULTIMAS_INTERVENCIONES_EXITO:
            return { ...state, arrayUltimasIntervenciones: action.payload.array, errorDeCargaUltimasIntervenciones: false, loadingApp: false }
        case ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES:
            return { ...state, errorDeCargaUltimasIntervenciones: true, loadingApp: false }
        case VACIAR_DATOS_ULTIMAS_INTERVENCIONES:
            return { ...state, arrayUltimasIntervenciones: [] }
        case GENERAR_ARCHIVOS_EXITO:
            return { ...state, exitoGenerarArchivos: true }
        default:
            return { ...state }
    }
}

//acciones

export const activarDesactivarAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE,
        payload: {
            estado: estado
        }
    });
}

export const registrarIntervencionAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: INTERVENCION_REGISTRADA,
        payload: {
            estado: estado
        }
    });
}

export const retornaHoraRangoAccion = (laHora) => (dispatch, getState) => {
    if (laHora) {
        const hora = laHora.getHours();
        const minuto = laHora.getMinutes();
        const laHoraRetornada = hora + ':' + minuto;
        return laHoraRetornada;
    }
}

export const retornaMinutosAccion = (primeraHora, segundaHora) => (dispatch, getState) => {
    if (primeraHora && segundaHora) {
        let myArrSplit1 = primeraHora.split(":");
        const horasPrimeraHora = parseInt(myArrSplit1[0]);
        const minutosPrimeraHora = parseInt(myArrSplit1[1]);
        const minutosTotalesPrimeraHora = (horasPrimeraHora * 60) + minutosPrimeraHora;
        let myArrSplit2 = segundaHora.split(":");
        const horasSegundaHora = parseInt(myArrSplit2[0]);
        const minutosSegundaHora = parseInt(myArrSplit2[1]);
        const minutosTotalesSegundaHora = (horasSegundaHora * 60) + minutosSegundaHora;
        const diff = minutosTotalesSegundaHora - minutosTotalesPrimeraHora;
        return diff;
    }
}

export const generaFechaAccion = (datoHorario) => (dispatch, getState) => {
    const time = datoHorario;
    const current = new Date();
    const dateTimeTwo = new Date(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${time}`);
    return dateTimeTwo;
}

export const retornaAnoMesAccion = (fecha) => (dispatch, getState) => {
    let data;
    if (!fecha) {
        data = new Date();
    } else {
        data = new Date(fecha);
    }
    const mes = data.getMonth() + 1;
    const any = data.getFullYear();
    const laData = any + '-' + mes;
    return laData;
}

export const retornaAnoMesCuadranteAccion = (cuadrante) => (dispatch, getState) => {
    let myArrSplit = cuadrante.split("-");
    const monthNum = myArrSplit[1];
    const monthLet = meses[monthNum - 1];
    const year = myArrSplit[0];
    return { monthNum, monthLet, year }
};

export const retornaAnoMesDiaAccion = (fecha) => (dispatch, getState) => {
    const data = new Date(fecha);
    const mes = data.getMonth() + 1;
    const any = data.getFullYear();
    const dia = data.getDate();
    const laData = any + '-' + mes + '-' + dia;
    return laData;
}

export const diasEnElMesAccion = (fecha) => (dispatch, getState) => {
    let myArrSplit = fecha.split("-");
    const anyo = myArrSplit[0];
    const mes = myArrSplit[1];
    return new Date(anyo, mes, 0).getDate();
}

export const diaDeLaSemanaAccion = (dateStr) => (dispatch, getState) => {
    //formato dateStr=MM-DD-YYYY
    let date = new Date(dateStr);
    let locale = "es-ES";
    const str = date.toLocaleDateString(locale, { weekday: 'long' });
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const onEstemAccion = (lloc) => (dispatch, getState) => {
    dispatch({
        type: ON_ESTEM,
        payload: {
            lloc: lloc
        }
    });
}

export const abreObjetoDialogAccion = (numero) => (dispatch, getState) => {
    let arrayDialogs = [];
    switch (numero) {
        case '1':
            arrayDialogs[0] = true;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '2':
            arrayDialogs[0] = false;
            arrayDialogs[1] = true;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '3':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = true;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '4':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = true;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '5':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = true;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '6':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = true;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '7':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = true;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '8':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = true;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '9':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = true;
            arrayDialogs[9] = false;
            arrayDialogs[10] = false;
            break;
        case '10':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = true;
            arrayDialogs[10] = false;
            break;
        case '11':
            arrayDialogs[0] = false;
            arrayDialogs[1] = false;
            arrayDialogs[2] = false;
            arrayDialogs[3] = false;
            arrayDialogs[4] = false;
            arrayDialogs[5] = false;
            arrayDialogs[6] = false;
            arrayDialogs[7] = false;
            arrayDialogs[8] = false;
            arrayDialogs[9] = false;
            arrayDialogs[10] = true;
            break;
        default:
    }
    dispatch({
        type: ABIERTO_DIALOG,
        payload: {
            array: arrayDialogs,
        }
    });
}

export const cierraObjetoDialogAccion = () => (dispatch, getState) => {
    dispatch({
        type: CERRADO_DIALOG
    });
}

export const enviarMailAccion = (from, email, file) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("from", from);
        formData.append("email", email);
        formData.append("file", file);
        let apiUrl = rutaApi + "enviar_mail.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        dispatch({
            type: EXITO_ENVIAR_MAIL
        })

    } catch (error) {
        dispatch({
            type: ERROR_ENVIAR_MAIL
        })
    }
}

export const obtenerConfiguracionAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        let apiUrl = rutaApi + "obtener.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: OBTENER_CONFIGURACION_EXITO,
            payload: {
                objeto: JSON.parse(res.data.datos_configuracion)
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
}

export const actualizarConfiguracionAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: ACTUALIZAR_CONFIGURACION_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CONFIGURACION
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
}

export const vaciarDatosConfiguracionAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CONFIGURACION,
        payload: {
            precioHoraNormal: null,
            precioHoraExtra: null,
            mensajeMailCentros: '',
            cuenta1: {
                iban: '',
                bic: '',
                nombreBanco: '',
                entidad: '',
                oficina: '',
                digitosControl: '',
                numeroCuenta: ''
            },
        }
    });
}

export const obtenerObjetoPorIdAccion = (listado, id) => (dispatch, getState) => {
    let aDevolver;
    listado.map((elemento) => {
        if (elemento.id === id) {
            aDevolver = elemento.nombre
        }
    });
    return aDevolver
}

export const validarMailAccion = (mail) => (dispatch, getState) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (regex.test(mail)) {
        return true;
    }
    else {
        return false;
    }
}

export const obtenerUltimasIntervencionesAccion = () => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        let apiUrl = rutaApi + "ultimas_intervenciones.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        respuesta.sort((a, b) => a.actualizacion.localeCompare(b.actualizacion)).reverse();
        dispatch({
            type: OBTENER_ULTIMAS_INTERVENCIONES_EXITO,
            payload: {
                array: respuesta
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES
        })
    }
}

export const vaciarDatosUltimasIntervencionesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_ULTIMAS_INTERVENCIONES
    });
}

const exportarAExcel = (apiData, fileName) => {
    const ws = XLSX.utils.aoa_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, fileName + fileExtension)
}

export const generarArchivosXLSAccion = (objeto, numFactusol, centro, totalFacturado, objetoDesgloseConceptos) => async (dispatch, getState) => {
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", centro);
        let apiUrl = rutaApi + "obtener_para_parsear.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const objetoCentroParsear = {
            nombre: res.data.nombre,
            codigo: res.data.codigo,
            domicilio: res.data.domicilio,
            codigoPostal: res.data.codigo_postal,
            poblacion: res.data.poblacion,
            provincia: res.data.provincia,
            nif: res.data.nif,
            formaPago: res.data.forma_pago,
            horario: JSON.parse(res.data.horario)
        };
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        const fechaHoy = day + "/" + month + "/" + year;
        const dataFAC = [[
            1,
            numFactusol,
            '',
            fechaHoy,
            0,
            '',
            1,
            '',
            objetoCentroParsear.codigo,
            objetoCentroParsear.nombre,
            objetoCentroParsear.domicilio,
            objetoCentroParsear.poblacion,
            objetoCentroParsear.codigoPostal,
            objetoCentroParsear.provincia,
            objetoCentroParsear.nif,
            0,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            totalFacturado,
            objetoCentroParsear.formaPago,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            'N',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        ]];
        exportarAExcel(dataFAC, 'FAC');
        let precioArticulo_M, precioArticulo_L, precioArticulo_C, precioArticulo_E, precioArticulo_I, precioArticulo_Z, precioArticulo_T, precioArticulo_P;
        let cantidad_M, cantidad_L, cantidad_C, cantidad_E, cantidad_I, cantidad_Z, cantidad_T, cantidad_P;
        let contadorLineas = 0;
        let precioArticulo, cantidad, articulo, descripcion, total;
        const dataLFA = [];
        console.log(objetoDesgloseConceptos)
        if (objetoDesgloseConceptos.MT) {
            precioArticulo_M = objetoCentroParsear.horario.mensualPactado;
            cantidad_M = objetoDesgloseConceptos.MH;
            contadorLineas++;
        };
        if (objetoDesgloseConceptos.LT) {
            precioArticulo_L = objetoCentroParsear.horario.precioHora_L;
            cantidad_L = objetoDesgloseConceptos.LH;
            contadorLineas++;
        };
        if (objetoDesgloseConceptos.CT) {
            precioArticulo_C = objetoCentroParsear.horario.precioHora_C;
            cantidad_C = objetoDesgloseConceptos.CH;
            contadorLineas++;
        };
        if (objetoDesgloseConceptos.ET) {
            precioArticulo_E = objetoCentroParsear.horario.precioHora_E;
            cantidad_E = objetoDesgloseConceptos.EH;
            contadorLineas++;
        };
        if (objetoDesgloseConceptos.IT) {
            precioArticulo_I = objetoCentroParsear.horario.precioHora_I;
            cantidad_I = objetoDesgloseConceptos.IH;
            contadorLineas++;
        };
        if (objetoDesgloseConceptos.ZT) {
            precioArticulo_Z = objetoCentroParsear.horario.precioHora_Z;
            cantidad_Z = objetoDesgloseConceptos.ZH;
            contadorLineas++;
        };
        if (objetoDesgloseConceptos.TT) {
            precioArticulo_T = objetoCentroParsear.horario.precioHora_T;
            cantidad_T = objetoDesgloseConceptos.TH;
            contadorLineas++;
        };
        if (objetoDesgloseConceptos.PT) {
            precioArticulo_P = objetoCentroParsear.horario.precioHora_P;
            cantidad_P = objetoDesgloseConceptos.PH;
            contadorLineas++;
        };
        for (let i = 1; i <= contadorLineas; i++) {
            if (objetoDesgloseConceptos.MT) {
                precioArticulo = precioArticulo_M;
                cantidad = cantidad_M;
                articulo = tipos[0].value;
                descripcion = tipos[0].label;
                total = objetoDesgloseConceptos.MT;
            };
            if (objetoDesgloseConceptos.LT) {
                precioArticulo = precioArticulo_L;
                cantidad = cantidad_L;
                articulo = tipos[0].value;
                descripcion = tipos[0].label;
                total = objetoDesgloseConceptos.LT;
            };
            if (objetoDesgloseConceptos.CT) {
                precioArticulo = precioArticulo_C;
                cantidad = cantidad_C;
                articulo = tipos[1].value;
                descripcion = tipos[1].label;
                total = objetoDesgloseConceptos.CT;
            };
            if (objetoDesgloseConceptos.ET) {
                precioArticulo = precioArticulo_E;
                cantidad = cantidad_E;
                articulo = tipos[2].value;
                descripcion = tipos[2].label;
                total = objetoDesgloseConceptos.ET;
            };
            if (objetoDesgloseConceptos.IT) {
                precioArticulo = precioArticulo_I;
                cantidad = cantidad_I;
                articulo = tipos[3].value;
                descripcion = tipos[3].label;
                total = objetoDesgloseConceptos.IT;
            };
            if (objetoDesgloseConceptos.ZT) {
                precioArticulo = precioArticulo_Z;
                cantidad = cantidad_Z;
                articulo = tipos[4].value;
                descripcion = tipos[4].label;
                total = objetoDesgloseConceptos.ZT;
            };
            if (objetoDesgloseConceptos.TT) {
                precioArticulo = precioArticulo_T;
                cantidad = cantidad_T;
                articulo = tipos[5].value;
                descripcion = tipos[5].label;
                total = objetoDesgloseConceptos.TT;
            };
            if (objetoDesgloseConceptos.PT) {
                precioArticulo = precioArticulo_P;
                cantidad = cantidad_P;
                articulo = tipos[6].value;
                descripcion = tipos[6].label;
                total = objetoDesgloseConceptos.PT;
            };
            dataLFA.push([
                1,
                numFactusol,
                i,
                articulo,
                descripcion,
                cantidad,
                '',
                '',
                '',
                precioArticulo,
                total,
                0,
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]);
        };
        exportarAExcel(dataLFA, 'LFA');
        dispatch({
            type: GENERAR_ARCHIVOS_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CONFIGURACION
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
}