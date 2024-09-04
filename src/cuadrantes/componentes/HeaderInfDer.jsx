import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    IconButton,
    Tooltip,
    Box
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

//importaciones acciones
import {
    setVenimosDeCambioCuadranteAccion,
    setEstamosActualizandoCuadranteSinCargaAccion
} from '../../redux/cuadrantesSettersDucks';
import { procesarCambioCuadranteAccion } from '../../logica/logicaGestionCuadrantes';

//estilos
import Clases from "../../clases";

const HeaderInfDer = (props) => {
    const {
        numeroCuadrantesCuadrantes,
        cuadranteEnUsoCuadrantes,
        esInicioCuadrantes
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();  

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
                        value={cuadranteEnUsoCuadrantes || ''}//modificat: select
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

export default HeaderInfDer