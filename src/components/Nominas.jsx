import React, { useState, useEffect, Fragment } from 'react';
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
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import 'date-fns';
import { es } from "date-fns/locale";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import DescriptionIcon from '@material-ui/icons/Description';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import ReplyIcon from '@material-ui/icons/Reply';
import EmailIcon from '@material-ui/icons/Email';
import GetAppIcon from '@material-ui/icons/GetApp';

//pdf
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer";
import NominaPDF from "./NominaPDF";

//carga componentes
import PantallaNominas from './PantallaNominas';
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { onEstemAccion } from '../redux/appDucks';
import { retornaAnoMesAccion } from '../redux/appDucks';
import { setCalendarioAGestionarNominasAccion } from '../redux/nominasDucks';
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { cambioEstadoInicioNominasAccion } from '../redux/nominasDucks';
import { retornaAnoMesCuadranteAccion } from '../redux/appDucks';
import { obtenerCuadrantesVinculadosATrabajadorAccion } from '../redux/nominasDucks';
import { obtenerTrabajadorAccion } from '../redux/trabajadoresDucks';
import { vaciarDatosCuadrantesvinculadosAccion } from '../redux/nominasDucks';
import { obtenerNominaAccion } from '../redux/nominasDucks';
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';
import { obtenerConfiguracionAccion } from '../redux/appDucks';
import { setTrabajadorAccion } from '../redux/nominasDucks';
import { actualizarObjetoNominaAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonRegistrarNominaAccion } from '../redux/nominasDucks';
import { activarDesactivarCambioBotonEliminarNominaAccion } from '../redux/nominasDucks';
import { registrarNominaAccion } from '../redux/nominasDucks';
import { actualizarNominaAccion } from '../redux/nominasDucks';
import { cambiarANominaRegistradaAccion } from '../redux/nominasDucks';
import { cambiarANominaNoRegistradaAccion } from '../redux/nominasDucks';
import { eliminarNominaAccion } from '../redux/nominasDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { registrarIntervencionNominaNuevaAccion } from '../redux/nominasDucks';
import { vaciarDatosNominasAccion } from '../redux/nominasDucks';
import { vaciarDatosTrabajadorAccion } from '../redux/trabajadoresDucks';
import { cambioEstadoNominaSinDatosAccion } from '../redux/nominasDucks';
import { venimosDeFaltantesAccion } from '../redux/faltantesDucks';
import { forzarRecargaGraficosNominasAccion } from '../redux/graficosDucks';
import { vaciarDatosFaltantesAccion } from '../redux/faltantesDucks';

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

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Nominas = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const calendarioAGestionarNominas = useSelector(store => store.variablesNominas.calendarioAGestionarNominas);
    const esInicioNominas = useSelector(store => store.variablesNominas.esInicioNominas);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const cuadrantesVinculadosATrabajador = useSelector(store => store.variablesNominas.cuadrantesVinculadosATrabajador);
    const trabajadorAGestionar = useSelector(store => store.variablesTrabajadores.objetoTrabajador);
    const errorDeCargaNominas = useSelector(store => store.variablesNominas.errorDeCargaNominas);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const openLoadingNominas = useSelector(store => store.variablesNominas.loadingNominas);
    const noHayCuadrantesVinculadosATrabajador = useSelector(store => store.variablesNominas.noHayCuadrantesVinculadosATrabajador);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const objetoConfiguracion = useSelector(store => store.variablesApp.objetoConfiguracion);
    const objetoNomina = useSelector(store => store.variablesNominas.objetoNomina);
    const nominaNuevaRegistrada = useSelector(store => store.variablesNominas.estadoIntervencionNominaNuevaRegistrada);
    const nominaRegistrada = useSelector(store => store.variablesNominas.nominaRegistrada);
    const estadoVenimosDeFaltantes = useSelector(store => store.variablesFaltantes.estadoVenimosDeFaltantes);
    const trabajador = useSelector(store => store.variablesNominas.trabajador);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const disabledItemBotonRegistrar = useSelector(store => store.variablesNominas.estadoActivadoDesactivadoBotonRegistrarNomina);
    const disabledItemBotonEliminar = useSelector(store => store.variablesNominas.estadoActivadoDesactivadoBotonEliminarNomina);
    const exitoRegistroNomina = useSelector(store => store.variablesNominas.exitoRegistroNomina);
    const exitoEliminarNomina = useSelector(store => store.variablesNominas.exitoEliminarNomina);
    const exitoActualizacionNomina = useSelector(store => store.variablesNominas.exitoActualizacionNomina);
    const ultimoIdRegistrado = useSelector(store => store.variablesNominas.ultimoIdRegistrado);
    const objetoUsuarioActivo = useSelector(store => store.variablesUsuario.usuarioActivo);
    const openDialog9 = useSelector(store => store.variablesApp.openDialog[8]);
    const openDialog10 = useSelector(store => store.variablesApp.openDialog[9]);
    const nominaSinDatosEstado = useSelector(store => store.variablesNominas.nominaSinDatosEstado);

    //states

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [openLoading, setOpenLoading] = useState(false);
    const [valueDatePickerNominas, setValueDatePickerNominas] = useState(new Date(dispatch(retornaAnoMesAccion())));
    const { monthLet } = dispatch(retornaAnoMesCuadranteAccion(calendarioAGestionarNominas));
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [visibleBaja, setVisibleBaja] = useState({ estado: false, tipo: '' });
    const [nominaAGestionar, setNominaAGestionar] = useState(objetoNomina.datosNomina.arrayDatos);
    const [controladorDeEstado, setControladorDeEstado] = useState('inicio');
    const [firmaActualizacion, setFirmaActualizacion] = useState('');
    const [esEmision, setEsEmision] = useState(false);
    const [arrayInformeLineas, setArrayInformeLineas] = useState([]);

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
        reseteaContenidoNominas();
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
        dispatch(onEstemAccion('nominas'));
        dispatch(setCalendarioAGestionarNominasAccion(dispatch(retornaAnoMesAccion())));
        dispatch(forzarRecargaGraficosNominasAccion(true));
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosAccion('centros'));
        };
        dispatch(obtenerConfiguracionAccion('configuracion', 1));
    }, [dispatch]);

    //secuencia nomina

    useEffect(() => {
        dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, id: ultimoIdRegistrado }));
    }, [ultimoIdRegistrado]);

    useEffect(() => {
        if (controladorDeEstado === 'inicio' || controladorDeEstado === 'venimosDeResetear') {
            setNominaAGestionar(objetoNomina.datosNomina.arrayDatos);
            setFirmaActualizacion(objetoNomina.actualizacion);
            setControladorDeEstado('inicio');
        };
        if (controladorDeEstado === 'venimosDeRegistrar') {
            setControladorDeEstado('inicio');
        };
        if (controladorDeEstado === 'venimosDeInforme') {
            setControladorDeEstado('inicio');
        };
    }, [objetoNomina]);

    useEffect(() => {
        if (nominaRegistrada === 'no') {
            if (!estadoVenimosDeFaltantes) {
                dispatch(obtenerTrabajadorAccion('trabajadores', trabajador));
            };
            dispatch(cambioEstadoInicioNominasAccion(false));
            dispatch(activarDesactivarCambioBotonRegistrarNominaAccion(false));
            dispatch(activarDesactivarCambioBotonEliminarNominaAccion(true));
            dispatch(registrarIntervencionNominaNuevaAccion(false));
        };
        if (nominaRegistrada === 'si') {
            dispatch(obtenerTrabajadorAccion('trabajadores', trabajador));
            dispatch(cambioEstadoInicioNominasAccion(false));
            dispatch(activarDesactivarCambioBotonEliminarNominaAccion(false));
            dispatch(registrarIntervencionNominaNuevaAccion(true));
        };
    }, [nominaRegistrada]);

    useEffect(() => {
        const fetchData = () => {
            setOpenLoading(true);
            if (trabajadorAGestionar.id) {
                if (trabajadorAGestionar.estado !== 'alta') {
                    setVisibleBaja({ estado: true, tipo: trabajadorAGestionar.estado });
                };
                if (nominaRegistrada === 'no') {
                    dispatch(obtenerCuadrantesVinculadosATrabajadorAccion('cuadrantes', trabajadorAGestionar.id, calendarioAGestionarNominas));
                };
                if (nominaRegistrada === 'si') {
                    setNominaAGestionar(objetoNomina.datosNomina.arrayDatos);
                };
            };
            setOpenLoading(false);
        }
        fetchData();
    }, [trabajadorAGestionar]);

    useEffect(() => {
        if (cuadrantesVinculadosATrabajador.length > 0) {
            let objeto;
            let arrayNomina = [...nominaAGestionar];
            cuadrantesVinculadosATrabajador.forEach((cuadrante, index) => {
                objeto = JSON.parse(cuadrante['datos_informe']);
                objeto.arrayTrabajadores.forEach((trabajador, index) => {
                    if (trabajador.trabajador === trabajadorAGestionar.id) {
                        const elTotalHorasNormal =
                            trabajador.totalHorasNormal_L +
                            trabajador.totalHorasNormal_C +
                            trabajador.totalHorasNormal_E +
                            trabajador.totalHorasNormal_I +
                            trabajador.totalHorasNormal_Z +
                            trabajador.totalHorasNormal_T +
                            trabajador.totalHorasNormal_P;
                        const elTotalHorasExtra =
                            trabajador.totalHorasExtra_L +
                            trabajador.totalHorasExtra_C +
                            trabajador.totalHorasExtra_E +
                            trabajador.totalHorasExtra_I +
                            trabajador.totalHorasExtra_Z +
                            trabajador.totalHorasExtra_T +
                            trabajador.totalHorasExtra_P;
                        if (elTotalHorasNormal > 0 || elTotalHorasExtra > 0) {
                            arrayNomina.push({
                                centro: objeto.centro,
                                tipo: trabajador.tipo,
                                totalHorasNormal: elTotalHorasNormal,
                                totalHorasExtra: elTotalHorasExtra
                            })
                        } else {
                            console.log(elTotalHorasNormal)
                            setAlert({
                                mensaje: "La consulta no ha devuelto resultados.",
                                tipo: 'warning'
                            })
                            setOpenSnack(true);
                            dispatch(cambioEstadoNominaSinDatosAccion(true));
                            dispatch(vaciarDatosCuadrantesvinculadosAccion());
                        }
                    }
                });
            });
            const losDatosNomina = { ...objetoNomina.datosNomina, arrayDatos: arrayNomina };
            dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, datosNomina: losDatosNomina }));
            setNominaAGestionar(arrayNomina);
        }
    }, [cuadrantesVinculadosATrabajador]);

    //secuencia venimos de pendientes    

    useEffect(() => {
        if (estadoVenimosDeFaltantes) {
            if (trabajador) {
                const nombreNomina = calendarioAGestionarNominas + '-' + trabajador;
                const losDatosNomina = { ...objetoNomina.datosNomina, arrayDatos: [] };
                dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, id: null, nombre: nombreNomina, actualizacion: '', trabajador: trabajador, datosNomina: losDatosNomina }));
                dispatch(venimosDeFaltantesAccion(false));
            };
        }
    }, [estadoVenimosDeFaltantes]);

    //secuencia alertas

    useEffect(() => {
        if (errorDeCargaNominas || errorDeCargaTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaNominas, errorDeCargaTrabajadores]);

    useEffect(() => {
        if (noHayCuadrantesVinculadosATrabajador) {
            setAlert({
                mensaje: "La consulta no ha devuelto resultados.",
                tipo: 'warning'
            })
            setOpenSnack(true);
            dispatch(cambioEstadoNominaSinDatosAccion(true));
            dispatch(vaciarDatosCuadrantesvinculadosAccion());
        }
    }, [noHayCuadrantesVinculadosATrabajador]);

    useEffect(() => {
        if (exitoRegistroNomina) {
            setAlert({
                mensaje: "Registro creado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoRegistroNomina]);

    useEffect(() => {
        if (exitoEliminarNomina) {
            setAlert({
                mensaje: "Registro eliminado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoEliminarNomina]);

    useEffect(() => {
        if (exitoActualizacionNomina) {
            setAlert({
                mensaje: "Registro actualizado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoActualizacionNomina]);

    useEffect(() => {
        if (!openLoadingNominas || !openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingNominas, openLoadingTrabajadores]);

    useEffect(() => {
        if (esEmision)
            generaInformacionNominas();
    }, [esEmision]);

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

    const handleChangeSelectCalendarioNominas = (newValue) => {
        if (esInicioNominas) {
            reseteaContenidoNominas();
            dispatch(vaciarDatosNominasAccion());
            setValueDatePickerNominas(newValue);
            dispatch(setCalendarioAGestionarNominasAccion(dispatch(retornaAnoMesAccion(newValue))));
            dispatch(cambioEstadoInicioNominasAccion(true));
        } else {
            if (!nominaNuevaRegistrada && !nominaSinDatosEstado) {
                handleClickOpenDialogNominas2();
            } else {
                if (intervencionRegistrada) {
                    reseteaContenidoNominas();
                    dispatch(vaciarDatosNominasAccion());
                    setValueDatePickerNominas(newValue);
                    dispatch(setCalendarioAGestionarNominasAccion(dispatch(retornaAnoMesAccion(newValue))));
                    dispatch(cambioEstadoInicioNominasAccion(true));
                }
            }
        };
        dispatch(vaciarDatosFaltantesAccion());
    };

    const handleChangeFormTrabajadoresNominas = (e) => {
        if (esInicioNominas) {
            reseteaContenidoNominas();
            dispatch(setTrabajadorAccion(e.target.value));
            const nombreNomina = calendarioAGestionarNominas + '-' + e.target.value;
            dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, nombre: nombreNomina, actualizacion: '', trabajador: e.target.value }));
            dispatch(obtenerNominaAccion('nominas', nombreNomina));
        } else {
            if (!nominaNuevaRegistrada && !nominaSinDatosEstado) {
                handleClickOpenDialogNominas2();
            } else {
                if (intervencionRegistrada) {
                    reseteaContenidoNominas();
                    dispatch(setTrabajadorAccion(e.target.value));
                    const nombreNomina = calendarioAGestionarNominas + '-' + e.target.value;
                    const losDatosNomina = { ...objetoNomina.datosNomina, arrayDatos: [] };
                    dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, id: null, nombre: nombreNomina, actualizacion: '', trabajador: e.target.value, datosNomina: losDatosNomina }));
                    dispatch(obtenerNominaAccion('nominas', nombreNomina));
                }
            }
        }
    };

    const reseteaContenidoNominas = () => {
        setVisibleBaja({ estado: false, tipo: '' });
        dispatch(vaciarDatosCuadrantesvinculadosAccion());
        setNominaAGestionar([]);
        dispatch(activarDesactivarCambioBotonRegistrarNominaAccion(true));
        dispatch(setTrabajadorAccion(''));
        setControladorDeEstado('inicio');
        setFirmaActualizacion('');
        dispatch(cambioEstadoNominaSinDatosAccion(false));
        setEsEmision(false);
        setArrayInformeLineas([]);
        dispatch(vaciarDatosTrabajadorAccion());       

    };

    const procesarDatosNomina = (source, totalEmitido) => {
        //firmamos
        let fechaHoy = new Date().toLocaleString() + '';
        let laFirmaActualizacion = fechaHoy + ' por ' + objetoUsuarioActivo.nombre.charAt(0).toUpperCase() + objetoUsuarioActivo.nombre.slice(1);
        setFirmaActualizacion(laFirmaActualizacion);
        const objetoFinalNomina = {
            objeto: 'nomina',
            arrayDatos: nominaAGestionar,
            emitida: source === 'informe' ? 'si' : objetoNomina.datosNomina.emitida,
            totalEmitido: source === 'informe' ? totalEmitido : objetoNomina.datosNomina.totalEmitido,
        }
        const nominaAGuardar = {
            id: objetoNomina.id,
            nombre: objetoNomina.nombre,
            actualizacion: laFirmaActualizacion,
            trabajador: objetoNomina.trabajador,
            datos_nomina: JSON.stringify(objetoFinalNomina),
            total: source === 'informe' ? totalEmitido : objetoNomina.datosNomina.emitida === 'si' ? objetoNomina.datosNomina.totalEmitido : null,
        };
        if (nominaRegistrada === 'no') {
            dispatch(registrarNominaAccion('nominas', nominaAGuardar.id, nominaAGuardar));
            dispatch(cambiarANominaRegistradaAccion());
            setControladorDeEstado('venimosDeRegistrar');
        };
        if (nominaRegistrada === 'si') {
            if (source === 'informe') {
                setControladorDeEstado('venimosDeInforme');
            }
            dispatch(actualizarNominaAccion('nominas', nominaAGuardar.id, nominaAGuardar));
        };
        dispatch(registrarIntervencionAccion(true));
    };

    const goToInicioNominas = () => {
        if (!nominaNuevaRegistrada && !nominaSinDatosEstado) {
            handleClickOpenDialogNominas2();
        } else {
            if (intervencionRegistrada) {
                reseteaContenidoNominas();
                dispatch(vaciarDatosNominasAccion());
                dispatch(cambioEstadoInicioNominasAccion(true));
                dispatch(cambioEstadoNominaSinDatosAccion(true));
            };
        };
        setAnchorElMenu(null);
        dispatch(vaciarDatosFaltantesAccion());
        dispatch(forzarRecargaGraficosNominasAccion(true));
    };

    const generaInformacionNominas = () => {
        let sumatorioHorasNormal = 0;
        let sumatorioHorasExtra = 0;
        let totalGeneral = '';
        const arrayInforme = [];
        arrayInforme.push('Mes: ' + calendarioAGestionarNominas);
        arrayInforme.push('Trabajador: ' + trabajadorAGestionar.nombre);
        if (firmaActualizacion && intervencionRegistrada) {
            arrayInforme.push('Estado: Registrada el ' + firmaActualizacion);
        } else if (firmaActualizacion && !intervencionRegistrada) {
            arrayInforme.push('Estado: Pendiente de actualizar');
        } else {
            arrayInforme.push('Estado: Pendiente de registrar');
        };
        arrayInforme.push('Horas trabajadas por centro:');
        nominaAGestionar.map((item, index) => {
            const elCentro = dispatch(obtenerObjetoPorIdAccion(listadoCentros, item.centro));
            sumatorioHorasNormal += item.totalHorasNormal;
            sumatorioHorasExtra += item.totalHorasExtra;
            arrayInforme.push('Centro ' + elCentro);
            if (item.totalHorasNormal && item.totalHorasExtra) {
                arrayInforme.push('Total horas/mes trabajadas como (' + item.tipo + '): ' + item.totalHorasNormal + ' horas a ' + objetoConfiguracion.precioHoraNormal + ' €/hora -> ' + (item.totalHorasNormal * objetoConfiguracion.precioHoraNormal) + ' €');
                arrayInforme.push('Total horas extra/mes trabajadas como (' + item.tipo + '): ' + item.totalHorasExtra + ' horas a ' + objetoConfiguracion.precioHoraExtra + ' €/hora -> ' + (item.totalHorasExtra * objetoConfiguracion.precioHoraExtra) + ' €');
            };
            if (item.totalHorasNormal && !item.totalHorasExtra) {
                arrayInforme.push('Total horas/mes trabajadas como (' + item.tipo + '): ' + item.totalHorasNormal + ' horas a ' + objetoConfiguracion.precioHoraNormal + ' €/hora -> ' + (item.totalHorasNormal * objetoConfiguracion.precioHoraNormal) + ' €');
            };
            if (!item.totalHorasNormal && item.totalHorasExtra) {
                arrayInforme.push('Total horas extra/mes trabajadas como (' + item.tipo + '): ' + item.totalHorasExtra + ' horas a ' + objetoConfiguracion.precioHoraExtra + ' €/hora -> ' + (item.totalHorasExtra * objetoConfiguracion.precioHoraExtra) + ' €');
            };
        });
        if (sumatorioHorasNormal > 0) {
            totalGeneral += sumatorioHorasNormal + ' horas';
        };
        if (sumatorioHorasExtra > 0) {
            totalGeneral += ' + ' + sumatorioHorasExtra + ' horas extra';
        }
        arrayInforme.push('Total general: ' + totalGeneral + ' -> ' + parseInt((sumatorioHorasNormal * objetoConfiguracion.precioHoraNormal) + (sumatorioHorasExtra * objetoConfiguracion.precioHoraExtra)) + ' €');
        setArrayInformeLineas(arrayInforme);
    };

    const handleActualizaNominaFacturada = () => {
        let sumatorioHorasNormal = 0;
        let sumatorioHorasExtra = 0;
        let elTotalEmitido = 0;
        objetoNomina.datosNomina.arrayDatos.map((dato, index) => {
            if (dato.totalHorasNormal) {
                sumatorioHorasNormal += dato.totalHorasNormal;
            };
            if (dato.totalHorasExtra) {
                sumatorioHorasExtra += dato.totalHorasExtra;
            };
        });
        if (sumatorioHorasNormal > 0) {
            elTotalEmitido += (sumatorioHorasNormal * objetoConfiguracion.precioHoraNormal);
        };
        if (sumatorioHorasExtra > 0) {
            elTotalEmitido += (sumatorioHorasExtra * objetoConfiguracion.precioHoraExtra);
        };
        const losDatosNomina = { ...objetoNomina.datosNomina, emitida: 'si', totalEmitido: elTotalEmitido };
        dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, datosNomina: losDatosNomina }));
        procesarDatosNomina('informe', elTotalEmitido);
    };

    const handleClickEmitirNomina = () => {
        setEsEmision(true);
        handleCloseMenu();
    };

    const handleEnviarEmail = async () => {
        const element = <NominaPDF arrayNominaPDF={arrayInformeLineas} />;
        const myPdf = pdf([]);
        myPdf.updateContainer(element);
        const blob = await myPdf.toBlob();
        let file = new File([blob], 'Nomina-' + objetoNomina.nombre + '.pdf', { lastModified: (new Date()).getTime() });
        //dispatch(enviarMailAccion('artikaweb@gmail.com', 'isaiasherreroflorensa@gmail.com', file))        
    };

    //dialog

    const tituloDialogNominas1 = "¿Estás seguro que quieres eliminar la nómina registrada?";
    const descripcionDialogNominas1 = "Para eliminar la nómina registrada pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo'.";
    const tituloDialogNominas2 = "Registra la nómina";
    const descripcionDialogNominas2 = "Debes registrar la nómina nueva antes de cambiar. Pulsa 'Registrar Nómina' en el menú superior.";

    const handleClickOpenDialogNominas1 = () => {
        dispatch(abreObjetoDialogAccion('9'));
    };

    const handleClickOpenDialogNominas2 = () => {
        dispatch(abreObjetoDialogAccion('10'));
    };

    const handleCloseDialogBotonesNominas1 = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(eliminarNominaAccion('nominas', objetoNomina.id));
            const trabajadorId = objetoNomina.trabajador;
            reseteaContenidoNominas();
            dispatch(setTrabajadorAccion(trabajadorId));
            dispatch(cambiarANominaNoRegistradaAccion());
            const nombreNomina = calendarioAGestionarNominas + '-' + trabajadorId;
            const losDatosNomina = { ...objetoNomina.datosNomina, arrayDatos: [] };
            dispatch(actualizarObjetoNominaAccion({ ...objetoNomina, id: null, nombre: nombreNomina, actualizacion: '', trabajador: trabajadorId, datosNomina: losDatosNomina }));
            dispatch(activarDesactivarCambioBotonEliminarNominaAccion(true));
            setControladorDeEstado('venimosDeResetear');
        }
        dispatch(cierraObjetoDialogAccion());
    };

    const handleCloseDialogBotonesVacio = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(cierraObjetoDialogAccion());
        };
    };

    //retorno componentes 

    const retornaListadoNomina = () => {
        let sumatorioHorasNormal = 0;
        let sumatorioHorasExtra = 0;
        return (
            <Box
                p={0.5}
            >
                <List>
                    {nominaAGestionar.map((item, index) => {
                        const elCentro = dispatch(obtenerObjetoPorIdAccion(listadoCentros, item.centro));
                        sumatorioHorasNormal += item.totalHorasNormal;
                        sumatorioHorasExtra += item.totalHorasExtra;
                        return (
                            <ListItem
                                key={'listItemsNomina' + index}
                                className={classes.casillaNominasNormal}
                                alignItems="flex-start"
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Grid>
                                        <Typography
                                            variant="body1"
                                        >
                                            Centro {elCentro}
                                        </Typography>
                                    </Grid>
                                    {
                                        item.totalHorasNormal && item.totalHorasExtra ? (
                                            <Fragment>
                                                <Grid container
                                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas/mes trabajadas como ({item.tipo}): {item.totalHorasNormal} horas a {objetoConfiguracion.precioHoraNormal} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasNormal * objetoConfiguracion.precioHoraNormal} €
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas extra/mes trabajadas como ({item.tipo}): {item.totalHorasExtra} horas a {objetoConfiguracion.precioHoraExtra} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasExtra * objetoConfiguracion.precioHoraExtra} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ) : item.totalHorasNormal && !item.totalHorasExtra ? (
                                            <Fragment>
                                                <Grid container
                                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas/mes trabajadas como ({item.tipo}): {item.totalHorasNormal} horas a {objetoConfiguracion.precioHoraNormal} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasNormal * objetoConfiguracion.precioHoraNormal} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ) : !item.totalHorasNormal && item.totalHorasExtra ? (
                                            <Fragment>
                                                <Grid container
                                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                                    <Grid item xs={11}>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            Total horas extra/mes trabajadas como ({item.tipo}): {item.totalHorasExtra} horas a {objetoConfiguracion.precioHoraExtra} €/hora
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}
                                                        className={classes.alignRight}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {item.totalHorasExtra * objetoConfiguracion.precioHoraExtra} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ) : null}
                                </Grid>
                            </ListItem >
                        )
                    })}
                    <ListItem
                        className={classes.casillaNominasFinal}
                        alignItems="flex-start"
                    >
                        <Grid
                            container
                            direction="column"
                            justifycontent="flex-start"
                            alignItems="flex-start"
                        >
                            <Fragment>
                                <Grid container
                                    style={{ width: '95%', borderBottom: '1px dotted rgba(0, 0, 0, 0.12)', paddingBottom: 3, marginTop: 5 }}>
                                    <Grid item xs={11}>
                                        <Typography
                                            component="span"
                                            variant="body1"

                                        >
                                            Total general: {sumatorioHorasNormal > 0 ? sumatorioHorasNormal + ' horas' : null} {sumatorioHorasExtra > 0 ? '+ ' + sumatorioHorasExtra + ' horas extra' : null}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}
                                        className={classes.alignRight}
                                    >
                                        <Typography
                                            component="span"
                                            variant="body1"
                                        >
                                            {(sumatorioHorasNormal * objetoConfiguracion.precioHoraNormal) + (sumatorioHorasExtra * objetoConfiguracion.precioHoraExtra)} €
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        </Grid>
                    </ListItem >
                </List>
            </Box>
        )
    }

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
                            classes={{
                                badge:
                                    firmaActualizacion && trabajadorAGestionar.nombre && intervencionRegistrada && objetoNomina.datosNomina.emitida === 'si' ?
                                        classes.badgeVerd :
                                        firmaActualizacion && trabajadorAGestionar.nombre && intervencionRegistrada && objetoNomina.datosNomina.emitida === 'no' ?
                                            classes.badgeTaronja :
                                            firmaActualizacion && trabajadorAGestionar.nombre && !intervencionRegistrada ?
                                                classes.badgeVermell :
                                                !firmaActualizacion && trabajadorAGestionar.nombre ?
                                                    classes.badgeVermell :
                                                    classes.displayNone
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Chip style={{ padding: 5 }} icon={<AssignmentIndIcon />} label={`Gestión de nóminas ` + (
                                trabajadorAGestionar.nombre ?
                                    ' - Trabajador: ' + trabajadorAGestionar.nombre + (
                                        firmaActualizacion && intervencionRegistrada && objetoNomina.datosNomina.emitida === 'no' ?
                                            ' - Estado: Registrada el ' + firmaActualizacion :
                                            firmaActualizacion && intervencionRegistrada && objetoNomina.datosNomina.emitida === 'si' ?
                                                ' - Estado: Emitida el ' + firmaActualizacion :
                                                firmaActualizacion && !intervencionRegistrada ?
                                                    ' - Estado: Pendiente de actualizar' :
                                                    ' - Estado: Pendiente de registrar') :
                                    '')} />
                        </Badge>
                    </Grid>
                    <Grid item xs={3}>
                        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginRight: 20 }}>
                            <FormControl>
                                <Button
                                    fullWidth
                                    disabled={esInicioNominas ? true : false}
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
                                        onClick={goToInicioNominas}
                                    >
                                        <ListItemIcon>
                                            <HomeIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Inicio Nóminas" />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => procesarDatosNomina('normal', null)}
                                        disabled={nominaRegistrada === 'si' ? true : nominaSinDatosEstado ? true : disabledItemBotonRegistrar}
                                    >
                                        <ListItemIcon>
                                            {<SaveIcon fontSize="small" />}
                                        </ListItemIcon>
                                        <ListItemText primary={'Registrar Nómina'} />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClickEmitirNomina}
                                        disabled={nominaRegistrada === 'no' ? true : nominaSinDatosEstado ? true : false}
                                    >
                                        <ListItemIcon>
                                            <DescriptionIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Emitir Nómina" />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClickOpenDialogNominas1}
                                        disabled={disabledItemBotonEliminar}
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
                    mt={3.4}
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
                                    value={objetoNomina.trabajador || ''}
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
                {esInicioNominas ? <PantallaNominas /> :
                    esEmision ? (
                        <Grid style={{ marginRight: 8, marginTop: -8 }}>
                            <Box className={clsx(classes.alignRight, classes.mb20)}>
                                <Tooltip title="Volver a la Nómina" placement="top" arrow>
                                    <Fab
                                        color="secondary"
                                        size="small"
                                        style={{ marginLeft: 8 }}
                                        onClick={() => setEsEmision(false)}
                                    >
                                        <ReplyIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Emitir Nómina" placement="top" arrow>
                                    <Fab
                                        color="primary"
                                        size="small"
                                        style={{ marginLeft: 8 }}
                                        onClick={handleActualizaNominaFacturada}
                                    >
                                        <SaveIcon />
                                    </Fab>
                                </Tooltip>
                                <PDFDownloadLink
                                    document={<NominaPDF arrayNominaPDF={arrayInformeLineas} />}
                                    fileName={'Nomina-' + objetoNomina.nombre + '.pdf'}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Tooltip title="Descargar Nómina" placement="top" arrow>
                                        <Fab
                                            color="primary"
                                            size="small"
                                            style={{ marginLeft: 8 }}
                                        >
                                            <GetAppIcon />
                                        </Fab>
                                    </Tooltip>
                                </PDFDownloadLink>
                                <Tooltip title="Enviar Nómina por mail" placement="top" arrow>
                                    <Fab
                                        color="primary"
                                        size="small"
                                        style={{ marginLeft: 8 }}
                                        onClick={handleEnviarEmail}
                                    >
                                        <EmailIcon />
                                    </Fab>
                                </Tooltip>
                            </Box>
                            <PDFViewer showToolbar={false} style={{ width: "100%", height: "70vh" }}>
                                <NominaPDF arrayNominaPDF={arrayInformeLineas} />
                            </PDFViewer>
                        </Grid>
                    ) : (
                        <Grid
                            spacing={1}
                            container
                            direction="row"
                            justifycontent="flex-start"
                            alignItems="flex-start"
                            style={{ height: heightScrollable, padding: 10 }}
                            className={classes.scrollable}
                        >
                            <Grid item xs={8}>
                                <Box
                                    p={1.5}
                                    m={0.5}
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={classes.mb10}
                                >
                                    <Typography variant="body1">Horas trabajadas por centro en el mes de {monthLet}</Typography>
                                </Box>
                                {visibleBaja.estado ? <Alert severity="info">El trabajador se encuentra de baja por: {visibleBaja.tipo}</Alert> : null}
                                {nominaAGestionar.length > 0 ? (
                                    retornaListadoNomina()
                                ) : null}
                            </Grid>
                        </Grid>
                    )}
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            <DialogComponente
                prIsOpen={openDialog9}
                prHandleCloseDialogBotones={handleCloseDialogBotonesNominas1}
                prTituloDialog={tituloDialogNominas1}
                prDescripcionDialog={descripcionDialogNominas1}
            />
            <DialogComponente
                prIsOpen={openDialog10}
                prHandleCloseDialogBotones={handleCloseDialogBotonesVacio}
                prTituloDialog={tituloDialogNominas2}
                prDescripcionDialog={descripcionDialogNominas2}
                prNoTieneBotones={true}
            />
            {/* {console.log(listadoCentros)} */}
        </div>
    )
}

export default withRouter(Nominas)
