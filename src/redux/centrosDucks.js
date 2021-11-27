import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingCentros: false,
    arrayCentrosPorCategoria: [],
    arrayCentros: [],
    errorDeCargaCentros: false,
    objetoCentro: {
        id: null,
        nombre: '',
        categoria: '',
        horario: {
            tipo: '',
            variacion: '',
            computo: '',
            mensualPactado: null,
            precioHora: null,
            lunesInicioRango: null,
            lunesFinRango: null,
            martesInicioRango: null,
            martesFinRango: null,
            miercolesInicioRango: null,
            miercolesFinRango: null,
            juevesInicioRango: null,
            juevesFinRango: null,
            viernesInicioRango: null,
            viernesFinRango: null,
            sabadoInicioRango: null,
            sabadoFinRango: null,
            domingoInicioRango: null,
            domingoFinRango: null,
            lunesInicio1RangoDescanso: null,
            lunesInicio2RangoDescanso: null,
            lunesFin1RangoDescanso: null,
            lunesFin2RangoDescanso: null,
            martesInicio1RangoDescanso: null,
            martesInicio2RangoDescanso: null,
            martesFin1RangoDescanso: null,
            martesFin2RangoDescanso: null,
            miercolesInicio1RangoDescanso: null,
            miercolesInicio2RangoDescanso: null,
            miercolesFin1RangoDescanso: null,
            miercolesFin2RangoDescanso: null,
            juevesInicio1RangoDescanso: null,
            juevesInicio2RangoDescanso: null,
            juevesFin1RangoDescanso: null,
            juevesFin2RangoDescanso: null,
            viernesInicio1RangoDescanso: null,
            viernesInicio2RangoDescanso: null,
            viernesFin1RangoDescanso: null,
            viernesFin2RangoDescanso: null,
            sabadoInicio1RangoDescanso: null,
            sabadoInicio2RangoDescanso: null,
            sabadoFin1RangoDescanso: null,
            sabadoFin2RangoDescanso: null,
            domingoInicio1RangoDescanso: null,
            domingoInicio2RangoDescanso: null,
            domingoFin1RangoDescanso: null,
            domingoFin2RangoDescanso: null,
            lunesCantidad: '',
            martesCantidad: '',
            miercolesCantidad: '',
            juevesCantidad: '',
            viernesCantidad: '',
            sabadoCantidad: '',
            domingoCantidad: '',
        },
        trabajadores: {
            cantidad: '',
            trabajadores: []
        },       
    },
    exitoActualizacionCentro: false,
    exitoRegistroCentro: false,
    exitoEliminarCentro: false,
    estadoActivadoDesactivadoNuevoCentro: true,
    estadoActivadoDesactivadoActualizacionCentro: true,
    estadoActivadoDesactivadoRegistroCentro: true,
    categoriaPorCentro: ''
}

//types
const LOADING_CENTROS = 'LOADING_CENTROS';
const OBTENER_CENTROS_POR_CATEGORIA_EXITO = 'OBTENER_CENTROS_POR_CATEGORIA_EXITO';
const OBTENER_CENTROS_EXITO = 'OBTENER_CENTROS_EXITO';
const OBTENER_CENTRO_EXITO = 'OBTENER_CENTRO_EXITO';
const ERROR_DE_CARGA_CENTROS = 'ERROR_DE_CARGA_CENTROS';
const VACIAR_DATOS_CENTROS = 'VACIAR_DATOS_CENTROS';
const ACTUALIZAR_CENTRO_EXITO = 'ACTUALIZAR_CENTRO_EXITO';
const REGISTRAR_CENTRO_EXITO = 'REGISTRAR_CENTRO_EXITO';
const ELIMINAR_CENTRO_EXITO = 'ELIMINAR_CENTRO_EXITO';
const RESETEA_EXITO_CENTROS = 'RESETEA_EXITO_CENTROS';
const ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_CENTRO = 'ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_CENTRO';
const ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_CENTRO = 'ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_CENTRO';
const ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_CENTRO = 'ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_CENTRO';
const OBTENER_CATEGORIA_POR_CENTRO_EXITO = 'OBTENER_CATEGORIA_POR_CENTRO_EXITO';

//reducer
export default function centrosReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_CENTROS:
            return { ...state, loadingCentros: true }
        case OBTENER_CENTROS_POR_CATEGORIA_EXITO:
            return { ...state, arrayCentrosPorCategoria: action.payload.array, errorDeCargaCentros: action.payload.errorDeCargaCentros, loadingCentros: false }
        case OBTENER_CENTROS_EXITO:
            return { ...state, arrayCentros: action.payload.array, errorDeCargaCentros: action.payload.errorDeCargaCentros, loadingCentros: false }
        case OBTENER_CENTRO_EXITO:
            return { ...state, objetoCentro: action.payload, errorDeCargaCentros: false, loadingCentros: false }
        case ACTUALIZAR_CENTRO_EXITO:
            return { ...state, errorDeCargaCentros: false, loadingCentros: false, exitoActualizacionCentro: true }
        case REGISTRAR_CENTRO_EXITO:
            return { ...state, errorDeCargaCentros: false, loadingCentros: false, exitoRegistroCentro: true }
        case ELIMINAR_CENTRO_EXITO:
            return { ...state, errorDeCargaCentros: false, loadingCentros: false, exitoEliminarCentro: true }
        case ERROR_DE_CARGA_CENTROS:
            return { ...state, errorDeCargaCentros: true, loadingCentros: false }
        case RESETEA_EXITO_CENTROS:
            return { ...state, exitoActualizacionCentro: false, exitoRegistroCentro: false, exitoEliminarCentro: false }
        case VACIAR_DATOS_CENTROS:
            return { ...dataInicial }
        case ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_CENTRO:
            return { ...state, estadoActivadoDesactivadoNuevoCentro: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_CENTRO:
            return { ...state, estadoActivadoDesactivadoActualizacionCentro: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_CENTRO:
            return { ...state, estadoActivadoDesactivadoRegistroCentro: action.payload.estado }
        case OBTENER_CATEGORIA_POR_CENTRO_EXITO:
            return { ...state, categoriaPorCentro: action.payload.categoria, errorDeCargaCentros: false, loadingCentros: false }
        default:
            return { ...state }
    }
}

//acciones
export const obtenerCentrosPorCategoriaAccion = (objeto, categoria) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
    });
    try {
        // const { errorDeCargaCentros } = getState().centrosPorCategoria;
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("categoria", categoria);
        let apiUrl = rutaApi + "listar_por_categoria.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        respuesta.sort((a, b) => a.nombre.localeCompare(b.nombre));
        dispatch({
            type: OBTENER_CENTROS_POR_CATEGORIA_EXITO,
            payload: {
                array: respuesta,
                errorDeCargaCentros: false
            }
        })

    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const obtenerCentrosAccion = (objeto) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        let apiUrl = rutaApi + "listar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        respuesta.sort((a, b) => a.nombre.localeCompare(b.nombre));
        dispatch({
            type: OBTENER_CENTROS_EXITO,
            payload: {
                array: respuesta,
                errorDeCargaCentros: false
            }
        })

    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const vaciarDatosCentrosAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CENTROS
    });
}

export const obtenerCentroAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
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
        dispatch({
            type: OBTENER_CENTRO_EXITO,
            payload: {
                id: res.data.id,
                nombre: res.data.nombre,
                categoria: res.data.categoria,
                horario: JSON.parse(res.data.horario),
                trabajadores: JSON.parse(res.data.trabajadores)
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const obtenerCategoriaPorCentroAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        let apiUrl = rutaApi + "obtener_categoria_centro.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: OBTENER_CATEGORIA_POR_CENTRO_EXITO,
            payload: {                
                categoria: res.data.categoria,              
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const actualizarCentroAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
    });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: ACTUALIZAR_CENTRO_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CENTROS
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const registrarCentroAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
    });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "registrar.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: REGISTRAR_CENTRO_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CENTROS
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const eliminarCentroAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        let apiUrl = rutaApi + "eliminar.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: ELIMINAR_CENTRO_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CENTROS
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const activarDesactivarNuevoCentroAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_CENTRO,
        payload: {
            estado: estado
        }
    });
}

export const activarDesactivarActualizarCentroAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_CENTRO,
        payload: {
            estado: estado
        }
    });
}

export const activarDesactivarRegistrarCentroAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_CENTRO,
        payload: {
            estado: estado
        }
    });
}