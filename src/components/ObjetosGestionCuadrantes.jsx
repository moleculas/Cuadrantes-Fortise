import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

//importaciones acciones
import { setVenimosDeCambioCuadranteAccion } from '../redux/cuadrantesSettersDucks';
import { setEstamosActualizandoCuadranteSinCargaAccion } from '../redux/cuadrantesSettersDucks';
import { procesarCambioCuadranteAccion } from '../redux/cuadrantesGestionDucks';

//estilos
import Clases from "../clases";

const ObjetosGestionCuadrantes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();

    //constantes

    const numeroCuadrantesCuadrantes = useSelector(store => store.variablesCuadrantesSetters.numeroCuadrantesCuadrantes);
    const cuadranteEnUsoCuadrantes = useSelector(store => store.variablesCuadrantesSetters.cuadranteEnUsoCuadrantes);
    const esInicioCuadrantes = useSelector(store => store.variablesCuadrantes.esInicioCuadrantes);

    //funciones

    const handleClickOpenDialogCuadrantes5 = (respuesta) => {
        props.prHandleClickOpenDialogCuadrantes5(respuesta);
    };

    const handleChangeSelectNumeroCuadrante = (e) => {
        dispatch(setVenimosDeCambioCuadranteAccion(true));
        dispatch(procesarCambioCuadranteAccion(e.target.value));
        dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
    };

    return (
        <Fragment>
            <Grid item xs={8}>
                <FormControl
                    variant="outlined"
                    fullWidth
                    disabled={numeroCuadrantesCuadrantes.length === 1 ? true : false}
                    size="small"
                >
                    <InputLabel>Cuadrante</InputLabel>
                    <Select
                        id="form-numero-cuadrantes"
                        value={cuadranteEnUsoCuadrantes}
                        onChange={handleChangeSelectNumeroCuadrante}
                        input={
                            <OutlinedInput
                                labelWidth={80}
                            />
                        }>
                        {numeroCuadrantesCuadrantes.map((option) => {
                            return (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} >
                <Box className={classes.floatRight}>
                    {esInicioCuadrantes || numeroCuadrantesCuadrantes.length < 2 ? (
                        <IconButton
                            className={classes.btnBorrarCuad}
                            disabled={true}
                        >
                            <DeleteIcon />
                        </IconButton>
                    ) : (
                        <Tooltip title="Borrar cuadrante en uso" placement="left" arrow >
                            <IconButton
                                className={classes.btnBorrarCuad}
                                onClick={handleClickOpenDialogCuadrantes5}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                </Box>
            </Grid>
        </Fragment>
    )
}

export default ObjetosGestionCuadrantes