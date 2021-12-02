import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//importaciones acciones
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { obtenerCuadrantesPendientesAccion } from '../redux/pendientesDucks';
import { forzarRecargaPendientesAccion } from '../redux/pendientesDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { registrarIntervencionCuadranteNuevoAccion } from '../redux/cuadrantesDucks';
import { cambiarACuadranteNoRegistradoAccion } from '../redux/cuadrantesDucks';
import { venimosDePendientesAccion } from '../redux/pendientesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';

//estilos
import Clases from "../clases";

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Pendientes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const errorDeCargaCuadrantes = useSelector(store => store.variablesCuadrantes.errorDeCargaCuadrantes);
    const openLoadingCuadrantes = useSelector(store => store.variablesCuadrantes.loadingCuadrantes);
    const centrosPendientesArray = useSelector(store => store.variablesPendientes.centrosPendientesArray);
    const forzarRecargaPendientes = useSelector(store => store.variablesPendientes.forzarRecargaPendientes);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);
    const openLoadingPendientes = useSelector(store => store.variablesPendientes.loadingPendientes);    

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        if (forzarRecargaPendientes || calendarioAGestionar) {
            dispatch(obtenerCentrosAccion('centros'));
            dispatch(forzarRecargaPendientesAccion(false));
        }
    }, [forzarRecargaPendientes, calendarioAGestionar]);

    useEffect(() => {
        if (listadoCentros.length > 0) {
            const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
            const anyoMes = year + '-' + monthNum;
            dispatch(obtenerCuadrantesPendientesAccion('cuadrantes', anyoMes, listadoCentros));
        }
    }, [listadoCentros]);

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
        if (!openLoadingCuadrantes || !openLoadingPendientes) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCuadrantes,openLoadingPendientes]);

    //funciones    

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleCuadrantesPendientes = (centro) => {
        dispatch(setCentroAccion(centro));
        dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        dispatch(registrarIntervencionCuadranteNuevoAccion(false));
        dispatch(cambiarACuadranteNoRegistradoAccion());
        dispatch(venimosDePendientesAccion(true));
    };

    //retorno componentes

    const retornaCentroGestionado = (centro, index) => {
        if (centrosPendientesArray.includes(centro.id)) {
            return (
                <Box
                    key={'listaCuadrantes' + index}
                    onClick={() => handleCuadrantesPendientes(centro.id)}
                >
                    <ListItem
                        className={classes.casilla}
                    >
                        <ListItemText
                            secondary={centro.nombre}
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
                style={{ minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores }}
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
                        style={{ width: '100%', height: props.prHeightContenedores - 10, margin: 10 }}
                    >
                        <List dense={true}
                            style={{ padding: 15 }}>
                            {listadoCentros.map((centro, index) => (
                                retornaCentroGestionado(centro, index)
                            ))}
                        </List>
                    </Box>
                )}
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(forzarRecargaPendientes)} */}
        </div>
    )
}

export default Pendientes
