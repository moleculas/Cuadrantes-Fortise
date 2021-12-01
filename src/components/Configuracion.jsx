import React, { useState, useEffect } from 'react';
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
import ListItemText from '@material-ui/core/ListItemText';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

//carga componentes
import DialogComponente from './DialogComponente';

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

const getHeightScrollable = () => (window.innerHeight - 220) || (document.documentElement.clientHeight - 220) || (document.body.clientHeight - 220);

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
    const errorDeCargaConfiguracion = useSelector(store => store.variablesApp.errorDeCargaConfiguracion);
    const exitoActualizacionConfiguracion = useSelector(store => store.variablesApp.exitoActualizacionConfiguracion);

    //states

    const [valueTab, setValueTab] = useState(0);
    const [preValueTab, setPreValueTab] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesFormConfiguracion, setValuesFormConfiguracion] = useState({
        precioHoraNormal: null,
        precioHoraExtra: null,
        mensajeMailCentros: ''
    });
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        dispatch(onEstemAccion('configuracion'));
        dispatch(obtenerConfiguracionAccion('configuracion', 1));
    }, [dispatch]);

    useEffect(() => {
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable());
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
            })
        }
    }, [objetoConfiguracion]);

    //funciones    

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

    const handleChangeFormConfiguracion = (prop) => (e) => {
        if (prop === "precioHoraNormal" || prop === "precioHoraExtra") {
            setValuesFormConfiguracion({ ...valuesFormConfiguracion, [prop]: parseInt(e.target.value) });
        }
        if (prop === "mensajeMailCentros") {
            setValuesFormConfiguracion({ ...valuesFormConfiguracion, [prop]: e.target.value });
        }
        dispatch(activarDesactivarAccion(false));
        dispatch(registrarIntervencionAccion(false));
    };

    //dialog

    const tituloDialog = "¿Estás seguro que quieres cambiar de pantalla?";
    const descripcionDialog = "Estás tratando de cambiar de pantalla pero no has registrado los datos de tu última intervención. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo' y registra los datos.";

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
        if (!valuesFormConfiguracion.precioHoraNormal || !valuesFormConfiguracion.precioHoraExtra || valuesFormConfiguracion.mensajeMailCentros==='') {
            setAlert({
                mensaje: "Faltan datos por completar. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };        

        //actualizamos
        const configuracionAGuardar = {            
            datos_configuracion: JSON.stringify(valuesFormConfiguracion)
        };
        dispatch(actualizarConfiguracionAccion('configuracion', 1, configuracionAGuardar));
        dispatch(registrarIntervencionAccion(true));
        dispatch(activarDesactivarAccion(true));
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.mt_5}>
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
                                        Configuración general
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
                                            <ListItemText primary="Actualizar Configuración" />
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
                                <Tabs value={valueTab} onChange={handleChangeTab}>
                                    <Tooltip title="Modificar los precios/hora establecidos" placement="top-end" arrow>
                                        <Tab label="Precios" {...a11yProps(0)} />
                                    </Tooltip>
                                    <Tooltip title="Modificar mensajes predeterminados en mails" placement="top-end" arrow>
                                        <Tab label="Plantillas mails" {...a11yProps(1)} />
                                    </Tooltip>
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
                                    <Grid item lg={4} sm={4} xs={12}>
                                        <Box>
                                            <Box
                                                p={1.5}
                                                m={0.5}
                                                bgcolor="secondary.light"
                                                color="secondary.contrastText"
                                                className={classes.mb25}
                                            >
                                                Configuración precios/hora trabajadores
                                            </Box>
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                            >
                                                <InputLabel>Precio hora normal</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
                                                    fullWidth
                                                    id="form-configuracion-hora-normal"
                                                    value={valuesFormConfiguracion.precioHoraNormal || ''}
                                                    onChange={handleChangeFormConfiguracion('precioHoraNormal')}
                                                    labelWidth={130}
                                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                />
                                            </FormControl>
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                            >
                                                <InputLabel>Precio hora extra</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
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
                                                p={1.5}
                                                m={0.5}
                                                bgcolor="secondary.light"
                                                color="secondary.contrastText"
                                                className={classes.mb25}
                                            >
                                                Configuración mensajes predeterminados mails
                                            </Box>
                                            <Box p={1} className={classes.mb25}>
                                                <Typography variant="body1">Mensaje envío factura Centro</Typography>
                                                <Divider />
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
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
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
