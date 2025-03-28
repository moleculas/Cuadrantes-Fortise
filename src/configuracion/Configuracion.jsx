import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Grid,
    Button,
    Typography,
    Chip,
    FormControl,
    Tooltip,
    MenuItem,
    ListItemIcon,
    List,
    ListItem,
    ListItemText,
    Backdrop,
    CircularProgress,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    TextField,
    Collapse
} from '@material-ui/core';
import {
    Settings as SettingsIcon,
    Save as SaveIcon,
    ExpandLess,
    ExpandMore
} from '@material-ui/icons';
import clsx from 'clsx';
import { stringify, parse } from 'zipson';
import SimpleReactLightbox from 'simple-react-lightbox';
import { HashLink } from 'react-router-hash-link';

//carga componentes
import DialogComponente from '../comun/DialogComponente';
import InstruccionesCuadrantes from './InstruccionesCuadrantes';
import InstruccionesCentros from './InstruccionesCentros';
import InstruccionesTrabajadores from './InstruccionesTrabajadores';
import InstruccionesVarios from './InstruccionesVarios';
import InstruccionesControlHorario from './InstruccionesControlHorario';
import InstruccionesServiciosFijos from './InstruccionesServiciosFijos';
import CustomSnack from '../comun/CustomSnack';

//estilos
import Clases from "../clases";

//importaciones acciones
import {
    registrarIntervencionAccion,
    activarDesactivarAccion,
    onEstemAccion,
    abreObjetoDialogAccion,
    cierraObjetoDialogAccion,
    obtenerConfiguracionAccion,
    actualizarConfiguracionAccion
} from '../redux/appDucks';
import { setAnchorElMenuAccion } from '../redux/cuadrantesSettersDucks';
import {
    StyledMenu,
    TabPanelInicio as TabPanel,
    a11yProps,
    getHeightScrollable,
    getWidthWindow
} from '../logica/logicaApp';

const Configuracion = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const disabledItem = useSelector(store => store.variablesApp.estadoActivadoDesactivado);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const openDialog1 = useSelector(store => store.variablesApp.openDialog[0]);
    const openLoadingConfiguracion = useSelector(store => store.variablesApp.loadingApp);
    const objetoConfiguracion = useSelector(store => store.variablesApp.objetoConfiguracion);
    const errorDeCargaConfiguracion = useSelector(store => store.variablesApp.errorDeCargaConfiguracion);
    const exitoActualizacionConfiguracion = useSelector(store => store.variablesApp.exitoActualizacionConfiguracion);
    const usuarioActivo = useSelector(store => store.variablesUsuario.usuarioActivo);

    //states

    const [valueTab, setValueTab] = useState(0);
    const [preValueTab, setPreValueTab] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable(200));
    const [widthWindow, setWidthWindow] = useState(getWidthWindow(230));
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesFormConfiguracion, setValuesFormConfiguracion] = useState({
        precioHoraNormal: null,
        precioHoraExtra: null,
        mensajeMailCentros: '',
        cuenta1: {
            iban: '',
            bic: '',
            nombreBanco: '',
            entidad: '',
            oficina: '',
            digitosControl: '',
            numeroCuenta: ''
        }
    });
    const [valuesHerramientasParseador, setValuesHerramientasParseador] = useState({
        parsePorParsear: {},
        parseParseado: {},
        stringPorParsear: {},
        stringParseado: {},
    });
    const [openLoading, setOpenLoading] = useState(false);
    const [openMenu1, setOpenMenu1] = useState(false);
    const [openMenu2, setOpenMenu2] = useState(false);
    const [openMenu3, setOpenMenu3] = useState(false);
    const [openMenu4, setOpenMenu4] = useState(false);
    const [openMenu5, setOpenMenu5] = useState(false);
    const [openMenu6, setOpenMenu6] = useState(false);

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
    }, []);

    useEffect(() => {
        dispatch(onEstemAccion('configuracion'));
        dispatch(obtenerConfiguracionAccion('configuracion', 1));
    }, [dispatch]);

    useEffect(() => {
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable(200));
            setWidthWindow(getWidthWindow(230));
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (errorDeCargaConfiguracion) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaConfiguracion]);

    useEffect(() => {
        if (exitoActualizacionConfiguracion) {
            setAlert({
                mensaje: "Configuración actualizada correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoActualizacionConfiguracion]);

    useEffect(() => {
        if (!openLoadingConfiguracion) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingConfiguracion]);

    useEffect(() => {
        if (objetoConfiguracion[Object.keys(objetoConfiguracion)[0]] !== '') {
            setValuesFormConfiguracion({
                precioHoraNormal: objetoConfiguracion.precioHoraNormal,
                precioHoraExtra: objetoConfiguracion.precioHoraExtra,
                mensajeMailCentros: objetoConfiguracion.mensajeMailCentros,
                cuenta1: {
                    iban: objetoConfiguracion.cuenta1.iban,
                    bic: objetoConfiguracion.cuenta1.bic,
                    nombreBanco: objetoConfiguracion.cuenta1.nombreBanco,
                    entidad: objetoConfiguracion.cuenta1.entidad,
                    oficina: objetoConfiguracion.cuenta1.oficina,
                    digitosControl: objetoConfiguracion.cuenta1.digitosControl,
                    numeroCuenta: objetoConfiguracion.cuenta1.numeroCuenta
                },
            })
        }
    }, [objetoConfiguracion]);

    //funciones    

    const handleClickMenuInstrucciones1 = () => {
        setOpenMenu1(!openMenu1);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        setOpenMenu5(false);
        setOpenMenu6(false);
    };

    const handleClickMenuInstrucciones2 = () => {
        setOpenMenu2(!openMenu2);
        setOpenMenu1(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        setOpenMenu5(false);
        setOpenMenu6(false);
    };

    const handleClickMenuInstrucciones3 = () => {
        setOpenMenu3(!openMenu3);
        setOpenMenu2(false);
        setOpenMenu1(false);
        setOpenMenu4(false);
        setOpenMenu5(false);
        setOpenMenu6(false);
    };

    const handleClickMenuInstrucciones4 = () => {
        setOpenMenu4(!openMenu4);
        setOpenMenu2(false);
        setOpenMenu1(false);
        setOpenMenu3(false);
        setOpenMenu5(false);
        setOpenMenu6(false);
    };

    const handleClickMenuInstrucciones5 = () => {
        setOpenMenu5(!openMenu5);
        setOpenMenu2(false);
        setOpenMenu1(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        setOpenMenu6(false);
    };

    const handleClickMenuInstrucciones6 = () => {
        setOpenMenu6(!openMenu6);
        setOpenMenu2(false);
        setOpenMenu1(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        setOpenMenu5(false);
    };

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleChangeTab = (event, newValue) => {
        if (!intervencionRegistrada) {
            setPreValueTab(newValue)
            handleClickOpenDialog();
        } else {
            dispatch(activarDesactivarAccion(true));
            setValueTab(newValue)
        }
    };

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
    };

    const handleChangeFormConfiguracion = (prop) => (e) => {
        if (prop === "precioHoraNormal" || prop === "precioHoraExtra") {
            if (IsNumeric(e.target.value)) {
                setValuesFormConfiguracion({ ...valuesFormConfiguracion, [prop]: e.target.value });
            }
        }
        if (prop === "mensajeMailCentros") {
            setValuesFormConfiguracion({ ...valuesFormConfiguracion, [prop]: e.target.value });
        }
        if (prop === "bic" || prop === "nombreBanco") {
            let objetoCuenta = { ...valuesFormConfiguracion.cuenta1, [prop]: e.target.value };
            setValuesFormConfiguracion({ ...valuesFormConfiguracion, cuenta1: objetoCuenta });
        };
        if (prop === "iban") {
            const elIban = e.target.value;
            const decEntidad = elIban.substr(4, 4);
            const decOficina = elIban.substr(8, 4);
            const decDigitosControl = elIban.substr(12, 2);
            const decNumeroCuenta = elIban.substr(14, 10);
            let objetoCuenta = {
                ...valuesFormConfiguracion.cuenta1,
                [prop]: e.target.value,
                entidad: decEntidad,
                oficina: decOficina,
                digitosControl: decDigitosControl,
                numeroCuenta: decNumeroCuenta
            };
            setValuesFormConfiguracion({ ...valuesFormConfiguracion, cuenta1: objetoCuenta });
        };
        dispatch(activarDesactivarAccion(false));
        dispatch(registrarIntervencionAccion(false));
    };

    const handleChangeHerramientasParseador = (prop) => (e) => {
        setValuesHerramientasParseador({ ...valuesHerramientasParseador, [prop]: e.target.value });
    };

    const procesarParseado = (prop) => {
        const options = { fullPrecisionFloats: true };
        let respuesta;
        if (prop === 'parseParseado') {
            let myobj1 = JSON.parse(valuesHerramientasParseador.parsePorParsear);
            respuesta = stringify(myobj1, options);
        } else {
            let myobj2 = valuesHerramientasParseador.stringPorParsear;
            respuesta = JSON.stringify(parse(myobj2));
        };
        setValuesHerramientasParseador({ ...valuesHerramientasParseador, [prop]: respuesta });
    };

    //dialog

    const tituloDialog = "¿Estás seguro que quieres cambiar de pantalla?";
    const descripcionDialog = "Estás tratando de cambiar de pantalla pero no has registrado los datos de tu última intervención. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'No' y registra los datos.";

    const handleClickOpenDialog = () => {
        dispatch(abreObjetoDialogAccion('1'));
    };

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            setValueTab(preValueTab);
            dispatch(registrarIntervencionAccion(true));
            dispatch(activarDesactivarAccion(true));
        }
        dispatch(cierraObjetoDialogAccion());
    };

    const procesarDatosConfiguracion = () => {
        //comprobamos que no haya campos vacíos
        if (!valuesFormConfiguracion.precioHoraNormal ||
            !valuesFormConfiguracion.precioHoraExtra ||
            valuesFormConfiguracion.mensajeMailCentros === '' ||
            valuesFormConfiguracion.cuenta1.iban === '' ||
            valuesFormConfiguracion.cuenta1.bic === '' ||
            valuesFormConfiguracion.cuenta1.nombreBanco === '') {
            setAlert({
                mensaje: "Faltan datos por completar. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (valuesFormConfiguracion.cuenta1.iban.length !== 24) {
            setAlert({
                mensaje: "El formato del IBAN es incorrecto.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        const objetoConfiguracion = {
            precioHoraNormal: valuesFormConfiguracion.precioHoraNormal,
            precioHoraExtra: valuesFormConfiguracion.precioHoraExtra,
            mensajeMailCentros: valuesFormConfiguracion.mensajeMailCentros,
            cuenta1: {
                iban: valuesFormConfiguracion.cuenta1.iban,
                bic: valuesFormConfiguracion.cuenta1.bic,
                nombreBanco: valuesFormConfiguracion.cuenta1.nombreBanco,
                entidad: valuesFormConfiguracion.cuenta1.entidad,
                oficina: valuesFormConfiguracion.cuenta1.oficina,
                digitosControl: valuesFormConfiguracion.cuenta1.digitosControl,
                numeroCuenta: valuesFormConfiguracion.cuenta1.numeroCuenta
            }
        }
        //actualizamos
        const configuracionAGuardar = {
            datos_configuracion: JSON.stringify(objetoConfiguracion)
        };
        dispatch(actualizarConfiguracionAccion('configuracion', 1, configuracionAGuardar));
        dispatch(registrarIntervencionAccion(true));
        dispatch(activarDesactivarAccion(true));
        dispatch(setAnchorElMenuAccion(null));
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.mt_5} style={{ position: 'fixed', height: '100%', width: widthWindow }}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={6}>
                            <Chip style={{ padding: 5 }} icon={<SettingsIcon />} label="Configuración general" />
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <FormControl
                                    className={classes.form}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color='primary'
                                        startIcon={<SettingsIcon />}
                                        onClick={handleClickMenu}
                                    >
                                        Configuración
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorElMenu}
                                        keepMounted
                                        open={Boolean(anchorElMenu)}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem
                                            onClick={procesarDatosConfiguracion}
                                            disabled={disabledItem}
                                        >
                                            <ListItemIcon>
                                                <SaveIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Actualizar" />
                                        </MenuItem>
                                    </StyledMenu>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Box>
                    <Box
                        className={classes.root1}
                        mt={2.5}
                    >
                        <div className={classes.root2} >
                            <AppBar position="static">
                                <Tabs value={valueTab} onChange={handleChangeTab} className={classes.tabsStl}>
                                    <Tooltip title="Instrucciones de trabajo" placement="top-end" arrow>
                                        <Tab label="Instrucciones" {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                    </Tooltip>
                                    <Tooltip title="Modificar varios parámetros establecidos" placement="top-end" arrow>
                                        <Tab label="Varios" {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                                    </Tooltip>
                                    <Tooltip title="Modificar mensajes predeterminados en mails" placement="top-end" arrow>
                                        <Tab label="Plantillas mails" {...a11yProps(2)} style={{ paddingBottom: 10 }} />
                                    </Tooltip>
                                    <Tooltip title="Modificar datos bancarios" placement="top-end" arrow>
                                        <Tab label="Datos bancarios" {...a11yProps(3)} style={{ paddingBottom: 10 }} />
                                    </Tooltip>
                                    <Tooltip title="Informe cambios en versiones" placement="top-end" arrow>
                                        <Tab label="Control de versiones" {...a11yProps(4)} style={{ paddingBottom: 10 }} />
                                    </Tooltip>
                                    {usuarioActivo.nombre === 'admin' ? (
                                        <Tooltip title="Herramientas desarrollo" placement="top-end" arrow>
                                            <Tab label="Herramientas" {...a11yProps(5)} style={{ paddingBottom: 10 }} />
                                        </Tooltip>
                                    ) : null}
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTab} index={0} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    <Grid item xl={10} lg={12} sm={12} xs={12}>
                                        <Box
                                            m={0.5}
                                            bgcolor="secondary.light"
                                            color="secondary.contrastText"
                                            className={clsx(classes.boxStl2, classes.mb20)}
                                        >
                                            Instrucciones de trabajo
                                        </Box>
                                        <Grid
                                            container
                                            direction="row"
                                            justifycontent="flex-start"
                                            alignItems="flex-start"
                                            spacing={1}
                                        >
                                            <Grid item lg={3} sm={3} xs={3}>
                                                <Grid className={classes.scrollable} style={{ height: heightScrollable - 125 }}>
                                                    <Box m={0.5} p={0.5} className={classes.scrollable} style={{ marginRight: 10, backgroundColor: 'white' }}>
                                                        <List
                                                            component="nav"
                                                            className={classes.rootMenuInstrucciones}
                                                        >
                                                            <ListItem button onClick={handleClickMenuInstrucciones1}>
                                                                <ListItemText primary="Gestión Cuadrantes" />
                                                                {openMenu1 ? <ExpandLess /> : <ExpandMore />}
                                                            </ListItem>
                                                            <Collapse in={openMenu1} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c1'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Ciclo de vida de un cuadrante" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c2'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Crear intervalo de festivos" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c3'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Actualizar estado trabajador" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c4'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Asignar horas sin coste" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c5'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Bloquear cómputo de horas" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c6'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Revertir secuencia semanas" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c7'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Horas sustitución festivos" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c8'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Tipos de festivos" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c9'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Facturación mensual" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                            <ListItem button onClick={handleClickMenuInstrucciones2}>
                                                                <ListItemText primary="Gestión Centros" />
                                                                {openMenu2 ? <ExpandLess /> : <ExpandMore />}
                                                            </ListItem>
                                                            <Collapse in={openMenu2} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#ce1'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Dar un centro de baja" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#ce2'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Centro con varios cuadrantes" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#ce3'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Servicios Extra incluidos" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#ce4'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Gestión especial de horas" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                            <ListItem button onClick={handleClickMenuInstrucciones3}>
                                                                <ListItemText primary="Gestión Trabajadores" />
                                                                {openMenu3 ? <ExpandLess /> : <ExpandMore />}
                                                            </ListItem>
                                                            <Collapse in={openMenu3} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#t1'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Agregar trabajador a listados de Servicios Extra" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                            <ListItem button onClick={handleClickMenuInstrucciones4}>
                                                                <ListItemText primary="Gestión Varios" />
                                                                {openMenu4 ? <ExpandLess /> : <ExpandMore />}
                                                            </ListItem>
                                                            <Collapse in={openMenu4} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#v1'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Crear listados Excel de datos" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                            <ListItem button onClick={handleClickMenuInstrucciones5}>
                                                                <ListItemText primary="Gestión Control Horario" />
                                                                {openMenu5 ? <ExpandLess /> : <ExpandMore />}
                                                            </ListItem>
                                                            <Collapse in={openMenu5} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#h1'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Gestión horas trabajadores" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                            <ListItem button onClick={handleClickMenuInstrucciones6}>
                                                                <ListItemText primary="Gestión Horas servicios Fijos" />
                                                                {openMenu6 ? <ExpandLess /> : <ExpandMore />}
                                                            </ListItem>
                                                            <Collapse in={openMenu6} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#sf1'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Gestión horas Servicios Extra" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#sf2'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Gestión Servicios Extra personalizados" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                        </List>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={9} sm={9} xs={9}>
                                                <SimpleReactLightbox>
                                                    {openMenu1 || (!openMenu1 && !openMenu2 && !openMenu3 && !openMenu4 && !openMenu5 && !openMenu6) ? (<InstruccionesCuadrantes />) : null}
                                                    {openMenu2 ? (<InstruccionesCentros />) : null}
                                                    {openMenu3 ? (<InstruccionesTrabajadores />) : null}
                                                    {openMenu4 ? (<InstruccionesVarios />) : null}
                                                    {openMenu5 ? (<InstruccionesControlHorario />) : null}
                                                    {openMenu6 ? (<InstruccionesServiciosFijos />) : null}
                                                </SimpleReactLightbox>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTab} index={1} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    <Grid item lg={4} sm={4} xs={12}>
                                        <Box>
                                            <Box
                                                m={0.5}
                                                bgcolor="secondary.light"
                                                color="secondary.contrastText"
                                                className={clsx(classes.boxStl2, classes.mb20)}
                                            >
                                                Configuración precios/hora trabajadores
                                            </Box>
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>Precio hora normal</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
                                                    fullWidth
                                                    id="form-configuracion-hora-normal"
                                                    value={valuesFormConfiguracion.precioHoraNormal || ''}
                                                    onChange={handleChangeFormConfiguracion('precioHoraNormal')}
                                                    labelWidth={145}
                                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                />
                                            </FormControl>
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>Precio hora extra</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb25}
                                                    fullWidth
                                                    id="form-configuracion-hora-normal"
                                                    value={valuesFormConfiguracion.precioHoraExtra || ''}
                                                    onChange={handleChangeFormConfiguracion('precioHoraExtra')}
                                                    labelWidth={130}
                                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTab} index={2} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    <Grid item lg={4} sm={4} xs={12}>
                                        <Box>
                                            <Box
                                                m={0.5}
                                                bgcolor="secondary.light"
                                                color="secondary.contrastText"
                                                className={clsx(classes.boxStl2, classes.mb20)}
                                            >
                                                Configuración mensajes predeterminados
                                            </Box>
                                            <Box
                                                m={0.5}
                                                className={clsx(classes.mb25, classes.tituloSecundario)}
                                            >
                                                Mensaje envío factura Centro
                                            </Box>
                                            <TextField
                                                className={classes.form}
                                                label="Mensaje"
                                                id="form-configuracion-mensaje-centros"
                                                value={valuesFormConfiguracion.mensajeMailCentros}
                                                fullWidth
                                                placeholder="Mensaje"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                onChange={handleChangeFormConfiguracion('mensajeMailCentros')}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTab} index={3} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    <Grid item lg={4} sm={4} xs={12}>
                                        <Box>
                                            <Box
                                                m={0.5}
                                                bgcolor="secondary.light"
                                                color="secondary.contrastText"
                                                className={clsx(classes.boxStl2, classes.mb20)}
                                            >
                                                Datos bancarios
                                            </Box>
                                            <Box
                                                m={0.5}
                                                className={clsx(classes.mb25, classes.tituloSecundario)}
                                            >
                                                Cuenta corriente para ingresos
                                            </Box>
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>Nombre del banco</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
                                                    fullWidth
                                                    id="form-configuracion-hora-normal"
                                                    value={valuesFormConfiguracion.cuenta1.nombreBanco || ''}
                                                    onChange={handleChangeFormConfiguracion('nombreBanco')}
                                                    labelWidth={135}
                                                />
                                            </FormControl>
                                            <Grid container>
                                                <Grid item xs={8}>
                                                    <FormControl
                                                        variant="outlined"
                                                        className={classes.form}
                                                        size="small"
                                                    >
                                                        <InputLabel>IBAN</InputLabel>
                                                        <OutlinedInput
                                                            className={classes.mb15}
                                                            fullWidth
                                                            id="form-configuracion-hora-normal"
                                                            value={valuesFormConfiguracion.cuenta1.iban || ''}
                                                            onChange={handleChangeFormConfiguracion('iban')}
                                                            labelWidth={40}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl
                                                        variant="outlined"
                                                        className={classes.form}
                                                        size="small"
                                                    >
                                                        <InputLabel>BIC</InputLabel>
                                                        <OutlinedInput
                                                            className={classes.mb15}
                                                            fullWidth
                                                            id="form-configuracion-hora-normal"
                                                            value={valuesFormConfiguracion.cuenta1.bic || ''}
                                                            onChange={handleChangeFormConfiguracion('bic')}
                                                            labelWidth={35}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTab} index={4} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    <Grid item lg={8} sm={8} xs={12}>
                                        <Box>
                                            <Box
                                                m={0.5}
                                                bgcolor="secondary.light"
                                                color="secondary.contrastText"
                                                className={clsx(classes.boxStl2, classes.mb20)}
                                            >
                                                Control de versiones
                                            </Box>
                                            <Box
                                                className={classes.paper}
                                            >
                                                <List dense={true}>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.01 - 19/01/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementación segundo campo de registro para mail y teléfono en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Añadida posibilidad de insertar centros que no computen en FACTUSOL (con registros vacíos) en fichas centros.</Typography>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.02 - 31/01/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad que permite añadir más de un horario por trabajador / centro en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Añadida posibilidad de gestionar cuadrantes con 3 meses de adelanto desde el mes actual en pantalla cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Cambio en selector de Modo entrada de datos (Cantidad de horas) de 8 h. a 12h. en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">4.- Implementada opción baja centros para que no genere cuadrantes en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">5.- Añadido registro día vencimiento factura en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">6.- Añadido registro temporización pago (mensual / bimensual) en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">7.- Añadida posibilidad de generar cuadrantes con 3 meses de adelanto en pantalla cuadrantes.</Typography>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.03 - 10/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Cambiado layout en fichas centros para reorganizar espacio.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Añadida sección en fichas centros para gestionar Servicios fijos en cuadrantes que no computan horas.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Implementada posibilidad de registrar un centro sin cómputo de horas (siempre y cuando tenga servicios extra añadidos).</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">4.- Añadida sección servicios extra en fichas cuadrantes y posibilidad de gestionarlos independientemente de la configuración del centro.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">5.- Implementada funcionalidad para cambiar el Modo de entrada de datos para columnas trabajadores y posibilidad de gestionarlos independientemente de la configuración del centro.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">6.- Añadido botón para configuración personalizada en cuadrante y posibilidad de gestionarlo independientemente de la configuración del centro.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">7.- Modificada funcionalidad para poder registrar cuadrantes sin trabajadores (siempre y cuando tenga servicios extra añadidos).</Typography>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.04 - 12/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadida funcionalidad para generar más de un cuadrante por centro en fichas centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.05 - 14/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad de variaciones temporales para servicios extra en fichas centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.06 - 18/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para poder añadir servicios extra que no computen en cuadrantes en fichas centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.07 - 21/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadidos servicios extra de limpieza de cristales para cómputos bi/trimensual en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad para mostrar/ocultar columnas de Servicios extra o trabajadores en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Programada opción para insertar comentarios generales en cuadrantes en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.08 - 07/03/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadido apartado Observaciones en fichas centros y funcionalidad para seleccionar excepciones en horarios especiales para centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.09 - 23/03/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadido botón para limpiar horario en columnas de trabajadores en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Revisada y corregida funcionalidad para gestión de festivos en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Implementada funcionalidad para activar línea de cuenta corriente en ítems de facturas para programa Factusol en fichas centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.10 - 29/03/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadido estado Reserva a objeto trabajador.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.11 - 24/04/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para bloquear cálculo cómputo Mensual Pactado cuadrantes en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Configurada opción para control de temporización de pago en cuadrantes.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.12 - 04/05/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Cambios en la gestión de históricos de bajas en fichas trabajadores. Día inicio y día fin incluidos en rango de baja.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.12 + 1 - 21/05/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para generar períodos de festivos para gestión de vacaciones en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad para resetear valores de casillas en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Añadidos estados BAJA IT, BAJA ACCTE, BAJA CIA a objeto trabajador.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.14 - 01/06/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadida funcionalidad para gestionar Servicios Extra integrados en cómputo en ficha centros y ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Añadida funcionalidad para ocultar / mostrar individualmente columas de trabajadores en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Añadido campo de observaciones baja en ficha trabajadores.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.15 - 05/06/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadida opción de subcategoría en fichas trabajadores para gestión de Servicios Extra.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada opción de selección de trabajadores con subcategoría de Servicios Extra en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Modificada vista de casillas Servicios Extra en fichas cuadrantes para mostrar nombre trabajador en lugar de precio Servicio.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.16 - 27/06/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad variaciones de horas sin gasto en casillas horaras fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad para generar ficheros Excel con listados de trabajadores / centros en pantalla Inicio.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Generado módulo Instrucciones de Trabajo en pantalla General.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.17 - 20/07/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para revertir la secuencia de semanas en cuadrantes configurados con la variación Semana Sí, Semana No en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.18 - 22/07/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadido tipo festivo: CIERRE CENTRO SIN CÓMPUTO para gestión de festivo en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.19 - 28/11/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadido tipo de Servicio Extra: Limpieza de cuadrantes Cuatrimestral.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.20 - 10/04/2023"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Añadido tipo de Servicio Extra: Fregado de suelos.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Añadido campo Identificador en objeto Centros para diferenciar centros con el mismo nombre en Factusol.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 2.01 - 31/05/2024"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para enviar por mail facturas de clientes en formato PDF desde cuadrante.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad para enviar lotes de mails desde pantalla cuadrantes.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 2.02 - 03/09/2024"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Programada enteramente sección CONTROL HORARIO para gestión integral de horas trabajadas por trabajador centro (Horas servicios y Horas servicios extra).</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad gestionar horas trabajadas en trabajadores Servicios extra.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 2.03 - 13/11/2024"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para gestionar bajas - altas trabajadores en un mismo día.</Typography>
                                                                    <br />                                                                    
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 2.04 - 19/11/2024"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para añadir festivos personalizados a centros desde pantalla Centros y operativo en gestión de Cuadrantes.</Typography>
                                                                    <br />                                                                    
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTab} index={5} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    <Grid item lg={10} sm={10} xs={12}>
                                        <Box
                                            m={0.5}
                                            bgcolor="secondary.light"
                                            color="secondary.contrastText"
                                            className={clsx(classes.boxStl2, classes.mb20)}
                                        >
                                            JSON parse and stringify with compression
                                        </Box>
                                        <Grid
                                            container
                                            direction="row"
                                            justifycontent="flex-start"
                                            alignItems="flex-start"
                                            spacing={1}
                                        >
                                            <Grid item lg={6} sm={6} xs={12}>
                                                <Box>
                                                    <Box
                                                        m={0.5}
                                                        className={clsx(classes.mb25, classes.tituloSecundario)}
                                                    >
                                                        Parse
                                                    </Box>
                                                    <TextField
                                                        className={clsx(classes.form, classes.mb20)}
                                                        label="JSON a parsear"
                                                        id="form-configuracion-JSON-parsear"
                                                        value={valuesHerramientasParseador.parsePorParsear}
                                                        fullWidth
                                                        placeholder="JSON a parsear"
                                                        multiline
                                                        rows={10}
                                                        variant="outlined"
                                                        onChange={handleChangeHerramientasParseador('parsePorParsear')}
                                                    />
                                                    <TextField
                                                        className={classes.form}
                                                        label="JSON parseado"
                                                        id="form-configuracion-JSON-parseado"
                                                        value={valuesHerramientasParseador.parseParseado}
                                                        fullWidth
                                                        placeholder="JSON parseado"
                                                        multiline
                                                        rows={10}
                                                        variant="outlined"
                                                        disabled={true}
                                                    />
                                                    <Button
                                                        className={classes.mt15}
                                                        fullWidth
                                                        variant="contained"
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => procesarParseado('parseParseado')}
                                                    >
                                                        Parse
                                                    </Button>
                                                </Box>
                                            </Grid><Grid item lg={6} sm={6} xs={12}>
                                                <Box>
                                                    <Box
                                                        m={0.5}
                                                        className={clsx(classes.mb25, classes.tituloSecundario)}
                                                    >
                                                        Stringify
                                                    </Box>
                                                    <TextField
                                                        className={clsx(classes.form, classes.mb20)}
                                                        label="String a parsear"
                                                        id="form-configuracion-JSON-parsear"
                                                        value={valuesHerramientasParseador.stringPorParsear}
                                                        fullWidth
                                                        placeholder="String a parsear"
                                                        multiline
                                                        rows={10}
                                                        variant="outlined"
                                                        onChange={handleChangeHerramientasParseador('stringPorParsear')}
                                                    />
                                                    <TextField
                                                        className={classes.form}
                                                        label="String parseado"
                                                        id="form-configuracion-JSON-parseado"
                                                        value={valuesHerramientasParseador.stringParseado}
                                                        fullWidth
                                                        placeholder="String parseado"
                                                        multiline
                                                        rows={10}
                                                        variant="outlined"
                                                        disabled={true}
                                                    />
                                                    <Button
                                                        className={classes.mt15}
                                                        fullWidth
                                                        variant="contained"
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => procesarParseado('stringParseado')}
                                                    >
                                                        Stringify
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
            <DialogComponente
                prIsOpen={openDialog1}
                prHandleCloseDialogBotones={handleCloseDialogBotones}
                prTituloDialog={tituloDialog}
                prDescripcionDialog={descripcionDialog}
            />
            {/* {console.log(valuesFormConfiguracion)} */}
        </div>
    )
}

export default withRouter(Configuracion)
