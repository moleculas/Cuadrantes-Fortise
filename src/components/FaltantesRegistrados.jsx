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
import { cambioEstadoInicioNominasAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonRegistrarNominaAccion } from '../redux/nominasDucks';
import { registrarIntervencionNominaNuevaAccion } from '../redux/nominasDucks';
import { venimosDeRegistradosFaltantesAccion } from '../redux/faltantesDucks';
import { setTrabajadorAccion } from '../redux/nominasDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
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

const FaltantesRegistrados = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const nominasRegistradasArray = useSelector(store => store.variablesFaltantes.nominasRegistradasArray);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);

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
        if (nominasRegistradasArray.length > 0) {
            selectNoneChecked();
        }
    }, [nominasRegistradasArray]);

    //funciones

    const handleChangeChecked = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const handleNominasRegistradas = (trabajador) => {
        dispatch(setTrabajadorAccion(trabajador));
        dispatch(obtenerTrabajadorAccion('trabajadores', trabajador));
        dispatch(cambioEstadoInicioNominasAccion(false));
        dispatch(activarDesactivarCambioBotonRegistrarNominaAccion(false));
        dispatch(registrarIntervencionNominaNuevaAccion(false));
        dispatch(venimosDeRegistradosFaltantesAccion(true));
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
        for (let i = 0; i < nominasRegistradasArray.length; i++) {
            object['checked' + nominasRegistradasArray[i]['id']] = true;
        }
        setChecked(object);
        setMarcarTodosVisible(false);
    };

    const selectNoneChecked = () => {
        let object = {};
        for (let i = 0; i < nominasRegistradasArray.length; i++) {
            object['checked' + nominasRegistradasArray[i]['id']] = false;
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

    const retornaNominaRegistrada = (nomina, index) => {
        let nombreSplitted;
        nombreSplitted = nomina.nombre.split("-");
        const nombreTrabajador = dispatch(obtenerObjetoPorIdAccion(listadoTrabajadores, parseInt(nombreSplitted[2])));
        return (
            <Box
                key={'listaNominas' + index}
            >
                <ListItem
                    className={classes.casilla}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <Checkbox
                        edge="start"
                        checked={checked['checked' + nomina.id] || false}
                        name={'checked' + nomina.id}
                        onChange={handleChangeChecked}
                        style={{ marginTop: -3 }}
                    />
                    <ListItemText
                        primary={nombreTrabajador} secondary={'Actualizada el ' + nomina.actualizacion}
                        onClick={() => handleNominasRegistradas(parseInt(nombreSplitted[2]))}
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
            >{props.prOpenLoading ? (
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
                                    <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>Procesar lote de nóminas registradas para emitir</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container style={{ paddingTop: 5, paddingBottom: 0 }}>
                                        <Grid item xs={5}>
                                            {marcarTodosVisible ? (
                                                <Chip
                                                    variant='outlined'
                                                    style={{ padding: 5, marginTop: 5 }}
                                                    icon={<CheckBoxOutlinedIcon />}
                                                    label="Seleccionar todas"
                                                    clickable
                                                    onClick={() => selectAllChecked()}

                                                />
                                            ) : (
                                                <Chip
                                                    variant='outlined'
                                                    style={{ padding: 5, marginTop: 5 }}
                                                    icon={<CheckBoxOutlineBlankOutlinedIcon />}
                                                    label="Desmarcar todas"
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
                                    {nominasRegistradasArray.map((nomina, index) => (
                                        retornaNominaRegistrada(nomina, index)
                                    ))}
                                </List>
                            </Box>
                        </Fragment>
                    )}
            </Grid>
            {/* {console.log(nominasRegistradasArray)} */}
        </div>
    )
}

export default FaltantesRegistrados
