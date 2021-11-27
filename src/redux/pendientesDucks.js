import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingPendientes: false,
    centrosPendientesArray: [],
    errorDeCargaCuadrantesPendientes: false,
    numeroCentrosPendientes: null,
    estadoVenimosDePendientes: false,
    forzarRecarga: false
};

//types
const LOADING_PENDIENTES = 'LOADING_PENDIENTES';
const OBTENER_CUADRANTE_PENDIENTE = 'OBTENER_CUADRANTE_PENDIENTE';
const ERROR_DE_CARGA_CUADRANTES_PENDIENTES = 'ERROR_DE_CARGA_CUADRANTES_PENDIENTES';
const VENIMOS_DE_PENDIENTES = 'VENIMOS_DE_PENDIENTES';
const FORZAR_RECARGA = 'FORZAR_RECARGA';

//reducer
export default function pendientesReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_PENDIENTES:
            return { ...state, loadingPendientes: true }
        case OBTENER_CUADRANTE_PENDIENTE:
            return { ...state, centrosPendientesArray: [...state.centrosPendientesArray, action.payload.elementoArray], numeroCentrosPendientes: action.payload.contador }
        case ERROR_DE_CARGA_CUADRANTES_PENDIENTES:
            return { ...state, errorDeCargaCuadrantesPendientes: true, loadingPendientes: false }
        case VENIMOS_DE_PENDIENTES:
            return { ...state, estadoVenimosDePendientes: action.payload.estado }
        case FORZAR_RECARGA:
            return { ...state, forzarRecarga: action.payload.estado, centrosPendientesArray: [] }
        default:
            return { ...state }
    }
}

//acciones

export const obtenerCuadrantesPendientesAccion = (objeto, mes, arrayCentros) => (dispatch, getState) => {
    dispatch({
        type: LOADING_PENDIENTES
    });
    try {
        let contador = 0;
        arrayCentros.forEach(async (centroIterado, index, arr) => {
            const nombreCuadrante = mes + '-' + centroIterado.id;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("id", nombreCuadrante);
            let apiUrl = rutaApi + "obtener.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res.data === false) {
                contador++;
                dispatch({
                    type: OBTENER_CUADRANTE_PENDIENTE,
                    payload: {
                        elementoArray: centroIterado.id,
                        contador: contador
                    }
                })
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES_PENDIENTES
        })
    }
}

export const venimosDePendientesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_PENDIENTES,
        payload: {
            estado: estado
        }
    });
}

export const forzarRecargaAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FORZAR_RECARGA,
        payload: {
            estado: estado
        }
    });
}