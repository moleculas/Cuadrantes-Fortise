import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    loadingTrabajadores: false,
    arrayTrabajadores: [],
    arrayTrabajadoresBaja: [],
    errorDeCargaTrabajadores: false,
    objetoTrabajador: {
        id: null,
        nombre: '',
        categoria: 1,
        dni: '',
        segSocial: '',
        telefono: '',
        estado: '',
        datosEstado: {
            inicioBaja: null,
            finBaja: null,
            inicioVacaciones: null,
            finVacaciones: null,
            inicioExcedencia: null,
            finExcedencia: null,
            inicioPersonales: null,
            finPersonales: null
        },
        historicoBajas: null
    },
    objetoSuplente: {
        id: null,
        nombre: '',
        categoria: 1,
        dni: '',
        segSocial: '',
        telefono: '',
        estado: '',
        datosEstado: {
            inicioBaja: null,
            finBaja: null,
            inicioVacaciones: null,
            finVacaciones: null,
            inicioExcedencia: null,
            finExcedencia: null,
            inicioPersonales: null,
            finPersonales: null
        },
        historicoBajas: null
    },
    exitoActualizacionTrabajador: false,
    exitoRegistroTrabajador: false,
    exitoEliminarTrabajador: false,
    objetoCentroVinculadoTrabajador: [],
    objetoCentroVinculadoSuplente: [],
    estadoActivadoDesactivadoNuevoTrabajador: true,
    estadoActivadoDesactivadoActualizacionTrabajador: true,
    estadoActivadoDesactivadoRegistroTrabajador: true,
}

//types
const LOADING_TRABAJADORES = 'LOADING_TRABAJADORES';
const OBTENER_TRABAJADORES_EXITO = 'OBTENER_TRABAJADORES_EXITO';
const OBTENER_TRABAJADORES_BAJA_EXITO = 'OBTENER_TRABAJADORES_BAJA_EXITO';
const OBTENER_TRABAJADOR_EXITO = 'OBTENER_TRABAJADOR_EXITO';
const OBTENER_SUPLENTE_EXITO = 'OBTENER_SUPLENTE_EXITO';
const OBTENER_CENTRO_VINCULADO_TRABAJADOR_EXITO = 'OBTENER_CENTRO_VINCULADO_TRABAJADOR_EXITO';
const OBTENER_CENTRO_VINCULADO_SUPLENTE_EXITO = 'OBTENER_CENTRO_VINCULADO_SUPLENTE_EXITO';
const ERROR_DE_CARGA_TRABAJADORES = 'ERROR_DE_CARGA_TRABAJADORES';
const VACIAR_DATOS_TRABAJADORES = 'VACIAR_DATOS_TRABAJADORES';
const VACIAR_DATOS_TRABAJADOR = 'VACIAR_DATOS_TRABAJADOR';
const ACTUALIZAR_TRABAJADOR_EXITO = 'ACTUALIZAR_TRABAJADOR_EXITO';
const REGISTRAR_TRABAJADOR_EXITO = 'REGISTRAR_TRABAJADOR_EXITO';
const ELIMINAR_TRABAJADOR_EXITO = 'ELIMINAR_TRABAJADOR_EXITO';
const RESETEA_EXITO_TRABAJADORES = 'RESETEA_EXITO_TRABAJADORES';
const ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_TRABAJADOR = 'ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_TRABAJADOR';
const ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_TRABAJADOR = 'ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_TRABAJADOR';
const ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_TRABAJADOR = 'ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_TRABAJADOR';

//reducer
export default function trabajadoresReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_TRABAJADORES:
            return { ...state, loadingTrabajadores: true }
        case OBTENER_TRABAJADORES_EXITO:
            return { ...state, arrayTrabajadores: action.payload.array, errorDeCargaTrabajadores: action.payload.errorDeCargaTrabajadores, loadingTrabajadores: false }
        case OBTENER_TRABAJADORES_BAJA_EXITO:
            return { ...state, arrayTrabajadoresBaja: action.payload.array, errorDeCargaTrabajadores: action.payload.errorDeCargaTrabajadores, loadingTrabajadores: false }
        case OBTENER_TRABAJADOR_EXITO:
            return { ...state, objetoTrabajador: action.payload, errorDeCargaTrabajadores: false, loadingTrabajadores: false }
        case OBTENER_SUPLENTE_EXITO:
            return { ...state, objetoSuplente: action.payload, errorDeCargaTrabajadores: false, loadingTrabajadores: false }
        case ACTUALIZAR_TRABAJADOR_EXITO:
            return { ...state, errorDeCargaTrabajadores: false, loadingTrabajadores: false, exitoActualizacionTrabajador: true }
        case REGISTRAR_TRABAJADOR_EXITO:
            return { ...state, errorDeCargaTrabajadores: false, loadingTrabajadores: false, exitoRegistroTrabajador: true }
        case ELIMINAR_TRABAJADOR_EXITO:
            return { ...state, errorDeCargaTrabajadores: false, loadingTrabajadores: false, exitoEliminarTrabajador: true }
        case ERROR_DE_CARGA_TRABAJADORES:
            return { ...state, errorDeCargaTrabajadores: true, loadingTrabajadores: false }
        case RESETEA_EXITO_TRABAJADORES:
            return { ...state, exitoActualizacionTrabajador: false, exitoRegistroTrabajador: false, exitoEliminarTrabajador: false }
        case OBTENER_CENTRO_VINCULADO_TRABAJADOR_EXITO:
            return { ...state, objetoCentroVinculadoTrabajador: action.payload.array, errorDeCargaTrabajadores: false, loadingTrabajadores: false }
        case OBTENER_CENTRO_VINCULADO_SUPLENTE_EXITO:
            return { ...state, objetoCentroVinculadoSuplente: action.payload.array, errorDeCargaTrabajadores: false, loadingTrabajadores: false }
        case VACIAR_DATOS_TRABAJADORES:
            return { ...dataInicial }
        case VACIAR_DATOS_TRABAJADOR:
            return { ...state, objetoTrabajador: action.payload.objeto }
        case ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_TRABAJADOR:
            return { ...state, estadoActivadoDesactivadoNuevoTrabajador: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_TRABAJADOR:
            return { ...state, estadoActivadoDesactivadoActualizacionTrabajador: action.payload.estado }
        case ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_TRABAJADOR:
            return { ...state, estadoActivadoDesactivadoRegistroTrabajador: action.payload.estado }
        default:
            return { ...state }
    }
}

//acciones

export const obtenerTrabajadoresAccion = (objeto) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
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
            type: OBTENER_TRABAJADORES_EXITO,
            payload: {
                array: respuesta,
                errorDeCargaTrabajadores: false
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const obtenerTrabajadoresBajaAccion = (objeto) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        let apiUrl = rutaApi + "listar_trabajadores_baja.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        respuesta.sort((a, b) => a.nombre.localeCompare(b.nombre));
        dispatch({
            type: OBTENER_TRABAJADORES_BAJA_EXITO,
            payload: {
                array: respuesta,
                errorDeCargaTrabajadores: false
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const obtenerTrabajadorAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
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
            type: OBTENER_TRABAJADOR_EXITO,
            payload: {
                id: res.data.id,
                nombre: res.data.nombre, 
                dni: res.data.dni, 
                segSocial: res.data.seg_social, 
                telefono: res.data.telefono, 
                estado: res.data.estado,
                datosEstado: JSON.parse(res.data.datos_estado),
                historicoBajas: JSON.parse(res.data.historico_bajas)
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const obtenerSuplenteAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
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
            type: OBTENER_SUPLENTE_EXITO,
            payload: {
                id: res.data.id,
                nombre: res.data.nombre,
                dni: res.data.dni, 
                segSocial: res.data.seg_social, 
                telefono: res.data.telefono, 
                estado: res.data.estado,
                datosEstado: JSON.parse(res.data.datos_estado),
                historicoBajas: JSON.parse(res.data.historico_bajas)
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const obtenerCentroVinculadoAccion = (objeto, id_consulta, funcion, tipo) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id_consulta", id_consulta);
        formData.append("funcion", funcion);
        formData.append("tipo", tipo);
        let apiUrl = rutaApi + "obtener.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (tipo === 'trabajador') {
            dispatch({
                type: OBTENER_CENTRO_VINCULADO_TRABAJADOR_EXITO,
                payload: {
                    array: res.data
                }
            })
        };
        if (tipo === 'suplente') {
            dispatch({
                type: OBTENER_CENTRO_VINCULADO_SUPLENTE_EXITO,
                payload: {
                    array: res.data
                }
            })
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const vaciarDatosTrabajadoresAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_TRABAJADORES
    });
}

export const vaciarDatosTrabajadorAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_TRABAJADOR,
        payload: {
            objeto: {
                id: null,
                nombre: '',
                categoria: 1,
                dni: '', 
                segSocial: '', 
                telefono: '', 
                estado: '',
                datosEstado: {
                    inicioBaja: null,
                    finBaja: null,
                    inicioVacaciones: null,
                    finVacaciones: null,
                    inicioExcedencia: null,
                    finExcedencia: null,
                    inicioPersonales: null,
                    finPersonales: null
                },
                historicoBajas: null
            }
        }
    });
}

export const actualizarTrabajadorAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
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
            type: ACTUALIZAR_TRABAJADOR_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_TRABAJADORES
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const registrarTrabajadorAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
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
            type: REGISTRAR_TRABAJADOR_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_TRABAJADORES
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const eliminarTrabajadorAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_TRABAJADORES
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
            type: ELIMINAR_TRABAJADOR_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_TRABAJADORES
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_TRABAJADORES
        })
    }
}

export const activarDesactivarNuevoTrabajadorAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_NUEVO_TRABAJADOR,
        payload: {
            estado: estado
        }
    });
}

export const activarDesactivarActualizarTrabajadorAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_ACTUALIZACION_TRABAJADOR,
        payload: {
            estado: estado
        }
    });
}

export const activarDesactivarRegistrarTrabajadorAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE_REGISTRO_TRABAJADOR,
        payload: {
            estado: estado
        }
    });
}