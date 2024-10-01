import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Avatar,
    AppBar,
    Tabs,
    Tab,
    Tooltip
} from '@material-ui/core';
import clsx from 'clsx';
import DescriptionIcon from '@material-ui/icons/Description';

//carga componentes
import Pendientes from './Pendientes';
import Bajas from '../comun/Bajas';
import GraficoCuadrantes from './graficos/GraficoCuadrantes';
import PendientesRegistrados from './PendientesRegistrados';
import PendientesFacturados from './PendientesFacturados';
import CustomSnack from '../comun/CustomSnack';

//estilos
import Clases from "../clases";

//imágenes
import iconEmpresas from '../images/app/icon_em.jpg';
import iconPisos from '../images/app/icon_pi.jpg';

//importaciones acciones
import {
    retornaAnoMesCuadranteAccion,
    finalizarArchivosXLSLoteAccion,
    generaArchivoXLSCuadrantesPendientesAccion,
    generaArchivoXLSCuadrantesRegistradosAccion,
    generaArchivoXLSCuadrantesFacturadosEmpresasAccion,
    generaArchivoXLSCuadrantesFacturadosPisosAccion
} from '../redux/appDucks';
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import {
    obtenerCuadrantesAccion,
    vaciarDatosPendientesAccion,
    gestionaCuadrantesAccion
} from '../redux/pendientesDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import {
    setDisableCargandoAccion,
    setValorTabPantallaCuadrantesAccion
} from '../redux/cuadrantesSettersDucks';
import {
    getHeightContenedoresPeq,
    getHeightContenedoresGra,
    getWidthContenedores,
    TabPanelInicio as TabPanel,
    a11yProps
} from '../logica/logicaApp';

const PantallaCuadrantes = () => {
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        numeroCuadrantesPendientes,
        numeroCuadrantesRegistrados,
        numeroCuadrantesFacturados,
        cuadrantesPendientesArray,
        arrayCuadantes,
        numeroCuadrantesBaja
    } = useSelector(store => store.variablesPendientes);
    const {
        calendarioAGestionar,
        errorDeCargaCuadrantes
    } = useSelector(store => store.variablesCuadrantes);
    const { arrayTrabajadoresBaja: listadoTrabajadoresBaja } = useSelector(store => store.variablesTrabajadores);
    const {
        errorDeCargaCentros,
        arrayCentros: listadoCentros
    } = useSelector(store => store.variablesCentros);
    const { finalizandoLoteEstado } = useSelector(store => store.variablesApp);
    const {
        valorTabPantallaCuadrantes,
        tiempoEsperaLote
    } = useSelector(store => store.variablesCuadrantesSetters);

    //states

    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
    const [heightContenedoresPeq, setHeightContenedoresPeq] = useState(getHeightContenedoresPeq(162));
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra(264));
    const [widthContenedores, setWidthContenedores] = useState(getWidthContenedores(300));
    const [valueTab, setValueTab] = useState(0);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        const resizeListener = () => {
            setHeightContenedoresPeq(getHeightContenedoresPeq(162));
            setHeightContenedoresGra(getHeightContenedoresGra(264));
            setWidthContenedores(getWidthContenedores(300));
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosAccion('centros', false));
        };
    }, [listadoCentros]);

    useEffect(() => {
        dispatch(vaciarDatosPendientesAccion());
        if (finalizandoLoteEstado) {  
            dispatch(forzarRecargaGraficosCuadrantesAccion(false));
        }
    }, [calendarioAGestionar, finalizandoLoteEstado]);

    useEffect(() => {       
        if (listadoCentros.length > 0 && finalizandoLoteEstado) {
            if (cuadrantesPendientesArray.length === 0) {
                dispatch(finalizarArchivosXLSLoteAccion(false));
                const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
                const anyoMes = year + '-' + monthNum;
                dispatch(obtenerCuadrantesAccion('cuadrantes', anyoMes));
            }
        }
    }, [listadoCentros, finalizandoLoteEstado, cuadrantesPendientesArray]);

    useEffect(() => {
        if (listadoCentros.length > 0 && !finalizandoLoteEstado) {
            if (cuadrantesPendientesArray.length === 0) {
                const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
                const anyoMes = year + '-' + monthNum;
                dispatch(obtenerCuadrantesAccion('cuadrantes', anyoMes));
            }
        }
    }, [listadoCentros, calendarioAGestionar]);

    useEffect(() => {
        if (arrayCuadantes?.length >= 0) {
            dispatch(gestionaCuadrantesAccion());
        };
    }, [arrayCuadantes]);

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
        if (((numeroCuadrantesPendientes + numeroCuadrantesRegistrados + numeroCuadrantesFacturados + numeroCuadrantesBaja) < listadoCentros.length) || tiempoEsperaLote) {
            setOpenLoading(true);
        } else {
            setOpenLoading(false);
            dispatch(setDisableCargandoAccion(false));
        };
    }, [numeroCuadrantesPendientes, numeroCuadrantesRegistrados, numeroCuadrantesFacturados, numeroCuadrantesBaja, tiempoEsperaLote]);

    useEffect(() => {
        if (valorTabPantallaCuadrantes) {
            setValueTab(valorTabPantallaCuadrantes);
            dispatch(setValorTabPantallaCuadrantesAccion(null));
        };
    }, [valorTabPantallaCuadrantes]);

    //funciones    

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue)
    };

    const handleGenerarXLSCuadrantes = (tipo) => {
        if (valueTab === 0) {
            dispatch(generaArchivoXLSCuadrantesPendientesAccion(monthLet));
        };
        if (valueTab === 1) {
            dispatch(generaArchivoXLSCuadrantesRegistradosAccion(monthLet));
        };
        if (valueTab === 2) {
            if (tipo === 'empresas') {
                dispatch(generaArchivoXLSCuadrantesFacturadosEmpresasAccion(monthLet));
            };
            if (tipo === 'pisos') {
                dispatch(generaArchivoXLSCuadrantesFacturadosPisosAccion(monthLet));
            };
        };
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
                            <Box className={classes.alignRight}>
                                <Avatar
                                    className={clsx(classes.small3, valueTab === 0 ? classes.red : valueTab === 1 ? classes.orange : classes.green)}
                                    style={{ marginRight: 8, marginTop: 3 }}
                                >
                                    <Typography variant='body2'>{
                                        valueTab === 0 ?
                                            (numeroCuadrantesPendientes ? numeroCuadrantesPendientes : 0) :
                                            valueTab === 1 ?
                                                (numeroCuadrantesRegistrados ? numeroCuadrantesRegistrados : 0) :
                                                (numeroCuadrantesFacturados ? numeroCuadrantesFacturados : 0)
                                    }</Typography>
                                </Avatar>
                                {(valueTab === 0 || valueTab === 1) && (
                                    <Tooltip title={valueTab === 0 ? 'Crear Excel listado Cuadrantes PENDIENTES ' + monthLet : 'Crear Excel listado Cuadrantes REGISTRADOS ' + monthLet} placement="top-start" arrow >
                                        <Box
                                            style={{ marginRight: 6, marginLeft: 6, cursor: 'pointer' }}
                                            onClick={() => handleGenerarXLSCuadrantes('no')}
                                        >
                                            <DescriptionIcon style={{ color: 'white', marginTop: 5 }} />
                                        </Box>
                                    </Tooltip>
                                )}
                                {valueTab === 2 && (
                                    <Fragment>
                                        <Tooltip title={'Crear Excel listado Cuadrantes FACTURADOS EMPRESAS ' + monthLet} placement="top-start" arrow >
                                            <Box
                                                style={{ marginRight: 8, marginLeft: 3, cursor: 'pointer' }}
                                                onClick={() => handleGenerarXLSCuadrantes('empresas')}
                                            >
                                                <img style={{ marginTop: 5 }} src={iconEmpresas} alt="iconEmpresas" />
                                            </Box>
                                        </Tooltip>
                                        <Tooltip title={'Crear Excel listado Cuadrantes FACTURADOS PISOS ' + monthLet} placement="top-start" arrow >
                                            <Box
                                                style={{ marginRight: 0, marginLeft: 6, cursor: 'pointer' }}
                                                onClick={() => handleGenerarXLSCuadrantes('pisos')}
                                            >
                                                <img style={{ marginTop: 5 }} src={iconPisos} alt="iconPisos" />
                                            </Box>
                                        </Tooltip>
                                    </Fragment>
                                )}
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
                                        <PendientesFacturados prWidthContenedores={widthContenedores} prOpenLoading={openLoading} prMes={monthLet} />
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
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
            {/* {console.log(numeroCuadrantesPendientes, numeroCuadrantesRegistrados, numeroCuadrantesFacturados)} */}
        </div>
    )
}

export default PantallaCuadrantes
