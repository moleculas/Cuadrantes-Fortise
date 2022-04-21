import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import { withRouter } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import { es } from "date-fns/locale";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Chip from '@material-ui/core/Chip';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Popover from "@material-ui/core/Popover";
import ChatIcon from '@material-ui/icons/Chat';
import SaveIcon from '@material-ui/icons/Save';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import HomeIcon from '@material-ui/icons/Home';
import CachedIcon from '@material-ui/icons/Cached';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SettingsIcon from '@material-ui/icons/Settings';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

//carga componentes
import ItemCuadrante from './ItemCuadrante';
import PantallaCuadrantes from './PantallaCuadrantes';
import DialogComponente from './DialogComponente';
import ServiciosFijos from './ServiciosFijos';
import ConfiguracionCuadrante from './ConfiguracionCuadrante';
import ObjetosGestionCuadrantes from './ObjetosGestionCuadrantes';

//helpers
import HelpersLayoutCuadrantes from './HelpersLayoutCuadrantes';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerCentrosPorCategoriaAccion } from '../redux/centrosDucks';
import { retornaAnoMesAccion } from '../redux/appDucks';
import { diasEnElMesAccion } from '../redux/appDucks';
import { diaDeLaSemanaAccion } from '../redux/appDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { onEstemAccion } from '../redux/appDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonResetearAccion } from '../redux/cuadrantesDucks';
import { obtenerCuadranteAccion } from '../redux/cuadrantesDucks';
import { registrarIntervencionCuadranteNuevoAccion } from '../redux/cuadrantesDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import { actualizarObjetoCuadranteAccion } from '../redux/cuadrantesDucks';
import { venimosDePendientesAccion } from '../redux/pendientesDucks';
import { setCategoriaAccion } from '../redux/cuadrantesDucks';
import { obtenerCategoriaPorCentroAccion } from '../redux/centrosDucks';
import { setCalendarioAGestionarAccion } from '../redux/cuadrantesDucks';
import { venimosDeRegistradosAccion } from '../redux/pendientesDucks';
import { gestionaMaxDateCalendarAccion } from '../redux/appDucks';
import { setLosDiasDelMesAccion } from '../redux/cuadrantesDucks';
import { setStateFestivoAccion } from '../redux/cuadrantesDucks';
import { centroAGestionarInicioAccion } from '../redux/cuadrantesGestionDucks';
import { gestionaCuadranteIndividualAccion } from '../redux/cuadrantesGestionDucks';
import { setEstamosActualizandoCuadranteSinCargaAccion } from '../redux/cuadrantesSettersDucks';
import { setArrayDatosInformeAccion } from '../redux/cuadrantesSettersDucks';
import { setValorPrevioAccordionAbiertoAccion } from '../redux/cuadrantesSettersDucks';
import { setEstadoFlexAccion } from '../redux/cuadrantesSettersDucks';
import { setControladorDeEstadoAccion } from '../redux/cuadrantesSettersDucks';
import { setVisibleCuadranteAccion } from '../redux/cuadrantesSettersDucks';
import { setVisibleCuadranteServiciosFijosAccion } from '../redux/cuadrantesSettersDucks';
import { procesarDatosCuadranteAccion } from '../redux/cuadrantesGestionDucks';
import { gestionarInformeAccion } from '../redux/cuadrantesColumnasDucks';
import { setOpenLoadingAccion } from '../redux/cuadrantesSettersDucks';
import { gestionTrabajadorAccion } from '../redux/cuadrantesGestionDucks';
import { gestionSuplenteAccion } from '../redux/cuadrantesGestionDucks';
import { setAlertaAccion } from '../redux/cuadrantesSettersDucks';
import { reseteaContenidoCuadranteAccion } from '../redux/cuadrantesSettersDucks';
import { setDisableSelectCentrosAccion } from '../redux/cuadrantesSettersDucks';
import { setPreValueCalendarioAGestionarReseteoAccion } from '../redux/cuadrantesSettersDucks';
import { setVenimosBorrarCuadranteAccion } from '../redux/cuadrantesSettersDucks';
import { setVenimosDeCambioCuadranteAccion } from '../redux/cuadrantesSettersDucks';
import { traspasoBufferFestivosAccion } from '../redux/cuadrantesHandlersDucks';
import {
    abrePopoverDiasAccion,
    abrePopoverServiciosFijosAccion,
    handleClosePopoverServiciosFijosAccion,
    abrePopoverConfiguracionAccion,
    handleClosePopoverConfiguracionAccion,
    abrePopoverGeneralAccion,
    handleClosePopoverGeneralAccion,
    handleClosePopoverDiasAccion
} from '../redux/cuadrantesPopoversDucks';
import {
    handleChangeTimePickerInicioCuadranteAccion,
    handleChangeTimePickerFinCuadranteAccion,
    handleCloseMenuAccion,
    handleClickMenuAccion,
    handleChangeSelectCalendarioAccion,
    handleChangeSelectCategoriaAccion,
    handleClickOpenDialogCuadrantes4Accion,
    handleClickOpenDialogCuadrantes5Accion,
    handleCloseDialogBotonesCuadrantes1Accion,
    handleCloseDialogBotonesCuadrantes3Accion,
    goToInicioCuadrantesAccion,
    handleClickOpenDialogCuadrantes1Accion,
    handleChangeSelectCentroAccion,
    handleCloseDialogBotonesVacioAccion,
    handleCloseDialogBotonesCuadrantes5Accion,
    handleCambioAccordionHeaderAccion,
    handleClickAddColumnaAccion,
    eliminarColumnaAccion,
    handleVisibleVariacionesAccion,
    handleChangeTipoVariacionesAccion,
    handleChangeFestivoDiaAccion,
    handleChangeSFCasillasAccion,
    handleChangeFormTrabajadoresAccion,
    handleActualizarTrabajadoresAccion,
    handleChangeSelectCantidadAccion,
    handleChangeObservacionesAccion,
    handleChangeTipoServicioAccion,
    handleChangeFormConfiguracionCuadranteAccion,
    handleChangeFormConfiguracionServiciosFijosAccion,
    gestionItemPrevioEditandoAccion,
    handleRegistrarCambioEnCasillaAccion,
    gestionItemPrevioEditandoServiciosFijosAccion,
    handleRegistrarCambioEnCasillaServiciosFijosAccion,
    gestionItemPrevioEditandoConfiguracionAccion,
    handleRegistrarCambioEnCasillaConfiguracionAccion,
    handleChangeTipoHorarioAccion,
    configuraStateFestivoAccion,
    handleLimpiezaHorarioAccion,
    esFestivoFuncionAccion
} from '../redux/cuadrantesHandlersDucks';
import {
    retornaInfoFabButtonAccion,
    generaInformacionCuadrantesAccion,
    handleClickFacturarCuadranteAccion,
    handleClickFacturacionMenuAccion,
    handleClickFacturacionInteriorMenuAccion,
    handleChangeFormNumumeroFactusolAccion,
    handleGenerarArchivosAccion
} from '../redux/cuadrantesFacturacionDucks';

const categorias = Constantes.CATEGORIAS_CENTROS;
const tipos = Constantes.MODO_ENTRADA_HORARIOS;

const getHeightScrollable = () => (window.innerHeight - 217) || (document.documentElement.clientHeight - 217) || (document.body.clientHeight - 217);

//accordion
const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        borderRadius: '0px !important',
    }
})(MuiAccordion);
const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12);',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
        borderRight: '1px solid rgba(0, 0, 0, 0.12);',
    },
}))(MuiAccordionDetails);
const AccordionSummary = withStyles({
    root: {
        minHeight: 38,
        maxHeight: 38,
        '&.Mui-expanded': {
            minHeight: 38,
            maxHeight: 38,
        }
    }
})(MuiAccordionSummary);

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

//menu
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

//tooltip
const InfoTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#ffeb3b',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    arrow: {
        "&:before": {
        },
        color: '#ffeb3b',
    },
}))(Tooltip);

const Cuadrantes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const cuadranteServiciosFijos = useSelector(store => store.variablesCuadrantesServiciosFijos.cuadranteServiciosFijos);
    const centrosPorCategoria = useSelector(store => store.variablesCentros.arrayCentrosPorCategoria);
    const logged = useSelector(store => store.variablesUsuario.activo);
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const openLoadingCuadrantes = useSelector(store => store.variablesCuadrantes.loadingCuadrantes);
    const centroAGestionar = useSelector(store => store.variablesCentros.objetoCentro);
    const trabajadorAGestionar = useSelector(store => store.variablesTrabajadores.objetoTrabajador);
    const suplenteAGestionar = useSelector(store => store.variablesTrabajadores.objetoSuplente);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const objetoCuadrante = useSelector(store => store.variablesCuadrantes.objetoCuadrante);
    const esInicioCuadrantes = useSelector(store => store.variablesCuadrantes.esInicioCuadrantes);
    const disabledItemBotonRegistrar = useSelector(store => store.variablesCuadrantes.estadoActivadoDesactivadoBotonRegistrar);
    const disabledItemBotonActualizar = useSelector(store => store.variablesCuadrantes.estadoActivadoDesactivadoBotonActualizar);
    const disabledItemBotonResetear = useSelector(store => store.variablesCuadrantes.estadoActivadoDesactivadoBotonResetear);
    const disabledItem = useSelector(store => store.variablesCuadrantes.estadoActivadoDesactivadoCambio);
    const cuadranteRegistrado = useSelector(store => store.variablesCuadrantes.cuadranteRegistrado);
    const openDialog4 = useSelector(store => store.variablesApp.openDialog[3]);
    const openDialog5 = useSelector(store => store.variablesApp.openDialog[4]);
    const openDialog7 = useSelector(store => store.variablesApp.openDialog[6]);
    const openDialog8 = useSelector(store => store.variablesApp.openDialog[7]);
    const openDialog12 = useSelector(store => store.variablesApp.openDialog[11]);
    const exitoRegistroCuadrante = useSelector(store => store.variablesCuadrantes.exitoRegistroCuadrante);
    const exitoActualizacionCuadrante = useSelector(store => store.variablesCuadrantes.exitoActualizacionCuadrante);
    const exitoResetearCuadrante = useSelector(store => store.variablesCuadrantes.exitoResetearCuadrante);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const ultimoIdRegistrado = useSelector(store => store.variablesCuadrantes.ultimoIdRegistrado);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const errorDeCargaCuadrantes = useSelector(store => store.variablesCuadrantes.errorDeCargaCuadrantes);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const estadoVenimosDePendientes = useSelector(store => store.variablesPendientes.estadoVenimosDePendientes);
    const categoria = useSelector(store => store.variablesCuadrantes.categoria);
    const centro = useSelector(store => store.variablesCuadrantes.centro);
    const categoriaPorCentro = useSelector(store => store.variablesCentros.categoriaPorCentro);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);
    const estadoVenimosDeRegistrados = useSelector(store => store.variablesPendientes.estadoVenimosDeRegistrados);
    const exitoGenerarArchivos = useSelector(store => store.variablesApp.exitoGenerarArchivos);
    const losDiasDelMes = useSelector(store => store.variablesCuadrantes.losDiasDelMes);
    const stateFestivo = useSelector(store => store.variablesCuadrantes.stateFestivo);
    const cuadrante = useSelector(store => store.variablesCuadrantes.cuadrante);
    const valueDatePicker = useSelector(store => store.variablesCuadrantesSetters.valueDatePicker);
    const venimosDeCambioCuadrante = useSelector(store => store.variablesCuadrantesSetters.venimosDeCambioCuadrante);
    const firmaActualizacion = useSelector(store => store.variablesCuadrantesSetters.firmaActualizacion);
    const cuadranteVacio = useSelector(store => store.variablesCuadrantesSetters.cuadranteVacio);
    const losServiciosFijos = useSelector(store => store.variablesCuadrantesServiciosFijos.losServiciosFijos);
    const cuadranteEnUsoCuadrantes = useSelector(store => store.variablesCuadrantesSetters.cuadranteEnUsoCuadrantes);
    const estamosActualizandoCuadranteSinCarga = useSelector(store => store.variablesCuadrantesSetters.estamosActualizandoCuadranteSinCarga);
    const arrayInformeLineas = useSelector(store => store.variablesCuadrantesSetters.arrayInformeLineas);
    const expandedAccordion = useSelector(store => store.variablesCuadrantesSetters.expandedAccordion);
    const variablesPopoverDias = useSelector(store => store.variablesCuadrantesPopovers.variablesPopoverDias);
    const variablesPopoverGeneral = useSelector(store => store.variablesCuadrantesPopovers.variablesPopoverGeneral);
    const estadoFlex = useSelector(store => store.variablesCuadrantesSetters.estadoFlex);
    const controladorDeEstado = useSelector(store => store.variablesCuadrantesSetters.controladorDeEstado);
    const itemEditandoServiciosFijos = useSelector(store => store.variablesCuadrantesServiciosFijos.itemEditandoServiciosFijos);
    const itemEditandoConfiguracion = useSelector(store => store.variablesCuadrantesSetters.itemEditandoConfiguracion);
    const visibleCuadrante = useSelector(store => store.variablesCuadrantesSetters.visibleCuadrante);
    const visibleCuadranteServiciosFijos = useSelector(store => store.variablesCuadrantesSetters.visibleCuadranteServiciosFijos);
    const anchorElMenu = useSelector(store => store.variablesCuadrantesSetters.anchorElMenu);
    const openFacturacion = useSelector(store => store.variablesCuadrantesSetters.openFacturacion);
    const openFacturacionInterior = useSelector(store => store.variablesCuadrantesSetters.openFacturacionInterior);
    const numeroFactusol = useSelector(store => store.variablesCuadrantesSetters.numeroFactusol);
    const openLoading = useSelector(store => store.variablesCuadrantesSetters.openLoading);
    const alerta = useSelector(store => store.variablesCuadrantesSetters.alerta);
    const disableSelectCentros = useSelector(store => store.variablesCuadrantesSetters.disableSelectCentros);
    const preValueCalendarioAGestionarReseteo = useSelector(store => store.variablesCuadrantesSetters.preValueCalendarioAGestionarReseteo);
    const venimosBorrarCuadrante = useSelector(store => store.variablesCuadrantesSetters.venimosBorrarCuadrante);
    const anchorElDias = useSelector(store => store.variablesCuadrantesPopovers.anchorElDias);
    const anchorElServiciosFijos = useSelector(store => store.variablesCuadrantesPopovers.anchorElServiciosFijos);
    const anchorElConfiguracion = useSelector(store => store.variablesCuadrantesPopovers.anchorElConfiguracion);
    const anchorElGeneral = useSelector(store => store.variablesCuadrantesPopovers.anchorElGeneral);
    const numeroCuadrantesCuadrantes = useSelector(store => store.variablesCuadrantesSetters.numeroCuadrantesCuadrantes);

    //para test
    const arrayDatosInforme = useSelector(store => store.variablesCuadrantesSetters.arrayDatosInforme);
    const itemPrevioEditando = useSelector(store => store.variablesCuadrantesSetters.itemPrevioEditando);
    const bufferSwitchedDiasFestivosCuadranteDesactivados = useSelector(store => store.variablesCuadrantesSetters.bufferSwitchedDiasFestivosCuadranteDesactivados);
    const bufferSwitchedDiasFestivosCuadrante = useSelector(store => store.variablesCuadrantesSetters.bufferSwitchedDiasFestivosCuadrante);
    const trabajadoresEnCuadrante = useSelector(store => store.variablesCuadrantesSetters.trabajadoresEnCuadrante);

    //helpers

    const {
        gestionaTextoCasillasServiciosFijosAccion,
        gestionaTextoCasillasAccion,
        gestionaClassesColoresGeneralAccion,
        gestionaClassesColoresServiciosFijosAccion,
        gestionaClassesColoresTrabajadoresAccion,
        retornaIconoTipoServicioAccion,
        retornaIconoVariacionAccion,
        gestionaValoresCasillasAccion,
        retornaHeaderServiciosFijosAccion,
        retornoServiciosFijosEnLayoutAccion,
        retornaServiciosFijosEnLayoutAvatarsAccion
    } = HelpersLayoutCuadrantes();

    //refs

    const scrollable = useRef();
    const boxes = useRef([]);

    //states

    const [dimensionsColumna, setDimensionsColumna] = useState({ width: 350 });
    const openDias = Boolean(anchorElDias);
    const openGeneral = Boolean(anchorElGeneral);
    const openServiciosFijos = Boolean(anchorElServiciosFijos);
    const openConfiguracion = Boolean(anchorElConfiguracion);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [dimensionsColumnaServiciosFijos, setDimensionsColumnaServiciosFijos] = useState({ width: 165 });
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [classesDisp, setClassesDisp] = useState({
        openAccordion: classes.openAccordion,
        editando: classes.editando
    });

    //useEffect

    //secuencia inicio

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
        dispatch(reseteaContenidoCuadranteAccion());
    }, []);

    useEffect(() => {
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable());
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        dispatch(setCalendarioAGestionarAccion(retornaAnoMesAccion()));
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
        dispatch(onEstemAccion('cuadrantes'));
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        };
    }, [dispatch]);

    //secuencia gestión meses
   
    useEffect(() => {
        const diasMes = dispatch(diasEnElMesAccion(calendarioAGestionar));
        let myArrSplit = calendarioAGestionar.split("-");
        const anyoAGest = myArrSplit[0];
        const mesAGest = myArrSplit[1];
        let array = [];
        let object={};
        for (let i = 0; i < diasMes; i++) {
            const dateStr = mesAGest + '-' + (i + 1) + '-' + anyoAGest;
            array.push([[i + 1], [dispatch(diaDeLaSemanaAccion(dateStr))]]);
            if (dispatch(esFestivoFuncionAccion(i))) {
                object['estadoFestivoDia' + i] = true;
            } else {
                object['estadoFestivoDia' + i] = false;
            };
        };
        dispatch(setStateFestivoAccion(object));
        dispatch(setLosDiasDelMesAccion(array));
    }, [calendarioAGestionar]);

    //secuencia cuadrante

    useEffect(() => {
        if (controladorDeEstado === 'inicio' || controladorDeEstado === 'venimosDeResetear') {
            dispatch(setControladorDeEstadoAccion('inicio'));
            if (controladorDeEstado === 'venimosDeResetear') {
                dispatch(setCalendarioAGestionarAccion(preValueCalendarioAGestionarReseteo));
                dispatch(setPreValueCalendarioAGestionarReseteoAccion(null));
            };
        };
        if (controladorDeEstado === 'venimosDeInforme') {
            dispatch(setControladorDeEstadoAccion('inicio'));
        };
        if (objetoCuadrante.datosCuadrante.centro) {
            if (!venimosBorrarCuadrante) {
                if (!estamosActualizandoCuadranteSinCarga) {
                    dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, false));
                } else {
                    dispatch(setEstamosActualizandoCuadranteSinCargaAccion(false));
                };
            } else {
                dispatch(setVenimosBorrarCuadranteAccion(false));
            };
        };
    }, [objetoCuadrante]);

    useEffect(() => {
        dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: ultimoIdRegistrado }));
    }, [ultimoIdRegistrado]);

    useEffect(() => {
        if (cuadranteRegistrado === 'no') {
            if (!estadoVenimosDePendientes && !venimosDeCambioCuadrante) {
                dispatch(obtenerCentroAccion('centros', centro));
                dispatch(cambioEstadoInicioCuadrantesAccion(false));
                dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
                dispatch(registrarIntervencionCuadranteNuevoAccion(false));
            };
            dispatch(activarDesactivarCambioBotonResetearAccion(true));
        };
        if (cuadranteRegistrado === 'si') {
            if (!estadoVenimosDeRegistrados && !venimosDeCambioCuadrante) {
                // dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, false));
                dispatch(cambioEstadoInicioCuadrantesAccion(false));
                dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
                dispatch(registrarIntervencionCuadranteNuevoAccion(true));
            };
            dispatch(obtenerCentroAccion('centros', objetoCuadrante.datosCuadrante.centro));
            dispatch(activarDesactivarCambioBotonResetearAccion(false));
        };
    }, [cuadranteRegistrado]);

    useEffect(() => {
        const fetchData = () => {
            dispatch(setOpenLoadingAccion(true));
            if (centroAGestionar.nombre !== '') {
                dispatch(centroAGestionarInicioAccion());
            };
            dispatch(setOpenLoadingAccion(false));
        }
        fetchData();
    }, [centroAGestionar]);

    useEffect(() => {
        if (trabajadorAGestionar.nombre !== '') {
            dispatch(gestionTrabajadorAccion());
        };
    }, [trabajadorAGestionar]);

    useEffect(() => {
        if (suplenteAGestionar.nombre !== '') {
            dispatch(gestionSuplenteAccion());
        };
    }, [suplenteAGestionar]);

    useEffect(() => {
        if (cuadrante.length > 0) {
            dispatch(setArrayDatosInformeAccion(dispatch(gestionarInformeAccion())));
            // if (estamosActualizandoCuadrante.estado) {
            //     handleActualizarTrabajadoresGeneral();
            // };
        };
    }, [cuadrante]);

    useEffect(() => {
        if (cuadrante.length > 0 || cuadranteServiciosFijos.length > 0) {
            redimensionarEspacio();
        };
    }, [cuadrante.length, cuadranteServiciosFijos.length, visibleCuadranteServiciosFijos, visibleCuadrante]);

    //secuencia venimos de pendientes o registrados

    useEffect(() => {
        if (estadoVenimosDePendientes) {
            if (centro) {
                dispatch(obtenerCategoriaPorCentroAccion('centros', centro, 0));
            };
            dispatch(venimosDePendientesAccion(false));
        }
    }, [estadoVenimosDePendientes]);

    useEffect(() => {
        if (estadoVenimosDeRegistrados) {
            if (centro) {
                dispatch(obtenerCategoriaPorCentroAccion('centros', centro, 0));
                const nombreCuadrante = calendarioAGestionar + '-' + centro;
                dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
            };
            dispatch(venimosDeRegistradosAccion(false));
        }
    }, [estadoVenimosDeRegistrados]);

    useEffect(() => {
        if (categoriaPorCentro) {
            dispatch(setCategoriaAccion(categoriaPorCentro));
            dispatch(obtenerCentrosPorCategoriaAccion('centros', categoriaPorCentro));
            dispatch(setDisableSelectCentrosAccion(false));
        };
    }, [categoriaPorCentro]);

    useEffect(() => {
        if (venimosDeCambioCuadrante) {
            let existeCuadrante = false;
            let existeCuadranteSF = false;
            if (objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral) {
                existeCuadrante = true;
            };
            if (objetoCuadrante.datosServicios.datosServicios[cuadranteEnUsoCuadrantes - 1] && objetoCuadrante.datosServicios.datosServicios[cuadranteEnUsoCuadrantes - 1].length > 0) {
                existeCuadranteSF = true;
            };
            if ((cuadrante.length > 0 && cuadranteServiciosFijos.length > 0 && existeCuadrante && existeCuadranteSF) ||
                (cuadrante.length > 0 && !existeCuadranteSF) ||
                (cuadranteServiciosFijos.length > 0 && !existeCuadrante)) {
                dispatch(setVenimosDeCambioCuadranteAccion(false));
                if (numeroCuadrantesCuadrantes.length > 1) {
                    dispatch(configuraStateFestivoAccion());
                    dispatch(traspasoBufferFestivosAccion(false));
                };
            };
        };
    }, [venimosDeCambioCuadrante, cuadrante, cuadranteServiciosFijos]);

    //secuencia alertas

    useEffect(() => {
        if (alerta.abierto) {
            setAlert({
                mensaje: alerta.mensaje,
                tipo: alerta.tipo
            })
            setOpenSnack(true);
        }
    }, [alerta]);

    useEffect(() => {
        if (errorDeCargaCuadrantes || errorDeCargaTrabajadores || errorDeCargaCentros) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaCuadrantes, errorDeCargaTrabajadores, errorDeCargaCentros]);

    useEffect(() => {
        if (exitoActualizacionCuadrante) {
            setAlert({
                mensaje: "Registro actualizado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoActualizacionCuadrante]);

    useEffect(() => {
        if (exitoRegistroCuadrante) {
            setAlert({
                mensaje: "Registro creado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoRegistroCuadrante]);

    useEffect(() => {
        if (exitoResetearCuadrante) {
            setAlert({
                mensaje: "Registro reseteado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoResetearCuadrante]);

    useEffect(() => {
        if (exitoGenerarArchivos) {
            setAlert({
                mensaje: "Archivos para FACTUSOL generados exitosamente, revisa la carpeta de descargas para localizar: FAC.xls y LFA.xls.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoGenerarArchivos]);

    useEffect(() => {
        if (!openLoadingCentros || !openLoadingTrabajadores || !openLoadingCuadrantes) {
            dispatch(setOpenLoadingAccion(false));
        } else {
            dispatch(setOpenLoadingAccion(true));
        }
    }, [openLoadingCentros, openLoadingTrabajadores, openLoadingCuadrantes]);

    useEffect(() => {
        if (openDialog8)
            dispatch(generaInformacionCuadrantesAccion());
    }, [openDialog8]);

    //funciones   

    const redimensionarEspacio = () => {
        let dimServiciosAnadir = 0;
        let dimCuadrante = 0;
        let serviciosActivos = 0;
        let cuadrantesActivos = 0;
        if (cuadranteServiciosFijos.length > 0 && visibleCuadranteServiciosFijos) {
            cuadranteServiciosFijos.forEach((servicio) => {
                for (const prop in servicio) {
                    if (prop.includes('activo') && servicio[prop] === 'si') {
                        dimServiciosAnadir += 165;
                        serviciosActivos += 1;
                    };
                };
            })
        };
        if (cuadrante.length > 0 && visibleCuadrante) {
            cuadrante.forEach((columna) => {
                dimCuadrante += 350;
                cuadrantesActivos += 1;
            })
        };
        const { innerWidth: finestraWidth } = window;
        const ampleAGestionar = finestraWidth - 500;
        if ((dimCuadrante + dimServiciosAnadir) > ampleAGestionar) {
            setDimensionsColumna({ width: ((ampleAGestionar / (serviciosActivos + cuadrantesActivos)) - 5) });
            setDimensionsColumnaServiciosFijos({ width: ((ampleAGestionar / (serviciosActivos + cuadrantesActivos)) - 5) });
            if (ampleAGestionar / cuadrante.length < 225) {
                dispatch(setEstadoFlexAccion('columna'));
            } else {
                dispatch(setEstadoFlexAccion('fila'));
            }
        } else {
            if (dimensionsColumna.width < 350) {
                if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
                    setDimensionsColumna({ width: 350 });
                    setDimensionsColumnaServiciosFijos({ width: 165 });
                }
                dispatch(setEstadoFlexAccion('fila'));
            };
            if (dimensionsColumnaServiciosFijos.width < 165) {
                if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
                    setDimensionsColumnaServiciosFijos({ width: 165 });
                };
            };
        };
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
        dispatch(setAlertaAccion({
            abierto: false,
            mensaje: '',
            tipo: ''
        }));
    };

    //retorno componentes    

    const retornaInformacionCuadrantes = () => {
        return (
            <Fragment>
                <Divider />
                <Grid container spacing={2} className={classes.mb25}>
                    <Box
                        p={2}
                        mt={2}
                    >
                        {arrayInformeLineas.map((linea, index) => {
                            if (linea[0] === 'divider') {
                                return <Box key={'divider' + index} className={classes.mb25}></Box>
                            } else {
                                return <Typography className={linea[1] === 'error' ? classes.vermell : null} key={'tipo' + index} variant='body1'>{linea[0]}</Typography>
                            }
                        })}
                    </Box>
                </Grid>
            </Fragment>
        )
    };

    //dialog

    const tituloDialogCuadrantes1 = "¿Estás seguro que quieres resetear el Cuadrante?";
    const descripcionDialogCuadrantes1 = "Para volver el cuadrante a sus valores iniciales pulsa 'De acuerdo', de lo contrario pulsa 'No'.";
    const tituloDialogCuadrantes2 = "Registra el cuadrante";
    const descripcionDialogCuadrantes2 = "Debes registrar el cuadrante nuevo antes de cambiar. Pulsa 'Registrar Cuadrante' en el menú superior.";
    const tituloDialogCuadrantes3 = "¿Estás seguro que quieres cambiar de pantalla?";
    const descripcionDialogCuadrantes3 = "Estás tratando de cambiar de pantalla pero no has registrado los datos de tu última intervención. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'No' y registra los datos.";
    const tituloDialogCuadrantes4 = 'Informe Cuadrante de Servicio';
    const descripcionDialogCuadrantes4 = retornaInformacionCuadrantes();
    const tituloDialogCuadrantes5 = "¿Estás seguro que quieres borrar el Cuadrante en uso?";
    const descripcionDialogCuadrantes5 = "Estás tratando de borrar el cuadrante nº " + cuadranteEnUsoCuadrantes + " de la serie del Centro " + centroAGestionar.nombre + ". Si estás conforme pulsa 'De acuerdo', de lo contrario pulsa 'No'.";

    const retornaCasillasDias = (dia, index) => {
        let postRef = dia[1][0] + dia[0][0];
        return (
            <Grid
                container
                direction="column"
                justifycontent="flex-start"
                alignItems="flex-start"
                key={dia[0][0]}
            >
                <Box
                    m={0.3}
                    p={1.5}
                    className={clsx(classes.inicio, classes.blanc, classes.mb_5, dia[1][0] === 'Sábado' || dia[1][0] === 'Domingo' || stateFestivo['estadoFestivoDia' + (index + 1)] ? classes.diaFestivo : classes.diaLaboral)}
                    onClick={(event) => dispatch(abrePopoverDiasAccion(postRef, index, dia[1][0], event, scrollable, classesDisp))}
                >
                    <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{dia[1][0] + ', ' + dia[0][0]}</Typography>
                </Box>
            </Grid>
        )
    };

    const retornaCasillasGeneral = (dia, indexDia, columna, indexColumna) => {
        let postRef = dia[1][0] + dia[0][0];
        return (
            <Grid
                container
                direction="column"
                justifycontent="flex-start"
                alignItems="flex-start"
                key={'Columna_' + (indexColumna + 1) + '_' + dia[0][0]}
            >
                < Box
                    m={0.3}
                    p={1.5}
                    ref={ref => { boxes.current[indexColumna] = ref }}
                    className={gestionaClassesColoresGeneralAccion(indexDia + 1, columna[postRef].baja, columna[postRef].modificado, columna.nombreTrabajador) || null}
                    style={{ width: dimensionsColumna.width, display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
                    onClick={(event) => dispatch(abrePopoverGeneralAccion(postRef, indexDia, dia[1][0], columna, indexColumna, indexColumna, event, scrollable, boxes, classes))}
                >
                    <Grid item xs={10}>
                        <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillasAccion(indexDia + 1, postRef, columna, dia[1][0])}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {columna[postRef].observaciones && !columna[postRef].festivo && !columna[postRef].baja ? (
                                <Tooltip title={columna[postRef].observaciones} placement="top-end" arrow >
                                    <ChatIcon
                                        className={classes.gris}
                                    />
                                </Tooltip>
                            ) : null}
                            {columna[postRef].tipoVariacion && !columna[postRef].festivo && !columna[postRef].baja ? (
                                retornaIconoVariacionAccion(columna, postRef, dia[1][0])
                            ) : null}
                            {columna[postRef].tipoServicio && !columna[postRef].festivo && !columna[postRef].baja ? (
                                retornaIconoTipoServicioAccion(columna[postRef].tipoServicio)
                            ) : null}
                        </Box>
                    </Grid>
                </Box >
            </Grid>
        )
    };

    const retornaCasillasServiciosFijos = (dia, indexDia, servicio, indice) => {
        let tipo = servicio.tipoServiciofijo;
        let postRef = dia[1][0] + dia[0][0];
        let hayServicio = false;
        let precio = '';
        for (const prop in servicio) {
            if (prop === postRef && servicio[prop] !== 'anulado') {
                hayServicio = true;
                if (servicio['precioHora_TO']) {
                    precio = servicio['precioHora_TO'];
                };
                if (servicio['precioHora_CR']) {
                    precio = servicio['precioHora_CR'];
                };
                if (servicio['precioHora_CE']) {
                    precio = servicio['precioHora_CE'];
                };
                if (servicio['precioHora_CI']) {
                    precio = servicio['precioHora_CI'];
                };
                if (servicio['precioHora_MO']) {
                    precio = servicio['precioHora_MO'];
                };
                if (servicio['precioHora_OF']) {
                    precio = servicio['precioHora_OF'];
                };
                if (servicio['precioHora_AL']) {
                    precio = servicio['precioHora_AL'];
                };
                if (servicio['precioHora_LA']) {
                    precio = servicio['precioHora_LA'];
                };
                if (servicio['precioHora_TE']) {
                    precio = servicio['precioHora_TE'];
                };
                if (servicio['precioHora_FI']) {
                    precio = servicio['precioHora_FI'];
                };
                if (servicio['precioHora_FE']) {
                    precio = servicio['precioHora_FE'];
                };
                if (servicio['precioHora_AB']) {
                    precio = servicio['precioHora_AB'];
                };
                if (servicio['precioHora_MA']) {
                    precio = servicio['precioHora_MA'];
                };
                if (servicio['precioHora_PO']) {
                    precio = servicio['precioHora_PO'];
                };
                if (servicio['precioHora_BA']) {
                    precio = servicio['precioHora_BA'];
                };
                if (servicio['precioHora_FT']) {
                    precio = servicio['precioHora_FT'];
                };
                if (servicio['precioHora_C3']) {
                    precio = servicio['precioHora_C3'];
                };
                if (servicio['precioHora_C2']) {
                    precio = servicio['precioHora_C2'];
                };
                if (servicio['precioHora_ES']) {
                    precio = servicio['precioHora_ES'];
                };
                if (servicio['precioHora_PA']) {
                    precio = servicio['precioHora_PA'];
                };
            };
        };
        if (servicio.activo_TO === 'si' ||
            servicio.activo_CR === 'si' ||
            servicio.activo_CE === 'si' ||
            servicio.activo_CI === 'si' ||
            servicio.activo_MO === 'si' ||
            servicio.activo_OF === 'si' ||
            servicio.activo_AL === 'si' ||
            servicio.activo_LA === 'si' ||
            servicio.activo_TE === 'si' ||
            servicio.activo_FI === 'si' ||
            servicio.activo_FE === 'si' ||
            servicio.activo_AB === 'si' ||
            servicio.activo_MA === 'si' ||
            servicio.activo_PO === 'si' ||
            servicio.activo_BA === 'si' ||
            servicio.activo_FT === 'si' ||
            servicio.activo_C3 === 'si' ||
            servicio.activo_C2 === 'si' ||
            servicio.activo_ES === 'si' ||
            servicio.activo_PA === 'si') {
            return (
                <Grid
                    container
                    direction="column"
                    justifycontent="flex-start"
                    alignItems="flex-start"
                    key={'Columna_sf' + (indexDia)}
                >
                    <PopupState variant="popover" >
                        {(popupState) => (
                            <div>
                                < Box
                                    m={0.3}
                                    p={1.5}
                                    className={gestionaClassesColoresServiciosFijosAccion(indexDia + 1, hayServicio) || null}
                                    style={{ width: dimensionsColumnaServiciosFijos.width }}
                                    {...bindTrigger(popupState)}
                                >
                                    <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillasServiciosFijosAccion(indexDia + 1, precio)}</Typography>
                                </Box >
                                <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left"
                                    }}
                                    PaperProps={{
                                        style: {
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                            borderRadius: 0
                                        }
                                    }}
                                >
                                    <Box
                                        className={classes.tooltip}
                                        style={{ width: dimensionsColumnaServiciosFijos.width }}>
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Switch
                                                    checked={cuadranteServiciosFijos[indice]['estados']['estadoCasillaDia' + (indexDia + 1)] || false}
                                                    onChange={(event) => dispatch(handleChangeSFCasillasAccion(postRef, indice, tipo, event)) || null}
                                                />
                                            </Grid>
                                            <Grid item><Typography variant="body2" color="textPrimary">Ina./Act.</Typography></Grid>
                                        </Grid>
                                    </Box>
                                </Popover>
                            </div>
                        )}
                    </PopupState>
                </Grid>
            )
        };
    };

    const retornaBotonVisibleCuadrante = () => {
        let mostramos;
        if (cuadrante.length && cuadranteServiciosFijos.length > 0 && visibleCuadranteServiciosFijos) {
            if (cuadranteServiciosFijos.length === 1) {
                if (
                    cuadranteServiciosFijos[0].activo_TO === 'no' ||
                    cuadranteServiciosFijos[0].activo_CR === 'no' ||
                    cuadranteServiciosFijos[0].activo_CE === 'no' ||
                    cuadranteServiciosFijos[0].activo_CI === 'no' ||
                    cuadranteServiciosFijos[0].activo_MO === 'no' ||
                    cuadranteServiciosFijos[0].activo_OF === 'no' ||
                    cuadranteServiciosFijos[0].activo_AL === 'no' ||
                    cuadranteServiciosFijos[0].activo_LA === 'no' ||
                    cuadranteServiciosFijos[0].activo_TE === 'no' ||
                    cuadranteServiciosFijos[0].activo_FI === 'no' ||
                    cuadranteServiciosFijos[0].activo_FE === 'no' ||
                    cuadranteServiciosFijos[0].activo_AB === 'no' ||
                    cuadranteServiciosFijos[0].activo_MA === 'no' ||
                    cuadranteServiciosFijos[0].activo_PO === 'no' ||
                    cuadranteServiciosFijos[0].activo_BA === 'no' ||
                    cuadranteServiciosFijos[0].activo_FT === 'no' ||
                    cuadranteServiciosFijos[0].activo_C3 === 'no' ||
                    cuadranteServiciosFijos[0].activo_C2 === 'no' ||
                    cuadranteServiciosFijos[0].activo_ES === 'no' ||
                    cuadranteServiciosFijos[0].activo_PA === 'no'
                ) {
                    mostramos = false;
                } else {
                    mostramos = true;
                }
            } else {
                if (cuadranteServiciosFijos.length > 1) {
                    mostramos = true;
                }
            }
        } else {
            mostramos = false;
        };
        if (mostramos) {
            return (
                visibleCuadrante ? (
                    <Tooltip title="Ocultar columnas trabajadores" placement="right" arrow>
                        <Avatar
                            style={{ cursor: 'pointer' }}
                            className={clsx(classes.small3, classes.trabajador)}
                            id='ocultarTrabajadores'
                            onClick={() => dispatch(setVisibleCuadranteAccion(false))}
                        >
                            <VisibilityIcon
                                style={{ fontSize: 22 }}
                            />
                        </Avatar>
                    </Tooltip>
                ) : (
                    <Tooltip title="Mostrar columnas trabajadores" placement="right" arrow>
                        <Avatar
                            style={{ cursor: 'pointer' }}
                            className={clsx(classes.small3, classes.trabajador)}
                            onClick={() => dispatch(setVisibleCuadranteAccion(true))}
                        >
                            <VisibilityOffIcon
                                style={{ fontSize: 22 }}
                            />
                        </Avatar>
                    </Tooltip>
                )
            )
        } else {
            return (
                <Avatar
                    className={clsx(classes.small3)}
                    disabled={true}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25' }}
                >
                    <VisibilityIcon
                        style={{ fontSize: 22, color: 'rgba(255, 255, 255, 0.45' }}
                    />
                </Avatar>
            )
        }
    };

    const retornaBotonVisibleCuadranteSF = () => {
        let mostramos;
        if (cuadranteServiciosFijos.length > 0 && cuadrante.length > 0 && visibleCuadrante) {
            if (cuadranteServiciosFijos.length === 1) {
                if (
                    cuadranteServiciosFijos[0].activo_TO === 'no' ||
                    cuadranteServiciosFijos[0].activo_CR === 'no' ||
                    cuadranteServiciosFijos[0].activo_CE === 'no' ||
                    cuadranteServiciosFijos[0].activo_CI === 'no' ||
                    cuadranteServiciosFijos[0].activo_MO === 'no' ||
                    cuadranteServiciosFijos[0].activo_OF === 'no' ||
                    cuadranteServiciosFijos[0].activo_AL === 'no' ||
                    cuadranteServiciosFijos[0].activo_LA === 'no' ||
                    cuadranteServiciosFijos[0].activo_TE === 'no' ||
                    cuadranteServiciosFijos[0].activo_FI === 'no' ||
                    cuadranteServiciosFijos[0].activo_FE === 'no' ||
                    cuadranteServiciosFijos[0].activo_AB === 'no' ||
                    cuadranteServiciosFijos[0].activo_MA === 'no' ||
                    cuadranteServiciosFijos[0].activo_PO === 'no' ||
                    cuadranteServiciosFijos[0].activo_BA === 'no' ||
                    cuadranteServiciosFijos[0].activo_FT === 'no' ||
                    cuadranteServiciosFijos[0].activo_C3 === 'no' ||
                    cuadranteServiciosFijos[0].activo_C2 === 'no' ||
                    cuadranteServiciosFijos[0].activo_ES === 'no' ||
                    cuadranteServiciosFijos[0].activo_PA === 'no'
                ) {
                    mostramos = false;
                } else {
                    mostramos = true;
                }
            } else {
                if (cuadranteServiciosFijos.length > 1) {
                    mostramos = true;
                }
            }
        } else {
            mostramos = false;
        };
        if (mostramos) {
            return (
                visibleCuadranteServiciosFijos ? (
                    <Tooltip title="Ocultar columnas servicios extra" placement="right" arrow>
                        <Avatar
                            style={{ cursor: 'pointer' }}
                            className={clsx(classes.small3, classes.cabeceraServicios)}
                            onClick={() => dispatch(setVisibleCuadranteServiciosFijosAccion(false))}
                        >
                            <VisibilityIcon
                                style={{ fontSize: 22 }}
                            />
                        </Avatar>
                    </Tooltip>
                ) : (
                    <Tooltip title="Mostrar columnas servicios extra" placement="right" arrow>
                        <Avatar
                            style={{ cursor: 'pointer' }}
                            className={clsx(classes.small3, classes.cabeceraServicios)}
                            onClick={() => dispatch(setVisibleCuadranteServiciosFijosAccion(true))}
                        >
                            <VisibilityOffIcon
                                style={{ fontSize: 22 }}
                            />
                        </Avatar>
                    </Tooltip>
                )
            )
        } else {
            return (
                <Avatar
                    className={clsx(classes.small3)}
                    disabled={true}
                    style={{ backgroundColor: 'rgba(0, 150, 136, 0.25' }}
                >
                    <VisibilityIcon
                        style={{ fontSize: 22, color: 'rgba(255, 255, 255, 0.45' }}
                    />
                </Avatar>
            )
        }
    };

    const retornaCuadranteCompleto = () => {
        return (
            <Grid
                className={clsx(classes.scrollable, classes.scrollableScroll)}
                ref={scrollable}
                style={{ height: heightScrollable }}
            >
                <Box
                    p={0}
                    mt={0}
                >
                    <Grid
                        container
                        direction="row"
                        justifycontent="flex-start"
                        alignItems="flex-start"
                        style={{ position: 'fixed', zIndex: 3, marginTop: -45 }}
                    >
                        <Box
                            p={1.5}
                            mx={0.3}
                            className={clsx(classes.cabecera, classes.inicio)}
                            color="secondary.contrastText"
                            style={{ minHeight: 38, maxHeight: 38, padding: 9, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <Typography variant="body2">Cuadrante</Typography>
                            <Avatar
                                className={clsx(classes.small4, classes.suplente)}
                            >
                                <Typography variant='body2' color="initial">{cuadranteEnUsoCuadrantes}</Typography>
                            </Avatar>
                        </Box>
                        {visibleCuadranteServiciosFijos ? (
                            cuadranteServiciosFijos.length > 0 ? (
                                cuadranteServiciosFijos.map((servicio, index) => (
                                    retornaHeaderServiciosFijosAccion(servicio, index, dimensionsColumnaServiciosFijos.width)
                                ))
                            ) : null
                        ) : null}
                        {visibleCuadrante ? (
                            cuadrante.length > 0 ? (
                                <Fragment>
                                    {cuadrante.map((columnaCabecera, index) => (
                                        <Box
                                            key={`box_header_` + (index + 1)}
                                            mx={0.3}
                                        >
                                            <Accordion
                                                expanded={expandedAccordion === 'panel_' + (index + 1)}
                                                className={gestionaClassesColoresTrabajadoresAccion(columnaCabecera.tipoTrabajador)}
                                                style={{ width: dimensionsColumna.width }}
                                                onChange={(e, expandedAccordion) => { dispatch(handleCambioAccordionHeaderAccion(expandedAccordion, 'panel_' + (index + 1), index, scrollable, classesDisp)) }}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                                                >
                                                    <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{columnaCabecera.nombreTrabajador}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container className={classes.mt5}>
                                                        <Grid
                                                            container
                                                            direction="column"
                                                            justifycontent="flex-start"
                                                            alignItems="flex-start"
                                                        >
                                                            <Box
                                                                style={{ width: '100%', display: 'flex' }}
                                                                className={estadoFlex === 'fila' ? classes.flexRow : classes.flexColumn}
                                                            >
                                                                <Grid item xs={false}>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Box
                                                                        display="flex"
                                                                        alignItems="center"
                                                                        justifyContent="flex-end"
                                                                    >
                                                                        <Tooltip title={columnaCabecera.nombreTrabajador ? "Añadir suplente" : ""} placement="top-end" arrow>
                                                                            <div>
                                                                                <IconButton
                                                                                    className={clsx(classes.btnAddSuplente, classes.blanc, classes.mb10)}
                                                                                    onClick={() => dispatch(handleClickAddColumnaAccion('suplente', index, scrollable, classesDisp))}
                                                                                    disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                                >
                                                                                    <PersonAddIcon style={{ fontSize: 18 }} />
                                                                                </IconButton>
                                                                            </div>
                                                                        </Tooltip>
                                                                        <Tooltip title={columnaCabecera.nombreTrabajador ? "Limpiar horario columna" : ""} placement="top-end" arrow>
                                                                            <div>
                                                                                <IconButton
                                                                                    className={clsx(classes.btnLimpieza, classes.blanc, classes.mb10)}
                                                                                    size="small"
                                                                                    onClick={() => dispatch(handleLimpiezaHorarioAccion(index))}
                                                                                    disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                                >
                                                                                    <RemoveCircleOutlineIcon />
                                                                                </IconButton>
                                                                            </div>
                                                                        </Tooltip>
                                                                        <Tooltip title={columnaCabecera.nombreTrabajador ? "Actualizar trabajador" : ""} placement="top-end" arrow>
                                                                            <div>
                                                                                <IconButton
                                                                                    className={clsx(classes.btnVariacion, classes.blanc, classes.mb10)}
                                                                                    size="small"
                                                                                    onClick={() => dispatch(handleActualizarTrabajadoresAccion(index, columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador))}
                                                                                    disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                                >
                                                                                    <CachedIcon />
                                                                                </IconButton>
                                                                            </div>
                                                                        </Tooltip>
                                                                        <Tooltip title="Eliminar trabajador" placement="top-end" arrow>
                                                                            <IconButton
                                                                                className={clsx(classes.btnError, classes.mb10)}
                                                                                size="small"
                                                                                onClick={() => dispatch(eliminarColumnaAccion(index, columnaCabecera.idTrabajador, scrollable, classesDisp))}
                                                                            >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Box>
                                                                </Grid>
                                                            </Box>
                                                            <FormControl
                                                                variant="outlined"
                                                                fullWidth
                                                                className={classes.mt15}
                                                                size="small"
                                                            >
                                                                <InputLabel>{(columnaCabecera.tipoTrabajador === 'trabajador' || !columnaCabecera.tipoTrabajador) ? 'Trabajador' : 'Suplente'}</InputLabel>
                                                                <Select
                                                                    id={`form-trabajador-` + (index + 1)}
                                                                    value={columnaCabecera.idTrabajador < 1000 ? columnaCabecera.idTrabajador : ''}
                                                                    onChange={(event) => dispatch(handleChangeFormTrabajadoresAccion(index, columnaCabecera.tipoTrabajador, event))}
                                                                    onOpen={() => dispatch(setValorPrevioAccordionAbiertoAccion(columnaCabecera.idTrabajador))}
                                                                    input={
                                                                        <OutlinedInput
                                                                            labelWidth={80}
                                                                        />
                                                                    }
                                                                >
                                                                    {listadoTrabajadores.map((option) => (
                                                                        <MenuItem key={option.id} value={option.id}>
                                                                            {option.nombre}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl
                                                                variant="outlined"
                                                                fullWidth
                                                                className={classes.mt15}
                                                                size="small"
                                                            >
                                                                <InputLabel>Modo entrada datos</InputLabel>
                                                                <Select
                                                                    id="form-tipo-cuadrantes"
                                                                    label="Modo entrada datos"
                                                                    value={columnaCabecera.tipoHorario || ''}
                                                                    onChange={(event) => dispatch(handleChangeTipoHorarioAccion(index, event))}
                                                                    helpertext="Selecciona Modo entrada datos"
                                                                    disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                >
                                                                    {tipos.map((option) => (
                                                                        <MenuItem key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                    ))}
                                    <Box
                                        m={0.3}
                                    >
                                        <Tooltip title="Añadir trabajador" placement="right" arrow>
                                            <IconButton
                                                className={clsx(classes.btnAddTrabajador, classes.blanc)}
                                                onClick={() => dispatch(handleClickAddColumnaAccion('trabajador', null, scrollable, classesDisp))}
                                            >
                                                <PersonAddIcon style={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Fragment>
                            ) : null
                        ) : null}
                    </Grid>
                    <Grid container
                        style={{ marginTop: 45 }}
                    >
                        <Box>
                            {losDiasDelMes.map((dia, index) => (
                                retornaCasillasDias(dia, index)
                            ))}
                        </Box>
                        {visibleCuadranteServiciosFijos ? (
                            cuadranteServiciosFijos.length > 0 ? (
                                cuadranteServiciosFijos.map((servicio, indexColSF) => (
                                    <Box key={'box' + indexColSF}>
                                        {losDiasDelMes.map((dia, indexDia) => (
                                            retornaCasillasServiciosFijos(dia, indexDia, servicio, indexColSF)
                                        ))}
                                    </Box>
                                ))
                            ) : null
                        ) : null}
                        {visibleCuadrante ? (
                            cuadrante.length > 0 ? (
                                cuadrante.map((columna, indexColumna) => (
                                    <Box
                                        key={'Box_' + indexColumna}
                                    >
                                        {losDiasDelMes.map((dia, indexDia) => (
                                            retornaCasillasGeneral(dia, indexDia, columna, indexColumna)
                                        ))}
                                    </Box>
                                ))
                            ) : null
                        ) : null}
                    </Grid>
                </Box>
                <Tooltip title="Informe Cuadrante" placement="left" arrow>
                    <Fab
                        variant="extended"
                        className={classes.fab}
                        onClick={() => dispatch(handleClickOpenDialogCuadrantes4Accion())}
                    >
                        <Typography variant="body2" className={classes.typoFab}>{dispatch(retornaInfoFabButtonAccion())}</Typography>
                        <AssessmentIcon />
                    </Fab>
                </Tooltip>
            </Grid>
        )
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress disableShrink color="inherit" />
            </Backdrop>
            <Grid container spacing={2} style={{ marginTop: -13 }}>
                <Grid item xs={12}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={9}>
                            <Badge
                                overlap="circle"
                                classes={{
                                    badge:
                                        firmaActualizacion && centroAGestionar.nombre && intervencionRegistrada && objetoCuadrante.estado === 'facturado' ?
                                            classes.badgeVerd :
                                            firmaActualizacion && centroAGestionar.nombre && intervencionRegistrada && objetoCuadrante.estado === 'registrado' ?
                                                classes.badgeTaronja :
                                                firmaActualizacion && centroAGestionar.nombre && !intervencionRegistrada ?
                                                    classes.badgeVermell :
                                                    !firmaActualizacion && centroAGestionar.nombre ?
                                                        classes.badgeVermell :
                                                        classes.displayNone
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Chip style={{ padding: 5 }} icon={<AssignmentIcon />} label={`Gestión de cuadrantes ` + (
                                    centroAGestionar.nombre ?
                                        ' - Centro: ' + centroAGestionar.nombre + (
                                            firmaActualizacion && intervencionRegistrada && objetoCuadrante.estado === 'registrado' ?
                                                ' - Estado: Actualizado el ' + firmaActualizacion :
                                                firmaActualizacion && intervencionRegistrada && objetoCuadrante.estado === 'facturado' ?
                                                    ' - Estado: Facturado el ' + firmaActualizacion :
                                                    firmaActualizacion && !intervencionRegistrada ?
                                                        ' - Estado: Pendiente de actualizar' :
                                                        ' - Estado: Pendiente de registrar') :
                                        '')} />
                            </Badge>
                        </Grid>
                        <Grid item xs={3}>
                            <Box className={classes.alignRight}>
                                <FormControl
                                    className={classes.form}>
                                    <Button
                                        disabled={esInicioCuadrantes ? true : false}
                                        style={{ marginRight: 20, width: 250 }}
                                        variant="contained"
                                        color='primary'
                                        startIcon={<AssignmentIcon />}
                                        onClick={(event) => dispatch(handleClickMenuAccion(event))}
                                    >
                                        Gestión cuadrantes
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorElMenu}
                                        keepMounted
                                        open={Boolean(anchorElMenu)}
                                        onClose={() => dispatch(handleCloseMenuAccion())}
                                    >
                                        <MenuItem
                                            onClick={() => dispatch(goToInicioCuadrantesAccion())}
                                        >
                                            <ListItemIcon>
                                                <HomeIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Inicio Cuadrantes" />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => dispatch(procesarDatosCuadranteAccion('normal'))}
                                            disabled={cuadranteRegistrado === 'si' ? disabledItemBotonActualizar : disabledItemBotonRegistrar}
                                        >
                                            <ListItemIcon>
                                                {cuadranteRegistrado === 'si' ? <SystemUpdateAltIcon fontSize="small" /> : <SaveIcon fontSize="small" />}
                                            </ListItemIcon>
                                            <ListItemText primary={cuadranteRegistrado === 'si' ? 'Actualizar Cuadrante' : 'Registrar Cuadrante'} />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => dispatch(handleClickFacturacionMenuAccion())}
                                            disabled={cuadranteRegistrado === 'no' ? true : false}
                                        >
                                            <ListItemIcon>
                                                <DescriptionIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Facturar" />
                                            {openFacturacion ? <ExpandLess /> : <ExpandMore />}
                                        </MenuItem>
                                        <Collapse in={openFacturacion} timeout="auto" unmountOnExit>
                                            <MenuItem
                                                className={classes.nested}
                                                onClick={() => dispatch(handleClickFacturarCuadranteAccion())}
                                            >
                                                <ListItemText primary="Registrar factura" />
                                            </MenuItem>
                                            <MenuItem
                                                className={classes.nested}
                                                onClick={() => dispatch(handleClickFacturacionInteriorMenuAccion())}
                                                disabled={objetoCuadrante.estado === 'facturado' ? false : true}
                                            >
                                                <ListItemText primary="Generar archivos" />
                                                {openFacturacionInterior ? <ExpandLess /> : <ExpandMore />}
                                            </MenuItem>
                                            <Collapse in={openFacturacionInterior} timeout="auto" unmountOnExit>
                                                <MenuItem
                                                    className={classes.nested}
                                                >
                                                    <FormControl
                                                        size="small"
                                                        style={{ marginRight: 15, width: 90, marginBottom: 5, }}
                                                    >
                                                        <Tooltip title="Último nº de factura emitida en FACTUSOL" placement="left" arrow>
                                                            <TextField
                                                                id="form-numero-factusol-cuadrantes"
                                                                value={numeroFactusol || ''}
                                                                onChange={(event) => dispatch(handleChangeFormNumumeroFactusolAccion(event))}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <EditIcon className={classes.colorText} />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </FormControl>
                                                    <ListItemText
                                                        onClick={() => dispatch(handleGenerarArchivosAccion())}
                                                        primary="Procesar"
                                                    />
                                                </MenuItem>
                                            </Collapse>
                                            {/* <MenuItem disabled={true} className={classes.nested}>                                                   
                                                    <ListItemText secondary="Imprimir factura" />
                                                </MenuItem> */}
                                        </Collapse>
                                        <MenuItem
                                            onClick={() => dispatch(handleClickOpenDialogCuadrantes1Accion())}
                                            disabled={disabledItemBotonResetear}
                                        >
                                            <ListItemIcon>
                                                <DeleteIcon style={{ color: 'red' }} fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText style={{ color: 'red' }} primary="Resetear Cuadrante" />
                                        </MenuItem>
                                    </StyledMenu>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Box>
                    <Box
                        className={classes.root1}
                        mt={2}
                        mb={3}
                    >
                        <Grid item xs={2}>
                            <Box pr={2}>
                                <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        size="small"
                                        views={['month', 'year']}
                                        inputVariant="outlined"
                                        fullWidth
                                        format="MM/yyyy"
                                        label="Mes a gestionar"
                                        minDate={new Date('2021-1')}
                                        maxDate={new Date(dispatch(gestionaMaxDateCalendarAccion(3)))}
                                        value={valueDatePicker}
                                        onChange={(newValue) => {
                                            dispatch(handleChangeSelectCalendarioAccion(newValue));
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box pr={2}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                >
                                    <InputLabel>Categoria Centro</InputLabel>
                                    <Select
                                        id="form-categorias"
                                        value={categoria}
                                        onChange={(event) => dispatch(handleChangeSelectCategoriaAccion(event))}
                                        input={
                                            <OutlinedInput
                                                labelWidth={130}
                                            />
                                        }
                                    >
                                        {categorias.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box pr={2}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    disabled={disableSelectCentros}
                                    size="small"
                                >
                                    <InputLabel>Centro</InputLabel>
                                    <Select
                                        id="form-centros"
                                        value={objetoCuadrante.datosCuadrante.centro || ''}
                                        onChange={(event) => dispatch(handleChangeSelectCentroAccion(event))}
                                        input={
                                            <OutlinedInput
                                                labelWidth={55}
                                            />
                                        }
                                    >
                                        {centrosPorCategoria.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box pr={2}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="space-between"
                                    alignItems="center"
                                    style={{ marginTop: -5 }}
                                >
                                    <ObjetosGestionCuadrantes
                                        prHandleClickOpenDialogCuadrantes5={() => dispatch(handleClickOpenDialogCuadrantes5Accion())}
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                    </Box>
                    {esInicioCuadrantes ? <PantallaCuadrantes /> : (
                        <Grid container
                            direction="row"
                            justifycontent="flex-start"
                            alignItems="flex-start"
                        >
                            {cuadrante.length > 0 || cuadranteVacio ? (
                                <Box>
                                    <Grid item
                                        style={{ width: 40, marginRight: 4, height: 38 }}
                                        className={classes.trabajador}
                                    >
                                        <Box
                                            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 4, cursor: 'pointer' }}
                                            onClick={(event) => dispatch(abrePopoverConfiguracionAccion(event, scrollable, classes))}
                                        >
                                            <Tooltip title="Ajustes cuadrante" placement="right" arrow>
                                                <SettingsIcon style={{ fontSize: 30 }} />
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                    <Grid item
                                        style={{ width: 40, marginRight: 4, marginTop: 9, paddingTop: 5, height: 122 }}
                                        className={classes.suplente}
                                    >
                                        <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 4 }}>
                                            {objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].observaciones ?
                                                (
                                                    <InfoTooltip title={objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].observaciones} placement="right" arrow>
                                                        <ChatIcon
                                                            style={{ fontSize: 28 }}
                                                            className={classes.groc}
                                                        />
                                                    </InfoTooltip>
                                                ) : (
                                                    <ChatIcon
                                                        style={{ fontSize: 28 }}
                                                        className={classes.grisClaro}
                                                    />
                                                )}
                                        </Box>
                                        <Box style={{ paddingLeft: 5, paddingRight: 5 }}>
                                            {retornaBotonVisibleCuadrante()}
                                        </Box>
                                        <Box style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 4 }}>
                                            {retornaBotonVisibleCuadranteSF()}
                                        </Box>
                                    </Grid>
                                    <Grid item
                                        style={{ width: 40, marginRight: 4, marginTop: 6, paddingTop: 5, height: heightScrollable - 47 - 128 }}
                                        className={retornoServiciosFijosEnLayoutAccion('grid', losServiciosFijos)}
                                    >
                                        <Box style={{ padding: 4 }}>
                                            <Tooltip title={retornoServiciosFijosEnLayoutAccion('tooltip', losServiciosFijos)} placement="right" arrow>
                                                <Avatar
                                                    style={{ cursor: 'pointer' }}
                                                    className={retornoServiciosFijosEnLayoutAccion('avatar', losServiciosFijos)}
                                                    onClick={(event) => dispatch(abrePopoverServiciosFijosAccion(event, scrollable, classes))}
                                                >
                                                    {retornoServiciosFijosEnLayoutAccion('icon', losServiciosFijos)}
                                                </Avatar>
                                            </Tooltip>
                                        </Box>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            {cuadranteServiciosFijos.length > 0 ? (
                                                cuadranteServiciosFijos.map((servicio, index) => (
                                                    retornaServiciosFijosEnLayoutAvatarsAccion(servicio, index)
                                                ))
                                            ) : null}
                                        </Box>
                                    </Grid>
                                </Box>
                            ) : null}
                            <Grid item xs>
                                {cuadrante.length > 0 || cuadranteVacio ? (
                                   retornaCuadranteCompleto()
                                ) : (
                                    <Grid
                                        spacing={1}
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                        p={2}
                                        style={{ minHeight: heightScrollable - 50, maxHeight: heightScrollable - 50, width: '100%' }}
                                    >
                                        <Box
                                            className={classes.centrado}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Popover
                open={openDias}
                anchorEl={anchorElDias}
                onClose={() => dispatch(handleClosePopoverDiasAccion(scrollable, classesDisp))}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 0
                    }
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: 165 }}>
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                            <Switch
                                checked={stateFestivo['estadoFestivoDia' + (variablesPopoverDias.index + 1)] || false}
                                onChange={(event) => dispatch(handleChangeFestivoDiaAccion(variablesPopoverDias.postRef, variablesPopoverDias.index + 1, variablesPopoverDias.dia, event))}
                                name={"estadoFestivoDia" + (variablesPopoverDias.index + 1)}
                            />
                        </Grid>
                        <Grid item><Typography variant="body2" color="textPrimary">Lab./Fes.</Typography></Grid>
                    </Grid>
                </Box>
            </Popover>
            <Popover
                open={openGeneral}
                anchorEl={anchorElGeneral}
                onClose={() => dispatch(handleClosePopoverGeneralAccion(scrollable, boxes, classes))}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: 'none',
                        borderRadius: 0
                    }
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: dimensionsColumna.width }}
                >
                    <Grid container className={classes.mt20}>
                        <Box style={{ width: '100%' }}>
                            {variablesPopoverGeneral.columna ? (
                                variablesPopoverGeneral.columna.tipoHorario === 'rango' ? (
                                    <Fragment>
                                        <ItemCuadrante
                                            prTipo={'rango'}
                                            prIdInicio={'timePickerInicio-' + variablesPopoverGeneral.postRef}
                                            prIdFin={'timePickerFin-' + variablesPopoverGeneral.postRef}
                                            prIndex={variablesPopoverGeneral.indexColumna}
                                            prValueTimePickerInicio={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prValueTimePickerFin={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 2) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={(index, elId, e) => dispatch(handleVisibleVariacionesAccion(index, elId, e))}
                                            prHandleChangeTipoVariaciones={(index, event) => dispatch(handleChangeTipoVariacionesAccion(index, event))}
                                            prHandleChangeTimePickerInicioCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerInicioCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeTimePickerFinCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerFinCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeObservaciones={(index, event) => dispatch(handleChangeObservacionesAccion(index, event))}
                                            prGestionItemPrevioEditando={(tipo, valores) => dispatch(gestionItemPrevioEditandoAccion(tipo, valores))}
                                            prHandleRegistrarCambioEnCasilla={(id, index, tipo) => dispatch(handleRegistrarCambioEnCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                        />
                                    </Fragment>
                                ) : variablesPopoverGeneral.columna.tipoHorario === 'cantidad' ? (
                                    <Fragment>
                                        <ItemCuadrante
                                            prTipo={'cantidad'}
                                            prIndex={variablesPopoverGeneral.indexColumna}
                                            prIdCantidad={'selectCantidad-' + variablesPopoverGeneral.postRef}
                                            prValueCantidadHoras={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={(index, elId, e) => dispatch(handleVisibleVariacionesAccion(index, elId, e))}
                                            prHandleChangeTipoVariaciones={(index, event) => dispatch(handleChangeTipoVariacionesAccion(index, event))}
                                            prHandleChangeSelectCantidad={(index, event) => dispatch(handleChangeSelectCantidadAccion(index, event))}
                                            prHandleChangeObservaciones={(index, event) => dispatch(handleChangeObservacionesAccion(index, event))}
                                            prGestionItemPrevioEditando={(tipo, valores) => dispatch(gestionItemPrevioEditandoAccion(tipo, valores))}
                                            prHandleRegistrarCambioEnCasilla={(id, index, tipo) => dispatch(handleRegistrarCambioEnCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                        />
                                    </Fragment>
                                ) : variablesPopoverGeneral.columna.tipoHorario === 'rangoDescanso' ? (
                                    <Fragment>
                                        <ItemCuadrante
                                            prTipo={'rangoDescanso'}
                                            prIndex={variablesPopoverGeneral.indexColumna}
                                            prIdInicio1={'timePickerInicio1Descanso-' + variablesPopoverGeneral.postRef}
                                            prIdFin1={'timePickerFin1Descanso-' + variablesPopoverGeneral.postRef}
                                            prIdInicio2={'timePickerInicio2Descanso-' + variablesPopoverGeneral.postRef}
                                            prIdFin2={'timePickerFin2Descanso-' + variablesPopoverGeneral.postRef}
                                            prValueTimePickerInicio1={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prValueTimePickerFin1={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 2) : null}
                                            prValueTimePickerInicio2={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 3) : null}
                                            prValueTimePickerFin2={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 4) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={(index, elId, e) => dispatch(handleVisibleVariacionesAccion(index, elId, e))}
                                            prHandleChangeTipoVariaciones={(index, event) => dispatch(handleChangeTipoVariacionesAccion(index, event))}
                                            prHandleChangeTimePickerInicioCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerInicioCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeTimePickerFinCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerFinCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeObservaciones={(index, event) => dispatch(handleChangeObservacionesAccion(index, event))}
                                            prGestionItemPrevioEditando={(tipo, valores) => dispatch(gestionItemPrevioEditandoAccion(tipo, valores))}
                                            prHandleRegistrarCambioEnCasilla={(id, index, tipo) => dispatch(handleRegistrarCambioEnCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                        />
                                    </Fragment>
                                ) : null
                            ) : null}

                        </Box>
                    </Grid>
                </Box>
            </Popover>
            <Popover
                open={openServiciosFijos}
                anchorEl={anchorElServiciosFijos}
                onClose={() => dispatch(handleClosePopoverServiciosFijosAccion(scrollable, classes))}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 0
                    }
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: 725, marginLeft: 10 }}>
                    <Box
                        m={0.5}
                        color="secondary.contrastText"
                        className={clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
                    >
                        Configuración servicios extra
                    </Box>
                    <Box style={{ height: heightScrollable - 150, marginRight: -5, paddingRight: 25 }} className={classes.scrollable} >
                        <ServiciosFijos
                            prItemEditandoServiciosFijos={itemEditandoServiciosFijos}
                            prHandleChangeFormConfiguracionServiciosFijos={(tipo, prop, event) => dispatch(handleChangeFormConfiguracionServiciosFijosAccion(tipo, prop, event))}
                            prGestionItemPrevioEditandoServiciosFijos={(valores) => dispatch(gestionItemPrevioEditandoServiciosFijosAccion(valores))}
                        />
                    </Box>
                    <Box px={0.5}>
                        <Button
                            className={classes.mt15}
                            disabled={disabledItem}
                            fullWidth
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<SaveIcon />}
                            onClick={() => dispatch(handleRegistrarCambioEnCasillaServiciosFijosAccion())}
                        >
                            Registrar cambio
                        </Button>
                    </Box>
                </Box>
            </Popover>
            <Popover
                open={openConfiguracion}
                anchorEl={anchorElConfiguracion}
                onClose={() => dispatch(handleClosePopoverConfiguracionAccion(scrollable, classes))}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 0
                    }
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: 350, marginLeft: 5 }}>
                    <Box
                        m={0.5}
                        color="secondary.contrastText"
                        className={clsx(classes.fondoAlta, classes.boxStl2, classes.mb15)}
                    >
                        Ajustes cuadrante
                    </Box>
                    <Box style={{ height: heightScrollable - 145, marginRight: -5, paddingRight: 10, paddingLeft: 5 }} className={classes.scrollable} >
                        <ConfiguracionCuadrante
                            prCentro={centroAGestionar}
                            prItemEditandoConfiguracion={itemEditandoConfiguracion}
                            prHandleChangeFormConfiguracionCuadrante={(prop, event) => dispatch(handleChangeFormConfiguracionCuadranteAccion(prop, event))}
                            prGestionItemPrevioEditandoConfiguracion={(valores) => dispatch(gestionItemPrevioEditandoConfiguracionAccion(valores))}
                            prCuadranteLength={cuadrante.length}
                            prCuadranteVacio={cuadranteVacio}
                        />
                    </Box>
                    <Box px={0.5}>
                        <Button
                            className={classes.mt15}
                            disabled={disabledItem}
                            fullWidth
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<SaveIcon />}
                            onClick={() => dispatch(handleRegistrarCambioEnCasillaConfiguracionAccion())}
                        >
                            Registrar cambio
                        </Button>
                    </Box>
                </Box>
            </Popover>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            <DialogComponente
                prIsOpen={openDialog4}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesCuadrantes1Accion(respuesta))}
                prTituloDialog={tituloDialogCuadrantes1}
                prDescripcionDialog={descripcionDialogCuadrantes1}
            />
            <DialogComponente
                prIsOpen={openDialog5}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesVacioAccion(respuesta))}
                prTituloDialog={tituloDialogCuadrantes2}
                prDescripcionDialog={descripcionDialogCuadrantes2}
                prNoTieneBotones={true}
            />
            <DialogComponente
                prIsOpen={openDialog7}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesCuadrantes3Accion(respuesta))}
                prTituloDialog={tituloDialogCuadrantes3}
                prDescripcionDialog={descripcionDialogCuadrantes3}
            />
            <DialogComponente
                prIsOpen={openDialog8}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesVacioAccion(respuesta))}
                prTituloDialog={tituloDialogCuadrantes4}
                prDescripcionDialog={descripcionDialogCuadrantes4}
                prNoTieneBotones={true}
                prFullWidth={true}
                prMaxWidth={true}
            />
            <DialogComponente
                prIsOpen={openDialog12}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesCuadrantes5Accion(respuesta))}
                prTituloDialog={tituloDialogCuadrantes5}
                prDescripcionDialog={descripcionDialogCuadrantes5}
            />
            {/* {console.log(stateFestivo)} */}
        </div >
    )
}

export default withRouter(Cuadrantes)