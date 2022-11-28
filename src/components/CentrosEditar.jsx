import React, { useState, useEffect, Fragment, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

//carga componentes
import ItemListTime from './ItemListTime';
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { actualizarCentroAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { retornaHoraRangoAccion } from '../redux/appDucks';
import { retornaMinutosAccion } from '../redux/appDucks';
import { generaFechaAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { eliminarCentroAccion } from '../redux/centrosDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { activarDesactivarActualizarCentroAccion } from '../redux/centrosDucks';
import { validarMailAccion } from '../redux/appDucks';
import { vaciarDatosCentrosAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresSubcategoriaAccion } from '../redux/trabajadoresDucks';

//constantes
const categorias = Constantes.CATEGORIAS_CENTROS;
const variaciones = Constantes.VARIACIONES_HORARIOS_CENTROS;
const tipos = Constantes.MODO_ENTRADA_HORARIOS;
const totalTrabajadores = Constantes.TRABAJADORES_ASIGNADOS_CENTRO;
const computoHoras = Constantes.COMPUTO_HORAS;
const formasDePago = Constantes.FORMA_DE_PAGO;
const temporizacionDelPago = Constantes.TEMPORIZACION_PAGO;
const diaDelPago = Constantes.DIA_PAGO;
const tiposDeServicio = Constantes.TIPO_SERVICIO_FIJO;
const excepciones = Constantes.EXCEPCIONES_CENTROS;

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

const CentrosEditar = forwardRef((props, ref) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const centroAEditar = useSelector(store => store.variablesCentros.objetoCentro);
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const exitoActualizacionCentro = useSelector(store => store.variablesCentros.exitoActualizacionCentro);
    const exitoEliminarCentro = useSelector(store => store.variablesCentros.exitoEliminarCentro);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const disabledItem = useSelector(store => store.variablesApp.estadoActivadoDesactivado);
    const openDialog2 = useSelector(store => store.variablesApp.openDialog[1]);
    const trabajadoresCargados = useSelector(store => store.variablesTrabajadores.trabajadoresCargados);
    const arrayTrabajadoresSubcategoria = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresSubcategoria);

    //states

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openSnack, setOpenSnack] = useState(false);
    const [valuesAutocompleteCentrosValores, setValuesAutocompleteCentrosValores] = useState(null);
    const [alert, setAlert] = useState({});
    const [valuesFormEdicion, setValuesFormEdicion] = useState({
        categoria: '',
        variacion: '',
        excepcion: '',
        observaciones: '',
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
        precioHora_FT: null,
        precioHora_C3: null,
        precioHora_C2: null,
        precioHora_C4: null,
        precioHora_ES: null,
        precioHora_PA: null,
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
        variacion_C4: '',
        variacion_ES: '',
        variacion_PA: '',
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
        diaVariacion_C4: '',
        diaVariacion_ES: '',
        diaVariacion_PA: '',
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
        activo_C4: 'si',
        activo_ES: 'si',
        activo_PA: 'si',
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
        int_C4: false,
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
        trab_C4: '',
        trab_ES: '',
        trab_PA: ''
    });
    const [valueTimePickerInicioEdicion, setValueTimePickerInicioEdicion] = useState([
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
    const [valueTimePickerFinEdicion, setValueTimePickerFinEdicion] = useState([
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
    const [valueTimePickerInicioDescanso1Edicion, setValueTimePickerInicioDescanso1Edicion] = useState([
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
    const [valueTimePickerFinDescanso1Edicion, setValueTimePickerFinDescanso1Edicion] = useState([
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
    const [valueTimePickerInicioDescanso2Edicion, setValueTimePickerInicioDescanso2Edicion] = useState([
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
    const [valueTimePickerFinDescanso2Edicion, setValueTimePickerFinDescanso2Edicion] = useState([
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
    const [valueCantidadHorasEdicion, setValueCantidadHorasEdicion] = useState([
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
    const [valueTipoServicioEdicion, setValueTipoServicioEdicion] = useState([
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
    const [horarioIntervencionEdicion, setHorarioIntervencionEdicion] = useState({
        tipo: '',
        variacion: '',
        excepcion: '',
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
    const [trabajadoresEdicion, setTrabajadoresEdicion] = useState({
        cantidad: '',
        trabajadores: []
    });
    const [openLoading, setOpenLoading] = useState(false);
    const [stateSwitchTipoRegistro, setStateSwitchTipoRegistro] = useState(false);
    const [expandedRango, setExpandedRango] = useState(false);
    const [expandedRangoDescanso, setExpandedRangoDescanso] = useState(false);
    const [expandedCantidad, setExpandedCantidad] = useState(false);
    const [estamosCargandoDatos, setEstamosCargandoDatos] = useState(true);
    const [stateSwitchEstadoEdicion, setStateSwitchEstadoEdicion] = useState(false);
    const [valueTabCentrosEdicion, setValueTabCentrosEdicion] = useState(0);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [stateSwitchTipoServicioFijoEdicion, setStateSwitchTipoServicioFijoEdicion] = useState({
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
        C2: false,
        C4: false,
        ES: false,
        PA: false
    });
    const [numeroCuadrantesEdicion, setNumeroCuadrantesEdicion] = useState([{ value: 1, cuadrante: null, guardado: false }]);
    const [cuadranteEnUsoEdicion, setCuadranteEnUsoEdicion] = useState(1);
    const [esInicioCentrosEdicion, setEsInicioCentrosEdicion] = useState(true);
    const [valuesFormEdicionGenerales, setValuesFormEdicionGenerales] = useState({
        id: null,
        nombre: '',
        estado: 'alta',
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
        activoNumCuenta: false,
        gestionEspSF: false
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
        dispatch(onEstemAccion('editarCentros'));
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosAccion('centros', false));
        };
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        } else {
            if (trabajadoresCargados) {
                dispatch(obtenerTrabajadoresSubcategoriaAccion(2));
            };
        };
    }, [listadoCentros, listadoTrabajadores]);

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
        if (props.prVenimosCentroFuera) {
            setValuesAutocompleteCentrosValores(props.prVenimosCentroFuera);
            dispatch(obtenerCentroAccion('centros', props.prVenimosCentroFuera.id));
            dispatch(activarDesactivarAccion(false));
        }
    }, [props.prVenimosCentroFuera]);

    useEffect(() => {
        if (exitoActualizacionCentro) {
            setAlert({
                mensaje: "Registro actualizado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoActualizacionCentro]);

    useEffect(() => {
        if (exitoEliminarCentro) {
            setAlert({
                mensaje: "Registro eliminado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoEliminarCentro]);

    useEffect(() => {
        if (centroAEditar.categoria.categoria.length > 0) {
            let arrayAAnadir = [];
            for (let i = 0; i < centroAEditar.categoria.categoria.length; i++) {
                let objAAnadir = {
                    value: i + 1,
                    cuadrante: {
                        categoria: centroAEditar.categoria.categoria[i],
                        horario: centroAEditar.horario.horario[i],
                        servicios_fijos: centroAEditar.serviciosFijos.serviciosFijos[i],
                        trabajadores: centroAEditar.trabajadores.trabajadores[i],
                        observaciones: centroAEditar.observaciones.observaciones[i]
                    },
                    guardado: true
                };
                arrayAAnadir.push(objAAnadir);
            };
            setNumeroCuadrantesEdicion(arrayAAnadir);
            setValuesFormEdicionGenerales({
                ...valuesFormEdicionGenerales,
                id: centroAEditar.id,
                nombre: centroAEditar.nombre,
                estado: centroAEditar.estado,
                codigo: centroAEditar.codigo || '',
                domicilio: centroAEditar.domicilio || '',
                codigoPostal: centroAEditar.codigoPostal || '',
                poblacion: centroAEditar.poblacion || '',
                provincia: centroAEditar.provincia || '',
                nif: centroAEditar.nif || '',
                mail: centroAEditar.mail || '',
                mail2: centroAEditar.mail2 || '',
                telefono: centroAEditar.telefono || '',
                telefono2: centroAEditar.telefono2 || '',
                formaPago: centroAEditar.formaPago || '',
                tempPago: centroAEditar.tempPago || '',
                diaPago: centroAEditar.diaPago ? centroAEditar.diaPago : '',
                activoNumCuenta: centroAEditar.activoNumCuenta === 'si' ? true : false,
                gestionEspSF: centroAEditar.serviciosFijos.gestionEspSF || false
            });
            if (centroAEditar.estado === 'baja') {
                setStateSwitchEstadoEdicion(true);
            };
        };
    }, [centroAEditar]);

    useEffect(() => {
        if (horarioIntervencionEdicion.tipoRegistro === 'individual' && !estamosCargandoDatos) {
            let myArray1 = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
            let myArray2 = [...valueTimePickerInicioEdicion];
            let myArray3 = [...valueTimePickerFinEdicion];
            let myArray4 = [...valueTimePickerInicioDescanso1Edicion];
            let myArray5 = [...valueTimePickerFinDescanso1Edicion];
            let myArray6 = [...valueTimePickerInicioDescanso2Edicion];
            let myArray7 = [...valueTimePickerFinDescanso2Edicion];
            let myArray8 = [...valueCantidadHorasEdicion];
            let myArray9 = [...valueTipoServicioEdicion];
            for (let i = 1; i < trabajadoresEdicion.cantidad; i++) {
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
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioEdicion(myArray2);
            setValueTimePickerFinEdicion(myArray3);
            setValueTimePickerInicioDescanso1Edicion(myArray4);
            setValueTimePickerFinDescanso1Edicion(myArray5);
            setValueTimePickerInicioDescanso2Edicion(myArray6);
            setValueTimePickerFinDescanso2Edicion(myArray7);
            setValueCantidadHorasEdicion(myArray8);
            setValueTipoServicioEdicion(myArray9);
        };
    }, [horarioIntervencionEdicion.tipoRegistro, estamosCargandoDatos]);

    useEffect(() => {
        if (!openLoadingCentros && !openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCentros, openLoadingTrabajadores]);

    useEffect(() => {
        if (esInicioCentrosEdicion) {
            if (numeroCuadrantesEdicion[0].guardado) {
                gestionaContenidoCuadranteEdicion(1);
                setEsInicioCentrosEdicion(false);
            };
        }
    }, [numeroCuadrantesEdicion]);

    //funciones

    const handleChangeTabCentrosEdicion = (event, newValue) => {
        setValueTabCentrosEdicion(newValue);
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

    const generaFecha = (datoHorario) => {
        return dispatch(generaFechaAccion(datoHorario));
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeSelectCentrosEdicion = (e, values) => {
        if (values) {
            reseteaContenidoEdicion('nuevo');
            setEsInicioCentrosEdicion(true);
            setEstamosCargandoDatos(true);
            setValuesAutocompleteCentrosValores(values);
            dispatch(obtenerCentroAccion('centros', values.id));
            dispatch(activarDesactivarAccion(false));
        } else {
            dispatch(activarDesactivarAccion(true));
            dispatch(activarDesactivarActualizarCentroAccion(true));
            dispatch(registrarIntervencionAccion(true));
            reseteaContenidoEdicion('nuevo');
        }
    };

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
    };

    const handleChangeFormEdicion = (prop) => (e) => {
        if (prop === "categoria") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "variacion") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, variacion: e.target.value });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "excepcion") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, excepcion: e.target.value });
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "computo") {
            setValuesFormEdicion({
                ...valuesFormEdicion, [prop]: e.target.value,
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
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "mensualPactado") {
            if (IsNumeric(e.target.value)) {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
                dispatch(activarDesactivarActualizarCentroAccion(false));
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
            prop === "precioHora_FT" ||
            prop === "precioHora_C3" ||
            prop === "precioHora_C2" ||
            prop === "precioHora_C4" ||
            prop === "precioHora_ES" ||
            prop === "precioHora_PA"
        ) {
            if (IsNumeric(e.target.value)) {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
                dispatch(activarDesactivarActualizarCentroAccion(false));
            }
            return;
        };
        if (prop === "int_TO" ||
            prop === "int_CR" ||
            prop === "int_CE" ||
            prop === "int_CI" ||
            prop === "int_MO" ||
            prop === "int_OF" ||
            prop === "int_AL" ||
            prop === "int_LA" ||
            prop === "int_TE" ||
            prop === "int_FI" ||
            prop === "int_FE" ||
            prop === "int_AB" ||
            prop === "int_MA" ||
            prop === "int_PO" ||
            prop === "int_BA" ||
            prop === "int_FT" ||
            prop === "int_C3" ||
            prop === "int_C2" ||
            prop === "int_C4" ||
            prop === "int_ES" ||
            prop === "int_PA"
        ) {
            if (e.target.checked) {
                const myPropSplitted = prop.split("_");
                const elServicio = myPropSplitted[1];
                setValuesFormEdicion({
                    ...valuesFormEdicion,
                    ['diaVariacion_' + elServicio]: '',
                    ['precioHora_' + elServicio]: null,
                    ['variacion_' + elServicio]: '',
                    [prop]: e.target.checked
                });
                dispatch(activarDesactivarActualizarCentroAccion(false));
                return;
            } else {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.checked });
                dispatch(activarDesactivarActualizarCentroAccion(false));
                return;
            };
        };
        if (prop === "tipo") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setStateSwitchTipoRegistro(false);
            setHorarioIntervencionEdicion({
                ...horarioIntervencionEdicion,
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
            setValueTimePickerInicioEdicion([
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
            setValueTimePickerFinEdicion([
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
            setValueTimePickerInicioDescanso1Edicion([
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
            setValueTimePickerFinDescanso1Edicion([
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
            setValueTimePickerInicioDescanso2Edicion([
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
            setValueTimePickerFinDescanso2Edicion([
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
            setValueCantidadHorasEdicion([
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
            setValueTipoServicioEdicion([
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
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        }
        if (prop === "numeroTrabajadores") {
            if (horarioIntervencionEdicion.tipoRegistro !== 'comun') {
                if (e.target.value === 1) {
                    setAlert({
                        mensaje: "El número de trabajadores en tipo de registro individual debe ser mayor que uno.",
                        tipo: 'warning'
                    })
                    setOpenSnack(true);
                    return;
                };
                gestionaTipoRegistroNumTrabajadoresEdicion(e.target.value);
            };
            if (e.target.value > valuesFormEdicion.datosTrabajadores.length) {
                let vecesMayor = e.target.value - valuesFormEdicion.datosTrabajadores.length;
                let arrayTr = [...valuesFormEdicion.datosTrabajadores];
                let arraySu = [...valuesFormEdicion.datosSuplentes];
                let arrayTrEd = [...trabajadoresEdicion.trabajadores];
                for (let i = 0; i < vecesMayor; i++) {
                    arrayTrEd[valuesFormEdicion.datosTrabajadores.length + i] = {};
                    arrayTrEd[valuesFormEdicion.datosTrabajadores.length + i]['trabajador_' + (valuesFormEdicion.datosTrabajadores.length + 1 + i)] = '';
                    arrayTrEd[valuesFormEdicion.datosTrabajadores.length + i]['suplente_' + (valuesFormEdicion.datosTrabajadores.length + 1 + i)] = '';
                    arrayTr.push("");
                    arraySu.push("");
                };
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresEdicion({ ...trabajadoresEdicion, cantidad: e.target.value, trabajadores: arrayTrEd });
            } else {
                let vecesMenor = valuesFormEdicion.datosTrabajadores.length - e.target.value;
                let arrayTr = [...valuesFormEdicion.datosTrabajadores];
                let arraySu = [...valuesFormEdicion.datosSuplentes];
                let arrayTrEd = [...trabajadoresEdicion.trabajadores];
                for (let i = 0; i < vecesMenor; i++) {
                    arrayTr.pop();
                    arraySu.pop();
                    arrayTrEd.pop();
                };
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresEdicion({ ...trabajadoresEdicion, cantidad: e.target.value, trabajadores: arrayTrEd });
            }
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeFormEdicionGenerales = (prop) => (e) => {
        if (prop === "activoNumCuenta") {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, [prop]: e.target.checked });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "gestionEspSF") {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, [prop]: e.target.checked });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeFormEdicionSelectsTrabajadores = (tipo, index) => (e) => {
        let encontrado = false;
        if (e.target.value) {
            let trabajadorSeleccionado = listadoTrabajadores.find(trabajador => trabajador.id === e.target.value);
            if (trabajadorSeleccionado.estado === 'reserva') {
                setAlert({
                    mensaje: "El trabajador está en Reserva, selecciona otro o cambia su estado.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
        };
        trabajadoresEdicion.trabajadores.map((trabajador, index) => {
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
                let arrayTr = [...valuesFormEdicion.datosTrabajadores];
                arrayTr[index] = e.target.value;
                let arrayTrEd = [...trabajadoresEdicion.trabajadores];
                arrayTrEd[index]['trabajador_' + (index + 1)] = e.target.value;
                setValuesFormEdicion({ ...valuesFormEdicion, datosTrabajadores: arrayTr });
                setTrabajadoresEdicion({ ...trabajadoresEdicion, trabajadores: arrayTrEd });
            }
            if (tipo === "suplente") {
                let arraySu = [...valuesFormEdicion.datosSuplentes];
                arraySu[index] = e.target.value;
                let arrayTrEd = [...trabajadoresEdicion.trabajadores];
                arrayTrEd[index]['suplente_' + (index + 1)] = e.target.value;
                setValuesFormEdicion({ ...valuesFormEdicion, datosSuplentes: arraySu });
                setTrabajadoresEdicion({ ...trabajadoresEdicion, trabajadores: arrayTrEd });
            };
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
        };
    };

    const handleChangeTimePickerInicioEdicion = (id, hora) => {
        const idSplitted = id.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresTimePicker, arrayValoresHorario;
        switch (idCaso) {
            case 'timePickerInicio-edicion-lunes':
                // if (valueTimePickerFinEdicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].lunes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicioRango'] = null;
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-edicion-martes':
                // if (valueTimePickerFinEdicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].martes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicioRango'] = null;
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-edicion-miercoles':
                // if (valueTimePickerFinEdicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].miercoles))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicioRango'] = null;
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-edicion-jueves':
                // if (valueTimePickerFinEdicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].jueves))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicioRango'] = null;
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-edicion-viernes':
                // if (valueTimePickerFinEdicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].viernes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicioRango'] = null;
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-edicion-sabado':
                // if (valueTimePickerFinEdicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].sabado))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicioRango'] = null;
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-edicion-domingo':
                // if (valueTimePickerFinEdicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].domingo))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicioRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicioRango'] = null;
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-edicion-lunes':
                // if (valueTimePickerFinDescanso1Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].lunes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-edicion-lunes':
                // if (valueTimePickerFinDescanso2Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].lunes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-edicion-martes':
                // if (valueTimePickerFinDescanso1Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].martes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-edicion-martes':
                // if (valueTimePickerFinDescanso2Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].martes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-edicion-miercoles':
                // if (valueTimePickerFinDescanso1Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].miercoles))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-edicion-miercoles':
                // if (valueTimePickerFinDescanso2Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].miercoles))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-edicion-jueves':
                // if (valueTimePickerFinDescanso1Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].jueves))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-edicion-jueves':
                // if (valueTimePickerFinDescanso2Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].jueves))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-edicion-viernes':
                // if (valueTimePickerFinDescanso1Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].viernes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-edicion-viernes':
                // if (valueTimePickerFinDescanso2Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].viernes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-edicion-sabado':
                // if (valueTimePickerFinDescanso1Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].sabado))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-edicion-sabado':
                // if (valueTimePickerFinDescanso2Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].sabado))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-edicion-domingo':
                // if (valueTimePickerFinDescanso1Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].domingo))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicio1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-edicion-domingo':
                // if (valueTimePickerFinDescanso2Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].domingo))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicio2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeTimePickerFinEdicion = (id, hora) => {
        const idSplitted = id.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresTimePicker, arrayValoresHorario;
        switch (idCaso) {
            case 'timePickerFin-edicion-lunes':
                // if (valueTimePickerInicioEdicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFinRango'] = null;
                };
                setValueTimePickerFinEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-edicion-martes':
                // if (valueTimePickerInicioEdicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].martes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFinRango'] = null;
                };
                setValueTimePickerFinEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-edicion-miercoles':
                // if (valueTimePickerInicioEdicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFinRango'] = null;
                };
                setValueTimePickerFinEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-edicion-jueves':
                // if (valueTimePickerInicioEdicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFinRango'] = null;
                };
                setValueTimePickerFinEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-edicion-viernes':
                // if (valueTimePickerInicioEdicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFinRango'] = null;
                };
                setValueTimePickerFinEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-edicion-sabado':
                // if (valueTimePickerInicioEdicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFinRango'] = null;
                };
                setValueTimePickerFinEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-edicion-domingo':
                // if (valueTimePickerInicioEdicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinEdicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFinRango'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFinRango'] = null;
                };
                setValueTimePickerFinEdicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-edicion-lunes':
                // if (valueTimePickerInicioDescanso1Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-edicion-lunes':
                // if (valueTimePickerInicioDescanso2Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-edicion-martes':
                // if (valueTimePickerInicioDescanso1Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].martes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-edicion-martes':
                // if (valueTimePickerInicioDescanso2Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].martes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-edicion-miercoles':
                // if (valueTimePickerInicioDescanso1Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-edicion-miercoles':
                // if (valueTimePickerInicioDescanso2Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-edicion-jueves':
                // if (valueTimePickerInicioDescanso1Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-edicion-jueves':
                // if (valueTimePickerInicioDescanso2Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-edicion-viernes':
                // if (valueTimePickerInicioDescanso1Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-edicion-viernes':
                // if (valueTimePickerInicioDescanso2Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-edicion-sabado':
                // if (valueTimePickerInicioDescanso1Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-edicion-sabado':
                // if (valueTimePickerInicioDescanso2Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-edicion-domingo':
                // if (valueTimePickerInicioDescanso1Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFin1RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-edicion-domingo':
                // if (valueTimePickerInicioDescanso2Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2Edicion];
                arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFin2RangoDescanso'] = retornaHoraRango(hora);
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker);
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSelectCantidadEdicion = (e) => {
        const idSplitted = e.target.name.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresSelect, arrayValoresHorario;
        arrayValoresSelect = [...valueCantidadHorasEdicion];
        arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
        switch (idCaso) {
            case 'selectCantidad-edicion-lunes':
                arrayValoresSelect[idIndex]['lunes'] = e.target.value;
                arrayValoresHorario[idIndex]['lunesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-edicion-martes':
                arrayValoresSelect[idIndex]['martes'] = e.target.value;
                arrayValoresHorario[idIndex]['martesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-edicion-miercoles':
                arrayValoresSelect[idIndex]['miercoles'] = e.target.value;
                arrayValoresHorario[idIndex]['miercolesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-edicion-jueves':
                arrayValoresSelect[idIndex]['jueves'] = e.target.value;
                arrayValoresHorario[idIndex]['juevesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-edicion-viernes':
                arrayValoresSelect[idIndex]['viernes'] = e.target.value;
                arrayValoresHorario[idIndex]['viernesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-edicion-sabado':
                arrayValoresSelect[idIndex]['sabado'] = e.target.value;
                arrayValoresHorario[idIndex]['sabadoCantidad'] = e.target.value;
                break;
            case 'selectCantidad-edicion-domingo':
                arrayValoresSelect[idIndex]['domingo'] = e.target.value;
                arrayValoresHorario[idIndex]['domingoCantidad'] = e.target.value;
                break;
            default:
        }
        setValueCantidadHorasEdicion(arrayValoresSelect);
        setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSelectTipoServicioEdicion = (e) => {
        const idSplitted = e.target.name.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1] + "-" + idSplitted[2];
        const idIndex = idSplitted[3];
        let arrayValoresSelect, arrayValoresHorario;
        arrayValoresSelect = [...valueTipoServicioEdicion];
        arrayValoresHorario = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
        switch (idCaso) {
            case 'selectTipoServicio-edicion-lunes':
                arrayValoresSelect[idIndex]['lunesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['lunesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-edicion-martes':
                arrayValoresSelect[idIndex]['martesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['martesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-edicion-miercoles':
                arrayValoresSelect[idIndex]['miercolesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['miercolesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-edicion-jueves':
                arrayValoresSelect[idIndex]['juevesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['juevesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-edicion-viernes':
                arrayValoresSelect[idIndex]['viernesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['viernesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-edicion-sabado':
                arrayValoresSelect[idIndex]['sabadoTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['sabadoTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-edicion-domingo':
                arrayValoresSelect[idIndex]['domingoTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['domingoTipoServicio'] = e.target.value;
                break;
            default:
        }
        setValueTipoServicioEdicion(arrayValoresSelect);
        setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: arrayValoresHorario });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSwitchTipoRegistroEdicion = (e) => {
        setEstamosCargandoDatos(false);
        if (e.target.checked) {
            if (trabajadoresEdicion.cantidad > 1) {
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistro: 'individual' });
            } else {
                setAlert({
                    mensaje: "Para seleccionar este tipo de registro debe haber más de un trabajador asignado.",
                    tipo: 'warning'
                })
                setOpenSnack(true);
                return;
            };
        } else {
            let myArray1 = [horarioIntervencionEdicion.tipoRegistroTrabajador[0]];
            let myArray2 = [valueTimePickerInicioEdicion[0]];
            let myArray3 = [valueTimePickerFinEdicion[0]];
            let myArray4 = [valueTimePickerInicioDescanso1Edicion[0]];
            let myArray5 = [valueTimePickerFinDescanso1Edicion[0]];
            let myArray6 = [valueTimePickerInicioDescanso2Edicion[0]];
            let myArray7 = [valueTimePickerFinDescanso2Edicion[0]];
            let myArray8 = [valueCantidadHorasEdicion[0]];
            let myArray9 = [valueTipoServicioEdicion[0]];
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistro: 'comun', tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioEdicion(myArray2);
            setValueTimePickerFinEdicion(myArray3);
            setValueTimePickerInicioDescanso1Edicion(myArray4);
            setValueTimePickerFinDescanso1Edicion(myArray5);
            setValueTimePickerInicioDescanso2Edicion(myArray6);
            setValueTimePickerFinDescanso2Edicion(myArray7);
            setValueCantidadHorasEdicion(myArray8);
            setValueTipoServicioEdicion(myArray9);
        };
        setStateSwitchTipoRegistro(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSwitchEstadoEdicion = (e) => {
        if (e.target.checked) {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, estado: 'baja' });
        } else {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, estado: 'alta' });
        };
        setStateSwitchEstadoEdicion(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSwitchTipoServicioFijoEdicion = (e) => {
        if (e.target.name.includes('TO')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_TO: null, variacion_TO: '', diaVariacion_TO: '', activo_TO: 'si', int_TO: false, trab_TO: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, TO: e.target.checked });
        };
        if (e.target.name.includes('CR')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_CR: null, variacion_CR: '', diaVariacion_CR: '', activo_CR: 'si', int_CR: false, trab_CR: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, CR: e.target.checked });
        };
        if (e.target.name.includes('CE')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_CE: null, variacion_CE: '', diaVariacion_CE: '', activo_CE: 'si', int_CE: false, trab_CE: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, CE: e.target.checked });
        };
        if (e.target.name.includes('CI')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_CI: null, variacion_CI: '', diaVariacion_CI: '', activo_CI: 'si', int_CI: false, trab_CI: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, CI: e.target.checked });
        };
        if (e.target.name.includes('MO')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_MO: null, variacion_MO: '', diaVariacion_MO: '', activo_MO: 'si', int_MO: false, trab_MO: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, MO: e.target.checked });
        };
        if (e.target.name.includes('OF')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_OF: null, variacion_OF: '', diaVariacion_OF: '', activo_OF: 'si', int_OF: false, trab_OF: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, OF: e.target.checked });
        };
        if (e.target.name.includes('AL')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_AL: null, variacion_AL: '', diaVariacion_AL: '', activo_AL: 'si', int_AL: false, trab_AL: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, AL: e.target.checked });
        };
        if (e.target.name.includes('LA')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_LA: null, variacion_LA: '', diaVariacion_LA: '', activo_LA: 'si', int_LA: false, trab_LA: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, LA: e.target.checked });
        };
        if (e.target.name.includes('TE')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_TE: null, variacion_TE: '', diaVariacion_TE: '', activo_TE: 'si', int_TE: false, trab_TE: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, TE: e.target.checked });
        };
        if (e.target.name.includes('FI')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_FI: null, variacion_FI: '', diaVariacion_FI: '', activo_FI: 'si', int_FI: false, trab_FI: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, FI: e.target.checked });
        };
        if (e.target.name.includes('FE')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_FE: null, variacion_FE: '', diaVariacion_FE: '', activo_FE: 'si', int_FE: false, trab_FE: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, FE: e.target.checked });
        };
        if (e.target.name.includes('AB')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_AB: null, variacion_AB: '', diaVariacion_AB: '', activo_AB: 'si', int_AB: false, trab_AB: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, AB: e.target.checked });
        };
        if (e.target.name.includes('MA')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_MA: null, variacion_MA: '', diaVariacion_MA: '', activo_MA: 'si', int_MA: false, trab_MA: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, MA: e.target.checked });
        };
        if (e.target.name.includes('PO')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_PO: null, variacion_PO: '', diaVariacion_PO: '', activo_PO: 'si', int_PO: false, trab_PO: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, PO: e.target.checked });
        };
        if (e.target.name.includes('BA')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_BA: null, variacion_BA: '', diaVariacion_BA: '', activo_BA: 'si', int_BA: false, trab_BA: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, BA: e.target.checked });
        };
        if (e.target.name.includes('FT')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_FT: null, variacion_FT: '', diaVariacion_FT: '', activo_FT: 'si', int_FT: false, trab_FT: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, FT: e.target.checked });
        };
        if (e.target.name.includes('C3')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_C3: null, variacion_C3: '', diaVariacion_C3: '', activo_C3: 'si', int_C3: false, trab_C3: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, C3: e.target.checked });
        };
        if (e.target.name.includes('C2')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_C2: null, variacion_C2: '', diaVariacion_C2: '', activo_C2: 'si', int_C2: false, trab_C2: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, C2: e.target.checked });
        };
        if (e.target.name.includes('C4')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_C4: null, variacion_C4: '', diaVariacion_C4: '', activo_C4: 'si', int_C4: false, trab_C4: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, C4: e.target.checked });
        };
        if (e.target.name.includes('ES')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_ES: null, variacion_ES: '', diaVariacion_ES: '', activo_ES: 'si', int_ES: false, trab_ES: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, ES: e.target.checked });
        };
        if (e.target.name.includes('PA')) {
            if (!e.target.checked) {
                setValuesFormEdicion({ ...valuesFormEdicion, precioHora_PA: null, variacion_PA: '', diaVariacion_PA: '', activo_PA: 'si', int_PA: false, trab_PA: '' });
            };
            setStateSwitchTipoServicioFijoEdicion({ ...stateSwitchTipoServicioFijoEdicion, PA: e.target.checked });
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const gestionaTipoRegistroNumTrabajadoresEdicion = (numTrab) => {
        let diferencia;
        let myArray1 = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
        let myArray2 = [...valueTimePickerInicioEdicion];
        let myArray3 = [...valueTimePickerFinEdicion];
        let myArray4 = [...valueTimePickerInicioDescanso1Edicion];
        let myArray5 = [...valueTimePickerFinDescanso1Edicion];
        let myArray6 = [...valueTimePickerInicioDescanso2Edicion];
        let myArray7 = [...valueTimePickerFinDescanso2Edicion];
        let myArray8 = [...valueCantidadHorasEdicion];
        let myArray9 = [...valueTipoServicioEdicion];
        if (numTrab > trabajadoresEdicion.cantidad) {
            diferencia = numTrab - trabajadoresEdicion.cantidad;
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
            diferencia = trabajadoresEdicion.cantidad - numTrab;
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
        setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: myArray1 });
        setValueTimePickerInicioEdicion(myArray2);
        setValueTimePickerFinEdicion(myArray3);
        setValueTimePickerInicioDescanso1Edicion(myArray4);
        setValueTimePickerFinDescanso1Edicion(myArray5);
        setValueTimePickerInicioDescanso2Edicion(myArray6);
        setValueTimePickerFinDescanso2Edicion(myArray7);
        setValueCantidadHorasEdicion(myArray8);
        setValueTipoServicioEdicion(myArray9);
    };

    const tituloDialog = "¿Estás seguro que quieres eliminar el Centro?";
    const descripcionDialog = "Para confirmar pulsa 'De acuerdo', de lo contrario pulsa 'No'."

    const handleClickOpenDialog = () => {
        dispatch(abreObjetoDialogAccion('2'));
    };

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(eliminarCentroAccion('centros', valuesFormEdicionGenerales.id));
            //setTimeout(function(){ window.location.reload(); }, 1500);
            dispatch(activarDesactivarAccion(true));
            reseteaContenidoEdicion('nuevo');
            dispatch(vaciarDatosCentrosAccion());
            //dispatch(obtenerCentrosAccion('centros', false));
        }
        dispatch(cierraObjetoDialogAccion());
    };

    const procesarDatosEdicionPromesa = () => {
        return new Promise((resolve, reject) => {
            if (valuesFormEdicionGenerales.nombre === '') {
                setAlert({
                    mensaje: "Faltan datos por completar. Campo Nombre. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesFormEdicion.categoria === '') {
                setAlert({
                    mensaje: "Faltan datos por completar. Campo Categoría Centro. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesFormEdicionGenerales.formaPago === '') {
                setAlert({
                    mensaje: "Faltan datos por completar. Campo Forma pago. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesFormEdicionGenerales.tempPago === '') {
                setAlert({
                    mensaje: "Faltan datos por completar. Campo Temporización. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if ((stateSwitchTipoServicioFijoEdicion.TO && !valuesFormEdicion.int_TO && !valuesFormEdicion.precioHora_TO) ||
                (stateSwitchTipoServicioFijoEdicion.CR && !valuesFormEdicion.int_CR && !valuesFormEdicion.precioHora_CR) ||
                (stateSwitchTipoServicioFijoEdicion.CE && !valuesFormEdicion.int_CE && !valuesFormEdicion.precioHora_CE) ||
                (stateSwitchTipoServicioFijoEdicion.CI && !valuesFormEdicion.int_CI && !valuesFormEdicion.precioHora_CI) ||
                (stateSwitchTipoServicioFijoEdicion.MO && !valuesFormEdicion.int_MO && !valuesFormEdicion.precioHora_MO) ||
                (stateSwitchTipoServicioFijoEdicion.OF && !valuesFormEdicion.int_OF && !valuesFormEdicion.precioHora_OF) ||
                (stateSwitchTipoServicioFijoEdicion.AL && !valuesFormEdicion.int_AL && !valuesFormEdicion.precioHora_AL) ||
                (stateSwitchTipoServicioFijoEdicion.LA && !valuesFormEdicion.int_LA && !valuesFormEdicion.precioHora_LA) ||
                (stateSwitchTipoServicioFijoEdicion.TE && !valuesFormEdicion.int_TE && !valuesFormEdicion.precioHora_TE) ||
                (stateSwitchTipoServicioFijoEdicion.FI && !valuesFormEdicion.int_FI && !valuesFormEdicion.precioHora_FI) ||
                (stateSwitchTipoServicioFijoEdicion.FE && !valuesFormEdicion.int_FE && !valuesFormEdicion.precioHora_FE) ||
                (stateSwitchTipoServicioFijoEdicion.AB && !valuesFormEdicion.int_AB && !valuesFormEdicion.precioHora_AB) ||
                (stateSwitchTipoServicioFijoEdicion.MA && !valuesFormEdicion.int_MA && !valuesFormEdicion.precioHora_MA) ||
                (stateSwitchTipoServicioFijoEdicion.PO && !valuesFormEdicion.int_PO && !valuesFormEdicion.precioHora_PO) ||
                (stateSwitchTipoServicioFijoEdicion.BA && !valuesFormEdicion.int_BA && !valuesFormEdicion.precioHora_BA) ||
                (stateSwitchTipoServicioFijoEdicion.FT && !valuesFormEdicion.int_FT && !valuesFormEdicion.precioHora_FT) ||
                (stateSwitchTipoServicioFijoEdicion.C3 && !valuesFormEdicion.int_C3 && !valuesFormEdicion.precioHora_C3) ||
                (stateSwitchTipoServicioFijoEdicion.C2 && !valuesFormEdicion.int_C2 && !valuesFormEdicion.precioHora_C2) ||
                (stateSwitchTipoServicioFijoEdicion.C4 && !valuesFormEdicion.int_C4 && !valuesFormEdicion.precioHora_C4) ||
                (stateSwitchTipoServicioFijoEdicion.ES && !valuesFormEdicion.int_ES && !valuesFormEdicion.precioHora_ES) ||
                (stateSwitchTipoServicioFijoEdicion.PA && !valuesFormEdicion.int_PA && !valuesFormEdicion.precioHora_PA)
            ) {
                setAlert({
                    mensaje: "Has selecionado un tipo de servicio extra pero no has asignado precio. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            let valoresComputoPreciosHoraVariables = true;
            let valoresComputoPreciosHoraFijos = true;
            let valoresCorrectosComputo = false;
            let valoresServiciosIntegrados = false;
            if (valuesFormEdicion.computo === '' &&
                !valuesFormEdicion.mensualPactado &&
                !valuesFormEdicion.precioHora_L &&
                !valuesFormEdicion.precioHora_E &&
                !valuesFormEdicion.precioHora_P &&
                !valuesFormEdicion.precioHora_N &&
                !valuesFormEdicion.precioHora_R &&
                !valuesFormEdicion.precioHora_L1 &&
                !valuesFormEdicion.precioHora_L2 &&
                !valuesFormEdicion.precioHora_F) {
                valoresComputoPreciosHoraVariables = false;
            };
            if ((valuesFormEdicion.computo === 1 && !valuesFormEdicion.mensualPactado) ||
                (valuesFormEdicion.computo === 2 && (
                    !valuesFormEdicion.precioHora_L &&
                    !valuesFormEdicion.precioHora_E &&
                    !valuesFormEdicion.precioHora_P &&
                    !valuesFormEdicion.precioHora_N &&
                    !valuesFormEdicion.precioHora_R &&
                    !valuesFormEdicion.precioHora_L1 &&
                    !valuesFormEdicion.precioHora_L2 &&
                    !valuesFormEdicion.precioHora_F)) ||
                (valuesFormEdicion.computo === 3 && (
                    !valuesFormEdicion.precioHora_L &&
                    !valuesFormEdicion.precioHora_E &&
                    !valuesFormEdicion.precioHora_P &&
                    !valuesFormEdicion.precioHora_N &&
                    !valuesFormEdicion.precioHora_R &&
                    !valuesFormEdicion.precioHora_L1 &&
                    !valuesFormEdicion.precioHora_L2 &&
                    !valuesFormEdicion.precioHora_F &&
                    !valuesFormEdicion.mensualPactado))) {
                setAlert({
                    mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            } else {
                valoresCorrectosComputo = true;
            }
            if ((!valuesFormEdicion.precioHora_TO && !valuesFormEdicion.int_TO) &&
                (!valuesFormEdicion.precioHora_CR && !valuesFormEdicion.int_CR) &&
                (!valuesFormEdicion.precioHora_CE && !valuesFormEdicion.int_CE) &&
                (!valuesFormEdicion.precioHora_CI && !valuesFormEdicion.int_CI) &&
                (!valuesFormEdicion.precioHora_MO && !valuesFormEdicion.int_MO) &&
                (!valuesFormEdicion.precioHora_OF && !valuesFormEdicion.int_OF) &&
                (!valuesFormEdicion.precioHora_AL && !valuesFormEdicion.int_AL) &&
                (!valuesFormEdicion.precioHora_LA && !valuesFormEdicion.int_LA) &&
                (!valuesFormEdicion.precioHora_TE && !valuesFormEdicion.int_TE) &&
                (!valuesFormEdicion.precioHora_FI && !valuesFormEdicion.int_FI) &&
                (!valuesFormEdicion.precioHora_FE && !valuesFormEdicion.int_FE) &&
                (!valuesFormEdicion.precioHora_AB && !valuesFormEdicion.int_AB) &&
                (!valuesFormEdicion.precioHora_MA && !valuesFormEdicion.int_MA) &&
                (!valuesFormEdicion.precioHora_PO && !valuesFormEdicion.int_PO) &&
                (!valuesFormEdicion.precioHora_BA && !valuesFormEdicion.int_BA) &&
                (!valuesFormEdicion.precioHora_FT && !valuesFormEdicion.int_FT) &&
                (!valuesFormEdicion.precioHora_C3 && !valuesFormEdicion.int_C3) &&
                (!valuesFormEdicion.precioHora_C2 && !valuesFormEdicion.int_C2) &&
                (!valuesFormEdicion.precioHora_C4 && !valuesFormEdicion.int_C4) &&
                (!valuesFormEdicion.precioHora_ES && !valuesFormEdicion.int_ES) &&
                (!valuesFormEdicion.precioHora_PA && !valuesFormEdicion.int_PA)) {
                valoresComputoPreciosHoraFijos = false;
            };
            if (valuesFormEdicion.int_TO ||
                valuesFormEdicion.int_CR ||
                valuesFormEdicion.int_CE ||
                valuesFormEdicion.int_CI ||
                valuesFormEdicion.int_MO ||
                valuesFormEdicion.int_OF ||
                valuesFormEdicion.int_AL ||
                valuesFormEdicion.int_LA ||
                valuesFormEdicion.int_TE ||
                valuesFormEdicion.int_FI ||
                valuesFormEdicion.int_FE ||
                valuesFormEdicion.int_AB ||
                valuesFormEdicion.int_MA ||
                valuesFormEdicion.int_PO ||
                valuesFormEdicion.int_BA ||
                valuesFormEdicion.int_FT ||
                valuesFormEdicion.int_C3 ||
                valuesFormEdicion.int_C2 ||
                valuesFormEdicion.int_C4 ||
                valuesFormEdicion.int_ES ||
                valuesFormEdicion.int_PA) {
                valoresServiciosIntegrados = true;
            };
            if (valoresServiciosIntegrados && !valoresComputoPreciosHoraVariables) {
                setAlert({
                    mensaje: "Faltan datos por completar. Los Servicios Extra integrados en cómputo deben tener cómputo de horas en el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if ((!valoresComputoPreciosHoraFijos && !valoresComputoPreciosHoraVariables) ||
                (!valoresComputoPreciosHoraVariables && valuesFormEdicion.numeroTrabajadores)) {
                setAlert({
                    mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesFormEdicion.numeroTrabajadores === '' &&
                valuesFormEdicion.computo &&
                valoresCorrectosComputo
            ) {
                setAlert({
                    mensaje: "Falta asignar trabajadores para el cómputo de horas. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if ((valuesFormEdicion.variacion === '' ||
                valuesFormEdicion.tipo === '') &&
                valuesFormEdicion.numeroTrabajadores !== '') {
                setAlert({
                    mensaje: "Falta asignar horario o variaciones para los trabajadores seleccionados. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesFormEdicion.computo === 3 && ((
                valuesFormEdicion.precioHora_L ||
                valuesFormEdicion.precioHora_E ||
                valuesFormEdicion.precioHora_P ||
                valuesFormEdicion.precioHora_N ||
                valuesFormEdicion.precioHora_R ||
                valuesFormEdicion.precioHora_L1 ||
                valuesFormEdicion.precioHora_L2 ||
                valuesFormEdicion.precioHora_F) && valuesFormEdicion.mensualPactado)) {
                setAlert({
                    mensaje: "Revisa el formulario, solo puede haber un tipo de cómputo de horas.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };

            //comprobación que el tipo de servicio seleccionado corresponda con el precio/hora estipulado
            for (let i = 0; i < horarioIntervencionEdicion.tipoRegistroTrabajador.length; i++) {
                if (valuesFormEdicion.computo === 2 || (valuesFormEdicion.computo === 3 && !valuesFormEdicion.mensualPactado)) {
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIM' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'LIM' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIM' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIM' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIM' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIM' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIM')
                        && !valuesFormEdicion.precioHora_L) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIME' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'LIME' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIME' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIME' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIME' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIME' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIME')
                        && !valuesFormEdicion.precioHora_E) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIMP' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'LIMP' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIMP' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIMP' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIMP' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIMP' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIMP')
                        && !valuesFormEdicion.precioHora_P) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'NAVE2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'NAVE2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'NAVE2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'NAVE2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'NAVE2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'NAVE2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'NAVE2')
                        && !valuesFormEdicion.precioHora_N) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'REFZ' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'REFZ' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'REFZ' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'REFZ' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'REFZ' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'REFZ' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'REFZ')
                        && !valuesFormEdicion.precioHora_R) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIM1' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'LIM1' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIM1' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIM1' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIM1' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIM1' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIM1')
                        && !valuesFormEdicion.precioHora_L1) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'LIM2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'LIM2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'LIM2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'LIM2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'LIM2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'LIM2' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'LIM2')
                        && !valuesFormEdicion.precioHora_L2) {
                        setAlert({
                            mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'FEST' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'FEST' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'FEST' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'FEST' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'FEST' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'FEST' ||
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'FEST')
                        && !valuesFormEdicion.precioHora_F) {
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
            if (valuesFormEdicionGenerales.mail) {
                const validacionMail = dispatch(validarMailAccion(valuesFormEdicionGenerales.mail));
                if (!validacionMail) {
                    setAlert({
                        mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            }
            if (valuesFormEdicionGenerales.mail2) {
                const validacionMail2 = dispatch(validarMailAccion(valuesFormEdicionGenerales.mail2));
                if (!validacionMail2) {
                    setAlert({
                        mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            }

            if (horarioIntervencionEdicion.tipo === "rango") {
                for (let i = 0; i < horarioIntervencionEdicion.tipoRegistroTrabajador.length; i++) {
                    //primera comprobación, que todos los campos esten vacíos
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicioRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFinRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicioRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFinRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicioRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFinRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicioRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFinRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicioRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFinRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicioRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFinRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicioRango &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFinRango) {
                        setAlert({
                            mensaje: "No has introducido ningún dato horario para registrar.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //segunda comprobación, coinciden ambas casillas en registro
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFinRango) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //tercera comprobacion que no falte tipo de servicio
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicioRango && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicioRango && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio)) {
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                };
            };

            if (horarioIntervencionEdicion.tipo === "rangoDescanso") {
                for (let i = 0; i < horarioIntervencionEdicion.tipoRegistroTrabajador.length; i++) {
                    //primera comprobación, que todos los campos esten vacíos
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin1RangoDescanso &&
                        !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin2RangoDescanso) {
                        setAlert({
                            mensaje: "No has introducido ningún dato horario para registrar.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //segunda comprobación, coinciden todas las casillas en registro
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    if (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin2RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso) {
                        setAlert({
                            mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };

                    //tercera comprobacion que no falte tipo de servicio
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio1RangoDescanso && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio)) {
                        setAlert({
                            mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                }
            };

            if (horarioIntervencionEdicion.tipo === "cantidad") {
                for (let i = 0; i < horarioIntervencionEdicion.tipoRegistroTrabajador.length; i++) {
                    //comprobamos que no haya campos vacíos
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesCantidad === '' &&
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesCantidad === '' &&
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesCantidad === '' &&
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesCantidad === '' &&
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesCantidad === '' &&
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoCantidad === '' &&
                        horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoCantidad === '') {
                        setAlert({
                            mensaje: "No has introducido ningún dato horario para registrar.",
                            tipo: 'error'
                        })
                        setOpenSnack(true);
                        return;
                    };
                    //tercera comprobacion que no falte tipo de servicio
                    if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesCantidad && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesCantidad && horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesCantidad && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesCantidad && horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesCantidad && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesCantidad && horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesCantidad && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesCantidad && horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesCantidad && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesCantidad && horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoCantidad && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoCantidad && horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio) ||
                        (horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoCantidad && !horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio) ||
                        (!horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoCantidad && horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio)) {
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
            for (let i = 0; i < trabajadoresEdicion.cantidad; i++) {
                if (trabajadoresEdicion.trabajadores[i]['trabajador_' + (i + 1)] === '' && trabajadoresEdicion.trabajadores[i]['suplente_' + (i + 1)] === '') {
                    setAlert({
                        mensaje: "Alguno de los registros Trabajadores - Suplentes está vacío. Completa o cambia la cantidad de trabajadores asignados.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
            };

            //limpieza final  
            let horarioIntervencionEdicionRevisado;
            let elArrayTipoRegistroTrabajador = [];
            if (horarioIntervencionEdicion.tipo === 'rango') {
                for (let i = 0; i < horarioIntervencionEdicion.tipoRegistroTrabajador.length; i++) {
                    let elObjetoTipoRegistroTrabajador = {};
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicioRango) {
                        elObjetoTipoRegistroTrabajador['lunesInicioRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicioRango;
                        elObjetoTipoRegistroTrabajador['lunesFinRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFinRango;
                        elObjetoTipoRegistroTrabajador['lunesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicioRango) {
                        elObjetoTipoRegistroTrabajador['martesInicioRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicioRango;
                        elObjetoTipoRegistroTrabajador['martesFinRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFinRango;
                        elObjetoTipoRegistroTrabajador['martesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicioRango) {
                        elObjetoTipoRegistroTrabajador['miercolesInicioRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicioRango;
                        elObjetoTipoRegistroTrabajador['miercolesFinRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFinRango;
                        elObjetoTipoRegistroTrabajador['miercolesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicioRango) {
                        elObjetoTipoRegistroTrabajador['juevesInicioRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicioRango;
                        elObjetoTipoRegistroTrabajador['juevesFinRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFinRango;
                        elObjetoTipoRegistroTrabajador['juevesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicioRango) {
                        elObjetoTipoRegistroTrabajador['viernesInicioRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicioRango;
                        elObjetoTipoRegistroTrabajador['viernesFinRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFinRango;
                        elObjetoTipoRegistroTrabajador['viernesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicioRango) {
                        elObjetoTipoRegistroTrabajador['sabadoInicioRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicioRango;
                        elObjetoTipoRegistroTrabajador['sabadoFinRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFinRango;
                        elObjetoTipoRegistroTrabajador['sabadoTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicioRango) {
                        elObjetoTipoRegistroTrabajador['domingoInicioRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicioRango;
                        elObjetoTipoRegistroTrabajador['domingoFinRango'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFinRango;
                        elObjetoTipoRegistroTrabajador['domingoTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio;
                    };
                    elArrayTipoRegistroTrabajador.push(elObjetoTipoRegistroTrabajador);
                };
                horarioIntervencionEdicionRevisado = {
                    tipo: horarioIntervencionEdicion.tipo,
                    tipoRegistro: horarioIntervencionEdicion.tipoRegistro,
                    variacion: horarioIntervencionEdicion.variacion,
                    excepcion: horarioIntervencionEdicion.excepcion,
                    tipoRegistroTrabajador: elArrayTipoRegistroTrabajador
                };
            };
            if (horarioIntervencionEdicion.tipo === 'rangoDescanso') {
                for (let i = 0; i < horarioIntervencionEdicion.tipoRegistroTrabajador.length; i++) {
                    let elObjetoTipoRegistroTrabajador = {};
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['lunesInicio1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['lunesFin1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin1RangoDescanso;
                        if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['lunesInicio2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['lunesFin2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['lunesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['martesInicio1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['martesFin1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin1RangoDescanso;
                        if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['martesInicio2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['martesFin2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['martesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['miercolesInicio1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['miercolesFin1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso;
                        if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['miercolesInicio2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['miercolesFin2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['miercolesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['juevesInicio1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['juevesFin1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin1RangoDescanso;
                        if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['juevesInicio2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['juevesFin2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['juevesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['viernesInicio1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['viernesFin1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin1RangoDescanso;
                        if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['viernesInicio2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['viernesFin2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['viernesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['sabadoInicio1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['sabadoFin1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso;
                        if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['sabadoInicio2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['sabadoFin2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['sabadoTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso) {
                        elObjetoTipoRegistroTrabajador['domingoInicio1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso;
                        elObjetoTipoRegistroTrabajador['domingoFin1RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin1RangoDescanso;
                        if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) {
                            elObjetoTipoRegistroTrabajador['domingoInicio2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso;
                            elObjetoTipoRegistroTrabajador['domingoFin2RangoDescanso'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoFin2RangoDescanso;
                        };
                        elObjetoTipoRegistroTrabajador['domingoTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio;
                    };
                    elArrayTipoRegistroTrabajador.push(elObjetoTipoRegistroTrabajador);
                };
                horarioIntervencionEdicionRevisado = {
                    tipo: horarioIntervencionEdicion.tipo,
                    tipoRegistro: horarioIntervencionEdicion.tipoRegistro,
                    variacion: horarioIntervencionEdicion.variacion,
                    excepcion: horarioIntervencionEdicion.excepcion,
                    tipoRegistroTrabajador: elArrayTipoRegistroTrabajador
                };
            };
            if (horarioIntervencionEdicion.tipo === 'cantidad') {
                for (let i = 0; i < horarioIntervencionEdicion.tipoRegistroTrabajador.length; i++) {
                    let elObjetoTipoRegistroTrabajador = {};
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesCantidad) {
                        elObjetoTipoRegistroTrabajador['lunesCantidad'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesCantidad;
                        elObjetoTipoRegistroTrabajador['lunesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesCantidad) {
                        elObjetoTipoRegistroTrabajador['martesCantidad'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesCantidad;
                        elObjetoTipoRegistroTrabajador['martesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesCantidad) {
                        elObjetoTipoRegistroTrabajador['miercolesCantidad'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesCantidad;
                        elObjetoTipoRegistroTrabajador['miercolesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesCantidad) {
                        elObjetoTipoRegistroTrabajador['juevesCantidad'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesCantidad;
                        elObjetoTipoRegistroTrabajador['juevesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesCantidad) {
                        elObjetoTipoRegistroTrabajador['viernesCantidad'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesCantidad;
                        elObjetoTipoRegistroTrabajador['viernesTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoCantidad) {
                        elObjetoTipoRegistroTrabajador['sabadoCantidad'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoCantidad;
                        elObjetoTipoRegistroTrabajador['sabadoTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio;
                    };
                    if (horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoCantidad) {
                        elObjetoTipoRegistroTrabajador['domingoCantidad'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoCantidad;
                        elObjetoTipoRegistroTrabajador['domingoTipoServicio'] = horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio;
                    };
                    elArrayTipoRegistroTrabajador.push(elObjetoTipoRegistroTrabajador);
                };
                horarioIntervencionEdicionRevisado = {
                    tipo: horarioIntervencionEdicion.tipo,
                    tipoRegistro: horarioIntervencionEdicion.tipoRegistro,
                    variacion: horarioIntervencionEdicion.variacion,
                    excepcion: horarioIntervencionEdicion.excepcion,
                    tipoRegistroTrabajador: elArrayTipoRegistroTrabajador
                };
            };
            //revisión horario correcto
            let errorEnHorario = false;
            horarioIntervencionEdicion.tipoRegistroTrabajador.forEach((harario, index) => {
                if (Object.values(horarioIntervencionEdicion.tipoRegistroTrabajador[index]).indexOf('NaN:NaN') > -1) {
                    errorEnHorario = true;
                };
            });
            if (errorEnHorario) {
                setAlert({
                    mensaje: "Alguna casilla del Horario trabajadores contiene datos erróneos. Revísalo antes de actualizar.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return
            };
            //añadimos cómputo final                           
            let elHorarioIntervencionEditadoRevisado = {
                ...horarioIntervencionEdicionRevisado,
                computo: valuesFormEdicion.computo
            };
            if (valuesFormEdicion.mensualPactado) {
                elHorarioIntervencionEditadoRevisado['mensualPactado'] = parseFloat(valuesFormEdicion.mensualPactado);
            };
            if (valuesFormEdicion.precioHora_L) {
                elHorarioIntervencionEditadoRevisado['precioHora_L'] = parseFloat(valuesFormEdicion.precioHora_L);
            };
            if (valuesFormEdicion.precioHora_E) {
                elHorarioIntervencionEditadoRevisado['precioHora_E'] = parseFloat(valuesFormEdicion.precioHora_E);
            };
            if (valuesFormEdicion.precioHora_P) {
                elHorarioIntervencionEditadoRevisado['precioHora_P'] = parseFloat(valuesFormEdicion.precioHora_P);
            };
            if (valuesFormEdicion.precioHora_N) {
                elHorarioIntervencionEditadoRevisado['precioHora_N'] = parseFloat(valuesFormEdicion.precioHora_N);
            };
            if (valuesFormEdicion.precioHora_R) {
                elHorarioIntervencionEditadoRevisado['precioHora_R'] = parseFloat(valuesFormEdicion.precioHora_R);
            };
            if (valuesFormEdicion.precioHora_L1) {
                elHorarioIntervencionEditadoRevisado['precioHora_L1'] = parseFloat(valuesFormEdicion.precioHora_L1);
            };
            if (valuesFormEdicion.precioHora_L2) {
                elHorarioIntervencionEditadoRevisado['precioHora_L2'] = parseFloat(valuesFormEdicion.precioHora_L2);
            };
            if (valuesFormEdicion.precioHora_F) {
                elHorarioIntervencionEditadoRevisado['precioHora_F'] = parseFloat(valuesFormEdicion.precioHora_F);
            };
            let serviciosFijosEdicion = {
                objeto: 'serviciosFijos',
                servicio: []
            };
            if (valuesFormEdicion.precioHora_TO || valuesFormEdicion.int_TO) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'TOL',
                    precioHora_TO: valuesFormEdicion.precioHora_TO ? parseFloat(valuesFormEdicion.precioHora_TO) : null,
                    variacion_TO: 3,
                    diaVariacion_TO: '',
                    activo_TO: valuesFormEdicion.activo_TO,
                    int_TO: valuesFormEdicion.int_TO,
                    trab_TO: valuesFormEdicion.trab_TO ? parseInt(valuesFormEdicion.trab_TO) : null
                });
            };
            if (valuesFormEdicion.precioHora_CR || valuesFormEdicion.int_CR) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'CRIS',
                    precioHora_CR: valuesFormEdicion.precioHora_CR ? parseFloat(valuesFormEdicion.precioHora_CR) : null,
                    variacion_CR: 3,
                    diaVariacion_CR: '',
                    activo_CR: valuesFormEdicion.activo_CR,
                    int_CR: valuesFormEdicion.int_CR,
                    trab_CR: valuesFormEdicion.trab_CR ? parseInt(valuesFormEdicion.trab_CR) : null
                });
            };
            if (valuesFormEdicion.precioHora_CE || valuesFormEdicion.int_CE) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'CRISE',
                    precioHora_CE: valuesFormEdicion.precioHora_CE ? parseFloat(valuesFormEdicion.precioHora_CE) : null,
                    variacion_CE: 3,
                    diaVariacion_CE: '',
                    activo_CE: valuesFormEdicion.activo_CE,
                    int_CE: valuesFormEdicion.int_CE,
                    trab_CE: valuesFormEdicion.trab_CE ? parseInt(valuesFormEdicion.trab_CE) : null
                });
            };
            if (valuesFormEdicion.precioHora_CI || valuesFormEdicion.int_CI) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'CRISI',
                    precioHora_CI: valuesFormEdicion.precioHora_CI ? parseFloat(valuesFormEdicion.precioHora_CI) : null,
                    variacion_CI: 3,
                    diaVariacion_CI: '',
                    activo_CI: valuesFormEdicion.activo_CI,
                    int_CI: valuesFormEdicion.int_CI,
                    trab_CI: valuesFormEdicion.trab_CI ? parseInt(valuesFormEdicion.trab_CI) : null
                });
            };
            if (valuesFormEdicion.precioHora_MO || valuesFormEdicion.int_MO) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'MOQ',
                    precioHora_MO: valuesFormEdicion.precioHora_MO ? parseFloat(valuesFormEdicion.precioHora_MO) : null,
                    variacion_MO: 3,
                    diaVariacion_MO: '',
                    activo_MO: valuesFormEdicion.activo_MO,
                    int_MO: valuesFormEdicion.int_MO,
                    trab_MO: valuesFormEdicion.trab_MO ? parseInt(valuesFormEdicion.trab_MO) : null
                });
            };
            if (valuesFormEdicion.precioHora_OF || valuesFormEdicion.int_OF) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'OF',
                    precioHora_OF: valuesFormEdicion.precioHora_OF ? parseFloat(valuesFormEdicion.precioHora_OF) : null,
                    variacion_OF: 3,
                    diaVariacion_OF: '',
                    activo_OF: valuesFormEdicion.activo_OF,
                    int_OF: valuesFormEdicion.int_OF,
                    trab_OF: valuesFormEdicion.trab_OF ? parseInt(valuesFormEdicion.trab_OF) : null
                });
            };
            if (valuesFormEdicion.precioHora_AL || valuesFormEdicion.int_AL) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'ALMC',
                    precioHora_AL: valuesFormEdicion.precioHora_AL ? parseFloat(valuesFormEdicion.precioHora_AL) : null,
                    variacion_AL: 3,
                    diaVariacion_AL: '',
                    activo_AL: valuesFormEdicion.activo_AL,
                    int_AL: valuesFormEdicion.int_AL,
                    trab_AL: valuesFormEdicion.trab_AL ? parseInt(valuesFormEdicion.trab_AL) : null
                });
            };
            if (valuesFormEdicion.precioHora_LA || valuesFormEdicion.int_LA) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'LAB',
                    precioHora_LA: valuesFormEdicion.precioHora_LA ? parseFloat(valuesFormEdicion.precioHora_LA) : null,
                    variacion_LA: 3,
                    diaVariacion_LA: '',
                    activo_LA: valuesFormEdicion.activo_LA,
                    int_LA: valuesFormEdicion.int_LA,
                    trab_LA: valuesFormEdicion.trab_LA ? parseInt(valuesFormEdicion.trab_LA) : null
                });
            };
            if (valuesFormEdicion.precioHora_TE || valuesFormEdicion.int_TE) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'TELÑ',
                    precioHora_TE: valuesFormEdicion.precioHora_TE ? parseFloat(valuesFormEdicion.precioHora_TE) : null,
                    variacion_TE: 3,
                    diaVariacion_TE: '',
                    activo_TE: valuesFormEdicion.activo_TE,
                    int_TE: valuesFormEdicion.int_TE,
                    trab_TE: valuesFormEdicion.trab_TE ? parseInt(valuesFormEdicion.trab_TE) : null
                });
            };
            if (valuesFormEdicion.precioHora_FI || valuesFormEdicion.int_FI) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'FCH.IN',
                    precioHora_FI: valuesFormEdicion.precioHora_FI ? parseFloat(valuesFormEdicion.precioHora_FI) : null,
                    variacion_FI: 3,
                    diaVariacion_FI: '',
                    activo_FI: valuesFormEdicion.activo_FI,
                    int_FI: valuesFormEdicion.int_FI,
                    trab_FI: valuesFormEdicion.trab_FI ? parseInt(valuesFormEdicion.trab_FI) : null
                });
            };
            if (valuesFormEdicion.precioHora_FE || valuesFormEdicion.int_FE) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'FCH.EX',
                    precioHora_FE: valuesFormEdicion.precioHora_FE ? parseFloat(valuesFormEdicion.precioHora_FE) : null,
                    variacion_FE: 3,
                    diaVariacion_FE: '',
                    activo_FE: valuesFormEdicion.activo_FE,
                    int_FE: valuesFormEdicion.int_FE,
                    trab_FE: valuesFormEdicion.trab_FE ? parseInt(valuesFormEdicion.trab_FE) : null
                });
            };
            if (valuesFormEdicion.precioHora_AB || valuesFormEdicion.int_AB) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'ABRLL',
                    precioHora_AB: valuesFormEdicion.precioHora_AB ? parseFloat(valuesFormEdicion.precioHora_AB) : null,
                    variacion_AB: 3,
                    diaVariacio_AB: '',
                    activo_AB: valuesFormEdicion.activo_AB,
                    int_AB: valuesFormEdicion.int_AB,
                    trab_AB: valuesFormEdicion.trab_AB ? parseInt(valuesFormEdicion.trab_AB) : null
                });
            };
            if (valuesFormEdicion.precioHora_MA || valuesFormEdicion.int_MA) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'MANT',
                    precioHora_MA: valuesFormEdicion.precioHora_MA ? parseFloat(valuesFormEdicion.precioHora_MA) : null,
                    variacion_MA: 3,
                    diaVariacion_MA: '',
                    activo_MA: valuesFormEdicion.activo_MA,
                    int_MA: valuesFormEdicion.int_MA,
                    trab_MA: valuesFormEdicion.trab_MA ? parseInt(valuesFormEdicion.trab_MA) : null
                });
            };
            if (valuesFormEdicion.precioHora_PO || valuesFormEdicion.int_PO) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'PORT',
                    precioHora_PO: valuesFormEdicion.precioHora_PO ? parseFloat(valuesFormEdicion.precioHora_PO) : null,
                    variacion_PO: 3,
                    diaVariacion_PO: '',
                    activo_PO: valuesFormEdicion.activo_PO,
                    int_PO: valuesFormEdicion.int_PO,
                    trab_PO: valuesFormEdicion.trab_PO ? parseInt(valuesFormEdicion.trab_PO) : null
                });
            };
            if (valuesFormEdicion.precioHora_BA || valuesFormEdicion.int_BA) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'BACT',
                    precioHora_BA: valuesFormEdicion.precioHora_BA ? parseFloat(valuesFormEdicion.precioHora_BA) : null,
                    variacion_BA: 3,
                    diaVariacion_BA: '',
                    activo_BA: valuesFormEdicion.activo_BA,
                    int_BA: valuesFormEdicion.int_BA,
                    trab_BA: valuesFormEdicion.trab_BA ? parseInt(valuesFormEdicion.trab_BA) : null
                });
            };
            if (valuesFormEdicion.precioHora_FT || valuesFormEdicion.int_FT) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'FEST',
                    precioHora_FT: valuesFormEdicion.precioHora_FT ? parseFloat(valuesFormEdicion.precioHora_FT) : null,
                    variacion_FT: 3,
                    diaVariacion_FT: '',
                    activo_FT: valuesFormEdicion.activo_FT,
                    int_FT: valuesFormEdicion.int_FT,
                    trab_FT: valuesFormEdicion.trab_FT ? parseInt(valuesFormEdicion.trab_FT) : null
                });
            };
            if (valuesFormEdicion.precioHora_C3 || valuesFormEdicion.int_C3) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'CRTRIM',
                    precioHora_C3: valuesFormEdicion.precioHora_C3 ? parseFloat(valuesFormEdicion.precioHora_C3) : null,
                    variacion_C3: 3,
                    diaVariacion_C3: '',
                    activo_C3: valuesFormEdicion.activo_C3,
                    int_C3: valuesFormEdicion.int_C3,
                    trab_C3: valuesFormEdicion.trab_C3 ? parseInt(valuesFormEdicion.trab_C3) : null
                });
            };
            if (valuesFormEdicion.precioHora_C2 || valuesFormEdicion.int_C2) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'CRBIM',
                    precioHora_C2: valuesFormEdicion.precioHora_C2 ? parseFloat(valuesFormEdicion.precioHora_C2) : null,
                    variacion_C2: 3,
                    diaVariacion_C2: '',
                    activo_C2: valuesFormEdicion.activo_C2,
                    int_C2: valuesFormEdicion.int_C2,
                    trab_C2: valuesFormEdicion.trab_C2 ? parseInt(valuesFormEdicion.trab_C2) : null
                });
            };
            if (valuesFormEdicion.precioHora_C4 || valuesFormEdicion.int_C4) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'CRCUA',
                    precioHora_C4: valuesFormEdicion.precioHora_C4 ? parseFloat(valuesFormEdicion.precioHora_C4) : null,
                    variacion_C4: 3,
                    diaVariacion_C4: '',
                    activo_C4: valuesFormEdicion.activo_C4,
                    int_C4: valuesFormEdicion.int_C4,
                    trab_C4: valuesFormEdicion.trab_C4 ? parseInt(valuesFormEdicion.trab_C4) : null
                });
            };
            if (valuesFormEdicion.precioHora_ES || valuesFormEdicion.int_ES) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'LIME',
                    precioHora_ES: valuesFormEdicion.precioHora_ES ? parseFloat(valuesFormEdicion.precioHora_ES) : null,
                    variacion_ES: 3,
                    diaVariacion_ES: '',
                    activo_ES: valuesFormEdicion.activo_ES,
                    int_ES: valuesFormEdicion.int_ES,
                    trab_ES: valuesFormEdicion.trab_ES ? parseInt(valuesFormEdicion.trab_ES) : null
                });
            };
            if (valuesFormEdicion.precioHora_PA || valuesFormEdicion.int_PA) {
                serviciosFijosEdicion.servicio.push({
                    tipoServiciofijo: 'LIMP',
                    precioHora_PA: valuesFormEdicion.precioHora_PA ? parseFloat(valuesFormEdicion.precioHora_PA) : null,
                    variacion_PA: 3,
                    diaVariacion_PA: '',
                    activo_PA: valuesFormEdicion.activo_PA,
                    int_PA: valuesFormEdicion.int_PA,
                    trab_PA: valuesFormEdicion.trab_PA ? parseInt(valuesFormEdicion.trab_PA) : null
                });
            };
            if (serviciosFijosEdicion.servicio.length === 0) {
                serviciosFijosEdicion = null;
            };
            if (!valoresComputoPreciosHoraVariables) {
                elHorarioIntervencionEditadoRevisado = null;
            };
            let trabajadoresRevisado;
            if (valuesFormEdicion.numeroTrabajadores === '') {
                trabajadoresRevisado = null;
            } else {
                trabajadoresRevisado = trabajadoresEdicion;
            };
            return resolve({ resuelto: true, horario: elHorarioIntervencionEditadoRevisado, servicios: serviciosFijosEdicion, trabajadores: trabajadoresRevisado });
        });
    };

    useImperativeHandle(ref, () => ({
        funcionesEnCentrosEditar(funcion) {
            switch (funcion) {
                case 'eliminarCentro':
                    const eliminarCentro = () => {
                        handleClickOpenDialog();
                    };
                    eliminarCentro();
                    break;
                case 'procesarDatosEdicion':
                    const procesarDatosEdicion = () => {
                        let centroAGuardar;
                        let objCategorias = null;
                        let objHorario = null;
                        let objServiciosFijos = null;
                        let objTrabajadores = null;
                        let objObservaciones = null;
                        let centroDefinitivoAGuardar;
                        if (numeroCuadrantesEdicion.length === 1) {
                            procesarDatosEdicionPromesa()
                                .then(values => {
                                    if (values.resuelto) {
                                        //registramos
                                        centroAGuardar = {
                                            id: valuesFormEdicionGenerales.id,
                                            nombre: valuesFormEdicionGenerales.nombre,
                                            estado: valuesFormEdicionGenerales.estado,
                                            categoria: valuesFormEdicion.categoria,
                                            observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                                            codigo: valuesFormEdicionGenerales.codigo ? valuesFormEdicionGenerales.codigo : null,
                                            domicilio: valuesFormEdicionGenerales.domicilio ? valuesFormEdicionGenerales.domicilio : null,
                                            codigo_postal: valuesFormEdicionGenerales.codigoPostal ? valuesFormEdicionGenerales.codigoPostal : null,
                                            poblacion: valuesFormEdicionGenerales.poblacion ? valuesFormEdicionGenerales.poblacion : null,
                                            provincia: valuesFormEdicionGenerales.provincia ? valuesFormEdicionGenerales.provincia : null,
                                            nif: valuesFormEdicionGenerales.nif ? valuesFormEdicionGenerales.nif : null,
                                            mail: valuesFormEdicionGenerales.mail ? valuesFormEdicionGenerales.mail : null,
                                            mail_2: valuesFormEdicionGenerales.mail2 ? valuesFormEdicionGenerales.mail2 : null,
                                            telefono: valuesFormEdicionGenerales.telefono ? valuesFormEdicionGenerales.telefono : null,
                                            telefono_2: valuesFormEdicionGenerales.telefono2 ? valuesFormEdicionGenerales.telefono2 : null,
                                            forma_pago: valuesFormEdicionGenerales.formaPago,
                                            temp_pago: valuesFormEdicionGenerales.tempPago,
                                            dia_pago: valuesFormEdicionGenerales.diaPago ? valuesFormEdicionGenerales.diaPago : null,
                                            activo_num_cuenta: valuesFormEdicionGenerales.activoNumCuenta ? 'si' : 'no',
                                            horario: values.horario ? (values.horario) : null,
                                            servicios_fijos: values.servicios ? (values.servicios) : null,
                                            trabajadores: values.trabajadores ? (values.trabajadores) : null
                                        };
                                        centroDefinitivoAGuardar = { ...centroAGuardar };
                                        objCategorias = {
                                            objeto: 'categoria',
                                            categoria: []
                                        };
                                        objHorario = {
                                            objeto: 'horario',
                                            horario: []
                                        };
                                        objServiciosFijos = {
                                            objeto: 'serviciosFijos',
                                            gestionEspSF: valuesFormEdicionGenerales.gestionEspSF,
                                            serviciosFijos: []
                                        };
                                        objTrabajadores = {
                                            objeto: 'trabajadores',
                                            trabajadores: []
                                        };
                                        objObservaciones = {
                                            objeto: 'observaciones',
                                            observaciones: []
                                        };
                                        objCategorias.categoria.push(centroAGuardar.categoria);
                                        objObservaciones.observaciones.push(centroAGuardar.observaciones);
                                        if (centroAGuardar.horario) {
                                            objHorario.horario.push(centroAGuardar.horario);
                                        } else {
                                            objHorario.horario.push(null);
                                        };
                                        if (centroAGuardar.servicios_fijos) {
                                            objServiciosFijos.serviciosFijos.push(centroAGuardar.servicios_fijos);
                                        } else {
                                            objServiciosFijos.serviciosFijos.push(null);
                                        };
                                        if (centroAGuardar.trabajadores) {
                                            objTrabajadores.trabajadores.push(centroAGuardar.trabajadores);
                                        } else {
                                            objTrabajadores.trabajadores.push(null);
                                        };
                                        centroDefinitivoAGuardar = {
                                            ...centroDefinitivoAGuardar,
                                            categoria: JSON.stringify(objCategorias),
                                            horario: JSON.stringify(objHorario),
                                            servicios_fijos: JSON.stringify(objServiciosFijos),
                                            trabajadores: JSON.stringify(objTrabajadores),
                                            observaciones: JSON.stringify(objObservaciones)
                                        };
                                        dispatch(actualizarCentroAccion('centros', centroDefinitivoAGuardar.id, centroDefinitivoAGuardar));
                                        dispatch(registrarIntervencionAccion(true));
                                        dispatch(activarDesactivarActualizarCentroAccion(true));
                                    };
                                });
                        } else {
                            procesarDatosEdicionPromesa()
                                .then(values => {
                                    if (values.resuelto) {
                                        //registramos
                                        centroAGuardar = {
                                            id: valuesFormEdicionGenerales.id,
                                            nombre: valuesFormEdicionGenerales.nombre,
                                            estado: valuesFormEdicionGenerales.estado,
                                            categoria: valuesFormEdicion.categoria,
                                            observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                                            codigo: valuesFormEdicionGenerales.codigo ? valuesFormEdicionGenerales.codigo : null,
                                            domicilio: valuesFormEdicionGenerales.domicilio ? valuesFormEdicionGenerales.domicilio : null,
                                            codigo_postal: valuesFormEdicionGenerales.codigoPostal ? valuesFormEdicionGenerales.codigoPostal : null,
                                            poblacion: valuesFormEdicionGenerales.poblacion ? valuesFormEdicionGenerales.poblacion : null,
                                            provincia: valuesFormEdicionGenerales.provincia ? valuesFormEdicionGenerales.provincia : null,
                                            nif: valuesFormEdicionGenerales.nif ? valuesFormEdicionGenerales.nif : null,
                                            mail: valuesFormEdicionGenerales.mail ? valuesFormEdicionGenerales.mail : null,
                                            mail_2: valuesFormEdicionGenerales.mail2 ? valuesFormEdicionGenerales.mail2 : null,
                                            telefono: valuesFormEdicionGenerales.telefono ? valuesFormEdicionGenerales.telefono : null,
                                            telefono_2: valuesFormEdicionGenerales.telefono2 ? valuesFormEdicionGenerales.telefono2 : null,
                                            forma_pago: valuesFormEdicionGenerales.formaPago,
                                            temp_pago: valuesFormEdicionGenerales.tempPago,
                                            dia_pago: valuesFormEdicionGenerales.diaPago ? valuesFormEdicionGenerales.diaPago : null,
                                            activo_num_cuenta: valuesFormEdicionGenerales.activoNumCuenta ? 'si' : 'no',
                                            horario: values.horario ? (values.horario) : null,
                                            servicios_fijos: values.servicios ? (values.servicios) : null,
                                            trabajadores: values.trabajadores ? (values.trabajadores) : null
                                        };
                                        let arrayCuadrantes = [...numeroCuadrantesEdicion];
                                        arrayCuadrantes.forEach((cuadrante, index) => {
                                            if (cuadrante.value === cuadranteEnUsoEdicion) {
                                                cuadrante.cuadrante = {
                                                    categoria: valuesFormEdicion.categoria,
                                                    observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                                                    horario: values.horario ? (values.horario) : null,
                                                    servicios_fijos: values.servicios ? (values.servicios) : null,
                                                    trabajadores: values.trabajadores ? (values.trabajadores) : null
                                                };
                                                cuadrante.guardado = true;
                                            }
                                        });
                                        centroDefinitivoAGuardar = { ...centroAGuardar };
                                        objCategorias = {
                                            objeto: 'categoria',
                                            categoria: []
                                        };
                                        objHorario = {
                                            objeto: 'horario',
                                            horario: []
                                        };
                                        objServiciosFijos = {
                                            objeto: 'serviciosFijos',
                                            gestionEspSF: valuesFormEdicionGenerales.gestionEspSF,
                                            serviciosFijos: []
                                        };
                                        objTrabajadores = {
                                            objeto: 'trabajadores',
                                            trabajadores: []
                                        };
                                        objObservaciones = {
                                            objeto: 'observaciones',
                                            observaciones: []
                                        };
                                        arrayCuadrantes.forEach((cuadrante, index) => {
                                            if (cuadrante.guardado) {
                                                objCategorias.categoria.push(cuadrante.cuadrante.categoria);
                                                objObservaciones.observaciones.push(cuadrante.cuadrante.observaciones);
                                                if (cuadrante.cuadrante.horario) {
                                                    objHorario.horario.push(cuadrante.cuadrante.horario);
                                                } else {
                                                    objHorario.horario.push(null);
                                                };
                                                if (cuadrante.cuadrante.servicios_fijos) {
                                                    objServiciosFijos.serviciosFijos.push(cuadrante.cuadrante.servicios_fijos);
                                                } else {
                                                    objServiciosFijos.serviciosFijos.push(null);
                                                };
                                                if (cuadrante.cuadrante.trabajadores) {
                                                    objTrabajadores.trabajadores.push(cuadrante.cuadrante.trabajadores);
                                                } else {
                                                    objTrabajadores.trabajadores.push(null);
                                                };
                                            } else {
                                                objCategorias.categoria.push(centroAGuardar.categoria);
                                                objObservaciones.observaciones.push(centroAGuardar.observaciones);
                                                if (centroAGuardar.horario) {
                                                    objHorario.horario.push(centroAGuardar.horario);
                                                } else {
                                                    objHorario.horario.push(null);
                                                };
                                                if (centroAGuardar.servicios_fijos) {
                                                    objServiciosFijos.serviciosFijos.push(centroAGuardar.servicios_fijos);
                                                } else {
                                                    objServiciosFijos.serviciosFijos.push(null);
                                                };
                                                if (centroAGuardar.trabajadores) {
                                                    objTrabajadores.trabajadores.push(centroAGuardar.trabajadores);
                                                } else {
                                                    objTrabajadores.trabajadores.push(null);
                                                };
                                                cuadrante.cuadrante = centroAGuardar;
                                                cuadrante.guardado = true;
                                            };
                                        });
                                        centroDefinitivoAGuardar = {
                                            ...centroDefinitivoAGuardar,
                                            categoria: JSON.stringify(objCategorias),
                                            horario: JSON.stringify(objHorario),
                                            servicios_fijos: JSON.stringify(objServiciosFijos),
                                            trabajadores: JSON.stringify(objTrabajadores),
                                            observaciones: JSON.stringify(objObservaciones)
                                        };
                                        dispatch(actualizarCentroAccion('centros', centroDefinitivoAGuardar.id, centroDefinitivoAGuardar));
                                        dispatch(registrarIntervencionAccion(true));
                                        dispatch(activarDesactivarActualizarCentroAccion(true));
                                    };
                                });
                        };
                    };
                    procesarDatosEdicion();
                    break;
                default:
            }
        }
    }));

    const reseteaContenidoEdicion = (accion) => {
        if (accion === 'nuevo') {
            setEstamosCargandoDatos(true);
            forceUpdate();
            setValuesAutocompleteCentrosValores(null);
            setValuesFormEdicion({
                categoria: '',
                variacion: '',
                excepcion: '',
                observaciones: '',
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
                precioHora_FT: null,
                precioHora_C3: null,
                precioHora_C2: null,
                precioHora_C4: null,
                precioHora_ES: null,
                precioHora_PA: null,
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
                variacion_C4: '',
                variacion_ES: '',
                variacion_PA: '',
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
                diaVariacion_C4: '',
                diaVariacion_ES: '',
                diaVariacion_PA: '',
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
                activo_C4: 'si',
                activo_ES: 'si',
                activo_PA: 'si',
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
                int_C4: false,
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
                trab_C4: '',
                trab_ES: '',
                trab_PA: ''
            });
            setValuesFormEdicionGenerales({
                id: null,
                nombre: '',
                estado: 'alta',
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
                activoNumCuenta: false,
                gestionEspSF: false,
            });
            setNumeroCuadrantesEdicion([{ value: 1, cuadrante: null, guardado: false }]);
            setCuadranteEnUsoEdicion(1);
            setEsInicioCentrosEdicion(true);
        } else {
            setValuesFormEdicion({
                categoria: '',
                variacion: '',
                excepcion: '',
                observaciones: '',
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
                precioHora_FT: null,
                precioHora_C3: null,
                precioHora_C2: null,
                precioHora_C4: null,
                precioHora_ES: null,
                precioHora_PA: null,
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
                variacion_C4: '',
                variacion_ES: '',
                variacion_PA: '',
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
                diaVariacion_C4: '',
                diaVariacion_ES: '',
                diaVariacion_PA: '',
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
                activo_C4: 'si',
                activo_ES: 'si',
                activo_PA: 'si',
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
                int_C4: false,
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
                trab_C4: '',
                trab_ES: '',
                trab_PA: ''
            });
        };
        setValueTimePickerInicioEdicion([
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
        setValueTimePickerFinEdicion([
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
        setValueTimePickerInicioDescanso1Edicion([
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
        setValueTimePickerFinDescanso1Edicion([
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
        setValueTimePickerInicioDescanso2Edicion([
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
        setValueTimePickerFinDescanso2Edicion([
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
        setValueCantidadHorasEdicion([
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
        setValueTipoServicioEdicion([
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
        setHorarioIntervencionEdicion({
            tipo: '',
            variacion: '',
            excepcion: '',
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
        setTrabajadoresEdicion({
            cantidad: '',
            trabajadores: []
        });
        setStateSwitchTipoServicioFijoEdicion({
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
            C2: false,
            C4: false,
            ES: false,
            PA: false
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
                        className={classes.mb20}
                        size="small"
                    >
                        <InputLabel>{`Trabajador-` + index}</InputLabel>
                        <Select
                            id={`form-trabajador-` + index}
                            value={valuesFormEdicion.datosTrabajadores[index - 1] || ''}
                            onChange={handleChangeFormEdicionSelectsTrabajadores('trabajador', index - 1)}
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
                            value={valuesFormEdicion.datosSuplentes[index - 1] || ''}
                            onChange={handleChangeFormEdicionSelectsTrabajadores('suplente', index - 1)}
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
                            {horarioIntervencionEdicion.tipoRegistro === 'individual' ? (
                                <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                            ) : (
                                <Typography className={classes.heading}>Horario trabajadores</Typography>
                            )}
                        </AccordionSummary>
                        <Box m={2} >
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={disabledItem}
                                prDia={'Lunes'}
                                prIdInicio={'timePickerInicio-edicion-lunes-' + index}
                                prIdFin={'timePickerFin-edicion-lunes-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioEdicion[index].lunes}
                                prValueTimePickerFin={valueTimePickerFinEdicion[index].lunes}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-lunes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].lunesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={disabledItem}
                                prDia={'Martes'}
                                prIdInicio={'timePickerInicio-edicion-martes-' + index}
                                prIdFin={'timePickerFin-edicion-martes-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioEdicion[index].martes}
                                prValueTimePickerFin={valueTimePickerFinEdicion[index].martes}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-martes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].martesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={disabledItem}
                                prDia={'Miércoles'}
                                prIdInicio={'timePickerInicio-edicion-miercoles-' + index}
                                prIdFin={'timePickerFin-edicion-miercoles-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioEdicion[index].miercoles}
                                prValueTimePickerFin={valueTimePickerFinEdicion[index].miercoles}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-miercoles-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].miercolesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={disabledItem}
                                prDia={'Jueves'}
                                prIdInicio={'timePickerInicio-edicion-jueves-' + index}
                                prIdFin={'timePickerFin-edicion-jueves-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioEdicion[index].jueves}
                                prValueTimePickerFin={valueTimePickerFinEdicion[index].jueves}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-jueves-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].juevesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={disabledItem}
                                prDia={'Viernes'}
                                prIdInicio={'timePickerInicio-edicion-viernes-' + index}
                                prIdFin={'timePickerFin-edicion-viernes-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioEdicion[index].viernes}
                                prValueTimePickerFin={valueTimePickerFinEdicion[index].viernes}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-viernes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].viernesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={disabledItem}
                                prDia={'Sábado'}
                                prIdInicio={'timePickerInicio-edicion-sabado-' + index}
                                prIdFin={'timePickerFin-edicion-sabado-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioEdicion[index].sabado}
                                prValueTimePickerFin={valueTimePickerFinEdicion[index].sabado}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-sabado-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].sabadoTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rango'}
                                prDisabledItem={disabledItem}
                                prDia={'Domingo'}
                                prIdInicio={'timePickerInicio-edicion-domingo-' + index}
                                prIdFin={'timePickerFin-edicion-domingo-' + index}
                                prValueTimePickerInicio={valueTimePickerInicioEdicion[index].domingo}
                                prValueTimePickerFin={valueTimePickerFinEdicion[index].domingo}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-domingo-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].domingoTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
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
                            {horarioIntervencionEdicion.tipoRegistro === 'individual' ? (
                                <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                            ) : (
                                <Typography className={classes.heading}>Horario trabajadores</Typography>
                            )}
                        </AccordionSummary>
                        <Box m={2} >
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={disabledItem}
                                prDia={'Lunes'}
                                prIdCantidad={'selectCantidad-edicion-lunes-' + index}
                                prValueCantidadHoras={valueCantidadHorasEdicion[index].lunes}
                                prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-lunes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].lunesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={disabledItem}
                                prDia={'Martes'}
                                prIdCantidad={'selectCantidad-edicion-martes-' + index}
                                prValueCantidadHoras={valueCantidadHorasEdicion[index].martes}
                                prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-martes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].martesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={disabledItem}
                                prDia={'Miércoles'}
                                prIdCantidad={'selectCantidad-edicion-miercoles-' + index}
                                prValueCantidadHoras={valueCantidadHorasEdicion[index].miercoles}
                                prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-miercoles-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].miercolesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={disabledItem}
                                prDia={'Jueves'}
                                prIdCantidad={'selectCantidad-edicion-jueves-' + index}
                                prValueCantidadHoras={valueCantidadHorasEdicion[index].jueves}
                                prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-jueves-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].juevesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={disabledItem}
                                prDia={'Viernes'}
                                prIdCantidad={'selectCantidad-edicion-viernes-' + index}
                                prValueCantidadHoras={valueCantidadHorasEdicion[index].viernes}
                                prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-viernes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].viernesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}

                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={disabledItem}
                                prDia={'Sábado'}
                                prIdCantidad={'selectCantidad-edicion-sabado-' + index}
                                prValueCantidadHoras={valueCantidadHorasEdicion[index].sabado}
                                prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-sabado-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].sabadoTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'cantidad'}
                                prDisabledItem={disabledItem}
                                prDia={'Domingo'}
                                prIdCantidad={'selectCantidad-edicion-domingo-' + index}
                                prValueCantidadHoras={valueCantidadHorasEdicion[index].domingo}
                                prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-domingo-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].domingoTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
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
                            {horarioIntervencionEdicion.tipoRegistro === 'individual' ? (
                                <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                            ) : (
                                <Typography className={classes.heading}>Horario trabajadores</Typography>
                            )}
                        </AccordionSummary>
                        <Box m={2} >
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={disabledItem}
                                prDia={'Lun.'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-lunes-' + index}
                                prIdFin1={'timePickerFin1Descanso-edicion-lunes-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-lunes-' + index}
                                prIdFin2={'timePickerFin2Descanso-edicion-lunes-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion[index].lunes}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion[index].lunes}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion[index].lunes}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion[index].lunes}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-lunes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].lunesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={disabledItem}
                                prDia={'Mar.'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-martes-' + index}
                                prIdFin1={'timePickerFin1Descanso-edicion-martes-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-martes-' + index}
                                prIdFin2={'timePickerFin2Descanso-edicion-martes-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion[index].martes}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion[index].martes}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion[index].martes}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion[index].martes}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-martes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].martesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={disabledItem}
                                prDia={'Mié.'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-miercoles-' + index}
                                prIdFin1={'timePickerFin1Descanso-edicion-miercoles-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-miercoles-' + index}
                                prIdFin2={'timePickerFin2Descanso-edicion-miercoles-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion[index].miercoles}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion[index].miercoles}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion[index].miercoles}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion[index].miercoles}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-miercoles-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].miercolesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={disabledItem}
                                prDia={'Jue.'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-jueves-' + index}
                                prIdFin1={'timePickerFin1Descanso-edicion-jueves-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-jueves-' + index}
                                prIdFin2={'timePickerFin2Descanso-edicion-jueves-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion[index].jueves}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion[index].jueves}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion[index].jueves}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion[index].jueves}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-jueves-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].juevesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={disabledItem}
                                prDia={'Vie.'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-viernes-' + index}
                                prIdFin1={'timePickerFin1Descanso-edicion-viernes-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-viernes-' + index}
                                prIdFin2={'timePickerFin2Descanso-edicion-viernes-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion[index].viernes}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion[index].viernes}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion[index].viernes}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion[index].viernes}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-viernes-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].viernesTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={disabledItem}
                                prDia={'Sáb.'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-sabado-' + index}
                                prIdFin1={'timePickerFin1Descanso-edicion-sabado-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-sabado-' + index}
                                prIdFin2={'timePickerFin2Descanso-edicion-sabado-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion[index].sabado}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion[index].sabado}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion[index].sabado}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion[index].sabado}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-sabado-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].sabadoTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                            <ItemListTime
                                prTipo={'rangoDescanso'}
                                prDisabledItem={disabledItem}
                                prDia={'Dom.'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-domingo-' + index}
                                prIdFin1={'timePickerFin1Descanso-edicion-domingo-' + index}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-domingo-' + index}
                                prIdFin2={'timePickerFin2Descanso-edicion-domingo-' + index}
                                prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion[index].domingo}
                                prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion[index].domingo}
                                prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion[index].domingo}
                                prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion[index].domingo}
                                prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                prIdTipoServicio={'selectTipoServicio-edicion-domingo-' + index}
                                prValueTipoServicio={valueTipoServicioEdicion[index].domingoTipoServicio}
                                prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                            />
                        </Box>
                    </Accordion>
                </Box>
            )
        };
    };

    const retornaTipoServicioFijoEdicion = (tipo, index) => {
        let checkeado, laLabelSw, laLabelIn, elId, elValue, laLabelWi, elPrecioHora, laClase, elValueVariaciones, laVariacion, elValueDia, elDia, elValueActivo, elActivo, desactivadoDia, elValueInt, elInt, elValueTrab, elTrab;
        switch (tipo.value) {
            case 'TOL':
                checkeado = stateSwitchTipoServicioFijoEdicion.TO;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE TOLDOS';
                laLabelIn = 'TOL';
                elId = 'form-precio-hora_TO-edicion';
                elValue = valuesFormEdicion.precioHora_TO || '';
                elValueVariaciones = valuesFormEdicion.variacion_TO || '';
                elValueDia = valuesFormEdicion.diaVariacion_TO || '';
                elValueActivo = valuesFormEdicion.activo_TO || '';
                elValueInt = valuesFormEdicion.int_TO || false;
                elValueTrab = valuesFormEdicion.trab_TO || '';
                laLabelWi = 30;
                elPrecioHora = 'precioHora_TO';
                laVariacion = 'variacion_TO';
                elDia = 'diaVariacion_TO';
                elActivo = 'activo_TO';
                elInt = 'int_TO';
                elTrab = 'trab_TO';
                laClase =
                    (valuesFormEdicion.activo_TO === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_TO && valuesFormEdicion.variacion_TO) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_TO === 3 ? true : false;
                break;
            case 'CRIS':
                checkeado = stateSwitchTipoServicioFijoEdicion.CR;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE CRISTALES';
                laLabelIn = 'CRIS';
                elId = 'form-precio-hora_CR-edicion';
                elValue = valuesFormEdicion.precioHora_CR || '';
                elValueVariaciones = valuesFormEdicion.variacion_CR || '';
                elValueDia = valuesFormEdicion.diaVariacion_CR || '';
                elValueActivo = valuesFormEdicion.activo_CR || '';
                elValueInt = valuesFormEdicion.int_CR || false;
                elValueTrab = valuesFormEdicion.trab_CR || '';
                laLabelWi = 40;
                elPrecioHora = 'precioHora_CR';
                laVariacion = 'variacion_CR';
                elDia = 'diaVariacion_CR';
                elActivo = 'activo_CR';
                elInt = 'int_CR';
                elTrab = 'trab_CR';
                laClase =
                    (valuesFormEdicion.activo_CR === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_CR && valuesFormEdicion.variacion_CR) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_CR === 3 ? true : false;
                break;
            case 'CRISE':
                checkeado = stateSwitchTipoServicioFijoEdicion.CE;
                laLabelSw = 'LIMPIEZA CRISTALES EXTERIORES';
                laLabelIn = 'CRISE';
                elId = 'form-precio-hora_CE-edicion';
                elValue = valuesFormEdicion.precioHora_CE || '';
                elValueVariaciones = valuesFormEdicion.variacion_CE || '';
                elValueDia = valuesFormEdicion.diaVariacion_CE || '';
                elValueActivo = valuesFormEdicion.activo_CE || '';
                elValueInt = valuesFormEdicion.int_CE || false;
                elValueTrab = valuesFormEdicion.trab_CE || '';
                laLabelWi = 50;
                elPrecioHora = 'precioHora_CE';
                laVariacion = 'variacion_CE';
                elDia = 'diaVariacion_CE';
                elActivo = 'activo_CE';
                elInt = 'int_CE';
                elTrab = 'trab_CE';
                laClase =
                    (valuesFormEdicion.activo_CE === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_CE && valuesFormEdicion.variacion_CE) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_CE === 3 ? true : false;
                break;
            case 'CRISI':
                checkeado = stateSwitchTipoServicioFijoEdicion.CI;
                laLabelSw = 'LIMPIEZA CRISTALES INTERIORES';
                laLabelIn = 'CRISI';
                elId = 'form-precio-hora_CI-edicion';
                elValue = valuesFormEdicion.precioHora_CI || '';
                elValueVariaciones = valuesFormEdicion.variacion_CI || '';
                elValueDia = valuesFormEdicion.diaVariacion_CI || '';
                elValueActivo = valuesFormEdicion.activo_CI || '';
                elValueInt = valuesFormEdicion.int_CI || false;
                elValueTrab = valuesFormEdicion.trab_CI || '';
                laLabelWi = 45;
                elPrecioHora = 'precioHora_CI';
                laVariacion = 'variacion_CI';
                elDia = 'diaVariacion_CI';
                elActivo = 'activo_CI';
                elInt = 'int_CI';
                elTrab = 'trab_CI';
                laClase =
                    (valuesFormEdicion.activo_CI === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_CI && valuesFormEdicion.variacion_CI) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_CI === 3 ? true : false;
                break;
            case 'MOQ':
                checkeado = stateSwitchTipoServicioFijoEdicion.MO;
                laLabelSw = 'SERVICIO DE LIMPIEZA MOQUETA';
                laLabelIn = 'MOQ';
                elId = 'form-precio-hora_MO-edicion';
                elValue = valuesFormEdicion.precioHora_MO || '';
                elValueVariaciones = valuesFormEdicion.variacion_MO || '';
                elValueDia = valuesFormEdicion.diaVariacion_MO || '';
                elValueActivo = valuesFormEdicion.activo_MO || '';
                elValueInt = valuesFormEdicion.int_MO || false;
                elValueTrab = valuesFormEdicion.trab_MO || '';
                laLabelWi = 35;
                elPrecioHora = 'precioHora_MO';
                laVariacion = 'variacion_MO';
                elDia = 'diaVariacion_MO';
                elActivo = 'activo_MO';
                elInt = 'int_MO';
                elTrab = 'trab_MO';
                laClase =
                    (valuesFormEdicion.activo_MO === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_MO && valuesFormEdicion.variacion_MO) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_MO === 3 ? true : false;
                break;
            case 'OF':
                checkeado = stateSwitchTipoServicioFijoEdicion.OF;
                laLabelSw = 'SERVICIO DE LIMPIEZA OFICINAS';
                laLabelIn = 'OF';
                elId = 'form-precio-hora_OF-edicion';
                elValue = valuesFormEdicion.precioHora_OF || '';
                elValueVariaciones = valuesFormEdicion.variacion_OF || '';
                elValueDia = valuesFormEdicion.diaVariacion_OF || '';
                elValueActivo = valuesFormEdicion.activo_OF || '';
                elValueInt = valuesFormEdicion.int_OF || false;
                elValueTrab = valuesFormEdicion.trab_OF || '';
                laLabelWi = 20;
                elPrecioHora = 'precioHora_OF';
                laVariacion = 'variacion_OF';
                elDia = 'diaVariacion_OF';
                elActivo = 'activo_OF';
                elInt = 'int_OF';
                elTrab = 'trab_OF';
                laClase =
                    (valuesFormEdicion.activo_OF === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_OF && valuesFormEdicion.variacion_OF) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_OF === 3 ? true : false;
                break;
            case 'ALMC':
                checkeado = stateSwitchTipoServicioFijoEdicion.AL;
                laLabelSw = 'SERVICIO DE LIMPIEZA ALMACENES';
                laLabelIn = 'ALMC';
                elId = 'form-precio-hora_AL-edicion';
                elValue = valuesFormEdicion.precioHora_AL || '';
                elValueVariaciones = valuesFormEdicion.variacion_AL || '';
                elValueDia = valuesFormEdicion.diaVariacion_AL || '';
                elValueActivo = valuesFormEdicion.activo_AL || '';
                elValueInt = valuesFormEdicion.int_AL || false;
                elValueTrab = valuesFormEdicion.trab_AL || '';
                laLabelWi = 45;
                elPrecioHora = 'precioHora_AL';
                laVariacion = 'variacion_AL';
                elDia = 'diaVariacion_AL';
                elActivo = 'activo_AL';
                elInt = 'int_AL';
                elTrab = 'trab_AL';
                laClase =
                    (valuesFormEdicion.activo_AL === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_AL && valuesFormEdicion.variacion_AL) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_AL === 3 ? true : false;
                break;
            case 'LAB':
                checkeado = stateSwitchTipoServicioFijoEdicion.LA;
                laLabelSw = 'SERVICIO DE LIMPIEZA LABORATORIO';
                laLabelIn = 'LAB';
                elId = 'form-precio-hora_LA-edicion';
                elValue = valuesFormEdicion.precioHora_LA || '';
                elValueVariaciones = valuesFormEdicion.variacion_LA || '';
                elValueDia = valuesFormEdicion.diaVariacion_LA || '';
                elValueActivo = valuesFormEdicion.activo_LA || '';
                elValueInt = valuesFormEdicion.int_LA || false;
                elValueTrab = valuesFormEdicion.trab_LA || '';
                laLabelWi = 30;
                elPrecioHora = 'precioHora_LA';
                laVariacion = 'variacion_LA';
                elDia = 'diaVariacion_LA';
                elActivo = 'activo_LA';
                elInt = 'int_LA';
                elTrab = 'trab_LA';
                laClase =
                    (valuesFormEdicion.activo_LA === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_LA && valuesFormEdicion.variacion_LA) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_LA === 3 ? true : false;
                break;
            case 'TELÑ':
                checkeado = stateSwitchTipoServicioFijoEdicion.TE;
                laLabelSw = 'SERVICIO DE LIMPIEZA TELARAÑAS';
                laLabelIn = 'TELÑ';
                elId = 'form-precio-hora_TE-edicion';
                elValue = valuesFormEdicion.precioHora_TE || '';
                elValueVariaciones = valuesFormEdicion.variacion_TE || '';
                elValueDia = valuesFormEdicion.diaVariacion_TE || '';
                elValueActivo = valuesFormEdicion.activo_TE || '';
                elValueInt = valuesFormEdicion.int_TE || false;
                elValueTrab = valuesFormEdicion.trab_TE || '';
                laLabelWi = 40;
                elPrecioHora = 'precioHora_TE';
                laVariacion = 'variacion_TE';
                elDia = 'diaVariacion_TE';
                elActivo = 'activo_TE';
                elInt = 'int_TE';
                elTrab = 'trab_TE';
                laClase =
                    (valuesFormEdicion.activo_TE === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_TE && valuesFormEdicion.variacion_TE) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_TE === 3 ? true : false;
                break;
            case 'FCH.IN':
                checkeado = stateSwitchTipoServicioFijoEdicion.FI;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA INTERIOR';
                laLabelIn = 'FCH.IN';
                elId = 'form-precio-hora_FI-edicion';
                elValue = valuesFormEdicion.precioHora_FI || '';
                elValueVariaciones = valuesFormEdicion.variacion_FI || '';
                elValueDia = valuesFormEdicion.diaVariacion_FI || '';
                elValueActivo = valuesFormEdicion.activo_FI || '';
                elValueInt = valuesFormEdicion.int_FI || false;
                elValueTrab = valuesFormEdicion.trab_FI || '';
                laLabelWi = 60;
                elPrecioHora = 'precioHora_FI';
                laVariacion = 'variacion_FI';
                elDia = 'diaVariacion_FI';
                elActivo = 'activo_FI';
                elInt = 'int_FI';
                elTrab = 'trab_FI';
                laClase =
                    (valuesFormEdicion.activo_FI === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_FI && valuesFormEdicion.variacion_FI) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_FI === 3 ? true : false;
                break;
            case 'FCH.EX':
                checkeado = stateSwitchTipoServicioFijoEdicion.FE;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA EXTERIOR';
                laLabelIn = 'FCH.EX';
                elId = 'form-precio-hora_FE-edicion';
                elValue = valuesFormEdicion.precioHora_FE || '';
                elValueVariaciones = valuesFormEdicion.variacion_FE || '';
                elValueDia = valuesFormEdicion.diaVariacion_FE || '';
                elValueActivo = valuesFormEdicion.activo_FE || '';
                elValueInt = valuesFormEdicion.int_FE || false;
                elValueTrab = valuesFormEdicion.trab_FE || '';
                laLabelWi = 60;
                elPrecioHora = 'precioHora_FE';
                laVariacion = 'variacion_FE';
                elDia = 'diaVariacion_FE';
                elActivo = 'activo_FE';
                elInt = 'int_FE';
                elTrab = 'trab_FE';
                laClase =
                    (valuesFormEdicion.activo_FE === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_FE && valuesFormEdicion.variacion_FE) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_FE === 3 ? true : false;
                break;
            case 'ABRLL':
                checkeado = stateSwitchTipoServicioFijoEdicion.AB;
                laLabelSw = 'SERVICIO DE LIMPIEZA ABRILLANTADO';
                laLabelIn = 'ABRLL';
                elId = 'form-precio-hora_AB-edicion';
                elValue = valuesFormEdicion.precioHora_AB || '';
                elValueVariaciones = valuesFormEdicion.variacion_AB || '';
                elValueDia = valuesFormEdicion.diaVariacion_AB || '';
                elValueActivo = valuesFormEdicion.activo_AB || '';
                elValueInt = valuesFormEdicion.int_AB || false;
                elValueTrab = valuesFormEdicion.trab_AB || '';
                laLabelWi = 50;
                elPrecioHora = 'precioHora_AB';
                laVariacion = 'variacion_AB';
                elDia = 'diaVariacion_AB';
                elActivo = 'activo_AB';
                elInt = 'int_AB';
                elTrab = 'trab_AB';
                laClase =
                    (valuesFormEdicion.activo_AB === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_AB && valuesFormEdicion.variacion_AB) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_AB === 3 ? true : false;
                break;
            case 'MANT':
                checkeado = stateSwitchTipoServicioFijoEdicion.MA;
                laLabelSw = 'SERVICIO DE MANTENIMIENTO MÁQUINA';
                laLabelIn = 'MANT';
                elId = 'form-precio-hora_MA-edicion';
                elValue = valuesFormEdicion.precioHora_MA || '';
                elValueVariaciones = valuesFormEdicion.variacion_MA || '';
                elValueDia = valuesFormEdicion.diaVariacion_MA || '';
                elValueActivo = valuesFormEdicion.activo_MA || '';
                elValueInt = valuesFormEdicion.int_MA || false;
                elValueTrab = valuesFormEdicion.trab_MA || '';
                laLabelWi = 45;
                elPrecioHora = 'precioHora_MA';
                laVariacion = 'variacion_MA';
                elDia = 'diaVariacion_MA';
                elActivo = 'activo_MA';
                elInt = 'int_MA';
                elTrab = 'trab_MA';
                laClase =
                    (valuesFormEdicion.activo_MA === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_MA && valuesFormEdicion.variacion_MA) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_MA === 3 ? true : false;
                break;
            case 'PORT':
                checkeado = stateSwitchTipoServicioFijoEdicion.PO;
                laLabelSw = 'SERVICIO DE LIMPIEZA PORTERÍA';
                laLabelIn = 'PORT';
                elId = 'form-precio-hora_PO-edicion';
                elValue = valuesFormEdicion.precioHora_PO || '';
                elValueVariaciones = valuesFormEdicion.variacion_PO || '';
                elValueDia = valuesFormEdicion.diaVariacion_PO || '';
                elValueActivo = valuesFormEdicion.activo_PO || '';
                elValueInt = valuesFormEdicion.int_PO || false;
                elValueTrab = valuesFormEdicion.trab_PO || '';
                laLabelWi = 40;
                elPrecioHora = 'precioHora_PO';
                laVariacion = 'variacion_PO';
                elDia = 'diaVariacion_PO';
                elActivo = 'activo_PO';
                elInt = 'int_PO';
                elTrab = 'trab_PO';
                laClase =
                    (valuesFormEdicion.activo_PO === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_PO && valuesFormEdicion.variacion_PO) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_PO === 3 ? true : false;
                break;
            case 'BACT':
                checkeado = stateSwitchTipoServicioFijoEdicion.BA;
                laLabelSw = 'BOT. NOUBACT';
                laLabelIn = 'BACT';
                elId = 'form-precio-hora_BA-edicion';
                elValue = valuesFormEdicion.precioHora_BA || '';
                elValueVariaciones = valuesFormEdicion.variacion_BA || '';
                elValueDia = valuesFormEdicion.diaVariacion_BA || '';
                elValueActivo = valuesFormEdicion.activo_BA || '';
                elValueInt = valuesFormEdicion.int_BA || false;
                elValueTrab = valuesFormEdicion.trab_BA || '';
                laLabelWi = 40;
                elPrecioHora = 'precioHora_BA';
                laVariacion = 'variacion_BA';
                elDia = 'diaVariacion_BA';
                elActivo = 'activo_BA';
                elInt = 'int_BA';
                elTrab = 'trab_BA';
                laClase =
                    (valuesFormEdicion.activo_BA === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_BA && valuesFormEdicion.variacion_BA) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_BA === 3 ? true : false;
                break;
            case 'FEST':
                checkeado = stateSwitchTipoServicioFijoEdicion.FT;
                laLabelSw = 'SERVICIO DE LIMPIEZA DÍA FESTIVO';
                laLabelIn = 'FEST';
                elId = 'form-precio-hora_FT-edicion';
                elValue = valuesFormEdicion.precioHora_FT || '';
                elValueVariaciones = valuesFormEdicion.variacion_FT || '';
                elValueDia = valuesFormEdicion.diaVariacion_FT || '';
                elValueActivo = valuesFormEdicion.activo_FT || '';
                elValueInt = valuesFormEdicion.int_FT || false;
                elValueTrab = valuesFormEdicion.trab_FT || '';
                laLabelWi = 40;
                elPrecioHora = 'precioHora_FT';
                laVariacion = 'variacion_FT';
                elDia = 'diaVariacion_FT';
                elActivo = 'activo_FT';
                elInt = 'int_FT';
                elTrab = 'trab_FT';
                laClase =
                    (valuesFormEdicion.activo_FT === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_FT && valuesFormEdicion.variacion_FT) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_FT === 3 ? true : false;
                break;
            case 'CRTRIM':
                checkeado = stateSwitchTipoServicioFijoEdicion.C3;
                laLabelSw = 'LIMPIEZA DE CRISTALES TRIMESTRAL';
                laLabelIn = 'CRTRIM';
                elId = 'form-precio-hora_C3-edicion';
                elValue = valuesFormEdicion.precioHora_C3 || '';
                elValueVariaciones = valuesFormEdicion.variacion_C3 || '';
                elValueDia = valuesFormEdicion.diaVariacion_C3 || '';
                elValueActivo = valuesFormEdicion.activo_C3 || '';
                elValueInt = valuesFormEdicion.int_C3 || false;
                elValueTrab = valuesFormEdicion.trab_C3 || '';
                laLabelWi = 60;
                elPrecioHora = 'precioHora_C3';
                laVariacion = 'variacion_C3';
                elDia = 'diaVariacion_C3';
                elActivo = 'activo_C3';
                elInt = 'int_C3';
                elTrab = 'trab_C3';
                laClase =
                    (valuesFormEdicion.activo_C3 === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_C3 && valuesFormEdicion.variacion_C3) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_C3 === 3 ? true : false;
                break;
            case 'CRBIM':
                checkeado = stateSwitchTipoServicioFijoEdicion.C2;
                laLabelSw = 'LIMPIEZA DE CRISTALES BIMENSUAL';
                laLabelIn = 'CRBIM';
                elId = 'form-precio-hora_C2-edicion';
                elValue = valuesFormEdicion.precioHora_C2 || '';
                elValueVariaciones = valuesFormEdicion.variacion_C2 || '';
                elValueDia = valuesFormEdicion.diaVariacion_C2 || '';
                elValueActivo = valuesFormEdicion.activo_C2 || '';
                elValueInt = valuesFormEdicion.int_C2 || false;
                elValueTrab = valuesFormEdicion.trab_C2 || '';
                laLabelWi = 60;
                elPrecioHora = 'precioHora_C2';
                laVariacion = 'variacion_C2';
                elDia = 'diaVariacion_C2';
                elActivo = 'activo_C2';
                elInt = 'int_C2';
                elTrab = 'trab_C2';
                laClase =
                    (valuesFormEdicion.activo_C2 === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_C2 && valuesFormEdicion.variacion_C2) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_C2 === 3 ? true : false;
                break;
            case 'CRCUA':
                checkeado = stateSwitchTipoServicioFijoEdicion.C4;
                laLabelSw = 'LIMPIEZA DE CRISTALES CUATRIMESTRAL';
                laLabelIn = 'CRCUA';
                elId = 'form-precio-hora_C4-edicion';
                elValue = valuesFormEdicion.precioHora_C4 || '';
                elValueVariaciones = valuesFormEdicion.variacion_C4 || '';
                elValueDia = valuesFormEdicion.diaVariacion_C4 || '';
                elValueActivo = valuesFormEdicion.activo_C4 || '';
                elValueInt = valuesFormEdicion.int_C4 || false;
                elValueTrab = valuesFormEdicion.trab_C4 || '';
                laLabelWi = 60;
                elPrecioHora = 'precioHora_C4';
                laVariacion = 'variacion_C4';
                elDia = 'diaVariacion_C4';
                elActivo = 'activo_C4';
                elInt = 'int_C4';
                elTrab = 'trab_C4';
                laClase =
                    (valuesFormEdicion.activo_C4 === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_C4 && valuesFormEdicion.variacion_C4) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_C4 === 3 ? true : false;
                break;
            case 'LIME':
                checkeado = stateSwitchTipoServicioFijoEdicion.ES;
                laLabelSw = 'SERVICIO DE LIMPIEZA ESPECIAL';
                laLabelIn = 'LIME';
                elId = 'form-precio-hora_ES-edicion';
                elValue = valuesFormEdicion.precioHora_ES || '';
                elValueVariaciones = valuesFormEdicion.variacion_ES || '';
                elValueDia = valuesFormEdicion.diaVariacion_ES || '';
                elValueActivo = valuesFormEdicion.activo_ES || '';
                elValueInt = valuesFormEdicion.int_ES || false;
                elValueTrab = valuesFormEdicion.trab_ES || '';
                laLabelWi = 40;
                elPrecioHora = 'precioHora_ES';
                laVariacion = 'variacion_ES';
                elDia = 'diaVariacion_ES';
                elActivo = 'activo_ES';
                elInt = 'int_ES';
                elTrab = 'trab_ES';
                laClase =
                    (valuesFormEdicion.activo_ES === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_ES && valuesFormEdicion.variacion_ES) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_ES === 3 ? true : false;
                break;
            case 'LIMP':
                checkeado = stateSwitchTipoServicioFijoEdicion.PA;
                laLabelSw = 'SERVICIO DE LIMPIEZA DEL PARKING';
                laLabelIn = 'LIMP';
                elId = 'form-precio-hora_PA-edicion';
                elValue = valuesFormEdicion.precioHora_PA || '';
                elValueVariaciones = valuesFormEdicion.variacion_PA || '';
                elValueDia = valuesFormEdicion.diaVariacion_PA || '';
                elValueActivo = valuesFormEdicion.activo_PA || '';
                elValueInt = valuesFormEdicion.int_PA || false;
                elValueTrab = valuesFormEdicion.trab_PA || '';
                laLabelWi = 40;
                elPrecioHora = 'precioHora_PA';
                laVariacion = 'variacion_PA';
                elDia = 'diaVariacion_PA';
                elActivo = 'activo_PA';
                elInt = 'int_PA';
                elTrab = 'trab_PA';
                laClase =
                    (valuesFormEdicion.activo_PA === 'no') ?
                        classes.fondoInactivoServicioFijo :
                        (valuesFormEdicion.precioHora_PA && valuesFormEdicion.variacion_PA) ?
                            classes.fondoGrisClaro : classes.paper;
                desactivadoDia = valuesFormEdicion.variacion_PA === 3 ? true : false;
                break;
            default:
        };
        return (
            <Grid
                container
                direction="row"
                alignItems="center"
                spacing={1}
                className={laClase}
                style={{ height: 110, paddingTop: 5, paddingBottom: 10, paddingRight: 10, paddingLeft: 10, marginBottom: 15 }}
                key={'formServicio' + index}
            >
                <Grid item xs={5}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checkeado}
                                name={elId}
                                color="secondary"
                                onChange={handleChangeSwitchTipoServicioFijoEdicion}
                                disabled={disabledItem}
                            />
                        }
                        label={<Typography variant="body2">{laLabelSw}</Typography>}
                        labelPlacement="end"
                        style={{ marginTop: 5 }}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        style={{ marginBottom: -10, marginTop: -10 }}
                    >
                        <RadioGroup
                            row
                            value={elValueActivo}
                            onChange={handleChangeFormEdicion(elActivo)}
                            className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                            style={{ marginRight: 15 }}
                        >
                            <FormControlLabel
                                value="si"
                                control={
                                    <Radio
                                        size='small'
                                    />
                                }
                                label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>ACTIVO</Typography>}
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="no"
                                control={
                                    <Radio
                                        size='small'
                                    />
                                }
                                label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>INACTIVO</Typography>}
                                labelPlacement="end"
                            />
                        </RadioGroup>
                        <FormControlLabel
                            className={!checkeado ? classes.displayNone : null}
                            control={
                                <Checkbox
                                    size='small'
                                    icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />}
                                    checked={elValueInt}
                                    onChange={handleChangeFormEdicion(elInt)}
                                    name="checkedComputa-edicion"
                                    color="secondary"
                                />
                            }
                            label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>INTEGRADO EN CÓMPUTO</Typography>}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={6}>
                            <FormControl
                                variant="outlined"
                                className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                                size="small"
                                style={{ marginTop: 5 }}
                                disabled={elValueInt}
                            >
                                <InputLabel>{laLabelIn}</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id={elId}
                                    value={elValue}
                                    onChange={handleChangeFormEdicion(elPrecioHora)}
                                    labelWidth={laLabelWi}
                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl
                                variant="outlined"
                                className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                                size="small"
                                style={{ marginRight: 10, marginTop: 5 }}
                            >
                                <InputLabel>Trabajador</InputLabel>
                                <Select
                                    fullWidth
                                    id="form-trabajadorSF-edicion"
                                    label="Trabajador"
                                    value={elValueTrab}
                                    onChange={handleChangeFormEdicion(elTrab)}
                                    helpertext="Selecciona trabajador"
                                >
                                    <MenuItem value=''>
                                        <em>Sin trabajador</em>
                                    </MenuItem>
                                    {
                                        arrayTrabajadoresSubcategoria.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    };

    const handleAnadirCuadranteCentroEdicion = () => {
        procesarDatosEdicionPromesa()
            .then(values => {
                if (values.resuelto) {
                    //registramos
                    const centroAGuardar = {
                        categoria: valuesFormEdicion.categoria,
                        observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                        horario: values.horario ? (values.horario) : null,
                        servicios_fijos: values.servicios ? (values.servicios) : null,
                        trabajadores: values.trabajadores ? (values.trabajadores) : null
                    };
                    let arrayCuadrantes = [...numeroCuadrantesEdicion];
                    arrayCuadrantes.forEach((cuadrante, index) => {
                        if (cuadrante.value === cuadranteEnUsoEdicion) {
                            cuadrante.cuadrante = centroAGuardar;
                            cuadrante.guardado = true;
                        }
                    });
                    arrayCuadrantes.push({ value: numeroCuadrantesEdicion.length + 1, cuadrante: null, guardado: false });
                    setNumeroCuadrantesEdicion(arrayCuadrantes);
                    setCuadranteEnUsoEdicion(numeroCuadrantesEdicion.length + 1);
                    reseteaContenidoEdicion('anadir');
                    dispatch(registrarIntervencionAccion(false));
                    dispatch(activarDesactivarActualizarCentroAccion(false));
                }
            });
    };

    const handleEliminarCuadranteCentroEdicion = () => {
        let arrayCuadrantes = [...numeroCuadrantesEdicion];
        const posicionCuadrante = arrayCuadrantes.indexOf(arrayCuadrantes.find(cuadrante => cuadrante.value === cuadranteEnUsoEdicion));
        arrayCuadrantes.splice(posicionCuadrante, 1);
        for (let i = 0; i < arrayCuadrantes.length; i++) {
            arrayCuadrantes[i]['value'] = i + 1;
        };
        setNumeroCuadrantesEdicion(arrayCuadrantes);
        setCuadranteEnUsoEdicion(1);
        reseteaContenidoEdicion('anadir');
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
        setEsInicioCentrosEdicion(true);
        setAlert({
            mensaje: "Cuadrante eliminado exitosamente.",
            tipo: 'success'
        })
        setOpenSnack(true);
    };

    const handleChangeCuadranteCentroEdicion = (e) => {
        procesarDatosEdicionPromesa()
            .then(values => {
                if (values.resuelto) {
                    //registramos
                    const centroAGuardar = {
                        categoria: valuesFormEdicion.categoria,
                        observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                        horario: values.horario ? (values.horario) : null,
                        servicios_fijos: values.servicios ? (values.servicios) : null,
                        trabajadores: values.trabajadores ? (values.trabajadores) : null
                    };
                    let arrayCuadrantes = [...numeroCuadrantesEdicion];
                    arrayCuadrantes.forEach((cuadrante, index) => {
                        if (cuadrante.value === cuadranteEnUsoEdicion) {
                            cuadrante.cuadrante = centroAGuardar;
                            cuadrante.guardado = true;
                        }
                    });
                    setNumeroCuadrantesEdicion(arrayCuadrantes);
                    setCuadranteEnUsoEdicion(e.target.value);
                    reseteaContenidoEdicion('anadir');
                    gestionaContenidoCuadranteEdicion(e.target.value);
                }
            });
    };

    const gestionaContenidoCuadranteEdicion = (elCuadrante) => {
        let cuadranteAGestionarCompleto = numeroCuadrantesEdicion.find(cuadrante => cuadrante.value === elCuadrante);
        let cuadranteAGestionar = cuadranteAGestionarCompleto.cuadrante;
        const arrayTr = [];
        const arraySu = [];
        if (cuadranteAGestionar.trabajadores) {
            if (cuadranteAGestionar.trabajadores.trabajadores.length > 0) {
                cuadranteAGestionar.trabajadores.trabajadores.forEach((trabajadorIterado, index) => {
                    arrayTr.push(trabajadorIterado['trabajador_' + (index + 1)]);
                    arraySu.push(trabajadorIterado['suplente_' + (index + 1)]);
                });
                setTrabajadoresEdicion({
                    ...trabajadoresEdicion,
                    cantidad: cuadranteAGestionar.trabajadores.cantidad,
                    trabajadores: cuadranteAGestionar.trabajadores.trabajadores
                });
            } else {
                setTrabajadoresEdicion({
                    cantidad: '',
                    trabajadores: []
                });
            };
        };
        if (cuadranteAGestionar.horario) {
            if (cuadranteAGestionar.horario.tipoRegistro === 'individual') {
                setStateSwitchTipoRegistro(true);
            } else {
                setStateSwitchTipoRegistro(false);
            }
        };
        if (cuadranteAGestionar.estado === 'baja') {
            setStateSwitchEstadoEdicion(true);
        };
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
            precioHora_FT: null,
            precioHora_C3: null,
            precioHora_C2: null,
            precioHora_C4: null,
            precioHora_ES: null,
            precioHora_PA: null,
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
            variacion_C4: '',
            variacion_ES: '',
            variacion_PA: '',
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
            diaVariacion_C4: '',
            diaVariacion_ES: '',
            diaVariacion_PA: '',
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
            activo_C4: 'si',
            activo_ES: 'si',
            activo_PA: 'si',
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
            int_C4: false,
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
            trab_C4: '',
            trab_ES: '',
            trab_PA: ''
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
            FT: false,
            C3: false,
            C2: false,
            C4: false,
            ES: false,
            PA: false
        };
        if (cuadranteAGestionar.servicios_fijos) {
            cuadranteAGestionar.servicios_fijos.servicio.forEach((servicio) => {
                if (servicio.precioHora_TO || servicio.int_TO) {
                    myObjetoServiciosFijos.precioHora_TO = servicio.precioHora_TO;
                    myObjetoServiciosFijos.variacion_TO = servicio.variacion_TO;
                    myObjetoServiciosFijos.diaVariacion_TO = servicio.diaVariacion_TO;
                    myObjetoServiciosFijos.activo_TO = servicio.activo_TO;
                    myObjetoServiciosFijos.int_TO = servicio.int_TO;
                    myObjetoServiciosFijos.trab_TO = servicio.trab_TO;
                    objetoEstadosSwitch.TO = true;
                };
                if (servicio.precioHora_CR || servicio.int_CR) {
                    myObjetoServiciosFijos.precioHora_CR = servicio.precioHora_CR;
                    myObjetoServiciosFijos.variacion_CR = servicio.variacion_CR;
                    myObjetoServiciosFijos.diaVariacion_CR = servicio.diaVariacion_CR;
                    myObjetoServiciosFijos.activo_CR = servicio.activo_CR;
                    myObjetoServiciosFijos.int_CR = servicio.int_CR;
                    myObjetoServiciosFijos.trab_CR = servicio.trab_CR;
                    objetoEstadosSwitch.CR = true;
                };
                if (servicio.precioHora_CE || servicio.int_CE) {
                    myObjetoServiciosFijos.precioHora_CE = servicio.precioHora_CE;
                    myObjetoServiciosFijos.variacion_CE = servicio.variacion_CE;
                    myObjetoServiciosFijos.diaVariacion_CE = servicio.diaVariacion_CE;
                    myObjetoServiciosFijos.activo_CE = servicio.activo_CE;
                    myObjetoServiciosFijos.int_CE = servicio.int_CE;
                    myObjetoServiciosFijos.trab_CE = servicio.trab_CE;
                    objetoEstadosSwitch.CE = true;
                };
                if (servicio.precioHora_CI || servicio.int_CI) {
                    myObjetoServiciosFijos.precioHora_CI = servicio.precioHora_CI;
                    myObjetoServiciosFijos.variacion_CI = servicio.variacion_CI;
                    myObjetoServiciosFijos.diaVariacion_CI = servicio.diaVariacion_CI;
                    myObjetoServiciosFijos.activo_CI = servicio.activo_CI;
                    myObjetoServiciosFijos.int_CI = servicio.int_CI;
                    myObjetoServiciosFijos.trab_CI = servicio.trab_CI;
                    objetoEstadosSwitch.CI = true;
                };
                if (servicio.precioHora_MO || servicio.int_MA) {
                    myObjetoServiciosFijos.precioHora_MO = servicio.precioHora_MO;
                    myObjetoServiciosFijos.variacion_MO = servicio.variacion_MO;
                    myObjetoServiciosFijos.diaVariacion_MO = servicio.diaVariacion_MO;
                    myObjetoServiciosFijos.activo_MO = servicio.activo_MO;
                    myObjetoServiciosFijos.int_MO = servicio.int_MO;
                    myObjetoServiciosFijos.trab_MO = servicio.trab_MO;
                    objetoEstadosSwitch.MO = true;
                };
                if (servicio.precioHora_OF || servicio.int_OF) {
                    myObjetoServiciosFijos.precioHora_OF = servicio.precioHora_OF;
                    myObjetoServiciosFijos.variacion_OF = servicio.variacion_OF;
                    myObjetoServiciosFijos.diaVariacion_OF = servicio.diaVariacion_OF;
                    myObjetoServiciosFijos.activo_OF = servicio.activo_OF;
                    myObjetoServiciosFijos.int_OF = servicio.int_OF;
                    myObjetoServiciosFijos.trab_OF = servicio.trab_OF;
                    objetoEstadosSwitch.OF = true;
                };
                if (servicio.precioHora_AL || servicio.int_AL) {
                    myObjetoServiciosFijos.precioHora_AL = servicio.precioHora_AL;
                    myObjetoServiciosFijos.variacion_AL = servicio.variacion_AL;
                    myObjetoServiciosFijos.diaVariacion_AL = servicio.diaVariacion_AL;
                    myObjetoServiciosFijos.activo_AL = servicio.activo_AL;
                    myObjetoServiciosFijos.int_AL = servicio.int_AL;
                    myObjetoServiciosFijos.trab_AL = servicio.trab_AL;
                    objetoEstadosSwitch.AL = true;
                };
                if (servicio.precioHora_LA || servicio.int_LA) {
                    myObjetoServiciosFijos.precioHora_LA = servicio.precioHora_LA;
                    myObjetoServiciosFijos.variacion_LA = servicio.variacion_LA;
                    myObjetoServiciosFijos.diaVariacion_LA = servicio.diaVariacion_LA;
                    myObjetoServiciosFijos.activo_LA = servicio.activo_LA;
                    myObjetoServiciosFijos.int_LA = servicio.int_LA;
                    myObjetoServiciosFijos.trab_LA = servicio.trab_LA;
                    objetoEstadosSwitch.LA = true;
                };
                if (servicio.precioHora_TE || servicio.int_TE) {
                    myObjetoServiciosFijos.precioHora_TE = servicio.precioHora_TE;
                    myObjetoServiciosFijos.variacion_TE = servicio.variacion_TE;
                    myObjetoServiciosFijos.diaVariacion_TE = servicio.diaVariacion_TE;
                    myObjetoServiciosFijos.activo_TE = servicio.activo_TE;
                    myObjetoServiciosFijos.int_TE = servicio.int_TE;
                    myObjetoServiciosFijos.trab_TE = servicio.trab_TE;
                    objetoEstadosSwitch.TE = true;
                };
                if (servicio.precioHora_FI || servicio.int_FI) {
                    myObjetoServiciosFijos.precioHora_FI = servicio.precioHora_FI;
                    myObjetoServiciosFijos.variacion_FI = servicio.variacion_FI;
                    myObjetoServiciosFijos.diaVariacion_FI = servicio.diaVariacion_FI;
                    myObjetoServiciosFijos.activo_FI = servicio.activo_FI;
                    myObjetoServiciosFijos.int_FI = servicio.int_FI;
                    myObjetoServiciosFijos.trab_FI = servicio.trab_FI;
                    objetoEstadosSwitch.FI = true;
                };
                if (servicio.precioHora_FE || servicio.int_FE) {
                    myObjetoServiciosFijos.precioHora_FE = servicio.precioHora_FE;
                    myObjetoServiciosFijos.variacion_FE = servicio.variacion_FE;
                    myObjetoServiciosFijos.diaVariacion_FE = servicio.diaVariacion_FE;
                    myObjetoServiciosFijos.activo_FE = servicio.activo_FE;
                    myObjetoServiciosFijos.int_FE = servicio.int_FE;
                    myObjetoServiciosFijos.trab_FE = servicio.trab_FE;
                    objetoEstadosSwitch.FE = true;
                };
                if (servicio.precioHora_AB || servicio.int_AL) {
                    myObjetoServiciosFijos.precioHora_AB = servicio.precioHora_AB;
                    myObjetoServiciosFijos.variacion_AB = servicio.variacion_AB;
                    myObjetoServiciosFijos.diaVariacion_AB = servicio.diaVariacion_AB;
                    myObjetoServiciosFijos.activo_AB = servicio.activo_AB;
                    myObjetoServiciosFijos.int_AB = servicio.int_AB;
                    myObjetoServiciosFijos.trab_AB = servicio.trab_AB;
                    objetoEstadosSwitch.AB = true;
                };
                if (servicio.precioHora_MA || servicio.int_MA) {
                    myObjetoServiciosFijos.precioHora_MA = servicio.precioHora_MA;
                    myObjetoServiciosFijos.variacion_MA = servicio.variacion_MA;
                    myObjetoServiciosFijos.diaVariacion_MA = servicio.diaVariacion_MA;
                    myObjetoServiciosFijos.activo_MA = servicio.activo_MA;
                    myObjetoServiciosFijos.int_MA = servicio.int_MA;
                    myObjetoServiciosFijos.trab_MA = servicio.trab_MA;
                    objetoEstadosSwitch.MA = true;
                };
                if (servicio.precioHora_PO || servicio.int_PO) {
                    myObjetoServiciosFijos.precioHora_PO = servicio.precioHora_PO;
                    myObjetoServiciosFijos.variacion_PO = servicio.variacion_PO;
                    myObjetoServiciosFijos.diaVariacion_PO = servicio.diaVariacion_PO;
                    myObjetoServiciosFijos.activo_PO = servicio.activo_PO;
                    myObjetoServiciosFijos.int_PO = servicio.int_PO;
                    myObjetoServiciosFijos.trab_PO = servicio.trab_PO;
                    objetoEstadosSwitch.PO = true;
                };
                if (servicio.precioHora_BA || servicio.int_BA) {
                    myObjetoServiciosFijos.precioHora_BA = servicio.precioHora_BA;
                    myObjetoServiciosFijos.variacion_BA = servicio.variacion_BA;
                    myObjetoServiciosFijos.diaVariacion_BA = servicio.diaVariacion_BA;
                    myObjetoServiciosFijos.activo_BA = servicio.activo_BA;
                    myObjetoServiciosFijos.int_BA = servicio.int_BA;
                    myObjetoServiciosFijos.trab_BA = servicio.trab_BA;
                    objetoEstadosSwitch.BA = true;
                };
                if (servicio.precioHora_FT || servicio.int_FT) {
                    myObjetoServiciosFijos.precioHora_FT = servicio.precioHora_FT;
                    myObjetoServiciosFijos.variacion_FT = servicio.variacion_FT;
                    myObjetoServiciosFijos.diaVariacion_FT = servicio.diaVariacion_FT;
                    myObjetoServiciosFijos.activo_FT = servicio.activo_FT;
                    myObjetoServiciosFijos.int_FT = servicio.int_FT;
                    myObjetoServiciosFijos.trab_FT = servicio.trab_FT;
                    objetoEstadosSwitch.FT = true;
                };
                if (servicio.precioHora_C3 || servicio.int_C3) {
                    myObjetoServiciosFijos.precioHora_C3 = servicio.precioHora_C3;
                    myObjetoServiciosFijos.variacion_C3 = servicio.variacion_C3;
                    myObjetoServiciosFijos.diaVariacion_C3 = servicio.diaVariacion_C3;
                    myObjetoServiciosFijos.activo_C3 = servicio.activo_C3;
                    myObjetoServiciosFijos.int_C3 = servicio.int_C3;
                    myObjetoServiciosFijos.trab_C3 = servicio.trab_C3;
                    objetoEstadosSwitch.C3 = true;
                };
                if (servicio.precioHora_C2 || servicio.int_C2) {
                    myObjetoServiciosFijos.precioHora_C2 = servicio.precioHora_C2;
                    myObjetoServiciosFijos.variacion_C2 = servicio.variacion_C2;
                    myObjetoServiciosFijos.diaVariacion_C2 = servicio.diaVariacion_C2;
                    myObjetoServiciosFijos.activo_C2 = servicio.activo_C2;
                    myObjetoServiciosFijos.int_C2 = servicio.int_C2;
                    myObjetoServiciosFijos.trab_C2 = servicio.trab_C2;
                    objetoEstadosSwitch.C2 = true;
                };
                if (servicio.precioHora_C4 || servicio.int_C4) {
                    myObjetoServiciosFijos.precioHora_C4 = servicio.precioHora_C4;
                    myObjetoServiciosFijos.variacion_C4 = servicio.variacion_C4;
                    myObjetoServiciosFijos.diaVariacion_C4 = servicio.diaVariacion_C4;
                    myObjetoServiciosFijos.activo_C4 = servicio.activo_C4;
                    myObjetoServiciosFijos.int_C4 = servicio.int_C4;
                    myObjetoServiciosFijos.trab_C4 = servicio.trab_C4;
                    objetoEstadosSwitch.C4 = true;
                };
                if (servicio.precioHora_ES || servicio.int_ES) {
                    myObjetoServiciosFijos.precioHora_ES = servicio.precioHora_ES;
                    myObjetoServiciosFijos.variacion_ES = servicio.variacion_ES;
                    myObjetoServiciosFijos.diaVariacion_ES = servicio.diaVariacion_ES;
                    myObjetoServiciosFijos.activo_ES = servicio.activo_ES;
                    myObjetoServiciosFijos.int_ES = servicio.int_ES;
                    myObjetoServiciosFijos.trab_ES = servicio.trab_ES;
                    objetoEstadosSwitch.ES = true;
                };
                if (servicio.precioHora_PA || servicio.int_PA) {
                    myObjetoServiciosFijos.precioHora_PA = servicio.precioHora_PA;
                    myObjetoServiciosFijos.variacion_PA = servicio.variacion_PA;
                    myObjetoServiciosFijos.diaVariacion_PA = servicio.diaVariacion_PA;
                    myObjetoServiciosFijos.activo_PA = servicio.activo_PA;
                    myObjetoServiciosFijos.int_PA = servicio.int_PA;
                    myObjetoServiciosFijos.trab_PA = servicio.trab_PA;
                    objetoEstadosSwitch.PA = true;
                };
            });
        };
        setStateSwitchTipoServicioFijoEdicion(objetoEstadosSwitch);
        setValuesFormEdicion({
            categoria: cuadranteAGestionar.categoria,
            variacion: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.variacion : '',
            excepcion: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.excepcion : '',
            observaciones: cuadranteAGestionar.observaciones ? cuadranteAGestionar.observaciones : '',
            tipo: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.tipo : '',
            numeroTrabajadores: cuadranteAGestionar.trabajadores ? cuadranteAGestionar.trabajadores.cantidad : '',
            datosTrabajadores: arrayTr,
            datosSuplentes: arraySu,
            computo: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.computo : '',
            mensualPactado: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.mensualPactado : null,
            precioHora_L: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_L : null,
            precioHora_E: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_E : null,
            precioHora_P: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_P : null,
            precioHora_N: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_N : null,
            precioHora_R: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_R : null,
            precioHora_L1: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_L1 : null,
            precioHora_L2: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_L2 : null,
            precioHora_F: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.precioHora_F : null,
            precioHora_TO: myObjetoServiciosFijos.precioHora_TO,
            precioHora_CR: myObjetoServiciosFijos.precioHora_CR,
            precioHora_CE: myObjetoServiciosFijos.precioHora_CE,
            precioHora_CI: myObjetoServiciosFijos.precioHora_CI,
            precioHora_MO: myObjetoServiciosFijos.precioHora_MO,
            precioHora_OF: myObjetoServiciosFijos.precioHora_OF,
            precioHora_AL: myObjetoServiciosFijos.precioHora_AL,
            precioHora_LA: myObjetoServiciosFijos.precioHora_LA,
            precioHora_TE: myObjetoServiciosFijos.precioHora_TE,
            precioHora_FI: myObjetoServiciosFijos.precioHora_FI,
            precioHora_FE: myObjetoServiciosFijos.precioHora_FE,
            precioHora_AB: myObjetoServiciosFijos.precioHora_AB,
            precioHora_MA: myObjetoServiciosFijos.precioHora_MA,
            precioHora_PO: myObjetoServiciosFijos.precioHora_PO,
            precioHora_BA: myObjetoServiciosFijos.precioHora_BA,
            precioHora_FT: myObjetoServiciosFijos.precioHora_FT,
            precioHora_C3: myObjetoServiciosFijos.precioHora_C3,
            precioHora_C2: myObjetoServiciosFijos.precioHora_C2,
            precioHora_C4: myObjetoServiciosFijos.precioHora_C4,
            precioHora_ES: myObjetoServiciosFijos.precioHora_ES,
            precioHora_PA: myObjetoServiciosFijos.precioHora_PA,
            variacion_TO: myObjetoServiciosFijos.variacion_TO,
            variacion_CR: myObjetoServiciosFijos.variacion_CR,
            variacion_CE: myObjetoServiciosFijos.variacion_CE,
            variacion_CI: myObjetoServiciosFijos.variacion_CI,
            variacion_MO: myObjetoServiciosFijos.variacion_MO,
            variacion_OF: myObjetoServiciosFijos.variacion_OF,
            variacion_AL: myObjetoServiciosFijos.variacion_AL,
            variacion_LA: myObjetoServiciosFijos.variacion_LA,
            variacion_TE: myObjetoServiciosFijos.variacion_TE,
            variacion_FI: myObjetoServiciosFijos.variacion_FI,
            variacion_FE: myObjetoServiciosFijos.variacion_FE,
            variacion_AB: myObjetoServiciosFijos.variacion_AB,
            variacion_MA: myObjetoServiciosFijos.variacion_MA,
            variacion_PO: myObjetoServiciosFijos.variacion_PO,
            variacion_BA: myObjetoServiciosFijos.variacion_BA,
            variacion_FT: myObjetoServiciosFijos.variacion_FT,
            variacion_C3: myObjetoServiciosFijos.variacion_C3,
            variacion_C2: myObjetoServiciosFijos.variacion_C2,
            variacion_C4: myObjetoServiciosFijos.variacion_C4,
            variacion_ES: myObjetoServiciosFijos.variacion_ES,
            variacion_PA: myObjetoServiciosFijos.variacion_PA,
            diaVariacion_TO: myObjetoServiciosFijos.diaVariacion_TO,
            diaVariacion_CR: myObjetoServiciosFijos.diaVariacion_CR,
            diaVariacion_CE: myObjetoServiciosFijos.diaVariacion_CE,
            diaVariacion_CI: myObjetoServiciosFijos.diaVariacion_CI,
            diaVariacion_MO: myObjetoServiciosFijos.diaVariacion_MO,
            diaVariacion_OF: myObjetoServiciosFijos.diaVariacion_OF,
            diaVariacion_AL: myObjetoServiciosFijos.diaVariacion_AL,
            diaVariacion_LA: myObjetoServiciosFijos.diaVariacion_LA,
            diaVariacion_TE: myObjetoServiciosFijos.diaVariacion_TE,
            diaVariacion_FI: myObjetoServiciosFijos.diaVariacion_FI,
            diaVariacion_FE: myObjetoServiciosFijos.diaVariacion_FE,
            diaVariacion_AB: myObjetoServiciosFijos.diaVariacion_AB,
            diaVariacion_MA: myObjetoServiciosFijos.diaVariacion_MA,
            diaVariacion_PO: myObjetoServiciosFijos.diaVariacion_PO,
            diaVariacion_BA: myObjetoServiciosFijos.diaVariacion_BA,
            diaVariacion_FT: myObjetoServiciosFijos.diaVariacion_FT,
            diaVariacion_C3: myObjetoServiciosFijos.diaVariacion_C3,
            diaVariacion_C2: myObjetoServiciosFijos.diaVariacion_C2,
            diaVariacion_C4: myObjetoServiciosFijos.diaVariacion_C4,
            diaVariacion_ES: myObjetoServiciosFijos.diaVariacion_ES,
            diaVariacion_PA: myObjetoServiciosFijos.diaVariacion_PA,
            activo_TO: myObjetoServiciosFijos.activo_TO,
            activo_CR: myObjetoServiciosFijos.activo_CR,
            activo_CE: myObjetoServiciosFijos.activo_CE,
            activo_CI: myObjetoServiciosFijos.activo_CI,
            activo_MO: myObjetoServiciosFijos.activo_MO,
            activo_OF: myObjetoServiciosFijos.activo_OF,
            activo_AL: myObjetoServiciosFijos.activo_AL,
            activo_LA: myObjetoServiciosFijos.activo_LA,
            activo_TE: myObjetoServiciosFijos.activo_TE,
            activo_FI: myObjetoServiciosFijos.activo_FI,
            activo_FE: myObjetoServiciosFijos.activo_FE,
            activo_AB: myObjetoServiciosFijos.activo_AB,
            activo_MA: myObjetoServiciosFijos.activo_MA,
            activo_PO: myObjetoServiciosFijos.activo_PO,
            activo_BA: myObjetoServiciosFijos.activo_BA,
            activo_FT: myObjetoServiciosFijos.activo_FT,
            activo_C3: myObjetoServiciosFijos.activo_C3,
            activo_C2: myObjetoServiciosFijos.activo_C2,
            activo_C4: myObjetoServiciosFijos.activo_C4,
            activo_ES: myObjetoServiciosFijos.activo_ES,
            activo_PA: myObjetoServiciosFijos.activo_PA,
            int_TO: myObjetoServiciosFijos.int_TO,
            int_CR: myObjetoServiciosFijos.int_CR,
            int_CE: myObjetoServiciosFijos.int_CE,
            int_CI: myObjetoServiciosFijos.int_CI,
            int_MO: myObjetoServiciosFijos.int_MO,
            int_OF: myObjetoServiciosFijos.int_OF,
            int_AL: myObjetoServiciosFijos.int_AL,
            int_LA: myObjetoServiciosFijos.int_LA,
            int_TE: myObjetoServiciosFijos.int_TE,
            int_FI: myObjetoServiciosFijos.int_FI,
            int_FE: myObjetoServiciosFijos.int_FE,
            int_AB: myObjetoServiciosFijos.int_AB,
            int_MA: myObjetoServiciosFijos.int_MA,
            int_PO: myObjetoServiciosFijos.int_PO,
            int_BA: myObjetoServiciosFijos.int_BA,
            int_FT: myObjetoServiciosFijos.int_FT,
            int_C3: myObjetoServiciosFijos.int_C3,
            int_C2: myObjetoServiciosFijos.int_C2,
            int_C4: myObjetoServiciosFijos.int_C4,
            int_ES: myObjetoServiciosFijos.int_ES,
            int_PA: myObjetoServiciosFijos.int_PA,
            trab_TO: myObjetoServiciosFijos.trab_TO ? myObjetoServiciosFijos.trab_TO : '',
            trab_CR: myObjetoServiciosFijos.trab_CR ? myObjetoServiciosFijos.trab_CR : '',
            trab_CE: myObjetoServiciosFijos.trab_CE ? myObjetoServiciosFijos.trab_CE : '',
            trab_CI: myObjetoServiciosFijos.trab_CI ? myObjetoServiciosFijos.trab_CI : '',
            trab_MO: myObjetoServiciosFijos.trab_MO ? myObjetoServiciosFijos.trab_MO : '',
            trab_OF: myObjetoServiciosFijos.trab_OF ? myObjetoServiciosFijos.trab_OF : '',
            trab_AL: myObjetoServiciosFijos.trab_AL ? myObjetoServiciosFijos.trab_AL : '',
            trab_LA: myObjetoServiciosFijos.trab_LA ? myObjetoServiciosFijos.trab_LA : '',
            trab_TE: myObjetoServiciosFijos.trab_TE ? myObjetoServiciosFijos.trab_TE : '',
            trab_FI: myObjetoServiciosFijos.trab_FI ? myObjetoServiciosFijos.trab_FI : '',
            trab_FE: myObjetoServiciosFijos.trab_FE ? myObjetoServiciosFijos.trab_FE : '',
            trab_AB: myObjetoServiciosFijos.trab_AB ? myObjetoServiciosFijos.trab_AB : '',
            trab_MA: myObjetoServiciosFijos.trab_MA ? myObjetoServiciosFijos.trab_MA : '',
            trab_PO: myObjetoServiciosFijos.trab_PO ? myObjetoServiciosFijos.trab_PO : '',
            trab_BA: myObjetoServiciosFijos.trab_BA ? myObjetoServiciosFijos.trab_BA : '',
            trab_FT: myObjetoServiciosFijos.trab_FT ? myObjetoServiciosFijos.trab_FT : '',
            trab_C3: myObjetoServiciosFijos.trab_C3 ? myObjetoServiciosFijos.trab_C3 : '',
            trab_C2: myObjetoServiciosFijos.trab_C2 ? myObjetoServiciosFijos.trab_C2 : '',
            trab_C4: myObjetoServiciosFijos.trab_C4 ? myObjetoServiciosFijos.trab_C4 : '',
            trab_ES: myObjetoServiciosFijos.trab_ES ? myObjetoServiciosFijos.trab_ES : '',
            trab_PA: myObjetoServiciosFijos.trab_PA ? myObjetoServiciosFijos.trab_PA : ''
        });
        if (cuadranteAGestionar.horario) {
            if (cuadranteAGestionar.horario.tipo === "rango") {
                let arrayValoresTimePicker1 = [];
                let arrayValoresTimePicker2 = [];
                let arrayValoresTimePickerT = [];
                for (let i = 0; i < cuadranteAGestionar.horario.tipoRegistroTrabajador.length; i++) {
                    let objetoValoresTimePicker1 = {};
                    let objetoValoresTimePicker2 = {};
                    let objetoValoresTimePickerT = {};
                    objetoValoresTimePicker1['lunes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicioRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicioRango) : null);
                    objetoValoresTimePicker2['lunes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFinRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFinRango) : null);
                    objetoValoresTimePickerT['lunesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
                    objetoValoresTimePicker1['martes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicioRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicioRango) : null);
                    objetoValoresTimePicker2['martes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFinRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFinRango) : null);
                    objetoValoresTimePickerT['martesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
                    objetoValoresTimePicker1['miercoles'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicioRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicioRango) : null);
                    objetoValoresTimePicker2['miercoles'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFinRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFinRango) : null);
                    objetoValoresTimePickerT['miercolesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
                    objetoValoresTimePicker1['jueves'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicioRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicioRango) : null);
                    objetoValoresTimePicker2['jueves'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFinRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFinRango) : null);
                    objetoValoresTimePickerT['juevesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
                    objetoValoresTimePicker1['viernes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicioRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicioRango) : null);
                    objetoValoresTimePicker2['viernes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFinRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFinRango) : null);
                    objetoValoresTimePickerT['viernesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
                    objetoValoresTimePicker1['sabado'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicioRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicioRango) : null);
                    objetoValoresTimePicker2['sabado'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFinRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFinRango) : null);
                    objetoValoresTimePickerT['sabadoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
                    objetoValoresTimePicker1['domingo'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicioRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicioRango) : null);
                    objetoValoresTimePicker2['domingo'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFinRango ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFinRango) : null);
                    objetoValoresTimePickerT['domingoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
                    arrayValoresTimePicker1.push(objetoValoresTimePicker1);
                    arrayValoresTimePicker2.push(objetoValoresTimePicker2);
                    arrayValoresTimePickerT.push(objetoValoresTimePickerT);
                };
                setValueTimePickerInicioEdicion(arrayValoresTimePicker1);
                setValueTimePickerFinEdicion(arrayValoresTimePicker2);
                setValueTipoServicioEdicion(arrayValoresTimePickerT);
            };
            if (cuadranteAGestionar.horario.tipo === "cantidad") {
                let arrayValoresTimePicker1 = [];
                let arrayValoresTimePickerT = [];
                for (let i = 0; i < cuadranteAGestionar.horario.tipoRegistroTrabajador.length; i++) {
                    let objetoValoresTimePicker1 = {};
                    let objetoValoresTimePickerT = {};
                    objetoValoresTimePicker1['lunes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesCantidad ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesCantidad : '');
                    objetoValoresTimePickerT['lunesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
                    objetoValoresTimePicker1['martes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesCantidad ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesCantidad : '');
                    objetoValoresTimePickerT['martesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
                    objetoValoresTimePicker1['miercoles'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesCantidad ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesCantidad : '');
                    objetoValoresTimePickerT['miercolesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
                    objetoValoresTimePicker1['jueves'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesCantidad ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesCantidad : '');
                    objetoValoresTimePickerT['juevesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
                    objetoValoresTimePicker1['viernes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesCantidad ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesCantidad : '');
                    objetoValoresTimePickerT['viernesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
                    objetoValoresTimePicker1['sabado'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoCantidad ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoCantidad : '');
                    objetoValoresTimePickerT['sabadoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
                    objetoValoresTimePicker1['domingo'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoCantidad ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoCantidad : '');
                    objetoValoresTimePickerT['domingoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
                    arrayValoresTimePicker1.push(objetoValoresTimePicker1);
                    arrayValoresTimePickerT.push(objetoValoresTimePickerT);
                };
                setValueCantidadHorasEdicion(arrayValoresTimePicker1);
                setValueTipoServicioEdicion(arrayValoresTimePickerT);
            };
            if (cuadranteAGestionar.horario.tipo === "rangoDescanso") {
                let arrayValoresTimePicker1 = [];
                let arrayValoresTimePicker2 = [];
                let arrayValoresTimePicker3 = [];
                let arrayValoresTimePicker4 = [];
                let arrayValoresTimePickerT = [];
                for (let i = 0; i < cuadranteAGestionar.horario.tipoRegistroTrabajador.length; i++) {
                    let objetoValoresTimePicker1 = {};
                    let objetoValoresTimePicker2 = {};
                    let objetoValoresTimePicker3 = {};
                    let objetoValoresTimePicker4 = {};
                    let objetoValoresTimePickerT = {};
                    objetoValoresTimePicker1['lunes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso) : null);
                    objetoValoresTimePicker2['lunes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso) : null);
                    objetoValoresTimePicker3['lunes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso) : null);
                    objetoValoresTimePicker4['lunes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso) : null);
                    objetoValoresTimePickerT['lunesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
                    objetoValoresTimePicker1['martes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso) : null);
                    objetoValoresTimePicker2['martes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso) : null);
                    objetoValoresTimePicker3['martes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso) : null);
                    objetoValoresTimePicker4['martes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso) : null);
                    objetoValoresTimePickerT['martesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
                    objetoValoresTimePicker1['miercoles'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso) : null);
                    objetoValoresTimePicker2['miercoles'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso) : null);
                    objetoValoresTimePicker3['miercoles'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso) : null);
                    objetoValoresTimePicker4['miercoles'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso) : null);
                    objetoValoresTimePickerT['miercolesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
                    objetoValoresTimePicker1['jueves'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso) : null);
                    objetoValoresTimePicker2['jueves'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso) : null);
                    objetoValoresTimePicker3['jueves'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso) : null);
                    objetoValoresTimePicker4['jueves'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso) : null);
                    objetoValoresTimePickerT['juevesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
                    objetoValoresTimePicker1['viernes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso) : null);
                    objetoValoresTimePicker2['viernes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso) : null);
                    objetoValoresTimePicker3['viernes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso) : null);
                    objetoValoresTimePicker4['viernes'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso) : null);
                    objetoValoresTimePickerT['viernesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
                    objetoValoresTimePicker1['sabado'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso) : null);
                    objetoValoresTimePicker2['sabado'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso) : null);
                    objetoValoresTimePicker3['sabado'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) : null);
                    objetoValoresTimePicker4['sabado'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso) : null);
                    objetoValoresTimePickerT['sabadoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
                    objetoValoresTimePicker1['domingo'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso) : null);
                    objetoValoresTimePicker2['domingo'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso) : null);
                    objetoValoresTimePicker3['domingo'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso) : null);
                    objetoValoresTimePicker4['domingo'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso ?
                        generaFecha(cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso) : null);
                    objetoValoresTimePickerT['domingoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                        cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
                    arrayValoresTimePicker1.push(objetoValoresTimePicker1);
                    arrayValoresTimePicker2.push(objetoValoresTimePicker2);
                    arrayValoresTimePicker3.push(objetoValoresTimePicker3);
                    arrayValoresTimePicker4.push(objetoValoresTimePicker4);
                    arrayValoresTimePickerT.push(objetoValoresTimePickerT);
                };
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker1);
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker2);
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker3);
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker4);
                setValueTipoServicioEdicion(arrayValoresTimePickerT);
            };
            let arrayValoresHorario = [];
            for (let i = 0; i < cuadranteAGestionar.horario.tipoRegistroTrabajador.length; i++) {
                let objetoValoresHorario = {};
                objetoValoresHorario['lunesInicioRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicioRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicioRango : null);
                objetoValoresHorario['lunesFinRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFinRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFinRango : null);
                objetoValoresHorario['martesInicioRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicioRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicioRango : null);
                objetoValoresHorario['martesFinRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFinRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFinRango : null);
                objetoValoresHorario['miercolesInicioRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicioRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicioRango : null);
                objetoValoresHorario['miercolesFinRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFinRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFinRango : null);
                objetoValoresHorario['juevesInicioRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicioRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicioRango : null);
                objetoValoresHorario['juevesFinRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFinRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFinRango : null);
                objetoValoresHorario['viernesInicioRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicioRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicioRango : null);
                objetoValoresHorario['viernesFinRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFinRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFinRango : null);
                objetoValoresHorario['sabadoInicioRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicioRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicioRango : null);
                objetoValoresHorario['sabadoFinRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFinRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFinRango : null);
                objetoValoresHorario['domingoInicioRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicioRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicioRango : null);
                objetoValoresHorario['domingoFinRango'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFinRango ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFinRango : null);
                objetoValoresHorario['lunesInicio1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso : null);
                objetoValoresHorario['lunesFin1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso : null);
                objetoValoresHorario['lunesInicio2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso : null);
                objetoValoresHorario['lunesFin2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso : null);
                objetoValoresHorario['martesInicio1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso : null);
                objetoValoresHorario['martesFin1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso : null);
                objetoValoresHorario['martesInicio2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso : null);
                objetoValoresHorario['martesFin2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso : null);
                objetoValoresHorario['miercolesInicio1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso : null);
                objetoValoresHorario['miercolesFin1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso : null);
                objetoValoresHorario['miercolesInicio2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso : null);
                objetoValoresHorario['miercolesFin2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso : null);
                objetoValoresHorario['juevesInicio1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso : null);
                objetoValoresHorario['juevesFin1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso : null);
                objetoValoresHorario['juevesInicio2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso : null);
                objetoValoresHorario['juevesFin2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso : null);
                objetoValoresHorario['viernesInicio1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso : null);
                objetoValoresHorario['viernesFin1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso : null);
                objetoValoresHorario['viernesInicio2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso : null);
                objetoValoresHorario['viernesFin2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso : null);
                objetoValoresHorario['sabadoInicio1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso : null);
                objetoValoresHorario['sabadoFin1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso : null);
                objetoValoresHorario['sabadoInicio2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso : null);
                objetoValoresHorario['sabadoFin2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso : null);
                objetoValoresHorario['domingoInicio1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso : null);
                objetoValoresHorario['domingoFin1RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso : null);
                objetoValoresHorario['domingoInicio2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso : null);
                objetoValoresHorario['domingoFin2RangoDescanso'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso : null);
                objetoValoresHorario['lunesCantidad'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesCantidad ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesCantidad : '');
                objetoValoresHorario['martesCantidad'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesCantidad ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesCantidad : '');
                objetoValoresHorario['miercolesCantidad'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesCantidad ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesCantidad : '');
                objetoValoresHorario['juevesCantidad'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesCantidad ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesCantidad : '');
                objetoValoresHorario['viernesCantidad'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesCantidad ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesCantidad : '');
                objetoValoresHorario['sabadoCantidad'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoCantidad ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoCantidad : '');
                objetoValoresHorario['domingoCantidad'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoCantidad ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoCantidad : '');
                objetoValoresHorario['lunesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
                objetoValoresHorario['martesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
                objetoValoresHorario['miercolesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
                objetoValoresHorario['juevesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
                objetoValoresHorario['viernesTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
                objetoValoresHorario['sabadoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
                objetoValoresHorario['domingoTipoServicio'] = (cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                    cuadranteAGestionar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
                arrayValoresHorario.push(objetoValoresHorario);
            };
            setHorarioIntervencionEdicion({
                tipo: cuadranteAGestionar.horario.tipo,
                variacion: cuadranteAGestionar.horario.variacion,
                excepcion: cuadranteAGestionar.horario.excepcion ? cuadranteAGestionar.horario.excepcion : '',
                tipoRegistro: cuadranteAGestionar.horario.tipoRegistro,
                tipoRegistroTrabajador: arrayValoresHorario
            });
        } else {
            setValueTimePickerInicioEdicion([
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
            setValueTimePickerFinEdicion([
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
            setValueTimePickerInicioDescanso1Edicion([
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
            setValueTimePickerFinDescanso1Edicion([
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
            setValueTimePickerInicioDescanso2Edicion([
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
            setValueTimePickerFinDescanso2Edicion([
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
            setValueCantidadHorasEdicion([
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
            setValueTipoServicioEdicion([
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
            setHorarioIntervencionEdicion({
                tipo: '',
                variacion: '',
                excepcion: '',
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
        };
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
                                className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2) : clsx(classes.fondoAlta, classes.boxStl2)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
                            >
                                <Box>Datos generales</Box>
                                <Box
                                    className={clsx(classes.mt_5, classes.mr15)}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={stateSwitchEstadoEdicion}
                                                color="secondary"
                                                style={valuesFormEdicionGenerales.estado === 'baja' ? { color: '#FFFFFF' } : null}
                                                onChange={handleChangeSwitchEstadoEdicion}
                                                disabled={disabledItem}
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
                                >
                                    <Autocomplete
                                        id="form-select-centros"
                                        options={listadoCentros}
                                        onChange={handleChangeSelectCentrosEdicion}
                                        value={valuesAutocompleteCentrosValores || null}
                                        getOptionLabel={(option) => option.nombre ? option.nombre : ''}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Selecciona centro" variant="outlined" />}
                                        className={classes.mb15}
                                        size="small"
                                    />
                                </FormControl>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="space-between"
                                    alignItems="flex-start"
                                >
                                    <Grid item xs={8}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                            disabled={numeroCuadrantesEdicion.length === 1 ? true : false}
                                        >
                                            <InputLabel>Número Cuadrante</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-cuadrante-no-edicion"
                                                label="Número Cuadrante"
                                                value={cuadranteEnUsoEdicion}
                                                onChange={handleChangeCuadranteCentroEdicion}
                                                helpertext="Selecciona nº cuadrante"
                                            >
                                                {
                                                    numeroCuadrantesEdicion.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Box className={classes.floatRight}>
                                            {esInicioCentrosEdicion ? (
                                                <Fragment>
                                                    <IconButton
                                                        className={classes.btnBorrarCuad}
                                                        disabled={true}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        className={classes.paper}
                                                        disabled={true}
                                                    >
                                                        <LibraryAddIcon />
                                                    </IconButton>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    {numeroCuadrantesEdicion.length > 1 ? (
                                                        <Tooltip title="Borrar cuadrante del centro" placement="top-end" arrow >
                                                            <IconButton
                                                                className={classes.btnBorrarCuad}
                                                                onClick={handleEliminarCuadranteCentroEdicion}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <IconButton
                                                            className={classes.btnBorrarCuad}
                                                            disabled={true}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    )}
                                                    <Tooltip title="Añadir cuadrante al centro" placement="top-end" arrow >
                                                        <IconButton
                                                            className={classes.paper}
                                                            onClick={handleAnadirCuadranteCentroEdicion}
                                                        >
                                                            <LibraryAddIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Fragment>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Nombre</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-nombre-centro-edicion"
                                        value={valuesFormEdicionGenerales.nombre}
                                        onChange={handleChangeFormEdicionGenerales('nombre')}
                                        labelWidth={60}
                                        disabled={disabledItem}

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
                                        id="form-categoria-edicion"
                                        label="Categoría Centro"
                                        value={valuesFormEdicion.categoria || ''}
                                        onChange={handleChangeFormEdicion('categoria')}
                                        helpertext="Selecciona categoria"
                                        disabled={disabledItem}
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
                                                id="form-codigo-centro-edicion"
                                                value={valuesFormEdicionGenerales.codigo}
                                                onChange={handleChangeFormEdicionGenerales('codigo')}
                                                labelWidth={55}
                                                disabled={disabledItem}
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
                                                id="form-nif-centro-edicion"
                                                value={valuesFormEdicionGenerales.nif}
                                                onChange={handleChangeFormEdicionGenerales('nif')}
                                                labelWidth={30}
                                                disabled={disabledItem}
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
                                        id="form-mail-centro-edicion"
                                        value={valuesFormEdicionGenerales.mail}
                                        onChange={handleChangeFormEdicionGenerales('mail')}
                                        labelWidth={55}
                                        disabled={disabledItem}
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
                                        id="form-mail2-centro-edicion"
                                        value={valuesFormEdicionGenerales.mail2}
                                        onChange={handleChangeFormEdicionGenerales('mail2')}
                                        labelWidth={65}
                                        disabled={disabledItem}
                                    />
                                </FormControl>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Domicilio</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-domicilio-centro-edicion"
                                                value={valuesFormEdicionGenerales.domicilio}
                                                onChange={handleChangeFormEdicionGenerales('domicilio')}
                                                labelWidth={70}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>C.P.</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-codigoPostal-centro-edicion"
                                                value={valuesFormEdicionGenerales.codigoPostal}
                                                onChange={handleChangeFormEdicionGenerales('codigoPostal')}
                                                labelWidth={35}
                                                disabled={disabledItem}
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
                                            <InputLabel>Población</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-poblacion-centro-edicion"
                                                value={valuesFormEdicionGenerales.poblacion}
                                                onChange={handleChangeFormEdicionGenerales('poblacion')}
                                                labelWidth={75}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Provincia</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-provincia-centro-edicion"
                                                value={valuesFormEdicionGenerales.provincia}
                                                onChange={handleChangeFormEdicionGenerales('provincia')}
                                                labelWidth={75}
                                                disabled={disabledItem}
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
                                                id="form-telefono-centro-edicion"
                                                value={valuesFormEdicionGenerales.telefono}
                                                onChange={handleChangeFormEdicionGenerales('telefono')}
                                                labelWidth={80}
                                                disabled={disabledItem}
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
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-telefono2-centro-edicion"
                                                value={valuesFormEdicionGenerales.telefono2}
                                                onChange={handleChangeFormEdicionGenerales('telefono2')}
                                                labelWidth={80}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={8} sm={6} xs={12}>
                        <div className={classes.root2} style={{ marginTop: 5 }}>
                            <AppBar position="static" className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja) : clsx(classes.fondoAlta)}>
                                <Tabs value={valueTabCentrosEdicion} onChange={handleChangeTabCentrosEdicion} className={classes.tabsStl}>
                                    <Tab label="Trabajadores" {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Horario" {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Servicios extra" {...a11yProps(2)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Forma de pago" {...a11yProps(3)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Observaciones" {...a11yProps(4)} style={{ paddingBottom: 10 }} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTabCentrosEdicion} index={0} className={classes.scrollable} style={{ height: heightScrollable }}>
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
                                                id="form-tipo-trabajadores"
                                                label="Trabajadores asignados"
                                                value={valuesFormEdicion.numeroTrabajadores || ''}
                                                onChange={handleChangeFormEdicion('numeroTrabajadores')}
                                                helpertext="Selecciona número de trabajadores"
                                                disabled={disabledItem}
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
                                        {trabajadoresEdicion.cantidad !== '' ? (generarSelectsTrabajadores(trabajadoresEdicion.cantidad)) : null}
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={1} className={classes.scrollable} style={{ height: heightScrollable }}>
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
                                                id="form-tipo-edicion"
                                                label="Modo entrada datos"
                                                value={valuesFormEdicion.tipo || ''}
                                                onChange={handleChangeFormEdicion('tipo')}
                                                helpertext="Selecciona Modo entrada datos"
                                                disabled={disabledItem}
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
                                                className={classes.mb15}
                                                id="form-variaciones-edicion"
                                                label="Variaciones"
                                                value={valuesFormEdicion.variacion}
                                                onChange={handleChangeFormEdicion('variacion')}
                                                helpertext="Selecciona variaciones"
                                                disabled={disabledItem}
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
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Excepciones</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb25}
                                                id="form-excepciones-edicion"
                                                label="Excepciones"
                                                value={valuesFormEdicion.excepcion}
                                                onChange={handleChangeFormEdicion('excepcion')}
                                                helpertext="Selecciona excepciones"
                                                disabled={disabledItem}
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {
                                                    excepciones.map((option) => (
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
                                            className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb20) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
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
                                                id="form-tipo-computo-edicion"
                                                label="Tipo cómputo"
                                                value={valuesFormEdicion.computo || ''}
                                                onChange={handleChangeFormEdicion('computo')}
                                                helpertext="Selecciona cómputo de horas"
                                                disabled={disabledItem}
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
                                        {valuesFormEdicion.computo === 1 || valuesFormEdicion.computo === 3 ? (
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>Mensual pactado</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
                                                    fullWidth
                                                    id="form-mensual-pactado-edicion"
                                                    value={valuesFormEdicion.mensualPactado || ''}
                                                    onChange={handleChangeFormEdicion('mensualPactado')}
                                                    labelWidth={130}
                                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                />
                                            </FormControl>
                                        ) : null}
                                        {valuesFormEdicion.computo === 2 || valuesFormEdicion.computo === 3 ? (
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
                                                        id="form-precio-hora_L-edicion"
                                                        value={valuesFormEdicion.precioHora_L || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_L')}
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
                                                        id="form-precio-hora_E-edicion"
                                                        value={valuesFormEdicion.precioHora_E || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_E')}
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
                                                        id="form-precio-hora_P-edicion"
                                                        value={valuesFormEdicion.precioHora_P || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_P')}
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
                                                        id="form-precio-hora_N-edicion"
                                                        value={valuesFormEdicion.precioHora_N || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_N')}
                                                        labelWidth={140}
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
                                                        id="form-precio-hora_R-edicion"
                                                        value={valuesFormEdicion.precioHora_R || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_R')}
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
                                                        id="form-precio-hora_L1-edicion"
                                                        value={valuesFormEdicion.precioHora_L1 || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_L1')}
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
                                                        id="form-precio-hora_L2-edicion"
                                                        value={valuesFormEdicion.precioHora_L2 || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_L2')}
                                                        labelWidth={125}
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
                                                        id="form-precio-hora_F-edicion"
                                                        value={valuesFormEdicion.precioHora_F || ''}
                                                        onChange={handleChangeFormEdicion('precioHora_F')}
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
                                            {valuesFormEdicion.tipo !== '' ? (
                                                <Box
                                                    m={0.5}
                                                    color="secondary.contrastText"
                                                    className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb10, classes.mt15) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb10, classes.mt15)}
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
                                                                    style={valuesFormEdicionGenerales.estado === 'baja' ? { color: '#FFFFFF' } : null}
                                                                    color="secondary"
                                                                    onChange={handleChangeSwitchTipoRegistroEdicion}
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
                                                    horarioIntervencionEdicion.tipoRegistroTrabajador.map((item, index) => (
                                                        generaRetornoHorario(valuesFormEdicion.tipo, index)
                                                    ))
                                                }
                                            </List>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={2} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item xs={12}>
                                    <Box style={{ paddingLeft: 10, marginTop: 10 }}>
                                        {
                                            tiposDeServicio.map((tipo, index) => (
                                                retornaTipoServicioFijoEdicion(tipo, index)
                                            ))
                                        }
                                    </Box>
                                    <Box
                                        style={{ marginLeft: 10, marginTop: 10, marginBottom: 20 }}
                                        className={disabledItem ? classes.boxChekinSinHover : classes.boxChekin}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={valuesFormEdicionGenerales.gestionEspSF || false}
                                                    onChange={handleChangeFormEdicionGenerales('gestionEspSF')}
                                                    name="checkedGestEsp-edicion"
                                                    color="secondary"
                                                    disabled={disabledItem}
                                                />
                                            }
                                            label={<Typography className={classes.colorText} style={{ fontSize: '0.9rem' }}>Gestión especial horas para Servicios Extra.</Typography>}
                                        />
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={3} className={classes.scrollable} style={{ height: heightScrollable }}>
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
                                                id="form-formaPago-edicion"
                                                label="Forma pago"
                                                value={valuesFormEdicionGenerales.formaPago || ''}
                                                onChange={handleChangeFormEdicionGenerales('formaPago')}
                                                helpertext="Selecciona la forma de pago"
                                                disabled={disabledItem}
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
                                                id="form-diaPago-edicion"
                                                label="Vencimiento"
                                                value={valuesFormEdicionGenerales.diaPago || ''}
                                                onChange={handleChangeFormEdicionGenerales('diaPago')}
                                                helpertext="Selecciona día vencimiento"
                                                disabled={disabledItem}
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
                                                className={classes.mb20}
                                                id="form-tempPago-edicion"
                                                label="Temporización"
                                                value={valuesFormEdicionGenerales.tempPago || ''}
                                                onChange={handleChangeFormEdicionGenerales('tempPago')}
                                                helpertext="Selecciona temporización del pago"
                                                disabled={disabledItem}
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
                                        <Box className={disabledItem ? classes.boxChekinSinHover : classes.boxChekin}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={valuesFormEdicionGenerales.activoNumCuenta || false}
                                                        onChange={handleChangeFormEdicionGenerales('activoNumCuenta')}
                                                        name="checkedNumCuenta-edicion"
                                                        color="secondary"
                                                        disabled={disabledItem}
                                                    />
                                                }
                                                label={<Typography className={classes.colorText} style={{ fontSize: '0.9rem' }}>Activar línea número de cuenta en Factura Factusol.</Typography>}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={4} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item lg={6} sm={6} xs={12}>
                                    <TextField
                                        label="Observaciones"
                                        id="form-observaciones-edicion"
                                        value={valuesFormEdicion.observaciones || ''}
                                        className={clsx(classes.form, classes.mb25)}
                                        fullWidth
                                        placeholder={'Observaciones Cuadrante ' + cuadranteEnUsoEdicion}
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        onChange={handleChangeFormEdicion('observaciones')}
                                        disabled={disabledItem}
                                    />
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
            <DialogComponente
                prIsOpen={openDialog2}
                prHandleCloseDialogBotones={handleCloseDialogBotones}
                prTituloDialog={tituloDialog}
                prDescripcionDialog={descripcionDialog}
            />
            {/* {console.log(listadoTrabajadores)} */}
        </div >
    )
})

export default CentrosEditar
