import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MuiAlert from '@material-ui/lab/Alert';

//importaciones acciones
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { cambiarACuadranteNoRegistradoAccion } from '../redux/cuadrantesDucks';
import { venimosDePendientesAccion } from '../redux/pendientesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';

//estilos
import Clases from "../clases";

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Pendientes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const cuadrantesPendientesArray = useSelector(store => store.variablesPendientes.cuadrantesPendientesArray);
    const numeroCuadrantesPendientes = useSelector(store => store.variablesPendientes.numeroCuadrantesPendientes);

    //funciones

    const handleCuadrantesPendientes = (centro) => {
        dispatch(setCentroAccion(centro));
        //dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        //dispatch(registrarIntervencionCuadranteNuevoAccion(false));
        dispatch(cambiarACuadranteNoRegistradoAccion());
        dispatch(venimosDePendientesAccion(true));
    };

    //retorno componentes

    const retornaCentroGestionado = (centro, index) => {
        if (cuadrantesPendientesArray.includes(centro.id)) {
            return (
                <Box
                    key={'listaCuadrantes' + index}
                    onClick={() => handleCuadrantesPendientes(centro.id)}
                >
                    <ListItem
                        className={classes.casilla}
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
            )
        }
    };

    return (
        <div>
            <Grid
                spacing={1}
                container
                direction="column"
                justify="center"
                alignItems="center"
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
                ) : (numeroCuadrantesPendientes < 1 ? (
                    <Box p={3} style={{ width: '100%', minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores }}>
                        <Alert severity="info">No quedan cuadrantes pendientes por gestionar.</Alert>
                    </Box>
                ) : (
                    <Box
                        className={classes.scrollable}
                        style={{ width: props.prWidthContenedores, height: props.prHeightContenedores - 10, margin: 10 }}
                    >
                        <List dense={true}
                            style={{ padding: 15 }}>
                            {listadoCentros.map((centro, index) => (
                                retornaCentroGestionado(centro, index)
                            ))}
                        </List>
                    </Box>
                ))}
            </Grid>
            {/* {console.log(cuadrantesPendientesArray)} */}
        </div>
    )
}

export default Pendientes
