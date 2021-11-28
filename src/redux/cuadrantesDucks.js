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
            arrayTrabajadores: []
        }
    },
    cuadranteRegistrado: '',
    categoria: '',
    centro: '',
    esInicio: true,
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
            return { ...state, esInicio: action.payload.estado }
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
    const arrayVacio = [];
    dispatch({
        type: VACIAR_DATOS_CUADRANTES,
        payload: {
            id: null,
            nombre: '',
            actualizacion: '',
            datosCuadrante: {
                objeto: 'cuadrante',
                arrayCuadrante: arrayVacio
            },
            datosInforme: {
                objeto: 'informe',
                computo: '',
                mensualPactado: null,
                precioHora: null,
                arrayTrabajadores: arrayVacio
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
                    datosInforme: JSON.parse(res.data.datos_informe)
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
    stateFestivo
) => (dispatch, getState) => {

    let columnaAnadir;
    let numeroSemana;
    let arrayBaja1 = [];
    let arrayBaja2 = [];
    let arrayBaja = [];
    let hayTrabajador;
    let arrayRegistrosHistorico = [];

    if (trabajador && tipoTrabajador) {
        if (esRevision) {
            columnaAnadir = {
                nombreTrabajador: trabajador.nombre,
                idTrabajador: trabajador.id,
                tipoHorario: centroAGestionar.horario.tipo,
                tipoTrabajador: tipoTrabajador,
                visibleVariaciones: cuadrante[columna].visibleVariaciones,
                tipoVariacion: cuadrante[columna].tipoVariacion,
            };
        } else {
            columnaAnadir = {
                nombreTrabajador: trabajador.nombre,
                idTrabajador: trabajador.id,
                tipoHorario: centroAGestionar.horario.tipo,
                tipoTrabajador: tipoTrabajador,
                visibleVariaciones: false,
                tipoVariacion: ''
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicioRango: null,
                                    lunesFinRango: null,
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: null,
                                        lunesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicioRango: null,
                                            lunesFinRango: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicioRango: centroAGestionar.horario.lunesInicioRango,
                                            lunesFinRango: centroAGestionar.horario.lunesFinRango,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: null,
                                        lunesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: centroAGestionar.horario.lunesInicioRango,
                                        lunesFinRango: centroAGestionar.horario.lunesFinRango,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicioRango: null,
                                    martesFinRango: null,
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: null,
                                        martesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicioRango: null,
                                            martesFinRango: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicioRango: centroAGestionar.horario.martesInicioRango,
                                            martesFinRango: centroAGestionar.horario.martesFinRango,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: null,
                                        martesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: centroAGestionar.horario.martesInicioRango,
                                        martesFinRango: centroAGestionar.horario.martesFinRango,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicioRango: null,
                                    miercolesFinRango: null,
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: null,
                                        miercolesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicioRango: null,
                                            miercolesFinRango: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicioRango: centroAGestionar.horario.miercolesInicioRango,
                                            miercolesFinRango: centroAGestionar.horario.miercolesFinRango,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: null,
                                        miercolesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: centroAGestionar.horario.miercolesInicioRango,
                                        miercolesFinRango: centroAGestionar.horario.miercolesFinRango,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicioRango: null,
                                    juevesFinRango: null,
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: null,
                                        juevesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicioRango: null,
                                            juevesFinRango: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicioRango: centroAGestionar.horario.juevesInicioRango,
                                            juevesFinRango: centroAGestionar.horario.juevesFinRango,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: null,
                                        juevesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: centroAGestionar.horario.juevesInicioRango,
                                        juevesFinRango: centroAGestionar.horario.juevesFinRango,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicioRango: null,
                                    viernesFinRango: null,
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: null,
                                        viernesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicioRango: null,
                                            viernesFinRango: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicioRango: centroAGestionar.horario.viernesInicioRango,
                                            viernesFinRango: centroAGestionar.horario.viernesFinRango,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: null,
                                        viernesFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: centroAGestionar.horario.viernesInicioRango,
                                        viernesFinRango: centroAGestionar.horario.viernesFinRango,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicioRango: null,
                                    sabadoFinRango: null,
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: null,
                                        sabadoFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicioRango: null,
                                            sabadoFinRango: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicioRango: centroAGestionar.horario.sabadoInicioRango,
                                            sabadoFinRango: centroAGestionar.horario.sabadoFinRango,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: null,
                                        sabadoFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: centroAGestionar.horario.sabadoInicioRango,
                                        sabadoFinRango: centroAGestionar.horario.sabadoFinRango,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicioRango: null,
                                    domingoFinRango: null,
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: null,
                                        domingoFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicioRango: null,
                                            domingoFinRango: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicioRango: centroAGestionar.horario.domingoInicioRango,
                                            domingoFinRango: centroAGestionar.horario.domingoFinRango,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: null,
                                        domingoFinRango: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: centroAGestionar.horario.domingoInicioRango,
                                        domingoFinRango: centroAGestionar.horario.domingoFinRango,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
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
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
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
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicio1RangoDescanso: null,
                                            lunesFin1RangoDescanso: null,
                                            lunesInicio2RangoDescanso: null,
                                            lunesFin2RangoDescanso: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicio1RangoDescanso: centroAGestionar.horario.lunesInicio1RangoDescanso,
                                            lunesFin1RangoDescanso: centroAGestionar.horario.lunesFin1RangoDescanso,
                                            lunesInicio2RangoDescanso: centroAGestionar.horario.lunesInicio2RangoDescanso,
                                            lunesFin2RangoDescanso: centroAGestionar.horario.lunesFin2RangoDescanso,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: null,
                                        lunesFin1RangoDescanso: null,
                                        lunesInicio2RangoDescanso: null,
                                        lunesFin2RangoDescanso: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: centroAGestionar.horario.lunesInicio1RangoDescanso,
                                        lunesFin1RangoDescanso: centroAGestionar.horario.lunesFin1RangoDescanso,
                                        lunesInicio2RangoDescanso: centroAGestionar.horario.lunesInicio2RangoDescanso,
                                        lunesFin2RangoDescanso: centroAGestionar.horario.lunesFin2RangoDescanso,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
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
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
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
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicio1RangoDescanso: null,
                                            martesFin1RangoDescanso: null,
                                            martesInicio2RangoDescanso: null,
                                            martesFin2RangoDescanso: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicio1RangoDescanso: centroAGestionar.horario.martesInicio1RangoDescanso,
                                            martesFin1RangoDescanso: centroAGestionar.horario.martesFin1RangoDescanso,
                                            martesInicio2RangoDescanso: centroAGestionar.horario.martesInicio2RangoDescanso,
                                            martesFin2RangoDescanso: centroAGestionar.horario.martesFin2RangoDescanso,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: null,
                                        martesFin1RangoDescanso: null,
                                        martesInicio2RangoDescanso: null,
                                        martesFin2RangoDescanso: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: centroAGestionar.horario.martesInicio1RangoDescanso,
                                        martesFin1RangoDescanso: centroAGestionar.horario.martesFin1RangoDescanso,
                                        martesInicio2RangoDescanso: centroAGestionar.horario.martesInicio2RangoDescanso,
                                        martesFin2RangoDescanso: centroAGestionar.horario.martesFin2RangoDescanso,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
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
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
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
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicio1RangoDescanso: null,
                                            miercolesFin1RangoDescanso: null,
                                            miercolesInicio2RangoDescanso: null,
                                            miercolesFin2RangoDescanso: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicio1RangoDescanso: centroAGestionar.horario.miercolesInicio1RangoDescanso,
                                            miercolesFin1RangoDescanso: centroAGestionar.horario.miercolesFin1RangoDescanso,
                                            miercolesInicio2RangoDescanso: centroAGestionar.horario.miercolesInicio2RangoDescanso,
                                            miercolesFin2RangoDescanso: centroAGestionar.horario.miercolesFin2RangoDescanso,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: null,
                                        miercolesFin1RangoDescanso: null,
                                        miercolesInicio2RangoDescanso: null,
                                        miercolesFin2RangoDescanso: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: centroAGestionar.horario.miercolesInicio1RangoDescanso,
                                        miercolesFin1RangoDescanso: centroAGestionar.horario.miercolesFin1RangoDescanso,
                                        miercolesInicio2RangoDescanso: centroAGestionar.horario.miercolesInicio2RangoDescanso,
                                        miercolesFin2RangoDescanso: centroAGestionar.horario.miercolesFin2RangoDescanso,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
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
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
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
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicio1RangoDescanso: null,
                                            juevesFin1RangoDescanso: null,
                                            juevesInicio2RangoDescanso: null,
                                            juevesFin2RangoDescanso: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicio1RangoDescanso: centroAGestionar.horario.juevesInicio1RangoDescanso,
                                            juevesFin1RangoDescanso: centroAGestionar.horario.juevesFin1RangoDescanso,
                                            juevesInicio2RangoDescanso: centroAGestionar.horario.juevesInicio2RangoDescanso,
                                            juevesFin2RangoDescanso: centroAGestionar.horario.juevesFin2RangoDescanso,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: null,
                                        juevesFin1RangoDescanso: null,
                                        juevesInicio2RangoDescanso: null,
                                        juevesFin2RangoDescanso: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: centroAGestionar.horario.juevesInicio1RangoDescanso,
                                        juevesFin1RangoDescanso: centroAGestionar.horario.juevesFin1RangoDescanso,
                                        juevesInicio2RangoDescanso: centroAGestionar.horario.juevesInicio2RangoDescanso,
                                        juevesFin2RangoDescanso: centroAGestionar.horario.juevesFin2RangoDescanso,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
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
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
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
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicio1RangoDescanso: null,
                                            viernesFin1RangoDescanso: null,
                                            viernesInicio2RangoDescanso: null,
                                            viernesFin2RangoDescanso: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicio1RangoDescanso: centroAGestionar.horario.viernesInicio1RangoDescanso,
                                            viernesFin1RangoDescanso: centroAGestionar.horario.viernesFin1RangoDescanso,
                                            viernesInicio2RangoDescanso: centroAGestionar.horario.viernesInicio2RangoDescanso,
                                            viernesFin2RangoDescanso: centroAGestionar.horario.viernesFin2RangoDescanso,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: null,
                                        viernesFin1RangoDescanso: null,
                                        viernesInicio2RangoDescanso: null,
                                        viernesFin2RangoDescanso: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: centroAGestionar.horario.viernesInicio1RangoDescanso,
                                        viernesFin1RangoDescanso: centroAGestionar.horario.viernesFin1RangoDescanso,
                                        viernesInicio2RangoDescanso: centroAGestionar.horario.viernesInicio2RangoDescanso,
                                        viernesFin2RangoDescanso: centroAGestionar.horario.viernesFin2RangoDescanso,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
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
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
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
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicio1RangoDescanso: null,
                                            sabadoFin1RangoDescanso: null,
                                            sabadoInicio2RangoDescanso: null,
                                            sabadoFin2RangoDescanso: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicio1RangoDescanso: centroAGestionar.horario.sabadoInicio1RangoDescanso,
                                            sabadoFin1RangoDescanso: centroAGestionar.horario.sabadoFin1RangoDescanso,
                                            sabadoInicio2RangoDescanso: centroAGestionar.horario.sabadoInicio2RangoDescanso,
                                            sabadoFin2RangoDescanso: centroAGestionar.horario.sabadoFin2RangoDescanso,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: null,
                                        sabadoFin1RangoDescanso: null,
                                        sabadoInicio2RangoDescanso: null,
                                        sabadoFin2RangoDescanso: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: centroAGestionar.horario.sabadoInicio1RangoDescanso,
                                        sabadoFin1RangoDescanso: centroAGestionar.horario.sabadoFin1RangoDescanso,
                                        sabadoInicio2RangoDescanso: centroAGestionar.horario.sabadoInicio2RangoDescanso,
                                        sabadoFin2RangoDescanso: centroAGestionar.horario.sabadoFin2RangoDescanso,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
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
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
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
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicio1RangoDescanso: null,
                                            domingoFin1RangoDescanso: null,
                                            domingoInicio2RangoDescanso: null,
                                            domingoFin2RangoDescanso: null,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicio1RangoDescanso: centroAGestionar.horario.domingoInicio1RangoDescanso,
                                            domingoFin1RangoDescanso: centroAGestionar.horario.domingoFin1RangoDescanso,
                                            domingoInicio2RangoDescanso: centroAGestionar.horario.domingoInicio2RangoDescanso,
                                            domingoFin2RangoDescanso: centroAGestionar.horario.domingoFin2RangoDescanso,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: null,
                                        domingoFin1RangoDescanso: null,
                                        domingoInicio2RangoDescanso: null,
                                        domingoFin2RangoDescanso: null,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: centroAGestionar.horario.domingoInicio1RangoDescanso,
                                        domingoFin1RangoDescanso: centroAGestionar.horario.domingoFin1RangoDescanso,
                                        domingoInicio2RangoDescanso: centroAGestionar.horario.domingoInicio2RangoDescanso,
                                        domingoFin2RangoDescanso: centroAGestionar.horario.domingoFin2RangoDescanso,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesCantidad: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: centroAGestionar.horario.lunesCantidad,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: centroAGestionar.horario.lunesCantidad,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesCantidad: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: centroAGestionar.horario.martesCantidad,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: centroAGestionar.horario.martesCantidad,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesCantidad: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: centroAGestionar.horario.miercolesCantidad,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: centroAGestionar.horario.miercolesCantidad,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesCantidad: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: centroAGestionar.horario.juevesCantidad,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: centroAGestionar.horario.juevesCantidad,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesCantidad: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: centroAGestionar.horario.viernesCantidad,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: centroAGestionar.horario.viernesCantidad,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoCantidad: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: centroAGestionar.horario.sabadoCantidad,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: centroAGestionar.horario.sabadoCantidad,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false
                        };
                    }
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoCantidad: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: centroAGestionar.horario.domingoCantidad,
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false
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
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: centroAGestionar.horario.domingoCantidad,
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false
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