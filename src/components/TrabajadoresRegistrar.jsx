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
import DateFnsUtils from '@date-io/date-fns';
import { es } from "date-fns/locale";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

//estilos
import Clases from "../clases";

//importaciones acciones
import { activarDesactivarAccion } from '../redux/appDucks';
import { registrarTrabajadorAccion } from '../redux/trabajadoresDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { retornaAnoMesDiaAccion } from '../redux/appDucks';
import { activarDesactivarNuevoTrabajadorAccion } from '../redux/trabajadoresDucks';
import { activarDesactivarRegistrarTrabajadorAccion } from '../redux/trabajadoresDucks';

const estados = Constantes.ESTADO_LABORAL_TRABAJADOR;

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TrabajadoresRegistrar = forwardRef((props, ref) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const openLoading = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const exitoRegistroTrabajador = useSelector(store => store.variablesTrabajadores.exitoRegistroTrabajador);

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesFormRegistro, setValuesFormRegistro] = useState({
        id: null,
        nombre: '',
        categoria: 1,
        dni: '',
        segSocial: '',
        telefono: '',
        estado: 'alta'
    });
    const [valueDatePickerInicioRegistro, setValueDatePickerInicioRegistro] = useState(null);
    const [valueDatePickerFinRegistro, setValueDatePickerFinEdicion] = useState(null);
    const [datosEstadoRegistro, setDatosEstadoRegistro] = useState({
        inicioBaja: null,
        finBaja: null,
        inicioVacaciones: null,
        finVacaciones: null,
        inicioExcedencia: null,
        finExcedencia: null,
        inicioPersonales: null,
        finPersonales: null
    });

    //useEffect

    useEffect(() => {
        dispatch(onEstemAccion('registrarTrabajadores'));
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
        if (exitoRegistroTrabajador) {
            setAlert({
                mensaje: "Registro creado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoRegistroTrabajador]);

    //funciones

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeFormRegistro = (prop) => (e) => {
        if (prop === "estado") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setDatosEstadoRegistro({
                inicioBaja: null,
                finBaja: null,
                inicioVacaciones: null,
                finVacaciones: null,
                inicioExcedencia: null,
                finExcedencia: null,
                inicioPersonales: null,
                finPersonales: null
            });
            setValueDatePickerInicioRegistro(null);
            setValueDatePickerFinEdicion(null);
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarTrabajadorAccion(false));
            return;
        }
        setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarTrabajadorAccion(false));
    };

    const handleChangeDatePickerInicioRegistro = (newValue) => {
        if (valueDatePickerFinRegistro && valueDatePickerFinRegistro < newValue) {
            setAlert({
                mensaje: "La fecha de final no puede ser inferior a la fecha de inicio.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        }
        setValueDatePickerInicioRegistro(newValue);
        switch (valuesFormRegistro.estado) {
            case 'baja':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, inicioBaja: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'vacaciones':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, inicioVacaciones: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'excedencia':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, inicioExcedencia: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'personales':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, inicioPersonales: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarTrabajadorAccion(false));
    };

    const handleChangeDatePickerFinRegistro = (newValue) => {
        // if (valueDatePickerInicioRegistro && valueDatePickerInicioRegistro > newValue) {
        //     setAlert({
        //         mensaje: "La fecha de inicio no puede ser superior a la fecha final.",
        //         tipo: 'error'
        //     })
        //     setOpenSnack(true);
        //     return;
        // }
        setValueDatePickerFinEdicion(newValue);
        switch (valuesFormRegistro.estado) {
            case 'baja':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, finBaja: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'vacaciones':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, finVacaciones: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'excedencia':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, finExcedencia: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            case 'personales':
                setDatosEstadoRegistro({ ...datosEstadoRegistro, finPersonales: dispatch(retornaAnoMesDiaAccion(newValue)) });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarTrabajadorAccion(false));
    };

    useImperativeHandle(ref, () => ({
        funcionesEnTrabajadoresRegistrar(funcion) {
            switch (funcion) {
                case 'nuevoTrabajador':
                    const nuevoTrabajador = () => {
                        dispatch(activarDesactivarNuevoTrabajadorAccion(true));
                        reseteaContenidoRegistro();
                    };
                    nuevoTrabajador();
                    break;
                case 'procesarDatosRegistro':
                    const procesarDatosRegistro = () => {
                        //comprobamos que no haya campos vacíos

                        if (valuesFormRegistro.nombre === '' ||
                            valuesFormRegistro.estado === '' ||
                            valuesFormRegistro.dni === '' ||
                            valuesFormRegistro.segSocial === '' ||
                            valuesFormRegistro.telefono === ''
                        ) {
                            setAlert({
                                mensaje: "Alguno de los registros está vacío. Revisa el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };

                        if (valuesFormRegistro.estado !== 'alta') {
                            if (!valueDatePickerInicioRegistro && !valueDatePickerFinRegistro) {
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
                            id: valuesFormRegistro.id,
                            nombre: valuesFormRegistro.nombre,
                            categoria: 1,
                            dni: valuesFormRegistro.dni,
                            seg_social: valuesFormRegistro.segSocial,
                            telefono: valuesFormRegistro.telefono,
                            estado: valuesFormRegistro.estado,
                            datos_estado: JSON.stringify(datosEstadoRegistro)
                        };
                        dispatch(registrarTrabajadorAccion('trabajadores', trabajadorAGuardar.id, trabajadorAGuardar));
                        dispatch(registrarIntervencionAccion(true));
                        dispatch(activarDesactivarNuevoTrabajadorAccion(false));
                        dispatch(activarDesactivarRegistrarTrabajadorAccion(true));
                    }
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
            categoria: '',
            dni: '',
            segSocial: '',
            telefono: '',
            estado: ''
        });
        setValueDatePickerInicioRegistro(null);
        setValueDatePickerFinEdicion(null);
        setDatosEstadoRegistro({
            inicioBaja: null,
            finBaja: null,
            inicioVacaciones: null,
            finVacaciones: null,
            inicioExcedencia: null,
            finExcedencia: null,
            inicioPersonales: null,
            finPersonales: null
        });
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
                                <InputLabel>Nombre</InputLabel>
                                <OutlinedInput
                                    className={classes.mb15}
                                    fullWidth
                                    id="form-nombre-trabajador-registro"
                                    value={valuesFormRegistro.nombre || ''}
                                    onChange={handleChangeFormRegistro('nombre')}
                                    labelWidth={60}
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                            >
                                <InputLabel>DNI - NIE</InputLabel>
                                <OutlinedInput
                                    className={classes.mb15}
                                    fullWidth
                                    id="form-telefono-trabajador-registro"
                                    value={valuesFormRegistro.dni || ''}
                                    onChange={handleChangeFormRegistro('dni')}
                                    labelWidth={65}
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                            >
                                <InputLabel>Seg. Social</InputLabel>
                                <OutlinedInput                                
                                    className={classes.mb15}
                                    fullWidth
                                    id="form-telefono-trabajador-registro"
                                    value={valuesFormRegistro.segSocial || ''}
                                    onChange={handleChangeFormRegistro('segSocial')}
                                    labelWidth={90}
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                            >
                                <InputLabel>Teléfono</InputLabel>
                                <OutlinedInput
                                    className={classes.mb25}
                                    fullWidth
                                    id="form-telefono-trabajador-registro"
                                    value={valuesFormRegistro.telefono || ''}
                                    onChange={handleChangeFormRegistro('telefono')}
                                    labelWidth={65}
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
                                id="form-estado-registro"
                                label="Estado Trabajador"
                                //value={valuesFormRegistro.estado || ''}
                                disabled={true}
                                value={'alta'}
                                onChange={handleChangeFormRegistro('estado')}
                                helpertext="Selecciona estado"
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
                            {(valuesFormRegistro.estado === 'baja' || valuesFormRegistro.estado === 'excedencia' || valuesFormRegistro.estado === 'vacaciones') ? (
                                <Fragment>
                                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            inputVariant="outlined"
                                            className={classes.mb20}
                                            fullWidth
                                            label={`Fecha inicio ` + valuesFormRegistro.estado}
                                            format="dd/MM/yyyy"
                                            clearable={true}
                                            cancelLabel="Cancelar"
                                            clearLabel="Borrar"
                                            value={valueDatePickerInicioRegistro}
                                            onChange={(newValue) => {
                                                handleChangeDatePickerInicioRegistro(newValue);
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            inputVariant="outlined"
                                            fullWidth
                                            label={`Fecha fin ` + valuesFormRegistro.estado}
                                            format="dd/MM/yyyy"
                                            clearable={true}
                                            cancelLabel="Cancelar"
                                            clearLabel="Borrar"
                                            value={valueDatePickerFinRegistro}
                                            onChange={(newValue) => {
                                                handleChangeDatePickerFinRegistro(newValue);
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Fragment>
                            ) : null}
                        </Box>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>

                    </Grid>
                </Grid>
            </Fragment>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
        </div>
    )
})

export default TrabajadoresRegistrar
