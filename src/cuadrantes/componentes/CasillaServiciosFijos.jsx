import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../../constantes";
import {
    Grid,
    Box,
    Typography,
    Popover,
    Button,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import {
    Save as SaveIcon,
    RemoveCircleOutline as RemoveCircleOutlineIcon
} from '@material-ui/icons';
import clsx from 'clsx';

//importaciones acciones
import { handleChangeSFCasillasAccion } from '../../redux/cuadrantesHandlersDucks';
import { setTrabajadoresInicioAccion } from '../../redux/horasTrabajadoresDucks';
import {
    alturaCasilla,
    retornaAnchoColumna
} from '../../logica/logicaApp';
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';
import { setAlertaAccion } from '../../redux/cuadrantesSettersDucks';
import { generaFechaAccion } from '../../redux/appDucks';
import { existePrefixSF } from '../../logica/logicaServiciosFijos';

//estilos
import Clases from "../../clases";

//constantes
const listadoServiciosFijos = Constantes.TIPO_SERVICIO_FIJO;

const CasillaServiciosFijos = (props) => {
    //modificador: control horas servicios fijos
    //modificador: servicios fijos personalizados
    const {
        dia,
        indexDia,
        servicio,
        indice,
        esDesktop,
        ampleColumnaServiciosFijos,
        trabajador
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const { cuadranteServiciosFijos } = useSelector(store => store.variablesCuadrantesServiciosFijos);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const { trabajadoresInicio } = useSelector(store => store.variablesHorasTrabajadores);
    const tipo = servicio.tipoServiciofijo;
    const postRef = dia[1][0] + dia[0][0];
    let hayServicio = false;
    let trab = '';
    const { propiedad, existePrefix } = existePrefixSF(servicio);
    const integrado = existePrefix
        ? listadoServiciosFijos.some(prefixObj => servicio[`int_${prefixObj.prefix}`])
        : servicio[`int_${propiedad}`] || false;
    for (const prop in servicio) {
        if (prop === postRef && servicio[prop] !== 'anulado') {
            hayServicio = true;
            if (integrado) {
                listadoServiciosFijos.forEach(prefixObj => {
                    if (servicio[`precioHora_${prefixObj.prefix}`] || servicio[`int_${prefixObj.prefix}`]) {
                        trab = servicio[`trab_${prefixObj.prefix}`];
                    };
                });
            } else {
                if (servicio[`precioHora_${propiedad}`] || servicio[`int_${propiedad}`]) {
                    trab = servicio[`trab_${propiedad}`];
                };
            };
        };
    };
    const isActive = existePrefix
        ? listadoServiciosFijos.some(prefixObj => servicio[`activo_${prefixObj.prefix}`] === 'si')
        : servicio[`activo_${propiedad}`] === 'si';
    const [disabledRegistrar, setDisabledRegistrar] = useState(true);
    const [valoresTimePicker, setValoresTimePicker] = useState({ inicio: null, fin: null });

    //useEffect

    useEffect(() => {
        if (valoresTimePicker.inicio && valoresTimePicker.fin) {
            setDisabledRegistrar(false);
        } else {
            setDisabledRegistrar(true);
        }
    }, [valoresTimePicker]);

    useEffect(() => {
        if (
            cuadranteServiciosFijos[indice]['horas'] !== null &&
            cuadranteServiciosFijos[indice]['horas'] !== undefined &&
            cuadranteServiciosFijos[indice][`${dia[1]}${dia[0]}`] &&
            cuadranteServiciosFijos[indice]['tipoServiciofijo'] === servicio.tipoServiciofijo
        ) {
            const { inicio, fin } = cuadranteServiciosFijos[indice]['horas'];
            setValoresTimePicker({ inicio: dispatch(generaFechaAccion(inicio)), fin: dispatch(generaFechaAccion(fin)) });
        } else {
            setValoresTimePicker({ inicio: null, fin: null });
        }
    }, [cuadranteServiciosFijos, indice]);

    //funciones    

    const {
        gestionaTextoCasillasServiciosFijosAccion,
        gestionaClassesColoresServiciosFijosAccion
    } = logicaLayoutCuadrantes();

    const handleTimeChange = (time, name) => {
        setValoresTimePicker(prevState => ({
            ...prevState,
            [name]: time
        }));
    };

    const handleRegistrar = (postRef, indice, tipo, popupState) => {
        const { inicio, fin } = valoresTimePicker;
        if (inicio >= fin) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                tipo: 'error'
            }));
            return;
        };
        //modificador: control horas servicios fijos
        if (!trabajadoresInicio.includes(trabajador)) {
            dispatch(setTrabajadoresInicioAccion([...trabajadoresInicio, trabajador]));
        };
        dispatch(handleChangeSFCasillasAccion(postRef, indice, tipo, true, popupState, valoresTimePicker))
    };

    const handleReset = (postRef, indice, tipo, popupState) => {
        setValoresTimePicker({ inicio: null, fin: null });
        dispatch(handleChangeSFCasillasAccion(postRef, indice, tipo, false, popupState, { inicio: null, fin: null }))
    };

    if (isActive) {
        return (
            <Grid
                container
                direction="column"
                key={'Columna_sf' + (indexDia)}
            >
                <PopupState variant="popover">
                    {(popupState) => (
                        <div>
                            < Box
                                m={0.3}
                                p={1.5}
                                className={gestionaClassesColoresServiciosFijosAccion(indexDia + 1, hayServicio, integrado, tipo) || null}
                                style={{ width: ampleColumnaServiciosFijos, minHeight: alturaCasilla(esDesktop), maxHeight: alturaCasilla(esDesktop), display: 'flex', alignItems: 'center' }}
                                {...bindTrigger(popupState)}
                            >
                                {cuadranteServiciosFijos[indice] && cuadranteServiciosFijos[indice]['estados'] && (
                                    <Typography
                                        variant='body2'
                                        style={{ color: 'secondary.contrastText' }}
                                        className={classes.truncate}
                                    >
                                        {gestionaTextoCasillasServiciosFijosAccion(
                                            indexDia + 1,
                                            trab,
                                            cuadranteServiciosFijos[indice]['estados']['estadoCasillaDia' + (indexDia + 1)],
                                            cuadranteServiciosFijos[indice]['horas'] ? cuadranteServiciosFijos[indice]['horas'] : null
                                        )}
                                    </Typography>
                                )}
                            </Box >
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                PaperProps={{
                                    style: {
                                        backgroundColor: "transparent",
                                        boxShadow: "none",
                                        borderRadius: 0
                                    }
                                }}>
                                <Box
                                    className={classes.tooltip}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        width: ampleColumnaServiciosFijos
                                    }}
                                >
                                    <Box className={classes.mb5}>
                                        <Tooltip title={disabledRegistrar ? "" : "Resetear casilla"} placement="top-end" arrow>
                                            <span>
                                                <IconButton
                                                    className={clsx(classes.btnLimpieza, classes.blanc, classes.mb10)}
                                                    size="small"
                                                    disabled={disabledRegistrar}
                                                    onClick={() => handleReset(postRef, indice, tipo, popupState)}
                                                >
                                                    <RemoveCircleOutlineIcon />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Box>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            flexDirection: esDesktop ? 'row' : 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: "100%"
                                        }}
                                        className={classes.casillaTrabSFPopover}
                                    >
                                        <Typography variant='body2' style={{ color: 'secondary.contrastText' }} className={classes.truncate}>
                                            {listadoTrabajadores.find(trab => trab.id === trabajador)?.nombre || 'Sin trabajador'}
                                        </Typography>
                                    </Box>
                                    <Box style={esDesktop ? { display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'flex-start' } : { display: 'flex', flexDirection: 'column', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Grid item xs={esDesktop ? 6 : 12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardTimePicker
                                                    className="calendarioOculto"
                                                    size="small"
                                                    inputVariant="outlined"
                                                    fullWidth
                                                    style={!esDesktop ? { minWidth: ampleColumnaServiciosFijos - 33 } : null}
                                                    label={esDesktop ? 'Hora inicio' : 'Inicio'}
                                                    ampm={false}
                                                    value={valoresTimePicker.inicio}
                                                    onChange={(time) => handleTimeChange(time, 'inicio')}

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
                                                    style={!esDesktop ? { minWidth: ampleColumnaServiciosFijos - 33 } : null}
                                                    label={esDesktop ? 'Hora fin' : 'Fin'}
                                                    ampm={false}
                                                    value={valoresTimePicker.fin}
                                                    onChange={(time) => handleTimeChange(time, 'fin')}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Box>
                                    <Button
                                        className={classes.mt15}
                                        disabled={disabledRegistrar}
                                        fullWidth
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        startIcon={<SaveIcon />}
                                        onClick={() => handleRegistrar(postRef, indice, tipo, popupState)}
                                    >
                                        {esDesktop ? 'Registrar cambio' : 'Registrar'}
                                    </Button>
                                </Box>
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </Grid >
        )
    };
    return null;
};

export default CasillaServiciosFijos;