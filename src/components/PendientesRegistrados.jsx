import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Checkbox from '@material-ui/core/Checkbox';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import Button from '@material-ui/core/Button';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//importaciones acciones
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { venimosDeRegistradosAccion } from '../redux/pendientesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';
import { generarArchivosXLSLoteAccion } from '../redux/appDucks';
import { finalizarArchivosXLSLoteAccion } from '../redux/appDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import { emitirArchivosXLSLoteAccion } from '../redux/appDucks';
import { actualizarCuadrantesIteradosAccion } from '../redux/appDucks';
import { setValorTabPantallaCuadrantesAccion } from '../redux/cuadrantesSettersDucks';
import { setTiempoEsperaloteAccion } from '../redux/cuadrantesSettersDucks';

//estilos
import Clases from "../clases";

const getHeightContenedoresGra = () => ((window.innerHeight) - 280) || ((document.documentElement.clientHeight) - 280) || ((document.body.clientHeight) - 280);

//accordion
const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        borderRadius: '0px !important',
    }
})(MuiAccordion);
const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12);',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
        borderRight: '1px solid rgba(0, 0, 0, 0.12);',
    },
}))(MuiAccordionDetails);
const AccordionSummary = withStyles({
    root: {
        minHeight: 38,
        maxHeight: 38,
        '&.Mui-expanded': {
            minHeight: 38,
            maxHeight: 38,
        }
    }
})(MuiAccordionSummary);

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const PendientesRegistrados = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const cuadrantesRegistradosArray = useSelector(store => store.variablesPendientes.cuadrantesRegistradosArray);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const laDataFAC = useSelector(store => store.variablesApp.laDataFAC);
    const laDataLFA = useSelector(store => store.variablesApp.laDataLFA);
    const numeroCuadrantesRegistrados = useSelector(store => store.variablesPendientes.numeroCuadrantesRegistrados);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);

    //states

    const [checked, setChecked] = useState({});
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [marcarTodosVisible, setMarcarTodosVisible] = useState(true);
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra());
    const [heighCambio, setHeighCambio] = useState({
        scroller: heightContenedoresGra - 90,
        accordion: 0
    });
    const [numeroFactusolPendientes, setNumeroFactusolPendientes] = useState(null);
    const [arrayCuadrantesDefsParaCheck, setArrayCuadrantesDefsParaCheck] = useState([]);
    const [arrayCuadrantesModificadosRegistrados, setArrayCuadrantesModificadosRegistrados] = useState([]);

    //useEffect

    useEffect(() => {
        const resizeListener = () => {
            setHeightContenedoresGra(getHeightContenedoresGra());
            setHeighCambio({
                scroller: getHeightContenedoresGra() - 90,
                accordion: 0
            });
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (cuadrantesRegistradosArray.length > 0) {
            selectNoneChecked();
            let cuadrantes = [];
            let nombreSplitted;
            cuadrantesRegistradosArray.forEach((cuadrante, index) => {
                let objeto = {};
                nombreSplitted = cuadrante.nombre.split("-");
                const nombreCentro = dispatch(obtenerObjetoPorIdAccion(listadoCentros, parseInt(nombreSplitted[2])));
                objeto = {
                    ...cuadrante,
                    ['nombreCentro']: nombreCentro,
                    idCentro: nombreSplitted[2]
                };
                cuadrantes.push(objeto);
            });
            cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
            setArrayCuadrantesModificadosRegistrados(cuadrantes);
        };
    }, [cuadrantesRegistradosArray]);

    useEffect(() => {
        if ((laDataFAC.length > 0) && (laDataFAC.length === arrayCuadrantesDefsParaCheck.length)) {
            dispatch(actualizarCuadrantesIteradosAccion());
            setTimeout(() => {
                setArrayCuadrantesDefsParaCheck([]);
                dispatch(finalizarArchivosXLSLoteAccion(true));
                dispatch(emitirArchivosXLSLoteAccion(laDataFAC, laDataLFA));
                setNumeroFactusolPendientes(null);
                setExpandedAccordion(false);
                setHeighCambio({
                    scroller: heighCambio.scroller + 70,
                    accordion: heighCambio.accordion - 0
                });
                dispatch(forzarRecargaGraficosCuadrantesAccion(true));
                dispatch(setValorTabPantallaCuadrantesAccion(2));
                dispatch(setTiempoEsperaloteAccion(false));
            }, 10000);
        };
    }, [laDataFAC]);

    //funciones

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeChecked = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const handleCuadrantesRegistrados = (centro) => {
        dispatch(setCentroAccion(centro));
        dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        //dispatch(registrarIntervencionCuadranteNuevoAccion(true));
        dispatch(venimosDeRegistradosAccion(true));
    };

    const retornaCantidadChecked = () => {
        let contador = 0;
        for (const prop in checked) {
            if (checked[prop]) {
                contador++;
            }
        };
        return contador
    };

    const retornaDisabledChecked = () => {
        let arrayRespuestas = [];
        for (const prop in checked) {
            if (checked[prop]) {
                arrayRespuestas.push(true);
            } else {
                arrayRespuestas.push(false);
            }
        };
        if (arrayRespuestas.includes(true)) {
            return false;
        } else {
            return true;
        };
    };

    const selectAllChecked = () => {
        let object = {};
        for (let i = 0; i < cuadrantesRegistradosArray.length; i++) {
            if (cuadrantesRegistradosArray[i].total.tocaFacturar.valor === 'si') {
                if (cuadrantesRegistradosArray[i].total.codigo) {
                    if (!cuadrantesRegistradosArray[i].total.totalesPeriodicos) {
                        object['checked-' + cuadrantesRegistradosArray[i]['id']] = true;
                    } else {
                        if (!cuadrantesRegistradosArray[i].total.totalesPeriodicos.noExisteCuadrante) {
                            object['checked-' + cuadrantesRegistradosArray[i]['id']] = true;
                        };
                    };
                };
            };
        };
        setChecked(object);
        setMarcarTodosVisible(false);
    };

    const selectNoneChecked = () => {
        let object = {};
        for (let i = 0; i < cuadrantesRegistradosArray.length; i++) {
            object['checked-' + cuadrantesRegistradosArray[i]['id']] = false;
        }
        setChecked(object);
        setMarcarTodosVisible(true);
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
            setNumeroFactusolPendientes(null);
        };
    };

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
    };

    const handleChangeFormNumumeroFactusolPendientes = (e) => {
        if (IsNumeric(e.target.value)) {
            setNumeroFactusolPendientes(e.target.value);
        }
    };

    const handleGenerarLoteArchivos = () => {
        if (numeroFactusolPendientes) {
            let arrayIdsCuadrantes = [];
            let arrayCuadrantesDef = [];
            for (const prop in checked) {
                if (checked[prop]) {
                    let myObjSplit = prop.split("-");
                    arrayIdsCuadrantes.push(parseInt(myObjSplit[1]));
                }
            };
            cuadrantesRegistradosArray.forEach((cuadrante, index) => {
                if (arrayIdsCuadrantes.includes(cuadrante.id)) {
                    arrayCuadrantesDef.push(cuadrante)
                }
            });
            setArrayCuadrantesDefsParaCheck(arrayCuadrantesDef);
            const myMesSplit = calendarioAGestionar.split("-");
            const mes = myMesSplit[1];
            dispatch(generarArchivosXLSLoteAccion(numeroFactusolPendientes, arrayCuadrantesDef, mes));
            dispatch(setTiempoEsperaloteAccion(true));
        } else {
            setAlert({
                mensaje: "Debes introducir el último número de factura emitida en FACTUSOL para generar los archivos.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
    };

    const retornaDisabledCheched = (total) => {
        if (total.tocaFacturar.valor === 'si') {
            if (!total.codigo) {
                return true
            };
            if (!total.totalesPeriodicos) {
                return false
            } else {
                if (!total.totalesPeriodicos.noExisteCuadrante) {
                    return false
                } else {
                    return true
                };
            };
        } else {
            return true
        };
    };

    //retorno componentes

    const retornaCuadranteRegistrado = (cuadrante, index) => {
        return (
            <Box
                key={'listaCuadrantes' + index}
            >
                <ListItem
                    className={cuadrante.total.tocaFacturar.valor === 'no' && cuadrante.total.tocaFacturar.razon !== 'gest' ? classes.casillaBajasInicio :
                        !cuadrante.total.codigo ? classes.casillaBajasInicio : classes.casilla}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <Checkbox
                        edge="start"
                        checked={checked['checked-' + cuadrante.id] || false}
                        name={'checked-' + cuadrante.id}
                        onChange={handleChangeChecked}
                        style={{ marginTop: -3 }}
                        disabled={retornaDisabledCheched(cuadrante.total)}
                    />
                    <ListItemText
                        primary={cuadrante.nombreCentro}
                        secondary={
                            cuadrante.total.tocaFacturar.valor === 'si' ? (
                                cuadrante.total.codigo ? (
                                    <Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                        >
                                            Actualizado el {cuadrante.actualizacion}
                                        </Typography>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                        >
                                            Actualizado el {cuadrante.actualizacion}
                                        </Typography>
                                        <br />
                                        <Typography
                                            component="span"
                                            variant="body2"
                                        >
                                            No se emite factura: Centro sin código Factusol.
                                        </Typography>
                                    </Fragment>
                                )
                            ) : (
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Actualizado el {cuadrante.actualizacion}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        No se emite factura: {
                                            cuadrante.total.tocaFacturar.razon === 'a0' ? 'Cuadrante a 0 €.' :
                                                cuadrante.total.tocaFacturar.razon === 'temp' ? 'No toca por temporización.' :
                                                    'Gestión especial de horas.'
                                        }
                                    </Typography>
                                </Fragment>
                            )
                        }
                        onClick={() => handleCuadrantesRegistrados(parseInt(cuadrante.idCentro))}
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
                ) : (numeroCuadrantesRegistrados < 1 ? (
                    <Box p={3} style={{ width: '100%', minHeight: heightContenedoresGra, maxHeight: heightContenedoresGra }}>
                        <Alert severity="info">No hay cuadrantes registrados por gestionar.</Alert>
                    </Box>
                ) : (
                    <Fragment>
                        <Accordion
                            expanded={expandedAccordion === 'panelPendientes'}
                            className={classes.suplente}
                            style={{ marginTop: (heighCambio.accordion + 20), width: '100%', marginLeft: 25, marginRight: 15, marginBottom: -10 }}
                            onChange={(e, expandedAccordion) => { handleCambioAccordionPendientes(expandedAccordion, 'panelPendientes') }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                            >
                                <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>Procesar lote de cuadrantes registrados para facturar</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container style={{ paddingTop: 5, paddingBottom: 0 }}>
                                    <Grid item xs={5}>
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
                                    <Grid item xs={2}>
                                        <FormControl
                                            variant="outlined"
                                            size="small"
                                            style={{ marginRight: 8 }}
                                        >
                                            <InputLabel
                                                color='secondary'
                                            >
                                                Núm.
                                            </InputLabel>
                                            <Tooltip title="Último nº de factura emitida en FACTUSOL" placement="top-start" arrow>
                                                <OutlinedInput
                                                    disabled={retornaDisabledChecked()}
                                                    fullWidth
                                                    color='secondary'
                                                    id="form-numero-factusol"
                                                    value={numeroFactusolPendientes || ''}
                                                    onChange={handleChangeFormNumumeroFactusolPendientes}
                                                    labelWidth={40}
                                                />
                                            </Tooltip>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button
                                            disabled={retornaDisabledChecked()}
                                            fullWidth
                                            variant="contained"
                                            style={{ marginRight: 8, paddingTop: 7, paddingBottom: 7 }}
                                            startIcon={<DynamicFeedIcon />}
                                            onClick={handleGenerarLoteArchivos}
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
                                {arrayCuadrantesModificadosRegistrados.map((cuadrante, index) => (
                                    retornaCuadranteRegistrado(cuadrante, index)
                                ))}
                            </List>
                        </Box>
                    </Fragment>
                ))}
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(cuadrantesRegistradosArray)} */}
        </div>
    )
}

export default PendientesRegistrados
