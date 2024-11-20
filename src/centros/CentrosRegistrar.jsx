import React, { useState, useEffect, Fragment, forwardRef, useImperativeHandle } from 'react';
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
    Checkbox,
    Button,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from '@material-ui/core';
import {
    LibraryAdd,
    Delete,
    Save as SaveIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { es } from "date-fns/locale";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

//carga componentes
import HorarioCentros from './componentes/HorarioCentros';
import TipoServicioFijo from '../comun/TipoServicioFijo';
import CustomSnack from '../comun/CustomSnack';
import SelectsTrabajadores from './componentes/SelectsTrabajadores';

//estilos
import Clases from "../clases";

//importaciones acciones
import {
    registrarCentroAccion,
    activarDesactivarNuevoCentroAccion,
    activarDesactivarRegistrarCentroAccion,
    obtenerCentrosAccion,
    cambiarEstadoYaEstaRegistradoAccion
} from '../redux/centrosDucks';
import {
    obtenerTrabajadoresAccion,
    obtenerTrabajadoresSubcategoriaAccion
} from '../redux/trabajadoresDucks';
import {
    registrarIntervencionAccion,
    onEstemAccion,
    activarDesactivarAccion,
    generaFechaAccion,
    cierraObjetoDialogAccion,
    retornaAnoMesDiaAccion
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
    DIAS_SEMANA: diasSemana,    
    CALENDARIO_FESTIVOS: arrayFestivos
} = Constantes;

const CentrosRegistrar = forwardRef((props, ref) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const exitoRegistroCentro = useSelector(store => store.variablesCentros.exitoRegistroCentro);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const listadoCentros = useSelector(store => store.variablesCentros.arrayCentros);
    const trabajadoresCargados = useSelector(store => store.variablesTrabajadores.trabajadoresCargados);

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesFormRegistro, setValuesFormRegistro] = useState({
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
        }, {}),
        festivos: null
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
    const [valueTimePickerInicioRegistro, setValueTimePickerInicioRegistro] = useState([initialStateSemana(null)]);
    const [valueTimePickerFinRegistro, setValueTimePickerFinRegistro] = useState([initialStateSemana(null)]);
    const [valueTimePickerInicioDescanso1Registro, setValueTimePickerInicioDescanso1Registro] = useState([initialStateSemana(null)]);
    const [valueTimePickerFinDescanso1Registro, setValueTimePickerFinDescanso1Registro] = useState([initialStateSemana(null)]);
    const [valueTimePickerInicioDescanso2Registro, setValueTimePickerInicioDescanso2Registro] = useState([initialStateSemana(null)]);
    const [valueTimePickerFinDescanso2Registro, setValueTimePickerFinDescanso2Registro] = useState([initialStateSemana(null)]);
    const [valueCantidadHorasRegistro, setValueCantidadHorasRegistro] = useState([initialStateSemana('')]);
    const [valueTipoServicioRegistro, setValueTipoServicioRegistro] = useState([initialStateTipoServicio()]);
    const [horarioIntervencionRegistro, setHorarioIntervencionRegistro] = useState({
        tipo: '',
        variacion: '',
        excepcion: '',
        tipoRegistro: 'comun',
        tipoRegistroTrabajador: [initialStateHorarioSemana()],
    });
    const [trabajadoresRegistro, setTrabajadoresRegistro] = useState({
        cantidad: '',
        trabajadores: []
    });
    const [openLoading, setOpenLoading] = useState(false);
    const [stateSwitchTipoRegistro, setStateSwitchTipoRegistro] = useState(false);
    const [stateSwitchEstadoRegistro, setStateSwitchEstadoRegistro] = useState(false);
    const [valueTabCentrosRegistro, setValueTabCentrosRegistro] = useState(0);
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable(260));
    const [stateSwitchTipoServicioFijoRegistro, setStateSwitchTipoServicioFijoRegistro] = useState({
        ...tiposServicioFijo.reduce((acc, curr) => {
            acc[`${curr.prefix}`] = false;
            return acc;
        }, {})
    });
    const [numeroCuadrantesRegistro, setNumeroCuadrantesRegistro] = useState([{ value: 1, cuadrante: null, guardado: false }]);
    const [cuadranteEnUsoRegistro, setCuadranteEnUsoRegistro] = useState(1);
    const [esInicioCentrosRegistro, setEsInicioCentrosRegistro] = useState(true);
    const [valuesFormRegistroGenerales, setValuesFormRegistroGenerales] = useState({
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
        gestionEspSF: false
    });
    const lengthLabelServicio = {
        3: 120,
        4: 130,
        5: 140,
        6: 150
    };
    const [datosFestivosRegistro, setDatosFestivosRegistro] = useState({
        dia: null,
        descripcion: ''
    });

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
        dispatch(onEstemAccion('registrarCentros'));
        listadoTrabajadores.length === 0
            ? dispatch(obtenerTrabajadoresAccion('trabajadores', false))
            : trabajadoresCargados && dispatch(obtenerTrabajadoresSubcategoriaAccion(2));
        listadoCentros.length === 0 && dispatch(obtenerCentrosAccion('centros', false));
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
        if (exitoRegistroCentro) {
            setAlert({
                mensaje: "Registro creado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        };
    }, [exitoRegistroCentro]);

    useEffect(() => {
        if (horarioIntervencionRegistro.tipoRegistro === 'individual') {
            let myArray1 = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
            let myArray2 = [...valueTimePickerInicioRegistro];
            let myArray3 = [...valueTimePickerFinRegistro];
            let myArray4 = [...valueTimePickerInicioDescanso1Registro];
            let myArray5 = [...valueTimePickerFinDescanso1Registro];
            let myArray6 = [...valueTimePickerInicioDescanso2Registro];
            let myArray7 = [...valueTimePickerFinDescanso2Registro];
            let myArray8 = [...valueCantidadHorasRegistro];
            let myArray9 = [...valueTipoServicioRegistro];
            for (let i = 1; i < trabajadoresRegistro.cantidad; i++) {
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
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioRegistro(myArray2);
            setValueTimePickerFinRegistro(myArray3);
            setValueTimePickerInicioDescanso1Registro(myArray4);
            setValueTimePickerFinDescanso1Registro(myArray5);
            setValueTimePickerInicioDescanso2Registro(myArray6);
            setValueTimePickerFinDescanso2Registro(myArray7);
            setValueCantidadHorasRegistro(myArray8);
            setValueTipoServicioRegistro(myArray9);
        };
    }, [horarioIntervencionRegistro.tipoRegistro]);

    useEffect(() => {
        if (!openLoadingCentros && !openLoadingTrabajadores) {
            setOpenLoading(false);
        } else {
            setOpenLoading(true);
        };
    }, [openLoadingCentros, openLoadingTrabajadores]);

    useEffect(() => {
        if (esInicioCentrosRegistro) {
            if (numeroCuadrantesRegistro[0].guardado) {
                gestionaContenidoCuadranteRegistro(1);
                setEsInicioCentrosRegistro(false);
            };
        };
    }, [numeroCuadrantesRegistro]);

    //funciones

    const handleChangeTabCentrosRegistro = (event, newValue) => {
        setValueTabCentrosRegistro(newValue);
    };

    const generaFecha = (datoHorario) => {
        return dispatch(generaFechaAccion(datoHorario));
    };

    const handleChangeFormRegistro = (prop) => (e) => {
        if (prop === "categoria") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "variacion") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, variacion: e.target.value });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "excepcion") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, excepcion: e.target.value });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "computo") {
            setValuesFormRegistro({
                ...valuesFormRegistro, [prop]: e.target.value,
                mensualPactado: null,
                ...tipoServicio.reduce((acc, curr) => {
                    acc[`precioHora_${curr.prefix}`] = null;
                    return acc;
                }, {})
            });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "mensualPactado") {
            if (IsNumeric(e.target.value)) {
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
                dispatch(activarDesactivarRegistrarCentroAccion(false));
            }
            return;
        };
        const precioHoraSProp = tipoServicio.some(servicio => prop === `precioHora_${servicio.prefix}`);
        const precioHoraSFProp = tiposServicioFijo.some(servicio => prop === `precioHora_${servicio.prefix}`);
        if (precioHoraSProp || precioHoraSFProp) {
            if (IsNumeric(e.target.value)) {
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
                dispatch(activarDesactivarRegistrarCentroAccion(false));
            };
            return;
        };
        const intProp = tiposServicioFijo.some(servicio => prop === `int_${servicio.prefix}`);
        if (intProp) {
            if (e.target.checked) {
                const [, elServicio] = prop.split("_");
                setValuesFormRegistro({
                    ...valuesFormRegistro,
                    ['diaVariacion_' + elServicio]: '',
                    ['precioHora_' + elServicio]: null,
                    ['variacion_' + elServicio]: '',
                    [prop]: e.target.checked
                });
                dispatch(activarDesactivarRegistrarCentroAccion(false));
                return;
            } else {
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.checked });
                dispatch(activarDesactivarRegistrarCentroAccion(false));
                return;
            };
        };
        if (prop === "tipo") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setStateSwitchTipoRegistro(false);
            setHorarioIntervencionRegistro({
                ...horarioIntervencionRegistro,
                tipo: e.target.value,
                tipoRegistro: 'comun',
                tipoRegistroTrabajador: [initialStateHorarioSemana()],
            });
            setValueTimePickerInicioRegistro([initialStateSemana(null)]);
            setValueTimePickerFinRegistro([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso1Registro([initialStateSemana(null)]);
            setValueTimePickerFinDescanso1Registro([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso2Registro([initialStateSemana(null)]);
            setValueTimePickerFinDescanso2Registro([initialStateSemana(null)]);
            setValueCantidadHorasRegistro([initialStateSemana('')]);
            setValueTipoServicioRegistro([initialStateTipoServicio()]);
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        }
        if (prop === "numeroTrabajadores") {
            if (horarioIntervencionRegistro.tipoRegistro !== 'comun') {
                if (e.target.value === 1) {
                    setAlert({
                        mensaje: "El número de trabajadores en tipo de registro individual debe ser mayor que uno.",
                        tipo: 'warning'
                    })
                    setOpenSnack(true);
                    return;
                };
                gestionaTipoRegistroNumTrabajadoresRegistro(e.target.value);
            };
            if (e.target.value > valuesFormRegistro.datosTrabajadores.length) {
                let vecesMayor = e.target.value - valuesFormRegistro.datosTrabajadores.length;
                let arrayTr = [...valuesFormRegistro.datosTrabajadores];
                let arraySu = [...valuesFormRegistro.datosSuplentes];
                let arrayTrEd = [...trabajadoresRegistro.trabajadores];
                for (let i = 0; i < vecesMayor; i++) {
                    arrayTrEd[valuesFormRegistro.datosTrabajadores.length + i] = {};
                    arrayTrEd[valuesFormRegistro.datosTrabajadores.length + i]['trabajador_' + (valuesFormRegistro.datosTrabajadores.length + 1 + i)] = '';
                    arrayTrEd[valuesFormRegistro.datosTrabajadores.length + i]['suplente_' + (valuesFormRegistro.datosTrabajadores.length + 1 + i)] = '';
                    arrayTr.push("");
                    arraySu.push("");
                };
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresRegistro({ ...trabajadoresRegistro, cantidad: e.target.value, trabajadores: arrayTrEd });
            } else {
                let vecesMenor = valuesFormRegistro.datosTrabajadores.length - e.target.value;
                let arrayTr = [...valuesFormRegistro.datosTrabajadores];
                let arraySu = [...valuesFormRegistro.datosSuplentes];
                let arrayTrEd = [...trabajadoresRegistro.trabajadores];
                for (let i = 0; i < vecesMenor; i++) {
                    arrayTr.pop();
                    arraySu.pop();
                    arrayTrEd.pop();
                };
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value, datosTrabajadores: arrayTr, datosSuplentes: arraySu });
                setTrabajadoresRegistro({ ...trabajadoresRegistro, cantidad: e.target.value, trabajadores: arrayTrEd });
            };
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeFormRegistroGenerales = (prop) => (e) => {
        if (prop === "activoNumCuenta") {
            setValuesFormRegistroGenerales({ ...valuesFormRegistroGenerales, [prop]: e.target.checked });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "gestionEspSF") {
            setValuesFormRegistroGenerales({ ...valuesFormRegistroGenerales, [prop]: e.target.checked });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        setValuesFormRegistroGenerales({ ...valuesFormRegistroGenerales, [prop]: e.target.value });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSwitchTipoRegistroRegistro = (e) => {
        if (e.target.checked) {
            if (trabajadoresRegistro.cantidad > 1) {
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistro: 'individual' });
            } else {
                setAlert({
                    mensaje: "Para seleccionar este tipo de registro debe haber más de un trabajador asignado.",
                    tipo: 'warning'
                })
                setOpenSnack(true);
                return;
            };
        } else {
            let myArray1 = [horarioIntervencionRegistro.tipoRegistroTrabajador[0]];
            let myArray2 = [valueTimePickerInicioRegistro[0]];
            let myArray3 = [valueTimePickerFinRegistro[0]];
            let myArray4 = [valueTimePickerInicioDescanso1Registro[0]];
            let myArray5 = [valueTimePickerFinDescanso1Registro[0]];
            let myArray6 = [valueTimePickerInicioDescanso2Registro[0]];
            let myArray7 = [valueTimePickerFinDescanso2Registro[0]];
            let myArray8 = [valueCantidadHorasRegistro[0]];
            let myArray9 = [valueTipoServicioRegistro[0]];
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistro: 'comun', tipoRegistroTrabajador: myArray1 });
            setValueTimePickerInicioRegistro(myArray2);
            setValueTimePickerFinRegistro(myArray3);
            setValueTimePickerInicioDescanso1Registro(myArray4);
            setValueTimePickerFinDescanso1Registro(myArray5);
            setValueTimePickerInicioDescanso2Registro(myArray6);
            setValueTimePickerFinDescanso2Registro(myArray7);
            setValueCantidadHorasRegistro(myArray8);
            setValueTipoServicioRegistro(myArray9);
        };
        setStateSwitchTipoRegistro(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSwitchEstadoRegistro = (e) => {
        if (e.target.checked) {
            setValuesFormRegistroGenerales({ ...valuesFormRegistroGenerales, estado: 'baja' });
        } else {
            setValuesFormRegistroGenerales({ ...valuesFormRegistroGenerales, estado: 'alta' });
        };
        setStateSwitchEstadoRegistro(e.target.checked);
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSwitchTipoServicioFijoRegistro = (e) => {
        tiposServicioFijo.forEach(servicio => {
            if (e.target.name.includes(servicio.prefix)) {
                if (!e.target.checked) {
                    setValuesFormRegistro({
                        ...valuesFormRegistro,
                        [`precioHora_${servicio.prefix}`]: null,
                        [`variacion_${servicio.prefix}`]: '',
                        [`diaVariacion_${servicio.prefix}`]: '',
                        [`activo_${servicio.prefix}`]: 'si',
                        [`int_${servicio.prefix}`]: false,
                        [`trab_${servicio.prefix}`]: ''
                    });
                };
                setStateSwitchTipoServicioFijoRegistro({
                    ...stateSwitchTipoServicioFijoRegistro,
                    [`${servicio.prefix}`]: e.target.checked
                });
            };
        });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const gestionaTipoRegistroNumTrabajadoresRegistro = (numTrab) => {
        let diferencia;
        let myArray1 = [...horarioIntervencionRegistro.tipoRegistroTrabajador];
        let myArray2 = [...valueTimePickerInicioRegistro];
        let myArray3 = [...valueTimePickerFinRegistro];
        let myArray4 = [...valueTimePickerInicioDescanso1Registro];
        let myArray5 = [...valueTimePickerFinDescanso1Registro];
        let myArray6 = [...valueTimePickerInicioDescanso2Registro];
        let myArray7 = [...valueTimePickerFinDescanso2Registro];
        let myArray8 = [...valueCantidadHorasRegistro];
        let myArray9 = [...valueTipoServicioRegistro];
        if (numTrab > trabajadoresRegistro.cantidad) {
            diferencia = numTrab - trabajadoresRegistro.cantidad;
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
            diferencia = trabajadoresRegistro.cantidad - numTrab;
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
        setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, tipoRegistroTrabajador: myArray1 });
        setValueTimePickerInicioRegistro(myArray2);
        setValueTimePickerFinRegistro(myArray3);
        setValueTimePickerInicioDescanso1Registro(myArray4);
        setValueTimePickerFinDescanso1Registro(myArray5);
        setValueTimePickerInicioDescanso2Registro(myArray6);
        setValueTimePickerFinDescanso2Registro(myArray7);
        setValueCantidadHorasRegistro(myArray8);
        setValueTipoServicioRegistro(myArray9);
    };

    useImperativeHandle(ref, () => ({
        funcionesEnCentrosRegistrar(funcion) {
            switch (funcion) {
                case 'nuevoCentro':
                    const nuevoCentro = () => {
                        dispatch(activarDesactivarNuevoCentroAccion(true));
                        reseteaContenidoRegistro('nuevo');
                    };
                    nuevoCentro();
                    break;
                case 'procesarDatosRegistro':
                    const procesarDatosRegistro = () => {
                        let centroAGuardar;
                        let objCategorias = null;
                        let objHorario = null;
                        let objServiciosFijos = null;
                        let objTrabajadores = null;
                        let objObservaciones = null;
                        let centroDefinitivoAGuardar;
                        let objFestivos = null;
                        if (numeroCuadrantesRegistro.length === 1) {
                            dispatch(procesarDatosPromesa(
                                valuesFormRegistroGenerales,
                                setAlert,
                                setOpenSnack,
                                stateSwitchTipoServicioFijoRegistro,
                                valuesFormRegistro,
                                horarioIntervencionRegistro,
                                trabajadoresRegistro,
                                null
                            )).then(values => {
                                if (values.resuelto) {
                                    //registramos
                                    centroAGuardar = {
                                        id: valuesFormRegistroGenerales.id,
                                        nombre: valuesFormRegistroGenerales.nombre,
                                        sub_nombre: valuesFormRegistroGenerales.subNombre || null,
                                        estado: valuesFormRegistroGenerales.estado,
                                        categoria: valuesFormRegistro.categoria,
                                        observaciones: valuesFormRegistro.observaciones ? valuesFormRegistro.observaciones : null,
                                        codigo: valuesFormRegistroGenerales.codigo ? valuesFormRegistroGenerales.codigo : null,
                                        domicilio: valuesFormRegistroGenerales.domicilio ? valuesFormRegistroGenerales.domicilio : null,
                                        codigo_postal: valuesFormRegistroGenerales.codigoPostal ? valuesFormRegistroGenerales.codigoPostal : null,
                                        poblacion: valuesFormRegistroGenerales.poblacion ? valuesFormRegistroGenerales.poblacion : null,
                                        provincia: valuesFormRegistroGenerales.provincia ? valuesFormRegistroGenerales.provincia : null,
                                        nif: valuesFormRegistroGenerales.nif ? valuesFormRegistroGenerales.nif : null,
                                        mail: valuesFormRegistroGenerales.mail ? valuesFormRegistroGenerales.mail : null,
                                        mail_2: valuesFormRegistroGenerales.mail2 ? valuesFormRegistroGenerales.mail2 : null,
                                        telefono: valuesFormRegistroGenerales.telefono ? valuesFormRegistroGenerales.telefono : null,
                                        telefono_2: valuesFormRegistroGenerales.telefono2 ? valuesFormRegistroGenerales.telefono2 : null,
                                        forma_pago: valuesFormRegistroGenerales.formaPago,
                                        temp_pago: valuesFormRegistroGenerales.tempPago,
                                        dia_pago: valuesFormRegistroGenerales.diaPago ? valuesFormRegistroGenerales.diaPago : null,
                                        activo_num_cuenta: valuesFormRegistroGenerales.activoNumCuenta ? 'si' : 'no',
                                        horario: values.horario ? (values.horario) : null,
                                        servicios_fijos: values.servicios ? (values.servicios) : null,
                                        trabajadores: values.trabajadores ? (values.trabajadores) : null,
                                        festivos: valuesFormRegistro.festivos || null
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
                                        gestionEspSF: valuesFormRegistroGenerales.gestionEspSF,
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
                                    objFestivos = {
                                        objeto: 'festivos',
                                        festivos: []
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
                                    if (centroAGuardar.festivos) {
                                        objFestivos.festivos.push(centroAGuardar.festivos);
                                    } else {
                                        objFestivos.festivos.push(null);
                                    };
                                    centroDefinitivoAGuardar = {
                                        ...centroDefinitivoAGuardar,
                                        categoria: JSON.stringify(objCategorias),
                                        horario: JSON.stringify(objHorario),
                                        servicios_fijos: JSON.stringify(objServiciosFijos),
                                        trabajadores: JSON.stringify(objTrabajadores),
                                        observaciones: JSON.stringify(objObservaciones),
                                        festivos: JSON.stringify(objFestivos),
                                    };
                                    dispatch(registrarCentroAccion('centros', centroDefinitivoAGuardar.id, centroDefinitivoAGuardar));
                                    dispatch(registrarIntervencionAccion(true));
                                    dispatch(activarDesactivarNuevoCentroAccion(false));
                                    dispatch(activarDesactivarRegistrarCentroAccion(true));
                                    dispatch(cambiarEstadoYaEstaRegistradoAccion(true));
                                };
                            });
                        } else {
                            dispatch(procesarDatosPromesa(
                                valuesFormRegistroGenerales,
                                setAlert,
                                setOpenSnack,
                                stateSwitchTipoServicioFijoRegistro,
                                valuesFormRegistro,
                                horarioIntervencionRegistro,
                                trabajadoresRegistro,
                                null
                            )).then(values => {
                                if (values.resuelto) {
                                    //registramos
                                    centroAGuardar = {
                                        id: valuesFormRegistroGenerales.id,
                                        nombre: valuesFormRegistroGenerales.nombre,
                                        sub_nombre: valuesFormRegistroGenerales.subNombre || null,
                                        estado: valuesFormRegistroGenerales.estado,
                                        categoria: valuesFormRegistro.categoria,
                                        observaciones: valuesFormRegistro.observaciones ? valuesFormRegistro.observaciones : null,
                                        codigo: valuesFormRegistroGenerales.codigo ? valuesFormRegistroGenerales.codigo : null,
                                        domicilio: valuesFormRegistroGenerales.domicilio ? valuesFormRegistroGenerales.domicilio : null,
                                        codigo_postal: valuesFormRegistroGenerales.codigoPostal ? valuesFormRegistroGenerales.codigoPostal : null,
                                        poblacion: valuesFormRegistroGenerales.poblacion ? valuesFormRegistroGenerales.poblacion : null,
                                        provincia: valuesFormRegistroGenerales.provincia ? valuesFormRegistroGenerales.provincia : null,
                                        nif: valuesFormRegistroGenerales.nif ? valuesFormRegistroGenerales.nif : null,
                                        mail: valuesFormRegistroGenerales.mail ? valuesFormRegistroGenerales.mail : null,
                                        mail_2: valuesFormRegistroGenerales.mail2 ? valuesFormRegistroGenerales.mail2 : null,
                                        telefono: valuesFormRegistroGenerales.telefono ? valuesFormRegistroGenerales.telefono : null,
                                        telefono_2: valuesFormRegistroGenerales.telefono2 ? valuesFormRegistroGenerales.telefono2 : null,
                                        forma_pago: valuesFormRegistroGenerales.formaPago,
                                        temp_pago: valuesFormRegistroGenerales.tempPago,
                                        dia_pago: valuesFormRegistroGenerales.diaPago ? valuesFormRegistroGenerales.diaPago : null,
                                        activo_num_cuenta: valuesFormRegistroGenerales.activoNumCuenta ? 'si' : 'no',
                                        horario: values.horario ? (values.horario) : null,
                                        servicios_fijos: values.servicios ? (values.servicios) : null,
                                        trabajadores: values.trabajadores ? (values.trabajadores) : null,
                                        festivos: valuesFormRegistro.festivos || null
                                    };
                                    let arrayCuadrantes = [...numeroCuadrantesRegistro];
                                    arrayCuadrantes.forEach((cuadrante, index) => {
                                        if (cuadrante.value === cuadranteEnUsoRegistro) {
                                            cuadrante.cuadrante = {
                                                categoria: valuesFormRegistro.categoria,
                                                observaciones: valuesFormRegistro.observaciones ? valuesFormRegistro.observaciones : null,
                                                horario: values.horario ? (values.horario) : null,
                                                servicios_fijos: values.servicios ? (values.servicios) : null,
                                                trabajadores: values.trabajadores ? (values.trabajadores) : null,
                                                festivos: valuesFormRegistro.festivos || null
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
                                        gestionEspSF: valuesFormRegistroGenerales.gestionEspSF,
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
                                    objFestivos = {
                                        objeto: 'festivos',
                                        festivos: []
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
                                            if (cuadrante.cuadrante.festivos) {
                                                objFestivos.festivos.push(cuadrante.cuadrante.festivos);
                                            } else {
                                                objFestivos.festivos.push(null);
                                            };
                                        } else {
                                            objCategorias.categoria.push(centroAGuardar.categoria);
                                            objCategorias.observaciones.push(centroAGuardar.observaciones);
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
                                            if (centroAGuardar.festivos) {
                                                objFestivos.festivos.push(centroAGuardar.festivos);
                                            } else {
                                                objFestivos.festivos.push(null);
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
                                        observaciones: JSON.stringify(objObservaciones),
                                        festivos: JSON.stringify(objFestivos)
                                    };
                                    dispatch(registrarCentroAccion('centros', centroDefinitivoAGuardar.id, centroDefinitivoAGuardar));
                                    dispatch(registrarIntervencionAccion(true));
                                    dispatch(activarDesactivarNuevoCentroAccion(false));
                                    dispatch(activarDesactivarRegistrarCentroAccion(true));
                                    dispatch(cambiarEstadoYaEstaRegistradoAccion(true));
                                };
                            });
                        };
                    };
                    procesarDatosRegistro();
                    break;
                default:
            };
        }
    }));

    const reseteaContenidoRegistro = (accion) => {
        if (accion === 'nuevo') {
            dispatch(cambiarEstadoYaEstaRegistradoAccion(false));
            setValuesFormRegistro({
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
                }, {}),
                festivos: null
            });
            setValuesFormRegistroGenerales({
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
            setNumeroCuadrantesRegistro([{ value: 1, cuadrante: null, guardado: false }]);
            setCuadranteEnUsoRegistro(1);
        } else {
            setValuesFormRegistro({
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
                }, {}),
                festivos: null
            });
        };
        setValueTimePickerInicioRegistro([initialStateSemana(null)]);
        setValueTimePickerFinRegistro([initialStateSemana(null)]);
        setValueTimePickerInicioDescanso1Registro([initialStateSemana(null)]);
        setValueTimePickerFinDescanso1Registro([initialStateSemana(null)]);
        setValueTimePickerInicioDescanso2Registro([initialStateSemana(null)]);
        setValueTimePickerFinDescanso2Registro([initialStateSemana(null)]);
        setValueCantidadHorasRegistro([initialStateSemana('')]);
        setValueTipoServicioRegistro([initialStateTipoServicio()]);
        setHorarioIntervencionRegistro({
            tipo: '',
            variacion: '',
            excepcion: '',
            tipoRegistro: 'comun',
            tipoRegistroTrabajador: [initialStateHorarioSemana()],
        });
        setTrabajadoresRegistro({
            cantidad: '',
            trabajadores: []
        });
        setStateSwitchTipoServicioFijoRegistro({
            ...tiposServicioFijo.reduce((acc, curr) => {
                acc[`${curr.prefix}`] = false;
                return acc;
            }, {})
        });
        setDatosFestivosRegistro({
            dia: null,
            descripcion: ''
        });
    };

    const handleAnadirCuadranteCentroRegistro = () => {
        dispatch(procesarDatosPromesa(
            valuesFormRegistroGenerales,
            setAlert,
            setOpenSnack,
            stateSwitchTipoServicioFijoRegistro,
            valuesFormRegistro,
            horarioIntervencionRegistro,
            trabajadoresRegistro,
            null
        )).then(values => {
            if (values.resuelto) {
                //registramos
                const centroAGuardar = {
                    categoria: valuesFormRegistro.categoria,
                    observaciones: valuesFormRegistro.observaciones ? valuesFormRegistro.observaciones : null,
                    horario: values.horario ? (values.horario) : null,
                    servicios_fijos: values.servicios ? (values.servicios) : null,
                    trabajadores: values.trabajadores ? (values.trabajadores) : null,
                    festivos: valuesFormRegistro.festivos ? valuesFormRegistro.festivos : null
                };
                let arrayCuadrantes = [...numeroCuadrantesRegistro];
                arrayCuadrantes.forEach((cuadrante, index) => {
                    if (cuadrante.value === cuadranteEnUsoRegistro) {
                        cuadrante.cuadrante = centroAGuardar;
                        cuadrante.guardado = true;
                    }
                });
                arrayCuadrantes.push({ value: numeroCuadrantesRegistro.length + 1, cuadrante: null, guardado: false });
                setNumeroCuadrantesRegistro(arrayCuadrantes);
                setCuadranteEnUsoRegistro(numeroCuadrantesRegistro.length + 1);
                reseteaContenidoRegistro('anadir');
                dispatch(registrarIntervencionAccion(false));
                dispatch(activarDesactivarRegistrarCentroAccion(false));
            }
        });
    };

    const handleEliminarCuadranteCentroRegistro = () => {
        let arrayCuadrantes = [...numeroCuadrantesRegistro];
        const posicionCuadrante = arrayCuadrantes.indexOf(arrayCuadrantes.find(cuadrante => cuadrante.value === cuadranteEnUsoRegistro));
        arrayCuadrantes.splice(posicionCuadrante, 1);
        for (let i = 0; i < arrayCuadrantes.length; i++) {
            arrayCuadrantes[i]['value'] = i + 1;
        };
        setNumeroCuadrantesRegistro(arrayCuadrantes);
        setCuadranteEnUsoRegistro(1);
        reseteaContenidoRegistro('anadir');
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
        setEsInicioCentrosRegistro(true);
        setAlert({
            mensaje: "Cuadrante eliminado exitosamente.",
            tipo: 'success'
        })
        setOpenSnack(true);
    };

    const handleChangeCuadranteCentroRegistro = (e) => {
        dispatch(procesarDatosPromesa(
            valuesFormRegistroGenerales,
            setAlert,
            setOpenSnack,
            stateSwitchTipoServicioFijoRegistro,
            valuesFormRegistro,
            horarioIntervencionRegistro,
            trabajadoresRegistro,
            null
        )).then(values => {
            if (values.resuelto) {
                //registramos
                const centroAGuardar = {
                    categoria: valuesFormRegistro.categoria,
                    observaciones: valuesFormRegistro.observaciones ? valuesFormRegistro.observaciones : null,
                    horario: values.horario ? (values.horario) : null,
                    servicios_fijos: values.servicios ? (values.servicios) : null,
                    trabajadores: values.trabajadores ? (values.trabajadores) : null,
                    festivos: valuesFormRegistro.festivos ? valuesFormRegistro.festivos : null
                };
                let arrayCuadrantes = [...numeroCuadrantesRegistro];
                arrayCuadrantes.forEach((cuadrante, index) => {
                    if (cuadrante.value === cuadranteEnUsoRegistro) {
                        cuadrante.cuadrante = centroAGuardar;
                        cuadrante.guardado = true;
                    }
                });
                setNumeroCuadrantesRegistro(arrayCuadrantes);
                setCuadranteEnUsoRegistro(e.target.value);
                reseteaContenidoRegistro('anadir');
                gestionaContenidoCuadranteRegistro(e.target.value);
            };
        });
    };

    const gestionaContenidoCuadranteRegistro = (elCuadrante) => {
        let cuadranteAGestionarCompleto = numeroCuadrantesRegistro.find(cuadrante => cuadrante.value === elCuadrante);
        let cuadranteAGestionar = cuadranteAGestionarCompleto.cuadrante;
        const arrayTr = [];
        const arraySu = [];
        if (cuadranteAGestionar.trabajadores) {
            if (cuadranteAGestionar.trabajadores.trabajadores.length > 0) {
                cuadranteAGestionar.trabajadores.trabajadores.forEach((trabajadorIterado, index) => {
                    arrayTr.push(trabajadorIterado['trabajador_' + (index + 1)]);
                    arraySu.push(trabajadorIterado['suplente_' + (index + 1)]);
                });
                setTrabajadoresRegistro({
                    ...trabajadoresRegistro,
                    cantidad: cuadranteAGestionar.trabajadores.cantidad,
                    trabajadores: cuadranteAGestionar.trabajadores.trabajadores
                });
            } else {
                setTrabajadoresRegistro({
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
            setStateSwitchEstadoRegistro(true);
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
        setStateSwitchTipoServicioFijoRegistro(objetoEstadosSwitch);
        setValuesFormRegistro({
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
            }, {}),
            festivos: cuadranteAGestionar?.festivos ? cuadranteAGestionar.festivos : null
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
                setValueTimePickerInicioRegistro(arrayValoresTimePicker1);
                setValueTimePickerFinRegistro(arrayValoresTimePicker2);
                setValueTipoServicioRegistro(arrayValoresTimePickerT);
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
                setValueCantidadHorasRegistro(arrayValoresTimePicker1);
                setValueTipoServicioRegistro(arrayValoresTimePickerT);
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
                setValueTimePickerInicioDescanso1Registro(arrayValoresTimePicker1);
                setValueTimePickerFinDescanso1Registro(arrayValoresTimePicker2);
                setValueTimePickerInicioDescanso2Registro(arrayValoresTimePicker3);
                setValueTimePickerFinDescanso2Registro(arrayValoresTimePicker4);
                setValueTipoServicioRegistro(arrayValoresTimePickerT);
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
            setHorarioIntervencionRegistro({
                tipo: cuadranteAGestionar.horario.tipo,
                variacion: cuadranteAGestionar.horario.variacion,
                excepcion: cuadranteAGestionar.horario.excepcion ? cuadranteAGestionar.horario.excepcion : '',
                tipoRegistro: cuadranteAGestionar.horario.tipoRegistro,
                tipoRegistroTrabajador: arrayValoresHorario
            });
        } else {
            setValueTimePickerInicioRegistro([initialStateSemana(null)]);
            setValueTimePickerFinRegistro([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso1Registro([initialStateSemana(null)]);
            setValueTimePickerFinDescanso1Registro([initialStateSemana(null)]);
            setValueTimePickerInicioDescanso2Registro([initialStateSemana(null)]);
            setValueTimePickerFinDescanso2Registro([initialStateSemana(null)]);
            setValueCantidadHorasRegistro([initialStateSemana('')]);
            setValueTipoServicioRegistro([initialStateTipoServicio()]);
            setHorarioIntervencionRegistro({
                tipo: '',
                variacion: '',
                excepcion: '',
                tipoRegistro: 'comun',
                tipoRegistroTrabajador: [initialStateHorarioSemana()],
            });
        };
    };

    const handleChangeDatePickerFestivosRegistro = (newValue) => {
        const fecha = new Date(newValue);
        const dia = `${fecha.getDate()}-${fecha.getMonth() + 1}`;
        if (arrayFestivos.includes(dia)) {
            setAlert({
                mensaje: "Este festivo ya está contemplado en los festivos genéricos.",
                tipo: 'error',
            });
            setOpenSnack(true);
            return; 
        }
        setDatosFestivosRegistro((prev) => ({
            ...prev,
            dia: dispatch(retornaAnoMesDiaAccion(newValue)),
        }));
    };

    const handleChangeDescripcionFestivosRegistro = (e) => {
        const descripcion = e.target.value;
        setDatosFestivosRegistro((prev) => ({
            ...prev,
            descripcion,
        }));
    };

    const handleClickGestionarInputsFestivosRegistro = () => {
        if (!datosFestivosRegistro.dia) {
            setAlert({
                mensaje: "Falta seleccionar la fecha del día festivo.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return
        }
        if (valuesFormRegistroGenerales?.festivos?.some(festivo => festivo.dia === datosFestivosRegistro.dia)) {
            setAlert({
                mensaje: "Este día ya está registrado como festivo.",
                tipo: 'error'
            });
            setOpenSnack(true);
            return;
        }
        const arrayObjetoHistoricoFestivos = valuesFormRegistro.festivos ? [...valuesFormRegistro.festivos] : [];
        arrayObjetoHistoricoFestivos.push({
            dia: datosFestivosRegistro.dia,
            descripcion: datosFestivosRegistro.descripcion
        });
        setValuesFormRegistro({
            ...valuesFormRegistro,
            festivos: arrayObjetoHistoricoFestivos
        });
        setDatosFestivosRegistro({
            dia: null,
            descripcion: ''
        });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const deleteFestivoRegistro = (index) => {
        const updatedFestivos = valuesFormRegistro.festivos.filter((_, i) => i !== index);
        setValuesFormRegistro((prevState) => ({
            ...prevState,
            festivos: updatedFestivos.length > 0 ? updatedFestivos : null,
        }));
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const HistoricoFestivosRegistro = () => {
        if (!valuesFormRegistro.festivos || valuesFormRegistro.festivos.length === 0) return null;
        const currentYear = new Date().getFullYear();       
        return (
            <Fragment>
                <Box
                    p={1.5}
                    m={0.5}
                    bgcolor="secondary.light"
                    color="secondary.contrastText"
                    className={clsx(classes.mb25, classes.mt20)}
                >
                    Histórico anual festivos {currentYear}
                </Box>
                <Box p={0.5} m={0.5}>
                    <Box className={classes.paper}>
                        <List dense>
                            {valuesFormRegistro.festivos.map((historico, index) => (
                                <ListItem key={`listadoFestivos${index}`}>
                                    <ListItemText
                                        primary="Festivo personalizado"
                                        secondary={
                                            <Typography component="span" variant="body2">
                                                {historico.dia}
                                                {historico.descripcion !== '' ? `: ${historico.descripcion}` : ''}
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Tooltip title="Eliminar festivo" placement="right" arrow>
                                            <IconButton onClick={() => deleteFestivoRegistro(index)} edge="end">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Fragment>
        );
    };

    return (
        <div>
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
                                className={valuesFormRegistroGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2) : clsx(classes.fondoAlta, classes.boxStl2)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
                            >
                                <Box>Datos generales</Box>
                                <Box
                                    className={clsx(classes.mt_5, classes.mr15)}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={stateSwitchEstadoRegistro}
                                                color="secondary"
                                                style={valuesFormRegistroGenerales.estado === 'baja' ? { color: '#FFFFFF' } : null}
                                                onChange={handleChangeSwitchEstadoRegistro}
                                            />
                                        }
                                        label={<Typography variant="body2">Alta / Baja</Typography>}
                                        labelPlacement="start"
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.scrollable} style={{ height: heightScrollable, paddingTop: 20, paddingRight: 10 }}>
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
                                            disabled={numeroCuadrantesRegistro.length === 1 ? true : false}
                                        >
                                            <InputLabel>Número Cuadrante</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.mb15}
                                                id="form-cuadrante-no-registro"
                                                label="Número Cuadrante"
                                                value={cuadranteEnUsoRegistro || ''}//modificat: select
                                                onChange={handleChangeCuadranteCentroRegistro}
                                                helpertext="Selecciona nº cuadrante"
                                            >
                                                {numeroCuadrantesRegistro.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Box className={classes.floatRight}>
                                            {numeroCuadrantesRegistro.length > 1 ? (
                                                <Fragment>
                                                    <Tooltip title="Borrar cuadrante del centro" placement="top-end" arrow >
                                                        <IconButton
                                                            className={classes.btnBorrarCuad}
                                                            onClick={handleEliminarCuadranteCentroRegistro}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Añadir cuadrante al centro" placement="top-end" arrow >
                                                        <span>
                                                            <IconButton
                                                                className={classes.paper}
                                                                onClick={handleAnadirCuadranteCentroRegistro}
                                                                disabled={numeroCuadrantesRegistro.length > 1}
                                                            >
                                                                <LibraryAdd />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <IconButton
                                                        className={classes.btnBorrarCuad}
                                                        disabled={true}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                    <Tooltip title="Añadir cuadrante al centro" placement="top-end" arrow >
                                                        <IconButton
                                                            className={classes.paper}
                                                            onClick={handleAnadirCuadranteCentroRegistro}
                                                        >
                                                            <LibraryAdd />
                                                        </IconButton>
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
                                        id="form-nombre-centro-registro"
                                        value={valuesFormRegistroGenerales.nombre}
                                        onChange={handleChangeFormRegistroGenerales('nombre')}
                                        labelWidth={60}
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
                                        id="form-subNombre-centro-registro"
                                        value={valuesFormRegistroGenerales.subNombre}
                                        onChange={handleChangeFormRegistroGenerales('subNombre')}
                                        labelWidth={95}
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
                                        id="form-categoria-registro"
                                        label="Categoría Centro"
                                        value={valuesFormRegistro.categoria || ''}
                                        onChange={handleChangeFormRegistro('categoria')}
                                        helpertext="Selecciona categoria"
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
                                                id="form-codigo-centro-registro"
                                                value={valuesFormRegistroGenerales.codigo}
                                                onChange={handleChangeFormRegistroGenerales('codigo')}
                                                labelWidth={55}
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
                                                id="form-nif-centro-registro"
                                                value={valuesFormRegistroGenerales.nif}
                                                onChange={handleChangeFormRegistroGenerales('nif')}
                                                labelWidth={30}
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
                                        id="form-mail-centro-registro"
                                        value={valuesFormRegistroGenerales.mail}
                                        onChange={handleChangeFormRegistroGenerales('mail')}
                                        labelWidth={55}
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
                                        id="form-mail2-centro-registro"
                                        value={valuesFormRegistroGenerales.mail2}
                                        onChange={handleChangeFormRegistroGenerales('mail2')}
                                        labelWidth={65}
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
                                                id="form-domicilio-centro-registro"
                                                value={valuesFormRegistroGenerales.domicilio}
                                                onChange={handleChangeFormRegistroGenerales('domicilio')}
                                                labelWidth={70}
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
                                                id="form-codigoPostal-centro-registro"
                                                value={valuesFormRegistroGenerales.codigoPostal}
                                                onChange={handleChangeFormRegistroGenerales('codigoPostal')}
                                                labelWidth={35}
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
                                                id="form-poblacion-centro-registro"
                                                value={valuesFormRegistroGenerales.poblacion}
                                                onChange={handleChangeFormRegistroGenerales('poblacion')}
                                                labelWidth={75}
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
                                                id="form-provincia-centro-registro"
                                                value={valuesFormRegistroGenerales.provincia}
                                                onChange={handleChangeFormRegistroGenerales('provincia')}
                                                labelWidth={75}
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
                                                id="form-telefono-centro-registro"
                                                value={valuesFormRegistroGenerales.telefono}
                                                onChange={handleChangeFormRegistroGenerales('telefono')}
                                                labelWidth={80}
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
                                                id="form-telefono2-centro-registro"
                                                value={valuesFormRegistroGenerales.telefono2}
                                                onChange={handleChangeFormRegistroGenerales('telefono2')}
                                                labelWidth={80}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={8} sm={6} xs={12}>
                        <div className={classes.root2} style={{ marginTop: 5 }}>
                            <AppBar position="static" className={valuesFormRegistroGenerales.estado === 'baja' ? clsx(classes.fondoBaja) : clsx(classes.fondoAlta)}>
                                <Tabs value={valueTabCentrosRegistro} onChange={handleChangeTabCentrosRegistro} className={classes.tabsStl}>
                                    <Tab label="Trabajadores" {...a11yProps(0)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Horario" {...a11yProps(1)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Servicios extra" {...a11yProps(2)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Forma de pago" {...a11yProps(3)} style={{ paddingBottom: 10 }} />
                                    <Tab label="Varios" {...a11yProps(4)} style={{ paddingBottom: 10 }} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={valueTabCentrosRegistro} index={0} className={classes.scrollable} style={{ height: heightScrollable }}>
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
                                                id="form-tipo-trabajadores-registro"
                                                label="Trabajadores asignados"
                                                value={valuesFormRegistro.numeroTrabajadores || ''}
                                                onChange={handleChangeFormRegistro('numeroTrabajadores')}
                                                helpertext="Selecciona número de trabajadores"
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
                                        {trabajadoresRegistro.cantidad !== '' && (
                                            <SelectsTrabajadores
                                                trabajadores={trabajadoresRegistro}
                                                valuesForm={valuesFormRegistro || ''}//modificat: select
                                                setValuesForm={setValuesFormRegistro}
                                                setTrabajadores={setTrabajadoresRegistro}
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosRegistro} index={1} className={classes.scrollable} style={{ height: heightScrollable }}>
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
                                                id="form-tipo-registro"
                                                label="Modo entrada datos"
                                                value={valuesFormRegistro.tipo || ''}
                                                onChange={handleChangeFormRegistro('tipo')}
                                                helpertext="Selecciona Modo entrada datos"
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
                                                id="form-variaciones-registro"
                                                label="Variaciones"
                                                value={valuesFormRegistro.variacion || ''}//modificat: select
                                                onChange={handleChangeFormRegistro('variacion')}
                                                helpertext="Selecciona variaciones"
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
                                                id="form-excepciones-registro"
                                                label="Excepciones"
                                                value={valuesFormRegistro.excepcion || ''}//modificat: select
                                                onChange={handleChangeFormRegistro('excepcion')}
                                                helpertext="Selecciona excepciones"
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
                                            className={valuesFormRegistroGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb20) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
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
                                                id="form-tipo-computo-registro"
                                                label="Tipo cómputo"
                                                value={valuesFormRegistro.computo || ''}
                                                onChange={handleChangeFormRegistro('computo')}
                                                helpertext="Selecciona cómputo de horas"
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
                                        {valuesFormRegistro.computo === 1 || valuesFormRegistro.computo === 3 ? (
                                            <FormControl
                                                variant="outlined"
                                                className={classes.form}
                                                size="small"
                                            >
                                                <InputLabel>Mensual pactado</InputLabel>
                                                <OutlinedInput
                                                    className={classes.mb15}
                                                    fullWidth
                                                    id="form-mensual-pactado-registro"
                                                    value={valuesFormRegistro.mensualPactado || ''}
                                                    onChange={handleChangeFormRegistro('mensualPactado')}
                                                    labelWidth={130}
                                                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                                />
                                            </FormControl>
                                        ) : null}
                                        {valuesFormRegistro.computo === 2 || valuesFormRegistro.computo === 3 ? (
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
                                                                value={valuesFormRegistro[`precioHora_${servicio.prefix}`] || ''}
                                                                onChange={handleChangeFormRegistro(`precioHora_${servicio.prefix}`)}
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
                                            {valuesFormRegistro.tipo !== '' ? (
                                                <Box
                                                    m={0.5}
                                                    color="secondary.contrastText"
                                                    className={valuesFormRegistroGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb10, classes.mt15) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb10, classes.mt15)}
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
                                                                    color="secondary"
                                                                    onChange={handleChangeSwitchTipoRegistroRegistro}
                                                                />
                                                            }
                                                            label={<Typography variant="body2">Común / Individual</Typography>}
                                                            labelPlacement="start"
                                                        />
                                                    </Box>
                                                </Box>
                                            ) : null}
                                            <List >
                                                {horarioIntervencionRegistro.tipoRegistroTrabajador.map((item, index) => (
                                                    <HorarioCentros
                                                        key={'horario-' + index}
                                                        tipo={valuesFormRegistro.tipo}
                                                        index={index}
                                                        disabledItem={false}
                                                        horarioIntervencion={horarioIntervencionRegistro}
                                                        valueTimePickerInicio={valueTimePickerInicioRegistro}
                                                        valueTimePickerFin={valueTimePickerFinRegistro}
                                                        valueTimePickerInicioDescanso1={valueTimePickerInicioDescanso1Registro}
                                                        valueTimePickerInicioDescanso2={valueTimePickerInicioDescanso2Registro}
                                                        valueTimePickerFinDescanso1={valueTimePickerFinDescanso1Registro}
                                                        valueTimePickerFinDescanso2={valueTimePickerFinDescanso2Registro}
                                                        valueCantidadHoras={valueCantidadHorasRegistro}
                                                        valueTipoServicio={valueTipoServicioRegistro}
                                                        setHorarioIntervencion={setHorarioIntervencionRegistro}
                                                        setValueTimePickerInicio={setValueTimePickerInicioRegistro}
                                                        setValueTimePickerFin={setValueTimePickerFinRegistro}
                                                        setValueTimePickerInicioDescanso1={setValueTimePickerInicioDescanso1Registro}
                                                        setValueTimePickerInicioDescanso2={setValueTimePickerInicioDescanso2Registro}
                                                        setValueTimePickerFinDescanso1={setValueTimePickerFinDescanso1Registro}
                                                        setValueTimePickerFinDescanso2={setValueTimePickerFinDescanso2Registro}
                                                        setValueTipoServicio={setValueTipoServicioRegistro}
                                                        setValueCantidadHoras={setValueCantidadHorasRegistro}
                                                    />
                                                ))}
                                            </List>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosRegistro} index={2} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid item xs={12}>
                                    <Box style={{ paddingLeft: 10, marginTop: 10 }}>
                                        {tiposServicioFijo.map((tipo, index) => (
                                            <TipoServicioFijo
                                                key={"tipoServicio-" + index}
                                                formato={"centros"}
                                                tipo={tipo}
                                                index={index}
                                                stateSwitchTipoServicioFijo={stateSwitchTipoServicioFijoRegistro}
                                                valuesForm={valuesFormRegistro}
                                                handleChangeSwitchTipoServicioFijo={handleChangeSwitchTipoServicioFijoRegistro}
                                                disabledItem={false}
                                                handleChangeForm={handleChangeFormRegistro}
                                            />
                                        ))}
                                    </Box>
                                    <Box
                                        style={{ marginLeft: 10, marginTop: 10, marginBottom: 20 }}
                                        className={classes.boxChekin}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={valuesFormRegistroGenerales.gestionEspSF || false}
                                                    onChange={handleChangeFormRegistroGenerales('gestionEspSF')}
                                                    name="checkedGestEsp-registro"
                                                    color="secondary"
                                                    disabled={Object.values(stateSwitchTipoServicioFijoRegistro).every(value => value === false)}
                                                />
                                            }
                                            label={<Typography className={classes.colorText} style={{ fontSize: '0.9rem' }}>Gestión especial horas para Servicios Extra.</Typography>}
                                        />
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosRegistro} index={3} className={classes.scrollable} style={{ height: heightScrollable }}>
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
                                                id="form-formaPago-registro"
                                                label="Forma pago"
                                                value={valuesFormRegistroGenerales.formaPago || ''}
                                                onChange={handleChangeFormRegistroGenerales('formaPago')}
                                                helpertext="Selecciona la forma de pago"
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
                                                id="form-diaPago-registro"
                                                label="Vencimiento"
                                                value={valuesFormRegistroGenerales.diaPago || ''}
                                                onChange={handleChangeFormRegistroGenerales('diaPago')}
                                                helpertext="Selecciona día vencimiento"
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
                                                className={classes.mb15}
                                                id="form-tempPago-registro"
                                                label="Temporización"
                                                value={valuesFormRegistroGenerales.tempPago || ''}
                                                onChange={handleChangeFormRegistroGenerales('tempPago')}
                                                helpertext="Selecciona temporización del pago"
                                            >
                                                {temporizacionDelPago.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Box className={classes.boxChekin}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={valuesFormRegistroGenerales.activoNumCuenta || false}
                                                        onChange={handleChangeFormRegistroGenerales('activoNumCuenta')}
                                                        name="checkedNumCuenta-registro"
                                                        color="secondary"
                                                    />
                                                }
                                                label={<Typography className={classes.colorText} style={{ fontSize: '0.9rem' }}>Activar línea número de cuenta en Factura Factusol.</Typography>}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueTabCentrosRegistro} index={4} className={classes.scrollable} style={{ height: heightScrollable }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="flex-start"
                                    alignItems="flex-start"
                                    spacing={4}
                                >
                                    <Grid item lg={6} sm={6} xs={12}>
                                        <Box
                                            m={0.5}
                                            color="secondary.contrastText"
                                            className={valuesFormRegistroGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb20) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
                                        >
                                            Observaciones
                                        </Box>
                                        <TextField
                                            label="Observaciones"
                                            id="form-observaciones-edicion"
                                            value={valuesFormRegistro.observaciones || ''}
                                            className={clsx(classes.form, classes.mb25)}
                                            fullWidth
                                            placeholder={'Observaciones Cuadrante ' + cuadranteEnUsoRegistro}
                                            multiline
                                            rows={3}
                                            variant="outlined"
                                            onChange={handleChangeFormRegistro('observaciones')}
                                        />
                                    </Grid>
                                    <Grid item lg={6} sm={6} xs={12}>
                                        <Box
                                            m={0.5}
                                            color="secondary.contrastText"
                                            className={valuesFormRegistroGenerales.estado === 'baja' ? clsx(classes.fondoBaja, classes.boxStl2, classes.mb20) : clsx(classes.fondoAlta, classes.boxStl2, classes.mb20)}
                                        >
                                            Festivos
                                        </Box>
                                        <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                inputVariant="outlined"
                                                className={clsx(classes.form, classes.mb10)}
                                                fullWidth
                                                label="Festivo personalizado Centro"
                                                format="dd/MM/yyyy"
                                                clearable={true}
                                                cancelLabel="Cancelar"
                                                clearLabel="Borrar"
                                                value={datosFestivosRegistro.dia || null}
                                                onChange={(newValue) => {
                                                    handleChangeDatePickerFestivosRegistro(newValue);
                                                }}
                                                size="small"
                                            />
                                        </MuiPickersUtilsProvider>
                                        <TextField
                                            label="Descripción"
                                            className={clsx(classes.form, classes.mb10)}
                                            value={datosFestivosRegistro.descripcion || ''}
                                            fullWidth
                                            placeholder={'Descripción festivo'}
                                            multiline
                                            rows={1}
                                            variant="outlined"
                                            onChange={handleChangeDescripcionFestivosRegistro}
                                        />
                                        <Box className={clsx(classes.form, classes.mb10)} >
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                size="small"
                                                color="secondary"
                                                startIcon={<SaveIcon />}
                                                onClick={handleClickGestionarInputsFestivosRegistro}
                                            >
                                                Registrar festivo
                                            </Button>
                                        </Box>
                                        <HistoricoFestivosRegistro />
                                    </Grid>
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
            {/* {console.log(arrayTrabajadoresSubcategoria)} */}
        </div>
    )
})

export default CentrosRegistrar
