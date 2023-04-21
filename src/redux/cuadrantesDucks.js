import axios from 'axios';
import Constantes from "../constantes";
import { parse } from 'zipson';

//constantes
const rutaApi = Constantes.RUTA_API;
const formaPago = Constantes.FORMA_DE_PAGO;
const tiposServicioFijo = Constantes.TIPO_SERVICIO_FIJO;
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
            datosInforme: [],
            tocaFacturar: {
                valor: 'si',
                razon: ''
            }
        },
        datosBuffer: {
            objeto: 'buffer',
            datosBuffer: []
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
    totalesPeriodicos: {
        total: null,
        noExisteCuadrante: false,
        totalesHoras: [],
        totalesServicios: [],
    }
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
const SET_TOTALESPERIODICOS = 'SET_TOTALESPERIODICOS';
const RESETEA_TOTALESPERIODICOS = 'RESETEA_TOTALESPERIODICOS';

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
        case SET_TOTALESPERIODICOS:
            return {
                ...state,
                totalesPeriodicos: {
                    total: ((state.noExisteCuadrante || action.payload.noExisteCuadrante) ? 0 : state.totalesPeriodicos.total += action.payload.totales),
                    noExisteCuadrante: action.payload.noExisteCuadrante,
                    totalesHoras: (state.noExisteCuadrante || action.payload.noExisteCuadrante) ? null : action.payload.totalesHoras,
                    totalesServicios: (state.noExisteCuadrante || action.payload.noExisteCuadrante) ? null : action.payload.totalesServicios,
                },
            }
        case RESETEA_TOTALESPERIODICOS:
            return { ...state, totalesPeriodicos: action.payload.objeto }
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
    return new Promise((resolve, reject) => {
        resolve({ payload: true });
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
                datosInforme: [],
                tocaFacturar: {
                    valor: 'si',
                    razon: ''
                }
            },
            datosBuffer: {
                objeto: 'buffer',
                datosBuffer: []
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
                    datosCuadrante: parse(res.data.datos_cuadrante),
                    datosServicios: res.data.datos_servicios ? parse(res.data.datos_servicios) : dataInicial.objetoCuadrante.datosServicios,
                    datosInforme: res.data.datos_informe ? parse(res.data.datos_informe) : dataInicial.objetoCuadrante.datosInforme,
                    datosBuffer: res.data.datos_buffer ? parse(res.data.datos_buffer) : dataInicial.objetoCuadrante.datosBuffer,
                    estado: res.data.estado,
                    total: res.data.total ? parse(res.data.total) : dataInicial.objetoCuadrante.total,
                    horas: res.data.horas ? parse(res.data.horas) : dataInicial.objetoCuadrante.horas
                }
            });
        };
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES
        });
    };
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
        let apiUrl = rutaApi + "eliminar_cuadrante.php";
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

export const obtenerCuadrantesPeriodicosAccion = (objeto, calendarioAGestionar, periodo, idCentro) => (dispatch, getState) => {
    dispatch({
        type: LOADING_CUADRANTES
    });
    const arrayNombresCuadrantes = [];
    let myArrSplit = calendarioAGestionar.split("-");
    const mes = parseInt(myArrSplit[1]);
    const anyo = parseInt(myArrSplit[0]);
    let variableMeses;
    if (periodo === 'bimensual') {
        variableMeses = mes - 1;
        arrayNombresCuadrantes.push(anyo + '-' + variableMeses + '-' + idCentro);
    };
    if (periodo === 'trimestral') {
        for (let i = 1; i <= 2; i++) {
            variableMeses = mes - i;
            arrayNombresCuadrantes.push(anyo + '-' + variableMeses + '-' + idCentro)
        };
    };
    try {
        let totalObjeto = {};
        arrayNombresCuadrantes.forEach(async (cuadrante, index) => {
            let noExisteCuadrante = false;
            const formData = new FormData();
            formData.append("objeto", objeto);
            formData.append("nombre", cuadrante);
            let apiUrl = rutaApi + "obtener_periodicos.php";
            const res = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.data === false) {
                noExisteCuadrante = true;
            } else {
                totalObjeto = parse(res.data.total);
            };
            dispatch({
                type: SET_TOTALESPERIODICOS,
                payload: {
                    totales: parseFloat(totalObjeto.total),
                    noExisteCuadrante: noExisteCuadrante,
                    totalesHoras: dispatch(retornaHorasServicios(totalObjeto)),
                    totalesServicios: dispatch(retornaTotalesServicios(totalObjeto))
                }
            })
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CUADRANTES
        })
    }
};

const retornaHorasServicios = (totalObjeto) => (dispatch, getState) => {
    const { totalesPeriodicos } = getState().variablesCuadrantes;
    let objetoRetornoHoras = {};
    totalObjeto.LH && (objetoRetornoHoras.LH = totalObjeto.LH);
    totalObjeto.EH && (objetoRetornoHoras.EH = totalObjeto.EH);
    totalObjeto.PH && (objetoRetornoHoras.PH = totalObjeto.PH);
    totalObjeto.NH && (objetoRetornoHoras.NH = totalObjeto.NH);
    totalObjeto.RH && (objetoRetornoHoras.RH = totalObjeto.RH);
    totalObjeto.L1H && (objetoRetornoHoras.L1H = totalObjeto.L1H);
    totalObjeto.L2H && (objetoRetornoHoras.L2H = totalObjeto.L2H);
    totalObjeto.FH && (objetoRetornoHoras.FH = totalObjeto.FH);
    if (objetoRetornoHoras.LH) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.LH) {
            objetoRetornoHoras.LH += totalesPeriodicos.totalesHoras.LH;
        };
    };
    if (objetoRetornoHoras.EH) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.EH) {
            objetoRetornoHoras.EH += totalesPeriodicos.totalesHoras.EH;
        };
    };
    if (objetoRetornoHoras.PH) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.PH) {
            objetoRetornoHoras.PH += totalesPeriodicos.totalesHoras.PH;
        };
    };
    if (objetoRetornoHoras.NH) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.NH) {
            objetoRetornoHoras.NH += totalesPeriodicos.totalesHoras.NH;
        };
    };
    if (objetoRetornoHoras.RH) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.RH) {
            objetoRetornoHoras.RH += totalesPeriodicos.totalesHoras.RH;
        };
    };
    if (objetoRetornoHoras.L1H) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.L1H) {
            objetoRetornoHoras.L1H += totalesPeriodicos.totalesHoras.L1H;
        };
    };
    if (objetoRetornoHoras.L2H) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.L2H) {
            objetoRetornoHoras.L2H += totalesPeriodicos.totalesHoras.L2H;
        };
    };
    if (objetoRetornoHoras.FH) {
        if (totalesPeriodicos.totalesHoras && totalesPeriodicos.totalesHoras.FH) {
            objetoRetornoHoras.FH += totalesPeriodicos.totalesHoras.FH;
        };
    };
    return objetoRetornoHoras;
};

const retornaTotalesServicios = (totalObjeto) => (dispatch, getState) => {
    const { totalesPeriodicos } = getState().variablesCuadrantes;   
    let objetoRetornoServicios = {};
    totalObjeto.MT && (objetoRetornoServicios.MT = totalObjeto.MT);
    totalObjeto.LT && (objetoRetornoServicios.LT = totalObjeto.LT);
    totalObjeto.ET && (objetoRetornoServicios.ET = totalObjeto.ET);
    totalObjeto.PT && (objetoRetornoServicios.PT = totalObjeto.PT);
    totalObjeto.NT && (objetoRetornoServicios.NT = totalObjeto.NT);
    totalObjeto.RT && (objetoRetornoServicios.RT = totalObjeto.RT);
    totalObjeto.L1T && (objetoRetornoServicios.L1T = totalObjeto.L1T);
    totalObjeto.L2T && (objetoRetornoServicios.L2T = totalObjeto.L2T);
    totalObjeto.FT && (objetoRetornoServicios.FT = totalObjeto.FT);
    totalObjeto.TOT && (objetoRetornoServicios.TOT = totalObjeto.TOT);
    totalObjeto.CRT && (objetoRetornoServicios.CRT = totalObjeto.CRT);
    totalObjeto.CET && (objetoRetornoServicios.CET = totalObjeto.CET);
    totalObjeto.CIT && (objetoRetornoServicios.CIT = totalObjeto.CIT);
    totalObjeto.MOT && (objetoRetornoServicios.MOT = totalObjeto.MOT);
    totalObjeto.OFT && (objetoRetornoServicios.OFT = totalObjeto.OFT);
    totalObjeto.ALT && (objetoRetornoServicios.ALT = totalObjeto.ALT);
    totalObjeto.LAT && (objetoRetornoServicios.LAT = totalObjeto.LAT);
    totalObjeto.TET && (objetoRetornoServicios.TET = totalObjeto.TET);
    totalObjeto.FIT && (objetoRetornoServicios.FIT = totalObjeto.FIT);
    totalObjeto.FET && (objetoRetornoServicios.FET = totalObjeto.FET);
    totalObjeto.ABT && (objetoRetornoServicios.ABT = totalObjeto.ABT);
    totalObjeto.MAT && (objetoRetornoServicios.MAT = totalObjeto.MAT);
    totalObjeto.POT && (objetoRetornoServicios.POT = totalObjeto.POT);
    totalObjeto.BAT && (objetoRetornoServicios.BAT = totalObjeto.BAT);
    totalObjeto.FTT && (objetoRetornoServicios.FTT = totalObjeto.FTT);
    totalObjeto.C3T && (objetoRetornoServicios.C3T = totalObjeto.C3T);
    totalObjeto.C2T && (objetoRetornoServicios.C2T = totalObjeto.C2T);
    totalObjeto.C4T && (objetoRetornoServicios.C4T = totalObjeto.C4T);
    totalObjeto.EST && (objetoRetornoServicios.EST = totalObjeto.EST);
    totalObjeto.PAT && (objetoRetornoServicios.PAT = totalObjeto.PAT);
    totalObjeto.FRT && (objetoRetornoServicios.FRT = totalObjeto.FRT);
    totalObjeto.NUMCT && (objetoRetornoServicios.NUMCT = totalObjeto.NUMCT);    
    if (objetoRetornoServicios.MT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.MT) {
            objetoRetornoServicios.MT += totalesPeriodicos.totalesServicios.MT;
        };
    };
    if (objetoRetornoServicios.LT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.LT) {
            objetoRetornoServicios.LT += totalesPeriodicos.totalesServicios.LT;
        };
    };
    if (objetoRetornoServicios.ET) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.ET) {
            objetoRetornoServicios.ET += totalesPeriodicos.totalesServicios.ET;
        };
    };
    if (objetoRetornoServicios.PT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.PT) {
            objetoRetornoServicios.PT += totalesPeriodicos.totalesServicios.PT;
        };
    };
    if (objetoRetornoServicios.NT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.NT) {
            objetoRetornoServicios.NT += totalesPeriodicos.totalesServicios.NT;
        };
    };
    if (objetoRetornoServicios.RT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.RT) {
            objetoRetornoServicios.RT += totalesPeriodicos.totalesServicios.RT;
        };
    };
    if (objetoRetornoServicios.L1T) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.L1T) {
            objetoRetornoServicios.L1T += totalesPeriodicos.totalesServicios.L1T;
        };
    };
    if (objetoRetornoServicios.L2T) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.L2T) {
            objetoRetornoServicios.L2T += totalesPeriodicos.totalesServicios.L2T;
        };
    };
    if (objetoRetornoServicios.FT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.FT) {
            objetoRetornoServicios.FT += totalesPeriodicos.totalesServicios.FT;
        };
    };
    if (objetoRetornoServicios.TOT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.TOT) {
            objetoRetornoServicios.TOT += totalesPeriodicos.totalesServicios.TOT;
        };
    };
    if (objetoRetornoServicios.CRT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.CRT) {
            objetoRetornoServicios.CRT += totalesPeriodicos.totalesServicios.CRT;
        };
    };
    if (objetoRetornoServicios.CET) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.CET) {
            objetoRetornoServicios.CET += totalesPeriodicos.totalesServicios.CET;
        };
    };
    if (objetoRetornoServicios.CIT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.CIT) {
            objetoRetornoServicios.CIT += totalesPeriodicos.totalesServicios.CIT;
        };
    };
    if (objetoRetornoServicios.MOT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.MOT) {
            objetoRetornoServicios.MOT += totalesPeriodicos.totalesServicios.MOT;
        };
    };
    if (objetoRetornoServicios.OFT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.OFT) {
            objetoRetornoServicios.OFT += totalesPeriodicos.totalesServicios.OFT;
        };
    };
    if (objetoRetornoServicios.ALT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.ALT) {
            objetoRetornoServicios.ALT += totalesPeriodicos.totalesServicios.ALT;
        };
    };
    if (objetoRetornoServicios.LAT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.LAT) {
            objetoRetornoServicios.LAT += totalesPeriodicos.totalesServicios.LAT;
        };
    };
    if (objetoRetornoServicios.TET) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.TET) {
            objetoRetornoServicios.TET += totalesPeriodicos.totalesServicios.TET;
        };
    };
    if (objetoRetornoServicios.FIT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.FIT) {
            objetoRetornoServicios.FIT += totalesPeriodicos.totalesServicios.FIT;
        };
    };
    if (objetoRetornoServicios.FET) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.FET) {
            objetoRetornoServicios.FET += totalesPeriodicos.totalesServicios.FET;
        };
    };
    if (objetoRetornoServicios.ABT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.ABT) {
            objetoRetornoServicios.ABT += totalesPeriodicos.totalesServicios.ABT;
        };
    };
    if (objetoRetornoServicios.MAT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.MAT) {
            objetoRetornoServicios.MAT += totalesPeriodicos.totalesServicios.MAT;
        };
    };
    if (objetoRetornoServicios.POT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.POT) {
            objetoRetornoServicios.POT += totalesPeriodicos.totalesServicios.POT;
        };
    };
    if (objetoRetornoServicios.BAT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.BAT) {
            objetoRetornoServicios.BAT += totalesPeriodicos.totalesServicios.BAT;
        };
    };
    if (objetoRetornoServicios.FTT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.FTT) {
            objetoRetornoServicios.FTT += totalesPeriodicos.totalesServicios.FTT;
        };
    };
    if (objetoRetornoServicios.C3T) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.C3T) {
            objetoRetornoServicios.C3T += totalesPeriodicos.totalesServicios.C3T;
        };
    };
    if (objetoRetornoServicios.C2T) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.C2T) {
            objetoRetornoServicios.C2T += totalesPeriodicos.totalesServicios.C2T;
        };
    };
    if (objetoRetornoServicios.C4T) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.C4T) {
            objetoRetornoServicios.C4T += totalesPeriodicos.totalesServicios.C4T;
        };
    };
    if (objetoRetornoServicios.EST) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.EST) {
            objetoRetornoServicios.EST += totalesPeriodicos.totalesServicios.EST;
        };
    };
    if (objetoRetornoServicios.PAT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.PAT) {
            objetoRetornoServicios.PAT += totalesPeriodicos.totalesServicios.PAT;
        };
    };
    if (objetoRetornoServicios.FRT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.FRT) {
            objetoRetornoServicios.FRT += totalesPeriodicos.totalesServicios.FRT;
        };
    };
    if (objetoRetornoServicios.NUMCT) {
        if (totalesPeriodicos.totalesServicios && totalesPeriodicos.totalesServicios.NUMCT) {
            objetoRetornoServicios.NUMCT = totalesPeriodicos.totalesServicios.NUMCT;
        };
    };
    return objetoRetornoServicios;
};

export const reseteaTotalesPeriodicosAccion = () => (dispatch, getState) => {
    dispatch({
        type: RESETEA_TOTALESPERIODICOS,
        payload: {
            objeto: {
                total: null,
                noExisteCuadrante: false,
                totalesHoras: [],
                totalesServicios: []
            }
        }
    });
};