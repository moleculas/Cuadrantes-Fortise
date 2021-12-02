import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import 'date-fns';
import { es } from "date-fns/locale";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

//pdf
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";

//carga componentes
import PantallaNominas from './PantallaNominas';
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { onEstemAccion } from '../redux/appDucks';
import { retornaAnoMesAccion } from '../redux/appDucks';
import { setCalendarioAGestionarNominasAccion } from '../redux/nominasDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { cambioEstadoInicioNominasAccion } from '../redux/nominasDucks';

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

const Nominas = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const onEstem = useSelector(store => store.variablesApp.onEstem);
    const calendarioAGestionarNominas = useSelector(store => store.variablesNominas.calendarioAGestionarNominas);
    const esInicioNominas = useSelector(store => store.variablesNominas.esInicioNominas);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);

    //states

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [openLoading, setOpenLoading] = useState(false);
    const [valueDatePickerNominas, setValueDatePickerNominas] = useState(new Date(dispatch(retornaAnoMesAccion())));
    const [trabajadorNominas, setTrabajadorNominas] = useState('');

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
        dispatch(onEstemAccion('nominas'));  
        dispatch(setCalendarioAGestionarNominasAccion(dispatch(retornaAnoMesAccion())));
        dispatch(obtenerTrabajadoresAccion('trabajadores'));
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

    //funciones    

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleChangeSelectCalendarioNominas = (newValue) => {
        setValueDatePickerNominas(newValue);
    };

    const handleChangeFormTrabajadoresNominas = (e) => {
        setTrabajadorNominas(e.target.value);
        dispatch(cambioEstadoInicioNominasAccion(false));
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item xs={12} >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item xs={6}>
                        <Chip style={{ padding: 5 }} icon={<AssignmentIndIcon />} label="Gestión de nóminas" />
                    </Grid>
                    <Grid item xs={6}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginRight: 20 }}>
                            <FormControl>                              
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color='primary'
                                    startIcon={<AssignmentIndIcon />}
                                    onClick={handleClickMenu}
                                >
                                    Gestión de nóminas
                                </Button>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorElMenu}
                                    keepMounted
                                    open={Boolean(anchorElMenu)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem
                                    // onClick={}
                                    // disabled={}
                                    >
                                        <ListItemIcon>
                                            <SaveIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Registrar Nómina" />
                                    </MenuItem>
                                    <MenuItem
                                    // onClick={eliminarCentroParent}
                                    // disabled={disabledItem}
                                    >
                                        <ListItemIcon>
                                            <DeleteIcon style={{ color: 'red' }} fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText style={{ color: 'red' }} primary="Eliminar Nómina" />
                                    </MenuItem>
                                </StyledMenu>
                            </FormControl>
                        </Box>
                        </Grid>
                </Box>
                <Box
                    className={classes.root11}
                    mt={3}
                    mb={3}
                >
                    <Grid item lg={4}>
                        <Box pr={2}>
                            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    views={['month', 'year']}
                                    inputVariant="outlined"
                                    fullWidth
                                    format="MM/yyyy"
                                    label="Mes a gestionar"
                                    minDate={new Date('2021-1')}
                                    maxDate={new Date(dispatch(retornaAnoMesAccion()))}
                                    value={valueDatePickerNominas}
                                    onChange={(newValue) => {
                                        handleChangeSelectCalendarioNominas(newValue);
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
                            >
                                <InputLabel>Trabajador</InputLabel>
                                <Select
                                    id="form-trabajadores-nominas"
                                    value={trabajadorNominas}
                                    onChange={handleChangeFormTrabajadoresNominas}
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
                {esInicioNominas ? <PantallaNominas /> : null}

            </Grid>
            {/* {console.log(calendarioAGestionarNominas)} */}
        </div>
    )
}

export default withRouter(Nominas)
