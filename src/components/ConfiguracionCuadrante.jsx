import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Constantes from "../constantes";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

//importaciones acciones
import { retornaFormaPagoAccion } from '../redux/cuadrantesDucks';

//estilos
import Clases from "../clases";

const tipos = Constantes.MODO_ENTRADA_HORARIOS;
const computoHoras = Constantes.COMPUTO_HORAS;
const excepciones = Constantes.EXCEPCIONES_CENTROS;

const ConfiguracionCuadrante = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();

    const [valoresPreviosConfiguracion, setValoresPreviosConfiguracion] = useState({
        tipoHorario: props.prItemEditandoConfiguracion.tipoHorario || '',
        computo: props.prItemEditandoConfiguracion.computo || '',
        excepcion: props.prItemEditandoConfiguracion.excepcion || '',
        mensualPactado: props.prItemEditandoConfiguracion.mensualPactado || '',
        precioHora_L: props.prItemEditandoConfiguracion.precioHora_L || '',
        precioHora_E: props.prItemEditandoConfiguracion.precioHora_E || '',
        precioHora_P: props.prItemEditandoConfiguracion.precioHora_P || '',
        precioHora_N: props.prItemEditandoConfiguracion.precioHora_N || '',
        precioHora_R: props.prItemEditandoConfiguracion.precioHora_R || '',
        precioHora_L1: props.prItemEditandoConfiguracion.precioHora_L1 || '',
        precioHora_L2: props.prItemEditandoConfiguracion.precioHora_L2 || '',
        precioHora_F: props.prItemEditandoConfiguracion.precioHora_F || '',
        observaciones: props.prItemEditandoConfiguracion.observaciones || ''
    });

    //useEffect

    useEffect(() => {
        gestionItemPrevioEditandoConfiguracion(valoresPreviosConfiguracion);
    }, []);

    //funciones

    const gestionItemPrevioEditandoConfiguracion = (valores) => {
        props.prGestionItemPrevioEditandoConfiguracion(valores);
    };

    const handleChangeFormConfiguracionCuadrante = (prop) => (e) => {
        props.prHandleChangeFormConfiguracionCuadrante(prop, e);
    };

    return (
        <div>
            <Grid item xs={12} className={classes.mb20}>
                <List dense={true}>
                    <ListItem
                        className={classes.listConfig}
                    >
                        <ListItemText
                            primary="Centro"
                            secondary={props.prCentro.nombre}
                        />
                    </ListItem >
                    <ListItem
                        className={classes.listConfig}
                    >
                        <ListItemText
                            primary="Forma de pago"
                            secondary={dispatch(retornaFormaPagoAccion(props.prCentro.formaPago))}
                        />
                    </ListItem >
                    {props.prCentro.diaPago ? (
                        <ListItem
                            className={classes.listConfig}
                        >
                            <ListItemText
                                primary="Vencimiento"
                                secondary={'Día: ' + props.prCentro.diaPago}
                            />
                        </ListItem >
                    ) : null}
                    <ListItem
                        className={classes.listConfig}
                    >
                        <ListItemText
                            primary="Temporización"
                            secondary={props.prCentro.tempPago}
                        />
                    </ListItem >
                </List>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.mb15}>
                    <TextField
                        label="Observaciones"
                        id="form-observaciones-cuadrante"
                        value={props.prItemEditandoConfiguracion.observaciones || ''}
                        className={classes.form}
                        fullWidth
                        placeholder="Observaciones Cuadrante"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={handleChangeFormConfiguracionCuadrante('observaciones')}
                    />
                </Box>
                {!props.prCuadranteVacio ? (
                    <Fragment>
                        <FormControl
                            variant="outlined"
                            className={classes.form}
                            size="small"
                        >
                            <InputLabel>Modo entrada datos</InputLabel>
                            <Select
                                fullWidth
                                className={classes.mb15}
                                id="form-tipo-cuadrante"
                                label="Modo entrada datos"
                                value={props.prItemEditandoConfiguracion.tipoHorario || ''}
                                onChange={handleChangeFormConfiguracionCuadrante('tipoHorario')}
                                helpertext="Selecciona Modo entrada datos"
                            >
                                {
                                    tipos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            className={classes.form}
                            size="small"
                        >
                            <InputLabel>Excepciones</InputLabel>
                            <Select
                                fullWidth
                                className={classes.mb15}
                                id="form-excepcion-cuadrante"
                                label="Excepciones"
                                value={props.prItemEditandoConfiguracion.excepcion || ''}
                                onChange={handleChangeFormConfiguracionCuadrante('excepcion')}
                                helpertext="Selecciona Excepción"
                            >
                                <MenuItem value=''>
                                    <em>No</em>
                                </MenuItem>
                                {
                                    excepciones.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            className={classes.form}
                            size="small"
                        >
                            <InputLabel>Tipo cómputo</InputLabel>
                            <Select
                                fullWidth
                                className={classes.mb15}
                                id="form-tipo-computo-cuadrantes"
                                label="Tipo cómputo"
                                value={props.prItemEditandoConfiguracion.computo || ''}
                                onChange={handleChangeFormConfiguracionCuadrante('computo')}
                                helpertext="Selecciona cómputo de horas"
                            >
                                {
                                    computoHoras.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {props.prItemEditandoConfiguracion.computo === 1 || props.prItemEditandoConfiguracion.computo === 3 ? (
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                                size="small"
                            >
                                <InputLabel>Mensual pactado</InputLabel>
                                <OutlinedInput
                                    className={classes.mb15}
                                    fullWidth
                                    id="form-mensual-pactado-cuadrante"
                                    value={props.prItemEditandoConfiguracion.mensualPactado || ''}
                                    onChange={handleChangeFormConfiguracionCuadrante('mensualPactado')}
                                    labelWidth={130}
                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                />
                            </FormControl>
                        ) : null}
                        {props.prItemEditandoConfiguracion.computo === 2 || props.prItemEditandoConfiguracion.computo === 3 ? (
                            <Fragment>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora LIM</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_L-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_L || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_L')}
                                        labelWidth={120}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza</Typography>
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora LIME</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_E-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_E || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_E')}
                                        labelWidth={125}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza especial</Typography>
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora LIMP</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_P-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_P || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_P')}
                                        labelWidth={130}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza del parking</Typography>
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora NAVE2</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_N-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_N || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_N')}
                                        labelWidth={130}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza nave 2</Typography>
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora REFZ</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_R-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_R || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_R')}
                                        labelWidth={125}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza refuerzo</Typography>
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora LIM1</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_L1-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_L1 || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_L1')}
                                        labelWidth={120}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza 1</Typography>
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora LIM2</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_L2-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_L2 || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_L2')}
                                        labelWidth={125}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza 2</Typography>
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Precio hora FEST</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-precio-hora_F-cuadrante"
                                        value={props.prItemEditandoConfiguracion.precioHora_F || ''}
                                        onChange={handleChangeFormConfiguracionCuadrante('precioHora_F')}
                                        labelWidth={125}
                                        startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                    />
                                </FormControl>
                                <Box className={classes.boxMiniServicios}>
                                    <Typography className={classes.labelBoxMiniServicios}>Servicio de limpieza día festivo</Typography>
                                </Box>
                            </Fragment>
                        ) : null}
                    </Fragment>
                ) : null}
            </Grid>
            {/* {console.log(props.prCentro.computo)} */}
        </div>
    )
}

export default ConfiguracionCuadrante
