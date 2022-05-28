import axios from 'axios';
import Constantes from "../constantes";
import * as XLSX from "xlsx";

//constantes
const rutaApi = Constantes.RUTA_API;
const meses = Constantes.MESES;
const fileExtension = ".xls";

const dataInicial = {
    loadingApp: false,
    estadoActivadoDesactivado: true,
    estadoIntervencionRegistrada: true,
    onEstem: '',
    openDialog: [false, false, false, false, false, false, false, false, false, false, false, false],
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
    numeroRecibos: null,
    exitoActualizacionConfiguracion: false,
    arrayUltimasIntervenciones: [],
    errorDeCargaUltimasIntervenciones: false,
    exitoGenerarArchivos: false,
    procesandoLoteEstado: false,
    laDataFAC: [],
    laDataLFA: [],
    finalizandoLoteEstado: false,
    controladores: []
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
const PROCESANDO_LOTE = 'PROCESANDO_LOTE';
const ITERACION_XLS_EXITO = 'ITERACION_XLS_EXITO';
const FINALIZANDO_LOTE = 'FINALIZANDO_LOTE';
const OBTENER_NUMERO_RECIBOS_EXITO = 'OBTENER_NUMERO_RECIBOS_EXITO';
const RESETEA_NUMERO_RECIBOS = 'RESETEA_NUMERO_RECIBOS';
const SET_NEWCONTROLLER = 'SET_NEWCONTROLLER';

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
            return { ...state, objetoConfiguracion: action.payload.objeto, numeroRecibos: action.payload.numeroRecibos, errorDeCargaConfiguracion: false, loadingApp: false }
        case ERROR_DE_CARGA_CONFIGURACION:
            return { ...state, errorDeCargaConfiguracion: true, loadingApp: false }
        case VACIAR_DATOS_CONFIGURACION:
            return { ...state, objetoConfiguracion: action.payload.objetoConfiguracion, numeroRecibos: action.payload.numeroRecibos }
        case ACTUALIZAR_CONFIGURACION_EXITO:
            return { ...state, errorDeCargaConfiguracion: false, loadingApp: false, exitoActualizacionConfiguracion: true }
        case RESETEA_EXITO_CONFIGURACION:
            return { ...state, exitoActualizacionConfiguracion: false, exitoGenerarArchivos: false, procesandoLoteEstado: false }
        case OBTENER_ULTIMAS_INTERVENCIONES_EXITO:
            return { ...state, arrayUltimasIntervenciones: action.payload.array, errorDeCargaUltimasIntervenciones: false, loadingApp: false }
        case ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES:
            return { ...state, errorDeCargaUltimasIntervenciones: true, loadingApp: false }
        case VACIAR_DATOS_ULTIMAS_INTERVENCIONES:
            return { ...state, arrayUltimasIntervenciones: [] }
        case GENERAR_ARCHIVOS_EXITO:
            return { ...state, exitoGenerarArchivos: true, laDataFAC: [], laDataLFA: [] }
        case PROCESANDO_LOTE:
            return { ...state, procesandoLoteEstado: true }
        case FINALIZANDO_LOTE:
            return { ...state, finalizandoLoteEstado: action.payload.estado }
        case ITERACION_XLS_EXITO:
            return { ...state, laDataFAC: [...state.laDataFAC, action.payload.elementoArray1], laDataLFA: [...state.laDataLFA, action.payload.elementoArray2] }
        case OBTENER_NUMERO_RECIBOS_EXITO:
            return { ...state, numeroRecibos: action.payload.numeroRecibos }
        case RESETEA_NUMERO_RECIBOS:
            return { ...state, numeroRecibos: null }
        case SET_NEWCONTROLLER:
            return { ...state, controladores: action.payload.array }
        default:
            return { ...state }
    }
}

//acciones

export const setNewControllerAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_NEWCONTROLLER,
        payload: {
            array: array
        }
    });
};

export const activarDesactivarAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE,
        payload: {
            estado: estado
        }
    });
};

export const registrarIntervencionAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: INTERVENCION_REGISTRADA,
        payload: {
            estado: estado
        }
    });
};

export const retornaHoraRangoAccion = (laHora) => (dispatch, getState) => {
    if (laHora) {
        const hora = laHora.getHours();
        const minuto = laHora.getMinutes();
        const laHoraRetornada = hora + ':' + minuto;
        return laHoraRetornada;
    }
};

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
};

export const generaFechaAccion = (datoHorario) => (dispatch, getState) => {
    const time = datoHorario;
    const current = new Date();
    const dateTimeTwo = new Date(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${time}`);
    return dateTimeTwo;
};

export const retornaAnoMesAccion = (fecha) => {
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
};

export const gestionaMaxDateCalendarAccion = (numeroDias) => (dispatch, getState) => {
    let data = new Date();
    const mes = data.getMonth() + 1 + numeroDias;
    const any = data.getFullYear();
    const laData = any + '-' + mes;
    return laData;
};

export const gestionaRangoFechasVacacionesAccion = (periodo) => (dispatch, getState) => {
    const { calendarioAGestionar, losDiasDelMes } = getState().variablesCuadrantes;
    if (periodo === 'inicio') {
        const laData = calendarioAGestionar + '-' + losDiasDelMes[0][0];
        return laData;
    } else {
        const laData = calendarioAGestionar + '-' + losDiasDelMes[losDiasDelMes.length - 1][0];
        return laData;
    };
};

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
};

export const retornaFechaEnBaseAAnoMesDiaAccion = (fecha) => (dispatch, getState) => {
    const partsData = fecha.split('-');
    const laData = new Date(partsData[0], partsData[1] - 1, partsData[2]);
    return laData;
};

export const diasEnElMesAccion = (fecha) => (dispatch, getState) => {
    let myArrSplit = fecha.split("-");
    const anyo = myArrSplit[0];
    const mes = myArrSplit[1];
    return new Date(anyo, mes, 0).getDate();
};

const conversorFechas = (fecha) => {
    let myFechaSplit = fecha.split("-");
    let elMes = myFechaSplit[0];
    let elDia = myFechaSplit[1];
    let elAnyo = myFechaSplit[2];
    return elAnyo + '/' + elMes + '/' + elDia + ' 00:00:00'
};

export const diaDeLaSemanaAccion = (dateStr) => (dispatch, getState) => {
    //formato dateStr=MM-DD-YYYY    
    //formato válido firefox dateStr=yyyy/MM/dd HH:mm:ss
    let date = new Date(conversorFechas(dateStr));
    let locale = "es-ES";
    const str = date.toLocaleDateString(locale, { weekday: 'long' });
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const onEstemAccion = (lloc) => (dispatch, getState) => {
    dispatch({
        type: ON_ESTEM,
        payload: {
            lloc: lloc
        }
    });
};

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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
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
            arrayDialogs[11] = false;
            break;
        case '12':
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
            arrayDialogs[10] = false;
            arrayDialogs[11] = true;
            break;
        default:
    }
    dispatch({
        type: ABIERTO_DIALOG,
        payload: {
            array: arrayDialogs,
        }
    });
};

export const cierraObjetoDialogAccion = () => (dispatch, getState) => {
    dispatch({
        type: CERRADO_DIALOG
    });
};

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
};

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
                objeto: JSON.parse(res.data.datos_configuracion),
                numeroRecibos: res.data.numero_recibos
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const obtenerNumeroRecibosAccion = (objeto) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", 1);
        let apiUrl = rutaApi + "obtener_numero_recibos.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: OBTENER_NUMERO_RECIBOS_EXITO,
            payload: {
                numeroRecibos: res.data.numero_recibos
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const actualizarNumeroRecibosAccion = (objeto, numero) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", 1);
        formData.append("numero", numero);
        let apiUrl = rutaApi + "actualizar_numero_recibos.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: ACTUALIZAR_CONFIGURACION_EXITO,
        });
        dispatch({
            type: RESETEA_EXITO_CONFIGURACION
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const resetarNumeroRecibosAccion = () => async (dispatch, getState) => {
    dispatch({
        type: RESETEA_NUMERO_RECIBOS
    });
};

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
};

export const vaciarDatosConfiguracionAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CONFIGURACION,
        payload: {
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
            numeroRecibos: null
        }
    });
};

export const obtenerObjetoPorIdAccion = (listado, id) => (dispatch, getState) => {
    let aDevolver;
    listado.map((elemento) => {
        if (elemento.id === id) {
            aDevolver = elemento.nombre
        }
    });
    return aDevolver
};

export const validarMailAccion = (mail) => (dispatch, getState) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (regex.test(mail)) {
        return true;
    }
    else {
        return false;
    }
};

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
};

export const vaciarDatosUltimasIntervencionesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_ULTIMAS_INTERVENCIONES
    });
};

const exportarAExcel = (apiData, fileName) => {
    const ws = XLSX.utils.aoa_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, fileName + fileExtension)
};

export const retornaTextoConceptoServicio = (objetoTotales, servicio, horas) => (dispatch, getState) => {
    let arrayConceptos = [];
    if (servicio) {
        if (servicio === 'MT') {
            if (horas === 'LH') {
                arrayConceptos.push('LIM', 'SERVICIO DE LIMPIEZA');
            };
            if (horas === 'EH') {
                arrayConceptos.push('LIME', 'SERVICIO DE LIMPIEZA ESPECIAL');
            };
            if (horas === 'PH') {
                arrayConceptos.push('LIMP', 'SERVICIO DE LIMPIEZA DEL PARKING');
            };
            if (horas === 'NH') {
                arrayConceptos.push('NAVE2', 'SERVICIO DE LIMPIEZA NAVE 2');
            };
            if (horas === 'RH') {
                arrayConceptos.push('REFZ', 'SERVICIO DE LIMPIEZA REFUERZO');
            };
            if (horas === 'L1H') {
                arrayConceptos.push('LIM1', 'SERVICIO DE LIMPIEZA_1');
            };
            if (horas === 'L2H') {
                arrayConceptos.push('LIM2', 'SERVICIO DE LIMPIEZA_2');
            };
            if (horas === 'FH') {
                arrayConceptos.push('FEST', 'SERVICIO DE LIMPIEZA DÍA FESTIVO');
            };
        };
        if (servicio === 'LT') {
            arrayConceptos.push('LIM', 'SERVICIO DE LIMPIEZA');
        };
        if (servicio === 'ET') {
            arrayConceptos.push('LIME', 'SERVICIO DE LIMPIEZA ESPECIAL');
        };
        if (servicio === 'PT') {
            arrayConceptos.push('LIMP', 'SERVICIO DE LIMPIEZA DEL PARKING');
        };
        if (servicio === 'NT') {
            arrayConceptos.push('NAVE2', 'SERVICIO DE LIMPIEZA NAVE 2');
        };
        if (servicio === 'RT') {
            arrayConceptos.push('REFZ', 'SERVICIO DE LIMPIEZA REFUERZO');
        };
        if (servicio === 'L1T') {
            arrayConceptos.push('LIM1', 'SERVICIO DE LIMPIEZA_1');
        };
        if (servicio === 'L2T') {
            arrayConceptos.push('LIM2', 'SERVICIO DE LIMPIEZA_2');
        };
        if (servicio === 'FT') {
            arrayConceptos.push('FEST', 'SERVICIO DE LIMPIEZA DÍA FESTIVO');
        };
        if (servicio === 'TOT') {
            arrayConceptos.push('TOL', 'SERVICIO DE LIMPIEZA DE TOLDOS');
        };
        if (servicio === 'CRT') {
            arrayConceptos.push('CRIS', 'SERVICIO DE LIMPIEZA DE CRISTALES');
        };
        if (servicio === 'CET') {
            arrayConceptos.push('CRISE', 'LIMPIEZA CRISTALES EXTERIORES');
        };
        if (servicio === 'CIT') {
            arrayConceptos.push('CRISI', 'LIMPIEZA CRISTALES INTERIORES');
        };
        if (servicio === 'MOT') {
            arrayConceptos.push('MOQ', 'SERVICIO DE LIMPIEZA MOQUETA');
        };
        if (servicio === 'OFT') {
            arrayConceptos.push('OF', 'SERVICIO DE LIMPIEZA OFICINAS');
        };
        if (servicio === 'ALT') {
            arrayConceptos.push('ALMC', 'SERVICIO DE LIMPIEZA ALMACENES');
        };
        if (servicio === 'LAT') {
            arrayConceptos.push('LAB', 'SERVICIO DE LIMPIEZA LABORATORIO');
        };
        if (servicio === 'TET') {
            arrayConceptos.push('TELÑ', 'SERVICIO DE LIMPIEZA TELARAÑAS');
        };
        if (servicio === 'FIT') {
            arrayConceptos.push('FCH.IN', 'SERVICIO DE LIMPIEZA FACHADA INTERIOR');
        };
        if (servicio === 'FET') {
            arrayConceptos.push('FCH.EX', 'SERVICIO DE LIMPIEZA FACHADA EXTERIOR');
        };
        if (servicio === 'ABT') {
            arrayConceptos.push('ABRLL', 'SERVICIO DE LIMPIEZA ABRILLANTADO');
        };
        if (servicio === 'MAT') {
            arrayConceptos.push('MANT', 'SERVICIO DE MANTENIMIENTO MÁQUINA');
        };
        if (servicio === 'POT') {
            arrayConceptos.push('PORT', 'SERVICIO DE LIMPIEZA PORTERÍA');
        };
        if (servicio === 'BAT') {
            arrayConceptos.push('BACT', 'BOT. NOUBACT');
        };
        if (servicio === 'FTT') {
            arrayConceptos.push('FEST', 'SERVICIO DE LIMPIEZA DÍA FESTIVO');
        };
        if (servicio === 'C3T') {
            arrayConceptos.push('CRTRIM', 'LIMPIEZA DE CRISTALES TRIMESTRAL');
        };
        if (servicio === 'C2T') {
            arrayConceptos.push('CRBIM', 'LIMPIEZA DE CRISTALES BIMENSUAL');
        };
        if (servicio === 'EST') {
            arrayConceptos.push('LIME', 'SERVICIO DE LIMPIEZA ESPECIAL');
        };
        if (servicio === 'PAT') {
            arrayConceptos.push('LIMP', 'SERVICIO DE LIMPIEZA DEL PARKING');
        };
        if (servicio === 'NUMCT') {
            arrayConceptos.push('Nº CUENTA', 'ES96 2100 0804 3102 0076 4493');
        };
    } else {
        if (objetoTotales['MT']) {
            if (objetoTotales['LH']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA');
            };
            if (objetoTotales['EH']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA ESPECIAL');
            };
            if (objetoTotales['PH']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA DEL PARKING');
            };
            if (objetoTotales['NH']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA NAVE 2');
            };
            if (objetoTotales['RH']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA REFUERZO');
            };
            if (objetoTotales['L1H']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA_1');
            };
            if (objetoTotales['L2H']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA_2');
            };
            if (objetoTotales['FH']) {
                arrayConceptos.push('SERVICIO DE LIMPIEZA DÍA FESTIVO');
            };
        };
        if (objetoTotales['LT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA');
        };
        if (objetoTotales['ET']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA ESPECIAL');
        };
        if (objetoTotales['PT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA DEL PARKING');
        };
        if (objetoTotales['NT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA NAVE 2');
        };
        if (objetoTotales['RT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA REFUERZO');
        };
        if (objetoTotales['L1T']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA_1');
        };
        if (objetoTotales['L2T']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA_2');
        };
        if (objetoTotales['FT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA DÍA FESTIVO');
        };
        if (objetoTotales['TOT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA DE TOLDOS');
        };
        if (objetoTotales['CRT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA DE CRISTALES');
        };
        if (objetoTotales['CET']) {
            arrayConceptos.push('LIMPIEZA CRISTALES EXTERIORES');
        };
        if (objetoTotales['CIT']) {
            arrayConceptos.push('LIMPIEZA CRISTALES INTERIORES');
        };
        if (objetoTotales['MOT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA MOQUETA');
        };
        if (objetoTotales['OFT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA OFICINAS');
        };
        if (objetoTotales['ALT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA ALMACENES');
        };
        if (objetoTotales['LAT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA LABORATORIO');
        };
        if (objetoTotales['TET']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA TELARAÑAS');
        };
        if (objetoTotales['FIT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA FACHADA INTERIOR');
        };
        if (objetoTotales['FET']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA FACHADA EXTERIOR');
        };
        if (objetoTotales['ABT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA ABRILLANTADO');
        };
        if (objetoTotales['MAT']) {
            arrayConceptos.push('SERVICIO DE MANTENIMIENTO MÁQUINA');
        };
        if (objetoTotales['POT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA PORTERÍA');
        };
        if (objetoTotales['BAT']) {
            arrayConceptos.push('BOT. NOUBACT');
        };
        if (objetoTotales['FTT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA DÍA FESTIVO');
        };
        if (objetoTotales['C3T']) {
            arrayConceptos.push('LIMPIEZA DE CRISTALES TRIMESTRAL');
        };
        if (objetoTotales['C2T']) {
            arrayConceptos.push('LIMPIEZA DE CRISTALES BIMENSUAL');
        };
        if (objetoTotales['EST']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA ESPECIAL');
        };
        if (objetoTotales['PAT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA DEL PARKING');
        };
        if (objetoTotales['NUMCT']) {
            arrayConceptos.push('ES96 2100 0804 3102 0076 4493');
        };
    };
    let retornoConcepto;
    if (servicio) {
        retornoConcepto = arrayConceptos;
    } else {
        retornoConcepto = arrayConceptos.join(', ');
    };
    return retornoConcepto
};

export const generarArchivosXLSAccion = (numFactusol, centro, objetoConceptos) => async (dispatch, getState) => {
    const elNumFactusol = parseInt(numFactusol) + 1;
    try {
        const objetoCentroParsear = {
            nombre: objetoConceptos.nombreCentro,
            codigo: objetoConceptos.codigo,
            domicilio: objetoConceptos.domicilio,
            codigoPostal: objetoConceptos.codigoPostal,
            poblacion: objetoConceptos.poblacion,
            provincia: objetoConceptos.provincia,
            nif: objetoConceptos.nif,
            formaPago: objetoConceptos.formaPago,
            total: parseFloat(objetoConceptos.total).toFixed(2)
        };
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        const fechaHoy = day + "/" + month + "/" + year;
        const dataFAC = [[
            1,
            elNumFactusol,
            '',
            fechaHoy,
            0,
            '',
            1,
            '',
            parseInt(objetoCentroParsear.codigo),
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
            objetoCentroParsear.total,
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
        const dataLFA = [];
        let arrayElementos = [];
        let retornoServicios = [];
        if (objetoConceptos.MT) {
            if (objetoConceptos.LH) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'LH'));
            };
            if (objetoConceptos.EH) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'EH'));
            };
            if (objetoConceptos.PH) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'PH'));
            };
            if (objetoConceptos.NH) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'NH'));
            };
            if (objetoConceptos.RH) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'RH'));
            };
            if (objetoConceptos.L1H) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'L1H'));
            };
            if (objetoConceptos.L2H) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'L2H'));
            };
            if (objetoConceptos.FH) {
                retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MT', 'FH'));
            };
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.MT, 1, 1]);
        };
        if (objetoConceptos.LT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'LT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.LT, objetoConceptos.LPr, objetoConceptos.LH]);
        };
        if (objetoConceptos.ET) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'ET', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.ET, objetoConceptos.EPr, objetoConceptos.EH]);
        };
        if (objetoConceptos.PT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'PT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.PT, objetoConceptos.PPr, objetoConceptos.PH]);
        };
        if (objetoConceptos.NT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'NT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.NT, objetoConceptos.NPr, objetoConceptos.NH]);
        };
        if (objetoConceptos.RT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'RT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.RT, objetoConceptos.RPr, objetoConceptos.RH]);
        };
        if (objetoConceptos.L1T) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'L1T', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.L1T, objetoConceptos.L1Pr, objetoConceptos.L1H]);
        };
        if (objetoConceptos.L2T) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'L2T', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.L2T, objetoConceptos.L2Pr, objetoConceptos.L2H]);
        };
        if (objetoConceptos.FT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'FT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FT, objetoConceptos.FPr, objetoConceptos.FH]);
        };
        if (objetoConceptos.TOT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'TOT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.TOT, 1, 1]);
        };
        if (objetoConceptos.CRT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'CRT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.CRT, 1, 1]);
        };
        if (objetoConceptos.CET) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'CET', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.CET, 1, 1]);
        };
        if (objetoConceptos.CIT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'CIT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.CIT, 1, 1]);
        };
        if (objetoConceptos.MOT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MOT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.MOT, 1, 1]);
        };
        if (objetoConceptos.OFT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'OFT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.OFT, 1, 1]);
        };
        if (objetoConceptos.ALT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'ALT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.ALT, 1, 1]);
        };
        if (objetoConceptos.LAT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'LAT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.LAT, 1, 1]);
        };
        if (objetoConceptos.TET) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'TET', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.TET, 1, 1]);
        };
        if (objetoConceptos.FIT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'FIT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FIT, 1, 1]);
        };
        if (objetoConceptos.FET) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'FET', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FET, 1, 1]);
        };
        if (objetoConceptos.ABT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'ABT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.ABT, 1, 1]);
        };
        if (objetoConceptos.MAT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'MAT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.MAT, 1, 1]);
        };
        if (objetoConceptos.POT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'POT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.POT, 1, 1]);
        };
        if (objetoConceptos.BAT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'BAT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.BAT, 1, 1]);
        };
        if (objetoConceptos.FTT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'FTT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FTT, 1, 1]);
        };
        if (objetoConceptos.C3T) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'C3T', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.C3T, 1, 1]);
        };
        if (objetoConceptos.C2T) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'C2T', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.C2T, 1, 1]);
        };
        if (objetoConceptos.EST) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'EST', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.EST, 1, 1]);
        };
        if (objetoConceptos.PAT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'PAT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.PAT, 1, 1]);
        };
        if (objetoConceptos.NUMCT) {
            retornoServicios = dispatch(retornaTextoConceptoServicio(null, 'NUMCT', null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], 0, 0, 0]);
        };
        arrayElementos.forEach((elemento, index) => {
            dataLFA.push([
                1,
                elNumFactusol,
                index + 1,
                elemento[0],
                elemento[1],
                elemento[4],
                '',
                '',
                '',
                elemento[3],
                elemento[2],
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
            ])
        });
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

const actualizarCuadrante = async (datos) => {
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", 'cuadrantes');
        formData.append("id", datos.id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar_lote.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    } catch (err) {
        console.error(err)
    }
}

export const generarArchivosXLSLoteAccion = (numFactusol, arrayCuadrantes, laFirmaActualizacion) => (dispatch, getState) => {
    dispatch({
        type: PROCESANDO_LOTE
    });
    // try {
    //     const elNumFactusol = parseInt(numFactusol) + 1;
    //     const dataFAC = [];
    //     const dataLFA = [];
    //     arrayCuadrantes.map(async (cuadranteIterado, index, arr) => {
    //         let nombreCuadranteSplit = cuadranteIterado.nombre.split("-");
    //         const formData1 = new FormData();
    //         formData1.append("objeto", 'centros');
    //         formData1.append("id", nombreCuadranteSplit[2]);
    //         let apiUrl = rutaApi + "obtener_para_parsear.php";
    //         const res1 = await axios.post(apiUrl, formData1, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             }
    //         });
    //         const objetoCentroParsear = {
    //             nombre: res1.data.nombre,
    //             codigo: res1.data.codigo,
    //             domicilio: res1.data.domicilio,
    //             codigoPostal: res1.data.codigo_postal,
    //             poblacion: res1.data.poblacion,
    //             provincia: res1.data.provincia,
    //             nif: res1.data.nif,
    //             formaPago: res1.data.forma_pago,
    //             horario: JSON.parse(res1.data.horario)
    //         };
    //         let dateObj = new Date();
    //         let month = dateObj.getUTCMonth() + 1;
    //         let day = dateObj.getUTCDate();
    //         let year = dateObj.getUTCFullYear();
    //         const fechaHoy = day + "/" + month + "/" + year;
    //         let totalFacturado;
    //         let totalFacturado_M, totalFacturado_L, totalFacturado_C, totalFacturado_E, totalFacturado_I, totalFacturado_Z, totalFacturado_T, totalFacturado_P;
    //         let sumatorioTotalFacturado = 0;
    //         if (objetoCentroParsear.horario.computo === 1) {
    //             totalFacturado = objetoCentroParsear.horario.mensualPactado;
    //             totalFacturado_M = totalFacturado;
    //         };
    //         if (objetoCentroParsear.horario.computo === 2) {
    //             if (cuadranteIterado.horas.L) {
    //                 sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_L) * cuadranteIterado.horas.L);
    //                 totalFacturado_L = (parseFloat(objetoCentroParsear.horario.precioHora_L) * cuadranteIterado.horas.L);
    //             };
    //             if (cuadranteIterado.horas.C) {
    //                 sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_C) * cuadranteIterado.horas.C);
    //                 totalFacturado_C = (parseFloat(objetoCentroParsear.horario.precioHora_C) * cuadranteIterado.horas.C);
    //             };
    //             if (cuadranteIterado.horas.E) {
    //                 sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_E) * cuadranteIterado.horas.E);
    //                 totalFacturado_E = (parseFloat(objetoCentroParsear.horario.precioHora_E) * cuadranteIterado.horas.E);
    //             };
    //             if (cuadranteIterado.horas.I) {
    //                 sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_I) * cuadranteIterado.horas.I);
    //                 totalFacturado_I = (parseFloat(objetoCentroParsear.horario.precioHora_I) * cuadranteIterado.horas.I);
    //             };
    //             if (cuadranteIterado.horas.Z) {
    //                 sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_Z) * cuadranteIterado.horas.Z);
    //                 totalFacturado_Z = (parseFloat(objetoCentroParsear.horario.precioHora_Z) * cuadranteIterado.horas.Z);
    //             };
    //             if (cuadranteIterado.horas.T) {
    //                 sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_T) * cuadranteIterado.horas.T);
    //                 totalFacturado_T = (parseFloat(objetoCentroParsear.horario.precioHora_T) * cuadranteIterado.horas.T);
    //             };
    //             if (cuadranteIterado.horas.P) {
    //                 sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_P) * cuadranteIterado.horas.P);
    //                 totalFacturado_P = (parseFloat(objetoCentroParsear.horario.precioHora_P) * cuadranteIterado.horas.P);
    //             };
    //             totalFacturado = sumatorioTotalFacturado;
    //         };
    //         if (objetoCentroParsear.horario.computo === 3) {
    //             if (objetoCentroParsear.horario.mensualPactado) {
    //                 totalFacturado = objetoCentroParsear.horario.mensualPactado;
    //             } else {
    //                 if (cuadranteIterado.horas.L) {
    //                     sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_L) * cuadranteIterado.horas.L);
    //                     totalFacturado_L = (parseFloat(objetoCentroParsear.horario.precioHora_L) * cuadranteIterado.horas.L);
    //                 };
    //                 if (cuadranteIterado.horas.C) {
    //                     sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_C) * cuadranteIterado.horas.C);
    //                     totalFacturado_C = (parseFloat(objetoCentroParsear.horario.precioHora_C) * cuadranteIterado.horas.C);
    //                 };
    //                 if (cuadranteIterado.horas.E) {
    //                     sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_E) * cuadranteIterado.horas.E);
    //                     totalFacturado_E = (parseFloat(objetoCentroParsear.horario.precioHora_E) * cuadranteIterado.horas.E);
    //                 };
    //                 if (cuadranteIterado.horas.I) {
    //                     sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_I) * cuadranteIterado.horas.I);
    //                     totalFacturado_I = (parseFloat(objetoCentroParsear.horario.precioHora_I) * cuadranteIterado.horas.I);
    //                 };
    //                 if (cuadranteIterado.horas.Z) {
    //                     sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_Z) * cuadranteIterado.horas.Z);
    //                     totalFacturado_Z = (parseFloat(objetoCentroParsear.horario.precioHora_Z) * cuadranteIterado.horas.Z);
    //                 };
    //                 if (cuadranteIterado.horas.T) {
    //                     sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_T) * cuadranteIterado.horas.T);
    //                     totalFacturado_T = (parseFloat(objetoCentroParsear.horario.precioHora_T) * cuadranteIterado.horas.T);
    //                 };
    //                 if (cuadranteIterado.horas.P) {
    //                     sumatorioTotalFacturado += (parseFloat(objetoCentroParsear.horario.precioHora_P) * cuadranteIterado.horas.P);
    //                     totalFacturado_P = (parseFloat(objetoCentroParsear.horario.precioHora_P) * cuadranteIterado.horas.P);
    //                 };
    //                 totalFacturado = sumatorioTotalFacturado;
    //             }
    //         };
    //         dataFAC.push([
    //             1,
    //             elNumFactusol + index,
    //             '',
    //             fechaHoy,
    //             0,
    //             '',
    //             1,
    //             '',
    //             parseInt(objetoCentroParsear.codigo),
    //             objetoCentroParsear.nombre,
    //             objetoCentroParsear.domicilio,
    //             objetoCentroParsear.poblacion,
    //             objetoCentroParsear.codigoPostal,
    //             objetoCentroParsear.provincia,
    //             objetoCentroParsear.nif,
    //             0,
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             totalFacturado,
    //             objetoCentroParsear.formaPago,
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             'N',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             '',
    //             ''
    //         ]);
    //         let arrayElementos = [];
    //         if (totalFacturado_M) {
    //             arrayElementos.push([tipos[0].value, tipos[0].label, totalFacturado_M, objetoCentroParsear.horario.mensualPactado, 1]);
    //         };
    //         if (totalFacturado_L) {
    //             arrayElementos.push([tipos[0].value, tipos[0].label, totalFacturado_L, objetoCentroParsear.horario.precioHora_L, cuadranteIterado.horas.L]);
    //         };
    //         if (totalFacturado_C) {
    //             arrayElementos.push([tipos[1].value, tipos[1].label, totalFacturado_C, objetoCentroParsear.horario.precioHora_C, cuadranteIterado.horas.C]);
    //         };
    //         if (totalFacturado_E) {
    //             arrayElementos.push([tipos[2].value, tipos[2].label, totalFacturado_E, objetoCentroParsear.horario.precioHora_E, cuadranteIterado.horas.E]);
    //         };
    //         if (totalFacturado_I) {
    //             arrayElementos.push([tipos[3].value, tipos[3].label, totalFacturado_I, objetoCentroParsear.horario.precioHora_I, cuadranteIterado.horas.I]);
    //         };
    //         if (totalFacturado_Z) {
    //             arrayElementos.push([tipos[4].value, tipos[4].label, totalFacturado_Z, objetoCentroParsear.horario.precioHora_Z, cuadranteIterado.horas.Z]);
    //         };
    //         if (totalFacturado_T) {
    //             arrayElementos.push([tipos[5].value, tipos[5].label, totalFacturado_T, objetoCentroParsear.horario.precioHora_T, cuadranteIterado.horas.T]);
    //         };
    //         if (totalFacturado_P) {
    //             arrayElementos.push([tipos[6].value, tipos[6].label, totalFacturado_P, objetoCentroParsear.horario.precioHora_P, cuadranteIterado.horas.P]);
    //         };
    //         arrayElementos.forEach((elemento, index2) => {
    //             dataLFA.push([
    //                 1,
    //                 elNumFactusol + index,
    //                 index2 + 1,
    //                 elemento[0],
    //                 elemento[1],
    //                 elemento[4],
    //                 '',
    //                 '',
    //                 '',
    //                 elemento[3],
    //                 elemento[2],
    //                 0,
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 '',
    //                 ''
    //             ])
    //         });
    //         const cuadranteAGuardar = {
    //             id: cuadranteIterado.id,
    //             actualizacion: laFirmaActualizacion,
    //             estado: 'facturado',
    //             total: totalFacturado
    //         };
    //         actualizarCuadrante(cuadranteAGuardar);
    //         dispatch({
    //             type: ITERACION_XLS_EXITO,
    //             payload: {
    //                 elementoArray1: dataFAC,
    //                 elementoArray2: dataLFA
    //             }
    //         });
    //     });
    // } catch (error) {
    //     dispatch({
    //         type: ERROR_DE_CARGA_CONFIGURACION
    //     })
    // }
}

export const finalizarArchivosXLSLoteAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FINALIZANDO_LOTE,
        payload: {
            estado: estado
        }
    });
}

export const emitirArchivosXLSLoteAccion = (laDataFAC, laDataLFA) => (dispatch, getState) => {
    exportarAExcel(laDataFAC[0], 'FAC');
    exportarAExcel(laDataLFA[0], 'LFA');
    dispatch({
        type: GENERAR_ARCHIVOS_EXITO
    });
    dispatch({
        type: RESETEA_EXITO_CONFIGURACION
    });
}

export const isNumeric = (num) => {
    return (num >= 0 || num < 0);
};