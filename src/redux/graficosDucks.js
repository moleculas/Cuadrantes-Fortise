import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingGraficosCuadrantes: false,
    errorDeCargaGraficosCuadrantes: false,
    estadoVenimosDeGraficosCuadrantes: false,
    forzarRecargaGraficosCuadrantes: false,
    cuadrantesPorAnyoGraficos: []
};

//types
const LOADING_GRAFICOS_CUADRANTES = 'LOADING_GRAFICOS_CUADRANTES';
const ERROR_DE_CARGA_GRAFICOS_CUADRANTES = 'ERROR_DE_CARGA_GRAFICOS_CUADRANTES';
const VENIMOS_DE_GRAFICOS_CUADRANTES = 'VENIMOS_DE_GRAFICOS_CUADRANTES';
const FORZAR_RECARGA_GRAFICOS_CUADRANTES = 'FORZAR_RECARGA_GRAFICOS_CUADRANTES';
const OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO = 'OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO';

//reducer
export default function graficosReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_GRAFICOS_CUADRANTES:
            return { ...state, loadingGraficosCuadrantes: true }
        case ERROR_DE_CARGA_GRAFICOS_CUADRANTES:
            return { ...state, errorDeCargaGraficosCuadrantes: true, loadingGraficosCuadrantes: false }
        case VENIMOS_DE_GRAFICOS_CUADRANTES:
            return { ...state, estadoVenimosDeGraficosCuadrantes: action.payload.estado }
        case FORZAR_RECARGA_GRAFICOS_CUADRANTES:
            return { ...state, forzarRecargaGraficosCuadrantes: action.payload.estado, cuadrantesPorAnyoGraficos: [] }
        case OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO:
            return { ...state, cuadrantesPorAnyoGraficos: action.payload.elementoArray, loadingGraficosCuadrantes: false }
        default:
            return { ...state }
    }
}

//acciones
export const obtenerCuadrantesPorAnyoAccion = (objeto) => (dispatch, getState) => {
    const d = new Date();
    const year = d.getFullYear().toString();
    const arrayMeses = [year + '-1-', year + '-2-', year + '-3-', year + '-4-', year + '-5-', year + '-6-', year + '-7-', year + '-8-', year + '-9-', year + '-10-', year + '-11-', year + '-12-'];
    dispatch({
        type: LOADING_GRAFICOS_CUADRANTES
    });
    try {
        let arrayCuadrantes = [];
        arrayMeses.forEach(async (mesIterado, index, arr) => {
            const nombreCuadrante = mesIterado;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("nombre", nombreCuadrante);
            let apiUrl = rutaApi + "obtener_por_anyo.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });           
            arrayCuadrantes.push(res.data);
            dispatch({
                type: OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO,
                payload: {
                    elementoArray: arrayCuadrantes,
                }
            })
        });
    }
    catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_GRAFICOS_CUADRANTES
        })
    }
}

export const venimosDeGraficosCuadrantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_GRAFICOS_CUADRANTES,
        payload: {
            estado: estado
        }
    });
}

export const forzarRecargaGraficosCuadrantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FORZAR_RECARGA_GRAFICOS_CUADRANTES,
        payload: {
            estado: estado
        }
    });
}