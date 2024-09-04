import React, { useState, useEffect, Fragment, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import clsx from 'clsx';
import {
    Backdrop,
    CircularProgress,
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Select,
    List,
    InputAdornment,
    Switch,
    Typography,
    FormControlLabel,
    AppBar,
    Tabs,
    Tab,
    IconButton,
    Tooltip,
    Checkbox
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    LibraryAdd,
    Delete
} from '@material-ui/icons';

//carga componentes
import DialogComponente from '../comun/DialogComponente';
import HorarioCentros from './componentes/HorarioCentros';
import TipoServicioFijo from '../comun/TipoServicioFijo';
import CustomSnack from '../comun/CustomSnack';
import SelectsTrabajadores from './componentes/SelectsTrabajadores';

//estilos
import Clases from "../clases";

//importaciones acciones
import {
    obtenerCentrosAccion,
    obtenerCentroAccion,
    actualizarCentroAccion,
    eliminarCentroAccion,
    activarDesactivarActualizarCentroAccion,
    vaciarDatosCentrosAccion
} from '../redux/centrosDucks';
import {
    obtenerTrabajadoresAccion,
    obtenerTrabajadoresSubcategoriaAccion
} from '../redux/trabajadoresDucks';
import {
    activarDesactivarAccion,
    registrarIntervencionAccion,
    generaFechaAccion,
    onEstemAccion,
    abreObjetoDialogAccion,
    cierraObjetoDialogAccion
} from '../redux/appDucks';
import {
    TabPanel,
    a11yProps,
    getHeightScrollable,
    IsNumeric
} from '../logica/logicaApp';
import {
    procesarDatosPromesa
} from '../logica/logicaCentros';

//constantes
const {
    CATEGORIAS_CENTROS: categorias,
    VARIACIONES_HORARIOS_CENTROS: variaciones,
    MODO_ENTRADA_HORARIOS: tipos,
    TRABAJADORES_ASIGNADOS_CENTRO: totalTrabajadores,
    COMPUTO_HORAS: computoHoras,
    FORMA_DE_PAGO: formasDePago,
    TEMPORIZACION_PAGO: temporizacionDelPago,
    DIA_PAGO: diaDelPago,
    TIPO_SERVICIO_FIJO: tiposServicioFijo,
    TIPO_SERVICIO: tipoServicio,
    EXCEPCIONES_CENTROS: excepciones,
    DIAS_SEMANA: diasSemana
} = Constantes;



const CentrosEditar = forwardRef((props, ref) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const centroAEditar = useSelector(store => store.variablesCentros.objetoCentro);
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const exitoActualizacionCentro = useSelector(store => store.variablesCentros.exitoActualizacionCentro);
    const exitoEliminarCentro = useSelector(store => store.variablesCentros.exitoEliminarCentro);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const disabledItem = useSelector(store => store.variablesApp.estadoActivadoDesactivado);
    const openDialog2 = useSelector(store => store.variablesApp.openDialog[1]);
    const trabajadoresCargados = useSelector(store => store.variablesTrabajadores.trabajadoresCargados);

    //states

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openSnack, setOpenSnack] = useState(false);
    const [valuesAutocompleteCentrosValores, setValuesAutocompleteCentrosValores] = useState(null);
    const [alert, setAlert] = useState({});
    const [valuesFormEdicion, setValuesFormEdicion] = useState({
        categoria: '',
        variacion: '',
        excepcion: '',
        observaciones: '',
        tipo: '',
        numeroTrabajadores: '',
        datosTrabajadores: [],
        datosSuplentes: [],
        computo: '',
        mensualPactado: null,
        ...tipoServicio.reduce((acc, curr) => {
            acc[`precioHora_${curr.prefix}`] = null;
            return acc;
        }, {}),
        ...tiposServicioFijo.reduce((acc, curr) => {
            acc[`precioHora_${curr.prefix}`] = null;
            acc[`variacion_${curr.prefix}`] = '';
            acc[`diaVariacion_${curr.prefix}`] = '';
            acc[`activo_${curr.prefix}`] = 'si';
            acc[`int_${curr.prefix}`] = false;
            acc[`trab_${curr.prefix}`] = '';
            return acc;
        }, {})
    });
    const initialStateSemana = (tipo) => {
        return diasSemana.reduce((acc, curr) => {
            acc[`${curr.value}`] = tipo;
            return acc;
        }, {});
    };
    const initialStateTipoServicio = () => {
        return diasSemana.reduce((acc, curr) => {
            acc[`${curr.value}TipoServicio`] = '';
            return acc;
        }, {});
    };
    const initialStateHorarioSemana = () => {
        return diasSemana.reduce((acc, curr) => {
            acc[`${curr.value}InicioRango`] = null;
            acc[`${curr.value}FinRango`] = null;
            acc[`${curr.value}Inicio1RangoDescanso`] = null;
            acc[`${curr.value}Inicio2RangoDescanso`] = null;
            acc[`${curr.value}Fin1RangoDescanso`] = null;
            acc[`${curr.value}Fin2RangoDescanso`] = null;
            acc[`${curr.value}Cantidad`] = '';
            acc[`${curr.value}TipoServicio`] = '';
            return acc;
        }, {});
    };
    const [valueTimePickerInicioEdicion, setValueTimePickerInicioEdicion] = useState([initialStateSemana(null)]);
    const [valueTimePickerFinEdicion, setValueTimePickerFinEdicion] = useState([initialStateSemana(null)]);
    const [valueTimePickerInicioDescanso1Edicion, setValueTimePickerInicioDescanso1Edicion] = useState([initialStateSemana(null)]);
    const [valueTimePickerFinDescanso1Edicion, setValueTimePickerFinDescanso1Edicion] = useState([initialStateSemana(null)]);
    const [valueTimePickerInicioDescanso2Edicion, setValueTimePickerInicioDescanso2Edicion] = useState([initialStateSemana(null)]);
    const [valueTimePickerFinDescanso2Edicion, setValueTimePickerFinDescanso2Edicion] = useState([initialStateSemana(null)]);
    const [valueCantidadHorasEdicion, setValueCantidadHorasEdicion] = useState([initialStateSemana('')]);
    const [valueTipoServicioEdicion, setValueTipoServicioEdicion] = useState([initialStateTipoServicio()]);
    const [horarioIntervencionEdicion, setHorarioIntervencionEdicion] = useState({
        tipo: '',
        variacion: '',
        excepcion: '',
        tipoRegistro: 'comun',
        tipoRegistroTrabajador: [initialStateHorarioSemana()]
    });
    const [trabajadoresEdicion, setTrabajadoresEdicion] = useState({
        cantidad: '',
        trabajadores: []
    });
    const [openLoading, setOpenLoading] = useState(false);
    const [stateSwitchTipoRegistro, setStateSwitchTipoRegistro] = useState(false);
    const [estamosCargandoDatos, setEstamosCargandoDatos] = useState(true);
    const [stateSwitchEstadoEdicion, setStateSwitchEstadoEdicion] = useState(false);
    const [valueTabCentrosEdicion, setValueTabCentrosEdicion] = useState(0);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable(260));
    const [stateSwitchTipoServicioFijoEdicion, setStateSwitchTipoServicioFijoEdicion] = useState({
        ...tiposServicioFijo.reduce((acc, curr) => {
            acc[`${curr.prefix}`] = false;
            return acc;
        }, {})
    });
    const [numeroCuadrantesEdicion, setNumeroCuadrantesEdicion] = useState([{ value: 1, cuadrante: null, guardado: false }]);
    const [cuadranteEnUsoEdicion, setCuadranteEnUsoEdicion] = useState(1);
    const [esInicioCentrosEdicion, setEsInicioCentrosEdicion] = useState(true);
    const [valuesFormEdicionGenerales, setValuesFormEdicionGenerales] = useState({
        id: null,
        nombre: '',
        subNombre: '',
        estado: 'alta',
        codigo: '',
        domicilio: '',
        codigoPostal: '',
        poblacion: '',
        provincia: '',
        nif: '',
        mail: '',
        mail2: '',
        telefono: '',
        telefono2: '',
        formaPago: '',
        tempPago: '',
        diaPago: '',
        activoNumCuenta: false,
        gestionEspSF: false,
    });
    const lengthLabelServicio = {
        3: 120,
        4: 130,
        5: 140,
        6: 150
    };

    //useEffect

    useEffect(() => {
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable(260));
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        dispatch(onEstemAccion('editarCentros'));
        listadoCentros.length === 0 && dispatch(obtenerCentrosAccion('centros', false));
        listadoTrabajadores.length === 0
            ? dispatch(obtenerTrabajadoresAccion('trabajadores'))
            : trabajadoresCargados && dispatch(obtenerTrabajadoresSubcategoriaAccion(2));
    }, [listadoCentros, listadoTrabajadores]);

    useEffect(() => {
        if (errorDeCargaTrabajadores || errorDeCargaCentros) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        };
    }, [errorDeCargaTrabajadores, errorDeCargaCentros]);

    useEffect(() => {
        if (props.prVenimosCentroFuera) {
            setValuesAutocompleteCentrosValores(props.prVenimosCentroFuera);
            dispatch(obtenerCentroAccion('centros', props.prVenimosCentroFuera.id));
            dispatch(activarDesactivarAccion(false));
        }
    }, [props.prVenimosCentroFuera]);

    useEffect(() => {
        if (exitoActualizacionCentro) {
            setAlert({
                mensaje: "Registro actualizado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        };
    }, [exitoActualizacionCentro]);

    useEffect(() => {
        if (exitoEliminarCentro) {
            setAlert({
                mensaje: "Registro eliminado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        };
    }, [exitoEliminarCentro]);

    useEffect(() => {
        if (centroAEditar.categoria.categoria.length > 0) {
            let arrayAAnadir = [];
            for (let i = 0; i < centroAEditar.categoria.categoria.length; i++) {
                let objAAnadir = {
                    value: i + 1,
                    cuadrante: {
                        categoria: centroAEditar.categoria.categoria[i],
                        horario: centroAEditar.horario.horario[i],
                        servicios_fijos: centroAEditar.serviciosFijos.serviciosFijos[i],
                        trabajadores: centroAEditar.trabajadores.trabajadores[i],
                        observaciones: centroAEditar.observaciones.observaciones[i]
                    },
                    guardado: true
                };
                arrayAAnadir.push(objAAnadir);
            };
            setNumeroCuadrantesEdicion(arrayAAnadir);
            setValuesFormEdicionGenerales({
                ...valuesFormEdicionGenerales,
                id: centroAEditar.id,
                nombre: centroAEditar.nombre,
                subNombre: centroAEditar.subNombre || '',
                estado: centroAEditar.estado,
                codigo: centroAEditar.codigo || '',
                domicilio: centroAEditar.domicilio || '',
                codigoPostal: centroAEditar.codigoPostal || '',
                poblacion: centroAEditar.poblacion || '',
                provincia: centroAEditar.provincia || '',
                nif: centroAEditar.nif || '',
                mail: centroAEditar.mail || '',
                mail2: centroAEditar.mail2 || '',
                telefono: centroAEditar.telefono || '',
                telefono2: centroAEditar.telefono2 || '',
                formaPago: centroAEditar.formaPago || '',
                tempPago: centroAEditar.tempPago || '',
                diaPago: centroAEditar.diaPago ? centroAEditar.diaPago : '',
                activoNumCuenta: centroAEditar.activoNumCuenta === 'si' ? true : false,
                gestionEspSF: centroAEditar.serviciosFijos.gestionEspSF || false
            });
            if (centroAEditar.estado === 'baja') {
                setStateSwitchEstadoEdicion(true);
            };
        };
    }, [centroAEditar]);

    useEffect(() => {
        if (horarioIntervencionEdicion.tipoRegistro === 'individual' && !estamosCargandoDatos) {
            let myArray1 = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
            let myArray2 = [...valueTimePickerInicioEdicion];
            let myArray3 = [...valueTimePickerFinEdicion];
            let myArray4 = [...valueTimePickerInicioDescanso1Edicion];
            let myArray5 = [...valueTimePickerFinDescanso1Edicion];
            let myArray6 = [...valueTimePickerInicioDescanso2Edicion];
            let myArray7 = [...valueTimePickerFinDescanso2Edicion];
            let myArray8 = [...valueCantidadHorasEdicion];
            let myArray9 = [...valueTipoServicioEdicion];
            for (let i = 1; i < trabajadoresEdicion.cantidad; i++) {
                myArray1.push(initialStateHorarioSemana());
                myArray2.push(initialStateSemana(null));
                myArray3.push(initialStateSemana(null));
                myArray4.push(initialStateSemana(null));
                myArray5.push(initialStateSemana(null));
                myArray6.push(initialStateSemana(null));
                myArray7.push(initialStateSemana(null));
                myArray8.push(initialStateSemana(''));
                myArray9.push(initialStateTipoServicio());
            };
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioEdicion(myArray2);
            setValueTimePickerFinEdicion(myArray3);
            setValueTimePickerInicioDescanso1Edicion(myArray4);
            setValueTimePickerFinDescanso1Edicion(myArray5);
            setValueTimePickerInicioDescanso2Edicion(myArray6);
            setValueTimePickerFinDescanso2Edicion(myArray7);
            setValueCantidadHorasEdicion(myArray8);
            setValueTipoServicioEdicion(myArray9);
        };
    }, [horarioIntervencionEdicion.tipoRegistro, estamosCargandoDatos]);

    useEffect(() => {
        if (!openLoadingCentros && !openLoadingTrabajadores) {
            setOpenLoading(false);
        } else {
            setOpenLoading(true);
        };
    }, [openLoadingCentros, openLoadingTrabajadores]);

    useEffect(() => {
        if (esInicioCentrosEdicion) {
            if (numeroCuadrantesEdicion[0].guardado) {
                gestionaContenidoCuadranteEdicion(1);
                setEsInicioCentrosEdicion(false);
            };
        }
    }, [numeroCuadrantesEdicion]);

    //funciones

    const handleChangeTabCentrosEdicion = (event, newValue) => {
        setValueTabCentrosEdicion(newValue);
    };

    const generaFecha = (datoHorario) => {
        return dispatch(generaFechaAccion(datoHorario));
    };

    const handleChangeSelectCentrosEdicion = (e, values) => {
        if (values) {
            reseteaContenidoEdicion('nuevo');
            setEsInicioCentrosEdicion(true);
            setEstamosCargandoDatos(true);
            setValuesAutocompleteCentrosValores(values);
            dispatch(obtenerCentroAccion('centros', values.id));
            dispatch(activarDesactivarAccion(false));
        } else {
            dispatch(activarDesactivarAccion(true));
            dispatch(activarDesactivarActualizarCentroAccion(true));
            dispatch(registrarIntervencionAccion(true));
            reseteaContenidoEdicion('nuevo');
        };
    };

    const handleChangeFormEdicion = (prop) => (e) => {
        if (prop === "categoria") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "variacion") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, variacion: e.target.value });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "excepcion") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, excepcion: e.target.value });
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "computo") {
            setValuesFormEdicion({
                ...valuesFormEdicion, [prop]: e.target.value,
                mensualPactado: null,
                ...tipoServicio.reduce((acc, curr) => {
                    acc[`precioHora_${curr.prefix}`] = null;
                    return acc;
                }, {})
            });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "mensualPactado") {
            if (IsNumeric(e.target.value)) {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
                dispatch(activarDesactivarActualizarCentroAccion(false));
            }
            return;
        };
        const precioHoraSProp = tipoServicio.some(servicio => prop === `precioHora_${servicio.prefix}`);
        const precioHoraSFProp = tiposServicioFijo.some(servicio => prop === `precioHora_${servicio.prefix}`);
        if (precioHoraSProp || precioHoraSFProp) {
            if (IsNumeric(e.target.value)) {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
                dispatch(activarDesactivarActualizarCentroAccion(false));
            };
            return;
        };
        const intProp = tiposServicioFijo.some(servicio => prop === `int_${servicio.prefix}`);
        if (intProp) {
            if (e.target.checked) {
                const [, elServicio] = prop.split("_");
                setValuesFormEdicion({
                    ...valuesFormEdicion,
                    ['diaVariacion_' + elServicio]: '',
                    ['precioHora_' + elServicio]: null,
                    ['variacion_' + elServicio]: '',
                    [prop]: e.target.checked
                });
                dispatch(activarDesactivarActualizarCentroAccion(false));
                return;
            } else {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.checked });
                dispatch(activarDesactivarActualizarCentroAccion(false));
                return;
            };
        };
        if (prop === "tipo") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setStateSwitchTipoRegistro(false);
            setHorarioIntervencionEdicion({
                ...horarioIntervencionEdicion,
                tipo: e.target.value,
                tipoRegistro: 'comun',
                tipoRegistroTrabajador: [initialStateHorarioSemana()],
            });
            setValueTimePickerInicioEdicion([initialStateSemana(null)]);
            setValueTimePickerFinEdicion([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso1Edicion([initialStateSemana(null)]);
            setValueTimePickerFinDescanso1Edicion([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso2Edicion([initialStateSemana(null)]);
            setValueTimePickerFinDescanso2Edicion([initialStateSemana(null)]);
            setValueCantidadHorasEdicion([initialStateSemana('')]);
            setValueTipoServicioEdicion([initialStateTipoServicio()]);
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        }
        if (prop === "numeroTrabajadores") {
            if (horarioIntervencionEdicion.tipoRegistro !== 'comun') {
                if (e.target.value === 1) {
                    setAlert({
                        mensaje: "El número de trabajadores en tipo de registro individual debe ser mayor que uno.",
                        tipo: 'warning'
                    })
                    setOpenSnack(true);
                    return;
                };
                gestionaTipoRegistroNumTrabajadoresEdicion(e.target.value);
            };
            if (e.target.value > valuesFormEdicion.datosTrabajadores.length) {
                let vecesMayor = e.target.value - valuesFormEdicion.datosTrabajadores.length;
                let arrayTr = [...valuesFormEdicion.datosTrabajadores];
                let arraySu = [...valuesFormEdicion.datosSuplentes];
                let arrayTrEd = [...trabajadoresEdicion.trabajadores];
                for (let i = 0; i < vecesMayor; i++) {
                    arrayTrEd[valuesFormEdicion.datosTrabajadores.length + i] = {};
                    arrayTrEd[valuesFormEdicion.datosTrabajadores.length + i]['trabajador_' + (valuesFormEdicion.datosTrabajadores.length + 1 + i)] = '';
                    arrayTrEd[valuesFormEdicion.datosTrabajadores.length + i]['suplente_' + (valuesFormEdicion.datosTrabajadores.length + 1 + i)] = '';
                    arrayTr.push("");
                    arraySu.push("");
                };
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresEdicion({ ...trabajadoresEdicion, cantidad: e.target.value, trabajadores: arrayTrEd });
            } else {
                let vecesMenor = valuesFormEdicion.datosTrabajadores.length - e.target.value;
                let arrayTr = [...valuesFormEdicion.datosTrabajadores];
                let arraySu = [...valuesFormEdicion.datosSuplentes];
                let arrayTrEd = [...trabajadoresEdicion.trabajadores];
                for (let i = 0; i < vecesMenor; i++) {
                    arrayTr.pop();
                    arraySu.pop();
                    arrayTrEd.pop();
                };
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresEdicion({ ...trabajadoresEdicion, cantidad: e.target.value, trabajadores: arrayTrEd });
            }
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeFormEdicionGenerales = (prop) => (e) => {
        if (prop === "activoNumCuenta") {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, [prop]: e.target.checked });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "gestionEspSF") {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, [prop]: e.target.checked });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSwitchTipoRegistroEdicion = (e) => {
        setEstamosCargandoDatos(false);
        if (e.target.checked) {
            if (trabajadoresEdicion.cantidad > 1) {
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistro: 'individual' });
            } else {
                setAlert({
                    mensaje: "Para seleccionar este tipo de registro debe haber más de un trabajador asignado.",
                    tipo: 'warning'
                })
                setOpenSnack(true);
                return;
            };
        } else {
            let myArray1 = [horarioIntervencionEdicion.tipoRegistroTrabajador[0]];
            let myArray2 = [valueTimePickerInicioEdicion[0]];
            let myArray3 = [valueTimePickerFinEdicion[0]];
            let myArray4 = [valueTimePickerInicioDescanso1Edicion[0]];
            let myArray5 = [valueTimePickerFinDescanso1Edicion[0]];
            let myArray6 = [valueTimePickerInicioDescanso2Edicion[0]];
            let myArray7 = [valueTimePickerFinDescanso2Edicion[0]];
            let myArray8 = [valueCantidadHorasEdicion[0]];
            let myArray9 = [valueTipoServicioEdicion[0]];
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistro: 'comun', tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioEdicion(myArray2);
            setValueTimePickerFinEdicion(myArray3);
            setValueTimePickerInicioDescanso1Edicion(myArray4);
            setValueTimePickerFinDescanso1Edicion(myArray5);
            setValueTimePickerInicioDescanso2Edicion(myArray6);
            setValueTimePickerFinDescanso2Edicion(myArray7);
            setValueCantidadHorasEdicion(myArray8);
            setValueTipoServicioEdicion(myArray9);
        };
        setStateSwitchTipoRegistro(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSwitchEstadoEdicion = (e) => {
        if (e.target.checked) {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, estado: 'baja' });
        } else {
            setValuesFormEdicionGenerales({ ...valuesFormEdicionGenerales, estado: 'alta' });
        };
        setStateSwitchEstadoEdicion(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSwitchTipoServicioFijoEdicion = (e) => {
        tiposServicioFijo.forEach(servicio => {
            if (e.target.name.includes(servicio.prefix)) {
                if (!e.target.checked) {
                    setValuesFormEdicion({
                        ...valuesFormEdicion,
                        [`precioHora_${servicio.prefix}`]: null,
                        [`variacion_${servicio.prefix}`]: '',
                        [`diaVariacion_${servicio.prefix}`]: '',
                        [`activo_${servicio.prefix}`]: 'si',
                        [`int_${servicio.prefix}`]: false,
                        [`trab_${servicio.prefix}`]: ''
                    });
                };
                setStateSwitchTipoServicioFijoEdicion({
                    ...stateSwitchTipoServicioFijoEdicion,
                    [`${servicio.prefix}`]: e.target.checked
                });
            };
        });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const gestionaTipoRegistroNumTrabajadoresEdicion = (numTrab) => {
        let diferencia;
        let myArray1 = [...horarioIntervencionEdicion.tipoRegistroTrabajador];
        let myArray2 = [...valueTimePickerInicioEdicion];
        let myArray3 = [...valueTimePickerFinEdicion];
        let myArray4 = [...valueTimePickerInicioDescanso1Edicion];
        let myArray5 = [...valueTimePickerFinDescanso1Edicion];
        let myArray6 = [...valueTimePickerInicioDescanso2Edicion];
        let myArray7 = [...valueTimePickerFinDescanso2Edicion];
        let myArray8 = [...valueCantidadHorasEdicion];
        let myArray9 = [...valueTipoServicioEdicion];
        if (numTrab > trabajadoresEdicion.cantidad) {
            diferencia = numTrab - trabajadoresEdicion.cantidad;
            for (let i = 0; i < diferencia; i++) {
                myArray1.push(initialStateHorarioSemana());
                myArray2.push(initialStateSemana(null));
                myArray3.push(initialStateSemana(null));
                myArray4.push(initialStateSemana(null));
                myArray5.push(initialStateSemana(null));
                myArray6.push(initialStateSemana(null));
                myArray7.push(initialStateSemana(null));
                myArray8.push(initialStateSemana(''));
                myArray9.push(initialStateTipoServicio());
            };
        } else {
            diferencia = trabajadoresEdicion.cantidad - numTrab;
            for (let i = 0; i < diferencia; i++) {
                myArray1.pop();
                myArray2.pop();
                myArray3.pop();
                myArray4.pop();
                myArray5.pop();
                myArray6.pop();
                myArray7.pop();
                myArray8.pop();
                myArray9.pop();
            };
        };
        setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, tipoRegistroTrabajador: myArray1 });
        setValueTimePickerInicioEdicion(myArray2);
        setValueTimePickerFinEdicion(myArray3);
        setValueTimePickerInicioDescanso1Edicion(myArray4);
        setValueTimePickerFinDescanso1Edicion(myArray5);
        setValueTimePickerInicioDescanso2Edicion(myArray6);
        setValueTimePickerFinDescanso2Edicion(myArray7);
        setValueCantidadHorasEdicion(myArray8);
        setValueTipoServicioEdicion(myArray9);
    };

    const tituloDialog = "¿Estás seguro que quieres eliminar el Centro?";
    const descripcionDialog = "Para confirmar pulsa 'De acuerdo', de lo contrario pulsa 'No'."

    const handleClickOpenDialog = () => {
        dispatch(abreObjetoDialogAccion('2'));
    };

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(eliminarCentroAccion('centros', valuesFormEdicionGenerales.id));
            //setTimeout(function(){ window.location.reload(); }, 1500);
            dispatch(activarDesactivarAccion(true));
            reseteaContenidoEdicion('nuevo');
            dispatch(vaciarDatosCentrosAccion());
            //dispatch(obtenerCentrosAccion('centros', false));
        };
        dispatch(cierraObjetoDialogAccion());
    };

    useImperativeHandle(ref, () => ({
        funcionesEnCentrosEditar(funcion) {
            switch (funcion) {
                case 'eliminarCentro':
                    const eliminarCentro = () => {
                        handleClickOpenDialog();
                    };
                    eliminarCentro();
                    break;
                case 'procesarDatosEdicion':
                    const procesarDatosEdicion = () => {                  
                        let centroAGuardar;
                        let objCategorias = null;
                        let objHorario = null;
                        let objServiciosFijos = null;
                        let objTrabajadores = null;
                        let objObservaciones = null;
                        let centroDefinitivoAGuardar;
                        if (numeroCuadrantesEdicion.length === 1) {
                            dispatch(procesarDatosPromesa(
                                valuesFormEdicionGenerales,
                                setAlert,
                                setOpenSnack,
                                stateSwitchTipoServicioFijoEdicion,
                                valuesFormEdicion,
                                horarioIntervencionEdicion,
                                trabajadoresEdicion,
                                null
                            )).then(values => {
                                if (values.resuelto) {
                                    //registramos
                                    centroAGuardar = {
                                        id: valuesFormEdicionGenerales.id,
                                        nombre: valuesFormEdicionGenerales.nombre,
                                        sub_nombre: valuesFormEdicionGenerales.subNombre || null,
                                        estado: valuesFormEdicionGenerales.estado,
                                        categoria: valuesFormEdicion.categoria,
                                        observaciones: valuesFormEdicion.observaciones || null,
                                        codigo: valuesFormEdicionGenerales.codigo || null,
                                        domicilio: valuesFormEdicionGenerales.domicilio || null,
                                        codigo_postal: valuesFormEdicionGenerales.codigoPostal || null,
                                        poblacion: valuesFormEdicionGenerales.poblacion || null,
                                        provincia: valuesFormEdicionGenerales.provincia || null,
                                        nif: valuesFormEdicionGenerales.nif || null,
                                        mail: valuesFormEdicionGenerales.mail || null,
                                        mail_2: valuesFormEdicionGenerales.mail2 || null,
                                        telefono: valuesFormEdicionGenerales.telefono || null,
                                        telefono_2: valuesFormEdicionGenerales.telefono2 || null,
                                        forma_pago: valuesFormEdicionGenerales.formaPago,
                                        temp_pago: valuesFormEdicionGenerales.tempPago,
                                        dia_pago: valuesFormEdicionGenerales.diaPago || null,
                                        activo_num_cuenta: valuesFormEdicionGenerales.activoNumCuenta ? 'si' : 'no',
                                        horario: values.horario || null,
                                        servicios_fijos: values.servicios || null,
                                        trabajadores: values.trabajadores || null
                                    };
                                    centroDefinitivoAGuardar = { ...centroAGuardar };
                                    objCategorias = {
                                        objeto: 'categoria',
                                        categoria: []
                                    };
                                    objHorario = {
                                        objeto: 'horario',
                                        horario: []
                                    };
                                    objServiciosFijos = {
                                        objeto: 'serviciosFijos',
                                        gestionEspSF: valuesFormEdicionGenerales.gestionEspSF,
                                        serviciosFijos: []
                                    };
                                    objTrabajadores = {
                                        objeto: 'trabajadores',
                                        trabajadores: []
                                    };
                                    objObservaciones = {
                                        objeto: 'observaciones',
                                        observaciones: []
                                    };
                                    objCategorias.categoria.push(centroAGuardar.categoria);
                                    objObservaciones.observaciones.push(centroAGuardar.observaciones);
                                    if (centroAGuardar.horario) {
                                        objHorario.horario.push(centroAGuardar.horario);
                                    } else {
                                        objHorario.horario.push(null);
                                    };
                                    if (centroAGuardar.servicios_fijos) {
                                        objServiciosFijos.serviciosFijos.push(centroAGuardar.servicios_fijos);
                                    } else {
                                        objServiciosFijos.serviciosFijos.push(null);
                                    };
                                    if (centroAGuardar.trabajadores) {
                                        objTrabajadores.trabajadores.push(centroAGuardar.trabajadores);
                                    } else {
                                        objTrabajadores.trabajadores.push(null);
                                    };
                                    centroDefinitivoAGuardar = {
                                        ...centroDefinitivoAGuardar,
                                        categoria: JSON.stringify(objCategorias),
                                        horario: JSON.stringify(objHorario),
                                        servicios_fijos: JSON.stringify(objServiciosFijos),
                                        trabajadores: JSON.stringify(objTrabajadores),
                                        observaciones: JSON.stringify(objObservaciones)
                                    };
                                    dispatch(actualizarCentroAccion('centros', centroDefinitivoAGuardar.id, centroDefinitivoAGuardar));
                                    dispatch(registrarIntervencionAccion(true));
                                    dispatch(activarDesactivarActualizarCentroAccion(true));
                                };
                            });
                        } else {
                            dispatch(procesarDatosPromesa(
                                valuesFormEdicionGenerales,
                                setAlert,
                                setOpenSnack,
                                stateSwitchTipoServicioFijoEdicion,
                                valuesFormEdicion,
                                horarioIntervencionEdicion,
                                trabajadoresEdicion,
                                null
                            )).then(values => {
                                if (values.resuelto) {
                                    //registramos
                                    centroAGuardar = {
                                        id: valuesFormEdicionGenerales.id,
                                        nombre: valuesFormEdicionGenerales.nombre,
                                        sub_nombre: valuesFormEdicionGenerales.subNombre || null,
                                        estado: valuesFormEdicionGenerales.estado,
                                        categoria: valuesFormEdicion.categoria,
                                        observaciones: valuesFormEdicion.observaciones || null,
                                        codigo: valuesFormEdicionGenerales.codigo || null,
                                        domicilio: valuesFormEdicionGenerales.domicilio || null,
                                        codigo_postal: valuesFormEdicionGenerales.codigoPostal || null,
                                        poblacion: valuesFormEdicionGenerales.poblacion || null,
                                        provincia: valuesFormEdicionGenerales.provincia || null,
                                        nif: valuesFormEdicionGenerales.nif || null,
                                        mail: valuesFormEdicionGenerales.mail || null,
                                        mail_2: valuesFormEdicionGenerales.mail2 || null,
                                        telefono: valuesFormEdicionGenerales.telefono || null,
                                        telefono_2: valuesFormEdicionGenerales.telefono2 || null,
                                        forma_pago: valuesFormEdicionGenerales.formaPago,
                                        temp_pago: valuesFormEdicionGenerales.tempPago,
                                        dia_pago: valuesFormEdicionGenerales.diaPago || null,
                                        activo_num_cuenta: valuesFormEdicionGenerales.activoNumCuenta ? 'si' : 'no',
                                        horario: values.horario || null,
                                        servicios_fijos: values.servicios || null,
                                        trabajadores: values.trabajadores || null,
                                    };
                                    let arrayCuadrantes = [...numeroCuadrantesEdicion];
                                    arrayCuadrantes.forEach((cuadrante, index) => {
                                        if (cuadrante.value === cuadranteEnUsoEdicion) {
                                            cuadrante.cuadrante = {
                                                categoria: valuesFormEdicion.categoria,
                                                observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                                                horario: values.horario ? (values.horario) : null,
                                                servicios_fijos: values.servicios ? (values.servicios) : null,
                                                trabajadores: values.trabajadores ? (values.trabajadores) : null
                                            };
                                            cuadrante.guardado = true;
                                        }
                                    });
                                    centroDefinitivoAGuardar = { ...centroAGuardar };
                                    objCategorias = {
                                        objeto: 'categoria',
                                        categoria: []
                                    };
                                    objHorario = {
                                        objeto: 'horario',
                                        horario: []
                                    };
                                    objServiciosFijos = {
                                        objeto: 'serviciosFijos',
                                        gestionEspSF: valuesFormEdicionGenerales.gestionEspSF,
                                        serviciosFijos: []
                                    };
                                    objTrabajadores = {
                                        objeto: 'trabajadores',
                                        trabajadores: []
                                    };
                                    objObservaciones = {
                                        objeto: 'observaciones',
                                        observaciones: []
                                    };
                                    arrayCuadrantes.forEach((cuadrante, index) => {
                                        if (cuadrante.guardado) {
                                            objCategorias.categoria.push(cuadrante.cuadrante.categoria);
                                            objObservaciones.observaciones.push(cuadrante.cuadrante.observaciones);
                                            if (cuadrante.cuadrante.horario) {
                                                objHorario.horario.push(cuadrante.cuadrante.horario);
                                            } else {
                                                objHorario.horario.push(null);
                                            };
                                            if (cuadrante.cuadrante.servicios_fijos) {
                                                objServiciosFijos.serviciosFijos.push(cuadrante.cuadrante.servicios_fijos);
                                            } else {
                                                objServiciosFijos.serviciosFijos.push(null);
                                            };
                                            if (cuadrante.cuadrante.trabajadores) {
                                                objTrabajadores.trabajadores.push(cuadrante.cuadrante.trabajadores);
                                            } else {
                                                objTrabajadores.trabajadores.push(null);
                                            };
                                        } else {
                                            objCategorias.categoria.push(centroAGuardar.categoria);
                                            objObservaciones.observaciones.push(centroAGuardar.observaciones);
                                            if (centroAGuardar.horario) {
                                                objHorario.horario.push(centroAGuardar.horario);
                                            } else {
                                                objHorario.horario.push(null);
                                            };
                                            if (centroAGuardar.servicios_fijos) {
                                                objServiciosFijos.serviciosFijos.push(centroAGuardar.servicios_fijos);
                                            } else {
                                                objServiciosFijos.serviciosFijos.push(null);
                                            };
                                            if (centroAGuardar.trabajadores) {
                                                objTrabajadores.trabajadores.push(centroAGuardar.trabajadores);
                                            } else {
                                                objTrabajadores.trabajadores.push(null);
                                            };
                                            cuadrante.cuadrante = centroAGuardar;
                                            cuadrante.guardado = true;
                                        };
                                    });
                                    centroDefinitivoAGuardar = {
                                        ...centroDefinitivoAGuardar,
                                        categoria: JSON.stringify(objCategorias),
                                        horario: JSON.stringify(objHorario),
                                        servicios_fijos: JSON.stringify(objServiciosFijos),
                                        trabajadores: JSON.stringify(objTrabajadores),
                                        observaciones: JSON.stringify(objObservaciones)
                                    };
                                    dispatch(actualizarCentroAccion('centros', centroDefinitivoAGuardar.id, centroDefinitivoAGuardar));
                                    dispatch(registrarIntervencionAccion(true));
                                    dispatch(activarDesactivarActualizarCentroAccion(true));
                                };
                            });
                        };
                    };
                    procesarDatosEdicion();
                    break;
                default:
            };
        }
    }));

    const reseteaContenidoEdicion = (accion) => {
        if (accion === 'nuevo') {
            setEstamosCargandoDatos(true);
            forceUpdate();
            setValuesAutocompleteCentrosValores(null);
            setValuesFormEdicion({
                categoria: '',
                variacion: '',
                excepcion: '',
                observaciones: '',
                tipo: '',
                numeroTrabajadores: '',
                datosTrabajadores: [],
                datosSuplentes: [],
                computo: '',
                mensualPactado: null,
                ...tipoServicio.reduce((acc, curr) => {
                    acc[`precioHora_${curr.prefix}`] = null;
                    return acc;
                }, {}),
                ...tiposServicioFijo.reduce((acc, curr) => {
                    acc[`precioHora_${curr.prefix}`] = null;
                    acc[`variacion_${curr.prefix}`] = '';
                    acc[`diaVariacion_${curr.prefix}`] = '';
                    acc[`activo_${curr.prefix}`] = 'si';
                    acc[`int_${curr.prefix}`] = false;
                    acc[`trab_${curr.prefix}`] = '';
                    return acc;
                }, {})
            });
            setValuesFormEdicionGenerales({
                id: null,
                nombre: '',
                subNombre: '',
                estado: 'alta',
                codigo: '',
                domicilio: '',
                codigoPostal: '',
                poblacion: '',
                provincia: '',
                nif: '',
                mail: '',
                mail2: '',
                telefono: '',
                telefono2: '',
                formaPago: '',
                tempPago: '',
                diaPago: '',
                activoNumCuenta: false,
                gestionEspSF: false,
            });
            setNumeroCuadrantesEdicion([{ value: 1, cuadrante: null, guardado: false }]);
            setCuadranteEnUsoEdicion(1);
            setEsInicioCentrosEdicion(true);
        } else {
            setValuesFormEdicion({
                categoria: '',
                variacion: '',
                excepcion: '',
                observaciones: '',
                tipo: '',
                numeroTrabajadores: '',
                datosTrabajadores: [],
                datosSuplentes: [],
                computo: '',
                mensualPactado: null,
                ...tipoServicio.reduce((acc, curr) => {
                    acc[`precioHora_${curr.prefix}`] = null;
                    return acc;
                }, {}),
                ...tiposServicioFijo.reduce((acc, curr) => {
                    acc[`precioHora_${curr.prefix}`] = null;
                    acc[`variacion_${curr.prefix}`] = '';
                    acc[`diaVariacion_${curr.prefix}`] = '';
                    acc[`activo_${curr.prefix}`] = 'si';
                    acc[`int_${curr.prefix}`] = false;
                    acc[`trab_${curr.prefix}`] = '';
                    return acc;
                }, {})
            });
        };
        setValueTimePickerInicioEdicion([initialStateSemana(null)]);
        setValueTimePickerFinEdicion([initialStateSemana(null)]);
        setValueTimePickerInicioDescanso1Edicion([initialStateSemana(null)]);
        setValueTimePickerFinDescanso1Edicion([initialStateSemana(null)]);
        setValueTimePickerInicioDescanso2Edicion([initialStateSemana(null)]);
        setValueTimePickerFinDescanso2Edicion([initialStateSemana(null)]);
        setValueCantidadHorasEdicion([initialStateSemana('')]);
        setValueTipoServicioEdicion([initialStateTipoServicio()]);
        setHorarioIntervencionEdicion({
            tipo: '',
            variacion: '',
            excepcion: '',
            tipoRegistro: 'comun',
            tipoRegistroTrabajador: [initialStateHorarioSemana()],
        });
        setTrabajadoresEdicion({
            cantidad: '',
            trabajadores: []
        });
        setStateSwitchTipoServicioFijoEdicion({
            ...tiposServicioFijo.reduce((acc, curr) => {
                acc[`${curr.prefix}`] = false;
                return acc;
            }, {})
        });
    };

    const handleAnadirCuadranteCentroEdicion = () => {
        dispatch(procesarDatosPromesa(
            valuesFormEdicionGenerales,
            setAlert,
            setOpenSnack,
            stateSwitchTipoServicioFijoEdicion,
            valuesFormEdicion,
            horarioIntervencionEdicion,
            trabajadoresEdicion,
            null
        )).then(values => {
            if (values.resuelto) {
                //registramos
                const centroAGuardar = {
                    categoria: valuesFormEdicion.categoria,
                    observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                    horario: values.horario ? (values.horario) : null,
                    servicios_fijos: values.servicios ? (values.servicios) : null,
                    trabajadores: values.trabajadores ? (values.trabajadores) : null
                };
                let arrayCuadrantes = [...numeroCuadrantesEdicion];
                arrayCuadrantes.forEach((cuadrante, index) => {
                    if (cuadrante.value === cuadranteEnUsoEdicion) {
                        cuadrante.cuadrante = centroAGuardar;
                        cuadrante.guardado = true;
                    }
                });
                arrayCuadrantes.push({ value: numeroCuadrantesEdicion.length + 1, cuadrante: null, guardado: false });
                setNumeroCuadrantesEdicion(arrayCuadrantes);
                setCuadranteEnUsoEdicion(numeroCuadrantesEdicion.length + 1);
                reseteaContenidoEdicion('anadir');
                dispatch(registrarIntervencionAccion(false));
                dispatch(activarDesactivarActualizarCentroAccion(false));
            };
        });
    };

    const handleEliminarCuadranteCentroEdicion = () => {
        let arrayCuadrantes = [...numeroCuadrantesEdicion];
        const posicionCuadrante = arrayCuadrantes.indexOf(arrayCuadrantes.find(cuadrante => cuadrante.value === cuadranteEnUsoEdicion));
        arrayCuadrantes.splice(posicionCuadrante, 1);
        for (let i = 0; i < arrayCuadrantes.length; i++) {
            arrayCuadrantes[i]['value'] = i + 1;
        };
        setNumeroCuadrantesEdicion(arrayCuadrantes);
        setCuadranteEnUsoEdicion(1);
        reseteaContenidoEdicion('anadir');
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
        setEsInicioCentrosEdicion(true);
        setAlert({
            mensaje: "Cuadrante eliminado exitosamente.",
            tipo: 'success'
        })
        setOpenSnack(true);
    };

    const handleChangeCuadranteCentroEdicion = (e) => {
        dispatch(procesarDatosPromesa(
            valuesFormEdicionGenerales,
            setAlert,
            setOpenSnack,
            stateSwitchTipoServicioFijoEdicion,
            valuesFormEdicion,
            horarioIntervencionEdicion,
            trabajadoresEdicion,
            null
        )).then(values => {
            if (values.resuelto) {
                //registramos
                const centroAGuardar = {
                    categoria: valuesFormEdicion.categoria,
                    observaciones: valuesFormEdicion.observaciones ? valuesFormEdicion.observaciones : null,
                    horario: values.horario ? (values.horario) : null,
                    servicios_fijos: values.servicios ? (values.servicios) : null,
                    trabajadores: values.trabajadores ? (values.trabajadores) : null
                };
                let arrayCuadrantes = [...numeroCuadrantesEdicion];
                arrayCuadrantes.forEach((cuadrante, index) => {
                    if (cuadrante.value === cuadranteEnUsoEdicion) {
                        cuadrante.cuadrante = centroAGuardar;
                        cuadrante.guardado = true;
                    }
                });
                setNumeroCuadrantesEdicion(arrayCuadrantes);
                setCuadranteEnUsoEdicion(e.target.value);
                reseteaContenidoEdicion('anadir');
                gestionaContenidoCuadranteEdicion(e.target.value);
            };
        });
    };
    const gestionaContenidoCuadranteEdicion = (elCuadrante) => {
        let cuadranteAGestionarCompleto = numeroCuadrantesEdicion.find(cuadrante => cuadrante.value === elCuadrante);
        let cuadranteAGestionar = cuadranteAGestionarCompleto.cuadrante;
        const arrayTr = [];
        const arraySu = [];
        if (cuadranteAGestionar.trabajadores) {
            if (cuadranteAGestionar.trabajadores.trabajadores.length > 0) {
                cuadranteAGestionar.trabajadores.trabajadores.forEach((trabajadorIterado, index) => {
                    arrayTr.push(trabajadorIterado['trabajador_' + (index + 1)]);
                    arraySu.push(trabajadorIterado['suplente_' + (index + 1)]);
                });
                setTrabajadoresEdicion({
                    ...trabajadoresEdicion,
                    cantidad: cuadranteAGestionar.trabajadores.cantidad,
                    trabajadores: cuadranteAGestionar.trabajadores.trabajadores
                });
            } else {
                setTrabajadoresEdicion({
                    cantidad: '',
                    trabajadores: []
                });
            };
        };
        if (cuadranteAGestionar.horario) {
            if (cuadranteAGestionar.horario.tipoRegistro === 'individual') {
                setStateSwitchTipoRegistro(true);
            } else {
                setStateSwitchTipoRegistro(false);
            };
        };
        if (cuadranteAGestionar.estado === 'baja') {
            setStateSwitchEstadoEdicion(true);
        };
        let myObjetoServiciosFijos = tiposServicioFijo.reduce((acc, curr) => {
            acc[`precioHora_${curr.prefix}`] = null;
            acc[`variacion_${curr.prefix}`] = '';
            acc[`diaVariacion_${curr.prefix}`] = '';
            acc[`activo_${curr.prefix}`] = 'si';
            acc[`int_${curr.prefix}`] = false;
            acc[`trab_${curr.prefix}`] = '';
            return acc;
        }, {});
        let objetoEstadosSwitch = tiposServicioFijo.reduce((acc, curr) => {
            acc[`${curr.prefix}`] = false;
            return acc;
        }, {});
        if (cuadranteAGestionar.servicios_fijos) {
            cuadranteAGestionar.servicios_fijos.servicio.forEach((servicio) => {
                tiposServicioFijo.forEach(prefixObj => {
                    if (servicio[`precioHora_${prefixObj.prefix}`] || servicio[`int_${prefixObj.prefix}`]) {
                        myObjetoServiciosFijos[`precioHora_${prefixObj.prefix}`] = servicio[`precioHora_${prefixObj.prefix}`];
                        myObjetoServiciosFijos[`variacion_${prefixObj.prefix}`] = servicio[`variacion_${prefixObj.prefix}`];
                        myObjetoServiciosFijos[`diaVariacion_${prefixObj.prefix}`] = servicio[`diaVariacion_${prefixObj.prefix}`];
                        myObjetoServiciosFijos[`activo_${prefixObj.prefix}`] = servicio[`activo_${prefixObj.prefix}`];
                        myObjetoServiciosFijos[`int_${prefixObj.prefix}`] = servicio[`int_${prefixObj.prefix}`];
                        myObjetoServiciosFijos[`trab_${prefixObj.prefix}`] = servicio[`trab_${prefixObj.prefix}`];
                        objetoEstadosSwitch[`${prefixObj.prefix}`] = true;
                    };
                });
            });
        };
        setStateSwitchTipoServicioFijoEdicion(objetoEstadosSwitch);
        setValuesFormEdicion({
            categoria: cuadranteAGestionar.categoria,
            variacion: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.variacion : '',
            excepcion: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.excepcion : '',
            observaciones: cuadranteAGestionar.observaciones ? cuadranteAGestionar.observaciones : '',
            tipo: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.tipo : '',
            numeroTrabajadores: cuadranteAGestionar.trabajadores ? cuadranteAGestionar.trabajadores.cantidad : '',
            datosTrabajadores: arrayTr,
            datosSuplentes: arraySu,
            computo: cuadranteAGestionar.horario ? cuadranteAGestionar.horario.computo : '',
            mensualPactado: cuadranteAGestionar.horario?.mensualPactado || null,
            ...tipoServicio.reduce((acc, curr) => {
                acc[`precioHora_${curr.prefix}`] = cuadranteAGestionar.horario && cuadranteAGestionar.horario[`precioHora_${curr.prefix}`] ? cuadranteAGestionar.horario[`precioHora_${curr.prefix}`] : null;
                return acc;
            }, {}),
            ...tiposServicioFijo.reduce((acc, curr) => {
                acc[`precioHora_${curr.prefix}`] = myObjetoServiciosFijos[`precioHora_${curr.prefix}`];
                acc[`variacion_${curr.prefix}`] = myObjetoServiciosFijos[`variacion_${curr.prefix}`];
                acc[`diaVariacion_${curr.prefix}`] = myObjetoServiciosFijos[`diaVariacion_${curr.prefix}`];
                acc[`activo_${curr.prefix}`] = myObjetoServiciosFijos[`activo_${curr.prefix}`];
                acc[`int_${curr.prefix}`] = myObjetoServiciosFijos[`int_${curr.prefix}`];
                acc[`trab_${curr.prefix}`] = myObjetoServiciosFijos[`trab_${curr.prefix}`] || '';
                return acc;
            }, {})
        });
        if (cuadranteAGestionar.horario) {
            if (cuadranteAGestionar.horario.tipo === "rango") {
                const arrayValoresTimePicker1 = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}`] = (registro[`${dia.value}InicioRango`] ? generaFecha(registro[`${dia.value}InicioRango`]) : null);
                        return acc;
                    }, {})
                ));
                const arrayValoresTimePicker2 = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}`] = (registro[`${dia.value}FinRango`] ? generaFecha(registro[`${dia.value}FinRango`]) : null);
                        return acc;
                    }, {})
                ));
                const arrayValoresTimePickerT = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}TipoServicio`] = (registro[`${dia.value}TipoServicio`] ? registro[`${dia.value}TipoServicio`] : '');
                        return acc;
                    }, {})
                ));
                setValueTimePickerInicioEdicion(arrayValoresTimePicker1);
                setValueTimePickerFinEdicion(arrayValoresTimePicker2);
                setValueTipoServicioEdicion(arrayValoresTimePickerT);
            };
            if (cuadranteAGestionar.horario.tipo === "cantidad") {
                const arrayValoresTimePicker1 = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}`] = (registro[`${dia.value}Cantidad`] ? registro[`${dia.value}Cantidad`] : '');
                        return acc;
                    }, {})
                ));
                const arrayValoresTimePickerT = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}TipoServicio`] = (registro[`${dia.value}TipoServicio`] ? registro[`${dia.value}TipoServicio`] : '');
                        return acc;
                    }, {})
                ));
                setValueCantidadHorasEdicion(arrayValoresTimePicker1);
                setValueTipoServicioEdicion(arrayValoresTimePickerT);
            };
            if (cuadranteAGestionar.horario.tipo === "rangoDescanso") {
                const arrayValoresTimePicker1 = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}`] = (registro[`${dia.value}Inicio1RangoDescanso`] ? generaFecha(registro[`${dia.value}Inicio1RangoDescanso`]) : null);
                        return acc;
                    }, {})
                ));
                const arrayValoresTimePicker2 = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}`] = (registro[`${dia.value}Fin1RangoDescanso`] ? generaFecha(registro[`${dia.value}Fin1RangoDescanso`]) : null);
                        return acc;
                    }, {})
                ));
                const arrayValoresTimePicker3 = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}`] = (registro[`${dia.value}Inicio2RangoDescanso`] ? generaFecha(registro[`${dia.value}Inicio2RangoDescanso`]) : null);
                        return acc;
                    }, {})
                ));
                const arrayValoresTimePicker4 = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}`] = (registro[`${dia.value}Fin2RangoDescanso`] ? generaFecha(registro[`${dia.value}Fin2RangoDescanso`]) : null);
                        return acc;
                    }, {})
                ));
                const arrayValoresTimePickerT = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                    diasSemana.reduce((acc, dia) => {
                        acc[`${dia.value}TipoServicio`] = (registro[`${dia.value}TipoServicio`] ? registro[`${dia.value}TipoServicio`] : '');
                        return acc;
                    }, {})
                ));
                setValueTimePickerInicioDescanso1Edicion(arrayValoresTimePicker1);
                setValueTimePickerFinDescanso1Edicion(arrayValoresTimePicker2);
                setValueTimePickerInicioDescanso2Edicion(arrayValoresTimePicker3);
                setValueTimePickerFinDescanso2Edicion(arrayValoresTimePicker4);
                setValueTipoServicioEdicion(arrayValoresTimePickerT);
            };
            const arrayValoresHorario = cuadranteAGestionar.horario.tipoRegistroTrabajador.map(registro => (
                diasSemana.reduce((acc, dia) => {
                    acc[`${dia.value}InicioRango`] = registro[`${dia.value}InicioRango`] || null;
                    acc[`${dia.value}FinRango`] = registro[`${dia.value}FinRango`] || null;
                    acc[`${dia.value}Inicio1RangoDescanso`] = registro[`${dia.value}Inicio1RangoDescanso`] || null;
                    acc[`${dia.value}Fin1RangoDescanso`] = registro[`${dia.value}Fin1RangoDescanso`] || null;
                    acc[`${dia.value}Inicio2RangoDescanso`] = registro[`${dia.value}Inicio2RangoDescanso`] || null;
                    acc[`${dia.value}Fin2RangoDescanso`] = registro[`${dia.value}Fin2RangoDescanso`] || null;
                    acc[`${dia.value}Cantidad`] = registro[`${dia.value}Cantidad`] || '';
                    acc[`${dia.value}TipoServicio`] = registro[`${dia.value}TipoServicio`] || '';
                    return acc;
                }, {})
            ));
            setHorarioIntervencionEdicion({
                tipo: cuadranteAGestionar.horario.tipo,
                variacion: cuadranteAGestionar.horario.variacion,
                excepcion: cuadranteAGestionar.horario.excepcion ? cuadranteAGestionar.horario.excepcion : '',
                tipoRegistro: cuadranteAGestionar.horario.tipoRegistro,
                tipoRegistroTrabajador: arrayValoresHorario
            });
        } else {
            setValueTimePickerInicioEdicion([initialStateSemana(null)]);
            setValueTimePickerFinEdicion([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso1Edicion([initialStateSemana(null)]);
            setValueTimePickerFinDescanso1Edicion([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso2Edicion([initialStateSemana(null)]);
            setValueTimePickerFinDescanso2Edicion([initialStateSemana(null)]);
            setValueCantidadHorasEdicion([initialStateSemana('')]);
            setValueTipoServicioEdicion([initialStateTipoServicio()]);
            setHorarioIntervencionEdicion({
                tipo: '',
                variacion: '',
                excepcion: '',
                tipoRegistro: 'comun',
                tipoRegistroTrabajador: [initialStateHorarioSemana()],
            });
        };
    };

    return (
        <div>
            {/* {console.log(horarioIntervencionEdicion)} */}
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Fragment>
                <Grid
                    container
                    direction="row"
                    justifycontent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item lg={4} sm={6} xs={12}>
                        <Box>
                            <Box
                                m={0.5}
                                color="secondary.contrastText"
                                className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2) : clsx(classes.fondoAlta, classes.boxStl2)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
                            >
                                <Box>Datos generales</Box>
                                <Box
                                    className={clsx(classes.mt_5, classes.mr15)}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={stateSwitchEstadoEdicion}
                                                color="secondary"
                                                style={valuesFormEdicionGenerales.estado === 'baja' ? { color: '#FFFFFF' } : null}
                                                onChange={handleChangeSwitchEstadoEdicion}
                                                disabled={disabledItem}
                                            />
                                        }
                                        label={<Typography variant="body2">Alta / Baja</Typography>}
                                        labelPlacement="start"
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.scrollable} style={{ height: heightScrollable, paddingTop: 20, paddingRight: 10 }}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                >
                                    <Autocomplete
                                        id="form-select-centros"
                                        options={listadoCentros}
                                        onChange={handleChangeSelectCentrosEdicion}
                                        value={valuesAutocompleteCentrosValores || null}
                                        getOptionLabel={(option) => option.nombre ? (option.sub_nombre ? (option.nombre + " - " + option.sub_nombre) : option.nombre) : ''}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Selecciona centro" variant="outlined" />}
                                        className={classes.mb15}
                                        size="small"
                                    />
                                </FormControl>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="space-between"
                                    alignItems="flex-start"
                                >
                                    <Grid item xs={8}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                            disabled={numeroCuadrantesEdicion.length === 1 ? true : false}
                                        >
                                            <InputLabel>Número Cuadrante</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-cuadrante-no-edicion"
                                                label="Número Cuadrante"
                                                value={cuadranteEnUsoEdicion || ''}//modificat: select
                                                onChange={handleChangeCuadranteCentroEdicion}
                                                helpertext="Selecciona nº cuadrante"
                                            >
                                                {numeroCuadrantesEdicion.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Box className={classes.floatRight}>
                                            {esInicioCentrosEdicion ? (
                                                <Fragment>
                                                    <IconButton
                                                        className={classes.btnBorrarCuad}
                                                        disabled={true}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                    <IconButton
                                                        className={classes.paper}
                                                        disabled={true}
                                                    >
                                                        <LibraryAdd />
                                                    </IconButton>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    {numeroCuadrantesEdicion.length > 1 ? (
                                                        <Tooltip title="Borrar cuadrante del centro" placement="top-end" arrow >
                                                            <IconButton
                                                                className={classes.btnBorrarCuad}
                                                                onClick={handleEliminarCuadranteCentroEdicion}
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <IconButton
                                                            className={classes.btnBorrarCuad}
                                                            disabled={true}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    )}
                                                    <Tooltip title="Añadir cuadrante al centro" placement="top-end" arrow >
                                                        <span>
                                                            <IconButton
                                                                className={classes.paper}
                                                                onClick={handleAnadirCuadranteCentroEdicion}
                                                                disabled={numeroCuadrantesEdicion.length > 1}
                                                            >
                                                                <LibraryAdd />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                </Fragment>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Nombre</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-nombre-centro-edicion"
                                        value={valuesFormEdicionGenerales.nombre}
                                        onChange={handleChangeFormEdicionGenerales('nombre')}
                                        labelWidth={60}
                                        disabled={disabledItem}

                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Identificador</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-subNombre-centro-edicion"
                                        value={valuesFormEdicionGenerales.subNombre || ''}//modificat: select
                                        onChange={handleChangeFormEdicionGenerales('subNombre')}
                                        labelWidth={95}
                                        disabled={disabledItem}

                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Categoría Centro</InputLabel>
                                    <Select
                                        fullWidth
                                        className={classes.mb15}
                                        id="form-categoria-edicion"
                                        label="Categoría Centro"
                                        value={valuesFormEdicion.categoria || ''}
                                        onChange={handleChangeFormEdicion('categoria')}
                                        helpertext="Selecciona categoria"
                                        disabled={disabledItem}
                                    >
                                        {categorias.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Código</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-codigo-centro-edicion"
                                                value={valuesFormEdicionGenerales.codigo}
                                                onChange={handleChangeFormEdicionGenerales('codigo')}
                                                labelWidth={55}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>NIF</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-nif-centro-edicion"
                                                value={valuesFormEdicionGenerales.nif}
                                                onChange={handleChangeFormEdicionGenerales('nif')}
                                                labelWidth={30}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>E-mail</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-mail-centro-edicion"
                                        value={valuesFormEdicionGenerales.mail}
                                        onChange={handleChangeFormEdicionGenerales('mail')}
                                        labelWidth={55}
                                        disabled={disabledItem}
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>E-mail 2</InputLabel>
                                    <OutlinedInput
                                        className={classes.mb15}
                                        fullWidth
                                        id="form-mail2-centro-edicion"
                                        value={valuesFormEdicionGenerales.mail2}
                                        onChange={handleChangeFormEdicionGenerales('mail2')}
                                        labelWidth={65}
                                        disabled={disabledItem}
                                    />
                                </FormControl>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Domicilio</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-domicilio-centro-edicion"
                                                value={valuesFormEdicionGenerales.domicilio}
                                                onChange={handleChangeFormEdicionGenerales('domicilio')}
                                                labelWidth={70}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>C.P.</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-codigoPostal-centro-edicion"
                                                value={valuesFormEdicionGenerales.codigoPostal}
                                                onChange={handleChangeFormEdicionGenerales('codigoPostal')}
                                                labelWidth={35}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Población</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-poblacion-centro-edicion"
                                                value={valuesFormEdicionGenerales.poblacion}
                                                onChange={handleChangeFormEdicionGenerales('poblacion')}
                                                labelWidth={75}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Provincia</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-provincia-centro-edicion"
                                                value={valuesFormEdicionGenerales.provincia}
                                                onChange={handleChangeFormEdicionGenerales('provincia')}
                                                labelWidth={75}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Teléfono 1</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-telefono-centro-edicion"
                                                value={valuesFormEdicionGenerales.telefono}
                                                onChange={handleChangeFormEdicionGenerales('telefono')}
                                                labelWidth={80}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Teléfono 2</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-telefono2-centro-edicion"
                                                value={valuesFormEdicionGenerales.telefono2}
                                                onChange={handleChangeFormEdicionGenerales('telefono2')}
                                                labelWidth={80}
                                                disabled={disabledItem}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={8} sm={6} xs={12}>
                        <div className={classes.root2} style={{ marginTop: 5 }}>
                            <AppBar position="static" className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja) : clsx(classes.fondoAlta)}>
                                <Tabs value={valueTabCentrosEdicion} onChange={handleChangeTabCentrosEdicion} className={classes.tabsStl}>
                                    <Tab label="Trabajadores" {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Horario" {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Servicios extra" {...a11yProps(2)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Forma de pago" {...a11yProps(3)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Observaciones" {...a11yProps(4)} style={{ paddingBottom: 10 }} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTabCentrosEdicion} index={0} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item lg={6} sm={6} xs={12}>
                                    <Box>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Trabajadores asignados</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-tipo-trabajadores"
                                                label="Trabajadores asignados"
                                                value={valuesFormEdicion.numeroTrabajadores || ''}
                                                onChange={handleChangeFormEdicion('numeroTrabajadores')}
                                                helpertext="Selecciona número de trabajadores"
                                                disabled={disabledItem}
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {totalTrabajadores.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {trabajadoresEdicion.cantidad !== '' && (
                                            <SelectsTrabajadores
                                                trabajadores={trabajadoresEdicion}
                                                valuesForm={valuesFormEdicion || ''}//modificat: select
                                                setValuesForm={setValuesFormEdicion}
                                                setTrabajadores={setTrabajadoresEdicion}
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={1} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={4}
                                >
                                    <Grid item lg={4} sm={4} xs={12}>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Modo entrada datos</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-tipo-edicion"
                                                label="Modo entrada datos"
                                                value={valuesFormEdicion.tipo || ''}
                                                onChange={handleChangeFormEdicion('tipo')}
                                                helpertext="Selecciona Modo entrada datos"
                                                disabled={disabledItem}
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {tipos.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Variaciones</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-variaciones-edicion"
                                                label="Variaciones"
                                                value={valuesFormEdicion.variacion || ''}//modificat: select
                                                onChange={handleChangeFormEdicion('variacion')}
                                                helpertext="Selecciona variaciones"
                                                disabled={disabledItem}
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {variaciones.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Excepciones</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb25}
                                                id="form-excepciones-edicion"
                                                label="Excepciones"
                                                value={valuesFormEdicion.excepcion || ''}//modificat: select
                                                onChange={handleChangeFormEdicion('excepcion')}
                                                helpertext="Selecciona excepciones"
                                                disabled={disabledItem}
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {excepciones.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Box
                                            m={0.5}
                                            color="secondary.contrastText"
                                            className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb20) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
                                        >
                                            Cómputo de horas
                                        </Box>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Tipo cómputo</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-tipo-computo-edicion"
                                                label="Tipo cómputo"
                                                value={valuesFormEdicion.computo || ''}
                                                onChange={handleChangeFormEdicion('computo')}
                                                helpertext="Selecciona cómputo de horas"
                                                disabled={disabledItem}
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {computoHoras.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {valuesFormEdicion.computo === 1 || valuesFormEdicion.computo === 3 ? (
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>Mensual pactado</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
                                                    fullWidth
                                                    id="form-mensual-pactado-edicion"
                                                    value={valuesFormEdicion.mensualPactado || ''}
                                                    onChange={handleChangeFormEdicion('mensualPactado')}
                                                    labelWidth={130}
                                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                />
                                            </FormControl>
                                        ) : null}
                                        {valuesFormEdicion.computo === 2 || valuesFormEdicion.computo === 3 ? (
                                            <Fragment>
                                                {tipoServicio.map((servicio, index) => (
                                                    <Fragment key={`tipoServicio-${index}`}>
                                                        <FormControl
                                                            variant="outlined"
                                                            className={classes.form}
                                                            size="small"
                                                        >
                                                            <InputLabel>{`Precio hora ${servicio.value}`}</InputLabel>
                                                            <OutlinedInput
                                                                className={classes.mb15}
                                                                fullWidth
                                                                id={`form-precio-hora_${servicio.prefix}-edicion`}
                                                                value={valuesFormEdicion[`precioHora_${servicio.prefix}`] || ''}
                                                                onChange={handleChangeFormEdicion(`precioHora_${servicio.prefix}`)}
                                                                labelWidth={lengthLabelServicio[servicio.value.length]}
                                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                            />
                                                        </FormControl>
                                                        <Box className={classes.boxMiniServicios}>
                                                            <Typography
                                                                className={classes.labelBoxMiniServicios}
                                                            >
                                                                {servicio.label.charAt(0) + servicio.label.slice(1).toLowerCase().replace(/_/g, ' ')}
                                                            </Typography>
                                                        </Box>
                                                    </Fragment>
                                                ))}
                                            </Fragment>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={8} sm={8} xs={12}>
                                        <Box style={{ marginTop: -10 }}>
                                            {valuesFormEdicion.tipo !== '' ? (
                                                <Box
                                                    m={0.5}
                                                    color="secondary.contrastText"
                                                    className={valuesFormEdicionGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb10, classes.mt15) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb10, classes.mt15)}
                                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
                                                >
                                                    <Box>Tipo de registro</Box>
                                                    <Box
                                                        className={clsx(classes.mt_5, classes.mr15)}
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={stateSwitchTipoRegistro}
                                                                    style={valuesFormEdicionGenerales.estado === 'baja' ? { color: '#FFFFFF' } : null}
                                                                    color="secondary"
                                                                    onChange={handleChangeSwitchTipoRegistroEdicion}
                                                                />
                                                            }
                                                            label={<Typography variant="body2">Común / Individual</Typography>}
                                                            labelPlacement="start"
                                                        />
                                                    </Box>
                                                </Box>
                                            ) : null}
                                            <List >
                                                {horarioIntervencionEdicion.tipoRegistroTrabajador.map((item, index) => (
                                                    <HorarioCentros
                                                        key={'horario-' + index}
                                                        tipo={valuesFormEdicion.tipo}
                                                        index={index}
                                                        disabledItem={disabledItem}
                                                        horarioIntervencion={horarioIntervencionEdicion}
                                                        valueTimePickerInicio={valueTimePickerInicioEdicion}
                                                        valueTimePickerFin={valueTimePickerFinEdicion}
                                                        valueTimePickerInicioDescanso1={valueTimePickerInicioDescanso1Edicion}
                                                        valueTimePickerInicioDescanso2={valueTimePickerInicioDescanso2Edicion}
                                                        valueTimePickerFinDescanso1={valueTimePickerFinDescanso1Edicion}
                                                        valueTimePickerFinDescanso2={valueTimePickerFinDescanso2Edicion}
                                                        valueCantidadHoras={valueCantidadHorasEdicion}
                                                        valueTipoServicio={valueTipoServicioEdicion}
                                                        setHorarioIntervencion={setHorarioIntervencionEdicion}
                                                        setValueTimePickerInicio={setValueTimePickerInicioEdicion}
                                                        setValueTimePickerFin={setValueTimePickerFinEdicion}
                                                        setValueTimePickerInicioDescanso1={setValueTimePickerInicioDescanso1Edicion}
                                                        setValueTimePickerInicioDescanso2={setValueTimePickerInicioDescanso2Edicion}
                                                        setValueTimePickerFinDescanso1={setValueTimePickerFinDescanso1Edicion}
                                                        setValueTimePickerFinDescanso2={setValueTimePickerFinDescanso2Edicion}
                                                        setValueTipoServicio={setValueTipoServicioEdicion}
                                                        setValueCantidadHoras={setValueCantidadHorasEdicion}
                                                    />
                                                ))}
                                            </List>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={2} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item xs={12}>
                                    <Box style={{ paddingLeft: 10, marginTop: 10 }}>
                                        {tiposServicioFijo.map((tipo, index) => (
                                            <TipoServicioFijo
                                                key={"tipoServicio-" + index}
                                                formato={"centros"}
                                                tipo={tipo}
                                                index={index}
                                                stateSwitchTipoServicioFijo={stateSwitchTipoServicioFijoEdicion}
                                                valuesForm={valuesFormEdicion}
                                                handleChangeSwitchTipoServicioFijo={handleChangeSwitchTipoServicioFijoEdicion}
                                                disabledItem={disabledItem}
                                                handleChangeForm={handleChangeFormEdicion}
                                            />
                                        ))}
                                    </Box>
                                    <Box
                                        style={{ marginLeft: 10, marginTop: 10, marginBottom: 20 }}
                                        className={disabledItem ? classes.boxChekinSinHover : classes.boxChekin}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={valuesFormEdicionGenerales.gestionEspSF || false}
                                                    onChange={handleChangeFormEdicionGenerales('gestionEspSF')}
                                                    name="checkedGestEsp-edicion"
                                                    color="secondary"
                                                    disabled={disabledItem || Object.values(stateSwitchTipoServicioFijoEdicion).every(value => value === false)}
                                                />
                                            }
                                            label={<Typography className={classes.colorText} style={{ fontSize: '0.9rem' }}>Gestión especial horas para Servicios Extra.</Typography>}
                                        />
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={3} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item lg={6} sm={6} xs={12}>
                                    <Box>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Forma pago</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-formaPago-edicion"
                                                label="Forma pago"
                                                value={valuesFormEdicionGenerales.formaPago || ''}
                                                onChange={handleChangeFormEdicionGenerales('formaPago')}
                                                helpertext="Selecciona la forma de pago"
                                                disabled={disabledItem}
                                            >
                                                {formasDePago.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Vencimiento</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-diaPago-edicion"
                                                label="Vencimiento"
                                                value={valuesFormEdicionGenerales.diaPago || ''}
                                                onChange={handleChangeFormEdicionGenerales('diaPago')}
                                                helpertext="Selecciona día vencimiento"
                                                disabled={disabledItem}
                                            >
                                                <MenuItem value=''>
                                                    <em>No</em>
                                                </MenuItem>
                                                {diaDelPago.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Temporización</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb20}
                                                id="form-tempPago-edicion"
                                                label="Temporización"
                                                value={valuesFormEdicionGenerales.tempPago || ''}
                                                onChange={handleChangeFormEdicionGenerales('tempPago')}
                                                helpertext="Selecciona temporización del pago"
                                                disabled={disabledItem}
                                            >
                                                {temporizacionDelPago.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Box className={disabledItem ? classes.boxChekinSinHover : classes.boxChekin}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={valuesFormEdicionGenerales.activoNumCuenta || false}
                                                        onChange={handleChangeFormEdicionGenerales('activoNumCuenta')}
                                                        name="checkedNumCuenta-edicion"
                                                        color="secondary"
                                                        disabled={disabledItem}
                                                    />
                                                }
                                                label={<Typography className={classes.colorText} style={{ fontSize: '0.9rem' }}>Activar línea número de cuenta en Factura Factusol.</Typography>}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosEdicion} index={4} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item lg={6} sm={6} xs={12}>
                                    <TextField
                                        label="Observaciones"
                                        id="form-observaciones-edicion"
                                        value={valuesFormEdicion.observaciones || ''}
                                        className={clsx(classes.form, classes.mb25)}
                                        fullWidth
                                        placeholder={'Observaciones Cuadrante ' + cuadranteEnUsoEdicion}
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        onChange={handleChangeFormEdicion('observaciones')}
                                        disabled={disabledItem}
                                    />
                                </Grid>
                            </TabPanel>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
            <DialogComponente
                prIsOpen={openDialog2}
                prHandleCloseDialogBotones={handleCloseDialogBotones}
                prTituloDialog={tituloDialog}
                prDescripcionDialog={descripcionDialog}
            />
        </div >
    )
})

export default CentrosEditar
