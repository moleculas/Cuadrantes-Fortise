import React, { useState, useEffect, Fragment } from 'react';
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
import Typography from '@material-ui/core/Typography';

//importaciones acciones
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { venimosDeRegistradosAccion } from '../redux/pendientesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';

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
    const numeroCuadrantesFacturados = useSelector(store => store.variablesPendientes.numeroCuadrantesFacturados);
    const [arrayCuadrantesModificadosFacturados, setArrayCuadrantesModificadosFacturados] = useState([]);

    //useEffect

    useEffect(() => {
        if (cuadrantesFacturadosArray.length > 0) {
            let cuadrantes = [];          
            cuadrantesFacturadosArray.forEach((cuadrante, index) => {               
                const nombreSplitted = cuadrante.nombre.split("-");
                const objeto = {
                    ...cuadrante,
                    ['nombreCentro']: cuadrante.total.nombreCentro,
                    idCentro: nombreSplitted[2]
                };
                cuadrantes.push(objeto);
            });
            cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
            setArrayCuadrantesModificadosFacturados(cuadrantes);
        };
    }, [cuadrantesFacturadosArray]);

    //funciones

    const handleCuadrantesFacturados = (centro) => {
        dispatch(setCentroAccion(centro));
        dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        //dispatch(registrarIntervencionCuadranteNuevoAccion(true));
        dispatch(venimosDeRegistradosAccion(true));
    };

    //retorno componentes

    const retornaCuadranteFacturado = (cuadrante, index) => {
        const nombreSplitted = cuadrante.nombre.split("-");     
        return (
            <Box
                key={'listaCuadrantes' + index}
            >
                <ListItem
                    className={cuadrante.total.procesado.valor === 'si' ? classes.casillaProcesados : classes.casilla}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <ListItemText
                        primary={cuadrante.total.subNombreCentro ? (cuadrante.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.nombreCentro}
                        secondary={
                            cuadrante.total.procesado.valor === 'no' ? (
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Facturado el {cuadrante.actualizacion}
                                    </Typography>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Emitido el {cuadrante.actualizacion}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    > {
                                            cuadrante.total.procesado.numR ? 'Recibo nº ' + cuadrante.total.procesado.numR :
                                                'Factura nº ' + cuadrante.total.procesado.numF
                                        }
                                    </Typography>
                                </Fragment>
                            )}
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
                            {arrayCuadrantesModificadosFacturados.map((cuadrante, index) => (
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
