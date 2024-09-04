import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Select,
    InputAdornment,
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
    Box
} from '@material-ui/core';
import {
    RadioButtonChecked,
    RadioButtonUnchecked,
    Delete as DeleteIcon
} from '@material-ui/icons';
import clsx from 'clsx';

//estilos
import Clases from "../clases";

//importación de acciones
import {
    setServiciosFijosPersonalizadosAccion,
    setservicioFijoPersonalizadoEliminadoAccion
} from '../redux/cuadrantesServiciosFijosDucks';
import { activarDesactivarCambioAccion } from '../redux/cuadrantesDucks';
import { existePrefixSF } from '../logica/logicaServiciosFijos';
import { setAlertaAccion } from '../redux/cuadrantesSettersDucks';

const TipoServicioFijoPersonalizado = (props) => {
    //modificador: servicios fijos personalizados
    const {
        index,
        servicioPersonalizado,
        servicioPersonalizadoPrefix
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const arrayTrabajadoresSubcategoria = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresSubcategoria);
    const {
        serviciosFijosPersonalizados,
        cuadranteServiciosFijos
    } = useSelector(store => store.variablesCuadrantesServiciosFijos);
    const debounceTimer = useRef(null);

    //states

    const [valoresServicioFijoPersonalizado, setValoresServicioFijoPersonalizado] = useState({
        precioHora: servicioPersonalizado[`precioHora_${servicioPersonalizadoPrefix}`] || '',
        int: servicioPersonalizado[`int_${servicioPersonalizadoPrefix}`] || false,
        trab: servicioPersonalizado[`trab_${servicioPersonalizadoPrefix}`] || '',
        descripcion: servicioPersonalizado[`descripcion_${servicioPersonalizadoPrefix}`] || '',
    });

    //funciones 

    const handleChangeFormServicioFijoPersonalizado = (prop) => {
        return (event) => {
            let value;
            if (prop === 'int') {
                value = event.target.checked;
            } else if (prop === 'precioHora') {
                value = Number(event.target.value);
            } else {
                value = event.target.value;                
            }
            if (prop === 'trab') {
                const trabajadorSeleccionado = arrayTrabajadoresSubcategoria.find(trabajador => trabajador.id === Number(value));                
                if (trabajadorSeleccionado && trabajadorSeleccionado.estado !== "alta" || trabajadorSeleccionado.estado === "reserva") {
                    dispatch(setAlertaAccion({
                        abierto: true,
                        mensaje: "Este trabajador se encuentra de baja o está en reserva, selecciona otro.",
                        tipo: 'error'
                    }));
                    return; 
                }
            }
            if (prop === 'descripcion' && value.includes('_')) {
                value = value.replace(/_/g, '-');
            }
            setValoresServicioFijoPersonalizado((prevValores) => {
                const newValores = { ...prevValores };
                if (prop === 'int' && value === true) {
                    newValores.precioHora = null;
                }
                return {
                    ...newValores,
                    [prop]: value,
                };
            });
            clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                const serviciosActualizados = serviciosFijosPersonalizados.map((servicio, i) =>
                    i === index
                        ? { ...servicio, [`${prop}_${servicioPersonalizadoPrefix}`]: value }
                        : servicio
                );
                dispatch(setServiciosFijosPersonalizadosAccion(serviciosActualizados));
                dispatch(activarDesactivarCambioAccion(false));
            }, 300);
        };
    };

    const handleEliminarServicioFijoPersonalizado = () => {
        const servicioFijoEliminado = serviciosFijosPersonalizados.find((_, i) => i === index);
        const serviciosActualizados = serviciosFijosPersonalizados.filter((_, i) => i !== index);
        dispatch(setServiciosFijosPersonalizadosAccion(serviciosActualizados));
        const { propiedad } = existePrefixSF(servicioFijoEliminado);
        let arrServiciosFijos = [...cuadranteServiciosFijos];
        const servicioConPropiedad = arrServiciosFijos.find(obj => `activo_${propiedad}` in obj);
        if (servicioConPropiedad) {
            dispatch(setservicioFijoPersonalizadoEliminadoAccion(servicioConPropiedad));
            dispatch(activarDesactivarCambioAccion(false));
        };
    };

    return (
        <Grid
            container
            direction="row"
            justifycontent={"flex-start"}
            alignItems="center"
            spacing={2}
            className={classes.fondoServicioFijoPersonalizado}
            style={{ height: 110, paddingTop: 5, paddingBottom: 10, paddingRight: 10, paddingLeft: 10, marginBottom: 15 }}
            key={'formServicio' + index}
        >
            <Grid item xs={5}>
                <Box style={{ marginBottom: -25 }}>
                    <TextField
                        label={"Descripción"}
                        value={valoresServicioFijoPersonalizado.descripcion}
                        fullWidth
                        placeholder={"Descripción"}
                        variant="outlined"
                        onChange={handleChangeFormServicioFijoPersonalizado('descripcion')}
                        size='small'
                    />
                </Box>
            </Grid>
            <Grid item xs={7}>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: -5,
                        marginTop: -10,
                        marginRight: -15
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                size='small'
                                icon={<RadioButtonUnchecked />} checkedIcon={<RadioButtonChecked />}
                                checked={valoresServicioFijoPersonalizado.int}
                                onChange={handleChangeFormServicioFijoPersonalizado('int')}
                                name="checkedComputa"
                                color="secondary"
                            />
                        }
                        label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>INTEGRADO EN CÓMPUTO</Typography>}
                    />
                    <DeleteIcon
                        color="error"
                        style={{
                            marginRight: 10,
                            cursor: "pointer"
                        }}
                        onClick={handleEliminarServicioFijoPersonalizado}
                    />
                </Box>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={6}>
                        <FormControl
                            variant="outlined"
                            className={clsx(classes.displayBlock, classes.form)}
                            size="small"
                        >
                            <InputLabel>{"Precio"}</InputLabel>
                            <OutlinedInput
                                fullWidth
                                value={valoresServicioFijoPersonalizado.precioHora || ""}
                                onChange={handleChangeFormServicioFijoPersonalizado('precioHora')}
                                labelWidth={50}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl
                            variant="outlined"
                            className={clsx(classes.displayBlock, classes.form)}
                            size="small"
                        >
                            <InputLabel>Trabajador</InputLabel>
                            <Select
                                fullWidth
                                id="form-trabajadorSF"
                                label="Trabajador"
                                value={valoresServicioFijoPersonalizado.trab || ''}//modificat: select
                                onChange={handleChangeFormServicioFijoPersonalizado('trab')}
                                helpertext="Selecciona trabajador"
                            >
                                <MenuItem value=''>
                                    <em>Sin trabajador</em>
                                </MenuItem>
                                {arrayTrabajadoresSubcategoria?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TipoServicioFijoPersonalizado