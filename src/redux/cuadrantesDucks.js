import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const formaPago = Constantes.FORMA_DE_PAGO;
const dataInicial = {
    loadingCuadrantes: false,
    errorDeCargaCuadrantes: false,
    estadoActivadoDesactivadoCambio: true,
    estadoActivadoDesactivadoBotonRegistrar: true,
    estadoActivadoDesactivadoBotonActualizar: true,
    estadoActivadoDesactivadoBotonResetear: true,
    exitoActualizacionCuadrante: false,
    exitoRegistroCuadrante: false,
    exitoResetearCuadrante: false,
    objetoCuadrante: {
        id: null,
        nombre: '',
        actualizacion: '',
        datosCuadrante: {
            objeto: 'cuadrante',
            centro: null,
            datosCuadrante: []
        },
        datosServicios: {
            objeto: 'serviciosFijos',
            datosServicios: []
        },
        datosInforme: {
            objeto: 'informe',
            datosInforme: []
        },
        estado: 'registrado',
        total: null,
        horas: {
            objeto: 'horas',
            horas: []
        },        
    },
    cuadranteRegistrado: '',
    categoria: '',
    centro: '',
    esInicioCuadrantes: true,
    estadoIntervencionCuadranteNuevoRegistrada: true,
    ultimoIdRegistrado: null,
    calendarioAGestionar: '',
    stateFestivo: {},
    losDiasDelMes: [],
    cuadrante: [],    
};

//types
const LOADING_CUADRANTES = 'LOADING_CUADRANTES';
const ACTIVAR_DESACTIVAR_COMPONENTE_CAMBIO = 'ACTIVAR_DESACTIVAR_COMPONENTE_CAMBIO';
const VACIAR_DATOS_CUADRANTES = 'VACIAR_DATOS_CUADRANTES';
const VACIAR_DATOS_CUADRANTE_REGISTRADO = 'VACIAR_DATOS_CUADRANTE_REGISTRADO';
const SET_CATEGORIA = 'SET_CATEGORIA';
const SET_CENTRO = 'SET_CENTRO';
const SET_CALENDARIO_A_GESTIONAR = 'SET_CALENDARIO_A_GESTIONAR';
const CAMBIO_ESTADO_INICIO_CUADRANTES = 'CAMBIO_ESTADO_INICIO_CUADRANTES';
const ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_CUADRANTE = 'ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_CUADRANTE';
const ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ACTUALIZAR_CUADRANTE = 'ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ACTUALIZAR_CUADRANTE';
const OBTENER_CUADRANTE_EXITO = 'OBTENER_CUADRANTE_EXITO';
const ERROR_DE_CARGA_CUADRANTES = 'ERROR_DE_CARGA_CUADRANTES';
const RESETEA_EXITO_CUADRANTES = 'RESETEA_EXITO_CUADRANTES';
const OBTENER_CUADRANTE_NO_HAY = 'OBTENER_CUADRANTE_NO_HAY';
const ACTUALIZAR_CUADRANTE_EXITO = 'ACTUALIZAR_CUADRANTE_EXITO';
const REGISTRAR_CUADRANTE_EXITO = 'REGISTRAR_CUADRANTE_EXITO';
const RESETEA_ELIMINA_CUADRANTE_EXITO = 'RESETEA_ELIMINA_CUADRANTE_EXITO';
const INTERVENCION_CUADRANTE_NUEVO_REGISTRADA = 'INTERVENCION_CUADRANTE_NUEVO_REGISTRADA';
const CAMBIAR_A_CUADRANTE_REGISTRADO = 'CAMBIAR_A_CUADRANTE_REGISTRADO';
const CAMBIAR_A_CUADRANTE_NO_REGISTRADO = 'CAMBIAR_A_CUADRANTE_NO_REGISTRADO';
const ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_RESETEAR_CUADRANTE = 'ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_RESETEAR_CUADRANTE';
const ACTUALIZAR_OBJETO_CUADRANTE = 'ACTUALIZAR_OBJETO_CUADRANTE';
const SET_LOS_DIAS_DE_MES = 'SET_LOS_DIAS_DE_MES';
const SET_STATE_FESTIVO = 'SET_STATE_FESTIVO';
const SET_CUADRANTE = 'SET_CUADRANTE';

//reducer
export default function cuadrantesReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_CUADRANTES:
            return { ...state, loadingCuadrantes: true }
        case ACTIVAR_DESACTIVAR_COMPONENTE_CAMBIO:
            return { ...state, estadoActivadoDesactivadoCambio: action.payload.estado }
        case VACIAR_DATOS_CUADRANTES:
            return { ...state, objetoCuadrante: action.payload, categoria: '' }
        case VACIAR_DATOS_CUADRANTE_REGISTRADO:
            return { ...state, cuadranteRegistrado: '' }
        case SET_CATEGORIA:
            return { ...state, categoria: action.payload.valor }
        case SET_CENTRO:
            return { ...state, centro: action.payload.valor }
        case SET_CALENDARIO_A_GESTIONAR:
            return { ...state, calendarioAGestionar: action.payload.valor }
        case CAMBIO_ESTADO_INICIO_CUADRANTES:
            return { ...state, esInicioCuadrantes: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_CUADRANTE:
            return { ...state, estadoActivadoDesactivadoBotonRegistrar: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ACTUALIZAR_CUADRANTE:
            return { ...state, estadoActivadoDesactivadoBotonActualizar: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_RESETEAR_CUADRANTE:
            return { ...state, estadoActivadoDesactivadoBotonResetear: action.payload.estado }
        case OBTENER_CUADRANTE_EXITO:
            return { ...state, objetoCuadrante: action.payload, errorDeCargaCuadrantes: false, loadingCuadrantes: false, cuadranteRegistrado: 'si' }
        case OBTENER_CUADRANTE_NO_HAY:
            return { ...state, errorDeCargaCuadrantes: false, loadingCuadrantes: false, cuadranteRegistrado: 'no' }
        case ERROR_DE_CARGA_CUADRANTES:
            return { ...state, errorDeCargaCuadrantes: true, loadingCuadrantes: false }
        case RESETEA_EXITO_CUADRANTES:
            return { ...state, exitoActualizacionCuadrante: false, exitoRegistroCuadrante: false, exitoResetearCuadrante: false }
        case RESETEA_ELIMINA_CUADRANTE_EXITO:
            return { ...state, errorDeCargaCuadrantes: false, loadingCuadrantes: false, exitoResetearCuadrante: true }
        case ACTUALIZAR_CUADRANTE_EXITO:
            return { ...state, errorDeCargaCuadrantes: false, loadingCuadrantes: false, exitoActualizacionCuadrante: true }
        case REGISTRAR_CUADRANTE_EXITO:
            return { ...state, errorDeCargaCuadrantes: false, loadingCuadrantes: false, exitoRegistroCuadrante: true, ultimoIdRegistrado: action.payload.ultimoIdRegistrado }
        case INTERVENCION_CUADRANTE_NUEVO_REGISTRADA:
            return { ...state, estadoIntervencionCuadranteNuevoRegistrada: action.payload.estado }
        case CAMBIAR_A_CUADRANTE_REGISTRADO:
            return { ...state, cuadranteRegistrado: 'si' }
        case CAMBIAR_A_CUADRANTE_NO_REGISTRADO:
            return { ...state, cuadranteRegistrado: 'no' }
        case ACTUALIZAR_OBJETO_CUADRANTE:
            return { ...state, objetoCuadrante: action.payload.objeto }
        case SET_LOS_DIAS_DE_MES:
            return { ...state, losDiasDelMes: action.payload.array }
        case SET_STATE_FESTIVO:
            return { ...state, stateFestivo: action.payload.objeto }
        case SET_CUADRANTE:
            return { ...state, cuadrante: action.payload.array }        
        default:
            return { ...state }
    }
}

//acciones

export const setLosDiasDelMesAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_LOS_DIAS_DE_MES,
        payload: {
            array: array
        }
    });
}

export const setCuadranteAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_CUADRANTE,
        payload: {
            array: array
        }
    });
}

export const setStateFestivoAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_STATE_FESTIVO,
        payload: {
            objeto: objeto
        }
    });
}

export const retornaFormaPagoAccion = (formaValue) => (dispatch, getState) => {
    let laFormaDePago = formaPago.find(forma => forma.value === formaValue);
    return laFormaDePago.label
}

export const activarDesactivarCambioAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_CAMBIO,
        payload: {
            estado: estado
        }
    });
}

export const actualizarObjetoCuadranteAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: ACTUALIZAR_OBJETO_CUADRANTE,
        payload: {
            objeto: objeto
        }
    });
}

export const activarDesactivarCambioBotonRegistrarAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_REGISTRAR_CUADRANTE,
        payload: {
            estado: estado
        }
    });
}

export const registrarIntervencionCuadranteNuevoAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: INTERVENCION_CUADRANTE_NUEVO_REGISTRADA,
        payload: {
            estado: estado
        }
    });
}

export const activarDesactivarCambioBotonActualizarAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_ACTUALIZAR_CUADRANTE,
        payload: {
            estado: estado
        }
    });
}

export const activarDesactivarCambioBotonResetearAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_BOTON_RESETEAR_CUADRANTE,
        payload: {
            estado: estado
        }
    });
}

export const vaciarDatosCuadrantesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CUADRANTES,
        payload: {
            id: null,
            nombre: '',
            actualizacion: '',
            datosCuadrante: {
                objeto: 'cuadrante',
                centro: null,
                datosCuadrante: []
            },
            datosServicios: {
                objeto: 'serviciosFijos',
                datosServicios: []
            },
            datosInforme: {
                objeto: 'informe',
                datosInforme: []
            },
            estado: 'registrado',
            total: null,
            horas: {
                objeto: 'horas',
                horas: []
            }
        }
    });
}

export const vaciarDatosCuadranteRegistradoAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CUADRANTE_REGISTRADO,
    });
}

export const cambiarACuadranteRegistradoAccion = () => (dispatch, getState) => {
    dispatch({
        type: CAMBIAR_A_CUADRANTE_REGISTRADO,
    });
}

export const cambiarACuadranteNoRegistradoAccion = () => (dispatch, getState) => {
    dispatch({
        type: CAMBIAR_A_CUADRANTE_NO_REGISTRADO,
    });
}

export const setCategoriaAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_CATEGORIA,
        payload: {
            valor: valor
        }
    });
}

export const setCentroAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_CENTRO,
        payload: {
            valor: valor
        }
    });
}

export const setCalendarioAGestionarAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_CALENDARIO_A_GESTIONAR,
        payload: {
            valor: valor
        }
    });
}

export const cambioEstadoInicioCuadrantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: CAMBIO_ESTADO_INICIO_CUADRANTES,
        payload: {
            estado: estado
        }
    });
}

export const obtenerCuadranteAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CUADRANTES
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
                type: OBTENER_CUADRANTE_NO_HAY
            })
        } else {
            dispatch({
                type: OBTENER_CUADRANTE_EXITO,
                payload: {
                    id: res.data.id,
                    nombre: res.data.nombre,
                    actualizacion: res.data.actualizacion,
                    datosCuadrante: JSON.parse(res.data.datos_cuadrante),
                    datosServicios: res.data.datos_servicios ? JSON.parse(res.data.datos_servicios) : dataInicial.objetoCuadrante.datosServicios,
                    datosInforme: res.data.datos_informe ? JSON.parse(res.data.datos_informe) : dataInicial.objetoCuadrante.datosInforme,
                    estado: res.data.estado,
                    total: res.data.total,
                    horas: res.data.horas ? JSON.parse(res.data.horas) : dataInicial.horas
                }
            });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES
        })
    }
}

export const actualizarCuadranteAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CUADRANTES
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
            type: ACTUALIZAR_CUADRANTE_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CUADRANTES
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES
        })
    }
}

export const registrarCuadranteAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CUADRANTES
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
            type: REGISTRAR_CUADRANTE_EXITO,
            payload: {
                ultimoIdRegistrado: res.data
            }
        });
        dispatch({
            type: RESETEA_EXITO_CUADRANTES
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES
        })
    }
}

export const resetearCuadranteAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CUADRANTES
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
            type: RESETEA_ELIMINA_CUADRANTE_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CUADRANTES
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES
        })
    }
}