import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemSecondaryAction,
    Typography,
    CircularProgress,
    ListItemText,
    Button,
    Chip,
    Checkbox
} from '@material-ui/core';
import {
    ExitToApp as ExitToAppIcon,
    DynamicFeed as DynamicFeedIcon,
    CheckBoxOutlineBlankOutlined as CheckBoxOutlineBlankOutlinedIcon,
    CheckBoxOutlined as CheckBoxOutlinedIcon,
    ExpandMore as ExpandMoreIcon,
    Mail as MailIcon
} from '@material-ui/icons';

//importaciones acciones
import {
    cambioEstadoInicioCuadrantesAccion,
    activarDesactivarCambioBotonRegistrarAccion,
    setCentroAccion
} from '../redux/cuadrantesDucks';
import {
    venimosDeRegistradosAccion,
    vaciarDatosPendientesAccion
} from '../redux/pendientesDucks';
import { obtenerCentroAccion, vaciarDatosCentrosAccion } from '../redux/centrosDucks';
import {
    Alert,
    getHeightContenedoresGra,
    AccordionCua as Accordion,
    AccordionDetailsCua as AccordionDetails,
    AccordionSummary3Cua as AccordionSummary,
    controlActualizacionesPorFecha
} from '../logica/logicaApp';
import { setTiempoEsperaloteAccion } from '../redux/cuadrantesSettersDucks';
import {
    gestionarMailingLoteAccion,
    actualizarCuadrantesIteradosMailingAccion,
    reseteaMailingAccion,
    generaArchivoXLSMailingAccion,
} from '../redux/cuadrantesMailingDucks';

//carga componentes
import CustomSnack from '../comun/CustomSnack';

//estilos
import Clases from "../clases";

const PendientesFacturados = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        cuadrantesFacturadosArray,
        numeroCuadrantesFacturados
    } = useSelector(store => store.variablesPendientes);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);
    const {
        totalEmails,
        processedEmails,
        isMailingComplete,
        isProcessing,
        exitoGenerarMailing,
        itemEnviando
    } = useSelector(store => store.variablesCuadrantesMailing);
    const [arrayCuadrantesModificadosFacturados, setArrayCuadrantesModificadosFacturados] = useState([]);
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra(280));
    const [heighCambio, setHeighCambio] = useState({
        scroller: heightContenedoresGra - 90,
        accordion: 0
    });
    const [marcarTodosVisible, setMarcarTodosVisible] = useState(true);
    const [checked, setChecked] = useState({});
    const [alert, setAlert] = useState({});
    const [openSnack, setOpenSnack] = useState(false);

    //useEffect

    useEffect(() => {
        const resizeListener = () => {
            setHeightContenedoresGra(getHeightContenedoresGra(280));
            setHeighCambio({
                scroller: getHeightContenedoresGra(280) - 90,
                accordion: 0
            });
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (cuadrantesFacturadosArray.length > 0) {
            let cuadrantes = [];
            cuadrantesFacturadosArray.forEach((cuadrante, index) => {
                const nombreSplitted = cuadrante.nombre.split("-");
                const objeto = {
                    ...cuadrante,
                    ['nombreCentro']: cuadrante.total.nombreCentro,
                    idCentro: nombreSplitted[2]
                };
                cuadrantes.push(objeto);
            });
            cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
            setArrayCuadrantesModificadosFacturados(cuadrantes);
        }
    }, [cuadrantesFacturadosArray]);

    useEffect(() => {
        const procesarMailingFinalizado = async () => {
            try {
                const resultadoActualizacion = await dispatch(actualizarCuadrantesIteradosMailingAccion());
                if (resultadoActualizacion.payload) {
                    const resultadoGeneracionArchivo = await dispatch(generaArchivoXLSMailingAccion(props.prMes));
                    if (resultadoGeneracionArchivo.payload) {
                        dispatch(reseteaMailingAccion());
                        setExpandedAccordion(false);
                        setHeighCambio((prev) => ({
                            scroller: prev.scroller + 70,
                            accordion: prev.accordion
                        }));
                        dispatch(setTiempoEsperaloteAccion(false));
                        dispatch(vaciarDatosPendientesAccion());
                        dispatch(vaciarDatosCentrosAccion());
                        selectNoneChecked();
                    }
                }
            } catch (error) {
                console.error('Error en el procesamiento de mailing:', error);
            }
        };
        if (isMailingComplete && processedEmails === totalEmails && isProcessing) {
            procesarMailingFinalizado();
        }
    }, [isMailingComplete, processedEmails, totalEmails, isProcessing]);

    useEffect(() => {
        if (exitoGenerarMailing) {
            setAlert({
                mensaje: "Lote de emails enviados correctamente.",
                tipo: 'success'
            });
            setOpenSnack(true);
        };
    }, [exitoGenerarMailing]);

    useEffect(() => {
        if (itemEnviando?.mail && itemEnviando?.centro && itemEnviando?.estado) {
            setAlert({
                mensaje: `Enviando mail ${itemEnviando.mail} - ${itemEnviando.centro}: ${itemEnviando.estado}`,
                tipo: 'info'
            });
            setOpenSnack(true);
        };
    }, [itemEnviando]);

    //funciones

    const handleChangeChecked = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const handleCuadrantesFacturados = (centro) => {
        dispatch(setCentroAccion(centro));
        dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        //dispatch(registrarIntervencionCuadranteNuevoAccion(true));
        dispatch(venimosDeRegistradosAccion(true));
    };

    const handleCambioAccordionPendientes = (expandedAccordion, panel) => {
        setExpandedAccordion(expandedAccordion ? panel : true);
        if (expandedAccordion) {
            setHeighCambio({
                scroller: heighCambio.scroller - 70,
                accordion: heighCambio.accordion + 0
            });
        } else {
            setHeighCambio({
                scroller: heighCambio.scroller + 70,
                accordion: heighCambio.accordion - 0
            });
        };
    };

    const selectAllChecked = () => {
        const object = cuadrantesFacturadosArray.reduce((acc, cuadrante) => {
            if (cuadrante.total.mailEnviado === 'no' && cuadrante.total.mail && cuadrante.total.procesado.valor === "si") {
                acc[`checked-${cuadrante.id}`] = true;
            };
            return acc;
        }, {});
        setChecked(object);
        setMarcarTodosVisible(false);
    };

    const selectNoneChecked = () => {
        const object = cuadrantesFacturadosArray.reduce((acc, cuadrante) => {
            acc[`checked-${cuadrante.id}`] = false;
            return acc;
        }, {});
        setChecked(object);
        setMarcarTodosVisible(true);
    };

    const retornaCantidadChecked = () => Object.values(checked).filter(Boolean).length;

    const retornaDisabledChecked = () => !Object.values(checked).includes(true);

    const retornaDisabledCheckedItem = (total) => total.mailEnviado === "si" || !total.mail || total.procesado.valor === "no";

    const handleGenerarLoteMailing = () => {
        const arrayIdsCuadrantes = Object.keys(checked)
            .filter(prop => checked[prop])
            .map(prop => parseInt(prop.split("-")[1]));
        const arrayCuadrantesDef = cuadrantesFacturadosArray.filter(cuadrante =>
            arrayIdsCuadrantes.includes(cuadrante.id)
        );
        const [anyo, mes] = calendarioAGestionar.split("-");
        dispatch(gestionarMailingLoteAccion(arrayCuadrantesDef, anyo, mes));
        dispatch(setTiempoEsperaloteAccion(true));
    };

    //retorno componentes

    const retornaCuadranteFacturado = (cuadrante, index) => {
        const nombreSplitted = cuadrante.nombre.split("-");
        return (
            <Box
                key={'listaCuadrantes' + index}
            >
                <ListItem
                    className={cuadrante.total.procesado.valor === 'si' ? (cuadrante.total.mailEnviado === "si" ? classes.casillaProcesadosMailing : classes.casillaProcesados) : classes.casilla}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <Checkbox
                        edge="start"
                        checked={checked['checked-' + cuadrante.id] || false}
                        name={'checked-' + cuadrante.id}
                        onChange={handleChangeChecked}
                        style={{ marginTop: -3 }}
                        disabled={retornaDisabledCheckedItem(cuadrante.total)}
                    />
                    <ListItemText
                        primary={cuadrante.total.subNombreCentro ? (cuadrante.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.nombreCentro}
                        secondary={
                            cuadrante.total.procesado.valor === 'no' ? (
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Facturado el {cuadrante.actualizacion}
                                    </Typography>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Emitido el {cuadrante.actualizacion}
                                    </Typography>
                                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {cuadrante.total.procesado.numR ? (
                                            <Typography
                                                component="span"
                                                variant="body2"
                                            > {'Recibo nº ' + cuadrante.total.procesado.numR}
                                            </Typography>
                                        ) : (
                                            cuadrante.total.mailEnviado === "si" ? (
                                                <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end' }}>
                                                    <MailIcon
                                                        style={{ fontSize: 17 }}
                                                    />
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        style={{ marginLeft: 5 }}
                                                    >
                                                        {'Factura nº ' + cuadrante.total.procesado.numF + ' - enviada por mail'}
                                                    </Typography>
                                                </span>
                                            ) : (
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                > {'Factura nº ' + cuadrante.total.procesado.numF}
                                                </Typography>
                                            )
                                        )}
                                    </span>
                                </Fragment>
                            )}
                        onClick={() => handleCuadrantesFacturados(parseInt(nombreSplitted[2]))}
                    />
                    <ListItemSecondaryAction>
                        <ExitToAppIcon
                            className={classes.gris}
                        />
                    </ListItemSecondaryAction>
                </ListItem >
            </Box >
        )
    };

    return (
        <div>
            {/* {console.log(props.prOpenLoading)}  */}
            <Grid
                spacing={1}
                container
                direction="column"
                alignItems="center"
                justify="center"
                p={2}
                className={classes.rootPendientes}
                style={{ minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, width: props.prWidthContenedores + 10 }}
            >
                {props.prOpenLoading ? (
                    <Box
                        className={classes.centrado}
                    >
                        <CircularProgress />
                    </Box>
                ) : (numeroCuadrantesFacturados < 1 ? (
                    <Box p={3} style={{ width: '100%', minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra, marginTop: 0, marginLeft: 0 }}>
                        <Alert severity="info">No hay cuadrantes facturados por gestionar.</Alert>
                    </Box>
                ) : (
                    <>
                        <Accordion
                            expanded={expandedAccordion === 'panelPendientes'}
                            className={classes.suplente}
                            style={{ marginTop: (heighCambio.accordion + 20), width: '100%', marginLeft: 25, marginRight: 15, marginBottom: -10 }}
                            onChange={(e, expandedAccordion) => { handleCambioAccordionPendientes(expandedAccordion, 'panelPendientes') }}
                            disabled={!controlActualizacionesPorFecha("2024-5", calendarioAGestionar)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                            >
                                <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>Procesar lote de cuadrantes facturados para mailing</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container style={{ paddingTop: 5, paddingBottom: 0 }}>
                                    <Grid item xs={6}>
                                        {marcarTodosVisible ? (
                                            <Chip
                                                variant='outlined'
                                                style={{ padding: 5, marginTop: 5 }}
                                                icon={<CheckBoxOutlinedIcon />}
                                                label="Seleccionar todos"
                                                clickable
                                                onClick={() => selectAllChecked()}
                                            />
                                        ) : (
                                            <Chip
                                                variant='outlined'
                                                style={{ padding: 5, marginTop: 5 }}
                                                icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                label="Desmarcar todos"
                                                clickable
                                                onClick={() => selectNoneChecked()}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            disabled={retornaDisabledChecked()}
                                            fullWidth
                                            variant="contained"
                                            style={{ marginRight: 8, paddingTop: 7, paddingBottom: 7 }}
                                            startIcon={<DynamicFeedIcon />}
                                            onClick={handleGenerarLoteMailing}
                                        >
                                            Procesar lote {retornaCantidadChecked()}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Box
                            className={classes.scrollable}
                            style={{ width: props.prWidthContenedores, height: heighCambio.scroller, margin: 10 }}
                        >
                            <List dense={true}
                                style={{ padding: 15 }}>
                                {arrayCuadrantesModificadosFacturados.map((cuadrante, index) => (
                                    retornaCuadranteFacturado(cuadrante, index)
                                ))}
                            </List>
                        </Box>
                    </>
                ))}
                <CustomSnack
                    open={openSnack}
                    message={alert.mensaje}
                    severity={alert.tipo}
                    tipoCuadrante={false}
                    setOpenSnack={setOpenSnack}
                />
            </Grid>
            {/* {console.log(checked)} */}
        </div>
    )
}

export default PendientesFacturados
