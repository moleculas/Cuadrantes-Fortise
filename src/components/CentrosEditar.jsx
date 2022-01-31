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

const categorias = Constantes.CATEGORIAS_CENTROS;
const variaciones = Constantes.VARIACIONES_HORARIOS_CENTROS;
const tipos = Constantes.MODO_ENTRADA_HORARIOS;
const totalTrabajadores = Constantes.TRABAJADORES_ASIGNADOS_CENTRO;
const computoHoras = Constantes.COMPUTO_HORAS;
const formasDePago = Constantes.FORMA_DE_PAGO;

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

    //states

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openSnack, setOpenSnack] = useState(false);
    const [valuesAutocompleteCentrosValores, setValuesAutocompleteCentrosValores] = useState(null);
    const [alert, setAlert] = useState({});
    const [valuesFormEdicion, setValuesFormEdicion] = useState({
        id: null,
        nombre: '',
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
        variacion: '',
        tipo: '',
        numeroTrabajadores: '',
        datosTrabajadores: [],
        datosSuplentes: [],
        computo: '',
        mensualPactado: null,
        precioHora_L: null,
        precioHora_C: null,
        precioHora_E: null,
        precioHora_I: null,
        precioHora_Z: null,
        precioHora_T: null,
        precioHora_P: null
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

    //useEffect

    useEffect(() => {
        dispatch(onEstemAccion('editarCentros'));
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosAccion('centros'));
        };
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
        const arrayTr = [];
        const arraySu = [];
        if (centroAEditar.trabajadores.trabajadores.length > 0) {
            centroAEditar.trabajadores.trabajadores.forEach((trabajadorIterado, index) => {
                arrayTr.push(trabajadorIterado['trabajador_' + (index + 1)]);
                arraySu.push(trabajadorIterado['suplente_' + (index + 1)]);
            });
        };
        if (centroAEditar.horario.tipoRegistro === 'individual') {
            setStateSwitchTipoRegistro(true);
        };
        setValuesFormEdicion({
            ...valuesFormEdicion,
            id: centroAEditar.id,
            nombre: centroAEditar.nombre || '',
            categoria: centroAEditar.categoria || '',
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
            variacion: centroAEditar.horario.variacion || '',
            tipo: centroAEditar.horario.tipo,
            numeroTrabajadores: centroAEditar.trabajadores.cantidad,
            datosTrabajadores: arrayTr,
            datosSuplentes: arraySu,
            computo: centroAEditar.horario.computo,
            mensualPactado: centroAEditar.horario.mensualPactado,
            precioHora_L: centroAEditar.horario.precioHora_L,
            precioHora_C: centroAEditar.horario.precioHora_C,
            precioHora_E: centroAEditar.horario.precioHora_E,
            precioHora_I: centroAEditar.horario.precioHora_I,
            precioHora_Z: centroAEditar.horario.precioHora_Z,
            precioHora_T: centroAEditar.horario.precioHora_T,
            precioHora_P: centroAEditar.horario.precioHora_P,
        });
        if (centroAEditar.horario.tipo === "rango") {
            let arrayValoresTimePicker1 = [];
            let arrayValoresTimePicker2 = [];
            let arrayValoresTimePickerT = [];
            for (let i = 0; i < centroAEditar.horario.tipoRegistroTrabajador.length; i++) {
                let objetoValoresTimePicker1 = {};
                let objetoValoresTimePicker2 = {};
                let objetoValoresTimePickerT = {};
                objetoValoresTimePicker1['lunes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicioRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicioRango) : null);
                objetoValoresTimePicker2['lunes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesFinRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].lunesFinRango) : null);
                objetoValoresTimePickerT['lunesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
                objetoValoresTimePicker1['martes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesInicioRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].martesInicioRango) : null);
                objetoValoresTimePicker2['martes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesFinRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].martesFinRango) : null);
                objetoValoresTimePickerT['martesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
                objetoValoresTimePicker1['miercoles'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicioRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicioRango) : null);
                objetoValoresTimePicker2['miercoles'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFinRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFinRango) : null);
                objetoValoresTimePickerT['miercolesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
                objetoValoresTimePicker1['jueves'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicioRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicioRango) : null);
                objetoValoresTimePicker2['jueves'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesFinRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].juevesFinRango) : null);
                objetoValoresTimePickerT['juevesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
                objetoValoresTimePicker1['viernes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicioRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicioRango) : null);
                objetoValoresTimePicker2['viernes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesFinRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].viernesFinRango) : null);
                objetoValoresTimePickerT['viernesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
                objetoValoresTimePicker1['sabado'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicioRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicioRango) : null);
                objetoValoresTimePicker2['sabado'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFinRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFinRango) : null);
                objetoValoresTimePickerT['sabadoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
                objetoValoresTimePicker1['domingo'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicioRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicioRango) : null);
                objetoValoresTimePicker2['domingo'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoFinRango ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].domingoFinRango) : null);
                objetoValoresTimePickerT['domingoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
                arrayValoresTimePicker1.push(objetoValoresTimePicker1);
                arrayValoresTimePicker2.push(objetoValoresTimePicker2);
                arrayValoresTimePickerT.push(objetoValoresTimePickerT);
            };
            setValueTimePickerInicioEdicion(arrayValoresTimePicker1);
            setValueTimePickerFinEdicion(arrayValoresTimePicker2);
            setValueTipoServicioEdicion(arrayValoresTimePickerT);
        };
        if (centroAEditar.horario.tipo === "cantidad") {
            let arrayValoresTimePicker1 = [];
            let arrayValoresTimePickerT = [];
            for (let i = 0; i < centroAEditar.horario.tipoRegistroTrabajador.length; i++) {
                let objetoValoresTimePicker1 = {};
                let objetoValoresTimePickerT = {};
                objetoValoresTimePicker1['lunes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesCantidad ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].lunesCantidad : '');
                objetoValoresTimePickerT['lunesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
                objetoValoresTimePicker1['martes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesCantidad ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].martesCantidad : '');
                objetoValoresTimePickerT['martesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
                objetoValoresTimePicker1['miercoles'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesCantidad ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].miercolesCantidad : '');
                objetoValoresTimePickerT['miercolesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
                objetoValoresTimePicker1['jueves'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesCantidad ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].juevesCantidad : '');
                objetoValoresTimePickerT['juevesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
                objetoValoresTimePicker1['viernes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesCantidad ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].viernesCantidad : '');
                objetoValoresTimePickerT['viernesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
                objetoValoresTimePicker1['sabado'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoCantidad ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].sabadoCantidad : '');
                objetoValoresTimePickerT['sabadoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
                objetoValoresTimePicker1['domingo'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoCantidad ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].domingoCantidad : '');
                objetoValoresTimePickerT['domingoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
                arrayValoresTimePicker1.push(objetoValoresTimePicker1);
                arrayValoresTimePickerT.push(objetoValoresTimePickerT);
            };
            setValueCantidadHorasEdicion(arrayValoresTimePicker1);
            setValueTipoServicioEdicion(arrayValoresTimePickerT);
        };
        if (centroAEditar.horario.tipo === "rangoDescanso") {
            let arrayValoresTimePicker1 = [];
            let arrayValoresTimePicker2 = [];
            let arrayValoresTimePicker3 = [];
            let arrayValoresTimePicker4 = [];
            let arrayValoresTimePickerT = [];
            for (let i = 0; i < centroAEditar.horario.tipoRegistroTrabajador.length; i++) {
                let objetoValoresTimePicker1 = {};
                let objetoValoresTimePicker2 = {};
                let objetoValoresTimePicker3 = {};
                let objetoValoresTimePicker4 = {};
                let objetoValoresTimePickerT = {};
                objetoValoresTimePicker1['lunes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso) : null);
                objetoValoresTimePicker2['lunes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso) : null);
                objetoValoresTimePicker3['lunes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso) : null);
                objetoValoresTimePicker4['lunes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso) : null);
                objetoValoresTimePickerT['lunesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
                objetoValoresTimePicker1['martes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso) : null);
                objetoValoresTimePicker2['martes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso) : null);
                objetoValoresTimePicker3['martes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso) : null);
                objetoValoresTimePicker4['martes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso) : null);
                objetoValoresTimePickerT['martesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
                objetoValoresTimePicker1['miercoles'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso) : null);
                objetoValoresTimePicker2['miercoles'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso) : null);
                objetoValoresTimePicker3['miercoles'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso) : null);
                objetoValoresTimePicker4['miercoles'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso) : null);
                objetoValoresTimePickerT['miercolesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
                objetoValoresTimePicker1['jueves'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso) : null);
                objetoValoresTimePicker2['jueves'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso) : null);
                objetoValoresTimePicker3['jueves'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso) : null);
                objetoValoresTimePicker4['jueves'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso) : null);
                objetoValoresTimePickerT['juevesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
                objetoValoresTimePicker1['viernes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso) : null);
                objetoValoresTimePicker2['viernes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso) : null);
                objetoValoresTimePicker3['viernes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso) : null);
                objetoValoresTimePicker4['viernes'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso) : null);
                objetoValoresTimePickerT['viernesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
                objetoValoresTimePicker1['sabado'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso) : null);
                objetoValoresTimePicker2['sabado'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso) : null);
                objetoValoresTimePicker3['sabado'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso) : null);
                objetoValoresTimePicker4['sabado'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso) : null);
                objetoValoresTimePickerT['sabadoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
                objetoValoresTimePicker1['domingo'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso) : null);
                objetoValoresTimePicker2['domingo'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso) : null);
                objetoValoresTimePicker3['domingo'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso) : null);
                objetoValoresTimePicker4['domingo'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso ?
                    generaFecha(centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso) : null);
                objetoValoresTimePickerT['domingoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                    centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
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
        for (let i = 0; i < centroAEditar.horario.tipoRegistroTrabajador.length; i++) {
            let objetoValoresHorario = {};
            objetoValoresHorario['lunesInicioRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicioRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicioRango : null);
            objetoValoresHorario['lunesFinRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesFinRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesFinRango : null);
            objetoValoresHorario['martesInicioRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesInicioRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesInicioRango : null);
            objetoValoresHorario['martesFinRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesFinRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesFinRango : null);
            objetoValoresHorario['miercolesInicioRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicioRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicioRango : null);
            objetoValoresHorario['miercolesFinRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFinRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFinRango : null);
            objetoValoresHorario['juevesInicioRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicioRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicioRango : null);
            objetoValoresHorario['juevesFinRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesFinRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesFinRango : null);
            objetoValoresHorario['viernesInicioRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicioRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicioRango : null);
            objetoValoresHorario['viernesFinRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesFinRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesFinRango : null);
            objetoValoresHorario['sabadoInicioRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicioRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicioRango : null);
            objetoValoresHorario['sabadoFinRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFinRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFinRango : null);
            objetoValoresHorario['domingoInicioRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicioRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicioRango : null);
            objetoValoresHorario['domingoFinRango'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoFinRango ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoFinRango : null);
            objetoValoresHorario['lunesInicio1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio1RangoDescanso : null);
            objetoValoresHorario['lunesFin1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin1RangoDescanso : null);
            objetoValoresHorario['lunesInicio2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesInicio2RangoDescanso : null);
            objetoValoresHorario['lunesFin2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesFin2RangoDescanso : null);
            objetoValoresHorario['martesInicio1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio1RangoDescanso : null);
            objetoValoresHorario['martesFin1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesFin1RangoDescanso : null);
            objetoValoresHorario['martesInicio2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesInicio2RangoDescanso : null);
            objetoValoresHorario['martesFin2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesFin2RangoDescanso : null);
            objetoValoresHorario['miercolesInicio1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio1RangoDescanso : null);
            objetoValoresHorario['miercolesFin1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin1RangoDescanso : null);
            objetoValoresHorario['miercolesInicio2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesInicio2RangoDescanso : null);
            objetoValoresHorario['miercolesFin2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesFin2RangoDescanso : null);
            objetoValoresHorario['juevesInicio1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio1RangoDescanso : null);
            objetoValoresHorario['juevesFin1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin1RangoDescanso : null);
            objetoValoresHorario['juevesInicio2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesInicio2RangoDescanso : null);
            objetoValoresHorario['juevesFin2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesFin2RangoDescanso : null);
            objetoValoresHorario['viernesInicio1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio1RangoDescanso : null);
            objetoValoresHorario['viernesFin1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin1RangoDescanso : null);
            objetoValoresHorario['viernesInicio2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesInicio2RangoDescanso : null);
            objetoValoresHorario['viernesFin2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesFin2RangoDescanso : null);
            objetoValoresHorario['sabadoInicio1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio1RangoDescanso : null);
            objetoValoresHorario['sabadoFin1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin1RangoDescanso : null);
            objetoValoresHorario['sabadoInicio2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoInicio2RangoDescanso : null);
            objetoValoresHorario['sabadoFin2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoFin2RangoDescanso : null);
            objetoValoresHorario['domingoInicio1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio1RangoDescanso : null);
            objetoValoresHorario['domingoFin1RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin1RangoDescanso : null);
            objetoValoresHorario['domingoInicio2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoInicio2RangoDescanso : null);
            objetoValoresHorario['domingoFin2RangoDescanso'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoFin2RangoDescanso : null);
            objetoValoresHorario['lunesCantidad'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesCantidad ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesCantidad : '');
            objetoValoresHorario['martesCantidad'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesCantidad ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesCantidad : '');
            objetoValoresHorario['miercolesCantidad'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesCantidad ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesCantidad : '');
            objetoValoresHorario['juevesCantidad'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesCantidad ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesCantidad : '');
            objetoValoresHorario['viernesCantidad'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesCantidad ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesCantidad : '');
            objetoValoresHorario['sabadoCantidad'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoCantidad ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoCantidad : '');
            objetoValoresHorario['domingoCantidad'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoCantidad ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoCantidad : '');
            objetoValoresHorario['lunesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio ?
                centroAEditar.horario.tipoRegistroTrabajador[i].lunesTipoServicio : '');
            objetoValoresHorario['martesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio ?
                centroAEditar.horario.tipoRegistroTrabajador[i].martesTipoServicio : '');
            objetoValoresHorario['miercolesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio ?
                centroAEditar.horario.tipoRegistroTrabajador[i].miercolesTipoServicio : '');
            objetoValoresHorario['juevesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio ?
                centroAEditar.horario.tipoRegistroTrabajador[i].juevesTipoServicio : '');
            objetoValoresHorario['viernesTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio ?
                centroAEditar.horario.tipoRegistroTrabajador[i].viernesTipoServicio : '');
            objetoValoresHorario['sabadoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio ?
                centroAEditar.horario.tipoRegistroTrabajador[i].sabadoTipoServicio : '');
            objetoValoresHorario['domingoTipoServicio'] = (centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio ?
                centroAEditar.horario.tipoRegistroTrabajador[i].domingoTipoServicio : '');
            arrayValoresHorario.push(objetoValoresHorario);
        };
        setHorarioIntervencionEdicion({
            tipo: centroAEditar.horario.tipo,
            variacion: centroAEditar.horario.variacion,
            tipoRegistro: centroAEditar.horario.tipoRegistro,
            tipoRegistroTrabajador: arrayValoresHorario
        });
        setTrabajadoresEdicion({
            ...trabajadoresEdicion,
            cantidad: centroAEditar.trabajadores.cantidad,
            trabajadores: centroAEditar.trabajadores.trabajadores
        });
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

    //funciones

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
            setEstamosCargandoDatos(true);
            setValuesAutocompleteCentrosValores(values)
            dispatch(obtenerCentroAccion('centros', values.id));
            dispatch(activarDesactivarAccion(false));
        } else {
            dispatch(activarDesactivarAccion(true));
            dispatch(activarDesactivarActualizarCentroAccion(true));
            dispatch(registrarIntervencionAccion(true));
            reseteaContenidoEdicion();
        }
    };

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
    };

    const handleChangeFormEdicion = (prop) => (e) => {
        if (prop === "variacion") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, variacion: e.target.value });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "computo") {
            setValuesFormEdicion({
                ...valuesFormEdicion, [prop]: e.target.value,
                mensualPactado: null,
                precioHora_L: null,
                precioHora_C: null,
                precioHora_E: null,
                precioHora_I: null,
                precioHora_Z: null,
                precioHora_T: null,
                precioHora_P: null
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
            prop === "precioHora_C" ||
            prop === "precioHora_E" ||
            prop === "precioHora_I" ||
            prop === "precioHora_Z" ||
            prop === "precioHora_T" ||
            prop === "precioHora_P"
        ) {
            if (IsNumeric(e.target.value)) {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
                dispatch(activarDesactivarActualizarCentroAccion(false));
            }
            return;
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

    const handleChangeFormEdicionSelectsTrabajadores = (tipo, index) => (e) => {
        let encontrado = false;
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
                if (valueTimePickerFinEdicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinEdicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinEdicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinEdicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinEdicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinEdicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinEdicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion[idIndex].domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso1Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso2Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso1Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso2Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso1Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso2Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso1Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso2Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso1Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso2Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso1Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso2Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso1Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion[idIndex].domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerFinDescanso2Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion[idIndex].domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioEdicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioEdicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioEdicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioEdicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioEdicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioEdicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioEdicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso1Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso2Edicion[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso1Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso2Edicion[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso1Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso2Edicion[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso1Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso2Edicion[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso1Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso2Edicion[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso1Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso2Edicion[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso1Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
                if (valueTimePickerInicioDescanso2Edicion[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion[idIndex].domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
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
    const descripcionDialog = "Para confirmar pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo'."

    const handleClickOpenDialog = () => {
        dispatch(abreObjetoDialogAccion('2'));
    };

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(eliminarCentroAccion('centros', valuesFormEdicion.id));
            //setTimeout(function(){ window.location.reload(); }, 1500);
            dispatch(activarDesactivarAccion(true));
            reseteaContenidoEdicion();
        }
        dispatch(cierraObjetoDialogAccion());
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
                        if (valuesFormEdicion.nombre === '' ||
                            valuesFormEdicion.categoria === '' ||
                            valuesFormEdicion.variacion === '' ||
                            valuesFormEdicion.formaPago === '' ||
                            valuesFormEdicion.tipo === '' ||
                            valuesFormEdicion.numeroTrabajadores === ''
                        ) {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };
                        if (valuesFormEdicion.computo === '' ||
                            (valuesFormEdicion.computo === 1 && !valuesFormEdicion.mensualPactado) ||
                            (valuesFormEdicion.computo === 2 &&
                                !valuesFormEdicion.precioHora_L &&
                                !valuesFormEdicion.precioHora_C &&
                                !valuesFormEdicion.precioHora_E &&
                                !valuesFormEdicion.precioHora_I &&
                                !valuesFormEdicion.precioHora_Z &&
                                !valuesFormEdicion.precioHora_T &&
                                !valuesFormEdicion.precioHora_P) ||
                            (valuesFormEdicion.computo === 3 && (
                                !valuesFormEdicion.precioHora_L &&
                                !valuesFormEdicion.precioHora_C &&
                                !valuesFormEdicion.precioHora_E &&
                                !valuesFormEdicion.precioHora_I &&
                                !valuesFormEdicion.precioHora_Z &&
                                !valuesFormEdicion.precioHora_T &&
                                !valuesFormEdicion.precioHora_P &&
                                !valuesFormEdicion.mensualPactado))) {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };
                        if (valuesFormEdicion.computo === 3 && ((
                            valuesFormEdicion.precioHora_L ||
                            valuesFormEdicion.precioHora_C ||
                            valuesFormEdicion.precioHora_E ||
                            valuesFormEdicion.precioHora_I ||
                            valuesFormEdicion.precioHora_Z ||
                            valuesFormEdicion.precioHora_T ||
                            valuesFormEdicion.precioHora_P) && valuesFormEdicion.mensualPactado)) {
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
                                if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'CRIS' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'CRIS' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'CRIS' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'CRIS' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'CRIS' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'CRIS' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'CRIS')
                                    && !valuesFormEdicion.precioHora_C) {
                                    setAlert({
                                        mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                        tipo: 'error'
                                    })
                                    setOpenSnack(true);
                                    return;
                                };
                                if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'CRISE' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'CRISE' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'CRISE' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'CRISE' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'CRISE' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'CRISE' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'CRISE')
                                    && !valuesFormEdicion.precioHora_E) {
                                    setAlert({
                                        mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                        tipo: 'error'
                                    })
                                    setOpenSnack(true);
                                    return;
                                };
                                if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'CRISI' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'CRISI' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'CRISI' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'CRISI' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'CRISI' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'CRISI' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'CRISI')
                                    && !valuesFormEdicion.precioHora_I) {
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
                                    && !valuesFormEdicion.precioHora_Z) {
                                    setAlert({
                                        mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                        tipo: 'error'
                                    })
                                    setOpenSnack(true);
                                    return;
                                };
                                if ((horarioIntervencionEdicion.tipoRegistroTrabajador[i].lunesTipoServicio === 'TOL' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].martesTipoServicio === 'TOL' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].miercolesTipoServicio === 'TOL' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].juevesTipoServicio === 'TOL' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].viernesTipoServicio === 'TOL' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].sabadoTipoServicio === 'TOL' ||
                                    horarioIntervencionEdicion.tipoRegistroTrabajador[i].domingoTipoServicio === 'TOL')
                                    && !valuesFormEdicion.precioHora_T) {
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
                            }
                        };

                        //validacion mail
                        if (valuesFormEdicion.mail) {
                            const validacionMail = dispatch(validarMailAccion(valuesFormEdicion.mail));
                            if (!validacionMail) {
                                setAlert({
                                    mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                        }
                        if (valuesFormEdicion.mail2) {
                            const validacionMail2 = dispatch(validarMailAccion(valuesFormEdicion.mail2));
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
                                tipoRegistroTrabajador: elArrayTipoRegistroTrabajador
                            };
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
                        if (valuesFormEdicion.precioHora_C) {
                            elHorarioIntervencionEditadoRevisado['precioHora_C'] = parseFloat(valuesFormEdicion.precioHora_C);
                        };
                        if (valuesFormEdicion.precioHora_E) {
                            elHorarioIntervencionEditadoRevisado['precioHora_E'] = parseFloat(valuesFormEdicion.precioHora_E);
                        };
                        if (valuesFormEdicion.precioHora_I) {
                            elHorarioIntervencionEditadoRevisado['precioHora_I'] = parseFloat(valuesFormEdicion.precioHora_I);
                        };
                        if (valuesFormEdicion.precioHora_Z) {
                            elHorarioIntervencionEditadoRevisado['precioHora_Z'] = parseFloat(valuesFormEdicion.precioHora_Z);
                        };
                        if (valuesFormEdicion.precioHora_T) {
                            elHorarioIntervencionEditadoRevisado['precioHora_T'] = parseFloat(valuesFormEdicion.precioHora_T);
                        };
                        if (valuesFormEdicion.precioHora_P) {
                            elHorarioIntervencionEditadoRevisado['precioHora_P'] = parseFloat(valuesFormEdicion.precioHora_P);
                        };

                        //registramos
                        const centroAGuardar = {
                            id: valuesFormEdicion.id,
                            nombre: valuesFormEdicion.nombre,
                            categoria: valuesFormEdicion.categoria,
                            codigo: valuesFormEdicion.codigo ? valuesFormEdicion.codigo : null,
                            domicilio: valuesFormEdicion.domicilio ? valuesFormEdicion.domicilio : null,
                            codigo_postal: valuesFormEdicion.codigoPostal ? valuesFormEdicion.codigoPostal : null,
                            poblacion: valuesFormEdicion.poblacion ? valuesFormEdicion.poblacion : null,
                            provincia: valuesFormEdicion.provincia ? valuesFormEdicion.provincia : null,
                            nif: valuesFormEdicion.nif ? valuesFormEdicion.nif : null,
                            mail: valuesFormEdicion.mail ? valuesFormEdicion.mail : null,
                            mail_2: valuesFormEdicion.mail2 ? valuesFormEdicion.mail2 : null,
                            telefono: valuesFormEdicion.telefono ? valuesFormEdicion.telefono : null,
                            telefono_2: valuesFormEdicion.telefono2 ? valuesFormEdicion.telefono2 : null,
                            forma_pago: valuesFormEdicion.formaPago,
                            horario: JSON.stringify(elHorarioIntervencionEditadoRevisado),
                            trabajadores: JSON.stringify(trabajadoresEdicion)
                        };
                        dispatch(actualizarCentroAccion('centros', centroAGuardar.id, centroAGuardar));
                        dispatch(registrarIntervencionAccion(true));
                        dispatch(activarDesactivarActualizarCentroAccion(true));
                    };
                    procesarDatosEdicion();
                    break;
                default:
            }
        }
    }));
    const reseteaContenidoEdicion = () => {
        setEstamosCargandoDatos(true);
        forceUpdate();
        setValuesAutocompleteCentrosValores(null);
        setValuesFormEdicion({
            id: null,
            nombre: '',
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
            variacion: '',
            tipo: '',
            numeroTrabajadores: '',
            datosTrabajadores: [],
            datosSuplentes: [],
            computo: '',
            mensualPactado: null,
            precioHora_L: null,
            precioHora_C: null,
            precioHora_E: null,
            precioHora_I: null,
            precioHora_Z: null,
            precioHora_T: null,
            precioHora_P: null,
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
        setHorarioIntervencionEdicion({
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
        setTrabajadoresEdicion({
            cantidad: '',
            trabajadores: []
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
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={clsx(classes.boxStl2, classes.mb20)}
                            >
                                Datos generales
                            </Box>
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
                                    value={valuesFormEdicion.nombre}
                                    onChange={handleChangeFormEdicion('nombre')}
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
                                    value={valuesFormEdicion.categoria}
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
                                            value={valuesFormEdicion.codigo}
                                            onChange={handleChangeFormEdicion('codigo')}
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
                                            value={valuesFormEdicion.nif}
                                            onChange={handleChangeFormEdicion('nif')}
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
                                    value={valuesFormEdicion.mail}
                                    onChange={handleChangeFormEdicion('mail')}
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
                                    value={valuesFormEdicion.mail2}
                                    onChange={handleChangeFormEdicion('mail2')}
                                    labelWidth={65}
                                    disabled={disabledItem}
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
                                    id="form-domicilio-centro-edicion"
                                    value={valuesFormEdicion.domicilio}
                                    onChange={handleChangeFormEdicion('domicilio')}
                                    labelWidth={70}
                                    disabled={disabledItem}
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
                                    id="form-poblacion-centro-edicion"
                                    value={valuesFormEdicion.poblacion}
                                    onChange={handleChangeFormEdicion('poblacion')}
                                    labelWidth={75}
                                    disabled={disabledItem}
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
                                            id="form-provincia-centro-edicion"
                                            value={valuesFormEdicion.provincia}
                                            onChange={handleChangeFormEdicion('provincia')}
                                            labelWidth={75}
                                            disabled={disabledItem}
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
                                            id="form-codigoPostal-centro-edicion"
                                            value={valuesFormEdicion.codigoPostal}
                                            onChange={handleChangeFormEdicion('codigoPostal')}
                                            labelWidth={105}
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
                                            value={valuesFormEdicion.telefono}
                                            onChange={handleChangeFormEdicion('telefono')}
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
                                            className={classes.mb25}
                                            fullWidth
                                            id="form-telefono2-centro-edicion"
                                            value={valuesFormEdicion.telefono2}
                                            onChange={handleChangeFormEdicion('telefono2')}
                                            labelWidth={80}
                                            disabled={disabledItem}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box
                                m={0.5}
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={clsx(classes.boxStl2, classes.mb20)}
                            >
                                Trabajadores
                            </Box>
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
                    <Grid item lg={8} sm={6} xs={12}>
                        <Box
                            m={0.5}
                            bgcolor="secondary.light"
                            color="secondary.contrastText"
                            className={clsx(classes.boxStl2, classes.mb20)}
                        >
                            Horario de intervención
                        </Box>
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
                                        id="form-variaciones-edicion"
                                        label="Variaciones"
                                        value={valuesFormEdicion.variacion}
                                        onChange={handleChangeFormEdicion('variacion')}
                                        helpertext="Selecciona variaciones"
                                        disabled={disabledItem}
                                    >
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
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={clsx(classes.boxStl2, classes.mb20)}
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
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora CRIS</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_C-edicion"
                                                value={valuesFormEdicion.precioHora_C || ''}
                                                onChange={handleChangeFormEdicion('precioHora_C')}
                                                labelWidth={125}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora CRISE</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_E-edicion"
                                                value={valuesFormEdicion.precioHora_E || ''}
                                                onChange={handleChangeFormEdicion('precioHora_E')}
                                                labelWidth={130}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora CRISI</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_I-edicion"
                                                value={valuesFormEdicion.precioHora_I || ''}
                                                onChange={handleChangeFormEdicion('precioHora_I')}
                                                labelWidth={130}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora LIME</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_Z-edicion"
                                                value={valuesFormEdicion.precioHora_Z || ''}
                                                onChange={handleChangeFormEdicion('precioHora_Z')}
                                                labelWidth={125}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora TOL</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_T-edicion"
                                                value={valuesFormEdicion.precioHora_T || ''}
                                                onChange={handleChangeFormEdicion('precioHora_T')}
                                                labelWidth={120}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
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
                                                labelWidth={125}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                    </Fragment>
                                ) : null}
                                <Box
                                    m={0.5}
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={clsx(classes.boxStl2, classes.mb20, classes.mt15)}
                                >
                                    Forma de pago
                                </Box>
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
                                        value={valuesFormEdicion.formaPago || ''}
                                        onChange={handleChangeFormEdicion('formaPago')}
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
                            </Grid>
                            <Grid item lg={8} sm={8} xs={12}>
                                <Box style={{ marginTop: -10 }}>
                                    {valuesFormEdicion.tipo !== '' ? (
                                        <Box
                                            m={0.5}
                                            bgcolor="secondary.light"
                                            color="secondary.contrastText"
                                            className={clsx(classes.boxStl2, classes.mb10, classes.mt15)}
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
                                                            onChange={handleChangeSwitchTipoRegistroEdicion}
                                                        />
                                                    }
                                                    label={<Typography variant="body2">Común/Individual</Typography>}
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
            {/* {console.log('estamoscargando: ',estamosCargandoDatos)} */}
        </div>
    )
})

export default CentrosEditar
