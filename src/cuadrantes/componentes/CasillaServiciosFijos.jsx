import React, { useEffect, useState } from 'react';
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
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
    Save as SaveIcon,
    RemoveCircleOutline as RemoveCircleOutlineIcon
} from '@material-ui/icons';
import clsx from 'clsx';

//importaciones acciones
import { handleChangeSFCasillasAccion } from '../../redux/cuadrantesHandlersDucks';
import { setTrabajadoresInicioAccion } from '../../redux/horasTrabajadoresDucks';
import { alturaCasilla } from '../../logica/logicaApp';
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';
import { setAlertaAccion } from '../../redux/cuadrantesSettersDucks';
import { retornaMinutosAccion } from '../../redux/appDucks';
import { existePrefixSF } from '../../logica/logicaServiciosFijos';

//estilos
import Clases from "../../clases";

//constantes
const {
    CANTIDAD_HORAS_CENTROS: cantidadHoras,
    TIPO_SERVICIO_FIJO: tiposServicioFijo,
} = Constantes;

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
        ? tiposServicioFijo.some(prefixObj => servicio[`int_${prefixObj.prefix}`])
        : servicio[`int_${propiedad}`] || false;
    for (const prop in servicio) {
        if (prop === postRef && servicio[prop] !== 'anulado') {
            hayServicio = true;
            if (integrado) {
                tiposServicioFijo.forEach(prefixObj => {
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
        ? tiposServicioFijo.some(prefixObj => servicio[`activo_${prefixObj.prefix}`] === 'si')
        : servicio[`activo_${propiedad}`] === 'si';
    const [disabledRegistrar, setDisabledRegistrar] = useState(true);
    const [valorSelect, setValorSelect] = useState("");

    //useEffect

    useEffect(() => {
        if (valorSelect !== "") {
            setDisabledRegistrar(false);
        } else {
            setDisabledRegistrar(true);
        }
    }, [valorSelect]);

    useEffect(() => {
        if (
            cuadranteServiciosFijos[indice]['horas'] !== null &&
            cuadranteServiciosFijos[indice]['horas'] !== undefined &&
            cuadranteServiciosFijos[indice][`${dia[1]}${dia[0]}`] &&
            cuadranteServiciosFijos[indice]['tipoServiciofijo'] === servicio.tipoServiciofijo
        ) {
            //modificador: temporal evitar quadrants antics horesSF
            if (cuadranteServiciosFijos[indice]['horas']['inicio']) {
                const horas = dispatch(retornaMinutosAccion(cuadranteServiciosFijos[indice]['horas']['inicio'], cuadranteServiciosFijos[indice]['horas']['fin']));
                setValorSelect(horas);
            } else {
                if (Array.isArray(cuadranteServiciosFijos[indice]['horas'])) {     
                    const horas = cuadranteServiciosFijos[indice]['horas'].find(hora => hora.dia === postRef)?.horas || "";
                    setValorSelect(horas);
                } else {
                    setValorSelect(cuadranteServiciosFijos[indice]['horas']);
                }
            }
        } else {
            setValorSelect("");
        }
    }, [cuadranteServiciosFijos, indice]);

    //funciones    

    const {
        gestionaTextoCasillasServiciosFijosAccion,
        gestionaClassesColoresServiciosFijosAccion
    } = logicaLayoutCuadrantes();

    const handleTimeChange = (event) => {
        setValorSelect(event.target.value)
    };

    const handleRegistrar = (postRef, indice, tipo, popupState) => {
        if (!trabajador) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Falta asignar un trabajador al Control Horario del Servicio Extra. No es posible registrar datos.",
                tipo: 'error'
            }));
            return;
        };
        //modificador: control horas servicios fijos
        if (!trabajadoresInicio.includes(trabajador)) {
            dispatch(setTrabajadoresInicioAccion([...trabajadoresInicio, trabajador]));
        };
        dispatch(handleChangeSFCasillasAccion(postRef, indice, tipo, true, popupState, valorSelect))
    };

    const handleReset = (postRef, indice, tipo, popupState) => {
        setValorSelect("");
        dispatch(handleChangeSFCasillasAccion(postRef, indice, tipo, false, popupState, ""))
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
                                            cuadranteServiciosFijos[indice]['horas'] ? cuadranteServiciosFijos[indice]['horas'] : null,
                                            postRef
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
                                        width: ampleColumnaServiciosFijos
                                    }}
                                >
                                    <Box
                                        className={classes.mb5}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
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
                                    <Box style={{ display: 'flex', flexDirection: 'column', justifycontent: 'flex-start', alignItems: 'flex-start' }}>
                                        <FormControl
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        >
                                            <InputLabel>{esDesktop ? 'Cantidad horas' : 'Horas'}</InputLabel>
                                            <Select
                                                style={!esDesktop ? { minWidth: ampleColumnaServiciosFijos - 33 } : null}
                                                label={esDesktop ? 'Cantidad horas' : 'Horas'}
                                                value={valorSelect || ''}//modificat: select
                                                onChange={handleTimeChange}
                                                helpertext="Cantidad horas"
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {cantidadHoras.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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