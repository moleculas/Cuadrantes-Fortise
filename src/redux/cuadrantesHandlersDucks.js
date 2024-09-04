import Constantes from "../constantes";
import {
    setAnchorElMenuAccion,
    setOpenFacturacionAccion,
    setOpenFacturacionInteriorAccion,
    setNumeroFactusolAccion,
    reseteaContenidoCuadranteAccion,
    setValueDatePickerAccion,
    setDisableSelectCentrosAccion,
    setPreValueValorAccion,
    reseteaContenidoCentroAccion,
    setControladorDeEstadoAccion,
    setPreValueCalendarioAGestionarReseteoAccion,
    setNumeroCuadrantesCuadrantesAccion,
    setVenimosBorrarCuadranteAccion,
    setCuadranteEnUsoCuadrantesAccion,
    setAlertaAccion,
    setExpandedAccordionAccion,
    setEsInicioTraAccion,
    setEsInicioSupAccion,
    setEsCambioTraAccion,
    setEsCambioSupAccion,
    setItemPrevioEditandoAccion,
    setBufferSwitchedDiasFestivosCuadranteAccion,
    setColumnaIndiceAGestionarAccion,
    setPosicionTrabajadorPrevioACambiarAccion,
    setPosicionSuplentePrevioACambiarAccion,
    setEsUnaActualizacionTrabajadorAccion,
    setItemEditandoConfiguracionAccion,
    setItemPrevioEditandoConfiguracionAccion,
    setCambiadaConfiguracionGeneralAccion,
    setEstamosActualizandoCuadranteSinCargaAccion,
    setDisableCargandoAccion,
    setCambioSFAccion,
    setVenimosDeCambioCentroSelectAccion,
    setYaNoEsInicioAccion,
    setCambioRedimensionColumnaAccion,
    setCambioSecuenciaSemanasAccion,
    setMesConFestivosCompletoAccion,
} from './cuadrantesSettersDucks';
import {
    setItemEditandoServiciosFijosAccion,
    setCuadranteServiciosFijosAccion,
    setItemPrevioEditandoServiciosFijosAccion,
    setStateSwitchTipoServicioFijoCuadranteAccion,
    setservicioFijoPersonalizadoEliminadoAccion
} from './cuadrantesServiciosFijosDucks';
import {
    retornaAnoMesCuadranteAccion,
    retornaAnoMesAccion,
    abreObjetoDialogAccion,
    cierraObjetoDialogAccion,
    registrarIntervencionAccion,
    retornaHoraRangoAccion,
    isNumeric
} from './appDucks';
import {
    vaciarDatosCentroAccion,
    obtenerCentrosPorCategoriaAccion,
    obtenerCategoriaPorCentroAccion,
    obtenerCentroAccion
} from './centrosDucks';
import {
    vaciarDatosCuadrantesAccion,
    cambioEstadoInicioCuadrantesAccion,
    setCategoriaAccion,
    setCalendarioAGestionarAccion,
    setCentroAccion,
    obtenerCuadranteAccion,
    resetearCuadranteAccion,
    actualizarObjetoCuadranteAccion,
    activarDesactivarCambioBotonActualizarAccion,
    cambiarACuadranteNoRegistradoAccion,
    activarDesactivarCambioBotonResetearAccion,
    setCuadranteAccion,
    activarDesactivarCambioAccion,
    setStateFestivoAccion
} from './cuadrantesDucks';
import { vaciarDatosPendientesAccion } from './pendientesDucks';
import { forzarRecargaGraficosCuadrantesAccion } from './graficosDucks';
import {
    obtenerTrabajadorAccion,
    obtenerSuplenteAccion
} from './trabajadoresDucks';
import {
    handleClosePopoverGeneralAccion,
    handleClosePopoverServiciosFijosAccion,
    handleClosePopoverConfiguracionAccion,
    handleClosePopoverDiasAccion,
} from './cuadrantesPopoversDucks';
import {
    gestionaColumnaServiciosFijosInicioAccion,
    gestionaColumnaServiciosFijosCambiosAccion,
    gestionaColumnaServiciosFijosPersonalizadosAccion,
    existePrefixSF
} from '../logica/logicaServiciosFijos';
import {
    gestionaCuadranteIndividualAccion,
    cambiarEstadoCuadranteEnUsoRevisadoAccion
} from '../logica/logicaGestionCuadrantes';
import {
    gestionaColumnaCuadranteAccion
} from '../logica/logicaColumnasCuadrantes';
import {
    retornaMinutosAccionEnCuadrantes
} from '../logica/logicaApp';
import {
    gestionarInformeAccion
} from '../logica/logicaInformeCuadrantes';

//constantes
const dataInicial = {
};
const {
    CALENDARIO_FESTIVOS: arrayFestivos,
    TIPO_SERVICIO_FIJO: tipoServicioFijo,
    TIPO_SERVICIO: tipoServicio
} = Constantes;

//types

//reducer
export default function cuadrantesHandlersReducer(state = dataInicial, action) {
    switch (action.type) {
        default:
            return { ...state }
    }
}

//acciones
export const handleClickOpenDialogCuadrantes1Accion = () => (dispatch) => {
    dispatch(abreObjetoDialogAccion('4'));
    dispatch(handleCloseMenuAccion());
};

export const handleClickOpenDialogCuadrantes5Accion = () => (dispatch) => {
    dispatch(abreObjetoDialogAccion('12'));
};

export const handleClickOpenDialogCuadrantes4Accion = () => (dispatch) => {
    dispatch(abreObjetoDialogAccion('8'));
    dispatch(handleCloseMenuAccion());
};

const handleClickOpenDialogCuadrantes2Accion = () => (dispatch) => {
    dispatch(abreObjetoDialogAccion('5'));
};

const handleClickOpenDialogCuadrantes3Accion = () => (dispatch) => {
    dispatch(abreObjetoDialogAccion('7'));
};

export const handleCloseDialogBotonesCuadrantes1Accion = (respuesta) => (dispatch, getState) => {
    //resetear cuadrante
    const { calendarioAGestionar, objetoCuadrante } = getState().variablesCuadrantes;
    if (respuesta === "acuerdo") {
        dispatch(resetearCuadranteAccion('cuadrantes', objetoCuadrante.id));
        const centroId = objetoCuadrante.datosCuadrante.centro;
        dispatch(vaciarDatosCentroAccion());
        dispatch(reseteaContenidoCentroAccion(false));
        dispatch(setCentroAccion(centroId));
        dispatch(cambiarACuadranteNoRegistradoAccion());
        dispatch(vaciarDatosCuadrantesAccion());
        dispatch(activarDesactivarCambioBotonResetearAccion(true));
        dispatch(setControladorDeEstadoAccion('venimosDeResetear'));
        dispatch(setPreValueCalendarioAGestionarReseteoAccion(calendarioAGestionar));
        dispatch(setCalendarioAGestionarAccion(''));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, 0));
    }
    dispatch(cierraObjetoDialogAccion());
};

export const handleCloseDialogBotonesCuadrantes3Accion = (respuesta) => (dispatch, getState) => {
    //cambio pantalla sin guardar
    const { calendarioAGestionar } = getState().variablesCuadrantes;
    const { preValueValor } = getState().variablesCuadrantesSetters;
    if (respuesta === "acuerdo") {
        dispatch(registrarIntervencionAccion(true));
        if (preValueValor.origen === 'centros') {
            dispatch(reseteaContenidoCentroAccion(false));
            dispatch(setCentroAccion(preValueValor.valor));
            dispatch(vaciarDatosCuadrantesAccion());
            const nombreCuadrante = calendarioAGestionar + '-' + preValueValor.valor;
            dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
        };
        if (preValueValor.origen === 'cuadrantes') {
            dispatch(reseteaContenidoCuadranteAccion());
            dispatch(vaciarDatosCuadrantesAccion());
            dispatch(setValueDatePickerAccion(preValueValor.valor));
            dispatch(setDisableSelectCentrosAccion(true));
            dispatch(setCalendarioAGestionarAccion(retornaAnoMesAccion(preValueValor.valor)));
            dispatch(cambioEstadoInicioCuadrantesAccion(true));
        };
        if (preValueValor.origen === 'inicio') {
            dispatch(reseteaContenidoCuadranteAccion());
            dispatch(setDisableSelectCentrosAccion(true));
            dispatch(vaciarDatosCuadrantesAccion());
            dispatch(cambioEstadoInicioCuadrantesAccion(true));
            dispatch(forzarRecargaGraficosCuadrantesAccion(true));
        }
    }
    dispatch(cierraObjetoDialogAccion());
};

export const handleCloseDialogBotonesVacioAccion = (respuesta) => (dispatch, getState) => {
    if (respuesta === "acuerdo") {
        dispatch(cierraObjetoDialogAccion());
    };
};

export const handleCloseDialogBotonesCuadrantes5Accion = (respuesta) => (dispatch, getState) => {
    //eliminar cuadrante (múltiple)
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const { objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    if (respuesta === "acuerdo") {
        let arrayCuadrantes = [...numeroCuadrantesCuadrantes];
        let posicionCuadrante = arrayCuadrantes.indexOf(arrayCuadrantes.find(cuadrante => cuadrante.value === cuadranteEnUsoCuadrantes));
        arrayCuadrantes.splice(posicionCuadrante, 1);
        for (let i = 0; i < arrayCuadrantes.length; i++) {
            arrayCuadrantes[i]['value'] = i + 1;
        };
        dispatch(setNumeroCuadrantesCuadrantesAccion(arrayCuadrantes));
        dispatch(setVenimosBorrarCuadranteAccion(true));
        const actualizarArray = (objeto, clave, subclave, posicion) => {
            let nuevoArray = [...objeto[clave][subclave]];
            nuevoArray.splice(posicion, 1);
            return {
                ...objeto[clave],
                [subclave]: nuevoArray
            };
        };
        const losDatosCuadrante = actualizarArray(objetoCuadrante, 'datosCuadrante', 'datosCuadrante', posicionCuadrante);
        const losDatosInforme = actualizarArray(objetoCuadrante, 'datosInforme', 'datosInforme', posicionCuadrante);
        const losDatosServiciosFijos = actualizarArray(objetoCuadrante, 'datosServicios', 'datosServicios', posicionCuadrante);
        const losDatosHoras = actualizarArray(objetoCuadrante, 'horas', 'horas', posicionCuadrante);
        if (cuadranteRegistrado === 'no') {
            let elArrayTrabajadores = [...objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales];
            elArrayTrabajadores.splice(posicionCuadrante, 1);
            let losDatosTrabajadores = {
                ...objetoCuadrante.datosTrabajadoresIniciales,
                datosTrabajadoresIniciales: elArrayTrabajadores
            };
            dispatch(actualizarObjetoCuadranteAccion({
                ...objetoCuadrante,
                datosCuadrante: losDatosCuadrante,
                datosInforme: losDatosInforme,
                datosServicios: losDatosServiciosFijos,
                horas: losDatosHoras,
                datosTrabajadoresIniciales: losDatosTrabajadores
            }));
        } else {
            dispatch(actualizarObjetoCuadranteAccion({
                ...objetoCuadrante,
                datosCuadrante: losDatosCuadrante,
                datosInforme: losDatosInforme,
                datosServicios: losDatosServiciosFijos,
                horas: losDatosHoras
            }));
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        const posicionACargar = posicionCuadrante === 0 ? numeroCuadrantesCuadrantes.length - 1 : 1;
        dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(1));
        dispatch(reseteaContenidoCentroAccion(true));
        dispatch(gestionaCuadranteIndividualAccion(posicionACargar, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, posicionACargar - 1));
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Cuadrante eliminado exitosamente.",
            tipo: 'success'
        }));
    }
    dispatch(cierraObjetoDialogAccion());
};

export const handleCloseMenuAccion = () => (dispatch) => {
    dispatch(setAnchorElMenuAccion(null));
    dispatch(setOpenFacturacionAccion(false));
    dispatch(setOpenFacturacionInteriorAccion(false));
    dispatch(setNumeroFactusolAccion(null));
};

export const esFestivoFuncionAccion = (elDia) => (dispatch, getState) => {
    const { calendarioAGestionar } = getState().variablesCuadrantes;
    const { monthNum } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
    const diaFecha = `${elDia}-${monthNum}`;
    return arrayFestivos.includes(diaFecha);
};

export const handleClickMenuAccion = (event) => (dispatch, getState) => {
    const { anchorElMenu } = getState().variablesCuadrantesSetters;
    dispatch(setAnchorElMenuAccion(anchorElMenu ? null : event.currentTarget));
};

export const handleChangeSelectCalendarioAccion = (newValue) => (dispatch, getState) => {
    const { esInicioCuadrantes, estadoIntervencionCuadranteNuevoRegistrada } = getState().variablesCuadrantes;
    const { estadoIntervencionRegistrada } = getState().variablesApp;
    if (esInicioCuadrantes) {
        dispatch(reseteaContenidoCuadranteAccion());
        dispatch(vaciarDatosCentroAccion());
        dispatch(vaciarDatosCuadrantesAccion());
        dispatch(setValueDatePickerAccion(newValue));
        dispatch(setDisableSelectCentrosAccion(true));
        dispatch(setCalendarioAGestionarAccion(retornaAnoMesAccion(newValue)));
        dispatch(cambioEstadoInicioCuadrantesAccion(true));
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
    } else {
        if (!estadoIntervencionCuadranteNuevoRegistrada) {
            dispatch(handleClickOpenDialogCuadrantes2Accion());
        } else {
            if (!estadoIntervencionRegistrada) {
                dispatch(handleClickOpenDialogCuadrantes3Accion());
                dispatch(setPreValueValorAccion({ valor: newValue, origen: 'cuadrantes' }));
            } else {
                dispatch(reseteaContenidoCuadranteAccion());
                dispatch(vaciarDatosCentroAccion());
                dispatch(vaciarDatosCuadrantesAccion());
                dispatch(setValueDatePickerAccion(newValue));
                dispatch(setDisableSelectCentrosAccion(true));
                dispatch(setCalendarioAGestionarAccion(retornaAnoMesAccion(newValue)));
                dispatch(cambioEstadoInicioCuadrantesAccion(true));
            }
        }
    };
    dispatch(vaciarDatosPendientesAccion());
};

export const handleChangeSelectCategoriaAccion = (event) => (dispatch) => {
    dispatch(setCategoriaAccion(event.target.value));
    dispatch(setDisableSelectCentrosAccion(false));
    dispatch(obtenerCentrosPorCategoriaAccion('centros', event.target.value));
};

export const handleChangeSelectCentroAccion = (event) => (dispatch, getState) => {
    const { esInicioCuadrantes, estadoIntervencionCuadranteNuevoRegistrada } = getState().variablesCuadrantes;
    const { estadoIntervencionRegistrada } = getState().variablesApp;
    if (esInicioCuadrantes) {
        dispatch(reseteaContenidoCentroAccion(false));
        dispatch(vaciarDatosCentroAccion());
        dispatch(obtenerCentroAccion('centros', event.target.value));
        dispatch(obtenerCategoriaPorCentroAccion('centros', event.target.value, 0));
        dispatch(setCentroAccion(event.target.value));
        dispatch(vaciarDatosCuadrantesAccion());
        dispatch(setVenimosDeCambioCentroSelectAccion(true));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
    } else {
        if (!estadoIntervencionCuadranteNuevoRegistrada) {
            dispatch(handleClickOpenDialogCuadrantes2Accion());
        } else {
            if (!estadoIntervencionRegistrada) {
                dispatch(handleClickOpenDialogCuadrantes3Accion());
                dispatch(setPreValueValorAccion({ valor: event.target.value, origen: 'centros' }));
            } else {
                dispatch(reseteaContenidoCentroAccion(false));
                dispatch(vaciarDatosCentroAccion());
                dispatch(obtenerCentroAccion('centros', event.target.value));
                dispatch(obtenerCategoriaPorCentroAccion('centros', event.target.value, 0));
                dispatch(setCentroAccion(event.target.value));
                dispatch(vaciarDatosCuadrantesAccion());
                dispatch(setVenimosDeCambioCentroSelectAccion(true));
            }
        }
    };
    dispatch(setDisableCargandoAccion(true));
};

export const goToInicioCuadrantesAccion = (origen) => (dispatch, getState) => {
    const { estadoIntervencionCuadranteNuevoRegistrada } = getState().variablesCuadrantes;
    const { estadoIntervencionRegistrada } = getState().variablesApp;
    const resetGeneral = () => {
        Promise.allSettled([
            dispatch(reseteaContenidoCuadranteAccion()),
            dispatch(setDisableSelectCentrosAccion(true)),
            dispatch(vaciarDatosCuadrantesAccion()),
            dispatch(cambioEstadoInicioCuadrantesAccion(true)),
            dispatch(setCategoriaAccion(''))
        ]);
    };
    if (origen === "effect") {
        resetGeneral();
    } else {
        if (!estadoIntervencionCuadranteNuevoRegistrada) {
            dispatch(handleClickOpenDialogCuadrantes2Accion());
        } else {
            if (!estadoIntervencionRegistrada) {
                dispatch(handleClickOpenDialogCuadrantes3Accion());
                dispatch(setPreValueValorAccion({ valor: null, origen: 'inicio' }));
            } else {
                resetGeneral();
            };
        };
    };
    Promise.allSettled([
        dispatch(setAnchorElMenuAccion(null)),
        dispatch(vaciarDatosPendientesAccion()),
        dispatch(forzarRecargaGraficosCuadrantesAccion(true)),
        dispatch(setDisableCargandoAccion(true))
    ]);
};

export const handleCambioAccordionHeaderAccion = (expandedAccordion, panel, index, scrollable, classes) => (dispatch, getState) => {
    dispatch(setExpandedAccordionAccion(expandedAccordion ? panel : true));
    expandedAccordion ? scrollable.current.classList.add(classes.openAccordion) : scrollable.current.classList.remove(classes.openAccordion);
};

export const handleClickAddColumnaAccion = (tipo, columna, scrollable, classes) => (dispatch, getState) => {
    const { cuadrante, objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteVacio, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    if (tipo === 'suplente' && cuadrante[columna + 1] && cuadrante[columna + 1].tipoTrabajador === 'suplente') {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Este trabajador ya tiene asignado un suplente.",
            tipo: 'error'
        }));
        return;
    };
    if (tipo === 'trabajador') {
        dispatch(setEsInicioTraAccion(false));
        dispatch(setEsCambioTraAccion(true));
        if (!cuadranteVacio) {
            dispatch(gestionaColumnaCuadranteAccion(null, 'trabajador', true, null, true, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, false));
        } else {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo) {
                dispatch(gestionaColumnaCuadranteAccion(null, 'trabajador', true, null, true, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, false));
            } else {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "Para añadir trabajadores a un cuadrante debes elegir Tipo cómputo y Modo entrada datos en Configuración general cuadrante.",
                    tipo: 'error'
                }));
                return;
            };
        };
    } else {
        dispatch(setEsInicioSupAccion(false));
        dispatch(setEsCambioSupAccion(true));
        if (!cuadranteVacio) {
            dispatch(gestionaColumnaCuadranteAccion(null, 'suplente', true, columna, true, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, false));
        } else {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo) {
                dispatch(gestionaColumnaCuadranteAccion(null, 'suplente', true, columna, true, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, false));
            } else {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "Para añadir trabajadores a un cuadrante debes elegir Tipo cómputo y Modo entrada datos en Configuración general cuadrante.",
                    tipo: 'error'
                }));
                return;
            };
        };
    }
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    scrollable.current.classList.remove(classes.openAccordion);
};

export const eliminarColumnaAccion = (columna, idTrabajador, scrollable, classes) => (dispatch, getState) => {
    const { cuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes, trabajadoresEnCuadrante, suplentesEnCuadrante, yaNoEsInicio, bufferSwitchedDiasFestivosCuadrante } = getState().variablesCuadrantesSetters;
    const { objetoCentro } = getState().variablesCentros;
    if (!objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1]) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Cuadrante bloqueado. Se ha cambiado la configuración del Centro después de registrar el cuadrante. No pueden efectuarse cambios.",
            tipo: 'warning'
        }));
        return;
    };
    let fromIndex;
    let arrayCuadrante = [...cuadrante];
    let numTrabajadoresQuedanSinNombre = 0;
    let numTrabajadoresQuedanConNombre = 0;
    arrayCuadrante.forEach((elemento) => {
        if (elemento.tipoTrabajador === 'trabajador' && !elemento.nombreTrabajador) {
            numTrabajadoresQuedanSinNombre++;
        }
        if (elemento.tipoTrabajador === 'trabajador' && elemento.nombreTrabajador) {
            numTrabajadoresQuedanConNombre++;
        }
    });
    if (numTrabajadoresQuedanSinNombre >= numTrabajadoresQuedanConNombre && arrayCuadrante[columna].nombreTrabajador && arrayCuadrante[columna].tipoTrabajador === 'trabajador') {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "No es posible dejar un cuadrante sin trabajadores. Selecciona un trabajador para las columnas vacías antes de eliminar.",
            tipo: 'warning'
        }));
        return;
    }
    if ((numTrabajadoresQuedanConNombre + numTrabajadoresQuedanSinNombre === 1 && arrayCuadrante[columna].tipoTrabajador === 'trabajador') || (arrayCuadrante.length === 1)) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "No es posible dejar un cuadrante sin trabajadores.",
            tipo: 'warning'
        }));
        return;
    };
    if (arrayCuadrante[columna].tipoTrabajador === 'trabajador') {
        const posicionTrabajador = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajador));
        if (arrayCuadrante[columna + 1] && arrayCuadrante[columna + 1].tipoTrabajador === 'suplente') {
            let i = 1;
            let idSuplente, posicionSuplente;
            do {
                idSuplente = arrayCuadrante[columna + i].idTrabajador;
                posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idSuplente));
                suplentesEnCuadrante.splice(posicionSuplente, 1);
                i++;
            } while (arrayCuadrante[columna + i] && arrayCuadrante[columna + i].tipoTrabajador === 'suplente');
            trabajadoresEnCuadrante.splice(posicionTrabajador, 1);
            fromIndex = arrayCuadrante.indexOf(arrayCuadrante[columna]);
            arrayCuadrante.splice(fromIndex, i);
            if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
                for (let i = 0; i < trabajadoresEnCuadrante.length; i++) {
                    trabajadoresEnCuadrante[i]['laPosicionDelTrabajador'] = i + 1;
                };
                for (let i = 0; i < suplentesEnCuadrante.length; i++) {
                    let posicionSuplenteIndex = arrayCuadrante.indexOf(arrayCuadrante.find(suplente => suplente.idTrabajador === suplentesEnCuadrante[i].id));
                    let idTrabajadorAnterior = arrayCuadrante[posicionSuplenteIndex - 1].idTrabajador;
                    let tipoTrabajadorAnterior = arrayCuadrante[posicionSuplenteIndex - 1].tipoTrabajador;
                    let posicionIdTrabajadorAnterior;
                    if (tipoTrabajadorAnterior === 'trabajador') {
                        posicionIdTrabajadorAnterior = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                        suplentesEnCuadrante[i]['laPosicionDelTrabajador'] = trabajadoresEnCuadrante[posicionIdTrabajadorAnterior]['laPosicionDelTrabajador'];
                    } else {
                        posicionIdTrabajadorAnterior = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                        suplentesEnCuadrante[i]['laPosicionDelTrabajador'] = suplentesEnCuadrante[posicionIdTrabajadorAnterior]['laPosicionDelTrabajador'];
                    }
                };
            };
        } else {
            fromIndex = arrayCuadrante.indexOf(arrayCuadrante[columna]);
            arrayCuadrante.splice(fromIndex, 1);
            trabajadoresEnCuadrante.splice(posicionTrabajador, 1);
            if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
                for (let i = 0; i < trabajadoresEnCuadrante.length; i++) {
                    trabajadoresEnCuadrante[i]['laPosicionDelTrabajador'] = i + 1;
                };
                for (let i = 0; i < suplentesEnCuadrante.length; i++) {
                    let posicionSuplenteIndex = arrayCuadrante.indexOf(arrayCuadrante.find(suplente => suplente.idTrabajador === suplentesEnCuadrante[i].id));
                    let idTrabajadorAnterior = arrayCuadrante[posicionSuplenteIndex - 1].idTrabajador;
                    let tipoTrabajadorAnterior = arrayCuadrante[posicionSuplenteIndex - 1].tipoTrabajador;
                    let posicionIdTrabajadorAnterior;
                    if (tipoTrabajadorAnterior === 'trabajador') {
                        posicionIdTrabajadorAnterior = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                        suplentesEnCuadrante[i]['laPosicionDelTrabajador'] = trabajadoresEnCuadrante[posicionIdTrabajadorAnterior]['laPosicionDelTrabajador'];
                    } else {
                        posicionIdTrabajadorAnterior = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                        suplentesEnCuadrante[i]['laPosicionDelTrabajador'] = suplentesEnCuadrante[posicionIdTrabajadorAnterior]['laPosicionDelTrabajador'];
                    }
                };
            };
        };
        dispatch(setCuadranteAccion(arrayCuadrante));
        dispatch(setExpandedAccordionAccion(false));
    } else {
        fromIndex = arrayCuadrante.indexOf(arrayCuadrante[columna]);
        arrayCuadrante.splice(fromIndex, 1);
        const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajador));
        suplentesEnCuadrante.splice(posicionSuplente, 1);
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            for (let i = 0; i < suplentesEnCuadrante.length; i++) {
                let posicionSuplenteIndex = arrayCuadrante.indexOf(arrayCuadrante.find(suplente => suplente.idTrabajador === suplentesEnCuadrante[i].id));
                let idTrabajadorAnterior = arrayCuadrante[posicionSuplenteIndex - 1].idTrabajador;
                let tipoTrabajadorAnterior = arrayCuadrante[posicionSuplenteIndex - 1].tipoTrabajador;
                let posicionIdTrabajadorAnterior;
                if (tipoTrabajadorAnterior === 'trabajador') {
                    posicionIdTrabajadorAnterior = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                    suplentesEnCuadrante[i]['laPosicionDelTrabajador'] = trabajadoresEnCuadrante[posicionIdTrabajadorAnterior]['laPosicionDelTrabajador'];
                } else {
                    posicionIdTrabajadorAnterior = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                    suplentesEnCuadrante[i]['laPosicionDelTrabajador'] = suplentesEnCuadrante[posicionIdTrabajadorAnterior]['laPosicionDelTrabajador'];
                }
            };
        };
        dispatch(setCuadranteAccion(arrayCuadrante));
        dispatch(setExpandedAccordionAccion(false));
    };
    if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
        let arrayBuffer = [...bufferSwitchedDiasFestivosCuadrante];
        arrayBuffer[cuadranteEnUsoCuadrantes - 1].forEach((dia, index) => {
            if (dia[Object.keys(dia)[0]][0][[0]] === 'SF') {
                dia[Object.keys(dia)[0]].splice(columna + 1, 1);
            } else {
                dia[Object.keys(dia)[0]].splice(columna, 1);
            };
        });
        dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(arrayBuffer));
    };
    scrollable.current.classList.remove(classes.openAccordion);
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    //setEstamosActualizandoCuadrante({ estado: true, columna: columna });
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    if (!yaNoEsInicio) {
        dispatch(setYaNoEsInicioAccion(true));
    };
};

export const handleVisibleVariacionesAccion = (index, elId, e) => (dispatch, getState) => {
    const { cuadrante } = getState().variablesCuadrantes;
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const idSplitted = elId.split("-");
    const key = idSplitted[2];
    let arrayCuadrante = [...cuadrante];
    arrayCuadrante[index][key].visibleVariaciones = !arrayCuadrante[index][key].visibleVariaciones;
    arrayCuadrante[index][key].tipoVariacion = '';
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeTipoVariacionesAccion = (index, event) => (dispatch, getState) => {
    const { cuadrante } = getState().variablesCuadrantes;
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const idSplitted = event.target.name.split("-");
    const key = idSplitted[2];
    let arrayCuadrante = [...cuadrante];
    arrayCuadrante[index][key].tipoVariacion = event.target.value;
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const configuraStateFestivoAccion = () => (dispatch, getState) => {
    const { losDiasDelMes, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado) {
        if (losDiasDelMes.length > 0) {
            let object = {};
            for (let i = 1; i <= losDiasDelMes.length; i++) {
                if (dispatch(esFestivoFuncionAccion(i))) {
                    dispatch(handleChangeFestivoDiaAccion(losDiasDelMes[i - 1][1] + losDiasDelMes[i - 1][0], losDiasDelMes[i - 1][0][0], losDiasDelMes[i - 1][1][0], null, 1, false, null, null))
                    object['estadoFestivoDia' + i] = true;
                    object['tipoFestivoDia' + i] = 1;
                } else {
                    object['estadoFestivoDia' + i] = false;
                    object['tipoFestivoDia' + i] = 0;
                };
            };
            dispatch(setStateFestivoAccion(object));
        };
    };
};

export const handleChangeFestivoDiaAccion = (postRef, index, diaSemana, event, tipoFestivo, esPeriodo, scrollable, classes) => (dispatch, getState) => {
    const { cuadrante, stateFestivo, cuadranteRegistrado, losDiasDelMes } = getState().variablesCuadrantes;
    const { bufferSwitchedDiasFestivosCuadrante, cuadranteEnUsoCuadrantes, numeroCuadrantesCuadrantes } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { objetoCentro } = getState().variablesCentros;
    let valorEvento;
    let elTipoFestivo;
    let esInicio = false;
    if (event) {
        if (event.target.value === 0) {
            valorEvento = false;
        } else {
            valorEvento = true;
            elTipoFestivo = event.target.value;
        };
        dispatch(setStateFestivoAccion({ ...stateFestivo, ['estadoFestivoDia' + index]: valorEvento, ['tipoFestivoDia' + index]: event.target.value }));
    } else {
        if (!esPeriodo) {
            valorEvento = true;
            elTipoFestivo = tipoFestivo;
            esInicio = true;
        } else {
            valorEvento = true;
            elTipoFestivo = tipoFestivo;
            esInicio = false;
        };
    };
    let objetoBuffer = {};
    let arrayBuffer = [...bufferSwitchedDiasFestivosCuadrante];
    objetoBuffer[postRef] = [];
    let hayAlgunServicioActivo = false;
    let indiceObjeto;
    let elTipoPrevio = null;
    if (arrayBuffer.length > 0) {
        arrayBuffer[cuadranteEnUsoCuadrantes - 1] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1]];
        indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === postRef);
        if (indiceObjeto >= 0) {
            if (arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto].activo) {
                elTipoPrevio = arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto].tipo;
            };
        };
    };
    if (cuadranteServiciosFijos.length > 0) {
        cuadranteServiciosFijos.forEach(servicio => {
            tipoServicioFijo.forEach(tipo => {
                const sufijo = tipo.prefix;
                if (servicio[`precioHora_${sufijo}`] && servicio[`activo_${sufijo}`] === 'si') {
                    hayAlgunServicioActivo = true;
                }
            });
        });
    }
    if (hayAlgunServicioActivo || (!hayAlgunServicioActivo && cuadrante.length === 0)) {
        let casilla = {
            dia: postRef,
            indice: null,
            tipo: '',
            valor: valorEvento
        };
        dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosCambiosAccion(cuadranteServiciosFijos, casilla))));
        if (valorEvento) {
            objetoBuffer[postRef].push(['SF']);
            objetoBuffer.activo = valorEvento;
            objetoBuffer.tipo = elTipoFestivo;
            if (arrayBuffer.length > 0) {
                if (indiceObjeto >= 0) {
                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                } else {
                    arrayBuffer[cuadranteEnUsoCuadrantes - 1].push(objetoBuffer);
                };
            } else {
                numeroCuadrantesCuadrantes.forEach((cuadrante, index) => {
                    if (index === cuadranteEnUsoCuadrantes - 1) {
                        arrayBuffer[index] = [];
                        arrayBuffer[index].push(objetoBuffer);
                    } else {
                        arrayBuffer[index] = [];
                    };
                });
            };
        } else {
            if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
                if (cuadrante.length === 0) {
                    let indexABorrarSF;
                    bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1].forEach((registroBuffer, index) => {
                        if (Object.keys(registroBuffer)[0] === postRef && registroBuffer.activo) {
                            indexABorrarSF = index;
                        }
                    });
                    arrayBuffer[cuadranteEnUsoCuadrantes - 1] = [...bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]];
                    objetoBuffer = arrayBuffer[cuadranteEnUsoCuadrantes - 1][indexABorrarSF];
                    objetoBuffer.activo = valorEvento;
                    objetoBuffer.tipo = 0;
                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indexABorrarSF] = objetoBuffer;
                };
            };
        };
    };
    if (cuadrante.length > 0) {
        let arrayCuadrante = [];
        let indexABorrar = -1;
        let festivoComputable;
        let variableBuffer1, variableBuffer2, variableBuffer3, variableBuffer4;
        cuadrante.forEach((columna, indexFor) => {
            columna[postRef].festivo = valorEvento;
            const objetoBuffer = { [postRef]: [] };
            if (columna.nombreTrabajador || columna.nombreTrabajador === '') {
                if (valorEvento && !esInicio && bufferSwitchedDiasFestivosCuadrante.length > 0) {
                    bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1].forEach((registroBuffer) => {
                        if (Object.keys(registroBuffer)[0] === postRef && registroBuffer.activo) {
                            const indexOffset = registroBuffer[postRef][0][0] === 'SF' ? 1 : 0;
                            [variableBuffer1, variableBuffer2, variableBuffer3, variableBuffer4] = registroBuffer[postRef][indexFor + indexOffset];
                        }
                    });
                }
                const gestionarHorario = (tipoHorario, diaSemana) => {
                    const diaLowerCase = diaSemana.toLowerCase();
                    let valores;
                    switch (tipoHorario) {
                        case 'rango':
                            valores = [columna[postRef][`${diaLowerCase}InicioRango`], columna[postRef][`${diaLowerCase}FinRango`]];
                            break;
                        case 'rangoDescanso':
                            valores = [
                                columna[postRef][`${diaLowerCase}Inicio1RangoDescanso`],
                                columna[postRef][`${diaLowerCase}Fin1RangoDescanso`],
                                columna[postRef][`${diaLowerCase}Inicio2RangoDescanso`],
                                columna[postRef][`${diaLowerCase}Fin2RangoDescanso`]
                            ];
                            break;
                        case 'cantidad':
                            valores = [columna[postRef][`${diaLowerCase}Cantidad`]];
                            break;
                    }
                    if (event && elTipoPrevio !== 1 && elTipoPrevio !== 2 && elTipoPrevio !== 3) {
                        const bufferObj = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1].find(obj => Object.keys(obj)[0] === postRef);
                        if (bufferObj) {
                            objetoBuffer[postRef] = bufferObj[postRef];
                        }
                    } else {
                        objetoBuffer[postRef].push(valores);
                    }
                    if (!esInicio) {
                        festivoComputable = gestionaDiasFestivosHandlerAccion(tipoHorario, ...valores);
                        actualizarHorasFestivas(festivoComputable.cantidad);
                    }
                    valores.forEach((_, index) => {
                        const key = tipoHorario === 'cantidad' ? `${diaLowerCase}Cantidad` :
                            `${diaLowerCase}${index === 0 || index === 2 ? 'Inicio' : 'Fin'}${index > 1 ? '2' : ''}${tipoHorario === 'rangoDescanso' ? 'RangoDescanso' : 'Rango'}`;
                        columna[postRef][key] = tipoHorario === 'cantidad' ? '' : null;
                    });
                    const tipoServicioCentro = objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistroTrabajador[0][`${diaLowerCase}TipoServicio`];
                    columna[postRef].tipoServicio = columna[postRef].tipoServicio && valores[0] ? columna[postRef].tipoServicio :
                        tipoServicioCentro && valores[0] ? tipoServicioCentro : '';
                };
                const actualizarHorasFestivas = (cantidad) => {
                    if ((elTipoFestivo === 1 || elTipoFestivo === 3) && (!elTipoPrevio || elTipoPrevio === 2)) {
                        columna.horasFestivasComputables = (columna.horasFestivasComputables || 0) + cantidad;
                    } else if (elTipoFestivo === 2 && (elTipoPrevio === 1 || elTipoPrevio === 3)) {
                        columna.horasFestivasComputables = (columna.horasFestivasComputables || 0) - cantidad;
                    }
                };
                gestionarHorario(columna.tipoHorario, diaSemana);
                objetoBuffer.activo = valorEvento;
                objetoBuffer.tipo = elTipoFestivo;
                if (arrayBuffer && arrayBuffer.length > 0) {
                    if (!arrayBuffer[cuadranteEnUsoCuadrantes - 1]) {
                        arrayBuffer[cuadranteEnUsoCuadrantes - 1] = [];
                    }
                    const indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => Object.keys(dia)[0] === postRef);
                    if (indiceObjeto >= 0) {
                        arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                    } else {
                        arrayBuffer[cuadranteEnUsoCuadrantes - 1].push(objetoBuffer);
                    }
                } else {
                    arrayBuffer = numeroCuadrantesCuadrantes.map((_, index) =>
                        index === cuadranteEnUsoCuadrantes - 1 ? [objetoBuffer] : []
                    );
                }
                if (!esInicio) {
                    arrayCuadrante.push(columna);
                }
            } else if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
                bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1].forEach((registroBuffer, index) => {
                    if (Object.keys(registroBuffer)[0] === postRef && registroBuffer.activo) {
                        const indexOffset = registroBuffer[postRef][0][0] === 'SF' ? 1 : 0;
                        [variableBuffer1, variableBuffer2, variableBuffer3, variableBuffer4] = registroBuffer[postRef][indexFor + indexOffset];
                        indexABorrar = index;
                    }
                });
                const actualizarColumna = (tipoHorario, diaSemana) => {
                    const diaLowerCase = diaSemana.toLowerCase();
                    let claves;

                    switch (tipoHorario) {
                        case 'rango':
                            claves = [`${diaLowerCase}InicioRango`, `${diaLowerCase}FinRango`];
                            break;
                        case 'rangoDescanso':
                            claves = [
                                `${diaLowerCase}Inicio1RangoDescanso`,
                                `${diaLowerCase}Fin1RangoDescanso`,
                                `${diaLowerCase}Inicio2RangoDescanso`,
                                `${diaLowerCase}Fin2RangoDescanso`
                            ];
                            break;
                        case 'cantidad':
                            claves = [`${diaLowerCase}Cantidad`];
                            break;
                    }
                    claves.forEach((clave, index) => {
                        columna[postRef][clave] = [variableBuffer1, variableBuffer2, variableBuffer3, variableBuffer4][index];
                    });
                    const tipoServicioCentro = objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistroTrabajador[0][`${diaLowerCase}TipoServicio`];
                    columna[postRef].tipoServicio = columna[postRef].tipoServicio && variableBuffer1 ? columna[postRef].tipoServicio :
                        tipoServicioCentro && variableBuffer1 ? tipoServicioCentro : '';
                    festivoComputable = gestionaDiasFestivosHandlerAccion(tipoHorario, variableBuffer1, variableBuffer2, variableBuffer3, variableBuffer4);
                    if (elTipoPrevio === 1 || elTipoPrevio === 3) {
                        columna.horasFestivasComputables = (columna.horasFestivasComputables || 0) - festivoComputable.cantidad;
                    }
                };
                actualizarColumna(columna.tipoHorario, diaSemana);
                arrayCuadrante.push(columna);
            }
        });
        if (arrayCuadrante.length > 0) {
            dispatch(setCuadranteAccion(arrayCuadrante));
        }
        if (indexABorrar >= 0) {
            arrayBuffer[cuadranteEnUsoCuadrantes - 1] = [...bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]];
            objetoBuffer = arrayBuffer[cuadranteEnUsoCuadrantes - 1][indexABorrar];
            objetoBuffer.activo = valorEvento;
            objetoBuffer.tipo = 0;
            arrayBuffer[cuadranteEnUsoCuadrantes - 1][indexABorrar] = objetoBuffer;
        };
    };
    const contadorDias = arrayBuffer[cuadranteEnUsoCuadrantes - 1].filter(festivo => festivo.activo).length;
    if (losDiasDelMes.length === contadorDias) {
        dispatch(setMesConFestivosCompletoAccion(true));
    };
    dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(arrayBuffer));
    if (event) {
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
        dispatch(handleClosePopoverDiasAccion(scrollable, classes))
    };
};

export const handleChangeSFCasillasAccion = (postRef, indice, tipo, event, popupState, valoresTimePicker) => (dispatch, getState) => {
    //modificador: control horas servicios fijos 
    const { cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const [horaInicio, horaFin] = ['inicio', 'fin'].map(key => dispatch(retornaHoraRangoAccion(valoresTimePicker[key])));
    let casilla = {
        dia: postRef,
        valor: event,
        indice: indice,
        tipo: tipo,
        horas: { inicio: horaInicio, fin: horaFin }
    };
    dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosCambiosAccion(cuadranteServiciosFijos, casilla))));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    popupState.close();
};

export const handleChangeFormTrabajadoresAccion = (index, tipoTrabajador, event) => (dispatch, getState) => {
    const { cuadranteRegistrado, cuadrante } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    const { cuadranteEnUsoCuadrantes, trabajadoresEnCuadrante, suplentesEnCuadrante } = getState().variablesCuadrantesSetters;
    if (!objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1]) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Cuadrante bloqueado. Se ha cambiado la configuración del Centro después de registrar el cuadrante. No pueden efectuarse cambios.",
            tipo: 'warning'
        }));
        return;
    };
    dispatch(setColumnaIndiceAGestionarAccion(index));
    if (tipoTrabajador === 'trabajador' || !tipoTrabajador) {
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            if (index === 0) {
                dispatch(setPosicionTrabajadorPrevioACambiarAccion(1));
            } else {
                const estadoTrabajadorAnterior = cuadrante[index - 1].tipoTrabajador;
                const idTrabajadorAnterior = cuadrante[index - 1].idTrabajador;
                if (estadoTrabajadorAnterior === 'trabajador') {
                    const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                    const posicionTrabajadorPrevioAnterior = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
                    dispatch(setPosicionTrabajadorPrevioACambiarAccion(posicionTrabajadorPrevioAnterior + 1));
                };
                if (estadoTrabajadorAnterior === 'suplente') {
                    const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                    const posicionSuplentePrevioAnterior = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
                    dispatch(setPosicionTrabajadorPrevioACambiarAccion(posicionSuplentePrevioAnterior + 1));
                };
            };
        };
        dispatch(setEsCambioTraAccion(true));
        dispatch(setEsInicioTraAccion(false));
        dispatch(obtenerTrabajadorAccion('trabajadores', event.target.value));
    } else {
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            const estadoTrabajadorAnterior = cuadrante[index - 1].tipoTrabajador;
            const idTrabajadorAnterior = cuadrante[index - 1].idTrabajador;
            if (estadoTrabajadorAnterior === 'trabajador') {
                const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                const posicionTrabajadorPrevioAnterior = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
                dispatch(setPosicionSuplentePrevioACambiarAccion(posicionTrabajadorPrevioAnterior));
            };
            if (estadoTrabajadorAnterior === 'suplente') {
                const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                const posicionSuplentePrevioAnterior = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
                dispatch(setPosicionSuplentePrevioACambiarAccion(posicionSuplentePrevioAnterior));
            };
        };
        dispatch(setEsCambioSupAccion(true));
        dispatch(setEsInicioSupAccion(false));
        dispatch(obtenerSuplenteAccion('trabajadores', event.target.value));
    }
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const handleActualizarTrabajadoresAccion = (index, tipoTrabajador, idTrabajador) => (dispatch, getState) => {
    const { cuadranteRegistrado, cuadrante, objetoCuadrante } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    const { cuadranteEnUsoCuadrantes, trabajadoresEnCuadrante, suplentesEnCuadrante } = getState().variablesCuadrantesSetters;
    if (!objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1] || (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro !== objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro)) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Cuadrante bloqueado. Se ha cambiado la configuración del Centro después de registrar el cuadrante. No pueden efectuarse cambios.",
            tipo: 'warning'
        }));
        return;
    };
    dispatch(setEsUnaActualizacionTrabajadorAccion(true));
    dispatch(setColumnaIndiceAGestionarAccion(index));
    if (tipoTrabajador === 'trabajador' || !tipoTrabajador) {
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            const trabajadorPrevio = cuadrante[index].idTrabajador;
            const posicionTrabajadorPrevioIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === trabajadorPrevio));
            const posicionTrabajadorPrevio = trabajadoresEnCuadrante[posicionTrabajadorPrevioIndex].laPosicionDelTrabajador;
            dispatch(setPosicionTrabajadorPrevioACambiarAccion(posicionTrabajadorPrevio));
        };
        dispatch(setEsCambioTraAccion(true));
        dispatch(setEsInicioTraAccion(false));
        dispatch(obtenerTrabajadorAccion('trabajadores', idTrabajador));
    } else {
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            const trabajadorPrevio = cuadrante[index].idTrabajador;
            const posicionSuplentePrevioIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === trabajadorPrevio));
            const posicionSuplentePrevio = suplentesEnCuadrante[posicionSuplentePrevioIndex].laPosicionDelTrabajador;
            dispatch(setPosicionSuplentePrevioACambiarAccion(posicionSuplentePrevio));
        };
        dispatch(setEsCambioSupAccion(true));
        dispatch(setEsInicioSupAccion(false));
        dispatch(obtenerSuplenteAccion('trabajadores', idTrabajador));
    }
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const handleChangeTimePickerInicioCuadranteAccion = (id, index, horaPareja, hora) => (dispatch, getState) => {
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const { cuadrante } = getState().variablesCuadrantes;
    const idSplitted = id.split("-");
    const timePicker = idSplitted[0];
    const key = idSplitted[1];
    let arrayCuadrante = [...cuadrante];
    let laHoraInicio;
    if (hora) {
        if (hora === "Invalid Date") {
            console.log('no')
        }
        laHoraInicio = dispatch(retornaHoraRangoAccion(hora));
    } else {
        laHoraInicio = null;
    };
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const timePickerMap = {
        'timePickerInicio': 'InicioRango',
        'timePickerInicio1Descanso': 'Inicio1RangoDescanso',
        'timePickerInicio2Descanso': 'Inicio2RangoDescanso'
    };
    const dayMap = {
        'Lunes': 'lunes',
        'Martes': 'martes',
        'Miércoles': 'miercoles',
        'Jueves': 'jueves',
        'Viernes': 'viernes',
        'Sábado': 'sabado',
        'Domingo': 'domingo'
    };
    for (const day of days) {
        if (key.includes(day)) {
            const dayKey = dayMap[day];
            const timeKey = timePickerMap[timePicker];
            if (timeKey) {
                arrayCuadrante[index][key][`${dayKey}${timeKey}`] = laHoraInicio;
            }
            break;
        }
    }
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeTimePickerFinCuadranteAccion = (id, index, horaPareja, hora) => (dispatch, getState) => {
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const { cuadrante } = getState().variablesCuadrantes;
    const idSplitted = id.split("-");
    const timePicker = idSplitted[0];
    const key = idSplitted[1];
    let arrayCuadrante = [...cuadrante];
    let laHoraFin;
    if (hora) {
        laHoraFin = dispatch(retornaHoraRangoAccion(hora));
    } else {
        laHoraFin = null;
    };
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const timePickerMap = {
        'timePickerFin': 'FinRango',
        'timePickerFin1Descanso': 'Fin1RangoDescanso',
        'timePickerFin2Descanso': 'Fin2RangoDescanso'
    };
    const dayMap = {
        'Lunes': 'lunes',
        'Martes': 'martes',
        'Miércoles': 'miercoles',
        'Jueves': 'jueves',
        'Viernes': 'viernes',
        'Sábado': 'sabado',
        'Domingo': 'domingo'
    };
    for (const day of days) {
        if (key.includes(day)) {
            const dayKey = dayMap[day];
            const timeKey = timePickerMap[timePicker];
            if (timeKey) {
                arrayCuadrante[index][key][`${dayKey}${timeKey}`] = laHoraFin;
            }
            break;
        }
    }
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeSelectCantidadAccion = (index, event) => (dispatch, getState) => {
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const { cuadrante } = getState().variablesCuadrantes;
    const idSplitted = event.target.name.split("-");
    const key = idSplitted[1];
    let arrayCuadrante = [...cuadrante];
    if (key.includes('Lunes')) {
        arrayCuadrante[index][key].lunesCantidad = event.target.value;
    };
    if (key.includes('Martes')) {
        arrayCuadrante[index][key].martesCantidad = event.target.value;
    };
    if (key.includes('Miércoles')) {
        arrayCuadrante[index][key].miercolesCantidad = event.target.value;
    };
    if (key.includes('Jueves')) {
        arrayCuadrante[index][key].juevesCantidad = event.target.value;
    };
    if (key.includes('Viernes')) {
        arrayCuadrante[index][key].viernesCantidad = event.target.value;
    };
    if (key.includes('Sábado')) {
        arrayCuadrante[index][key].sabadoCantidad = event.target.value;
    };
    if (key.includes('Domingo')) {
        arrayCuadrante[index][key].domingoCantidad = event.target.value;
    };
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeObservacionesAccion = (index, event) => (dispatch, getState) => {
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const { cuadrante } = getState().variablesCuadrantes;
    const idSplitted = event.target.id.split("-");
    const key = idSplitted[2];
    let arrayCuadrante = [...cuadrante];
    arrayCuadrante[index][key].observaciones = event.target.value;
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeTipoServicioAccion = (index, event) => (dispatch, getState) => {
    const { itemPrevioEditando, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const { cuadrante, objetoCuadrante } = getState().variablesCuadrantes;
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo !== 4) {
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo !== 1 && !objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial) {
            switch (event.target.value) {
                case 'LIM':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA en la configuración del Centro o del Cuadranre para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                case 'LIME':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA ESPECIAL en la configuración del Centro o del Cuadrante para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                case 'LIMP':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA DEL PARKING en la configuración del Centro o del Cuadrante para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                case 'NAVE2':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA NAVE 2 en la configuración del Centro o del Cuadrante para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                case 'REFZ':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA REFUERZO en la configuración del Centro o del Cuadrante para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                case 'LIM1':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA_1 en la configuración del Centro o del Cuadrante para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                case 'LIM2':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA_2 en la configuración del Centro o del Cuadrante para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                case 'FEST':
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) {
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA DÍA FESTIVO en la configuración del Centro o del Cuadrante para poder computar.",
                            tipo: 'warning'
                        }));
                    }
                    break;
                default:
            }
        };
    };
    const idSplitted = event.target.name.split("-");
    const key = idSplitted[2];
    let arrayCuadrante = [...cuadrante];
    arrayCuadrante[index][key].tipoServicio = event.target.value;
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeFormConfiguracionCuadranteAccion = (prop, event) => (dispatch, getState) => {
    const { itemEditandoConfiguracion, itemPrevioEditandoConfiguracion } = getState().variablesCuadrantesSetters;
    if (prop === "tipoHorario" || prop === "observaciones" || prop === "excepcion") {
        dispatch(setItemEditandoConfiguracionAccion({ ...itemEditandoConfiguracion, [prop]: event.target.value }));
    };
    if (prop === "computo" && event.target.value === 1) {
        dispatch(setItemEditandoConfiguracionAccion({
            ...itemEditandoConfiguracion,
            [prop]: event.target.value,
            precioHora_L: '',
            precioHora_E: '',
            precioHora_P: '',
            precioHora_N: '',
            precioHora_R: '',
            precioHora_L1: '',
            precioHora_L2: '',
            precioHora_F: ''
        }));
    };
    if (prop === "computo" && event.target.value === 2) {
        dispatch(setItemEditandoConfiguracionAccion({
            ...itemEditandoConfiguracion,
            [prop]: event.target.value,
            mensualPactado: ''
        }));
    };
    if (prop === "computo" && event.target.value === 3) {
        dispatch(setItemEditandoConfiguracionAccion({
            ...itemEditandoConfiguracion,
            [prop]: event.target.value
        }));
    };
    if (prop === "bloqueado") {
        let resultadoChecked;
        if (event.target.checked) {
            resultadoChecked = 'si';
        } else {
            resultadoChecked = 'no';
        };
        dispatch(setItemEditandoConfiguracionAccion({
            ...itemEditandoConfiguracion,
            [prop]: resultadoChecked
        }));
    };
    if (prop === "mensualPactado" ||
        prop === "precioHora_L" ||
        prop === "precioHora_E" ||
        prop === "precioHora_P" ||
        prop === "precioHora_N" ||
        prop === "precioHora_R" ||
        prop === "precioHora_L1" ||
        prop === "precioHora_L2" ||
        prop === "precioHora_F"
    ) {
        if (isNumeric(event.target.value)) {
            dispatch(setItemEditandoConfiguracionAccion({ ...itemEditandoConfiguracion, [prop]: event.target.value }));
        };
    };
    let objetoFestivos = {};
    if (prop === "festivosInicio") {
        if (itemEditandoConfiguracion.festivos.fin) {
            if (event > itemEditandoConfiguracion.festivos.fin) {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "El día final no puede ser inferior al día inicial.",
                    tipo: 'error'
                }));
                return;
            } else {
                objetoFestivos = { ...itemEditandoConfiguracion.festivos };
                objetoFestivos.inicio = event;
                dispatch(setItemEditandoConfiguracionAccion({ ...itemEditandoConfiguracion, festivos: objetoFestivos }));
            }
        } else {
            objetoFestivos = { ...itemEditandoConfiguracion.festivos };
            objetoFestivos.inicio = event;
            dispatch(setItemEditandoConfiguracionAccion({ ...itemEditandoConfiguracion, festivos: objetoFestivos }));
        };
    };
    if (prop === "festivosFin") {
        if (event < itemEditandoConfiguracion.festivos.inicio) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "El día final no puede ser inferior al día inicial.",
                tipo: 'error'
            }));
            return;
        } else {
            objetoFestivos = { ...itemEditandoConfiguracion.festivos };
            objetoFestivos.fin = event;
            dispatch(setItemEditandoConfiguracionAccion({ ...itemEditandoConfiguracion, festivos: objetoFestivos }));
        };
    };
    if (prop === "festivosTipo") {
        objetoFestivos = { ...itemEditandoConfiguracion.festivos };
        objetoFestivos.tipo = event.target.value;
        dispatch(setItemEditandoConfiguracionAccion({ ...itemEditandoConfiguracion, festivos: objetoFestivos }));
    };
    if (prop === "seqSemSiNo") {
        dispatch(setItemEditandoConfiguracionAccion({
            ...itemEditandoConfiguracion,
            [prop]: event.target.checked ? 1 : 2
        }));
    };
    dispatch(setItemPrevioEditandoConfiguracionAccion({ ...itemPrevioEditandoConfiguracion, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeFormConfiguracionServiciosFijosAccion = (tipo, prop, event) => (dispatch, getState) => {
    const { itemEditandoServiciosFijos, itemPrevioEditandoServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { arrayTrabajadoresSubcategoria } = getState().variablesTrabajadores;
    let losServicios = { ...itemEditandoServiciosFijos.servicios };
    let losEstados = { ...itemEditandoServiciosFijos.switch };
    const resetServicio = (codigo) => {
        const campos = ['precioHora', 'variacion', 'diaVariacion', 'activo', 'int', 'trab'];
        campos.forEach(campo => {
            losServicios[`${campo}_${codigo}`] = campo === 'activo' ? 'si' : campo === 'int' ? false : '';
        });
    };
    const servicios = [...tipoServicioFijo.map(servicio => servicio.prefix)];
    if (tipo === "switch") {
        const codigo = event.target.name.slice(-2);
        if (servicios.includes(codigo)) {
            if (!event.target.checked) {
                resetServicio(codigo);
            }
            losEstados[codigo] = event.target.checked;
        }
        dispatch(setItemEditandoServiciosFijosAccion({ switch: losEstados, servicios: losServicios }));
    } else if (tipo === "input") {
        losServicios[prop] = Number(event.target.value);
        dispatch(setItemEditandoServiciosFijosAccion({ ...itemEditandoServiciosFijos, servicios: losServicios }));
    } else if (tipo === "select" || tipo === "radio") {
        if (prop.startsWith("trab_")) {
            const trabajadorSeleccionado = arrayTrabajadoresSubcategoria.find(trabajador => trabajador.id === Number(event.target.value));
            if (trabajadorSeleccionado && trabajadorSeleccionado.estado !== "alta" || trabajadorSeleccionado.estado === "reserva") {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "Este trabajador se encuentra de baja o está en reserva, selecciona otro.",
                    tipo: 'error'
                }));
                return;
            }
        };
        losServicios[prop] = event.target.value;
        dispatch(setItemEditandoServiciosFijosAccion({ ...itemEditandoServiciosFijos, servicios: losServicios }));
    } else if (tipo === "check") {
        const [, elServicio] = prop.split("_");
        losServicios[prop] = event.target.checked;
        if (event.target.checked) {
            ['diaVariacion', 'precioHora', 'variacion'].forEach(campo => {
                losServicios[`${campo}_${elServicio}`] = campo === 'precioHora' ? null : '';
            });
        }
        dispatch(setItemEditandoServiciosFijosAccion({ ...itemEditandoServiciosFijos, servicios: losServicios }));
    } else if (tipo === "check2") {
        const resultadoChecked = event.target.checked ? 'si' : 'no';
        dispatch(setItemEditandoServiciosFijosAccion({
            ...itemEditandoServiciosFijos,
            [prop]: resultadoChecked
        }));
    }
    dispatch(setItemPrevioEditandoServiciosFijosAccion({ ...itemPrevioEditandoServiciosFijos, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const gestionItemPrevioEditandoAccion = (tipo, valores) => (dispatch) => {
    const idSplitted = valores.id.split("-");
    const key = idSplitted[1];
    switch (tipo) {
        case 'rango':
            dispatch(setItemPrevioEditandoAccion({
                index: valores.index,
                tipo: tipo,
                id: key,
                inicioRango: valores.inicioRango,
                finRango: valores.finRango,
                observaciones: valores.observaciones,
                visibleVariaciones: valores.visibleVariaciones,
                tipoVariacion: valores.tipoVariacion,
                tipoServicio: valores.tipoServicio,
                modificado: false
            }))
            break;
        case 'rangoDescanso':
            dispatch(setItemPrevioEditandoAccion({
                index: valores.index,
                tipo: tipo,
                id: key,
                inicioRangoDescanso1: valores.inicioRangoDescanso1,
                finRangoDescanso1: valores.finRangoDescanso1,
                inicioRangoDescanso2: valores.inicioRangoDescanso2,
                finRangoDescanso2: valores.finRangoDescanso2,
                observaciones: valores.observaciones,
                visibleVariaciones: valores.visibleVariaciones,
                tipoVariacion: valores.tipoVariacion,
                tipoServicio: valores.tipoServicio,
                modificado: false
            }))
            break;
        case 'cantidad':
            dispatch(setItemPrevioEditandoAccion({
                index: valores.index,
                tipo: tipo,
                id: key,
                cantidad: valores.cantidad,
                observaciones: valores.observaciones,
                visibleVariaciones: valores.visibleVariaciones,
                tipoVariacion: valores.tipoVariacion,
                tipoServicio: valores.tipoServicio,
                modificado: false
            }))
            break;
        default:
    }
};

export const handleRegistrarCambioEnCasillaAccion = (id, index, tipo, scrollable, boxes, classes) => (dispatch, getState) => {
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const { cuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const idSplitted = id.split("-");
    const key = idSplitted[1];
    let arrayCuadrante = [...cuadrante];
    const diasSemana = {
        Lunes: 'lunes',
        Martes: 'martes',
        Miércoles: 'miercoles',
        Jueves: 'jueves',
        Viernes: 'viernes',
        Sábado: 'sabado',
        Domingo: 'domingo'
    };
    switch (tipo) {
        case 'rango':
            for (const dia in diasSemana) {
                if (key.includes(dia)) {
                    const diaKey = diasSemana[dia];
                    const inicioRango = arrayCuadrante[index][key][`${diaKey}InicioRango`];
                    const finRango = arrayCuadrante[index][key][`${diaKey}FinRango`];
                    const tipoServicio = arrayCuadrante[index][key].tipoServicio;
                    if ((!inicioRango && finRango) || (inicioRango && !finRango)) {
                        dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        }));
                        return;
                    }
                    if ((inicioRango && !tipoServicio) || (!inicioRango && tipoServicio)) {
                        dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        }));
                        return;
                    }
                }
            }
            break;
        case 'rangoDescanso':
            for (const dia in diasSemana) {
                if (key.includes(dia)) {
                    const diaKey = diasSemana[dia];
                    const rangosDescanso = [
                        { inicio: `${diaKey}Inicio1RangoDescanso`, fin: `${diaKey}Fin1RangoDescanso` },
                        { inicio: `${diaKey}Inicio2RangoDescanso`, fin: `${diaKey}Fin2RangoDescanso` }
                    ];
                    for (const rango of rangosDescanso) {
                        const inicioRango = arrayCuadrante[index][key][rango.inicio];
                        const finRango = arrayCuadrante[index][key][rango.fin];
                        const tipoServicio = arrayCuadrante[index][key].tipoServicio;

                        //modificador: parche per posar el segon rang en blanc                        
                        if (rango.inicio.includes('Inicio2RangoDescanso') && !inicioRango && !finRango) {
                            continue;
                        }
                        if ((!inicioRango && finRango) || (inicioRango && !finRango)) {
                            dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                            dispatch(setAlertaAccion({
                                abierto: true,
                                mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                tipo: 'error'
                            }));
                            return;
                        }
                        if ((inicioRango && !tipoServicio) || (!inicioRango && tipoServicio)) {
                            dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                            dispatch(setAlertaAccion({
                                abierto: true,
                                mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                                tipo: 'error'
                            }));
                            return;
                        }
                    }
                }
            }
            break;
        case 'cantidad':
            for (const dia in diasSemana) {
                if (key.includes(dia)) {
                    const diaKey = diasSemana[dia];
                    const cantidad = arrayCuadrante[index][key][`${diaKey}Cantidad`];
                    const tipoServicio = arrayCuadrante[index][key].tipoServicio;
                    if ((cantidad && !tipoServicio) || (!cantidad && tipoServicio)) {
                        dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                        dispatch(setAlertaAccion({
                            abierto: true,
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        }));
                        return;
                    }
                }
            }
            break;
        default:
    };
    if (itemPrevioEditando.modificado) {
        if (itemPrevioEditando.tipo === 'rango') {
            let elInicioRango, elFinRango;
            if (itemPrevioEditando.inicioRango) {
                elInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango))
            } else {
                elInicioRango = itemPrevioEditando.inicioRango;
            };
            if (itemPrevioEditando.finRango) {
                elFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango))
            } else {
                elFinRango = itemPrevioEditando.finRango;
            };
            const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            function comprobarDia(dia, index, key) {
                const diaLowerCase = dia.toLowerCase();
                const inicioRangoKey = `${diaLowerCase}InicioRango`;
                const finRangoKey = `${diaLowerCase}FinRango`;
                if (itemPrevioEditando.id.includes(dia)) {
                    if (arrayCuadrante[index][key][inicioRangoKey] === elInicioRango &&
                        arrayCuadrante[index][key][finRangoKey] === elFinRango &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                        arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                        dispatch(setItemPrevioEditandoAccion(null));
                        dispatch(activarDesactivarCambioAccion(true));
                        return true;
                    }
                }
                return false;
            }
            for (const dia of dias) {
                if (comprobarDia(dia, index, key)) {
                    return;
                }
            }
        };
        if (itemPrevioEditando.tipo === 'rangoDescanso') {
            let elInicioRangoDescanso1, elFinRangoDescanso1, elInicioRangoDescanso2, elFinRangoDescanso2;
            if (itemPrevioEditando.inicioRangoDescanso1) {
                elInicioRangoDescanso1 = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
            } else {
                elInicioRangoDescanso1 = itemPrevioEditando.inicioRangoDescanso1;
            };
            if (itemPrevioEditando.finRangoDescanso1) {
                elFinRangoDescanso1 = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
            } else {
                elFinRangoDescanso1 = itemPrevioEditando.finRangoDescanso1;
            };
            if (itemPrevioEditando.inicioRangoDescanso2) {
                elInicioRangoDescanso2 = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
            } else {
                elInicioRangoDescanso2 = itemPrevioEditando.inicioRangoDescanso2;
            };
            if (itemPrevioEditando.finRangoDescanso2) {
                elFinRangoDescanso2 = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            } else {
                elFinRangoDescanso2 = itemPrevioEditando.finRangoDescanso2;
            };
            const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

            function comprobarDia(dia, index, key) {
                const diaLowerCase = dia.toLowerCase();
                const inicio1Key = `${diaLowerCase}Inicio1RangoDescanso`;
                const fin1Key = `${diaLowerCase}Fin1RangoDescanso`;
                const inicio2Key = `${diaLowerCase}Inicio2RangoDescanso`;
                const fin2Key = `${diaLowerCase}Fin2RangoDescanso`;

                if (itemPrevioEditando.id.includes(dia)) {
                    if (arrayCuadrante[index][key][inicio1Key] === elInicioRangoDescanso1 &&
                        arrayCuadrante[index][key][fin1Key] === elFinRangoDescanso1 &&
                        arrayCuadrante[index][key][inicio2Key] === elInicioRangoDescanso2 &&
                        arrayCuadrante[index][key][fin2Key] === elFinRangoDescanso2 &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                        arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                        dispatch(setItemPrevioEditandoAccion(null));
                        dispatch(activarDesactivarCambioAccion(true));
                        return true;
                    }
                }
                return false;
            }

            for (const dia of dias) {
                if (comprobarDia(dia, index, key)) {
                    return;
                }
            }
        };
        if (itemPrevioEditando.tipo === 'cantidad') {
            const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

            function comprobarDia(dia, index, key) {
                const diaLowerCase = dia.toLowerCase();
                const cantidadKey = `${diaLowerCase}Cantidad`;

                if (itemPrevioEditando.id.includes(dia)) {
                    if (arrayCuadrante[index][key][cantidadKey] === itemPrevioEditando.cantidad &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                        arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                        dispatch(setItemPrevioEditandoAccion(null));
                        dispatch(activarDesactivarCambioAccion(true));
                        return true;
                    }
                }
                return false;
            }

            for (const dia of dias) {
                if (comprobarDia(dia, index, key)) {
                    return;
                }
            }
        };
    }
    arrayCuadrante[index][key].modificado = true;
    dispatch(setCuadranteAccion(arrayCuadrante));
    dispatch(setItemPrevioEditandoAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    dispatch(handleClosePopoverGeneralAccion(scrollable, boxes, classes));
};

export const handleResetearCasillaAccion = (id, index, tipo, scrollable, boxes, classes) => (dispatch, getState) => {
    const { cuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const idSplitted = id.split("-");
    const key = idSplitted[1];
    let arrayCuadrante = [...cuadrante];
    const dias = {
        'Lunes': 'lunes',
        'Martes': 'martes',
        'Miércoles': 'miercoles',
        'Jueves': 'jueves',
        'Viernes': 'viernes',
        'Sábado': 'sabado',
        'Domingo': 'domingo'
    };
    if (tipo === 'rango') {
        for (const [diaEspanol, diaIngles] of Object.entries(dias)) {
            if (key.includes(diaEspanol)) {
                arrayCuadrante[index][key][`${diaIngles}InicioRango`] = null;
                arrayCuadrante[index][key][`${diaIngles}FinRango`] = null;
                arrayCuadrante[index][key].observaciones = "";
                arrayCuadrante[index][key].visibleVariaciones = false;
                arrayCuadrante[index][key].tipoVariacion = "";
                arrayCuadrante[index][key].tipoServicio = "";
                break;
            }
        }
    };
    if (tipo === 'rangoDescanso') {
        for (const [diaEspanol, diaIngles] of Object.entries(dias)) {
            if (key.includes(diaEspanol)) {
                ['1', '2'].forEach(num => {
                    arrayCuadrante[index][key][`${diaIngles}Inicio${num}RangoDescanso`] = null;
                    arrayCuadrante[index][key][`${diaIngles}Fin${num}RangoDescanso`] = null;
                });

                arrayCuadrante[index][key].observaciones = "";
                arrayCuadrante[index][key].visibleVariaciones = false;
                arrayCuadrante[index][key].tipoVariacion = "";
                arrayCuadrante[index][key].tipoServicio = "";
                break;
            }
        }
    };
    if (tipo === 'cantidad') {
        for (const [diaEspanol, diaIngles] of Object.entries(dias)) {
            if (key.includes(diaEspanol)) {
                arrayCuadrante[index][key][`${diaIngles}Cantidad`] = "";
                arrayCuadrante[index][key].observaciones = "";
                arrayCuadrante[index][key].visibleVariaciones = false;
                arrayCuadrante[index][key].tipoVariacion = "";
                arrayCuadrante[index][key].tipoServicio = "";
                break;
            }
        }
    };
    arrayCuadrante[index][key].modificado = true;
    dispatch(setCuadranteAccion(arrayCuadrante));
    dispatch(setItemPrevioEditandoAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    dispatch(handleClosePopoverGeneralAccion(scrollable, boxes, classes));
};

export const gestionItemPrevioEditandoServiciosFijosAccion = (valores) => (dispatch) => {
    dispatch(setItemPrevioEditandoServiciosFijosAccion({
        switch: valores.switch,
        servicios: valores.servicios
    }));
};

export const handleRegistrarCambioEnCasillaServiciosFijosAccion = (scrollable, classes) => (dispatch, getState) => {
    const {
        itemEditandoServiciosFijos,
        cuadranteServiciosFijos,
        serviciosFijosPersonalizados,
        servicioFijoPersonalizadoEliminado
    } = getState().variablesCuadrantesServiciosFijos;
    const {
        yaNoEsInicio,
        cuadranteEnUsoCuadrantes,
        bufferSwitchedDiasFestivosCuadrante,
        cuadranteVacio
    } = getState().variablesCuadrantesSetters;
    const { cuadranteRegistrado, objetoCuadrante } = getState().variablesCuadrantes;
    let valoresComputoPreciosHoraFijos = true;
    let valoresComputoPreciosHoraIntegrados = false;
    if (tipoServicioFijo.some(({ prefix }) =>
        itemEditandoServiciosFijos.switch[prefix] &&
        !itemEditandoServiciosFijos.servicios[`int_${prefix}`] &&
        !itemEditandoServiciosFijos.servicios[`precioHora_${prefix}`]
    )) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Has seleccionado un tipo de servicio fijo pero no has asignado precio. Revisa el formulario.",
            tipo: 'error'
        }));
        return;
    }
    valoresComputoPreciosHoraFijos = !tipoServicioFijo.some(({ prefix }) =>
        itemEditandoServiciosFijos.servicios[`precioHora_${prefix}`]
    );
    valoresComputoPreciosHoraIntegrados = tipoServicioFijo.some(({ prefix }) => itemEditandoServiciosFijos.servicios[`int_${prefix}`]);
    if (cuadranteVacio && !valoresComputoPreciosHoraFijos && valoresComputoPreciosHoraIntegrados) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Faltan datos por completar. Los Servicios Extra integrados en cómputo deben tener cómputo de horas en el formulario.",
            tipo: 'error'
        }));
        return;
    };
    //modificador: servicios fijos personalizados
    if (serviciosFijosPersonalizados.length > 0) {
        for (const item of serviciosFijosPersonalizados) {
            let intEsTrue = false;
            let descripcionRellenada = false;
            let precioHoraRellenado = false;
            let trabRellenado = false;
            for (const key in item) {
                if (key.startsWith('int_') && item[key] === true) {
                    intEsTrue = true;
                    break;
                }
            }
            for (const key in item) {
                if (key.startsWith('descripcion_')) {
                    descripcionRellenada = item[key] !== "";
                } else if (key.startsWith('precioHora_')) {
                    precioHoraRellenado = item[key] !== "";
                } else if (key.startsWith('trab_')) {
                    trabRellenado = item[key] !== "";
                }
            }
            if (intEsTrue) {
                if (!descripcionRellenada || !trabRellenado) {
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Cuando el servicio es interno, debe rellenar la descripción y el trabajo.",
                        tipo: 'error'
                    }));
                    return;
                }
                for (const key in item) {
                    if (key.startsWith('precioHora_') && item[key] !== "") {
                        item[key] = null;
                    }
                }
            } else {
                if (!descripcionRellenada) {
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Debe rellenar la descripción del servicio.",
                        tipo: 'error'
                    }));
                    return;
                }
                if (!precioHoraRellenado) {
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Debe especificar el precio por hora del servicio.",
                        tipo: 'error'
                    }));
                    return;
                }
                if (!trabRellenado) {
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Debe especificar el trabajo del servicio.",
                        tipo: 'error'
                    }));
                    return;
                }
            }
        }
    };
    const arrServiciosFijosPersonalizadosAGestionar = servicioFijoPersonalizadoEliminado
        ? serviciosFijosPersonalizados.filter(
            (obj) => !(`activo_${existePrefixSF(servicioFijoPersonalizadoEliminado).propiedad}` in obj)
        )
        : [...serviciosFijosPersonalizados];
    servicioFijoPersonalizadoEliminado && dispatch(setservicioFijoPersonalizadoEliminadoAccion(null));
    const serviciosFijosPersonalizadosGestionados = arrServiciosFijosPersonalizadosAGestionar.length > 0
        ? dispatch(gestionaColumnaServiciosFijosPersonalizadosAccion(serviciosFijosPersonalizados))
        : null;
    const arrayCuadranteServiciosFijos = tipoServicioFijo.reduce((acc, servicio) => {
        const { value: tipoServiciofijo, prefix } = servicio;
        if (itemEditandoServiciosFijos.servicios[`precioHora_${prefix}`] || itemEditandoServiciosFijos.servicios[`int_${prefix}`]) {
            const objetoServicioActivo = cuadranteServiciosFijos.find(s => s.tipoServiciofijo === tipoServiciofijo);
            const nuevoServicio = {
                tipoServiciofijo,
                [`precioHora_${prefix}`]: itemEditandoServiciosFijos.servicios[`precioHora_${prefix}`] ? parseFloat(itemEditandoServiciosFijos.servicios[`precioHora_${prefix}`]) : null,
                [`variacion_${prefix}`]: 3,
                [`diaVariacion_${prefix}`]: '',
                [`activo_${prefix}`]: itemEditandoServiciosFijos.servicios[`activo_${prefix}`],
                [`int_${prefix}`]: itemEditandoServiciosFijos.servicios[`int_${prefix}`],
                [`trab_${prefix}`]: itemEditandoServiciosFijos.servicios[`trab_${prefix}`] || null
            };
            acc.push(objetoServicioActivo ? { ...objetoServicioActivo, ...nuevoServicio } : nuevoServicio);
        }
        return acc;
    }, serviciosFijosPersonalizadosGestionados ? [...serviciosFijosPersonalizadosGestionados] : []);
    let elArrayServiciosBloqueados = [...objetoCuadrante.datosServicios.bloqueado];
    elArrayServiciosBloqueados[cuadranteEnUsoCuadrantes - 1] = itemEditandoServiciosFijos.bloqueado;
    const losDatosServicios = {
        ...objetoCuadrante.datosServicios,
        bloqueado: elArrayServiciosBloqueados
    };
    dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
    dispatch(actualizarObjetoCuadranteAccion({
        ...objetoCuadrante,
        datosServicios: losDatosServicios
    }));
    dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosInicioAccion(arrayCuadranteServiciosFijos, true))));
    dispatch(setStateSwitchTipoServicioFijoCuadranteAccion(itemEditandoServiciosFijos.switch));
    dispatch(setItemPrevioEditandoServiciosFijosAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
        const hayAlgunServicioActivo = arrayCuadranteServiciosFijos.some(servicio =>
            tipoServicioFijo.some(({ prefix }) => servicio[`activo_${prefix}`] === 'si')
        );
        let arrayBuffer = [...bufferSwitchedDiasFestivosCuadrante];
        arrayBuffer[cuadranteEnUsoCuadrantes - 1].forEach((dia, index) => {
            if (dia[Object.keys(dia)[0]].length > 0 && dia[Object.keys(dia)[0]][0][[0]] === 'SF') {
                if (hayAlgunServicioActivo === false) {
                    dia[Object.keys(dia)[0]].splice(0, 1);
                };
            } else {
                Array.prototype.insert = function (index, item) {
                    this.splice(index, 0, item);
                };
                dia[Object.keys(dia)[0]].insert(0, ['SF']);
            };
        });
        dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(arrayBuffer));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    dispatch(handleClosePopoverServiciosFijosAccion(scrollable, classes));
    dispatch(setCambioSFAccion(true));
    if (!yaNoEsInicio) {
        dispatch(setYaNoEsInicioAccion(true));
    };
};

export const gestionItemPrevioEditandoConfiguracionAccion = (valores) => (dispatch) => {
    dispatch(setItemPrevioEditandoConfiguracionAccion(valores));
};

export const handleRegistrarCambioEnCasillaConfiguracionAccion = (scrollable, classes) => (dispatch, getState) => {
    const { itemEditandoConfiguracion, cuadranteEnUsoCuadrantes, cuadranteVacio } = getState().variablesCuadrantesSetters;
    const { cuadranteRegistrado, objetoCuadrante, losDiasDelMes, stateFestivo } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    if ((!itemEditandoConfiguracion.computo || !itemEditandoConfiguracion.tipoHorario) && !cuadranteVacio) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Para registrar debes elegir Modo entrada datos y Tipo cómputo. Revisa el formulario.",
            tipo: 'error'
        }));
        return;
    };
    const prefixes = tipoServicio.map(servicio => servicio.prefix);
    const todosPreciosFaltan = prefixes.every(prefix => !itemEditandoConfiguracion[`precioHora_${prefix}`]);
    const algunPrecioPresente = prefixes.some(prefix => itemEditandoConfiguracion[`precioHora_${prefix}`]);
    if (
        (itemEditandoConfiguracion.computo === 1 && !itemEditandoConfiguracion.mensualPactado) ||
        (itemEditandoConfiguracion.computo === 2 && !algunPrecioPresente) ||
        (itemEditandoConfiguracion.computo === 3 && (todosPreciosFaltan || !itemEditandoConfiguracion.mensualPactado))
    ) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
            tipo: 'error'
        }));
        return;
    }
    if ((itemEditandoConfiguracion.festivos.inicio && (!itemEditandoConfiguracion.festivos.fin || !itemEditandoConfiguracion.festivos.tipo) ||
        (itemEditandoConfiguracion.festivos.fin && (!itemEditandoConfiguracion.festivos.inicio || !itemEditandoConfiguracion.festivos.tipo)) ||
        (itemEditandoConfiguracion.festivos.tipo && (!itemEditandoConfiguracion.festivos.fin || !itemEditandoConfiguracion.festivos.inicio)))
    ) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Faltan datos por completar. Revisa la gestión de festivos en el formulario.",
            tipo: 'error'
        }));
        return;
    };
    if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1]) {
        if (itemEditandoConfiguracion.tipoHorario !== objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipo) {
            dispatch(setCambiadaConfiguracionGeneralAccion(true));
        } else {
            dispatch(setCambiadaConfiguracionGeneralAccion(false));
        };
    } else {
        if (itemEditandoConfiguracion.tipoHorario) {
            dispatch(setCambiadaConfiguracionGeneralAccion(true));
        };
    };
    if (itemEditandoConfiguracion.seqSemSiNo) {
        dispatch(setCambioSecuenciaSemanasAccion({ inicial: true, gestion: false }));
    };
    let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
    let elObjetoDatosInforme = {
        ...elArrayDatosInforme[cuadranteEnUsoCuadrantes - 1],
        computo: parseFloat(itemEditandoConfiguracion.computo),
        excepcion: itemEditandoConfiguracion.excepcion ? itemEditandoConfiguracion.excepcion : '',
        bloqueado: itemEditandoConfiguracion.bloqueado,
        mensualPactadoInicial: itemEditandoConfiguracion.mensualPactadoInicial ? parseFloat(itemEditandoConfiguracion.mensualPactadoInicial) : null,
        mensualPactado: itemEditandoConfiguracion.mensualPactado ? parseFloat(itemEditandoConfiguracion.mensualPactado) : null,
        precioHora_L: itemEditandoConfiguracion.precioHora_L ? parseFloat(itemEditandoConfiguracion.precioHora_L) : null,
        precioHora_E: itemEditandoConfiguracion.precioHora_E ? parseFloat(itemEditandoConfiguracion.precioHora_E) : null,
        precioHora_P: itemEditandoConfiguracion.precioHora_P ? parseFloat(itemEditandoConfiguracion.precioHora_P) : null,
        precioHora_N: itemEditandoConfiguracion.precioHora_N ? parseFloat(itemEditandoConfiguracion.precioHora_N) : null,
        precioHora_R: itemEditandoConfiguracion.precioHora_R ? parseFloat(itemEditandoConfiguracion.precioHora_R) : null,
        precioHora_L1: itemEditandoConfiguracion.precioHora_L1 ? parseFloat(itemEditandoConfiguracion.precioHora_L1) : null,
        precioHora_L2: itemEditandoConfiguracion.precioHora_L2 ? parseFloat(itemEditandoConfiguracion.precioHora_L2) : null,
        precioHora_F: itemEditandoConfiguracion.precioHora_F ? parseFloat(itemEditandoConfiguracion.precioHora_F) : null,
        seqSemSiNo: itemEditandoConfiguracion.seqSemSiNo ? itemEditandoConfiguracion.seqSemSiNo : null
    };
    elArrayDatosInforme[cuadranteEnUsoCuadrantes - 1] = elObjetoDatosInforme;
    const losDatosInforme = {
        ...objetoCuadrante.datosInforme,
        datosInforme: elArrayDatosInforme
    };
    let cambioEnConf = false;
    if (itemEditandoConfiguracion?.mensualPactadoInicial !== objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1]?.mensualPactadoInicial) {
        cambioEnConf = true;
    };    
    if (itemEditandoConfiguracion.festivos.inicio) {
        let diaInicio = itemEditandoConfiguracion.festivos.inicio.getDate();
        let diaFin = itemEditandoConfiguracion.festivos.fin.getDate();
        let object = { ...stateFestivo };
        for (let i = diaInicio; i <= diaFin; i++) {
            if (itemEditandoConfiguracion.festivos.tipo === 2) {
                if (!object['estadoFestivoDia' + i]) {
                    dispatch(handleChangeFestivoDiaAccion(losDiasDelMes[i - 1][1] + losDiasDelMes[i - 1][0], losDiasDelMes[i - 1][0][0], losDiasDelMes[i - 1][1][0], null, itemEditandoConfiguracion.festivos.tipo, true, null, null))
                    object['estadoFestivoDia' + i] = true;
                    object['tipoFestivoDia' + i] = itemEditandoConfiguracion.festivos.tipo;
                };
            } else {
                dispatch(handleChangeFestivoDiaAccion(losDiasDelMes[i - 1][1] + losDiasDelMes[i - 1][0], losDiasDelMes[i - 1][0][0], losDiasDelMes[i - 1][1][0], null, itemEditandoConfiguracion.festivos.tipo, true, null, null))
                object['estadoFestivoDia' + i] = true;
                object['tipoFestivoDia' + i] = itemEditandoConfiguracion.festivos.tipo;
            };
        };
        dispatch(setStateFestivoAccion(object));
        dispatch(setItemEditandoConfiguracionAccion({ ...itemEditandoConfiguracion, festivos: { inicio: null, fin: null, tipo: '' } }));
    };
    let elArrayDatosCuadrante = [...objetoCuadrante.datosCuadrante.datosCuadrante];
    let elObjetoDatosCuadrante = {
        ...elArrayDatosCuadrante[cuadranteEnUsoCuadrantes - 1],
        tipoHorarioGeneral: itemEditandoConfiguracion.tipoHorario,
        observaciones: itemEditandoConfiguracion.observaciones
    };
    elArrayDatosCuadrante[cuadranteEnUsoCuadrantes - 1] = elObjetoDatosCuadrante;
    const losDatosCuadrante = {
        ...objetoCuadrante.datosCuadrante,
        datosCuadrante: elArrayDatosCuadrante
    };
    dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));    
    dispatch(actualizarObjetoCuadranteAccion({
        ...objetoCuadrante,
        datosCuadrante: losDatosCuadrante,
        datosInforme: losDatosInforme
    }));
    dispatch(setItemPrevioEditandoConfiguracionAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    dispatch(handleClosePopoverConfiguracionAccion(scrollable, classes));
    dispatch(gestionarInformeAccion(cambioEnConf));
};

export const handleChangeTipoHorarioAccion = (index, event) => (dispatch, getState) => {
    const { cuadranteRegistrado, cuadrante } = getState().variablesCuadrantes;
    const { trabajadoresEnCuadrante, suplentesEnCuadrante } = getState().variablesCuadrantesSetters;
    let arrayCuadrante = [...cuadrante];
    arrayCuadrante[index].tipoHorario = event.target.value;
    dispatch(setCuadranteAccion(arrayCuadrante));
    if (arrayCuadrante[index].tipoTrabajador === 'trabajador') {
        dispatch(setEsInicioTraAccion(false));
        dispatch(setEsCambioTraAccion(true));
        let trabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === arrayCuadrante[index].idTrabajador);
        dispatch(gestionaColumnaCuadranteAccion(trabajador, 'trabajador', true, index, false, true, event.target.value, false));
    } else {
        dispatch(setEsInicioSupAccion(false));
        dispatch(setEsCambioSupAccion(true));
        let suplente = suplentesEnCuadrante.find(suplente => suplente.id === arrayCuadrante[index].idTrabajador);
        dispatch(gestionaColumnaCuadranteAccion(suplente, 'suplente', true, index, false, true, event.target.value, false));
    }
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const handleLimpiezaHorarioAccion = (index) => (dispatch, getState) => {
    const { cuadranteRegistrado, cuadrante } = getState().variablesCuadrantes;
    const { trabajadoresEnCuadrante, suplentesEnCuadrante } = getState().variablesCuadrantesSetters;
    if (cuadrante[index].tipoTrabajador === 'trabajador') {
        dispatch(setEsInicioTraAccion(false));
        dispatch(setEsCambioTraAccion(true));
        let trabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === cuadrante[index].idTrabajador);
        dispatch(gestionaColumnaCuadranteAccion(trabajador, 'trabajador', true, index, false, true, cuadrante[index].tipoHorario, false));
    } else {
        dispatch(setEsInicioSupAccion(false));
        dispatch(setEsCambioSupAccion(true));
        let suplente = suplentesEnCuadrante.find(suplente => suplente.id === cuadrante[index].idTrabajador);
        dispatch(gestionaColumnaCuadranteAccion(suplente, 'suplente', true, index, false, true, cuadrante[index].tipoHorario, false));
    }
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const handleGestionarTamanoColumnaAccion = (index, accion, scrollable, classes) => (dispatch, getState) => {
    const { cuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    dispatch(setCambioRedimensionColumnaAccion(true));
    let arrayCuadrante = [...cuadrante];
    if (accion === 'reducir') {
        arrayCuadrante[index].reducido = true;
        dispatch(setExpandedAccordionAccion(false));
        scrollable.current.classList.remove(classes.openAccordion);
    } else {
        arrayCuadrante[index].reducido = false;
    };
    dispatch(setCuadranteAccion(arrayCuadrante));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const gestionaDiasFestivosHandlerAccion = (
    tipoHorario,
    valor1,
    valor2,
    valor3,
    valor4
) => {
    let laCantidad;
    let rango1, rango2;
    let objetoARetornar;
    switch (tipoHorario) {
        case 'rango':
            if (valor1 && valor2) {
                laCantidad = retornaMinutosAccionEnCuadrantes(
                    valor1,
                    valor2
                ) / 60;
            } else {
                laCantidad = 0;
            };
            objetoARetornar = { cantidad: laCantidad };
            return objetoARetornar
            break;
        case 'rangoDescanso':
            if (valor1 && valor2) {
                if (valor3) {
                    rango2 = retornaMinutosAccionEnCuadrantes(
                        valor3,
                        valor4
                    ) / 60;
                } else {
                    rango2 = 0;
                };
                rango1 = retornaMinutosAccionEnCuadrantes(
                    valor1,
                    valor2
                ) / 60;
                laCantidad = rango1 + rango2;
            } else {
                laCantidad = 0;
            };
            objetoARetornar = { cantidad: laCantidad };
            return objetoARetornar
            break;
        case 'cantidad':
            if (valor1) {
                laCantidad = valor1 / 60;
            } else {
                laCantidad = 0;
            };
            objetoARetornar = { cantidad: laCantidad };
            return objetoARetornar
            break;
        default:
    };
};