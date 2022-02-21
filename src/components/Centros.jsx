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
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

//carga componentes
import CentrosEditar from './CentrosEditar';
import CentrosRegistrar from './CentrosRegistrar';
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { registrarIntervencionAccion } from '../redux/appDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { vaciarDatosCentroAccion } from '../redux/centrosDucks';

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

const Centros = (props) => {

    const { id, nombre } = useParams();
    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const disabledItem = useSelector(store => store.variablesApp.estadoActivadoDesactivado);
    const disabledItemNuevoCentro = useSelector(store => store.variablesCentros.estadoActivadoDesactivadoNuevoCentro);
    const disabledItemActualizacionCentro = useSelector(store => store.variablesCentros.estadoActivadoDesactivadoActualizacionCentro);
    const disabledItemRegistroCentro = useSelector(store => store.variablesCentros.estadoActivadoDesactivadoRegistroCentro);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const onEstem = useSelector(store => store.variablesApp.onEstem);
    const openDialog1 = useSelector(store => store.variablesApp.openDialog[0]);
    const estadoYaEstaRegistradoRegistroCentro = useSelector(store => store.variablesCentros.estadoYaEstaRegistradoRegistroCentro);

    //instancias children

    const funcionesEnCentrosRegistrarRef = useRef();
    const funcionesEnCentrosEditarRef = useRef();

    //states

    const [valueTab, setValueTab] = useState(0);
    const [preValueTab, setPreValueTab] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [venimosCentroFuera, setVenimosCentroFuera] = useState(null);

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
        if (id) {
            setVenimosCentroFuera({ id: id, nombre: nombre });
        } else {
            setVenimosCentroFuera(null);
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
            dispatch(vaciarDatosCentroAccion());
            setVenimosCentroFuera(null);
            props.history.push('/centros');
        };      
    };

    const procesarDatosEdicionParent = () => {
        if (funcionesEnCentrosEditarRef.current) {
            funcionesEnCentrosEditarRef.current.funcionesEnCentrosEditar('procesarDatosEdicion');
        };
        handleCloseMenu();
    };

    const eliminarCentroParent = () => {
        if (funcionesEnCentrosEditarRef.current) {
            funcionesEnCentrosEditarRef.current.funcionesEnCentrosEditar('eliminarCentro');
        };
        handleCloseMenu();
    };

    const procesarDatosRegistroParent = () => {
        if (funcionesEnCentrosRegistrarRef.current) {
            funcionesEnCentrosRegistrarRef.current.funcionesEnCentrosRegistrar('procesarDatosRegistro');
        };
        handleCloseMenu();
    };

    const nuevoCentroParent = () => {
        if (funcionesEnCentrosRegistrarRef.current) {
            funcionesEnCentrosRegistrarRef.current.funcionesEnCentrosRegistrar('nuevoCentro');
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
                            <Chip style={{ padding: 5 }} icon={<HomeWorkIcon />} label="Gestión de centros" />
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <FormControl
                                    className={classes.form}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color='primary'
                                        startIcon={<HomeWorkIcon />}
                                        onClick={handleClickMenu}
                                    >
                                        Gestión de centros
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorElMenu}
                                        keepMounted
                                        open={Boolean(anchorElMenu)}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem
                                            onClick={onEstem === 'editarCentros' ? (procesarDatosEdicionParent) : (procesarDatosRegistroParent)}
                                            disabled={onEstem === 'editarCentros' ? (disabledItemActualizacionCentro) : (
                                                estadoYaEstaRegistradoRegistroCentro ? estadoYaEstaRegistradoRegistroCentro : disabledItemRegistroCentro                                                
                                                )}
                                        >
                                            <ListItemIcon>
                                                {onEstem === 'editarCentros' ? <SystemUpdateAltIcon fontSize="small" /> : <SaveIcon fontSize="small" />}
                                            </ListItemIcon>
                                            <ListItemText primary={onEstem === 'editarCentros' ? ('Actualizar Centro') : ('Registrar Centro')} />
                                        </MenuItem>
                                        {
                                            onEstem === 'editarCentros' ? (
                                                <MenuItem
                                                    onClick={eliminarCentroParent}
                                                    disabled={disabledItem}
                                                >
                                                    <ListItemIcon>
                                                        <DeleteIcon style={{ color: 'red' }} fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText style={{ color: 'red' }} primary="Eliminar Centro" />
                                                </MenuItem>
                                            ) : (
                                                <MenuItem
                                                    onClick={nuevoCentroParent}
                                                    disabled={disabledItemNuevoCentro}
                                                >
                                                    <ListItemIcon>
                                                        <NoteAddIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Nuevo Centro" />
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
                        <div className={classes.root2} >
                            <AppBar position="static">
                                <Tabs value={valueTab} onChange={handleChangeTab} className={classes.tabsStl}>
                                    <Tooltip title="Modificar los datos de un centro registrado" placement="top-end" arrow>
                                        <Tab label="Editar" {...a11yProps(0)} style={{paddingBottom: 10}}/>
                                    </Tooltip>
                                    <Tooltip title="Registrar un nuevo centro" placement="top-end" arrow>
                                        <Tab label="Registrar" {...a11yProps(1)} style={{paddingBottom: 10}}/>
                                    </Tooltip>
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTab} index={0} className={classes.scrollable}>
                                <CentrosEditar ref={funcionesEnCentrosEditarRef} prVenimosCentroFuera={venimosCentroFuera} />
                            </TabPanel>
                            <TabPanel value={valueTab} index={1} className={classes.scrollable}>
                                <CentrosRegistrar ref={funcionesEnCentrosRegistrarRef} />
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
            {/* {console.log('registrado: ', estadoYaEstaRegistradoRegistroCentro)} */}
        </div>
    )
}

export default withRouter(Centros)
