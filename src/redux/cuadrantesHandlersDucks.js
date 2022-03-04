import Constantes from "../constantes";
import { setAnchorElMenuAccion } from './cuadrantesSettersDucks';
import { setOpenFacturacionAccion } from './cuadrantesSettersDucks';
import { setOpenFacturacionInteriorAccion } from './cuadrantesSettersDucks';
import { setNumeroFactusolAccion } from './cuadrantesSettersDucks';
import { retornaAnoMesCuadranteAccion } from './appDucks';
import { reseteaContenidoCuadranteAccion } from './cuadrantesSettersDucks';
import { vaciarDatosCentroAccion } from './centrosDucks';
import { vaciarDatosCuadrantesAccion } from './cuadrantesDucks';
import { setValueDatePickerAccion } from './cuadrantesSettersDucks';
import { setDisableSelectCentrosAccion } from './cuadrantesSettersDucks';
import { retornaAnoMesAccion } from './appDucks';
import { cambioEstadoInicioCuadrantesAccion } from './cuadrantesDucks';
import { abreObjetoDialogAccion } from './appDucks';
import { setPreValueValorAccion } from './cuadrantesSettersDucks';
import { vaciarDatosPendientesAccion } from './pendientesDucks';
import { setCategoriaAccion } from './cuadrantesDucks';
import { obtenerCentrosPorCategoriaAccion } from './centrosDucks';
import { setCalendarioAGestionarAccion } from './cuadrantesDucks';
import { reseteaContenidoCentroAccion } from './cuadrantesSettersDucks';
import { setCentroAccion } from './cuadrantesDucks';
import { obtenerCuadranteAccion } from './cuadrantesDucks';
import { obtenerCategoriaPorCentroAccion } from './centrosDucks';
import { forzarRecargaGraficosCuadrantesAccion } from './graficosDucks';
import { resetearCuadranteAccion } from './cuadrantesDucks';
import { setControladorDeEstadoAccion } from './cuadrantesSettersDucks';
import { setPreValueCalendarioAGestionarReseteoAccion } from './cuadrantesSettersDucks';
import { cierraObjetoDialogAccion } from './appDucks';
import { setNumeroCuadrantesCuadrantesAccion } from './cuadrantesSettersDucks';
import { setVenimosBorrarCuadranteAccion } from './cuadrantesSettersDucks';
import { actualizarObjetoCuadranteAccion } from './cuadrantesDucks';
import { activarDesactivarCambioBotonActualizarAccion } from './cuadrantesDucks';
import { registrarIntervencionAccion } from './appDucks';
import { setCuadranteEnUsoCuadrantesAccion } from './cuadrantesSettersDucks';
import { gestionaCuadranteIndividualAccion } from './cuadrantesGestionDucks';
import { setAlertaAccion } from './cuadrantesSettersDucks';
import { cambiarACuadranteNoRegistradoAccion } from './cuadrantesDucks';
import { activarDesactivarCambioBotonResetearAccion } from './cuadrantesDucks';
import { setExpandedAccordionAccion } from './cuadrantesSettersDucks';
import { setEsInicioTraAccion } from './cuadrantesSettersDucks';
import { setEsInicioSupAccion } from './cuadrantesSettersDucks';
import { setEsCambioTraAccion } from './cuadrantesSettersDucks';
import { setEsCambioSupAccion } from './cuadrantesSettersDucks';
import { gestionaColumnaCuadranteAccion } from './cuadrantesColumnasDucks';
import { cambiarEstadoCuadranteEnUsoRevisadoAccion } from './cuadrantesGestionDucks';
import { setCuadranteAccion } from './cuadrantesDucks';
import { setItemPrevioEditandoAccion } from './cuadrantesSettersDucks';
import { activarDesactivarCambioAccion } from './cuadrantesDucks';
import { setBufferSwitchedDiasFestivosCuadranteAccion } from './cuadrantesSettersDucks';
import { setCuadranteServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { gestionaColumnaServiciosFijosCambiosAccion } from './cuadrantesServiciosFijosDucks';
import { setStateFestivoAccion } from './cuadrantesDucks';
import { setColumnaIndiceAGestionarAccion } from './cuadrantesSettersDucks';
import { setPosicionTrabajadorPrevioACambiarAccion } from './cuadrantesSettersDucks';
import { setPosicionSuplentePrevioACambiarAccion } from './cuadrantesSettersDucks';
import { obtenerTrabajadorAccion } from './trabajadoresDucks';
import { obtenerSuplenteAccion } from './trabajadoresDucks';
import { setEsUnaActualizacionTrabajadorAccion } from './cuadrantesSettersDucks';
import { retornaHoraRangoAccion } from './appDucks';
import { retornaMinutosAccion } from './appDucks';
import { isNumeric } from './appDucks';
import { setItemEditandoConfiguracionAccion } from './cuadrantesSettersDucks';
import { setItemPrevioEditandoConfiguracionAccion } from './cuadrantesSettersDucks';
import { setItemEditandoServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setItemPrevioEditandoServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setLosServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { gestionaColumnaServiciosFijosInicioAccion } from './cuadrantesServiciosFijosDucks';
import { setStateSwitchTipoServicioFijoCuadranteAccion } from './cuadrantesServiciosFijosDucks';
import { setCambiadaConfiguracionGeneralAccion } from './cuadrantesSettersDucks';
import { setEstamosActualizandoCuadranteSinCargaAccion } from './cuadrantesSettersDucks';

//constantes
const arrayFestivos = Constantes.CALENDARIO_FESTIVOS;
const dataInicial = {
};

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
        let elArrayDatosCuadrante = [...objetoCuadrante.datosCuadrante.datosCuadrante];
        let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
        let elArrayDatosServiciosFijos = [...objetoCuadrante.datosServicios.datosServicios];
        let elArrayHoras = [...objetoCuadrante.horas.horas];
        elArrayDatosCuadrante.splice(posicionCuadrante, 1);
        elArrayDatosInforme.splice(posicionCuadrante, 1);
        elArrayDatosServiciosFijos.splice(posicionCuadrante, 1);
        elArrayHoras.splice(posicionCuadrante, 1);
        let losDatosCuadrante = {
            ...objetoCuadrante.datosCuadrante,
            datosCuadrante: elArrayDatosCuadrante
        };
        let losDatosInforme = {
            ...objetoCuadrante.datosInforme,
            datosInforme: elArrayDatosInforme
        };
        let losDatosServiciosFijos = {
            ...objetoCuadrante.datosServicios,
            datosServicios: elArrayDatosServiciosFijos
        };
        let losDatosHoras = {
            ...objetoCuadrante.horas,
            horas: elArrayHoras
        };
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
        let posicionACargar;
        if (posicionCuadrante === 0) {
            posicionACargar = numeroCuadrantesCuadrantes.length - 1
        } else {
            posicionACargar = 1
        };
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
    const diaFecha = elDia + '-' + monthNum;
    if (arrayFestivos.includes(diaFecha)) {
        return true;
    } else {
        return false;
    }
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
    const { calendarioAGestionar, esInicioCuadrantes, estadoIntervencionCuadranteNuevoRegistrada } = getState().variablesCuadrantes;
    const { estadoIntervencionRegistrada } = getState().variablesApp;
    if (esInicioCuadrantes) {
        dispatch(reseteaContenidoCentroAccion(false));
        dispatch(vaciarDatosCentroAccion());
        dispatch(setCentroAccion(event.target.value));
        const nombreCuadrante = calendarioAGestionar + '-' + event.target.value;
        dispatch(vaciarDatosCuadrantesAccion());
        dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
        dispatch(obtenerCategoriaPorCentroAccion('centros', event.target.value, 0));
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
                dispatch(setCentroAccion(event.target.value));
                dispatch(vaciarDatosCuadrantesAccion());
                const nombreCuadrante = calendarioAGestionar + '-' + event.target.value;
                dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
                dispatch(obtenerCategoriaPorCentroAccion('centros', event.target.value, 0));
            }
        }
    }
};

export const goToInicioCuadrantesAccion = () => (dispatch, getState) => {
    const { estadoIntervencionCuadranteNuevoRegistrada } = getState().variablesCuadrantes;
    const { estadoIntervencionRegistrada } = getState().variablesApp;
    if (!estadoIntervencionCuadranteNuevoRegistrada) {
        dispatch(handleClickOpenDialogCuadrantes2Accion());
    } else {
        if (!estadoIntervencionRegistrada) {
            dispatch(handleClickOpenDialogCuadrantes3Accion());
            dispatch(setPreValueValorAccion({ valor: null, origen: 'inicio' }));
        } else {
            dispatch(reseteaContenidoCuadranteAccion());
            dispatch(setDisableSelectCentrosAccion(true));
            dispatch(vaciarDatosCuadrantesAccion());
            dispatch(cambioEstadoInicioCuadrantesAccion(true));
            dispatch(setCategoriaAccion(''));
        }
    };
    dispatch(setAnchorElMenuAccion(null));
    dispatch(vaciarDatosPendientesAccion());
    dispatch(forzarRecargaGraficosCuadrantesAccion(true));
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
            dispatch(gestionaColumnaCuadranteAccion(null, 'trabajador', true, null, true, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
        } else {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo) {
                dispatch(gestionaColumnaCuadranteAccion(null, 'trabajador', true, null, true, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
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
            dispatch(gestionaColumnaCuadranteAccion(null, 'suplente', true, columna, true, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
        } else {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo) {
                dispatch(gestionaColumnaCuadranteAccion(null, 'suplente', true, columna, true, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
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
    const { cuadranteEnUsoCuadrantes, trabajadoresEnCuadrante, suplentesEnCuadrante } = getState().variablesCuadrantesSetters;
    const { objetoCentro } = getState().variablesCentros;
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
        }
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
    }

    scrollable.current.classList.remove(classes.openAccordion);
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    //setEstamosActualizandoCuadrante({ estado: true, columna: columna });
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
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

export const handleChangeFestivoDiaAccion = (postRef, index, diaSemana, event) => (dispatch, getState) => {
    const { cuadrante, stateFestivo, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { bufferSwitchedDiasFestivosCuadrante } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    dispatch(setStateFestivoAccion({ ...stateFestivo, [event.target.name]: event.target.checked }));
    if (cuadrante.length > 0) {
        let arrayCuadrante = [];
        let objetoBuffer = {};
        objetoBuffer[postRef] = [];
        let indexABorrar = -1;
        cuadrante.forEach((columna, indexFor) => {
            columna[postRef].festivo = event.target.checked;
            if (columna.nombreTrabajador) {
                if (event.target.checked) {
                    switch (columna.tipoHorario) {
                        case 'rango':
                            switch (diaSemana) {
                                case 'Lunes':
                                    objetoBuffer[postRef].push([columna[postRef].lunesInicioRango, columna[postRef].lunesFinRango]);
                                    columna[postRef].lunesInicioRango = null;
                                    columna[postRef].lunesFinRango = null;
                                    break;
                                case 'Martes':
                                    objetoBuffer[postRef].push([columna[postRef].martesInicioRango, columna[postRef].martesFinRango]);
                                    columna[postRef].martesInicioRango = null;
                                    columna[postRef].martesFinRango = null;
                                    break;
                                case 'Miércoles':
                                    objetoBuffer[postRef].push([columna[postRef].miercolesInicioRango, columna[postRef].miercolesFinRango]);
                                    columna[postRef].miercolesInicioRango = null;
                                    columna[postRef].miercolesFinRango = null;
                                    break;
                                case 'Jueves':
                                    objetoBuffer[postRef].push([columna[postRef].juevesInicioRango, columna[postRef].juevesFinRango]);
                                    columna[postRef].juevesInicioRango = null;
                                    columna[postRef].juevesFinRango = null;
                                    break;
                                case 'Viernes':
                                    objetoBuffer[postRef].push([columna[postRef].viernesInicioRango, columna[postRef].viernesFinRango]);
                                    columna[postRef].viernesInicioRango = null;
                                    columna[postRef].viernesFinRango = null;
                                    break;
                                case 'Sábado':
                                    objetoBuffer[postRef].push([columna[postRef].sabadoInicioRango, columna[postRef].sabadoFinRango]);
                                    columna[postRef].sabadoInicioRango = null;
                                    columna[postRef].sabadoFinRango = null;
                                    break;
                                case 'Domingo':
                                    objetoBuffer[postRef].push([columna[postRef].domingoInicioRango, columna[postRef].domingoFinRango]);
                                    columna[postRef].domingoInicioRango = null;
                                    columna[postRef].domingoFinRango = null;
                                    break;
                                default:
                            }
                            break;
                        case 'rangoDescanso':
                            switch (diaSemana) {
                                case 'Lunes':
                                    objetoBuffer[postRef].push([columna[postRef].lunesInicio1RangoDescanso, columna[postRef].lunesFin1RangoDescanso, columna[postRef].lunesInicio2RangoDescanso, columna[postRef].lunesFin2RangoDescanso]);
                                    columna[postRef].lunesInicio1RangoDescanso = null;
                                    columna[postRef].lunesFin1RangoDescanso = null;
                                    columna[postRef].lunesInicio2RangoDescanso = null;
                                    columna[postRef].lunesFin2RangoDescanso = null;
                                    break;
                                case 'Martes':
                                    objetoBuffer[postRef].push([columna[postRef].martesInicio1RangoDescanso, columna[postRef].martesFin1RangoDescanso, columna[postRef].martesInicio2RangoDescanso, columna[postRef].martesFin2RangoDescanso]);
                                    columna[postRef].martesInicio1RangoDescanso = null;
                                    columna[postRef].martesFin1RangoDescanso = null;
                                    columna[postRef].martesInicio2RangoDescanso = null;
                                    columna[postRef].martesFin2RangoDescanso = null;
                                    break;
                                case 'Miércoles':
                                    objetoBuffer[postRef].push([columna[postRef].miercolesInicio1RangoDescanso, columna[postRef].miercolesFin1RangoDescanso, columna[postRef].miercolesInicio2RangoDescanso, columna[postRef].miercolesFin2RangoDescanso]);
                                    columna[postRef].miercolesInicio1RangoDescanso = null;
                                    columna[postRef].miercolesFin1RangoDescanso = null;
                                    columna[postRef].miercolesInicio2RangoDescanso = null;
                                    columna[postRef].miercolesFin2RangoDescanso = null;
                                    break;
                                case 'Jueves':
                                    objetoBuffer[postRef].push([columna[postRef].juevesInicio1RangoDescanso, columna[postRef].juevesFin1RangoDescanso, columna[postRef].juevesInicio2RangoDescanso, columna[postRef].juevesFin2RangoDescanso]);
                                    columna[postRef].juevesInicio1RangoDescanso = null;
                                    columna[postRef].juevesFin1RangoDescanso = null;
                                    columna[postRef].juevesInicio2RangoDescanso = null;
                                    columna[postRef].juevesFin2RangoDescanso = null;
                                    break;
                                case 'Viernes':
                                    objetoBuffer[postRef].push([columna[postRef].viernesInicio1RangoDescanso, columna[postRef].viernesFin1RangoDescanso, columna[postRef].viernesInicio2RangoDescanso, columna[postRef].viernesFin2RangoDescanso]);
                                    columna[postRef].viernesInicio1RangoDescanso = null;
                                    columna[postRef].viernesFin1RangoDescanso = null;
                                    columna[postRef].viernesInicio2RangoDescanso = null;
                                    columna[postRef].viernesFin2RangoDescanso = null;
                                    break;
                                case 'Sábado':
                                    objetoBuffer[postRef].push([columna[postRef].sabadoInicio1RangoDescanso, columna[postRef].sabadoFin1RangoDescanso, columna[postRef].sabadoInicio2RangoDescanso, columna[postRef].sabadoFin2RangoDescanso]);
                                    columna[postRef].sabadoInicio1RangoDescanso = null;
                                    columna[postRef].sabadoFin1RangoDescanso = null;
                                    columna[postRef].sabadoInicio2RangoDescanso = null;
                                    columna[postRef].sabadoFin2RangoDescanso = null;
                                    break;
                                case 'Domingo':
                                    objetoBuffer[postRef].push([columna[postRef].domingoInicio1RangoDescanso, columna[postRef].domingoFin1RangoDescanso, columna[postRef].domingoInicio2RangoDescanso, columna[postRef].domingoFin2RangoDescanso]);
                                    columna[postRef].domingoInicio1RangoDescanso = null;
                                    columna[postRef].domingoFin1RangoDescanso = null;
                                    columna[postRef].domingoInicio2RangoDescanso = null;
                                    columna[postRef].domingoFin2RangoDescanso = null;
                                    break;
                                default:
                            }
                            break;
                        case 'cantidad':
                            switch (diaSemana) {
                                case 'Lunes':
                                    objetoBuffer[postRef].push([columna[postRef].lunesCantidad]);
                                    columna[postRef].lunesCantidad = '';
                                    break;
                                case 'Martes':
                                    objetoBuffer[postRef].push([columna[postRef].martesCantidad]);
                                    columna[postRef].martesCantidad = '';
                                    break;
                                case 'Miércoles':
                                    objetoBuffer[postRef].push([columna[postRef].miercolesCantidad]);
                                    columna[postRef].miercolesCantidad = '';
                                    break;
                                case 'Jueves':
                                    objetoBuffer[postRef].push([columna[postRef].juevesCantidad]);
                                    columna[postRef].juevesCantidad = '';
                                    break;
                                case 'Viernes':
                                    objetoBuffer[postRef].push([columna[postRef].viernesCantidad]);
                                    columna[postRef].viernesCantidad = '';
                                    break;
                                case 'Sábado':
                                    objetoBuffer[postRef].push([columna[postRef].sabadoCantidad]);
                                    columna[postRef].sabadoCantidad = '';
                                    break;
                                case 'Domingo':
                                    objetoBuffer[postRef].push([columna[postRef].domingoCantidad]);
                                    columna[postRef].domingoCantidad = '';
                                    break;
                                default:
                            }
                            break;
                        default:
                    };
                    let arrayBuffer = [...bufferSwitchedDiasFestivosCuadrante];
                    arrayBuffer.push(objetoBuffer);
                    dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(arrayBuffer));
                } else {
                    let variableBuffer1, variableBuffer2, variableBuffer3, variableBuffer4;
                    bufferSwitchedDiasFestivosCuadrante.forEach((registroBuffer, index) => {
                        if (Object.keys(registroBuffer)[0] === postRef) {
                            variableBuffer1 = registroBuffer[postRef][indexFor][0];
                            variableBuffer2 = registroBuffer[postRef][indexFor][1];
                            variableBuffer3 = registroBuffer[postRef][indexFor][2];
                            variableBuffer4 = registroBuffer[postRef][indexFor][3];
                            indexABorrar = index;
                        }
                    });
                    switch (columna.tipoHorario) {
                        case 'rango':
                            switch (diaSemana) {
                                case 'Lunes':
                                    columna[postRef].lunesInicioRango = variableBuffer1;
                                    columna[postRef].lunesFinRango = variableBuffer2;
                                    break;
                                case 'Martes':
                                    columna[postRef].martesInicioRango = variableBuffer1;
                                    columna[postRef].martesFinRango = variableBuffer2;

                                    break;
                                case 'Miércoles':
                                    columna[postRef].miercolesInicioRango = variableBuffer1;
                                    columna[postRef].miercolesFinRango = variableBuffer2;

                                    break;
                                case 'Jueves':
                                    columna[postRef].juevesInicioRango = variableBuffer1;
                                    columna[postRef].juevesFinRango = variableBuffer2;
                                    break;
                                case 'Viernes':
                                    columna[postRef].viernesInicioRango = variableBuffer1;
                                    columna[postRef].viernesFinRango = variableBuffer2;

                                    break;
                                case 'Sábado':
                                    columna[postRef].sabadoInicioRango = variableBuffer1;
                                    columna[postRef].sabadoFinRango = variableBuffer2;

                                    break;
                                case 'Domingo':
                                    columna[postRef].domingoInicioRango = variableBuffer1;
                                    columna[postRef].domingoFinRango = variableBuffer2;
                                    break;
                                default:
                            }
                            break;
                        case 'rangoDescanso':
                            switch (diaSemana) {
                                case 'Lunes':
                                    columna[postRef].lunesInicio1RangoDescanso = variableBuffer1;
                                    columna[postRef].lunesFin1RangoDescanso = variableBuffer2;
                                    columna[postRef].lunesInicio2RangoDescanso = variableBuffer3;
                                    columna[postRef].lunesFin2RangoDescanso = variableBuffer4;
                                    break;
                                case 'Martes':
                                    columna[postRef].martesInicio1RangoDescanso = variableBuffer1;
                                    columna[postRef].martesFin1RangoDescanso = variableBuffer2;
                                    columna[postRef].martesInicio2RangoDescanso = variableBuffer3;
                                    columna[postRef].martesFin2RangoDescanso = variableBuffer4;
                                    break;
                                case 'Miércoles':
                                    columna[postRef].miercolesInicio1RangoDescanso = variableBuffer1;
                                    columna[postRef].miercolesFin1RangoDescanso = variableBuffer2;
                                    columna[postRef].miercolesInicio2RangoDescanso = variableBuffer3;
                                    columna[postRef].miercolesFin2RangoDescanso = variableBuffer4;
                                    break;
                                case 'Jueves':
                                    columna[postRef].juevesInicio1RangoDescanso = variableBuffer1;
                                    columna[postRef].juevesFin1RangoDescanso = variableBuffer2;
                                    columna[postRef].juevesInicio2RangoDescanso = variableBuffer3;
                                    columna[postRef].juevesFin2RangoDescanso = variableBuffer4;
                                    break;
                                case 'Viernes':
                                    columna[postRef].viernesInicio1RangoDescanso = variableBuffer1;
                                    columna[postRef].viernesFin1RangoDescanso = variableBuffer2;
                                    columna[postRef].viernesInicio2RangoDescanso = variableBuffer3;
                                    columna[postRef].viernesFin2RangoDescanso = variableBuffer4;
                                    break;
                                case 'Sábado':
                                    columna[postRef].sabadoInicio1RangoDescanso = variableBuffer1;
                                    columna[postRef].sabadoFin1RangoDescanso = variableBuffer2;
                                    columna[postRef].sabadoInicio2RangoDescanso = variableBuffer3;
                                    columna[postRef].sabadoFin2RangoDescanso = variableBuffer4;
                                    break;
                                case 'Domingo':
                                    columna[postRef].domingoInicio1RangoDescanso = variableBuffer1;
                                    columna[postRef].domingoFin1RangoDescanso = variableBuffer2;
                                    columna[postRef].domingoInicio2RangoDescanso = variableBuffer3;
                                    columna[postRef].domingoFin2RangoDescanso = variableBuffer4;
                                    break;
                                default:
                            }
                            break;
                        case 'cantidad':
                            switch (diaSemana) {
                                case 'Lunes':
                                    columna[postRef].lunesCantidad = variableBuffer1;
                                    break;
                                case 'Martes':
                                    columna[postRef].martesCantidad = variableBuffer1;
                                    break;
                                case 'Miércoles':
                                    columna[postRef].miercolesCantidad = variableBuffer1;
                                    break;
                                case 'Jueves':
                                    columna[postRef].juevesCantidad = variableBuffer1;
                                    break;
                                case 'Viernes':
                                    columna[postRef].viernesCantidad = variableBuffer1;
                                    break;
                                case 'Sábado':
                                    columna[postRef].sabadoCantidad = variableBuffer1;
                                    break;
                                case 'Domingo':
                                    columna[postRef].domingoCantidad = variableBuffer1;
                                    break;
                                default:
                            }
                            break;
                        default:
                    }
                }
            }
            arrayCuadrante.push(columna);
        });
        if (indexABorrar >= 0) {
            let arrayBuffer = [...bufferSwitchedDiasFestivosCuadrante];
            arrayBuffer.splice(indexABorrar, 1);
            dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(arrayBuffer));
        };
        dispatch(setCuadranteAccion(arrayCuadrante));
    };
    if (cuadranteServiciosFijos.length > 0) {
        let casilla = {
            dia: postRef,
            indice: null,
            tipo: '',
            valor: event.target.checked
        };
        dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosCambiosAccion(cuadranteServiciosFijos, casilla))));
    };
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const handleChangeSFCasillasAccion = (postRef, indice, tipo, event) => (dispatch, getState) => {
    const { cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    let casilla = {
        dia: postRef,
        valor: event.target.checked,
        indice: indice,
        tipo: tipo
    };
    dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosCambiosAccion(cuadranteServiciosFijos, casilla))));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const handleChangeFormTrabajadoresAccion = (index, tipoTrabajador, event) => (dispatch, getState) => {
    const { cuadranteRegistrado, cuadrante } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    const { cuadranteEnUsoCuadrantes, trabajadoresEnCuadrante, suplentesEnCuadrante } = getState().variablesCuadrantesSetters;
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
    const { cuadranteRegistrado, cuadrante } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    const { cuadranteEnUsoCuadrantes, trabajadoresEnCuadrante, suplentesEnCuadrante } = getState().variablesCuadrantesSetters;
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
            dispatch(setPosicionTrabajadorPrevioACambiarAccion(posicionSuplentePrevio));
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
        laHoraInicio = dispatch(retornaHoraRangoAccion(hora));
    } else {
        laHoraInicio = null;
    };
    const laHoraFin = dispatch(retornaHoraRangoAccion(horaPareja));
    if (laHoraFin !== null && (dispatch(retornaMinutosAccion(laHoraInicio, laHoraFin))) < 0) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
            tipo: 'error'
        }));
        return;
    };
    if (key.includes('Lunes')) {
        if (timePicker === 'timePickerInicio') {
            arrayCuadrante[index][key].lunesInicioRango = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio1Descanso') {
            arrayCuadrante[index][key].lunesInicio1RangoDescanso = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio2Descanso') {
            arrayCuadrante[index][key].lunesInicio2RangoDescanso = laHoraInicio;
        }
    };
    if (key.includes('Martes')) {
        if (timePicker === 'timePickerInicio') {
            arrayCuadrante[index][key].martesInicioRango = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio1Descanso') {
            arrayCuadrante[index][key].martesInicio1RangoDescanso = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio2Descanso') {
            arrayCuadrante[index][key].martesInicio2RangoDescanso = laHoraInicio;
        }
    };
    if (key.includes('Miércoles')) {
        if (timePicker === 'timePickerInicio') {
            arrayCuadrante[index][key].miercolesInicioRango = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio1Descanso') {
            arrayCuadrante[index][key].miercolesInicio1RangoDescanso = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio2Descanso') {
            arrayCuadrante[index][key].miercolesInicio2RangoDescanso = laHoraInicio;
        }
    };
    if (key.includes('Jueves')) {
        if (timePicker === 'timePickerInicio') {
            arrayCuadrante[index][key].juevesInicioRango = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio1Descanso') {
            arrayCuadrante[index][key].juevesInicio1RangoDescanso = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio2Descanso') {
            arrayCuadrante[index][key].juevesInicio2RangoDescanso = laHoraInicio;
        }
    };
    if (key.includes('Viernes')) {
        if (timePicker === 'timePickerInicio') {
            arrayCuadrante[index][key].viernesInicioRango = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio1Descanso') {
            arrayCuadrante[index][key].viernesInicio1RangoDescanso = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio2Descanso') {
            arrayCuadrante[index][key].viernesInicio2RangoDescanso = laHoraInicio;
        }
    };
    if (key.includes('Sábado')) {
        if (timePicker === 'timePickerInicio') {
            arrayCuadrante[index][key].sabadoInicioRango = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio1Descanso') {
            arrayCuadrante[index][key].sabadoInicio1RangoDescanso = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio2Descanso') {
            arrayCuadrante[index][key].sabadoInicio2RangoDescanso = laHoraInicio;
        }
    };
    if (key.includes('Domingo')) {
        if (timePicker === 'timePickerInicio') {
            arrayCuadrante[index][key].domingoInicioRango = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio1Descanso') {
            arrayCuadrante[index][key].domingoInicio1RangoDescanso = laHoraInicio;
        }
        if (timePicker === 'timePickerInicio2Descanso') {
            arrayCuadrante[index][key].domingoInicio2RangoDescanso = laHoraInicio;
        }
    };
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
    const laHoraInicio = dispatch(retornaHoraRangoAccion(horaPareja));
    if (laHoraInicio !== null && (dispatch(retornaMinutosAccion(laHoraInicio, laHoraFin))) < 0) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
            tipo: 'error'
        }));
        return;
    };
    if (key.includes('Lunes')) {
        if (timePicker === 'timePickerFin') {
            arrayCuadrante[index][key].lunesFinRango = laHoraFin;
        }
        if (timePicker === 'timePickerFin1Descanso') {
            arrayCuadrante[index][key].lunesFin1RangoDescanso = laHoraFin;
        }
        if (timePicker === 'timePickerFin2Descanso') {
            arrayCuadrante[index][key].lunesFin2RangoDescanso = laHoraFin;
        }
    };
    if (key.includes('Martes')) {
        if (timePicker === 'timePickerFin') {
            arrayCuadrante[index][key].martesFinRango = laHoraFin;
        }
        if (timePicker === 'timePickerFin1Descanso') {
            arrayCuadrante[index][key].martesFin1RangoDescanso = laHoraFin;
        }
        if (timePicker === 'timePickerFin2Descanso') {
            arrayCuadrante[index][key].martesFin2RangoDescanso = laHoraFin;
        }
    };
    if (key.includes('Miércoles')) {
        if (timePicker === 'timePickerFin') {
            arrayCuadrante[index][key].miercolesFinRango = laHoraFin;
        }
        if (timePicker === 'timePickerFin1Descanso') {
            arrayCuadrante[index][key].miercolesFin1RangoDescanso = laHoraFin;
        }
        if (timePicker === 'timePickerFin2Descanso') {
            arrayCuadrante[index][key].miercolesFin2RangoDescanso = laHoraFin;
        }
    };
    if (key.includes('Jueves')) {
        if (timePicker === 'timePickerFin') {
            arrayCuadrante[index][key].juevesFinRango = laHoraFin;
        }
        if (timePicker === 'timePickerFin1Descanso') {
            arrayCuadrante[index][key].juevesFin1RangoDescanso = laHoraFin;
        }
        if (timePicker === 'timePickerFin2Descanso') {
            arrayCuadrante[index][key].juevesFin2RangoDescanso = laHoraFin;
        }
    };
    if (key.includes('Viernes')) {
        if (timePicker === 'timePickerFin') {
            arrayCuadrante[index][key].viernesFinRango = laHoraFin;
        }
        if (timePicker === 'timePickerFin1Descanso') {
            arrayCuadrante[index][key].viernesFin1RangoDescanso = laHoraFin;
        }
        if (timePicker === 'timePickerFin2Descanso') {
            arrayCuadrante[index][key].viernesFin2RangoDescanso = laHoraFin;
        }
    };
    if (key.includes('Sábado')) {
        if (timePicker === 'timePickerFin') {
            arrayCuadrante[index][key].sabadoFinRango = laHoraFin;
        }
        if (timePicker === 'timePickerFin1Descanso') {
            arrayCuadrante[index][key].sabadoFin1RangoDescanso = laHoraFin;
        }
        if (timePicker === 'timePickerFin2Descanso') {
            arrayCuadrante[index][key].sabadoFin2RangoDescanso = laHoraFin;
        }
    };
    if (key.includes('Domingo')) {
        if (timePicker === 'timePickerFin') {
            arrayCuadrante[index][key].domingoFinRango = laHoraFin;
        }
        if (timePicker === 'timePickerFin1Descanso') {
            arrayCuadrante[index][key].domingoFin1RangoDescanso = laHoraFin;
        }
        if (timePicker === 'timePickerFin2Descanso') {
            arrayCuadrante[index][key].domingoFin2RangoDescanso = laHoraFin;
        }
    };

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
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo !== 1) {
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
    const idSplitted = event.target.name.split("-");
    const key = idSplitted[2];
    let arrayCuadrante = [...cuadrante];
    arrayCuadrante[index][key].tipoServicio = event.target.value;
    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeFormConfiguracionCuadranteAccion = (prop, event) => (dispatch, getState) => {
    const { itemEditandoConfiguracion, itemPrevioEditandoConfiguracion } = getState().variablesCuadrantesSetters;
    if (prop === "tipoHorario" || prop === "observaciones") {
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
    dispatch(setItemPrevioEditandoConfiguracionAccion({ ...itemPrevioEditandoConfiguracion, modificado: true }));
    dispatch(activarDesactivarCambioAccion(false));
};

export const handleChangeFormConfiguracionServiciosFijosAccion = (tipo, prop, event) => (dispatch, getState) => {
    const { itemEditandoServiciosFijos, itemPrevioEditandoServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    let losServicios = { ...itemEditandoServiciosFijos.servicios };
    let losEstados = { ...itemEditandoServiciosFijos.switch };
    if (tipo === "switch") {
        if (event.target.name.includes('TO')) {
            if (!event.target.checked) {
                losServicios['precioHora_TO'] = '';
                losServicios['variacion_TO'] = '';
                losServicios['diaVariacion_TO'] = '';
                losServicios['activo_TO'] = 'si';
            };
            losEstados['TO'] = event.target.checked;
        };
        if (event.target.name.includes('CR')) {
            if (!event.target.checked) {
                losServicios['precioHora_CR'] = '';
                losServicios['variacion_CR'] = '';
                losServicios['diaVariacion_CR'] = '';
                losServicios['activo_CR'] = 'si';
            };
            losEstados['CR'] = event.target.checked;
        };
        if (event.target.name.includes('CE')) {
            if (!event.target.checked) {
                losServicios['precioHora_CE'] = '';
                losServicios['variacion_CE'] = '';
                losServicios['diaVariacion_CE'] = '';
                losServicios['activo_CE'] = 'si';
            };
            losEstados['CE'] = event.target.checked;
        };
        if (event.target.name.includes('CI')) {
            if (!event.target.checked) {
                losServicios['precioHora_CI'] = '';
                losServicios['variacion_CI'] = '';
                losServicios['diaVariacion_CI'] = '';
                losServicios['activo_CI'] = 'si';
            };
            losEstados['CI'] = event.target.checked;
        };
        if (event.target.name.includes('MO')) {
            if (!event.target.checked) {
                losServicios['precioHora_MO'] = '';
                losServicios['variacion_MO'] = '';
                losServicios['diaVariacion_MO'] = '';
                losServicios['activo_MO'] = 'si';
            };
            losEstados['MO'] = event.target.checked;
        };
        if (event.target.name.includes('OF')) {
            if (!event.target.checked) {
                losServicios['precioHora_OF'] = '';
                losServicios['variacion_OF'] = '';
                losServicios['diaVariacion_OF'] = '';
                losServicios['activo_OF'] = 'si';
            };
            losEstados['OF'] = event.target.checked;
        };
        if (event.target.name.includes('AL')) {
            if (!event.target.checked) {
                losServicios['precioHora_AL'] = '';
                losServicios['variacion_AL'] = '';
                losServicios['diaVariacion_AL'] = '';
                losServicios['activo_AL'] = 'si';
            };
            losEstados['AL'] = event.target.checked;
        };
        if (event.target.name.includes('LA')) {
            if (!event.target.checked) {
                losServicios['precioHora_LA'] = '';
                losServicios['variacion_LA'] = '';
                losServicios['diaVariacion_LA'] = '';
                losServicios['activo_LA'] = 'si';
            };
            losEstados['LA'] = event.target.checked;
        };
        if (event.target.name.includes('TE')) {
            if (!event.target.checked) {
                losServicios['precioHora_TE'] = '';
                losServicios['variacion_TE'] = '';
                losServicios['diaVariacion_TE'] = '';
                losServicios['activo_TE'] = 'si';
            };
            losEstados['TE'] = event.target.checked;
        };
        if (event.target.name.includes('FI')) {
            if (!event.target.checked) {
                losServicios['precioHora_FI'] = '';
                losServicios['variacion_FI'] = '';
                losServicios['diaVariacion_FI'] = '';
                losServicios['activo_FI'] = 'si';
            };
            losEstados['FI'] = event.target.checked;
        };
        if (event.target.name.includes('FE')) {
            if (!event.target.checked) {
                losServicios['precioHora_FE'] = '';
                losServicios['variacion_FE'] = '';
                losServicios['diaVariacion_FE'] = '';
                losServicios['activo_FE'] = 'si';
            };
            losEstados['FE'] = event.target.checked;
        };
        if (event.target.name.includes('AB')) {
            if (!event.target.checked) {
                losServicios['precioHora_AB'] = '';
                losServicios['variacion_AB'] = '';
                losServicios['diaVariacion_AB'] = '';
                losServicios['activo_AB'] = 'si';
            };
            losEstados['AB'] = event.target.checked;
        };
        if (event.target.name.includes('MA')) {
            if (!event.target.checked) {
                losServicios['precioHora_MA'] = '';
                losServicios['variacion_MA'] = '';
                losServicios['diaVariacion_MA'] = '';
                losServicios['activo_MA'] = 'si';
            };
            losEstados['MA'] = event.target.checked;
        };
        if (event.target.name.includes('PO')) {
            if (!event.target.checked) {
                losServicios['precioHora_PO'] = '';
                losServicios['variacion_PO'] = '';
                losServicios['diaVariacion_PO'] = '';
                losServicios['activo_PO'] = 'si';
            };
            losEstados['PO'] = event.target.checked;
        };
        if (event.target.name.includes('BA')) {
            if (!event.target.checked) {
                losServicios['precioHora_BA'] = '';
                losServicios['variacion_BA'] = '';
                losServicios['diaVariacion_BA'] = '';
                losServicios['activo_BA'] = 'si';
            };
            losEstados['BA'] = event.target.checked;
        };
        if (event.target.name.includes('FT')) {
            if (!event.target.checked) {
                losServicios['precioHora_FT'] = '';
                losServicios['variacion_FT'] = '';
                losServicios['diaVariacion_FT'] = '';
                losServicios['activo_FT'] = 'si';
            };
            losEstados['FT'] = event.target.checked;
        };
        if (event.target.name.includes('C3')) {
            if (!event.target.checked) {
                losServicios['precioHora_C3'] = '';
                losServicios['variacion_C3'] = '';
                losServicios['diaVariacion_C3'] = '';
                losServicios['activo_C3'] = 'si';
            };
            losEstados['C3'] = event.target.checked;
        };
        if (event.target.name.includes('C2')) {
            if (!event.target.checked) {
                losServicios['precioHora_C2'] = '';
                losServicios['variacion_C2'] = '';
                losServicios['diaVariacion_C2'] = '';
                losServicios['activo_C2'] = 'si';
            };
            losEstados['C2'] = event.target.checked;
        };
        if (event.target.name.includes('ES')) {
            if (!event.target.checked) {
                losServicios['precioHora_ES'] = '';
                losServicios['variacion_ES'] = '';
                losServicios['diaVariacion_ES'] = '';
                losServicios['activo_ES'] = 'si';
            };
            losEstados['ES'] = event.target.checked;
        };
        if (event.target.name.includes('PA')) {
            if (!event.target.checked) {
                losServicios['precioHora_PA'] = '';
                losServicios['variacion_PA'] = '';
                losServicios['diaVariacion_PA'] = '';
                losServicios['activo_PA'] = 'si';
            };
            losEstados['PA'] = event.target.checked;
        };
        dispatch(setItemEditandoServiciosFijosAccion({ switch: losEstados, servicios: losServicios }));
    };
    if (tipo === "input") {
        if (isNumeric(event.target.value)) {
            losServicios[prop] = event.target.value;
            dispatch(setItemEditandoServiciosFijosAccion({ ...itemEditandoServiciosFijos, servicios: losServicios }));
        }
    };
    if (tipo === "select" || tipo === "radio") {
        losServicios[prop] = event.target.value;
        dispatch(setItemEditandoServiciosFijosAccion({ ...itemEditandoServiciosFijos, servicios: losServicios }));
    };
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

export const handleRegistrarCambioEnCasillaAccion = (id, index, tipo) => (dispatch, getState) => {
    const { itemPrevioEditando } = getState().variablesCuadrantesSetters;
    const { cuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const idSplitted = id.split("-");
    const key = idSplitted[1];
    let arrayCuadrante = [...cuadrante];
    switch (tipo) {
        case 'rango':
            if (key.includes('Lunes')) {
                if (!arrayCuadrante[index][key].lunesInicioRango && arrayCuadrante[index][key].lunesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].lunesInicioRango && !arrayCuadrante[index][key].lunesFinRango) {
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].lunesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].lunesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Martes')) {
                if (!arrayCuadrante[index][key].martesInicioRango && arrayCuadrante[index][key].martesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].martesInicioRango && !arrayCuadrante[index][key].martesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].martesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].martesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Miércoles')) {
                if (!arrayCuadrante[index][key].miercolesInicioRango && arrayCuadrante[index][key].miercolesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].miercolesInicioRango && !arrayCuadrante[index][key].miercolesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].miercolesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].miercolesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Jueves')) {
                if (!arrayCuadrante[index][key].juevesInicioRango && arrayCuadrante[index][key].juevesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].juevesInicioRango && !arrayCuadrante[index][key].juevesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].juevesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].juevesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Viernes')) {
                if (!arrayCuadrante[index][key].viernesInicioRango && arrayCuadrante[index][key].viernesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].viernesInicioRango && !arrayCuadrante[index][key].viernesFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].viernesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].viernesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Sábado')) {
                if (!arrayCuadrante[index][key].sabadoInicioRango && arrayCuadrante[index][key].sabadoFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].sabadoInicioRango && !arrayCuadrante[index][key].sabadoFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].sabadoInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].sabadoInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Domingo')) {
                if (!arrayCuadrante[index][key].domingoInicioRango && arrayCuadrante[index][key].domingoFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].domingoInicioRango && !arrayCuadrante[index][key].domingoFinRango) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].domingoInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].domingoInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            break;
        case 'rangoDescanso':
            if (key.includes('Lunes')) {
                if (!arrayCuadrante[index][key].lunesInicio1RangoDescanso && arrayCuadrante[index][key].lunesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].lunesInicio1RangoDescanso && !arrayCuadrante[index][key].lunesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (!arrayCuadrante[index][key].lunesInicio2RangoDescanso && arrayCuadrante[index][key].lunesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].lunesInicio2RangoDescanso && !arrayCuadrante[index][key].lunesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].lunesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].lunesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Martes')) {
                if (!arrayCuadrante[index][key].martesInicio1RangoDescanso && arrayCuadrante[index][key].martesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].martesInicio1RangoDescanso && !arrayCuadrante[index][key].martesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (!arrayCuadrante[index][key].martesInicio2RangoDescanso && arrayCuadrante[index][key].martesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].martesInicio2RangoDescanso && !arrayCuadrante[index][key].martesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].martesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].martesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Miércoles')) {
                if (!arrayCuadrante[index][key].miercolesInicio1RangoDescanso && arrayCuadrante[index][key].miercolesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].miercolesInicio1RangoDescanso && !arrayCuadrante[index][key].miercolesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (!arrayCuadrante[index][key].miercolesInicio2RangoDescanso && arrayCuadrante[index][key].miercolesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].miercolesInicio2RangoDescanso && !arrayCuadrante[index][key].miercolesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].miercolesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].miercolesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Jueves')) {
                if (!arrayCuadrante[index][key].juevesInicio1RangoDescanso && arrayCuadrante[index][key].juevesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].juevesInicio1RangoDescanso && !arrayCuadrante[index][key].juevesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (!arrayCuadrante[index][key].juevesInicio2RangoDescanso && arrayCuadrante[index][key].juevesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].juevesInicio2RangoDescanso && !arrayCuadrante[index][key].juevesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].juevesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].juevesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Viernes')) {
                if (!arrayCuadrante[index][key].viernesInicio1RangoDescanso && arrayCuadrante[index][key].viernesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].viernesInicio1RangoDescanso && !arrayCuadrante[index][key].viernesFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (!arrayCuadrante[index][key].viernesInicio2RangoDescanso && arrayCuadrante[index][key].viernesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].viernesInicio2RangoDescanso && !arrayCuadrante[index][key].viernesFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].viernesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].viernesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Sábado')) {
                if (!arrayCuadrante[index][key].sabadoInicio1RangoDescanso && arrayCuadrante[index][key].sabadoFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].sabadoInicio1RangoDescanso && !arrayCuadrante[index][key].sabadoFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (!arrayCuadrante[index][key].sabadoInicio2RangoDescanso && arrayCuadrante[index][key].sabadoFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].sabadoInicio2RangoDescanso && !arrayCuadrante[index][key].sabadoFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].sabadoInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].sabadoInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Domingo')) {
                if (!arrayCuadrante[index][key].domingoInicio1RangoDescanso && arrayCuadrante[index][key].domingoFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].domingoInicio1RangoDescanso && !arrayCuadrante[index][key].domingoFin1RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (!arrayCuadrante[index][key].domingoInicio2RangoDescanso && arrayCuadrante[index][key].domingoFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if (arrayCuadrante[index][key].domingoInicio2RangoDescanso && !arrayCuadrante[index][key].domingoFin2RangoDescanso) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    }));
                    return;
                };
                if ((arrayCuadrante[index][key].domingoInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].domingoInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            break;
        case 'cantidad':
            if (key.includes('Lunes')) {
                if ((arrayCuadrante[index][key].lunesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].lunesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Martes')) {
                if ((arrayCuadrante[index][key].martesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].martesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Miércoles')) {
                if ((arrayCuadrante[index][key].miercolesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].miercolesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Jueves')) {
                if ((arrayCuadrante[index][key].juevesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].juevesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Viernes')) {
                if ((arrayCuadrante[index][key].viernesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].viernesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Sábado')) {
                if ((arrayCuadrante[index][key].sabadoCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].sabadoCantidad && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
            if (key.includes('Domingo')) {
                if ((arrayCuadrante[index][key].domingoCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                    (!arrayCuadrante[index][key].domingoCantidad && arrayCuadrante[index][key].tipoServicio)) {
                    dispatch(setItemPrevioEditandoAccion({ ...itemPrevioEditando, modificado: false }));
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    }));
                    return;
                };
            };
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
            if (itemPrevioEditando.id.includes('Lunes')) {
                if (arrayCuadrante[index][key].lunesInicioRango === elInicioRango &&
                    arrayCuadrante[index][key].lunesFinRango === elFinRango &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Martes')) {
                if (arrayCuadrante[index][key].martesInicioRango === elInicioRango &&
                    arrayCuadrante[index][key].martesFinRango === elFinRango &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Miércoles')) {
                if (arrayCuadrante[index][key].miercolesInicioRango === elInicioRango &&
                    arrayCuadrante[index][key].miercolesFinRango === elFinRango &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Jueves')) {
                if (arrayCuadrante[index][key].juevesInicioRango === elInicioRango &&
                    arrayCuadrante[index][key].juevesFinRango === elFinRango &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Viernes')) {
                if (arrayCuadrante[index][key].viernesInicioRango === elInicioRango &&
                    arrayCuadrante[index][key].viernesFinRango === elFinRango &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Sábado')) {
                if (arrayCuadrante[index][key].sabadoInicioRango === elInicioRango &&
                    arrayCuadrante[index][key].sabadoFinRango === elFinRango &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Domingo')) {
                if (arrayCuadrante[index][key].domingoInicioRango === elInicioRango &&
                    arrayCuadrante[index][key].domingoFinRango === elFinRango &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
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
            if (itemPrevioEditando.id.includes('Lunes')) {
                if (arrayCuadrante[index][key].lunesInicio1RangoDescanso === elInicioRangoDescanso1 &&
                    arrayCuadrante[index][key].lunesFin1RangoDescanso === elFinRangoDescanso1 &&
                    arrayCuadrante[index][key].lunesInicio2RangoDescanso === elInicioRangoDescanso2 &&
                    arrayCuadrante[index][key].lunesFin2RangoDescanso === elFinRangoDescanso2 &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Martes')) {
                if (arrayCuadrante[index][key].martesInicio1RangoDescanso === elInicioRangoDescanso1 &&
                    arrayCuadrante[index][key].martesFin1RangoDescanso === elFinRangoDescanso1 &&
                    arrayCuadrante[index][key].martesInicio2RangoDescanso === elInicioRangoDescanso2 &&
                    arrayCuadrante[index][key].martesFin2RangoDescanso === elFinRangoDescanso2 &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Miércoles')) {
                if (arrayCuadrante[index][key].miercolesInicio1RangoDescanso === elInicioRangoDescanso1 &&
                    arrayCuadrante[index][key].miercolesFin1RangoDescanso === elFinRangoDescanso1 &&
                    arrayCuadrante[index][key].miercolesInicio2RangoDescanso === elInicioRangoDescanso2 &&
                    arrayCuadrante[index][key].miercolesFin2RangoDescanso === elFinRangoDescanso2 &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Jueves')) {
                if (arrayCuadrante[index][key].juevesInicio1RangoDescanso === elInicioRangoDescanso1 &&
                    arrayCuadrante[index][key].juevesFin1RangoDescanso === elFinRangoDescanso1 &&
                    arrayCuadrante[index][key].juevesInicio2RangoDescanso === elInicioRangoDescanso2 &&
                    arrayCuadrante[index][key].juevesFin2RangoDescanso === elFinRangoDescanso2 &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Viernes')) {
                if (arrayCuadrante[index][key].viernesInicio1RangoDescanso === elInicioRangoDescanso1 &&
                    arrayCuadrante[index][key].viernesFin1RangoDescanso === elFinRangoDescanso1 &&
                    arrayCuadrante[index][key].viernesInicio2RangoDescanso === elInicioRangoDescanso2 &&
                    arrayCuadrante[index][key].viernesFin2RangoDescanso === elFinRangoDescanso2 &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Sábado')) {
                if (arrayCuadrante[index][key].sabadoInicio1RangoDescanso === elInicioRangoDescanso1 &&
                    arrayCuadrante[index][key].sabadoFin1RangoDescanso === elFinRangoDescanso1 &&
                    arrayCuadrante[index][key].sabadoInicio2RangoDescanso === elInicioRangoDescanso2 &&
                    arrayCuadrante[index][key].sabadoFin2RangoDescanso === elFinRangoDescanso2 &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Domingo')) {
                if (arrayCuadrante[index][key].domingoInicio1RangoDescanso === elInicioRangoDescanso1 &&
                    arrayCuadrante[index][key].domingoFin1RangoDescanso === elFinRangoDescanso1 &&
                    arrayCuadrante[index][key].domingoInicio2RangoDescanso === elInicioRangoDescanso2 &&
                    arrayCuadrante[index][key].domingoFin2RangoDescanso === elFinRangoDescanso2 &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
        };
        if (itemPrevioEditando.tipo === 'cantidad') {
            if (itemPrevioEditando.id.includes('Lunes')) {
                if (arrayCuadrante[index][key].lunesCantidad === itemPrevioEditando.cantidad &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Martes')) {
                if (arrayCuadrante[index][key].martesCantidad === itemPrevioEditando.cantidad &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Miércoles')) {
                if (arrayCuadrante[index][key].miercolesCantidad === itemPrevioEditando.cantidad &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Jueves')) {
                if (arrayCuadrante[index][key].juevesCantidad === itemPrevioEditando.cantidad &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Viernes')) {
                if (arrayCuadrante[index][key].viernesCantidad === itemPrevioEditando.cantidad &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Sábado')) {
                if (arrayCuadrante[index][key].sabadoCantidad === itemPrevioEditando.cantidad &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
            if (itemPrevioEditando.id.includes('Domingo')) {
                if (arrayCuadrante[index][key].domingoCantidad === itemPrevioEditando.cantidad &&
                    arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                    arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                    arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion &&
                    arrayCuadrante[index][key].tipoServicio === itemPrevioEditando.tipoServicio) {
                    dispatch(setItemPrevioEditandoAccion(null));
                    dispatch(activarDesactivarCambioAccion(true));
                    return;
                };
            };
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
};

export const gestionItemPrevioEditandoServiciosFijosAccion = (valores) => (dispatch) => {
    dispatch(setItemPrevioEditandoServiciosFijosAccion({
        switch: valores.switch,
        servicios: valores.servicios
    }));
};

export const handleRegistrarCambioEnCasillaServiciosFijosAccion = () => (dispatch, getState) => {
    const { itemEditandoServiciosFijos, cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { cuadranteRegistrado } = getState().variablesCuadrantes;
    if ((itemEditandoServiciosFijos.switch.TO && (!itemEditandoServiciosFijos.servicios.variacion_TO || !itemEditandoServiciosFijos.servicios.precioHora_TO)) ||
        (itemEditandoServiciosFijos.switch.CR && (!itemEditandoServiciosFijos.servicios.variacion_CR || !itemEditandoServiciosFijos.servicios.precioHora_CR)) ||
        (itemEditandoServiciosFijos.switch.CE && (!itemEditandoServiciosFijos.servicios.variacion_CE || !itemEditandoServiciosFijos.servicios.precioHora_CE)) ||
        (itemEditandoServiciosFijos.switch.CI && (!itemEditandoServiciosFijos.servicios.variacion_CI || !itemEditandoServiciosFijos.servicios.precioHora_CI)) ||
        (itemEditandoServiciosFijos.switch.MO && (!itemEditandoServiciosFijos.servicios.variacion_MO || !itemEditandoServiciosFijos.servicios.precioHora_MO)) ||
        (itemEditandoServiciosFijos.switch.OF && (!itemEditandoServiciosFijos.servicios.variacion_OF || !itemEditandoServiciosFijos.servicios.precioHora_OF)) ||
        (itemEditandoServiciosFijos.switch.AL && (!itemEditandoServiciosFijos.servicios.variacion_AL || !itemEditandoServiciosFijos.servicios.precioHora_AL)) ||
        (itemEditandoServiciosFijos.switch.LA && (!itemEditandoServiciosFijos.servicios.variacion_LA || !itemEditandoServiciosFijos.servicios.precioHora_LA)) ||
        (itemEditandoServiciosFijos.switch.TE && (!itemEditandoServiciosFijos.servicios.variacion_TE || !itemEditandoServiciosFijos.servicios.precioHora_TE)) ||
        (itemEditandoServiciosFijos.switch.FI && (!itemEditandoServiciosFijos.servicios.variacion_FI || !itemEditandoServiciosFijos.servicios.precioHora_FI)) ||
        (itemEditandoServiciosFijos.switch.FE && (!itemEditandoServiciosFijos.servicios.variacion_FE || !itemEditandoServiciosFijos.servicios.precioHora_FE)) ||
        (itemEditandoServiciosFijos.switch.AB && (!itemEditandoServiciosFijos.servicios.variacion_AB || !itemEditandoServiciosFijos.servicios.precioHora_AB)) ||
        (itemEditandoServiciosFijos.switch.MA && (!itemEditandoServiciosFijos.servicios.variacion_MA || !itemEditandoServiciosFijos.servicios.precioHora_MA)) ||
        (itemEditandoServiciosFijos.switch.PO && (!itemEditandoServiciosFijos.servicios.variacion_PO || !itemEditandoServiciosFijos.servicios.precioHora_PO)) ||
        (itemEditandoServiciosFijos.switch.BA && (!itemEditandoServiciosFijos.servicios.variacion_BA || !itemEditandoServiciosFijos.servicios.precioHora_BA)) ||
        (itemEditandoServiciosFijos.switch.FT && (!itemEditandoServiciosFijos.servicios.variacion_FT || !itemEditandoServiciosFijos.servicios.precioHora_FT)) ||
        (itemEditandoServiciosFijos.switch.C3 && (!itemEditandoServiciosFijos.servicios.variacion_C3 || !itemEditandoServiciosFijos.servicios.precioHora_C3)) ||
        (itemEditandoServiciosFijos.switch.C2 && (!itemEditandoServiciosFijos.servicios.variacion_C2 || !itemEditandoServiciosFijos.servicios.precioHora_C2)) ||
        (itemEditandoServiciosFijos.switch.ES && (!itemEditandoServiciosFijos.servicios.variacion_ES || !itemEditandoServiciosFijos.servicios.precioHora_ES)) ||
        (itemEditandoServiciosFijos.switch.PA && (!itemEditandoServiciosFijos.servicios.variacion_PA || !itemEditandoServiciosFijos.servicios.precioHora_PA))
    ) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Has selecionado un tipo de servicio fijo pero no has asignado precio o variación. Revisa el formulario.",
            tipo: 'error'
        }));
        return;
    };
    if (((itemEditandoServiciosFijos.servicios.variacion_TO === 1 || itemEditandoServiciosFijos.servicios.variacion_TO === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_TO) ||
        ((itemEditandoServiciosFijos.servicios.variacion_CR === 1 || itemEditandoServiciosFijos.servicios.variacion_CR === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_CR) ||
        ((itemEditandoServiciosFijos.servicios.variacion_CE === 1 || itemEditandoServiciosFijos.servicios.variacion_CE === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_CE) ||
        ((itemEditandoServiciosFijos.servicios.variacion_CI === 1 || itemEditandoServiciosFijos.servicios.variacion_CI === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_CI) ||
        ((itemEditandoServiciosFijos.servicios.variacion_MO === 1 || itemEditandoServiciosFijos.servicios.variacion_MO === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_MO) ||
        ((itemEditandoServiciosFijos.servicios.variacion_OF === 1 || itemEditandoServiciosFijos.servicios.variacion_OF === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_OF) ||
        ((itemEditandoServiciosFijos.servicios.variacion_AL === 1 || itemEditandoServiciosFijos.servicios.variacion_AL === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_AL) ||
        ((itemEditandoServiciosFijos.servicios.variacion_LA === 1 || itemEditandoServiciosFijos.servicios.variacion_LA === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_LA) ||
        ((itemEditandoServiciosFijos.servicios.variacion_TE === 1 || itemEditandoServiciosFijos.servicios.variacion_TE === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_TE) ||
        ((itemEditandoServiciosFijos.servicios.variacion_FI === 1 || itemEditandoServiciosFijos.servicios.variacion_FI === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_FI) ||
        ((itemEditandoServiciosFijos.servicios.variacion_FE === 1 || itemEditandoServiciosFijos.servicios.variacion_FE === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_FE) ||
        ((itemEditandoServiciosFijos.servicios.variacion_AB === 1 || itemEditandoServiciosFijos.servicios.variacion_AB === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_AB) ||
        ((itemEditandoServiciosFijos.servicios.variacion_MA === 1 || itemEditandoServiciosFijos.servicios.variacion_MA === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_MA) ||
        ((itemEditandoServiciosFijos.servicios.variacion_PO === 1 || itemEditandoServiciosFijos.servicios.variacion_PO === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_PO) ||
        ((itemEditandoServiciosFijos.servicios.variacion_BA === 1 || itemEditandoServiciosFijos.servicios.variacion_BA === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_BA) ||
        ((itemEditandoServiciosFijos.servicios.variacion_FT === 1 || itemEditandoServiciosFijos.servicios.variacion_FT === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_FT) ||
        ((itemEditandoServiciosFijos.servicios.variacion_C3 === 1 || itemEditandoServiciosFijos.servicios.variacion_C3 === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_C3) ||
        ((itemEditandoServiciosFijos.servicios.variacion_C2 === 1 || itemEditandoServiciosFijos.servicios.variacion_C2 === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_C2) ||
        ((itemEditandoServiciosFijos.servicios.variacion_ES === 1 || itemEditandoServiciosFijos.servicios.variacion_ES === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_ES) ||
        ((itemEditandoServiciosFijos.servicios.variacion_PA === 1 || itemEditandoServiciosFijos.servicios.variacion_PA === 2) && !itemEditandoServiciosFijos.servicios.diaVariacion_PA)
    ) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Debes seleccionar un día de la semana para la variación de servicio fijo elegida. Revisa el formulario.",
            tipo: 'error'
        }));
        return;
    };
    dispatch(setLosServiciosFijosAccion({
        precioHora_TO: itemEditandoServiciosFijos.servicios.precioHora_TO ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_TO) : null,
        precioHora_CR: itemEditandoServiciosFijos.servicios.precioHora_CR ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CR) : null,
        precioHora_CE: itemEditandoServiciosFijos.servicios.precioHora_CE ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CE) : null,
        precioHora_CI: itemEditandoServiciosFijos.servicios.precioHora_CI ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CI) : null,
        precioHora_MO: itemEditandoServiciosFijos.servicios.precioHora_MO ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_MO) : null,
        precioHora_OF: itemEditandoServiciosFijos.servicios.precioHora_OF ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_OF) : null,
        precioHora_AL: itemEditandoServiciosFijos.servicios.precioHora_AL ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_AL) : null,
        precioHora_LA: itemEditandoServiciosFijos.servicios.precioHora_LA ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_LA) : null,
        precioHora_TE: itemEditandoServiciosFijos.servicios.precioHora_TE ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_TE) : null,
        precioHora_FI: itemEditandoServiciosFijos.servicios.precioHora_FI ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FI) : null,
        precioHora_FE: itemEditandoServiciosFijos.servicios.precioHora_FE ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FE) : null,
        precioHora_AB: itemEditandoServiciosFijos.servicios.precioHora_AB ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_AB) : null,
        precioHora_MA: itemEditandoServiciosFijos.servicios.precioHora_MA ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_MA) : null,
        precioHora_PO: itemEditandoServiciosFijos.servicios.precioHora_PO ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_PO) : null,
        precioHora_BA: itemEditandoServiciosFijos.servicios.precioHora_BA ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_BA) : null,
        precioHora_FT: itemEditandoServiciosFijos.servicios.precioHora_FT ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FT) : null,
        precioHora_C3: itemEditandoServiciosFijos.servicios.precioHora_C3 ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_C3) : null,
        precioHora_C2: itemEditandoServiciosFijos.servicios.precioHora_C2 ? parseFloat(itemEditandoServiciosFijos.servicios.precioHora_C2) : null,
        variacion_TO: itemEditandoServiciosFijos.servicios.variacion_TO ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_TO) : null,
        variacion_CR: itemEditandoServiciosFijos.servicios.variacion_CR ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_CR) : null,
        variacion_CE: itemEditandoServiciosFijos.servicios.variacion_CE ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_CE) : null,
        variacion_CI: itemEditandoServiciosFijos.servicios.variacion_CI ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_CI) : null,
        variacion_MO: itemEditandoServiciosFijos.servicios.variacion_MO ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_MO) : null,
        variacion_OF: itemEditandoServiciosFijos.servicios.variacion_OF ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_OF) : null,
        variacion_AL: itemEditandoServiciosFijos.servicios.variacion_AL ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_AL) : null,
        variacion_LA: itemEditandoServiciosFijos.servicios.variacion_LA ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_LA) : null,
        variacion_TE: itemEditandoServiciosFijos.servicios.variacion_TE ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_TE) : null,
        variacion_FI: itemEditandoServiciosFijos.servicios.variacion_FI ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_FI) : null,
        variacion_FE: itemEditandoServiciosFijos.servicios.variacion_FE ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_FE) : null,
        variacion_AB: itemEditandoServiciosFijos.servicios.variacion_AB ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_AB) : null,
        variacion_MA: itemEditandoServiciosFijos.servicios.variacion_MA ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_MA) : null,
        variacion_PO: itemEditandoServiciosFijos.servicios.variacion_PO ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_PO) : null,
        variacion_BA: itemEditandoServiciosFijos.servicios.variacion_BA ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_BA) : null,
        variacion_FT: itemEditandoServiciosFijos.servicios.variacion_FT ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_FT) : null,
        variacion_C3: itemEditandoServiciosFijos.servicios.variacion_C3 ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_C3) : null,
        variacion_C2: itemEditandoServiciosFijos.servicios.variacion_C2 ? parseFloat(itemEditandoServiciosFijos.servicios.variacion_C2) : null,
        diaVariacion_TO: itemEditandoServiciosFijos.servicios.variacion_TO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_TO : '',
        diaVariacion_CR: itemEditandoServiciosFijos.servicios.variacion_CR !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CR : '',
        diaVariacion_CE: itemEditandoServiciosFijos.servicios.variacion_CE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CE : '',
        diaVariacion_CI: itemEditandoServiciosFijos.servicios.variacion_CI !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CI : '',
        diaVariacion_MO: itemEditandoServiciosFijos.servicios.variacion_MO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_MO : '',
        diaVariacion_OF: itemEditandoServiciosFijos.servicios.variacion_OF !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_OF : '',
        diaVariacion_AL: itemEditandoServiciosFijos.servicios.variacion_AL !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_AL : '',
        diaVariacion_LA: itemEditandoServiciosFijos.servicios.variacion_LA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_LA : '',
        diaVariacion_TE: itemEditandoServiciosFijos.servicios.variacion_TE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_TE : '',
        diaVariacion_FI: itemEditandoServiciosFijos.servicios.variacion_FI !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FI : '',
        diaVariacion_FE: itemEditandoServiciosFijos.servicios.variacion_FE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FE : '',
        diaVariacion_AB: itemEditandoServiciosFijos.servicios.variacion_AB !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_AB : '',
        diaVariacion_MA: itemEditandoServiciosFijos.servicios.variacion_MA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_MA : '',
        diaVariacion_PO: itemEditandoServiciosFijos.servicios.variacion_PO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_PO : '',
        diaVariacion_BA: itemEditandoServiciosFijos.servicios.variacion_BA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_BA : '',
        diaVariacion_FT: itemEditandoServiciosFijos.servicios.variacion_FT !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FT : '',
        diaVariacion_C3: itemEditandoServiciosFijos.servicios.variacion_C3 !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_C3 : '',
        diaVariacion_C2: itemEditandoServiciosFijos.servicios.variacion_C2 !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_C2 : '',
        activo_TO: itemEditandoServiciosFijos.servicios.activo_TO,
        activo_CR: itemEditandoServiciosFijos.servicios.activo_CR,
        activo_CE: itemEditandoServiciosFijos.servicios.activo_CE,
        activo_CI: itemEditandoServiciosFijos.servicios.activo_CI,
        activo_MO: itemEditandoServiciosFijos.servicios.activo_MO,
        activo_OF: itemEditandoServiciosFijos.servicios.activo_OF,
        activo_AL: itemEditandoServiciosFijos.servicios.activo_AL,
        activo_LA: itemEditandoServiciosFijos.servicios.activo_LA,
        activo_TE: itemEditandoServiciosFijos.servicios.activo_TE,
        activo_FI: itemEditandoServiciosFijos.servicios.activo_FI,
        activo_FE: itemEditandoServiciosFijos.servicios.activo_FE,
        activo_AB: itemEditandoServiciosFijos.servicios.activo_AB,
        activo_MA: itemEditandoServiciosFijos.servicios.activo_MA,
        activo_PO: itemEditandoServiciosFijos.servicios.activo_PO,
        activo_BA: itemEditandoServiciosFijos.servicios.activo_BA,
        activo_FT: itemEditandoServiciosFijos.servicios.activo_FT,
        activo_C3: itemEditandoServiciosFijos.servicios.activo_C3,
        activo_C2: itemEditandoServiciosFijos.servicios.activo_C2
    }));
    let arrayCuadranteServiciosFijos = [];
    let objetoServicioActivo;
    if (itemEditandoServiciosFijos.servicios.precioHora_TO) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'TOL');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'TOL',
                precioHora_TO: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_TO),
                variacion_TO: parseFloat(itemEditandoServiciosFijos.servicios.variacion_TO),
                diaVariacion_TO: itemEditandoServiciosFijos.servicios.variacion_TO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_TO : '',
                activo_TO: itemEditandoServiciosFijos.servicios.activo_TO
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'TOL',
                precioHora_TO: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_TO),
                variacion_TO: parseFloat(itemEditandoServiciosFijos.servicios.variacion_TO),
                diaVariacion_TO: itemEditandoServiciosFijos.servicios.variacion_TO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_TO : '',
                activo_TO: itemEditandoServiciosFijos.servicios.activo_TO
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_CR) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'CRIS');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'CRIS',
                precioHora_CR: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CR),
                variacion_CR: parseFloat(itemEditandoServiciosFijos.servicios.variacion_CR),
                diaVariacion_CR: itemEditandoServiciosFijos.servicios.variacion_CR !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CR : '',
                activo_CR: itemEditandoServiciosFijos.servicios.activo_CR
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'CRIS',
                precioHora_CR: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CR),
                variacion_CR: parseFloat(itemEditandoServiciosFijos.servicios.variacion_CR),
                diaVariacion_CR: itemEditandoServiciosFijos.servicios.variacion_CR !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CR : '',
                activo_CR: itemEditandoServiciosFijos.servicios.activo_CR
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_CE) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'CRISE');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'CRISE',
                precioHora_CE: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CE),
                variacion_CE: parseFloat(itemEditandoServiciosFijos.servicios.variacion_CE),
                diaVariacion_CE: itemEditandoServiciosFijos.servicios.variacion_CE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CE : '',
                activo_CE: itemEditandoServiciosFijos.servicios.activo_CE
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'CRISE',
                precioHora_CE: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CE),
                variacion_CE: parseFloat(itemEditandoServiciosFijos.servicios.variacion_CE),
                diaVariacion_CE: itemEditandoServiciosFijos.servicios.variacion_CE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CE : '',
                activo_CE: itemEditandoServiciosFijos.servicios.activo_CE
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_CI) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'CRISI');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'CRISI',
                precioHora_CI: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CI),
                variacion_CI: parseFloat(itemEditandoServiciosFijos.servicios.variacion_CI),
                diaVariacion_CI: itemEditandoServiciosFijos.servicios.variacion_CI !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CI : '',
                activo_CI: itemEditandoServiciosFijos.servicios.activo_CI
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'CRISI',
                precioHora_CI: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_CI),
                variacion_CI: parseFloat(itemEditandoServiciosFijos.servicios.variacion_CI),
                diaVariacion_CI: itemEditandoServiciosFijos.servicios.variacion_CI !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_CI : '',
                activo_CI: itemEditandoServiciosFijos.servicios.activo_CI
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_MO) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'MOQ');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'MOQ',
                precioHora_MO: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_MO),
                variacion_MO: parseFloat(itemEditandoServiciosFijos.servicios.variacion_MO),
                diaVariacion_MO: itemEditandoServiciosFijos.servicios.variacion_MO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_MO : '',
                activo_MO: itemEditandoServiciosFijos.servicios.activo_MO
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'MOQ',
                precioHora_MO: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_MO),
                variacion_MO: parseFloat(itemEditandoServiciosFijos.servicios.variacion_MO),
                diaVariacion_MO: itemEditandoServiciosFijos.servicios.variacion_MO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_MO : '',
                activo_MO: itemEditandoServiciosFijos.servicios.activo_MO
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_OF) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'OF');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'OF',
                precioHora_OF: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_OF),
                variacion_OF: parseFloat(itemEditandoServiciosFijos.servicios.variacion_OF),
                diaVariacion_OF: itemEditandoServiciosFijos.servicios.variacion_OF !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_OF : '',
                activo_OF: itemEditandoServiciosFijos.servicios.activo_OF
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'OF',
                precioHora_OF: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_OF),
                variacion_OF: parseFloat(itemEditandoServiciosFijos.servicios.variacion_OF),
                diaVariacion_OF: itemEditandoServiciosFijos.servicios.variacion_OF !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_OF : '',
                activo_OF: itemEditandoServiciosFijos.servicios.activo_OF
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_AL) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'ALMC');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'ALMC',
                precioHora_AL: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_AL),
                variacion_AL: parseFloat(itemEditandoServiciosFijos.servicios.variacion_AL),
                diaVariacion_AL: itemEditandoServiciosFijos.servicios.variacion_AL !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_AL : '',
                activo_AL: itemEditandoServiciosFijos.servicios.activo_AL
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'ALMC',
                precioHora_AL: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_AL),
                variacion_AL: parseFloat(itemEditandoServiciosFijos.servicios.variacion_AL),
                diaVariacion_AL: itemEditandoServiciosFijos.servicios.variacion_AL !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_AL : '',
                activo_AL: itemEditandoServiciosFijos.servicios.activo_AL
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_LA) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'LAB');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'LAB',
                precioHora_LA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_LA),
                variacion_LA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_LA),
                diaVariacion_LA: itemEditandoServiciosFijos.servicios.variacion_LA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_LA : '',
                activo_LA: itemEditandoServiciosFijos.servicios.activo_LA
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'LAB',
                precioHora_LA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_LA),
                variacion_LA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_LA),
                diaVariacion_LA: itemEditandoServiciosFijos.servicios.variacion_LA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_LA : '',
                activo_LA: itemEditandoServiciosFijos.servicios.activo_LA
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_TE) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'TELÑ');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'TELÑ',
                precioHora_TE: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_TE),
                variacion_TE: parseFloat(itemEditandoServiciosFijos.servicios.variacion_TE),
                diaVariacion_TE: itemEditandoServiciosFijos.servicios.variacion_TE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_TE : '',
                activo_TE: itemEditandoServiciosFijos.servicios.activo_TE
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'TELÑ',
                precioHora_TE: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_TE),
                variacion_TE: parseFloat(itemEditandoServiciosFijos.servicios.variacion_TE),
                diaVariacion_TE: itemEditandoServiciosFijos.servicios.variacion_TE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_TE : '',
                activo_TE: itemEditandoServiciosFijos.servicios.activo_TE
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_FI) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'FCH.IN');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'FCH.IN',
                precioHora_FI: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FI),
                variacion_FI: parseFloat(itemEditandoServiciosFijos.servicios.variacion_FI),
                diaVariacion_FI: itemEditandoServiciosFijos.servicios.variacion_FI !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FI : '',
                activo_FI: itemEditandoServiciosFijos.servicios.activo_FI
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'FCH.IN',
                precioHora_FI: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FI),
                variacion_FI: parseFloat(itemEditandoServiciosFijos.servicios.variacion_FI),
                diaVariacion_FI: itemEditandoServiciosFijos.servicios.variacion_FI !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FI : '',
                activo_FI: itemEditandoServiciosFijos.servicios.activo_FI
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_FE) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'FCH.EX');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'FCH.EX',
                precioHora_FE: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FE),
                variacion_FE: parseFloat(itemEditandoServiciosFijos.servicios.variacion_FE),
                diaVariacion_FE: itemEditandoServiciosFijos.servicios.variacion_FE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FE : '',
                activo_FE: itemEditandoServiciosFijos.servicios.activo_FE
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'FCH.EX',
                precioHora_FE: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FE),
                variacion_FE: parseFloat(itemEditandoServiciosFijos.servicios.variacion_FE),
                diaVariacion_FE: itemEditandoServiciosFijos.servicios.variacion_FE !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FE : '',
                activo_FE: itemEditandoServiciosFijos.servicios.activo_FE
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_AB) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'ABRLL');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'ABRLL',
                precioHora_AB: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_AB),
                variacion_AB: parseFloat(itemEditandoServiciosFijos.servicios.variacion_AB),
                diaVariacion_AB: itemEditandoServiciosFijos.servicios.variacion_AB !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_AB : '',
                activo_AB: itemEditandoServiciosFijos.servicios.activo_AB
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'ABRLL',
                precioHora_AB: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_AB),
                variacion_AB: parseFloat(itemEditandoServiciosFijos.servicios.variacion_AB),
                diaVariacion_AB: itemEditandoServiciosFijos.servicios.variacion_AB !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_AB : '',
                activo_AB: itemEditandoServiciosFijos.servicios.activo_AB
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_MA) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'MANT');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'MANT',
                precioHora_MA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_MA),
                variacion_MA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_MA),
                diaVariacion_MA: itemEditandoServiciosFijos.servicios.variacion_MA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_MA : '',
                activo_MA: itemEditandoServiciosFijos.servicios.activo_MA
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'MANT',
                precioHora_MA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_MA),
                variacion_MA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_MA),
                diaVariacion_MA: itemEditandoServiciosFijos.servicios.variacion_MA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_MA : '',
                activo_MA: itemEditandoServiciosFijos.servicios.activo_MA
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_PO) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'PORT');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'PORT',
                precioHora_PO: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_PO),
                variacion_PO: parseFloat(itemEditandoServiciosFijos.servicios.variacion_PO),
                diaVariacion_PO: itemEditandoServiciosFijos.servicios.variacion_PO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_PO : '',
                activo_PO: itemEditandoServiciosFijos.servicios.activo_PO
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'PORT',
                precioHora_PO: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_PO),
                variacion_PO: parseFloat(itemEditandoServiciosFijos.servicios.variacion_PO),
                diaVariacion_PO: itemEditandoServiciosFijos.servicios.variacion_PO !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_PO : '',
                activo_PO: itemEditandoServiciosFijos.servicios.activo_PO
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_BA) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'BACT');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'BACT',
                precioHora_BA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_BA),
                variacion_BA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_BA),
                diaVariacion_BA: itemEditandoServiciosFijos.servicios.variacion_BA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_BA : '',
                activo_BA: itemEditandoServiciosFijos.servicios.activo_BA
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'BACT',
                precioHora_BA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_BA),
                variacion_BA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_BA),
                diaVariacion_BA: itemEditandoServiciosFijos.servicios.variacion_BA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_BA : '',
                activo_BA: itemEditandoServiciosFijos.servicios.activo_BA
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_FT) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'FEST');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'FEST',
                precioHora_FT: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FT),
                variacion_FT: parseFloat(itemEditandoServiciosFijos.servicios.variacion_FT),
                diaVariacion_FT: itemEditandoServiciosFijos.servicios.variacion_FT !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FT : '',
                activo_FT: itemEditandoServiciosFijos.servicios.activo_FT
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'FEST',
                precioHora_FT: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_FT),
                variacion_FT: parseFloat(itemEditandoServiciosFijos.servicios.variacion_FT),
                diaVariacion_FT: itemEditandoServiciosFijos.servicios.variacion_FT !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_FT : '',
                activo_FT: itemEditandoServiciosFijos.servicios.activo_FT
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_C3) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'CRTRIM');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'CRTRIM',
                precioHora_C3: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_C3),
                variacion_C3: parseFloat(itemEditandoServiciosFijos.servicios.variacion_C3),
                diaVariacion_C3: itemEditandoServiciosFijos.servicios.variacion_C3 !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_C3 : '',
                activo_C3: itemEditandoServiciosFijos.servicios.activo_C3
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'CRTRIM',
                precioHora_C3: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_C3),
                variacion_C3: parseFloat(itemEditandoServiciosFijos.servicios.variacion_C3),
                diaVariacion_C3: itemEditandoServiciosFijos.servicios.variacion_C3 !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_C3 : '',
                activo_C3: itemEditandoServiciosFijos.servicios.activo_C3
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_C2) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'CRBIM');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'CRBIM',
                precioHora_C2: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_C2),
                variacion_C2: parseFloat(itemEditandoServiciosFijos.servicios.variacion_C2),
                diaVariacion_C2: itemEditandoServiciosFijos.servicios.variacion_C2 !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_C2 : '',
                activo_C2: itemEditandoServiciosFijos.servicios.activo_C2
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'CRBIM',
                precioHora_C2: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_C2),
                variacion_C2: parseFloat(itemEditandoServiciosFijos.servicios.variacion_C2),
                diaVariacion_C2: itemEditandoServiciosFijos.servicios.variacion_C2 !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_C2 : '',
                activo_C2: itemEditandoServiciosFijos.servicios.activo_C2
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_ES) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'LIME');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'LIME',
                precioHora_ES: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_ES),
                variacion_ES: parseFloat(itemEditandoServiciosFijos.servicios.variacion_ES),
                diaVariacion_ES: itemEditandoServiciosFijos.servicios.variacion_ES !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_ES : '',
                activo_ES: itemEditandoServiciosFijos.servicios.activo_ES
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'LIME',
                precioHora_ES: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_ES),
                variacion_ES: parseFloat(itemEditandoServiciosFijos.servicios.variacion_ES),
                diaVariacion_ES: itemEditandoServiciosFijos.servicios.variacion_ES !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_ES : '',
                activo_ES: itemEditandoServiciosFijos.servicios.activo_ES
            });
        };
    };
    if (itemEditandoServiciosFijos.servicios.precioHora_PA) {
        objetoServicioActivo = cuadranteServiciosFijos.find(servicio => servicio.tipoServiciofijo === 'LIMP');
        if (objetoServicioActivo) {
            arrayCuadranteServiciosFijos.push({
                ...objetoServicioActivo,
                tipoServiciofijo: 'LIMP',
                precioHora_PA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_PA),
                variacion_PA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_PA),
                diaVariacion_PA: itemEditandoServiciosFijos.servicios.variacion_PA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_PA : '',
                activo_PA: itemEditandoServiciosFijos.servicios.activo_PA
            });
        } else {
            arrayCuadranteServiciosFijos.push({
                tipoServiciofijo: 'LIMP',
                precioHora_PA: parseFloat(itemEditandoServiciosFijos.servicios.precioHora_PA),
                variacion_PA: parseFloat(itemEditandoServiciosFijos.servicios.variacion_PA),
                diaVariacion_PA: itemEditandoServiciosFijos.servicios.variacion_PA !== 3 ? itemEditandoServiciosFijos.servicios.diaVariacion_PA : '',
                activo_PA: itemEditandoServiciosFijos.servicios.activo_PA
            });
        };
    };
    dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosInicioAccion(arrayCuadranteServiciosFijos))));
    dispatch(setStateSwitchTipoServicioFijoCuadranteAccion(itemEditandoServiciosFijos.switch));
    dispatch(setItemPrevioEditandoServiciosFijosAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};

export const gestionItemPrevioEditandoConfiguracionAccion = (valores) => (dispatch) => {
    dispatch(setItemPrevioEditandoConfiguracionAccion(valores));
};

export const handleRegistrarCambioEnCasillaConfiguracionAccion = () => (dispatch, getState) => {
    const { itemEditandoConfiguracion, cuadranteEnUsoCuadrantes, cuadranteVacio } = getState().variablesCuadrantesSetters;
    const { cuadranteRegistrado, objetoCuadrante } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    if ((!itemEditandoConfiguracion.computo || !itemEditandoConfiguracion.tipoHorario) && !cuadranteVacio) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Para registrar debes elegir Modo entrada datos y Tipo cómputo. Revisa el formulario.",
            tipo: 'error'
        }));
        return;
    };
    if ((itemEditandoConfiguracion.computo === 1 && !itemEditandoConfiguracion.mensualPactado) ||
        (itemEditandoConfiguracion.computo === 2 && (
            !itemEditandoConfiguracion.precioHora_L &&
            !itemEditandoConfiguracion.precioHora_E &&
            !itemEditandoConfiguracion.precioHora_P &&
            !itemEditandoConfiguracion.precioHora_N &&
            !itemEditandoConfiguracion.precioHora_R &&
            !itemEditandoConfiguracion.precioHora_L1 &&
            !itemEditandoConfiguracion.precioHora_L2 &&
            !itemEditandoConfiguracion.precioHora_F)) ||
        (itemEditandoConfiguracion.computo === 3 && (
            !itemEditandoConfiguracion.precioHora_L &&
            !itemEditandoConfiguracion.precioHora_E &&
            !itemEditandoConfiguracion.precioHora_P &&
            !itemEditandoConfiguracion.precioHora_N &&
            !itemEditandoConfiguracion.precioHora_R &&
            !itemEditandoConfiguracion.precioHora_L1 &&
            !itemEditandoConfiguracion.precioHora_L2 &&
            !itemEditandoConfiguracion.precioHora_F &&
            !itemEditandoConfiguracion.mensualPactado))) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
            tipo: 'error'
        }));
        return;
    };
    if (itemEditandoConfiguracion.computo === 3 && ((
        itemEditandoConfiguracion.precioHora_L ||
        itemEditandoConfiguracion.precioHora_E ||
        itemEditandoConfiguracion.precioHora_P ||
        itemEditandoConfiguracion.precioHora_N ||
        itemEditandoConfiguracion.precioHora_R ||
        itemEditandoConfiguracion.precioHora_L1 ||
        itemEditandoConfiguracion.precioHora_L2 ||
        itemEditandoConfiguracion.precioHora_F) && itemEditandoConfiguracion.mensualPactado)) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Revisa el formulario, solo puede haber un tipo de cómputo de horas.",
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
    let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
    let elObjetoDatosInforme = {
        ...elArrayDatosInforme[cuadranteEnUsoCuadrantes - 1],
        computo: parseFloat(itemEditandoConfiguracion.computo),
        mensualPactado: itemEditandoConfiguracion.mensualPactado ? parseFloat(itemEditandoConfiguracion.mensualPactado) : null,
        precioHora_L: itemEditandoConfiguracion.precioHora_L ? parseFloat(itemEditandoConfiguracion.precioHora_L) : null,
        precioHora_E: itemEditandoConfiguracion.precioHora_E ? parseFloat(itemEditandoConfiguracion.precioHora_E) : null,
        precioHora_P: itemEditandoConfiguracion.precioHora_P ? parseFloat(itemEditandoConfiguracion.precioHora_P) : null,
        precioHora_N: itemEditandoConfiguracion.precioHora_N ? parseFloat(itemEditandoConfiguracion.precioHora_N) : null,
        precioHora_R: itemEditandoConfiguracion.precioHora_R ? parseFloat(itemEditandoConfiguracion.precioHora_R) : null,
        precioHora_L1: itemEditandoConfiguracion.precioHora_L1 ? parseFloat(itemEditandoConfiguracion.precioHora_L1) : null,
        precioHora_L2: itemEditandoConfiguracion.precioHora_L2 ? parseFloat(itemEditandoConfiguracion.precioHora_L2) : null,
        precioHora_F: itemEditandoConfiguracion.precioHora_F ? parseFloat(itemEditandoConfiguracion.precioHora_F) : null
    };
    elArrayDatosInforme[cuadranteEnUsoCuadrantes - 1] = elObjetoDatosInforme;
    const losDatosInforme = {
        ...objetoCuadrante.datosInforme,
        datosInforme: elArrayDatosInforme
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
        dispatch(gestionaColumnaCuadranteAccion(trabajador, 'trabajador', true, index, false, true, event.target.value));
    } else {
        dispatch(setEsInicioSupAccion(false));
        dispatch(setEsCambioSupAccion(true));
        let suplente = suplentesEnCuadrante.find(suplente => suplente.id === arrayCuadrante[index].idTrabajador);
        dispatch(gestionaColumnaCuadranteAccion(suplente, 'suplente', true, index, false, true, event.target.value));
    }
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
};