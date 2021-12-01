import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';

//carga componentes

//estilos
import Clases from "../clases";

//importaciones acciones
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';

const getHeightContenedoresPeq = () => ((window.innerHeight / 2) - 190) || ((document.documentElement.clientHeight / 2) - 190) || ((document.body.clientHeight / 2) - 190);
const getHeightContenedoresGra = () => ((window.innerHeight) - 310) || ((document.documentElement.clientHeight) - 310) || ((document.body.clientHeight) - 310);
const getWidthContenedores = () => ((window.innerWidth - 300) / 2) || ((document.documentElement.clientWidth - 300) / 2) || ((document.body.clientWidth - 300) / 2);

const PantallaNominas = () => {

    const classes = Clases();
    const dispatch = useDispatch();
    const calendarioAGestionarNominas = useSelector(store => store.variablesNominas.calendarioAGestionarNominas);

    //states

    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarNominas));
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
                            <Typography variant="body2">Nóminas del mes de {monthLet} pendientes de gestionar</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            {/* <Avatar
                                className={clsx(classes.small, numeroCentrosPendientes === 0 ? classes.green : classes.red)}
                            >
                                <Typography variant='body2'>{numeroCentrosPendientes}</Typography>
                            </Avatar> */}
                        </Grid>
                    </Box>
                    <Paper
                        elevation={1}
                        style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, margin: 8 }}
                    >
                        {/* {numeroCentrosPendientes === 0 ? (
                            <Box p={3}>
                                No quedan cuadrantes pendientes por gestionar.
                            </Box>
                        ) : (
                           //
                        )} */}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Grid className={classes.mb15}>
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

                        </Paper>
                    </Grid>
                    <Grid>
                        <Box
                            p={1.5}
                            m={1}
                            color="secondary.contrastText"
                            bgcolor="secondary.main"
                        >
                            <Typography variant="body2">Día</Typography>
                        </Box>
                        <Paper
                            elevation={1}
                            style={{ minHeight: heightContenedoresPeq, maxHeight: heightContenedoresPeq, margin: 8 }}
                        >
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            {/* {console.log(retornaCuadrantesPendientesParent)} */}
        </div>
    )
}

export default PantallaNominas
