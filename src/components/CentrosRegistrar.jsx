import React, { useState, useEffect, Fragment, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//carga componentes
import ItemListTime from './ItemListTime';

//estilos
import Clases from "../clases";

//importaciones acciones
import { registrarCentroAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { retornaHoraRangoAccion } from '../redux/appDucks';
import { retornaMinutosAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { activarDesactivarNuevoCentroAccion } from '../redux/centrosDucks';
import { activarDesactivarRegistrarCentroAccion } from '../redux/centrosDucks';
import { validarMailAccion } from '../redux/appDucks';

const categorias = Constantes.CATEGORIAS_CENTROS;
const variaciones = Constantes.VARIACIONES_HORARIOS_CENTROS;
const tipos = Constantes.MODO_ENTRADA_HORARIOS;
const totalTrabajadores = Constantes.TRABAJADORES_ASIGNADOS_CENTRO;
const computoHoras = Constantes.COMPUTO_HORAS;
const formasDePago = Constantes.FORMA_DE_PAGO;
const temporizacionDelPago = Constantes.TEMPORIZACION_PAGO;
const diaDelPago = Constantes.DIA_PAGO;
const tiposDeServicio = Constantes.TIPO_SERVICIO_FIJO;

const getHeightScrollable = () => (window.innerHeight - 260) || (document.documentElement.clientHeight - 260) || (document.body.clientHeight - 260);

//accordion
const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .02)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 46,
        '&$expanded': {
            minHeight: 46,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ paddingTop: 24, paddingRight: 24 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CentrosRegistrar = forwardRef((props, ref) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const exitoRegistroCentro = useSelector(store => store.variablesCentros.exitoRegistroCentro);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesFormRegistro, setValuesFormRegistro] = useState({
        id: null,
        nombre: '',
        estado: 'alta',
        categoria: '',
        codigo: '',
        domicilio: '',
        codigoPostal: '',
        poblacion: '',
        provincia: '',
        nif: '',
        mail: '',
        mail2: '',
        telefono: '',
        telefono2: '',
        formaPago: '',
        tempPago: '',
        diaPago: '',
        variacion: '',
        tipo: '',
        numeroTrabajadores: '',
        datosTrabajadores: [],
        datosSuplentes: [],
        computo: '',
        mensualPactado: null,
        precioHora_L: null,
        precioHora_E: null,
        precioHora_P: null,
        precioHora_N: null,
        precioHora_R: null,
        precioHora_L1: null,
        precioHora_L2: null,
        precioHora_F: null,
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
    });
    const [valueTimePickerInicioRegistro, setValueTimePickerInicioRegistro] = useState([
        {
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        }
    ]);
    const [valueTimePickerFinRegistro, setValueTimePickerFinRegistro] = useState([
        {
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        }
    ]);
    const [valueTimePickerInicioDescanso1Registro, setValueTimePickerInicioDescanso1Registro] = useState([
        {
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        }
    ]);
    const [valueTimePickerFinDescanso1Registro, setValueTimePickerFinDescanso1Registro] = useState([
        {
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        }
    ]);
    const [valueTimePickerInicioDescanso2Registro, setValueTimePickerInicioDescanso2Registro] = useState([
        {
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        }
    ]);
    const [valueTimePickerFinDescanso2Registro, setValueTimePickerFinDescanso2Registro] = useState([
        {
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        }
    ]);
    const [valueCantidadHorasRegistro, setValueCantidadHorasRegistro] = useState([
        {
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: '',
            sabado: '',
            domingo: ''
        }
    ]);
    const [valueTipoServicioRegistro, setValueTipoServicioRegistro] = useState([
        {
            lunesTipoServicio: '',
            martesTipoServicio: '',
            miercolesTipoServicio: '',
            juevesTipoServicio: '',
            viernesTipoServicio: '',
            sabadoTipoServicio: '',
            domingoTipoServicio: '',
        }
    ]);
    const [horarioIntervencionRegistro, setHorarioIntervencionRegistro] = useState({
        tipo: '',
        variacion: '',
        tipoRegistro: 'comun',
        tipoRegistroTrabajador: [
            {
                lunesInicioRango: null,
                lunesFinRango: null,
                martesInicioRango: null,
                martesFinRango: null,
                miercolesInicioRango: null,
                miercolesFinRango: null,
                juevesInicioRango: null,
                juevesFinRango: null,
                viernesInicioRango: null,
                viernesFinRango: null,
                sabadoInicioRango: null,
                sabadoFinRango: null,
                domingoInicioRango: null,
                domingoFinRango: null,
                lunesInicio1RangoDescanso: null,
                lunesInicio2RangoDescanso: null,
                lunesFin1RangoDescanso: null,
                lunesFin2RangoDescanso: null,
                martesInicio1RangoDescanso: null,
                martesInicio2RangoDescanso: null,
                martesFin1RangoDescanso: null,
                martesFin2RangoDescanso: null,
                miercolesInicio1RangoDescanso: null,
                miercolesInicio2RangoDescanso: null,
                miercolesFin1RangoDescanso: null,
                miercolesFin2RangoDescanso: null,
                juevesInicio1RangoDescanso: null,
                juevesInicio2RangoDescanso: null,
                juevesFin1RangoDescanso: null,
                juevesFin2RangoDescanso: null,
                viernesInicio1RangoDescanso: null,
                viernesInicio2RangoDescanso: null,
                viernesFin1RangoDescanso: null,
                viernesFin2RangoDescanso: null,
                sabadoInicio1RangoDescanso: null,
                sabadoInicio2RangoDescanso: null,
                sabadoFin1RangoDescanso: null,
                sabadoFin2RangoDescanso: null,
                domingoInicio1RangoDescanso: null,
                domingoInicio2RangoDescanso: null,
                domingoFin1RangoDescanso: null,
                domingoFin2RangoDescanso: null,
                lunesCantidad: '',
                martesCantidad: '',
                miercolesCantidad: '',
                juevesCantidad: '',
                viernesCantidad: '',
                sabadoCantidad: '',
                domingoCantidad: '',
                lunesTipoServicio: '',
                martesTipoServicio: '',
                miercolesTipoServicio: '',
                juevesTipoServicio: '',
                viernesTipoServicio: '',
                sabadoTipoServicio: '',
                domingoTipoServicio: '',
            }
        ],
    });
    const [trabajadoresRegistro, setTrabajadoresRegistro] = useState({
        cantidad: '',
        trabajadores: []
    });
    const [openLoading, setOpenLoading] = useState(false);
    const [stateSwitchTipoRegistro, setStateSwitchTipoRegistro] = useState(false);
    const [expandedRango, setExpandedRango] = useState(false);
    const [expandedRangoDescanso, setExpandedRangoDescanso] = useState(false);
    const [expandedCantidad, setExpandedCantidad] = useState(false);
    const [stateSwitchEstadoRegistro, setStateSwitchEstadoRegistro] = useState(false);
    const [valueTabCentrosRegistro, setValueTabCentrosRegistro] = useState(0);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [stateSwitchTipoServicioFijoRegistro, setStateSwitchTipoServicioFijoRegistro] = useState({
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

    //useEffect

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
        dispatch(onEstemAccion('registrarCentros'));
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        };
    }, [dispatch]);

    useEffect(() => {
        if (errorDeCargaTrabajadores || errorDeCargaCentros) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores, errorDeCargaCentros]);

    useEffect(() => {
        if (exitoRegistroCentro) {
            setAlert({
                mensaje: "Registro creado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoRegistroCentro]);

    useEffect(() => {
        if (!openLoadingCentros && !openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCentros, openLoadingTrabajadores]);

    useEffect(() => {
        if (horarioIntervencionRegistro.tipoRegistro === 'individual') {
            let myArray1 = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
            let myArray2 = [...valueTimePickerInicioRegistro];
            let myArray3 = [...valueTimePickerFinRegistro];
            let myArray4 = [...valueTimePickerInicioDescanso1Registro];
            let myArray5 = [...valueTimePickerFinDescanso1Registro];
            let myArray6 = [...valueTimePickerInicioDescanso2Registro];
            let myArray7 = [...valueTimePickerFinDescanso2Registro];
            let myArray8 = [...valueCantidadHorasRegistro];
            let myArray9 = [...valueTipoServicioRegistro];
            for (let i = 1; i < trabajadoresRegistro.cantidad; i++) {
                myArray1.push(
                    {
                        lunesInicioRango: null,
                        lunesFinRango: null,
                        martesInicioRango: null,
                        martesFinRango: null,
                        miercolesInicioRango: null,
                        miercolesFinRango: null,
                        juevesInicioRango: null,
                        juevesFinRango: null,
                        viernesInicioRango: null,
                        viernesFinRango: null,
                        sabadoInicioRango: null,
                        sabadoFinRango: null,
                        domingoInicioRango: null,
                        domingoFinRango: null,
                        lunesInicio1RangoDescanso: null,
                        lunesInicio2RangoDescanso: null,
                        lunesFin1RangoDescanso: null,
                        lunesFin2RangoDescanso: null,
                        martesInicio1RangoDescanso: null,
                        martesInicio2RangoDescanso: null,
                        martesFin1RangoDescanso: null,
                        martesFin2RangoDescanso: null,
                        miercolesInicio1RangoDescanso: null,
                        miercolesInicio2RangoDescanso: null,
                        miercolesFin1RangoDescanso: null,
                        miercolesFin2RangoDescanso: null,
                        juevesInicio1RangoDescanso: null,
                        juevesInicio2RangoDescanso: null,
                        juevesFin1RangoDescanso: null,
                        juevesFin2RangoDescanso: null,
                        viernesInicio1RangoDescanso: null,
                        viernesInicio2RangoDescanso: null,
                        viernesFin1RangoDescanso: null,
                        viernesFin2RangoDescanso: null,
                        sabadoInicio1RangoDescanso: null,
                        sabadoInicio2RangoDescanso: null,
                        sabadoFin1RangoDescanso: null,
                        sabadoFin2RangoDescanso: null,
                        domingoInicio1RangoDescanso: null,
                        domingoInicio2RangoDescanso: null,
                        domingoFin1RangoDescanso: null,
                        domingoFin2RangoDescanso: null,
                        lunesCantidad: '',
                        martesCantidad: '',
                        miercolesCantidad: '',
                        juevesCantidad: '',
                        viernesCantidad: '',
                        sabadoCantidad: '',
                        domingoCantidad: '',
                        lunesTipoServicio: '',
                        martesTipoServicio: '',
                        miercolesTipoServicio: '',
                        juevesTipoServicio: '',
                        viernesTipoServicio: '',
                        sabadoTipoServicio: '',
                        domingoTipoServicio: '',
                    }
                );
                myArray2.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray3.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray4.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray5.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray6.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray7.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray8.push(
                    {
                        lunes: '',
                        martes: '',
                        miercoles: '',
                        jueves: '',
                        viernes: '',
                        sabado: '',
                        domingo: ''
                    }
                );
                myArray9.push(
                    {
                        lunesTipoServicio: '',
                        martesTipoServicio: '',
                        miercolesTipoServicio: '',
                        juevesTipoServicio: '',
                        viernesTipoServicio: '',
                        sabadoTipoServicio: '',
                        domingoTipoServicio: '',
                    }
                );
            };
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioRegistro(myArray2);
            setValueTimePickerFinRegistro(myArray3);
            setValueTimePickerInicioDescanso1Registro(myArray4);
            setValueTimePickerFinDescanso1Registro(myArray5);
            setValueTimePickerInicioDescanso2Registro(myArray6);
            setValueTimePickerFinDescanso2Registro(myArray7);
            setValueCantidadHorasRegistro(myArray8);
            setValueTipoServicioRegistro(myArray9);
        };
    }, [horarioIntervencionRegistro.tipoRegistro]);

    //funciones

    const handleChangeTabCentrosRegistro = (event, newValue) => {
        setValueTabCentrosRegistro(newValue);
    };

    const handleChangeAccordion = (panel, tipo) => (event, isExpanded) => {
        if (tipo === 'rango') {
            setExpandedRango(isExpanded ? panel : false);
        };
        if (tipo === 'cantidad') {
            setExpandedCantidad(isExpanded ? panel : false);
        };
        if (tipo === 'rangoDescanso') {
            setExpandedRangoDescanso(isExpanded ? panel : false);
        };
    };

    const retornaHoraRango = (laHora) => {
        return dispatch(retornaHoraRangoAccion(laHora));
    };

    const retornaMinutos = (primeraHora, segundaHora) => {
        return dispatch(retornaMinutosAccion(primeraHora, segundaHora));
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
    };

    const handleChangeFormRegistro = (prop) => (e) => {
        if (prop === "variacion") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, variacion: e.target.value });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "computo") {
            setValuesFormRegistro({
                ...valuesFormRegistro, [prop]: e.target.value,
                mensualPactado: null,
                precioHora_L: null,
                precioHora_E: null,
                precioHora_P: null,
                precioHora_N: null,
                precioHora_R: null,
                precioHora_L1: null,
                precioHora_L2: null,
                precioHora_F: null
            });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "mensualPactado") {
            if (IsNumeric(e.target.value)) {
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
                dispatch(activarDesactivarRegistrarCentroAccion(false));
            }
            return;
        };
        if (prop === "precioHora_L" ||
            prop === "precioHora_E" ||
            prop === "precioHora_P" ||
            prop === "precioHora_N" ||
            prop === "precioHora_R" ||
            prop === "precioHora_L1" ||
            prop === "precioHora_L2" ||
            prop === "precioHora_F" ||
            prop === "precioHora_TO" ||
            prop === "precioHora_CR" ||
            prop === "precioHora_CE" ||
            prop === "precioHora_CI" ||
            prop === "precioHora_MO" ||
            prop === "precioHora_OF" ||
            prop === "precioHora_AL" ||
            prop === "precioHora_LA" ||
            prop === "precioHora_TE" ||
            prop === "precioHora_FI" ||
            prop === "precioHora_FE" ||
            prop === "precioHora_AB" ||
            prop === "precioHora_MA" ||
            prop === "precioHora_PO" ||
            prop === "precioHora_BA" ||
            prop === "precioHora_FT"
        ) {
            if (IsNumeric(e.target.value)) {
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
                dispatch(activarDesactivarRegistrarCentroAccion(false));
            }
            return;
        };
        if (prop === "tipo") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setStateSwitchTipoRegistro(false);
            setHorarioIntervencionRegistro({
                ...horarioIntervencionRegistro,
                tipo: e.target.value,
                tipoRegistro: 'comun',
                tipoRegistroTrabajador: [
                    {
                        lunesInicioRango: null,
                        lunesFinRango: null,
                        martesInicioRango: null,
                        martesFinRango: null,
                        miercolesInicioRango: null,
                        miercolesFinRango: null,
                        juevesInicioRango: null,
                        juevesFinRango: null,
                        viernesInicioRango: null,
                        viernesFinRango: null,
                        sabadoInicioRango: null,
                        sabadoFinRango: null,
                        domingoInicioRango: null,
                        domingoFinRango: null,
                        lunesInicio1RangoDescanso: null,
                        lunesInicio2RangoDescanso: null,
                        lunesFin1RangoDescanso: null,
                        lunesFin2RangoDescanso: null,
                        martesInicio1RangoDescanso: null,
                        martesInicio2RangoDescanso: null,
                        martesFin1RangoDescanso: null,
                        martesFin2RangoDescanso: null,
                        miercolesInicio1RangoDescanso: null,
                        miercolesInicio2RangoDescanso: null,
                        miercolesFin1RangoDescanso: null,
                        miercolesFin2RangoDescanso: null,
                        juevesInicio1RangoDescanso: null,
                        juevesInicio2RangoDescanso: null,
                        juevesFin1RangoDescanso: null,
                        juevesFin2RangoDescanso: null,
                        viernesInicio1RangoDescanso: null,
                        viernesInicio2RangoDescanso: null,
                        viernesFin1RangoDescanso: null,
                        viernesFin2RangoDescanso: null,
                        sabadoInicio1RangoDescanso: null,
                        sabadoInicio2RangoDescanso: null,
                        sabadoFin1RangoDescanso: null,
                        sabadoFin2RangoDescanso: null,
                        domingoInicio1RangoDescanso: null,
                        domingoInicio2RangoDescanso: null,
                        domingoFin1RangoDescanso: null,
                        domingoFin2RangoDescanso: null,
                        lunesCantidad: '',
                        martesCantidad: '',
                        miercolesCantidad: '',
                        juevesCantidad: '',
                        viernesCantidad: '',
                        sabadoCantidad: '',
                        domingoCantidad: '',
                        lunesTipoServicio: '',
                        martesTipoServicio: '',
                        miercolesTipoServicio: '',
                        juevesTipoServicio: '',
                        viernesTipoServicio: '',
                        sabadoTipoServicio: '',
                        domingoTipoServicio: '',
                    }
                ],
            });
            setValueTimePickerInicioRegistro([
                {
                    lunes: null,
                    martes: null,
                    miercoles: null,
                    jueves: null,
                    viernes: null,
                    sabado: null,
                    domingo: null
                }
            ]);
            setValueTimePickerFinRegistro([
                {
                    lunes: null,
                    martes: null,
                    miercoles: null,
                    jueves: null,
                    viernes: null,
                    sabado: null,
                    domingo: null
                }
            ]);
            setValueTimePickerInicioDescanso1Registro([
                {
                    lunes: null,
                    martes: null,
                    miercoles: null,
                    jueves: null,
                    viernes: null,
                    sabado: null,
                    domingo: null
                }
            ]);
            setValueTimePickerFinDescanso1Registro([
                {
                    lunes: null,
                    martes: null,
                    miercoles: null,
                    jueves: null,
                    viernes: null,
                    sabado: null,
                    domingo: null
                }
            ]);
            setValueTimePickerInicioDescanso2Registro([
                {
                    lunes: null,
                    martes: null,
                    miercoles: null,
                    jueves: null,
                    viernes: null,
                    sabado: null,
                    domingo: null
                }
            ]);
            setValueTimePickerFinDescanso2Registro([
                {
                    lunes: null,
                    martes: null,
                    miercoles: null,
                    jueves: null,
                    viernes: null,
                    sabado: null,
                    domingo: null
                }
            ]);
            setValueCantidadHorasRegistro([
                {
                    lunes: '',
                    martes: '',
                    miercoles: '',
                    jueves: '',
                    viernes: '',
                    sabado: '',
                    domingo: ''
                }
            ]);
            setValueTipoServicioRegistro([
                {
                    lunesTipoServicio: '',
                    martesTipoServicio: '',
                    miercolesTipoServicio: '',
                    juevesTipoServicio: '',
                    viernesTipoServicio: '',
                    sabadoTipoServicio: '',
                    domingoTipoServicio: '',
                }
            ]);
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        }
        if (prop === "numeroTrabajadores") {
            if (horarioIntervencionRegistro.tipoRegistro !== 'comun') {
                if (e.target.value === 1) {
                    setAlert({
                        mensaje: "El número de trabajadores en tipo de registro individual debe ser mayor que uno.",
                        tipo: 'warning'
                    })
                    setOpenSnack(true);
                    return;
                };
                gestionaTipoRegistroNumTrabajadoresRegistro(e.target.value);
            };
            if (e.target.value > valuesFormRegistro.datosTrabajadores.length) {
                let vecesMayor = e.target.value - valuesFormRegistro.datosTrabajadores.length;
                let arrayTr = [...valuesFormRegistro.datosTrabajadores];
                let arraySu = [...valuesFormRegistro.datosSuplentes];
                let arrayTrEd = [...trabajadoresRegistro.trabajadores];
                for (let i = 0; i < vecesMayor; i++) {
                    arrayTrEd[valuesFormRegistro.datosTrabajadores.length + i] = {};
                    arrayTrEd[valuesFormRegistro.datosTrabajadores.length + i]['trabajador_' + (valuesFormRegistro.datosTrabajadores.length + 1 + i)] = '';
                    arrayTrEd[valuesFormRegistro.datosTrabajadores.length + i]['suplente_' + (valuesFormRegistro.datosTrabajadores.length + 1 + i)] = '';
                    arrayTr.push("");
                    arraySu.push("");
                };
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresRegistro({ ...trabajadoresRegistro, cantidad: e.target.value, trabajadores: arrayTrEd });
            } else {
                let vecesMenor = valuesFormRegistro.datosTrabajadores.length - e.target.value;
                let arrayTr = [...valuesFormRegistro.datosTrabajadores];
                let arraySu = [...valuesFormRegistro.datosSuplentes];
                let arrayTrEd = [...trabajadoresRegistro.trabajadores];
                for (let i = 0; i < vecesMenor; i++) {
                    arrayTr.pop();
                    arraySu.pop();
                    arrayTrEd.pop();
                };
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresRegistro({ ...trabajadoresRegistro, cantidad: e.target.value, trabajadores: arrayTrEd });
            };
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeFormRegistroSelectsTrabajadores = (tipo, index) => (e) => {
        let encontrado = false;
        trabajadoresRegistro.trabajadores.map((trabajador, index) => {
            if ((trabajador['trabajador_' + (index + 1)] === e.target.value || trabajador['suplente_' + (index + 1)] === e.target.value) && e.target.value) {
                setAlert({
                    mensaje: "Este trabajador ya consta como registrado, selecciona otro.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return encontrado = true;
            };
        });
        if (!encontrado) {
            if (tipo === "trabajador") {
                let arrayTr = [...valuesFormRegistro.datosTrabajadores];
                arrayTr[index] = e.target.value;
                let arrayTrEd = [...trabajadoresRegistro.trabajadores];
                arrayTrEd[index]['trabajador_' + (index + 1)] = e.target.value;
                setValuesFormRegistro({ ...valuesFormRegistro, datosTrabajadores: arrayTr });
                setTrabajadoresRegistro({ ...trabajadoresRegistro, trabajadores: arrayTrEd });
            }
            if (tipo === "suplente") {
                let arraySu = [...valuesFormRegistro.datosSuplentes];
                arraySu[index] = e.target.value;
                let arrayTrEd = [...trabajadoresRegistro.trabajadores];
                arrayTrEd[index]['suplente_' + (index + 1)] = e.target.value;
                setValuesFormRegistro({ ...valuesFormRegistro, datosSuplentes: arraySu });
                setTrabajadoresRegistro({ ...trabajadoresRegistro, trabajadores: arrayTrEd });
            };
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
        };
    };

    const handleChangeTimePickerInicioRegistro = (id, hora) => {
        const idSplitted = id.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresTimePicker, arrayValoresHorario;
        switch (idCaso) {
            case 'timePickerInicio-registro-lunes':
                if (valueTimePickerFinRegistro[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro[idIndex].lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicioRango'] = null;
                };
                setValueTimePickerInicioRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-registro-martes':
                if (valueTimePickerFinRegistro[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro[idIndex].martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicioRango'] = null;
                };
                setValueTimePickerInicioRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-registro-miercoles':
                if (valueTimePickerFinRegistro[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro[idIndex].miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicioRango'] = null;
                };
                setValueTimePickerInicioRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-registro-jueves':
                if (valueTimePickerFinRegistro[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro[idIndex].jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicioRango'] = null;
                };
                setValueTimePickerInicioRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-registro-viernes':
                if (valueTimePickerFinRegistro[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro[idIndex].viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicioRango'] = null;
                };
                setValueTimePickerInicioRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-registro-sabado':
                if (valueTimePickerFinRegistro[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro[idIndex].sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicioRango'] = null;
                };
                setValueTimePickerInicioRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-registro-domingo':
                if (valueTimePickerFinRegistro[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro[idIndex].domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicioRango'] = null;
                };
                setValueTimePickerInicioRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-registro-lunes':
                if (valueTimePickerFinDescanso1Registro[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro[idIndex].lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-registro-lunes':
                if (valueTimePickerFinDescanso2Registro[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro[idIndex].lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-registro-martes':
                if (valueTimePickerFinDescanso1Registro[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro[idIndex].martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-registro-martes':
                if (valueTimePickerFinDescanso2Registro[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro[idIndex].martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-registro-miercoles':
                if (valueTimePickerFinDescanso1Registro[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro[idIndex].miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-registro-miercoles':
                if (valueTimePickerFinDescanso2Registro[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro[idIndex].miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-registro-jueves':
                if (valueTimePickerFinDescanso1Registro[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro[idIndex].jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-registro-jueves':
                if (valueTimePickerFinDescanso2Registro[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro[idIndex].jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-registro-viernes':
                if (valueTimePickerFinDescanso1Registro[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro[idIndex].viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-registro-viernes':
                if (valueTimePickerFinDescanso2Registro[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro[idIndex].viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-registro-sabado':
                if (valueTimePickerFinDescanso1Registro[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro[idIndex].sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-registro-sabado':
                if (valueTimePickerFinDescanso2Registro[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro[idIndex].sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-registro-domingo':
                if (valueTimePickerFinDescanso1Registro[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro[idIndex].domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-registro-domingo':
                if (valueTimePickerFinDescanso2Registro[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro[idIndex].domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeTimePickerFinRegistro = (id, hora) => {
        const idSplitted = id.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresTimePicker, arrayValoresHorario;
        switch (idCaso) {
            case 'timePickerFin-registro-lunes':
                if (valueTimePickerInicioRegistro[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFinRango'] = null;
                };
                setValueTimePickerFinRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-registro-martes':
                if (valueTimePickerInicioRegistro[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro[idIndex].martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFinRango'] = null;
                };
                setValueTimePickerFinRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-registro-miercoles':
                if (valueTimePickerInicioRegistro[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFinRango'] = null;
                };
                setValueTimePickerFinRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-registro-jueves':
                if (valueTimePickerInicioRegistro[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFinRango'] = null;
                };
                setValueTimePickerFinRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-registro-viernes':
                if (valueTimePickerInicioRegistro[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFinRango'] = null;
                };
                setValueTimePickerFinRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-registro-sabado':
                if (valueTimePickerInicioRegistro[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFinRango'] = null;
                };
                setValueTimePickerFinRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-registro-domingo':
                if (valueTimePickerInicioRegistro[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinRegistro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFinRango'] = null;
                };
                setValueTimePickerFinRegistro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-registro-lunes':
                if (valueTimePickerInicioDescanso1Registro[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-registro-lunes':
                if (valueTimePickerInicioDescanso2Registro[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-registro-martes':
                if (valueTimePickerInicioDescanso1Registro[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro[idIndex].martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-registro-martes':
                if (valueTimePickerInicioDescanso2Registro[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro[idIndex].martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-registro-miercoles':
                if (valueTimePickerInicioDescanso1Registro[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-registro-miercoles':
                if (valueTimePickerInicioDescanso2Registro[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-registro-jueves':
                if (valueTimePickerInicioDescanso1Registro[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-registro-jueves':
                if (valueTimePickerInicioDescanso2Registro[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-registro-viernes':
                if (valueTimePickerInicioDescanso1Registro[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-registro-viernes':
                if (valueTimePickerInicioDescanso2Registro[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-registro-sabado':
                if (valueTimePickerInicioDescanso1Registro[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-registro-sabado':
                if (valueTimePickerInicioDescanso2Registro[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-registro-domingo':
                if (valueTimePickerInicioDescanso1Registro[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-registro-domingo':
                if (valueTimePickerInicioDescanso2Registro[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Registro];
                arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker);
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSelectCantidadRegistro = (e) => {
        const idSplitted = e.target.name.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresSelect, arrayValoresHorario;
        arrayValoresSelect = [...valueCantidadHorasRegistro];
        arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
        switch (idCaso) {
            case 'selectCantidad-registro-lunes':
                arrayValoresSelect[idIndex]['lunes'] = e.target.value;
                arrayValoresHorario[idIndex]['lunesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-registro-martes':
                arrayValoresSelect[idIndex]['martes'] = e.target.value;
                arrayValoresHorario[idIndex]['martesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-registro-miercoles':
                arrayValoresSelect[idIndex]['miercoles'] = e.target.value;
                arrayValoresHorario[idIndex]['miercolesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-registro-jueves':
                arrayValoresSelect[idIndex]['jueves'] = e.target.value;
                arrayValoresHorario[idIndex]['juevesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-registro-viernes':
                arrayValoresSelect[idIndex]['viernes'] = e.target.value;
                arrayValoresHorario[idIndex]['viernesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-registro-sabado':
                arrayValoresSelect[idIndex]['sabado'] = e.target.value;
                arrayValoresHorario[idIndex]['sabadoCantidad'] = e.target.value;
                break;
            case 'selectCantidad-registro-domingo':
                arrayValoresSelect[idIndex]['domingo'] = e.target.value;
                arrayValoresHorario[idIndex]['domingoCantidad'] = e.target.value;
                break;
            default:
        }
        setValueCantidadHorasRegistro(arrayValoresSelect);
        setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSelectTipoServicioRegistro = (e) => {
        const idSplitted = e.target.name.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresSelect, arrayValoresHorario;
        arrayValoresSelect = [...valueTipoServicioRegistro];
        arrayValoresHorario = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
        switch (idCaso) {
            case 'selectTipoServicio-registro-lunes':
                arrayValoresSelect[idIndex]['lunesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['lunesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-registro-martes':
                arrayValoresSelect[idIndex]['martesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['martesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-registro-miercoles':
                arrayValoresSelect[idIndex]['miercolesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['miercolesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-registro-jueves':
                arrayValoresSelect[idIndex]['juevesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['juevesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-registro-viernes':
                arrayValoresSelect[idIndex]['viernesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['viernesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-registro-sabado':
                arrayValoresSelect[idIndex]['sabadoTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['sabadoTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-registro-domingo':
                arrayValoresSelect[idIndex]['domingoTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['domingoTipoServicio'] = e.target.value;
                break;
            default:
        }
        setValueTipoServicioRegistro(arrayValoresSelect);
        setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: arrayValoresHorario });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSwitchTipoRegistroRegistro = (e) => {
        if (e.target.checked) {
            if (trabajadoresRegistro.cantidad > 1) {
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistro: 'individual' });
            } else {
                setAlert({
                    mensaje: "Para seleccionar este tipo de registro debe haber más de un trabajador asignado.",
                    tipo: 'warning'
                })
                setOpenSnack(true);
                return;
            };
        } else {
            let myArray1 = [horarioIntervencionRegistro.tipoRegistroTrabajador[0]];
            let myArray2 = [valueTimePickerInicioRegistro[0]];
            let myArray3 = [valueTimePickerFinRegistro[0]];
            let myArray4 = [valueTimePickerInicioDescanso1Registro[0]];
            let myArray5 = [valueTimePickerFinDescanso1Registro[0]];
            let myArray6 = [valueTimePickerInicioDescanso2Registro[0]];
            let myArray7 = [valueTimePickerFinDescanso2Registro[0]];
            let myArray8 = [valueCantidadHorasRegistro[0]];
            let myArray9 = [valueTipoServicioRegistro[0]];
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistro: 'comun', tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioRegistro(myArray2);
            setValueTimePickerFinRegistro(myArray3);
            setValueTimePickerInicioDescanso1Registro(myArray4);
            setValueTimePickerFinDescanso1Registro(myArray5);
            setValueTimePickerInicioDescanso2Registro(myArray6);
            setValueTimePickerFinDescanso2Registro(myArray7);
            setValueCantidadHorasRegistro(myArray8);
            setValueTipoServicioRegistro(myArray9);
        };
        setStateSwitchTipoRegistro(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSwitchEstadoRegistro = (e) => {
        if (e.target.checked) {
            setValuesFormRegistro({ ...valuesFormRegistro, estado: 'baja' });
        } else {
            setValuesFormRegistro({ ...valuesFormRegistro, estado: 'alta' });
        };
        setStateSwitchEstadoRegistro(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSwitchTipoServicioFijoRegistro = (e) => {
        if (e.target.name.includes('TO')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_TO: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, TO: e.target.checked });
        };
        if (e.target.name.includes('CR')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_CR: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, CR: e.target.checked });
        };
        if (e.target.name.includes('CE')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_CE: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, CE: e.target.checked });
        };
        if (e.target.name.includes('CI')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_CI: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, CI: e.target.checked });
        };
        if (e.target.name.includes('MO')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_MO: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, MO: e.target.checked });
        };
        if (e.target.name.includes('OF')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_OF: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, OF: e.target.checked });
        };
        if (e.target.name.includes('AL')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_AL: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, AL: e.target.checked });
        };
        if (e.target.name.includes('LA')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_LA: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, LA: e.target.checked });
        };
        if (e.target.name.includes('TE')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_TE: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, TE: e.target.checked });
        };
        if (e.target.name.includes('FI')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_FI: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, FI: e.target.checked });
        };
        if (e.target.name.includes('FE')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_FE: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, FE: e.target.checked });
        };
        if (e.target.name.includes('AB')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_AB: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, AB: e.target.checked });
        };
        if (e.target.name.includes('MA')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_MA: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, MA: e.target.checked });
        };
        if (e.target.name.includes('PO')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_PO: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, PO: e.target.checked });
        };
        if (e.target.name.includes('BA')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_BA: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, BA: e.target.checked });
        };
        if (e.target.name.includes('FT')) {
            if (!e.target.checked) {
                setValuesFormRegistro({ ...valuesFormRegistro, precioHora_FT: null });
            };
            setStateSwitchTipoServicioFijoRegistro({ ...stateSwitchTipoServicioFijoRegistro, FT: e.target.checked });
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const gestionaTipoRegistroNumTrabajadoresRegistro = (numTrab) => {
        let diferencia;
        let myArray1 = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
        let myArray2 = [...valueTimePickerInicioRegistro];
        let myArray3 = [...valueTimePickerFinRegistro];
        let myArray4 = [...valueTimePickerInicioDescanso1Registro];
        let myArray5 = [...valueTimePickerFinDescanso1Registro];
        let myArray6 = [...valueTimePickerInicioDescanso2Registro];
        let myArray7 = [...valueTimePickerFinDescanso2Registro];
        let myArray8 = [...valueCantidadHorasRegistro];
        let myArray9 = [...valueTipoServicioRegistro];
        if (numTrab > trabajadoresRegistro.cantidad) {
            diferencia = numTrab - trabajadoresRegistro.cantidad;
            for (let i = 0; i < diferencia; i++) {
                myArray1.push(
                    {
                        lunesInicioRango: null,
                        lunesFinRango: null,
                        martesInicioRango: null,
                        martesFinRango: null,
                        miercolesInicioRango: null,
                        miercolesFinRango: null,
                        juevesInicioRango: null,
                        juevesFinRango: null,
                        viernesInicioRango: null,
                        viernesFinRango: null,
                        sabadoInicioRango: null,
                        sabadoFinRango: null,
                        domingoInicioRango: null,
                        domingoFinRango: null,
                        lunesInicio1RangoDescanso: null,
                        lunesInicio2RangoDescanso: null,
                        lunesFin1RangoDescanso: null,
                        lunesFin2RangoDescanso: null,
                        martesInicio1RangoDescanso: null,
                        martesInicio2RangoDescanso: null,
                        martesFin1RangoDescanso: null,
                        martesFin2RangoDescanso: null,
                        miercolesInicio1RangoDescanso: null,
                        miercolesInicio2RangoDescanso: null,
                        miercolesFin1RangoDescanso: null,
                        miercolesFin2RangoDescanso: null,
                        juevesInicio1RangoDescanso: null,
                        juevesInicio2RangoDescanso: null,
                        juevesFin1RangoDescanso: null,
                        juevesFin2RangoDescanso: null,
                        viernesInicio1RangoDescanso: null,
                        viernesInicio2RangoDescanso: null,
                        viernesFin1RangoDescanso: null,
                        viernesFin2RangoDescanso: null,
                        sabadoInicio1RangoDescanso: null,
                        sabadoInicio2RangoDescanso: null,
                        sabadoFin1RangoDescanso: null,
                        sabadoFin2RangoDescanso: null,
                        domingoInicio1RangoDescanso: null,
                        domingoInicio2RangoDescanso: null,
                        domingoFin1RangoDescanso: null,
                        domingoFin2RangoDescanso: null,
                        lunesCantidad: '',
                        martesCantidad: '',
                        miercolesCantidad: '',
                        juevesCantidad: '',
                        viernesCantidad: '',
                        sabadoCantidad: '',
                        domingoCantidad: '',
                        lunesTipoServicio: '',
                        martesTipoServicio: '',
                        miercolesTipoServicio: '',
                        juevesTipoServicio: '',
                        viernesTipoServicio: '',
                        sabadoTipoServicio: '',
                        domingoTipoServicio: '',
                    }
                );
                myArray2.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray3.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray4.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray5.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray6.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray7.push(
                    {
                        lunes: null,
                        martes: null,
                        miercoles: null,
                        jueves: null,
                        viernes: null,
                        sabado: null,
                        domingo: null
                    }
                );
                myArray8.push(
                    {
                        lunes: '',
                        martes: '',
                        miercoles: '',
                        jueves: '',
                        viernes: '',
                        sabado: '',
                        domingo: ''
                    }
                );
                myArray9.push(
                    {
                        lunesTipoServicio: '',
                        martesTipoServicio: '',
                        miercolesTipoServicio: '',
                        juevesTipoServicio: '',
                        viernesTipoServicio: '',
                        sabadoTipoServicio: '',
                        domingoTipoServicio: '',
                    }
                );
            };
        } else {
            diferencia = trabajadoresRegistro.cantidad - numTrab;
            for (let i = 0; i < diferencia; i++) {
                myArray1.pop();
                myArray2.pop();
                myArray3.pop();
                myArray4.pop();
                myArray5.pop();
                myArray6.pop();
                myArray7.pop();
                myArray8.pop();
                myArray9.pop();
            };
        };
        setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: myArray1 });
        setValueTimePickerInicioRegistro(myArray2);
        setValueTimePickerFinRegistro(myArray3);
        setValueTimePickerInicioDescanso1Registro(myArray4);
        setValueTimePickerFinDescanso1Registro(myArray5);
        setValueTimePickerInicioDescanso2Registro(myArray6);
        setValueTimePickerFinDescanso2Registro(myArray7);
        setValueCantidadHorasRegistro(myArray8);
        setValueTipoServicioRegistro(myArray9);
    };

    const procesarDatosRegistroPromesa = () => {
        return new Promise((resolve, reject) => {
            if (valuesFormRegistro.nombre === '' ||
                valuesFormRegistro.categoria === '' ||
                valuesFormRegistro.formaPago === '' ||
                valuesFormRegistro.tempPago === ''
            ) {
                setAlert({
                    mensaje: "Faltan datos por completar. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if ((stateSwitchTipoServicioFijoRegistro.TO && !valuesFormRegistro.precioHora_TO) ||
                (stateSwitchTipoServicioFijoRegistro.CR && !valuesFormRegistro.precioHora_CR) ||
                (stateSwitchTipoServicioFijoRegistro.CE && !valuesFormRegistro.precioHora_CE) ||
                (stateSwitchTipoServicioFijoRegistro.CI && !valuesFormRegistro.precioHora_CI) ||
                (stateSwitchTipoServicioFijoRegistro.MO && !valuesFormRegistro.precioHora_MO) ||
                (stateSwitchTipoServicioFijoRegistro.OF && !valuesFormRegistro.precioHora_OF) ||
                (stateSwitchTipoServicioFijoRegistro.AL && !valuesFormRegistro.precioHora_AL) ||
                (stateSwitchTipoServicioFijoRegistro.LA && !valuesFormRegistro.precioHora_LA) ||
                (stateSwitchTipoServicioFijoRegistro.TE && !valuesFormRegistro.precioHora_TE) ||
                (stateSwitchTipoServicioFijoRegistro.FI && !valuesFormRegistro.precioHora_FI) ||
                (stateSwitchTipoServicioFijoRegistro.FE && !valuesFormRegistro.precioHora_FE) ||
                (stateSwitchTipoServicioFijoRegistro.AB && !valuesFormRegistro.precioHora_AB) ||
                (stateSwitchTipoServicioFijoRegistro.MA && !valuesFormRegistro.precioHora_MA) ||
                (stateSwitchTipoServicioFijoRegistro.PO && !valuesFormRegistro.precioHora_PO) ||
                (stateSwitchTipoServicioFijoRegistro.BA && !valuesFormRegistro.precioHora_BA) ||
                (stateSwitchTipoServicioFijoRegistro.FT && !valuesFormRegistro.precioHora_FT)
            ) {
                setAlert({
                    mensaje: "Has selecionado un tipo de servicio fijo pero no has asignado precio. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            let valoresComputoPreciosHoraVariables = true;
            let valoresComputoPreciosHoraFijos = true;
            let valoresCorrectosComputo = false;
            if (valuesFormRegistro.computo === '' &&
                !valuesFormRegistro.mensualPactado &&
                !valuesFormRegistro.precioHora_L &&
                !valuesFormRegistro.precioHora_E &&
                !valuesFormRegistro.precioHora_P &&
                !valuesFormRegistro.precioHora_N &&
                !valuesFormRegistro.precioHora_R &&
                !valuesFormRegistro.precioHora_L1 &&
                !valuesFormRegistro.precioHora_L2 &&
                !valuesFormRegistro.precioHora_F) {
                valoresComputoPreciosHoraVariables = false;
            };
            if ((valuesFormRegistro.computo === 1 && !valuesFormRegistro.mensualPactado) ||
                (valuesFormRegistro.computo === 2 && (
                    !valuesFormRegistro.precioHora_L &&
                    !valuesFormRegistro.precioHora_E &&
                    !valuesFormRegistro.precioHora_P &&
                    !valuesFormRegistro.precioHora_N &&
                    !valuesFormRegistro.precioHora_R &&
                    !valuesFormRegistro.precioHora_L1 &&
                    !valuesFormRegistro.precioHora_L2 &&
                    !valuesFormRegistro.precioHora_F)) ||
                (valuesFormRegistro.computo === 3 && (
                    !valuesFormRegistro.precioHora_L &&
                    !valuesFormRegistro.precioHora_E &&
                    !valuesFormRegistro.precioHora_P &&
                    !valuesFormRegistro.precioHora_N &&
                    !valuesFormRegistro.precioHora_R &&
                    !valuesFormRegistro.precioHora_L1 &&
                    !valuesFormRegistro.precioHora_L2 &&
                    !valuesFormRegistro.precioHora_F &&
                    !valuesFormRegistro.mensualPactado))) {
                setAlert({
                    mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (!valuesFormRegistro.precioHora_TO &&
                !valuesFormRegistro.precioHora_CR &&
                !valuesFormRegistro.precioHora_CE &&
                !valuesFormRegistro.precioHora_CI &&
                !valuesFormRegistro.precioHora_MO &&
                !valuesFormRegistro.precioHora_OF &&
                !valuesFormRegistro.precioHora_AL &&
                !valuesFormRegistro.precioHora_LA &&
                !valuesFormRegistro.precioHora_TE &&
                !valuesFormRegistro.precioHora_FI &&
                !valuesFormRegistro.precioHora_FE &&
                !valuesFormRegistro.precioHora_AB &&
                !valuesFormRegistro.precioHora_MA &&
                !valuesFormRegistro.precioHora_PO &&
                !valuesFormRegistro.precioHora_BA &&
                !valuesFormRegistro.precioHora_FT) {
                valoresComputoPreciosHoraFijos = false;
            };
            if ((!valoresComputoPreciosHoraFijos && !valoresComputoPreciosHoraVariables) ||
                (!valoresComputoPreciosHoraVariables && valuesFormRegistro.numeroTrabajadores)) {
                setAlert({
                    mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesFormRegistro.numeroTrabajadores === '' &&
                valuesFormRegistro.computo &&
                valoresCorrectosComputo
            ) {
                setAlert({
                    mensaje: "Falta asignar trabajadores para el cómputo de horas. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if ((valuesFormRegistro.variacion === '' ||
                valuesFormRegistro.tipo === '') &&
                valuesFormRegistro.numeroTrabajadores !== '') {
                setAlert({
                    mensaje: "Falta asignar horario o variaciones para los trabajadores seleccionados. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesFormRegistro.computo === 3 && (
                (!valuesFormRegistro.precioHora_L ||
                    valuesFormRegistro.precioHora_E ||
                    valuesFormRegistro.precioHora_P ||
                    valuesFormRegistro.precioHora_N ||
                    valuesFormRegistro.precioHora_R ||
                    valuesFormRegistro.precioHora_L1 ||
                    valuesFormRegistro.precioHora_L2 ||
                    valuesFormRegistro.precioHora_F) && valuesFormRegistro.mensualPactado)) {
                setAlert({
                    mensaje: "Revisa el formulario, solo puede haber un tipo de cómputo de horas.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };

            //comprobación que el tipo de servicio seleccionado corresponda con el precio/hora estipulado
            for (let i = 0; i < horarioIntervencionRegistro.tipoRegistroTrabajador.length; i++) {
                if (valuesFormRegistro.computo === 2 || (valuesFormRegistro.computo === 3 && !valuesFormRegistro.mensualPactado)) {
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIM' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'LIM' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIM' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIM' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIM' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIM' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIM')
                        && !valuesFormRegistro.precioHora_L) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIME' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'LIME' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIME' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIME' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIME' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIME' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIME')
                        && !valuesFormRegistro.precioHora_E) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIMP' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'LIMP' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIMP' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIMP' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIMP' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIMP' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIMP')
                        && !valuesFormRegistro.precioHora_P) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'NAVE2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'NAVE2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'NAVE2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'NAVE2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'NAVE2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'NAVE2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'NAVE2')
                        && !valuesFormRegistro.precioHora_N) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'REFZ' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'REFZ' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'REFZ' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'REFZ' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'REFZ' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'REFZ' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'REFZ')
                        && !valuesFormRegistro.precioHora_R) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIM1' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'LIM1' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIM1' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIM1' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIM1' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIM1' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIM1')
                        && !valuesFormRegistro.precioHora_L1) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIM2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'LIM2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIM2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIM2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIM2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIM2' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIM2')
                        && !valuesFormRegistro.precioHora_L2) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio === 'FEST' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio === 'FEST' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio === 'FEST' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio === 'FEST' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio === 'FEST' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio === 'FEST' ||
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio === 'FEST')
                        && !valuesFormRegistro.precioHora_F) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                }
            };

            //validacion mail
            if (valuesFormRegistro.mail) {
                const validacionMail = dispatch(validarMailAccion(valuesFormRegistro.mail));
                if (!validacionMail) {
                    setAlert({
                        mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            }
            if (valuesFormRegistro.mail2) {
                const validacionMail2 = dispatch(validarMailAccion(valuesFormRegistro.mail2));
                if (!validacionMail2) {
                    setAlert({
                        mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            }

            if (horarioIntervencionRegistro.tipo === "rango") {
                for (let i = 0; i < horarioIntervencionRegistro.tipoRegistroTrabajador.length; i++) {
                    //primera comprobación, que todos los campos esten vacíos
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicioRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFinRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicioRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFinRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicioRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFinRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicioRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFinRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicioRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFinRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicioRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFinRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicioRango &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFinRango) {
                        setAlert({
                            mensaje: "No has introducido ningún dato horario para registrar.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //segunda comprobación, coinciden ambas casillas en registro
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //tercera comprobacion que no falte tipo de servicio
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicioRango && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicioRango && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio)) {
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
            };

            if (horarioIntervencionRegistro.tipo === "rangoDescanso") {
                for (let i = 0; i < horarioIntervencionRegistro.tipoRegistroTrabajador.length; i++) {
                    //primera comprobación, que todos los campos esten vacíos
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin1RangoDescanso &&
                        !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin2RangoDescanso) {
                        setAlert({
                            mensaje: "No has introducido ningún dato horario para registrar.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //segunda comprobación, coinciden todas las casillas en registro
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin2RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };

                    //tercera comprobacion que no falte tipo de servicio
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio1RangoDescanso && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio)) {
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                }
            };

            if (horarioIntervencionRegistro.tipo === "cantidad") {
                for (let i = 0; i < horarioIntervencionRegistro.tipoRegistroTrabajador.length; i++) {
                    //comprobamos que no haya campos vacíos
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesCantidad === '' &&
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesCantidad === '' &&
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesCantidad === '' &&
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesCantidad === '' &&
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesCantidad === '' &&
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoCantidad === '' &&
                        horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoCantidad === '') {
                        setAlert({
                            mensaje: "No has introducido ningún dato horario para registrar.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //tercera comprobacion que no falte tipo de servicio
                    if ((horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesCantidad && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesCantidad && horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesCantidad && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesCantidad && horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesCantidad && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesCantidad && horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesCantidad && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesCantidad && horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesCantidad && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesCantidad && horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoCantidad && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoCantidad && horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoCantidad && !horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio) ||
                        (!horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoCantidad && horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio)) {
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                }
            };

            //comprobamos que array objetos trabajadores no tenga elementos vacíos
            for (let i = 0; i < trabajadoresRegistro.cantidad; i++) {
                if (trabajadoresRegistro.trabajadores[i]['trabajador_' + (i + 1)] === '' && trabajadoresRegistro.trabajadores[i]['suplente_' + (i + 1)] === '') {
                    setAlert({
                        mensaje: "Alguno de los registros Trabajadores - Suplentes está vacío. Completa o cambia la cantidad de trabajadores asignados.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
            };
            //limpieza final  
            let horarioIntervencionRegistroRevisado;
            let elArrayTipoRegistroTrabajador = [];
            if (horarioIntervencionRegistro.tipo === 'rango') {
                for (let i = 0; i < horarioIntervencionRegistro.tipoRegistroTrabajador.length; i++) {
                    let elObjetoTipoRegistroTrabajador = {};
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicioRango) {
                        elObjetoTipoRegistroTrabajador['lunesInicioRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicioRango;
                        elObjetoTipoRegistroTrabajador['lunesFinRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFinRango;
                        elObjetoTipoRegistroTrabajador['lunesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicioRango) {
                        elObjetoTipoRegistroTrabajador['martesInicioRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicioRango;
                        elObjetoTipoRegistroTrabajador['martesFinRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFinRango;
                        elObjetoTipoRegistroTrabajador['martesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicioRango) {
                        elObjetoTipoRegistroTrabajador['miercolesInicioRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicioRango;
                        elObjetoTipoRegistroTrabajador['miercolesFinRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFinRango;
                        elObjetoTipoRegistroTrabajador['miercolesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicioRango) {
                        elObjetoTipoRegistroTrabajador['juevesInicioRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicioRango;
                        elObjetoTipoRegistroTrabajador['juevesFinRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFinRango;
                        elObjetoTipoRegistroTrabajador['juevesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicioRango) {
                        elObjetoTipoRegistroTrabajador['viernesInicioRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicioRango;
                        elObjetoTipoRegistroTrabajador['viernesFinRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFinRango;
                        elObjetoTipoRegistroTrabajador['viernesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicioRango) {
                        elObjetoTipoRegistroTrabajador['sabadoInicioRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicioRango;
                        elObjetoTipoRegistroTrabajador['sabadoFinRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFinRango;
                        elObjetoTipoRegistroTrabajador['sabadoTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicioRango) {
                        elObjetoTipoRegistroTrabajador['domingoInicioRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicioRango;
                        elObjetoTipoRegistroTrabajador['domingoFinRango'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFinRango;
                        elObjetoTipoRegistroTrabajador['domingoTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio;
                    };
                    elArrayTipoRegistroTrabajador.push(elObjetoTipoRegistroTrabajador);
                };
                horarioIntervencionRegistroRevisado = {
                    tipo: horarioIntervencionRegistro.tipo,
                    tipoRegistro: horarioIntervencionRegistro.tipoRegistro,
                    variacion: horarioIntervencionRegistro.variacion,
                    tipoRegistroTrabajador: elArrayTipoRegistroTrabajador
                };
            };
            if (horarioIntervencionRegistro.tipo === 'rangoDescanso') {
                for (let i = 0; i < horarioIntervencionRegistro.tipoRegistroTrabajador.length; i++) {
                    let elObjetoTipoRegistroTrabajador = {};
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['lunesInicio1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['lunesFin1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin1RangoDescanso;
                        if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['lunesInicio2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['lunesFin2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['lunesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['martesInicio1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['martesFin1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin1RangoDescanso;
                        if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['martesInicio2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['martesFin2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['martesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['miercolesInicio1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['miercolesFin1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso;
                        if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['miercolesInicio2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['miercolesFin2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['miercolesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['juevesInicio1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['juevesFin1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin1RangoDescanso;
                        if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['juevesInicio2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['juevesFin2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['juevesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['viernesInicio1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['viernesFin1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin1RangoDescanso;
                        if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['viernesInicio2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['viernesFin2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['viernesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['sabadoInicio1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['sabadoFin1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso;
                        if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['sabadoInicio2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['sabadoFin2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['sabadoTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['domingoInicio1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['domingoFin1RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin1RangoDescanso;
                        if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['domingoInicio2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['domingoFin2RangoDescanso'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['domingoTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio;
                    };
                    elArrayTipoRegistroTrabajador.push(elObjetoTipoRegistroTrabajador);
                };
                horarioIntervencionRegistroRevisado = {
                    tipo: horarioIntervencionRegistro.tipo,
                    tipoRegistro: horarioIntervencionRegistro.tipoRegistro,
                    variacion: horarioIntervencionRegistro.variacion,
                    tipoRegistroTrabajador: elArrayTipoRegistroTrabajador
                };
            };
            if (horarioIntervencionRegistro.tipo === 'cantidad') {
                for (let i = 0; i < horarioIntervencionRegistro.tipoRegistroTrabajador.length; i++) {
                    let elObjetoTipoRegistroTrabajador = {};
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesCantidad) {
                        elObjetoTipoRegistroTrabajador['lunesCantidad'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesCantidad;
                        elObjetoTipoRegistroTrabajador['lunesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].lunesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesCantidad) {
                        elObjetoTipoRegistroTrabajador['martesCantidad'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesCantidad;
                        elObjetoTipoRegistroTrabajador['martesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].martesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesCantidad) {
                        elObjetoTipoRegistroTrabajador['miercolesCantidad'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesCantidad;
                        elObjetoTipoRegistroTrabajador['miercolesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].miercolesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesCantidad) {
                        elObjetoTipoRegistroTrabajador['juevesCantidad'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesCantidad;
                        elObjetoTipoRegistroTrabajador['juevesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].juevesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesCantidad) {
                        elObjetoTipoRegistroTrabajador['viernesCantidad'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesCantidad;
                        elObjetoTipoRegistroTrabajador['viernesTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].viernesTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoCantidad) {
                        elObjetoTipoRegistroTrabajador['sabadoCantidad'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoCantidad;
                        elObjetoTipoRegistroTrabajador['sabadoTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].sabadoTipoServicio;
                    };
                    if (horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoCantidad) {
                        elObjetoTipoRegistroTrabajador['domingoCantidad'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoCantidad;
                        elObjetoTipoRegistroTrabajador['domingoTipoServicio'] = horarioIntervencionRegistro.tipoRegistroTrabajador[i].domingoTipoServicio;
                    };
                    elArrayTipoRegistroTrabajador.push(elObjetoTipoRegistroTrabajador);
                };
                horarioIntervencionRegistroRevisado = {
                    tipo: horarioIntervencionRegistro.tipo,
                    tipoRegistro: horarioIntervencionRegistro.tipoRegistro,
                    variacion: horarioIntervencionRegistro.variacion,
                    tipoRegistroTrabajador: elArrayTipoRegistroTrabajador
                };
            };
            //añadimos cómputo final     
            let elHorarioIntervencionRegistradoRevisado = {
                ...horarioIntervencionRegistroRevisado,
                computo: valuesFormRegistro.computo
            };
            if (valuesFormRegistro.mensualPactado) {
                elHorarioIntervencionRegistradoRevisado['mensualPactado'] = parseFloat(valuesFormRegistro.mensualPactado);
            };
            if (valuesFormRegistro.precioHora_L) {
                elHorarioIntervencionRegistradoRevisado['precioHora_L'] = parseFloat(valuesFormRegistro.precioHora_L);
            };
            if (valuesFormRegistro.precioHora_E) {
                elHorarioIntervencionRegistradoRevisado['precioHora_E'] = parseFloat(valuesFormRegistro.precioHora_E);
            };
            if (valuesFormRegistro.precioHora_P) {
                elHorarioIntervencionRegistradoRevisado['precioHora_P'] = parseFloat(valuesFormRegistro.precioHora_P);
            };
            if (valuesFormRegistro.precioHora_N) {
                elHorarioIntervencionRegistradoRevisado['precioHora_N'] = parseFloat(valuesFormRegistro.precioHora_N);
            };
            if (valuesFormRegistro.precioHora_R) {
                elHorarioIntervencionRegistradoRevisado['precioHora_R'] = parseFloat(valuesFormRegistro.precioHora_R);
            };
            if (valuesFormRegistro.precioHora_L1) {
                elHorarioIntervencionRegistradoRevisado['precioHora_L1'] = parseFloat(valuesFormRegistro.precioHora_L1);
            };
            if (valuesFormRegistro.precioHora_L2) {
                elHorarioIntervencionRegistradoRevisado['precioHora_L2'] = parseFloat(valuesFormRegistro.precioHora_L2);
            };
            if (valuesFormRegistro.precioHora_F) {
                elHorarioIntervencionRegistradoRevisado['precioHora_F'] = parseFloat(valuesFormRegistro.precioHora_F);
            };
            let serviciosFijosRegistro = {
                objeto: 'serviciosFijos',
                servicio: []
            };
            if (valuesFormRegistro.precioHora_TO) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'TOL', precioHora_TO: parseFloat(valuesFormRegistro.precioHora_TO) });
            };
            if (valuesFormRegistro.precioHora_CR) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'CRIS', precioHora_CR: parseFloat(valuesFormRegistro.precioHora_CR) });
            };
            if (valuesFormRegistro.precioHora_CE) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'CRISE', precioHora_CE: parseFloat(valuesFormRegistro.precioHora_CE) });
            };
            if (valuesFormRegistro.precioHora_CI) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'CRISI', precioHora_CI: parseFloat(valuesFormRegistro.precioHora_CI) });
            };
            if (valuesFormRegistro.precioHora_MO) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'MOQ', precioHora_MO: parseFloat(valuesFormRegistro.precioHora_MO) });
            };
            if (valuesFormRegistro.precioHora_OF) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'OF', precioHora_OF: parseFloat(valuesFormRegistro.precioHora_OF) });
            };
            if (valuesFormRegistro.precioHora_AL) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'ALMC', precioHora_AL: parseFloat(valuesFormRegistro.precioHora_AL) });
            };
            if (valuesFormRegistro.precioHora_LA) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'LAB', precioHora_LA: parseFloat(valuesFormRegistro.precioHora_LA) });
            };
            if (valuesFormRegistro.precioHora_TE) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'TELÑ', precioHora_TE: parseFloat(valuesFormRegistro.precioHora_TE) });
            };
            if (valuesFormRegistro.precioHora_FI) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'FCH.IN', precioHora_FI: parseFloat(valuesFormRegistro.precioHora_FI) });
            };
            if (valuesFormRegistro.precioHora_FE) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'FCH.EX', precioHora_FE: parseFloat(valuesFormRegistro.precioHora_FE) });
            };
            if (valuesFormRegistro.precioHora_AB) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'ABRLL', precioHora_AB: parseFloat(valuesFormRegistro.precioHora_AB) });
            };
            if (valuesFormRegistro.precioHora_MA) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'MANT', precioHora_MA: parseFloat(valuesFormRegistro.precioHora_MA) });
            };
            if (valuesFormRegistro.precioHora_PO) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'PORT', precioHora_PO: parseFloat(valuesFormRegistro.precioHora_PO) });
            };
            if (valuesFormRegistro.precioHora_BA) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'BACT', precioHora_BA: parseFloat(valuesFormRegistro.precioHora_BA) });
            };
            if (valuesFormRegistro.precioHora_FT) {
                serviciosFijosRegistro.servicio.push({ tipoServiciofijo: 'FEST', precioHora_FT: parseFloat(valuesFormRegistro.precioHora_FT) });
            };
            if (serviciosFijosRegistro.servicio.length === 0) {
                serviciosFijosRegistro = null;
            };
            if (!valoresComputoPreciosHoraVariables) {
                elHorarioIntervencionRegistradoRevisado = null;
            };
            let trabajadoresRevisado;
            if (valuesFormRegistro.numeroTrabajadores === '') {
                trabajadoresRevisado = null;
            } else {
                trabajadoresRevisado = trabajadoresRegistro;
            };
            return resolve({ resuelto: true, horario: elHorarioIntervencionRegistradoRevisado, servicios: serviciosFijosRegistro });
        });
    };

    useImperativeHandle(ref, () => ({
        funcionesEnCentrosRegistrar(funcion) {
            switch (funcion) {
                case 'nuevoCentro':
                    const nuevoCentro = () => {
                        dispatch(activarDesactivarNuevoCentroAccion(true));
                        reseteaContenidoRegistro();
                    };
                    nuevoCentro();
                    break;
                case 'procesarDatosRegistro':
                    const procesarDatosRegistro = () => {
                        procesarDatosRegistroPromesa()
                            .then(values => {
                                if (values.resuelto) {
                                    //registramos
                                    const centroAGuardar = {
                                        id: valuesFormRegistro.id,
                                        nombre: valuesFormRegistro.nombre,
                                        estado: valuesFormRegistro.estado,
                                        categoria: valuesFormRegistro.categoria,
                                        codigo: valuesFormRegistro.codigo ? valuesFormRegistro.codigo : null,
                                        domicilio: valuesFormRegistro.domicilio ? valuesFormRegistro.domicilio : null,
                                        codigo_postal: valuesFormRegistro.codigoPostal ? valuesFormRegistro.codigoPostal : null,
                                        poblacion: valuesFormRegistro.poblacion ? valuesFormRegistro.poblacion : null,
                                        provincia: valuesFormRegistro.provincia ? valuesFormRegistro.provincia : null,
                                        nif: valuesFormRegistro.nif ? valuesFormRegistro.nif : null,
                                        mail: valuesFormRegistro.mail ? valuesFormRegistro.mail : null,
                                        mail_2: valuesFormRegistro.mail2 ? valuesFormRegistro.mail2 : null,
                                        telefono: valuesFormRegistro.telefono ? valuesFormRegistro.telefono : null,
                                        telefono_2: valuesFormRegistro.telefono2 ? valuesFormRegistro.telefono2 : null,
                                        forma_pago: valuesFormRegistro.formaPago,
                                        temp_pago: valuesFormRegistro.tempPago,
                                        dia_pago: valuesFormRegistro.diaPago ? valuesFormRegistro.diaPago : null,
                                        horario: values.horario ? JSON.stringify(values.horario) : null,
                                        servicios_fijos: values.servicios ? JSON.stringify(values.servicios) : null,
                                        trabajadores: values.trabajadores ? JSON.stringify(values.trabajadores) : null
                                    };
                                    dispatch(registrarCentroAccion('centros', centroAGuardar.id, centroAGuardar));
                                    dispatch(registrarIntervencionAccion(true));
                                    dispatch(activarDesactivarNuevoCentroAccion(false));
                                    dispatch(activarDesactivarRegistrarCentroAccion(true));
                                };
                            });
                    };
                    procesarDatosRegistro();
                    break;
                default:
            }
        }
    }));

    const reseteaContenidoRegistro = () => {
        setValuesFormRegistro({
            id: null,
            nombre: '',
            estado: 'alta',
            categoria: '',
            codigo: '',
            domicilio: '',
            codigoPostal: '',
            poblacion: '',
            provincia: '',
            nif: '',
            mail: '',
            mail2: '',
            telefono: '',
            telefono2: '',
            formaPago: '',
            tempPago: '',
            diaPago: '',
            variacion: '',
            tipo: '',
            numeroTrabajadores: '',
            datosTrabajadores: [],
            datosSuplentes: [],
            computo: '',
            mensualPactado: null,
            precioHora_L: null,
            precioHora_E: null,
            precioHora_P: null,
            precioHora_N: null,
            precioHora_R: null,
            precioHora_L1: null,
            precioHora_L2: null,
            precioHora_F: null,
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
        });
        setValueTimePickerInicioRegistro([
            {
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            }
        ]);
        setValueTimePickerFinRegistro([
            {
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            }
        ]);
        setValueTimePickerInicioDescanso1Registro([
            {
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            }
        ]);
        setValueTimePickerFinDescanso1Registro([
            {
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            }
        ]);
        setValueTimePickerInicioDescanso2Registro([
            {
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            }
        ]);
        setValueTimePickerFinDescanso2Registro([
            {
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            }
        ]);
        setValueCantidadHorasRegistro([
            {
                lunes: '',
                martes: '',
                miercoles: '',
                jueves: '',
                viernes: '',
                sabado: '',
                domingo: ''
            }
        ]);
        setValueTipoServicioRegistro([
            {
                lunesTipoServicio: '',
                martesTipoServicio: '',
                miercolesTipoServicio: '',
                juevesTipoServicio: '',
                viernesTipoServicio: '',
                sabadoTipoServicio: '',
                domingoTipoServicio: '',
            }
        ]);
        setHorarioIntervencionRegistro({
            tipo: '',
            variacion: '',
            tipoRegistro: 'comun',
            tipoRegistroTrabajador: [
                {
                    lunesInicioRango: null,
                    lunesFinRango: null,
                    martesInicioRango: null,
                    martesFinRango: null,
                    miercolesInicioRango: null,
                    miercolesFinRango: null,
                    juevesInicioRango: null,
                    juevesFinRango: null,
                    viernesInicioRango: null,
                    viernesFinRango: null,
                    sabadoInicioRango: null,
                    sabadoFinRango: null,
                    domingoInicioRango: null,
                    domingoFinRango: null,
                    lunesInicio1RangoDescanso: null,
                    lunesInicio2RangoDescanso: null,
                    lunesFin1RangoDescanso: null,
                    lunesFin2RangoDescanso: null,
                    martesInicio1RangoDescanso: null,
                    martesInicio2RangoDescanso: null,
                    martesFin1RangoDescanso: null,
                    martesFin2RangoDescanso: null,
                    miercolesInicio1RangoDescanso: null,
                    miercolesInicio2RangoDescanso: null,
                    miercolesFin1RangoDescanso: null,
                    miercolesFin2RangoDescanso: null,
                    juevesInicio1RangoDescanso: null,
                    juevesInicio2RangoDescanso: null,
                    juevesFin1RangoDescanso: null,
                    juevesFin2RangoDescanso: null,
                    viernesInicio1RangoDescanso: null,
                    viernesInicio2RangoDescanso: null,
                    viernesFin1RangoDescanso: null,
                    viernesFin2RangoDescanso: null,
                    sabadoInicio1RangoDescanso: null,
                    sabadoInicio2RangoDescanso: null,
                    sabadoFin1RangoDescanso: null,
                    sabadoFin2RangoDescanso: null,
                    domingoInicio1RangoDescanso: null,
                    domingoInicio2RangoDescanso: null,
                    domingoFin1RangoDescanso: null,
                    domingoFin2RangoDescanso: null,
                    lunesCantidad: '',
                    martesCantidad: '',
                    miercolesCantidad: '',
                    juevesCantidad: '',
                    viernesCantidad: '',
                    sabadoCantidad: '',
                    domingoCantidad: '',
                    lunesTipoServicio: '',
                    martesTipoServicio: '',
                    miercolesTipoServicio: '',
                    juevesTipoServicio: '',
                    viernesTipoServicio: '',
                    sabadoTipoServicio: '',
                    domingoTipoServicio: '',
                }
            ],
        });
        setTrabajadoresRegistro({
            cantidad: '',
            trabajadores: []
        });
        setStateSwitchTipoServicioFijoRegistro({
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
    };

    const generarSelectsTrabajadores = (numeroSelects) => {
        let array = [];
        for (let i = 0; i < numeroSelects; i++) {
            array.push(i + 1);
        }
        return (
            array.map((index) => (
                <Box
                    key={`box-trabajadores-` + index}
                    p={0.5}
                    className={classes.mb15}
                >
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.mb15}
                        size="small"
                    >
                        <InputLabel>{`Trabajador-` + index}</InputLabel>
                        <Select
                            id={`form-trabajador-` + index}
                            value={valuesFormRegistro.datosTrabajadores[index - 1] || ''}
                            onChange={handleChangeFormRegistroSelectsTrabajadores('trabajador', index - 1)}
                            input={
                                <OutlinedInput
                                    labelWidth={95}
                                />
                            }
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
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
                        size="small"
                    >
                        <InputLabel>{`Suplente-` + index}</InputLabel>
                        <Select
                            id={`form-suplente-` + index}
                            value={valuesFormRegistro.datosSuplentes[index - 1] || ''}
                            onChange={handleChangeFormRegistroSelectsTrabajadores('suplente', index - 1)}
                            input={
                                <OutlinedInput
                                    labelWidth={80}
                                />
                            }
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
                            {listadoTrabajadores.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            ))
        )
    };

    const generaRetornoHorario = (tipo, index) => {
        if (tipo === 'rango') {
            return (
                <Box m={0.5} key={'boxRango' + index}>
                    <Accordion
                        expanded={expandedRango === 'panelRango' + index} onChange={handleChangeAccordion('panelRango' + index, tipo)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {horarioIntervencionRegistro.tipoRegistro === 'individual' ? (
                                <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                            ) : (
                                <Typography className={classes.heading}>Horario trabajadores</Typography>
                            )}
                        </AccordionSummary>
                        <Box m={2} >
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={false}
                                prDia={'Lunes'}
                                prIdInicio={'timePickerInicio-registro-lunes-' + index}
                                prIdFin={'timePickerFin-registro-lunes-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioRegistro[index].lunes}
                                prValueTimePickerFin={valueTimePickerFinRegistro[index].lunes}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-lunes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].lunesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={false}
                                prDia={'Martes'}
                                prIdInicio={'timePickerInicio-registro-martes-' + index}
                                prIdFin={'timePickerFin-registro-martes-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioRegistro[index].martes}
                                prValueTimePickerFin={valueTimePickerFinRegistro[index].martes}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-martes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].martesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={false}
                                prDia={'Miércoles'}
                                prIdInicio={'timePickerInicio-registro-miercoles-' + index}
                                prIdFin={'timePickerFin-registro-miercoles-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioRegistro[index].miercoles}
                                prValueTimePickerFin={valueTimePickerFinRegistro[index].miercoles}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-miercoles-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].miercolesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={false}
                                prDia={'Jueves'}
                                prIdInicio={'timePickerInicio-registro-jueves-' + index}
                                prIdFin={'timePickerFin-registro-jueves-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioRegistro[index].jueves}
                                prValueTimePickerFin={valueTimePickerFinRegistro[index].jueves}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-jueves-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].juevesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={false}
                                prDia={'Viernes'}
                                prIdInicio={'timePickerInicio-registro-viernes-' + index}
                                prIdFin={'timePickerFin-registro-viernes-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioRegistro[index].viernes}
                                prValueTimePickerFin={valueTimePickerFinRegistro[index].viernes}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-viernes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].viernesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={false}
                                prDia={'Sábado'}
                                prIdInicio={'timePickerInicio-registro-sabado-' + index}
                                prIdFin={'timePickerFin-registro-sabado-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioRegistro[index].sabado}
                                prValueTimePickerFin={valueTimePickerFinRegistro[index].sabado}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-sabado-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].sabadoTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={false}
                                prDia={'Domingo'}
                                prIdInicio={'timePickerInicio-registro-domingo-' + index}
                                prIdFin={'timePickerFin-registro-domingo-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioRegistro[index].domingo}
                                prValueTimePickerFin={valueTimePickerFinRegistro[index].domingo}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-domingo-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].domingoTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                        </Box>
                    </Accordion>
                </Box>
            )
        };
        if (tipo === 'cantidad') {
            return (
                <Box m={0.5} key={'boxCantidad' + index}>
                    <Accordion
                        expanded={expandedCantidad === 'panelCantidad' + index} onChange={handleChangeAccordion('panelCantidad' + index, tipo)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {horarioIntervencionRegistro.tipoRegistro === 'individual' ? (
                                <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                            ) : (
                                <Typography className={classes.heading}>Horario trabajadores</Typography>
                            )}
                        </AccordionSummary>
                        <Box m={2} >
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={false}
                                prDia={'Lunes'}
                                prIdCantidad={'selectCantidad-registro-lunes-' + index}
                                prValueCantidadHoras={valueCantidadHorasRegistro[index].lunes}
                                prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-lunes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].lunesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={false}
                                prDia={'Martes'}
                                prIdCantidad={'selectCantidad-registro-martes-' + index}
                                prValueCantidadHoras={valueCantidadHorasRegistro[index].martes}
                                prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-martes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].martesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={false}
                                prDia={'Miércoles'}
                                prIdCantidad={'selectCantidad-registro-miercoles-' + index}
                                prValueCantidadHoras={valueCantidadHorasRegistro[index].miercoles}
                                prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-miercoles-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].miercolesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={false}
                                prDia={'Jueves'}
                                prIdCantidad={'selectCantidad-registro-jueves-' + index}
                                prValueCantidadHoras={valueCantidadHorasRegistro[index].jueves}
                                prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-jueves-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].juevesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={false}
                                prDia={'Viernes'}
                                prIdCantidad={'selectCantidad-registro-viernes-' + index}
                                prValueCantidadHoras={valueCantidadHorasRegistro[index].viernes}
                                prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-viernes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].viernesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}

                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={false}
                                prDia={'Sábado'}
                                prIdCantidad={'selectCantidad-registro-sabado-' + index}
                                prValueCantidadHoras={valueCantidadHorasRegistro[index].sabado}
                                prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-sabado-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].sabadoTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={false}
                                prDia={'Domingo'}
                                prIdCantidad={'selectCantidad-registro-domingo-' + index}
                                prValueCantidadHoras={valueCantidadHorasRegistro[index].domingo}
                                prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-domingo-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].domingoTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                        </Box>
                    </Accordion>
                </Box>
            )
        };
        if (tipo === 'rangoDescanso') {
            return (
                <Box m={0.5} key={'boxRangoDescanso' + index}>
                    <Accordion
                        expanded={expandedRangoDescanso === 'panelRangoDescanso' + index} onChange={handleChangeAccordion('panelRangoDescanso' + index, tipo)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {horarioIntervencionRegistro.tipoRegistro === 'individual' ? (
                                <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                            ) : (
                                <Typography className={classes.heading}>Horario trabajadores</Typography>
                            )}
                        </AccordionSummary>
                        <Box m={2} >
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={false}
                                prDia={'Lun.'}
                                prIdInicio1={'timePickerInicio1Descanso-registro-lunes-' + index}
                                prIdFin1={'timePickerFin1Descanso-registro-lunes-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-registro-lunes-' + index}
                                prIdFin2={'timePickerFin2Descanso-registro-lunes-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro[index].lunes}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Registro[index].lunes}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro[index].lunes}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Registro[index].lunes}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-lunes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].lunesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={false}
                                prDia={'Mar.'}
                                prIdInicio1={'timePickerInicio1Descanso-registro-martes-' + index}
                                prIdFin1={'timePickerFin1Descanso-registro-martes-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-registro-martes-' + index}
                                prIdFin2={'timePickerFin2Descanso-registro-martes-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro[index].martes}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Registro[index].martes}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro[index].martes}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Registro[index].martes}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-martes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].martesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={false}
                                prDia={'Mié.'}
                                prIdInicio1={'timePickerInicio1Descanso-registro-miercoles-' + index}
                                prIdFin1={'timePickerFin1Descanso-registro-miercoles-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-registro-miercoles-' + index}
                                prIdFin2={'timePickerFin2Descanso-registro-miercoles-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro[index].miercoles}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Registro[index].miercoles}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro[index].miercoles}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Registro[index].miercoles}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-miercoles-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].miercolesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={false}
                                prDia={'Jue.'}
                                prIdInicio1={'timePickerInicio1Descanso-registro-jueves-' + index}
                                prIdFin1={'timePickerFin1Descanso-registro-jueves-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-registro-jueves-' + index}
                                prIdFin2={'timePickerFin2Descanso-registro-jueves-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro[index].jueves}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Registro[index].jueves}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro[index].jueves}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Registro[index].jueves}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-jueves-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].juevesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={false}
                                prDia={'Vie.'}
                                prIdInicio1={'timePickerInicio1Descanso-registro-viernes-' + index}
                                prIdFin1={'timePickerFin1Descanso-registro-viernes-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-registro-viernes-' + index}
                                prIdFin2={'timePickerFin2Descanso-registro-viernes-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro[index].viernes}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Registro[index].viernes}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro[index].viernes}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Registro[index].viernes}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-viernes-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].viernesTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={false}
                                prDia={'Sáb.'}
                                prIdInicio1={'timePickerInicio1Descanso-registro-sabado-' + index}
                                prIdFin1={'timePickerFin1Descanso-registro-sabado-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-registro-sabado-' + index}
                                prIdFin2={'timePickerFin2Descanso-registro-sabado-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro[index].sabado}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Registro[index].sabado}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro[index].sabado}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Registro[index].sabado}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-sabado-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].sabadoTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={false}
                                prDia={'Dom.'}
                                prIdInicio1={'timePickerInicio1Descanso-registro-domingo-' + index}
                                prIdFin1={'timePickerFin1Descanso-registro-domingo-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-registro-domingo-' + index}
                                prIdFin2={'timePickerFin2Descanso-registro-domingo-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro[index].domingo}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Registro[index].domingo}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro[index].domingo}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Registro[index].domingo}
                                prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                prIdTipoServicio={'selectTipoServicio-registro-domingo-' + index}
                                prValueTipoServicio={valueTipoServicioRegistro[index].domingoTipoServicio}
                                prHandleChangeSelectTipoServicioRegistro={handleChangeSelectTipoServicioRegistro}
                            />
                        </Box>
                    </Accordion>
                </Box>
            )
        };
    };

    const retornaTipoServicioFijoRegistro = (tipo, index) => {
        let checkeado, laLabelSw, laLabelIn, elId, elValue, laLabelWi, elPrecioHora, laClase;
        switch (tipo.value) {
            case 'TOL':
                checkeado = stateSwitchTipoServicioFijoRegistro.TO;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE TOLDOS';
                laLabelIn = 'Precio TOL';
                elId = 'form-precio-hora_TO-registro';
                elValue = valuesFormRegistro.precioHora_TO || '';
                laLabelWi = 90;
                elPrecioHora = 'precioHora_TO';
                laClase = valuesFormRegistro.precioHora_TO ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'CRIS':
                checkeado = stateSwitchTipoServicioFijoRegistro.CR;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE CRISTALES';
                laLabelIn = 'Precio CRIS';
                elId = 'form-precio-hora_CR-registro';
                elValue = valuesFormRegistro.precioHora_CR || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_CR';
                laClase = valuesFormRegistro.precioHora_CR ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'CRISE':
                checkeado = stateSwitchTipoServicioFijoRegistro.CE;
                laLabelSw = 'LIMPIEZA CRISTALES EXTERIORES';
                laLabelIn = 'Precio CRISE';
                elId = 'form-precio-hora_CE-registro';
                elValue = valuesFormRegistro.precioHora_CE || '';
                laLabelWi = 110;
                elPrecioHora = 'precioHora_CE';
                laClase = valuesFormRegistro.precioHora_CE ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'CRISI':
                checkeado = stateSwitchTipoServicioFijoRegistro.CI;
                laLabelSw = 'LIMPIEZA CRISTALES INTERIORES';
                laLabelIn = 'Precio CRISI';
                elId = 'form-precio-hora_CI-registro';
                elValue = valuesFormRegistro.precioHora_CI || '';
                laLabelWi = 105;
                elPrecioHora = 'precioHora_CI';
                laClase = valuesFormRegistro.precioHora_CI ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'MOQ':
                checkeado = stateSwitchTipoServicioFijoRegistro.MO;
                laLabelSw = 'SERVICIO DE LIMPIEZA MOQUETA';
                laLabelIn = 'Precio MOQ';
                elId = 'form-precio-hora_MO-registro';
                elValue = valuesFormRegistro.precioHora_MO || '';
                laLabelWi = 95;
                elPrecioHora = 'precioHora_MO';
                laClase = valuesFormRegistro.precioHora_MO ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'OF':
                checkeado = stateSwitchTipoServicioFijoRegistro.OF;
                laLabelSw = 'SERVICIO DE LIMPIEZA OFICINAS';
                laLabelIn = 'Precio OF';
                elId = 'form-precio-hora_OF-registro';
                elValue = valuesFormRegistro.precioHora_OF || '';
                laLabelWi = 80;
                elPrecioHora = 'precioHora_OF';
                laClase = valuesFormRegistro.precioHora_OF ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'ALMC':
                checkeado = stateSwitchTipoServicioFijoRegistro.AL;
                laLabelSw = 'SERVICIO DE LIMPIEZA ALMACENES';
                laLabelIn = 'Precio ALMC';
                elId = 'form-precio-hora_AL-registro';
                elValue = valuesFormRegistro.precioHora_AL || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_AL';
                laClase = valuesFormRegistro.precioHora_AL ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'LAB':
                checkeado = stateSwitchTipoServicioFijoRegistro.LA;
                laLabelSw = 'SERVICIO DE LIMPIEZA LABORATORIO';
                laLabelIn = 'Precio LAB';
                elId = 'form-precio-hora_LA-registro';
                elValue = valuesFormRegistro.precioHora_LA || '';
                laLabelWi = 90;
                elPrecioHora = 'precioHora_LA';
                laClase = valuesFormRegistro.precioHora_LA ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'TELÑ':
                checkeado = stateSwitchTipoServicioFijoRegistro.TE;
                laLabelSw = 'SERVICIO DE LIMPIEZA TELARAÑAS';
                laLabelIn = 'Precio TELÑ';
                elId = 'form-precio-hora_TE-registro';
                elValue = valuesFormRegistro.precioHora_TE || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_TE';
                laClase = valuesFormRegistro.precioHora_TE ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'FCH.IN':
                checkeado = stateSwitchTipoServicioFijoRegistro.FI;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA INTERIOR';
                laLabelIn = 'Precio FCH.IN';
                elId = 'form-precio-hora_FI-registro';
                elValue = valuesFormRegistro.precioHora_FI || '';
                laLabelWi = 120;
                elPrecioHora = 'precioHora_FI';
                laClase = valuesFormRegistro.precioHora_FI ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'FCH.EX':
                checkeado = stateSwitchTipoServicioFijoRegistro.FE;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA EXTERIOR';
                laLabelIn = 'Precio FCH.EX';
                elId = 'form-precio-hora_FE-registro';
                elValue = valuesFormRegistro.precioHora_FE || '';
                laLabelWi = 120;
                elPrecioHora = 'precioHora_FE';
                laClase = valuesFormRegistro.precioHora_FE ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'ABRLL':
                checkeado = stateSwitchTipoServicioFijoRegistro.AB;
                laLabelSw = 'SERVICIO DE LIMPIEZA ABRILLANTADO';
                laLabelIn = 'Precio ABRLL';
                elId = 'form-precio-hora_AB-registro';
                elValue = valuesFormRegistro.precioHora_AB || '';
                laLabelWi = 110;
                elPrecioHora = 'precioHora_AB';
                laClase = valuesFormRegistro.precioHora_AB ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'MANT':
                checkeado = stateSwitchTipoServicioFijoRegistro.MA;
                laLabelSw = 'SERVICIO DE MANTENIMIENTO MÁQUINA';
                laLabelIn = 'Precio MANT';
                elId = 'form-precio-hora_MA-registro';
                elValue = valuesFormRegistro.precioHora_MA || '';
                laLabelWi = 105;
                elPrecioHora = 'precioHora_MA';
                laClase = valuesFormRegistro.precioHora_MA ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'PORT':
                checkeado = stateSwitchTipoServicioFijoRegistro.PO;
                laLabelSw = 'SERVICIO DE LIMPIEZA PORTERÍA';
                laLabelIn = 'Precio PORT';
                elId = 'form-precio-hora_PO-registro';
                elValue = valuesFormRegistro.precioHora_PO || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_PO';
                laClase = valuesFormRegistro.precioHora_PO ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'BACT':
                checkeado = stateSwitchTipoServicioFijoRegistro.BA;
                laLabelSw = 'BOT. NOUBACT';
                laLabelIn = 'Precio BACT';
                elId = 'form-precio-hora_BA-registro';
                elValue = valuesFormRegistro.precioHora_BA || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_BA';
                laClase = valuesFormRegistro.precioHora_BA ? classes.fondoGrisClaro : classes.paper;
                break;
            case 'FEST':
                checkeado = stateSwitchTipoServicioFijoRegistro.FT;
                laLabelSw = 'SERVICIO DE LIMPIEZA DÍA FESTIVO';
                laLabelIn = 'Precio FEST';
                elId = 'form-precio-hora_FT-registro';
                elValue = valuesFormRegistro.precioHora_FT || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_FT';
                laClase = valuesFormRegistro.precioHora_FT ? classes.fondoGrisClaro : classes.paper;
                break;
            default:
        };
        return (
            <Grid
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="center"
                spacing={2}
                className={laClase}
                style={{ height: 80, paddingTop: 5, paddingBottom: 10, paddingRight: 10, paddingLeft: 10, marginBottom: 15 }}
                key={'formServicio' + index}
            >
                <Grid item xs={8} >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checkeado}
                                name={elId}
                                color="secondary"
                                onChange={handleChangeSwitchTipoServicioFijoRegistro}
                            />
                        }
                        label={<Typography variant="body2">{laLabelSw}</Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl
                        variant="outlined"
                        className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                        size="small"
                    >
                        <InputLabel>{laLabelIn}</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id={elId}
                            value={elValue}
                            onChange={handleChangeFormRegistro(elPrecioHora)}
                            labelWidth={laLabelWi}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        )
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Fragment>
                <Grid
                    container
                    direction="row"
                    justifycontent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item lg={4} sm={6} xs={12}>
                        <Box>
                            <Box
                                m={0.5}
                                color="secondary.contrastText"
                                className={valuesFormRegistro.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2) : clsx(classes.fondoAlta, classes.boxStl2)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
                            >
                                <Box>Datos generales</Box>
                                <Box
                                    className={clsx(classes.mt_5, classes.mr15)}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={stateSwitchEstadoRegistro}
                                                color="secondary"
                                                style={valuesFormRegistro.estado === 'baja' ? { color: '#FFFFFF' } : null}
                                                onChange={handleChangeSwitchEstadoRegistro}
                                            />
                                        }
                                        label={<Typography variant="body2">Alta / Baja</Typography>}
                                        labelPlacement="start"
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.scrollable} style={{ height: heightScrollable, paddingTop: 20, paddingRight: 10 }}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Nombre</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-nombre-centro-registro"
                                        value={valuesFormRegistro.nombre}
                                        onChange={handleChangeFormRegistro('nombre')}
                                        labelWidth={60}
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Categoría Centro</InputLabel>
                                    <Select
                                        fullWidth
                                        className={classes.mb15}
                                        id="form-categoria-registro"
                                        label="Categoría Centro"
                                        value={valuesFormRegistro.categoria}
                                        onChange={handleChangeFormRegistro('categoria')}
                                        helpertext="Selecciona categoria"
                                    >
                                        {
                                            categorias.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Código</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-codigo-centro-registro"
                                                value={valuesFormRegistro.codigo}
                                                onChange={handleChangeFormRegistro('codigo')}
                                                labelWidth={55}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>NIF</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-nif-centro-registro"
                                                value={valuesFormRegistro.nif}
                                                onChange={handleChangeFormRegistro('nif')}
                                                labelWidth={30}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>E-mail</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-mail-centro-registro"
                                        value={valuesFormRegistro.mail}
                                        onChange={handleChangeFormRegistro('mail')}
                                        labelWidth={55}
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>E-mail 2</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-mail2-centro-registro"
                                        value={valuesFormRegistro.mail2}
                                        onChange={handleChangeFormRegistro('mail2')}
                                        labelWidth={65}
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Domicilio</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-domicilio-centro-registro"
                                        value={valuesFormRegistro.domicilio}
                                        onChange={handleChangeFormRegistro('domicilio')}
                                        labelWidth={70}
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Población</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-poblacion-centro-registro"
                                        value={valuesFormRegistro.poblacion}
                                        onChange={handleChangeFormRegistro('poblacion')}
                                        labelWidth={75}
                                    />
                                </FormControl>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Provincia</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-provincia-centro-registro"
                                                value={valuesFormRegistro.provincia}
                                                onChange={handleChangeFormRegistro('provincia')}
                                                labelWidth={75}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Código Postal</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-codigoPostal-centro-registro"
                                                value={valuesFormRegistro.codigoPostal}
                                                onChange={handleChangeFormRegistro('codigoPostal')}
                                                labelWidth={75}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Teléfono 1</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-telefono-centro-registro"
                                                value={valuesFormRegistro.telefono}
                                                onChange={handleChangeFormRegistro('telefono')}
                                                labelWidth={80}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Teléfono 2</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb25}
                                                fullWidth
                                                id="form-telefono2-centro-registro"
                                                value={valuesFormRegistro.telefono2}
                                                onChange={handleChangeFormRegistro('telefono2')}
                                                labelWidth={80}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={8} sm={6} xs={12}>
                        <div className={classes.root2} style={{ marginTop: 5 }}>
                            <AppBar position="static" className={valuesFormRegistro.estado === 'baja' ? clsx(classes.fondoBaja) : clsx(classes.fondoAlta)}>
                                <Tabs value={valueTabCentrosRegistro} onChange={handleChangeTabCentrosRegistro} className={classes.tabsStl}>
                                    <Tab label="Trabajadores" {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Horario de intervención" {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Servicios fijos" {...a11yProps(2)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Forma de pago" {...a11yProps(3)} style={{ paddingBottom: 10 }} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTabCentrosRegistro} index={0} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item lg={6} sm={6} xs={12}>
                                    <Box>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Trabajadores asignados</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-tipo-trabajadores-registro"
                                                label="Trabajadores asignados"
                                                value={valuesFormRegistro.numeroTrabajadores || ''}
                                                onChange={handleChangeFormRegistro('numeroTrabajadores')}
                                                helpertext="Selecciona número de trabajadores"
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {
                                                    totalTrabajadores.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        {trabajadoresRegistro.cantidad !== '' ? (generarSelectsTrabajadores(trabajadoresRegistro.cantidad)) : null}
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosRegistro} index={1} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={4}
                                >
                                    <Grid item lg={4} sm={4} xs={12}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Modo entrada datos</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-tipo-registro"
                                                label="Modo entrada datos"
                                                value={valuesFormRegistro.tipo || ''}
                                                onChange={handleChangeFormRegistro('tipo')}
                                                helpertext="Selecciona Modo entrada datos"
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {
                                                    tipos.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Variaciones</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb25}
                                                id="form-variaciones-registro"
                                                label="Variaciones"
                                                value={valuesFormRegistro.variacion}
                                                onChange={handleChangeFormRegistro('variacion')}
                                                helpertext="Selecciona variaciones"
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {
                                                    variaciones.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <Box
                                            m={0.5}
                                            color="secondary.contrastText"
                                            className={valuesFormRegistro.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb20) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
                                        >
                                            Cómputo de horas
                                        </Box>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Tipo cómputo</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-tipo-computo-registro"
                                                label="Tipo cómputo"
                                                value={valuesFormRegistro.computo || ''}
                                                onChange={handleChangeFormRegistro('computo')}
                                                helpertext="Selecciona cómputo de horas"
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {
                                                    computoHoras.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        {valuesFormRegistro.computo === 1 || valuesFormRegistro.computo === 3 ? (
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>Mensual pactado</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
                                                    fullWidth
                                                    id="form-mensual-pactado-registro"
                                                    value={valuesFormRegistro.mensualPactado || ''}
                                                    onChange={handleChangeFormRegistro('mensualPactado')}
                                                    labelWidth={130}
                                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                />
                                            </FormControl>
                                        ) : null}
                                        {valuesFormRegistro.computo === 2 || valuesFormRegistro.computo === 3 ? (
                                            <Fragment>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora LIM</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_L-registro"
                                                        value={valuesFormRegistro.precioHora_L || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_L')}
                                                        labelWidth={120}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza</Typography>
                                                </Box>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora LIME</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_E-registro"
                                                        value={valuesFormRegistro.precioHora_E || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_E')}
                                                        labelWidth={125}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza especial</Typography>
                                                </Box>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora LIMP</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_P-registro"
                                                        value={valuesFormRegistro.precioHora_P || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_P')}
                                                        labelWidth={130}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza del parking</Typography>
                                                </Box>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora NAVE2</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_N-registro"
                                                        value={valuesFormRegistro.precioHora_N || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_N')}
                                                        labelWidth={130}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza nave 2</Typography>
                                                </Box>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora REFZ</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_R-registro"
                                                        value={valuesFormRegistro.precioHora_R || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_R')}
                                                        labelWidth={125}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza refuerzo</Typography>
                                                </Box>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora LIM1</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_L1-registro"
                                                        value={valuesFormRegistro.precioHora_L1 || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_L1')}
                                                        labelWidth={120}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza 1</Typography>
                                                </Box>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora LIM2</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_L2-registro"
                                                        value={valuesFormRegistro.precioHora_L2 || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_L2')}
                                                        labelWidth={120}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza 2</Typography>
                                                </Box>
                                                <FormControl
                                                    variant="outlined"
                                                    className={classes.form}
                                                    size="small"
                                                >
                                                    <InputLabel>Precio hora FEST</InputLabel>
                                                    <OutlinedInput
                                                        className={classes.mb15}
                                                        fullWidth
                                                        id="form-precio-hora_F-registro"
                                                        value={valuesFormRegistro.precioHora_F || ''}
                                                        onChange={handleChangeFormRegistro('precioHora_F')}
                                                        labelWidth={125}
                                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Box className={classes.boxMiniServicios}>
                                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza día festivo</Typography>
                                                </Box>
                                            </Fragment>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={8} sm={8} xs={12}>
                                        <Box style={{ marginTop: -10 }}>
                                            {valuesFormRegistro.tipo !== '' ? (
                                                <Box
                                                    m={0.5}
                                                    color="secondary.contrastText"
                                                    className={valuesFormRegistro.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb10, classes.mt15) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb10, classes.mt15)}
                                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
                                                >
                                                    <Box>Tipo de registro</Box>
                                                    <Box
                                                        className={clsx(classes.mt_5, classes.mr15)}
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={stateSwitchTipoRegistro}
                                                                    color="secondary"
                                                                    onChange={handleChangeSwitchTipoRegistroRegistro}
                                                                />
                                                            }
                                                            label={<Typography variant="body2">Común / Individual</Typography>}
                                                            labelPlacement="start"
                                                        />
                                                    </Box>
                                                </Box>
                                            ) : null}
                                            <List >
                                                {
                                                    horarioIntervencionRegistro.tipoRegistroTrabajador.map((item, index) => (
                                                        generaRetornoHorario(valuesFormRegistro.tipo, index)
                                                    ))
                                                }
                                            </List>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosRegistro} index={2} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item lg={8} sm={8} xs={12}>
                                    <Box style={{ paddingLeft: 10, marginTop: 10 }}>
                                        {
                                            tiposDeServicio.map((tipo, index) => (
                                                retornaTipoServicioFijoRegistro(tipo, index)
                                            ))
                                        }
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosRegistro} index={3} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item lg={6} sm={6} xs={12}>
                                    <Box>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Forma pago</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-formaPago-registro"
                                                label="Forma pago"
                                                value={valuesFormRegistro.formaPago || ''}
                                                onChange={handleChangeFormRegistro('formaPago')}
                                                helpertext="Selecciona la forma de pago"
                                            >
                                                {
                                                    formasDePago.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Vencimiento</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-diaPago-registro"
                                                label="Vencimiento"
                                                value={valuesFormRegistro.diaPago || ''}
                                                onChange={handleChangeFormRegistro('diaPago')}
                                                helpertext="Selecciona día vencimiento"
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {
                                                    diaDelPago.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Temporización</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-tempPago-registro"
                                                label="Temporización"
                                                value={valuesFormRegistro.tempPago || ''}
                                                onChange={handleChangeFormRegistro('tempPago')}
                                                helpertext="Selecciona temporización del pago"
                                            >
                                                {
                                                    temporizacionDelPago.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </TabPanel>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(valuesFormRegistro)} */}
        </div>
    )
})

export default CentrosRegistrar
