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
import { obtenerTrabajadoresFaltantesAccion } from '../redux/faltantesDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';
import { setTrabajadorAccion } from '../redux/nominasDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { cambioEstadoInicioNominasAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonRegistrarNominaAccion } from '../redux/nominasDucks';
import { registrarIntervencionNominaNuevaAccion } from '../redux/nominasDucks';
import { cambiarANominaNoRegistradaAccion } from '../redux/nominasDucks';
import { venimosDeFaltantesAccion } from '../redux/faltantesDucks';
import { vaciarDatosFaltantesAccion } from '../redux/faltantesDucks';

//estilos
import Clases from "../clases";

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Faltantes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const errorDeCargaNominas = useSelector(store => store.variablesNominas.errorDeCargaNominas);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const openLoadingNominas = useSelector(store => store.variablesNominas.loadingNominas);
    const trabajadoresFaltantesArray = useSelector(store => store.variablesFaltantes.trabajadoresFaltantesArray);
    const calendarioAGestionarNominas = useSelector(store => store.variablesNominas.calendarioAGestionarNominas);
    const openLoadingFaltantes = useSelector(store => store.variablesFaltantes.loadingFaltantes);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        };       
    }, [dispatch]);

    useEffect(() => {        
        dispatch(vaciarDatosFaltantesAccion());
    }, [calendarioAGestionarNominas]);

    useEffect(() => {
        if (listadoTrabajadores.length > 0) {
            if (trabajadoresFaltantesArray.length === 0) {
                const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarNominas));
                const anyoMes = year + '-' + monthNum;
                dispatch(obtenerTrabajadoresFaltantesAccion('nominas', anyoMes, listadoTrabajadores));
            }
        }
    }, [ listadoTrabajadores, calendarioAGestionarNominas]);

    useEffect(() => {
        if (errorDeCargaTrabajadores || errorDeCargaNominas) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores, errorDeCargaNominas]);

    useEffect(() => {
        if (!openLoadingNominas || !openLoadingFaltantes) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [errorDeCargaTrabajadores, openLoadingFaltantes]);

    //funciones    

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleNominasFaltantes = (trabajador) => {
        dispatch(setTrabajadorAccion(trabajador));
        dispatch(obtenerTrabajadorAccion('trabajadores', trabajador));
        dispatch(cambioEstadoInicioNominasAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarNominaAccion(false));
        dispatch(registrarIntervencionNominaNuevaAccion(false));
        dispatch(cambiarANominaNoRegistradaAccion());
        dispatch(venimosDeFaltantesAccion(true));
    };

    //retorno componentes

    const retornaTrabajadorGestionado = (trabajador, index) => {
        if (trabajadoresFaltantesArray.includes(trabajador.id)) {
            return (
                <Box
                    key={'listaNominas' + index}
                    onClick={() => handleNominasFaltantes(trabajador.id)}
                >
                    <ListItem
                        className={classes.casilla}
                    >
                        <ListItemText
                            secondary={trabajador.nombre}
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
                            {listadoTrabajadores.map((trabajador, index) => (
                                retornaTrabajadorGestionado(trabajador, index)
                            ))}
                        </List>
                    </Box>
                )}
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(trabajadoresFaltantesArray)} */}
        </div>
    )
}

export default Faltantes
