import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../../constantes";
import {
    Grid,
    Box,
    Typography,
    Button,
    InputLabel,
    OutlinedInput,
    FormControl,
    MenuItem,
    Select,
    Tooltip,
    Avatar,
    IconButton,
    ButtonGroup,
} from '@material-ui/core';
import {
    ExpandMore as ExpandMoreIcon,
    PersonAdd as PersonAddIcon,
    Delete as DeleteIcon,
    Cached as CachedIcon,
    RemoveCircleOutline as RemoveCircleOutlineIcon,
    KeyboardTab as KeyboardTabIcon
} from '@material-ui/icons';
import clsx from 'clsx';

//importaciones acciones
import {
    handleCambioAccordionHeaderAccion,
    handleClickAddColumnaAccion,
    eliminarColumnaAccion,
    handleChangeFormTrabajadoresAccion,
    handleActualizarTrabajadoresAccion,
    handleChangeTipoHorarioAccion,
    handleLimpiezaHorarioAccion,
    handleGestionarTamanoColumnaAccion
} from '../../redux/cuadrantesHandlersDucks';
import { setValorPrevioAccordionAbiertoAccion } from '../../redux/cuadrantesSettersDucks';
import {
    alturaCasilla,
    AccordionCua as Accordion,
    AccordionDetailsCua as AccordionDetails,
    AccordionSummary1Cua as AccordionSummary1,
    AccordionSummary2Cua as AccordionSummary2,
    retornaAnchoColumna
} from '../../logica/logicaApp';
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';

//carga componentes
import CasillaDias from './CasillaDias';
import CasillaGeneral from './CasillaGeneral';
import CasillaServiciosFijos from './CasillaServiciosFijos';
import DraggableItem from './DraggableItem';

//estilos
import Clases from "../../clases";

//constantes
const tipos = Constantes.MODO_ENTRADA_HORARIOS;

const CuadranteDer = (props) => {
    const {
        ampleColumna,
        ampleColumnaServiciosFijos,
        esDesktop,
        scrollable,
        heightScrollable,
        classesDisp,
        boxes
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const { cuadranteServiciosFijos } = useSelector(store => store.variablesCuadrantesServiciosFijos);
    const {
        losDiasDelMes,
        cuadrante
    } = useSelector(store => store.variablesCuadrantes);
    const { arrayTrabajadores: listadoTrabajadores } = useSelector(store => store.variablesTrabajadores);
    const {
        cuadranteEnUsoCuadrantes,
        expandedAccordion,
        visibleCuadrante,
        visibleCuadranteServiciosFijos
    } = useSelector(store => store.variablesCuadrantesSetters);

    //funciones    

    const {
        gestionaClassesColoresTrabajadoresAccion,
        retornaHeaderServiciosFijosAccion,
    } = logicaLayoutCuadrantes();

    const retornaTamanoIcono = () => {
        return ampleColumna > 185 ? 24 : (24 * (((ampleColumna * 100) / 350) / 100) + 0.2);
    };

    const retornaNombreTrabajador = (nombre) => {
        const longitudTrunc = ampleColumna < 200 ? 11 : parseInt((ampleColumna * 33) / 350);
        return nombre.length > longitudTrunc ? nombre.substring(0, longitudTrunc) + "…" : nombre;
    };

    return (
        <Grid
            className={clsx(classes.scrollable, classes.scrollableScroll)}
            ref={scrollable}
            style={{ height: heightScrollable }}
        >
            {/* {console.log(cuadranteServiciosFijos)} */}
            <Box
                p={0}
                mt={0}
            >
                <Grid
                    container
                    direction="row"
                    justifycontent="flex-start"
                    alignItems="flex-start"
                    style={{ position: 'fixed', zIndex: 3, marginTop: -45 }}
                >
                    <Box
                        p={1.5}
                        mx={0.3}
                        className={clsx(classes.cabecera, classes.inicio)}
                        color="secondary.contrastText"
                        style={{ minHeight: alturaCasilla(esDesktop), maxHeight: alturaCasilla(esDesktop), padding: 9, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography variant="body2">Cuadrante</Typography>
                        <Avatar
                            className={clsx(classes.small4, classes.suplente)}
                        >
                            <Typography variant='body2' color="initial">{cuadranteEnUsoCuadrantes}</Typography>
                        </Avatar>
                    </Box>
                    {visibleCuadranteServiciosFijos ? (
                        cuadranteServiciosFijos.length > 0 ? (
                            cuadranteServiciosFijos.map((servicio, index) => (
                                retornaHeaderServiciosFijosAccion(servicio, index, ampleColumnaServiciosFijos, alturaCasilla(esDesktop))
                            ))
                        ) : null
                    ) : null}
                    {visibleCuadrante ? (
                        cuadrante.length > 0 ? (
                            <Fragment>
                                {cuadrante.map((columnaCabecera, index) => (
                                    <Box
                                        key={`box_header_` + (index + 1)}
                                        mx={0.3}
                                    >
                                        <Accordion
                                            expanded={expandedAccordion === 'panel_' + (index + 1)}
                                            className={gestionaClassesColoresTrabajadoresAccion(columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador)}
                                            style={{ width: retornaAnchoColumna(columnaCabecera.reducido, ampleColumna), minHeight: alturaCasilla(esDesktop), maxHeight: alturaCasilla(esDesktop) }}
                                            onChange={(e, expandedAccordion) => { dispatch(handleCambioAccordionHeaderAccion(expandedAccordion, 'panel_' + (index + 1), index, scrollable, classesDisp)) }}
                                        >
                                            {columnaCabecera.reducido ? (
                                                <Tooltip title={!columnaCabecera.reducido ? '' : columnaCabecera.nombreTrabajador !== 'Suplente' ? columnaCabecera.nombreTrabajador : ''} placement="top" arrow>
                                                    <Box style={{ width: 40, minHeight: alturaCasilla(esDesktop), maxHeight: alturaCasilla(esDesktop), cursor: 'pointer' }}
                                                        onClick={() => dispatch(handleGestionarTamanoColumnaAccion(index, 'ampliar', null, null))}
                                                    >
                                                        <IconButton
                                                            className={classes.btnAmpliarcolumna}
                                                        >
                                                            <KeyboardTabIcon style={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Box>
                                                </Tooltip>
                                            ) : (
                                                esDesktop ? (
                                                    <AccordionSummary1
                                                        expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                                                    >
                                                        <Typography
                                                            variant='body2'
                                                            className={classes.truncate}
                                                            style={{ color: 'secondary.contrastText' }}
                                                        >
                                                            {columnaCabecera.reducido ? '' : columnaCabecera.nombreTrabajador !== 'Suplente' ? retornaNombreTrabajador(columnaCabecera.nombreTrabajador) : ''}
                                                        </Typography>
                                                    </AccordionSummary1>
                                                ) : (
                                                    <AccordionSummary2
                                                        expandIcon={<ExpandMoreIcon className={classes.blanc} />}
                                                    >
                                                        <Typography
                                                            variant='body2'
                                                            className={classes.truncate}
                                                            style={{ color: 'secondary.contrastText' }}
                                                        >
                                                            {columnaCabecera.reducido ? '' : columnaCabecera.nombreTrabajador !== 'Suplente' ? retornaNombreTrabajador(columnaCabecera.nombreTrabajador) : ''}
                                                        </Typography>
                                                    </AccordionSummary2>
                                                ))}
                                            <AccordionDetails
                                                style={{ marginTop: 1 }}>
                                                <Grid container
                                                    className={classes.mt5}
                                                >
                                                    {!columnaCabecera.reducido ? (
                                                        <Grid
                                                            container
                                                            direction="column"
                                                            justifycontent="flex-start"
                                                            alignItems="flex-start"
                                                        >
                                                            <Box
                                                                style={{ width: '100%', display: 'flex', marginTop: 10, marginBottom: 10 }}
                                                            >
                                                                <ButtonGroup size="small"
                                                                    fullWidth
                                                                    className='botoneraTrab'
                                                                >
                                                                    <Tooltip title={columnaCabecera.nombreTrabajador ? "Reducir columna" : ""} placement="top" arrow>
                                                                        <Button
                                                                            onClick={() => dispatch(handleGestionarTamanoColumnaAccion(index, 'reducir', scrollable, classes))}
                                                                            disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                        >
                                                                            <KeyboardTabIcon className={classes.colorText}
                                                                                style={{ transform: 'rotate(180deg)', fontSize: retornaTamanoIcono() }} />
                                                                        </Button>
                                                                    </Tooltip>
                                                                    <Tooltip title={columnaCabecera.nombreTrabajador ? "Añadir suplente" : ""} placement="top" arrow>
                                                                        <Button
                                                                            onClick={() => dispatch(handleClickAddColumnaAccion('suplente', index, scrollable, classesDisp))}
                                                                            disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                        >
                                                                            <PersonAddIcon className={classes.colorText}
                                                                                style={{ fontSize: retornaTamanoIcono() }} />
                                                                        </Button>
                                                                    </Tooltip>
                                                                    <Tooltip title={columnaCabecera.nombreTrabajador ? "Limpiar horario columna" : ""} placement="top" arrow>
                                                                        <Button
                                                                            onClick={() => dispatch(handleLimpiezaHorarioAccion(index))}
                                                                            disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                        >
                                                                            <RemoveCircleOutlineIcon className={classes.colorText}
                                                                                style={{ fontSize: retornaTamanoIcono() }} />
                                                                        </Button>
                                                                    </Tooltip>
                                                                    <Tooltip title={columnaCabecera.nombreTrabajador ? "Actualizar trabajador" : ""} placement="top" arrow>
                                                                        <Button
                                                                            onClick={() => dispatch(handleActualizarTrabajadoresAccion(index, columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador))}
                                                                            disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                        >
                                                                            <CachedIcon className={classes.colorText}
                                                                                style={{ fontSize: retornaTamanoIcono() }} />
                                                                        </Button>
                                                                    </Tooltip>
                                                                    <Tooltip title="Eliminar trabajador" placement="top" arrow>
                                                                        <Button
                                                                            onClick={() => dispatch(eliminarColumnaAccion(index, columnaCabecera.idTrabajador, scrollable, classesDisp))}
                                                                        >
                                                                            <DeleteIcon
                                                                                style={{ color: '#f44336', fontSize: retornaTamanoIcono() }} />
                                                                        </Button>
                                                                    </Tooltip>
                                                                </ButtonGroup>
                                                            </Box>
                                                            <FormControl
                                                                variant="outlined"
                                                                fullWidth
                                                                className={classes.mt15}
                                                                size="small"
                                                            >
                                                                <InputLabel>{esDesktop ? ((columnaCabecera.tipoTrabajador === 'trabajador' || !columnaCabecera.tipoTrabajador) ? 'Trabajador' : 'Suplente') : ((columnaCabecera.tipoTrabajador === 'trabajador' || !columnaCabecera.tipoTrabajador) ? 'Trab' : 'Supl')}</InputLabel>
                                                                <Select
                                                                    id={`form-trabajador-` + (index + 1)}
                                                                    value={columnaCabecera.idTrabajador < 999 ? columnaCabecera.idTrabajador : ''}
                                                                    onChange={(event) => dispatch(handleChangeFormTrabajadoresAccion(index, columnaCabecera.tipoTrabajador, event))}
                                                                    onOpen={() => dispatch(setValorPrevioAccordionAbiertoAccion(columnaCabecera.idTrabajador))}
                                                                    input={
                                                                        <OutlinedInput
                                                                            labelWidth={esDesktop ? 80 : 35}
                                                                        />
                                                                    }
                                                                >
                                                                    {listadoTrabajadores
                                                                        .filter(option => option.estado === "alta") //modificador: filtrar treballadors baixa
                                                                        .map(option => (
                                                                            <MenuItem key={option.id} value={option.id}>
                                                                                {option.nombre}
                                                                            </MenuItem>
                                                                        ))}
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl
                                                                variant="outlined"
                                                                fullWidth
                                                                className={classes.mt15}
                                                                size="small"
                                                            >
                                                                <InputLabel>{esDesktop ? 'Modo entrada datos' : 'Datos'}</InputLabel>
                                                                <Select
                                                                    id="form-tipo-cuadrantes"
                                                                    label={esDesktop ? 'Modo entrada datos' : 'Datos'}
                                                                    value={columnaCabecera.tipoHorario || ''}
                                                                    onChange={(event) => dispatch(handleChangeTipoHorarioAccion(index, event))}
                                                                    helpertext="Selecciona Modo entrada datos"
                                                                    disabled={columnaCabecera.nombreTrabajador ? false : true}
                                                                >
                                                                    {tipos.map((option) => (
                                                                        <MenuItem key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    ) : null}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                ))}
                                <Box
                                    m={0.3}
                                >
                                    <Tooltip title="Añadir trabajador" placement="right" arrow>
                                        <IconButton
                                            className={clsx(classes.btnAddTrabajador, classes.blanc)}
                                            onClick={() => dispatch(handleClickAddColumnaAccion('trabajador', null, scrollable, classesDisp))}
                                        >
                                            <PersonAddIcon style={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Fragment>
                        ) : null
                    ) : null}
                </Grid>
                <Grid container
                    style={{ marginTop: 45 }}
                >
                    <Box
                        style={!esDesktop ? { marginTop: 10 } : null}
                    >
                        {losDiasDelMes.map((dia, index) => (
                            <CasillaDias
                                key={"casillaDias-" + index}
                                dia={dia}
                                index={index}
                                esDesktop={esDesktop}
                                scrollable={scrollable}
                                classesDisp={classesDisp}
                            />
                        ))}
                    </Box>
                    {visibleCuadranteServiciosFijos ? (
                        cuadranteServiciosFijos.length > 0 ? (
                            cuadranteServiciosFijos.map((servicio, indexColSF) => {
                                const trabajador = Object.keys(servicio)
                                    .find(key => key.startsWith('trab_')) ? servicio[Object.keys(servicio).find(key => key.startsWith('trab_'))] : null;
                                return (
                                    <Box
                                        key={'box' + indexColSF}
                                        style={!esDesktop ? { marginTop: 10 } : null}
                                    >
                                        {losDiasDelMes.map((dia, indexDia) => (
                                            <CasillaServiciosFijos
                                                key={"casillaServiciosFijos-" + indexDia}
                                                dia={dia}
                                                indexDia={indexDia}
                                                servicio={servicio}
                                                indice={indexColSF}
                                                esDesktop={esDesktop}
                                                ampleColumnaServiciosFijos={ampleColumnaServiciosFijos}
                                                trabajador={trabajador}
                                            />
                                        ))}
                                    </Box>
                                );
                            })
                        ) : null
                    ) : null}
                    {visibleCuadrante ? (
                        cuadrante.length > 0 ? (
                            cuadrante.map((columna, indexColumna) => (
                                <Box
                                    key={'Box_' + indexColumna}
                                    style={!esDesktop ? { marginTop: 10 } : null}
                                >
                                    {losDiasDelMes.map((dia, indexDia) => (
                                        <CasillaGeneral
                                            key={"casillaGeneral-" + indexDia}
                                            dia={dia}
                                            indexDia={indexDia}
                                            columna={columna}
                                            indexColumna={indexColumna}
                                            esDesktop={esDesktop}
                                            scrollable={scrollable}
                                            boxes={boxes}
                                            ampleColumna={ampleColumna}
                                        />
                                    ))}
                                </Box>
                            ))
                        ) : null
                    ) : null}
                </Grid>
            </Box >
            <DraggableItem />
        </Grid>
    )
};

export default CuadranteDer;