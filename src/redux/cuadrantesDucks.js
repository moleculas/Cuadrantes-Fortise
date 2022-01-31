import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
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
            arrayCuadrante: []
        },
        datosInforme: {
            objeto: 'informe',
            computo: '',
            mensualPactado: null,
            precioHora: null,
            arrayTrabajadores: [],
            totalFacturado_M: null,
            totalFacturado_L: null,
            totalFacturado_C: null,
            totalFacturado_E: null,
            totalFacturado_I: null,
            totalFacturado_Z: null,
            totalFacturado_T: null,
            totalFacturado_P: null,
        },
        estado: 'registrado',
        total: null,
        horas: {
            objeto: 'horas',
            M: null,
            L: null,
            C: null,
            E: null,
            I: null,
            Z: null,
            T: null,
            P: null
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
                arrayCuadrante: []
            },
            datosInforme: {
                objeto: 'informe',
                computo: '',
                mensualPactado: null,
                precioHora: null,
                arrayTrabajadores: [],
                totalFacturado_M: null,
                totalFacturado_L: null,
                totalFacturado_C: null,
                totalFacturado_E: null,
                totalFacturado_I: null,
                totalFacturado_Z: null,
                totalFacturado_T: null,
                totalFacturado_P: null,
            },
            estado: 'registrado',
            total: null,
            horas: {
                objeto: 'horas',
                M: null,
                L: null,
                C: null,
                E: null,
                I: null,
                Z: null,
                T: null,
                P: null
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
                    datosInforme: JSON.parse(res.data.datos_informe),
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
        if (centroAGestionar.horario.tipoRegistroTrabajador[0][item]) {
            return centroAGestionar.horario.tipoRegistroTrabajador[0][item];
        } else {
            if (comillas) {
                return '';
            } else {
                return null;
            }
        }
    } else {
        if (esInicio) {
            if (centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                return centroAGestionar.horario.tipoRegistroTrabajador[posicionTrabajador - 1][item];
            } else {
                if (comillas) {
                    return '';
                } else {
                    return null;
                }
            }
        } else {
            if (tipoTrabajador === 'trabajador') {
                if (posicionTrabajador > cantidadTrabajadoresCentro) {
                    if (centroAGestionar.horario.tipoRegistroTrabajador[0][item]) {
                        return centroAGestionar.horario.tipoRegistroTrabajador[0][item];
                    } else {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
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
                if (posicionTrabajador > cantidadTrabajadoresCentro) {
                    if (centroAGestionar.horario.tipoRegistroTrabajador[0][item]) {
                        return centroAGestionar.horario.tipoRegistroTrabajador[0][item];
                    } else {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
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
    posicionTrabajador
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
                tipoHorario: centroAGestionar.horario.tipo,
                tipoTrabajador: tipoTrabajador,
            };
        } else {
            columnaAnadir = {
                nombreTrabajador: trabajador.nombre,
                idTrabajador: trabajador.id,
                tipoHorario: centroAGestionar.horario.tipo,
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
            tipoHorario: centroAGestionar.horario.tipo,
            tipoTrabajador: tipoTrabajador,
        };
        hayTrabajador = false;
        columnaAnadir['hayBaja'] = false;
    };
    switch (centroAGestionar.horario.tipo) {
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
                                            lunesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesInicioRango'),
                                            lunesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesTipoServicio'),
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
                                        lunesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesInicioRango'),
                                        lunesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesTipoServicio'),
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
                                            martesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesInicioRango'),
                                            martesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesTipoServicio'),
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
                                        martesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesInicioRango'),
                                        martesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesTipoServicio'),
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
                                            miercolesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesInicioRango'),
                                            miercolesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesTipoServicio'),
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
                                        miercolesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesInicioRango'),
                                        miercolesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesTipoServicio'),
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
                                            juevesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesInicioRango'),
                                            juevesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesTipoServicio'),
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
                                        juevesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesInicioRango'),
                                        juevesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesTipoServicio'),
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
                                            viernesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesInicioRango'),
                                            viernesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesTipoServicio'),
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
                                        viernesInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesInicioRango'),
                                        viernesFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesTipoServicio'),
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
                                            sabadoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoInicioRango'),
                                            sabadoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoTipoServicio'),
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
                                        sabadoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoInicioRango'),
                                        sabadoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoTipoServicio'),
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
                                            domingoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoInicioRango'),
                                            domingoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoTipoServicio'),
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
                                        domingoInicioRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoInicioRango'),
                                        domingoFinRango: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoTipoServicio'),
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
                                            lunesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesInicio1RangoDescanso'),
                                            lunesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesFin1RangoDescanso'),
                                            lunesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesInicio2RangoDescanso'),
                                            lunesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesTipoServicio'),
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
                                        lunesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesInicio1RangoDescanso'),
                                        lunesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesFin1RangoDescanso'),
                                        lunesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesInicio2RangoDescanso'),
                                        lunesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesTipoServicio'),
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
                                            martesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesInicio1RangoDescanso'),
                                            martesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesFin1RangoDescanso'),
                                            martesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesInicio2RangoDescanso'),
                                            martesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesTipoServicio'),
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
                                        martesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesInicio1RangoDescanso'),
                                        martesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesFin1RangoDescanso'),
                                        martesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesInicio2RangoDescanso'),
                                        martesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesTipoServicio'),
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
                                            miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesInicio1RangoDescanso'),
                                            miercolesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesFin1RangoDescanso'),
                                            miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesInicio2RangoDescanso'),
                                            miercolesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesTipoServicio'),
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
                                        miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesInicio1RangoDescanso'),
                                        miercolesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesFin1RangoDescanso'),
                                        miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesInicio2RangoDescanso'),
                                        miercolesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesTipoServicio'),
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
                                            juevesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesInicio1RangoDescanso'),
                                            juevesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesFin1RangoDescanso'),
                                            juevesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesInicio2RangoDescanso'),
                                            juevesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesTipoServicio'),
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
                                        juevesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesInicio1RangoDescanso'),
                                        juevesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesFin1RangoDescanso'),
                                        juevesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesInicio2RangoDescanso'),
                                        juevesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesTipoServicio'),
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
                                            viernesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesInicio1RangoDescanso'),
                                            viernesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesFin1RangoDescanso'),
                                            viernesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesInicio2RangoDescanso'),
                                            viernesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesTipoServicio'),
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
                                        viernesInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesInicio1RangoDescanso'),
                                        viernesFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesFin1RangoDescanso'),
                                        viernesInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesInicio2RangoDescanso'),
                                        viernesFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesTipoServicio'),
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
                                            sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoInicio1RangoDescanso'),
                                            sabadoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoFin1RangoDescanso'),
                                            sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoInicio2RangoDescanso'),
                                            sabadoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoTipoServicio'),
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
                                        sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoInicio1RangoDescanso'),
                                        sabadoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoFin1RangoDescanso'),
                                        sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoInicio2RangoDescanso'),
                                        sabadoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoTipoServicio'),
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
                                            domingoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoInicio1RangoDescanso'),
                                            domingoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoFin1RangoDescanso'),
                                            domingoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoInicio2RangoDescanso'),
                                            domingoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoTipoServicio'),
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
                                        domingoInicio1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoInicio1RangoDescanso'),
                                        domingoFin1RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoFin1RangoDescanso'),
                                        domingoInicio2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoInicio2RangoDescanso'),
                                        domingoFin2RangoDescanso: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoTipoServicio'),
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
                                            lunesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesTipoServicio'),
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
                                        lunesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'lunesTipoServicio'),
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
                                            martesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesTipoServicio'),
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
                                        martesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'martesTipoServicio'),
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
                                            miercolesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesTipoServicio'),
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
                                        miercolesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'miercolesTipoServicio'),
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
                                            juevesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesTipoServicio'),
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
                                        juevesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'juevesTipoServicio'),
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
                                            viernesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesTipoServicio'),
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
                                        viernesCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'viernesTipoServicio'),
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
                                            sabadoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoTipoServicio'),
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
                                        sabadoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'sabadoTipoServicio'),
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
                                            domingoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoTipoServicio'),
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
                                        domingoCantidad: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(centroAGestionar, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, 'domingoTipoServicio'),
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
    let sumatorioHorasNormal_C;
    let sumatorioHorasExtra_C;
    let sumatorioHorasNormal_E;
    let sumatorioHorasExtra_E;
    let sumatorioHorasNormal_I;
    let sumatorioHorasExtra_I;
    let sumatorioHorasNormal_Z;
    let sumatorioHorasExtra_Z;
    let sumatorioHorasNormal_T;
    let sumatorioHorasExtra_T;
    let sumatorioHorasNormal_P;
    let sumatorioHorasExtra_P;
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
                    totalHorasNormal_C: null,
                    totalHorasExtra_C: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_I: null,
                    totalHorasExtra_I: null,
                    totalHorasNormal_Z: null,
                    totalHorasExtra_Z: null,
                    totalHorasNormal_T: null,
                    totalHorasExtra_T: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_C = 0;
                sumatorioHorasExtra_C = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_I = 0;
                sumatorioHorasExtra_I = 0;
                sumatorioHorasNormal_Z = 0;
                sumatorioHorasExtra_Z = 0;
                sumatorioHorasNormal_T = 0;
                sumatorioHorasExtra_T = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                    arrayResultante[index].totalHorasNormal_C = sumatorioHorasNormal_C;
                    arrayResultante[index].totalHorasExtra_C = sumatorioHorasExtra_C;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_I = sumatorioHorasNormal_I;
                    arrayResultante[index].totalHorasExtra_I = sumatorioHorasExtra_I;
                    arrayResultante[index].totalHorasNormal_Z = sumatorioHorasNormal_Z;
                    arrayResultante[index].totalHorasExtra_Z = sumatorioHorasExtra_Z;
                    arrayResultante[index].totalHorasNormal_T = sumatorioHorasNormal_T;
                    arrayResultante[index].totalHorasExtra_T = sumatorioHorasExtra_T;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
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
                    totalHorasNormal_C: null,
                    totalHorasExtra_C: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_I: null,
                    totalHorasExtra_I: null,
                    totalHorasNormal_Z: null,
                    totalHorasExtra_Z: null,
                    totalHorasNormal_T: null,
                    totalHorasExtra_T: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_C = 0;
                sumatorioHorasExtra_C = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_I = 0;
                sumatorioHorasExtra_I = 0;
                sumatorioHorasNormal_Z = 0;
                sumatorioHorasExtra_Z = 0;
                sumatorioHorasNormal_T = 0;
                sumatorioHorasExtra_T = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                    arrayResultante[index].totalHorasNormal_C = sumatorioHorasNormal_C;
                    arrayResultante[index].totalHorasExtra_C = sumatorioHorasExtra_C;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_I = sumatorioHorasNormal_I;
                    arrayResultante[index].totalHorasExtra_I = sumatorioHorasExtra_I;
                    arrayResultante[index].totalHorasNormal_Z = sumatorioHorasNormal_Z;
                    arrayResultante[index].totalHorasExtra_Z = sumatorioHorasExtra_Z;
                    arrayResultante[index].totalHorasNormal_T = sumatorioHorasNormal_T;
                    arrayResultante[index].totalHorasExtra_T = sumatorioHorasExtra_T;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
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
                    totalHorasNormal_C: null,
                    totalHorasExtra_C: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_I: null,
                    totalHorasExtra_I: null,
                    totalHorasNormal_Z: null,
                    totalHorasExtra_Z: null,
                    totalHorasNormal_T: null,
                    totalHorasExtra_T: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_C = 0;
                sumatorioHorasExtra_C = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_I = 0;
                sumatorioHorasExtra_I = 0;
                sumatorioHorasNormal_Z = 0;
                sumatorioHorasExtra_Z = 0;
                sumatorioHorasNormal_T = 0;
                sumatorioHorasExtra_T = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                                case 'CRIS':
                                    sumatorioHorasNormal_C += lasHorasNormal;
                                    sumatorioHorasExtra_C += lasHorasExtra;
                                    break;
                                case 'CRISE':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'CRISI':
                                    sumatorioHorasNormal_I += lasHorasNormal;
                                    sumatorioHorasExtra_I += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_Z += lasHorasNormal;
                                    sumatorioHorasExtra_Z += lasHorasExtra;
                                    break;
                                case 'TOL':
                                    sumatorioHorasNormal_T += lasHorasNormal;
                                    sumatorioHorasExtra_T += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
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
                    arrayResultante[index].totalHorasNormal_C = sumatorioHorasNormal_C;
                    arrayResultante[index].totalHorasExtra_C = sumatorioHorasExtra_C;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_I = sumatorioHorasNormal_I;
                    arrayResultante[index].totalHorasExtra_I = sumatorioHorasExtra_I;
                    arrayResultante[index].totalHorasNormal_Z = sumatorioHorasNormal_Z;
                    arrayResultante[index].totalHorasExtra_Z = sumatorioHorasExtra_Z;
                    arrayResultante[index].totalHorasNormal_T = sumatorioHorasNormal_T;
                    arrayResultante[index].totalHorasExtra_T = sumatorioHorasExtra_T;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                    arrayResultante[index].totalHoras = sumatorioHoras;
                }
                break;
            default:
        }
    });
    return arrayResultante;
};