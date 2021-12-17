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
import Faltantes from './Faltantes';
import Bajas from './Bajas';
import GraficoNominas from './GraficoNominas';
import FaltantesRegistrados from './FaltantesRegistrados';
import FaltantesEmitidos from './FaltantesEmitidos';

//estilos
import Clases from "../clases";

//importaciones acciones
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';

import { obtenerNominasFaltantesAccion } from '../redux/faltantesDucks';
import { obtenerNominasRegistradasEmitidasAccion } from '../redux/faltantesDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { vaciarDatosFaltantesAccion } from '../redux/faltantesDucks';

const getHeightContenedoresPeq = () => ((window.innerHeight / 2) - 168) || ((document.documentElement.clientHeight / 2) - 168) || ((document.body.clientHeight / 2) - 168);
const getHeightContenedoresGra = () => ((window.innerHeight) - 272) || ((document.documentElement.clientHeight) - 272) || ((document.body.clientHeight) - 272);
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
};

const PantallaNominas = () => {

    const classes = Clases();
    const dispatch = useDispatch();
    const calendarioAGestionarNominas = useSelector(store => store.variablesNominas.calendarioAGestionarNominas);
    const listadoTrabajadoresBaja = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresBaja);
    const numeroNominasFaltantes = useSelector(store => store.variablesFaltantes.numeroNominasFaltantes);
    const numeroNominasRegistradas = useSelector(store => store.variablesFaltantes.numeroNominasRegistradas);
    const numeroNominasEmitidas = useSelector(store => store.variablesFaltantes.numeroNominasEmitidas);

    const errorDeCargaNominas = useSelector(store => store.variablesNominas.errorDeCargaNominas);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const nominasFaltantesArray = useSelector(store => store.variablesFaltantes.nominasFaltantesArray);

    //states

    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarNominas));
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
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(vaciarDatosFaltantesAccion());
    }, [calendarioAGestionarNominas]);

    useEffect(() => {
        if (listadoTrabajadores.length > 0) {
            if (nominasFaltantesArray.length === 0) {
                const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarNominas));
                const anyoMes = year + '-' + monthNum;
                dispatch(obtenerNominasFaltantesAccion('nominas', anyoMes, listadoTrabajadores));
                dispatch(obtenerNominasRegistradasEmitidasAccion('nominas', anyoMes, listadoTrabajadores));
            }
        }
    }, [listadoTrabajadores, calendarioAGestionarNominas]);

    useEffect(() => {
        if (errorDeCargaTrabajadores || errorDeCargaNominas) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores, errorDeCargaNominas]);

    useEffect(() => {
        if ((numeroNominasFaltantes + numeroNominasRegistradas + numeroNominasEmitidas) < listadoTrabajadores.length) {
            setOpenLoading(true)
        } else {
            setOpenLoading(false)
        };
    }, [numeroNominasFaltantes, numeroNominasRegistradas, numeroNominasEmitidas]);

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
                            <Tabs value={valueTab} onChange={handleChangeTab}>
                                <Tooltip title={'Nóminas del mes de ' + monthLet + ' pendientes de gestionar'} placement="top-start" arrow>
                                    <Tab label={'Pendientes'} {...a11yProps(0)} />
                                </Tooltip>
                                <Tooltip title={'Nóminas del mes de ' + monthLet + ' registradas'} placement="top-start" arrow>
                                    <Tab label={'Registradas'} {...a11yProps(1)} />
                                </Tooltip>
                                <Tooltip title={'Nóminas del mes de ' + monthLet + ' emitidas'} placement="top-start" arrow>
                                    <Tab label={'Emitidas'} {...a11yProps(2)} />
                                </Tooltip>
                            </Tabs>
                            <Avatar
                                className={clsx(classes.small, valueTab === 0 ? classes.red : valueTab === 1 ? classes.orange : classes.green)}
                                style={{ marginRight: 8 }}
                            >
                                <Typography variant='body2'>{
                                    valueTab === 0 ?
                                        (numeroNominasFaltantes ? numeroNominasFaltantes : 0) :
                                        valueTab === 1 ?
                                            (numeroNominasRegistradas ? numeroNominasRegistradas : 0) :
                                            (numeroNominasEmitidas ? numeroNominasEmitidas : 0)
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
                                        <Faltantes prHeightContenedores={heightContenedoresGra} prWidthContenedores={widthContenedores} prOpenLoading={openLoading} />
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
                                        <FaltantesRegistrados prWidthContenedores={widthContenedores} prOpenLoading={openLoading} />
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
                                        <FaltantesEmitidos prHeightContenedores={heightContenedoresGra} prWidthContenedores={widthContenedores} prOpenLoading={openLoading} />
                                    </Fragment>
                                </Grid>
                            </Paper>
                        </TabPanel>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid className={classes.mb20}>
                        <Box
                            p={1.5}
                            m={1}
                            color="secondary.contrastText"
                            bgcolor="secondary.main"
                        >
                            <Typography variant="body2">Cómputo de gastos anual</Typography>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <GraficoNominas prHeightContenedores={heightContenedoresPeq} prWidthContenedores={widthContenedores} />
                        </Paper>
                    </Grid>
                    <Grid>
                        <Box
                            p={1.5}
                            m={1}
                            color="secondary.contrastText"
                            bgcolor="secondary.main"
                            style={{ maxHeight: 45, minHeight: 45, display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
                        >
                            <Grid item xs={11}>
                                <Typography variant="body2">Trabajadores de baja</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.alignRight}>
                                <Avatar
                                    className={clsx(classes.small, listadoTrabajadoresBaja.length === 0 ? classes.green : classes.red)}
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
            {/* {console.log(numeroNominasFaltantes)} */}
        </div>
    )
}

export default PantallaNominas
