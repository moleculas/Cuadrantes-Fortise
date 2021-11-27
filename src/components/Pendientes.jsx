import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core";
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
import { indigo } from '@material-ui/core/colors';

//importaciones acciones
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { obtenerCuadrantesPendientesAccion } from '../redux/pendientesDucks';
import { forzarRecargaAccion } from '../redux/pendientesDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { registrarIntervencionCuadranteNuevoAccion } from '../redux/cuadrantesDucks';
import { cambiarACuadranteNoRegistradoAccion } from '../redux/cuadrantesDucks';
import { venimosDePendientesAccion } from '../redux/pendientesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';

const h2 = (window.innerHeight / 2) - 200;

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
    scrollable: {
        height: h2 - 10,
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: 10
    },
    root: {
        minHeight: h2,
        maxHeight: h2,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justify: "center"
    },
    centrado: {
        minHeight: "20vh",
        display: "flex",
        alignItems: "center"
    },
    casilla: {
        cursor: 'pointer',
        backgroundColor: theme.palette.background.default,
        marginBottom: 5,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${indigo[50]} !important`,
        },
    },
    gris: {
        color: '#b4af9f'
    },
}));

const Pendientes = () => {

    const classes = estilos();
    const dispatch = useDispatch();
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const errorDeCargaCentros = useSelector(store => store.variablesTrabajadores.errorDeCargaCentros);
    const errorDeCargaCuadrantes = useSelector(store => store.variablesTrabajadores.errorDeCargaCuadrantes);
    const openLoadingCuadrantes = useSelector(store => store.variablesCentros.loadingCuadrantes);
    const centrosPendientesArray = useSelector(store => store.variablesPendientes.centrosPendientesArray);
    const forzarRecarga = useSelector(store => store.variablesPendientes.forzarRecarga);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        if (forzarRecarga || calendarioAGestionar) {
            dispatch(obtenerCentrosAccion('centros'));
            dispatch(forzarRecargaAccion(false));
        }
    }, [forzarRecarga, calendarioAGestionar]);

    useEffect(() => {
        if (listadoCentros.length > 0) {
            const { monthNum, year } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionar));
            const anyoMes=year+'-'+monthNum;
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
        if (!openLoadingCuadrantes) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCuadrantes]);

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
                className={classes.root}
            >
                {openLoading ? (
                    <Box
                        className={classes.centrado}
                    >
                        <CircularProgress />
                    </Box>
                ) : null}
                <Box
                    className={classes.scrollable}
                    style={{ width: '100%' }}
                >
                    <List dense={true}
                        style={{ padding: 15 }}>
                        {listadoCentros.map((centro, index) => (
                            retornaCentroGestionado(centro, index)
                        ))}
                    </List>
                </Box>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(listadoCentros)} */}
        </div>
    )
}

export default Pendientes
