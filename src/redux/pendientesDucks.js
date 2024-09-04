import axios from 'axios';
import Constantes from "../constantes";
import { parse } from 'zipson';

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
    numeroCuadrantesBaja: null,
    estadoVenimosDePendientes: false,
    estadoVenimosDeRegistrados: false,
    arrayCuadantes: null
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
const OBTENER_CUADRANTES = 'OBTENER_CUADRANTES';
const OBTENER_CUADRANTE_BAJA = 'OBTENER_CUADRANTE_BAJA';

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
            return { ...state, arrayCuadantes: null, cuadrantesPendientesArray: [], cuadrantesRegistradosArray: [], cuadrantesFacturadosArray: [], numeroCuadrantesPendientes: null, numeroCuadrantesRegistrados: null, numeroCuadrantesFacturados: null }
        case CLOSE_LOADING_PENDIENTES:
            return { ...state, loadingPendientes: false }
        case VENIMOS_DE_REGISTRADOS:
            return { ...state, estadoVenimosDeRegistrados: action.payload.estado }
        case OBTENER_CUADRANTES:
            return { ...state, arrayCuadantes: action.payload.array }
        case OBTENER_CUADRANTE_BAJA:
            return { ...state, numeroCuadrantesBaja: action.payload.contador }
        default:
            return { ...state }
    }
}

//acciones

export const gestionaCuadrantesAccion = () => (dispatch, getState) => {
    const { arrayCuadantes } = getState().variablesPendientes;
    const { arrayCentros } = getState().variablesCentros;
    let contadorPendientes = 0, contadorRegistrados = 0, contadorFacturados = 0, contadorBajas = 0;
    arrayCentros.forEach(centro => {
        const cuadranteEncontrado = arrayCuadantes.find(cuadrante => {
            if (cuadrante && cuadrante.total && centro.estado !== "baja") {
                const totalDeserializado = parse(cuadrante.total);
                if (totalDeserializado.nombreCentro === centro.nombre && totalDeserializado?.subNombreCentro === centro?.sub_nombre) {
                    return cuadrante;
                }
            }
            return undefined;
        });
        if (cuadranteEncontrado) {
            const tipoCuadrante = cuadranteEncontrado.estado === 'registrado' ? 'REGISTRADO' : 'FACTURADO';
            const contador = tipoCuadrante === 'REGISTRADO' ? ++contadorRegistrados : ++contadorFacturados;
            const elementoArray = {
                id: cuadranteEncontrado.id,
                nombre: cuadranteEncontrado.nombre,
                actualizacion: cuadranteEncontrado.actualizacion,
                estado: cuadranteEncontrado.estado,
                total: parse(cuadranteEncontrado.total),
            };
            dispatch({
                type: `OBTENER_CUADRANTE_${tipoCuadrante}`,
                payload: {
                    elementoArray,
                    contador,
                },
            });
        } else {
            if (centro.estado !== 'baja') {
                dispatch({
                    type: OBTENER_CUADRANTE_PENDIENTE,
                    payload: {
                        elementoArray: centro.id,
                        contador: ++contadorPendientes,
                    },
                });
            } else {
                dispatch({
                    type: OBTENER_CUADRANTE_BAJA,
                    payload: {
                        contador: ++contadorBajas,
                    },
                });
            }
        }
    });
};

export const obtenerCuadrantesAccion = (objeto, mes) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_PENDIENTES
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("datos", mes);
        let apiUrl = rutaApi + "obtener_pendientes.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: OBTENER_CUADRANTES,
            payload: {
                array: res.data
            }
        });
    } catch (err) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES_PENDIENTES
        });
    } finally {
        dispatch({
            type: CLOSE_LOADING_PENDIENTES
        });
    }
};

export const venimosDePendientesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_PENDIENTES,
        payload: {
            estado: estado
        }
    });
};

export const venimosDeRegistradosAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_REGISTRADOS,
        payload: {
            estado: estado
        }
    });
};

export const vaciarDatosPendientesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_PENDIENTES,
    });
};