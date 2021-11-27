import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core";
import Constantes from "../constantes";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { MuiPickersUtilsProvider, TimePicker, } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const cantidadHoras = Constantes.CANTIDAD_HORAS_CENTROS;
const estilos = makeStyles((theme) => ({
    //form
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    mt15: {
        marginTop: 15,
    },
}));

const ItemCuadrante = (props) => {

    const classes = estilos();
    const disabledItem = useSelector(store => store.variablesCuadrantes.estadoActivadoDesactivadoCambio);

    const [valoresPrevios, setValoresPrevios] = useState({
        index: props.prIndex,
        id: props.prTipo === 'rango' ? (props.prIdInicio) : props.prTipo === 'rangoDescanso' ? (props.prIdInicio1) : (props.prIdCantidad),
        inicioRango: props.prValueTimePickerInicio || null,
        finRango: props.prValueTimePickerFin || null,
        inicioRangoDescanso1: props.prValueTimePickerInicio1 || null,
        finRangoDescanso1: props.prValueTimePickerFin1 || null,
        inicioRangoDescanso2: props.prValueTimePickerInicio2 || null,
        finRangoDescanso2: props.prValueTimePickerFin2 || null,
        cantidad: props.prValueCantidadHoras || '',
        observaciones: props.prObservaciones || '',
    });

    //useEffect

    useEffect(() => {        
        gestionItemPrevioEditando(props.prTipo, valoresPrevios);
    }, []);

    //funciones

    const handleChangeTimePickerInicioCuadrante = (id, index, horaPareja) => (hora) => {
        props.prHandleChangeTimePickerInicioCuadrante(id, index, horaPareja, hora);
    };
    const handleChangeTimePickerFinCuadrante = (id, index, horaPareja) => (hora) => {
        props.prHandleChangeTimePickerFinCuadrante(id, index, horaPareja, hora);
    };
    const handleChangeSelectCantidad = (index) => (e) => {
        props.prHandleChangeSelectCantidad(index, e);
    };
    const handleChangeObservaciones = (index) => (e) => {
        props.prHandleChangeObservaciones(index, e);
    };
    const gestionItemPrevioEditando = (tipo, valores) => {
        props.prGestionItemPrevioEditando(tipo, valores);
    };
    const handleRegistrarCambioEnCasilla = (id, index, tipo) => {
        props.prHandleRegistrarCambioEnCasilla(id, index, tipo);
    };

    return (
        <div>
            {props.prTipo === 'rango' ? (
                <Box style={{ display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker
                                inputVariant="outlined"
                                clearable={true}
                                cancelLabel="Cancelar"
                                clearLabel="Borrar"
                                fullWidth
                                label="Hora inicio"
                                ampm={false}
                                id={props.prIdInicio}
                                value={props.prValueTimePickerInicio}
                                onChange={handleChangeTimePickerInicioCuadrante(props.prIdInicio, props.prIndex, props.prValueTimePickerFin)}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6} style={{ marginLeft: 10 }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker
                                inputVariant="outlined"
                                clearable={true}
                                cancelLabel="Cancelar"
                                clearLabel="Borrar"
                                fullWidth
                                label="Hora fin"
                                ampm={false}
                                id={props.prIdFin}
                                value={props.prValueTimePickerFin}
                                onChange={handleChangeTimePickerFinCuadrante(props.prIdFin, props.prIndex, props.prValueTimePickerInicio)}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Box>
            ) : props.prTipo === 'cantidad' ? (
                <Grid item xs={12}>
                    <FormControl
                        variant="outlined"
                        className={classes.form}
                    >
                        <InputLabel>Cantidad horas</InputLabel>
                        <Select
                            fullWidth
                            name={props.prIdCantidad}
                            label="Cantidad horas"
                            id={props.prIdCantidad}
                            value={props.prValueCantidadHoras}
                            onChange={handleChangeSelectCantidad(props.prIndex)}
                            helpertext="Cantidad horas"
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
                            {
                                cantidadHoras.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            ) : props.prTipo === "rangoDescanso" ? (
                <Fragment>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    inputVariant="outlined"
                                    clearable={true}
                                    cancelLabel="Cancelar"
                                    clearLabel="Borrar"
                                    fullWidth
                                    label="Hora inicio"
                                    ampm={false}
                                    id={props.prIdInicio1}
                                    value={props.prValueTimePickerInicio1}
                                    onChange={handleChangeTimePickerInicioCuadrante(props.prIdInicio1, props.prIndex, props.prValueTimePickerFin1)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6} style={{ marginLeft: 10 }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    inputVariant="outlined"
                                    clearable={true}
                                    cancelLabel="Cancelar"
                                    clearLabel="Borrar"
                                    fullWidth
                                    label="Hora fin"
                                    ampm={false}
                                    id={props.prIdFin1}
                                    value={props.prValueTimePickerFin1}
                                    onChange={handleChangeTimePickerFinCuadrante(props.prIdFin1, props.prIndex, props.prValueTimePickerInicio1)} />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Box>
                    <Box className={classes.mt15} style={{ display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    inputVariant="outlined"
                                    clearable={true}
                                    cancelLabel="Cancelar"
                                    clearLabel="Borrar"
                                    fullWidth
                                    label="Hora inicio"
                                    ampm={false}
                                    id={props.prIdInicio2}
                                    value={props.prValueTimePickerInicio2}
                                    onChange={handleChangeTimePickerInicioCuadrante(props.prIdInicio2, props.prIndex, props.prValueTimePickerFin2)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6} style={{ marginLeft: 10 }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    inputVariant="outlined"
                                    clearable={true}
                                    cancelLabel="Cancelar"
                                    clearLabel="Borrar"
                                    fullWidth
                                    label="Hora fin"
                                    ampm={false}
                                    id={props.prIdFin2}
                                    value={props.prValueTimePickerFin2}
                                    onChange={handleChangeTimePickerFinCuadrante(props.prIdFin2, props.prIndex, props.prValueTimePickerInicio2)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Box>
                </Fragment>
            ) : null}
            <Box className={classes.mt15}>
                <TextField
                    label="Observaciones"
                    id={props.prTipo === 'rango' ? ('observaciones-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('observaciones-' + props.prIdInicio1) : ('observaciones-' + props.prIdCantidad)}
                    value={props.prObservaciones}
                    fullWidth
                    placeholder="Observaciones"
                    multiline
                    variant="outlined"
                    onChange={handleChangeObservaciones(props.prIndex)}
                />
            </Box>
            <Button
                className={classes.mt15}
                disabled={disabledItem}
                fullWidth
                variant="contained"
                size="small"
                color="secondary"
                startIcon={<SaveIcon />}
                onClick={() => props.prTipo === 'rango' ? (handleRegistrarCambioEnCasilla(props.prIdInicio, props.prIndex, props.prTipo)) : props.prTipo === 'rangoDescanso' ? (handleRegistrarCambioEnCasilla(props.prIdInicio1, props.prIndex, props.prTipo)) : (handleRegistrarCambioEnCasilla(props.prIdCantidad, props.prIndex, props.prTipo))}
            >
                Registrar cambio
            </Button>
            {/* {console.log(props.prValueTimePickerInicio)} */}
        </div>
    )
}

export default ItemCuadrante
