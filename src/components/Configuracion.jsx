import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { stringify, parse } from 'zipson';
import SimpleReactLightbox from 'simple-react-lightbox';
import { HashLink } from 'react-router-hash-link';

//carga componentes
import DialogComponente from './DialogComponente';
import InstruccionesCuadrantes from './InstruccionesCuadrantes';
import InstruccionesCentros from './InstruccionesCentros';
import InstruccionesTrabajadores from './InstruccionesTrabajadores';
import InstruccionesVarios from './InstruccionesVarios';

//estilos
import Clases from "../clases";

//importaciones acciones
import { registrarIntervencionAccion } from '../redux/appDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { obtenerConfiguracionAccion } from '../redux/appDucks';
import { actualizarConfiguracionAccion } from '../redux/appDucks';
import { setAnchorElMenuAccion } from '../redux/cuadrantesSettersDucks';

const getHeightScrollable = () => (window.innerHeight - 200) || (document.documentElement.clientHeight - 200) || (document.body.clientHeight - 200);
const getWidthWindow = () => (window.innerWidth - 230) || (document.documentElement.clientWidth - 230) || (document.body.clientWidth - 230);

//menu
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

//tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Configuracion = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const disabledItem = useSelector(store => store.variablesApp.estadoActivadoDesactivado);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const openDialog1 = useSelector(store => store.variablesApp.openDialog[0]);
    const openLoadingConfiguracion = useSelector(store => store.variablesApp.loadingApp);
    const objetoConfiguracion = useSelector(store => store.variablesApp.objetoConfiguracion);
    const numeroRecibos = useSelector(store => store.variablesApp.numeroRecibos);
    const errorDeCargaConfiguracion = useSelector(store => store.variablesApp.errorDeCargaConfiguracion);
    const exitoActualizacionConfiguracion = useSelector(store => store.variablesApp.exitoActualizacionConfiguracion);
    const usuarioActivo = useSelector(store => store.variablesUsuario.usuarioActivo);

    //states

    const [valueTab, setValueTab] = useState(0);
    const [preValueTab, setPreValueTab] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [widthWindow, setWidthWindow] = useState(getWidthWindow());
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
        },
        numeroRecibos: null
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
            setHeightScrollable(getHeightScrollable());
            setWidthWindow(getWidthWindow());
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (errorDeCargaConfiguracion) {
            setAlert({
                mensaje: "Error de conexi??n con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaConfiguracion]);

    useEffect(() => {
        if (exitoActualizacionConfiguracion) {
            setAlert({
                mensaje: "Configuraci??n actualizada correctamente.",
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
                numeroRecibos: numeroRecibos
            })
        }
    }, [objetoConfiguracion]);

    //funciones    

    const handleClickMenuInstrucciones1 = () => {
        setOpenMenu1(!openMenu1);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
    };

    const handleClickMenuInstrucciones2 = () => {
        setOpenMenu2(!openMenu2);
        setOpenMenu1(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
    };

    const handleClickMenuInstrucciones3 = () => {
        setOpenMenu3(!openMenu3);
        setOpenMenu2(false);
        setOpenMenu1(false);
        setOpenMenu4(false);
    };

    const handleClickMenuInstrucciones4 = () => {
        setOpenMenu4(!openMenu4);
        setOpenMenu2(false);
        setOpenMenu1(false);
        setOpenMenu3(false);
    };

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
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
        if (prop === "numeroRecibos") {
            if (IsNumeric(e.target.value)) {
                setValuesFormConfiguracion({ ...valuesFormConfiguracion, [prop]: e.target.value });
            };
        }
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

    const tituloDialog = "??Est??s seguro que quieres cambiar de pantalla?";
    const descripcionDialog = "Est??s tratando de cambiar de pantalla pero no has registrado los datos de tu ??ltima intervenci??n. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'No' y registra los datos.";

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
        //comprobamos que no haya campos vac??os
        if (!valuesFormConfiguracion.precioHoraNormal ||
            !valuesFormConfiguracion.precioHoraExtra ||
            valuesFormConfiguracion.mensajeMailCentros === '' ||
            valuesFormConfiguracion.cuenta1.iban === '' ||
            valuesFormConfiguracion.cuenta1.bic === '' ||
            valuesFormConfiguracion.cuenta1.nombreBanco === '' ||
            !valuesFormConfiguracion.numeroRecibos) {
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
            datos_configuracion: JSON.stringify(objetoConfiguracion),
            numero_recibos: parseInt(valuesFormConfiguracion.numeroRecibos)
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
                            <Chip style={{ padding: 5 }} icon={<SettingsIcon />} label="Configuraci??n general" />
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
                                        Configuraci??n
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
                                    <Tooltip title="Modificar varios par??metros establecidos" placement="top-end" arrow>
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
                                                                <ListItemText primary="Gesti??n Cuadrantes" />
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
                                                                            <ListItemText primary="Bloquear c??mputo de horas" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c6'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Revertir secuencia semanas" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c7'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Horas sustituci??n festivos" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                    <ListItem button className={classes.nestedIns}>
                                                                        <HashLink to={'#c8'} scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })} className={classes.nestedInsLink}>
                                                                            <ListItemText primary="Tipos de festivos" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                            <ListItem button onClick={handleClickMenuInstrucciones2}>
                                                                <ListItemText primary="Gesti??n Centros" />
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
                                                                            <ListItemText primary="Gesti??n especial de horas" />
                                                                        </HashLink>
                                                                    </ListItem>
                                                                </List>
                                                            </Collapse>
                                                            <ListItem button onClick={handleClickMenuInstrucciones3}>
                                                                <ListItemText primary="Gesti??n Trabajadores" />
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
                                                                <ListItemText primary="Gesti??n Varios" />
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
                                                        </List>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={9} sm={9} xs={9}>
                                                <SimpleReactLightbox>
                                                    {openMenu1 || (!openMenu1 && !openMenu2 && !openMenu3 && !openMenu4) ? (<InstruccionesCuadrantes />) : null}
                                                    {openMenu2 ? (<InstruccionesCentros />) : null}
                                                    {openMenu3 ? (<InstruccionesTrabajadores />) : null}
                                                    {openMenu4 ? (<InstruccionesVarios />) : null}
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
                                                Configuraci??n precios/hora trabajadores
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
                                                    startAdornment={<InputAdornment position="start">???</InputAdornment>}
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
                                                    startAdornment={<InputAdornment position="start">???</InputAdornment>}
                                                />
                                            </FormControl>
                                            <Box
                                                m={0.5}
                                                bgcolor="secondary.light"
                                                color="secondary.contrastText"
                                                className={clsx(classes.boxStl2, classes.mb20)}
                                            >
                                                Configuraci??n numeraci??n recibos
                                            </Box>
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>??ltimo n??mero recibos</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb25}
                                                    fullWidth
                                                    id="form-configuracion-hora-normal"
                                                    value={valuesFormConfiguracion.numeroRecibos || ''}
                                                    onChange={handleChangeFormConfiguracion('numeroRecibos')}
                                                    labelWidth={175}
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
                                                Configuraci??n mensajes predeterminados
                                            </Box>
                                            <Box
                                                m={0.5}
                                                className={clsx(classes.mb25, classes.tituloSecundario)}
                                            >
                                                Mensaje env??o factura Centro
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
                                                                    <Typography component="span" variant="body2">1.- Implementaci??n segundo campo de registro para mail y tel??fono en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- A??adida posibilidad de insertar centros que no computen en FACTUSOL (con registros vac??os) en fichas centros.</Typography>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.02 - 31/01/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad que permite a??adir m??s de un horario por trabajador / centro en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- A??adida posibilidad de gestionar cuadrantes con 3 meses de adelanto desde el mes actual en pantalla cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Cambio en selector de Modo entrada de datos (Cantidad de horas) de 8 h. a 12h. en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">4.- Implementada opci??n baja centros para que no genere cuadrantes en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">5.- A??adido registro d??a vencimiento factura en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">6.- A??adido registro temporizaci??n pago (mensual / bimensual) en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">7.- A??adida posibilidad de generar cuadrantes con 3 meses de adelanto en pantalla cuadrantes.</Typography>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.03 - 10/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Cambiado layout en fichas centros para reorganizar espacio.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- A??adida secci??n en fichas centros para gestionar Servicios fijos en cuadrantes que no computan horas.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Implementada posibilidad de registrar un centro sin c??mputo de horas (siempre y cuando tenga servicios extra a??adidos).</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">4.- A??adida secci??n servicios extra en fichas cuadrantes y posibilidad de gestionarlos independientemente de la configuraci??n del centro.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">5.- Implementada funcionalidad para cambiar el Modo de entrada de datos para columnas trabajadores y posibilidad de gestionarlos independientemente de la configuraci??n del centro.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">6.- A??adido bot??n para configuraci??n personalizada en cuadrante y posibilidad de gestionarlo independientemente de la configuraci??n del centro.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">7.- Modificada funcionalidad para poder registrar cuadrantes sin trabajadores (siempre y cuando tenga servicios extra a??adidos).</Typography>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.04 - 12/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- A??adida funcionalidad para generar m??s de un cuadrante por centro en fichas centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
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
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.06 - 18/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para poder a??adir servicios extra que no computen en cuadrantes en fichas centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.07 - 21/02/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- A??adidos servicios extra de limpieza de cristales para c??mputos bi/trimensual en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad para mostrar/ocultar columnas de Servicios extra o trabajadores en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Programada opci??n para insertar comentarios generales en cuadrantes en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.08 - 07/03/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- A??adido apartado Observaciones en fichas centros y funcionalidad para seleccionar excepciones en horarios especiales para centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.09 - 23/03/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- A??adido bot??n para limpiar horario en columnas de trabajadores en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Revisada y corregida funcionalidad para gesti??n de festivos en fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Implementada funcionalidad para activar l??nea de cuenta corriente en ??tems de facturas para programa Factusol en fichas centros.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.10 - 29/03/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- A??adido estado Reserva a objeto trabajador.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.11 - 24/04/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para bloquear c??lculo c??mputo Mensual Pactado cuadrantes en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Configurada opci??n para control de temporizaci??n de pago en cuadrantes.</Typography>
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
                                                                    <Typography component="span" variant="body2">1.- Cambios en la gesti??n de hist??ricos de bajas en fichas trabajadores. D??a inicio y d??a fin incluidos en rango de baja.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.12 + 1 - 21/05/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para generar per??odos de festivos para gesti??n de vacaciones en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad para resetear valores de casillas en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- A??adidos estados BAJA IT, BAJA ACCTE, BAJA CIA a objeto trabajador.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.14 - 01/06/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- A??adida funcionalidad para gestionar Servicios Extra integrados en c??mputo en ficha centros y ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- A??adida funcionalidad para ocultar / mostrar individualmente columas de trabajadores en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- A??adido campo de observaciones baja en ficha trabajadores.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.15 - 05/06/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- A??adida opci??n de subcategor??a en fichas trabajadores para gesti??n de Servicios Extra.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada opci??n de selecci??n de trabajadores con subcategor??a de Servicios Extra en fichas centros.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Modificada vista de casillas Servicios Extra en fichas cuadrantes para mostrar nombre trabajador en lugar de precio Servicio.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.16 - 27/06/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad variaciones de horas sin gasto en casillas horaras fichas cuadrantes.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">2.- Implementada funcionalidad para generar ficheros Excel con listados de trabajadores / centros en pantalla Inicio.</Typography>
                                                                    <br />
                                                                    <Typography component="span" variant="body2">3.- Generado m??dulo Instrucciones de Trabajo en pantalla General.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="V. 1.17 - 20/07/2022"
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography component="span" variant="body2">1.- Implementada funcionalidad para revertir la secuencia de semanas en cuadrantes configurados con la variaci??n Semana S??, Semana No en ficha cuadrantes.</Typography>
                                                                    <br />
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem >
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
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
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
