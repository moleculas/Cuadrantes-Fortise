import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

//carga componentes
import Pendientes from './Pendientes';
import Bajas from './Bajas';
import GraficoCuadrantes from './GraficoCuadrantes';
import PendientesRegistrados from './PendientesRegistrados';
import PendientesFacturados from './PendientesFacturados';

//estilos
import Clases from "../clases";

//importaciones acciones
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { obtenerCuadrantesPendientesAccion } from '../redux/pendientesDucks';
import { obtenerCuadrantesRegistradosFacturadosAccion } from '../redux/pendientesDucks';
import { vaciarDatosPendientesAccion } from '../redux/pendientesDucks';
import { finalizarArchivosXLSLoteAccion } from '../redux/appDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';

const getHeightContenedoresPeq = () => ((window.innerHeight / 2) - 162) || ((document.documentElement.clientHeight / 2) - 162) || ((document.body.clientHeight / 2) - 162);
const getHeightContenedoresGra = () => ((window.innerHeight) - 264) || ((document.documentElement.clientHeight) - 264) || ((document.body.clientHeight) - 264);
const getWidthContenedores = () => ((window.innerWidth - 300) / 2) || ((document.documentElement.clientWidth - 300) / 2) || ((document.body.clientWidth - 300) / 2);

//tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {<Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PantallaCuadrantes = () => {

    const classes = Clases();
    const dispatch = useDispatch();
    const numeroCuadrantesPendientes = useSelector(store => store.variablesPendientes.numeroCuadrantesPendientes);
    const numeroCuadrantesRegistrados = useSelector(store => store.variablesPendientes.numeroCuadrantesRegistrados);
    const numeroCuadrantesFacturados = useSelector(store => store.variablesPendientes.numeroCuadrantesFacturados);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);
    const listadoTrabajadoresBaja = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresBaja);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const errorDeCargaCuadrantes = useSelector(store => store.variablesCuadrantes.errorDeCargaCuadrantes);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const cuadrantesPendientesArray = useSelector(store => store.variablesPendientes.cuadrantesPendientesArray);
    const finalizandoLoteEstado = useSelector(store => store.variablesApp.finalizandoLoteEstado);

    //states

    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
    const [heightContenedoresPeq, setHeightContenedoresPeq] = useState(getHeightContenedoresPeq());
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra());
    const [widthContenedores, setWidthContenedores] = useState(getWidthContenedores());
    const [valueTab, setValueTab] = useState(0);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        const resizeListener = () => {
            setHeightContenedoresPeq(getHeightContenedoresPeq());
            setHeightContenedoresGra(getHeightContenedoresGra());
            setWidthContenedores(getWidthContenedores());
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosAccion('centros'));
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(vaciarDatosPendientesAccion());
        if (finalizandoLoteEstado) {
            dispatch(finalizarArchivosXLSLoteAccion(false));
            dispatch(forzarRecargaGraficosCuadrantesAccion(false));
        };
    }, [calendarioAGestionar, finalizandoLoteEstado]);

    useEffect(() => {
        if (listadoCentros.length > 0) {
            if (cuadrantesPendientesArray.length === 0) {
                const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
                const anyoMes = year + '-' + monthNum;
                dispatch(obtenerCuadrantesPendientesAccion('cuadrantes', anyoMes, listadoCentros));
                dispatch(obtenerCuadrantesRegistradosFacturadosAccion('cuadrantes', anyoMes, listadoCentros));
            }
        }
    }, [listadoCentros, calendarioAGestionar, finalizandoLoteEstado]);

    useEffect(() => {
        if (errorDeCargaCentros || errorDeCargaCuadrantes) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaCentros, errorDeCargaCuadrantes]);

    useEffect(() => {
        if ((numeroCuadrantesPendientes + numeroCuadrantesRegistrados + numeroCuadrantesFacturados) < listadoCentros.length) {
            setOpenLoading(true)
        } else {
            setOpenLoading(false)
        };
    }, [numeroCuadrantesPendientes, numeroCuadrantesRegistrados, numeroCuadrantesFacturados]);

    //funciones    

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue)
    };

    return (
        <div>
            <Grid
                spacing={1}
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
                style={{ marginLeft: -10, marginTop: -15 }}
            >
                <Grid item xs={6}>
                    <Grid style={{ padding: 8 }}>
                        <AppBar position="static"
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            color="secondary"
                        >
                            <Tabs value={valueTab} onChange={handleChangeTab} className={classes.tabsStl}>
                                <Tooltip title={'Cuadrantes del mes de ' + monthLet + ' pendientes de gestionar'} placement="top-start" arrow>
                                    <Tab label={'Pendientes'} {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                </Tooltip>
                                <Tooltip title={'Cuadrantes del mes de ' + monthLet + ' registrados'} placement="top-start" arrow>
                                    <Tab label={'Registrados'} {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                                </Tooltip>
                                <Tooltip title={'Cuadrantes del mes de ' + monthLet + ' facturados'} placement="top-start" arrow>
                                    <Tab label={'Facturados'} {...a11yProps(2)} style={{ paddingBottom: 10 }} />
                                </Tooltip>
                            </Tabs>
                            <Avatar
                                className={clsx(classes.small3, valueTab === 0 ? classes.red : valueTab === 1 ? classes.orange : classes.green)}
                                style={{ marginRight: 8 }}
                            >
                                <Typography variant='body2'>{
                                    valueTab === 0 ?
                                        (numeroCuadrantesPendientes ? numeroCuadrantesPendientes : 0) :
                                        valueTab === 1 ?
                                            (numeroCuadrantesRegistrados ? numeroCuadrantesRegistrados : 0) :
                                            (numeroCuadrantesFacturados ? numeroCuadrantesFacturados : 0)
                                }</Typography>
                            </Avatar>
                        </AppBar>
                        <TabPanel value={valueTab} index={0}>
                            <Paper
                                elevation={1}
                                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: -20, marginLeft: -24, marginRight: -24 }}
                            >
                                <Grid
                                    spacing={1}
                                    container
                                    direction="column"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    p={0}
                                    style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra }}
                                >
                                    <Fragment>
                                        <Pendientes prHeightContenedores={heightContenedoresGra} prWidthContenedores={widthContenedores} prOpenLoading={openLoading} />
                                    </Fragment>
                                </Grid>
                            </Paper>
                        </TabPanel>
                        <TabPanel value={valueTab} index={1}>
                            <Paper
                                elevation={1}
                                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: -20, marginLeft: -24, marginRight: -24 }}
                            >
                                <Grid
                                    spacing={1}
                                    container
                                    direction="column"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    p={0}
                                    style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra }}
                                >
                                    <Fragment>
                                        <PendientesRegistrados prWidthContenedores={widthContenedores} prOpenLoading={openLoading} />
                                    </Fragment>
                                </Grid>
                            </Paper>
                        </TabPanel>
                        <TabPanel value={valueTab} index={2}>
                            <Paper
                                elevation={1}
                                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: -20, marginLeft: -24, marginRight: -24 }}
                            >
                                <Grid
                                    spacing={1}
                                    container
                                    direction="column"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    p={0}
                                    style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra }}
                                >
                                    <Fragment>
                                        <PendientesFacturados prHeightContenedores={heightContenedoresGra} prWidthContenedores={widthContenedores} prOpenLoading={openLoading} />
                                    </Fragment>
                                </Grid>
                            </Paper>
                        </TabPanel>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid className={classes.mb20}>
                        <Box
                            m={1}
                            color="secondary.contrastText"
                            bgcolor="secondary.main"
                            className={clsx(classes.sombraBox, classes.boxStl)}
                        >
                            <Typography variant="body2">Cómputo de ingresos anual</Typography>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <GraficoCuadrantes prHeightContenedores={heightContenedoresPeq} prWidthContenedores={widthContenedores} />
                        </Paper>
                    </Grid>
                    <Grid>
                        <Box
                            m={1}
                            color="secondary.contrastText"
                            bgcolor="secondary.main"
                            className={clsx(classes.sombraBox, classes.boxStl)}
                            style={{ display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
                        >
                            <Grid item xs={11}>
                                <Typography variant="body2">Trabajadores de baja</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.alignRight}>
                                <Avatar
                                    className={clsx(classes.small3, listadoTrabajadoresBaja.length === 0 ? classes.green : classes.red)}
                                >
                                    <Typography variant='body2'>{listadoTrabajadoresBaja.length}</Typography>
                                </Avatar>
                            </Grid>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <Bajas prHeightContenedores={heightContenedoresPeq} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {console.log(openLoading)}
        </div>
    )
}

export default PantallaCuadrantes
