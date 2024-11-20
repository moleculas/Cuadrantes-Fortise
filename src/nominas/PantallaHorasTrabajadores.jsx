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
    Tooltip,
} from '@material-ui/core';
import clsx from 'clsx';
import DescriptionIcon from '@material-ui/icons/Description';

//carga componentes
import ListadoHorasTrabajadores from './ListadoHorasTrabajadores';
import Bajas from '../comun/Bajas';
import GraficoHorasTrabjadores from './graficos/GraficoHorasTrabjadores';
import CustomSnack from '../comun/CustomSnack';

//estilos
import Clases from "../clases";

//importaciones acciones
import {
    retornaAnoMesCuadranteAccion,
    generaArchivoXLSHorasTrabajadoresAccion
} from '../redux/appDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import {
    obtenerHorasTrabajadoresAccion,
    vaciarDatosHorasTrabajadoresAccion
} from '../redux/horasTrabajadoresDucks';

import {
    TabPanelInicio as TabPanel,
    a11yProps,
    getHeightContenedoresPeq,
    getHeightContenedoresGra,
    getWidthContenedores
} from '../logica/logicaApp';

const PantallaHorasTrabajadores = () => {
    const classes = Clases();
    const dispatch = useDispatch();

    const {
        calendarioAGestionarHorasTrabajadores,
        errorDeCargaHorasTrabajadores,
        arrayHorasTrabajadores
    } = useSelector(store => store.variablesHorasTrabajadores);

    const {
        arrayTrabajadores: listadoTrabajadores,
        arrayTrabajadoresBaja: listadoTrabajadoresBaja,
        errorDeCargaTrabajadores
    } = useSelector(store => store.variablesTrabajadores);

    //states

    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarHorasTrabajadores));
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
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores', false));
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(vaciarDatosHorasTrabajadoresAccion());
    }, [calendarioAGestionarHorasTrabajadores]);

    useEffect(() => {
        if (listadoTrabajadores.length > 0) {
            if (!arrayHorasTrabajadores) {
                const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarHorasTrabajadores));
                const anyoMes = year + '-' + monthNum;
                dispatch(obtenerHorasTrabajadoresAccion('horasTrabajadores', anyoMes, listadoTrabajadores));
            }
        }
    }, [listadoTrabajadores, calendarioAGestionarHorasTrabajadores, arrayHorasTrabajadores]);

    useEffect(() => {
        if (errorDeCargaTrabajadores || errorDeCargaHorasTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores, errorDeCargaHorasTrabajadores]);

    useEffect(() => {
        if (!arrayHorasTrabajadores) {
            setOpenLoading(true)
        } else {
            setOpenLoading(false)
        };
    }, [arrayHorasTrabajadores]);

    //funciones    

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
                                <Tooltip title={'Cómputo de horas trabajadores del mes de ' + monthLet + ' pendientes de gestionar'} placement="top-start" arrow>
                                    <Tab label={'Trabajadores'} {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                </Tooltip>
                            </Tabs>
                            <Box className={classes.alignRight}>
                                <Avatar
                                    className={clsx(classes.small, valueTab === 0 && classes.bgHTTaronja)}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                >
                                    <Typography variant='body2'>{
                                        valueTab === 0 && (arrayHorasTrabajadores?.length || 0)
                                    }</Typography>
                                </Avatar>
                                <Tooltip title={'Crear Excel listado horas Trabajadores'} placement="top-start" arrow >
                                    <Box
                                        style={{ marginRight: 6, cursor: 'pointer' }}
                                        onClick={() => dispatch(generaArchivoXLSHorasTrabajadoresAccion(monthLet))}
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
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    p={0}
                                    style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra }}
                                >
                                    <Fragment>
                                        <ListadoHorasTrabajadores prHeightContenedores={heightContenedoresGra} prWidthContenedores={widthContenedores} prOpenLoading={openLoading} />
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
                            <Typography variant="body2">Cómputo de horas anual</Typography>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                            <GraficoHorasTrabjadores prHeightContenedores={heightContenedoresPeq} prWidthContenedores={widthContenedores} />
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
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
        </div>
    )
}

export default PantallaHorasTrabajadores
