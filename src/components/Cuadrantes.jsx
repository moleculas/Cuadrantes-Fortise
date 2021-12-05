import React, { useState, useEffect, Fragment } from 'react';
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
import useDynamicRefs from 'use-dynamic-refs';
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
import GetAppIcon from '@material-ui/icons/GetApp';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ReplyIcon from '@material-ui/icons/Reply';
import EmailIcon from '@material-ui/icons/Email';

//pdf
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import FacturaPDF from "./FacturaPDF";

//carga componentes
import ItemCuadrante from './ItemCuadrante';
import PantallaCuadrantes from './PantallaCuadrantes';
import DialogComponente from './DialogComponente';

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
import { vaciarDatosCentrosAccion } from '../redux/centrosDucks';
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
import { forzarRecargaPendientesAccion } from '../redux/pendientesDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import { actualizarObjetoCuadranteAccion } from '../redux/cuadrantesDucks';
import { venimosDePendientesAccion } from '../redux/pendientesDucks';
import { setCategoriaAccion } from '../redux/cuadrantesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { obtenerCategoriaPorCentroAccion } from '../redux/centrosDucks';
import { setCalendarioAGestionarAccion } from '../redux/cuadrantesDucks';
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';
import { gestionarInformeAccion } from '../redux/cuadrantesDucks';
import { enviarMailAccion } from '../redux/appDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';


const categorias = Constantes.CATEGORIAS_CENTROS;
const arrayFestivos = Constantes.CALENDARIO_FESTIVOS;
const variaciones = Constantes.VARIACIONES_CUADRANTES;

const getHeightScrollable = () => (window.innerHeight - 235) || (document.documentElement.clientHeight - 235) || (document.body.clientHeight - 235);

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

const Cuadrantes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const [getRef, setRef] = useDynamicRefs();
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
    const [esFacturacion, setEsFacturacion] = useState(false);

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
        dispatch(forzarRecargaPendientesAccion(true));
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
        dispatch(onEstemAccion('cuadrantes'));
        dispatch(obtenerTrabajadoresAccion('trabajadores'));
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
        }
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
        };
        if (controladorDeEstado === 'venimosDeRegistrar') {
            //setFirmaActualizacion(objetoCuadrante.actualizacion);
            setControladorDeEstado('inicio');
        };
        if (controladorDeEstado === 'venimosDeInforme') {
            setControladorDeEstado('inicio');
        };
    }, [objetoCuadrante]);

    useEffect(() => {
        dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: ultimoIdRegistrado }));
    }, [ultimoIdRegistrado]);

    useEffect(() => {
        if (cuadranteRegistrado === 'no') {
            if (!estadoVenimosDePendientes) {
                dispatch(obtenerCentroAccion('centros', centro));
            };
            dispatch(cambioEstadoInicioCuadrantesAccion(false));
            dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
            dispatch(registrarIntervencionCuadranteNuevoAccion(false));
            dispatch(activarDesactivarCambioBotonResetearAccion(true));
        };
        if (cuadranteRegistrado === 'si') {
            dispatch(obtenerCentroAccion('centros', centro));
            dispatch(cambioEstadoInicioCuadrantesAccion(false));
            dispatch(registrarIntervencionCuadranteNuevoAccion(true));
            dispatch(activarDesactivarCambioBotonResetearAccion(false));
        };
    }, [cuadranteRegistrado]);

    useEffect(() => {
        const fetchData = () => {
            setOpenLoading(true);
            if (centroAGestionar.nombre !== '') {
                if (cuadranteRegistrado === 'no') {
                    if (centroAGestionar.trabajadores.trabajadores.length > 0) {
                        centroAGestionar.trabajadores.trabajadores.forEach((trabajadorIterado, index) => {
                            if (trabajadorIterado['trabajador_' + (index + 1)]) {
                                dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado['trabajador_' + (index + 1)]));
                            };
                            if (trabajadorIterado['suplente_' + (index + 1)]) {
                                dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado['suplente_' + (index + 1)]));
                            };
                        });
                    };
                    dispatch(actualizarObjetoCuadranteAccion({
                        ...objetoCuadrante,
                        datosInforme: {
                            objeto: 'informe',
                            centro: centroAGestionar.id,
                            computo: centroAGestionar.horario.computo,
                            mensualPactado: centroAGestionar.horario.mensualPactado,
                            precioHora: centroAGestionar.horario.precioHora,
                            arrayTrabajadores: [],
                            facturado: 'no',
                            totalFacturado: null
                        }
                    }));
                };
                if (cuadranteRegistrado === 'si') {
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
            };
            setOpenLoading(false);
        }
        fetchData();
    }, [centroAGestionar]);

    useEffect(() => {
        if (trabajadorAGestionar.nombre !== '') {
            let arrayTr;
            if (esInicioTra) {
                if (cuadranteRegistrado === 'no') {
                    const arrayCuadrante = [...cuadrante];
                    const laColumnaAnadir = gestionaColumnaCuadrante(trabajadorAGestionar, 'trabajador', false, null, false);
                    if (laColumnaAnadir) {
                        arrayCuadrante.push(laColumnaAnadir);
                        arrayTr = [...trabajadoresEnCuadrante];
                        arrayTr.push(trabajadorAGestionar);
                        setTrabajadoresEnCuadrante(arrayTr);
                    };
                    setCuadrante(arrayCuadrante);
                }
            }
            if (esCambioTra) {
                arrayTr = [...trabajadoresEnCuadrante];
                const repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === trabajadorAGestionar.id);
                const repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === trabajadorAGestionar.id);
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
                    gestionaColumnaCuadrante(trabajadorAGestionar, 'trabajador', true, columnaIndiceAGestionar, false);
                    arrayTr.push(trabajadorAGestionar);
                    setTrabajadoresEnCuadrante(arrayTr);
                    setEsCambioTra(false);
                    setColumnaIndiceAGestionar(null);
                };
                if (esUnaActualizacionTrabajador) {
                    setAlert({
                        mensaje: "Trabajador actualizado exitosamente.",
                        tipo: 'success'
                    })
                    setOpenSnack(true);
                    setEsUnaActualizacionTrabajador(false);
                };
            }
        };
    }, [trabajadorAGestionar]);

    useEffect(() => {
        if (suplenteAGestionar.nombre !== '') {
            let arraySu;
            if (esInicioSup) {
                if (cuadranteRegistrado === 'no') {
                    const arrayCuadrante = [...cuadrante];
                    const laColumnaAnadir = gestionaColumnaCuadrante(suplenteAGestionar, 'suplente', false, null, false);
                    if (laColumnaAnadir) {
                        arrayCuadrante.push(laColumnaAnadir);
                        arraySu = [...suplentesEnCuadrante];
                        arraySu.push(suplenteAGestionar);
                        setSuplentesEnCuadrante(arraySu);
                    };
                    setCuadrante(arrayCuadrante);
                }
            };
            if (esCambioSup) {
                arraySu = [...suplentesEnCuadrante];
                const repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === suplenteAGestionar.id);
                const repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === suplenteAGestionar.id);
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
                    gestionaColumnaCuadrante(suplenteAGestionar, 'suplente', true, columnaIndiceAGestionar, false);
                    arraySu.push(suplenteAGestionar);
                    setEsCambioSup(false);
                    setColumnaIndiceAGestionar(null);
                    setSuplentesEnCuadrante(arraySu);
                };
                if (esUnaActualizacionTrabajador) {
                    setAlert({
                        mensaje: "Trabajador actualizado exitosamente.",
                        tipo: 'success'
                    })
                    setOpenSnack(true);
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
            if (cuadrante[cuadrante.length - 1].nombreTrabajador) {
                setArrayDatosInforme(dispatch(gestionarInformeAccion(cuadrante, objetoCuadrante.datosCuadrante.centro)));
            };
        };
    }, [cuadrante]);

    //secuencia venimos de pendientes    

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
        if (estadoVenimosDePendientes) {
            if (categoriaPorCentro) {
                dispatch(setCategoriaAccion(categoriaPorCentro));
                setDisableSelectCentros(false);
                dispatch(obtenerCentrosPorCategoriaAccion('centros', categoriaPorCentro));
            };
            dispatch(venimosDePendientesAccion(false));
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
        if (!openLoadingCentros && !openLoadingTrabajadores && !openLoadingCuadrantes) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCentros, openLoadingTrabajadores, openLoadingCuadrantes]);

    useEffect(() => {
        if (esFacturacion || openDialog8)
            generaInformacionCuadrantes();
    }, [esFacturacion, openDialog8]);

    //funciones

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
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
        }
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
            dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, nombre: nombreCuadrante, actualizacion: '', datosCuadrante: losDatosCuadrante }));
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
                    dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: null, nombre: nombreCuadrante, actualizacion: '', datosCuadrante: losDatosCuadrante }));
                    dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
                }
            }
        }
    };

    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };

    const gestionaColumnaCuadrante = (trabajador, tipoTrabajador, esRevision, columna, esAnadirColumna) => {
        let posicionAnterior;
        if (!esRevision && !esAnadirColumna) {
            posicionAnterior = cuadrante.length - 1
        } else if (esRevision && esAnadirColumna) {
            posicionAnterior = columna
        } else {
            posicionAnterior = columna - 1
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
            stateFestivo
        ));
        if (!hayTrabajador && tipoTrabajador === 'trabajador') {
            const arrayCuadrante = [...cuadrante];
            arrayCuadrante.push(columnaAnadir);
            setCuadrante(arrayCuadrante);
            setExpandedAccordion(false);
        };
        if (!hayTrabajador && tipoTrabajador === 'suplente') {
            const arrayCuadrante = [...cuadrante];
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
        dispatch(vaciarDatosCentrosAccion());
    };

    const reseteaContenidoCentro = () => {
        //dispatch(vaciarDatosCuadrantesAccion());
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
        setEsFacturacion(false);
    };

    const handleClickAddColumna = (tipo, columna) => {
        setEsInicioTra(false);
        setEsInicioSup(false);
        setEsCambioTra(true);
        setEsCambioSup(true);
        if (tipo === 'trabajador') {
            gestionaColumnaCuadrante(null, 'trabajador', true, null, true);
        } else {
            gestionaColumnaCuadrante(null, 'suplente', true, columna, true);
        }
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
        const scrollableRef = getRef('scrollable');
        scrollableRef.current.classList.remove(classes.openAccordion);
    };

    const eliminarColumna = (columna, idTrabajador) => {
        let fromIndex;
        let arrayCuadrante = [...cuadrante];
        let numTrabajadoresQuedan = 0;
        arrayCuadrante.forEach((elemento) => {
            if (elemento.tipoTrabajador === 'trabajador') {
                numTrabajadoresQuedan++;
            }
        });
        if ((numTrabajadoresQuedan === 1 && arrayCuadrante[columna].tipoTrabajador === 'trabajador') || (arrayCuadrante.length === 1)) {
            setAlert({
                mensaje: "No es posible dejar un cuadrante sin trabajadores.",
                tipo: 'warning'
            })
            setOpenSnack(true);
            return;
        } else {
            if (arrayCuadrante[columna].tipoTrabajador === 'trabajador') {
                const arrayTr = [...trabajadoresEnCuadrante];
                const posicionTrabajador = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajador));
                if (arrayCuadrante[columna + 1] && arrayCuadrante[columna + 1].tipoTrabajador === 'suplente') {
                    const idSuplente = arrayCuadrante[columna].idTrabajador;
                    const arraySu = [...suplentesEnCuadrante];
                    const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idSuplente));
                    arrayTr.splice(posicionTrabajador, 1);
                    arraySu.splice(posicionSuplente, 1);
                    setTrabajadoresEnCuadrante(arrayTr);
                    setSuplentesEnCuadrante(arraySu);
                    fromIndex = arrayCuadrante.indexOf(arrayCuadrante[columna]);
                    arrayCuadrante.splice(fromIndex, 2);
                } else {
                    arrayTr.splice(posicionTrabajador, 1);
                    setTrabajadoresEnCuadrante(arrayTr);
                    fromIndex = arrayCuadrante.indexOf(arrayCuadrante[columna]);
                    arrayCuadrante.splice(fromIndex, 1);
                }
                setCuadrante(arrayCuadrante);
                setExpandedAccordion(false);
            } else {
                const arraySu = [...suplentesEnCuadrante];
                const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajador));
                arraySu.splice(posicionSuplente, 1);
                setSuplentesEnCuadrante(arraySu);
                fromIndex = arrayCuadrante.indexOf(arrayCuadrante[columna]);
                arrayCuadrante.splice(fromIndex, 1);
                setCuadrante(arrayCuadrante);
                setExpandedAccordion(false);
            }
        }
        const scrollableRef = getRef('scrollable');
        scrollableRef.current.classList.remove(classes.openAccordion);
        if (cuadranteRegistrado === 'si') {
            dispatch(activarDesactivarCambioBotonActualizarAccion(false));
        };
        dispatch(registrarIntervencionAccion(false));
    };

    const handleCambioAccordionHeader = (expandedAccordion, panel, index) => {
        setExpandedAccordion(expandedAccordion ? panel : true);
        const scrollableRef = getRef('scrollable');
        expandedAccordion ? scrollableRef.current.classList.add(classes.openAccordion) : scrollableRef.current.classList.remove(classes.openAccordion);
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
            setEsCambioTra(true);
            setEsInicioTra(false);
            dispatch(obtenerTrabajadorAccion('trabajadores', e.target.value));
        } else {
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
            setEsCambioTra(true);
            setEsInicioTra(false);
            dispatch(obtenerTrabajadorAccion('trabajadores', idTrabajador));
        } else {
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
        const scrollableRef = getRef('scrollable');
        scrollableRef.current.classList.add(classes.openAccordion);
        setAnchorElDias(anchorElDias ? null : e.currentTarget);
        setVariablesPopoverDias({
            postRef: postRef,
            index: index,
            dia: dia
        })
    };

    const handleClosePopoverDias = () => {
        setAnchorElDias(null);
        const scrollableRef = getRef('scrollable');
        scrollableRef.current.classList.remove(classes.openAccordion);
        if (lastEditado) {
            const casilla = getRef(lastEditado);
            casilla.current.classList.remove(classes.editando);
            setLastEditado(null);
        }
    };

    const abrePopoverGeneral = (postRef, indexDia, dia, columna, ref, indexColumna) => (e) => {
        let arrayCuadrante = [...cuadrante];
        if (arrayCuadrante[indexColumna][postRef].visibleVariaciones && !arrayCuadrante[indexColumna][postRef].tipoVariacion) {
            arrayCuadrante[indexColumna][postRef].visibleVariaciones = false;
            setCuadrante(arrayCuadrante);
        };
        setExpandedAccordion(false);
        const scrollableRef = getRef('scrollable');
        scrollableRef.current.classList.add(classes.openAccordion);
        setAnchorElGeneral(anchorElGeneral ? null : e.currentTarget);
        setVariablesPopoverGeneral({
            postRef: postRef,
            indexDia: indexDia + 1,
            dia: dia,
            columna: columna,
            indexColumna: indexColumna
        });
        const casilla = getRef(ref);
        if (!cuadrante[indexColumna][postRef].modificado) {
            casilla.current.classList.add(classes.editando);
        };
        setLastEditado(ref);
    };

    const handleClosePopoverGeneral = () => {
        setAnchorElGeneral(null);
        const scrollableRef = getRef('scrollable');
        scrollableRef.current.classList.remove(classes.openAccordion);
        const casilla = getRef(lastEditado);
        casilla.current.classList.remove(classes.editando);
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
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true })
        //setCuadrante(arrayCuadrante);
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
        //setCuadrante(arrayCuadrante);
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
        //setCuadrante(arrayCuadrante);
        dispatch(activarDesactivarCambioAccion(false));
    };

    const handleChangeObservaciones = (index, e) => {
        const idSplitted = e.target.id.split("-");
        const key = idSplitted[2];
        let arrayCuadrante = [...cuadrante];
        arrayCuadrante[index][key].observaciones = e.target.value;
        setItemPrevioEditando({ ...itemPrevioEditando, modificado: true });
        //setCuadrante(arrayCuadrante);
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion
                    ) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
                        setItemPrevioEditando(null);
                        dispatch(activarDesactivarCambioAccion(true));
                        return;
                    };
                };
                if (itemPrevioEditando.id.includes('Martes')) {
                    if (arrayCuadrante[index][key].martesCantidad === itemPrevioEditando.cantidad &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
                        setItemPrevioEditando(null);
                        dispatch(activarDesactivarCambioAccion(true));
                        return;
                    };
                };
                if (itemPrevioEditando.id.includes('Miércoles')) {
                    if (arrayCuadrante[index][key].miercolesCantidad === itemPrevioEditando.cantidad &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
                        setItemPrevioEditando(null);
                        dispatch(activarDesactivarCambioAccion(true));
                        return;
                    };
                };
                if (itemPrevioEditando.id.includes('Jueves')) {
                    if (arrayCuadrante[index][key].juevesCantidad === itemPrevioEditando.cantidad &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
                        setItemPrevioEditando(null);
                        dispatch(activarDesactivarCambioAccion(true));
                        return;
                    };
                };
                if (itemPrevioEditando.id.includes('Viernes')) {
                    if (arrayCuadrante[index][key].viernesCantidad === itemPrevioEditando.cantidad &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
                        setItemPrevioEditando(null);
                        dispatch(activarDesactivarCambioAccion(true));
                        return;
                    };
                };
                if (itemPrevioEditando.id.includes('Sábado')) {
                    if (arrayCuadrante[index][key].sabadoCantidad === itemPrevioEditando.cantidad &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
                        setItemPrevioEditando(null);
                        dispatch(activarDesactivarCambioAccion(true));
                        return;
                    };
                };
                if (itemPrevioEditando.id.includes('Domingo')) {
                    if (arrayCuadrante[index][key].domingoCantidad === itemPrevioEditando.cantidad &&
                        arrayCuadrante[index][key].observaciones === itemPrevioEditando.observaciones &&
                        arrayCuadrante[index][key].visibleVariaciones === itemPrevioEditando.visibleVariaciones &&
                        arrayCuadrante[index][key].tipoVariacion === itemPrevioEditando.tipoVariacion) {
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
        //handleClosePopoverGeneral();
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
        //revisamos que el cuadrante no esté a 0
        let sumatorioHoras = 0;
        if (arrayDatosInforme.length > 0) {
            arrayDatosInforme.forEach((dato, index) => {
                sumatorioHoras += dato.totalHoras;
            });
        }
        if (sumatorioHoras < 1) {
            setAlert({
                mensaje: "El cuadrante no se puede registrar a 0. El trabajador asignado está de baja, añade un suplente o un trabajador para computar.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        let arrayCuadrante = [...cuadrante];
        //firmamos
        let fechaHoy = new Date().toLocaleString() + '';
        let laFirmaActualizacion = fechaHoy + ' por ' + objetoUsuarioActivo.nombre.charAt(0).toUpperCase() + objetoUsuarioActivo.nombre.slice(1);
        setFirmaActualizacion(laFirmaActualizacion);
        //revisamos que no haya columnas vacías
        for (let i = arrayCuadrante.length - 1; i >= 0; --i) {
            if (!arrayCuadrante[i].nombreTrabajador) {
                arrayCuadrante.splice(i, 1);
            }
        };
        const objetoFinalCuadrante = {
            ...objetoCuadrante,
            datosCuadrante: {
                objeto: 'cuadrante',
                centro: objetoCuadrante.datosCuadrante.centro,
                arrayCuadrante: arrayCuadrante
            }
        };
        const objetoFinalInforme = {
            objeto: 'informe',
            centro: objetoCuadrante.datosInforme.centro,
            computo: objetoCuadrante.datosInforme.computo,
            mensualPactado: objetoCuadrante.datosInforme.mensualPactado,
            precioHora: objetoCuadrante.datosInforme.precioHora,
            arrayTrabajadores: arrayDatosInforme,
            facturado: source === 'informe' ? 'si' : objetoCuadrante.datosInforme.facturado,
            totalFacturado: source === 'informe' ? totalFacturado : objetoCuadrante.datosInforme.totalFacturado,
        }
        const cuadranteAGuardar = {
            id: objetoCuadrante.id,
            nombre: objetoCuadrante.nombre,
            actualizacion: laFirmaActualizacion,
            datos_cuadrante: JSON.stringify(objetoFinalCuadrante.datosCuadrante),
            datos_informe: JSON.stringify(objetoFinalInforme),
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
                dispatch(forzarRecargaPendientesAccion(true));
                dispatch(forzarRecargaGraficosCuadrantesAccion(true));
                dispatch(setCategoriaAccion(''));
            }
        };
        setAnchorElMenu(null);
    };

    const retornaInfoFabButton = () => {
        let sumatorioHoras = 0;
        if (arrayDatosInforme.length > 0) {
            arrayDatosInforme.forEach((dato, index) => {
                sumatorioHoras += dato.totalHoras;
            });
            if (objetoCuadrante.datosInforme.mensualPactado) {
                return 'Horas: ' + sumatorioHoras + ' - Total: ' + objetoCuadrante.datosInforme.mensualPactado + ' €'
            } else {
                return 'Horas: ' + sumatorioHoras + ' - Total: ' + (objetoCuadrante.datosInforme.precioHora * sumatorioHoras) + ' €'
            };
        }
    };

    const generaInformacionCuadrantes = () => {
        let sumatorioHoras = 0;
        const arrayInforme = [];
        arrayInforme.push('Mes: ' + calendarioAGestionar);
        arrayInforme.push('Centro: ' + centroAGestionar.nombre);
        if (firmaActualizacion && intervencionRegistrada) {
            arrayInforme.push('Estado: Actualizado el ' + firmaActualizacion);
        } else if (firmaActualizacion && !intervencionRegistrada) {
            arrayInforme.push('Estado: Pendiente de actualizar');
        } else {
            arrayInforme.push('Estado: Pendiente de registrar');
        };
        if (objetoCuadrante.datosInforme.mensualPactado) {
            arrayInforme.push('Cómputo de horas por precio mensual pactado: ' + objetoCuadrante.datosInforme.mensualPactado + ' €');
        } else {
            arrayInforme.push('Cómputo de horas por precio/hora: ' + objetoCuadrante.datosInforme.precioHora + ' €');
        };
        arrayInforme.push('Trabajadores:');
        arrayDatosInforme.map((dato, index) => {
            let elTipo;
            if (dato.tipo === 'trabajador') {
                elTipo = '(trabajador)'
            } else {
                elTipo = '(suplente)'
            };
            sumatorioHoras += dato.totalHoras;
            let nombreTrabajador = dispatch(obtenerObjetoPorIdAccion(listadoTrabajadores, dato.trabajador));
            if (dato.totalHorasExtra) {
                arrayInforme.push(nombreTrabajador + ' ' + elTipo + ' Total horas trabajadas mes trabajador: ' + dato.totalHorasNormal + ' horas + ' + dato.totalHorasExtra + ' horas extra')
            } else {
                arrayInforme.push(nombreTrabajador + ' ' + elTipo + ' Total horas trabajadas mes trabajador: ' + dato.totalHoras + ' horas')
            };
        });
        arrayInforme.push('Total horas trabajadas mes cuadrante: ' + sumatorioHoras + ' horas');
        if (objetoCuadrante.datosInforme.mensualPactado) {
            arrayInforme.push('Total a facturar según cómputo mensual pactado: ' + objetoCuadrante.datosInforme.mensualPactado + ' €');
        } else {
            arrayInforme.push('Total a facturar según cómputo precio/hora: ' + (sumatorioHoras * objetoCuadrante.datosInforme.precioHora) + ' €');
        };
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
                            return <Typography key={'tipo' + index} variant='body1'>{linea}</Typography>
                        })}
                    </Box>
                </Grid>
            </Fragment>
        )
    };

    const handleClickFacturarCuadrante = () => {
        setEsFacturacion(true);
        handleCloseMenu();
    };

    const handleActualizaCuadranteFacturado = () => {
        let sumatorioHoras = 0;
        let elTotalFacturado;
        arrayDatosInforme.map((dato, index) => {
            sumatorioHoras += dato.totalHoras;
        });
        if (objetoCuadrante.datosInforme.mensualPactado) {
            elTotalFacturado = objetoCuadrante.datosInforme.mensualPactado;
        } else {
            elTotalFacturado = sumatorioHoras * objetoCuadrante.datosInforme.precioHora;
        };
        const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, arrayCuadrante: cuadrante };
        const losDatosInforme = { ...objetoCuadrante.datosInforme, facturado: 'si', totalFacturado: elTotalFacturado };
        dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, datosCuadrante: losDatosCuadrante, datosInforme: losDatosInforme }));
        procesarDatosCuadrante('informe', elTotalFacturado);
        //dispatch(registrarIntervencionAccion(false));        
    };

    const handleEnviarEmail = async () => {
        const element = <FacturaPDF arrayFacturaPDF={arrayInformeLineas} />;
        const myPdf = pdf([]);
        myPdf.updateContainer(element);
        const blob = await myPdf.toBlob();
        let file = new File([blob], 'Factura-' + objetoCuadrante.nombre + '.pdf', { lastModified: (new Date()).getTime() });
        //dispatch(enviarMailAccion('artikaweb@gmail.com', 'isaiasherreroflorensa@gmail.com', file))        
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
            const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: centroId, arrayCuadrante: [] };
            dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: null, nombre: nombreCuadrante, actualizacion: '', datosCuadrante: losDatosCuadrante }));
            dispatch(activarDesactivarCambioBotonResetearAccion(true));
            setControladorDeEstado('venimosDeResetear');
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
                const losDatosCuadrante = { ...objetoCuadrante.datosCuadrante, centro: preValueValor.valor, arrayCuadrante: [] };
                dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: null, nombre: nombreCuadrante, actualizacion: '', datosCuadrante: losDatosCuadrante }));
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
                dispatch(forzarRecargaPendientesAccion(true));
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
                    ref={setRef(`box_0_` + postRef)}
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
                    ref={setRef(`box_` + (indexColumna + 1) + '_' + postRef)}
                    className={gestionaClassesColoresGeneral(indexDia + 1, columna[postRef].baja, columna[postRef].modificado, columna.nombreTrabajador) || null}
                    style={{ width: dimensionsColumna.width, display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
                    onClick={abrePopoverGeneral(postRef, indexDia, dia[1][0], columna, `box_` + (indexColumna + 1) + '_' + postRef, indexColumna)}
                >
                    <Grid item xs={10}>
                        <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillas(indexDia + 1, postRef, columna, dia[1][0])}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Box style={{ display: 'flex', flexDirection: 'row', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
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
                        </Box>
                    </Grid>
                </Box >
            </Grid>
        )
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={2} style={{ marginTop: -13 }}>
                <Grid item xs={12}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={9}>
                            <Badge
                                overlap="circle"
                                classes={{
                                    badge:
                                        firmaActualizacion && centroAGestionar.nombre && intervencionRegistrada && objetoCuadrante.datosInforme.facturado === 'si' ?
                                            classes.badgeVerd :
                                            firmaActualizacion && centroAGestionar.nombre && intervencionRegistrada && objetoCuadrante.datosInforme.facturado === 'no' ?
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
                                            firmaActualizacion && intervencionRegistrada && objetoCuadrante.datosInforme.facturado === 'no' ?
                                                ' - Estado: Actualizado el ' + firmaActualizacion :
                                                firmaActualizacion && intervencionRegistrada && objetoCuadrante.datosInforme.facturado === 'si' ?
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
                                            onClick={handleClickFacturarCuadrante}
                                            disabled={cuadranteRegistrado === 'no' ? true : false}
                                        >
                                            <ListItemIcon>
                                                <DescriptionIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Facturar Cuadrante" />
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
                        mt={3}
                        mb={3}
                    >
                        <Grid item lg={4}>
                            <Box pr={2}>
                                <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        views={['month', 'year']}
                                        inputVariant="outlined"
                                        fullWidth
                                        format="MM/yyyy"
                                        label="Mes a gestionar"
                                        minDate={new Date('2021-1')}
                                        maxDate={new Date(dispatch(retornaAnoMesAccion()))}
                                        value={valueDatePicker}
                                        onChange={(newValue) => {
                                            handleChangeSelectCalendario(newValue);
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>
                        </Grid>
                        <Grid item lg={4}>
                            <Box pr={2}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                >
                                    <InputLabel>Categoria Centro</InputLabel>
                                    <Select
                                        id="form-categorias"
                                        //label="Select"
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
                        <Grid item lg={4}>
                            <Box pr={2}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    disabled={disableSelectCentros}
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
                    </Box>
                    {cuadrante.length > 0 ? (
                        esFacturacion ? (
                            <Grid style={{ marginRight: 8, marginTop: -8 }}>
                                <Box className={clsx(classes.alignRight, classes.mb20)}>
                                    <Tooltip title="Volver al Cuadrante" placement="top" arrow>
                                        <Fab
                                            color="secondary"
                                            size="small"
                                            style={{ marginLeft: 8 }}
                                            onClick={() => setEsFacturacion(false)}
                                        >
                                            <ReplyIcon />
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title="Registrar Factura" placement="top" arrow>
                                        <Fab
                                            color="primary"
                                            size="small"
                                            style={{ marginLeft: 8 }}
                                            onClick={handleActualizaCuadranteFacturado}
                                        >
                                            <SaveIcon />
                                        </Fab>
                                    </Tooltip>
                                    <PDFDownloadLink
                                        document={<FacturaPDF arrayFacturaPDF={arrayInformeLineas} />}
                                        fileName={'Factura-' + objetoCuadrante.nombre + '.pdf'}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Tooltip title="Descargar Factura" placement="top" arrow>
                                            <Fab
                                                color="primary"
                                                size="small"
                                                style={{ marginLeft: 8 }}
                                            >
                                                <GetAppIcon />
                                            </Fab>
                                        </Tooltip>
                                    </PDFDownloadLink>
                                    <Tooltip title="Enviar Factura por mail" placement="top" arrow>
                                        <Fab
                                            color="primary"
                                            size="small"
                                            style={{ marginLeft: 8 }}
                                            onClick={handleEnviarEmail}
                                        >
                                            <EmailIcon />
                                        </Fab>
                                    </Tooltip>
                                </Box>
                                <PDFViewer showToolbar={false} style={{ width: "100%", height: "70vh" }}>
                                    <FacturaPDF arrayFacturaPDF={arrayInformeLineas} />
                                </PDFViewer>
                            </Grid>
                        ) : (
                            <Grid
                                className={clsx(classes.scrollable, classes.scrollableScroll)}
                                ref={setRef(`scrollable`)}
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
                                        ref={setRef(`scrollableCuadrante`)}
                                    >
                                        <Box
                                            ref={setRef(`box_header_0`)}
                                            p={1.5}
                                            mx={0.3}
                                            className={clsx(classes.cabecera, classes.inicio)}
                                            color="secondary.contrastText"
                                            style={{ minHeight: 38, maxHeight: 38, padding: 9 }}
                                        >
                                            <Typography variant="body2">Día</Typography>
                                        </Box>
                                        {cuadrante.map((columnaCabecera, index) => (
                                            <Box
                                                ref={setRef(`box_header_` + (index + 1))}
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
                                                                            <Tooltip title="Añadir suplente" placement="top-end" arrow>
                                                                                <IconButton
                                                                                    className={clsx(classes.btnAddSuplente, classes.blanc, classes.mb10)}
                                                                                    onClick={() => handleClickAddColumna('suplente', index)}
                                                                                >
                                                                                    <PersonAddIcon style={{ fontSize: 18 }} />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            <Tooltip title="Actualizar trabajador" placement="top-end" arrow>
                                                                                <IconButton
                                                                                    className={clsx(classes.btnVariacion, classes.blanc, classes.mb10)}
                                                                                    size="small"
                                                                                    onClick={() => handleActualizarTrabajadores(index, columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador)}
                                                                                >
                                                                                    <CachedIcon />
                                                                                </IconButton>
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
                                                                >
                                                                    <InputLabel>{(columnaCabecera.tipoTrabajador === 'trabajador' || !columnaCabecera.tipoTrabajador) ? 'Trabajador' : 'Suplente'}</InputLabel>
                                                                    <Select
                                                                        id={`form-trabajador-` + (index + 1)}
                                                                        value={columnaCabecera.idTrabajador || ''}
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
                                        ref={setRef(`scrollableInterior`)}
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
                        )
                    ) : (
                        esInicioCuadrantes ? <PantallaCuadrantes /> : null
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
                            {centroAGestionar.horario.tipo === 'rango' ? (
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
                                    />
                                </Fragment>
                            ) : centroAGestionar.horario.tipo === 'cantidad' ? (
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
                                    />
                                </Fragment>
                            ) : centroAGestionar.horario.tipo === 'rangoDescanso' ? (
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
                                    />
                                </Fragment>
                            ) : null}
                        </Box>
                    </Grid>
                </Box>
            </Popover>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
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
            {/* {console.log(centroAGestionar)} */}
        </div>
    )
}

export default withRouter(Cuadrantes)