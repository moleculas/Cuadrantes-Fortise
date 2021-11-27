import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

//carga componentes
import DialogComponente from './DialogComponente';
import TrabajadoresEditar from './TrabajadoresEditar';
import TrabajadoresRegistrar from './TrabajadoresRegistrar';

//importaciones acciones
import { registrarIntervencionAccion } from '../redux/appDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { activarDesactivarAccion } from '../redux/appDucks';

const h = (window.innerHeight) - (220);
const estilos = makeStyles((theme) => ({
    //loading
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    root11: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
    },
    //tabs
    root2: {
        flexGrow: 1
    },
    //form
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    mb15: {
        marginBottom: 15,
    },
    mb25: {
        marginBottom: 25,
    },
    mb20: {
        marginBottom: 20,
    },
    mt_5: {
        marginTop: -5,
    },
    scrollable: {
        height: h,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    //boto
    btnError: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        },
        "&:disabled": {
            backgroundColor: theme.palette.error.light
        },
        marginLeft: '5px'
    },
}));

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
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

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

const Trabajadores = (props) => {

    const classes = estilos();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const disabledItem = useSelector(store => store.variablesApp.estadoActivadoDesactivado);
    const disabledItemNuevoTrabajador = useSelector(store => store.variablesTrabajadores.estadoActivadoDesactivadoNuevoTrabajador);
    const disabledItemActualizacionTrabajador = useSelector(store => store.variablesTrabajadores.estadoActivadoDesactivadoActualizacionTrabajador);
    const disabledItemRegistroTrabajador = useSelector(store => store.variablesTrabajadores.estadoActivadoDesactivadoRegistroTrabajador);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const onEstem = useSelector(store => store.variablesApp.onEstem);
    const openDialog1 = useSelector(store => store.variablesApp.openDialog[0]);

    //instancias children

    const funcionesEnTrabajadoresRegistrarRef = useRef();
    const funcionesEnTrabajadoresEditarRef = useRef();

    //states

    const [valueTab, setValueTab] = useState(0);
    const [preValueTab, setPreValueTab] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    //funciones    

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

    const procesarDatosEdicionParent = () => {
        if (funcionesEnTrabajadoresEditarRef.current) {
            funcionesEnTrabajadoresEditarRef.current.funcionesEnTrabajadoresEditar('procesarDatosEdicion');
        }
    };

    const eliminarTrabajadorParent = () => {
        if (funcionesEnTrabajadoresEditarRef.current) {
            funcionesEnTrabajadoresEditarRef.current.funcionesEnTrabajadoresEditar('eliminarTrabajador');
        }
    };

    const procesarDatosRegistroParent = () => {
        if (funcionesEnTrabajadoresRegistrarRef.current) {
            funcionesEnTrabajadoresRegistrarRef.current.funcionesEnTrabajadoresRegistrar('procesarDatosRegistro');
        }
    };

    const nuevoTrabajadorParent = () => {
        if (funcionesEnTrabajadoresRegistrarRef.current) {
            funcionesEnTrabajadoresRegistrarRef.current.funcionesEnTrabajadoresRegistrar('nuevoTrabajador');
        }
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

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.mt_5}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={6}>
                            <Chip style={{ padding: 5 }} icon={<SupervisorAccountIcon />} label="Gestión de trabajadores" />
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <FormControl
                                    className={classes.form}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color='primary'
                                        startIcon={<SupervisorAccountIcon />}
                                        onClick={handleClickMenu}
                                    >
                                        Gestión de trabajadores
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorElMenu}
                                        keepMounted
                                        open={Boolean(anchorElMenu)}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem
                                            onClick={onEstem === 'editarTrabajadores' ? (procesarDatosEdicionParent) : (procesarDatosRegistroParent)}
                                            disabled={onEstem === 'editarTrabajadores' ? (disabledItemActualizacionTrabajador) : (disabledItemRegistroTrabajador)}
                                        >
                                            <ListItemIcon>
                                                {onEstem === 'editarTrabajadores' ? <SystemUpdateAltIcon fontSize="small" /> : <SaveIcon fontSize="small" />}
                                            </ListItemIcon>
                                            <ListItemText primary={onEstem === 'editarTrabajadores' ? ('Actualizar trabajador') : ('Registrar trabajador')} />
                                        </MenuItem>
                                        {
                                            onEstem === 'editarTrabajadores' ? (
                                                <MenuItem
                                                    onClick={eliminarTrabajadorParent}
                                                    disabled={disabledItem}
                                                >
                                                    <ListItemIcon>
                                                        <DeleteIcon style={{color: 'red'}} fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText style={{color: 'red'}} primary="Eliminar trabajador" />
                                                </MenuItem>
                                            ) : (
                                                <MenuItem
                                                    onClick={nuevoTrabajadorParent}
                                                    disabled={disabledItemNuevoTrabajador}
                                                >
                                                    <ListItemIcon>
                                                        <GroupAddIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Nuevo trabajador" />
                                                </MenuItem>
                                            )
                                        }
                                    </StyledMenu>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Box>
                    <Box
                        className={classes.root1}
                        mt={2.5}
                    >
                        <div className={classes.root2}>
                            <AppBar position="static">
                                <Tabs value={valueTab} onChange={handleChangeTab}>
                                    <Tooltip title="Modificar los datos de un trabajador registrado" placement="top-end" arrow>
                                        <Tab label="Editar" {...a11yProps(0)} />
                                    </Tooltip>
                                    <Tooltip title="Registrar un nuevo trabajador" placement="top-end" arrow>
                                        <Tab label="Registrar" {...a11yProps(1)} />
                                    </Tooltip>
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTab} index={0} className={classes.scrollable}>
                                <TrabajadoresEditar ref={funcionesEnTrabajadoresEditarRef} />
                            </TabPanel>
                            <TabPanel value={valueTab} index={1} className={classes.scrollable}>
                                <TrabajadoresRegistrar ref={funcionesEnTrabajadoresRegistrarRef} />
                            </TabPanel>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <DialogComponente
                prIsOpen={openDialog1}
                prHandleCloseDialogBotones={handleCloseDialogBotones}
                prTituloDialog={tituloDialog}
                prDescripcionDialog={descripcionDialog}
            />
        </div>
    )
}

export default withRouter(Trabajadores)
