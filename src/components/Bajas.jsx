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
import { Link } from "react-router-dom";

//importaciones acciones
import { obtenerTrabajadoresBajaAccion } from '../redux/trabajadoresDucks';

//estilos
import Clases from "../clases";

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Bajas = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();

    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const listadoTrabajadoresBaja = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresBaja);

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        dispatch(obtenerTrabajadoresBajaAccion('trabajadores'));
    }, [dispatch]);

    useEffect(() => {
        if (errorDeCargaTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores]);

    useEffect(() => {
        if (!openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingTrabajadores]);

    //funciones    

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    //retorno componentes

    const retornaTrabajadorGestionado = (trabajador, index) => {
        return (
            <Link key={'listaTrabajadores' + index} to={`/trabajadores/${trabajador.id}/${trabajador.nombre}`} className={classes.link}>
                <Box>
                    <ListItem
                        className={classes.casillaBajas}
                    >
                        <ListItemText
                            primary={trabajador.nombre} secondary={trabajador.estado}
                        />
                        <ListItemSecondaryAction>
                            <ExitToAppIcon
                                className={classes.gris}
                            />
                        </ListItemSecondaryAction>
                    </ListItem >
                </Box >
            </Link>
        )
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
                            {listadoTrabajadoresBaja.length > 0 ? (
                                listadoTrabajadoresBaja.map((trabajador, index) => (
                                    retornaTrabajadorGestionado(trabajador, index)
                                ))
                            ) : null}
                        </List>
                    </Box>
                )}
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(listadoTrabajadoresBaja)} */}
        </div>
    )
}

export default Bajas
