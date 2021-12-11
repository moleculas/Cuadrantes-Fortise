import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingFaltantes: false,
    trabajadoresFaltantesArray: [],
    errorDeCargaNominasFaltantes: false,
    numeroNominasFaltantes: null,
    estadoVenimosDeFaltantes: false
};

//types
const LOADING_FALTANTES = 'LOADING_FALTANTES';
const OBTENER_NOMINA_FALTANTE = 'OBTENER_NOMINA_FALTANTE';
const ERROR_DE_CARGA_NOMINAS_FALTANTES = 'ERROR_DE_CARGA_NOMINAS_FALTANTES';
const VENIMOS_DE_FALTANTES = 'VENIMOS_DE_FALTANTES';
const VACIAR_DATOS_FALTANTES = 'VACIAR_DATOS_FALTANTES';

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
        case VACIAR_DATOS_FALTANTES:
            return { ...state, trabajadoresFaltantesArray: [] }
        default:
            return { ...state }
    }
}

//acciones

export const obtenerTrabajadoresFaltantesAccion = (objeto, mes, arrayTrabajadores) => (dispatch, getState) => {
    dispatch({
        type: LOADING_FALTANTES
    });
    try {
        let contador = 0;
        arrayTrabajadores.forEach(async (trabajadorIterado, index, arr) => {
            const nombreNomina = mes + '-' + trabajadorIterado.id;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("id", nombreNomina);
            let apiUrl = rutaApi + "obtener.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res.data === false) {
                contador++;
                dispatch({
                    type: OBTENER_NOMINA_FALTANTE,
                    payload: {
                        elementoArray: trabajadorIterado.id,
                        contador: contador
                    }
                })
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NOMINAS_FALTANTES
        })
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

export const vaciarDatosFaltantesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_FALTANTES,
    });
}