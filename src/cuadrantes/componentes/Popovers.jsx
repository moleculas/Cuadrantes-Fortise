import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Constantes from "../../constantes";
import {
    Box,
    Grid,
    Button,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Popover,
    Typography
} from '@material-ui/core';
import clsx from 'clsx';
import {
    Save as SaveIcon,
    AddToPhotos as AddToPhotosIcon
} from '@material-ui/icons';

//carga componentes
import ItemCuadrante from './ItemCuadrante';
import ServiciosFijos from './ServiciosFijos';
import ConfiguracionCuadrante from './ConfiguracionCuadrante';

//importacion acciones
import {
    handleClosePopoverServiciosFijosAccion,
    handleClosePopoverConfiguracionAccion,
    handleClosePopoverGeneralAccion,
    handleClosePopoverDiasAccion
} from '../../redux/cuadrantesPopoversDucks';
import {
    handleChangeTimePickerInicioCuadranteAccion,
    handleChangeTimePickerFinCuadranteAccion,
    handleVisibleVariacionesAccion,
    handleChangeTipoVariacionesAccion,
    handleChangeFestivoDiaAccion,
    handleChangeSelectCantidadAccion,
    handleChangeObservacionesAccion,
    handleChangeTipoServicioAccion,
    handleChangeFormConfiguracionCuadranteAccion,
    handleChangeFormConfiguracionServiciosFijosAccion,
    gestionItemPrevioEditandoAccion,
    handleRegistrarCambioEnCasillaAccion,
    gestionItemPrevioEditandoServiciosFijosAccion,
    handleRegistrarCambioEnCasillaServiciosFijosAccion,
    gestionItemPrevioEditandoConfiguracionAccion,
    handleRegistrarCambioEnCasillaConfiguracionAccion,
    handleResetearCasillaAccion
} from '../../redux/cuadrantesHandlersDucks';
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';
import { setServiciosFijosPersonalizadosAccion } from '../../redux/cuadrantesServiciosFijosDucks';

//estilos
import Clases from "../../clases";

//constantes
const tipoFestivo = Constantes.TIPO_FESTIVO;

const Popovers = (props) => {
    const {
        scrollable,
        heightScrollable,
        classesDisp,
        boxes,
        ampleColumna,
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const { objetoCentro } = useSelector(store => store.variablesCentros);
    const {
        estadoActivadoDesactivadoCambio: disabledItem,
        stateFestivo,
        cuadrante
    } = useSelector(store => store.variablesCuadrantes);
    const {
        itemEditandoServiciosFijos,
        serviciosFijosPersonalizados
    } = useSelector(store => store.variablesCuadrantesServiciosFijos);
    const {
        cuadranteVacio,
        itemEditandoConfiguracion
    } = useSelector(store => store.variablesCuadrantesSetters);
    const {
        variablesPopoverDias,
        variablesPopoverGeneral,
        anchorElDias,
        anchorElServiciosFijos,
        anchorElConfiguracion,
        anchorElGeneral
    } = useSelector(store => store.variablesCuadrantesPopovers);
    const openDias = Boolean(anchorElDias);
    const openGeneral = Boolean(anchorElGeneral);
    const openServiciosFijos = Boolean(anchorElServiciosFijos);
    const openConfiguracion = Boolean(anchorElConfiguracion);

    //funciones

    const { gestionaValoresCasillasAccion } = logicaLayoutCuadrantes();

    const agregarServicioPersonalizado = () => {
        //modificador: servicios fijos personalizados
        const nuevoServicioSufijo = `P${serviciosFijosPersonalizados.length + 1}`;
        const nuevoServicio =
        {
            [`variacion_${nuevoServicioSufijo}`]: 3,
            [`diaVariacion_${nuevoServicioSufijo}`]: '',
            [`activo_${nuevoServicioSufijo}`]: 'si',
            [`int_${nuevoServicioSufijo}`]: false,
            [`trab_${nuevoServicioSufijo}`]: '',
            [`descripcion_${nuevoServicioSufijo}`]: ''
        };
        dispatch(setServiciosFijosPersonalizadosAccion([...serviciosFijosPersonalizados, nuevoServicio]));
    };

    return (
        <>
            <Popover
                open={openDias}
                anchorEl={anchorElDias}
                onClose={() => dispatch(handleClosePopoverDiasAccion(scrollable, classesDisp))}
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
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: 165 }}>
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <FormControl
                            variant="outlined"
                            fullWidth
                            className={clsx(classes.mt5, classes.px5)}
                            size="small"
                        >
                            <InputLabel>Estado</InputLabel>
                            <Select
                                id="form-tipoFestivo"
                                label="Estado"
                                value={stateFestivo['estadoFestivoDia' + (variablesPopoverDias.index + 1)] ? stateFestivo['tipoFestivoDia' + (variablesPopoverDias.index + 1)] : 0}
                                onChange={(event) => dispatch(handleChangeFestivoDiaAccion(variablesPopoverDias.postRef, variablesPopoverDias.index + 1, variablesPopoverDias.dia, event, null, false, scrollable, classesDisp))}
                                helpertext="Selecciona Tipo Festivo"
                            >
                                {tipoFestivo.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Box>
            </Popover>
            <Popover
                open={openGeneral}
                anchorEl={anchorElGeneral}
                onClose={() => dispatch(handleClosePopoverGeneralAccion(scrollable, boxes, classes))}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: 'none',
                        borderRadius: 0
                    }
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: ampleColumna }}
                >
                    <Grid container className={classes.mt20}>
                        <Box style={{ width: '100%' }}>
                            {variablesPopoverGeneral.columna ? (
                                variablesPopoverGeneral.columna.tipoHorario === 'rango' ? (
                                    <Fragment>
                                        <ItemCuadrante
                                            prTipo={'rango'}
                                            prIdInicio={'timePickerInicio-' + variablesPopoverGeneral.postRef}
                                            prIdFin={'timePickerFin-' + variablesPopoverGeneral.postRef}
                                            prIndex={variablesPopoverGeneral.indexColumna}
                                            prValueTimePickerInicio={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prValueTimePickerFin={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 2) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={(index, elId, e) => dispatch(handleVisibleVariacionesAccion(index, elId, e))}
                                            prHandleChangeTipoVariaciones={(index, event) => dispatch(handleChangeTipoVariacionesAccion(index, event))}
                                            prHandleChangeTimePickerInicioCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerInicioCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeTimePickerFinCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerFinCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeObservaciones={(index, event) => dispatch(handleChangeObservacionesAccion(index, event))}
                                            prGestionItemPrevioEditando={(tipo, valores) => dispatch(gestionItemPrevioEditandoAccion(tipo, valores))}
                                            prHandleRegistrarCambioEnCasilla={(id, index, tipo) => dispatch(handleRegistrarCambioEnCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleResetearCasilla={(id, index, tipo) => dispatch(handleResetearCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                            prDimensionsColumna={ampleColumna}
                                        />
                                    </Fragment>
                                ) : variablesPopoverGeneral.columna.tipoHorario === 'cantidad' ? (
                                    <Fragment>
                                        <ItemCuadrante
                                            prTipo={'cantidad'}
                                            prIndex={variablesPopoverGeneral.indexColumna}
                                            prIdCantidad={'selectCantidad-' + variablesPopoverGeneral.postRef}
                                            prValueCantidadHoras={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={(index, elId, e) => dispatch(handleVisibleVariacionesAccion(index, elId, e))}
                                            prHandleChangeTipoVariaciones={(index, event) => dispatch(handleChangeTipoVariacionesAccion(index, event))}
                                            prHandleChangeSelectCantidad={(index, event) => dispatch(handleChangeSelectCantidadAccion(index, event))}
                                            prHandleChangeObservaciones={(index, event) => dispatch(handleChangeObservacionesAccion(index, event))}
                                            prGestionItemPrevioEditando={(tipo, valores) => dispatch(gestionItemPrevioEditandoAccion(tipo, valores))}
                                            prHandleRegistrarCambioEnCasilla={(id, index, tipo) => dispatch(handleRegistrarCambioEnCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleResetearCasilla={(id, index, tipo) => dispatch(handleResetearCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                            prDimensionsColumna={ampleColumna}
                                        />
                                    </Fragment>
                                ) : variablesPopoverGeneral.columna.tipoHorario === 'rangoDescanso' ? (
                                    <Fragment>
                                        <ItemCuadrante
                                            prTipo={'rangoDescanso'}
                                            prIndex={variablesPopoverGeneral.indexColumna}
                                            prIdInicio1={'timePickerInicio1Descanso-' + variablesPopoverGeneral.postRef}
                                            prIdFin1={'timePickerFin1Descanso-' + variablesPopoverGeneral.postRef}
                                            prIdInicio2={'timePickerInicio2Descanso-' + variablesPopoverGeneral.postRef}
                                            prIdFin2={'timePickerFin2Descanso-' + variablesPopoverGeneral.postRef}
                                            prValueTimePickerInicio1={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 1) : null}
                                            prValueTimePickerFin1={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 2) : null}
                                            prValueTimePickerInicio2={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 3) : null}
                                            prValueTimePickerFin2={(variablesPopoverGeneral.indexDia && variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna && variablesPopoverGeneral.dia) ? gestionaValoresCasillasAccion(variablesPopoverGeneral.indexDia + 1, variablesPopoverGeneral.postRef, variablesPopoverGeneral.columna, variablesPopoverGeneral.dia, 4) : null}
                                            prObservaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].observaciones : null}
                                            prVisibleVariaciones={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].visibleVariaciones : false}
                                            prTipoVariacion={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoVariacion : ''}
                                            prHandleVisibleVariaciones={(index, elId, e) => dispatch(handleVisibleVariacionesAccion(index, elId, e))}
                                            prHandleChangeTipoVariaciones={(index, event) => dispatch(handleChangeTipoVariacionesAccion(index, event))}
                                            prHandleChangeTimePickerInicioCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerInicioCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeTimePickerFinCuadrante={(id, index, horaPareja, hora) => dispatch(handleChangeTimePickerFinCuadranteAccion(id, index, horaPareja, hora))}
                                            prHandleChangeObservaciones={(index, event) => dispatch(handleChangeObservacionesAccion(index, event))}
                                            prGestionItemPrevioEditando={(tipo, valores) => dispatch(gestionItemPrevioEditandoAccion(tipo, valores))}
                                            prHandleRegistrarCambioEnCasilla={(id, index, tipo) => dispatch(handleRegistrarCambioEnCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleResetearCasilla={(id, index, tipo) => dispatch(handleResetearCasillaAccion(id, index, tipo, scrollable, boxes, classes))}
                                            prHandleChangeTipoServicio={(index, event) => dispatch(handleChangeTipoServicioAccion(index, event))}
                                            prValueTipoServicio={(variablesPopoverGeneral.postRef && variablesPopoverGeneral.columna) ? variablesPopoverGeneral.columna[variablesPopoverGeneral.postRef].tipoServicio : ''}
                                            prDimensionsColumna={ampleColumna}
                                        />
                                    </Fragment>
                                ) : null
                            ) : null}
                        </Box>
                    </Grid>
                </Box>
            </Popover>
            <Popover
                open={openServiciosFijos}
                anchorEl={anchorElServiciosFijos}
                onClose={() => dispatch(handleClosePopoverServiciosFijosAccion(scrollable, classes))}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 0
                    }
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: 725, marginLeft: 10 }}>
                    <Box
                        m={0.5}
                        color="secondary.contrastText"
                        className={clsx(classes.fondoAlta, classes.boxStl3, classes.mb20)}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography variant="body1">Configuración servicios extra</Typography>
                        <Button
                            size="small"
                            color="secondary"
                            variant="contained"
                            startIcon={<AddToPhotosIcon />}
                            onClick={agregarServicioPersonalizado}
                        >
                            Servicio Personalizado
                        </Button>
                    </Box>
                    <Box style={{ height: heightScrollable - 150, marginRight: -5, paddingRight: 25 }} className={classes.scrollable} >
                        <ServiciosFijos
                            itemEditandoServiciosFijos={itemEditandoServiciosFijos}
                            prHandleChangeFormConfiguracionServiciosFijos={(tipo, prop, event) => dispatch(handleChangeFormConfiguracionServiciosFijosAccion(tipo, prop, event))}
                            prGestionItemPrevioEditandoServiciosFijos={(valores) => dispatch(gestionItemPrevioEditandoServiciosFijosAccion(valores))}
                            serviciosFijosPersonalizados={serviciosFijosPersonalizados.length > 0 ? serviciosFijosPersonalizados : null}
                        />
                    </Box>
                    <Box px={0.5}>
                        <Button
                            className={classes.mt15}
                            disabled={disabledItem}
                            fullWidth
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<SaveIcon />}
                            onClick={() => dispatch(handleRegistrarCambioEnCasillaServiciosFijosAccion(scrollable, classes))}
                        >
                            Registrar cambio
                        </Button>
                    </Box>
                </Box>
            </Popover>
            <Popover
                open={openConfiguracion}
                anchorEl={anchorElConfiguracion}
                onClose={() => dispatch(handleClosePopoverConfiguracionAccion(scrollable, classes))}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 0
                    }
                }}
            >
                <Box
                    className={classes.tooltip}
                    style={{ width: 350, marginLeft: 5 }}>
                    <Box
                        m={0.5}
                        color="secondary.contrastText"
                        className={clsx(classes.fondoAlta, classes.boxStl2, classes.mb15)}
                    >
                        Ajustes cuadrante
                    </Box>
                    <Box style={{ height: heightScrollable - 145, marginRight: -5, paddingRight: 10, paddingLeft: 5 }} className={classes.scrollable} >
                        <ConfiguracionCuadrante
                            prCentro={objetoCentro}
                            prItemEditandoConfiguracion={itemEditandoConfiguracion}
                            prHandleChangeFormConfiguracionCuadrante={(prop, event) => dispatch(handleChangeFormConfiguracionCuadranteAccion(prop, event))}
                            prGestionItemPrevioEditandoConfiguracion={(valores) => dispatch(gestionItemPrevioEditandoConfiguracionAccion(valores))}
                            prCuadranteLength={cuadrante.length}
                            prCuadranteVacio={cuadranteVacio}
                        />
                    </Box>
                    <Box px={0.5}>
                        <Button
                            className={classes.mt15}
                            disabled={disabledItem}
                            fullWidth
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<SaveIcon />}
                            onClick={() => dispatch(handleRegistrarCambioEnCasillaConfiguracionAccion(scrollable, classes))}
                        >
                            Registrar cambio
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </>
    )
};

export default Popovers;