import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    CircularProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    Chip,
    Button
} from '@material-ui/core';
import {
    ExitToApp as ExitToAppIcon,
    DynamicFeed as DynamicFeedIcon,
    ExpandMore as ExpandMoreIcon,
    CheckBoxOutlined as CheckBoxOutlinedIcon,
    CheckBoxOutlineBlankOutlined as CheckBoxOutlineBlankOutlinedIcon,
} from '@material-ui/icons';

//importaciones acciones
import {
    setHoraTrabajadorAccion,
    cambioEstadoIniciorHorasTrabajadoresAccion,
    gestionArrayHorasTrabajadoresAccion
} from '../redux/horasTrabajadoresDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import {
    Alert,
    getHeightContenedoresGra,
    AccordionCua as Accordion,
    AccordionDetailsCua as AccordionDetails,
    AccordionSummary3Cua as AccordionSummary,
    OrangeCheckbox
} from '../logica/logicaApp';

//estilos
import Clases from "../clases";

const ListadoHorasTrabajadores = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const {
        arrayHorasTrabajadores: listadoHorasTrabajadores,
    } = useSelector(store => store.variablesHorasTrabajadores);

    //states
    const [checked, setChecked] = useState({});
    const [marcarTodosVisible, setMarcarTodosVisible] = useState(true);
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const [heightContenedoresGra, setHeightContenedoresGra] = useState(getHeightContenedoresGra(280));
    const [heighCambio, setHeighCambio] = useState({
        scroller: heightContenedoresGra - 90,
        accordion: 0
    });
    const [sumatorioHoras, setSumatorioHoras] = useState(0);
    const [arrayHorasTrabajadoresModificadosRegistrados, setArrayHorasTrabajadoresModificadosRegistrados] = useState([]);

    //useEffect

    useEffect(() => {
        if (listadoHorasTrabajadores?.length > 0 && listadoTrabajadores?.length > 0) {
            selectNoneChecked();
            setArrayHorasTrabajadoresModificadosRegistrados(dispatch(gestionArrayHorasTrabajadoresAccion()));
        }
    }, [listadoHorasTrabajadores, listadoTrabajadores]);

    //funciones

    const retornaCantidadChecked = () => Object.values(checked).filter(Boolean).length;

    const retornaDisabledChecked = () => !Object.values(checked).includes(true);

    const handleChangeChecked = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const selectNoneChecked = () => {
        const object = arrayHorasTrabajadoresModificadosRegistrados.reduce((acc, horaTrabajador) => {
            acc[`checked-${horaTrabajador.id}`] = false;
            return acc;
        }, {});
        setChecked(object);
        setMarcarTodosVisible(true);
        setSumatorioHoras(0);
    };

    const selectAllChecked = () => {
        const object = arrayHorasTrabajadoresModificadosRegistrados.reduce((acc, horaTrabajador) => {
            acc[`checked-${horaTrabajador.id}`] = true;
            return acc;
        }, {});
        setChecked(object);
        setMarcarTodosVisible(false);
        setSumatorioHoras(0);
    };

    const handleCambioAccordionHorasTrabajadores = (expandedAccordion, panel) => {
        setExpandedAccordion(expandedAccordion ? panel : true);
        if (expandedAccordion) {
            setHeighCambio({
                scroller: heighCambio.scroller - 126,
                accordion: heighCambio.accordion + 0
            });
        } else {
            setHeighCambio({
                scroller: heighCambio.scroller + 126,
                accordion: heighCambio.accordion - 0
            });
        };
    };

    const handleCalcularLoteHoras = () => {
        const arrayIdsCuadrantes = Object.keys(checked)
            .filter(key => checked[key])
            .map(key => parseInt(key.split("-")[1]));
        const total = arrayHorasTrabajadoresModificadosRegistrados
            .filter(horaTrabajador => arrayIdsCuadrantes.includes(horaTrabajador.id))
            .reduce((acc, item) => acc + item.totalHoras, 0);
        setSumatorioHoras(total.toFixed(2));
    };

    const handleCargarTrabajador = (horaTrabajador, trabajadorId) => {
        dispatch(setHoraTrabajadorAccion(horaTrabajador));
        dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorId));
        dispatch(cambioEstadoIniciorHorasTrabajadoresAccion(false));
    };

    //retorno componentes

    const retornaHoraTrabajadorRegistrada = (horaTrabajador, index) => {
        if (horaTrabajador.totalHoras === 0) {
            return;
        };
        return (
            <Box
                key={'listaCuadrantes' + index}
            >
                <ListItem
                    className={classes.casillaBajasHorasTrabajadores}
                    style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                    <OrangeCheckbox
                        edge="start"
                        checked={checked['checked-' + horaTrabajador.id] || false}
                        name={'checked-' + horaTrabajador.id}
                        onChange={handleChangeChecked}
                        style={{ marginTop: -3 }}
                        disabled={horaTrabajador.totalHoras === 0}
                    />
                    <ListItemText
                        primary={`${horaTrabajador.trabajadorNombre} - Total horas: ${Number.isInteger(horaTrabajador.totalHoras) ? horaTrabajador.totalHoras : horaTrabajador.totalHoras.toFixed(2)} h.`}
                        secondary={
                            <Typography
                                component="span"
                                variant="body2"
                            >
                                Actualizado el {horaTrabajador.actualizacion}
                            </Typography>
                        }
                        onClick={() => handleCargarTrabajador(horaTrabajador, horaTrabajador.trabajador)}
                    />
                    <ListItemSecondaryAction>
                        <ExitToAppIcon
                            className={classes.taronjaHT}
                        />
                    </ListItemSecondaryAction>
                </ListItem >
            </Box >
        )
    };

    return (
        <div>
            {/* {console.log(listadoHorasTrabajadores)} */}
            <Grid
                spacing={1}
                container
                direction="column"
                justify="center"
                alignItems="center"
                p={2}
                className={classes.rootPendientes}
                style={{ width: props.prWidthContenedores, minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores + 10 }}
            >
                {props.prOpenLoading ? (
                    <Box
                        className={classes.centrado}
                    >
                        <CircularProgress />
                    </Box>
                ) : (listadoHorasTrabajadores < 1 ? (
                    <Box p={3} style={{ width: '100%', minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores }}>
                        <Alert severity="info">No hay registros horarios de trabajadores.</Alert>
                    </Box>
                ) : (
                    <Fragment>
                        <Accordion
                            expanded={expandedAccordion === 'panelPendientes'}
                            className={classes.suplente}
                            style={{ marginTop: (heighCambio.accordion + 20), width: '100%', marginLeft: 25, marginRight: 15, marginBottom: -10 }}
                            onChange={(e, expandedAccordion) => { handleCambioAccordionHorasTrabajadores(expandedAccordion, 'panelPendientes') }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                            >
                                <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>Calculador horas trabajadores</Typography>
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
                                            onClick={handleCalcularLoteHoras}
                                        >
                                            Calcular lote {retornaCantidadChecked()}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box mt={2} className={classes.boxTotalHT}>
                                            <Typography variant='body2' className={classes.colorTextNegre}>{`Total sumatorio horas trabajadores: ${sumatorioHoras} h.`}</Typography>
                                        </Box>
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
                                {arrayHorasTrabajadoresModificadosRegistrados.map((horaTrabjador, index) => (
                                    retornaHoraTrabajadorRegistrada(horaTrabjador, index)
                                ))}
                            </List>
                        </Box>
                    </Fragment>
                ))}
            </Grid>
        </div>
    )
}

export default ListadoHorasTrabajadores
