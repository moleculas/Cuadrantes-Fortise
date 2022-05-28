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
        estado: 'alta',
        categoria: {
            objeto: 'categoria',
            categoria: []
        },
        codigo: '',
        domicilio: '',
        codigoPostal: '',
        poblacion: '',
        provincia: '',
        nif: '',
        mail: '',
        mail2: '',
        telefono: '',
        telefono2: '',
        formaPago: '',
        tempPago: '',
        diaPago: '',
        activoNumCuenta: false,
        horario: {
            objeto: 'horario',
            horario: []
        },
        serviciosFijos: {
            objeto: 'serviciosFijos',
            gestionEspSF: false,
            serviciosFijos: []
        },
        trabajadores: {
            objeto: 'trabajadores',
            trabajadores: []
        },
        observaciones: {
            objeto: 'observaciones',
            observaciones: []
        },
    },
    exitoActualizacionCentro: false,
    exitoRegistroCentro: false,
    exitoEliminarCentro: false,
    estadoActivadoDesactivadoNuevoCentro: true,
    estadoActivadoDesactivadoActualizacionCentro: true,
    estadoActivadoDesactivadoRegistroCentro: true,
    estadoYaEstaRegistradoRegistroCentro: false,
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
const VACIAR_DATOS_CENTRO = 'VACIAR_DATOS_CENTRO';
const CAMBIAR_ESTADO_YA_ESTA_REGISTRADO_CENTRO = 'CAMBIAR_ESTADO_YA_ESTA_REGISTRADO_CENTRO';

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
        case VACIAR_DATOS_CENTRO:
            return { ...state, objetoCentro: action.payload, categoriaPorCentro: '' }
        case CAMBIAR_ESTADO_YA_ESTA_REGISTRADO_CENTRO:
            return { ...state, estadoYaEstaRegistradoRegistroCentro: action.payload.estado }
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
        let apiUrl = rutaApi + "listar_por_categoria.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        let arrayRespuesta = [];
        respuesta.forEach((centro) => {
            let objetoRespuestaCategoria = JSON.parse(centro.categoria);
            let hayCategoria = objetoRespuestaCategoria.categoria.indexOf(categoria) >= 0;
            if (hayCategoria) {
                arrayRespuesta.push(centro);
            };
        });
        arrayRespuesta.sort((a, b) => a.nombre.localeCompare(b.nombre));
        dispatch({
            type: OBTENER_CENTROS_POR_CATEGORIA_EXITO,
            payload: {
                array: arrayRespuesta,
                errorDeCargaCentros: false
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const obtenerCentrosAccion = (objeto, filtrados) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_CENTROS
    });   
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        let apiUrl;
        if (filtrados) {
            apiUrl = rutaApi + "listar_filtrados.php";
        } else {
            apiUrl = rutaApi + "listar.php";
        };
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
        });
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

export const vaciarDatosCentroAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CENTRO,
        payload: {
            id: null,
            nombre: '',
            estado: 'alta',
            categoria: {
                objeto: 'categoria',
                categoria: []
            },
            codigo: '',
            domicilio: '',
            codigoPostal: '',
            poblacion: '',
            provincia: '',
            nif: '',
            mail: '',
            mail2: '',
            telefono: '',
            telefono2: '',
            formaPago: '',
            tempPago: '',
            diaPago: '',
            activoNumCuenta: false,
            horario: {
                tipo: '',
                variacion: '',
                excepcion: '',
                computo: '',
                mensualPactado: null,
                precioHora_L: null,
                precioHora_E: null,
                precioHora_P: null,
                precioHora_N: null,
                precioHora_R: null,
                precioHora_L1: null,
                precioHora_L2: null,
                precioHora_F: null,
                tipoRegistro: 'comun',
                tipoRegistroTrabajador: [],
                lunesTipoServicio: '',
                martesTipoServicio: '',
                miercolesTipoServicio: '',
                juevesTipoServicio: '',
                viernesTipoServicio: '',
                sabadoTipoServicio: '',
                domingoTipoServicio: '',
            },
            serviciosFijos: {
                objeto: 'serviciosFijos',
                gestionEspSF: false,
                servicio: [
                    { tipoServiciofijo: 'TOL', precioHora_TO: null },
                    { tipoServiciofijo: 'CRIS', precioHora_CR: null },
                    { tipoServiciofijo: 'CRISE', precioHora_CE: null },
                    { tipoServiciofijo: 'CRISE', precioHora_CI: null },
                    { tipoServiciofijo: 'MOQ', precioHora_MO: null },
                    { tipoServiciofijo: 'OF', precioHora_OF: null },
                    { tipoServiciofijo: 'ALMC', precioHora_AL: null },
                    { tipoServiciofijo: 'LAB', precioHora_LA: null },
                    { tipoServiciofijo: 'TELÑ', precioHora_TE: null },
                    { tipoServiciofijo: 'FCH.IN', precioHora_FI: null },
                    { tipoServiciofijo: 'FCH.EX', precioHora_FE: null },
                    { tipoServiciofijo: 'ABRLL', precioHora_AB: null },
                    { tipoServiciofijo: 'MANT', precioHora_MA: null },
                    { tipoServiciofijo: 'PORT', precioHora_PO: null },
                    { tipoServiciofijo: 'BACT', precioHora_BA: null },
                    { tipoServiciofijo: 'FEST', precioHora_FT: null }
                ]
            },
            trabajadores: {
                objeto: 'trabajadores',
                trabajadores: []
            },
            observaciones: {
                objeto: 'observaciones',
                observaciones: []
            },
        }
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
                estado: res.data.estado,
                categoria: JSON.parse(res.data.categoria),
                codigo: res.data.codigo,
                domicilio: res.data.domicilio,
                codigoPostal: res.data.codigo_postal,
                poblacion: res.data.poblacion,
                provincia: res.data.provincia,
                nif: res.data.nif,
                mail: res.data.mail,
                mail2: res.data.mail_2,
                telefono: res.data.telefono,
                telefono2: res.data.telefono_2,
                formaPago: res.data.forma_pago,
                tempPago: res.data.temp_pago,
                diaPago: res.data.dia_pago,
                activoNumCuenta: res.data.activo_num_cuenta,
                horario: JSON.parse(res.data.horario),
                serviciosFijos: JSON.parse(res.data.servicios_fijos),
                trabajadores: JSON.parse(res.data.trabajadores),
                observaciones: JSON.parse(res.data.observaciones),
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CENTROS
        })
    }
}

export const obtenerCategoriaPorCentroAccion = (objeto, id, numeroCuadrante) => async (dispatch, getState) => {
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
        let laCategoriaPre = JSON.parse(res.data.categoria);
        let laCategoria = laCategoriaPre.categoria[numeroCuadrante];
        dispatch({
            type: OBTENER_CATEGORIA_POR_CENTRO_EXITO,
            payload: {
                categoria: laCategoria,
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

export const cambiarEstadoYaEstaRegistradoAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: CAMBIAR_ESTADO_YA_ESTA_REGISTRADO_CENTRO,
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