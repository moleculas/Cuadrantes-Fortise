import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//importaciones acciones
import { onEstemAccion } from '../redux/appDucks';
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';

//estilos
import Clases from "../clases";

const getHeightContenedoresPeq = () => ((window.innerHeight / 2) - 130) || ((document.documentElement.clientHeight / 2) - 130) || ((document.body.clientHeight / 2) - 130);
const getHeightContenedoresGra = () => ((window.innerHeight) - 188) || ((document.documentElement.clientHeight) - 188) || ((document.body.clientHeight) - 188);
const getWidthContenedores = () => ((window.innerWidth - 300) / 2) || ((document.documentElement.clientWidth - 300) / 2) || ((document.body.clientWidth - 300) / 2);

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
                <Box p={3}>
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

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Inicio = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);

    //states

    const [heightContenedoresPeq, setHeightContenedoresPeq] = useState(getHeightContenedoresPeq());
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra());
    const [widthContenedores, setWidthContenedores] = useState(getWidthContenedores());
    const [valueTab, setValueTab] = useState(0);
    const [openLoading, setOpenLoading] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        dispatch(onEstemAccion('inicio'));
        dispatch(obtenerCentrosAccion('centros'));
        dispatch(obtenerTrabajadoresAccion('trabajadores'));
    }, [dispatch]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
    }, []);

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
        if (errorDeCargaCentros || errorDeCargaTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaCentros, errorDeCargaTrabajadores]);

    useEffect(() => {
        if (!openLoadingCentros || !openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCentros, openLoadingTrabajadores]);

    //funciones    

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue)
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    //retorno componentes

    const retornaCentros = (centro, index) => {
        return (
            <Box
                key={'listaCentros' + index}
            //onClick={() => handleCuadrantesPendientes(centro.id)}
            >
                <ListItem
                    className={classes.casilla}
                >
                    <ListItemText
                        secondary={centro.nombre}
                    />
                    <ListItemSecondaryAction>
                        <ExitToAppIcon
                            className={classes.gris}
                        />
                    </ListItemSecondaryAction>
                </ListItem >
            </Box >
        )
    };

    const retornaTrabajadores = (trabajador, index) => {
        return (
            <Box
                key={'listaTrabajadores' + index}
            //onClick={() => handleCuadrantesPendientes(centro.id)}
            >
                <ListItem
                    className={trabajador.estado !== 'alta' ? classes.casillaBajasInicio : classes.casilla}
                >
                    <ListItemText
                        secondary={trabajador.estado !== 'alta' ? trabajador.nombre +' ('+trabajador.estado+')' :trabajador.nombre}
                    />
                    <ListItemSecondaryAction>
                        <ExitToAppIcon
                            className={classes.gris}
                        />
                    </ListItemSecondaryAction>
                </ListItem >
            </Box >
        )
    };
    return (
        <div>
            <Grid
                spacing={1}
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
                style={{ padding: 10 }}
            >
                <Grid item xs={6}>
                    <Grid style={{ padding: 8 }}>
                        <AppBar position="static"
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <Tabs value={valueTab} onChange={handleChangeTab}>
                                <Tab label="Centros" {...a11yProps(0)} />
                                <Tab label="Trabajadores" {...a11yProps(1)} />
                            </Tabs>
                            <Avatar
                                className={clsx(classes.small, classes.secLight)}
                                style={{ marginRight: 8 }}
                            >
                                <Typography variant='body2'>{valueTab === 0 ? listadoCentros.length : listadoTrabajadores.length}</Typography>
                            </Avatar>
                        </AppBar>
                        <TabPanel value={valueTab} index={0}>
                            <Paper
                                elevation={1}
                                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: -8, marginLeft: -24, marginRight: -24 }}
                            >
                                <Grid
                                    spacing={1}
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    p={2}
                                    className={classes.rootPendientes}
                                    style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra }}
                                >
                                    {openLoading ? (
                                        <Box
                                            className={classes.centrado}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <Box
                                            className={classes.scrollable}
                                            style={{ width: '100%', height: heightContenedoresGra - 10, margin: 10 }}
                                        >
                                            <List dense={true}
                                                style={{ padding: 15 }}>
                                                {listadoCentros.map((centro, index) => (
                                                    retornaCentros(centro, index)
                                                ))}
                                            </List>
                                        </Box>
                                    )}
                                </Grid>
                            </Paper>
                        </TabPanel>
                        <TabPanel value={valueTab} index={1}>
                            <Paper
                                elevation={1}
                                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: -8, marginLeft: -24, marginRight: -24 }}
                            >
                                <Grid
                                    spacing={1}
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    p={2}
                                    className={classes.rootPendientes}
                                    style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra }}
                                >
                                    {openLoading ? (
                                        <Box
                                            className={classes.centrado}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <Box
                                            className={classes.scrollable}
                                            style={{ width: '100%', height: heightContenedoresGra - 10, margin: 10 }}
                                        >
                                            <List dense={true}
                                                style={{ padding: 15 }}>
                                                {listadoTrabajadores.map((trabajador, index) => (
                                                    retornaTrabajadores(trabajador, index)
                                                ))}
                                            </List>
                                        </Box>
                                    )}
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
                            <Typography variant="body2">Cómputo de ingresos anual</Typography>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <p>olakease</p>
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

                            </Grid>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <p>olakease</p>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default withRouter(Inicio)