import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';

//carga componentes
import Pendientes from './Pendientes';
import Bajas from './Bajas';
import GraficoCuadrantes from './GraficoCuadrantes';

//estilos
import Clases from "../clases";

//importaciones acciones
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';

const getHeightContenedoresPeq = () => ((window.innerHeight / 2) - 190) || ((document.documentElement.clientHeight / 2) - 190) || ((document.body.clientHeight / 2) - 190);
const getHeightContenedoresGra = () => ((window.innerHeight) - 310) || ((document.documentElement.clientHeight) - 310) || ((document.body.clientHeight) - 310); 
const getWidthContenedores = () => ((window.innerWidth - 300) / 2) || ((document.documentElement.clientWidth - 300) / 2) || ((document.body.clientWidth - 300) / 2);

const PantallaCuadrantes = () => {

    const classes = Clases();
    const dispatch = useDispatch();
    const numeroCentrosPendientes = useSelector(store => store.variablesPendientes.numeroCentrosPendientes);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);
    const listadoTrabajadoresBaja = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresBaja);

    //states

    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
    const [heightContenedoresPeq, setHeightContenedoresPeq] = useState(getHeightContenedoresPeq());
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra());
    const [widthContenedores, setWidthContenedores] = useState(getWidthContenedores());

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

    //funciones       

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
                    <Box
                        p={1.5}
                        m={1}
                        color="secondary.contrastText"
                        bgcolor="secondary.main"
                        style={{ maxHeight: 45, minHeight: 45, display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
                    >
                        <Grid item xs={11}>
                            <Typography variant="body2">Cuadrantes del mes de {monthLet} pendientes de gestionar</Typography>
                        </Grid>
                        <Grid item xs={1} className={classes.alignRight}>
                            <Avatar
                                className={clsx(classes.small, numeroCentrosPendientes === 0 ? classes.green : classes.red)}
                            >
                                <Typography variant='body2'>{numeroCentrosPendientes}</Typography>
                            </Avatar>
                        </Grid>
                    </Box>
                    <Paper
                        elevation={1}
                        style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, margin: 8 }}
                    >
                        {numeroCentrosPendientes === 0 ? (
                            <Box p={3}>
                                No quedan cuadrantes pendientes por gestionar.
                            </Box>
                        ) : (
                            <Pendientes prHeightContenedores={heightContenedoresGra} />
                        )}
                    </Paper>
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
                            <GraficoCuadrantes prHeightContenedores={heightContenedoresPeq} prWidthContenedores={widthContenedores} />
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
            {/* {console.log(retornaCuadrantesPendientesParent)} */}
        </div>
    )
}

export default PantallaCuadrantes
