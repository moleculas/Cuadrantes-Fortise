import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import Constantes from "../constantes";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import PrintIcon from '@material-ui/icons/Print';

//carga componentes
import GraficoInicio from './GraficoInicio';

//estilos
import Clases from "../clases";

//importaciones acciones
import { onEstemAccion } from '../redux/appDucks';
import { obtenerCentrosInicioAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import { forzarRecargaGraficosNominasAccion } from '../redux/graficosDucks';
import { obtenerUltimasIntervencionesAccion } from '../redux/appDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';
import { generaArchivoXLSCentrosAccion } from '../redux/appDucks';
import { generaArchivoXLSTrabajadoresAccion } from '../redux/appDucks';

//constantes
const meses = Constantes.MESES;

const getHeightContenedoresPeq = () => ((window.innerHeight / 2) - 107) || ((document.documentElement.clientHeight / 2) - 107) || ((document.body.clientHeight / 2) - 107);
const getHeightContenedoresGra = () => ((window.innerHeight) - 155) || ((document.documentElement.clientHeight) - 155) || ((document.body.clientHeight) - 155);
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
    const arrayUltimasIntervenciones = useSelector(store => store.variablesApp.arrayUltimasIntervenciones);
    const errorDeCargaUltimasIntervenciones = useSelector(store => store.variablesApp.errorDeCargaUltimasIntervenciones);

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
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosInicioAccion('centros'));
        };
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        };
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
        dispatch(forzarRecargaGraficosNominasAccion(true));
        dispatch(obtenerUltimasIntervencionesAccion());
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
        if (errorDeCargaCentros || errorDeCargaTrabajadores || errorDeCargaUltimasIntervenciones) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaCentros, errorDeCargaTrabajadores, errorDeCargaUltimasIntervenciones]);

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

    const handleGenerarXLS = () => {
        if(valueTab === 0){
            dispatch(generaArchivoXLSCentrosAccion());
        }else{
            dispatch(generaArchivoXLSTrabajadoresAccion()); 
        };
    };

    //retorno componentes

    const retornaCentros = (centro, index) => {
        return (
            <Link key={'listaCentros' + index} to={`/centros/${centro.id}/${centro.nombre}`} className={classes.link}>
                <Box >
                    <ListItem
                        className={centro.estado !== 'alta' ? classes.casillaBajasInicio : classes.casilla}
                    >
                        <ListItemText
                            primary={centro.nombre}
                        />
                        <ListItemSecondaryAction>
                            <ExitToAppIcon
                                className={classes.gris}
                            />
                        </ListItemSecondaryAction>
                    </ListItem >
                </Box >
            </Link>
        )
    };

    const retornaTrabajadores = (trabajador, index) => {
        return (
            <Link key={'listaTrabajadores' + index} to={`/trabajadores/${trabajador.id}/${trabajador.nombre}`} className={classes.link}>
                <Box>
                    <ListItem
                        className={trabajador.estado !== 'alta' ? classes.casillaBajasInicio : classes.casilla}
                    >
                        <ListItemText
                            primary={trabajador.estado !== 'alta' ? trabajador.nombre + ' (' + trabajador.estado + ')' : trabajador.nombre}
                        />
                        <ListItemSecondaryAction>
                            <ExitToAppIcon
                                className={classes.gris}
                            />
                        </ListItemSecondaryAction>
                    </ListItem >
                </Box >
            </Link>
        )
    };

    const retornaUltimasIntervenciones = (intervencion, index) => {
        let nombreSplitted;
        if (Object.keys(intervencion)[0] === 'nombre_cuadrante') {
            nombreSplitted = intervencion.nombre_cuadrante.split("-");
            const nombreCentro = dispatch(obtenerObjetoPorIdAccion(listadoCentros, parseInt(nombreSplitted[2])));
            return (
                <Box key={'ultimaIntervencion' + index}>
                    <ListItem>
                        <ListItemText
                            primary={'Cuadrante ' + meses[nombreSplitted[1] - 1] + '/' + nombreSplitted[0] + ' Centro: ' + nombreCentro} secondary={'Actualizado el ' + intervencion.actualizacion}
                        />
                    </ListItem >
                </Box >
            )
        };
        if (Object.keys(intervencion)[0] === 'nombre_nomina') {
            nombreSplitted = intervencion.nombre_nomina.split("-");
            const nombreTrabajador = dispatch(obtenerObjetoPorIdAccion(listadoTrabajadores, parseInt(nombreSplitted[2])));
            return (
                <Box key={'ultimaIntervencion' + index}>
                    <ListItem>
                        <ListItemText
                            primary={'Nómina ' + meses[nombreSplitted[1] - 1] + '/' + nombreSplitted[0] + ' Trabajador: ' + nombreTrabajador} secondary={'Actualizada el ' + intervencion.actualizacion}
                        />
                    </ListItem >
                </Box >
            )
        }
    };

    return (
        <div>
            <Grid
                spacing={1}
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={6}>
                    <Grid style={{ padding: 8 }}>
                        <AppBar position="static"
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <Tabs value={valueTab} onChange={handleChangeTab} className={classes.tabsStl}>
                                <Tab label="Centros" {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                <Tab label="Trabajadores" {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                            </Tabs>
                            <Box className={classes.alignRight}>
                                <Avatar
                                    className={clsx(classes.small3, classes.secLight)}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                >
                                    <Typography variant='body2'>{valueTab === 0 ? listadoCentros.length : listadoTrabajadores.length}</Typography>
                                </Avatar>
                                <Tooltip title={valueTab === 0 ? 'Crear Excel listado CENTROS' : 'Crear Excel listado TRABAJADORES'} placement="left" arrow >
                                    <Box
                                        style={{ marginRight: 10, cursor: 'pointer' }}
                                        onClick={handleGenerarXLS}
                                    >
                                        <PrintIcon style={{ color: 'white', marginTop: 5 }} />
                                    </Box>
                                </Tooltip>
                            </Box>
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
                                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: -20, marginLeft: -24, marginRight: -24 }}
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
                            m={1}
                            color="primary.contrastText"
                            bgcolor="primary.main"
                            className={clsx(classes.sombraBox, classes.boxStl)}
                        >
                            <Typography variant="body2">Cómputo anual de ingresos vs gastos</Typography>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <GraficoInicio prHeightContenedores={heightContenedoresPeq} prWidthContenedores={widthContenedores} />
                        </Paper>
                    </Grid>
                    <Grid>
                        <Box
                            m={1}
                            color="primary.contrastText"
                            bgcolor="primary.main"
                            className={clsx(classes.sombraBox, classes.boxStl)}
                        >
                            <Typography variant="body2">Últimas intervenciones en la base de datos</Typography>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <Grid
                                spacing={1}
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                p={2}
                                className={classes.rootPendientes}
                                style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq }}
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
                                        style={{ width: '100%', height: heightContenedoresPeq - 10, margin: 10 }}
                                    >
                                        <List dense={true}
                                            style={{ padding: 15 }}>
                                            {arrayUltimasIntervenciones.map((intervencion, index) => (
                                                retornaUltimasIntervenciones(intervencion, index)
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(listadoCentros)} */}
        </div >
    )
}

export default withRouter(Inicio)