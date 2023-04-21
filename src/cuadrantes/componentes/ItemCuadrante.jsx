import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Constantes from "../../constantes";
import DateFnsUtils from '@date-io/date-fns';
import {
    Grid,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    Tooltip,
    IconButton,
    OutlinedInput,
    useMediaQuery
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import {
    Save as SaveIcon,
    Timer as TimerIcon,
    TimerOff as TimerOffIcon,
    RemoveCircleOutline as RemoveCircleOutlineIcon
} from '@material-ui/icons';
import clsx from 'clsx';

//estilos
import Clases from "../../clases";

//constantes
const {
    CANTIDAD_HORAS_CENTROS: cantidadHoras,
    VARIACIONES_CUADRANTES: variaciones,
    TIPO_SERVICIO: tiposServicios
} = Constantes;

const ItemCuadrante = (props) => {
    const classes = Clases();
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
        visibleVariaciones: props.prVisibleVariaciones || false,
        tipoVariacion: props.prTipoVariacion || '',
        tipoServicio: props.prValueTipoServicio || '',
    });

    //mediaQueries

    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('desktop'));

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
    const handleVisibleVariaciones = (index, elId) => (e) => {
        props.prHandleVisibleVariaciones(index, elId, e);
    };
    const handleChangeTipoVariaciones = (index) => (e) => {
        props.prHandleChangeTipoVariaciones(index, e);
    };
    const handleChangeTipoServicio = (index) => (e) => {
        props.prHandleChangeTipoServicio(index, e);
    };
    const handleResetearCasilla = (id, index, tipo) => {
        props.prHandleResetearCasilla(id, index, tipo);
    };

    //retorno componentes

    const retornaBotonVariaciones = () => {
        if (!props.prVisibleVariaciones) {
            if ((props.prTipo === 'rango' && !props.prValueTimePickerInicio) || (props.prTipo === 'rangoDescanso' && !props.prValueTimePickerInicio1) || (props.prTipo === 'cantidad' && !props.prValueCantidadHoras)) {
                return (
                    <IconButton
                        className={clsx(classes.btnVariacion, classes.blanc, classes.mb10)}
                        disabled={true}
                        size="small"
                    >
                        <TimerIcon />
                    </IconButton>
                )
            } else {
                return (
                    <Tooltip title="Añadir variación" placement="top-end" arrow>
                        <IconButton
                            className={clsx(classes.btnVariacion, classes.blanc, classes.mb10)}
                            id={props.prTipo === 'rango' ? ('visibleVariaciones-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('visibleVariaciones-' + props.prIdInicio1) : ('visibleVariaciones-' + props.prIdCantidad)}
                            size="small"
                            onClick={handleVisibleVariaciones(props.prIndex, (props.prTipo === 'rango' ? ('visibleVariaciones-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('visibleVariaciones-' + props.prIdInicio1) : ('visibleVariaciones-' + props.prIdCantidad)))}
                        >
                            <TimerIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
        }
        if (props.prVisibleVariaciones) {
            return (
                <Tooltip title="Eliminar variación" placement="top-end" arrow>
                    <IconButton
                        className={clsx(classes.btnError, classes.blanc, classes.mb10)}
                        id={props.prTipo === 'rango' ? ('visibleVariaciones-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('visibleVariaciones-' + props.prIdInicio1) : ('visibleVariaciones-' + props.prIdCantidad)}
                        size="small"
                        onClick={handleVisibleVariaciones(props.prIndex, (props.prTipo === 'rango' ? ('visibleVariaciones-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('visibleVariaciones-' + props.prIdInicio1) : ('visibleVariaciones-' + props.prIdCantidad)))}
                    >
                        <TimerOffIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    };

    const retornaSelectTipoServicio = () => {
        return (
            <FormControl
                variant="outlined"
                className={classes.formTipo2}
                size="small"
            >
                <InputLabel>{esDesktop ? 'Tipo Servicio' : 'Servicio'}</InputLabel>
                <Select
                    fullWidth
                    id="form-tipo-servicio-cuadrante"
                    name={props.prTipo === 'rango' ? ('tipoServicioSelect-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('tipoServicioSelect-' + props.prIdInicio1) : ('tipoServicioSelect-' + props.prIdCantidad)}
                    label={esDesktop ? 'Tipo Servicio' : 'Servicio'}
                    value={props.prValueTipoServicio}
                    onChange={handleChangeTipoServicio(props.prIndex)}
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

    const retornaActivoBotonResetear = (origen) => {
        if (props.prTipo === 'rango') {
            if (props.prValueTimePickerInicio || props.prObservaciones) {
                if (origen === 'boton') {
                    return false
                } else {
                    return 'Resetear casilla'
                };

            } else {
                if (origen === 'boton') {
                    return true
                } else {
                    return ''
                };
            }
        };
        if (props.prTipo === 'rangoDescanso') {
            if (props.prValueTimePickerInicio1 || props.prObservaciones) {
                if (origen === 'boton') {
                    return false
                } else {
                    return 'Resetear casilla'
                };

            } else {
                if (origen === 'boton') {
                    return true
                } else {
                    return ''
                };
            }
        };
        if (props.prTipo === 'cantidad') {
            if (props.prValueCantidadHoras || props.prObservaciones) {
                if (origen === 'boton') {
                    return false
                } else {
                    return 'Resetear casilla'
                };

            } else {
                if (origen === 'boton') {
                    return true
                } else {
                    return ''
                };
            }
        }
    };

    return (
        <div>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                className={classes.mt_25}
            >
                {retornaBotonVariaciones()}
                <Tooltip title={retornaActivoBotonResetear('text')} placement="top-end" arrow>
                    <span>
                        <IconButton
                            className={clsx(classes.btnLimpieza, classes.blanc, classes.mb10)}
                            size="small"
                            disabled={retornaActivoBotonResetear('boton')}
                            onClick={() => props.prTipo === 'rango' ? (handleResetearCasilla(props.prIdInicio, props.prIndex, props.prTipo)) : props.prTipo === 'rangoDescanso' ? (handleResetearCasilla(props.prIdInicio1, props.prIndex, props.prTipo)) : (handleResetearCasilla(props.prIdCantidad, props.prIndex, props.prTipo))}                    >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
            {props.prTipo === 'rango' ? (
                <Box style={esDesktop ? { display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'flex-start' } : { display: 'flex', flexDirection: 'column', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                    <Grid item xs={esDesktop ? 6 : 12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                className="calendarioOculto"
                                size="small"
                                inputVariant="outlined"
                                fullWidth
                                style={!esDesktop ? { minWidth: props.prDimensionsColumna - 33 } : null}
                                label={esDesktop ? 'Hora inicio' : 'Inicio'}
                                ampm={false}
                                id={props.prIdInicio}
                                value={props.prValueTimePickerInicio}
                                onChange={handleChangeTimePickerInicioCuadrante(props.prIdInicio, props.prIndex, props.prValueTimePickerFin)}

                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={esDesktop ? 6 : 12} style={esDesktop ? { marginLeft: 10 } : { marginTop: 15 }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                className="calendarioOculto"
                                size="small"
                                inputVariant="outlined"
                                fullWidth
                                style={!esDesktop ? { minWidth: props.prDimensionsColumna - 33 } : null}
                                label={esDesktop ? 'Hora fin' : 'Fin'}
                                ampm={false}
                                id={props.prIdFin}
                                value={props.prValueTimePickerFin}
                                onChange={handleChangeTimePickerFinCuadrante(props.prIdFin, props.prIndex, props.prValueTimePickerInicio)}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Box>
            ) : props.prTipo === 'cantidad' ? (
                <Fragment>
                    <Grid item xs={12}>
                        <FormControl
                            variant="outlined"
                            className={classes.formTipo2}
                            size="small"
                        >
                            <InputLabel>{esDesktop ? 'Cantidad horas' : 'Horas'}</InputLabel>
                            <Select
                                fullWidth
                                name={props.prIdCantidad}
                                label={esDesktop ? 'Cantidad horas' : 'Horas'}
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
                </Fragment>
            ) : props.prTipo === "rangoDescanso" ? (
                <Fragment>
                    <Box style={esDesktop ? { display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'flex-start' } : { display: 'flex', flexDirection: 'column', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                        <Grid item xs={esDesktop ? 6 : 12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className="calendarioOculto"
                                    size="small"
                                    inputVariant="outlined"
                                    fullWidth
                                    style={!esDesktop ? { minWidth: props.prDimensionsColumna - 33 } : null}
                                    label={esDesktop ? 'Hora inicio' : 'Inicio'}
                                    ampm={false}
                                    id={props.prIdInicio1}
                                    value={props.prValueTimePickerInicio1}
                                    onChange={handleChangeTimePickerInicioCuadrante(props.prIdInicio1, props.prIndex, props.prValueTimePickerFin1)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={esDesktop ? 6 : 12} style={esDesktop ? { marginLeft: 10 } : { marginTop: 15 }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className="calendarioOculto"
                                    size="small"
                                    inputVariant="outlined"
                                    fullWidth
                                    style={!esDesktop ? { minWidth: props.prDimensionsColumna - 33 } : null}
                                    label={esDesktop ? 'Hora fin' : 'Fin'}
                                    ampm={false}
                                    id={props.prIdFin1}
                                    value={props.prValueTimePickerFin1}
                                    onChange={handleChangeTimePickerFinCuadrante(props.prIdFin1, props.prIndex, props.prValueTimePickerInicio1)} />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Box>
                    <Box className={classes.mt15} style={esDesktop ? { display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'flex-start' } : { display: 'flex', flexDirection: 'column', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                        <Grid item xs={esDesktop ? 6 : 12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className="calendarioOculto"
                                    size="small"
                                    inputVariant="outlined"
                                    fullWidth
                                    style={!esDesktop ? { minWidth: props.prDimensionsColumna - 33 } : null}
                                    label={esDesktop ? 'Hora inicio' : 'Inicio'}
                                    ampm={false}
                                    id={props.prIdInicio2}
                                    value={props.prValueTimePickerInicio2}
                                    onChange={handleChangeTimePickerInicioCuadrante(props.prIdInicio2, props.prIndex, props.prValueTimePickerFin2)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={esDesktop ? 6 : 12} style={esDesktop ? { marginLeft: 10 } : { marginTop: 15 }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className="calendarioOculto"
                                    size="small"
                                    inputVariant="outlined"
                                    fullWidth
                                    style={!esDesktop ? { minWidth: props.prDimensionsColumna - 33 } : null}
                                    label={esDesktop ? 'Hora fin' : 'Fin'}
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
                {retornaSelectTipoServicio()}
            </Box>
            <Box className={classes.mt15}>
                <TextField
                    label={esDesktop ? 'Observaciones' : 'Observac.'}
                    id={props.prTipo === 'rango' ? ('observaciones-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('observaciones-' + props.prIdInicio1) : ('observaciones-' + props.prIdCantidad)}
                    value={props.prObservaciones}
                    fullWidth
                    placeholder={esDesktop ? 'Observaciones' : 'Observac.'}
                    multiline
                    variant="outlined"
                    onChange={handleChangeObservaciones(props.prIndex)}
                />
            </Box>
            <Box
                className={classes.root}
                display={props.prVisibleVariaciones ? 'block' : 'none'}
            >
                <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.mt15}
                    size="small"
                >
                    <InputLabel>Variaciones</InputLabel>
                    <Select
                        display="none"
                        name={props.prTipo === 'rango' ? ('tipoVariacionSelect-' + props.prIdInicio) : props.prTipo === 'rangoDescanso' ? ('tipoVariacionSelect-' + props.prIdInicio1) : ('tipoVariacionSelect-' + props.prIdCantidad)}
                        value={props.prTipoVariacion || ''}
                        onChange={handleChangeTipoVariaciones(props.prIndex)}
                        input={
                            <OutlinedInput
                                labelWidth={90}
                            />
                        }
                    >
                        <MenuItem value=''>
                            <em>No</em>
                        </MenuItem>
                        {variaciones.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                {esDesktop ? 'Registrar cambio' : 'Registrar'}
            </Button>
        </div>
    )
}

export default ItemCuadrante
