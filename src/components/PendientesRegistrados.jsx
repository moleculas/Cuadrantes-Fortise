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

//importaciones acciones
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { activarDesactivarCambioBotonRegistrarAccion } from '../redux/cuadrantesDucks';
import { registrarIntervencionCuadranteNuevoAccion } from '../redux/cuadrantesDucks';
import { venimosDeRegistradosAccion } from '../redux/pendientesDucks';
import { setCentroAccion } from '../redux/cuadrantesDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';

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

const PendientesRegistrados = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const cuadrantesRegistradosArray = useSelector(store => store.variablesPendientes.cuadrantesRegistradosArray);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);

    //states

    const [checked, setChecked] = useState({});
    const [marcarTodosVisible, setMarcarTodosVisible] = useState(true);
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra());
    const [heighCambio, setHeighCambio] = useState({
        scroller: heightContenedoresGra - 90,
        accordion: 0
    });

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
        }
    }, [cuadrantesRegistradosArray]);

    //funciones

    const handleChangeChecked = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const handleCuadrantesRegistrados = (centro) => {
        dispatch(setCentroAccion(centro));
        dispatch(obtenerCentroAccion('centros', centro));
        dispatch(cambioEstadoInicioCuadrantesAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
        dispatch(registrarIntervencionCuadranteNuevoAccion(true));
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
            object['checked' + cuadrantesRegistradosArray[i]['id']] = true;
        }
        setChecked(object);
        setMarcarTodosVisible(false);
    };

    const selectNoneChecked = () => {
        let object = {};
        for (let i = 0; i < cuadrantesRegistradosArray.length; i++) {
            object['checked' + cuadrantesRegistradosArray[i]['id']] = false;
        }
        setChecked(object);
        setMarcarTodosVisible(true);
    };

    const handleCambioAccordionPendientes = (expandedAccordion, panel) => {
        setExpandedAccordion(expandedAccordion ? panel : true);
        expandedAccordion ? setHeighCambio({
            scroller: heighCambio.scroller - 70,
            accordion: heighCambio.accordion + 0
        }) : setHeighCambio({
            scroller: heighCambio.scroller + 70,
            accordion: heighCambio.accordion - 0
        });
    };

    //retorno componentes

    const retornaCuadranteRegistrado = (cuadrante, index) => {
        let nombreSplitted;
        nombreSplitted = cuadrante.nombre.split("-");
        const nombreCentro = dispatch(obtenerObjetoPorIdAccion(listadoCentros, parseInt(nombreSplitted[2])));
        return (
            <Box
                key={'listaCuadrantes' + index}
            >
                <ListItem
                    className={classes.casilla}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <Checkbox
                        edge="start"
                        checked={checked['checked' + cuadrante.id] || false}
                        name={'checked' + cuadrante.id}
                        onChange={handleChangeChecked}
                        style={{ marginTop: -3 }}
                    />
                    <ListItemText
                        primary={nombreCentro} secondary={'Actualizado el ' + cuadrante.actualizacion}
                        onClick={() => handleCuadrantesRegistrados(parseInt(nombreSplitted[2]))}
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
                                                    // value={valuesFormEdicion.precioHora_P || ''}
                                                    // onChange={handleChangeFormEdicion('precioHora_P')}
                                                    labelWidth={70}
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
                                        //onClick={handleClickMenu}
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
                                {cuadrantesRegistradosArray.map((cuadrante, index) => (
                                    retornaCuadranteRegistrado(cuadrante, index)
                                ))}
                            </List>
                        </Box>
                    </Fragment>
                )}
            </Grid>
            {/* {console.log(checked)} */}
        </div>
    )
}

export default PendientesRegistrados
