import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';

//importaciones acciones
import { cambioEstadoInicioNominasAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonRegistrarNominaAccion } from '../redux/nominasDucks';
import { registrarIntervencionNominaNuevaAccion } from '../redux/nominasDucks';
import { venimosDeRegistradosFaltantesAccion } from '../redux/faltantesDucks';
import { setTrabajadorAccion } from '../redux/nominasDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';

//estilos
import Clases from "../clases";

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const FaltantesEmitidos = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const nominasEmitidasArray = useSelector(store => store.variablesFaltantes.nominasEmitidasArray);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const numeroNominasEmitidas = useSelector(store => store.variablesFaltantes.numeroNominasEmitidas);

    //states    

    //useEffect

    //funciones

    const handleNominasEmitidas = (trabajador) => {
        dispatch(setTrabajadorAccion(trabajador));
        dispatch(obtenerTrabajadorAccion('trabajadores', trabajador));
        dispatch(cambioEstadoInicioNominasAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarNominaAccion(false));
        dispatch(registrarIntervencionNominaNuevaAccion(false));
        dispatch(venimosDeRegistradosFaltantesAccion(true));
    };

    //retorno componentes

    const retornaNominaEmitida = (nomina, index) => {
        let nombreSplitted;
        nombreSplitted = nomina.nombre.split("-");
        const nombreTrabajador = dispatch(obtenerObjetoPorIdAccion(listadoTrabajadores, parseInt(nombreSplitted[2])));
        return (
            <Box
                key={'listaNominas' + index}
            >
                <ListItem
                    className={classes.casilla}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <ListItemText
                        primary={nombreTrabajador} secondary={'Emitida el ' + nomina.actualizacion}
                        onClick={() => handleNominasEmitidas(parseInt(nombreSplitted[2]))}
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
                direction="column"
                alignItems="center"
                justify="center"
                p={2}
                className={classes.rootPendientes}
                style={{ minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores, width: props.prWidthContenedores + 10 }}
            >
                {props.prOpenLoading ? (
                    <Box
                        className={classes.centrado}
                    >
                        <CircularProgress />
                    </Box>
                ) : (numeroNominasEmitidas < 1 ? (
                    <Box p={3} style={{ width: '100%', minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores }}>
                        <Alert severity="info">No hay nóminas emitidas por gestionar.</Alert>
                    </Box>
                ) : (
                    <Box
                        className={classes.scrollable}
                        style={{ width: props.prWidthContenedores, height: props.prHeightContenedores - 10, margin: 10 }}
                    >
                        <List dense={true}
                            style={{ padding: 15 }}>
                            {nominasEmitidasArray.map((nomina, index) => (
                                retornaNominaEmitida(nomina, index)
                            ))}
                        </List>
                    </Box>
                ))}
            </Grid>
            {/* {console.log(checked)} */}
        </div>
    )
}

export default FaltantesEmitidos
