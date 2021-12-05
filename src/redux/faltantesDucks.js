import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingFaltantes: false,
    trabajadoresFaltantesArray: [],
    errorDeCargaNominasFaltantes: false,
    numeroNominasFaltantes: null,
    estadoVenimosDeFaltantes: false,
    forzarRecargaFaltantes: false
};

//types
const LOADING_FALTANTES = 'LOADING_FALTANTES';
const OBTENER_NOMINA_FALTANTE = 'OBTENER_NOMINA_FALTANTE';
const ERROR_DE_CARGA_NOMINAS_FALTANTES = 'ERROR_DE_CARGA_NOMINAS_FALTANTES';
const VENIMOS_DE_FALTANTES = 'VENIMOS_DE_FALTANTES';
const FORZAR_RECARGA_FALTANTES = 'FORZAR_RECARGA_FALTANTES';

//reducer
export default function faltantesReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_FALTANTES:
            return { ...state, loadingFaltantes: true }
        case OBTENER_NOMINA_FALTANTE:
            return { ...state, trabajadoresFaltantesArray: [...state.trabajadoresFaltantesArray, action.payload.elementoArray], numeroNominasFaltantes: action.payload.contador, loadingFaltantes: false }
        case ERROR_DE_CARGA_NOMINAS_FALTANTES:
            return { ...state, errorDeCargaNominasFaltantes: true, loadingFaltantes: false }
        case VENIMOS_DE_FALTANTES:
            return { ...state, estadoVenimosDeFaltantes: action.payload.estado }
        case FORZAR_RECARGA_FALTANTES:
            return { ...state, forzarRecargaFaltantes: action.payload.estado, trabajadoresFaltantesArray: [] }
        default:
            return { ...state }
    }
}

//acciones


export const venimosDeFaltantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_FALTANTES,
        payload: {
            estado: estado
        }
    });
}

export const forzarRecargaFaltantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FORZAR_RECARGA_FALTANTES,
        payload: {
            estado: estado
        }
    });
}