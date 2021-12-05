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

//carga componentes
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { actualizarTrabajadorAccion } from '../redux/trabajadoresDucks';
import { actualizarCentroAccion } from '../redux/centrosDucks';
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
import { vaciarDatosTrabajadoresAccion } from '../redux/trabajadoresDucks';

const estados = Constantes.ESTADO_LABORAL_TRABAJADOR;

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
        categoria: 1,
        estado: ''
    });
    const [disabledAccordionTrabajadores, setDisabledAccordionTrabajadores] = useState(true);
    const [disabledAccordionSuplentes, setDisabledAccordionSuplentes] = useState(true);
    const [valueDatePickerInicioEdicion, setValueDatePickerInicioEdicion] = useState(null);
    const [valueDatePickerFinEdicion, setValueDatePickerFinEdicion] = useState(null);
    const [datosEstadoEdicion, setDatosEstadoEdicion] = useState({
        inicioBaja: null,
        finBaja: null,
        inicioVacaciones: null,
        finVacaciones: null,
        inicioExcedencia: null,
        finExcedencia: null,
        inicioPersonales: null,
        finPersonales: null
    });
    const [historicoBajasEdicion, setHistoricoBajasEdicion] = useState(null);
    const [losCentrosVinculadosTrabajador, setLosCentrosVinculadosTrabajador] = useState([]);
    const [losCentrosVinculadosSuplente, setLosCentrosVinculadosSuplente] = useState([]);
    const [visibleCentros, setVisibleCentros] = useState(false);

    //useEffect

    useEffect(() => {
        dispatch(vaciarDatosTrabajadoresAccion());
        dispatch(onEstemAccion('editarTrabajadores'));
        dispatch(obtenerTrabajadoresAccion('trabajadores'));
    }, [dispatch]);

    useEffect(() => {
        if (errorDeCargaTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores]);

    useEffect(() => {
        if (props.prVenimosTrabajadorBaja) {
            setValuesAutocompleteTrabajadoresValores(props.prVenimosTrabajadorBaja)
            dispatch(obtenerTrabajadorAccion('trabajadores', props.prVenimosTrabajadorBaja.id));
            dispatch(activarDesactivarAccion(false));
            setVisibleCentros(true);
        }
    }, [props.prVenimosTrabajadorBaja]);

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
            estado: trabajadorAEditar.estado,
            categoria: 1,
        });
        setDatosEstadoEdicion({
            inicioBaja: trabajadorAEditar.datosEstado.inicioBaja,
            finBaja: trabajadorAEditar.datosEstado.finBaja,
            inicioVacaciones: trabajadorAEditar.datosEstado.inicioVacaciones,
            finVacaciones: trabajadorAEditar.datosEstado.finVacaciones,
            inicioExcedencia: trabajadorAEditar.datosEstado.inicioExcedencia,
            finExcedencia: trabajadorAEditar.datosEstado.finExcedencia,
            inicioPersonales: trabajadorAEditar.datosEstado.inicioPersonales,
            finPersonales: trabajadorAEditar.datosEstado.finPersonales
        });
        switch (trabajadorAEditar.estado) {
            case 'baja':
                setValueDatePickerInicioEdicion(trabajadorAEditar.datosEstado.inicioBaja);
                setValueDatePickerFinEdicion(trabajadorAEditar.datosEstado.finBaja);
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
            default:
        };
        setHistoricoBajasEdicion(trabajadorAEditar.historicoBajas)

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
                inicioBaja: null,
                finBaja: null,
                inicioVacaciones: null,
                finVacaciones: null,
                inicioExcedencia: null,
                finExcedencia: null,
                inicioPersonales: null,
                finPersonales: null
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
        if (valueDatePickerFinEdicion && valueDatePickerFinEdicion < newValue) {
            setAlert({
                mensaje: "La fecha de final no puede ser inferior a la fecha de inicio.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        }
        setValueDatePickerInicioEdicion(newValue);
        switch (valuesFormEdicion.estado) {
            case 'baja':
                setDatosEstadoEdicion({ ...datosEstadoEdicion, inicioBaja: dispatch(retornaAnoMesDiaAccion(newValue)) });
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
            default:
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarTrabajadorAccion(false));
    };

    const handleChangeDatePickerFinEdicion = (newValue) => {
        if (newValue) {
            const elMes = dispatch(retornaAnoMesAccion(newValue));
            let inicioRango, finRango;
            switch (valuesFormEdicion.estado) {
                case 'baja':
                    inicioRango = datosEstadoEdicion.inicioBaja;
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
                default:
            };
            const objetoBajasHistoricoMes = {
                tipo: valuesFormEdicion.estado,
                inicio: inicioRango,
                fin: finRango
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
            const obJetoHistorico = {
                objeto: 'historico',
                meses: arrayObjetoHistoricoMeses
            };

            setHistoricoBajasEdicion(obJetoHistorico);

            setValuesFormEdicion({ ...valuesFormEdicion, estado: 'alta' });
            setDatosEstadoEdicion({
                inicioBaja: null,
                finBaja: null,
                inicioVacaciones: null,
                finVacaciones: null,
                inicioExcedencia: null,
                finExcedencia: null,
                inicioPersonales: null,
                finPersonales: null
            });
            setValueDatePickerInicioEdicion(null);
            setValueDatePickerFinEdicion(null);

        } else {
            setValueDatePickerFinEdicion(newValue);
            switch (valuesFormEdicion.estado) {
                case 'baja':
                    setDatosEstadoEdicion({ ...datosEstadoEdicion, finBaja: null });
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
                default:
            };
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarTrabajadorAccion(false));
    };

    const tituloDialog = "¿Estás seguro que quieres eliminar el Trabajador?";
    const descripcionDialog = "Para confirmar pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo'."

    const handleClickOpenDialog = () => {
        dispatch(abreObjetoDialogAccion('2'));
    };

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(eliminarTrabajadorAccion('trabajadores', valuesFormEdicion.id));
            //setTimeout(function(){ window.location.reload(); }, 1500);
            dispatch(activarDesactivarAccion(true));
            actualizarCentroPorEliminacionTrabajador();
            reseteaContenidoEdicion();
        }
        dispatch(cierraObjetoDialogAccion());
    };

    const actualizarCentroPorEliminacionTrabajador = () => {
        if (losCentrosVinculadosTrabajador.length > 0) {
            losCentrosVinculadosTrabajador.forEach((option1, index) => {
                const centroVinculadoTrabajadorId = option1.id;
                const centroVinculadoTrabajadorTrabajadores = JSON.parse(option1.trabajadores);
                centroVinculadoTrabajadorTrabajadores.trabajadores.forEach((option2, index) => {
                    Object.entries(option2).forEach(([key, val]) => {
                        if (key === 'trabajador_' + (index + 1)) {
                            if (val === valuesFormEdicion.id) {
                                option2[key] = null;
                            }
                        }
                    });
                });
                //registramos
                const centroAGuardar = {
                    id: centroVinculadoTrabajadorId,
                    trabajadores: JSON.stringify(centroVinculadoTrabajadorTrabajadores)
                };
                dispatch(actualizarCentroAccion('centros', centroAGuardar.id, centroAGuardar));
            })
        };
        if (losCentrosVinculadosSuplente.length > 0) {
            losCentrosVinculadosSuplente.forEach((option1, index) => {
                const centroVinculadoSuplenteId = option1.id;
                const centroVinculadoSuplenteTrabajadores = JSON.parse(option1.trabajadores);
                centroVinculadoSuplenteTrabajadores.trabajadores.forEach((option2, index) => {
                    Object.entries(option2).forEach(([key, val]) => {
                        if (key === 'suplente_' + (index + 1)) {
                            if (val === valuesFormEdicion.id) {
                                option2[key] = null;
                            }
                        }
                    });
                });
                //registramos
                const centroAGuardar = {
                    id: centroVinculadoSuplenteId,
                    trabajadores: JSON.stringify(centroVinculadoSuplenteTrabajadores)
                };
                dispatch(actualizarCentroAccion('centros', centroAGuardar.id, centroAGuardar));
            })
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
                        //comprobamos que no haya campos vacíos
                        if (valuesFormEdicion.nombre === '') {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };

                        if (valuesFormEdicion.estado !== 'alta') {
                            if (!valueDatePickerInicioEdicion && !valueDatePickerFinEdicion) {
                                setAlert({
                                    mensaje: "El rango de fechas del estado laboral está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            }
                        };
                        
                        //registramos
                        const trabajadorAGuardar = {
                            id: valuesFormEdicion.id,
                            nombre: valuesFormEdicion.nombre,
                            categoria: 1,
                            estado: valuesFormEdicion.estado,
                            datos_estado: JSON.stringify(datosEstadoEdicion),
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
        dispatch(obtenerTrabajadoresAccion('trabajadores'));
        forceUpdate();
        setValuesAutocompleteTrabajadoresValores(null);
        setValuesFormEdicion({
            id: null,
            nombre: '',
            categoria: '',
            estado: ''
        });
        setDisabledAccordionTrabajadores(true);
        setDisabledAccordionSuplentes(true);
        setValueDatePickerInicioEdicion(null);
        setValueDatePickerFinEdicion(null);
        setDatosEstadoEdicion({
            inicioBaja: null,
            finBaja: null,
            inicioVacaciones: null,
            finVacaciones: null,
            inicioExcedencia: null,
            finExcedencia: null,
            inicioPersonales: null,
            finPersonales: null
        });
        setHistoricoBajasEdicion(null);
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
                        Histórico de bajas
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
        let cabeceraTexto, rangoTexto;
        switch (linea.tipo) {
            case 'baja':
                cabeceraTexto = "Baja por enfermedad del: ";
                break;
            case 'vacaciones':
                cabeceraTexto = "Vacaciones del: ";
                break;
            case 'excedencia':
                cabeceraTexto = "Excedencia del: ";
                break;
            case 'personales':
                cabeceraTexto = "Baja por motivos personales del: ";
                break;
            default:
        };
        rangoTexto = linea.inicio + " al " + linea.fin;
        return (
            <ListItem
                key={'listabajas' + index}>
                <ListItemText
                    primary={mes}
                    secondary={cabeceraTexto + rangoTexto}
                />
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
        const obJetoHistorico = {
            objeto: 'historico',
            meses: array
        };
        if (array.length > 0) {
            setHistoricoBajasEdicion(obJetoHistorico);
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
                                p={1.5}
                                m={0.5}
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={classes.mb25}
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
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
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
                        </Box>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                        <Box
                            p={1.5}
                            m={0.5}
                            bgcolor="secondary.light"
                            color="secondary.contrastText"
                            className={classes.mb25}
                        >
                            Estado laboral
                        </Box>
                        <FormControl
                            variant="outlined"
                            className={classes.form}
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
                            {(valuesFormEdicion.estado === 'baja' || valuesFormEdicion.estado === 'excedencia' || valuesFormEdicion.estado === 'vacaciones' || valuesFormEdicion.estado === 'personales') ? (
                                <Fragment>
                                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            inputVariant="outlined"
                                            className={classes.mb20}
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
                                        />
                                    </MuiPickersUtilsProvider>
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
                                            onChange={(newValue) => {
                                                handleChangeDatePickerFinEdicion(newValue);
                                            }}
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
                                    p={1.5}
                                    m={0.5}
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={classes.mb25}
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
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
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
            {/* {console.log(props.prVenimosTrabajadorBaja)} */}
        </div>
    )
})

export default TrabajadoresEditar
