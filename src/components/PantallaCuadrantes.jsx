import React from 'react';
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';

//carga componentes
import Pendientes from './Pendientes';

//importaciones acciones
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';

const estilos = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    formInput: {
        marginBottom: '10px',
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    green: {
        color: 'white',
        backgroundColor: green[500],
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const h2 = (window.innerHeight / 2) - 200;

const PantallaCuadrantes = () => {

    const classes = estilos();
    const dispatch = useDispatch();
    const numeroCentrosPendientes = useSelector(store => store.variablesPendientes.numeroCentrosPendientes);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);

    //states

    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar)); 

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
                        <Grid item xs={1}>
                            <Avatar
                                className={clsx(classes.small, numeroCentrosPendientes === 0 ? classes.green : classes.red)}
                            >
                                <Typography variant='body2'>{numeroCentrosPendientes}</Typography>
                            </Avatar>
                        </Grid>
                    </Box>
                    <Paper
                        elevation={1}
                        style={{ minHeight: h2, maxHeight: h2, margin: 8 }}
                    >
                        {numeroCentrosPendientes === 0 ? (
                            <Box p={3}>
                                No quedan cuadrantes pendientes por gestionar.
                            </Box>
                        ) : (
                            <Pendientes />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        p={1.5}
                        m={1}
                        color="secondary.contrastText"
                        bgcolor="secondary.main"
                    >
                        <Typography variant="body2">Cómputo de gastos</Typography>
                    </Box>
                    <Paper
                        elevation={1}
                        style={{ minHeight: h2, margin: 8 }}
                    >
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        p={1.5}
                        m={1}
                        color="secondary.contrastText"
                        bgcolor="secondary.main"
                    >
                        <Typography variant="body2">Trabajadores de baja</Typography>
                    </Box>
                    <Paper
                        elevation={1}
                        style={{ minHeight: h2, margin: 8 }}
                    >
                    </Paper>
                </Grid>
                <Grid item xs={6}>
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
                        style={{ minHeight: h2, margin: 8 }}
                    >
                    </Paper>
                </Grid>
            </Grid>
            {/* {console.log(retornaCuadrantesPendientesParent)} */}
        </div>
    )
}

export default PantallaCuadrantes
