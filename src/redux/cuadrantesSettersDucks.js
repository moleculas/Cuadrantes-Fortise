import { retornaAnoMesAccion } from './appDucks';
import { setCuadranteAccion } from './cuadrantesDucks';
import { setVariablesPopoverDiasAccion } from './cuadrantesPopoversDucks';
import { setVariablesPopoverGeneralAccion } from './cuadrantesPopoversDucks';
import { setCentroAccion } from './cuadrantesDucks';
import { setLosServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setStateSwitchTipoServicioFijoCuadranteAccion } from './cuadrantesServiciosFijosDucks';
import { setItemPrevioEditandoServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setItemEditandoServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setStateFestivoAccion } from './cuadrantesDucks';
import { vaciarDatosCuadranteRegistradoAccion } from './cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from './cuadrantesDucks';
import { activarDesactivarCambioAccion } from './cuadrantesDucks';
import { reseteaTotalesPeriodicosAccion } from './cuadrantesDucks';
import { activarDesactivarCambioBotonActualizarAccion } from './cuadrantesDucks';
import { setCuadranteServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { vaciarDatosCentroAccion } from './centrosDucks';
import { vaciarDatosTrabajadorAccion } from './trabajadoresDucks';
import { resetarNumeroRecibosAccion } from './appDucks';

//constantes
const dataInicial = {
    valueDatePicker: new Date(retornaAnoMesAccion()),
    numeroCuadrantesCuadrantes: [{ value: 1, revisado: false }],
    venimosDeCambioCuadrante: false,
    firmaActualizacion: '',
    cuadranteVacio: false,
    cuadranteEnUsoCuadrantes: 1,
    estamosActualizandoCuadranteSinCarga: false,
    arrayInformeLineas: [],
    trabajadoresEnCuadrante: [],
    suplentesEnCuadrante: [],
    esInicioTra: true,
    esInicioSup: true,
    esCambioTra: false,
    esCambioSup: false,
    expandedAccordion: false,
    bufferSwitchedDiasFestivosCuadrante: [],
    columnaIndiceAGestionar: null,
    valorPrevioAccordionAbierto: null,
    lastEditado: null,
    itemPrevioEditando: null,
    preValueValor: {},
    controladorDeEstado: 'inicio',
    esUnaActualizacionTrabajador: false,
    itemPrevioEditandoConfiguracion: null,
    itemEditandoConfiguracion: {
        tipoHorario: '',
        computo: '',
        excepcion: '',
        bloqueado: '',
        mensualPactado: '',
        mensualPactadoInicial: '',
        precioHora_L: '',
        precioHora_E: '',
        precioHora_P: '',
        precioHora_N: '',
        precioHora_R: '',
        precioHora_L1: '',
        precioHora_L2: '',
        precioHora_F: '',
        observaciones: '',
        festivos: {
            inicio: null,
            fin: null,
            tipo: '',
        }
    },
    cambiadaConfiguracionGeneral: false,
    visibleCuadrante: true,
    visibleCuadranteServiciosFijos: true,
    anchorElMenu: null,
    openFacturacion: false,
    openFacturacionInterior: false,
    numeroFactusol: null,
    openLoading: false,
    posicionTrabajadorPrevioACambiar: null,
    posicionSuplentePrevioACambiar: null,
    alerta: {
        abierto: false,
        mensaje: '',
        tipo: ''
    },
    disableSelectCentros: true,
    preValueCalendarioAGestionarReseteo: null,
    venimosBorrarCuadrante: false,
    primeraIntervencionRegistrada: false,
    cuadranteBloqueado: false,
    disableCargando: false,
    cambioSF: false,
    yaNoEsInicio: false,
    venimosDeCambioCentroSelect: false,
    cambioRedimensionColumna: false,
    valorTabPantallaCuadrantes: null,
    mesConFestivosCompleto: false,
    cambioSecuenciaSemanas: {
        inicial: false,
        gestion: false
    }
};

//types
const SET_VALUEDATEPICKER = 'SET_VALUEDATEPICKER';
const SET_NUMEROCUADRANTESCUADRANTES = 'SET_NUMEROCUADRANTESCUADRANTES';
const SET_VENIMOSDECAMBIOCUADRANTE = 'SET_VENIMOSDECAMBIOCUADRANTE';
const SET_FIRMAACTUALIZACION = 'SET_FIRMAACTUALIZACION';
const SET_CUADRANTEVACIO = 'SET_CUADRANTEVACIO';
const SET_CUADRANTEENUSOCUADRANTES = 'SET_CUADRANTEENUSOCUADRANTES';
const SET_ESTAMOSACTUALIZANDOSINCARGA = 'SET_ESTAMOSACTUALIZANDOSINCARGA';
const SET_ARRAYINFORMELINEAS = 'SET_ARRAYINFORMELINEAS';
const SET_TRABAJADORESENCUADRANTE = 'SET_TRABAJADORESENCUADRANTE';
const SET_SUPLENTESESENCUADRANTE = 'SET_SUPLENTESESENCUADRANTE';
const SET_ESINICIOTRA = 'SET_ESINICIOTRA';
const SET_ESINICIOSUP = 'SET_ESINICIOSUP';
const SET_ESCAMBIOTRA = 'SET_ESCAMBIOTRA';
const SET_ESCAMBIOSUP = 'SET_ESCAMBIOSUP';
const SET_EXPANDEDACCORDION = 'SET_EXPANDEDACCORDION';
const SET_BUFFERDIASFESTIVOSCUADRANTE = 'SET_BUFFERDIASFESTIVOSCUADRANTE';
const SET_COLUMNAINDICEAGESTIONAR = 'SET_COLUMNAINDICEAGESTIONAR';
const SET_VALORPREVIOACCORDIONABIERTO = 'SET_VALORPREVIOACCORDIONABIERTO';
const SET_LASTEDITADO = 'SET_LASTEDITADO';
const SET_ITEMPREVIOEDITANDO = 'SET_ITEMPREVIOEDITANDO';
const SET_ESTADOFLEX = 'SET_ESTADOFLEX';
const SET_PREVALUEVALOR = 'SET_PREVALUEVALOR';
const SET_CONTROLADORDEESTADO = 'SET_CONTROLADORDEESTADO';
const SET_ESUNAACTUALIZACIONTRABAJADOR = 'SET_ESUNAACTUALIZACIONTRABAJADOR';
const SET_ITEMPREVIOEDITANDOCONFIGURACION = 'SET_ITEMPREVIOEDITANDOCONFIGURACION';
const SET_ITEMEDITANDOCONFIGURACION = 'SET_ITEMEDITANDOCONFIGURACION';
const SET_CAMBIADACONFIGURACIONGENERAL = 'SET_CAMBIADACONFIGURACIONGENERAL';
const SET_VISIBLECUADRANTE = 'SET_VISIBLECUADRANTE';
const SET_VISIBLECUADRANTESERVICIOSFIJOS = 'SET_VISIBLECUADRANTESERVICIOSFIJOS';
const SET_ANCHORELMENU = 'SET_ANCHORELMENU';
const SET_OPENFACTURACION = 'SET_OPENFACTURACION';
const SET_OPENFACTURACIONINTERIOR = 'SET_OPENFACTURACIONINTERIOR';
const SET_NUMEROFACTUSOL = 'SET_NUMEROFACTUSOL';
const SET_OPENLOADING = 'SET_OPENLOADING';
const SET_POSICIONTRABAJADORPREVIOACAMBIAR = 'SET_POSICIONTRABAJADORPREVIOACAMBIAR';
const SET_POSICIONSUPLENTEPREVIOACAMBIAR = 'SET_POSICIONSUPLENTEPREVIOACAMBIAR';
const SET_ALERTA = 'SET_ALERTA';
const SET_DISABLESELECTCENTROS = 'SET_DISABLESELECTCENTROS';
const SET_PREVALUECALENDARIOAGESTIONARRESETEO = 'SET_PREVALUECALENDARIOAGESTIONARRESETEO';
const SET_VENIMOSBORRARCUADRANTE = 'SET_VENIMOSBORRARCUADRANTE';
const SET_CUADRANTEBLOQUEADO = 'SET_CUADRANTEBLOQUEADO';
const SET_DISABLECARGANDO = ' SET_DISABLECARGANDO';
const SET_CAMBIOSF = 'SET_CAMBIOSF';
const SET_YANOESINICIO = 'SET_YANOESINICIO';
const SET_VENIMOSDECAMBIOCENTROSELECT = 'SET_VENIMOSDECAMBIOCENTROSELECT';
const SET_CAMBIOREDIMENSIONCOLUMNA = 'SET_CAMBIOREDIMENSIONCOLUMNA';
const SET_VALORTABPANTALLACUADRANTES = 'SET_VALORTABPANTALLACUADRANTES';
const SET_MESCONFESTIVOCOMPLETO = 'SET_MESCONFESTIVOCOMPLETO';
const SET_CAMBIOSECUENCIASEMANAS = 'SET_CAMBIOSECUENCIASEMANAS';

//reducer
export default function cuadrantesSettersReducer(state = dataInicial, action) {
    switch (action.type) {
        case SET_VALUEDATEPICKER:
            return { ...state, valueDatePicker: action.payload.valor }
        case SET_NUMEROCUADRANTESCUADRANTES:
            return { ...state, numeroCuadrantesCuadrantes: action.payload.array }
        case SET_VENIMOSDECAMBIOCUADRANTE:
            return { ...state, venimosDeCambioCuadrante: action.payload.estado }
        case SET_FIRMAACTUALIZACION:
            return { ...state, firmaActualizacion: action.payload.valor }
        case SET_CUADRANTEVACIO:
            return { ...state, cuadranteVacio: action.payload.estado }
        case SET_CUADRANTEENUSOCUADRANTES:
            return { ...state, cuadranteEnUsoCuadrantes: action.payload.valor }
        case SET_ESTAMOSACTUALIZANDOSINCARGA:
            return { ...state, estamosActualizandoCuadranteSinCarga: action.payload.estado }
        case SET_ARRAYINFORMELINEAS:
            return { ...state, arrayInformeLineas: action.payload.array }
        case SET_TRABAJADORESENCUADRANTE:
            return { ...state, trabajadoresEnCuadrante: action.payload.array }
        case SET_SUPLENTESESENCUADRANTE:
            return { ...state, suplentesEnCuadrante: action.payload.array }
        case SET_ESINICIOTRA:
            return { ...state, esInicioTra: action.payload.estado }
        case SET_ESINICIOSUP:
            return { ...state, esInicioSup: action.payload.estado }
        case SET_ESCAMBIOTRA:
            return { ...state, esCambioTra: action.payload.estado }
        case SET_ESCAMBIOSUP:
            return { ...state, esCambioSup: action.payload.estado }
        case SET_EXPANDEDACCORDION:
            return { ...state, expandedAccordion: action.payload.estado }
        case SET_BUFFERDIASFESTIVOSCUADRANTE:
            return { ...state, bufferSwitchedDiasFestivosCuadrante: action.payload.array }
        case SET_COLUMNAINDICEAGESTIONAR:
            return { ...state, columnaIndiceAGestionar: action.payload.valor }
        case SET_VALORPREVIOACCORDIONABIERTO:
            return { ...state, valorPrevioAccordionAbierto: action.payload.valor }
        case SET_LASTEDITADO:
            return { ...state, lastEditado: action.payload.valor }
        case SET_ITEMPREVIOEDITANDO:
            return { ...state, itemPrevioEditando: action.payload.valor }
        case SET_PREVALUEVALOR:
            return { ...state, preValueValor: action.payload.objeto }
        case SET_CONTROLADORDEESTADO:
            return { ...state, controladorDeEstado: action.payload.valor }
        case SET_ESUNAACTUALIZACIONTRABAJADOR:
            return { ...state, esUnaActualizacionTrabajador: action.payload.estado }
        case SET_ITEMPREVIOEDITANDOCONFIGURACION:
            return { ...state, itemPrevioEditandoConfiguracion: action.payload.objeto }
        case SET_ITEMEDITANDOCONFIGURACION:
            return { ...state, itemEditandoConfiguracion: action.payload.objeto }
        case SET_CAMBIADACONFIGURACIONGENERAL:
            return { ...state, cambiadaConfiguracionGeneral: action.payload.estado }
        case SET_VISIBLECUADRANTE:
            return { ...state, visibleCuadrante: action.payload.estado }
        case SET_VISIBLECUADRANTESERVICIOSFIJOS:
            return { ...state, visibleCuadranteServiciosFijos: action.payload.estado }
        case SET_ANCHORELMENU:
            return { ...state, anchorElMenu: action.payload.valor }
        case SET_OPENFACTURACION:
            return { ...state, openFacturacion: action.payload.estado }
        case SET_OPENFACTURACIONINTERIOR:
            return { ...state, openFacturacionInterior: action.payload.estado }
        case SET_NUMEROFACTUSOL:
            return { ...state, numeroFactusol: action.payload.valor }
        case SET_OPENLOADING:
            return { ...state, openLoading: action.payload.estado }
        case SET_POSICIONTRABAJADORPREVIOACAMBIAR:
            return { ...state, posicionTrabajadorPrevioACambiar: action.payload.valor }
        case SET_POSICIONSUPLENTEPREVIOACAMBIAR:
            return { ...state, posicionSuplentePrevioACambiar: action.payload.valor }
        case SET_ALERTA:
            return { ...state, alerta: action.payload.objeto }
        case SET_DISABLESELECTCENTROS:
            return { ...state, disableSelectCentros: action.payload.estado }
        case SET_PREVALUECALENDARIOAGESTIONARRESETEO:
            return { ...state, preValueCalendarioAGestionarReseteo: action.payload.valor }
        case SET_VENIMOSBORRARCUADRANTE:
            return { ...state, venimosBorrarCuadrante: action.payload.estado }
        case SET_CUADRANTEBLOQUEADO:
            return { ...state, cuadranteBloqueado: action.payload.estado }
        case SET_DISABLECARGANDO:
            return { ...state, disableCargando: action.payload.estado }
        case SET_CAMBIOSF:
            return { ...state, cambioSF: action.payload.estado }
        case SET_YANOESINICIO:
            return { ...state, yaNoEsInicio: action.payload.estado }
        case SET_VENIMOSDECAMBIOCENTROSELECT:
            return { ...state, venimosDeCambioCentroSelect: action.payload.estado }
        case SET_CAMBIOREDIMENSIONCOLUMNA:
            return { ...state, cambioRedimensionColumna: action.payload.estado }
        case SET_VALORTABPANTALLACUADRANTES:
            return { ...state, valorTabPantallaCuadrantes: action.payload.valor }
        case SET_MESCONFESTIVOCOMPLETO:
            return { ...state, mesConFestivosCompleto: action.payload.valor }
        case SET_CAMBIOSECUENCIASEMANAS:
            return { ...state, cambioSecuenciaSemanas: action.payload.objeto }
        default:
            return { ...state }
    }
}

//acciones

export const setCambioSecuenciaSemanasAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_CAMBIOSECUENCIASEMANAS,
        payload: {
            objeto: objeto
        }
    });
};

export const setMesConFestivosCompletoAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_MESCONFESTIVOCOMPLETO,
        payload: {
            valor: valor
        }
    });
};

export const setValorTabPantallaCuadrantesAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_VALORTABPANTALLACUADRANTES,
        payload: {
            valor: valor
        }
    });
};

export const setCambioRedimensionColumnaAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_CAMBIOREDIMENSIONCOLUMNA,
        payload: {
            estado: estado
        }
    });
};

export const setVenimosDeCambioCentroSelectAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_VENIMOSDECAMBIOCENTROSELECT,
        payload: {
            estado: estado
        }
    });
};

export const setYaNoEsInicioAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_YANOESINICIO,
        payload: {
            estado: estado
        }
    });
};

export const setCambioSFAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_CAMBIOSF,
        payload: {
            estado: estado
        }
    });
};

export const setDisableCargandoAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_DISABLECARGANDO,
        payload: {
            estado: estado
        }
    });
};

export const setCuadranteBloqueadoAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_CUADRANTEBLOQUEADO,
        payload: {
            estado: estado
        }
    });
};

export const setVenimosBorrarCuadranteAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_VENIMOSBORRARCUADRANTE,
        payload: {
            estado: estado
        }
    });
};

export const setPreValueCalendarioAGestionarReseteoAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_PREVALUECALENDARIOAGESTIONARRESETEO,
        payload: {
            valor: valor
        }
    });
};

export const setDisableSelectCentrosAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_DISABLESELECTCENTROS,
        payload: {
            estado: estado
        }
    });
};

export const setAlertaAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ALERTA,
        payload: {
            objeto: objeto
        }
    });
};

export const setPosicionTrabajadorPrevioACambiarAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_POSICIONTRABAJADORPREVIOACAMBIAR,
        payload: {
            valor: valor
        }
    });
};

export const setPosicionSuplentePrevioACambiarAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_POSICIONSUPLENTEPREVIOACAMBIAR,
        payload: {
            valor: valor
        }
    });
};

export const setOpenLoadingAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_OPENLOADING,
        payload: {
            estado: estado
        }
    });
};

export const setOpenFacturacionAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_OPENFACTURACION,
        payload: {
            estado: estado
        }
    });
};

export const setOpenFacturacionInteriorAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_OPENFACTURACIONINTERIOR,
        payload: {
            estado: estado
        }
    });
};

export const setNumeroFactusolAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_NUMEROFACTUSOL,
        payload: {
            valor: valor
        }
    });
};

export const setAnchorElMenuAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_ANCHORELMENU,
        payload: {
            valor: valor
        }
    });
};

export const setVisibleCuadranteAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_VISIBLECUADRANTE,
        payload: {
            estado: estado
        }
    });
};

export const setVisibleCuadranteServiciosFijosAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_VISIBLECUADRANTESERVICIOSFIJOS,
        payload: {
            estado: estado
        }
    });
};

export const setCambiadaConfiguracionGeneralAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_CAMBIADACONFIGURACIONGENERAL,
        payload: {
            estado: estado
        }
    });
};

export const setItemPrevioEditandoConfiguracionAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMPREVIOEDITANDOCONFIGURACION,
        payload: {
            objeto: objeto
        }
    });
};

export const setItemEditandoConfiguracionAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMEDITANDOCONFIGURACION,
        payload: {
            objeto: objeto
        }
    });
};

export const setEsUnaActualizacionTrabajadorAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_ESUNAACTUALIZACIONTRABAJADOR,
        payload: {
            estado: estado
        }
    });
};

export const setControladorDeEstadoAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_CONTROLADORDEESTADO,
        payload: {
            valor: valor
        }
    });
};

export const setPreValueValorAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_PREVALUEVALOR,
        payload: {
            objeto: objeto
        }
    });
};

export const setItemPrevioEditandoAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMPREVIOEDITANDO,
        payload: {
            valor: valor
        }
    });
};

export const setLastEditadoAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_LASTEDITADO,
        payload: {
            valor: valor
        }
    });
};

export const setValorPrevioAccordionAbiertoAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_VALORPREVIOACCORDIONABIERTO,
        payload: {
            valor: valor
        }
    });
};

export const setColumnaIndiceAGestionarAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_COLUMNAINDICEAGESTIONAR,
        payload: {
            valor: valor
        }
    });
};

export const setBufferSwitchedDiasFestivosCuadranteAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_BUFFERDIASFESTIVOSCUADRANTE,
        payload: {
            array: array
        }
    });
};

export const setExpandedAccordionAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_EXPANDEDACCORDION,
        payload: {
            estado: estado
        }
    });
};

export const setEsInicioTraAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_ESINICIOTRA,
        payload: {
            estado: estado
        }
    });
};

export const setEsInicioSupAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_ESINICIOSUP,
        payload: {
            estado: estado
        }
    });
};

export const setEsCambioTraAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_ESCAMBIOTRA,
        payload: {
            estado: estado
        }
    });
};

export const setEsCambioSupAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_ESCAMBIOSUP,
        payload: {
            estado: estado
        }
    });
};

export const setTrabajadoresEnCuadranteAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_TRABAJADORESENCUADRANTE,
        payload: {
            array: array
        }
    });
};

export const setSuplentesEnCuadranteAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_SUPLENTESESENCUADRANTE,
        payload: {
            array: array
        }
    });
};

export const setArrayInformeLineasAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_ARRAYINFORMELINEAS,
        payload: {
            array: array
        }
    });
};

export const setEstamosActualizandoCuadranteSinCargaAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_ESTAMOSACTUALIZANDOSINCARGA,
        payload: {
            estado: estado
        }
    });
};

export const setCuadranteEnUsoCuadrantesAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_CUADRANTEENUSOCUADRANTES,
        payload: {
            valor: valor
        }
    });
};

export const setCuadranteVacioAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_CUADRANTEVACIO,
        payload: {
            estado: estado
        }
    });
};

export const setFirmaActualizacionAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_FIRMAACTUALIZACION,
        payload: {
            valor: valor
        }
    });
};

export const setValueDatePickerAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_VALUEDATEPICKER,
        payload: {
            valor: valor
        }
    });
};

export const setNumeroCuadrantesCuadrantesAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_NUMEROCUADRANTESCUADRANTES,
        payload: {
            array: array
        }
    });
};

export const setVenimosDeCambioCuadranteAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_VENIMOSDECAMBIOCUADRANTE,
        payload: {
            estado: estado
        }
    });
};

export const reseteaContenidoCentroAccion = (excepciones) => (dispatch) => {
    dispatch({
        type: SET_TRABAJADORESENCUADRANTE,
        payload: {
            array: []
        }
    });
    dispatch({
        type: SET_SUPLENTESESENCUADRANTE,
        payload: {
            array: []
        }
    });
    dispatch(setCuadranteAccion([]));
    dispatch({
        type: SET_EXPANDEDACCORDION,
        payload: {
            estado: false
        }
    });
    dispatch({
        type: SET_ESINICIOTRA,
        payload: {
            estado: true
        }
    });
    dispatch({
        type: SET_ESINICIOSUP,
        payload: {
            estado: true
        }
    });
    dispatch({
        type: SET_ESCAMBIOTRA,
        payload: {
            estado: false
        }
    });
    dispatch({
        type: SET_ESCAMBIOSUP,
        payload: {
            estado: false
        }
    });
    dispatch({
        type: SET_COLUMNAINDICEAGESTIONAR,
        payload: {
            valor: null
        }
    });
    dispatch({
        type: SET_VALORPREVIOACCORDIONABIERTO,
        payload: {
            valor: null
        }
    });
    dispatch(setVariablesPopoverDiasAccion({}));
    dispatch(setVariablesPopoverGeneralAccion({}));
    dispatch({
        type: SET_LASTEDITADO,
        payload: {
            valor: null
        }
    });
    dispatch({
        type: SET_ITEMPREVIOEDITANDO,
        payload: {
            valor: null
        }
    });
    dispatch({
        type: SET_ESTADOFLEX,
        payload: {
            valor: 'fila'
        }
    });
    dispatch(setCentroAccion(''));
    dispatch({
        type: SET_PREVALUEVALOR,
        payload: {
            objeto: {}
        }
    });
    dispatch({
        type: SET_CONTROLADORDEESTADO,
        payload: {
            valor: 'inicio'
        }
    });
    dispatch({
        type: SET_ESUNAACTUALIZACIONTRABAJADOR,
        payload: {
            estado: false
        }
    });
    dispatch({
        type: SET_FIRMAACTUALIZACION,
        payload: {
            valor: ''
        }
    });
    dispatch({
        type: SET_ARRAYINFORMELINEAS,
        payload: {
            array: []
        }
    });
    dispatch(setLosServiciosFijosAccion({}));
    dispatch(setStateSwitchTipoServicioFijoCuadranteAccion({
        TO: false,
        CR: false,
        CE: false,
        CI: false,
        MO: false,
        OF: false,
        AL: false,
        LA: false,
        TE: false,
        FI: false,
        FE: false,
        AB: false,
        MA: false,
        PO: false,
        BA: false,
        FT: false,
        C3: false,
        C2: false
    }));
    dispatch({
        type: SET_CUADRANTEVACIO,
        payload: {
            estado: false
        }
    });
    dispatch(setItemPrevioEditandoServiciosFijosAccion(null));
    dispatch(setItemEditandoServiciosFijosAccion({
        switch: {
            TO: false,
            CR: false,
            CE: false,
            CI: false,
            MO: false,
            OF: false,
            AL: false,
            LA: false,
            TE: false,
            FI: false,
            FE: false,
            AB: false,
            MA: false,
            PO: false,
            BA: false,
            FT: false,
            C3: false,
            C2: false
        },
        servicios: {
            precioHora_TO: '',
            precioHora_CR: '',
            precioHora_CE: '',
            precioHora_CI: '',
            precioHora_MO: '',
            precioHora_OF: '',
            precioHora_AL: '',
            precioHora_LA: '',
            precioHora_TE: '',
            precioHora_FI: '',
            precioHora_FE: '',
            precioHora_AB: '',
            precioHora_MA: '',
            precioHora_PO: '',
            precioHora_BA: '',
            precioHora_FT: '',
            precioHora_C3: '',
            precioHora_C2: '',
            variacion_TO: '',
            variacion_CR: '',
            variacion_CE: '',
            variacion_CI: '',
            variacion_MO: '',
            variacion_OF: '',
            variacion_AL: '',
            variacion_LA: '',
            variacion_TE: '',
            variacion_FI: '',
            variacion_FE: '',
            variacion_AB: '',
            variacion_MA: '',
            variacion_PO: '',
            variacion_BA: '',
            variacion_FT: '',
            variacion_C3: '',
            variacion_C2: '',
            diaVariacion_TO: '',
            diaVariacion_CR: '',
            diaVariacion_CE: '',
            diaVariacion_CI: '',
            diaVariacion_MO: '',
            diaVariacion_OF: '',
            diaVariacion_AL: '',
            diaVariacion_LA: '',
            diaVariacion_TE: '',
            diaVariacion_FI: '',
            diaVariacion_FE: '',
            diaVariacion_AB: '',
            diaVariacion_MA: '',
            diaVariacion_PO: '',
            diaVariacion_BA: '',
            diaVariacion_FT: '',
            diaVariacion_C3: '',
            diaVariacion_C2: '',
            activo_TO: 'si',
            activo_CR: 'si',
            activo_CE: 'si',
            activo_CI: 'si',
            activo_MO: 'si',
            activo_OF: 'si',
            activo_AL: 'si',
            activo_LA: 'si',
            activo_TE: 'si',
            activo_FI: 'si',
            activo_FE: 'si',
            activo_AB: 'si',
            activo_MA: 'si',
            activo_PO: 'si',
            activo_BA: 'si',
            activo_FT: 'si',
            activo_C3: 'si',
            activo_C2: 'si',
            int_TO: false,
            int_CR: false,
            int_CE: false,
            int_CI: false,
            int_MO: false,
            int_OF: false,
            int_AL: false,
            int_LA: false,
            int_TE: false,
            int_FI: false,
            int_FE: false,
            int_AB: false,
            int_MA: false,
            int_PO: false,
            int_BA: false,
            int_FT: false,
            int_C3: false,
            int_C2: false,
            int_ES: false,
            int_PA: false,
            trab_TO: '',
            trab_CR: '',
            trab_CE: '',
            trab_CI: '',
            trab_MO: '',
            trab_OF: '',
            trab_AL: '',
            trab_LA: '',
            trab_TE: '',
            trab_FI: '',
            trab_FE: '',
            trab_AB: '',
            trab_MA: '',
            trab_PO: '',
            trab_BA: '',
            trab_FT: '',
            trab_C3: '',
            trab_C2: '',
            trab_ES: '',
            trab_PA: ''
        }
    }));
    dispatch({
        type: SET_ITEMPREVIOEDITANDOCONFIGURACION,
        payload: {
            objeto: null
        }
    });
    dispatch({
        type: SET_ITEMEDITANDOCONFIGURACION,
        payload: {
            objeto: {
                tipoHorario: '',
                computo: '',
                mensualPactado: '',
                precioHora_L: '',
                precioHora_E: '',
                precioHora_P: '',
                precioHora_N: '',
                precioHora_R: '',
                precioHora_L1: '',
                precioHora_L2: '',
                precioHora_F: '',
                observaciones: ''
            }
        }
    });
    dispatch({
        type: SET_YANOESINICIO,
        payload: {
            estado: false
        }
    });
    dispatch({
        type: SET_MESCONFESTIVOCOMPLETO,
        payload: {
            valor: false
        }
    });
    if (!excepciones) {
        //cambio cuadrante total
        dispatch({
            type: SET_NUMEROFACTUSOL,
            payload: {
                valor: null
            }
        });
        dispatch({
            type: SET_CUADRANTEBLOQUEADO,
            payload: {
                valor: false
            }
        });
        dispatch({
            type: SET_BUFFERDIASFESTIVOSCUADRANTE,
            payload: {
                array: []
            }
        });
        dispatch({
            type: SET_VENIMOSDECAMBIOCUADRANTE,
            payload: {
                estado: false
            }
        });
        dispatch(reseteaTotalesPeriodicosAccion());
        dispatch(setStateFestivoAccion({}));
        dispatch(vaciarDatosCuadranteRegistradoAccion());
        dispatch(activarDesactivarCambioBotonRegistrarAccion(true));
        //dispatch(registrarIntervencionCuadranteNuevoAccion(true));
        dispatch(activarDesactivarCambioAccion(true));
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        dispatch(resetarNumeroRecibosAccion());
        dispatch({
            type: SET_NUMEROCUADRANTESCUADRANTES,
            payload: {
                array: [{ value: 1, revisado: false }]
            }
        });
        dispatch({
            type: SET_CUADRANTEENUSOCUADRANTES,
            payload: {
                valor: 1
            }
        });
    } else {
        //dispatch(registrarIntervencionCuadranteNuevoAccion(false));
    };
    dispatch({
        type: SET_CAMBIADACONFIGURACIONGENERAL,
        payload: {
            estado: false
        }
    });
    dispatch(setCuadranteServiciosFijosAccion([]));
    dispatch({
        type: SET_VISIBLECUADRANTE,
        payload: {
            estado: true
        }
    });
    dispatch({
        type: SET_VISIBLECUADRANTESERVICIOSFIJOS,
        payload: {
            estado: true
        }
    });
};

export const reseteaContenidoCuadranteAccion = () => (dispatch) => {
    dispatch(reseteaContenidoCentroAccion(false));
    dispatch(setStateFestivoAccion({}))
    dispatch(vaciarDatosCentroAccion());
    dispatch(vaciarDatosTrabajadorAccion());
};



