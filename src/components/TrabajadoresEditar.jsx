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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFnsUtils from '@date-io/date-fns';
import { es } from "date-fns/locale";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';

//carga componentes
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { actualizarTrabajadorAccion } from '../redux/trabajadoresDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { eliminarTrabajadorAccion } from '../redux/trabajadoresDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { obtenerCentroVinculadoAccion } from '../redux/trabajadoresDucks';
import { retornaAnoMesDiaAccion } from '../redux/appDucks';
import { activarDesactivarActualizarTrabajadorAccion } from '../redux/trabajadoresDucks';
import { retornaAnoMesAccion } from '../redux/appDucks';
import { retornaFechaEnBaseAAnoMesDiaAccion } from '../redux/appDucks';
import { resetearCentrosVinculadosAccion } from '../redux/trabajadoresDucks';

//constantes
const estados = Constantes.ESTADO_LABORAL_TRABAJADOR;
const subcategorias = Constantes.SUBCATEGORIAS_TRABAJADORES;

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TrabajadoresEditar = forwardRef((props, ref) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const trabajadorAEditar = useSelector(store => store.variablesTrabajadores.objetoTrabajador);
    const openLoading = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const exitoActualizacionTrabajador = useSelector(store => store.variablesTrabajadores.exitoActualizacionTrabajador);
    const exitoEliminarTrabajador = useSelector(store => store.variablesTrabajadores.exitoEliminarTrabajador);
    const disabledItem = useSelector(store => store.variablesApp.estadoActivadoDesactivado);
    const openDialog2 = useSelector(store => store.variablesApp.openDialog[1]);
    const centrosVinculadoTrabajador = useSelector(store => store.variablesTrabajadores.objetoCentroVinculadoTrabajador);
    const centrosVinculadoSuplente = useSelector(store => store.variablesTrabajadores.objetoCentroVinculadoSuplente);

    //states

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openSnack, setOpenSnack] = useState(false);
    const [valuesAutocompleteTrabajadoresValores, setValuesAutocompleteTrabajadoresValores] = useState(null);
    const [alert, setAlert] = useState({});
    const [valuesFormEdicion, setValuesFormEdicion] = useState({
        id: null,
        nombre: '',
        categoria: '',
        dni: '',
        segSocial: '',
        telefono: '',
        estado: ''
    });
    const [disabledAccordionTrabajadores, setDisabledAccordionTrabajadores] = useState(true);
    const [disabledAccordionSuplentes, setDisabledAccordionSuplentes] = useState(true);
    const [valueDatePickerInicioEdicion, setValueDatePickerInicioEdicion] = useState(null);
    const [valueDatePickerFinEdicion, setValueDatePickerFinEdicion] = useState(null);
    const [datosEstadoEdicion, setDatosEstadoEdicion] = useState({
        inicioBajaIT: null,
        finBajaIT: null,
        inicioBajaACCTE: null,
        finBajaACCTE: null,
        inicioBajaCIA: null,
        finBajaCIA: null,
        inicioVacaciones: null,
        finVacaciones: null,
        inicioExcedencia: null,
        finExcedencia: null,
        inicioPersonales: null,
        finPersonales: null,
        inicioPermiso: null,
        finPermiso: null,
        inicioAusencia: null,
        finAusencia: null,
        observaciones: ''
    });
    const [historicoBajasEdicion, setHistoricoBajasEdicion] = useState(null);
    const [losCentrosVinculadosTrabajador, setLosCentrosVinculadosTrabajador] = useState([]);
    const [losCentrosVinculadosSuplente, setLosCentrosVinculadosSuplente] = useState([]);
    const [visibleCentros, setVisibleCentros] = useState(false);

    //useEffect

    useEffect(() => {
        //dispatch(vaciarDatosTrabajadoresAccion());
        dispatch(onEstemAccion('editarTrabajadores'));
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        };
    }, [dispatch]);

    useEffect(() => {
        if (errorDeCargaTrabajadores) {
            setAlert({
                mensaje: "Error de conexi??n con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores]);

    useEffect(() => {
        if (props.prVenimosTrabajadorFuera) {
            setValuesAutocompleteTrabajadoresValores(props.prVenimosTrabajadorFuera);
            dispatch(obtenerTrabajadorAccion('trabajadores', props.prVenimosTrabajadorFuera.id));
            dispatch(activarDesactivarAccion(false));
            setVisibleCentros(true);
        }
    }, [props.prVenimosTrabajadorFuera]);

    useEffect(() => {
        if (exitoActualizacionTrabajador) {
            setAlert({
                mensaje: "Registro actualizado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoActualizacionTrabajador]);

    useEffect(() => {
        if (exitoEliminarTrabajador) {
            setAlert({
                mensaje: "Registro eliminado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoEliminarTrabajador]);

    useEffect(() => {
        setValuesFormEdicion({
            ...valuesFormEdicion,
            id: trabajadorAEditar.id,
            nombre: trabajadorAEditar.nombre,
            dni: trabajadorAEditar.dni,
            segSocial: trabajadorAEditar.segSocial,
            telefono: trabajadorAEditar.telefono,
            estado: trabajadorAEditar.estado,
            categoria: trabajadorAEditar.categoria
        });
        setDatosEstadoEdicion({
            inicioBajaIT: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioBajaIT ? trabajadorAEditar.datosEstado.inicioBajaIT : null,
            finBajaIT: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finBajaIT ? trabajadorAEditar.datosEstado.finBajaIT : null,
            inicioBajaACCTE: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioBajaACCTE ? trabajadorAEditar.datosEstado.inicioBajaACCTE : null,
            finBajaACCTE: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finBajaACCTE ? trabajadorAEditar.datosEstado.finBajaACCTE : null,
            inicioBajaCIA: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioBajaCIA ? trabajadorAEditar.datosEstado.inicioBajaCIA : null,
            finBajaCIA: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finBajaCIA ? trabajadorAEditar.datosEstado.finBajaCIA : null,
            inicioVacaciones: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioVacaciones ? trabajadorAEditar.datosEstado.inicioVacaciones : null,
            finVacaciones: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finVacaciones ? trabajadorAEditar.datosEstado.finVacaciones : null,
            inicioExcedencia: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioExcedencia ? trabajadorAEditar.datosEstado.inicioExcedencia : null,
            finExcedencia: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finExcedencia ? trabajadorAEditar.datosEstado.finExcedencia : null,
            inicioPersonales: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioPersonales ? trabajadorAEditar.datosEstado.inicioPersonales : null,
            finPersonales: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finPersonales ? trabajadorAEditar.datosEstado.finPersonales : null,
            inicioPermiso: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioPermiso ? trabajadorAEditar.datosEstado.inicioPermiso : null,
            finPermiso: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finPermiso ? trabajadorAEditar.datosEstado.finPermiso : null,
            inicioAusencia: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.inicioAusencia ? trabajadorAEditar.datosEstado.inicioAusencia : null,
            finAusencia: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.finAusencia ? trabajadorAEditar.datosEstado.finAusencia : null,
            observaciones: trabajadorAEditar.datosEstado && trabajadorAEditar.datosEstado.observaciones ? trabajadorAEditar.datosEstado.observaciones : ''
        });
        switch (trabajadorAEditar.estado) {
            case 'bajaIT':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioBajaIT);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finBajaIT);
                break;
            case 'bajaACCTE':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioBajaACCTE);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finBajaACCTE);
                break;
            case 'bajaCIA':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioBajaCIA);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finBajaCIA);
                break;
            case 'vacaciones':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioVacaciones);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finVacaciones);
                break;
            case 'excedencia':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioExcedencia);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finExcedencia);
                break;
            case 'personales':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioPersonales);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finPersonales);
                break;
            case 'permisoRET':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioPermiso);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finPermiso);
                break;
            case 'ausenciaINJ':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioAusencia);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finAusencia);
                break;
            default:
        };
        setHistoricoBajasEdicion(trabajadorAEditar.historicoBajas);
    }, [trabajadorAEditar]);

    useEffect(() => {
        if (trabajadorAEditar.id) {
            dispatch(obtenerCentroVinculadoAccion('centros', trabajadorAEditar.id, 'obtenerCentroVinculado', 'trabajador'));
            dispatch(obtenerCentroVinculadoAccion('centros', trabajadorAEditar.id, 'obtenerCentroVinculado', 'suplente'));
        }
    }, [trabajadorAEditar]);

    useEffect(() => {
        setLosCentrosVinculadosTrabajador(centrosVinculadoTrabajador);
        setLosCentrosVinculadosSuplente(centrosVinculadoSuplente);
    }, [centrosVinculadoTrabajador, centrosVinculadoSuplente]);

    useEffect(() => {
        if (losCentrosVinculadosTrabajador.length > 0) {
            setDisabledAccordionTrabajadores(false);
        };
        if (losCentrosVinculadosSuplente.length > 0) {
            setDisabledAccordionSuplentes(false);
        };
    }, [losCentrosVinculadosTrabajador, losCentrosVinculadosSuplente]);

    //funciones

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeSelectTrabajadoresEdicion = (e, values) => {
        if (values) {
            setValuesAutocompleteTrabajadoresValores(values)
            dispatch(obtenerTrabajadorAccion('trabajadores', values.id));
            dispatch(activarDesactivarAccion(false));
            setVisibleCentros(true);
        } else {
            dispatch(activarDesactivarAccion(true));
            dispatch(activarDesactivarActualizarTrabajadorAccion(true));
            dispatch(registrarIntervencionAccion(true));
            reseteaContenidoEdicion();
        }
    };

    const handleChangeFormEdicion = (prop) => (e) => {
        if (prop === "estado") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setDatosEstadoEdicion({
                inicioBajaIT: null,
                finBajaIT: null,
                inicioBajaACCTE: null,
                finBajaACCTE: null,
                inicioBajaCIA: null,
                finBajaCIA: null,
                inicioVacaciones: null,
                finVacaciones: null,
                inicioExcedencia: null,
                finExcedencia: null,
                inicioPersonales: null,
                finPersonales: null,
                inicioPermiso: null,
                finPermiso: null,
                inicioAusencia: null,
                finAusencia: null
            });
            setValueDatePickerInicioEdicion(null);
            setValueDatePickerFinEdicion(null);
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarTrabajadorAccion(false));
            return;
        }
        setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarTrabajadorAccion(false));
    };

    const handleChangeDatePickerInicioEdicion = (newValue) => {
        setValueDatePickerInicioEdicion(newValue);
        switch (valuesFormEdicion.estado) {
            case 'bajaIT':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioBajaIT: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'bajaACCTE':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioBajaACCTE: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'bajaCIA':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioBajaCIA: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'vacaciones':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioVacaciones: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'excedencia':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioExcedencia: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'personales':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioPersonales: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'permisoRET':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioPermiso: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'ausenciaINJ':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioAusencia: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            default:
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarTrabajadorAccion(false));
    };

    const handleChangeDatePickerFinEdicion = (newValue) => {
        if (newValue) {
            const elMes = retornaAnoMesAccion(newValue);
            let inicioRango, finRango;
            switch (valuesFormEdicion.estado) {
                case 'bajaIT':
                    inicioRango = datosEstadoEdicion.inicioBajaIT;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                case 'bajaACCTE':
                    inicioRango = datosEstadoEdicion.inicioBajaACCTE;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                case 'bajaCIA':
                    inicioRango = datosEstadoEdicion.inicioBajaCIA;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                case 'vacaciones':
                    inicioRango = datosEstadoEdicion.inicioVacaciones;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                case 'excedencia':
                    inicioRango = datosEstadoEdicion.inicioExcedencia;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                case 'personales':
                    inicioRango = datosEstadoEdicion.inicioPersonales;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                case 'permisoRET':
                    inicioRango = datosEstadoEdicion.inicioPermiso;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                case 'ausenciaINJ':
                    inicioRango = datosEstadoEdicion.inicioAusencia;
                    finRango = dispatch(retornaAnoMesDiaAccion(newValue));
                    break;
                default:
            };
            const myFechaInicioRango = dispatch(retornaFechaEnBaseAAnoMesDiaAccion(inicioRango));
            const myFechaFinRango = dispatch(retornaFechaEnBaseAAnoMesDiaAccion(finRango));
            myFechaFinRango.setDate(myFechaFinRango.getDate() + 1);
            if (myFechaInicioRango >= myFechaFinRango) {
                setAlert({
                    mensaje: "La fecha de final no puede ser anterior a la fecha de inicio.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            const objetoBajasHistoricoMes = {
                tipo: valuesFormEdicion.estado,
                inicio: dispatch(retornaAnoMesDiaAccion(myFechaInicioRango)),
                fin: dispatch(retornaAnoMesDiaAccion(myFechaFinRango)),
                observaciones: datosEstadoEdicion.observaciones
            };
            let arrayObjetoHistoricoMeses;
            if (historicoBajasEdicion) {
                arrayObjetoHistoricoMeses = [...historicoBajasEdicion.meses];
            } else {
                arrayObjetoHistoricoMeses = [];
            };
            const arrayBajasObjetoHistoricoMes = [];
            arrayBajasObjetoHistoricoMes.push(objetoBajasHistoricoMes);
            const objetoHistoricoRango = {
                mes: elMes,
                baja: arrayBajasObjetoHistoricoMes
            };

            arrayObjetoHistoricoMeses.push(objetoHistoricoRango);
            const objetoHistorico = {
                objeto: 'historico',
                meses: arrayObjetoHistoricoMeses
            };
            setHistoricoBajasEdicion(objetoHistorico);
            setValuesFormEdicion({ ...valuesFormEdicion, estado: 'alta' });
            setDatosEstadoEdicion({
                inicioBajaIT: null,
                finBajaIT: null,
                inicioBajaACCTE: null,
                finBajaACCTE: null,
                inicioBajaCIA: null,
                finBajaCIA: null,
                inicioVacaciones: null,
                finVacaciones: null,
                inicioExcedencia: null,
                finExcedencia: null,
                inicioPersonales: null,
                finPersonales: null,
                inicioPermiso: null,
                finPermiso: null,
                inicioAusencia: null,
                finAusencia: null,
                observaciones: ''
            });
            setValueDatePickerInicioEdicion(null);
            setValueDatePickerFinEdicion(null);

        } else {
            setValueDatePickerFinEdicion(newValue);
            switch (valuesFormEdicion.estado) {
                case 'bajaIT':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finBajaIT: null });
                    break;
                case 'bajaACCTE':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finBajaACCTE: null });
                    break;
                case 'bajaCIA':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finBajaCIA: null });
                    break;
                case 'vacaciones':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finVacaciones: null });
                    break;
                case 'excedencia':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finExcedencia: null });
                    break;
                case 'personales':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finPersonales: null });
                    break;
                case 'permisoRET':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finPermiso: null });
                    break;
                case 'ausenciaINJ':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finAusencia: null });
                    break;
                default:
            };
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarTrabajadorAccion(false));
    };

    const handleChangeObservacionesBaja = () => (e) => {
        setDatosEstadoEdicion({ ...datosEstadoEdicion, observaciones: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarTrabajadorAccion(false));
    };

    const tituloDialog = "??Est??s seguro que quieres eliminar el Trabajador?";
    const descripcionDialog = "Para confirmar pulsa 'De acuerdo', de lo contrario pulsa 'No'."

    const handleClickOpenDialog = () => {
        dispatch(abreObjetoDialogAccion('2'));
    };

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            //setTimeout(function(){ window.location.reload(); }, 1500);
            dispatch(activarDesactivarAccion(true));
            actualizarCentroPorEliminacionTrabajador();
        }
        dispatch(cierraObjetoDialogAccion());
    };

    const actualizarCentroPorEliminacionTrabajador = () => {
        let pasaTrabajador = true;
        let pasaSuplente = true;
        if (losCentrosVinculadosTrabajador.length > 0) {
            pasaTrabajador = false;
        };
        if (losCentrosVinculadosSuplente.length > 0) {
            pasaSuplente = false;
        };
        if (pasaTrabajador === false && pasaSuplente === true) {
            setAlert({
                mensaje: "El trabajador est?? vinculado como trabajador en uno (o m??s) centros. Modifica el centro antes de eliminar al trabajador.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        } else if (pasaTrabajador === true && pasaSuplente === false) {
            setAlert({
                mensaje: "El trabajador est?? vinculado como suplente en uno (o m??s) centros. Modifica el centro antes de eliminar al trabajador.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        } else {
            dispatch(eliminarTrabajadorAccion('trabajadores', valuesFormEdicion.id));
            reseteaContenidoEdicion();
        };
    };

    useImperativeHandle(ref, () => ({
        funcionesEnTrabajadoresEditar(funcion) {
            switch (funcion) {
                case 'eliminarTrabajador':
                    const eliminarTrabajador = () => {
                        handleClickOpenDialog();
                    };
                    eliminarTrabajador();
                    break;
                case 'procesarDatosEdicion':
                    const procesarDatosEdicion = () => {
                        //comprobamos que no haya campos vac??os
                        if (valuesFormEdicion.nombre === '') {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };

                        if (valuesFormEdicion.estado === 'baja' || valuesFormEdicion.estado === 'vacaciones' || valuesFormEdicion.estado === 'excedencia' || valuesFormEdicion.estado === 'personales') {
                            if (!valueDatePickerInicioEdicion && !valueDatePickerFinEdicion) {
                                setAlert({
                                    mensaje: "El rango de fechas del estado laboral est?? incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            }
                        };
                        let losDatosEstadoRevisado = {};
                        let hayDatosEstado = false;
                        if (datosEstadoEdicion.inicioBajaIT) {
                            hayDatosEstado = true;
                            losDatosEstadoRevisado = {
                                inicioBajaIT: datosEstadoEdicion.inicioBajaIT,
                                finBajaIT: datosEstadoEdicion.finBajaIT,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        if (datosEstadoEdicion.inicioBajaACCTE) {
                            hayDatosEstado = true;
                            losDatosEstadoRevisado = {
                                inicioBajaACCTE: datosEstadoEdicion.inicioBajaACCTE,
                                finBajaACCTE: datosEstadoEdicion.finBajaACCTE,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        if (datosEstadoEdicion.inicioBajaCIA) {
                            hayDatosEstado = true;

                            losDatosEstadoRevisado = {
                                inicioBajaCIA: datosEstadoEdicion.inicioBajaCIA,
                                finBajaCIA: datosEstadoEdicion.finBajaCIA,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        if (datosEstadoEdicion.inicioVacaciones) {
                            hayDatosEstado = true;
                            losDatosEstadoRevisado = {
                                inicioVacaciones: datosEstadoEdicion.inicioVacaciones,
                                finVacaciones: datosEstadoEdicion.finVacaciones,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        if (datosEstadoEdicion.inicioExcedencia) {
                            hayDatosEstado = true;
                            losDatosEstadoRevisado = {
                                inicioExcedencia: datosEstadoEdicion.inicioExcedencia,
                                finExcedencia: datosEstadoEdicion.finExcedencia,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        if (datosEstadoEdicion.inicioPersonales) {
                            hayDatosEstado = true;
                            losDatosEstadoRevisado = {
                                inicioPersonales: datosEstadoEdicion.inicioPersonales,
                                finPersonales: datosEstadoEdicion.finPersonales,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        if (datosEstadoEdicion.inicioPermiso) {
                            hayDatosEstado = true;
                            losDatosEstadoRevisado = {
                                inicioPermiso: datosEstadoEdicion.inicioPermiso,
                                finPermiso: datosEstadoEdicion.finPermiso,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        if (datosEstadoEdicion.inicioAusencia) {
                            hayDatosEstado = true;
                            losDatosEstadoRevisado = {
                                inicioAusencia: datosEstadoEdicion.inicioAusencia,
                                finAusencia: datosEstadoEdicion.finAusencia,
                                observaciones: datosEstadoEdicion.observaciones
                            };
                        };
                        //registramos
                        const trabajadorAGuardar = {
                            id: valuesFormEdicion.id,
                            nombre: valuesFormEdicion.nombre,
                            categoria: valuesFormEdicion.categoria ? valuesFormEdicion.categoria : 1,
                            dni: valuesFormEdicion.dni,
                            seg_social: valuesFormEdicion.segSocial,
                            telefono: valuesFormEdicion.telefono,
                            estado: valuesFormEdicion.estado,
                            datos_estado: hayDatosEstado ? JSON.stringify(losDatosEstadoRevisado) : null,
                            historico_bajas: historicoBajasEdicion ? (JSON.stringify(historicoBajasEdicion)) : null
                        };
                        dispatch(actualizarTrabajadorAccion('trabajadores', trabajadorAGuardar.id, trabajadorAGuardar));
                        dispatch(registrarIntervencionAccion(true));
                        dispatch(activarDesactivarActualizarTrabajadorAccion(true));
                    };
                    procesarDatosEdicion();
                    break;
                default:
            }
        }
    }));

    const reseteaContenidoEdicion = () => {
        setVisibleCentros(false);
        //dispatch(obtenerTrabajadoresAccion('trabajadores'));
        forceUpdate();
        setValuesAutocompleteTrabajadoresValores(null);
        setValuesFormEdicion({
            id: null,
            nombre: '',
            categoria: '',
            dni: '',
            segSocial: '',
            telefono: '',
            estado: ''
        });
        setDisabledAccordionTrabajadores(true);
        setDisabledAccordionSuplentes(true);
        setValueDatePickerInicioEdicion(null);
        setValueDatePickerFinEdicion(null);
        setDatosEstadoEdicion({
            inicioBajaIT: null,
            finBajaIT: null,
            inicioBajaACCTE: null,
            finBajaACCTE: null,
            inicioBajaCIA: null,
            finBajaCIA: null,
            inicioVacaciones: null,
            finVacaciones: null,
            inicioExcedencia: null,
            finExcedencia: null,
            inicioPersonales: null,
            finPersonales: null,
            inicioPermiso: null,
            finPermiso: null,
            inicioAusencia: null,
            finAusencia: null,
            observaciones: ''
        });
        setHistoricoBajasEdicion(null);
        dispatch(resetearCentrosVinculadosAccion());
    };

    const generaHistoricoDeBajas = () => {
        if (historicoBajasEdicion) {
            return (
                <Fragment>
                    <Box
                        p={1.5}
                        m={0.5}
                        bgcolor="secondary.light"
                        color="secondary.contrastText"
                        className={classes.mb25}
                    >
                        Hist??rico de bajas
                    </Box>
                    <Box
                        p={0.5}
                        m={0.5}
                    >
                        <Box
                            className={classes.paper}
                        >
                            <List dense={true}>
                                {
                                    historicoBajasEdicion.meses.map((historicoMes, index1) => (
                                        <div key={index1}>
                                            {historicoMes.baja.map((historicoBaja, index2) => (
                                                retornaLineaHistoricoBajas(historicoBaja, historicoMes.mes, index1)
                                            ))}
                                        </div>
                                    ))
                                }
                            </List>
                        </Box>
                    </Box>
                </Fragment>
            )
        } else {
            return null;
        }
    };

    const retornaLineaHistoricoBajas = (linea, mes, index) => {
        let cabeceraTexto, rangoTexto, observacionesTexto;
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        const myFechaInicioRango = dispatch(retornaFechaEnBaseAAnoMesDiaAccion(linea.inicio));
        const textoInicioRango = myFechaInicioRango.toLocaleDateString("es-ES", options);
        const myFechaFinRango = dispatch(retornaFechaEnBaseAAnoMesDiaAccion(linea.fin));
        let myFechaFinRangoFinal = new Date(myFechaFinRango).getTime();
        let dia = 1 * 24 * 60 * 60;
        let fechaResultado = new Date(myFechaFinRangoFinal - dia);
        const textoFinRango = fechaResultado.toLocaleDateString("es-ES", options);
        switch (linea.tipo) {
            case 'bajaIT':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Baja IT el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Baja IT del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            case 'bajaACCTE':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Baja ACCTE el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Baja ACCTE del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            case 'bajaCIA':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Baja CIA el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Baja CIA del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            case 'vacaciones':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Vacaciones el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Vacaciones del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            case 'excedencia':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Excedencia el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Excedencia del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            case 'personales':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Baja por motivos personales el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Baja por motivos personales del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            case 'permisoRET':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Permiso retribuido el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Permiso retribuido del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            case 'ausenciaINJ':
                if (textoInicioRango === textoFinRango) {
                    cabeceraTexto = "Ausencia injustificada el: ";
                    rangoTexto = textoInicioRango;
                } else {
                    cabeceraTexto = "Ausencia injustificada del: ";
                    rangoTexto = textoInicioRango + " al " + textoFinRango;
                };
                break;
            default:
        };
        if (linea.observaciones) {
            observacionesTexto = 'Observaciones: ' + linea.observaciones;
        } else {
            observacionesTexto = '';
        };
        return (
            <ListItem
                key={'listabajas' + index}>
                <ListItemText
                    primary={mes}
                    secondary={
                        <Fragment>
                            <Typography component="span" variant="body2">{cabeceraTexto + rangoTexto}</Typography>
                            {observacionesTexto !== '' ? (
                                <Fragment>
                                    <br />
                                    <Typography component="span" variant="body2">{observacionesTexto}</Typography>
                                </Fragment>
                            ) : null}
                        </Fragment>
                    }>
                </ListItemText>
                <ListItemSecondaryAction>
                    <Tooltip title="Eliminar baja" placement="right" arrow>
                        <IconButton
                            onClick={() => deleteBaja(index)}
                            edge="end"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem >
        )
    };

    const deleteBaja = (index) => {
        let array = [...historicoBajasEdicion.meses];
        array.splice(index, 1);
        const objetoHistorico = {
            objeto: 'historico',
            meses: array
        };
        if (array.length > 0) {
            setHistoricoBajasEdicion(objetoHistorico);
        } else {
            setHistoricoBajasEdicion(null);
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarTrabajadorAccion(false));
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
                    <Grid item lg={4} sm={4} xs={12}>
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
                                    id="form-select-trabajadores"
                                    options={listadoTrabajadores}
                                    onChange={handleChangeSelectTrabajadoresEdicion}
                                    value={valuesAutocompleteTrabajadoresValores || null}
                                    getOptionLabel={(option) => option.nombre ? option.nombre : ''}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Selecciona trabajador" variant="outlined" />}
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
                                    id="form-nombre-trabajador-edicion"
                                    value={valuesFormEdicion.nombre || ''}
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
                                <InputLabel>Subcategoria</InputLabel>
                                <Select
                                    fullWidth
                                    className={classes.mb15}
                                    id="form-subcategoria-edicion"
                                    label="Subcategoria"
                                    value={valuesFormEdicion.categoria === 2 ? valuesFormEdicion.categoria : ''}
                                    onChange={handleChangeFormEdicion('categoria')}
                                    helpertext="Selecciona subcategoria"
                                    disabled={disabledItem}
                                >
                                    <MenuItem value=''>
                                        <em>No</em>
                                    </MenuItem>
                                    {
                                        subcategorias.map((option) => (
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
                                <InputLabel>DNI - NIE</InputLabel>
                                <OutlinedInput
                                    className={classes.mb15}
                                    fullWidth
                                    id="form-telefono-trabajador-edicion"
                                    value={valuesFormEdicion.dni || ''}
                                    onChange={handleChangeFormEdicion('dni')}
                                    labelWidth={65}
                                    disabled={disabledItem}
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                                size="small"
                            >
                                <InputLabel>Seg. Social</InputLabel>
                                <OutlinedInput
                                    className={classes.mb15}
                                    fullWidth
                                    id="form-telefono-trabajador-edicion"
                                    value={valuesFormEdicion.segSocial || ''}
                                    onChange={handleChangeFormEdicion('segSocial')}
                                    labelWidth={90}
                                    disabled={disabledItem}
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                                size="small"
                            >
                                <InputLabel>Tel??fono</InputLabel>
                                <OutlinedInput
                                    className={classes.mb25}
                                    fullWidth
                                    id="form-telefono-trabajador-edicion"
                                    value={valuesFormEdicion.telefono || ''}
                                    onChange={handleChangeFormEdicion('telefono')}
                                    labelWidth={65}
                                    disabled={disabledItem}
                                />
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                        <Box
                            m={0.5}
                            bgcolor="secondary.light"
                            color="secondary.contrastText"
                            className={clsx(classes.boxStl2, classes.mb20)}
                        >
                            Estado laboral
                        </Box>
                        <FormControl
                            variant="outlined"
                            className={classes.form}
                            size="small"
                        >
                            <InputLabel>Estado Trabajador</InputLabel>
                            <Select
                                fullWidth
                                className={classes.mb20}
                                id="form-estado-edicion"
                                label="Estado Trabajador"
                                value={valuesFormEdicion.estado || ''}
                                onChange={handleChangeFormEdicion('estado')}
                                helpertext="Selecciona estado"
                                disabled={disabledItem}
                            >
                                {
                                    estados.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Box px={0.5}>
                            {(valuesFormEdicion.estado === 'bajaIT' || valuesFormEdicion.estado === 'bajaACCTE' || valuesFormEdicion.estado === 'bajaCIA' || valuesFormEdicion.estado === 'excedencia' || valuesFormEdicion.estado === 'vacaciones' || valuesFormEdicion.estado === 'personales' || valuesFormEdicion.estado === 'permisoRET' || valuesFormEdicion.estado === 'ausenciaINJ') ? (
                                <Fragment>
                                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            inputVariant="outlined"
                                            className={classes.mb10}
                                            fullWidth
                                            label={`Fecha inicio ` + valuesFormEdicion.estado}
                                            format="dd/MM/yyyy"
                                            clearable={true}
                                            cancelLabel="Cancelar"
                                            clearLabel="Borrar"
                                            value={valueDatePickerInicioEdicion}
                                            onChange={(newValue) => {
                                                handleChangeDatePickerInicioEdicion(newValue);
                                            }}
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                    <TextField
                                        label="Observaciones"
                                        id="form-observaciones-edicion"
                                        className={classes.mb10}
                                        value={datosEstadoEdicion.observaciones || ''}
                                        fullWidth
                                        placeholder={'Observaciones baja '}
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        onChange={handleChangeObservacionesBaja()}
                                        disabled={valueDatePickerInicioEdicion ? false : true}
                                    />
                                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            inputVariant="outlined"
                                            className={classes.mb20}
                                            fullWidth
                                            label={`Fecha fin ` + valuesFormEdicion.estado}
                                            format="dd/MM/yyyy"
                                            clearable={true}
                                            cancelLabel="Cancelar"
                                            clearLabel="Borrar"
                                            value={valueDatePickerFinEdicion}
                                            disabled={valueDatePickerInicioEdicion ? false : true}
                                            onChange={(newValue) => {
                                                handleChangeDatePickerFinEdicion(newValue);
                                            }}
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                </Fragment>
                            ) : null}
                        </Box>
                        {generaHistoricoDeBajas()}
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                        {visibleCentros ? (
                            <Fragment>
                                <Box
                                    m={0.5}
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={clsx(classes.boxStl2, classes.mb20)}
                                >
                                    Centros
                                </Box>
                                <Box
                                    p={0.5}
                                    m={0.5}
                                >
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            id="panel1a-header"
                                            disabled={disabledAccordionTrabajadores}
                                        >
                                            <Typography className={classes.heading}>Centros vinculados como Trabajador</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
                                            >
                                                {
                                                    losCentrosVinculadosTrabajador.map((option, index) => (
                                                        <div key={index}><Typography>{index + 1}.- {option.nombre}</Typography></div>
                                                    ))
                                                }
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            id="panel2a-header"
                                            disabled={disabledAccordionSuplentes}
                                        >
                                            <Typography className={classes.heading}>Centros vinculados como Suplente</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
                                            >
                                                {
                                                    losCentrosVinculadosSuplente.map((option, index) => (
                                                        <div key={index}><Typography>{index + 1}.- {option.nombre}</Typography></div>
                                                    ))
                                                }
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Fragment>
                        ) : null}
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
            {/* {console.log(valuesFormEdicion)} */}
        </div>
    )
})

export default TrabajadoresEditar
