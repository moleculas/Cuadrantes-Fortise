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
import TimerIcon from '@material-ui/icons/Timer';
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
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

//carga componentes
import ItemCuadrante from './ItemCuadrante';
import PantallaCuadrantes from './PantallaCuadrantes';
import DialogComponente from './DialogComponente';
import ServiciosFijos from './ServiciosFijos';
import ConfiguracionCuadrante from './ConfiguracionCuadrante';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerCentrosPorCategoriaAccion } from '../redux/centrosDucks';
import { retornaAnoMesAccion } from '../redux/appDucks';
import { diasEnElMesAccion } from '../redux/appDucks';
import { diaDeLaSemanaAccion } from '../redux/appDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { obtenerSuplenteAccion } from '../redux/trabajadoresDucks';
import { generaFechaAccion } from '../redux/appDucks';
import { retornaHoraRangoAccion } from '../redux/appDucks';
import { retornaMinutosAccion } from '../redux/appDucks';
import { activarDesactivarCambioAccion } from '../redux/cuadrantesDucks';
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { onEstemAccion } from '../redux/appDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonActualizarAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonResetearAccion } from '../redux/cuadrantesDucks';
import { obtenerCuadranteAccion } from '../redux/cuadrantesDucks';
import { vaciarDatosCuadranteRegistradoAccion } from '../redux/cuadrantesDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { registrarIntervencionCuadranteNuevoAccion } from '../redux/cuadrantesDucks';
import { registrarCuadranteAccion } from '../redux/cuadrantesDucks';
import { actualizarCuadranteAccion } from '../redux/cuadrantesDucks';
import { gestionaColumnaCuadranteInterior } from '../redux/cuadrantesDucks';
import { resetearCuadranteAccion } from '../redux/cuadrantesDucks';
import { cambiarACuadranteRegistradoAccion } from '../redux/cuadrantesDucks';
import { cambiarACuadranteNoRegistradoAccion } from '../redux/cuadrantesDucks';
import { vaciarDatosCuadrantesAccion } from '../redux/cuadrantesDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import { actualizarObjetoCuadranteAccion } from '../redux/cuadrantesDucks';
import { venimosDePendientesAccion } from '../redux/pendientesDucks';
import { setCategoriaAccion } from '../redux/cuadrantesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { obtenerCategoriaPorCentroAccion } from '../redux/centrosDucks';
import { setCalendarioAGestionarAccion } from '../redux/cuadrantesDucks';
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';
import { gestionarInformeAccion } from '../redux/cuadrantesDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';
import { vaciarDatosCentroAccion } from '../redux/centrosDucks';
import { vaciarDatosPendientesAccion } from '../redux/pendientesDucks';
import { venimosDeRegistradosAccion } from '../redux/pendientesDucks';
import { vaciarDatosTrabajadorAccion } from '../redux/trabajadoresDucks';
import { generarArchivosXLSAccion } from '../redux/appDucks';
import { gestionaMaxDateCalendarAccion } from '../redux/appDucks';
import { retornaFormaPagoAccion } from '../redux/cuadrantesDucks';
import { limpiarCuadranteAccion } from '../redux/cuadrantesDucks';
import { completarCuadranteAccion } from '../redux/cuadrantesDucks';

const categorias = Constantes.CATEGORIAS_CENTROS;
const arrayFestivos = Constantes.CALENDARIO_FESTIVOS;
const variaciones = Constantes.VARIACIONES_CUADRANTES;
const tiposDeServicio = Constantes.TIPO_SERVICIO_FIJO;
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
const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#66bb6a',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5),
    },

}))(Tooltip);

const Cuadrantes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
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
    const cuadranteNuevoRegistrado = useSelector(store => store.variablesCuadrantes.estadoIntervencionCuadranteNuevoRegistrada);
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
    const objetoUsuarioActivo = useSelector(store => store.variablesUsuario.usuarioActivo);
    const estadoVenimosDeRegistrados = useSelector(store => store.variablesPendientes.estadoVenimosDeRegistrados);
    const exitoGenerarArchivos = useSelector(store => store.variablesApp.exitoGenerarArchivos);

    //refs

    const scrollable = useRef();
    const boxes = useRef([]);

    //states

    const [valueDatePicker, setValueDatePicker] = useState(new Date(dispatch(retornaAnoMesAccion())));
    const [disableSelectCentros, setDisableSelectCentros] = useState(true);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [losDiasDelMes, setLosDiasDelMes] = useState([]);
    const [stateFestivo, setStateFestivo] = useState({});
    const [trabajadoresEnCuadrante, setTrabajadoresEnCuadrante] = useState([]);
    const [suplentesEnCuadrante, setSuplentesEnCuadrante] = useState([]);
    const [cuadrante, setCuadrante] = useState(objetoCuadrante.datosCuadrante.arrayCuadrante);
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const [dimensionsColumna, setDimensionsColumna] = useState({ width: 350 });
    const [openLoading, setOpenLoading] = useState(false);
    const [bufferSwitchedDiasFestivos, setBufferSwitchedDiasFestivos] = useState([]);
    const [esInicioTra, setEsInicioTra] = useState(true);
    const [esInicioSup, setEsInicioSup] = useState(true);
    const [esCambioTra, setEsCambioTra] = useState(false);
    const [esCambioSup, setEsCambioSup] = useState(false);
    const [columnaIndiceAGestionar, setColumnaIndiceAGestionar] = useState(null);
    const [valorPrevioAccordionAbierto, setValorPrevioAccordionAbierto] = useState(null);
    const [anchorElDias, setAnchorElDias] = useState(null);
    const openDias = Boolean(anchorElDias);
    const [variablesPopoverDias, setVariablesPopoverDias] = useState({
        postRef: null,
        index: null,
        dia: null
    });
    const [anchorElGeneral, setAnchorElGeneral] = useState(null);
    const openGeneral = Boolean(anchorElGeneral);
    const [variablesPopoverGeneral, setVariablesPopoverGeneral] = useState({
        postRef: null,
        indexDia: null,
        dia: null,
        columna: null,
        indexColumna: null
    });
    const [anchorElServiciosFijos, setAnchorElServiciosFijos] = useState(null);
    const openServiciosFijos = Boolean(anchorElServiciosFijos);
    const [anchorElConfiguracion, setAnchorElConfiguracion] = useState(null);
    const openConfiguracion = Boolean(anchorElConfiguracion);
    const [lastEditado, setLastEditado] = useState(null);
    const [itemPrevioEditando, setItemPrevioEditando] = useState(null);
    const [estadoFlex, setEstadoFlex] = useState('fila');
    const [preValueValor, setPreValueValor] = useState({});
    const [controladorDeEstado, setControladorDeEstado] = useState('inicio');
    const [esUnaActualizacionTrabajador, setEsUnaActualizacionTrabajador] = useState(false);
    const [firmaActualizacion, setFirmaActualizacion] = useState('');
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [arrayDatosInforme, setArrayDatosInforme] = useState(objetoCuadrante.datosInforme.arrayTrabajadores);
    const [arrayInformeLineas, setArrayInformeLineas] = useState([]);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [venimosDeActualizarCentro, setVenimosDeActualizarCentro] = useState(false);
    const [openFacturacion, setOpenFacturacion] = useState(false);
    const [openFacturacionInterior, setOpenFacturacionInterior] = useState(false);
    const [numeroFactusol, setNumeroFactusol] = useState(null);
    const [posicionTrabajadorPrevioACambiar, setPosicionTrabajadorPrevioACambiar] = useState(null);
    const [posicionSuplentePrevioACambiar, setPosicionSuplentePrevioACambiar] = useState(null);
    //const [estamosActualizandoCuadrante, setEstamosActualizandoCuadrante] = useState({ estado: false, columna: null });
    const [openLoadingActualizandoCuadrante, setOpenLoadingActualizandoCuadrante] = useState(false);
    const [stateSwitchTipoServicioFijoCuadrante, setStateSwitchTipoServicioFijoCuadrante] = useState({
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
        FT: false
    });
    const [losServiciosFijos, setLosServiciosFijos] = useState({});
    const [cuadranteVacio, setCuadranteVacio] = useState(false);
    const [itemPrevioEditandoServiciosFijos, setItemPrevioEditandoServiciosFijos] = useState(null);
    const [itemEditandoServiciosFijos, setItemEditandoServiciosFijos] = useState({
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
            FT: false
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
            precioHora_FT: ''
        }

    });
    const [itemPrevioEditandoConfiguracion, setItemPrevioEditandoConfiguracion] = useState(null);
    const [itemEditandoConfiguracion, setItemEditandoConfiguracion] = useState({
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
        precioHora_F: ''
    });
    const [preValueCalendarioAGestionarReseteo, setPreValueCalendarioAGestionarReseteo] = useState(null);

    //useEffect

    //secuencia inicio

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
        reseteaContenidoCuadrante();
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
        dispatch(setCalendarioAGestionarAccion(dispatch(retornaAnoMesAccion())));
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
        for (let i = 0; i < diasMes; i++) {
            const dateStr = mesAGest + '-' + (i + 1) + '-' + anyoAGest;
            array.push([[i + 1], [dispatch(diaDeLaSemanaAccion(dateStr))]]);
        };
        setLosDiasDelMes(array);
    }, [calendarioAGestionar]);

    useEffect(() => {
        if (losDiasDelMes.length > 0) {
            let object = {};
            for (let i = 1; i <= losDiasDelMes.length; i++) {
                if (esFestivoFuncion(i)) {
                    object['estadoFestivoDia' + i] = true;
                } else {
                    object['estadoFestivoDia' + i] = false;
                }
            }
            setStateFestivo(object);
        }
    }, [losDiasDelMes]);

    //secuencia cuadrante

    useEffect(() => {
        if (controladorDeEstado === 'inicio' || controladorDeEstado === 'venimosDeResetear') {
            setCuadrante(objetoCuadrante.datosCuadrante.arrayCuadrante);
            setFirmaActualizacion(objetoCuadrante.actualizacion);
            setControladorDeEstado('inicio');
            if (controladorDeEstado === 'venimosDeResetear') {                
                dispatch(setCalendarioAGestionarAccion(preValueCalendarioAGestionarReseteo));
                setPreValueCalendarioAGestionarReseteo(null);
            };
        };
        if (controladorDeEstado === 'venimosDeRegistrar') {
            //setFirmaActualizacion(objetoCuadrante.actualizacion);
            setControladorDeEstado('inicio');
        };
        if (controladorDeEstado === 'venimosDeInforme') {
            setControladorDeEstado('inicio');
        };
        if (objetoCuadrante.datosInforme.computo && objetoCuadrante.datosCuadrante.tipoHorarioGeneral) {
            setItemEditandoConfiguracion({
                tipoHorario: objetoCuadrante.datosCuadrante.tipoHorarioGeneral,
                computo: objetoCuadrante.datosInforme.computo,
                mensualPactado: objetoCuadrante.datosInforme.mensualPactado ? objetoCuadrante.datosInforme.mensualPactado : '',
                precioHora_L: objetoCuadrante.datosInforme.precioHora_L ? objetoCuadrante.datosInforme.precioHora_L : '',
                precioHora_E: objetoCuadrante.datosInforme.precioHora_E ? objetoCuadrante.datosInforme.precioHora_E : '',
                precioHora_P: objetoCuadrante.datosInforme.precioHora_P ? objetoCuadrante.datosInforme.precioHora_P : '',
                precioHora_N: objetoCuadrante.datosInforme.precioHora_N ? objetoCuadrante.datosInforme.precioHora_N : '',
                precioHora_R: objetoCuadrante.datosInforme.precioHora_R ? objetoCuadrante.datosInforme.precioHora_R : '',
                precioHora_L1: objetoCuadrante.datosInforme.precioHora_L1 ? objetoCuadrante.datosInforme.precioHora_L1 : '',
                precioHora_L2: objetoCuadrante.datosInforme.precioHora_L2 ? objetoCuadrante.datosInforme.precioHora_L2 : '',
                precioHora_F: objetoCuadrante.datosInforme.precioHora_F ? objetoCuadrante.datosInforme.precioHora_F : ''
            });
        };
        if (objetoCuadrante.datosCuadrante.arrayCuadrante.length > 0) {
            const { arrayResultante, arrayFestivos } = dispatch(completarCuadranteAccion(losDiasDelMes, objetoCuadrante.datosCuadrante.arrayCuadrante));
            setCuadrante(arrayResultante);
            let object = { ...stateFestivo };
            arrayFestivos.forEach((festivo, index) => {
                object['estadoFestivoDia' + festivo[1]] = true;
            });
            setStateFestivo(object);
        };
    }, [objetoCuadrante]);

    useEffect(() => {
        dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: ultimoIdRegistrado }));
    }, [ultimoIdRegistrado]);

    useEffect(() => {
        if (cuadranteRegistrado === 'no') {
            if (!estadoVenimosDePendientes) {
                dispatch(obtenerCentroAccion('centros', centro));
                dispatch(cambioEstadoInicioCuadrantesAccion(false));
                dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
                dispatch(registrarIntervencionCuadranteNuevoAccion(false));
            };
            dispatch(activarDesactivarCambioBotonResetearAccion(true));
        };
        if (cuadranteRegistrado === 'si') {
            if (!estadoVenimosDeRegistrados) {
                dispatch(obtenerCentroAccion('centros', centro));
                dispatch(cambioEstadoInicioCuadrantesAccion(false));
                dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
                dispatch(registrarIntervencionCuadranteNuevoAccion(true));
            };
            dispatch(activarDesactivarCambioBotonResetearAccion(false));
        };
    }, [cuadranteRegistrado]);

    useEffect(() => {
        const fetchData = () => {
            setOpenLoading(true);
            if (centroAGestionar.nombre !== '') {
                let myObjetoServiciosFijos = {
                    precioHora_TO: null,
                    precioHora_CR: null,
                    precioHora_CE: null,
                    precioHora_CI: null,
                    precioHora_MO: null,
                    precioHora_OF: null,
                    precioHora_AL: null,
                    precioHora_LA: null,
                    precioHora_TE: null,
                    precioHora_FI: null,
                    precioHora_FE: null,
                    precioHora_AB: null,
                    precioHora_MA: null,
                    precioHora_PO: null,
                    precioHora_BA: null,
                    precioHora_FT: null
                };
                let objetoEstadosSwitch = {
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
                    FT: false
                };
                if (!venimosDeActualizarCentro) {
                    if (cuadranteRegistrado === 'no') {
                        if (!centroAGestionar.horario.tipo) {
                            setCuadranteVacio(true);
                        };
                        centroAGestionar.serviciosFijos.servicio.forEach((servicio) => {
                            if (servicio.precioHora_TO) {
                                myObjetoServiciosFijos.precioHora_TO = servicio.precioHora_TO;
                                objetoEstadosSwitch.TO = true;
                            };
                            if (servicio.precioHora_CR) {
                                myObjetoServiciosFijos.precioHora_CR = servicio.precioHora_CR;
                                objetoEstadosSwitch.CR = true;
                            };
                            if (servicio.precioHora_CE) {
                                myObjetoServiciosFijos.precioHora_CE = servicio.precioHora_CE;
                                objetoEstadosSwitch.CE = true;
                            };
                            if (servicio.precioHora_CI) {
                                myObjetoServiciosFijos.precioHora_CI = servicio.precioHora_CI;
                                objetoEstadosSwitch.CI = true;
                            };
                            if (servicio.precioHora_MO) {
                                myObjetoServiciosFijos.precioHora_MO = servicio.precioHora_MO;
                                objetoEstadosSwitch.MO = true;
                            };
                            if (servicio.precioHora_OF) {
                                myObjetoServiciosFijos.precioHora_OF = servicio.precioHora_OF;
                                objetoEstadosSwitch.OF = true;
                            };
                            if (servicio.precioHora_AL) {
                                myObjetoServiciosFijos.precioHora_AL = servicio.precioHora_AL;
                                objetoEstadosSwitch.AL = true;
                            };
                            if (servicio.precioHora_LA) {
                                myObjetoServiciosFijos.precioHora_LA = servicio.precioHora_LA;
                                objetoEstadosSwitch.LA = true;
                            };
                            if (servicio.precioHora_TE) {
                                myObjetoServiciosFijos.precioHora_TE = servicio.precioHora_TE;
                                objetoEstadosSwitch.TE = true;
                            };
                            if (servicio.precioHora_FI) {
                                myObjetoServiciosFijos.precioHora_FI = servicio.precioHora_FI;
                                objetoEstadosSwitch.FI = true;
                            };
                            if (servicio.precioHora_FE) {
                                myObjetoServiciosFijos.precioHora_FE = servicio.precioHora_FE;
                                objetoEstadosSwitch.FE = true;
                            };
                            if (servicio.precioHora_AB) {
                                myObjetoServiciosFijos.precioHora_AB = servicio.precioHora_AB;
                                objetoEstadosSwitch.AB = true;
                            };
                            if (servicio.precioHora_MA) {
                                myObjetoServiciosFijos.precioHora_MA = servicio.precioHora_MA;
                                objetoEstadosSwitch.MA = true;
                            };
                            if (servicio.precioHora_PO) {
                                myObjetoServiciosFijos.precioHora_PO = servicio.precioHora_PO;
                                objetoEstadosSwitch.PO = true;
                            };
                            if (servicio.precioHora_BA) {
                                myObjetoServiciosFijos.precioHora_BA = servicio.precioHora_BA;
                                objetoEstadosSwitch.BA = true;
                            };
                            if (servicio.precioHora_FT) {
                                myObjetoServiciosFijos.precioHora_FT = servicio.precioHora_FT;
                                objetoEstadosSwitch.FT = true;
                            };
                        });
                        if (centroAGestionar.trabajadores.trabajadores.length > 0) {
                            centroAGestionar.trabajadores.trabajadores.forEach((trabajadorIterado, index) => {
                                setTimeout(
                                    function () {
                                        if (trabajadorIterado['trabajador_' + (index + 1)]) {
                                            setTimeout(() => {
                                                dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado['trabajador_' + (index + 1)]));
                                            }, 1);
                                        };
                                        if (trabajadorIterado['suplente_' + (index + 1)]) {
                                            setTimeout(() => {
                                                dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado['suplente_' + (index + 1)]));
                                            }, 500);
                                        };
                                    }, index * 1000);
                            });
                        };

                        const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, tipoHorarioGeneral: centroAGestionar.horario.tipo };
                        dispatch(actualizarObjetoCuadranteAccion({
                            ...objetoCuadrante,
                            datosCuadrante: losDatosCuadrante,
                            datosServicios: centroAGestionar.serviciosFijos,
                            datosInforme: {
                                objeto: 'informe',
                                centro: centroAGestionar.id,
                                computo: centroAGestionar.horario.computo,
                                mensualPactado: centroAGestionar.horario.mensualPactado ? centroAGestionar.horario.mensualPactado : null,
                                precioHora_L: centroAGestionar.horario.precioHora_L ? centroAGestionar.horario.precioHora_L : null,
                                precioHora_E: centroAGestionar.horario.precioHora_E ? centroAGestionar.horario.precioHora_E : null,
                                precioHora_P: centroAGestionar.horario.precioHora_P ? centroAGestionar.horario.precioHora_P : null,
                                precioHora_N: centroAGestionar.horario.precioHora_N ? centroAGestionar.horario.precioHora_N : null,
                                precioHora_R: centroAGestionar.horario.precioHora_R ? centroAGestionar.horario.precioHora_R : null,
                                precioHora_L1: centroAGestionar.horario.precioHora_L1 ? centroAGestionar.horario.precioHora_L1 : null,
                                precioHora_L2: centroAGestionar.horario.precioHora_L2 ? centroAGestionar.horario.precioHora_L2 : null,
                                precioHora_F: centroAGestionar.horario.precioHora_F ? centroAGestionar.horario.precioHora_F : null,
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
                            }
                        }));
                    };
                    if (cuadranteRegistrado === 'si') {
                        if (objetoCuadrante.datosCuadrante.arrayCuadrante.length === 0) {
                            setCuadranteVacio(true);
                        };
                        objetoCuadrante.datosServicios.servicio.forEach((servicio) => {
                            if (servicio.precioHora_TO) {
                                myObjetoServiciosFijos.precioHora_TO = servicio.precioHora_TO;
                                objetoEstadosSwitch.TO = true;
                            };
                            if (servicio.precioHora_CR) {
                                myObjetoServiciosFijos.precioHora_CR = servicio.precioHora_CR;
                                objetoEstadosSwitch.CR = true;
                            };
                            if (servicio.precioHora_CE) {
                                myObjetoServiciosFijos.precioHora_CE = servicio.precioHora_CE;
                                objetoEstadosSwitch.CE = true;
                            };
                            if (servicio.precioHora_CI) {
                                myObjetoServiciosFijos.precioHora_CI = servicio.precioHora_CI;
                                objetoEstadosSwitch.CI = true;
                            };
                            if (servicio.precioHora_MO) {
                                myObjetoServiciosFijos.precioHora_MO = servicio.precioHora_MO;
                                objetoEstadosSwitch.MO = true;
                            };
                            if (servicio.precioHora_OF) {
                                myObjetoServiciosFijos.precioHora_OF = servicio.precioHora_OF;
                                objetoEstadosSwitch.OF = true;
                            };
                            if (servicio.precioHora_AL) {
                                myObjetoServiciosFijos.precioHora_AL = servicio.precioHora_AL;
                                objetoEstadosSwitch.AL = true;
                            };
                            if (servicio.precioHora_LA) {
                                myObjetoServiciosFijos.precioHora_LA = servicio.precioHora_LA;
                                objetoEstadosSwitch.LA = true;
                            };
                            if (servicio.precioHora_TE) {
                                myObjetoServiciosFijos.precioHora_TE = servicio.precioHora_TE;
                                objetoEstadosSwitch.TE = true;
                            };
                            if (servicio.precioHora_FI) {
                                myObjetoServiciosFijos.precioHora_FI = servicio.precioHora_FI;
                                objetoEstadosSwitch.FI = true;
                            };
                            if (servicio.precioHora_FE) {
                                myObjetoServiciosFijos.precioHora_FE = servicio.precioHora_FE;
                                objetoEstadosSwitch.FE = true;
                            };
                            if (servicio.precioHora_AB) {
                                myObjetoServiciosFijos.precioHora_AB = servicio.precioHora_AB;
                                objetoEstadosSwitch.AB = true;
                            };
                            if (servicio.precioHora_MA) {
                                myObjetoServiciosFijos.precioHora_MA = servicio.precioHora_MA;
                                objetoEstadosSwitch.MA = true;
                            };
                            if (servicio.precioHora_PO) {
                                myObjetoServiciosFijos.precioHora_PO = servicio.precioHora_PO;
                                objetoEstadosSwitch.PO = true;
                            };
                            if (servicio.precioHora_BA) {
                                myObjetoServiciosFijos.precioHora_BA = servicio.precioHora_BA;
                                objetoEstadosSwitch.BA = true;
                            };
                            if (servicio.precioHora_FT) {
                                myObjetoServiciosFijos.precioHora_FT = servicio.precioHora_FT;
                                objetoEstadosSwitch.FT = true;
                            };
                        });
                        if (objetoCuadrante.datosCuadrante.arrayCuadrante.length > 0) {
                            objetoCuadrante.datosCuadrante.arrayCuadrante.forEach((trabajadorIterado, index) => {
                                if (trabajadorIterado.tipoTrabajador === 'trabajador') {
                                    dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado.idTrabajador));
                                } else {
                                    dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado.idTrabajador));
                                };
                            });
                        }
                    };
                } else {
                    if (!centroAGestionar.horario.tipo) {
                        setCuadranteVacio(true);
                    };
                    centroAGestionar.serviciosFijos.servicio.forEach((servicio) => {
                        if (servicio.precioHora_TO) {
                            myObjetoServiciosFijos.precioHora_TO = servicio.precioHora_TO;
                            objetoEstadosSwitch.TO = true;
                        };
                        if (servicio.precioHora_CR) {
                            myObjetoServiciosFijos.precioHora_CR = servicio.precioHora_CR;
                            objetoEstadosSwitch.CR = true;
                        };
                        if (servicio.precioHora_CE) {
                            myObjetoServiciosFijos.precioHora_CE = servicio.precioHora_CE;
                            objetoEstadosSwitch.CE = true;
                        };
                        if (servicio.precioHora_CI) {
                            myObjetoServiciosFijos.precioHora_CI = servicio.precioHora_CI;
                            objetoEstadosSwitch.CI = true;
                        };
                        if (servicio.precioHora_MO) {
                            myObjetoServiciosFijos.precioHora_MO = servicio.precioHora_MO;
                            objetoEstadosSwitch.MO = true;
                        };
                        if (servicio.precioHora_OF) {
                            myObjetoServiciosFijos.precioHora_OF = servicio.precioHora_OF;
                            objetoEstadosSwitch.OF = true;
                        };
                        if (servicio.precioHora_AL) {
                            myObjetoServiciosFijos.precioHora_AL = servicio.precioHora_AL;
                            objetoEstadosSwitch.AL = true;
                        };
                        if (servicio.precioHora_LA) {
                            myObjetoServiciosFijos.precioHora_LA = servicio.precioHora_LA;
                            objetoEstadosSwitch.LA = true;
                        };
                        if (servicio.precioHora_TE) {
                            myObjetoServiciosFijos.precioHora_TE = servicio.precioHora_TE;
                            objetoEstadosSwitch.TE = true;
                        };
                        if (servicio.precioHora_FI) {
                            myObjetoServiciosFijos.precioHora_FI = servicio.precioHora_FI;
                            objetoEstadosSwitch.FI = true;
                        };
                        if (servicio.precioHora_FE) {
                            myObjetoServiciosFijos.precioHora_FE = servicio.precioHora_FE;
                            objetoEstadosSwitch.FE = true;
                        };
                        if (servicio.precioHora_AB) {
                            myObjetoServiciosFijos.precioHora_AB = servicio.precioHora_AB;
                            objetoEstadosSwitch.AB = true;
                        };
                        if (servicio.precioHora_MA) {
                            myObjetoServiciosFijos.precioHora_MA = servicio.precioHora_MA;
                            objetoEstadosSwitch.MA = true;
                        };
                        if (servicio.precioHora_PO) {
                            myObjetoServiciosFijos.precioHora_PO = servicio.precioHora_PO;
                            objetoEstadosSwitch.PO = true;
                        };
                        if (servicio.precioHora_BA) {
                            myObjetoServiciosFijos.precioHora_BA = servicio.precioHora_BA;
                            objetoEstadosSwitch.BA = true;
                        };
                        if (servicio.precioHora_FT) {
                            myObjetoServiciosFijos.precioHora_FT = servicio.precioHora_FT;
                            objetoEstadosSwitch.FT = true;
                        };
                    });
                    const losDatosServiciosFijos = centroAGestionar.serviciosFijos;
                    const losDatosInforme = {
                        ...objetoCuadrante.datosInforme,
                        computo: centroAGestionar.horario.computo,
                        mensualPactado: centroAGestionar.horario.mensualPactado ? centroAGestionar.horario.mensualPactado : null,
                        precioHora_L: centroAGestionar.horario.precioHora_L ? centroAGestionar.horario.precioHora_L : null,
                        precioHora_E: centroAGestionar.horario.precioHora_E ? centroAGestionar.horario.precioHora_E : null,
                        precioHora_P: centroAGestionar.horario.precioHora_P ? centroAGestionar.horario.precioHora_P : null,
                        precioHora_N: centroAGestionar.horario.precioHora_N ? centroAGestionar.horario.precioHora_N : null,
                        precioHora_R: centroAGestionar.horario.precioHora_R ? centroAGestionar.horario.precioHora_R : null,
                        precioHora_L1: centroAGestionar.horario.precioHora_L1 ? centroAGestionar.horario.precioHora_L1 : null,
                        precioHora_L2: centroAGestionar.horario.precioHora_L2 ? centroAGestionar.horario.precioHora_L2 : null,
                        precioHora_F: centroAGestionar.horario.precioHora_F ? centroAGestionar.horario.precioHora_F : null
                    }
                    const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, tipoHorarioGeneral: centroAGestionar.horario.tipo, arrayCuadrante: cuadrante };
                    dispatch(actualizarObjetoCuadranteAccion({
                        ...objetoCuadrante,
                        actualizacion: firmaActualizacion,
                        datosCuadrante: losDatosCuadrante,
                        datosServicios: losDatosServiciosFijos,
                        datosInforme: losDatosInforme
                    }));
                    setVenimosDeActualizarCentro(false);
                    setAlert({
                        mensaje: "Datos del centro actualizados exitosamente.",
                        tipo: 'success'
                    })
                    setOpenSnack(true);
                    dispatch(activarDesactivarCambioBotonActualizarAccion(false));
                    dispatch(registrarIntervencionAccion(false));
                };
                setLosServiciosFijos(myObjetoServiciosFijos);
                setStateSwitchTipoServicioFijoCuadrante(objetoEstadosSwitch);
                setItemEditandoServiciosFijos({
                    switch: objetoEstadosSwitch,
                    servicios: myObjetoServiciosFijos
                });
            };
            setOpenLoading(false);
        }
        fetchData();
    }, [centroAGestionar]);

    useEffect(() => {
        if (trabajadorAGestionar.nombre !== '') {
            let arrayTr = [];
            if (esInicioTra) {
                arrayTr = [...trabajadoresEnCuadrante];
                if (centroAGestionar.horario.tipoRegistro === 'individual') {
                    trabajadorAGestionar['laPosicionDelTrabajador'] = arrayTr.length + 1;
                };
                if (cuadranteRegistrado === 'no') {
                    const arrayCuadrante = [...cuadrante];
                    const laColumnaAnadir = gestionaColumnaCuadrante(trabajadorAGestionar, 'trabajador', false, null, false, false, centroAGestionar.horario.tipo);
                    if (laColumnaAnadir) {
                        arrayCuadrante.push(laColumnaAnadir);
                        arrayTr.push(trabajadorAGestionar);
                        setTrabajadoresEnCuadrante(arrayTr);
                    };
                    setCuadrante(arrayCuadrante);
                } else {
                    arrayTr.push(trabajadorAGestionar);
                    setTrabajadoresEnCuadrante(arrayTr);
                };
            }
            if (esCambioTra) {
                arrayTr = [...trabajadoresEnCuadrante];
                if (centroAGestionar.horario.tipoRegistro === 'individual') {
                    trabajadorAGestionar['laPosicionDelTrabajador'] = posicionTrabajadorPrevioACambiar;
                };
                let repetidoTrabajador, repetidoSuplente;
                repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === trabajadorAGestionar.id);
                repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === trabajadorAGestionar.id);
                if (trabajadorAGestionar.estado !== 'alta') {
                    setAlert({
                        mensaje: "Este trabajador se encuentra de baja, selecciona otro.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                } else if ((repetidoTrabajador || repetidoSuplente) && !esUnaActualizacionTrabajador) {
                    setAlert({
                        mensaje: "Este trabajador ya se encuentra en el cuadrante, selecciona otro.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                } else {
                    if (valorPrevioAccordionAbierto) {
                        const posicionTrabajador = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === valorPrevioAccordionAbierto));
                        arrayTr.splice(posicionTrabajador, 1);
                    };
                    if (!cuadranteVacio) {
                        gestionaColumnaCuadrante(trabajadorAGestionar, 'trabajador', true, columnaIndiceAGestionar, false, false, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
                    } else {
                        gestionaColumnaCuadrante(trabajadorAGestionar, 'trabajador', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
                    };
                    if (!esUnaActualizacionTrabajador) {
                        arrayTr.insert(posicionTrabajadorPrevioACambiar - 1, trabajadorAGestionar);
                        setTrabajadoresEnCuadrante(arrayTr);
                    };
                    setEsCambioTra(false);
                    setColumnaIndiceAGestionar(null);
                };
                if (esUnaActualizacionTrabajador) {
                    if (!openLoadingActualizandoCuadrante) {
                        setAlert({
                            mensaje: "Trabajador actualizado exitosamente.",
                            tipo: 'success'
                        })
                        setOpenSnack(true);
                    };
                    setEsUnaActualizacionTrabajador(false);
                };
            }
        };
    }, [trabajadorAGestionar]);

    useEffect(() => {
        if (suplenteAGestionar.nombre !== '') {
            let arraySu = [];
            if (esInicioSup) {
                arraySu = [...suplentesEnCuadrante];
                if (centroAGestionar.horario.tipoRegistro === 'individual') {
                    suplenteAGestionar['laPosicionDelTrabajador'] = arraySu.length + 1;
                }
                if (cuadranteRegistrado === 'no') {
                    const arrayCuadrante = [...cuadrante];
                    const laColumnaAnadir = gestionaColumnaCuadrante(suplenteAGestionar, 'suplente', false, null, false, false, centroAGestionar.horario.tipo);
                    if (laColumnaAnadir) {
                        arrayCuadrante.push(laColumnaAnadir);
                        arraySu.push(suplenteAGestionar);
                        setSuplentesEnCuadrante(arraySu);
                    };
                    setCuadrante(arrayCuadrante);

                } else {
                    arraySu.push(suplenteAGestionar);
                    setSuplentesEnCuadrante(arraySu);
                };
            };
            if (esCambioSup) {
                arraySu = [...suplentesEnCuadrante];
                if (centroAGestionar.horario.tipoRegistro === 'individual') {
                    suplenteAGestionar['laPosicionDelTrabajador'] = posicionSuplentePrevioACambiar;
                };
                let repetidoTrabajador, repetidoSuplente;
                repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === suplenteAGestionar.id);
                repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === suplenteAGestionar.id);
                if (suplenteAGestionar.estado !== 'alta') {
                    setAlert({
                        mensaje: "Este trabajador se encuentra de baja, selecciona otro.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                } else if ((repetidoTrabajador || repetidoSuplente) && !esUnaActualizacionTrabajador) {
                    setAlert({
                        mensaje: "Este trabajador ya se encuentra en el cuadrante, selecciona otro.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                } else {
                    if (valorPrevioAccordionAbierto) {
                        const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === valorPrevioAccordionAbierto));
                        arraySu.splice(posicionSuplente, 1);
                    };
                    if (!cuadranteVacio) {
                        gestionaColumnaCuadrante(suplenteAGestionar, 'suplente', true, columnaIndiceAGestionar, false, false, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
                    } else {
                        gestionaColumnaCuadrante(suplenteAGestionar, 'suplente', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
                        setCuadranteVacio(false);
                    };
                    if (!esUnaActualizacionTrabajador) {
                        arraySu.insert(posicionSuplentePrevioACambiar - 1, suplenteAGestionar);
                        setSuplentesEnCuadrante(arraySu);
                    };
                    setEsCambioSup(false);
                    setColumnaIndiceAGestionar(null);
                };
                if (esUnaActualizacionTrabajador) {
                    if (!openLoadingActualizandoCuadrante) {
                        setAlert({
                            mensaje: "Trabajador actualizado exitosamente.",
                            tipo: 'success'
                        })
                        setOpenSnack(true);
                    };
                    setEsUnaActualizacionTrabajador(false);
                };
            }
        };
    }, [suplenteAGestionar]);

    useEffect(() => {
        if (cuadrante.length > 0) {
            const { innerWidth: finestraWidth } = window;
            const ampleAGestionar = finestraWidth - 505;
            if ((dimensionsColumna.width * cuadrante.length) > ampleAGestionar) {
                setDimensionsColumna({ width: ((ampleAGestionar / cuadrante.length) - 5) });
                if (ampleAGestionar / cuadrante.length < 225) {
                    setEstadoFlex('columna');
                } else {
                    setEstadoFlex('fila');
                }
            } else {
                if (dimensionsColumna.width < 350) {
                    if ((ampleAGestionar / cuadrante.length) - 5 < 350) {
                        setDimensionsColumna({ width: ((ampleAGestionar / cuadrante.length) - 5) });
                    } else {
                        setDimensionsColumna({ width: 350 });
                    };
                    setEstadoFlex('fila');
                };
            };
            setArrayDatosInforme(dispatch(gestionarInformeAccion(cuadrante, objetoCuadrante.datosCuadrante.centro)));
            // if (estamosActualizandoCuadrante.estado) {
            //     handleActualizarTrabajadoresGeneral();
            // };
        };
    }, [cuadrante]);

    //secuencia venimos de pendientes o registrados

    useEffect(() => {
        if (estadoVenimosDePendientes) {
            if (centro) {
                dispatch(obtenerCategoriaPorCentroAccion('centros', centro));
                const nombreCuadrante = calendarioAGestionar + '-' + centro;
                const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: centro, arrayCuadrante: [] };
                dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: null, nombre: nombreCuadrante, actualizacion: '', datosCuadrante: losDatosCuadrante }));
            };
        }
    }, [estadoVenimosDePendientes]);

    useEffect(() => {
        if (estadoVenimosDeRegistrados) {
            if (centro) {
                dispatch(obtenerCategoriaPorCentroAccion('centros', centro));
                const nombreCuadrante = calendarioAGestionar + '-' + centro;
                const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: centro };
                dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, nombre: nombreCuadrante, actualizacion: '', datosCuadrante: losDatosCuadrante }));
                dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
            };
        }
    }, [estadoVenimosDeRegistrados]);

    useEffect(() => {
        if (estadoVenimosDePendientes || estadoVenimosDeRegistrados) {
            if (categoriaPorCentro) {
                dispatch(setCategoriaAccion(categoriaPorCentro));
                dispatch(obtenerCentrosPorCategoriaAccion('centros', categoriaPorCentro));
                setDisableSelectCentros(false);
            };
            if (estadoVenimosDePendientes) {
                dispatch(venimosDePendientesAccion(false));
            };
            if (estadoVenimosDeRegistrados) {
                dispatch(venimosDeRegistradosAccion(false));
            };
        }
    }, [categoriaPorCentro]);

    //secuencia alertas

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
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCentros, openLoadingTrabajadores, openLoadingCuadrantes]);

    useEffect(() => {
        if (openDialog8)
            generaInformacionCuadrantes();
    }, [openDialog8]);

    //funciones   

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
        setOpenFacturacion(false);
        setOpenFacturacionInterior(false);
        setNumeroFactusol(null);
    };

    const esFestivoFuncion = (elDia) => {
        const { monthNum } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
        const diaFecha = elDia + '-' + monthNum;
        if (arrayFestivos.includes(diaFecha)) {
            return true;
        } else {
            return false;
        }
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeSelectCalendario = (newValue) => {
        if (esInicioCuadrantes) {
            reseteaContenidoCuadrante();
            dispatch(vaciarDatosCuadrantesAccion());
            setValueDatePicker(newValue);
            setDisableSelectCentros(true);
            dispatch(setCalendarioAGestionarAccion(dispatch(retornaAnoMesAccion(newValue))));
            dispatch(cambioEstadoInicioCuadrantesAccion(true));
        } else {
            if (!cuadranteNuevoRegistrado) {
                handleClickOpenDialogCuadrantes2();
            } else {
                if (!intervencionRegistrada) {
                    handleClickOpenDialogCuadrantes3();
                    setPreValueValor({ valor: newValue, origen: 'cuadrantes' });
                } else {
                    reseteaContenidoCuadrante();
                    dispatch(vaciarDatosCuadrantesAccion());
                    setValueDatePicker(newValue);
                    setDisableSelectCentros(true);
                    dispatch(setCalendarioAGestionarAccion(dispatch(retornaAnoMesAccion(newValue))));
                    dispatch(cambioEstadoInicioCuadrantesAccion(true));
                }
            }
        };
        dispatch(vaciarDatosPendientesAccion());
    };

    const handleChangeSelectCategoria = (e) => {
        dispatch(setCategoriaAccion(e.target.value));
        setDisableSelectCentros(false);
        dispatch(obtenerCentrosPorCategoriaAccion('centros', e.target.value));
    };

    const handleChangeSelectCentro = (e) => {
        if (esInicioCuadrantes) {
            reseteaContenidoCentro();
            dispatch(setCentroAccion(e.target.value));
            const nombreCuadrante = calendarioAGestionar + '-' + e.target.value;
            const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: e.target.value };
            dispatch(actualizarObjetoCuadranteAccion({
                ...objetoCuadrante,
                nombre: nombreCuadrante,
                actualizacion: '',
                datosCuadrante: losDatosCuadrante,
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
            }));
            dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
        } else {
            if (!cuadranteNuevoRegistrado) {
                handleClickOpenDialogCuadrantes2();
            } else {
                if (!intervencionRegistrada) {
                    handleClickOpenDialogCuadrantes3();
                    setPreValueValor({ valor: e.target.value, origen: 'centros' });
                } else {
                    reseteaContenidoCentro();
                    dispatch(setCentroAccion(e.target.value));
                    const nombreCuadrante = calendarioAGestionar + '-' + e.target.value;
                    const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: e.target.value, arrayCuadrante: [] };
                    dispatch(actualizarObjetoCuadranteAccion({
                        ...objetoCuadrante,
                        id: null,
                        nombre: nombreCuadrante,
                        actualizacion: '',
                        datosCuadrante: losDatosCuadrante,
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
                    }));
                    dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
                }
            }
        }
    };

    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };

    const gestionaColumnaCuadrante = (trabajador, tipoTrabajador, esRevision, columna, esAnadirColumna, esLimpieza, tipoHorario) => {
        let posicionTrabajador;
        if (centroAGestionar.horario.tipoRegistro === 'individual') {
            if (tipoTrabajador === 'trabajador') {
                if (posicionTrabajadorPrevioACambiar) {
                    posicionTrabajador = posicionTrabajadorPrevioACambiar;
                    setPosicionTrabajadorPrevioACambiar(null);
                } else {
                    if (esAnadirColumna) {
                        posicionTrabajador = cuadrante.length + 1;
                    } else {
                        posicionTrabajador = trabajador.laPosicionDelTrabajador;
                    }
                }
            };
            if (tipoTrabajador === 'suplente') {
                if (posicionSuplentePrevioACambiar) {
                    posicionTrabajador = posicionSuplentePrevioACambiar;
                    setPosicionSuplentePrevioACambiar(null);
                } else {
                    if (esAnadirColumna) {
                        posicionTrabajador = columna;
                    } else {
                        posicionTrabajador = trabajador.laPosicionDelTrabajador;
                    }
                }
            };
        };
        let posicionAnterior;
        let esInicio = false;
        if (!esRevision && !esAnadirColumna) {
            posicionAnterior = cuadrante.length - 1;
            esInicio = true;
        } else if (esRevision && esAnadirColumna) {
            posicionAnterior = columna;
        } else {
            posicionAnterior = columna - 1;
        };
        if (cuadrante.length > 0) {
            if (cuadrante[posicionAnterior]) {
                if (tipoTrabajador === 'suplente' && !cuadrante[posicionAnterior].hayBaja && !esRevision) {
                    setAlert({
                        mensaje: "El trabajador no está o no ha estado de baja, no necesita suplente.",
                        tipo: 'warning'
                    })
                    setOpenSnack(true);
                    return;
                };
            };
            if (cuadrante[posicionAnterior]) {
                if (tipoTrabajador === 'suplente' && !cuadrante[posicionAnterior].hayBaja && esRevision && esAnadirColumna) {
                    setAlert({
                        mensaje: "El trabajador no está o no ha estado de baja, o no has asignado trabajador, no necesita suplente.",
                        tipo: 'warning'
                    })
                    setOpenSnack(true);
                    return;
                };
            };
        };
        const { columnaAnadir, hayTrabajador } = dispatch(gestionaColumnaCuadranteInterior(
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
        ));
        if (!hayTrabajador && tipoTrabajador === 'trabajador') {
            const arrayCuadrante = [...cuadrante];
            let arrayTr = [...trabajadoresEnCuadrante];
            let randomNumber = (Math.floor(Math.random() * 100)) + 1000;
            if (centroAGestionar.horario.tipoRegistro === 'individual') {
                const idTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].idTrabajador;
                const estadoTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].tipoTrabajador;
                let laPosicion;
                if (estadoTrabajadorAnterior === 'trabajador') {
                    const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                    laPosicion = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
                };
                if (estadoTrabajadorAnterior === 'suplente') {
                    const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                    laPosicion = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
                };
                arrayTr.push({
                    id: randomNumber,
                    laPosicionDelTrabajador: laPosicion + 1,
                    tipoTrabajador: 'trabajador'
                });
            } else {
                arrayTr.push({
                    id: randomNumber,
                    tipoTrabajador: 'trabajador'
                });
            };
            setTrabajadoresEnCuadrante(arrayTr);
            columnaAnadir['idTrabajador'] = randomNumber;
            arrayCuadrante.push(columnaAnadir);
            setCuadrante(arrayCuadrante);
            setExpandedAccordion(false);
        };
        if (!hayTrabajador && tipoTrabajador === 'suplente') {
            const arrayCuadrante = [...cuadrante];
            let arraySu = [...suplentesEnCuadrante];
            let randomNumber = (Math.floor(Math.random() * 100)) + 1000;
            if (centroAGestionar.horario.tipoRegistro === 'individual') {
                const idTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].idTrabajador;
                const estadoTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].tipoTrabajador;
                let laPosicion;
                if (estadoTrabajadorAnterior === 'trabajador') {
                    const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                    laPosicion = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
                };
                if (estadoTrabajadorAnterior === 'suplente') {
                    const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                    laPosicion = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
                };
                arraySu.push({
                    id: randomNumber,
                    laPosicionDelTrabajador: laPosicion,
                    tipoTrabajador: 'suplente'
                });
            } else {
                arraySu.push({
                    id: randomNumber,
                    tipoTrabajador: 'suplente'
                });
            };
            setSuplentesEnCuadrante(arraySu);
            columnaAnadir['idTrabajador'] = randomNumber;
            arrayCuadrante.insert(columna + 1, columnaAnadir);
            setCuadrante(arrayCuadrante);
            setExpandedAccordion(false);
        };
        if (hayTrabajador) {
            if (!esRevision) {
                return columnaAnadir;
            } else {
                const arrayCuadrante = [...cuadrante];
                arrayCuadrante[columna] = columnaAnadir;
                setCuadrante(arrayCuadrante);
            }
        };

    };

    const reseteaContenidoCuadrante = () => {
        reseteaContenidoCentro();
        setStateFestivo({});
        dispatch(vaciarDatosCentroAccion());
        dispatch(vaciarDatosTrabajadorAccion());
    };

    const reseteaContenidoCentro = () => {
        dispatch(vaciarDatosCuadranteRegistradoAccion());
        setTrabajadoresEnCuadrante([]);
        setSuplentesEnCuadrante([]);
        setCuadrante([]);
        setExpandedAccordion(false);
        setBufferSwitchedDiasFestivos([]);
        setEsInicioTra(true);
        setEsInicioSup(true);
        setEsCambioTra(false);
        setEsCambioSup(false);
        setColumnaIndiceAGestionar(null);
        setValorPrevioAccordionAbierto(null);
        setVariablesPopoverDias({});
        setVariablesPopoverGeneral({});
        setLastEditado(null);
        setItemPrevioEditando(null);
        dispatch(activarDesactivarCambioAccion(true));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(true));
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        setEstadoFlex('fila');
        dispatch(setCentroAccion(''));
        setPreValueValor({});
        setControladorDeEstado('inicio');
        setEsUnaActualizacionTrabajador(false);
        setFirmaActualizacion('');
        setArrayDatosInforme([]);
        setArrayInformeLineas([]);
        dispatch(registrarIntervencionCuadranteNuevoAccion(true));
        setLosServiciosFijos({});
        setStateSwitchTipoServicioFijoCuadrante({
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
            FT: false
        });
        setCuadranteVacio(false);
        setItemPrevioEditandoServiciosFijos(null);
        setItemEditandoServiciosFijos({
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
                FT: false
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
                precioHora_FT: ''
            }

        });
        setItemPrevioEditandoConfiguracion(null);
        setItemEditandoConfiguracion({
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
            precioHora_F: ''
        });
        setStateFestivo({});
    };

    const handleClickAddColumna = (tipo, columna) => {
        if (tipo === 'suplente' && cuadrante[columna + 1] && cuadrante[columna + 1].tipoTrabajador === 'suplente') {
            setAlert({
                mensaje: "Este trabajador ya tiene asignado un suplente.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (tipo === 'trabajador') {
            setEsInicioTra(false);
            setEsCambioTra(true);
            if (!cuadranteVacio) {
                gestionaColumnaCuadrante(null, 'trabajador', true, null, true, false, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
            } else {
                if (objetoCuadrante.datosInforme.computo) {
                    gestionaColumnaCuadrante(null, 'trabajador', true, null, true, true, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
                } else {
                    setAlert({
                        mensaje: "Para añadir trabajadores a un cuadrante debes elegir Tipo cómputo y Modo entrada datos en Configuración general cuadrante.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            };

        } else {
            setEsInicioSup(false);
            setEsCambioSup(true);
            if (!cuadranteVacio) {
                gestionaColumnaCuadrante(null, 'suplente', true, columna, true, false, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
            } else {
                if (objetoCuadrante.datosInforme.computo) {
                    gestionaColumnaCuadrante(null, 'suplente', true, columna, true, true, objetoCuadrante.datosCuadrante.tipoHorarioGeneral);
                } else {
                    setAlert({
                        mensaje: "Para añadir trabajadores a un cuadrante debes elegir Tipo cómputo y Modo entrada datos en Configuración general cuadrante.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            };
        }
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
        scrollable.current.classList.remove(classes.openAccordion);
    };

    const eliminarColumna = (columna, idTrabajador) => {
        let fromIndex;
        let arrayCuadrante = [...cuadrante];
        let numTrabajadoresQuedanSinNombre = 0;
        let numTrabajadoresQuedanConNombre = 0;
        let hayServiciosFijos=false;
        for (const prop in losServiciosFijos) {
            if (losServiciosFijos[prop] && prop === 'precioHora_TO') {                
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CR') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CE') {                
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CI') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_MO') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_OF') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_AL') {                
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_LA') {              
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_TE') {             
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FI') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FE') {            
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_AB') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_MA') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_PO') {              
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_BA') {               
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FT') {               
                hayServiciosFijos = true;
            };
        };

        arrayCuadrante.forEach((elemento) => {
            if (elemento.tipoTrabajador === 'trabajador' && !elemento.nombreTrabajador) {
                numTrabajadoresQuedanSinNombre++;
            }
            if (elemento.tipoTrabajador === 'trabajador' && elemento.nombreTrabajador) {
                numTrabajadoresQuedanConNombre++;
            }
        });
        if (numTrabajadoresQuedanSinNombre >= numTrabajadoresQuedanConNombre && arrayCuadrante[columna].nombreTrabajador && arrayCuadrante[columna].tipoTrabajador === 'trabajador') {
            setAlert({
                mensaje: "No es posible dejar un cuadrante sin trabajadores. Selecciona un trabajador para las columnas vacías antes de eliminar.",
                tipo: 'warning'
            })
            setOpenSnack(true);
            return;
        }
        if ((numTrabajadoresQuedanConNombre + numTrabajadoresQuedanSinNombre === 1 && arrayCuadrante[columna].tipoTrabajador === 'trabajador') || (arrayCuadrante.length === 1)) {
            setAlert({
                mensaje: "No es posible dejar un cuadrante sin trabajadores.",
                tipo: 'warning'
            })
            setOpenSnack(true);
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
                if (centroAGestionar.horario.tipoRegistro === 'individual') {
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
                if (centroAGestionar.horario.tipoRegistro === 'individual') {
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
            setCuadrante(arrayCuadrante);
            setExpandedAccordion(false);
        } else {
            fromIndex = arrayCuadrante.indexOf(arrayCuadrante[columna]);
            arrayCuadrante.splice(fromIndex, 1);
            const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajador));
            suplentesEnCuadrante.splice(posicionSuplente, 1);
            if (centroAGestionar.horario.tipoRegistro === 'individual') {
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
            setCuadrante(arrayCuadrante);
            setExpandedAccordion(false);
        }

        scrollable.current.classList.remove(classes.openAccordion);
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        //setEstamosActualizandoCuadrante({ estado: true, columna: columna });
        dispatch(registrarIntervencionAccion(false));
    };

    const handleCambioAccordionHeader = (expandedAccordion, panel, index) => {
        setExpandedAccordion(expandedAccordion ? panel : true);
        expandedAccordion ? scrollable.current.classList.add(classes.openAccordion) : scrollable.current.classList.remove(classes.openAccordion);
    };

    const handleVisibleVariaciones = (index, elId, e) => {
        const idSplitted = elId.split("-");
        const key = idSplitted[2];
        let arrayCuadrante = [...cuadrante];
        arrayCuadrante[index][key].visibleVariaciones = !arrayCuadrante[index][key].visibleVariaciones;
        arrayCuadrante[index][key].tipoVariacion = '';
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeTipoVariaciones = (index, e) => {
        const idSplitted = e.target.name.split("-");
        const key = idSplitted[2];
        let arrayCuadrante = [...cuadrante];
        arrayCuadrante[index][key].tipoVariacion = e.target.value;
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    }

    const gestionaClassesColoresGeneral = (dia, trabajadorDiaDeBaja, modificado, nombreTrabajador) => {
        if (trabajadorDiaDeBaja) {
            return classes.casillaBaja;
        } else {
            if (stateFestivo['estadoFestivoDia' + (dia)]) {
                return classes.casillaFestivo;
            } else {
                if (modificado) {
                    return classes.casillaModificado;
                } else {
                    if (nombreTrabajador) {
                        return classes.casillaLaboral;
                    } else {
                        return classes.casillaDisabled;
                    }
                }
            };
        }
    };

    const gestionaClassesColoresTrabajadores = (trabajadorTipo) => {
        if (trabajadorTipo === 'trabajador' || !trabajadorTipo) {
            return classes.trabajador;
        } else {
            return classes.suplente;
        }
    };

    const gestionaTextoCasillas = (indexDia, dia, columna, diaSemana) => {
        if (columna[dia].baja) {
            switch (columna[dia].tipoBaja) {
                case 'baja':
                    return 'Trabajador de baja';
                case 'vacaciones':
                    return 'Trabajador de vacaciones';
                case 'excedencia':
                    return 'Trabajador en excedencia';
                case 'personales':
                    return 'Ausencia motivos personales';
                default:
            }
        } else if (stateFestivo['estadoFestivoDia' + (indexDia)]) {
            return 'Día festivo'
        } else {
            switch (columna.tipoHorario) {
                case 'rango':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (columna[dia].lunesInicioRango && columna[dia].lunesFinRango) {
                                return 'De ' + columna[dia].lunesInicioRango + ' a ' + columna[dia].lunesFinRango;
                            } else {
                                return '';
                            };
                        case 'Martes':
                            if (columna[dia].martesInicioRango && columna[dia].martesFinRango) {
                                return 'De ' + columna[dia].martesInicioRango + ' a ' + columna[dia].martesFinRango;
                            } else {
                                return '';
                            };
                        case 'Miércoles':
                            if (columna[dia].miercolesInicioRango && columna[dia].miercolesFinRango) {
                                return 'De ' + columna[dia].miercolesInicioRango + ' a ' + columna[dia].miercolesFinRango;
                            } else {
                                return '';
                            };
                        case 'Jueves':
                            if (columna[dia].juevesInicioRango && columna[dia].juevesFinRango) {
                                return 'De ' + columna[dia].juevesInicioRango + ' a ' + columna[dia].juevesFinRango;
                            } else {
                                return '';
                            };
                        case 'Viernes':
                            if (columna[dia].viernesInicioRango && columna[dia].viernesFinRango) {
                                return 'De ' + columna[dia].viernesInicioRango + ' a ' + columna[dia].viernesFinRango;
                            } else {
                                return '';
                            };
                        case 'Sábado':
                            if (columna[dia].sabadoInicioRango && columna[dia].sabadoFinRango) {
                                return 'De ' + columna[dia].sabadoInicioRango + ' a ' + columna[dia].sabadoFinRango;
                            } else {
                                return '';
                            };
                        case 'Domingo':
                            if (columna[dia].domingoInicioRango && columna[dia].domingoFinRango) {
                                return 'De ' + columna[dia].domingoInicioRango + ' a ' + columna[dia].domingoFinRango;
                            } else {
                                return '';
                            };
                        default:
                    }
                    break;
                case 'rangoDescanso':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (columna[dia].lunesInicio1RangoDescanso && columna[dia].lunesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].lunesInicio2RangoDescanso && columna[dia].lunesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].lunesInicio2RangoDescanso + ' a ' + columna[dia].lunesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].lunesInicio1RangoDescanso + ' a ' + columna[dia].lunesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Martes':
                            if (columna[dia].martesInicio1RangoDescanso && columna[dia].martesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].martesInicio2RangoDescanso && columna[dia].martesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].martesInicio2RangoDescanso + ' a ' + columna[dia].martesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].martesInicio1RangoDescanso + ' a ' + columna[dia].martesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Miércoles':
                            if (columna[dia].miercolesInicio1RangoDescanso && columna[dia].miercolesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].miercolesInicio2RangoDescanso && columna[dia].miercolesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].miercolesInicio2RangoDescanso + ' a ' + columna[dia].miercolesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].miercolesInicio1RangoDescanso + ' a ' + columna[dia].miercolesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Jueves':
                            if (columna[dia].juevesInicio1RangoDescanso && columna[dia].juevesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].juevesInicio2RangoDescanso && columna[dia].juevesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].juevesInicio2RangoDescanso + ' a ' + columna[dia].juevesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].juevesInicio1RangoDescanso + ' a ' + columna[dia].juevesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Viernes':
                            if (columna[dia].viernesInicio1RangoDescanso && columna[dia].viernesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].viernesInicio2RangoDescanso && columna[dia].viernesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].viernesInicio2RangoDescanso + ' a ' + columna[dia].viernesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].viernesInicio1RangoDescanso + ' a ' + columna[dia].viernesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Sábado':
                            if (columna[dia].sabadoInicio1RangoDescanso && columna[dia].sabadoFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].sabadoInicio2RangoDescanso && columna[dia].sabadoFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].sabadoInicio2RangoDescanso + ' a ' + columna[dia].sabadoFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].sabadoInicio1RangoDescanso + ' a ' + columna[dia].sabadoFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Domingo':
                            if (columna[dia].domingoInicio1RangoDescanso && columna[dia].domingoFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].domingoInicio2RangoDescanso && columna[dia].domingoFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].domingoInicio2RangoDescanso + ' a ' + columna[dia].domingoFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].domingoInicio1RangoDescanso + ' a ' + columna[dia].domingoFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        default:
                    }
                    break;
                case 'cantidad':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (columna[dia].lunesCantidad) {
                                return columna[dia].lunesCantidad / 60 + ' horas';
                            } else {
                                return '';
                            };
                        case 'Martes':
                            if (columna[dia].martesCantidad) {
                                return columna[dia].martesCantidad / 60 + ' horas';
                            } else {
                                return '';
                            };
                        case 'Miércoles':
                            if (columna[dia].miercolesCantidad) {
                                return columna[dia].miercolesCantidad / 60 + ' horas';
                            } else {
                                return '';
                            };
                        case 'Jueves':
                            if (columna[dia].juevesCantidad) {
                                return columna[dia].juevesCantidad / 60 + ' horas';
                            } else {
                                return '';
                            };
                        case 'Viernes':
                            if (columna[dia].viernesCantidad) {
                                return columna[dia].viernesCantidad / 60 + ' horas';
                            } else {
                                return '';
                            };
                        case 'Sábado':
                            if (columna[dia].sabadoCantidad) {
                                return columna[dia].sabadoCantidad / 60 + ' horas';
                            } else {
                                return '';
                            };
                        case 'Domingo':
                            if (columna[dia].domingoCantidad) {
                                return columna[dia].domingoCantidad / 60 + ' horas';
                            } else {
                                return '';
                            };
                        default:
                    }
                    break;
                default:
            }
        }
    };

    const gestionaValoresCasillas = (indexDia, dia, columna, diaSemana, casilla) => {
        if (columna[dia].baja || stateFestivo['estadoFestivoDia' + (indexDia - 1)]) {
            if (columna.tipoHorario === 'cantidad') {
                return '';
            } else {
                return null;
            }
        } else {
            switch (columna.tipoHorario) {
                case 'rango':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (casilla === 1) {
                                return columna[dia].lunesInicioRango ? dispatch(generaFechaAccion(columna[dia].lunesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].lunesFinRango ? dispatch(generaFechaAccion(columna[dia].lunesFinRango)) : null;
                            }
                        case 'Martes':
                            if (casilla === 1) {
                                return columna[dia].martesInicioRango ? dispatch(generaFechaAccion(columna[dia].martesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].martesFinRango ? dispatch(generaFechaAccion(columna[dia].martesFinRango)) : null;
                            }
                        case 'Miércoles':
                            if (casilla === 1) {
                                return columna[dia].miercolesInicioRango ? dispatch(generaFechaAccion(columna[dia].miercolesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].miercolesFinRango ? dispatch(generaFechaAccion(columna[dia].miercolesFinRango)) : null;
                            }
                        case 'Jueves':
                            if (casilla === 1) {
                                return columna[dia].juevesInicioRango ? dispatch(generaFechaAccion(columna[dia].juevesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].juevesFinRango ? dispatch(generaFechaAccion(columna[dia].juevesFinRango)) : null;
                            }
                        case 'Viernes':
                            if (casilla === 1) {
                                return columna[dia].viernesInicioRango ? dispatch(generaFechaAccion(columna[dia].viernesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].viernesFinRango ? dispatch(generaFechaAccion(columna[dia].viernesFinRango)) : null;
                            }
                        case 'Sábado':
                            if (casilla === 1) {
                                return columna[dia].sabadoInicioRango ? dispatch(generaFechaAccion(columna[dia].sabadoInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].sabadoFinRango ? dispatch(generaFechaAccion(columna[dia].sabadoFinRango)) : null;
                            }
                        case 'Domingo':
                            if (casilla === 1) {
                                return columna[dia].domingoInicioRango ? dispatch(generaFechaAccion(columna[dia].domingoInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].domingoFinRango ? dispatch(generaFechaAccion(columna[dia].domingoFinRango)) : null;
                            }
                        default:
                    }
                    break;
                case 'rangoDescanso':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (casilla === 1) {
                                return columna[dia].lunesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].lunesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].lunesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].lunesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesFin2RangoDescanso)) : null;
                            }
                        case 'Martes':
                            if (casilla === 1) {
                                return columna[dia].martesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].martesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].martesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].martesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesFin2RangoDescanso)) : null;
                            }
                        case 'Miércoles':
                            if (casilla === 1) {
                                return columna[dia].miercolesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].miercolesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].miercolesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].miercolesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesFin2RangoDescanso)) : null;
                            }
                        case 'Jueves':
                            if (casilla === 1) {
                                return columna[dia].juevesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].juevesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].juevesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].juevesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesFin2RangoDescanso)) : null;
                            }
                        case 'Viernes':
                            if (casilla === 1) {
                                return columna[dia].viernesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].viernesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].viernesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].viernesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesFin2RangoDescanso)) : null;
                            }
                        case 'Sábado':
                            if (casilla === 1) {
                                return columna[dia].sabadoInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].sabadoFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].sabadoInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].sabadoFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoFin2RangoDescanso)) : null;
                            }
                        case 'Domingo':
                            if (casilla === 1) {
                                return columna[dia].domingoInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].domingoFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].domingoInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].domingoFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoFin2RangoDescanso)) : null;
                            }
                        default:
                    }
                    break;
                case 'cantidad':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (casilla === 1) {
                                return columna[dia].lunesCantidad ? columna[dia].lunesCantidad : '';
                            }
                        case 'Martes':
                            if (casilla === 1) {
                                return columna[dia].martesCantidad ? columna[dia].martesCantidad : '';
                            }
                        case 'Miércoles':
                            if (casilla === 1) {
                                return columna[dia].miercolesCantidad ? columna[dia].miercolesCantidad : '';
                            }
                        case 'Jueves':
                            if (casilla === 1) {
                                return columna[dia].juevesCantidad ? columna[dia].juevesCantidad : '';
                            }
                        case 'Viernes':
                            if (casilla === 1) {
                                return columna[dia].viernesCantidad ? columna[dia].viernesCantidad : '';
                            }
                        case 'Sábado':
                            if (casilla === 1) {
                                return columna[dia].sabadoCantidad ? columna[dia].sabadoCantidad : '';
                            }
                        case 'Domingo':
                            if (casilla === 1) {
                                return columna[dia].domingoCantidad ? columna[dia].domingoCantidad : '';
                            }
                        default:
                    }
                    break;
                default:
            }
        }
    };

    const handleChangeFestivoDia = (postRef, index, diaSemana) => (e) => {
        setStateFestivo({ ...stateFestivo, [e.target.name]: e.target.checked });
        let arrayCuadrante = [];
        let objetoBuffer = {};
        objetoBuffer[postRef] = [];
        let indexABorrar = -1;
        cuadrante.forEach((columna, indexFor) => {
            columna[postRef].festivo = e.target.checked;
            if (columna.nombreTrabajador) {
                if (e.target.checked) {
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
                    let arrayBuffer = [...bufferSwitchedDiasFestivos];
                    arrayBuffer.push(objetoBuffer);
                    setBufferSwitchedDiasFestivos(arrayBuffer);
                } else {
                    let variableBuffer1, variableBuffer2, variableBuffer3, variableBuffer4;
                    bufferSwitchedDiasFestivos.forEach((registroBuffer, index) => {
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
            let arrayBuffer = [...bufferSwitchedDiasFestivos];
            arrayBuffer.splice(indexABorrar, 1);
            setBufferSwitchedDiasFestivos(arrayBuffer);
        };
        setCuadrante(arrayCuadrante);
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    const handleChangeFormTrabajadores = (index, tipoTrabajador) => (e) => {
        setColumnaIndiceAGestionar(index);
        if (tipoTrabajador === 'trabajador' || !tipoTrabajador) {
            if (centroAGestionar.horario.tipoRegistro === 'individual') {
                if (index === 0) {
                    setPosicionTrabajadorPrevioACambiar(1);
                } else {
                    const estadoTrabajadorAnterior = cuadrante[index - 1].tipoTrabajador;
                    const idTrabajadorAnterior = cuadrante[index - 1].idTrabajador;
                    if (estadoTrabajadorAnterior === 'trabajador') {
                        const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                        const posicionTrabajadorPrevioAnterior = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
                        setPosicionTrabajadorPrevioACambiar(posicionTrabajadorPrevioAnterior + 1);
                    };
                    if (estadoTrabajadorAnterior === 'suplente') {
                        const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                        const posicionSuplentePrevioAnterior = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
                        setPosicionTrabajadorPrevioACambiar(posicionSuplentePrevioAnterior + 1);

                    };
                };
            };
            setEsCambioTra(true);
            setEsInicioTra(false);
            dispatch(obtenerTrabajadorAccion('trabajadores', e.target.value));
        } else {
            if (centroAGestionar.horario.tipoRegistro === 'individual') {
                const estadoTrabajadorAnterior = cuadrante[index - 1].tipoTrabajador;
                const idTrabajadorAnterior = cuadrante[index - 1].idTrabajador;
                if (estadoTrabajadorAnterior === 'trabajador') {
                    const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                    const posicionTrabajadorPrevioAnterior = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
                    setPosicionSuplentePrevioACambiar(posicionTrabajadorPrevioAnterior);
                };
                if (estadoTrabajadorAnterior === 'suplente') {
                    const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                    const posicionSuplentePrevioAnterior = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
                    setPosicionSuplentePrevioACambiar(posicionSuplentePrevioAnterior);
                };
            };
            setEsCambioSup(true);
            setEsInicioSup(false);
            dispatch(obtenerSuplenteAccion('trabajadores', e.target.value));
        }
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    const handleActualizarTrabajadores = (index, tipoTrabajador, idTrabajador) => {
        setEsUnaActualizacionTrabajador(true);
        setColumnaIndiceAGestionar(index);
        if (tipoTrabajador === 'trabajador' || !tipoTrabajador) {
            if (centroAGestionar.horario.tipoRegistro === 'individual') {
                const trabajadorPrevio = cuadrante[index].idTrabajador;
                const posicionTrabajadorPrevioIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === trabajadorPrevio));
                const posicionTrabajadorPrevio = trabajadoresEnCuadrante[posicionTrabajadorPrevioIndex].laPosicionDelTrabajador;
                setPosicionTrabajadorPrevioACambiar(posicionTrabajadorPrevio);
            };
            setEsCambioTra(true);
            setEsInicioTra(false);
            dispatch(obtenerTrabajadorAccion('trabajadores', idTrabajador));
        } else {
            if (centroAGestionar.horario.tipoRegistro === 'individual') {
                const trabajadorPrevio = cuadrante[index].idTrabajador;
                const posicionSuplentePrevioIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === trabajadorPrevio));
                const posicionSuplentePrevio = suplentesEnCuadrante[posicionSuplentePrevioIndex].laPosicionDelTrabajador;
                setPosicionSuplentePrevioACambiar(posicionSuplentePrevio);
            };
            setEsCambioSup(true);
            setEsInicioSup(false);
            dispatch(obtenerSuplenteAccion('trabajadores', idTrabajador));
        }
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    const abrePopoverDias = (postRef, index, dia) => (e) => {
        setExpandedAccordion(false);
        scrollable.current.classList.add(classes.openAccordion);
        setAnchorElDias(anchorElDias ? null : e.currentTarget);
        setVariablesPopoverDias({
            postRef: postRef,
            index: index,
            dia: dia
        })
    };

    const handleClosePopoverDias = () => {
        setAnchorElDias(null);
        scrollable.current.classList.remove(classes.openAccordion);
        if (lastEditado) {
            lastEditado.current.classList.remove(classes.editando);
            setLastEditado(null);
        }
    };

    const abrePopoverServiciosFijos = () => (e) => {
        setExpandedAccordion(false);
        scrollable.current.classList.add(classes.openAccordion);
        setAnchorElServiciosFijos(anchorElServiciosFijos ? null : e.currentTarget);
    };

    const handleClosePopoverServiciosFijos = () => {
        if (itemPrevioEditandoServiciosFijos) {
            if (itemPrevioEditandoServiciosFijos.modificado) {
                setItemEditandoServiciosFijos(itemPrevioEditandoServiciosFijos);
            };
        };
        setItemPrevioEditandoServiciosFijos(null);
        dispatch(activarDesactivarCambioAccion(true));
        setAnchorElServiciosFijos(null);
        scrollable.current.classList.remove(classes.openAccordion);
    };

    const abrePopoverConfiguracion = () => (e) => {
        setExpandedAccordion(false);
        scrollable.current.classList.add(classes.openAccordion);
        setAnchorElConfiguracion(anchorElConfiguracion ? null : e.currentTarget);
    };

    const handleClosePopoverConfiguracion = () => {
        if (itemPrevioEditandoConfiguracion) {
            if (itemPrevioEditandoConfiguracion.modificado) {
                setItemEditandoConfiguracion(itemPrevioEditandoConfiguracion);
            };
        };
        setItemPrevioEditandoConfiguracion(null);
        dispatch(activarDesactivarCambioAccion(true));
        setAnchorElConfiguracion(null);
        scrollable.current.classList.remove(classes.openAccordion);
    };

    const abrePopoverGeneral = (postRef, indexDia, dia, columna, ref, indexColumna) => (e) => {
        let arrayCuadrante = [...cuadrante];
        if (arrayCuadrante[indexColumna][postRef].visibleVariaciones && !arrayCuadrante[indexColumna][postRef].tipoVariacion) {
            arrayCuadrante[indexColumna][postRef].visibleVariaciones = false;
            setCuadrante(arrayCuadrante);
        };
        setExpandedAccordion(false);
        scrollable.current.classList.add(classes.openAccordion);
        setAnchorElGeneral(anchorElGeneral ? null : e.currentTarget);
        setVariablesPopoverGeneral({
            postRef: postRef,
            indexDia: indexDia + 1,
            dia: dia,
            columna: columna,
            indexColumna: indexColumna
        });
        if (!cuadrante[indexColumna][postRef].modificado) {
            boxes.current[ref].classList.add(classes.editando);
        };
        setLastEditado(ref);
    };

    const handleClosePopoverGeneral = () => {
        setAnchorElGeneral(null);
        scrollable.current.classList.remove(classes.openAccordion);
        boxes.current[lastEditado].classList.remove(classes.editando);
        setLastEditado(null);
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
        setItemPrevioEditando(null);
        dispatch(activarDesactivarCambioAccion(true));
    };

    const handleChangeTimePickerInicioCuadrante = (id, index, horaPareja, hora) => {
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
            setAlert({
                mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                tipo: 'error'
            })
            setOpenSnack(true);
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
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeTimePickerFinCuadrante = (id, index, horaPareja, hora) => {
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
            setAlert({
                mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                tipo: 'error'
            })
            setOpenSnack(true);
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
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeSelectCantidad = (index, e) => {
        const idSplitted = e.target.name.split("-");
        const key = idSplitted[1];
        let arrayCuadrante = [...cuadrante];
        if (key.includes('Lunes')) {
            arrayCuadrante[index][key].lunesCantidad = e.target.value;
        };
        if (key.includes('Martes')) {
            arrayCuadrante[index][key].martesCantidad = e.target.value;
        };
        if (key.includes('Miércoles')) {
            arrayCuadrante[index][key].miercolesCantidad = e.target.value;
        };
        if (key.includes('Jueves')) {
            arrayCuadrante[index][key].juevesCantidad = e.target.value;
        };
        if (key.includes('Viernes')) {
            arrayCuadrante[index][key].viernesCantidad = e.target.value;
        };
        if (key.includes('Sábado')) {
            arrayCuadrante[index][key].sabadoCantidad = e.target.value;
        };
        if (key.includes('Domingo')) {
            arrayCuadrante[index][key].domingoCantidad = e.target.value;
        };
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeObservaciones = (index, e) => {
        const idSplitted = e.target.id.split("-");
        const key = idSplitted[2];
        let arrayCuadrante = [...cuadrante];
        arrayCuadrante[index][key].observaciones = e.target.value;
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeTipoServicio = (index, e) => {
        if (objetoCuadrante.datosInforme.computo !== 1) {
            switch (e.target.value) {
                case 'LIM':
                    if (!objetoCuadrante.datosInforme.precioHora_L) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA en la configuración del Centro o del Cuadranre para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                case 'LIME':
                    if (!objetoCuadrante.datosInforme.precioHora_E) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA ESPECIAL en la configuración del Centro o del Cuadrante para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                case 'LIMP':
                    if (!objetoCuadrante.datosInforme.precioHora_P) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA DEL PARKING en la configuración del Centro o del Cuadrante para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                case 'NAVE2':
                    if (!objetoCuadrante.datosInforme.precioHora_N) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA NAVE 2 en la configuración del Centro o del Cuadrante para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                case 'REFZ':
                    if (!objetoCuadrante.datosInforme.precioHora_R) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA REFUERZO en la configuración del Centro o del Cuadrante para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                case 'LIM1':
                    if (!objetoCuadrante.datosInforme.precioHora_L1) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA_1 en la configuración del Centro o del Cuadrante para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                case 'LIM2':
                    if (!objetoCuadrante.datosInforme.precioHora_L2) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA_2 en la configuración del Centro o del Cuadrante para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                case 'FEST':
                    if (!objetoCuadrante.datosInforme.precioHora_F) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora para SERVICIO DE LIMPIEZA DÍA FESTIVO en la configuración del Centro o del Cuadrante para poder computar",
                            tipo: 'warning'
                        })
                        setOpenSnack(true);
                    }
                    break;
                default:
            }
        };

        const idSplitted = e.target.name.split("-");
        const key = idSplitted[2];
        let arrayCuadrante = [...cuadrante];
        arrayCuadrante[index][key].tipoServicio = e.target.value;
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeFormConfiguracionCuadrante = (prop, e) => {
        if (prop === "tipoHorario") {
            setItemEditandoConfiguracion({ ...itemEditandoConfiguracion, [prop]: e.target.value });
        };
        if (prop === "computo" && e.target.value === 1) {
            setItemEditandoConfiguracion({
                ...itemEditandoConfiguracion,
                [prop]: e.target.value,
                precioHora_L: '',
                precioHora_E: '',
                precioHora_P: '',
                precioHora_N: '',
                precioHora_R: '',
                precioHora_L1: '',
                precioHora_L2: '',
                precioHora_F: ''
            });
        };
        if (prop === "computo" && e.target.value === 2) {
            setItemEditandoConfiguracion({
                ...itemEditandoConfiguracion,
                [prop]: e.target.value,
                mensualPactado: ''
            });
        };
        if (prop === "computo" && e.target.value === 3) {
            setItemEditandoConfiguracion({
                ...itemEditandoConfiguracion,
                [prop]: e.target.value
            });
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
            if (IsNumeric(e.target.value)) {
                setItemEditandoConfiguracion({ ...itemEditandoConfiguracion, [prop]: e.target.value });
            };
        };
        setItemPrevioEditandoConfiguracion({ ...itemPrevioEditandoConfiguracion, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeFormConfiguracionServiciosFijos = (tipo, prop, e) => {
        let losServicios = { ...itemEditandoServiciosFijos.servicios };
        let losEstados = { ...itemEditandoServiciosFijos.switch };
        if (tipo === "switch") {
            if (e.target.name.includes('TO')) {
                if (!e.target.checked) {
                    losServicios['precioHora_TO'] = '';
                };
                losEstados['TO'] = e.target.checked;
            };
            if (e.target.name.includes('CR')) {
                if (!e.target.checked) {
                    losServicios['precioHora_CR'] = '';
                };
                losEstados['CR'] = e.target.checked;
            };
            if (e.target.name.includes('CE')) {
                if (!e.target.checked) {
                    losServicios['precioHora_CE'] = '';
                };
                losEstados['CE'] = e.target.checked;
            };
            if (e.target.name.includes('CI')) {
                if (!e.target.checked) {
                    losServicios['precioHora_CI'] = '';
                };
                losEstados['CI'] = e.target.checked;
            };
            if (e.target.name.includes('MO')) {
                if (!e.target.checked) {
                    losServicios['precioHora_MO'] = '';
                };
                losEstados['MO'] = e.target.checked;
            };
            if (e.target.name.includes('OF')) {
                if (!e.target.checked) {
                    losServicios['precioHora_OF'] = '';
                };
                losEstados['OF'] = e.target.checked;
            };
            if (e.target.name.includes('AL')) {
                if (!e.target.checked) {
                    losServicios['precioHora_AL'] = '';
                };
                losEstados['AL'] = e.target.checked;
            };
            if (e.target.name.includes('LA')) {
                if (!e.target.checked) {
                    losServicios['precioHora_LA'] = '';
                };
                losEstados['LA'] = e.target.checked;
            };
            if (e.target.name.includes('TE')) {
                if (!e.target.checked) {
                    losServicios['precioHora_TE'] = '';
                };
                losEstados['TE'] = e.target.checked;
            };
            if (e.target.name.includes('FI')) {
                if (!e.target.checked) {
                    losServicios['precioHora_FI'] = '';
                };
                losEstados['FI'] = e.target.checked;
            };
            if (e.target.name.includes('FE')) {
                if (!e.target.checked) {
                    losServicios['precioHora_FE'] = '';
                };
                losEstados['FE'] = e.target.checked;
            };
            if (e.target.name.includes('AB')) {
                if (!e.target.checked) {
                    losServicios['precioHora_AB'] = '';
                };
                losEstados['AB'] = e.target.checked;
            };
            if (e.target.name.includes('MA')) {
                if (!e.target.checked) {
                    losServicios['precioHora_MA'] = '';
                };
                losEstados['MA'] = e.target.checked;
            };
            if (e.target.name.includes('PO')) {
                if (!e.target.checked) {
                    losServicios['precioHora_PO'] = '';
                };
                losEstados['PO'] = e.target.checked;
            };
            if (e.target.name.includes('BA')) {
                if (!e.target.checked) {
                    losServicios['precioHora_BA'] = '';
                };
                losEstados['BA'] = e.target.checked;
            };
            if (e.target.name.includes('FT')) {
                if (!e.target.checked) {
                    losServicios['precioHora_FT'] = '';
                };
                losEstados['FT'] = e.target.checked;
            };
            setItemEditandoServiciosFijos({ switch: losEstados, servicios: losServicios });
        };
        if (tipo === "input") {
            if (IsNumeric(e.target.value)) {
                losServicios[prop] = e.target.value;
                setItemEditandoServiciosFijos({ ...itemEditandoServiciosFijos, servicios: losServicios });
            }
        };
        setItemPrevioEditandoServiciosFijos({ ...itemPrevioEditandoServiciosFijos, modificado: true });
        dispatch(activarDesactivarCambioAccion(false));
    };

    const gestionItemPrevioEditando = (tipo, valores) => {
        const idSplitted = valores.id.split("-");
        const key = idSplitted[1];
        switch (tipo) {
            case 'rango':
                setItemPrevioEditando({
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
                })
                break;
            case 'rangoDescanso':
                setItemPrevioEditando({
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
                })
                break;
            case 'cantidad':
                setItemPrevioEditando({
                    index: valores.index,
                    tipo: tipo,
                    id: key,
                    cantidad: valores.cantidad,
                    observaciones: valores.observaciones,
                    visibleVariaciones: valores.visibleVariaciones,
                    tipoVariacion: valores.tipoVariacion,
                    tipoServicio: valores.tipoServicio,
                    modificado: false
                })
                break;
            default:
        }
    };

    const handleRegistrarCambioEnCasilla = (id, index, tipo) => {
        const idSplitted = id.split("-");
        const key = idSplitted[1];
        let arrayCuadrante = [...cuadrante];
        switch (tipo) {
            case 'rango':
                if (key.includes('Lunes')) {
                    if (!arrayCuadrante[index][key].lunesInicioRango && arrayCuadrante[index][key].lunesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].lunesInicioRango && !arrayCuadrante[index][key].lunesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].lunesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].lunesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Martes')) {
                    if (!arrayCuadrante[index][key].martesInicioRango && arrayCuadrante[index][key].martesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].martesInicioRango && !arrayCuadrante[index][key].martesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].martesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].martesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Miércoles')) {
                    if (!arrayCuadrante[index][key].miercolesInicioRango && arrayCuadrante[index][key].miercolesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].miercolesInicioRango && !arrayCuadrante[index][key].miercolesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].miercolesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].miercolesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Jueves')) {
                    if (!arrayCuadrante[index][key].juevesInicioRango && arrayCuadrante[index][key].juevesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].juevesInicioRango && !arrayCuadrante[index][key].juevesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].juevesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].juevesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Viernes')) {
                    if (!arrayCuadrante[index][key].viernesInicioRango && arrayCuadrante[index][key].viernesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].viernesInicioRango && !arrayCuadrante[index][key].viernesFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].viernesInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].viernesInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Sábado')) {
                    if (!arrayCuadrante[index][key].sabadoInicioRango && arrayCuadrante[index][key].sabadoFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].sabadoInicioRango && !arrayCuadrante[index][key].sabadoFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].sabadoInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].sabadoInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Domingo')) {
                    if (!arrayCuadrante[index][key].domingoInicioRango && arrayCuadrante[index][key].domingoFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].domingoInicioRango && !arrayCuadrante[index][key].domingoFinRango) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].domingoInicioRango && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].domingoInicioRango && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                break;
            case 'rangoDescanso':
                if (key.includes('Lunes')) {
                    if (!arrayCuadrante[index][key].lunesInicio1RangoDescanso && arrayCuadrante[index][key].lunesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].lunesInicio1RangoDescanso && !arrayCuadrante[index][key].lunesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!arrayCuadrante[index][key].lunesInicio2RangoDescanso && arrayCuadrante[index][key].lunesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].lunesInicio2RangoDescanso && !arrayCuadrante[index][key].lunesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].lunesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].lunesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Martes')) {
                    if (!arrayCuadrante[index][key].martesInicio1RangoDescanso && arrayCuadrante[index][key].martesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].martesInicio1RangoDescanso && !arrayCuadrante[index][key].martesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!arrayCuadrante[index][key].martesInicio2RangoDescanso && arrayCuadrante[index][key].martesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].martesInicio2RangoDescanso && !arrayCuadrante[index][key].martesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].martesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].martesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Miércoles')) {
                    if (!arrayCuadrante[index][key].miercolesInicio1RangoDescanso && arrayCuadrante[index][key].miercolesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].miercolesInicio1RangoDescanso && !arrayCuadrante[index][key].miercolesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!arrayCuadrante[index][key].miercolesInicio2RangoDescanso && arrayCuadrante[index][key].miercolesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].miercolesInicio2RangoDescanso && !arrayCuadrante[index][key].miercolesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].miercolesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].miercolesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Jueves')) {
                    if (!arrayCuadrante[index][key].juevesInicio1RangoDescanso && arrayCuadrante[index][key].juevesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].juevesInicio1RangoDescanso && !arrayCuadrante[index][key].juevesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!arrayCuadrante[index][key].juevesInicio2RangoDescanso && arrayCuadrante[index][key].juevesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].juevesInicio2RangoDescanso && !arrayCuadrante[index][key].juevesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].juevesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].juevesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Viernes')) {
                    if (!arrayCuadrante[index][key].viernesInicio1RangoDescanso && arrayCuadrante[index][key].viernesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].viernesInicio1RangoDescanso && !arrayCuadrante[index][key].viernesFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!arrayCuadrante[index][key].viernesInicio2RangoDescanso && arrayCuadrante[index][key].viernesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].viernesInicio2RangoDescanso && !arrayCuadrante[index][key].viernesFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].viernesInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].viernesInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Sábado')) {
                    if (!arrayCuadrante[index][key].sabadoInicio1RangoDescanso && arrayCuadrante[index][key].sabadoFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].sabadoInicio1RangoDescanso && !arrayCuadrante[index][key].sabadoFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!arrayCuadrante[index][key].sabadoInicio2RangoDescanso && arrayCuadrante[index][key].sabadoFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].sabadoInicio2RangoDescanso && !arrayCuadrante[index][key].sabadoFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].sabadoInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].sabadoInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Domingo')) {
                    if (!arrayCuadrante[index][key].domingoInicio1RangoDescanso && arrayCuadrante[index][key].domingoFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].domingoInicio1RangoDescanso && !arrayCuadrante[index][key].domingoFin1RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!arrayCuadrante[index][key].domingoInicio2RangoDescanso && arrayCuadrante[index][key].domingoFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (arrayCuadrante[index][key].domingoInicio2RangoDescanso && !arrayCuadrante[index][key].domingoFin2RangoDescanso) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((arrayCuadrante[index][key].domingoInicio1RangoDescanso && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].domingoInicio1RangoDescanso && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                break;
            case 'cantidad':
                if (key.includes('Lunes')) {
                    if ((arrayCuadrante[index][key].lunesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].lunesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Martes')) {
                    if ((arrayCuadrante[index][key].martesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].martesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Miércoles')) {
                    if ((arrayCuadrante[index][key].miercolesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].miercolesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Jueves')) {
                    if ((arrayCuadrante[index][key].juevesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].juevesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Viernes')) {
                    if ((arrayCuadrante[index][key].viernesCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].viernesCantidad && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Sábado')) {
                    if ((arrayCuadrante[index][key].sabadoCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].sabadoCantidad && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
                if (key.includes('Domingo')) {
                    if ((arrayCuadrante[index][key].domingoCantidad && !arrayCuadrante[index][key].tipoServicio) ||
                        (!arrayCuadrante[index][key].domingoCantidad && arrayCuadrante[index][key].tipoServicio)) {
                        setItemPrevioEditando({ ...itemPrevioEditando, modificado: false });
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
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
                        setItemPrevioEditando(null);
                        dispatch(activarDesactivarCambioAccion(true));
                        return;
                    };
                };
            };
        }
        arrayCuadrante[index][key].modificado = true;
        setCuadrante(arrayCuadrante);
        setItemPrevioEditando(null);
        dispatch(activarDesactivarCambioAccion(true));
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    const gestionItemPrevioEditandoServiciosFijos = (valores) => {
        setItemPrevioEditandoServiciosFijos({
            switch: valores.switch,
            servicios: valores.servicios
        });
    };

    const handleRegistrarCambioEnCasillaServiciosFijos = () => {
        if ((itemEditandoServiciosFijos.switch.TO && !itemEditandoServiciosFijos.servicios.precioHora_TO) ||
            (itemEditandoServiciosFijos.switch.CR && !itemEditandoServiciosFijos.servicios.precioHora_CR) ||
            (itemEditandoServiciosFijos.switch.CE && !itemEditandoServiciosFijos.servicios.precioHora_CE) ||
            (itemEditandoServiciosFijos.switch.CI && !itemEditandoServiciosFijos.servicios.precioHora_CI) ||
            (itemEditandoServiciosFijos.switch.MO && !itemEditandoServiciosFijos.servicios.precioHora_MO) ||
            (itemEditandoServiciosFijos.switch.OF && !itemEditandoServiciosFijos.servicios.precioHora_OF) ||
            (itemEditandoServiciosFijos.switch.AL && !itemEditandoServiciosFijos.servicios.precioHora_AL) ||
            (itemEditandoServiciosFijos.switch.LA && !itemEditandoServiciosFijos.servicios.precioHora_LA) ||
            (itemEditandoServiciosFijos.switch.TE && !itemEditandoServiciosFijos.servicios.precioHora_TE) ||
            (itemEditandoServiciosFijos.switch.FI && !itemEditandoServiciosFijos.servicios.precioHora_FI) ||
            (itemEditandoServiciosFijos.switch.FE && !itemEditandoServiciosFijos.servicios.precioHora_FE) ||
            (itemEditandoServiciosFijos.switch.AB && !itemEditandoServiciosFijos.servicios.precioHora_AB) ||
            (itemEditandoServiciosFijos.switch.MA && !itemEditandoServiciosFijos.servicios.precioHora_MA) ||
            (itemEditandoServiciosFijos.switch.PO && !itemEditandoServiciosFijos.servicios.precioHora_PO) ||
            (itemEditandoServiciosFijos.switch.BA && !itemEditandoServiciosFijos.servicios.precioHora_BA) ||
            (itemEditandoServiciosFijos.switch.FT && !itemEditandoServiciosFijos.servicios.precioHora_FT)) {
            setAlert({
                mensaje: "Alguno de los servicios fijos seleccionados no tiene precio. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        setLosServiciosFijos({
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
        });
        setStateSwitchTipoServicioFijoCuadrante(itemEditandoServiciosFijos.switch);
        setItemPrevioEditandoServiciosFijos(null);
        dispatch(activarDesactivarCambioAccion(true));
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    const gestionItemPrevioEditandoConfiguracion = (valores) => {
        setItemPrevioEditandoConfiguracion(valores);
    };

    const handleRegistrarCambioEnCasillaConfiguracion = () => {
        if (!itemEditandoConfiguracion.computo || !itemEditandoConfiguracion.tipoHorario) {
            setAlert({
                mensaje: "Para registrar debes elegir Modo entrada datos y Tipo cómputo. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
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
            setAlert({
                mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
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
            setAlert({
                mensaje: "Revisa el formulario, solo puede haber un tipo de cómputo de horas.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        const losDatosInforme = {
            ...objetoCuadrante.datosInforme,
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
        }
        const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, tipoHorarioGeneral: itemEditandoConfiguracion.tipoHorario, arrayCuadrante: cuadrante };
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            datosCuadrante: losDatosCuadrante,
            datosInforme: losDatosInforme
        }));
        setItemPrevioEditandoConfiguracion(null);
        dispatch(activarDesactivarCambioAccion(true));
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    const retornaIconoVariacion = (columna, postRef, diaSemana) => {
        const aRetornarIcono =
            <Tooltip title={variaciones[columna[postRef].tipoVariacion - 1].label} placement="top-end" arrow >
                <TimerIcon
                    className={classes.gris}
                    style={{ marginLeft: 3 }}
                />
            </Tooltip>;
        switch (columna.tipoHorario) {
            case 'rango':
                switch (diaSemana) {
                    case 'Lunes':
                        if (columna[postRef].lunesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Martes':
                        if (columna[postRef].martesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Miércoles':
                        if (columna[postRef].miercolesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Jueves':
                        if (columna[postRef].juevesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Viernes':
                        if (columna[postRef].viernesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Sábado':
                        if (columna[postRef].sabadoInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Domingo':
                        if (columna[postRef].domingoInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    default:
                }
                break;
            case 'rangoDescanso':
                switch (diaSemana) {
                    case 'Lunes':
                        if (columna[postRef].lunesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Martes':
                        if (columna[postRef].martesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Miércoles':
                        if (columna[postRef].miercolesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Jueves':
                        if (columna[postRef].juevesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Viernes':
                        if (columna[postRef].viernesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Sábado':
                        if (columna[postRef].sabadoInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Domingo':
                        if (columna[postRef].domingoInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    default:
                }
                break;
            case 'cantidad':
                switch (diaSemana) {
                    case 'Lunes':
                        if (columna[postRef].lunesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Martes':
                        if (columna[postRef].martesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Miércoles':
                        if (columna[postRef].miercolesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Jueves':
                        if (columna[postRef].juevesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Viernes':
                        if (columna[postRef].viernesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Sábado':
                        if (columna[postRef].sabadoCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Domingo':
                        if (columna[postRef].domingoCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    default:
                }
                break;
            default:
        }

    };
    
    const procesarDatosCuadrante = (source, totalFacturado) => {
        handleCloseMenu();
        //revisamos que el cuadrante no esté a 0
        let sumatorioHoras = 0;
        if (arrayDatosInforme.length > 0) {
            arrayDatosInforme.forEach((dato, index) => {
                sumatorioHoras += dato.totalHoras;
            });
        }
        let hayServiciosFijos = false;
        let objetoFinalServiciosFijos = {
            objeto: 'serviciosFijos',
            servicio: []
        };
        let sumatorioServiciosFijos = 0;
        for (const prop in losServiciosFijos) {
            if (losServiciosFijos[prop] && prop === 'precioHora_TO') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'TOL', precioHora_TO: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CR') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'CRIS', precioHora_CR: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CE') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'CRISE', precioHora_CE: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CI') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'CRISI', precioHora_CI: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_MO') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'MOQ', precioHora_MO: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_OF') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'OF', precioHora_OF: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_AL') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'ALMC', precioHora_AL: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_LA') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'LAB', precioHora_LA: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_TE') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'TELÑ', precioHora_TE: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FI') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'FCH.IN', precioHora_FI: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FE') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'FCH.EX', precioHora_FE: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_AB') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'ABRLL', precioHora_AB: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_MA') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'MANT', precioHora_MA: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_PO') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'PORT', precioHora_PO: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_BA') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'BACT', precioHora_BA: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FT') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                objetoFinalServiciosFijos.servicio.push({ tipoServiciofijo: 'FEST', precioHora_FT: parseFloat(losServiciosFijos[prop]) });
                hayServiciosFijos = true;
            };
        };
        if (sumatorioHoras < 1 && !hayServiciosFijos) {
            setAlert({
                mensaje: "El cuadrante no se puede registrar a 0. El trabajador asignado está de baja, añade un suplente o un trabajador para computar o añade servicios fijos.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        //firmamos
        let fechaHoy = new Date().toLocaleString() + '';
        let laFirmaActualizacion = fechaHoy + ' por ' + objetoUsuarioActivo.nombre.charAt(0).toUpperCase() + objetoUsuarioActivo.nombre.slice(1);
        setFirmaActualizacion(laFirmaActualizacion);

        //revisamos que no haya columnas vacías
        for (let i = cuadrante.length - 1; i >= 0; --i) {
            if (!cuadrante[i].nombreTrabajador || arrayDatosInforme[i].totalHoras === 0) {
                cuadrante.splice(i, 1);
                arrayDatosInforme.splice(i, 1);
            }
        };
        setTrabajadoresEnCuadrante([]);
        setSuplentesEnCuadrante([]);
        setEsCambioTra(false);
        setEsCambioSup(false);
        setEsInicioTra(true);
        setEsInicioSup(true);

        const { sumatorioHoras_L, sumatorioHoras_E, sumatorioHoras_P, sumatorioHoras_N, sumatorioHoras_R, sumatorioHoras_L1, sumatorioHoras_L2, sumatorioHoras_F, sumatorioTotal } = calculoTotalHoras();
        let elTotalAAFacturar_M = null;
        let elTotalAAFacturar_L = null;
        let elTotalAAFacturar_E = null;
        let elTotalAAFacturar_P = null;
        let elTotalAAFacturar_N = null;
        let elTotalAAFacturar_R = null;
        let elTotalAAFacturar_L1 = null;
        let elTotalAAFacturar_L2 = null;
        let elTotalAAFacturar_F = null;
        let elTotalAAFacturarTotal = null;

        if (objetoCuadrante.datosInforme.computo === 1) {
            elTotalAAFacturar_M = objetoCuadrante.datosInforme.mensualPactado;
            elTotalAAFacturarTotal = elTotalAAFacturar_M;
        };
        if (objetoCuadrante.datosInforme.computo === 2) {
            if (sumatorioHoras_L) {
                elTotalAAFacturar_L = parseFloat(objetoCuadrante.datosInforme.precioHora_L * sumatorioHoras_L);
            };
            if (sumatorioHoras_E) {
                elTotalAAFacturar_E = parseFloat(objetoCuadrante.datosInforme.precioHora_E * sumatorioHoras_E);
            };
            if (sumatorioHoras_P) {
                elTotalAAFacturar_P = parseFloat(objetoCuadrante.datosInforme.precioHora_P * sumatorioHoras_P);
            };
            if (sumatorioHoras_N) {
                elTotalAAFacturar_N = parseFloat(objetoCuadrante.datosInforme.precioHora_N * sumatorioHoras_N);
            };
            if (sumatorioHoras_R) {
                elTotalAAFacturar_R = parseFloat(objetoCuadrante.datosInforme.precioHora_R * sumatorioHoras_R);
            };
            if (sumatorioHoras_L1) {
                elTotalAAFacturar_L1 = parseFloat(objetoCuadrante.datosInforme.precioHora_L1 * sumatorioHoras_L1);
            };
            if (sumatorioHoras_L2) {
                elTotalAAFacturar_L2 = parseFloat(objetoCuadrante.datosInforme.precioHora_L2 * sumatorioHoras_L2);
            };
            if (sumatorioHoras_F) {
                elTotalAAFacturar_F = parseFloat(objetoCuadrante.datosInforme.precioHora_F * sumatorioHoras_F);
            };
            elTotalAAFacturarTotal = parseFloat((objetoCuadrante.datosInforme.precioHora_L * sumatorioHoras_L) +
                (objetoCuadrante.datosInforme.precioHora_E * sumatorioHoras_E) +
                (objetoCuadrante.datosInforme.precioHora_P * sumatorioHoras_P) +
                (objetoCuadrante.datosInforme.precioHora_N * sumatorioHoras_N) +
                (objetoCuadrante.datosInforme.precioHora_R * sumatorioHoras_R) +
                (objetoCuadrante.datosInforme.precioHora_L1 * sumatorioHoras_L1) +
                (objetoCuadrante.datosInforme.precioHora_L2 * sumatorioHoras_L2) +
                (objetoCuadrante.datosInforme.precioHora_F * sumatorioHoras_F));
        };
        if (objetoCuadrante.datosInforme.computo === 3) {
            if (objetoCuadrante.datosInforme.mensualPactado) {
                elTotalAAFacturar_M = objetoCuadrante.datosInforme.mensualPactado;
                elTotalAAFacturarTotal = elTotalAAFacturar_M;
            } else {
                if (sumatorioHoras_L) {
                    elTotalAAFacturar_L = parseFloat(objetoCuadrante.datosInforme.precioHora_L * sumatorioHoras_L);
                };
                if (sumatorioHoras_E) {
                    elTotalAAFacturar_E = parseFloat(objetoCuadrante.datosInforme.precioHora_E * sumatorioHoras_E);
                };
                if (sumatorioHoras_P) {
                    elTotalAAFacturar_P = parseFloat(objetoCuadrante.datosInforme.precioHora_P * sumatorioHoras_P);
                };
                if (sumatorioHoras_N) {
                    elTotalAAFacturar_N = parseFloat(objetoCuadrante.datosInforme.precioHora_N * sumatorioHoras_N);
                };
                if (sumatorioHoras_R) {
                    elTotalAAFacturar_R = parseFloat(objetoCuadrante.datosInforme.precioHora_R * sumatorioHoras_R);
                };
                if (sumatorioHoras_L1) {
                    elTotalAAFacturar_L1 = parseFloat(objetoCuadrante.datosInforme.precioHora_L1 * sumatorioHoras_L1);
                };
                if (sumatorioHoras_L2) {
                    elTotalAAFacturar_L2 = parseFloat(objetoCuadrante.datosInforme.precioHora_L2 * sumatorioHoras_L2);
                };
                if (sumatorioHoras_F) {
                    elTotalAAFacturar_F = parseFloat(objetoCuadrante.datosInforme.precioHora_F * sumatorioHoras_F);
                };
                elTotalAAFacturarTotal = parseFloat((objetoCuadrante.datosInforme.precioHora_L * sumatorioHoras_L) +
                    (objetoCuadrante.datosInforme.precioHora_E * sumatorioHoras_E) +
                    (objetoCuadrante.datosInforme.precioHora_P * sumatorioHoras_P) +
                    (objetoCuadrante.datosInforme.precioHora_N * sumatorioHoras_N) +
                    (objetoCuadrante.datosInforme.precioHora_R * sumatorioHoras_R) +
                    (objetoCuadrante.datosInforme.precioHora_L1 * sumatorioHoras_L1) +
                    (objetoCuadrante.datosInforme.precioHora_L2 * sumatorioHoras_L2) +
                    (objetoCuadrante.datosInforme.precioHora_F * sumatorioHoras_F));
            };
        };
        let objetoFinalCuadrante, objetoFinalInforme, objetoFinalHoras;
        let hayInforme = true;
        let hayHoras = true;
        if (cuadrante.length === 0) {
            objetoFinalCuadrante = {
                ...objetoCuadrante,
                datosCuadrante: {
                    objeto: 'cuadrante',
                    centro: objetoCuadrante.datosCuadrante.centro,
                    tipoHorarioGeneral: objetoCuadrante.datosCuadrante.tipoHorarioGeneral,
                    arrayCuadrante: []
                }
            };
            objetoFinalInforme = null;
            objetoFinalHoras = null;
            hayInforme = false;
            hayHoras = false;
        } else {
            objetoFinalCuadrante = {
                ...objetoCuadrante,
                datosCuadrante: {
                    objeto: 'cuadrante',
                    centro: objetoCuadrante.datosCuadrante.centro,
                    tipoHorarioGeneral: objetoCuadrante.datosCuadrante.tipoHorarioGeneral,
                    arrayCuadrante: dispatch(limpiarCuadranteAccion(cuadrante))
                }
            };
            objetoFinalInforme = {
                objeto: 'informe',
                centro: objetoCuadrante.datosInforme.centro,
                computo: objetoCuadrante.datosInforme.computo,
                mensualPactado: objetoCuadrante.datosInforme.mensualPactado,
                precioHora_L: objetoCuadrante.datosInforme.precioHora_L,
                precioHora_E: objetoCuadrante.datosInforme.precioHora_E,
                precioHora_P: objetoCuadrante.datosInforme.precioHora_P,
                precioHora_N: objetoCuadrante.datosInforme.precioHora_N,
                precioHora_R: objetoCuadrante.datosInforme.precioHora_R,
                precioHora_L1: objetoCuadrante.datosInforme.precioHora_L1,
                precioHora_L2: objetoCuadrante.datosInforme.precioHora_L2,
                precioHora_F: objetoCuadrante.datosInforme.precioHora_F,
                arrayTrabajadores: arrayDatosInforme,
                totalFacturado_M: elTotalAAFacturar_M,
                totalFacturado_L: elTotalAAFacturar_L,
                totalFacturado_E: elTotalAAFacturar_E,
                totalFacturado_P: elTotalAAFacturar_P,
                totalFacturado_N: elTotalAAFacturar_N,
                totalFacturado_R: elTotalAAFacturar_R,
                totalFacturado_L1: elTotalAAFacturar_L1,
                totalFacturado_L2: elTotalAAFacturar_L2,
                totalFacturado_F: elTotalAAFacturar_F,
            };
            objetoFinalHoras = {
                objeto: 'horas',
                M: objetoCuadrante.datosInforme.mensualPactado ? 1 : null,
                L: sumatorioHoras_L ? sumatorioHoras_L : null,
                E: sumatorioHoras_E ? sumatorioHoras_E : null,
                P: sumatorioHoras_P ? sumatorioHoras_P : null,
                N: sumatorioHoras_N ? sumatorioHoras_N : null,
                R: sumatorioHoras_R ? sumatorioHoras_R : null,
                L1: sumatorioHoras_L1 ? sumatorioHoras_L1 : null,
                L2: sumatorioHoras_L2 ? sumatorioHoras_L2 : null,
                F: sumatorioHoras_F ? sumatorioHoras_F : null
            };
        };

        elTotalAAFacturarTotal += sumatorioServiciosFijos;

        const cuadranteAGuardar = {
            id: objetoCuadrante.id,
            nombre: objetoCuadrante.nombre,
            actualizacion: laFirmaActualizacion,
            datos_cuadrante: JSON.stringify(objetoFinalCuadrante.datosCuadrante),
            datos_servicios: hayServiciosFijos ? JSON.stringify(objetoFinalServiciosFijos) : null,
            datos_informe: hayInforme ? JSON.stringify(objetoFinalInforme) : null,
            estado: source === 'informe' ? 'facturado' : objetoCuadrante.estado,
            total: source === 'informe' ? elTotalAAFacturarTotal : objetoCuadrante.estado === 'facturado' ? elTotalAAFacturarTotal : null,
            horas: hayHoras ? JSON.stringify(objetoFinalHoras) : null
        };
        if (cuadranteRegistrado === 'no') {
            dispatch(registrarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar));
            dispatch(cambiarACuadranteRegistradoAccion());
            dispatch(activarDesactivarCambioBotonActualizarAccion(true));
            setControladorDeEstado('venimosDeRegistrar');
        };
        if (cuadranteRegistrado === 'si') {
            if (source === 'informe') {
                setControladorDeEstado('venimosDeInforme');
            }
            dispatch(actualizarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar));
            dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        };
        dispatch(registrarIntervencionAccion(true));
        if (source !== 'informe') {
            const losDatosInforme = {
                ...objetoCuadrante.datosInforme,
                totalFacturado_M: elTotalAAFacturar_M,
                totalFacturado_L: elTotalAAFacturar_L,
                totalFacturado_E: elTotalAAFacturar_E,
                totalFacturado_P: elTotalAAFacturar_P,
                totalFacturado_N: elTotalAAFacturar_N,
                totalFacturado_R: elTotalAAFacturar_R,
                totalFacturado_L1: elTotalAAFacturar_L1,
                totalFacturado_L2: elTotalAAFacturar_L2,
                totalFacturado_F: elTotalAAFacturar_F
            };
            const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, arrayCuadrante: cuadrante };
            dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, actualizacion: laFirmaActualizacion, datosCuadrante: losDatosCuadrante, datosInforme: losDatosInforme, horas: objetoFinalHoras }));
        }
    };

    const goToInicioCuadrantes = () => {
        if (!cuadranteNuevoRegistrado) {
            handleClickOpenDialogCuadrantes2();
        } else {
            if (!intervencionRegistrada) {
                handleClickOpenDialogCuadrantes3();
                setPreValueValor({ valor: null, origen: 'inicio' });
            } else {
                reseteaContenidoCuadrante();
                setDisableSelectCentros(true);
                dispatch(vaciarDatosCuadrantesAccion());
                dispatch(cambioEstadoInicioCuadrantesAccion(true));
                dispatch(setCategoriaAccion(''));
            }
        };
        setAnchorElMenu(null);
        dispatch(vaciarDatosPendientesAccion());
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
    };

    const retornaInfoFabButton = () => {
        let sumatorioServiciosFijos = 0;
        let sumatorioHoras_L = 0;
        let sumatorioHoras_E = 0;
        let sumatorioHoras_P = 0;
        let sumatorioHoras_N = 0;
        let sumatorioHoras_R = 0;
        let sumatorioHoras_L1 = 0;
        let sumatorioHoras_L2 = 0;
        let sumatorioHoras_F = 0;
        let sumatorioTotal = 0;
        for (const prop in losServiciosFijos) {
            if (losServiciosFijos[prop]) {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
            };
        };
        if (arrayDatosInforme.length > 0) {
            arrayDatosInforme.forEach((dato, index) => {
                sumatorioHoras_L += (dato.totalHorasNormal_L + dato.totalHorasExtra_L);
                sumatorioHoras_E += (dato.totalHorasNormal_E + dato.totalHorasExtra_E);
                sumatorioHoras_P += (dato.totalHorasNormal_P + dato.totalHorasExtra_P);
                sumatorioHoras_N += (dato.totalHorasNormal_N + dato.totalHorasExtra_N);
                sumatorioHoras_R += (dato.totalHorasNormal_R + dato.totalHorasExtra_R);
                sumatorioHoras_L1 += (dato.totalHorasNormal_L1 + dato.totalHorasExtra_L1);
                sumatorioHoras_L2 += (dato.totalHorasNormal_L2 + dato.totalHorasExtra_L2);
                sumatorioHoras_F += (dato.totalHorasNormal_F + dato.totalHorasExtra_F);
                sumatorioTotal += dato.totalHoras;
            });
            if (objetoCuadrante.datosInforme.computo === 1) {
                return 'Horas: ' + sumatorioTotal + ' - Total: ' + parseFloat(objetoCuadrante.datosInforme.mensualPactado + sumatorioServiciosFijos) + ' €'
            };
            if (objetoCuadrante.datosInforme.computo === 2) {
                return 'Horas: ' + sumatorioTotal + ' - Total: ' +
                    parseFloat((objetoCuadrante.datosInforme.precioHora_L * sumatorioHoras_L) +
                        (objetoCuadrante.datosInforme.precioHora_E * sumatorioHoras_E) +
                        (objetoCuadrante.datosInforme.precioHora_P * sumatorioHoras_P) +
                        (objetoCuadrante.datosInforme.precioHora_N * sumatorioHoras_N) +
                        (objetoCuadrante.datosInforme.precioHora_R * sumatorioHoras_R) +
                        (objetoCuadrante.datosInforme.precioHora_L1 * sumatorioHoras_L1) +
                        (objetoCuadrante.datosInforme.precioHora_L2 * sumatorioHoras_L2) +
                        (objetoCuadrante.datosInforme.precioHora_F * sumatorioHoras_F) +
                        sumatorioServiciosFijos) + ' €'
            };
            if (objetoCuadrante.datosInforme.computo === 3) {
                if (objetoCuadrante.datosInforme.mensualPactado) {
                    return 'Horas: ' + sumatorioTotal + ' - Total: ' + parseFloat(objetoCuadrante.datosInforme.mensualPactado + sumatorioServiciosFijos) + ' €'
                } else {
                    return 'Horas: ' + sumatorioTotal + ' - Total: ' +
                        parseFloat((objetoCuadrante.datosInforme.precioHora_L * sumatorioHoras_L) +
                            (objetoCuadrante.datosInforme.precioHora_E * sumatorioHoras_E) +
                            (objetoCuadrante.datosInforme.precioHora_P * sumatorioHoras_P) +
                            (objetoCuadrante.datosInforme.precioHora_N * sumatorioHoras_N) +
                            (objetoCuadrante.datosInforme.precioHora_R * sumatorioHoras_R) +
                            (objetoCuadrante.datosInforme.precioHora_L1 * sumatorioHoras_L1) +
                            (objetoCuadrante.datosInforme.precioHora_L2 * sumatorioHoras_L2) +
                            (objetoCuadrante.datosInforme.precioHora_F * sumatorioHoras_F) +
                            sumatorioServiciosFijos) + ' €'
                };
            };
        }
        if (cuadranteVacio) {
            return 'Horas: 0 - Total: ' + sumatorioServiciosFijos + ' €'
        };
    };

    const generaInformacionCuadrantes = () => {
        let sumatorioHoras_L = 0;
        let sumatorioHoras_E = 0;
        let sumatorioHoras_P = 0;
        let sumatorioHoras_N = 0;
        let sumatorioHoras_R = 0;
        let sumatorioHoras_L1 = 0;
        let sumatorioHoras_L2 = 0;
        let sumatorioHoras_F = 0;
        let sumatorioTotal = 0;
        const arrayInforme = [];
        arrayInforme.push(['Mes: ' + calendarioAGestionar, 'normal']);
        arrayInforme.push(['Centro: ' + centroAGestionar.nombre, 'normal']);
        if (firmaActualizacion && intervencionRegistrada) {
            arrayInforme.push(['Estado: Actualizado el ' + firmaActualizacion, 'normal']);
        } else if (firmaActualizacion && !intervencionRegistrada) {
            arrayInforme.push(['Estado: Pendiente de actualizar', 'normal']);
        } else {
            arrayInforme.push(['Estado: Pendiente de registrar', 'normal']);
        };
        if (objetoCuadrante.datosInforme.computo === 1) {
            arrayInforme.push(['Cómputo de horas por precio mensual pactado: ' + objetoCuadrante.datosInforme.mensualPactado + ' €', 'normal']);
        };
        if (objetoCuadrante.datosInforme.computo === 2) {
            if (objetoCuadrante.datosInforme.precioHora_L) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA: ' + objetoCuadrante.datosInforme.precioHora_L + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.precioHora_E) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + objetoCuadrante.datosInforme.precioHora_E + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.precioHora_P) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + objetoCuadrante.datosInforme.precioHora_P + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.precioHora_N) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + objetoCuadrante.datosInforme.precioHora_N + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.precioHora_R) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + objetoCuadrante.datosInforme.precioHora_R + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.precioHora_L1) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_1: ' + objetoCuadrante.datosInforme.precioHora_L1 + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.precioHora_L2) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_2: ' + objetoCuadrante.datosInforme.precioHora_L2 + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.precioHora_F) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + objetoCuadrante.datosInforme.precioHora_F + ' €', 'normal']);
            };
        };
        if (objetoCuadrante.datosInforme.computo === 3) {
            if (objetoCuadrante.datosInforme.mensualPactado) {
                arrayInforme.push(['Cómputo de horas (gestión especial de horas) por precio mensual pactado: ' + objetoCuadrante.datosInforme.mensualPactado + ' €', 'normal']);
            } else {
                if (objetoCuadrante.datosInforme.precioHora_L) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA: ' + objetoCuadrante.datosInforme.precioHora_L + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.precioHora_E) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + objetoCuadrante.datosInforme.precioHora_E + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.precioHora_P) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + objetoCuadrante.datosInforme.precioHora_P + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.precioHora_N) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + objetoCuadrante.datosInforme.precioHora_N + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.precioHora_R) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + objetoCuadrante.datosInforme.precioHora_R + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.precioHora_L1) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_1: ' + objetoCuadrante.datosInforme.precioHora_L1 + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.precioHora_L2) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_2: ' + objetoCuadrante.datosInforme.precioHora_L2 + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.precioHora_F) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + objetoCuadrante.datosInforme.precioHora_F + ' €', 'normal']);
                };
            };
        };
        arrayInforme.push(['divider', 'normal']);
        arrayInforme.push(['Trabajadores:', 'normal']);
        arrayDatosInforme.map((dato, index) => {
            let elTipo;
            if (dato.tipo === 'trabajador') {
                elTipo = '(trabajador)'
            } else {
                elTipo = '(suplente)'
            };
            let nombreTrabajador = dispatch(obtenerObjetoPorIdAccion(listadoTrabajadores, dato.trabajador));
            arrayInforme.push([nombreTrabajador + ' ' + elTipo, 'normal']);
            if (dato.totalHorasExtra_L || dato.totalHorasNormal_L) {
                if (dato.totalHorasExtra_L && dato.totalHorasNormal_L) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA: ' + dato.totalHorasNormal_L + ' horas + ' + dato.totalHorasExtra_L + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_L && dato.totalHorasNormal_L) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA: ' + dato.totalHorasNormal_L + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA: ' + dato.totalHorasExtra_L + ' horas extra', 'normal']);
                };
                sumatorioHoras_L += (dato.totalHorasNormal_L + dato.totalHorasExtra_L);
            };
            if (dato.totalHorasExtra_E || dato.totalHorasNormal_E) {
                if (dato.totalHorasExtra_E && dato.totalHorasNormal_E) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + dato.totalHorasNormal_E + ' horas + ' + dato.totalHorasExtra_E + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_E && dato.totalHorasNormal_E) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + dato.totalHorasNormal_E + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + dato.totalHorasExtra_E + ' horas extra', 'normal']);
                };
                sumatorioHoras_E += (dato.totalHorasNormal_E + dato.totalHorasExtra_E);
            };
            if (dato.totalHorasExtra_P || dato.totalHorasNormal_P) {
                if (dato.totalHorasExtra_P && dato.totalHorasNormal_P) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + dato.totalHorasNormal_P + ' horas + ' + dato.totalHorasExtra_P + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_P && dato.totalHorasNormal_P) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + dato.totalHorasNormal_P + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + dato.totalHorasExtra_P + ' horas extra', 'normal']);
                };
                sumatorioHoras_P += (dato.totalHorasNormal_P + dato.totalHorasExtra_P);
            };
            if (dato.totalHorasExtra_N || dato.totalHorasNormal_N) {
                if (dato.totalHorasExtra_N && dato.totalHorasNormal_N) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + dato.totalHorasNormal_N + ' horas + ' + dato.totalHorasExtra_N + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_N && dato.totalHorasNormal_N) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + dato.totalHorasNormal_N + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + dato.totalHorasExtra_N + ' horas extra', 'normal']);
                };
                sumatorioHoras_N += (dato.totalHorasNormal_N + dato.totalHorasExtra_N);
            };
            if (dato.totalHorasExtra_R || dato.totalHorasNormal_R) {
                if (dato.totalHorasExtra_R && dato.totalHorasNormal_R) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + dato.totalHorasNormal_R + ' horas + ' + dato.totalHorasExtra_R + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_R && dato.totalHorasNormal_R) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + dato.totalHorasNormal_R + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + dato.totalHorasExtra_R + ' horas extra', 'normal']);
                };
                sumatorioHoras_R += (dato.totalHorasNormal_R + dato.totalHorasExtra_R);
            };
            if (dato.totalHorasExtra_L1 || dato.totalHorasNormal_L1) {
                if (dato.totalHorasExtra_L1 && dato.totalHorasNormal_L1) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_1: ' + dato.totalHorasNormal_L1 + ' horas + ' + dato.totalHorasExtra_L1 + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_L1 && dato.totalHorasNormal_L1) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_1: ' + dato.totalHorasNormal_L1 + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA_1: ' + dato.totalHorasExtra_L1 + ' horas extra', 'normal']);
                };
                sumatorioHoras_L1 += (dato.totalHorasNormal_L1 + dato.totalHorasExtra_L1);
            };
            if (dato.totalHorasExtra_L2 || dato.totalHorasNormal_L2) {
                if (dato.totalHorasExtra_L2 && dato.totalHorasNormal_L2) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_2: ' + dato.totalHorasNormal_L2 + ' horas + ' + dato.totalHorasExtra_L2 + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_L2 && dato.totalHorasNormal_L2) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_2: ' + dato.totalHorasNormal_L2 + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA_2: ' + dato.totalHorasExtra_L2 + ' horas extra', 'normal']);
                };
                sumatorioHoras_L2 += (dato.totalHorasNormal_L2 + dato.totalHorasExtra_L2);
            };
            if (dato.totalHorasExtra_F || dato.totalHorasNormal_F) {
                if (dato.totalHorasExtra_F && dato.totalHorasNormal_F) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + dato.totalHorasNormal_F + ' horas + ' + dato.totalHorasExtra_F + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_F && dato.totalHorasNormal_F) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + dato.totalHorasNormal_F + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + dato.totalHorasExtra_F + ' horas extra', 'normal']);
                };
                sumatorioHoras_F += (dato.totalHorasNormal_F + dato.totalHorasExtra_F);
            };
        });
        sumatorioTotal =
            (sumatorioHoras_L * objetoCuadrante.datosInforme.precioHora_L) +
            (sumatorioHoras_E * objetoCuadrante.datosInforme.precioHora_E) +
            (sumatorioHoras_P * objetoCuadrante.datosInforme.precioHora_P) +
            (sumatorioHoras_N * objetoCuadrante.datosInforme.precioHora_N) +
            (sumatorioHoras_R * objetoCuadrante.datosInforme.precioHora_R) +
            (sumatorioHoras_L1 * objetoCuadrante.datosInforme.precioHora_L1) +
            (sumatorioHoras_L2 * objetoCuadrante.datosInforme.precioHora_L2) +
            (sumatorioHoras_F * objetoCuadrante.datosInforme.precioHora_F);
        arrayInforme.push(['divider', 'normal']);
        if (objetoCuadrante.datosInforme.computo === 1) {
            arrayInforme.push(['Total a facturar según cómputo mensual pactado: ' + objetoCuadrante.datosInforme.mensualPactado + ' €', 'normal']);
        };
        if (objetoCuadrante.datosInforme.computo === 2) {
            if (sumatorioHoras_L) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA: ' + sumatorioHoras_L + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_L) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + (sumatorioHoras_L * objetoCuadrante.datosInforme.precioHora_L) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + (sumatorioHoras_L * objetoCuadrante.datosInforme.precioHora_L) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_E) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + sumatorioHoras_E + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_E) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + (sumatorioHoras_E * objetoCuadrante.datosInforme.precioHora_E) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + (sumatorioHoras_E * objetoCuadrante.datosInforme.precioHora_E) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_P) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + sumatorioHoras_P + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_P) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + (sumatorioHoras_P * objetoCuadrante.datosInforme.precioHora_P) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + (sumatorioHoras_P * objetoCuadrante.datosInforme.precioHora_P) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_N) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + sumatorioHoras_N + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_N) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + (sumatorioHoras_N * objetoCuadrante.datosInforme.precioHora_N) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + (sumatorioHoras_N * objetoCuadrante.datosInforme.precioHora_N) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_R) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + sumatorioHoras_R + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_R) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + (sumatorioHoras_R * objetoCuadrante.datosInforme.precioHora_R) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + (sumatorioHoras_R * objetoCuadrante.datosInforme.precioHora_R) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_L1) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_1: ' + sumatorioHoras_L1 + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_L1) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + (sumatorioHoras_L1 * objetoCuadrante.datosInforme.precioHora_L1) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + (sumatorioHoras_L1 * objetoCuadrante.datosInforme.precioHora_L1) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_L2) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_2: ' + sumatorioHoras_L2 + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_L2) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + (sumatorioHoras_L2 * objetoCuadrante.datosInforme.precioHora_L2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + (sumatorioHoras_L2 * objetoCuadrante.datosInforme.precioHora_L2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_F) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + sumatorioHoras_F + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.precioHora_F) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + (sumatorioHoras_F * objetoCuadrante.datosInforme.precioHora_F) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + (sumatorioHoras_F * objetoCuadrante.datosInforme.precioHora_F) + ' €', 'normal']);
                }
            };
        };
        if (objetoCuadrante.datosInforme.computo === 3) {
            if (objetoCuadrante.datosInforme.mensualPactado) {
                arrayInforme.push(['Total a facturar (gestión especial de horas) según cómputo mensual pactado: ' + objetoCuadrante.datosInforme.mensualPactado + ' €', 'normal']);
            } else {
                if (sumatorioHoras_L) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA: ' + sumatorioHoras_L + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_L) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + (sumatorioHoras_L * objetoCuadrante.datosInforme.precioHora_L) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + (sumatorioHoras_L * objetoCuadrante.datosInforme.precioHora_L) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_E) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + sumatorioHoras_E + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_E) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + (sumatorioHoras_E * objetoCuadrante.datosInforme.precioHora_E) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + (sumatorioHoras_E * objetoCuadrante.datosInforme.precioHora_E) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_P) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + sumatorioHoras_P + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_P) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + (sumatorioHoras_P * objetoCuadrante.datosInforme.precioHora_P) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + (sumatorioHoras_P * objetoCuadrante.datosInforme.precioHora_P) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_N) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + sumatorioHoras_N + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_N) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + (sumatorioHoras_N * objetoCuadrante.datosInforme.precioHora_N) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + (sumatorioHoras_N * objetoCuadrante.datosInforme.precioHora_N) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_R) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + sumatorioHoras_R + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_R) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + (sumatorioHoras_R * objetoCuadrante.datosInforme.precioHora_R) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + (sumatorioHoras_R * objetoCuadrante.datosInforme.precioHora_R) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_L1) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_1: ' + sumatorioHoras_L1 + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_L1) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + (sumatorioHoras_L1 * objetoCuadrante.datosInforme.precioHora_L1) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + (sumatorioHoras_L1 * objetoCuadrante.datosInforme.precioHora_L1) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_L2) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_2: ' + sumatorioHoras_L2 + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_L2) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + (sumatorioHoras_L2 * objetoCuadrante.datosInforme.precioHora_L2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + (sumatorioHoras_L2 * objetoCuadrante.datosInforme.precioHora_L2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_F) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + sumatorioHoras_F + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.precioHora_F) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + (sumatorioHoras_F * objetoCuadrante.datosInforme.precioHora_F) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + (sumatorioHoras_F * objetoCuadrante.datosInforme.precioHora_F) + ' €', 'normal']);
                    }
                };
            };
        };
        arrayInforme.push(['divider', 'normal']);
        arrayInforme.push(['Servicios fijos:', 'normal']);
        let sumatorioServiciosFijos = 0;
        for (const prop in losServiciosFijos) {
            if (losServiciosFijos[prop] && prop === 'precioHora_TO') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE TOLDOS: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CR') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE CRISTALES: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CE') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES EXTERIORES: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_CI') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES INTERIORES: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_MO') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA MOQUETA: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_OF') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA OFICINAS: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_AL') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ALMACENES: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_LA') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA LABORATORIO: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_TE') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA TELARAÑAS: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FI') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA INTERIOR: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FE') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA EXTERIOR: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_AB') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ABRILLANTADO: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_MA') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE MANTENIMIENTO MÁQUINA: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_PO') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA PORTERÍA: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_BA') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por BOT. NOUBACT: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
            if (losServiciosFijos[prop] && prop === 'precioHora_FT') {
                sumatorioServiciosFijos += parseFloat(losServiciosFijos[prop]);
                arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(losServiciosFijos[prop]) + ' €', 'normal']);
            };
        };
        if (objetoCuadrante.datosInforme.computo === 1 || (objetoCuadrante.datosInforme.computo === 3 && objetoCuadrante.datosInforme.mensualPactado)) {
            sumatorioTotal = objetoCuadrante.datosInforme.mensualPactado;
        };
        sumatorioTotal += sumatorioServiciosFijos;
        arrayInforme.push(['divider', 'normal']);
        arrayInforme.push(['Total General a facturar: ' + sumatorioTotal + ' €', 'normal']);
        arrayInforme.push(['Forma de pago: ' + dispatch(retornaFormaPagoAccion(centroAGestionar.formaPago)), 'normal']);
        if (centroAGestionar.diaPago) {
            arrayInforme.push(['Día de pago: ' + centroAGestionar.formaPago, 'normal']);
        };
        arrayInforme.push(['Frecuencia de pago: ' + centroAGestionar.tempPago, 'normal']);
        setArrayInformeLineas(arrayInforme);
    };

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

    const calculoTotalAFacturar = () => {

        let elTotalFacturado = 0;
        if (objetoCuadrante.datosInforme.totalFacturado_M) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_M
        };
        if (objetoCuadrante.datosInforme.totalFacturado_L) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_L
        };
        if (objetoCuadrante.datosInforme.totalFacturado_E) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_E
        };
        if (objetoCuadrante.datosInforme.totalFacturado_P) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_P
        };
        if (objetoCuadrante.datosInforme.totalFacturado_N) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_N
        };
        if (objetoCuadrante.datosInforme.totalFacturado_R) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_R
        };
        if (objetoCuadrante.datosInforme.totalFacturado_L1) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_L1
        };
        if (objetoCuadrante.datosInforme.totalFacturado_L2) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_L2
        };
        if (objetoCuadrante.datosInforme.totalFacturado_F) {
            elTotalFacturado += objetoCuadrante.datosInforme.totalFacturado_F
        };
        return elTotalFacturado;
    };

    const calculoTotalHoras = () => {
        let sumatorioHoras_L = 0;
        let sumatorioHoras_E = 0;
        let sumatorioHoras_P = 0;
        let sumatorioHoras_N = 0;
        let sumatorioHoras_R = 0;
        let sumatorioHoras_L1 = 0;
        let sumatorioHoras_L2 = 0;
        let sumatorioHoras_F = 0;
        let sumatorioTotal = 0;
        if (arrayDatosInforme.length > 0) {
            arrayDatosInforme.forEach((dato, index) => {
                sumatorioHoras_L += (dato.totalHorasNormal_L + dato.totalHorasExtra_L);
                sumatorioHoras_E += (dato.totalHorasNormal_E + dato.totalHorasExtra_E);
                sumatorioHoras_P += (dato.totalHorasNormal_P + dato.totalHorasExtra_P);
                sumatorioHoras_N += (dato.totalHorasNormal_N + dato.totalHorasExtra_N);
                sumatorioHoras_R += (dato.totalHorasNormal_R + dato.totalHorasExtra_R);
                sumatorioHoras_L1 += (dato.totalHorasNormal_L1 + dato.totalHorasExtra_L1);
                sumatorioHoras_L2 += (dato.totalHorasNormal_L2 + dato.totalHorasExtra_L2);
                sumatorioHoras_F += (dato.totalHorasNormal_F + dato.totalHorasExtra_F);
                sumatorioTotal += dato.totalHoras;
            });
        };
        return { sumatorioHoras_L, sumatorioHoras_E, sumatorioHoras_P, sumatorioHoras_N, sumatorioHoras_R, sumatorioHoras_L1, sumatorioHoras_L2, sumatorioHoras_F, sumatorioTotal }
    };

    const handleClickFacturarCuadrante = () => {
        const elTotalFacturado = calculoTotalAFacturar();
        dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, estado: 'facturado', total: elTotalFacturado }));
        procesarDatosCuadrante('informe', elTotalFacturado);
        handleCloseMenu();
    };

    const retornaIconoTipoServicio = (tipo) => {
        switch (tipo) {
            case 'LIM':
                return (
                    <Tooltip title="Servicio de limpieza" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ1, classes.small2)}>L</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIME':
                return (
                    <Tooltip title="Servicio de limpieza especial" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ2, classes.small2)}>E</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIMP':
                return (
                    <Tooltip title="Limpieza de limpieza del párking" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ3, classes.small2)}>P</Avatar>
                    </Tooltip>
                )
                break;
            case 'NAVE2':
                return (
                    <Tooltip title="Limpieza de limpieza de nave 2" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ4, classes.small2)}>N</Avatar>
                    </Tooltip>
                )
                break;
            case 'REFZ':
                return (
                    <Tooltip title="Servicio de limpieza de refuerzo" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ5, classes.small2)}>R</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIM1':
                return (
                    <Tooltip title="Servicio de limpieza 1" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ6, classes.small2)}>1</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIM2':
                return (
                    <Tooltip title="Servicio de limpieza 2" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ6, classes.small2)}>2</Avatar>
                    </Tooltip>
                )
                break;
            case 'FEST':
                return (
                    <Tooltip title="Servicio de limpieza día festivo" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ7, classes.small2)}>F</Avatar>
                    </Tooltip>
                )
                break;
            default:
        }
    };

    const handleClickActualizarCentro = () => {
        setVenimosDeActualizarCentro(true);
        dispatch(obtenerCentroAccion('centros', objetoCuadrante.datosCuadrante.centro));
        handleCloseMenu();
    };

    const handleClickFacturacionMenu = () => {
        setOpenFacturacion(!openFacturacion);
    };

    const handleClickFacturacionInteriorMenu = () => {
        setOpenFacturacionInterior(!openFacturacionInterior);
    };

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
    };

    const handleChangeFormNumumeroFactusol = (e) => {
        if (IsNumeric(e.target.value)) {
            setNumeroFactusol(e.target.value);
        }
    };

    const handleGenerarArchivos = () => {
        if (numeroFactusol) {
            const objetoDesgloseConceptos = {
                MT: objetoCuadrante.datosInforme.totalFacturado_M ? objetoCuadrante.datosInforme.totalFacturado_M : null,
                LT: objetoCuadrante.datosInforme.totalFacturado_L ? objetoCuadrante.datosInforme.totalFacturado_L : null,
                ET: objetoCuadrante.datosInforme.totalFacturado_E ? objetoCuadrante.datosInforme.totalFacturado_E : null,
                PT: objetoCuadrante.datosInforme.totalFacturado_P ? objetoCuadrante.datosInforme.totalFacturado_P : null,
                NT: objetoCuadrante.datosInforme.totalFacturado_N ? objetoCuadrante.datosInforme.totalFacturado_N : null,
                RT: objetoCuadrante.datosInforme.totalFacturado_R ? objetoCuadrante.datosInforme.totalFacturado_R : null,
                L1T: objetoCuadrante.datosInforme.totalFacturado_L1 ? objetoCuadrante.datosInforme.totalFacturado_L1 : null,
                L2T: objetoCuadrante.datosInforme.totalFacturado_L2 ? objetoCuadrante.datosInforme.totalFacturado_L2 : null,
                FT: objetoCuadrante.datosInforme.totalFacturado_F ? objetoCuadrante.datosInforme.totalFacturado_F : null,
                MH: objetoCuadrante.datosInforme.totalFacturado_M ? 1 : null,
                LH: objetoCuadrante.horas.L,
                EH: objetoCuadrante.horas.E,
                PH: objetoCuadrante.horas.P,
                NH: objetoCuadrante.horas.N,
                RH: objetoCuadrante.horas.R,
                L1H: objetoCuadrante.horas.L1,
                L2H: objetoCuadrante.horas.L2,
                FH: objetoCuadrante.horas.F
            };
            dispatch(generarArchivosXLSAccion('centros', numeroFactusol, centro, calculoTotalAFacturar(), objetoDesgloseConceptos));
            handleCloseMenu();
        } else {
            setAlert({
                mensaje: "Debes introducir el último número de factura emitida en FACTUSOL para generar los archivos.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
    };

    const handleChangeTipoHorario = (index) => (e) => {
        let arrayCuadrante = [...cuadrante];
        arrayCuadrante[index].tipoHorario = e.target.value;
        setCuadrante(arrayCuadrante);
        if (arrayCuadrante[index].tipoTrabajador === 'trabajador') {
            setEsInicioTra(false);
            setEsCambioTra(true);
            let trabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === arrayCuadrante[index].idTrabajador);
            gestionaColumnaCuadrante(trabajador, 'trabajador', true, index, false, true, e.target.value);
        } else {
            setEsInicioSup(false);
            setEsCambioSup(true);
            let suplente = suplentesEnCuadrante.find(suplente => suplente.id === arrayCuadrante[index].idTrabajador);
            gestionaColumnaCuadrante(suplente, 'suplente', true, index, false, true, e.target.value);
        }
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    //dialog

    const tituloDialogCuadrantes1 = "¿Estás seguro que quieres resetear el Cuadrante?";
    const descripcionDialogCuadrantes1 = "Para volver el cuadrante a sus valores iniciales pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo'.";
    const tituloDialogCuadrantes2 = "Registra el cuadrante";
    const descripcionDialogCuadrantes2 = "Debes registrar el cuadrante nuevo antes de cambiar. Pulsa 'Registrar Cuadrante' en el menú superior.";
    const tituloDialogCuadrantes3 = "¿Estás seguro que quieres cambiar de pantalla?";
    const descripcionDialogCuadrantes3 = "Estás tratando de cambiar de pantalla pero no has registrado los datos de tu última intervención. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo' y registra los datos.";
    const tituloDialogCuadrantes4 = 'Informe Cuadrante de Servicio';
    const descripcionDialogCuadrantes4 = retornaInformacionCuadrantes();

    const handleClickOpenDialogCuadrantes1 = () => {
        dispatch(abreObjetoDialogAccion('4'));
        handleCloseMenu();
    };

    const handleClickOpenDialogCuadrantes2 = () => {
        dispatch(abreObjetoDialogAccion('5'));
    };

    const handleClickOpenDialogCuadrantes3 = () => {
        dispatch(abreObjetoDialogAccion('7'));
    };

    const handleClickOpenDialogCuadrantes4 = () => {
        dispatch(abreObjetoDialogAccion('8'));
        handleCloseMenu();
    };

    const handleCloseDialogBotonesCuadrantes1 = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(resetearCuadranteAccion('cuadrantes', objetoCuadrante.id));
            const centroId = objetoCuadrante.datosCuadrante.centro;
            reseteaContenidoCentro();
            dispatch(setCentroAccion(centroId));
            dispatch(cambiarACuadranteNoRegistradoAccion());
            const nombreCuadrante = calendarioAGestionar + '-' + centroId;
            const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: centroId, tipoHorarioGeneral: '', arrayCuadrante: [] };
            dispatch(actualizarObjetoCuadranteAccion({
                ...objetoCuadrante,
                id: null,
                nombre: nombreCuadrante,
                actualizacion: '',
                datosCuadrante: losDatosCuadrante,
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
            }));
            dispatch(activarDesactivarCambioBotonResetearAccion(true));
            setControladorDeEstado('venimosDeResetear');
            setPreValueCalendarioAGestionarReseteo(calendarioAGestionar);
            dispatch(setCalendarioAGestionarAccion(''));
        }
        dispatch(cierraObjetoDialogAccion());
    };

    const handleCloseDialogBotonesCuadrantes3 = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(registrarIntervencionAccion(true));
            if (preValueValor.origen === 'centros') {
                reseteaContenidoCentro();
                dispatch(setCentroAccion(preValueValor.valor));
                const nombreCuadrante = calendarioAGestionar + '-' + preValueValor.valor;
                const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: preValueValor.valor, tipoHorarioGeneral: '', arrayCuadrante: [] };
                dispatch(actualizarObjetoCuadranteAccion({
                    ...objetoCuadrante,
                    id: null,
                    nombre: nombreCuadrante,
                    actualizacion: '',
                    datosCuadrante: losDatosCuadrante,
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
                        R: null
                    }
                }));
                dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
            };
            if (preValueValor.origen === 'cuadrantes') {
                reseteaContenidoCuadrante();
                dispatch(vaciarDatosCuadrantesAccion());
                setValueDatePicker(preValueValor.valor);
                setDisableSelectCentros(true);
                dispatch(setCalendarioAGestionarAccion(dispatch(retornaAnoMesAccion(preValueValor.valor))));
                dispatch(cambioEstadoInicioCuadrantesAccion(true));
            };
            if (preValueValor.origen === 'inicio') {
                reseteaContenidoCuadrante();
                setDisableSelectCentros(true);
                dispatch(vaciarDatosCuadrantesAccion());
                dispatch(cambioEstadoInicioCuadrantesAccion(true));
                dispatch(forzarRecargaGraficosCuadrantesAccion(true));
            }
        }
        dispatch(cierraObjetoDialogAccion());
    };

    const handleCloseDialogBotonesVacio = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(cierraObjetoDialogAccion());
        };
    };

    //retorno componentes    

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
                    className={clsx(classes.inicio, classes.blanc, classes.mb_5, dia[1][0] === 'Domingo' || stateFestivo['estadoFestivoDia' + (index + 1)] ? classes.diaFestivo : classes.diaLaboral)}
                    onClick={abrePopoverDias(postRef, index, dia[1][0])}
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
                    className={gestionaClassesColoresGeneral(indexDia + 1, columna[postRef].baja, columna[postRef].modificado, columna.nombreTrabajador) || null}
                    style={{ width: dimensionsColumna.width, display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
                    onClick={abrePopoverGeneral(postRef, indexDia, dia[1][0], columna, indexColumna, indexColumna)}
                >
                    <Grid item xs={10}>
                        <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillas(indexDia + 1, postRef, columna, dia[1][0])}</Typography>
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
                                retornaIconoVariacion(columna, postRef, dia[1][0])
                            ) : null}
                            {columna[postRef].tipoServicio && !columna[postRef].festivo && !columna[postRef].baja ? (
                                retornaIconoTipoServicio(columna[postRef].tipoServicio)
                            ) : null}
                        </Box>
                    </Grid>
                </Box >
            </Grid>
        )
    };

    const retornoServiciosFijosEnLayout = (elemento) => {
        let hayServicios;
        if (losServiciosFijos.precioHora_TO ||
            losServiciosFijos.precioHora_CR ||
            losServiciosFijos.precioHora_CE ||
            losServiciosFijos.precioHora_CI ||
            losServiciosFijos.precioHora_MO ||
            losServiciosFijos.precioHora_OF ||
            losServiciosFijos.precioHora_AL ||
            losServiciosFijos.precioHora_LA ||
            losServiciosFijos.precioHora_TE ||
            losServiciosFijos.precioHora_FI ||
            losServiciosFijos.precioHora_FE ||
            losServiciosFijos.precioHora_AB ||
            losServiciosFijos.precioHora_MA ||
            losServiciosFijos.precioHora_PO ||
            losServiciosFijos.precioHora_BA ||
            losServiciosFijos.precioHora_FT) {
            hayServicios = true;
        };
        if (elemento === 'grid') {
            if (hayServicios) {
                return (classes.conServicios)
            } else {
                return (classes.sinServicios)
            };
        };
        if (elemento === 'avatar') {
            if (hayServicios) {
                return (clsx(classes.conServiciosA, classes.small))
            } else {
                return (clsx(classes.sinServiciosA, classes.small))
            };
        };
        if (elemento === 'icon') {
            if (hayServicios) {
                return (<NotificationsIcon />)
            } else {
                return (<NotificationsOffIcon />)
            };
        };
        if (elemento === 'tooltip') {
            if (hayServicios) {
                return ('Cuadrante con servicios fijos')
            } else {
                return ('Cuadrante sin servicios fijos')
            };
        };
    };

    const retornaServiciosFijosEnLayoutAvatars = (tipo, index) => {
        let laClase, elTooltip, laLetra;
        switch (tipo.value) {
            case 'TOL':
                laClase = losServiciosFijos.precioHora_TO ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza de toldos: ' + losServiciosFijos.precioHora_TO + ' €';
                laLetra = 'TO';
                break;
            case 'CRIS':
                laClase = losServiciosFijos.precioHora_CR ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza de cristales: ' + losServiciosFijos.precioHora_CR + ' €';
                laLetra = 'CR';
                break;
            case 'CRISE':
                laClase = losServiciosFijos.precioHora_CE ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Limpieza cristales exteriores: ' + losServiciosFijos.precioHora_CE + ' €';
                laLetra = 'CE';
                break;
            case 'CRISI':
                laClase = losServiciosFijos.precioHora_CI ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Limpieza cristales interiores: ' + losServiciosFijos.precioHora_CI + ' €';
                laLetra = 'CI';
                break;
            case 'MOQ':
                laClase = losServiciosFijos.precioHora_MO ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza moqueta: ' + losServiciosFijos.precioHora_MO + ' €';
                laLetra = 'MO';
                break;
            case 'OF':
                laClase = losServiciosFijos.precioHora_OF ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza oficinas: ' + losServiciosFijos.precioHora_OF + ' €';
                laLetra = 'OF';
                break;
            case 'ALMC':
                laClase = losServiciosFijos.precioHora_AL ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza almacenes: ' + losServiciosFijos.precioHora_AL + ' €';
                laLetra = 'AL';
                break;
            case 'LAB':
                laClase = losServiciosFijos.precioHora_LA ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza laboratorio: ' + losServiciosFijos.precioHora_LA + ' €';
                laLetra = 'LA';
                break;
            case 'TELÑ':
                laClase = losServiciosFijos.precioHora_TE ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza telarañas: ' + losServiciosFijos.precioHora_TE + ' €';
                laLetra = 'TE';
                break;
            case 'FCH.IN':
                laClase = losServiciosFijos.precioHora_FI ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza fachada interior: ' + losServiciosFijos.precioHora_FI + ' €';
                laLetra = 'FI';
                break;
            case 'FCH.EX':
                laClase = losServiciosFijos.precioHora_FE ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza fachada exterior: ' + losServiciosFijos.precioHora_FE + ' €';
                laLetra = 'FE';
                break;
            case 'ABRLL':
                laClase = losServiciosFijos.precioHora_AB ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza abrillantado: ' + losServiciosFijos.precioHora_AB + ' €';
                laLetra = 'AB';
                break;
            case 'MANT':
                laClase = losServiciosFijos.precioHora_MA ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de mantenimiento máquina: ' + losServiciosFijos.precioHora_MA + ' €';
                laLetra = 'MA';
                break;
            case 'PORT':
                laClase = losServiciosFijos.precioHora_PO ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza portería: ' + losServiciosFijos.precioHora_PO + ' €';
                laLetra = 'PO';
                break;
            case 'BACT':
                laClase = losServiciosFijos.precioHora_BA ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Bot. Noubact: ' + losServiciosFijos.precioHora_BA + ' €';
                laLetra = 'BA';
                break;
            case 'FEST':
                laClase = losServiciosFijos.precioHora_FT ? classes.displayBlock : classes.displayNone;
                elTooltip = 'Servicio de limpieza día festivo: ' + losServiciosFijos.precioHora_FT + ' €';
                laLetra = 'FT';
                break;
            default:
        };
        return (
            <Box style={{ paddingTop: 5 }} className={laClase} key={'avatar' + index}>
                <LightTooltip title={elTooltip} placement="right">
                    <Avatar variant="square" className={clsx(classes.conServiciosA2, classes.small4)}>
                        <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                    </Avatar>
                </LightTooltip>
            </Box>
        )
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading || openLoadingActualizandoCuadrante}>
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
                                        onClick={handleClickMenu}
                                    >
                                        Gestión cuadrantes
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorElMenu}
                                        keepMounted
                                        open={Boolean(anchorElMenu)}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem
                                            onClick={goToInicioCuadrantes}
                                        >
                                            <ListItemIcon>
                                                <HomeIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Inicio Cuadrantes" />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => procesarDatosCuadrante('normal', null)}
                                            disabled={cuadranteRegistrado === 'si' ? disabledItemBotonActualizar : disabledItemBotonRegistrar}
                                        >
                                            <ListItemIcon>
                                                {cuadranteRegistrado === 'si' ? <SystemUpdateAltIcon fontSize="small" /> : <SaveIcon fontSize="small" />}
                                            </ListItemIcon>
                                            <ListItemText primary={cuadranteRegistrado === 'si' ? 'Actualizar Cuadrante' : 'Registrar Cuadrante'} />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleClickFacturacionMenu}
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
                                                onClick={handleClickFacturarCuadrante}
                                            >
                                                <ListItemText primary="Registrar factura" />
                                            </MenuItem>
                                            <MenuItem
                                                className={classes.nested}
                                                onClick={handleClickFacturacionInteriorMenu}
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
                                                                onChange={handleChangeFormNumumeroFactusol}
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
                                                        onClick={handleGenerarArchivos}
                                                        primary="Procesar"
                                                    />
                                                </MenuItem>
                                            </Collapse>
                                            {/* <MenuItem disabled={true} className={classes.nested}>                                                   
                                                    <ListItemText secondary="Imprimir factura" />
                                                </MenuItem> */}
                                        </Collapse>
                                        <MenuItem
                                            onClick={handleClickActualizarCentro}
                                        >
                                            <ListItemIcon>
                                                <CachedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Actualizar Centro" />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleClickOpenDialogCuadrantes1}
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
                                            handleChangeSelectCalendario(newValue);
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
                                        onChange={handleChangeSelectCategoria}
                                        input={
                                            <OutlinedInput
                                                labelWidth={135}
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
                                        onChange={handleChangeSelectCentro}
                                        input={
                                            <OutlinedInput
                                                labelWidth={50}
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
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    disabled={true}
                                    size="small"
                                >
                                    <InputLabel>Cuadrante</InputLabel>
                                    <Select
                                        id="form-numero-cuadrantes"
                                        value={1 || ''}
                                        // onChange={handleChangeSelectCategoria}
                                        input={
                                            <OutlinedInput
                                                labelWidth={80}
                                            />
                                        }
                                    >
                                        <MenuItem key={1} value={1}>
                                            1
                                        </MenuItem>
                                    </Select>
                                </FormControl>
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
                                            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 6, cursor: 'pointer' }}
                                            onClick={abrePopoverConfiguracion()}
                                        >
                                            <Tooltip title="Configuración general cuadrante" placement="right" arrow>
                                                <AssignmentIcon />
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                    <Grid item
                                        style={{ width: 40, marginRight: 4, marginTop: 9, paddingTop: 5, height: heightScrollable - 47 }}
                                        className={retornoServiciosFijosEnLayout('grid')}
                                    >
                                        <Box style={{ padding: 4 }}>
                                            <Tooltip title={retornoServiciosFijosEnLayout('tooltip')} placement="right" arrow>
                                                <Avatar
                                                    style={{ cursor: 'pointer' }}
                                                    className={retornoServiciosFijosEnLayout('avatar')}
                                                    onClick={abrePopoverServiciosFijos()}
                                                >
                                                    {retornoServiciosFijosEnLayout('icon')}
                                                </Avatar>
                                            </Tooltip>
                                        </Box>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            {
                                                tiposDeServicio.map((tipo, index) => (
                                                    retornaServiciosFijosEnLayoutAvatars(tipo, index)
                                                ))
                                            }
                                        </Box>
                                    </Grid>
                                </Box>
                            ) : null}
                            <Grid item xs>
                                {cuadrante.length > 0 || cuadranteVacio ? (
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
                                                        className={clsx(classes.small4)}
                                                    >
                                                        <Typography variant='body2' color="textPrimary">1</Typography>
                                                    </Avatar>

                                                </Box>
                                                {cuadrante.map((columnaCabecera, index) => (
                                                    <Box
                                                        key={`box_header_` + (index + 1)}
                                                        mx={0.3}
                                                    >
                                                        <Accordion
                                                            expanded={expandedAccordion === 'panel_' + (index + 1)}
                                                            className={gestionaClassesColoresTrabajadores(columnaCabecera.tipoTrabajador)}
                                                            style={{ width: dimensionsColumna.width }}
                                                            onChange={(e, expandedAccordion) => { handleCambioAccordionHeader(expandedAccordion, 'panel_' + (index + 1), index) }}
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
                                                                                                onClick={() => handleClickAddColumna('suplente', index)}
                                                                                                disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                                            >
                                                                                                <PersonAddIcon style={{ fontSize: 18 }} />
                                                                                            </IconButton>
                                                                                        </div>
                                                                                    </Tooltip>
                                                                                    <Tooltip title={columnaCabecera.nombreTrabajador ? "Actualizar trabajador" : ""} placement="top-end" arrow>
                                                                                        <div>
                                                                                            <IconButton
                                                                                                className={clsx(classes.btnVariacion, classes.blanc, classes.mb10)}
                                                                                                size="small"
                                                                                                onClick={() => handleActualizarTrabajadores(index, columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador)}
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
                                                                                            onClick={() => eliminarColumna(index, columnaCabecera.idTrabajador)}
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
                                                                                onChange={handleChangeFormTrabajadores(index, columnaCabecera.tipoTrabajador)}
                                                                                onOpen={() => setValorPrevioAccordionAbierto(columnaCabecera.idTrabajador)}
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
                                                                                onChange={handleChangeTipoHorario(index)}
                                                                                helpertext="Selecciona Modo entrada datos"
                                                                                disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                            >
                                                                                {
                                                                                    tipos.map((option) => (
                                                                                        <MenuItem key={option.value} value={option.value}>
                                                                                            {option.label}
                                                                                        </MenuItem>
                                                                                    ))
                                                                                }
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
                                                            onClick={() => handleClickAddColumna('trabajador', null)}
                                                        >
                                                            <PersonAddIcon style={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </Grid>
                                            <Grid container
                                                style={{ marginTop: 45 }}
                                            >
                                                <Box
                                                >
                                                    {losDiasDelMes.map((dia, index) => (
                                                        retornaCasillasDias(dia, index)
                                                    ))}
                                                </Box>
                                                {cuadrante.map((columna, indexColumna) => (
                                                    <Box
                                                        key={'Box_' + indexColumna}
                                                    >
                                                        {losDiasDelMes.map((dia, indexDia) => (
                                                            retornaCasillasGeneral(dia, indexDia, columna, indexColumna)
                                                        ))}
                                                    </Box>
                                                ))}
                                            </Grid>
                                        </Box>
                                        <Tooltip title="Informe Cuadrante" placement="left" arrow>
                                            <Fab
                                                variant="extended"
                                                className={classes.fab}
                                                onClick={handleClickOpenDialogCuadrantes4}
                                            >
                                                <Typography variant="body2" className={classes.typoFab}>{retornaInfoFabButton()}</Typography>
                                                <AssessmentIcon />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Popover
                open={openDias}
                anchorEl={anchorElDias}
                onClose={handleClosePopoverDias}
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
                                onChange={handleChangeFestivoDia(variablesPopoverDias.postRef, variablesPopoverDias.index + 1, variablesPopoverDias.dia)}
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
                onClose={handleClosePopoverGeneral}
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
                                            prValueTimePickerInicio={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillas(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prValueTimePickerFin={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillas(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 2) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={handleVisibleVariaciones}
                                            prHandleChangeTipoVariaciones={handleChangeTipoVariaciones}
                                            prHandleChangeTimePickerInicioCuadrante={handleChangeTimePickerInicioCuadrante}
                                            prHandleChangeTimePickerFinCuadrante={handleChangeTimePickerFinCuadrante}
                                            prHandleChangeObservaciones={handleChangeObservaciones}
                                            prGestionItemPrevioEditando={gestionItemPrevioEditando}
                                            prHandleRegistrarCambioEnCasilla={handleRegistrarCambioEnCasilla}
                                            prHandleChangeTipoServicio={handleChangeTipoServicio}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                        />
                                    </Fragment>
                                ) : variablesPopoverGeneral.columna.tipoHorario === 'cantidad' ? (
                                    <Fragment>
                                        <ItemCuadrante
                                            prTipo={'cantidad'}
                                            prIndex={variablesPopoverGeneral.indexColumna}
                                            prIdCantidad={'selectCantidad-' + variablesPopoverGeneral.postRef}
                                            prValueCantidadHoras={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillas(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={handleVisibleVariaciones}
                                            prHandleChangeTipoVariaciones={handleChangeTipoVariaciones}
                                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                                            prHandleChangeObservaciones={handleChangeObservaciones}
                                            prGestionItemPrevioEditando={gestionItemPrevioEditando}
                                            prHandleRegistrarCambioEnCasilla={handleRegistrarCambioEnCasilla}
                                            prHandleChangeTipoServicio={handleChangeTipoServicio}
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
                                            prValueTimePickerInicio1={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillas(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prValueTimePickerFin1={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillas(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 2) : null}
                                            prValueTimePickerInicio2={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillas(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 3) : null}
                                            prValueTimePickerFin2={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillas(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 4) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={handleVisibleVariaciones}
                                            prHandleChangeTipoVariaciones={handleChangeTipoVariaciones}
                                            prHandleChangeTimePickerInicioCuadrante={handleChangeTimePickerInicioCuadrante}
                                            prHandleChangeTimePickerFinCuadrante={handleChangeTimePickerFinCuadrante}
                                            prHandleChangeObservaciones={handleChangeObservaciones}
                                            prGestionItemPrevioEditando={gestionItemPrevioEditando}
                                            prHandleRegistrarCambioEnCasilla={handleRegistrarCambioEnCasilla}
                                            prHandleChangeTipoServicio={handleChangeTipoServicio}
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
                onClose={handleClosePopoverServiciosFijos}
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
                    style={{ width: 500, marginLeft: 10 }}>
                    <Box
                        m={0.5}
                        color="secondary.contrastText"
                        className={clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
                    >
                        Configuración servicios fijos
                    </Box>
                    <Box style={{ height: heightScrollable - 150, marginRight: -5, paddingRight: 10 }} className={classes.scrollable} >
                        <ServiciosFijos
                            prItemEditandoServiciosFijos={itemEditandoServiciosFijos}
                            prHandleChangeFormConfiguracionServiciosFijos={handleChangeFormConfiguracionServiciosFijos}
                            prGestionItemPrevioEditandoServiciosFijos={gestionItemPrevioEditandoServiciosFijos}
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
                            onClick={handleRegistrarCambioEnCasillaServiciosFijos}
                        >
                            Registrar cambio
                        </Button>
                    </Box>
                </Box>
            </Popover>
            <Popover
                open={openConfiguracion}
                anchorEl={anchorElConfiguracion}
                onClose={handleClosePopoverConfiguracion}
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
                    style={{ width: 300, marginLeft: 5 }}>
                    <Box
                        m={0.5}
                        color="secondary.contrastText"
                        className={clsx(classes.fondoAlta, classes.boxStl2, classes.mb15)}
                    >
                        Configuración general cuadrante
                    </Box>
                    <Box style={{ height: heightScrollable - 145, marginRight: -5, paddingRight: 10, paddingLeft: 5 }} className={classes.scrollable} >
                        <ConfiguracionCuadrante
                            prCentro={centroAGestionar}
                            prItemEditandoConfiguracion={itemEditandoConfiguracion}
                            prHandleChangeFormConfiguracionCuadrante={handleChangeFormConfiguracionCuadrante}
                            prGestionItemPrevioEditandoConfiguracion={gestionItemPrevioEditandoConfiguracion}
                            prCuadranteLength={cuadrante.length}
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
                            onClick={handleRegistrarCambioEnCasillaConfiguracion}
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
                prHandleCloseDialogBotones={handleCloseDialogBotonesCuadrantes1}
                prTituloDialog={tituloDialogCuadrantes1}
                prDescripcionDialog={descripcionDialogCuadrantes1}
            />
            <DialogComponente
                prIsOpen={openDialog5}
                prHandleCloseDialogBotones={handleCloseDialogBotonesVacio}
                prTituloDialog={tituloDialogCuadrantes2}
                prDescripcionDialog={descripcionDialogCuadrantes2}
                prNoTieneBotones={true}
            />
            <DialogComponente
                prIsOpen={openDialog7}
                prHandleCloseDialogBotones={handleCloseDialogBotonesCuadrantes3}
                prTituloDialog={tituloDialogCuadrantes3}
                prDescripcionDialog={descripcionDialogCuadrantes3}
            />
            <DialogComponente
                prIsOpen={openDialog8}
                prHandleCloseDialogBotones={handleCloseDialogBotonesVacio}
                prTituloDialog={tituloDialogCuadrantes4}
                prDescripcionDialog={descripcionDialogCuadrantes4}
                prNoTieneBotones={true}
                prFullWidth={true}
                prMaxWidth={true}
            />
            {/* {console.log(calendarioAGestionar)} */}
        </div>
    )
}

export default withRouter(Cuadrantes)