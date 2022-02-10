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
            tipoHorarioGeneral: '',
            arrayCuadrante: []
        },
        datosServicios: {
            objeto: 'serviciosFijos',
            servicio: [
                { tipoServiciofijo: 'TOL', precioHora_TO: null },
                { tipoServiciofijo: 'CRIS', precioHora_CR: null },
                { tipoServiciofijo: 'CRISE', precioHora_CE: null },
                { tipoServiciofijo: 'CRISI', precioHora_CI: null },
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
        datosInforme: {
            objeto: 'informe',
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
            arrayTrabajadores: [],
            totalFacturado_M: null,
            totalFacturado_L: null,
            totalFacturado_E: null,
            totalFacturado_P: null,
            totalFacturado_N: null,
            totalFacturado_R: null,
            totalFacturado_L1: null,
            totalFacturado_L2: null,
            totalFacturado_F: null
        },
        estado: 'registrado',
        total: null,
        horas: {
            objeto: 'horas',
            M: null,
            L: null,
            E: null,
            P: null,
            N: null,
            R: null,
            L1: null,
            L2: null,
            F: null
        }
    },
    cuadranteRegistrado: '',
    categoria: '',
    centro: '',
    esInicioCuadrantes: true,
    estadoIntervencionCuadranteNuevoRegistrada: true,
    ultimoIdRegistrado: null,
    calendarioAGestionar: ''
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
        default:
            return { ...state }
    }
}

//acciones

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
                tipoHorarioGeneral: '',
                arrayCuadrante: []
            },
            datosServicios: {
                objeto: 'serviciosFijos',
                servicio: [
                    { tipoServiciofijo: 'TOL', precioHora_TO: null },
                    { tipoServiciofijo: 'CRIS', precioHora_CR: null },
                    { tipoServiciofijo: 'CRISE', precioHora_CE: null },
                    { tipoServiciofijo: 'CRISI', precioHora_CI: null },
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
            datosInforme: {
                objeto: 'informe',
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
                arrayTrabajadores: [],
                totalFacturado_M: null,
                totalFacturado_L: null,
                totalFacturado_E: null,
                totalFacturado_P: null,
                totalFacturado_N: null,
                totalFacturado_R: null,
                totalFacturado_L1: null,
                totalFacturado_L2: null,
                totalFacturado_F: null
            },
            estado: 'registrado',
            total: null,
            horas: {
                objeto: 'horas',
                M: null,
                L: null,
                E: null,
                P: null,
                N: null,
                R: null,
                L1: null,
                L2: null,
                F: null
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

const retornaTipoBajaPorHistorico = (dia, historico) => {
    let elRetorno;
    historico.forEach((registro, index) => {
        let inicioSplitted = registro.baja[0].inicio.split("-");
        let diaInicio = parseInt(inicioSplitted[2]);
        let finSplitted = registro.baja[0].fin.split("-");
        let diaFin = parseInt(finSplitted[2]);
        const rangoHistorico = [];
        for (let i = diaInicio; i < diaFin; i++) {
            rangoHistorico.push(i)
        };
        if (rangoHistorico.includes(dia)) {
            elRetorno = registro.baja[0].tipo;
        }
    });
    return elRetorno;
};

const periodoBajaTrabajadorAccion = (calendarioAGestionar, inicioBaja, finBaja, diasMes) => {
    let myArrSplitCalendario = calendarioAGestionar.split("-");
    const anyoCalendario = myArrSplitCalendario[0];
    const mesCalendario = myArrSplitCalendario[1];
    let myArrSplitInicioB = inicioBaja.split("-");
    const anyoInicioB = myArrSplitInicioB[0];
    const mesInicioB = myArrSplitInicioB[1];
    const diaInicioB = myArrSplitInicioB[2];
    let anyoFinB, mesFinB, diaFinB;
    if (finBaja) {
        let myArrSplitFinB = finBaja.split("-");
        anyoFinB = myArrSplitFinB[0];
        mesFinB = myArrSplitFinB[1];
        diaFinB = myArrSplitFinB[2];
    } else {
        anyoFinB = anyoCalendario;
        mesFinB = mesCalendario;
        diaFinB = parseInt(diasMes);
    }
    let empezamosPor;
    let acabamosPor;
    if (anyoInicioB < anyoCalendario || mesInicioB < mesCalendario) {
        empezamosPor = 1;
    };
    if (anyoFinB > anyoCalendario || mesFinB > mesCalendario) {
        acabamosPor = parseInt(diasMes);
    };
    if (anyoInicioB === anyoCalendario && mesInicioB === mesCalendario) {
        empezamosPor = parseInt(diaInicioB);
    };
    if (finBaja) {
        if (anyoFinB === anyoCalendario && mesFinB === mesCalendario) {
            acabamosPor = parseInt(diaFinB - 1);
        };
    } else {
        if (anyoFinB === anyoCalendario && mesFinB === mesCalendario) {
            acabamosPor = parseInt(diaFinB);
        };
    }
    let arrayBaja = [];
    for (let i = empezamosPor; i <= acabamosPor; i++) {
        arrayBaja.push(i);
    };
    return arrayBaja;
}

const gestionaDatosHorarioItem = (
    centroAGestionar,
    tipoTrabajador,
    tipoRegistro,
    cantidadTrabajadoresCentro,
    esInicio,
    posicionTrabajador,
    esLimpieza,
    item
) => {
    let comillas;
    if (item === 'lunesTipoServicio' ||
        item === 'martesTipoServicio' ||
        item === 'miercolesTipoServicio' ||
        item === 'juevesTipoServicio' ||
        item === 'viernesTipoServicio' ||
        item === 'sabadoTipoServicio' ||
        item === 'domingoTipoServicio' ||
        item === 'lunesCantidad' ||
        item === 'martesCantidad' ||
        item === 'miercolesCantidad' ||
        item === 'juevesCantidad' ||
        item === 'viernesCantidad' ||
        item === 'sabadoCantidad' ||
        item === 'domingoCantidad'
    ) {
        comillas = true;
    } else {
        comillas = false
    };
    if (tipoRegistro === 'comun') {
        if (esLimpieza) {
            if (comillas) {
                return '';
            } else {
                return null;
            }
        } else {
            if (centroAGestionar.horario.tipoRegistroTrabajador[0][item]) {
                return centroAGestionar.horario.tipoRegistroTrabajador[0][item];
            } else {
                if (comillas) {
                    return '';
                } else {
                    return null;
                }
            }
        }
    } else {
        if (esInicio) {
            if (esLimpieza) {
                if (comillas) {
                    return '';
                } else {
                    return null;
                }
            } else {
                if (centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                    return centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                } else {
                    if (comillas) {
                        return '';
                    } else {
                        return null;
                    }
                }
            }
        } else {
            if (tipoTrabajador === 'trabajador') {
                if (posicionTrabajador > cantidadTrabajadoresCentro) {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (centroAGestionar.horario.tipoRegistroTrabajador[0][item]) {
                            return centroAGestionar.horario.tipoRegistroTrabajador[0][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                } else {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                            return centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                }
            } else {
                if (posicionTrabajador > cantidadTrabajadoresCentro) {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (centroAGestionar.horario.tipoRegistroTrabajador[0][item]) {
                            return centroAGestionar.horario.tipoRegistroTrabajador[0][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                } else {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                            return centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                }
            }
        }
    }
};

export const gestionaColumnaCuadranteInterior = (
    trabajador,
    tipoTrabajador,
    esRevision,
    columna,
    cuadrante,
    centroAGestionar,
    posicionAnterior,
    calendarioAGestionar,
    losDiasDelMes,
    stateFestivo,
    esInicio,
    posicionTrabajador,
    esLimpieza,
    tipoHorario
) => (dispatch, getState) => {
    let columnaAnadir;
    let numeroSemana;
    let arrayBaja1 = [];
    let arrayBaja2 = [];
    let arrayBaja = [];
    let hayTrabajador;
    let arrayRegistrosHistorico = [];
    let tipoRegistro = centroAGestionar.horario.tipoRegistro;
    let cantidadTrabajadoresCentro = centroAGestionar.horario.tipoRegistroTrabajador.length;
    if (trabajador && tipoTrabajador) {
        if (esRevision) {
            columnaAnadir = {
                nombreTrabajador: trabajador.nombre,
                idTrabajador: trabajador.id,
                tipoHorario: tipoHorario,
                tipoTrabajador: tipoTrabajador,
            };
        } else {
            columnaAnadir = {
                nombreTrabajador: trabajador.nombre,
                idTrabajador: trabajador.id,
                tipoHorario: tipoHorario,
                tipoTrabajador: tipoTrabajador,
            };
        };
        hayTrabajador = true;
        if (trabajador.estado !== 'alta') {
            switch (trabajador.estado) {
                case 'baja':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBaja, trabajador.datosEstado.finBaja, losDiasDelMes.length);
                    break;
                case 'vacaciones':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioVacaciones, trabajador.datosEstado.finVacaciones, losDiasDelMes.length);
                    break;
                case 'excedencia':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioExcedencia, trabajador.datosEstado.finExcedencia, losDiasDelMes.length);
                    break;
                case 'personales':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioPersonales, trabajador.datosEstado.finPersonales, losDiasDelMes.length);
                    break;
                default:
            }
            columnaAnadir['hayBaja'] = true;
        } else {
            columnaAnadir['hayBaja'] = false;
        };
        if (trabajador.historicoBajas) {
            trabajador.historicoBajas.meses.forEach((registro, index) => {
                if (registro.mes === calendarioAGestionar) {
                    arrayRegistrosHistorico.push(registro);
                    columnaAnadir['hayBaja'] = true;
                } else {
                    columnaAnadir['hayBaja'] = false;
                }
            });
            arrayRegistrosHistorico.forEach((registro, index) => {
                const arrayBajaTraspaso = periodoBajaTrabajadorAccion(calendarioAGestionar, registro.baja[0].inicio, registro.baja[0].fin, losDiasDelMes.length);
                arrayBaja2 = arrayBaja2.concat(arrayBajaTraspaso);
            });
        };
        arrayBaja = arrayBaja1.concat(arrayBaja2);
    };
    if (!trabajador) {
        columnaAnadir = {
            nombreTrabajador: '',
            idTrabajador: null,
            tipoHorario: tipoHorario,
            tipoTrabajador: tipoTrabajador,
        };
        hayTrabajador = false;
        columnaAnadir['hayBaja'] = false;
    };
    switch (tipoHorario) {
        case 'rango':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesInicioRango: null,
                            lunesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicioRango: null,
                                    lunesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: null,
                                        lunesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicioRango: null,
                                            lunesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                            lunesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicioRango: null,
                                    lunesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: null,
                                        lunesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                        lunesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesInicioRango: null,
                            martesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicioRango: null,
                                    martesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: null,
                                        martesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicioRango: null,
                                            martesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                            martesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicioRango: null,
                                    martesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: null,
                                        martesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                        martesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesInicioRango: null,
                            miercolesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicioRango: null,
                                    miercolesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: null,
                                        miercolesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicioRango: null,
                                            miercolesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                            miercolesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicioRango: null,
                                    miercolesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: null,
                                        miercolesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                        miercolesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesInicioRango: null,
                            juevesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicioRango: null,
                                    juevesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: null,
                                        juevesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicioRango: null,
                                            juevesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                            juevesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicioRango: null,
                                    juevesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: null,
                                        juevesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                        juevesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesInicioRango: null,
                            viernesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicioRango: null,
                                    viernesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: null,
                                        viernesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicioRango: null,
                                            viernesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                            viernesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicioRango: null,
                                    viernesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: null,
                                        viernesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                        viernesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoInicioRango: null,
                            sabadoFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicioRango: null,
                                    sabadoFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: null,
                                        sabadoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicioRango: null,
                                            sabadoFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                            sabadoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicioRango: null,
                                    sabadoFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: null,
                                        sabadoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                        sabadoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoInicioRango: null,
                            domingoFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicioRango: null,
                                    domingoFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: null,
                                        domingoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicioRango: null,
                                            domingoFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                            domingoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicioRango: null,
                                    domingoFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: null,
                                        domingoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                        domingoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
            });
            break;
        case 'rangoDescanso':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesInicio1RangoDescanso: null,
                            lunesFin1RangoDescanso: null,
                            lunesInicio2RangoDescanso: null,
                            lunesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicio1RangoDescanso: null,
                                    lunesFin1RangoDescanso: null,
                                    lunesInicio2RangoDescanso: null,
                                    lunesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: null,
                                        lunesFin1RangoDescanso: null,
                                        lunesInicio2RangoDescanso: null,
                                        lunesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicio1RangoDescanso: null,
                                            lunesFin1RangoDescanso: null,
                                            lunesInicio2RangoDescanso: null,
                                            lunesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                            lunesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                            lunesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                            lunesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicio1RangoDescanso: null,
                                    lunesFin1RangoDescanso: null,
                                    lunesInicio2RangoDescanso: null,
                                    lunesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: null,
                                        lunesFin1RangoDescanso: null,
                                        lunesInicio2RangoDescanso: null,
                                        lunesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                        lunesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                        lunesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                        lunesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia    
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesInicio1RangoDescanso: null,
                            martesFin1RangoDescanso: null,
                            martesInicio2RangoDescanso: null,
                            martesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicio1RangoDescanso: null,
                                    martesFin1RangoDescanso: null,
                                    martesInicio2RangoDescanso: null,
                                    martesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: null,
                                        martesFin1RangoDescanso: null,
                                        martesInicio2RangoDescanso: null,
                                        martesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicio1RangoDescanso: null,
                                            martesFin1RangoDescanso: null,
                                            martesInicio2RangoDescanso: null,
                                            martesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                            martesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                            martesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                            martesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicio1RangoDescanso: null,
                                    martesFin1RangoDescanso: null,
                                    martesInicio2RangoDescanso: null,
                                    martesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: null,
                                        martesFin1RangoDescanso: null,
                                        martesInicio2RangoDescanso: null,
                                        martesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                        martesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                        martesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                        martesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesInicio1RangoDescanso: null,
                            miercolesFin1RangoDescanso: null,
                            miercolesInicio2RangoDescanso: null,
                            miercolesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicio1RangoDescanso: null,
                                    miercolesFin1RangoDescanso: null,
                                    miercolesInicio2RangoDescanso: null,
                                    miercolesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: null,
                                        miercolesFin1RangoDescanso: null,
                                        miercolesInicio2RangoDescanso: null,
                                        miercolesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicio1RangoDescanso: null,
                                            miercolesFin1RangoDescanso: null,
                                            miercolesInicio2RangoDescanso: null,
                                            miercolesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                            miercolesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                            miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                            miercolesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicio1RangoDescanso: null,
                                    miercolesFin1RangoDescanso: null,
                                    miercolesInicio2RangoDescanso: null,
                                    miercolesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: null,
                                        miercolesFin1RangoDescanso: null,
                                        miercolesInicio2RangoDescanso: null,
                                        miercolesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                        miercolesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                        miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                        miercolesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesInicio1RangoDescanso: null,
                            juevesFin1RangoDescanso: null,
                            juevesInicio2RangoDescanso: null,
                            juevesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicio1RangoDescanso: null,
                                    juevesFin1RangoDescanso: null,
                                    juevesInicio2RangoDescanso: null,
                                    juevesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: null,
                                        juevesFin1RangoDescanso: null,
                                        juevesInicio2RangoDescanso: null,
                                        juevesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicio1RangoDescanso: null,
                                            juevesFin1RangoDescanso: null,
                                            juevesInicio2RangoDescanso: null,
                                            juevesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                            juevesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                            juevesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                            juevesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicio1RangoDescanso: null,
                                    juevesFin1RangoDescanso: null,
                                    juevesInicio2RangoDescanso: null,
                                    juevesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: null,
                                        juevesFin1RangoDescanso: null,
                                        juevesInicio2RangoDescanso: null,
                                        juevesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                        juevesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                        juevesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                        juevesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesInicio1RangoDescanso: null,
                            viernesFin1RangoDescanso: null,
                            viernesInicio2RangoDescanso: null,
                            viernesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicio1RangoDescanso: null,
                                    viernesFin1RangoDescanso: null,
                                    viernesInicio2RangoDescanso: null,
                                    viernesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: null,
                                        viernesFin1RangoDescanso: null,
                                        viernesInicio2RangoDescanso: null,
                                        viernesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicio1RangoDescanso: null,
                                            viernesFin1RangoDescanso: null,
                                            viernesInicio2RangoDescanso: null,
                                            viernesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                            viernesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                            viernesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                            viernesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicio1RangoDescanso: null,
                                    viernesFin1RangoDescanso: null,
                                    viernesInicio2RangoDescanso: null,
                                    viernesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: null,
                                        viernesFin1RangoDescanso: null,
                                        viernesInicio2RangoDescanso: null,
                                        viernesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                        viernesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                        viernesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                        viernesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoInicio1RangoDescanso: null,
                            sabadoFin1RangoDescanso: null,
                            sabadoInicio2RangoDescanso: null,
                            sabadoFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicio1RangoDescanso: null,
                                    sabadoFin1RangoDescanso: null,
                                    sabadoInicio2RangoDescanso: null,
                                    sabadoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: null,
                                        sabadoFin1RangoDescanso: null,
                                        sabadoInicio2RangoDescanso: null,
                                        sabadoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicio1RangoDescanso: null,
                                            sabadoFin1RangoDescanso: null,
                                            sabadoInicio2RangoDescanso: null,
                                            sabadoFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                            sabadoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                            sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                            sabadoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicio1RangoDescanso: null,
                                    sabadoFin1RangoDescanso: null,
                                    sabadoInicio2RangoDescanso: null,
                                    sabadoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: null,
                                        sabadoFin1RangoDescanso: null,
                                        sabadoInicio2RangoDescanso: null,
                                        sabadoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                        sabadoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                        sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                        sabadoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoInicio1RangoDescanso: null,
                            domingoFin1RangoDescanso: null,
                            domingoInicio2RangoDescanso: null,
                            domingoFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicio1RangoDescanso: null,
                                    domingoFin1RangoDescanso: null,
                                    domingoInicio2RangoDescanso: null,
                                    domingoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: null,
                                        domingoFin1RangoDescanso: null,
                                        domingoInicio2RangoDescanso: null,
                                        domingoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicio1RangoDescanso: null,
                                            domingoFin1RangoDescanso: null,
                                            domingoInicio2RangoDescanso: null,
                                            domingoFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                            domingoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                            domingoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                            domingoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicio1RangoDescanso: null,
                                    domingoFin1RangoDescanso: null,
                                    domingoInicio2RangoDescanso: null,
                                    domingoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: null,
                                        domingoFin1RangoDescanso: null,
                                        domingoInicio2RangoDescanso: null,
                                        domingoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                        domingoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                        domingoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                        domingoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
            });
            break;
        case 'cantidad':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
            });
            break;
        default:
    };
    return {
        columnaAnadir,
        hayTrabajador
    };
};

const retornaMinutosAccionEnCuadrantes = (primeraHora, segundaHora) => {
    if (primeraHora && segundaHora) {
        let myArrSplit1 = primeraHora.split(":");
        const horasPrimeraHora = parseInt(myArrSplit1[0]);
        const minutosPrimeraHora = parseInt(myArrSplit1[1]);
        const minutosTotalesPrimeraHora = (horasPrimeraHora * 60) + minutosPrimeraHora;
        let myArrSplit2 = segundaHora.split(":");
        const horasSegundaHora = parseInt(myArrSplit2[0]);
        const minutosSegundaHora = parseInt(myArrSplit2[1]);
        const minutosTotalesSegundaHora = (horasSegundaHora * 60) + minutosSegundaHora;
        const diff = minutosTotalesSegundaHora - minutosTotalesPrimeraHora;
        return diff;
    }
}

export const gestionarInformeAccion = (cuadrante, centro) => (dispatch, getState) => {
    let arrayResultante = [];
    let sumatorioHoras;
    let sumatorioHorasNormal_L;
    let sumatorioHorasExtra_L;
    let sumatorioHorasNormal_E;
    let sumatorioHorasExtra_E;
    let sumatorioHorasNormal_P;
    let sumatorioHorasExtra_P;
    let sumatorioHorasNormal_N;
    let sumatorioHorasExtra_N;
    let sumatorioHorasNormal_R;
    let sumatorioHorasExtra_R;
    let sumatorioHorasNormal_L1;
    let sumatorioHorasExtra_L1;
    let sumatorioHorasNormal_L2;
    let sumatorioHorasExtra_L2;
    let sumatorioHorasNormal_F;
    let sumatorioHorasExtra_F;
    let lasHorasNormal;
    let lasHorasExtra;
    cuadrante.forEach((cuadranteColumna, index) => {
        switch (cuadranteColumna.tipoHorario) {
            case 'rango':
                arrayResultante.push({
                    trabajador: cuadranteColumna.idTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
                    //si se quisieran contabilizar los días/hora concretos activar el array cómputo
                    computo: [],
                    totalHorasNormal_L: null,
                    totalHorasExtra_L: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHorasNormal_N: null,
                    totalHorasExtra_N: null,
                    totalHorasNormal_R: null,
                    totalHorasExtra_R: null,
                    totalHorasNormal_L1: null,
                    totalHorasExtra_L1: null,
                    totalHorasNormal_L2: null,
                    totalHorasExtra_L2: null,
                    totalHorasNormal_F: null,
                    totalHorasExtra_F: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
                sumatorioHorasNormal_N = 0;
                sumatorioHorasExtra_N = 0;
                sumatorioHorasNormal_R = 0;
                sumatorioHorasExtra_R = 0;
                sumatorioHorasNormal_L1 = 0;
                sumatorioHorasExtra_L1 = 0;
                sumatorioHorasNormal_L2 = 0;
                sumatorioHorasExtra_L2 = 0;
                sumatorioHorasNormal_F = 0;
                sumatorioHorasExtra_F = 0;
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        const mySplit = prop.split('Lunes');
                        if (cuadranteColumna[prop].lunesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Lunes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Martes')) {
                        const mySplit = prop.split('Martes');
                        if (cuadranteColumna[prop].martesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Martes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        const mySplit = prop.split('Miércoles');
                        if (cuadranteColumna[prop].miercolesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Miércoles-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Jueves')) {
                        const mySplit = prop.split('Jueves');
                        if (cuadranteColumna[prop].juevesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Jueves-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Viernes')) {
                        const mySplit = prop.split('Viernes');
                        if (cuadranteColumna[prop].viernesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Viernes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Sábado')) {
                        const mySplit = prop.split('Sábado');
                        if (cuadranteColumna[prop].sabadoInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Sábado-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Domingo')) {
                        const mySplit = prop.split('Domingo');
                        if (cuadranteColumna[prop].domingoInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Domingo-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                    arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                    arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                    arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                    arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                    arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                    arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                    arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                    arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                    arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                    arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                    arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                    arrayResultante[index].totalHoras = sumatorioHoras;
                }
                break;
            case 'rangoDescanso':
                arrayResultante.push({
                    trabajador: cuadranteColumna.idTrabajador,
                    //trabajadorNombre: cuadranteColumna.nombreTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
                    computo: [],
                    totalHorasNormal_L: null,
                    totalHorasExtra_L: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHorasNormal_N: null,
                    totalHorasExtra_N: null,
                    totalHorasNormal_R: null,
                    totalHorasExtra_R: null,
                    totalHorasNormal_L1: null,
                    totalHorasExtra_L1: null,
                    totalHorasNormal_L2: null,
                    totalHorasExtra_L2: null,
                    totalHorasNormal_F: null,
                    totalHorasExtra_F: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
                sumatorioHorasNormal_N = 0;
                sumatorioHorasExtra_N = 0;
                sumatorioHorasNormal_R = 0;
                sumatorioHorasExtra_R = 0;
                sumatorioHorasNormal_L1 = 0;
                sumatorioHorasExtra_L1 = 0;
                sumatorioHorasNormal_L2 = 0;
                sumatorioHorasExtra_L2 = 0;
                sumatorioHorasNormal_F = 0;
                sumatorioHorasExtra_F = 0;
                let rango1, rango2;
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        const mySplit = prop.split('Lunes');
                        if (cuadranteColumna[prop].lunesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicio1RangoDescanso, cuadranteColumna[prop].lunesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].lunesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicio2RangoDescanso, cuadranteColumna[prop].lunesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Lunes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Martes')) {
                        const mySplit = prop.split('Martes');
                        if (cuadranteColumna[prop].martesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicio1RangoDescanso, cuadranteColumna[prop].martesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].martesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicio2RangoDescanso, cuadranteColumna[prop].martesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Martes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Miércoles')) {
                        const mySplit = prop.split('Miércoles');
                        if (cuadranteColumna[prop].miercolesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicio1RangoDescanso, cuadranteColumna[prop].miercolesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].miercolesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicio2RangoDescanso, cuadranteColumna[prop].miercolesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Miércoles-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Jueves')) {
                        const mySplit = prop.split('Jueves');
                        if (cuadranteColumna[prop].juevesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicio1RangoDescanso, cuadranteColumna[prop].juevesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].juevesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicio2RangoDescanso, cuadranteColumna[prop].juevesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Jueves-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Viernes')) {
                        const mySplit = prop.split('Viernes');
                        if (cuadranteColumna[prop].viernesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicio1RangoDescanso, cuadranteColumna[prop].viernesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].viernesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicio2RangoDescanso, cuadranteColumna[prop].viernesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Viernes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Sábado')) {
                        const mySplit = prop.split('Sábado');
                        if (cuadranteColumna[prop].sabadoInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicio1RangoDescanso, cuadranteColumna[prop].sabadoFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].sabadoInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicio2RangoDescanso, cuadranteColumna[prop].sabadoFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Sábado-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Domingo')) {
                        const mySplit = prop.split('Domingo');
                        if (cuadranteColumna[prop].domingoInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicio1RangoDescanso, cuadranteColumna[prop].domingoFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].domingoInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicio2RangoDescanso, cuadranteColumna[prop].domingoFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Domingo-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                    arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                    arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                    arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                    arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                    arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                    arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                    arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                    arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                    arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                    arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                    arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                    arrayResultante[index].totalHoras = sumatorioHoras;
                }
                break;
            case 'cantidad':
                arrayResultante.push({
                    trabajador: cuadranteColumna.idTrabajador,
                    //trabajadorNombre: cuadranteColumna.nombreTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
                    computo: [],
                    totalHorasNormal_L: null,
                    totalHorasExtra_L: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHorasNormal_N: null,
                    totalHorasExtra_N: null,
                    totalHorasNormal_R: null,
                    totalHorasExtra_R: null,
                    totalHorasNormal_L1: null,
                    totalHorasExtra_L1: null,
                    totalHorasNormal_L2: null,
                    totalHorasExtra_L2: null,
                    totalHorasNormal_F: null,
                    totalHorasExtra_F: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
                sumatorioHorasNormal_N = 0;
                sumatorioHorasExtra_N = 0;
                sumatorioHorasNormal_R = 0;
                sumatorioHorasExtra_R = 0;
                sumatorioHorasNormal_L1 = 0;
                sumatorioHorasExtra_L1 = 0;
                sumatorioHorasNormal_L2 = 0;
                sumatorioHorasExtra_L2 = 0;
                sumatorioHorasNormal_F = 0;
                sumatorioHorasExtra_F = 0;
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        const mySplit = prop.split('Lunes');
                        if (cuadranteColumna[prop].lunesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].lunesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Lunes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Martes')) {
                        const mySplit = prop.split('Martes');
                        if (cuadranteColumna[prop].martesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].martesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Martes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Miércoles')) {
                        const mySplit = prop.split('Miércoles');
                        if (cuadranteColumna[prop].miercolesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].miercolesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Miércoles-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Jueves')) {
                        const mySplit = prop.split('Jueves');
                        if (cuadranteColumna[prop].juevesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].juevesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Jueves-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Viernes')) {
                        const mySplit = prop.split('Viernes');
                        if (cuadranteColumna[prop].viernesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].viernesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Viernes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Sábado')) {
                        const mySplit = prop.split('Sábado');
                        if (cuadranteColumna[prop].sabadoCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].sabadoCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Sábado-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Domingo')) {
                        const mySplit = prop.split('Domingo');
                        if (cuadranteColumna[prop].domingoCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].domingoCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Domingo-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                    arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                    arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                    arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                    arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                    arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                    arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                    arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                    arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                    arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                    arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                    arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                    arrayResultante[index].totalHoras = sumatorioHoras;
                }
                break;
            default:
        }
    });
    return arrayResultante;
};

export const limpiarCuadranteAccion = (cuadrante) => (dispatch, getState) => {
    let arrayResultante = [];
    cuadrante.forEach((cuadranteColumna, index) => {
        let objetoResultante = {};
        objetoResultante.nombreTrabajador = cuadranteColumna.nombreTrabajador;
        objetoResultante.idTrabajador = cuadranteColumna.idTrabajador;
        objetoResultante.tipoHorario = cuadranteColumna.tipoHorario;
        objetoResultante.tipoTrabajador = cuadranteColumna.tipoTrabajador;
        objetoResultante.hayBaja = cuadranteColumna.hayBaja;
        switch (cuadranteColumna.tipoHorario) {
            case 'rango':
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        if (cuadranteColumna[prop].lunesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                };
                break;
            case 'rangoDescanso':
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        if (cuadranteColumna[prop].lunesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                };
                break;
            case 'cantidad':
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        if (cuadranteColumna[prop].lunesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                };
                break;
        };
        arrayResultante.push(objetoResultante);
    });
    return arrayResultante
};

export const completarCuadranteAccion = (losDiasDelMes, cuadrante) => (dispatch, getState) => {
    let arrayResultante = [];
    let arrayFestivos = [];
    cuadrante.forEach((cuadranteColumna, index) => {
        let objetoResultante = {};
        objetoResultante.nombreTrabajador = cuadranteColumna.nombreTrabajador;
        objetoResultante.idTrabajador = cuadranteColumna.idTrabajador;
        objetoResultante.tipoHorario = cuadranteColumna.tipoHorario;
        objetoResultante.tipoTrabajador = cuadranteColumna.tipoTrabajador;
        objetoResultante.hayBaja = cuadranteColumna.hayBaja;
        switch (cuadranteColumna.tipoHorario) {
            case 'rango':
                losDiasDelMes.forEach((dia, index) => {
                    let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;                    
                    if (hasKey) {
                        objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                        if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                            arrayFestivos.push([dia[1][0], dia[0][0]]);
                        };
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                lunesInicioRango: null,
                                lunesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Martes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                martesInicioRango: null,
                                martesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Miércoles') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                miercolesInicioRango: null,
                                miercolesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Jueves') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                juevesInicioRango: null,
                                juevesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Viernes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                viernesInicioRango: null,
                                viernesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Sábado') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                sabadoInicioRango: null,
                                sabadoFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Domingo') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                domingoInicioRango: null,
                                domingoFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                    };
                });
                break;
            case 'rangoDescanso':
                losDiasDelMes.forEach((dia, index) => {
                    let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;                    
                    if (hasKey) {
                        objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                        if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                            arrayFestivos.push([dia[1][0], dia[0][0]]);
                        };
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                lunesInicio1RangoDescanso: null,
                                lunesFin1RangoDescanso: null,
                                lunesInicio2RangoDescanso: null,
                                lunesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Martes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                martesInicio1RangoDescanso: null,
                                martesFin1RangoDescanso: null,
                                martesInicio2RangoDescanso: null,
                                martesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Miércoles') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                miercolesInicio1RangoDescanso: null,
                                miercolesFin1RangoDescanso: null,
                                miercolesInicio2RangoDescanso: null,
                                miercolesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Jueves') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                juevesInicio1RangoDescanso: null,
                                juevesFin1RangoDescanso: null,
                                juevesInicio2RangoDescanso: null,
                                juevesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Viernes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                viernesInicio1RangoDescanso: null,
                                viernesFin1RangoDescanso: null,
                                viernesInicio2RangoDescanso: null,
                                viernesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Sábado') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                sabadoInicio1RangoDescanso: null,
                                sabadoFin1RangoDescanso: null,
                                sabadoInicio2RangoDescanso: null,
                                sabadoFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Domingo') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                domingoInicio1RangoDescanso: null,
                                domingoFin1RangoDescanso: null,
                                domingoInicio2RangoDescanso: null,
                                domingoFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                    };
                });
                break;
            case 'cantidad':
                losDiasDelMes.forEach((dia, index) => {
                    let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;                 
                    if (hasKey) {
                        objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                        if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                            arrayFestivos.push([dia[1][0], dia[0][0]]);
                        };
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                lunesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Martes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                martesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Miércoles') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                miercolesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Jueves') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                juevesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Viernes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                viernesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Sábado') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                sabadoCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Domingo') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                domingoCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                    };                  
                });
                break;
        };
        arrayResultante.push(objetoResultante);
    });
    return {
        arrayResultante,
        arrayFestivos
    };
};