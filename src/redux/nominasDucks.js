import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingNominas: false,
    errorDeCargaNominas: false,
    calendarioAGestionarNominas: '',
    esInicioNominas: true,
};

//types
const LOADING_NOMINAS = 'LOADING_NOMINAS';
const ERROR_DE_CARGA_NOMINAS = 'ERROR_DE_CARGA_NOMINAS';
const SET_CALENDARIO_A_GESTIONAR_NOMINAS = 'SET_CALENDARIO_A_GESTIONAR_NOMINAS';
const CAMBIO_ESTADO_INICIO_NOMINAS = 'CAMBIO_ESTADO_INICIO_NOMINAS';

//reducer
export default function nominasReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_NOMINAS:
            return { ...state, loadingNominas: true }
        case ERROR_DE_CARGA_NOMINAS:
            return { ...state, errorDeCargaNominas: true, loadingNominas: false }
        case SET_CALENDARIO_A_GESTIONAR_NOMINAS:
            return { ...state, calendarioAGestionarNominas: action.payload.valor }
        case CAMBIO_ESTADO_INICIO_NOMINAS:
            return { ...state, esInicioNominas: action.payload.estado }
        default:
            return { ...state }
    }
}

//acciones

export const setCalendarioAGestionarNominasAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_CALENDARIO_A_GESTIONAR_NOMINAS,
        payload: {
            valor: valor
        }
    });
}

export const cambioEstadoInicioNominasAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: CAMBIO_ESTADO_INICIO_NOMINAS,
        payload: {
            estado: estado
        }
    });
}