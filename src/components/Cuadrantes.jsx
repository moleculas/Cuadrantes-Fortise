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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Draggable from 'react-draggable';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//carga componentes
import ItemCuadrante from './ItemCuadrante';
import PantallaCuadrantes from './PantallaCuadrantes';
import DialogComponente from './DialogComponente';
import ServiciosFijos from './ServiciosFijos';
import ConfiguracionCuadrante from './ConfiguracionCuadrante';
import ObjetosGestionCuadrantes from './ObjetosGestionCuadrantes';

//helpers
import HelpersLayoutCuadrantes from './HelpersLayoutCuadrantes';

//pdf
import { pdf } from "@react-pdf/renderer";
import ReciboPDF from "./ReciboPDF";

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerCentrosPorCategoriaAccion } from '../redux/centrosDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { obtenerCategoriaPorCentroAccion } from '../redux/centrosDucks';
import { retornaAnoMesAccion } from '../redux/appDucks';
import { diasEnElMesAccion } from '../redux/appDucks';
import { diaDeLaSemanaAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { gestionaMaxDateCalendarAccion } from '../redux/appDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { obtenerTrabajadoresSubcategoriaAccion } from '../redux/trabajadoresDucks';
import {
    cambioEstadoInicioCuadrantesAccion,
    activarDesactivarCambioBotonRegistrarAccion,
    activarDesactivarCambioBotonResetearAccion,
    obtenerCuadranteAccion,
    actualizarObjetoCuadranteAccion,
    setCalendarioAGestionarAccion,
    setLosDiasDelMesAccion,
    setCategoriaAccion
} from '../redux/cuadrantesDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import { gestionarInformeAccion } from '../redux/cuadrantesColumnasDucks';
import { venimosDePendientesAccion } from '../redux/pendientesDucks';
import { venimosDeRegistradosAccion } from '../redux/pendientesDucks';
import {
    handleGenerarArchivosAccion,
    centroAGestionarInicioAccion,
    gestionaCuadranteIndividualAccion,
    procesarDatosCuadranteAccion,
    gestionTrabajadorAccion,
    gestionSuplenteAccion,
    gestionarDocumentosCuadranteAccion,
    resetPorCambioSecuenciaAccion
} from '../redux/cuadrantesGestionDucks';
import {
    setVenimosDeCambioCuadranteAccion,
    setEstamosActualizandoCuadranteSinCargaAccion,
    setValorPrevioAccordionAbiertoAccion,
    setControladorDeEstadoAccion,
    setVisibleCuadranteAccion,
    setVisibleCuadranteServiciosFijosAccion,
    setOpenLoadingAccion,
    setAlertaAccion,
    reseteaContenidoCuadranteAccion,
    setDisableSelectCentrosAccion,
    setPreValueCalendarioAGestionarReseteoAccion,
    setVenimosBorrarCuadranteAccion,
    setDisableCargandoAccion,
    setCambioSFAccion,
    setVenimosDeCambioCentroSelectAccion,
    setCambioRedimensionColumnaAccion,
    setCambioSecuenciaSemanasAccion
} from '../redux/cuadrantesSettersDucks';
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
    handleResetearCasillaAccion,
    handleGestionarTamanoColumnaAccion
} from '../redux/cuadrantesHandlersDucks';
import {
    retornaInfoFabButtonAccion,
    generaInformacionCuadrantesAccion,
    handleClickFacturarCuadranteAccion,
    handleClickFacturacionMenuAccion,
    handleClickFacturacionInteriorMenuAccion,
    handleChangeFormNumumeroFactusolAccion,
    handleClickFacturarReciboCuadranteAccion
} from '../redux/cuadrantesFacturacionDucks';

//constantes
const categorias = Constantes.CATEGORIAS_CENTROS;
const tipos = Constantes.MODO_ENTRADA_HORARIOS;
const tipoFestivo = Constantes.TIPO_FESTIVO;

const getHeightScrollable = () => (window.innerHeight - 217) || (document.documentElement.clientHeight - 217) || (document.body.clientHeight - 217);

//accordion
const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        borderRadius: '0px !important',
    },
})(MuiAccordion);
const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12);',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
        borderRight: '1px solid rgba(0, 0, 0, 0.12);',
    },
}))(MuiAccordionDetails);
const AccordionSummary1 = withStyles({
    content: {
        alignItems: 'center',
    },
    root: {
        minHeight: 38,
        maxHeight: 38,
        '&.Mui-expanded': {
            minHeight: 38,
            maxHeight: 38,
        }
    }
})(MuiAccordionSummary);
const AccordionSummary2 = withStyles({
    content: {
        alignItems: 'center',
    },
    root: {
        minHeight: 48,
        maxHeight: 48,
        '&.Mui-expanded': {
            minHeight: 48,
            maxHeight: 48,
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
    const objetoCentro = useSelector(store => store.variablesCentros.objetoCentro);
    const objetoCuadrante = useSelector(store => store.variablesCuadrantes.objetoCuadrante);
    const cuadranteServiciosFijos = useSelector(store => store.variablesCuadrantesServiciosFijos.cuadranteServiciosFijos);
    const centrosPorCategoria = useSelector(store => store.variablesCentros.arrayCentrosPorCategoria);
    const logged = useSelector(store => store.variablesUsuario.activo);
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const openLoadingCuadrantes = useSelector(store => store.variablesCuadrantes.loadingCuadrantes);
    const trabajadorAGestionar = useSelector(store => store.variablesTrabajadores.objetoTrabajador);
    const suplenteAGestionar = useSelector(store => store.variablesTrabajadores.objetoSuplente);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
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
    const cuadranteBloqueado = useSelector(store => store.variablesCuadrantesSetters.cuadranteBloqueado);
    const disableCargando = useSelector(store => store.variablesCuadrantesSetters.disableCargando);
    const cambioSF = useSelector(store => store.variablesCuadrantesSetters.cambioSF);
    const yaNoEsInicio = useSelector(store => store.variablesCuadrantesSetters.yaNoEsInicio);
    const venimosDeCambioCentroSelect = useSelector(store => store.variablesCuadrantesSetters.venimosDeCambioCentroSelect);
    const cambioRedimensionColumna = useSelector(store => store.variablesCuadrantesSetters.cambioRedimensionColumna);
    const trabajadoresCargados = useSelector(store => store.variablesTrabajadores.trabajadoresCargados);
    const cambioSecuenciaSemanas = useSelector(store => store.variablesCuadrantesSetters.cambioSecuenciaSemanas);

    //parche para actualizar popovers
    const itemPrevioEditando = useSelector(store => store.variablesCuadrantesSetters.itemPrevioEditando);

    //para test 

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
        retornaServiciosFijosEnLayoutAvatarsAccion,
        retornaLabelChipAccion,
        retornaColorChipAccion,
        retornaAvatarChipAccion
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
    const [isDragging, setIsDragging] = useState(false);

    //parche para actualizar popovers
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    //mediaQueries

    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('desktop'));
    const alturaCasilla = () => {
        if (esDesktop) {
            return 38;
        } else {
            return 48;
        };
    };

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
        dispatch(setDisableCargandoAccion(true));
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

    //parche para actualizar popovers
    useEffect(() => {
        if (itemPrevioEditando) {
            forceUpdate()
        };
    }, [itemPrevioEditando]);

    useEffect(() => {
        dispatch(setCalendarioAGestionarAccion(retornaAnoMesAccion()));
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
        dispatch(onEstemAccion('cuadrantes'));
    }, [dispatch]);

    useEffect(() => {
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        } else {
            if (trabajadoresCargados) {
                dispatch(obtenerTrabajadoresSubcategoriaAccion(2));
            };
        };
    }, [listadoTrabajadores]);

    //secuencia gestión meses

    useEffect(() => {
        const diasMes = dispatch(diasEnElMesAccion(calendarioAGestionar));
        let myArrSplit = calendarioAGestionar.split("-");
        const anyoAGest = myArrSplit[0];
        const mesAGest = myArrSplit[1];
        let array = [];
        for (let i = 0; i < diasMes; i++) {
            const dateStr = mesAGest + '-' + (i + 1) + '-' + anyoAGest;
            array.push([[i + 1], [dispatch(diaDeLaSemanaAccion(dateStr))]]);
        };
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
        //dispatch(setDisableCargandoAccion(false));
    }, [objetoCuadrante]);

    useEffect(() => {
        dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: ultimoIdRegistrado }));
    }, [ultimoIdRegistrado]);

    useEffect(() => {
        if (cuadranteRegistrado === 'no') {
            if (!estadoVenimosDePendientes && !venimosDeCambioCuadrante) {
                dispatch(cambioEstadoInicioCuadrantesAccion(false));
                dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
                //dispatch(registrarIntervencionCuadranteNuevoAccion(false));
            };
            dispatch(obtenerCentroAccion('centros', centro));
            dispatch(activarDesactivarCambioBotonResetearAccion(true));
        };
        if (cuadranteRegistrado === 'si') {
            if (!estadoVenimosDeRegistrados && !venimosDeCambioCuadrante) {
                // dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, false));
                dispatch(cambioEstadoInicioCuadrantesAccion(false));
                dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
                //dispatch(registrarIntervencionCuadranteNuevoAccion(true));
            };
            dispatch(obtenerCentroAccion('centros', objetoCuadrante.datosCuadrante.centro));
            dispatch(activarDesactivarCambioBotonResetearAccion(false));
        };
    }, [cuadranteRegistrado]);

    useEffect(() => {
        let abortController = new AbortController();
        dispatch(setOpenLoadingAccion(true));
        if (objetoCentro.nombre !== '') {
            dispatch(centroAGestionarInicioAccion());
            if (venimosDeCambioCentroSelect) {
                if (centro) {
                    const nombreCuadrante = calendarioAGestionar + '-' + centro;
                    dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
                };
                dispatch(setVenimosDeCambioCentroSelectAccion(false));
            };
        };
        dispatch(setOpenLoadingAccion(false));
        return () => {
            abortController.abort();
        }
    }, [objetoCentro]);

    useEffect(() => {
        let abortController = new AbortController();
        if (trabajadorAGestionar.nombre !== '') {
            dispatch(gestionTrabajadorAccion());
        };
        return () => {
            abortController.abort();
        }
    }, [trabajadorAGestionar]);

    useEffect(() => {
        let abortController = new AbortController();
        if (suplenteAGestionar.nombre !== '') {
            dispatch(gestionSuplenteAccion());
        };
        return () => {
            abortController.abort();
        }
    }, [suplenteAGestionar]);

    useEffect(() => {
        let abortController = new AbortController();
        if (cuadrante.length > 0) {
            dispatch(gestionarInformeAccion(false));
        };
        return () => {
            abortController.abort();
        }
    }, [cuadrante]);

    useEffect(() => {
        if (cuadrante.length > 0 || cuadranteServiciosFijos.length > 0) {
            if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado && !yaNoEsInicio) {
                dispatch(configuraStateFestivoAccion());
            };
        };
    }, [cuadrante.length, cuadranteServiciosFijos.length]);

    useEffect(() => {
        if (cuadrante.length > 0 || cuadranteServiciosFijos.length > 0 || cambioSF || cambioRedimensionColumna) {
            redimensionarEspacio();
            if (cambioSF) {
                dispatch(setCambioSFAccion(false));
            };
            if (cambioRedimensionColumna) {
                dispatch(setCambioRedimensionColumnaAccion(false));
            };
        };
    }, [cuadrante.length, cuadranteServiciosFijos.length, visibleCuadranteServiciosFijos, visibleCuadrante, cambioSF, cambioRedimensionColumna]);

    //secuencia venimos de pendientes o registrados

    useEffect(() => {
        let abortController = new AbortController();
        if (estadoVenimosDePendientes) {
            if (centro) {
                dispatch(obtenerCategoriaPorCentroAccion('centros', centro, 0));
            };
            dispatch(venimosDePendientesAccion(false));
        };
        return () => {
            abortController.abort();
        }
    }, [estadoVenimosDePendientes]);

    useEffect(() => {
        let abortController = new AbortController();
        if (estadoVenimosDeRegistrados) {
            if (centro) {
                dispatch(obtenerCategoriaPorCentroAccion('centros', centro, 0));
                const nombreCuadrante = calendarioAGestionar + '-' + centro;
                dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
            };
            dispatch(venimosDeRegistradosAccion(false));
        };
        return () => {
            abortController.abort();
        }
    }, [estadoVenimosDeRegistrados]);

    useEffect(() => {
        let abortController = new AbortController();
        if (categoriaPorCentro) {
            dispatch(setCategoriaAccion(categoriaPorCentro));
            dispatch(obtenerCentrosPorCategoriaAccion('centros', categoriaPorCentro));
            dispatch(setDisableSelectCentrosAccion(false));
        };
        return () => {
            abortController.abort();
        }
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
                mensaje: "Archivos para FACTUSOL generados exitosamente, revisa la carpeta de descargas para localizar: FAC.xlsx y LFA.xlsx.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoGenerarArchivos]);

    useEffect(() => {
        if (cambioSecuenciaSemanas.inicial) {
            dispatch(resetPorCambioSecuenciaAccion());
            dispatch(setCambioSecuenciaSemanasAccion({ inicial: false, gestion: true }));
        };
    }, [cambioSecuenciaSemanas.inicial]);

    useEffect(() => {
        if (!openLoadingCentros || !openLoadingTrabajadores || !openLoadingCuadrantes) {
            dispatch(setOpenLoadingAccion(false));
        } else {
            dispatch(setOpenLoadingAccion(true));
        }
    }, [openLoadingCentros, openLoadingTrabajadores, openLoadingCuadrantes]);

    useEffect(() => {
        let abortController = new AbortController();
        if (openDialog8) {
            dispatch(generaInformacionCuadrantesAccion());
        };
        return () => {
            abortController.abort();
        }
    }, [openDialog8]);

    //funciones   

    const redimensionarEspacio = () => {
        let dimServiciosAnadir = 0;
        let dimCuadrante = 0;
        let serviciosActivos = 0;
        let cuadrantesActivos = 0;
        let cuadrantesActivosReducidos = 0;
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
                if (columna.reducido) {
                    dimCuadrante += 40;
                    cuadrantesActivosReducidos += 1;
                } else {
                    dimCuadrante += 350;
                    cuadrantesActivos += 1;
                };
            })
        };
        const { innerWidth: finestraWidth } = window;
        const ampleAGestionar = finestraWidth - 500;
        if ((dimCuadrante + dimServiciosAnadir) > ampleAGestionar) {
            setDimensionsColumna({ width: (((ampleAGestionar - (45 * cuadrantesActivosReducidos)) / (serviciosActivos + cuadrantesActivos)) - 5) });
            setDimensionsColumnaServiciosFijos({ width: (((ampleAGestionar - (45 * cuadrantesActivosReducidos)) / (serviciosActivos + cuadrantesActivos)) - 5) });
        } else {
            if (dimensionsColumna.width < 350) {
                if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
                    setDimensionsColumna({ width: 350 });
                    setDimensionsColumnaServiciosFijos({ width: 165 });
                }
            };
            if (dimensionsColumnaServiciosFijos.width < 165) {
                if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
                    setDimensionsColumnaServiciosFijos({ width: 165 });
                };
            };
        };
    };

    const gestionarReciboPDF = async () => {
        dispatch(gestionarDocumentosCuadranteAccion('recibo'));
        const myMesSplit = objetoCuadrante.nombre.split("-");
        const mes = myMesSplit[1];
        const element =
            <ReciboPDF
                objetoReciboPDF={objetoCuadrante.datosInforme.datosGestionEsp}
                mes={mes}
            />;
        const myPdf = pdf([]);
        myPdf.updateContainer(element);
        const blob = await myPdf.toBlob();
        if (blob) {
            let file = new File([blob], 'Recibo-' + objetoCuadrante.nombre + '.pdf', { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const pdfWindow = window.open();
            pdfWindow.location.href = fileURL;            
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
    const descripcionDialogCuadrantes5 = "Estás tratando de borrar el cuadrante nº " + cuadranteEnUsoCuadrantes + " de la serie del Centro " + objetoCentro.nombre + ". Si estás conforme pulsa 'De acuerdo', de lo contrario pulsa 'No'.";

    const retornaColorDiaFestivo = (dia) => {
        if (stateFestivo['tipoFestivoDia' + dia] === 2) {
            return classes.diaFestivoCierre
        } else if (stateFestivo['tipoFestivoDia' + dia] === 3) {
            return classes.diaFestivoCierreSinComputo
        } else {
            return classes.diaFestivo
        };
    };

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
                    className={clsx(classes.inicio, classes.blanc, classes.mb_5, dia[1][0] === 'Sábado' || dia[1][0] === 'Domingo' || stateFestivo['estadoFestivoDia' + (index + 1)] ? retornaColorDiaFestivo(dia[0][0]) : classes.diaLaboral)}
                    style={{ minHeight: alturaCasilla(), maxHeight: alturaCasilla(), display: 'flex', alignItems: 'center' }}
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
                {columna.reducido ? (
                    < Box
                        m={0.3}
                        p={1.5}
                        className={gestionaClassesColoresGeneralAccion(indexDia + 1, columna[postRef].baja, columna[postRef].modificado, columna.nombreTrabajador, columna[postRef].tipoBaja, columna[postRef].tipoVariacion) || null}
                        style={{ width: 40, minHeight: alturaCasilla(), maxHeight: alturaCasilla(), pointerEvents: 'none' }}
                    >
                    </Box>
                ) : (
                    < Box
                        m={0.3}
                        p={1.5}
                        ref={ref => { boxes.current[indexColumna] = ref }}
                        className={gestionaClassesColoresGeneralAccion(indexDia + 1, columna[postRef].baja, columna[postRef].modificado, columna.nombreTrabajador, columna[postRef].tipoBaja, columna[postRef].tipoVariacion) || null}
                        style={{ width: retornaAnchoColumna(columna.reducido), minHeight: alturaCasilla(), maxHeight: alturaCasilla(), display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
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
                                            className={classes.colorText}
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
                )}
            </Grid>
        )
    };

    const retornaCasillasServiciosFijos = (dia, indexDia, servicio, indice) => {
        let tipo = servicio.tipoServiciofijo;
        let postRef = dia[1][0] + dia[0][0];
        let hayServicio = false;
        let trab = '';
        let integrado = false;
        if (servicio.int_TO ||
            servicio.int_CR ||
            servicio.int_CE ||
            servicio.int_CI ||
            servicio.int_MO ||
            servicio.int_OF ||
            servicio.int_AL ||
            servicio.int_LA ||
            servicio.int_TE ||
            servicio.int_FI ||
            servicio.int_FE ||
            servicio.int_AB ||
            servicio.int_MA ||
            servicio.int_PO ||
            servicio.int_BA ||
            servicio.int_FT ||
            servicio.int_C3 ||
            servicio.int_C2 ||
            servicio.int_C4 ||
            servicio.int_ES ||
            servicio.int_PA) {
            integrado = true;
        };
        for (const prop in servicio) {
            if (prop === postRef && servicio[prop] !== 'anulado') {
                hayServicio = true;
                if (servicio['precioHora_TO'] || servicio['int_TO']) {
                    trab = servicio['trab_TO'];
                };
                if (servicio['precioHora_CR'] || servicio['int_CR']) {
                    trab = servicio['trab_CR'];
                };
                if (servicio['precioHora_CE'] || servicio['int_CE']) {
                    trab = servicio['trab_CE'];
                };
                if (servicio['precioHora_CI'] || servicio['int_CI']) {
                    trab = servicio['trab_CI'];
                };
                if (servicio['precioHora_MO'] || servicio['int_MA']) {
                    trab = servicio['trab_MO'];
                };
                if (servicio['precioHora_OF'] || servicio['int_OF']) {
                    trab = servicio['trab_OF'];
                };
                if (servicio['precioHora_AL'] || servicio['int_AL']) {
                    trab = servicio['trab_AL'];
                };
                if (servicio['precioHora_LA'] || servicio['int_LA']) {
                    trab = servicio['trab_LA'];
                };
                if (servicio['precioHora_TE'] || servicio['int_TE']) {
                    trab = servicio['trab_TE'];
                };
                if (servicio['precioHora_FI'] || servicio['int_FI']) {
                    trab = servicio['trab_FI'];
                };
                if (servicio['precioHora_FE'] || servicio['int_FE']) {
                    trab = servicio['trab_FE'];
                };
                if (servicio['precioHora_AB'] || servicio['int_AB']) {
                    trab = servicio['trab_AB'];
                };
                if (servicio['precioHora_MA'] || servicio['int_MA']) {
                    trab = servicio['trab_MA'];
                };
                if (servicio['precioHora_PO'] || servicio['int_PO']) {
                    trab = servicio['trab_PO'];
                };
                if (servicio['precioHora_BA'] || servicio['int_BA']) {
                    trab = servicio['trab_BA'];
                };
                if (servicio['precioHora_FT'] || servicio['int_FT']) {
                    trab = servicio['trab_FT'];
                };
                if (servicio['precioHora_C3'] || servicio['int_C3']) {
                    trab = servicio['trab_C3'];
                };
                if (servicio['precioHora_C2'] || servicio['int_C2']) {
                    trab = servicio['trab_C2'];
                };
                if (servicio['precioHora_C4'] || servicio['int_C4']) {
                    trab = servicio['trab_C4'];
                };
                if (servicio['precioHora_ES'] || servicio['int_ES']) {
                    trab = servicio['trab_ES'];
                };
                if (servicio['precioHora_PA'] || servicio['int_PA']) {
                    trab = servicio['trab_PA'];
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
            servicio.activo_C4 === 'si' ||
            servicio.activo_ES === 'si' ||
            servicio.activo_PA === 'si') {
            return (
                <Grid
                    container
                    direction="column"
                    key={'Columna_sf' + (indexDia)}
                >
                    <PopupState variant="popover">
                        {(popupState) => (
                            <div>
                                < Box
                                    m={0.3}
                                    p={1.5}
                                    className={gestionaClassesColoresServiciosFijosAccion(indexDia + 1, hayServicio, integrado, tipo) || null}
                                    style={{ width: dimensionsColumnaServiciosFijos.width, minHeight: alturaCasilla(), maxHeight: alturaCasilla(), display: 'flex', alignItems: 'center' }}
                                    {...bindTrigger(popupState)}
                                >
                                    <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillasServiciosFijosAccion(indexDia + 1, trab, cuadranteServiciosFijos[indice]['estados']['estadoCasillaDia' + (indexDia + 1)])}</Typography>
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
                                                    onChange={(event) => dispatch(handleChangeSFCasillasAccion(postRef, indice, tipo, event, popupState)) || null}
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
                    cuadranteServiciosFijos[0].activo_C4 === 'no' ||
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
                    cuadranteServiciosFijos[0].activo_TO === 'si' ||
                    cuadranteServiciosFijos[0].activo_CR === 'si' ||
                    cuadranteServiciosFijos[0].activo_CE === 'si' ||
                    cuadranteServiciosFijos[0].activo_CI === 'si' ||
                    cuadranteServiciosFijos[0].activo_MO === 'si' ||
                    cuadranteServiciosFijos[0].activo_OF === 'si' ||
                    cuadranteServiciosFijos[0].activo_AL === 'si' ||
                    cuadranteServiciosFijos[0].activo_LA === 'si' ||
                    cuadranteServiciosFijos[0].activo_TE === 'si' ||
                    cuadranteServiciosFijos[0].activo_FI === 'si' ||
                    cuadranteServiciosFijos[0].activo_FE === 'si' ||
                    cuadranteServiciosFijos[0].activo_AB === 'si' ||
                    cuadranteServiciosFijos[0].activo_MA === 'si' ||
                    cuadranteServiciosFijos[0].activo_PO === 'si' ||
                    cuadranteServiciosFijos[0].activo_BA === 'si' ||
                    cuadranteServiciosFijos[0].activo_FT === 'si' ||
                    cuadranteServiciosFijos[0].activo_C3 === 'si' ||
                    cuadranteServiciosFijos[0].activo_C2 === 'si' ||
                    cuadranteServiciosFijos[0].activo_C4 === 'si' ||
                    cuadranteServiciosFijos[0].activo_ES === 'si' ||
                    cuadranteServiciosFijos[0].activo_PA === 'si'
                ) {
                    mostramos = true;
                } else {
                    mostramos = false;
                }
            } else {
                if (cuadranteServiciosFijos.length > 1) {
                    let contadorServiciosActivos = 0;
                    for (let i = 0; i < cuadranteServiciosFijos.length; i++) {
                        if (
                            cuadranteServiciosFijos[i].activo_TO === 'si' ||
                            cuadranteServiciosFijos[i].activo_CR === 'si' ||
                            cuadranteServiciosFijos[i].activo_CE === 'si' ||
                            cuadranteServiciosFijos[i].activo_CI === 'si' ||
                            cuadranteServiciosFijos[i].activo_MO === 'si' ||
                            cuadranteServiciosFijos[i].activo_OF === 'si' ||
                            cuadranteServiciosFijos[i].activo_AL === 'si' ||
                            cuadranteServiciosFijos[i].activo_LA === 'si' ||
                            cuadranteServiciosFijos[i].activo_TE === 'si' ||
                            cuadranteServiciosFijos[i].activo_FI === 'si' ||
                            cuadranteServiciosFijos[i].activo_FE === 'si' ||
                            cuadranteServiciosFijos[i].activo_AB === 'si' ||
                            cuadranteServiciosFijos[i].activo_MA === 'si' ||
                            cuadranteServiciosFijos[i].activo_PO === 'si' ||
                            cuadranteServiciosFijos[i].activo_BA === 'si' ||
                            cuadranteServiciosFijos[i].activo_FT === 'si' ||
                            cuadranteServiciosFijos[i].activo_C3 === 'si' ||
                            cuadranteServiciosFijos[i].activo_C2 === 'si' ||
                            cuadranteServiciosFijos[i].activo_C4 === 'si' ||
                            cuadranteServiciosFijos[i].activo_ES === 'si' ||
                            cuadranteServiciosFijos[i].activo_PA === 'si'
                        ) {
                            contadorServiciosActivos += 1;
                        };
                    }
                    if (contadorServiciosActivos >= 1) {
                        mostramos = true;
                    } else {
                        mostramos = false;
                    };
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

    const retornaAnchoColumna = (reducido) => {
        if (reducido) {
            return 40
        } else {
            return dimensionsColumna.width
        };
    };

    const retornaTamanoIcono = () => {
        if (dimensionsColumna.width > 185) {
            return 24
        } else {
            let proporcion = (((dimensionsColumna.width * 100) / 350) / 100) + 0.2;
            return 24 * proporcion
        };
    };

    const retornaNombreTrabajador = (nombre) => {
        let nombreARetornar;
        let longitudTrunc;
        if (dimensionsColumna.width < 200) {
            longitudTrunc = 11;
        } else {
            longitudTrunc = parseInt((dimensionsColumna.width * 33) / 350);
        };
        if (nombre.length > longitudTrunc) {
            nombreARetornar = nombre.substring(0, longitudTrunc) + "…";
        } else {
            nombreARetornar = nombre;
        };
        return nombreARetornar
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
                            style={{ minHeight: alturaCasilla(), maxHeight: alturaCasilla(), padding: 9, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
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
                                    retornaHeaderServiciosFijosAccion(servicio, index, dimensionsColumnaServiciosFijos.width, alturaCasilla())
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
                                                className={gestionaClassesColoresTrabajadoresAccion(columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador)}
                                                style={{ width: retornaAnchoColumna(columnaCabecera.reducido), minHeight: alturaCasilla(), maxHeight: alturaCasilla() }}
                                                onChange={(e, expandedAccordion) => { dispatch(handleCambioAccordionHeaderAccion(expandedAccordion, 'panel_' + (index + 1), index, scrollable, classesDisp)) }}
                                            >
                                                {columnaCabecera.reducido ? (
                                                    <Tooltip title={!columnaCabecera.reducido ? '' : columnaCabecera.nombreTrabajador !== 'Suplente' ? columnaCabecera.nombreTrabajador : ''} placement="top" arrow>
                                                        <Box style={{ width: 40, minHeight: alturaCasilla(), maxHeight: alturaCasilla(), cursor: 'pointer' }}
                                                            onClick={() => dispatch(handleGestionarTamanoColumnaAccion(index, 'ampliar', null, null))}
                                                        >
                                                            <IconButton
                                                                className={classes.btnAmpliarcolumna}
                                                            >
                                                                <KeyboardTabIcon style={{ fontSize: 18 }} />
                                                            </IconButton>
                                                        </Box>
                                                    </Tooltip>
                                                ) : (
                                                    esDesktop ? (
                                                        <AccordionSummary1
                                                            expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                                                        >
                                                            <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{columnaCabecera.reducido ? '' : columnaCabecera.nombreTrabajador !== 'Suplente' ? retornaNombreTrabajador(columnaCabecera.nombreTrabajador) : ''}</Typography>
                                                        </AccordionSummary1>
                                                    ) : (
                                                        <AccordionSummary2
                                                            expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                                                        >
                                                            <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{columnaCabecera.reducido ? '' : columnaCabecera.nombreTrabajador !== 'Suplente' ? retornaNombreTrabajador(columnaCabecera.nombreTrabajador) : ''}</Typography>
                                                        </AccordionSummary2>
                                                    ))}
                                                <AccordionDetails
                                                    style={{ marginTop: 1 }}>
                                                    <Grid container
                                                        className={classes.mt5}
                                                    >
                                                        {!columnaCabecera.reducido ? (
                                                            <Grid
                                                                container
                                                                direction="column"
                                                                justifycontent="flex-start"
                                                                alignItems="flex-start"
                                                            >
                                                                <Box
                                                                    style={{ width: '100%', display: 'flex', marginTop: 10, marginBottom: 10 }}
                                                                >
                                                                    <ButtonGroup size="small"
                                                                        fullWidth
                                                                        className='botoneraTrab'
                                                                    >
                                                                        <Tooltip title={columnaCabecera.nombreTrabajador ? "Reducir columna" : ""} placement="top" arrow>
                                                                            <Button
                                                                                onClick={() => dispatch(handleGestionarTamanoColumnaAccion(index, 'reducir', scrollable, classes))}
                                                                                disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                            >
                                                                                <KeyboardTabIcon className={classes.colorText}
                                                                                    style={{ transform: 'rotate(180deg)', fontSize: retornaTamanoIcono() }} />
                                                                            </Button>
                                                                        </Tooltip>
                                                                        <Tooltip title={columnaCabecera.nombreTrabajador ? "Añadir suplente" : ""} placement="top" arrow>
                                                                            <Button
                                                                                onClick={() => dispatch(handleClickAddColumnaAccion('suplente', index, scrollable, classesDisp))}
                                                                                disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                            >
                                                                                <PersonAddIcon className={classes.colorText}
                                                                                    style={{ fontSize: retornaTamanoIcono() }} />
                                                                            </Button>
                                                                        </Tooltip>
                                                                        <Tooltip title={columnaCabecera.nombreTrabajador ? "Limpiar horario columna" : ""} placement="top" arrow>
                                                                            <Button
                                                                                onClick={() => dispatch(handleLimpiezaHorarioAccion(index))}
                                                                                disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                            >
                                                                                <RemoveCircleOutlineIcon className={classes.colorText}
                                                                                    style={{ fontSize: retornaTamanoIcono() }} />
                                                                            </Button>
                                                                        </Tooltip>
                                                                        <Tooltip title={columnaCabecera.nombreTrabajador ? "Actualizar trabajador" : ""} placement="top" arrow>
                                                                            <Button
                                                                                onClick={() => dispatch(handleActualizarTrabajadoresAccion(index, columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador))}
                                                                                disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                            >
                                                                                <CachedIcon className={classes.colorText}
                                                                                    style={{ fontSize: retornaTamanoIcono() }} />
                                                                            </Button>
                                                                        </Tooltip>
                                                                        <Tooltip title="Eliminar trabajador" placement="top" arrow>
                                                                            <Button
                                                                                onClick={() => dispatch(eliminarColumnaAccion(index, columnaCabecera.idTrabajador, scrollable, classesDisp))}
                                                                            >
                                                                                <DeleteIcon
                                                                                    style={{ color: '#f44336', fontSize: retornaTamanoIcono() }} />
                                                                            </Button>
                                                                        </Tooltip>
                                                                    </ButtonGroup>
                                                                </Box>
                                                                <FormControl
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    className={classes.mt15}
                                                                    size="small"
                                                                >
                                                                    <InputLabel>{esDesktop ? ((columnaCabecera.tipoTrabajador === 'trabajador' || !columnaCabecera.tipoTrabajador) ? 'Trabajador' : 'Suplente') : ((columnaCabecera.tipoTrabajador === 'trabajador' || !columnaCabecera.tipoTrabajador) ? 'Trab' : 'Supl')}</InputLabel>
                                                                    <Select
                                                                        id={`form-trabajador-` + (index + 1)}
                                                                        value={columnaCabecera.idTrabajador < 999 ? columnaCabecera.idTrabajador : ''}
                                                                        onChange={(event) => dispatch(handleChangeFormTrabajadoresAccion(index, columnaCabecera.tipoTrabajador, event))}
                                                                        onOpen={() => dispatch(setValorPrevioAccordionAbiertoAccion(columnaCabecera.idTrabajador))}
                                                                        input={
                                                                            <OutlinedInput
                                                                                labelWidth={esDesktop ? 80 : 35}
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
                                                                    <InputLabel>{esDesktop ? 'Modo entrada datos' : 'Datos'}</InputLabel>
                                                                    <Select
                                                                        id="form-tipo-cuadrantes"
                                                                        label={esDesktop ? 'Modo entrada datos' : 'Datos'}
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
                                                        ) : null}
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
                        <Box
                            style={!esDesktop ? { marginTop: 10 } : null}
                        >
                            {losDiasDelMes.map((dia, index) => (
                                retornaCasillasDias(dia, index)
                            ))}
                        </Box>
                        {visibleCuadranteServiciosFijos ? (
                            cuadranteServiciosFijos.length > 0 ? (
                                cuadranteServiciosFijos.map((servicio, indexColSF) => (
                                    <Box
                                        key={'box' + indexColSF}
                                        style={!esDesktop ? { marginTop: 10 } : null}
                                    >
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
                                        style={!esDesktop ? { marginTop: 10 } : null}
                                    >
                                        {losDiasDelMes.map((dia, indexDia) => (
                                            retornaCasillasGeneral(dia, indexDia, columna, indexColumna)
                                        ))}
                                    </Box>
                                ))
                            ) : null
                        ) : null}
                    </Grid>
                </Box >
                <Draggable
                    axis="x"
                    bounds={{ right: 0 }}
                    onDrag={() => setIsDragging(true)}
                    onStop={() => setTimeout(() => { setIsDragging(false) }, 500)}
                >
                    <Tooltip title="Informe Cuadrante" placement="left" arrow>
                        <Fab
                            variant="extended"
                            className={classes.fab}
                            onClick={() => !isDragging ? dispatch(handleClickOpenDialogCuadrantes4Accion()) : null}
                        >
                            <Typography variant="body2" className={classes.typoFab}>{dispatch(retornaInfoFabButtonAccion())}</Typography>
                            <AssessmentIcon />
                        </Fab>
                    </Tooltip>
                </Draggable>
            </Grid >
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
                                        firmaActualizacion && objetoCentro.nombre && intervencionRegistrada && objetoCuadrante.estado === 'facturado' ?
                                            classes.badgeVerd :
                                            firmaActualizacion && objetoCentro.nombre && intervencionRegistrada && objetoCuadrante.estado === 'registrado' ?
                                                classes.badgeTaronja :
                                                firmaActualizacion && objetoCentro.nombre && !intervencionRegistrada ?
                                                    classes.badgeVermell :
                                                    !firmaActualizacion && objetoCentro.nombre ?
                                                        classes.badgeVermell :
                                                        classes.displayNone
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Chip
                                    className={retornaColorChipAccion()}
                                    style={{ padding: 5 }}
                                    avatar={retornaAvatarChipAccion()}
                                    icon={!objetoCentro.nombre ? <AssignmentIcon /> : null}
                                    label={retornaLabelChipAccion()} />
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
                                            disabled={(cuadranteBloqueado || objetoCuadrante.estado === 'facturado') ? true : cuadranteRegistrado === 'si' ? disabledItemBotonActualizar : disabledItemBotonRegistrar}
                                        >
                                            <ListItemIcon>
                                                {cuadranteRegistrado === 'si' ? <SystemUpdateAltIcon fontSize="small" /> : <SaveIcon fontSize="small" />}
                                            </ListItemIcon>
                                            <ListItemText primary={cuadranteRegistrado === 'si' ? 'Actualizar Cuadrante' : 'Registrar Cuadrante'} />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => dispatch(handleClickFacturacionMenuAccion())}
                                            disabled={(cuadranteRegistrado === 'no' || (objetoCuadrante.estado === 'registrado' && !disabledItemBotonActualizar)) ? true : false}
                                        >
                                            <ListItemIcon>
                                                <DescriptionIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Facturar" />
                                            {openFacturacion ? <ExpandLess /> : <ExpandMore />}
                                        </MenuItem>
                                        <Collapse in={openFacturacion} timeout="auto" unmountOnExit>
                                            {((objetoCentro.nombre !== '' && objetoCentro.horario.horario[0] && objetoCentro.horario.horario[0].computo === 3) || (objetoCentro.nombre !== '' && objetoCentro.serviciosFijos.gestionEspSF)) ? (
                                                <MenuItem
                                                    className={classes.nested}
                                                    onClick={() => dispatch(handleClickFacturarReciboCuadranteAccion())}
                                                    disabled={objetoCuadrante.estado === 'facturado' && disabledItemBotonActualizar ? true : false}
                                                >
                                                    <ListItemText primary="Registrar Recibo" />
                                                </MenuItem>
                                            ) : (
                                                <MenuItem
                                                    className={classes.nested}
                                                    onClick={() => dispatch(handleClickFacturarCuadranteAccion())}
                                                    disabled={objetoCuadrante.estado === 'facturado' && disabledItemBotonActualizar ? true : false}
                                                >
                                                    <ListItemText primary="Registrar Factura" />
                                                </MenuItem>
                                            )}
                                            <MenuItem
                                                className={classes.nested}
                                                onClick={() => dispatch(handleClickFacturacionInteriorMenuAccion())}
                                                disabled={objetoCuadrante.estado === 'facturado' && disabledItemBotonActualizar ? false : true}
                                            >
                                                <ListItemText primary={((objetoCentro.nombre !== '' && objetoCentro.horario.horario[0] && objetoCentro.horario.horario[0].computo === 3) || (objetoCentro.nombre !== '' && objetoCentro.serviciosFijos.gestionEspSF)) ? "Generar Recibo" : "Generar Archivos"} />
                                                {openFacturacionInterior ? <ExpandLess /> : <ExpandMore />}
                                            </MenuItem>
                                            <Collapse in={openFacturacionInterior} timeout="auto" unmountOnExit>
                                                {((objetoCentro.nombre !== '' && objetoCentro.horario.horario[0] && objetoCentro.horario.horario[0].computo === 3) || (objetoCentro.nombre !== '' && objetoCentro.serviciosFijos.gestionEspSF)) ? (
                                                    objetoCuadrante.estado === 'facturado' ? (
                                                        <MenuItem
                                                            className={classes.nested}
                                                            onClick={() => gestionarReciboPDF()}
                                                        >
                                                            <ListItemText primary="Emitir recibo" />
                                                        </MenuItem>
                                                    ) : null
                                                ) : (
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
                                                )}
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
                                        maxDate={new Date(dispatch(gestionaMaxDateCalendarAccion(5)))}
                                        value={valueDatePicker}
                                        disabled={disableCargando}
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
                                        disabled={disableCargando}
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
                                    disabled={venimosDeCambioCentroSelect ? true : !disableCargando ? disableSelectCentros : disableCargando}
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
                                        style={{ width: 40, marginRight: 4, height: alturaCasilla() }}
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
                                        style={esDesktop ? { width: 40, marginRight: 4, marginTop: 6, paddingTop: 5, height: heightScrollable - 47 - 128 } : { width: 40, marginRight: 4, marginTop: 6, paddingTop: 5, height: heightScrollable - 47 - 128 - 10 }}
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
                        <FormControl
                            variant="outlined"
                            fullWidth
                            className={clsx(classes.mt5, classes.px5)}
                            size="small"
                        >
                            <InputLabel>Estado</InputLabel>
                            <Select
                                id="form-tipoFestivo"
                                label="Estado"
                                value={stateFestivo['estadoFestivoDia' + (variablesPopoverDias.index + 1)] ? stateFestivo['tipoFestivoDia' + (variablesPopoverDias.index + 1)] : 0}
                                onChange={(event) => dispatch(handleChangeFestivoDiaAccion(variablesPopoverDias.postRef, variablesPopoverDias.index + 1, variablesPopoverDias.dia, event, null, false, scrollable, classesDisp))}
                                helpertext="Selecciona Tipo Festivo"
                            >
                                {tipoFestivo.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                                            prHandleResetearCasilla={(id, index, tipo) => dispatch(handleResetearCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                            prDimensionsColumna={dimensionsColumna.width}
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
                                            prHandleResetearCasilla={(id, index, tipo) => dispatch(handleResetearCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                            prDimensionsColumna={dimensionsColumna.width}
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
                                            prHandleResetearCasilla={(id, index, tipo) => dispatch(handleResetearCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                            prDimensionsColumna={dimensionsColumna.width}
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
                            onClick={() => dispatch(handleRegistrarCambioEnCasillaServiciosFijosAccion(scrollable, classes))}
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
                            prCentro={objetoCentro}
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
                            onClick={() => dispatch(handleRegistrarCambioEnCasillaConfiguracionAccion(scrollable, classes))}
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
                //resetear cuadrante
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
                //cambio pantalla sin guardar
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
                prBotonImprimir={true}
            />
            <DialogComponente
                //eliminar cuadrante (múltiple)
                prIsOpen={openDialog12}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesCuadrantes5Accion(respuesta))}
                prTituloDialog={tituloDialogCuadrantes5}
                prDescripcionDialog={descripcionDialogCuadrantes5}
            />
            {/* {console.log(objetoCuadrante)} */}
        </div >
    )
}

export default withRouter(Cuadrantes)