import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from "@material-ui/core";
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
import clsx from 'clsx';

//estilos
import Clases from "../clases";

const cantidadHoras = Constantes.CANTIDAD_HORAS_CENTROS;
const cantidadMinutos = Constantes.CANTIDAD_MINUTOS_CENTROS;
const tiposServicios = Constantes.TIPO_SERVICIO;

const ItemListTime = (props) => {

    const classes = Clases();
    const onEstem = useSelector(store => store.variablesApp.onEstem);

    //funciones

    const handleChangeTimePickerInicioEdicion = (id) => (hora) => {
        props.prHandleChangeTimePickerInicioEdicion(id, hora);
    };
    const handleChangeTimePickerFinEdicion = (id) => (hora) => {
        props.prHandleChangeTimePickerFinEdicion(id, hora);
    };
    const handleChangeSelectCantidadHorasEdicion = (e) => {
        props.prHandleChangeSelectCantidadEdicion(e);
    };
    const handleChangeSelectCantidadMinutosEdicion = (e) => {
        props.prHandleChangeSelectCantidadEdicion(e);
    };
    const handleChangeTimePickerInicioRegistro = (id) => (hora) => {
        props.prHandleChangeTimePickerInicioRegistro(id, hora);
    };
    const handleChangeTimePickerFinRegistro = (id) => (hora) => {
        props.prHandleChangeTimePickerFinRegistro(id, hora);
    };
    const handleChangeSelectCantidadHorasRegistro = (e) => {
        props.prHandleChangeSelectCantidadHorasRegistro(e);
    };
    const handleChangeSelectCantidadMinutosRegistro = (e) => {
        props.prHandleChangeSelectCantidadMinutosRegistro(e);
    };
    const handleChangeSelectTipoServicioEdicion = (e) => {
        props.prHandleChangeSelectTipoServicioEdicion(e);
    };
    const handleChangeSelectTipoServicioRegistro = (e) => {
        props.prHandleChangeSelectTipoServicioRegistro(e);
    };

    const retornaEstiloItem = (tipo) => {
        let elEstilo;
        if (tipo === 'rango') {
            if (props.prValueTimePickerInicio && props.prValueTimePickerFin && props.prValueTipoServicio) {
                elEstilo = { padding: 12, marginBottom: 5, backgroundColor: '#f5f5f5' }
            } else {
                elEstilo = { padding: 12, marginBottom: 5 }
            };
        };
        if (tipo === 'cantidad') {
            if (props.prValueCantidadHoras && props.prValueTipoServicio) {
                elEstilo = { padding: 12, marginBottom: 5, backgroundColor: '#f5f5f5' }
            } else {
                elEstilo = { padding: 12, marginBottom: 5 }
            };
        };
        if (tipo === 'rangoDescanso') {
            if (props.prValueTimePickerInicio1 && props.prValueTimePickerFin1 && props.prValueTipoServicio) {
                elEstilo = { padding: 12, marginBottom: 5, backgroundColor: '#f5f5f5' }
            } else {
                elEstilo = { padding: 12, marginBottom: 5 }
            };
        };
        return elEstilo;
    };

    //retorno componentes

    const retornaSelectTipoServicio = (name, value) => {
        return (
            <FormControl
                variant="outlined"
                className={classes.formTipo}
                size="small"
            >
                <InputLabel>Tipo Servicio</InputLabel>
                <Select
                    fullWidth
                    id="form-tipo-servicio-edicion"
                    name={name}
                    label="Tipo servicio"
                    value={value}
                    onChange={onEstem === 'editarCentros' ? (handleChangeSelectTipoServicioEdicion) : (handleChangeSelectTipoServicioRegistro)}
                    helpertext="Selecciona tipo de servicio"
                >
                    <MenuItem value=''>
                        <em>No</em>
                    </MenuItem>
                    {
                        tiposServicios.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        )
    };

    return (
        <div>
            {props.prTipo === 'rango' ? (
                <ListItem button className={classes.cursorDefault} style={retornaEstiloItem('rango')} disabled={props.prDisabledItem}>
                    <Grid
                        container
                        direction="column"
                    >
                        <Grid container className={classes.mb15}>
                            <Grid item xs={3}>
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
                                        onChange={onEstem === 'editarCentros' ? (handleChangeTimePickerInicioEdicion(props.prIdInicio)) : (handleChangeTimePickerInicioRegistro(props.prIdInicio))}
                                        size="small"
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
                                        onChange={onEstem === 'editarCentros' ? (handleChangeTimePickerFinEdicion(props.prIdFin)) : (handleChangeTimePickerFinRegistro(props.prIdFin))}
                                        size="small"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <ListItemText primary="Tipo de servicio" />
                            </Grid>
                            <Grid item xs={8}>
                                {retornaSelectTipoServicio(props.prIdTipoServicio, props.prValueTipoServicio || '')}
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            ) : props.prTipo === 'cantidad' ? (
                <ListItem button className={clsx(classes.cursorDefault, classes.root4)} style={retornaEstiloItem('cantidad')} disabled={props.prDisabledItem}>
                    <Grid
                        container
                        direction="column"
                    >
                        <Grid container className={classes.mb10}>
                            <Grid item xs={3}>
                                <ListItemText primary={props.prDia} />
                            </Grid>
                            <Grid item xs={4}>
                            <FormControl
                                    variant="outlined"
                                    className={classes.form2}
                                    size="small"
                                >
                                    <InputLabel>Horas</InputLabel>
                                    <Select
                                        fullWidth
                                        name={props.prIdCantidadHoras}
                                        label="Horas"
                                        value={props.prValueCantidadHoras}
                                        onChange={onEstem === 'editarCentros' ? (handleChangeSelectCantidadHorasEdicion) : (handleChangeSelectCantidadHorasRegistro)}
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
                            <Grid item xs={4} style={{ marginLeft: 10 }}>
                            <FormControl
                                    variant="outlined"
                                    className={classes.form2}                               
                                    size="small"
                                >
                                    <InputLabel>Minutos</InputLabel>
                                    <Select
                                        fullWidth
                                        name={props.prIdCantidadMinutos}
                                        label="Minutos"
                                        value={props.prValueCantidadMinutos}
                                        onChange={onEstem === 'editarCentros' ? (handleChangeSelectCantidadMinutosEdicion) : (handleChangeSelectCantidadMinutosRegistro)}
                                        helpertext="Cantidad minutos"
                                    >
                                        <MenuItem value=''>
                                            <em>No</em>
                                        </MenuItem>
                                        {
                                            cantidadMinutos.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>                           
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <ListItemText primary="Tipo de servicio" />
                            </Grid>
                            <Grid item xs={8}>
                                {retornaSelectTipoServicio(props.prIdTipoServicio, props.prValueTipoServicio || '')}
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            ) : props.prTipo === "rangoDescanso" ? (
                <ListItem button className={clsx(classes.cursorDefault, classes.root4)} style={retornaEstiloItem('rangoDescanso')} disabled={props.prDisabledItem}>
                    <Grid
                        container
                        direction="column"
                    >
                        <Grid container className={classes.mb15}>
                            <Grid style={{ width: '9%' }}>
                                <ListItemText primary={props.prDia} />
                            </Grid>
                            <Grid item style={{ width: '21%' }}>
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
                                        onChange={onEstem === 'editarCentros' ? (handleChangeTimePickerInicioEdicion(props.prIdInicio1)) : (handleChangeTimePickerInicioRegistro(props.prIdInicio1))}
                                        size="small"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item style={{ marginLeft: 5, width: '21%' }}>
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
                                        onChange={onEstem === 'editarCentros' ? (handleChangeTimePickerFinEdicion(props.prIdFin1)) : (handleChangeTimePickerFinRegistro(props.prIdFin1))}
                                        size="small"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Typography style={{ marginLeft: 5 }}>-</Typography>
                            <Grid style={{ marginLeft: 5, width: '21%' }}>
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
                                        onChange={onEstem === 'editarCentros' ? (handleChangeTimePickerInicioEdicion(props.prIdInicio2)) : (handleChangeTimePickerInicioRegistro(props.prIdInicio2))}
                                        size="small"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item style={{ marginLeft: 5, width: '21%' }}>
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
                                        onChange={onEstem === 'editarCentros' ? (handleChangeTimePickerFinEdicion(props.prIdFin2)) : (handleChangeTimePickerFinRegistro(props.prIdFin2))}
                                        size="small"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid style={{ width: '9%' }}>
                                <ListItemText primary="Ser." />
                            </Grid>
                            <Grid style={{ width: '86%' }}>
                                {retornaSelectTipoServicio(props.prIdTipoServicio, props.prValueTipoServicio || '')}
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            ) : null}
        </div>
    )
}

export default ItemListTime
