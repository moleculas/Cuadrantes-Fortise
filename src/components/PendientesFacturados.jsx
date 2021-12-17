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
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { registrarIntervencionCuadranteNuevoAccion } from '../redux/cuadrantesDucks';
import { venimosDeRegistradosAccion } from '../redux/pendientesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';

//estilos
import Clases from "../clases";

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PendientesFacturados = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const cuadrantesFacturadosArray = useSelector(store => store.variablesPendientes.cuadrantesFacturadosArray);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const numeroCuadrantesFacturados = useSelector(store => store.variablesPendientes.numeroCuadrantesFacturados);

    //states    

    //useEffect

    //funciones

    const handleCuadrantesFacturados = (centro) => {
        dispatch(setCentroAccion(centro));
        dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        dispatch(registrarIntervencionCuadranteNuevoAccion(true));
        dispatch(venimosDeRegistradosAccion(true));
    };

    //retorno componentes

    const retornaCuadranteFacturado = (cuadrante, index) => {
        let nombreSplitted;
        nombreSplitted = cuadrante.nombre.split("-");
        const nombreCentro = dispatch(obtenerObjetoPorIdAccion(listadoCentros, parseInt(nombreSplitted[2])));
        return (
            <Box
                key={'listaCuadrantes' + index}
            >
                <ListItem
                    className={classes.casilla}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <ListItemText
                        primary={nombreCentro} secondary={'Facturado el ' + cuadrante.actualizacion}
                        onClick={() => handleCuadrantesFacturados(parseInt(nombreSplitted[2]))}
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
                ) : (numeroCuadrantesFacturados < 1 ? (
                    <Box p={3} style={{ width: '100%', minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores }}>
                            <Alert severity="info">No hay cuadrantes facturados por gestionar.</Alert>
                        </Box>
                    ) : (
                        <Box
                        className={classes.scrollable}
                        style={{ width: props.prWidthContenedores, height: props.prHeightContenedores - 10, margin: 10 }}
                    >
                        <List dense={true}
                            style={{ padding: 15 }}>
                            {cuadrantesFacturadosArray.map((cuadrante, index) => (
                                retornaCuadranteFacturado(cuadrante, index)
                            ))}
                        </List>
                    </Box>
                    ))}
            </Grid>
            {/* {console.log(checked)} */}
        </div>
    )
}

export default PendientesFacturados
