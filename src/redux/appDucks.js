import axios from 'axios';
import Constantes from "../constantes";
import * as XLSX from "xlsx";
import { stringify } from 'zipson';

//constantes
const rutaApi = Constantes.RUTA_API;
const meses = Constantes.MESES;
const fileExtension = ".xlsx";

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
    controladores: [],
    cuadrantesIteradosActualizar: [],
};

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
const SET_CUADRANTESITERADOSACTUALIZAR = 'SET_CUADRANTESITERADOSACTUALIZAR';

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
        case SET_CUADRANTESITERADOSACTUALIZAR:
            return { ...state, cuadrantesIteradosActualizar: [...state.cuadrantesIteradosActualizar, action.payload.elementoArray3] }
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
    let mesActual = data.getMonth() + 1;
    let mes = mesActual + numeroDias;
    let any = data.getFullYear();
    if (mes > 12) {
        let diferencia = (12 - mesActual);
        mes = (numeroDias - diferencia);
        any += 1;
    };
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

export const retornaTextoConceptoServicioAccion = (objetoTotales, servicio, horas) => (dispatch, getState) => {
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
        if (servicio === 'C4T') {
            arrayConceptos.push('CRCUA', 'LIMPIEZA DE CRISTALES CUATRIMESTRAL');
        };
        if (servicio === 'EST') {
            arrayConceptos.push('LIME', 'SERVICIO DE LIMPIEZA ESPECIAL');
        };
        if (servicio === 'PAT') {
            arrayConceptos.push('LIMP', 'SERVICIO DE LIMPIEZA DEL PARKING');
        };
        if (servicio === 'FRT') {
            arrayConceptos.push('FRE', 'SERVICIO DE FREGADO DE SUELOS');
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
        if (objetoTotales['C4T']) {
            arrayConceptos.push('LIMPIEZA DE CRISTALES CUATRIMESTRAL');
        };
        if (objetoTotales['EST']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA ESPECIAL');
        };
        if (objetoTotales['PAT']) {
            arrayConceptos.push('SERVICIO DE LIMPIEZA DEL PARKING');
        };
        if (objetoTotales['FRT']) {
            arrayConceptos.push('SERVICIO DE FREGADO DE SUELOS');
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

const retornaArrayElementosAccion = (objetoConceptos) => (dispatch, getState) => {
    let arrayElementos = [];
    let retornoServicios = [];
    if (objetoConceptos.MT) {
        if (objetoConceptos.LH && !objetoConceptos.LPr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'LH'));
        };
        if (objetoConceptos.EH && !objetoConceptos.EPr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'EH'));
        };
        if (objetoConceptos.PH && !objetoConceptos.PPr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'PH'));
        };
        if (objetoConceptos.NH && !objetoConceptos.NPr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'NH'));
        };
        if (objetoConceptos.RH && !objetoConceptos.RPr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'RH'));
        };
        if (objetoConceptos.L1H && !objetoConceptos.L1Pr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'L1H'));
        };
        if (objetoConceptos.L2H && !objetoConceptos.L2Pr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'L2H'));
        };
        if (objetoConceptos.FH && !objetoConceptos.FPr) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', 'FH'));
        };
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.MT, objetoConceptos.MT, 1]);
    };
    if (objetoConceptos.LT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'LT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.LT, objetoConceptos.LPr, objetoConceptos.LH]);
    };
    if (objetoConceptos.ET) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'ET', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.ET, objetoConceptos.EPr, objetoConceptos.EH]);
    };
    if (objetoConceptos.PT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'PT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.PT, objetoConceptos.PPr, objetoConceptos.PH]);
    };
    if (objetoConceptos.NT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'NT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.NT, objetoConceptos.NPr, objetoConceptos.NH]);
    };
    if (objetoConceptos.RT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'RT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.RT, objetoConceptos.RPr, objetoConceptos.RH]);
    };
    if (objetoConceptos.L1T) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'L1T', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.L1T, objetoConceptos.L1Pr, objetoConceptos.L1H]);
    };
    if (objetoConceptos.L2T) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'L2T', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.L2T, objetoConceptos.L2Pr, objetoConceptos.L2H]);
    };
    if (objetoConceptos.FT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'FT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FT, objetoConceptos.FPr, objetoConceptos.FH]);
    };
    if (objetoConceptos.TOT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'TOT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.TOT, objetoConceptos.TOT, objetoConceptos.TOH]);
    };
    if (objetoConceptos.CRT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'CRT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.CRT, objetoConceptos.CRT, objetoConceptos.CRH]);
    };
    if (objetoConceptos.CET) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'CET', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.CET, objetoConceptos.CET, objetoConceptos.CEH]);
    };
    if (objetoConceptos.CIT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'CIT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.CIT, objetoConceptos.CIT, objetoConceptos.CIH]);
    };
    if (objetoConceptos.MOT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MOT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.MOT, objetoConceptos.MOT, objetoConceptos.MOH]);
    };
    if (objetoConceptos.OFT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'OFT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.OFT, objetoConceptos.OFT, objetoConceptos.OFH]);
    };
    if (objetoConceptos.ALT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'ALT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.ALT, objetoConceptos.ALT, objetoConceptos.ALH]);
    };
    if (objetoConceptos.LAT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'LAT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.LAT, objetoConceptos.LAT, objetoConceptos.LAH]);
    };
    if (objetoConceptos.TET) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'TET', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.TET, objetoConceptos.TET, objetoConceptos.TEH]);
    };
    if (objetoConceptos.FIT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'FIT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FIT, objetoConceptos.FIT, objetoConceptos.FIH]);
    };
    if (objetoConceptos.FET) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'FET', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FET, objetoConceptos.FET, objetoConceptos.FEH]);
    };
    if (objetoConceptos.ABT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'ABT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.ABT, objetoConceptos.ABT, objetoConceptos.ABH]);
    };
    if (objetoConceptos.MAT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MAT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.MAT, objetoConceptos.MAT, objetoConceptos.MAH]);
    };
    if (objetoConceptos.POT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'POT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.POT, objetoConceptos.POT, objetoConceptos.POH]);
    };
    if (objetoConceptos.BAT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'BAT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.BAT, objetoConceptos.BAT, objetoConceptos.BAH]);
    };
    if (objetoConceptos.FTT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'FTT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FTT, objetoConceptos.FTT, objetoConceptos.FTH]);
    };
    if (objetoConceptos.C3T) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'C3T', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.C3T, objetoConceptos.C3T, objetoConceptos.C3H]);
    };
    if (objetoConceptos.C2T) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'C2T', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.C2T, objetoConceptos.C2T, objetoConceptos.C2H]);
    };
    if (objetoConceptos.C4T) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'C4T', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.C4T, objetoConceptos.C4T, objetoConceptos.C4H]);
    };
    if (objetoConceptos.EST) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'EST', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.EST, objetoConceptos.EST, objetoConceptos.ESH]);
    };
    if (objetoConceptos.PAT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'PAT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.PAT, objetoConceptos.PAT, objetoConceptos.PAH]);
    };
    if (objetoConceptos.FRT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'FRT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.FRT, objetoConceptos.FRT, objetoConceptos.FRH]);
    };
    if (objetoConceptos.NUMCT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'NUMCT', null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], 0, 0, 0]);
    };
    return arrayElementos
};

export const generarArchivosXLSAccion = (numFactusol, objetoConceptos, anyo, mes) => async (dispatch, getState) => {
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
            telefono: objetoConceptos.telefono,
            mail: objetoConceptos.mail,
            total: parseFloat(objetoConceptos.total).toFixed(2),
            totalIva: parseFloat(objetoConceptos.totalIva).toFixed(2),
            totalMasIva: parseFloat(objetoConceptos.totalMasIva).toFixed(2)
        };
        const ultimoDia = new Date(anyo, mes, 0);
        const day = ultimoDia.getDate();
        const fechaHoy = day + "/" + mes + "/" + anyo;
        const dataFAC = [[
            1,
            elNumFactusol,
            '',
            fechaHoy,
            0,
            'GEN',
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
            0,
            objetoCentroParsear.telefono,
            parseFloat(objetoCentroParsear.total),
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
            parseFloat(objetoCentroParsear.total),
            '',
            '',
            21,
            '',
            '',
            parseFloat(objetoCentroParsear.totalIva),
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
            parseFloat(objetoCentroParsear.totalMasIva),
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
        const arrayElementos = dispatch(retornaArrayElementosAccion(objetoConceptos));
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
};

export const actualizarCuadrantesIteradosAccion = () => async (dispatch, getState) => {
    const { usuarioActivo } = getState().variablesUsuario;
    const { cuadrantesIteradosActualizar } = getState().variablesApp;
    let fechaHoy = new Date().toLocaleString() + '';
    let laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
    const datos = {
        actualizacion: laFirmaActualizacion,
        estado: 'facturado',
        arrayCuadrantes: cuadrantesIteradosActualizar,
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
        if(res.data)
        return new Promise((resolve, reject) => {
            resolve({ payload: true });
        });
    } catch (err) {
        console.error(err)
    };
};

export const generarArchivosXLSLoteAccion = (numFactusol, arrayCuadrantes, anyo, mes) => (dispatch, getState) => {
    dispatch({
        type: PROCESANDO_LOTE
    });
    const elNumFactusol = parseInt(numFactusol) + 1;
    try {
        const dataFAC = [];
        const dataLFA = [];
        arrayCuadrantes.map((cuadranteIterado, index, arr) => {
            const objetoCentroParsear = {
                nombre: cuadranteIterado.total.nombreCentro,
                codigo: cuadranteIterado.total.codigo,
                domicilio: cuadranteIterado.total.domicilio,
                codigoPostal: cuadranteIterado.total.codigoPostal,
                poblacion: cuadranteIterado.total.poblacion,
                provincia: cuadranteIterado.total.provincia,
                nif: cuadranteIterado.total.nif,
                formaPago: cuadranteIterado.total.formaPago,
                telefono: cuadranteIterado.total.telefono,
                mail: cuadranteIterado.total.mail,
                total: parseFloat(cuadranteIterado.total.total).toFixed(2),
                totalIva: parseFloat(cuadranteIterado.total.totalIva).toFixed(2),
                totalMasIva: parseFloat(cuadranteIterado.total.totalMasIva).toFixed(2)
            };
            const ultimoDia = new Date(anyo, mes, 0);
            const day = ultimoDia.getDate();
            const fechaHoy = day + "/" + mes + "/" + anyo;
            dataFAC.push([
                1,
                elNumFactusol + index,
                '',
                fechaHoy,
                0,
                'GEN',
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
                0,
                objetoCentroParsear.telefono,
                parseFloat(objetoCentroParsear.total),
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
                parseFloat(objetoCentroParsear.total),
                '',
                '',
                21,
                '',
                '',
                parseFloat(objetoCentroParsear.totalIva),
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
                parseFloat(objetoCentroParsear.totalMasIva),
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
            ]);
            const arrayElementos = dispatch(retornaArrayElementosAccion(cuadranteIterado.total));
            arrayElementos.forEach((elemento, index2) => {
                dataLFA.push([
                    1,
                    elNumFactusol + index,
                    index2 + 1,
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
            let elTotalActualizado = { ...cuadranteIterado.total };
            elTotalActualizado.procesado.valor = 'si';
            elTotalActualizado.procesado.numF = elNumFactusol + index;
            const options = { fullPrecisionFloats: true };
            dispatch({
                type: SET_CUADRANTESITERADOSACTUALIZAR,
                payload: {
                    elementoArray3: {
                        id: cuadranteIterado.id,
                        total: stringify(elTotalActualizado, options)
                    }
                }
            });
            dispatch({
                type: ITERACION_XLS_EXITO,
                payload: {
                    elementoArray1: dataFAC,
                    elementoArray2: dataLFA
                }
            });
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const finalizarArchivosXLSLoteAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FINALIZANDO_LOTE,
        payload: {
            estado: estado
        }
    });
};

export const emitirArchivosXLSLoteAccion = (laDataFAC, laDataLFA) => (dispatch, getState) => {
    exportarAExcel(laDataFAC[0], 'FAC');
    exportarAExcel(laDataLFA[0], 'LFA');
    dispatch({
        type: GENERAR_ARCHIVOS_EXITO
    });
    dispatch({
        type: RESETEA_EXITO_CONFIGURACION
    });
};

export const isNumeric = (num) => {
    return (num >= 0 || num < 0);
};

export const generaArchivoXLSCentrosAccion = () => (dispatch, getState) => {
    const { arrayCentros } = getState().variablesCentros;
    let elListadoCentros = [];
    arrayCentros.forEach((centro) => {
        let categoriasCentro = [];
        let elObjetoCentro = { ...centro };
        centro.categoria.forEach((cat) => {
            switch (cat) {
                case 1:
                    categoriasCentro.push('Barcelona');
                    break;
                case 2:
                    categoriasCentro.push('Comunidades de pisos');
                    break;
                case 3:
                    categoriasCentro.push('Farmacias');
                    break;
                case 4:
                    categoriasCentro.push('Fuera de Barcelona');
                    break;
                case 5:
                    categoriasCentro.push('Pisos');
                    break;
                case 6:
                    categoriasCentro.push('Residencias');
                    break;
                default:
            }
        });
        let categoriasCentroStr = categoriasCentro.toString();
        elObjetoCentro.categoria = categoriasCentroStr;
        elListadoCentros.push(elObjetoCentro);
    });
    elListadoCentros.sort((a, b) => a.categoria.localeCompare(b.categoria));
    const elListadoCentrosImprimir = [["LISTADO CENTROS"], ["CENTRO", "CATEGORÍA", "ESTADO"]];
    elListadoCentros.forEach((centro) => {
        elListadoCentrosImprimir.push([centro.nombre, centro.categoria, centro.estado]);
    });
    exportarAExcel(elListadoCentrosImprimir, 'listado_centros');
};

export const generaArchivoXLSTrabajadoresAccion = () => (dispatch, getState) => {
    const { arrayTrabajadores } = getState().variablesTrabajadores;
    const elListadoTrabajadoresImprimir = [["LISTADO TRABAJADORES"], ["NOMBRE TRABAJADOR", "ESTADO"]];
    arrayTrabajadores.forEach((trabajador) => {
        elListadoTrabajadoresImprimir.push([trabajador.nombre, trabajador.estado]);
    });
    exportarAExcel(elListadoTrabajadoresImprimir, 'listado_trabajadores');
};

export const generaArchivoXLSCuadrantesPendientesAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesPendientesArray } = getState().variablesPendientes;
    const { arrayCentros } = getState().variablesCentros;
    const elListadoCuadrantesPendientesImprimir = [["LISTADO CUADRANTES PENDIENTES MES " + mes], ["CENTRO"]];
    arrayCentros.forEach((centro) => {
        if (cuadrantesPendientesArray.includes(centro.id)) {
            elListadoCuadrantesPendientesImprimir.push([centro.sub_nombre ? (centro.nombre + " - " + centro.sub_nombre) : centro.nombre]);
        };
    });
    const nombreArchivo = 'listado_cuadrantes_pendientes_' + mes;
    exportarAExcel(elListadoCuadrantesPendientesImprimir, nombreArchivo);
};

export const generaArchivoXLSCuadrantesRegistradosAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesRegistradosArray } = getState().variablesPendientes;
    let cuadrantes = [];
    cuadrantesRegistradosArray.forEach((cuadrante, index) => {
        let objeto = {};
        objeto['nombreCentro'] = cuadrante.total.subNombreCentro ? (cuadrante.total.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.total.nombreCentro;
        objeto['tocaFacturar'] = cuadrante.total.tocaFacturar.valor;
        objeto['razon'] = cuadrante.total.tocaFacturar.razon;
        objeto['total'] = parseFloat(cuadrante.total.total).toFixed(2) + ' €';
        objeto['totalMasIva'] = parseFloat(cuadrante.total.totalMasIva).toFixed(2) + ' €';
        cuadrantes.push(objeto);
    });
    cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
    const elListadoCuadrantesFacturadosImprimir = [["LISTADO CUADRANTES REGISTRADOS MES " + mes], ["CENTRO", "TOCA FACTURAR", "RAZÓN", "TOTAL", "TOTAL + IVA"]];
    cuadrantes.forEach((cuadrante) => {
        elListadoCuadrantesFacturadosImprimir.push([cuadrante.nombreCentro, cuadrante.tocaFacturar, cuadrante.razon, cuadrante.total, cuadrante.totalMasIva]);
    });
    const nombreArchivo = 'listado_cuadrantes_registrados_' + mes;
    exportarAExcel(elListadoCuadrantesFacturadosImprimir, nombreArchivo);
};

export const generaArchivoXLSCuadrantesFacturadosEmpresasAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesFacturadosArray } = getState().variablesPendientes;
    let cuadrantes = [];
    cuadrantesFacturadosArray.forEach((cuadrante, index) => {
        let objeto = {};
        if (cuadrante.total.tocaFacturar.valor === 'si') {
            objeto['nombreCentro'] = cuadrante.total.subNombreCentro ? (cuadrante.total.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.total.nombreCentro;
            objeto['tocaFacturar'] = cuadrante.total.tocaFacturar.valor;
            objeto['razon'] = cuadrante.total.tocaFacturar.razon;
            objeto['procesado'] = cuadrante.total.procesado.valor;
            if (cuadrante.total.procesado.valor === "si") {
                if (cuadrante.total.procesado.numF) {
                    objeto['numero'] = "Número factura: " + cuadrante.total.procesado.numF;
                } else {
                    objeto['numero'] = "";
                };
            };
            objeto['total'] = parseFloat(cuadrante.total.total).toFixed(2) + ' €';
            objeto['totalMasIva'] = parseFloat(cuadrante.total.totalMasIva).toFixed(2) + ' €';
            cuadrantes.push(objeto);
        };
    });
    cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
    const elListadoCuadrantesFacturadosImprimir = [["LISTADO CUADRANTES FACTURADOS EMPRESAS MES " + mes], ["CENTRO", "TOCA FACTURAR", "RAZÓN", "EMITIDO", "NÚMERO FACTURA", "TOTAL", "TOTAL + IVA"]];
    cuadrantes.forEach((cuadrante) => {
        elListadoCuadrantesFacturadosImprimir.push([cuadrante.nombreCentro, cuadrante.tocaFacturar, cuadrante.razon, cuadrante.procesado, cuadrante.numero, cuadrante.total, cuadrante.totalMasIva]);
    });
    const nombreArchivo = 'listado_cuadrantes_facturados_empresas_' + mes;
    exportarAExcel(elListadoCuadrantesFacturadosImprimir, nombreArchivo);
};

export const generaArchivoXLSCuadrantesFacturadosPisosAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesFacturadosArray } = getState().variablesPendientes;
    let cuadrantes = [];
    cuadrantesFacturadosArray.forEach((cuadrante, index) => {
        let objeto = {};
        if (cuadrante.total.tocaFacturar.valor === 'no' && cuadrante.total.tocaFacturar.razon === 'gest') {
            objeto['nombreCentro'] = cuadrante.total.subNombreCentro ? (cuadrante.total.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.total.nombreCentro;
            objeto['tocaFacturar'] = cuadrante.total.tocaFacturar.valor;
            objeto['razon'] = cuadrante.total.tocaFacturar.razon;
            objeto['procesado'] = cuadrante.total.procesado.valor;
            if (cuadrante.total.procesado.valor === "si") {
                if (cuadrante.total.procesado.numR) {
                    objeto['numero'] = "Número recibo: " + cuadrante.total.procesado.numR;
                } else {
                    objeto['numero'] = "";
                };
            };
            objeto['total'] = parseFloat(cuadrante.total.total).toFixed(2) + ' €';
            cuadrantes.push(objeto);
        };
    });
    cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
    const elListadoCuadrantesFacturadosImprimir = [["LISTADO CUADRANTES FACTURADOS PISOS MES " + mes], ["CENTRO", "TOCA FACTURAR", "RAZÓN", "EMITIDO", "NÚMERO RECIBO", "TOTAL"]];
    cuadrantes.forEach((cuadrante) => {
        elListadoCuadrantesFacturadosImprimir.push([cuadrante.nombreCentro, cuadrante.tocaFacturar, cuadrante.razon, cuadrante.procesado, cuadrante.numero, cuadrante.total]);
    });
    const nombreArchivo = 'listado_cuadrantes_facturados_pisos_' + mes;
    exportarAExcel(elListadoCuadrantesFacturadosImprimir, nombreArchivo);
};