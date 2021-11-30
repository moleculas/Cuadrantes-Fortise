import React, { useState, useEffect, Fragment, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import InputAdornment from '@material-ui/core/InputAdornment';

//carga componentes
import ItemListTime from './ItemListTime';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { registrarCentroAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { retornaHoraRangoAccion } from '../redux/appDucks';
import { retornaMinutosAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { activarDesactivarNuevoCentroAccion } from '../redux/centrosDucks';
import { activarDesactivarRegistrarCentroAccion } from '../redux/centrosDucks';

const categorias = Constantes.CATEGORIAS_CENTROS;
const variaciones = Constantes.VARIACIONES_HORARIOS_CENTROS;
const tipos = Constantes.MODO_ENTRADA_HORARIOS;
const totalTrabajadores = Constantes.TRABAJADORES_ASIGNADOS_CENTRO;
const computoHoras = Constantes.COMPUTO_HORAS;

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CentrosRegistrar = forwardRef((props, ref) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const openLoadingCentros = useSelector(store => store.variablesCentros.loadingCentros);
    const openLoadingTrabajadores = useSelector(store => store.variablesTrabajadores.loadingTrabajadores);
    const errorDeCargaTrabajadores = useSelector(store => store.variablesTrabajadores.errorDeCargaTrabajadores);
    const errorDeCargaCentros = useSelector(store => store.variablesCentros.errorDeCargaCentros);
    const exitoRegistroCentro = useSelector(store => store.variablesCentros.exitoRegistroCentro);
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);

    //states

    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesFormRegistro, setValuesFormRegistro] = useState({
        id: null,
        nombre: '',
        categoria: '',
        variacion: '',
        tipo: '',
        numeroTrabajadores: '',
        datosTrabajadores: [],
        datosSuplentes: [],
        computo: '',
        mensualPactado: null,
        precioHora: null
    });
    const [valueTimePickerInicioRegistro, setValueTimePickerInicioRegistro] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerFinRegistro, setValueTimePickerFinRegistro] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerInicioDescanso1Registro, setValueTimePickerInicioDescanso1Registro] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerFinDescanso1Registro, setValueTimePickerFinDescanso1Registro] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerInicioDescanso2Registro, setValueTimePickerInicioDescanso2Registro] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerFinDescanso2Registro, setValueTimePickerFinDescanso2Registro] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueCantidadHorasRegistro, setValueCantidadHorasRegistro] = useState({
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: '',
        domingo: ''
    });
    const [horarioIntervencionRegistro, setHorarioIntervencionRegistro] = useState({
        tipo: '',
        variacion: '',
        lunesInicioRango: null,
        lunesFinRango: null,
        martesInicioRango: null,
        martesFinRango: null,
        miercolesInicioRango: null,
        miercolesFinRango: null,
        juevesInicioRango: null,
        juevesFinRango: null,
        viernesInicioRango: null,
        viernesFinRango: null,
        sabadoInicioRango: null,
        sabadoFinRango: null,
        domingoInicioRango: null,
        domingoFinRango: null,
        lunesInicio1RangoDescanso: null,
        lunesInicio2RangoDescanso: null,
        lunesFin1RangoDescanso: null,
        lunesFin2RangoDescanso: null,
        martesInicio1RangoDescanso: null,
        martesInicio2RangoDescanso: null,
        martesFin1RangoDescanso: null,
        martesFin2RangoDescanso: null,
        miercolesInicio1RangoDescanso: null,
        miercolesInicio2RangoDescanso: null,
        miercolesFin1RangoDescanso: null,
        miercolesFin2RangoDescanso: null,
        juevesInicio1RangoDescanso: null,
        juevesInicio2RangoDescanso: null,
        juevesFin1RangoDescanso: null,
        juevesFin2RangoDescanso: null,
        viernesInicio1RangoDescanso: null,
        viernesInicio2RangoDescanso: null,
        viernesFin1RangoDescanso: null,
        viernesFin2RangoDescanso: null,
        sabadoInicio1RangoDescanso: null,
        sabadoInicio2RangoDescanso: null,
        sabadoFin1RangoDescanso: null,
        sabadoFin2RangoDescanso: null,
        domingoInicio1RangoDescanso: null,
        domingoInicio2RangoDescanso: null,
        domingoFin1RangoDescanso: null,
        domingoFin2RangoDescanso: null,
        lunesCantidad: '',
        martesCantidad: '',
        miercolesCantidad: '',
        juevesCantidad: '',
        viernesCantidad: '',
        sabadoCantidad: '',
        domingoCantidad: '',
    });
    const [trabajadoresRegistro, setTrabajadoresRegistro] = useState({
        cantidad: '',
        trabajadores: []
    });
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        dispatch(onEstemAccion('registrarCentros'));
        dispatch(obtenerTrabajadoresAccion('trabajadores'));
    }, [dispatch]);

    useEffect(() => {
        if (errorDeCargaTrabajadores || errorDeCargaCentros) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaTrabajadores, errorDeCargaCentros]);

    useEffect(() => {
        if (exitoRegistroCentro) {
            setAlert({
                mensaje: "Registro creado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoRegistroCentro]);

    useEffect(() => {
        if (!openLoadingCentros && !openLoadingTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingCentros, openLoadingTrabajadores]);

    //funciones

    const retornaHoraRango = (laHora) => {
        return dispatch(retornaHoraRangoAccion(laHora));
    };

    const retornaMinutos = (primeraHora, segundaHora) => {
        return dispatch(retornaMinutosAccion(primeraHora, segundaHora));
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeFormRegistro = (prop) => (e) => {
        if (prop === "variacion") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, variacion: e.target.value });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "computo") {
            if (e.target.value === 1) {
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value, precioHora: null });
            };
            if (e.target.value === 2) {
                setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value, mensualPactado: null });
            };
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "mensualPactado") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: parseInt(e.target.value) });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "precioHora") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: parseInt(e.target.value) });
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        };
        if (prop === "tipo") {
            setValuesFormRegistro({ ...valuesFormRegistro, [prop]: e.target.value });
            setHorarioIntervencionRegistro({
                ...horarioIntervencionRegistro,
                tipo: e.target.value,
                lunesInicioRango: null,
                lunesFinRango: null,
                martesInicioRango: null,
                martesFinRango: null,
                miercolesInicioRango: null,
                miercolesFinRango: null,
                juevesInicioRango: null,
                juevesFinRango: null,
                viernesInicioRango: null,
                viernesFinRango: null,
                sabadoInicioRango: null,
                sabadoFinRango: null,
                domingoInicioRango: null,
                domingoFinRango: null,
                lunesInicio1RangoDescanso: null,
                lunesInicio2RangoDescanso: null,
                lunesFin1RangoDescanso: null,
                lunesFin2RangoDescanso: null,
                martesInicio1RangoDescanso: null,
                martesInicio2RangoDescanso: null,
                martesFin1RangoDescanso: null,
                martesFin2RangoDescanso: null,
                miercolesInicio1RangoDescanso: null,
                miercolesInicio2RangoDescanso: null,
                miercolesFin1RangoDescanso: null,
                miercolesFin2RangoDescanso: null,
                juevesInicio1RangoDescanso: null,
                juevesInicio2RangoDescanso: null,
                juevesFin1RangoDescanso: null,
                juevesFin2RangoDescanso: null,
                viernesInicio1RangoDescanso: null,
                viernesInicio2RangoDescanso: null,
                viernesFin1RangoDescanso: null,
                viernesFin2RangoDescanso: null,
                sabadoInicio1RangoDescanso: null,
                sabadoInicio2RangoDescanso: null,
                sabadoFin1RangoDescanso: null,
                sabadoFin2RangoDescanso: null,
                domingoInicio1RangoDescanso: null,
                domingoInicio2RangoDescanso: null,
                domingoFin1RangoDescanso: null,
                domingoFin2RangoDescanso: null,
                lunesCantidad: '',
                martesCantidad: '',
                miercolesCantidad: '',
                juevesCantidad: '',
                viernesCantidad: '',
                sabadoCantidad: '',
                domingoCantidad: ''
            });
            setValueTimePickerInicioRegistro({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerFinRegistro({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerInicioDescanso1Registro({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerFinDescanso1Registro({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerInicioDescanso2Registro({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerFinDescanso2Registro({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueCantidadHorasRegistro({
                lunes: '',
                martes: '',
                miercoles: '',
                jueves: '',
                viernes: '',
                sabado: '',
                domingo: ''
            });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarRegistrarCentroAccion(false));
            return;
        }
        if (prop === "numeroTrabajadores") {
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

    const handleChangeFormRegistroSelectsTrabajadores = (tipo, index) => (e) => {
        if (tipo === "trabajador") {
            let arrayTr = [...valuesFormRegistro.datosTrabajadores];
            arrayTr[index] = e.target.value;
            let arrayTrEd = [...trabajadoresRegistro.trabajadores];
            arrayTrEd[index]['trabajador_' + (index + 1)] = e.target.value;
            setValuesFormRegistro({ ...valuesFormRegistro, datosTrabajadores: arrayTr });
            setTrabajadoresRegistro({ ...trabajadoresRegistro, trabajadores: arrayTrEd });
        }
        if (tipo === "suplente") {
            let arraySu = [...valuesFormRegistro.datosSuplentes];
            arraySu[index] = e.target.value;
            let arrayTrEd = [...trabajadoresRegistro.trabajadores];
            arrayTrEd[index]['suplente_' + (index + 1)] = e.target.value;
            setValuesFormRegistro({ ...valuesFormRegistro, datosSuplentes: arraySu });
            setTrabajadoresRegistro({ ...trabajadoresRegistro, trabajadores: arrayTrEd });
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeTimePickerInicioRegistro = (id, hora) => {
        switch (id) {
            case 'timePickerInicio-registro-lunes':
                if (valueTimePickerFinRegistro.lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro.lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, lunes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, lunes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesInicioRango: null });
                }

                break;
            case 'timePickerInicio-registro-martes':
                if (valueTimePickerFinRegistro.martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro.martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, martes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, martes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesInicioRango: null });
                }
                break;
            case 'timePickerInicio-registro-miercoles':
                if (valueTimePickerFinRegistro.miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro.miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, miercoles: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, miercoles: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesInicioRango: null });
                }
                break;
            case 'timePickerInicio-registro-jueves':
                if (valueTimePickerFinRegistro.jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro.jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, jueves: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, jueves: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesInicioRango: null });
                }
                break;
            case 'timePickerInicio-registro-viernes':
                if (valueTimePickerFinRegistro.viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro.viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, viernes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, viernes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesInicioRango: null });
                }
                break;
            case 'timePickerInicio-registro-sabado':
                if (valueTimePickerFinRegistro.sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro.sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, sabado: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, sabado: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoInicioRango: null });
                }
                break;
            case 'timePickerInicio-registro-domingo':
                if (valueTimePickerFinRegistro.domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinRegistro.domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, domingo: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioRegistro({ ...valueTimePickerInicioRegistro, domingo: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoInicioRango: null });
                }
                break;
            case 'timePickerInicio1Descanso-registro-lunes':
                if (valueTimePickerFinDescanso1Registro.lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro.lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, lunes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, lunes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-registro-lunes':
                if (valueTimePickerFinDescanso2Registro.lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro.lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, lunes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, lunes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-registro-martes':
                if (valueTimePickerFinDescanso1Registro.martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro.martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, martes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, martes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-registro-martes':
                if (valueTimePickerFinDescanso2Registro.martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro.martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, martes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, martes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-registro-miercoles':
                if (valueTimePickerFinDescanso1Registro.miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro.miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, miercoles: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, miercoles: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-registro-miercoles':
                if (valueTimePickerFinDescanso2Registro.miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro.miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, miercoles: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, miercoles: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-registro-jueves':
                if (valueTimePickerFinDescanso1Registro.jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro.jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, jueves: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, jueves: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-registro-jueves':
                if (valueTimePickerFinDescanso2Registro.jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro.jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, jueves: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, jueves: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-registro-viernes':
                if (valueTimePickerFinDescanso1Registro.viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro.viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, viernes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, viernes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-registro-viernes':
                if (valueTimePickerFinDescanso2Registro.viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro.viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, viernes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, viernes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-registro-sabado':
                if (valueTimePickerFinDescanso1Registro.sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro.sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, sabado: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, sabado: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-registro-sabado':
                if (valueTimePickerFinDescanso2Registro.sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro.sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, sabado: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, sabado: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-registro-domingo':
                if (valueTimePickerFinDescanso1Registro.domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Registro.domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, domingo: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Registro({ ...valueTimePickerInicioDescanso1Registro, domingo: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-registro-domingo':
                if (valueTimePickerFinDescanso2Registro.domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Registro.domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, domingo: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Registro({ ...valueTimePickerInicioDescanso2Registro, domingo: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoInicio2RangoDescanso: null });
                }
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeTimePickerFinRegistro = (id, hora) => {
        switch (id) {
            case 'timePickerFin-registro-lunes':
                if (valueTimePickerInicioRegistro.lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro.lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, lunes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, lunes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesFinRango: null });
                }
                break;
            case 'timePickerFin-registro-martes':
                if (valueTimePickerInicioRegistro.martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro.martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, martes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, martes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesFinRango: null });
                }
                break;
            case 'timePickerFin-registro-miercoles':
                if (valueTimePickerInicioRegistro.miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro.miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, miercoles: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, miercoles: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesFinRango: null });
                }
                break;
            case 'timePickerFin-registro-jueves':
                if (valueTimePickerInicioRegistro.jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro.jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, jueves: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, jueves: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesFinRango: null });
                }
                break;
            case 'timePickerFin-registro-viernes':
                if (valueTimePickerInicioRegistro.viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro.viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, viernes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, viernes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesFinRango: null });
                }
                break;
            case 'timePickerFin-registro-sabado':
                if (valueTimePickerInicioRegistro.sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro.sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, sabado: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, sabado: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoFinRango: null });
                }
                break;
            case 'timePickerFin-registro-domingo':
                if (valueTimePickerInicioRegistro.domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioRegistro.domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, domingo: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinRegistro({ ...valueTimePickerFinRegistro, domingo: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoFinRango: null });
                }
                break;
            case 'timePickerFin1Descanso-registro-lunes':
                if (valueTimePickerInicioDescanso1Registro.lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro.lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, lunes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, lunes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-registro-lunes':
                if (valueTimePickerInicioDescanso2Registro.lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro.lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, lunes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, lunes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-registro-martes':
                if (valueTimePickerInicioDescanso1Registro.martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro.martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, martes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, martes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-registro-martes':
                if (valueTimePickerInicioDescanso2Registro.martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro.martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, martes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, martes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-registro-miercoles':
                if (valueTimePickerInicioDescanso1Registro.miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro.miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, miercoles: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, miercoles: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-registro-miercoles':
                if (valueTimePickerInicioDescanso2Registro.miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro.miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, miercoles: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, miercoles: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-registro-jueves':
                if (valueTimePickerInicioDescanso1Registro.jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro.jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, jueves: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, jueves: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-registro-jueves':
                if (valueTimePickerInicioDescanso2Registro.jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro.jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, jueves: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, jueves: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-registro-viernes':
                if (valueTimePickerInicioDescanso1Registro.viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro.viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, viernes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, viernes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-registro-viernes':
                if (valueTimePickerInicioDescanso2Registro.viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro.viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, viernes: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, viernes: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-registro-sabado':
                if (valueTimePickerInicioDescanso1Registro.sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro.sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, sabado: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, sabado: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-registro-sabado':
                if (valueTimePickerInicioDescanso2Registro.sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro.sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, sabado: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, sabado: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-registro-domingo':
                if (valueTimePickerInicioDescanso1Registro.domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Registro.domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, domingo: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Registro({ ...valueTimePickerFinDescanso1Registro, domingo: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-registro-domingo':
                if (valueTimePickerInicioDescanso2Registro.domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Registro.domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, domingo: hora });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Registro({ ...valueTimePickerFinDescanso2Registro, domingo: null });
                    setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoFin2RangoDescanso: null });
                }
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    const handleChangeSelectCantidadRegistro = (e) => {
        switch (e.target.name) {
            case 'selectCantidad-registro-lunes':
                setValueCantidadHorasRegistro({ ...valueCantidadHorasRegistro, lunes: e.target.value });
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesCantidad: e.target.value });
                break;
            case 'selectCantidad-registro-martes':
                setValueCantidadHorasRegistro({ ...valueCantidadHorasRegistro, martes: e.target.value });
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesCantidad: e.target.value });
                break;
            case 'selectCantidad-registro-miercoles':
                setValueCantidadHorasRegistro({ ...valueCantidadHorasRegistro, miercoles: e.target.value });
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesCantidad: e.target.value });
                break;
            case 'selectCantidad-registro-jueves':
                setValueCantidadHorasRegistro({ ...valueCantidadHorasRegistro, jueves: e.target.value });
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesCantidad: e.target.value });
                break;
            case 'selectCantidad-registro-viernes':
                setValueCantidadHorasRegistro({ ...valueCantidadHorasRegistro, viernes: e.target.value });
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesCantidad: e.target.value });
                break;
            case 'selectCantidad-registro-sabado':
                setValueCantidadHorasRegistro({ ...valueCantidadHorasRegistro, sabado: e.target.value });
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoCantidad: e.target.value });
                break;
            case 'selectCantidad-registro-domingo':
                setValueCantidadHorasRegistro({ ...valueCantidadHorasRegistro, domingo: e.target.value });
                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoCantidad: e.target.value });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarRegistrarCentroAccion(false));
    };

    useImperativeHandle(ref, () => ({
        funcionesEnCentrosRegistrar(funcion) {
            switch (funcion) {
                case 'nuevoCentro':
                    const nuevoCentro = () => {
                        dispatch(activarDesactivarNuevoCentroAccion(true));
                        reseteaContenidoRegistro();
                    };
                    nuevoCentro();
                    break;
                case 'procesarDatosRegistro':
                    const procesarDatosRegistro = () => {
                        if (valuesFormRegistro.nombre === '' ||
                            valuesFormRegistro.categoria === '' ||
                            valuesFormRegistro.variacion === '' ||
                            valuesFormRegistro.tipo === '' ||
                            valuesFormRegistro.numeroTrabajadores === ''
                        ) {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };
                        if (valuesFormRegistro.computo === '' || (valuesFormRegistro.computo === 1 && !valuesFormRegistro.mensualPactado) || (valuesFormRegistro.computo === 2 && !valuesFormRegistro.precioHora)) {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };
                        if (horarioIntervencionRegistro.tipo === "rango") {
                            //primera comprobación, que todos los campos esten vacíos
                            if (!horarioIntervencionRegistro.lunesInicioRango &&
                                !horarioIntervencionRegistro.lunesFinRango &&
                                !horarioIntervencionRegistro.martesInicioRango &&
                                !horarioIntervencionRegistro.martesFinRango &&
                                !horarioIntervencionRegistro.miercolesInicioRango &&
                                !horarioIntervencionRegistro.miercolesFinRango &&
                                !horarioIntervencionRegistro.juevesInicioRango &&
                                !horarioIntervencionRegistro.juevesFinRango &&
                                !horarioIntervencionRegistro.viernesInicioRango &&
                                !horarioIntervencionRegistro.viernesFinRango &&
                                !horarioIntervencionRegistro.sabadoInicioRango &&
                                !horarioIntervencionRegistro.sabadoFinRango &&
                                !horarioIntervencionRegistro.domingoInicioRango &&
                                !horarioIntervencionRegistro.domingoFinRango) {
                                setAlert({
                                    mensaje: "No has introducido ningún dato horario para registrar.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //segunda comprobación, coinciden ambas casillas en registro
                            if (!horarioIntervencionRegistro.lunesInicioRango && horarioIntervencionRegistro.lunesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionRegistro.lunesInicioRango && !horarioIntervencionRegistro.lunesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.martesInicioRango && horarioIntervencionRegistro.martesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionRegistro.martesInicioRango && !horarioIntervencionRegistro.martesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.miercolesInicioRango && horarioIntervencionRegistro.miercolesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionRegistro.miercolesInicioRango && !horarioIntervencionRegistro.miercolesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.juevesInicioRango && horarioIntervencionRegistro.juevesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionRegistro.juevesInicioRango && !horarioIntervencionRegistro.juevesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.viernesInicioRango && horarioIntervencionRegistro.viernesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionRegistro.viernesInicioRango && !horarioIntervencionRegistro.viernesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.sabadoInicioRango && horarioIntervencionRegistro.sabadoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionRegistro.sabadoInicioRango && !horarioIntervencionRegistro.sabadoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.domingoInicioRango && horarioIntervencionRegistro.domingoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionRegistro.domingoInicioRango && !horarioIntervencionRegistro.domingoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //tercera comprobación, pasamos rango a minutos
                            if (horarioIntervencionRegistro.lunesInicioRango) {
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesCantidad: retornaMinutos(horarioIntervencionRegistro.lunesInicioRango, horarioIntervencionRegistro.lunesFinRango) });
                            };
                            if (horarioIntervencionRegistro.martesInicioRango) {
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesCantidad: retornaMinutos(horarioIntervencionRegistro.martesInicioRango, horarioIntervencionRegistro.martesFinRango) });
                            };
                            if (horarioIntervencionRegistro.miercolesInicioRango) {
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesCantidad: retornaMinutos(horarioIntervencionRegistro.miercolesInicioRango, horarioIntervencionRegistro.miercolesFinRango) });
                            };
                            if (horarioIntervencionRegistro.juevesInicioRango) {
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesCantidad: retornaMinutos(horarioIntervencionRegistro.juevesInicioRango, horarioIntervencionRegistro.juevesFinRango) });
                            };
                            if (horarioIntervencionRegistro.viernesInicioRango) {
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesCantidad: retornaMinutos(horarioIntervencionRegistro.viernesInicioRango, horarioIntervencionRegistro.viernesFinRango) });
                            };
                            if (horarioIntervencionRegistro.sabadoInicioRango) {
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoCantidad: retornaMinutos(horarioIntervencionRegistro.sabadoInicioRango, horarioIntervencionRegistro.sabadoFinRango) });
                            };
                            if (horarioIntervencionRegistro.domingoInicioRango) {
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoCantidad: retornaMinutos(horarioIntervencionRegistro.domingoInicioRango, horarioIntervencionRegistro.domingoFinRango) });
                            };

                        };

                        if (horarioIntervencionRegistro.tipo === "rangoDescanso") {
                            //primera comprobación, que todos los campos esten vacíos
                            if (!horarioIntervencionRegistro.lunesInicio1RangoDescanso &&
                                !horarioIntervencionRegistro.lunesInicio2RangoDescanso &&
                                !horarioIntervencionRegistro.lunesFin1RangoDescanso &&
                                !horarioIntervencionRegistro.lunesFin2RangoDescanso &&
                                !horarioIntervencionRegistro.martesInicio1RangoDescanso &&
                                !horarioIntervencionRegistro.martesInicio2RangoDescanso &&
                                !horarioIntervencionRegistro.martesFin1RangoDescanso &&
                                !horarioIntervencionRegistro.martesFin2RangoDescanso &&
                                !horarioIntervencionRegistro.miercolesInicio1RangoDescanso &&
                                !horarioIntervencionRegistro.miercolesInicio2RangoDescanso &&
                                !horarioIntervencionRegistro.miercolesFin1RangoDescanso &&
                                !horarioIntervencionRegistro.miercolesFin2RangoDescanso &&
                                !horarioIntervencionRegistro.juevesInicio1RangoDescanso &&
                                !horarioIntervencionRegistro.juevesInicio2RangoDescanso &&
                                !horarioIntervencionRegistro.juevesFin1RangoDescanso &&
                                !horarioIntervencionRegistro.juevesFin2RangoDescanso &&
                                !horarioIntervencionRegistro.viernesInicio1RangoDescanso &&
                                !horarioIntervencionRegistro.viernesInicio2RangoDescanso &&
                                !horarioIntervencionRegistro.viernesFin1RangoDescanso &&
                                !horarioIntervencionRegistro.viernesFin2RangoDescanso &&
                                !horarioIntervencionRegistro.sabadoInicio1RangoDescanso &&
                                !horarioIntervencionRegistro.sabadoInicio2RangoDescanso &&
                                !horarioIntervencionRegistro.sabadoFin1RangoDescanso &&
                                !horarioIntervencionRegistro.sabadoFin2RangoDescanso &&
                                !horarioIntervencionRegistro.domingoInicio1RangoDescanso &&
                                !horarioIntervencionRegistro.domingoInicio2RangoDescanso &&
                                !horarioIntervencionRegistro.domingoFin1RangoDescanso &&
                                !horarioIntervencionRegistro.domingoFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "No has introducido ningún dato horario para registrar.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //segunda comprobación, coinciden todas las casillas en registro
                            if (!horarioIntervencionRegistro.lunesInicio1RangoDescanso && horarioIntervencionRegistro.lunesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.lunesFin1RangoDescanso && horarioIntervencionRegistro.lunesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.lunesInicio2RangoDescanso && horarioIntervencionRegistro.lunesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.lunesFin2RangoDescanso && horarioIntervencionRegistro.lunesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.martesInicio1RangoDescanso && horarioIntervencionRegistro.martesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.martesFin1RangoDescanso && horarioIntervencionRegistro.martesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.martesInicio2RangoDescanso && horarioIntervencionRegistro.martesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.martesFin2RangoDescanso && horarioIntervencionRegistro.martesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.miercolesInicio1RangoDescanso && horarioIntervencionRegistro.miercolesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.miercolesFin1RangoDescanso && horarioIntervencionRegistro.miercolesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.miercolesInicio2RangoDescanso && horarioIntervencionRegistro.miercolesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.miercolesFin2RangoDescanso && horarioIntervencionRegistro.miercolesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.juevesInicio1RangoDescanso && horarioIntervencionRegistro.juevesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.juevesFin1RangoDescanso && horarioIntervencionRegistro.juevesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.juevesInicio2RangoDescanso && horarioIntervencionRegistro.juevesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.juevesFin2RangoDescanso && horarioIntervencionRegistro.juevesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.viernesInicio1RangoDescanso && horarioIntervencionRegistro.viernesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.viernesFin1RangoDescanso && horarioIntervencionRegistro.viernesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.viernesInicio2RangoDescanso && horarioIntervencionRegistro.viernesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.viernesFin2RangoDescanso && horarioIntervencionRegistro.viernesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.sabadoInicio1RangoDescanso && horarioIntervencionRegistro.sabadoFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.sabadoFin1RangoDescanso && horarioIntervencionRegistro.sabadoInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.sabadoInicio2RangoDescanso && horarioIntervencionRegistro.sabadoFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.sabadoFin2RangoDescanso && horarioIntervencionRegistro.sabadoInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.domingoInicio1RangoDescanso && horarioIntervencionRegistro.domingoFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.domingoFin1RangoDescanso && horarioIntervencionRegistro.domingoInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.domingoInicio2RangoDescanso && horarioIntervencionRegistro.domingoFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionRegistro.domingoFin2RangoDescanso && horarioIntervencionRegistro.domingoInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //tercera comprobación, pasamos rango a minutos
                            let cantidadRango1;
                            let cantidadRango2;
                            let cantidadTotalRango;
                            if (horarioIntervencionRegistro.lunesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionRegistro.lunesInicio1RangoDescanso, horarioIntervencionRegistro.lunesFin1RangoDescanso);
                                if (horarioIntervencionRegistro.lunesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionRegistro.lunesInicio2RangoDescanso, horarioIntervencionRegistro.lunesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, lunesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionRegistro.martesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionRegistro.martesInicio1RangoDescanso, horarioIntervencionRegistro.martesFin1RangoDescanso);
                                if (horarioIntervencionRegistro.martesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionRegistro.martesInicio2RangoDescanso, horarioIntervencionRegistro.martesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, martesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionRegistro.miercolesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionRegistro.miercolesInicio1RangoDescanso, horarioIntervencionRegistro.miercolesFin1RangoDescanso);
                                if (horarioIntervencionRegistro.miercolesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionRegistro.miercolesInicio2RangoDescanso, horarioIntervencionRegistro.miercolesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, miercolesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionRegistro.juevesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionRegistro.juevesInicio1RangoDescanso, horarioIntervencionRegistro.juevesFin1RangoDescanso);
                                if (horarioIntervencionRegistro.juevesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionRegistro.juevesInicio2RangoDescanso, horarioIntervencionRegistro.juevesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, juevesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionRegistro.viernesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionRegistro.viernesInicio1RangoDescanso, horarioIntervencionRegistro.viernesFin1RangoDescanso);
                                if (horarioIntervencionRegistro.viernesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionRegistro.viernesInicio2RangoDescanso, horarioIntervencionRegistro.viernesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, viernesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionRegistro.sabadoInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionRegistro.sabadoInicio1RangoDescanso, horarioIntervencionRegistro.sabadoFin1RangoDescanso);
                                if (horarioIntervencionRegistro.sabadoInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionRegistro.sabadoInicio2RangoDescanso, horarioIntervencionRegistro.sabadoFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, sabadoCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionRegistro.domingoInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionRegistro.domingoInicio1RangoDescanso, horarioIntervencionRegistro.domingoFin1RangoDescanso);
                                if (horarioIntervencionRegistro.domingoInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionRegistro.domingoInicio2RangoDescanso, horarioIntervencionRegistro.domingoFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionRegistro({ ...horarioIntervencionRegistro, domingoCantidad: cantidadTotalRango });
                            };
                        };

                        if (horarioIntervencionRegistro.tipo === "cantidad") {
                            //comprobamos que no haya campos vacíos
                            if (horarioIntervencionRegistro.lunesCantidad === '' &&
                                horarioIntervencionRegistro.martesCantidad === '' &&
                                horarioIntervencionRegistro.miercolesCantidad === '' &&
                                horarioIntervencionRegistro.juevesCantidad === '' &&
                                horarioIntervencionRegistro.viernesCantidad === '' &&
                                horarioIntervencionRegistro.sabadoCantidad === '' &&
                                horarioIntervencionRegistro.domingoCantidad === '') {
                                setAlert({
                                    mensaje: "No has introducido ningún dato horario para registrar.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };

                        }
                        //comprobamos que array objetos trabajadores no tenga elementos vacíos

                        for (let i = 0; i < trabajadoresRegistro.cantidad; i++) {
                            if (trabajadoresRegistro.trabajadores[i]['trabajador_' + (i + 1)] === '' && trabajadoresRegistro.trabajadores[i]['suplente_' + (i + 1)] === '') {
                                setAlert({
                                    mensaje: "Alguno de los registros Trabajadores - Suplentes está vacío. Completa o cambia la cantidad de trabajadores asignados.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            }
                        };
                        //limpieza final  
                        let horarioIntervencionRegistroRevisado;
                        if (horarioIntervencionRegistro.tipo === 'rango') {
                            horarioIntervencionRegistroRevisado = {
                                tipo: horarioIntervencionRegistro.tipo,
                                variacion: horarioIntervencionRegistro.variacion,
                                lunesInicioRango: horarioIntervencionRegistro.lunesInicioRango,
                                lunesFinRango: horarioIntervencionRegistro.lunesFinRango,
                                martesInicioRango: horarioIntervencionRegistro.martesInicioRango,
                                martesFinRango: horarioIntervencionRegistro.martesFinRango,
                                miercolesInicioRango: horarioIntervencionRegistro.miercolesInicioRango,
                                miercolesFinRango: horarioIntervencionRegistro.miercolesFinRango,
                                juevesInicioRango: horarioIntervencionRegistro.juevesInicioRango,
                                juevesFinRango: horarioIntervencionRegistro.juevesFinRango,
                                viernesInicioRango: horarioIntervencionRegistro.viernesInicioRango,
                                viernesFinRango: horarioIntervencionRegistro.viernesFinRango,
                                sabadoInicioRango: horarioIntervencionRegistro.sabadoInicioRango,
                                sabadoFinRango: horarioIntervencionRegistro.sabadoFinRango,
                                domingoInicioRango: horarioIntervencionRegistro.domingoInicioRango,
                                domingoFinRango: horarioIntervencionRegistro.domingoFinRango
                            };
                        };
                        if (horarioIntervencionRegistro.tipo === 'rangoDescanso') {
                            horarioIntervencionRegistroRevisado = {
                                tipo: horarioIntervencionRegistro.tipo,
                                variacion: horarioIntervencionRegistro.variacion,
                                lunesInicio1RangoDescanso: horarioIntervencionRegistro.lunesInicio1RangoDescanso,
                                lunesInicio2RangoDescanso: horarioIntervencionRegistro.lunesInicio2RangoDescanso,
                                lunesFin1RangoDescanso: horarioIntervencionRegistro.lunesFin1RangoDescanso,
                                lunesFin2RangoDescanso: horarioIntervencionRegistro.lunesFin2RangoDescanso,
                                martesInicio1RangoDescanso: horarioIntervencionRegistro.martesInicio1RangoDescanso,
                                martesInicio2RangoDescanso: horarioIntervencionRegistro.martesInicio2RangoDescanso,
                                martesFin1RangoDescanso: horarioIntervencionRegistro.martesFin1RangoDescanso,
                                martesFin2RangoDescanso: horarioIntervencionRegistro.martesFin2RangoDescanso,
                                miercolesInicio1RangoDescanso: horarioIntervencionRegistro.miercolesInicio1RangoDescanso,
                                miercolesInicio2RangoDescanso: horarioIntervencionRegistro.miercolesInicio2RangoDescanso,
                                miercolesFin1RangoDescanso: horarioIntervencionRegistro.miercolesFin1RangoDescanso,
                                miercolesFin2RangoDescanso: horarioIntervencionRegistro.miercolesFin2RangoDescanso,
                                juevesInicio1RangoDescanso: horarioIntervencionRegistro.juevesInicio1RangoDescanso,
                                juevesInicio2RangoDescanso: horarioIntervencionRegistro.juevesInicio2RangoDescanso,
                                juevesFin1RangoDescanso: horarioIntervencionRegistro.juevesFin1RangoDescanso,
                                juevesFin2RangoDescanso: horarioIntervencionRegistro.juevesFin2RangoDescanso,
                                viernesInicio1RangoDescanso: horarioIntervencionRegistro.viernesInicio1RangoDescanso,
                                viernesInicio2RangoDescanso: horarioIntervencionRegistro.viernesInicio2RangoDescanso,
                                viernesFin1RangoDescanso: horarioIntervencionRegistro.viernesFin1RangoDescanso,
                                viernesFin2RangoDescanso: horarioIntervencionRegistro.viernesFin2RangoDescanso,
                                sabadoInicio1RangoDescanso: horarioIntervencionRegistro.sabadoInicio1RangoDescanso,
                                sabadoInicio2RangoDescanso: horarioIntervencionRegistro.sabadoInicio2RangoDescanso,
                                sabadoFin1RangoDescanso: horarioIntervencionRegistro.sabadoFin1RangoDescanso,
                                sabadoFin2RangoDescanso: horarioIntervencionRegistro.sabadoFin2RangoDescanso,
                                domingoInicio1RangoDescanso: horarioIntervencionRegistro.domingoInicio1RangoDescanso,
                                domingoInicio2RangoDescanso: horarioIntervencionRegistro.domingoInicio2RangoDescanso,
                                domingoFin1RangoDescanso: horarioIntervencionRegistro.domingoFin1RangoDescanso,
                                domingoFin2RangoDescanso: horarioIntervencionRegistro.domingoFin2RangoDescanso
                            };
                        };
                        if (horarioIntervencionRegistro.tipo === 'cantidad') {
                            horarioIntervencionRegistroRevisado = {
                                tipo: horarioIntervencionRegistro.tipo,
                                variacion: horarioIntervencionRegistro.variacion,
                                lunesCantidad: horarioIntervencionRegistro.lunesCantidad,
                                martesCantidad: horarioIntervencionRegistro.martesCantidad,
                                miercolesCantidad: horarioIntervencionRegistro.miercolesCantidad,
                                juevesCantidad: horarioIntervencionRegistro.juevesCantidad,
                                viernesCantidad: horarioIntervencionRegistro.viernesCantidad,
                                sabadoCantidad: horarioIntervencionRegistro.sabadoCantidad,
                                domingoCantidad: horarioIntervencionRegistro.domingoCantidad,
                            };
                        };
                        //añadimos cómputo final                        
                        const elHorarioIntervencionRegistradoRevisado = {
                            ...horarioIntervencionRegistroRevisado,
                            computo: valuesFormRegistro.computo,
                            mensualPactado: valuesFormRegistro.mensualPactado,
                            precioHora: valuesFormRegistro.precioHora
                        }
                        //registramos
                        const centroAGuardar = {
                            id: valuesFormRegistro.id,
                            nombre: valuesFormRegistro.nombre,
                            categoria: valuesFormRegistro.categoria,
                            horario: JSON.stringify(elHorarioIntervencionRegistradoRevisado),
                            trabajadores: JSON.stringify(trabajadoresRegistro),
                        };
                        dispatch(registrarCentroAccion('centros', centroAGuardar.id, centroAGuardar));
                        dispatch(registrarIntervencionAccion(true));
                        dispatch(activarDesactivarNuevoCentroAccion(false));
                        dispatch(activarDesactivarRegistrarCentroAccion(true));
                    };
                    procesarDatosRegistro();
                    break;
                default:
            }
        }
    }));

    const reseteaContenidoRegistro = () => {
        setValuesFormRegistro({
            id: null,
            nombre: '',
            categoria: '',
            variacion: '',
            tipo: '',
            numeroTrabajadores: '',
            datosTrabajadores: [],
            datosSuplentes: [],
            computo: '',
            mensualPactado: null,
            precioHora: null
        });
        setValueTimePickerInicioRegistro({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerFinRegistro({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerInicioDescanso1Registro({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerFinDescanso1Registro({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerInicioDescanso2Registro({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerFinDescanso2Registro({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueCantidadHorasRegistro({
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: '',
            sabado: '',
            domingo: ''
        });
        setHorarioIntervencionRegistro({
            tipo: '',
            variacion: '',
            lunesInicioRango: null,
            lunesFinRango: null,
            martesInicioRango: null,
            martesFinRango: null,
            miercolesInicioRango: null,
            miercolesFinRango: null,
            juevesInicioRango: null,
            juevesFinRango: null,
            viernesInicioRango: null,
            viernesFinRango: null,
            sabadoInicioRango: null,
            sabadoFinRango: null,
            domingoInicioRango: null,
            domingoFinRango: null,
            lunesInicio1RangoDescanso: null,
            lunesInicio2RangoDescanso: null,
            lunesFin1RangoDescanso: null,
            lunesFin2RangoDescanso: null,
            martesInicio1RangoDescanso: null,
            martesInicio2RangoDescanso: null,
            martesFin1RangoDescanso: null,
            martesFin2RangoDescanso: null,
            miercolesInicio1RangoDescanso: null,
            miercolesInicio2RangoDescanso: null,
            miercolesFin1RangoDescanso: null,
            miercolesFin2RangoDescanso: null,
            juevesInicio1RangoDescanso: null,
            juevesInicio2RangoDescanso: null,
            juevesFin1RangoDescanso: null,
            juevesFin2RangoDescanso: null,
            viernesInicio1RangoDescanso: null,
            viernesInicio2RangoDescanso: null,
            viernesFin1RangoDescanso: null,
            viernesFin2RangoDescanso: null,
            sabadoInicio1RangoDescanso: null,
            sabadoInicio2RangoDescanso: null,
            sabadoFin1RangoDescanso: null,
            sabadoFin2RangoDescanso: null,
            domingoInicio1RangoDescanso: null,
            domingoInicio2RangoDescanso: null,
            domingoFin1RangoDescanso: null,
            domingoFin2RangoDescanso: null,
            lunesCantidad: '',
            martesCantidad: '',
            miercolesCantidad: '',
            juevesCantidad: '',
            viernesCantidad: '',
            sabadoCantidad: '',
            domingoCantidad: '',
        });
        setTrabajadoresRegistro({
            cantidad: '',
            trabajadores: []
        });
    };

    const generarSelectsTrabajadores = (numeroSelects) => {
        let array = [];
        for (let i = 0; i < numeroSelects; i++) {
            array.push(i + 1);
        }
        return (
            array.map((index) => (
                <Box
                    key={`box-trabajadores-` + index}
                    p={0.5}
                    className={classes.mb15}
                >
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.mb20}
                    >
                        <InputLabel>{`Trabajador-` + index}</InputLabel>
                        <Select
                            id={`form-trabajador-` + index}
                            value={valuesFormRegistro.datosTrabajadores[index - 1] || ''}
                            onChange={handleChangeFormRegistroSelectsTrabajadores('trabajador', index - 1)}
                            input={
                                <OutlinedInput
                                    labelWidth={95}
                                />
                            }
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
                            {listadoTrabajadores.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel>{`Suplente-` + index}</InputLabel>
                        <Select
                            id={`form-suplente-` + index}
                            value={valuesFormRegistro.datosSuplentes[index - 1] || ''}
                            onChange={handleChangeFormRegistroSelectsTrabajadores('suplente', index - 1)}
                            input={
                                <OutlinedInput
                                    labelWidth={80}
                                />
                            }
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
                            {listadoTrabajadores.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            ))
        )
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
                                p={1.5}
                                m={0.5}
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={classes.mb25}
                            >
                                Datos generales
                            </Box>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                            >
                                <InputLabel>Nombre</InputLabel>
                                <OutlinedInput
                                    className={classes.mb15}
                                    fullWidth
                                    id="form-nombre-centro-registro"
                                    value={valuesFormRegistro.nombre}
                                    onChange={handleChangeFormRegistro('nombre')}
                                    labelWidth={60}
                                />
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                            >
                                <InputLabel>Categoría Centro</InputLabel>
                                <Select
                                    fullWidth
                                    className={classes.mb25}
                                    id="form-categoria-registro"
                                    label="Categoría Centro"
                                    value={valuesFormRegistro.categoria}
                                    onChange={handleChangeFormRegistro('categoria')}
                                    helpertext="Selecciona categoria"
                                >
                                    {
                                        categorias.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <Box
                                p={1.5}
                                m={0.5}
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={classes.mb25}
                            >
                                Trabajadores
                            </Box>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
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
                                    {
                                        totalTrabajadores.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            {trabajadoresRegistro.cantidad !== '' ? (generarSelectsTrabajadores(trabajadoresRegistro.cantidad)) : null}
                        </Box>
                    </Grid>
                    <Grid item lg={8} sm={6} xs={12}>
                        <Box
                            p={1.5}
                            m={0.5}
                            bgcolor="secondary.light"
                            color="secondary.contrastText"
                            className={classes.mb25}
                        >
                            Horario de intervención
                        </Box>
                        <Grid
                            container
                            direction="row"
                            justifycontent="flex-start"
                            alignItems="flex-start"
                            spacing={4}
                        >
                            <Grid item lg={5} sm={6} xs={12}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
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
                                        {
                                            tipos.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                >
                                    <InputLabel>Variaciones</InputLabel>
                                    <Select
                                        fullWidth
                                        className={classes.mb25}
                                        id="form-variaciones-registro"
                                        label="Variaciones"
                                        value={valuesFormRegistro.variacion}
                                        onChange={handleChangeFormRegistro('variacion')}
                                        helpertext="Selecciona variaciones"
                                    >
                                        {
                                            variaciones.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Box
                                    p={1.5}
                                    m={0.5}
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={classes.mb25}
                                >
                                    Cómputo de horas
                                </Box>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
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
                                        {
                                            computoHoras.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                {valuesFormRegistro.computo === 1 ? (
                                    <FormControl
                                        variant="outlined"
                                        className={classes.form}
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
                                {valuesFormRegistro.computo === 2 ? (
                                    <FormControl
                                        variant="outlined"
                                        className={classes.form}
                                    >
                                        <InputLabel>Precio hora</InputLabel>
                                        <OutlinedInput
                                            className={classes.mb15}
                                            fullWidth
                                            id="form-precio-hora-registro"
                                            value={valuesFormRegistro.precioHora || ''}
                                            onChange={handleChangeFormRegistro('precioHora')}
                                            labelWidth={90}
                                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                        />
                                    </FormControl>
                                ) : null}
                            </Grid>
                            <Grid item lg={7} sm={6} xs={12}>
                                <Box style={{ marginTop: -10 }}>
                                    <List >
                                        {valuesFormRegistro.tipo === 'rango' ? (
                                            <Fragment>
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={false}
                                                    prDia={'Lunes'}
                                                    prIdInicio={'timePickerInicio-registro-lunes'}
                                                    prIdFin={'timePickerFin-registro-lunes'}
                                                    prValueTimePickerInicio={valueTimePickerInicioRegistro.lunes}
                                                    prValueTimePickerFin={valueTimePickerFinRegistro.lunes}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={false}
                                                    prDia={'Martes'}
                                                    prIdInicio={'timePickerInicio-registro-martes'}
                                                    prIdFin={'timePickerFin-registro-martes'}
                                                    prValueTimePickerInicio={valueTimePickerInicioRegistro.martes}
                                                    prValueTimePickerFin={valueTimePickerFinRegistro.martes}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={false}
                                                    prDia={'Miércoles'}
                                                    prIdInicio={'timePickerInicio-registro-miercoles'}
                                                    prIdFin={'timePickerFin-registro-miercoles'}
                                                    prValueTimePickerInicio={valueTimePickerInicioRegistro.miercoles}
                                                    prValueTimePickerFin={valueTimePickerFinRegistro.miercoles}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={false}
                                                    prDia={'Jueves'}
                                                    prIdInicio={'timePickerInicio-registro-jueves'}
                                                    prIdFin={'timePickerFin-registro-jueves'}
                                                    prValueTimePickerInicio={valueTimePickerInicioRegistro.jueves}
                                                    prValueTimePickerFin={valueTimePickerFinRegistro.jueves}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={false}
                                                    prDia={'Viernes'}
                                                    prIdInicio={'timePickerInicio-registro-viernes'}
                                                    prIdFin={'timePickerFin-registro-viernes'}
                                                    prValueTimePickerInicio={valueTimePickerInicioRegistro.viernes}
                                                    prValueTimePickerFin={valueTimePickerFinRegistro.viernes}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={false}
                                                    prDia={'Sábado'}
                                                    prIdInicio={'timePickerInicio-registro-sabado'}
                                                    prIdFin={'timePickerFin-registro-sabado'}
                                                    prValueTimePickerInicio={valueTimePickerInicioRegistro.sabado}
                                                    prValueTimePickerFin={valueTimePickerFinRegistro.sabado}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={false}
                                                    prDia={'Domingo'}
                                                    prIdInicio={'timePickerInicio-registro-domingo'}
                                                    prIdFin={'timePickerFin-registro-domingo'}
                                                    prValueTimePickerInicio={valueTimePickerInicioRegistro.domingo}
                                                    prValueTimePickerFin={valueTimePickerFinRegistro.domingo}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                            </Fragment>
                                        ) : valuesFormRegistro.tipo === 'cantidad' ? (
                                            <Fragment>
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={false}
                                                    prDia={'Lunes'}
                                                    prIdCantidad={'selectCantidad-registro-lunes'}
                                                    prValueCantidadHoras={valueCantidadHorasRegistro.lunes}
                                                    prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={false}
                                                    prDia={'Martes'}
                                                    prIdCantidad={'selectCantidad-registro-martes'}
                                                    prValueCantidadHoras={valueCantidadHorasRegistro.martes}
                                                    prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={false}
                                                    prDia={'Miércoles'}
                                                    prIdCantidad={'selectCantidad-registro-miercoles'}
                                                    prValueCantidadHoras={valueCantidadHorasRegistro.miercoles}
                                                    prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={false}
                                                    prDia={'Jueves'}
                                                    prIdCantidad={'selectCantidad-registro-jueves'}
                                                    prValueCantidadHoras={valueCantidadHorasRegistro.jueves}
                                                    prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={false}
                                                    prDia={'Viernes'}
                                                    prIdCantidad={'selectCantidad-registro-viernes'}
                                                    prValueCantidadHoras={valueCantidadHorasRegistro.viernes}
                                                    prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={false}
                                                    prDia={'Sábado'}
                                                    prIdCantidad={'selectCantidad-registro-sabado'}
                                                    prValueCantidadHoras={valueCantidadHorasRegistro.sabado}
                                                    prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={false}
                                                    prDia={'Domingo'}
                                                    prIdCantidad={'selectCantidad-registro-domingo'}
                                                    prValueCantidadHoras={valueCantidadHorasRegistro.domingo}
                                                    prHandleChangeSelectCantidadRegistro={handleChangeSelectCantidadRegistro}
                                                />
                                            </Fragment>
                                        ) : valuesFormRegistro.tipo === 'rangoDescanso' ? (
                                            <Fragment>
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={false}
                                                    prDia={'Lun.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-registro-lunes'}
                                                    prIdFin1={'timePickerFin1Descanso-registro-lunes'}
                                                    prIdInicio2={'timePickerInicio2Descanso-registro-lunes'}
                                                    prIdFin2={'timePickerFin2Descanso-registro-lunes'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro.lunes}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Registro.lunes}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro.lunes}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Registro.lunes}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={false}
                                                    prDia={'Mar.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-registro-martes'}
                                                    prIdFin1={'timePickerFin1Descanso-registro-martes'}
                                                    prIdInicio2={'timePickerInicio2Descanso-registro-martes'}
                                                    prIdFin2={'timePickerFin2Descanso-registro-martes'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro.martes}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Registro.martes}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro.martes}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Registro.martes}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={false}
                                                    prDia={'Mié.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-registro-miercoles'}
                                                    prIdFin1={'timePickerFin1Descanso-registro-miercoles'}
                                                    prIdInicio2={'timePickerInicio2Descanso-registro-miercoles'}
                                                    prIdFin2={'timePickerFin2Descanso-registro-miercoles'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro.miercoles}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Registro.miercoles}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro.miercoles}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Registro.miercoles}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={false}
                                                    prDia={'Jue.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-registro-jueves'}
                                                    prIdFin1={'timePickerFin1Descanso-registro-jueves'}
                                                    prIdInicio2={'timePickerInicio2Descanso-registro-jueves'}
                                                    prIdFin2={'timePickerFin2Descanso-registro-jueves'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro.jueves}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Registro.jueves}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro.jueves}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Registro.jueves}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={false}
                                                    prDia={'Vie.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-registro-viernes'}
                                                    prIdFin1={'timePickerFin1Descanso-registro-viernes'}
                                                    prIdInicio2={'timePickerInicio2Descanso-registro-viernes'}
                                                    prIdFin2={'timePickerFin2Descanso-registro-viernes'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro.viernes}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Registro.viernes}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro.viernes}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Registro.viernes}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={false}
                                                    prDia={'Sáb.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-registro-sabado'}
                                                    prIdFin1={'timePickerFin1Descanso-registro-sabado'}
                                                    prIdInicio2={'timePickerInicio2Descanso-registro-sabado'}
                                                    prIdFin2={'timePickerFin2Descanso-registro-sabado'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro.sabado}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Registro.sabado}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro.sabado}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Registro.sabado}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={false}
                                                    prDia={'Dom.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-registro-domingo'}
                                                    prIdFin1={'timePickerFin1Descanso-registro-domingo'}
                                                    prIdInicio2={'timePickerInicio2Descanso-registro-domingo'}
                                                    prIdFin2={'timePickerFin2Descanso-registro-domingo'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Registro.domingo}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Registro.domingo}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Registro.domingo}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Registro.domingo}
                                                    prHandleChangeTimePickerInicioRegistro={handleChangeTimePickerInicioRegistro}
                                                    prHandleChangeTimePickerFinRegistro={handleChangeTimePickerFinRegistro}
                                                />
                                            </Fragment>
                                        ) : null}
                                    </List>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(trabajadoresRegistro.trabajadores)} */}

        </div>
    )
})

export default CentrosRegistrar
