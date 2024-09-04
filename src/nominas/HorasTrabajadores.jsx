import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import {
    Backdrop,
    CircularProgress,
    Box,
    Grid,
    Button,
    Chip,
    FormControl,
    ListItemIcon,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    InputLabel,
    Badge
} from '@material-ui/core';
import {
    AssignmentInd as AssignmentIndIcon,
    Home as HomeIcon
} from '@material-ui/icons';
import 'date-fns';
import { es } from "date-fns/locale";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

//carga componentes
import PantallaHorasTrabajadores from './PantallaHorasTrabajadores';
import PantallaHoraTrabajador from './PantallaHoraTrabajador';
import CustomSnack from '../comun/CustomSnack';

//estilos
import Clases from "../clases";

//importaciones acciones
import {
    onEstemAccion,
    retornaAnoMesAccion,
    retornaAnoMesCuadranteAccion
} from '../redux/appDucks';
import {
    setCalendarioAGestionarHorasTrabajadoresAccion,
    cambioEstadoIniciorHorasTrabajadoresAccion,
    setHoraTrabajadorAccion,
} from '../redux/horasTrabajadoresDucks';
import {
    obtenerTrabajadorAccion,
    vaciarDatosTrabajadorAccion,
} from '../redux/trabajadoresDucks';
import { forzarRecargaGraficosHorasTrabajadoresAccion } from '../redux/graficosDucks';
import {
    StyledMenu,
    getHeightScrollable
} from '../logica/logicaApp';

const HorasTrabajadores = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const { activo: logged } = useSelector(store => store.variablesUsuario);
    const {
        calendarioAGestionarHorasTrabajadores,
        esInicioHorasTrabajadores,
        errorDeCargaHorasTrabajadores,
        horaTrabajador,
        arrayHorasTrabajadores: listadoHorasTrabajadores,
        loadingHorasTrabajadores: openLoadingHorasTrabajadores,
    } = useSelector(store => store.variablesHorasTrabajadores);
    const {
        arrayTrabajadores: listadoTrabajadores,
        errorDeCargaTrabajadores,
        loadingTrabajadores: openLoadingTrabajadores,
    } = useSelector(store => store.variablesTrabajadores);
    const { estadoIntervencionRegistrada: intervencionRegistrada } = useSelector(store => store.variablesApp);

    //states
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable(220));
    const [openLoading, setOpenLoading] = useState(false);
    const [valueDatePickerHorasTrabajadores, setValueDatePickerHorasTrabajadores] = useState(new Date(retornaAnoMesAccion()));
    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarHorasTrabajadores));
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
        vaciarDatosTrabajadorAccion();
    }, []);

    useEffect(() => {
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable(220));
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        dispatch(onEstemAccion('horasTrabajadores'));
        dispatch(setCalendarioAGestionarHorasTrabajadoresAccion(retornaAnoMesAccion()));
        dispatch(forzarRecargaGraficosHorasTrabajadoresAccion(true));
    }, [dispatch]);

    //secuencia alertas

    useEffect(() => {
        if (errorDeCargaHorasTrabajadores || errorDeCargaTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaHorasTrabajadores, errorDeCargaTrabajadores]);

    useEffect(() => {
        if (!openLoadingHorasTrabajadores || !openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingHorasTrabajadores, openLoadingTrabajadores]);

    //funciones    

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleChangeSelectCalendarioHorasTrabajadores = (newValue) => {
        if (esInicioHorasTrabajadores) {
            dispatch(vaciarDatosTrabajadorAccion());
            setValueDatePickerHorasTrabajadores(newValue);
            dispatch(setCalendarioAGestionarHorasTrabajadoresAccion(retornaAnoMesAccion(newValue)));
            dispatch(cambioEstadoIniciorHorasTrabajadoresAccion(true));
        } else {
            if (intervencionRegistrada) {
                dispatch(vaciarDatosTrabajadorAccion());
                setValueDatePickerHorasTrabajadores(newValue);
                dispatch(setCalendarioAGestionarHorasTrabajadoresAccion(retornaAnoMesAccion(newValue)));
                dispatch(cambioEstadoIniciorHorasTrabajadoresAccion(true));
            }
        };
    };

    const goToInicioHorasTrabajadores = () => {
        setAnchorElMenu(null);
        dispatch(forzarRecargaGraficosHorasTrabajadoresAccion(true));
        dispatch(vaciarDatosTrabajadorAccion());
        dispatch(cambioEstadoIniciorHorasTrabajadoresAccion(true));
    };

    const handleChangeFormHorasTrabajadores = (event) => {
        const horaTrabajador = listadoHorasTrabajadores?.find(t => t.trabajador === event.target.value) || null;
        const sumatorioHoras = horaTrabajador?.datosHoraTrabajador.reduce((acum, obj) => acum + (obj.totalHoras || 0), 0);
        if (!horaTrabajador || sumatorioHoras === 0) {
            setAlert({
                mensaje: `El trabajador seleccionado no tiene registro de horas para el mes de ${monthLet}.`,
                tipo: 'warning'
            })
            setOpenSnack(true);
            return;
        }
        dispatch(vaciarDatosTrabajadorAccion());
        dispatch(obtenerTrabajadorAccion('trabajadores', event.target.value));
        dispatch(cambioEstadoIniciorHorasTrabajadoresAccion(false));
        dispatch(setHoraTrabajadorAccion(horaTrabajador));
    };

    //retorno componentes 

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item xs={12} >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item xs={9}>
                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Chip style={{ padding: 5 }} icon={<AssignmentIndIcon />} label={`Gestión de horas trabajadores`} />
                        </Badge>
                    </Grid>
                    <Grid item xs={3}>
                        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginRight: 20 }}>
                            <FormControl>
                                <Button
                                    fullWidth
                                    disabled={esInicioHorasTrabajadores ? true : false}
                                    variant="contained"
                                    color='primary'
                                    startIcon={<AssignmentIndIcon />}
                                    onClick={handleClickMenu}
                                    style={{ minWidth: "245px" }}
                                >
                                    Control Horario
                                </Button>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorElMenu}
                                    keepMounted
                                    open={Boolean(anchorElMenu)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem
                                        onClick={goToInicioHorasTrabajadores}
                                    >
                                        <ListItemIcon>
                                            <HomeIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Inicio Control Horario" />
                                    </MenuItem>
                                </StyledMenu>
                            </FormControl>
                        </Box>
                    </Grid>
                </Box>
                <Box
                    className={classes.root11}
                    mt={2.4}
                    mb={3}
                >
                    <Grid item lg={4}>
                        <Box pr={2}>
                            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    size="small"
                                    views={['month', 'year']}
                                    inputVariant="outlined"
                                    fullWidth
                                    format="MM/yyyy"
                                    label="Mes a gestionar"
                                    minDate={new Date('2024-7')}
                                    maxDate={new Date(retornaAnoMesAccion())}
                                    value={valueDatePickerHorasTrabajadores}
                                    onChange={(newValue) => {
                                        handleChangeSelectCalendarioHorasTrabajadores(newValue);
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                    </Grid>
                    <Grid item lg={4}>
                        <Box pr={2}>
                            <FormControl
                                variant="outlined"
                                fullWidth
                                size="small"
                            >
                                <InputLabel>Trabajador</InputLabel>
                                <Select
                                    id="form-trabajadores-nominas"
                                    value={horaTrabajador?.trabajador || ''}
                                    onChange={(event) => handleChangeFormHorasTrabajadores(event)}
                                    input={
                                        <OutlinedInput
                                            labelWidth={80}
                                        />
                                    }
                                >
                                    {listadoTrabajadores.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item lg={4}>

                    </Grid>
                </Box>
                {esInicioHorasTrabajadores ? <PantallaHorasTrabajadores /> : <PantallaHoraTrabajador heightScrollable={heightScrollable} />}
            </Grid>
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
            {/* {console.log('nominas: ',nominaNuevaRegistrada)} */}
        </div>
    )
}

export default withRouter(HorasTrabajadores)
