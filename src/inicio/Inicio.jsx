import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import Constantes from "../constantes";
import {
    Box,
    Grid,
    Typography,
    Paper,
    Avatar,
    AppBar,
    Tabs,
    Tab,
    CircularProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip
} from '@material-ui/core';
import clsx from 'clsx';
import {
    ExitToApp as ExitToAppIcon,
    Description as DescriptionIcon
} from '@material-ui/icons';
import { Link } from "react-router-dom";

//carga componentes
import GraficoInicio from './graficos/GraficoInicio';
import CustomSnack from '../comun/CustomSnack';

//estilos
import Clases from "../clases";

//importaciones acciones
import {
    onEstemAccion,
    obtenerUltimasIntervencionesAccion,
    obtenerObjetoPorIdAccion,
    generaArchivoXLSCentrosAccion,
    generaArchivoXLSTrabajadoresAccion
} from '../redux/appDucks';
import { obtenerCentrosInicioAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import {
    forzarRecargaGraficosCuadrantesAccion,
    forzarRecargaGraficosHorasTrabajadoresAccion
} from '../redux/graficosDucks';
import {
    getHeightContenedoresPeq,
    getHeightContenedoresGra,
    getWidthContenedores,
    TabPanelInicio as TabPanel,
    a11yProps
} from '../logica/logicaApp';

//constantes
const meses = Constantes.MESES;

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

    const [heightContenedoresPeq, setHeightContenedoresPeq] = useState(getHeightContenedoresPeq(107));
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra(155));
    const [widthContenedores, setWidthContenedores] = useState(getWidthContenedores(300));
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
            dispatch(obtenerTrabajadoresAccion('trabajadores', false));
        };
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
        dispatch(forzarRecargaGraficosHorasTrabajadoresAccion(true));
        dispatch(obtenerUltimasIntervencionesAccion());
    }, [dispatch]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
    }, []);

    useEffect(() => {
        const resizeListener = () => {
            setHeightContenedoresPeq(getHeightContenedoresPeq(107));
            setHeightContenedoresGra(getHeightContenedoresGra(155));
            setWidthContenedores(getWidthContenedores(300));
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

    const handleGenerarXLS = () => {
        if (valueTab === 0) {
            dispatch(generaArchivoXLSCentrosAccion());
        } else {
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
                            primary={centro.sub_nombre ? (centro.nombre + " - " + centro.sub_nombre) : centro.nombre}
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
                                <Tooltip title={valueTab === 0 ? 'Crear Excel listado CENTROS' : 'Crear Excel listado TRABAJADORES'} placement="top-start" arrow >
                                    <Box
                                        style={{ marginRight: 10, cursor: 'pointer' }}
                                        onClick={handleGenerarXLS}
                                    >
                                        <DescriptionIcon style={{ color: 'white', marginTop: 5 }} />
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
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
            {/* {console.log(listadoCentros)} */}
        </div >
    )
}

export default withRouter(Inicio)