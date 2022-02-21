import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from "react-router-dom";
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

//estilos
import Clases from "../clases";

//importaciones acciones
import { registrarIntervencionAccion } from '../redux/appDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { vaciarDatosTrabajadorAccion } from '../redux/trabajadoresDucks';

const getHeightScrollable = () => (window.innerHeight - 200) || (document.documentElement.clientHeight - 200) || (document.body.clientHeight - 200);

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

    const { id, nombre } = useParams();
    const classes = Clases();
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
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [venimosTrabajadorFuera, setVenimosTrabajadorFuera] = useState(null);

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
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable());
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (id) {
            setVenimosTrabajadorFuera({ id: id, nombre: nombre });
        } else {
            setVenimosTrabajadorFuera(null);
        }
    }, [id]);

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
            setValueTab(newValue);
            dispatch(vaciarDatosTrabajadorAccion());
            setVenimosTrabajadorFuera(null);
            props.history.push('/trabajadores');
        };
    };

    const procesarDatosEdicionParent = () => {
        if (funcionesEnTrabajadoresEditarRef.current) {
            funcionesEnTrabajadoresEditarRef.current.funcionesEnTrabajadoresEditar('procesarDatosEdicion');
        };
        handleCloseMenu();
    };

    const eliminarTrabajadorParent = () => {
        if (funcionesEnTrabajadoresEditarRef.current) {
            funcionesEnTrabajadoresEditarRef.current.funcionesEnTrabajadoresEditar('eliminarTrabajador');
        };
        handleCloseMenu();
    };

    const procesarDatosRegistroParent = () => {
        if (funcionesEnTrabajadoresRegistrarRef.current) {
            funcionesEnTrabajadoresRegistrarRef.current.funcionesEnTrabajadoresRegistrar('procesarDatosRegistro');
        };
        handleCloseMenu();
    };

    const nuevoTrabajadorParent = () => {
        if (funcionesEnTrabajadoresRegistrarRef.current) {
            funcionesEnTrabajadoresRegistrarRef.current.funcionesEnTrabajadoresRegistrar('nuevoTrabajador');
        };
        handleCloseMenu();
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
                                            <ListItemText primary={onEstem === 'editarTrabajadores' ? ('Actualizar Trabajador') : ('Registrar Trabajador')} />
                                        </MenuItem>
                                        {
                                            onEstem === 'editarTrabajadores' ? (
                                                <MenuItem
                                                    onClick={eliminarTrabajadorParent}
                                                    disabled={disabledItem}
                                                >
                                                    <ListItemIcon>
                                                        <DeleteIcon style={{ color: 'red' }} fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText style={{ color: 'red' }} primary="Eliminar Trabajador" />
                                                </MenuItem>
                                            ) : (
                                                <MenuItem
                                                    onClick={nuevoTrabajadorParent}
                                                    disabled={disabledItemNuevoTrabajador}
                                                >
                                                    <ListItemIcon>
                                                        <GroupAddIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Nuevo Trabajador" />
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
                                <Tabs value={valueTab} onChange={handleChangeTab} className={classes.tabsStl}>
                                    <Tooltip title="Modificar los datos de un trabajador registrado" placement="top-end" arrow>
                                        <Tab label="Editar" {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                    </Tooltip>
                                    <Tooltip title="Registrar un nuevo trabajador" placement="top-end" arrow>
                                        <Tab label="Registrar" {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                                    </Tooltip>
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTab} index={0} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <TrabajadoresEditar ref={funcionesEnTrabajadoresEditarRef} prVenimosTrabajadorFuera={venimosTrabajadorFuera} />
                            </TabPanel>
                            <TabPanel value={valueTab} index={1} className={classes.scrollable} style={{ height: heightScrollable }}>
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
