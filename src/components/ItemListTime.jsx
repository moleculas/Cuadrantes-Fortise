import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Typography } from "@material-ui/core";
import Constantes from "../constantes";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, TimePicker, } from '@material-ui/pickers';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const cantidadHoras = Constantes.CANTIDAD_HORAS_CENTROS;
const estilos = makeStyles((theme) => ({
    //list
    root4: {
        cursor: 'default'
    },
    //form
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const ItemListTime = (props) => {

    const classes = estilos();
    const onEstem= useSelector(store => store.variablesApp.onEstem);

    //funciones

    const handleChangeTimePickerInicioEdicion = (id) => (hora) => {
        props.prHandleChangeTimePickerInicioEdicion(id, hora);
    };
    const handleChangeTimePickerFinEdicion = (id) => (hora) => {
        props.prHandleChangeTimePickerFinEdicion(id, hora);
    };
    const handleChangeSelectCantidadEdicion = (e) => {
        props.prHandleChangeSelectCantidadEdicion(e);
    };
    const handleChangeTimePickerInicioRegistro = (id) => (hora) => {
        props.prHandleChangeTimePickerInicioRegistro(id, hora);
    };
    const handleChangeTimePickerFinRegistro = (id) => (hora) => {
        props.prHandleChangeTimePickerFinRegistro(id, hora);
    };
    const handleChangeSelectCantidadRegistro = (e) => {
        props.prHandleChangeSelectCantidadRegistro(e);
    };

    return (
        <div>
            {props.prTipo === 'rango' ? (
                <ListItem button className={classes.root4} style={{ padding: 12 }} disabled={props.prDisabledItem}>
                    <Grid item xs={4}>
                        <ListItemText primary={props.prDia} />
                    </Grid>
                    <Grid item xs={4}>
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
                                onChange={onEstem==='editarCentros' ? (handleChangeTimePickerInicioEdicion(props.prIdInicio)) : (handleChangeTimePickerInicioRegistro(props.prIdInicio))}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4} style={{ marginLeft: 10 }}>
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
                                onChange={onEstem==='editarCentros' ? (handleChangeTimePickerFinEdicion(props.prIdFin)):(handleChangeTimePickerFinRegistro(props.prIdFin))}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </ListItem>
            ) : props.prTipo === 'cantidad' ? (
                <ListItem button className={classes.root4} style={{ paddingTop: 8, paddingLeft: 12, paddingBottom: 8 }} disabled={props.prDisabledItem}>
                    <Grid item xs={4}>
                        <ListItemText primary={props.prDia} />
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl
                            variant="outlined"
                            className={classes.form}
                        >
                            <InputLabel>Cantidad horas</InputLabel>
                            <Select
                                fullWidth
                                name={props.prIdCantidad}
                                label="Cantidad horas"
                                value={props.prValueCantidadHoras}
                                onChange={onEstem==='editarCentros' ? (handleChangeSelectCantidadEdicion):(handleChangeSelectCantidadRegistro)}
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
                </ListItem>
            ): props.prTipo==="rangoDescanso" ? (
                <ListItem button className={classes.root4} style={{ padding: 12 }} disabled={props.prDisabledItem}>
                    <Grid item xs={2}>
                        <ListItemText primary={props.prDia} />
                    </Grid>
                    <Grid item xs={3}>
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
                                onChange={onEstem==='editarCentros' ? (handleChangeTimePickerInicioEdicion(props.prIdInicio1)):(handleChangeTimePickerInicioRegistro(props.prIdInicio1))}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={3} style={{ marginLeft: 5 }}>
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
                                onChange={onEstem==='editarCentros' ? (handleChangeTimePickerFinEdicion(props.prIdFin1)):(handleChangeTimePickerFinRegistro(props.prIdFin1))}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Typography style={{ marginLeft: 5 }}>-</Typography>
                    <Grid item xs={3} style={{ marginLeft: 5 }}>
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
                                onChange={onEstem==='editarCentros' ? (handleChangeTimePickerInicioEdicion(props.prIdInicio2)):(handleChangeTimePickerInicioRegistro(props.prIdInicio2))}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={3} style={{ marginLeft: 5 }}>
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
                                onChange={onEstem==='editarCentros' ? (handleChangeTimePickerFinEdicion(props.prIdFin2)):(handleChangeTimePickerFinRegistro(props.prIdFin2))}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </ListItem>
            ): null}
        </div>
    )
}

export default ItemListTime
