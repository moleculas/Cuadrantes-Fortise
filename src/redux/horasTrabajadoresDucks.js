import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingHorasTrabajadores: false,
    errorDeCargaHorasTrabajadores: false,
    calendarioAGestionarHorasTrabajadores: '',
    esInicioHorasTrabajadores: true,
    horaTrabajador: null,
    arrayHorasTrabajadores: null,
    estadoVenimosDeListado: false,
    trabajadoresInicio: []
};

//types
const LOADING_HORAS_TRABAJADORES = 'LOADING_HORAS_TRABAJADORES';
const ERROR_DE_CARGA_HORAS_TRABAJADORES = 'ERROR_DE_CARGA_HORAS_TRABAJADORES';
const SET_CALENDARIO_A_GESTIONAR_HORAS_TRABAJADORES = 'SET_CALENDARIO_A_GESTIONAR_HORAS_TRABAJADORES';
const CAMBIO_ESTADO_INICIO_HORAS_TRABAJADORES = 'CAMBIO_ESTADO_INICIO_HORAS_TRABAJADORES';
const SET_HORA_TRABAJADOR = 'SET_HORA_TRABAJADOR';
const OBTENER_HORAS_TRABAJADORES_EXITO = 'OBTENER_HORAS_TRABAJADORES_EXITO';
const VACIAR_DATOS_HORAS_TRABAJADORES = 'VACIAR_DATOS_HORAS_TRABAJADORES';
const VENIMOS_DE_LISTADO = 'VENIMOS_DE_LISTADO';
const SET_TRABAJADORES_INICIO = "SET_TRABAJADORES_INICIO";

//reducer
export default function horasTrabajadoresReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_HORAS_TRABAJADORES:
            return { ...state, loadingHorasTrabajadores: true }
        case ERROR_DE_CARGA_HORAS_TRABAJADORES:
            return { ...state, errorDeCargaHorasTrabajadores: true, loadingHorasTrabajadores: false }
        case SET_CALENDARIO_A_GESTIONAR_HORAS_TRABAJADORES:
            return { ...state, calendarioAGestionarHorasTrabajadores: action.payload.valor }
        case CAMBIO_ESTADO_INICIO_HORAS_TRABAJADORES:
            return { ...state, esInicioHorasTrabajadores: action.payload.estado }
        case OBTENER_HORAS_TRABAJADORES_EXITO:
            return {
                ...state,
                arrayHorasTrabajadores: action.payload.array,
                errorDeCargaHorasTrabajadores: action.payload.errorDeCargaHorasTrabajadores,
                loadingHorasTrabajadores: false,
            }
        case VACIAR_DATOS_HORAS_TRABAJADORES:
            return { ...state, arrayHorasTrabajadores: null, horaTrabajador: null, trabajador: "", esInicioHorasTrabajadores: true }
        case VENIMOS_DE_LISTADO:
            return { ...state, estadoVenimosDeListado: action.payload.estado }
        case SET_HORA_TRABAJADOR:
            return { ...state, horaTrabajador: action.payload.valor }
        case SET_TRABAJADORES_INICIO:
            return { ...state, trabajadoresInicio: action.payload.array }
        default:
            return { ...state }
    }
}

//acciones

export const setTrabajadoresInicioAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_TRABAJADORES_INICIO,
        payload: {
            array: array
        }
    });
}

export const setHoraTrabajadorAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_HORA_TRABAJADOR,
        payload: {
            valor: valor
        }
    });
}

export const venimosDeListadosAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_LISTADO,
        payload: {
            estado: estado
        }
    });
}

export const vaciarDatosHorasTrabajadoresAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_HORAS_TRABAJADORES,
    });
}

export const setCalendarioAGestionarHorasTrabajadoresAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_CALENDARIO_A_GESTIONAR_HORAS_TRABAJADORES,
        payload: {
            valor: valor
        }
    });
}

export const cambioEstadoIniciorHorasTrabajadoresAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: CAMBIO_ESTADO_INICIO_HORAS_TRABAJADORES,
        payload: {
            estado: estado
        }
    });
}

export const obtenerHorasTrabajadoresAccion = (objeto, anyoMes, listadoTrabajadores) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_HORAS_TRABAJADORES
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("anyoMes", anyoMes);
        let apiUrl = rutaApi + "listar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuestaFormateada = res.data.map(item => ({
            id: item.id,
            nombre: item.nombre,
            actualizacion: item.actualizacion,
            trabajador: item.trabajador_id,
            datosHoraTrabajador: JSON.parse(item.datos_hora_trabajador)
        }));
        dispatch({
            type: OBTENER_HORAS_TRABAJADORES_EXITO,
            payload: {
                array: respuestaFormateada,
                errorDeCargaHorasTrabajadores: false,
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_HORAS_TRABAJADORES
        })
    }
}

export const gestionArrayHorasTrabajadoresAccion = () => (dispatch, getState) => {
    const { arrayHorasTrabajadores: listadoHorasTrabajadores } = getState().variablesHorasTrabajadores;
    const { arrayTrabajadores: listadoTrabajadores } = getState().variablesTrabajadores;
    const arrListadoTrabajadores = listadoHorasTrabajadores.map(horaTrabajador => ({
        ...horaTrabajador,
        trabajadorNombre: listadoTrabajadores.find(t => t.id === horaTrabajador.trabajador)?.nombre || null,
        totalHoras: horaTrabajador.datosHoraTrabajador.reduce((acc, item) => acc + item.totalHoras, 0),

    }));
    return arrListadoTrabajadores.sort((a, b) => a.trabajadorNombre?.localeCompare(b.trabajadorNombre));
}