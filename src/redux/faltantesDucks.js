import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingFaltantes: false,
    nominasFaltantesArray: [],
    nominasRegistradasArray: [],
    nominasEmitidasArray: [],
    errorDeCargaNominasFaltantes: false,
    numeroNominasFaltantes: null,
    numeroNominasRegistradas: null,
    numeroNominasEmitidas: null,
    estadoVenimosDeFaltantes: false,
    estadoVenimosDeRegistradosFaltantes: false
};

//types
const LOADING_FALTANTES = 'LOADING_FALTANTES';
const OBTENER_NOMINA_FALTANTE = 'OBTENER_NOMINA_FALTANTE';
const ERROR_DE_CARGA_NOMINAS_FALTANTES = 'ERROR_DE_CARGA_NOMINAS_FALTANTES';
const VENIMOS_DE_FALTANTES = 'VENIMOS_DE_FALTANTES';
const VACIAR_DATOS_FALTANTES = 'VACIAR_DATOS_FALTANTES';
const OBTENER_NOMINA_REGISTRADA = 'OBTENER_NOMINA_REGISTRADA';
const OBTENER_NOMINA_EMITIDA = 'OBTENER_NOMINA_EMITIDA';
const CLOSE_LOADING_FALTANTES = 'CLOSE_LOADING_FALTANTES';
const VENIMOS_DE_REGISTRADOS_FALTANTES = 'VENIMOS_DE_REGISTRADOS_FALTANTES';

//reducer
export default function faltantesReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_FALTANTES:
            return { ...state, loadingFaltantes: true }
        case OBTENER_NOMINA_FALTANTE:
            return { ...state, nominasFaltantesArray: [...state.nominasFaltantesArray, action.payload.elementoArray], numeroNominasFaltantes: action.payload.contador, loadingFaltantes: false }
        case OBTENER_NOMINA_REGISTRADA:
            return { ...state, nominasRegistradasArray: [...state.nominasRegistradasArray, action.payload.elementoArray], numeroNominasRegistradas: action.payload.contador, loadingFaltantes: false }
        case OBTENER_NOMINA_EMITIDA:
            return { ...state, nominasEmitidasArray: [...state.nominasEmitidasArray, action.payload.elementoArray], numeroNominasEmitidas: action.payload.contador, loadingFaltantes: false }
        case ERROR_DE_CARGA_NOMINAS_FALTANTES:
            return { ...state, errorDeCargaNominasFaltantes: true, loadingFaltantes: false }
        case VENIMOS_DE_FALTANTES:
            return { ...state, estadoVenimosDeFaltantes: action.payload.estado }
        case VACIAR_DATOS_FALTANTES:
            return { ...state, nominasFaltantesArray: [], nominasRegistradasArray: [], nominasEmitidasArray: [], numeroNominasFaltantes: null, numeroNominasRegistradas: null, numeroNominasEmitidas: null }
        case CLOSE_LOADING_FALTANTES:
            return { ...state, loadingFaltantes: false }
        case VENIMOS_DE_REGISTRADOS_FALTANTES:
            return { ...state, estadoVenimosDeRegistradosFaltantes: action.payload.estado }
        default:
            return { ...state }
    }
}

//acciones

export const obtenerNominasFaltantesAccion = (objeto, mes, arrayTrabajadores) => (dispatch, getState) => {
    dispatch({
        type: LOADING_FALTANTES
    });
    try {
        let contadorFaltantes = 0;
        arrayTrabajadores.forEach(async (trabajadorIterado, index, arr) => {
            const nombreNomina = mes + '-' + trabajadorIterado.id;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("id", nombreNomina);
            let apiUrl = rutaApi + "obtener_pendientes.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res.data === false) {
                contadorFaltantes++;
                dispatch({
                    type: OBTENER_NOMINA_FALTANTE,
                    payload: {
                        elementoArray: trabajadorIterado.id,
                        contador: contadorFaltantes
                    }
                })
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NOMINAS_FALTANTES
        })
    } finally {
        dispatch({
            type: CLOSE_LOADING_FALTANTES
        });
    }
}

export const obtenerNominasRegistradasEmitidasAccion = (objeto, mes, arrayTrabajadores) => (dispatch, getState) => {
    dispatch({
        type: LOADING_FALTANTES
    });
    try {
        let contadorRegistradas = 0;
        let contadorEmitidas = 0;
        arrayTrabajadores.forEach(async (trabajadorIterado, index, arr) => {
            const nombreNomina = mes + '-' + trabajadorIterado.id;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("id", nombreNomina);
            let apiUrl = rutaApi + "obtener_pendientes.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res.data.estado === 'registrado') {
                contadorRegistradas++;
                dispatch({
                    type: OBTENER_NOMINA_REGISTRADA,
                    payload: {
                        elementoArray: res.data,
                        contador: contadorRegistradas
                    }
                })
            };
            if (res.data.estado === 'emitido') {
                contadorEmitidas++;
                dispatch({
                    type: OBTENER_NOMINA_EMITIDA,
                    payload: {
                        elementoArray: res.data,
                        contador: contadorEmitidas
                    }
                })
            };
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NOMINAS_FALTANTES
        });
    } finally {
        dispatch({
            type: CLOSE_LOADING_FALTANTES
        });
    }
}

export const venimosDeFaltantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_FALTANTES,
        payload: {
            estado: estado
        }
    });
}

export const venimosDeRegistradosFaltantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_REGISTRADOS_FALTANTES,
        payload: {
            estado: estado
        }
    });
}

export const vaciarDatosFaltantesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_FALTANTES,
    });
}