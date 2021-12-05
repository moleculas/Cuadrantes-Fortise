import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingNominas: false,
    errorDeCargaNominas: false,
    calendarioAGestionarNominas: '',
    esInicioNominas: true,
    cuadrantesVinculadosATrabajador: [],
    noHayCuadrantesVinculadosATrabajador: false,
    objetoNomina: {
        id: null,
        nombre: '',
        trabajador: '',
        datosNomina: {
            objeto: 'nomina',
            arrayDatos: []
        }
    },
    nominaRegistrada: '',
    trabajador: '',
    estadoIntervencionNominaNuevaRegistrada: true,
    estadoActivadoDesactivadoBotonRegistrarNomina: true,
    estadoActivadoDesactivadoBotonEliminarNomina: true,
    exitoRegistroNomina: false,
    exitoEliminarNomina: false,
    ultimoIdRegistrado: null,

};

//types
const LOADING_NOMINAS = 'LOADING_NOMINAS';
const ERROR_DE_CARGA_NOMINAS = 'ERROR_DE_CARGA_NOMINAS';
const SET_CALENDARIO_A_GESTIONAR_NOMINAS = 'SET_CALENDARIO_A_GESTIONAR_NOMINAS';
const CAMBIO_ESTADO_INICIO_NOMINAS = 'CAMBIO_ESTADO_INICIO_NOMINAS';
const OBTENER_CUADRANTES_VINCULADOS_A_TRABAJADOR = 'OBTENER_CUADRANTES_VINCULADOS_A_TRABAJADOR';
const VACIAR_DATOS_CUADRANTES_VINCULADOS = 'VACIAR_DATOS_CUADRANTES_VINCULADOS';
const NO_HAY_CUADRANTES_VINCULADOS_A_TRABAJADOR = 'NO_HAY_CUADRANTES_VINCULADOS_A_TRABAJADOR';
const OBTENER_NOMINA_EXITO = 'OBTENER_NOMINA_EXITO';
const OBTENER_NOMINA_NO_HAY = 'OBTENER_NOMINA_NO_HAY';
const SET_TRABAJADOR = 'SET_TRABAJADOR';
const ACTUALIZAR_OBJETO_NOMINA = 'ACTUALIZAR_OBJETO_NOMINA';
const ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_NOMINA = 'ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_NOMINA';
const ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ELIMINAR_NOMINA = 'ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ELIMINAR_NOMINA';
const REGISTRAR_NOMINA_EXITO = 'REGISTRAR_NOMINA_EXITO';
const RESETEA_EXITO_NOMINAS = 'RESETEA_EXITO_NOMINAS';

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
        case OBTENER_CUADRANTES_VINCULADOS_A_TRABAJADOR:
            return { ...state, cuadrantesVinculadosATrabajador: action.payload.array, errorDeCargaNominas: action.payload.errorDeCargaNominas, loadingNominas: false, noHayCuadrantesVinculadosATrabajador: false }
        case VACIAR_DATOS_CUADRANTES_VINCULADOS:
            return { ...state, cuadrantesVinculadosATrabajador: [], nominaRegistrada: '' }
        case NO_HAY_CUADRANTES_VINCULADOS_A_TRABAJADOR:
            return { ...state, noHayCuadrantesVinculadosATrabajador: true }
        case OBTENER_NOMINA_EXITO:
            return { ...state, objetoNomina: action.payload, errorDeCargaNominas: false, loadingNominas: false, nominaRegistrada: 'si' }
        case OBTENER_NOMINA_NO_HAY:
            return { ...state, errorDeCargaNominas: false, loadingNominas: false, nominaRegistrada: 'no' }
        case SET_TRABAJADOR:
            return { ...state, trabajador: action.payload.valor }
        case ACTUALIZAR_OBJETO_NOMINA:
            return { ...state, objetoNomina: action.payload.objeto }
        case ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_NOMINA:
            return { ...state, estadoActivadoDesactivadoBotonRegistrarNomina: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ELIMINAR_NOMINA:
            return { ...state, estadoActivadoDesactivadoBotonEliminarNomina: action.payload.estado }
        case REGISTRAR_NOMINA_EXITO:
            return { ...state, errorDeCargaNominas: false, loadingNominas: false, exitoRegistroNomina: true, ultimoIdRegistrado: action.payload.ultimoIdRegistrado }
        case RESETEA_EXITO_NOMINAS:
            return { ...state, exitoRegistroNomina: false, exitoEliminarNomina: false }
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

export const obtenerCuadrantesVinculadosATrabajadorAccion = (objeto, id, cuadrante) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_NOMINAS
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("cuadrante", cuadrante);
        let apiUrl = rutaApi + "obtener_cuadrantes_vinculados_trabajador.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        if (respuesta.length > 0) {
            dispatch({
                type: OBTENER_CUADRANTES_VINCULADOS_A_TRABAJADOR,
                payload: {
                    array: respuesta,
                    errorDeCargaNominas: false
                }
            })
        } else {
            dispatch({
                type: NO_HAY_CUADRANTES_VINCULADOS_A_TRABAJADOR,
            })
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NOMINAS
        })
    }
}

export const vaciarDatosCuadrantesvinculadosAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CUADRANTES_VINCULADOS,
    });
}

export const obtenerNominaAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_NOMINAS
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
        if (res.data === false) {
            dispatch({
                type: OBTENER_NOMINA_NO_HAY
            })
        } else {
            dispatch({
                type: OBTENER_NOMINA_EXITO,
                payload: {
                    id: res.data.id,
                    nombre: res.data.nombre,
                    trabajador: res.data.trabajador,
                    datosNomina: JSON.parse(res.data.datos_nomina)
                }
            });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NOMINAS
        })
    }
}

export const setTrabajadorAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_TRABAJADOR,
        payload: {
            valor: valor
        }
    });
}

export const actualizarObjetoNominaAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: ACTUALIZAR_OBJETO_NOMINA,
        payload: {
            objeto: objeto
        }
    });
}

export const activarDesactivarCambioBotonRegistrarNominaAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_NOMINA,
        payload: {
            estado: estado
        }
    });
}

export const activarDesactivarCambioBotonEliminarNominaAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ELIMINAR_NOMINA,
        payload: {
            estado: estado
        }
    });
}

export const registrarNominaAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_NOMINAS
    });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "registrar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: REGISTRAR_NOMINA_EXITO,
            payload: {
                ultimoIdRegistrado: res.data
            }
        });
        dispatch({
            type: RESETEA_EXITO_NOMINAS
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NOMINAS
        })
    }
}