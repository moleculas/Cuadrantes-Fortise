import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import 'date-fns';
import { es } from "date-fns/locale";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

//pdf
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";

//carga componentes
import PantallaNominas from './PantallaNominas';
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { onEstemAccion } from '../redux/appDucks';
import { retornaAnoMesAccion } from '../redux/appDucks';
import { setCalendarioAGestionarNominasAccion } from '../redux/nominasDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { cambioEstadoInicioNominasAccion } from '../redux/nominasDucks';
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';
import { obtenerCuadrantesVinculadosATrabajadorAccion } from '../redux/nominasDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { vaciarDatosCuadrantesvinculadosAccion } from '../redux/nominasDucks';
import { obtenerNominaAccion } from '../redux/nominasDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';
import { obtenerConfiguracionAccion } from '../redux/appDucks';
import { setTrabajadorAccion } from '../redux/nominasDucks';
import { actualizarObjetoNominaAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonRegistrarNominaAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonEliminarNominaAccion } from '../redux/nominasDucks';
import { registrarNominaAccion } from '../redux/nominasDucks';

const getHeightScrollable = () => (window.innerHeight - 220) || (document.documentElement.clientHeight - 220) || (document.body.clientHeight - 220);

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

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Nominas = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const calendarioAGestionarNominas = useSelector(store => store.variablesNominas.calendarioAGestionarNominas);
    const esInicioNominas = useSelector(store => store.variablesNominas.esInicioNominas);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const cuadrantesVinculadosATrabajador = useSelector(store => store.variablesNominas.cuadrantesVinculadosATrabajador);
    const trabajadorAGestionar = useSelector(store => store.variablesTrabajadores.objetoTrabajador);
    const errorDeCargaNominas = useSelector(store => store.variablesNominas.errorDeCargaNominas);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const openLoadingNominas = useSelector(store => store.variablesNominas.loadingNominas);
    const noHayCuadrantesVinculadosATrabajador = useSelector(store => store.variablesNominas.noHayCuadrantesVinculadosATrabajador);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const objetoConfiguracion = useSelector(store => store.variablesApp.objetoConfiguracion);
    const objetoNomina = useSelector(store => store.variablesNominas.objetoNomina);
    const nominaNuevaRegistrada = useSelector(store => store.variablesNominas.estadoIntervencionNominaNuevaRegistrada);
    const nominaRegistrada = useSelector(store => store.variablesNominas.nominaRegistrada);
    const estadoVenimosDeFaltantes = useSelector(store => store.variablesFaltantes.estadoVenimosDeFaltantes);
    const trabajador = useSelector(store => store.variablesNominas.trabajador);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const disabledItemBotonRegistrar = useSelector(store => store.variablesNominas.estadoActivadoDesactivadoBotonRegistrarNomina);
    const disabledItemBotonEliminar = useSelector(store => store.variablesNominas.estadoActivadoDesactivadoBotonEliminarNomina);
    const exitoRegistroNomina = useSelector(store => store.variablesNominas.exitoRegistroNomina);
    const exitoEliminarNomina = useSelector(store => store.variablesNominas.exitoEliminarNomina);
    const ultimoIdRegistrado = useSelector(store => store.variablesNominas.ultimoIdRegistrado);

    //states

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [openLoading, setOpenLoading] = useState(false);
    const [valueDatePickerNominas, setValueDatePickerNominas] = useState(new Date(dispatch(retornaAnoMesAccion())));
    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarNominas));
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [visibleBaja, setVisibleBaja] = useState({ estado: false, tipo: '' });
    const [nominaAGestionar, setNominaAGestionar] = useState(objetoNomina.datosNomina.arrayDatos);

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
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
        dispatch(onEstemAccion('nominas'));
        dispatch(setCalendarioAGestionarNominasAccion(dispatch(retornaAnoMesAccion())));
        dispatch(obtenerTrabajadoresAccion('trabajadores'));
        dispatch(obtenerCentrosAccion('centros'));
        dispatch(obtenerConfiguracionAccion('configuracion', 1));
    }, [dispatch]);

    useEffect(() => {
        dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, id: ultimoIdRegistrado }));
    }, [ultimoIdRegistrado]);

    useEffect(() => {       
        if (nominaRegistrada === 'no') {
            if (!estadoVenimosDeFaltantes) {
                dispatch(obtenerTrabajadorAccion('trabajadores', trabajador));
            };
            dispatch(cambioEstadoInicioNominasAccion(false));
            dispatch(activarDesactivarCambioBotonRegistrarNominaAccion(false));
            dispatch(activarDesactivarCambioBotonEliminarNominaAccion(true));
        };
        if (nominaRegistrada === 'si') {
            dispatch(obtenerTrabajadorAccion('trabajadores', trabajador));
            dispatch(cambioEstadoInicioNominasAccion(false));
            dispatch(activarDesactivarCambioBotonEliminarNominaAccion(false));
        };
    }, [nominaRegistrada]);

    useEffect(() => {
        const fetchData = () => {           
            setOpenLoading(true);
            if (trabajadorAGestionar.id) {
                if (trabajadorAGestionar.estado !== 'alta') {
                    setVisibleBaja({ estado: true, tipo: trabajadorAGestionar.estado });
                };
                if (nominaRegistrada === 'no') {
                    dispatch(obtenerCuadrantesVinculadosATrabajadorAccion('cuadrantes', trabajadorAGestionar.id, calendarioAGestionarNominas));
                };
                if (nominaRegistrada === 'si') {
                    setNominaAGestionar(objetoNomina.datosNomina.arrayDatos);
                };
            };
            setOpenLoading(false);
        }
        fetchData();
    }, [trabajadorAGestionar]);

    useEffect(() => {
        if (cuadrantesVinculadosATrabajador.length > 0) {
            let objeto;
            let arrayNomina = [...nominaAGestionar];
            cuadrantesVinculadosATrabajador.forEach((cuadrante, index) => {
                objeto = JSON.parse(cuadrante['datos_informe']);
                objeto.arrayTrabajadores.forEach((trabajador, index) => {
                    if (trabajador.trabajador === trabajadorAGestionar.id) {
                        if (trabajador.totalHorasNormal > 0 || trabajador.totalHorasExtra > 0) {
                            arrayNomina.push({
                                centroId: objeto.centro,
                                nombreCentro: dispatch(obtenerObjetoPorIdAccion(listadoCentros, objeto.centro)),
                                tipo: trabajador.tipo,
                                totalHorasNormal: trabajador.totalHorasNormal,
                                totalHorasExtra: trabajador.totalHorasExtra
                            })
                        } else {
                            setAlert({
                                mensaje: "La consulta no ha devuelto resultados.",
                                tipo: 'warning'
                            })
                            setOpenSnack(true);
                        }
                    }
                });
            });
            setNominaAGestionar(arrayNomina);
        }
    }, [cuadrantesVinculadosATrabajador]);

    //secuencia alertas

    useEffect(() => {
        if (errorDeCargaNominas || errorDeCargaTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaNominas, errorDeCargaTrabajadores]);

    useEffect(() => {
        if (noHayCuadrantesVinculadosATrabajador) {
            setAlert({
                mensaje: "La consulta no ha devuelto resultados.",
                tipo: 'warning'
            })
            setOpenSnack(true);
        }
    }, [noHayCuadrantesVinculadosATrabajador]);

    useEffect(() => {
        if (exitoRegistroNomina) {
            setAlert({
                mensaje: "Registro creado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoRegistroNomina]);

    useEffect(() => {
        if (exitoEliminarNomina) {
            setAlert({
                mensaje: "Registro eliminado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoEliminarNomina]);

    useEffect(() => {
        if (!openLoadingNominas || !openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingNominas, openLoadingTrabajadores]);

    //funciones    

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeSelectCalendarioNominas = (newValue) => {
        setValueDatePickerNominas(newValue);
    };

    const handleChangeFormTrabajadoresNominas = (e) => {
        if (esInicioNominas) {
            reseteaContenidoNominas();
            dispatch(setTrabajadorAccion(e.target.value));
            const nombreNomina = nominaAGestionar + '-' + e.target.value;
            dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, nombre: nombreNomina, trabajador: e.target.value }));
            dispatch(obtenerNominaAccion('nominas', nombreNomina));
        } else {
            if (!nominaNuevaRegistrada) {
                //handleClickOpenDialogCuadrantes2();
            } else {
                if (!intervencionRegistrada) {
                    // handleClickOpenDialogCuadrantes3();
                    // setPreValueValor({ valor: e.target.value, origen: 'centros' });
                } else {
                    reseteaContenidoNominas();
                    dispatch(setTrabajadorAccion(e.target.value));
                    const nombreNomina = nominaAGestionar + '-' + e.target.value;
                    dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, nombre: nombreNomina, trabajador: e.target.value }));
                    dispatch(obtenerNominaAccion('nominas', nombreNomina));
                }
            }
        }
    };

    const reseteaContenidoNominas = () => {
        setVisibleBaja({ estado: false, tipo: '' });
        dispatch(vaciarDatosCuadrantesvinculadosAccion());
        setNominaAGestionar([]);
    };

    const procesarDatosNomina = () => {
        const objetoFinalNomina = {
            objeto: 'nomina',
            arrayDatos: nominaAGestionar
        }
        const nominaAGuardar = {
            id: objetoNomina.id,
            nombre: objetoNomina.nombre,
            trabajador: objetoNomina.trabajador,
            datos_nomina: JSON.stringify(objetoFinalNomina),
        };
    };

    //retorno componentes 

    const retornaListadoNomina = () => {
        let sumatorioHorasNormal = 0;
        let sumatorioHorasExtra = 0;
        return (
            <Box
                p={0.5}
            >
                <List>
                    {nominaAGestionar.map((item, index) => {
                        sumatorioHorasNormal += item.totalHorasNormal;
                        sumatorioHorasExtra += item.totalHorasExtra;
                        return (
                            <ListItem
                                key={'listItemsNomina' + index}
                                className={classes.casillaNominasNormal}
                                alignItems="flex-start"
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Grid>
                                        <Typography
                                            variant="body1"
                                        >
                                            Centro {item.nombreCentro}
                                        </Typography>
                                    </Grid>
                                    {
                                        item.totalHorasNormal && item.totalHorasExtra ? (
                                            <Fragment>
                                                <Grid container
                                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas/mes trabajadas como ({item.tipo}): {item.totalHorasNormal} horas a {objetoConfiguracion.precioHoraNormal} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasNormal * objetoConfiguracion.precioHoraNormal} €
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas extra/mes trabajadas como ({item.tipo}): {item.totalHorasExtra} horas a {objetoConfiguracion.precioHoraExtra} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasExtra * objetoConfiguracion.precioHoraExtra} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ) : item.totalHorasNormal && !item.totalHorasExtra ? (
                                            <Fragment>
                                                <Grid container
                                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas/mes trabajadas como ({item.tipo}): {item.totalHorasNormal} horas a {objetoConfiguracion.precioHoraNormal} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasNormal * objetoConfiguracion.precioHoraNormal} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ) : !item.totalHorasNormal && item.totalHorasExtra ? (
                                            <Fragment>
                                                <Grid container
                                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas extra/mes trabajadas como ({item.tipo}): {item.totalHorasExtra} horas a {objetoConfiguracion.precioHoraExtra} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasExtra * objetoConfiguracion.precioHoraExtra} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ) : null}
                                </Grid>
                            </ListItem >
                        )
                    })}
                    <ListItem
                        className={classes.casillaNominasFinal}
                        alignItems="flex-start"
                    >
                        <Grid
                            container
                            direction="column"
                            justifycontent="flex-start"
                            alignItems="flex-start"
                        >
                            <Fragment>
                                <Grid container
                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                    <Grid item xs={11}>
                                        <Typography
                                            component="span"
                                            variant="body1"

                                        >
                                            Total general: {sumatorioHorasNormal > 0 ? sumatorioHorasNormal + ' horas' : null} {sumatorioHorasExtra > 0 ? '+ ' + sumatorioHorasExtra + ' horas extra' : null}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}
                                        className={classes.alignRight}
                                    >
                                        <Typography
                                            component="span"
                                            variant="body1"
                                        >
                                            {(sumatorioHorasNormal * objetoConfiguracion.precioHoraNormal) + (sumatorioHorasExtra * objetoConfiguracion.precioHoraExtra)} €
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        </Grid>
                    </ListItem >
                </List>
            </Box>
        )
    }

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item xs={12} >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item xs={6}>
                        <Chip style={{ padding: 5 }} icon={<AssignmentIndIcon />} label="Gestión de nóminas" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginRight: 20 }}>
                            <FormControl>
                                <Button
                                    fullWidth
                                    disabled={esInicioNominas ? true : false}
                                    variant="contained"
                                    color='primary'
                                    startIcon={<AssignmentIndIcon />}
                                    onClick={handleClickMenu}
                                >
                                    Gestión de nóminas
                                </Button>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorElMenu}
                                    keepMounted
                                    open={Boolean(anchorElMenu)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem
                                    //onClick={goToInicioCuadrantes}
                                    >
                                        <ListItemIcon>
                                            <HomeIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Inicio Nóminas" />
                                    </MenuItem>
                                    <MenuItem
                                        // onClick={}
                                        disabled={disabledItemBotonRegistrar}
                                    >
                                        <ListItemIcon>
                                            <SaveIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Registrar Nómina" />
                                    </MenuItem>
                                    <MenuItem
                                        // onClick={eliminarCentroParent}
                                        disabled={disabledItemBotonEliminar}
                                    >
                                        <ListItemIcon>
                                            <DeleteIcon style={{ color: 'red' }} fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText style={{ color: 'red' }} primary="Eliminar Nómina" />
                                    </MenuItem>
                                </StyledMenu>
                            </FormControl>
                        </Box>
                    </Grid>
                </Box>
                <Box
                    className={classes.root11}
                    mt={3.4}
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
                                    value={valueDatePickerNominas}
                                    onChange={(newValue) => {
                                        handleChangeSelectCalendarioNominas(newValue);
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
                                <InputLabel>Trabajador</InputLabel>
                                <Select
                                    id="form-trabajadores-nominas"
                                    value={objetoNomina.trabajador || ''}
                                    onChange={handleChangeFormTrabajadoresNominas}
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
                        </Box>
                    </Grid>
                    <Grid item lg={4}>

                    </Grid>
                </Box>
                {esInicioNominas ? <PantallaNominas /> : (
                    <Grid
                        spacing={1}
                        container
                        direction="row"
                        justifycontent="flex-start"
                        alignItems="flex-start"
                        style={{ height: heightScrollable, padding: 10 }}
                        className={classes.scrollable}
                    >
                        <Grid item xs={8}>
                            <Box
                                p={1.5}
                                m={0.5}
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={classes.mb10}
                            >
                                <Typography variant="body1">Horas trabajadas por centro en el mes de {monthLet}</Typography>
                            </Box>
                            {visibleBaja.estado ? <Alert severity="info">El trabajador se encuentra de baja por: {visibleBaja.tipo}</Alert> : null}
                            {nominaAGestionar.length > 0 ? (
                                retornaListadoNomina()
                            ) : null}
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {console.log(estadoVenimosDeFaltantes)}
        </div>
    )
}

export default withRouter(Nominas)
