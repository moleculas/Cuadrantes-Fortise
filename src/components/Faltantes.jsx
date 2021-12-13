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

//importaciones acciones
import { setTrabajadorAccion } from '../redux/nominasDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { cambioEstadoInicioNominasAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonRegistrarNominaAccion } from '../redux/nominasDucks';
import { registrarIntervencionNominaNuevaAccion } from '../redux/nominasDucks';
import { cambiarANominaNoRegistradaAccion } from '../redux/nominasDucks';
import { venimosDeFaltantesAccion } from '../redux/faltantesDucks';

//estilos
import Clases from "../clases";

const Faltantes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch(); 
    const nominasFaltantesArray = useSelector(store => store.variablesFaltantes.nominasFaltantesArray);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);

    //states

    //funciones

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
        if (nominasFaltantesArray.includes(trabajador.id)) {
            return (
                <Box
                    key={'listaNominas' + index}
                    onClick={() => handleNominasFaltantes(trabajador.id)}
                >
                    <ListItem
                        className={classes.casilla}
                    >
                        <ListItemText
                            primary={trabajador.nombre}
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
                style={{ width: props.prWidthContenedores, minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores }}
            >
                {props.prOpenLoading ? (
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
            {/* {console.log(trabajadoresFaltantesArray)} */}
        </div>
    )
}

export default Faltantes
