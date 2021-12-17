import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingPendientes: false,
    cuadrantesPendientesArray: [],
    cuadrantesRegistradosArray: [],
    cuadrantesFacturadosArray: [],
    errorDeCargaCuadrantesPendientes: false,
    numeroCuadrantesPendientes: null,
    numeroCuadrantesRegistrados: null,
    numeroCuadrantesFacturados: null,
    estadoVenimosDePendientes: false,
    estadoVenimosDeRegistrados: false
};

//types
const LOADING_PENDIENTES = 'LOADING_PENDIENTES';
const OBTENER_CUADRANTE_PENDIENTE = 'OBTENER_CUADRANTE_PENDIENTE';
const ERROR_DE_CARGA_CUADRANTES_PENDIENTES = 'ERROR_DE_CARGA_CUADRANTES_PENDIENTES';
const VENIMOS_DE_PENDIENTES = 'VENIMOS_DE_PENDIENTES';
const VACIAR_DATOS_PENDIENTES = 'VACIAR_DATOS_PENDIENTES';
const OBTENER_CUADRANTE_REGISTRADO = 'OBTENER_CUADRANTE_REGISTRADO';
const OBTENER_CUADRANTE_FACTURADO = 'OBTENER_CUADRANTE_FACTURADO';
const CLOSE_LOADING_PENDIENTES = 'CLOSE_LOADING_PENDIENTES';
const VENIMOS_DE_REGISTRADOS = 'VENIMOS_DE_REGISTRADOS';

//reducer
export default function pendientesReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_PENDIENTES:
            return { ...state, loadingPendientes: true }
        case OBTENER_CUADRANTE_PENDIENTE:
            return { ...state, cuadrantesPendientesArray: [...state.cuadrantesPendientesArray, action.payload.elementoArray], numeroCuadrantesPendientes: action.payload.contador }
        case OBTENER_CUADRANTE_REGISTRADO:
            return { ...state, cuadrantesRegistradosArray: [...state.cuadrantesRegistradosArray, action.payload.elementoArray], numeroCuadrantesRegistrados: action.payload.contador }
        case OBTENER_CUADRANTE_FACTURADO:
            return { ...state, cuadrantesFacturadosArray: [...state.cuadrantesFacturadosArray, action.payload.elementoArray], numeroCuadrantesFacturados: action.payload.contador }
        case ERROR_DE_CARGA_CUADRANTES_PENDIENTES:
            return { ...state, errorDeCargaCuadrantesPendientes: true, loadingPendientes: false }
        case VENIMOS_DE_PENDIENTES:
            return { ...state, estadoVenimosDePendientes: action.payload.estado }
        case VACIAR_DATOS_PENDIENTES:
            return { ...state, cuadrantesPendientesArray: [], cuadrantesRegistradosArray: [], cuadrantesFacturadosArray: [], numeroCuadrantesPendientes: null, numeroCuadrantesRegistrados: null, numeroCuadrantesFacturados: null }
        case CLOSE_LOADING_PENDIENTES:
            return { ...state, loadingPendientes: false }
        case VENIMOS_DE_REGISTRADOS:
            return { ...state, estadoVenimosDeRegistrados: action.payload.estado }
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
        let contadorPendientes = 0;
        arrayCentros.forEach(async (centroIterado, index, arr) => {
            const nombreCuadrante = mes + '-' + centroIterado.id;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("id", nombreCuadrante);
            let apiUrl = rutaApi + "obtener_pendientes.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res.data === false) {
                contadorPendientes++;
                dispatch({
                    type: OBTENER_CUADRANTE_PENDIENTE,
                    payload: {
                        elementoArray: centroIterado.id,
                        contador: contadorPendientes
                    }
                })
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES_PENDIENTES
        });
    } finally {
        dispatch({
            type: CLOSE_LOADING_PENDIENTES
        });
    }
}

export const obtenerCuadrantesRegistradosFacturadosAccion = (objeto, mes, arrayCentros) => (dispatch, getState) => {
    dispatch({
        type: LOADING_PENDIENTES
    });
    try {
        let contadorRegistrados = 0;
        let contadorFacturados = 0;
        arrayCentros.forEach(async (centroIterado, index, arr) => {
            const nombreCuadrante = mes + '-' + centroIterado.id;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("id", nombreCuadrante);
            let apiUrl = rutaApi + "obtener_pendientes.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res.data.estado === 'registrado') {
                contadorRegistrados++;
                dispatch({
                    type: OBTENER_CUADRANTE_REGISTRADO,
                    payload: {
                        elementoArray: {
                            id: res.data.id,
                            nombre: res.data.nombre,
                            actualizacion: res.data.actualizacion,
                            estado: res.data.estado,
                            total: res.data.total,
                            horas: JSON.parse(res.data.horas)
                        },
                        contador: contadorRegistrados
                    }
                })
            };
            if (res.data.estado === 'facturado') {
                contadorFacturados++;
                dispatch({
                    type: OBTENER_CUADRANTE_FACTURADO,
                    payload: {
                        elementoArray: {
                            id: res.data.id,
                            nombre: res.data.nombre,
                            actualizacion: res.data.actualizacion,
                            estado: res.data.estado,
                            total: res.data.total,
                            horas: JSON.parse(res.data.horas)
                        },
                        contador: contadorFacturados
                    }
                })
            } 
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES_PENDIENTES
        });
    } finally {
        dispatch({
            type: CLOSE_LOADING_PENDIENTES
        });
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

export const venimosDeRegistradosAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_REGISTRADOS,
        payload: {
            estado: estado
        }
    });
}

export const vaciarDatosPendientesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_PENDIENTES,
    });
}