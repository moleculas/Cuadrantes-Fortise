import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const meses = Constantes.MESES;

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
            return { ...state, exitoActualizacionConfiguracion: false }
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