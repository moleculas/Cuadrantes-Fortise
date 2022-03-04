import { setLastEditadoAccion } from './cuadrantesSettersDucks';
import { setExpandedAccordionAccion } from './cuadrantesSettersDucks';
import { setItemEditandoServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setItemPrevioEditandoServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { activarDesactivarCambioAccion } from './cuadrantesDucks';
import { setItemEditandoConfiguracionAccion } from './cuadrantesSettersDucks';
import { setItemPrevioEditandoConfiguracionAccion } from './cuadrantesSettersDucks';
import { setCuadranteAccion } from './cuadrantesDucks';
import { retornaHoraRangoAccion } from './appDucks';
import { setItemPrevioEditandoAccion } from './cuadrantesSettersDucks';

//constantes
const dataInicial = {
    variablesPopoverDias: {
        postRef: null,
        index: null,
        dia: null
    },
    variablesPopoverGeneral: {
        postRef: null,
        indexDia: null,
        dia: null,
        columna: null,
        indexColumna: null
    },
    anchorElDias: null,
    anchorElServiciosFijos: null,
    anchorElConfiguracion: null,
    anchorElGeneral: null
};

//types
const SET_VARIABLESPOPOVERDIAS = 'SET_VARIABLESPOPOVERDIAS';
const SET_VARIABLESPOPOVERGENERAL = 'SET_VARIABLESPOPOVERGENERAL';
const SET_ANCHORELDIAS = 'SET_ANCHORELDIAS';
const SET_ANCHORELSERVICIOSFIJOS = 'SET_ANCHORELSERVICIOSFIJOS';
const SET_ANCHORELCONFIGURACION = 'SET_ANCHORELCONFIGURACION';
const SET_ANCHORELGENERAL = 'SET_ANCHORELGENERAL';

//reducer
export default function cuadrantesPopoversReducer(state = dataInicial, action) {
    switch (action.type) {
        case SET_VARIABLESPOPOVERDIAS:
            return { ...state, variablesPopoverDias: action.payload.objeto }
        case SET_VARIABLESPOPOVERGENERAL:
            return { ...state, variablesPopoverGeneral: action.payload.objeto }
        case SET_ANCHORELDIAS:
            return { ...state, anchorElDias: action.payload.estado }
        case SET_ANCHORELSERVICIOSFIJOS:
            return { ...state, anchorElServiciosFijos: action.payload.estado }
        case SET_ANCHORELCONFIGURACION:
            return { ...state, anchorElConfiguracion: action.payload.estado }
        case SET_ANCHORELGENERAL:
            return { ...state, anchorElGeneral: action.payload.estado }
        default:
            return { ...state }
    }
}

//acciones
export const setVariablesPopoverDiasAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_VARIABLESPOPOVERDIAS,
        payload: {
            objeto: objeto
        }
    });
};

export const setVariablesPopoverGeneralAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_VARIABLESPOPOVERGENERAL,
        payload: {
            objeto: objeto
        }
    });
};

export const abrePopoverDiasAccion = (postRef, index, dia, event, scrollable, classes) => (dispatch) => {
    dispatch(setExpandedAccordionAccion(false));
    scrollable.current.classList.add(classes.openAccordion);
    dispatch({
        type: SET_ANCHORELDIAS,
        payload: {
            estado: dataInicial.anchorElDias ? null : event.currentTarget
        }
    });
    dispatch({
        type: SET_VARIABLESPOPOVERDIAS,
        payload: {
            objeto: {
                postRef: postRef,
                index: index,
                dia: dia
            }
        }
    });
};

export const handleClosePopoverDiasAccion = (scrollable, classes) => (dispatch, getState) => {
    const { lastEditado } = getState().variablesCuadrantesSetters;
    dispatch({
        type: SET_ANCHORELDIAS,
        payload: {
            estado: null
        }
    });
    scrollable.current.classList.remove(classes.openAccordion);
    if (lastEditado) {
        lastEditado.current.classList.remove(classes.editando);
        dispatch(setLastEditadoAccion(null));
    }
};

export const abrePopoverServiciosFijosAccion = (event, scrollable, classes) => (dispatch) => {
    dispatch(setExpandedAccordionAccion(false));
    scrollable.current.classList.add(classes.openAccordion);
    dispatch({
        type: SET_ANCHORELSERVICIOSFIJOS,
        payload: {
            estado: dataInicial.anchorElServiciosFijos ? null : event.currentTarget
        }
    });
};

export const handleClosePopoverServiciosFijosAccion = (scrollable, classes) => (dispatch, getState) => {
    const { itemPrevioEditandoServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    if (itemPrevioEditandoServiciosFijos) {
        if (itemPrevioEditandoServiciosFijos.modificado) {
            dispatch(setItemEditandoServiciosFijosAccion(itemPrevioEditandoServiciosFijos));
        };
    };
    dispatch(setItemPrevioEditandoServiciosFijosAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
    dispatch({
        type: SET_ANCHORELSERVICIOSFIJOS,
        payload: {
            estado: null
        }
    });
    scrollable.current.classList.remove(classes.openAccordion);
};

export const abrePopoverConfiguracionAccion = (event, scrollable, classes) => (dispatch) => {
    dispatch(setExpandedAccordionAccion(false));
    scrollable.current.classList.add(classes.openAccordion);
    dispatch({
        type: SET_ANCHORELCONFIGURACION,
        payload: {
            estado: dataInicial.anchorElConfiguracion ? null : event.currentTarget
        }
    });
};

export const handleClosePopoverConfiguracionAccion = (scrollable, classes) => (dispatch, getState) => {
    const { itemPrevioEditandoConfiguracion } = getState().variablesCuadrantesSetters;
    if (itemPrevioEditandoConfiguracion) {
        if (itemPrevioEditandoConfiguracion.modificado) {
            dispatch(setItemEditandoConfiguracionAccion(itemPrevioEditandoConfiguracion));
        };
    };
    dispatch(setItemPrevioEditandoConfiguracionAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
    dispatch({
        type: SET_ANCHORELCONFIGURACION,
        payload: {
            estado: null
        }
    });
    scrollable.current.classList.remove(classes.openAccordion);
};

export const abrePopoverGeneralAccion = (postRef, indexDia, dia, columna, ref, indexColumna, event, scrollable, boxes, classes) => (dispatch, getState) => {
    const { cuadrante } = getState().variablesCuadrantes;
    let arrayCuadrante = [...cuadrante];
    if (arrayCuadrante[indexColumna][postRef].visibleVariaciones && !arrayCuadrante[indexColumna][postRef].tipoVariacion) {
        arrayCuadrante[indexColumna][postRef].visibleVariaciones = false;
        dispatch(setCuadranteAccion(arrayCuadrante));
    };
    dispatch(setExpandedAccordionAccion(false));
    scrollable.current.classList.add(classes.openAccordion);
    dispatch({
        type: SET_ANCHORELGENERAL,
        payload: {
            estado: dataInicial.anchorElGeneral ? null : event.currentTarget
        }
    });
    dispatch({
        type: SET_VARIABLESPOPOVERGENERAL,
        payload: {
            objeto: {
                postRef: postRef,
                indexDia: indexDia + 1,
                dia: dia,
                columna: columna,
                indexColumna: indexColumna
            }
        }
    });
    if (!cuadrante[indexColumna][postRef].modificado) {
        boxes.current[ref].classList.add(classes.editando);
    };
    dispatch(setLastEditadoAccion(ref));
};

export const handleClosePopoverGeneralAccion = (scrollable, boxes, classes) => (dispatch, getState) => {
    const { itemPrevioEditando, lastEditado } = getState().variablesCuadrantesSetters;
    const { cuadrante } = getState().variablesCuadrantes;
    dispatch({
        type: SET_ANCHORELGENERAL,
        payload: {
            estado: null
        }
    });
    scrollable.current.classList.remove(classes.openAccordion);
    boxes.current[lastEditado].classList.remove(classes.editando);
    dispatch(setLastEditadoAccion(null));
    if (itemPrevioEditando) {
        if (itemPrevioEditando.tipo === 'rango') {
            if (itemPrevioEditando.id.includes('Lunes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].lunesInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].lunesFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango));
            };
            if (itemPrevioEditando.id.includes('Martes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].martesInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].martesFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango));
            };
            if (itemPrevioEditando.id.includes('Miércoles')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].miercolesInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].miercolesFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango));
            };
            if (itemPrevioEditando.id.includes('Jueves')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].juevesInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].juevesFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango));
            };
            if (itemPrevioEditando.id.includes('Viernes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].viernesInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].viernesFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango));
            };
            if (itemPrevioEditando.id.includes('Sábado')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].sabadoInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].sabadoFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango));
            };
            if (itemPrevioEditando.id.includes('Domingo')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].domingoInicioRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRango));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].domingoFinRango = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRango));
            };
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].observaciones = itemPrevioEditando.observaciones;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].visibleVariaciones = itemPrevioEditando.visibleVariaciones;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].tipoVariacion = itemPrevioEditando.tipoVariacion;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].tipoServicio = itemPrevioEditando.tipoServicio;
        };
        if (itemPrevioEditando.tipo === 'rangoDescanso') {
            if (itemPrevioEditando.id.includes('Lunes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].lunesInicio1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].lunesFin1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].lunesInicio2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].lunesFin2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            };
            if (itemPrevioEditando.id.includes('Martes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].martesInicio1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].martesFin1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].martesInicio2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].martesFin2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            };
            if (itemPrevioEditando.id.includes('Miércoles')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].miercolesInicio1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].miercolesFin1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].miercolesInicio2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].miercolesFin2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            };
            if (itemPrevioEditando.id.includes('Jueves')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].juevesInicio1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].juevesFin1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].juevesInicio2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].juevesFin2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            };
            if (itemPrevioEditando.id.includes('Viernes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].viernesInicio1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].viernesFin1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].viernesInicio2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].viernesFin2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            };
            if (itemPrevioEditando.id.includes('Sábado')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].sabadoInicio1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].sabadoFin1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].sabadoInicio2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].sabadoFin2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            };
            if (itemPrevioEditando.id.includes('Domingo')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].domingoInicio1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].domingoFin1RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso1));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].domingoInicio2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.inicioRangoDescanso2));
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].domingoFin2RangoDescanso = dispatch(retornaHoraRangoAccion(itemPrevioEditando.finRangoDescanso2));
            };
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].observaciones = itemPrevioEditando.observaciones;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].visibleVariaciones = itemPrevioEditando.visibleVariaciones;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].tipoVariacion = itemPrevioEditando.tipoVariacion;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].tipoServicio = itemPrevioEditando.tipoServicio;
        };
        if (itemPrevioEditando.tipo === 'cantidad') {
            if (itemPrevioEditando.id.includes('Lunes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].lunesCantidad = itemPrevioEditando.cantidad;
            };
            if (itemPrevioEditando.id.includes('Martes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].martesCantidad = itemPrevioEditando.cantidad;
            };
            if (itemPrevioEditando.id.includes('Miércoles')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].miercolesCantidad = itemPrevioEditando.cantidad;
            };
            if (itemPrevioEditando.id.includes('Jueves')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].juevesCantidad = itemPrevioEditando.cantidad;
            };
            if (itemPrevioEditando.id.includes('Viernes')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].viernesCantidad = itemPrevioEditando.cantidad;
            };
            if (itemPrevioEditando.id.includes('Sábado')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].sabadoCantidad = itemPrevioEditando.cantidad;
            };
            if (itemPrevioEditando.id.includes('Domingo')) {
                cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].domingoCantidad = itemPrevioEditando.cantidad;
            };
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].observaciones = itemPrevioEditando.observaciones;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].visibleVariaciones = itemPrevioEditando.visibleVariaciones;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].tipoVariacion = itemPrevioEditando.tipoVariacion;
            cuadrante[itemPrevioEditando.index][itemPrevioEditando.id].tipoServicio = itemPrevioEditando.tipoServicio;
        };
    };
    dispatch(setItemPrevioEditandoAccion(null));
    dispatch(activarDesactivarCambioAccion(true));
};