import React, { useState, useEffect, Fragment, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';

//carga componentes
import ItemListTime from './ItemListTime';
import DialogComponente from './DialogComponente';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerCentrosAccion } from '../redux/centrosDucks';
import { obtenerCentroAccion } from '../redux/centrosDucks';
import { actualizarCentroAccion } from '../redux/centrosDucks';
import { obtenerTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';
import { retornaHoraRangoAccion } from '../redux/appDucks';
import { retornaMinutosAccion } from '../redux/appDucks';
import { generaFechaAccion } from '../redux/appDucks';
import { onEstemAccion } from '../redux/appDucks';
import { eliminarCentroAccion } from '../redux/centrosDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { activarDesactivarActualizarCentroAccion } from '../redux/centrosDucks';
//import { vaciarDatosCentrosAccion } from '../redux/centrosDucks';
import { validarMailAccion } from '../redux/appDucks';

const categorias = Constantes.CATEGORIAS_CENTROS;
const variaciones = Constantes.VARIACIONES_HORARIOS_CENTROS;
const tipos = Constantes.MODO_ENTRADA_HORARIOS;
const totalTrabajadores = Constantes.TRABAJADORES_ASIGNADOS_CENTRO;
const computoHoras = Constantes.COMPUTO_HORAS;
const formasDePago = Constantes.FORMA_DE_PAGO;

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

    //states

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openSnack, setOpenSnack] = useState(false);
    const [valuesAutocompleteCentrosValores, setValuesAutocompleteCentrosValores] = useState(null);
    const [alert, setAlert] = useState({});
    const [valuesFormEdicion, setValuesFormEdicion] = useState({
        id: null,
        nombre: '',
        categoria: '',
        codigo: '',
        domicilio: '',
        codigoPostal: '',
        poblacion: '',
        provincia: '',
        nif: '',
        mail: '',
        telefono: '',
        formaPago: '',
        variacion: '',
        tipo: '',
        numeroTrabajadores: '',
        datosTrabajadores: [],
        datosSuplentes: [],
        computo: '',
        mensualPactado: null,
        precioHora_L: null,
        precioHora_C: null,
        precioHora_E: null,
        precioHora_I: null,
        precioHora_Z: null,
        precioHora_T: null,
        precioHora_P: null
    });
    const [valueTimePickerInicioEdicion, setValueTimePickerInicioEdicion] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerFinEdicion, setValueTimePickerFinEdicion] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerInicioDescanso1Edicion, setValueTimePickerInicioDescanso1Edicion] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerFinDescanso1Edicion, setValueTimePickerFinDescanso1Edicion] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerInicioDescanso2Edicion, setValueTimePickerInicioDescanso2Edicion] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueTimePickerFinDescanso2Edicion, setValueTimePickerFinDescanso2Edicion] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    });
    const [valueCantidadHorasEdicion, setValueCantidadHorasEdicion] = useState({
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: '',
        domingo: ''
    });
    const [valueTipoServicioEdicion, setValueTipoServicioEdicion] = useState({
        lunesTipoServicio: '',
        martesTipoServicio: '',
        miercolesTipoServicio: '',
        juevesTipoServicio: '',
        viernesTipoServicio: '',
        sabadoTipoServicio: '',
        domingoTipoServicio: '',
    });
    const [horarioIntervencionEdicion, setHorarioIntervencionEdicion] = useState({
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
        lunesTipoServicio: '',
        martesTipoServicio: '',
        miercolesTipoServicio: '',
        juevesTipoServicio: '',
        viernesTipoServicio: '',
        sabadoTipoServicio: '',
        domingoTipoServicio: '',
    });
    const [trabajadoresEdicion, setTrabajadoresEdicion] = useState({
        cantidad: '',
        trabajadores: []
    });
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        //dispatch(vaciarDatosCentrosAccion());
        dispatch(onEstemAccion('editarCentros'));
        if (listadoCentros.length === 0) {
            dispatch(obtenerCentrosAccion('centros'));
        };
        if (listadoTrabajadores.length === 0) {
            dispatch(obtenerTrabajadoresAccion('trabajadores'));
        };
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
        }
    }, [exitoActualizacionCentro]);

    useEffect(() => {
        if (exitoEliminarCentro) {
            setAlert({
                mensaje: "Registro eliminado correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoEliminarCentro]);

    useEffect(() => {
        const arrayTr = [];
        const arraySu = [];
        if (centroAEditar.trabajadores.trabajadores.length > 0) {
            centroAEditar.trabajadores.trabajadores.forEach((trabajadorIterado, index) => {
                arrayTr.push(trabajadorIterado['trabajador_' + (index + 1)]);
                arraySu.push(trabajadorIterado['suplente_' + (index + 1)]);
            });
        }
        setValuesFormEdicion({
            ...valuesFormEdicion,
            id: centroAEditar.id,
            nombre: centroAEditar.nombre || '',
            categoria: centroAEditar.categoria || '',
            codigo: centroAEditar.codigo || '',
            domicilio: centroAEditar.domicilio || '',
            codigoPostal: centroAEditar.codigoPostal || '',
            poblacion: centroAEditar.poblacion || '',
            provincia: centroAEditar.provincia || '',
            nif: centroAEditar.nif || '',
            mail: centroAEditar.mail || '',
            telefono: centroAEditar.telefono || '',
            formaPago: centroAEditar.formaPago || '',
            variacion: centroAEditar.horario.variacion || '',
            tipo: centroAEditar.horario.tipo,
            numeroTrabajadores: centroAEditar.trabajadores.cantidad,
            datosTrabajadores: arrayTr,
            datosSuplentes: arraySu,
            computo: centroAEditar.horario.computo,
            mensualPactado: centroAEditar.horario.mensualPactado,
            precioHora_L: centroAEditar.horario.precioHora_L,
            precioHora_C: centroAEditar.horario.precioHora_C,
            precioHora_E: centroAEditar.horario.precioHora_E,
            precioHora_I: centroAEditar.horario.precioHora_I,
            precioHora_Z: centroAEditar.horario.precioHora_Z,
            precioHora_T: centroAEditar.horario.precioHora_T,
            precioHora_P: centroAEditar.horario.precioHora_P,
        });
        if (centroAEditar.horario.tipo === "rango") {
            setValueTimePickerInicioEdicion({
                ...valueTimePickerInicioEdicion,
                lunes: (centroAEditar.horario.lunesInicioRango ? generaFecha(centroAEditar.horario.lunesInicioRango) : null),
                martes: (centroAEditar.horario.martesInicioRango ? generaFecha(centroAEditar.horario.martesInicioRango) : null),
                miercoles: (centroAEditar.horario.miercolesInicioRango ? generaFecha(centroAEditar.horario.miercolesInicioRango) : null),
                jueves: (centroAEditar.horario.juevesInicioRango ? generaFecha(centroAEditar.horario.juevesInicioRango) : null),
                viernes: (centroAEditar.horario.viernesInicioRango ? generaFecha(centroAEditar.horario.viernesInicioRango) : null),
                sabado: (centroAEditar.horario.sabadoInicioRango ? generaFecha(centroAEditar.horario.sabadoInicioRango) : null),
                domingo: (centroAEditar.horario.domingoInicioRango ? generaFecha(centroAEditar.horario.domingoInicioRango) : null),
            });
            setValueTimePickerFinEdicion({
                ...valueTimePickerFinEdicion,
                lunes: (centroAEditar.horario.lunesFinRango ? generaFecha(centroAEditar.horario.lunesFinRango) : null),
                martes: (centroAEditar.horario.martesFinRango ? generaFecha(centroAEditar.horario.martesFinRango) : null),
                miercoles: (centroAEditar.horario.miercolesFinRango ? generaFecha(centroAEditar.horario.miercolesFinRango) : null),
                jueves: (centroAEditar.horario.juevesFinRango ? generaFecha(centroAEditar.horario.juevesFinRango) : null),
                viernes: (centroAEditar.horario.viernesFinRango ? generaFecha(centroAEditar.horario.viernesFinRango) : null),
                sabado: (centroAEditar.horario.sabadoFinRango ? generaFecha(centroAEditar.horario.sabadoFinRango) : null),
                domingo: (centroAEditar.horario.domingoFinRango ? generaFecha(centroAEditar.horario.domingoFinRango) : null),
            })
        };
        if (centroAEditar.horario.tipo === "cantidad") {
            setValueCantidadHorasEdicion({
                ...valueCantidadHorasEdicion,
                lunes: centroAEditar.horario.lunesCantidad,
                martes: centroAEditar.horario.martesCantidad,
                miercoles: centroAEditar.horario.miercolesCantidad,
                jueves: centroAEditar.horario.juevesCantidad,
                viernes: centroAEditar.horario.viernesCantidad,
                sabado: centroAEditar.horario.sabadoCantidad,
                domingo: centroAEditar.horario.domingoCantidad,
            })
        };
        if (centroAEditar.horario.tipo === "rangoDescanso") {
            setValueTimePickerInicioDescanso1Edicion({
                ...valueTimePickerInicioDescanso1Edicion,
                lunes: (centroAEditar.horario.lunesInicio1RangoDescanso ? generaFecha(centroAEditar.horario.lunesInicio1RangoDescanso) : null),
                martes: (centroAEditar.horario.martesInicio1RangoDescanso ? generaFecha(centroAEditar.horario.martesInicio1RangoDescanso) : null),
                miercoles: (centroAEditar.horario.miercolesInicio1RangoDescanso ? generaFecha(centroAEditar.horario.miercolesInicio1RangoDescanso) : null),
                jueves: (centroAEditar.horario.juevesInicio1RangoDescanso ? generaFecha(centroAEditar.horario.juevesInicio1RangoDescanso) : null),
                viernes: (centroAEditar.horario.viernesInicio1RangoDescanso ? generaFecha(centroAEditar.horario.viernesInicio1RangoDescanso) : null),
                sabado: (centroAEditar.horario.sabadoInicio1RangoDescanso ? generaFecha(centroAEditar.horario.sabadoInicio1RangoDescanso) : null),
                domingo: (centroAEditar.horario.domingoInicio1RangoDescanso ? generaFecha(centroAEditar.horario.domingoInicio1RangoDescanso) : null),
            });
            setValueTimePickerFinDescanso1Edicion({
                ...valueTimePickerFinDescanso1Edicion,
                lunes: (centroAEditar.horario.lunesFin1RangoDescanso ? generaFecha(centroAEditar.horario.lunesFin1RangoDescanso) : null),
                martes: (centroAEditar.horario.martesFin1RangoDescanso ? generaFecha(centroAEditar.horario.martesFin1RangoDescanso) : null),
                miercoles: (centroAEditar.horario.miercolesFin1RangoDescanso ? generaFecha(centroAEditar.horario.miercolesFin1RangoDescanso) : null),
                jueves: (centroAEditar.horario.juevesFin1RangoDescanso ? generaFecha(centroAEditar.horario.juevesFin1RangoDescanso) : null),
                viernes: (centroAEditar.horario.viernesFin1RangoDescanso ? generaFecha(centroAEditar.horario.viernesFin1RangoDescanso) : null),
                sabado: (centroAEditar.horario.sabadoFin1RangoDescanso ? generaFecha(centroAEditar.horario.sabadoFin1RangoDescanso) : null),
                domingo: (centroAEditar.horario.domingoFin1RangoDescanso ? generaFecha(centroAEditar.horario.domingoFin1RangoDescanso) : null),
            });
            setValueTimePickerInicioDescanso2Edicion({
                ...valueTimePickerInicioDescanso2Edicion,
                lunes: (centroAEditar.horario.lunesInicio2RangoDescanso ? generaFecha(centroAEditar.horario.lunesInicio2RangoDescanso) : null),
                martes: (centroAEditar.horario.martesInicio2RangoDescanso ? generaFecha(centroAEditar.horario.martesInicio2RangoDescanso) : null),
                miercoles: (centroAEditar.horario.miercolesInicio2RangoDescanso ? generaFecha(centroAEditar.horario.miercolesInicio2RangoDescanso) : null),
                jueves: (centroAEditar.horario.juevesInicio2RangoDescanso ? generaFecha(centroAEditar.horario.juevesInicio2RangoDescanso) : null),
                viernes: (centroAEditar.horario.viernesInicio2RangoDescanso ? generaFecha(centroAEditar.horario.viernesInicio2RangoDescanso) : null),
                sabado: (centroAEditar.horario.sabadoInicio2RangoDescanso ? generaFecha(centroAEditar.horario.sabadoInicio2RangoDescanso) : null),
                domingo: (centroAEditar.horario.domingoInicio2RangoDescanso ? generaFecha(centroAEditar.horario.domingoInicio2RangoDescanso) : null),
            });
            setValueTimePickerFinDescanso2Edicion({
                ...valueTimePickerFinDescanso2Edicion,
                lunes: (centroAEditar.horario.lunesFin2RangoDescanso ? generaFecha(centroAEditar.horario.lunesFin2RangoDescanso) : null),
                martes: (centroAEditar.horario.martesFin2RangoDescanso ? generaFecha(centroAEditar.horario.martesFin2RangoDescanso) : null),
                miercoles: (centroAEditar.horario.miercolesFin2RangoDescanso ? generaFecha(centroAEditar.horario.miercolesFin2RangoDescanso) : null),
                jueves: (centroAEditar.horario.juevesFin2RangoDescanso ? generaFecha(centroAEditar.horario.juevesFin2RangoDescanso) : null),
                viernes: (centroAEditar.horario.viernesFin2RangoDescanso ? generaFecha(centroAEditar.horario.viernesFin2RangoDescanso) : null),
                sabado: (centroAEditar.horario.sabadoFin2RangoDescanso ? generaFecha(centroAEditar.horario.sabadoFin2RangoDescanso) : null),
                domingo: (centroAEditar.horario.domingoFin2RangoDescanso ? generaFecha(centroAEditar.horario.domingoFin2RangoDescanso) : null),
            });
        };
        setValueTipoServicioEdicion({
            ...valueTipoServicioEdicion,
            lunesTipoServicio: centroAEditar.horario.lunesTipoServicio,
            martesTipoServicio: centroAEditar.horario.martesTipoServicio,
            miercolesTipoServicio: centroAEditar.horario.miercolesTipoServicio,
            juevesTipoServicio: centroAEditar.horario.juevesTipoServicio,
            viernesTipoServicio: centroAEditar.horario.viernesTipoServicio,
            sabadoTipoServicio: centroAEditar.horario.sabadoTipoServicio,
            domingoTipoServicio: centroAEditar.horario.domingoTipoServicio,
        });
        setHorarioIntervencionEdicion({
            tipo: centroAEditar.horario.tipo,
            variacion: centroAEditar.horario.variacion,
            lunesInicioRango: centroAEditar.horario.lunesInicioRango ? centroAEditar.horario.lunesInicioRango : null,
            lunesFinRango: centroAEditar.horario.lunesFinRango ? centroAEditar.horario.lunesFinRango : null,
            martesInicioRango: centroAEditar.horario.martesInicioRango ? centroAEditar.horario.martesInicioRango : null,
            martesFinRango: centroAEditar.horario.martesFinRango ? centroAEditar.horario.martesFinRango : null,
            miercolesInicioRango: centroAEditar.horario.miercolesInicioRango ? centroAEditar.horario.miercolesInicioRango : null,
            miercolesFinRango: centroAEditar.horario.miercolesFinRango ? centroAEditar.horario.miercolesFinRango : null,
            juevesInicioRango: centroAEditar.horario.juevesInicioRango ? centroAEditar.horario.juevesInicioRango : null,
            juevesFinRango: centroAEditar.horario.juevesFinRango ? centroAEditar.horario.juevesFinRango : null,
            viernesInicioRango: centroAEditar.horario.viernesInicioRango ? centroAEditar.horario.viernesInicioRango : null,
            viernesFinRango: centroAEditar.horario.viernesFinRango ? centroAEditar.horario.viernesFinRango : null,
            sabadoInicioRango: centroAEditar.horario.sabadoInicioRango ? centroAEditar.horario.sabadoInicioRango : null,
            sabadoFinRango: centroAEditar.horario.sabadoFinRango ? centroAEditar.horario.sabadoFinRango : null,
            domingoInicioRango: centroAEditar.horario.domingoInicioRango ? centroAEditar.horario.domingoInicioRango : null,
            domingoFinRango: centroAEditar.horario.domingoFinRango ? centroAEditar.horario.domingoFinRango : null,
            lunesInicio1RangoDescanso: centroAEditar.horario.lunesInicio1RangoDescanso ? centroAEditar.horario.lunesInicio1RangoDescanso : null,
            lunesInicio2RangoDescanso: centroAEditar.horario.lunesInicio2RangoDescanso ? centroAEditar.horario.lunesInicio2RangoDescanso : null,
            lunesFin1RangoDescanso: centroAEditar.horario.lunesFin2RangoDescanso ? centroAEditar.horario.lunesFin2RangoDescanso : null,
            lunesFin2RangoDescanso: centroAEditar.horario.lunesFin2RangoDescanso ? centroAEditar.horario.lunesFin2RangoDescanso : null,
            martesInicio1RangoDescanso: centroAEditar.horario.martesInicio1RangoDescanso ? centroAEditar.horario.martesInicio1RangoDescanso : null,
            martesInicio2RangoDescanso: centroAEditar.horario.martesInicio2RangoDescanso ? centroAEditar.horario.martesInicio2RangoDescanso : null,
            martesFin1RangoDescanso: centroAEditar.horario.martesFin1RangoDescanso ? centroAEditar.horario.martesFin1RangoDescanso : null,
            martesFin2RangoDescanso: centroAEditar.horario.martesFin2RangoDescanso ? centroAEditar.horario.martesFin2RangoDescanso : null,
            miercolesInicio1RangoDescanso: centroAEditar.horario.miercolesInicio1RangoDescanso ? centroAEditar.horario.miercolesInicio1RangoDescanso : null,
            miercolesInicio2RangoDescanso: centroAEditar.horario.miercolesInicio2RangoDescanso ? centroAEditar.horario.miercolesInicio2RangoDescanso : null,
            miercolesFin1RangoDescanso: centroAEditar.horario.miercolesFin1RangoDescanso ? centroAEditar.horario.miercolesFin1RangoDescanso : null,
            miercolesFin2RangoDescanso: centroAEditar.horario.miercolesFin2RangoDescanso ? centroAEditar.horario.miercolesFin2RangoDescanso : null,
            juevesInicio1RangoDescanso: centroAEditar.horario.juevesInicio1RangoDescanso ? centroAEditar.horario.juevesInicio1RangoDescanso : null,
            juevesInicio2RangoDescanso: centroAEditar.horario.juevesInicio2RangoDescanso ? centroAEditar.horario.juevesInicio2RangoDescanso : null,
            juevesFin1RangoDescanso: centroAEditar.horario.juevesFin1RangoDescanso ? centroAEditar.horario.juevesFin1RangoDescanso : null,
            juevesFin2RangoDescanso: centroAEditar.horario.juevesFin2RangoDescanso ? centroAEditar.horario.juevesFin2RangoDescanso : null,
            viernesInicio1RangoDescanso: centroAEditar.horario.viernesInicio1RangoDescanso ? centroAEditar.horario.viernesInicio1RangoDescanso : null,
            viernesInicio2RangoDescanso: centroAEditar.horario.viernesInicio2RangoDescanso ? centroAEditar.horario.viernesInicio2RangoDescanso : null,
            viernesFin1RangoDescanso: centroAEditar.horario.viernesFin1RangoDescanso ? centroAEditar.horario.viernesFin1RangoDescanso : null,
            viernesFin2RangoDescanso: centroAEditar.horario.viernesFin2RangoDescanso ? centroAEditar.horario.viernesFin2RangoDescanso : null,
            sabadoInicio1RangoDescanso: centroAEditar.horario.sabadoInicio1RangoDescanso ? centroAEditar.horario.sabadoInicio1RangoDescanso : null,
            sabadoInicio2RangoDescanso: centroAEditar.horario.sabadoInicio2RangoDescanso ? centroAEditar.horario.sabadoInicio2RangoDescanso : null,
            sabadoFin1RangoDescanso: centroAEditar.horario.sabadoFin1RangoDescanso ? centroAEditar.horario.sabadoFin1RangoDescanso : null,
            sabadoFin2RangoDescanso: centroAEditar.horario.sabadoFin2RangoDescanso ? centroAEditar.horario.sabadoFin2RangoDescanso : null,
            domingoInicio1RangoDescanso: centroAEditar.horario.domingoInicio1RangoDescanso ? centroAEditar.horario.domingoInicio1RangoDescanso : null,
            domingoInicio2RangoDescanso: centroAEditar.horario.domingoInicio2RangoDescanso ? centroAEditar.horario.domingoInicio2RangoDescanso : null,
            domingoFin1RangoDescanso: centroAEditar.horario.domingoFin1RangoDescanso ? centroAEditar.horario.domingoFin1RangoDescanso : null,
            domingoFin2RangoDescanso: centroAEditar.horario.domingoFin2RangoDescanso ? centroAEditar.horario.domingoFin2RangoDescanso : null,
            lunesCantidad: centroAEditar.horario.lunesCantidad ? centroAEditar.horario.lunesCantidad : '',
            martesCantidad: centroAEditar.horario.martesCantidad ? centroAEditar.horario.martesCantidad : '',
            miercolesCantidad: centroAEditar.horario.miercolesCantidad ? centroAEditar.horario.miercolesCantidad : '',
            juevesCantidad: centroAEditar.horario.juevesCantidad ? centroAEditar.horario.juevesCantidad : '',
            viernesCantidad: centroAEditar.horario.viernesCantidad ? centroAEditar.horario.viernesCantidad : '',
            sabadoCantidad: centroAEditar.horario.sabadoCantidad ? centroAEditar.horario.sabadoCantidad : '',
            domingoCantidad: centroAEditar.horario.domingoCantidad ? centroAEditar.horario.domingoCantidad : '',
            lunesTipoServicio: centroAEditar.horario.lunesTipoServicio ? centroAEditar.horario.lunesTipoServicio : '',
            martesTipoServicio: centroAEditar.horario.martesTipoServicio ? centroAEditar.horario.martesTipoServicio : '',
            miercolesTipoServicio: centroAEditar.horario.miercolesTipoServicio ? centroAEditar.horario.miercolesTipoServicio : '',
            juevesTipoServicio: centroAEditar.horario.juevesTipoServicio ? centroAEditar.horario.juevesTipoServicio : '',
            viernesTipoServicio: centroAEditar.horario.viernesTipoServicio ? centroAEditar.horario.viernesTipoServicio : '',
            sabadoTipoServicio: centroAEditar.horario.sabadoTipoServicio ? centroAEditar.horario.sabadoTipoServicio : '',
            domingoTipoServicio: centroAEditar.horario.domingoTipoServicio ? centroAEditar.horario.domingoTipoServicio : '',
        });
        setTrabajadoresEdicion({
            ...trabajadoresEdicion,
            cantidad: centroAEditar.trabajadores.cantidad,
            trabajadores: centroAEditar.trabajadores.trabajadores
        });
    }, [centroAEditar]);

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

    const generaFecha = (datoHorario) => {
        return dispatch(generaFechaAccion(datoHorario));
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeSelectCentrosEdicion = (e, values) => {
        if (values) {
            setValuesAutocompleteCentrosValores(values)
            dispatch(obtenerCentroAccion('centros', values.id));
            dispatch(activarDesactivarAccion(false));
        } else {
            dispatch(activarDesactivarAccion(true));
            dispatch(activarDesactivarActualizarCentroAccion(true));
            dispatch(registrarIntervencionAccion(true));
            reseteaContenidoEdicion();
        }
    };

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
    };

    const handleChangeFormEdicion = (prop) => (e) => {
        if (prop === "variacion") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, variacion: e.target.value });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        };
        if (prop === "computo") {
            setValuesFormEdicion({
                ...valuesFormEdicion, [prop]: e.target.value,
                mensualPactado: null,
                precioHora_L: null,
                precioHora_C: null,
                precioHora_E: null,
                precioHora_I: null,
                precioHora_Z: null,
                precioHora_T: null,
                precioHora_P: null
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
        if (prop === "precioHora_L" ||
            prop === "precioHora_C" ||
            prop === "precioHora_E" ||
            prop === "precioHora_I" ||
            prop === "precioHora_Z" ||
            prop === "precioHora_T" ||
            prop === "precioHora_P"
        ) {
            if (IsNumeric(e.target.value)) {
                setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
                dispatch(activarDesactivarActualizarCentroAccion(false));
            }
            return;
        };
        if (prop === "tipo") {
            setValuesFormEdicion({ ...valuesFormEdicion, [prop]: e.target.value });
            setHorarioIntervencionEdicion({
                ...horarioIntervencionEdicion,
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
                domingoCantidad: '',
                lunesTipoServicio: '',
                martesTipoServicio: '',
                miercolesTipoServicio: '',
                juevesTipoServicio: '',
                viernesTipoServicio: '',
                sabadoTipoServicio: '',
                domingoTipoServicio: '',
            });
            setValueTimePickerInicioEdicion({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerFinEdicion({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerInicioDescanso1Edicion({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerFinDescanso1Edicion({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerInicioDescanso2Edicion({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueTimePickerFinDescanso2Edicion({
                lunes: null,
                martes: null,
                miercoles: null,
                jueves: null,
                viernes: null,
                sabado: null,
                domingo: null
            });
            setValueCantidadHorasEdicion({
                lunes: '',
                martes: '',
                miercoles: '',
                jueves: '',
                viernes: '',
                sabado: '',
                domingo: ''
            });
            setValueTipoServicioEdicion({
                lunesTipoServicio: '',
                martesTipoServicio: '',
                miercolesTipoServicio: '',
                juevesTipoServicio: '',
                viernesTipoServicio: '',
                sabadoTipoServicio: '',
                domingoTipoServicio: ''
            });
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
            return;
        }
        if (prop === "numeroTrabajadores") {
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

    const handleChangeFormEdicionSelectsTrabajadores = (tipo, index) => (e) => {
        if (tipo === "trabajador") {
            let arrayTr = [...valuesFormEdicion.datosTrabajadores];
            arrayTr[index] = e.target.value;
            let arrayTrEd = [...trabajadoresEdicion.trabajadores];
            arrayTrEd[index]['trabajador_' + (index + 1)] = e.target.value;
            setValuesFormEdicion({ ...valuesFormEdicion, datosTrabajadores: arrayTr });
            setTrabajadoresEdicion({ ...trabajadoresEdicion, trabajadores: arrayTrEd });
        }
        if (tipo === "suplente") {
            let arraySu = [...valuesFormEdicion.datosSuplentes];
            arraySu[index] = e.target.value;
            let arrayTrEd = [...trabajadoresEdicion.trabajadores];
            arrayTrEd[index]['suplente_' + (index + 1)] = e.target.value;
            setValuesFormEdicion({ ...valuesFormEdicion, datosSuplentes: arraySu });
            setTrabajadoresEdicion({ ...trabajadoresEdicion, trabajadores: arrayTrEd });
        };
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeTimePickerInicioEdicion = (id, hora) => {
        switch (id) {
            case 'timePickerInicio-edicion-lunes':
                if (valueTimePickerFinEdicion.lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion.lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, lunes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, lunes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesInicioRango: null });
                }

                break;
            case 'timePickerInicio-edicion-martes':
                if (valueTimePickerFinEdicion.martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion.martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, martes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, martes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesInicioRango: null });
                }
                break;
            case 'timePickerInicio-edicion-miercoles':
                if (valueTimePickerFinEdicion.miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion.miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, miercoles: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, miercoles: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesInicioRango: null });
                }
                break;
            case 'timePickerInicio-edicion-jueves':
                if (valueTimePickerFinEdicion.jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion.jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, jueves: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, jueves: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesInicioRango: null });
                }
                break;
            case 'timePickerInicio-edicion-viernes':
                if (valueTimePickerFinEdicion.viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion.viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, viernes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, viernes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesInicioRango: null });
                }
                break;
            case 'timePickerInicio-edicion-sabado':
                if (valueTimePickerFinEdicion.sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion.sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, sabado: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, sabado: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoInicioRango: null });
                }
                break;
            case 'timePickerInicio-edicion-domingo':
                if (valueTimePickerFinEdicion.domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinEdicion.domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, domingo: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoInicioRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioEdicion({ ...valueTimePickerInicioEdicion, domingo: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoInicioRango: null });
                }
                break;
            case 'timePickerInicio1Descanso-edicion-lunes':
                if (valueTimePickerFinDescanso1Edicion.lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion.lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, lunes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, lunes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-edicion-lunes':
                if (valueTimePickerFinDescanso2Edicion.lunes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion.lunes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, lunes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, lunes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-edicion-martes':
                if (valueTimePickerFinDescanso1Edicion.martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion.martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, martes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, martes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-edicion-martes':
                if (valueTimePickerFinDescanso2Edicion.martes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion.martes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, martes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, martes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-edicion-miercoles':
                if (valueTimePickerFinDescanso1Edicion.miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion.miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, miercoles: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, miercoles: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-edicion-miercoles':
                if (valueTimePickerFinDescanso2Edicion.miercoles !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion.miercoles))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, miercoles: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, miercoles: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-edicion-jueves':
                if (valueTimePickerFinDescanso1Edicion.jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion.jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, jueves: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, jueves: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-edicion-jueves':
                if (valueTimePickerFinDescanso2Edicion.jueves !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion.jueves))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, jueves: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, jueves: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-edicion-viernes':
                if (valueTimePickerFinDescanso1Edicion.viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion.viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, viernes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, viernes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-edicion-viernes':
                if (valueTimePickerFinDescanso2Edicion.viernes !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion.viernes))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, viernes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, viernes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-edicion-sabado':
                if (valueTimePickerFinDescanso1Edicion.sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion.sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, sabado: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, sabado: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-edicion-sabado':
                if (valueTimePickerFinDescanso2Edicion.sabado !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion.sabado))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, sabado: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, sabado: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoInicio2RangoDescanso: null });
                }
                break;
            case 'timePickerInicio1Descanso-edicion-domingo':
                if (valueTimePickerFinDescanso1Edicion.domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso1Edicion.domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, domingo: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoInicio1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso1Edicion({ ...valueTimePickerInicioDescanso1Edicion, domingo: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoInicio1RangoDescanso: null });
                }
                break;
            case 'timePickerInicio2Descanso-edicion-domingo':
                if (valueTimePickerFinDescanso2Edicion.domingo !== null && (retornaMinutos(retornaHoraRango(hora), retornaHoraRango(valueTimePickerFinDescanso2Edicion.domingo))) < 0) {
                    setAlert({
                        mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, domingo: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoInicio2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerInicioDescanso2Edicion({ ...valueTimePickerInicioDescanso2Edicion, domingo: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoInicio2RangoDescanso: null });
                }
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeTimePickerFinEdicion = (id, hora) => {
        switch (id) {
            case 'timePickerFin-edicion-lunes':
                if (valueTimePickerInicioEdicion.lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion.lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, lunes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, lunes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesFinRango: null });
                }
                break;
            case 'timePickerFin-edicion-martes':
                if (valueTimePickerInicioEdicion.martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion.martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, martes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, martes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesFinRango: null });
                }
                break;
            case 'timePickerFin-edicion-miercoles':
                if (valueTimePickerInicioEdicion.miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion.miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, miercoles: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, miercoles: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesFinRango: null });
                }
                break;
            case 'timePickerFin-edicion-jueves':
                if (valueTimePickerInicioEdicion.jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion.jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, jueves: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, jueves: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesFinRango: null });
                }
                break;
            case 'timePickerFin-edicion-viernes':
                if (valueTimePickerInicioEdicion.viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion.viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, viernes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, viernes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesFinRango: null });
                }
                break;
            case 'timePickerFin-edicion-sabado':
                if (valueTimePickerInicioEdicion.sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion.sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, sabado: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, sabado: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoFinRango: null });
                }
                break;
            case 'timePickerFin-edicion-domingo':
                if (valueTimePickerInicioEdicion.domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioEdicion.domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, domingo: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoFinRango: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinEdicion({ ...valueTimePickerFinEdicion, domingo: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoFinRango: null });
                }
                break;
            case 'timePickerFin1Descanso-edicion-lunes':
                if (valueTimePickerInicioDescanso1Edicion.lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion.lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, lunes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, lunes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-edicion-lunes':
                if (valueTimePickerInicioDescanso2Edicion.lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion.lunes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, lunes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, lunes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-edicion-martes':
                if (valueTimePickerInicioDescanso1Edicion.martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion.martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, martes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, martes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-edicion-martes':
                if (valueTimePickerInicioDescanso2Edicion.martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion.martes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, martes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, martes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-edicion-miercoles':
                if (valueTimePickerInicioDescanso1Edicion.miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion.miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, miercoles: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, miercoles: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-edicion-miercoles':
                if (valueTimePickerInicioDescanso2Edicion.miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion.miercoles), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, miercoles: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, miercoles: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-edicion-jueves':
                if (valueTimePickerInicioDescanso1Edicion.jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion.jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, jueves: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, jueves: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-edicion-jueves':
                if (valueTimePickerInicioDescanso2Edicion.jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion.jueves), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, jueves: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, jueves: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-edicion-viernes':
                if (valueTimePickerInicioDescanso1Edicion.viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion.viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, viernes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, viernes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-edicion-viernes':
                if (valueTimePickerInicioDescanso2Edicion.viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion.viernes), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, viernes: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, viernes: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-edicion-sabado':
                if (valueTimePickerInicioDescanso1Edicion.sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion.sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, sabado: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, sabado: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-edicion-sabado':
                if (valueTimePickerInicioDescanso2Edicion.sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion.sabado), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, sabado: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, sabado: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoFin2RangoDescanso: null });
                }
                break;
            case 'timePickerFin1Descanso-edicion-domingo':
                if (valueTimePickerInicioDescanso1Edicion.domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1Edicion.domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, domingo: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoFin1RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso1Edicion({ ...valueTimePickerFinDescanso1Edicion, domingo: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoFin1RangoDescanso: null });
                }
                break;
            case 'timePickerFin2Descanso-edicion-domingo':
                if (valueTimePickerInicioDescanso2Edicion.domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2Edicion.domingo), retornaHoraRango(hora))) < 0) {
                    setAlert({
                        mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                }
                if (hora) {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, domingo: hora });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoFin2RangoDescanso: retornaHoraRango(hora) });
                } else {
                    setValueTimePickerFinDescanso2Edicion({ ...valueTimePickerFinDescanso2Edicion, domingo: null });
                    setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoFin2RangoDescanso: null });
                }
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSelectCantidadEdicion = (e) => {
        switch (e.target.name) {
            case 'selectCantidad-edicion-lunes':
                setValueCantidadHorasEdicion({ ...valueCantidadHorasEdicion, lunes: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesCantidad: e.target.value });
                break;
            case 'selectCantidad-edicion-martes':
                setValueCantidadHorasEdicion({ ...valueCantidadHorasEdicion, martes: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesCantidad: e.target.value });
                break;
            case 'selectCantidad-edicion-miercoles':
                setValueCantidadHorasEdicion({ ...valueCantidadHorasEdicion, miercoles: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesCantidad: e.target.value });
                break;
            case 'selectCantidad-edicion-jueves':
                setValueCantidadHorasEdicion({ ...valueCantidadHorasEdicion, jueves: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesCantidad: e.target.value });
                break;
            case 'selectCantidad-edicion-viernes':
                setValueCantidadHorasEdicion({ ...valueCantidadHorasEdicion, viernes: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesCantidad: e.target.value });
                break;
            case 'selectCantidad-edicion-sabado':
                setValueCantidadHorasEdicion({ ...valueCantidadHorasEdicion, sabado: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoCantidad: e.target.value });
                break;
            case 'selectCantidad-edicion-domingo':
                setValueCantidadHorasEdicion({ ...valueCantidadHorasEdicion, domingo: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoCantidad: e.target.value });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSelectTipoServicioEdicion = (e) => {
        switch (e.target.name) {
            case 'selectTipoServicio-edicion-lunes':
                setValueTipoServicioEdicion({ ...valueTipoServicioEdicion, lunesTipoServicio: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesTipoServicio: e.target.value });
                break;
            case 'selectTipoServicio-edicion-martes':
                setValueTipoServicioEdicion({ ...valueTipoServicioEdicion, martesTipoServicio: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesTipoServicio: e.target.value });
                break;
            case 'selectTipoServicio-edicion-miercoles':
                setValueTipoServicioEdicion({ ...valueTipoServicioEdicion, miercolesTipoServicio: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesTipoServicio: e.target.value });
                break;
            case 'selectTipoServicio-edicion-jueves':
                setValueTipoServicioEdicion({ ...valueTipoServicioEdicion, juevesTipoServicio: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesTipoServicio: e.target.value });
                break;
            case 'selectTipoServicio-edicion-viernes':
                setValueTipoServicioEdicion({ ...valueTipoServicioEdicion, viernesTipoServicio: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesTipoServicio: e.target.value });
                break;
            case 'selectTipoServicio-edicion-sabado':
                setValueTipoServicioEdicion({ ...valueTipoServicioEdicion, sabadoTipoServicio: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoTipoServicio: e.target.value });
                break;
            case 'selectTipoServicio-edicion-domingo':
                setValueTipoServicioEdicion({ ...valueTipoServicioEdicion, domingoTipoServicio: e.target.value });
                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoTipoServicio: e.target.value });
                break;
            default:
        };

        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const tituloDialog = "¿Estás seguro que quieres eliminar el Centro?";
    const descripcionDialog = "Para confirmar pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo'."

    const handleClickOpenDialog = () => {
        dispatch(abreObjetoDialogAccion('2'));
    };

    const handleCloseDialogBotones = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(eliminarCentroAccion('centros', valuesFormEdicion.id));
            //setTimeout(function(){ window.location.reload(); }, 1500);
            dispatch(activarDesactivarAccion(true));
            reseteaContenidoEdicion();
        }
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
                        if (horarioIntervencionEdicion.tipo === "rango") {
                            //primera comprobación, que todos los campos esten vacíos
                            if (!horarioIntervencionEdicion.lunesInicioRango &&
                                !horarioIntervencionEdicion.lunesFinRango &&
                                !horarioIntervencionEdicion.martesInicioRango &&
                                !horarioIntervencionEdicion.martesFinRango &&
                                !horarioIntervencionEdicion.miercolesInicioRango &&
                                !horarioIntervencionEdicion.miercolesFinRango &&
                                !horarioIntervencionEdicion.juevesInicioRango &&
                                !horarioIntervencionEdicion.juevesFinRango &&
                                !horarioIntervencionEdicion.viernesInicioRango &&
                                !horarioIntervencionEdicion.viernesFinRango &&
                                !horarioIntervencionEdicion.sabadoInicioRango &&
                                !horarioIntervencionEdicion.sabadoFinRango &&
                                !horarioIntervencionEdicion.domingoInicioRango &&
                                !horarioIntervencionEdicion.domingoFinRango) {
                                setAlert({
                                    mensaje: "No has introducido ningún dato horario para registrar.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //segunda comprobación, coinciden ambas casillas en registro
                            if (!horarioIntervencionEdicion.lunesInicioRango && horarioIntervencionEdicion.lunesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionEdicion.lunesInicioRango && !horarioIntervencionEdicion.lunesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.martesInicioRango && horarioIntervencionEdicion.martesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionEdicion.martesInicioRango && !horarioIntervencionEdicion.martesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.miercolesInicioRango && horarioIntervencionEdicion.miercolesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionEdicion.miercolesInicioRango && !horarioIntervencionEdicion.miercolesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.juevesInicioRango && horarioIntervencionEdicion.juevesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionEdicion.juevesInicioRango && !horarioIntervencionEdicion.juevesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.viernesInicioRango && horarioIntervencionEdicion.viernesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionEdicion.viernesInicioRango && !horarioIntervencionEdicion.viernesFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.sabadoInicioRango && horarioIntervencionEdicion.sabadoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionEdicion.sabadoInicioRango && !horarioIntervencionEdicion.sabadoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.domingoInicioRango && horarioIntervencionEdicion.domingoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (horarioIntervencionEdicion.domingoInicioRango && !horarioIntervencionEdicion.domingoFinRango) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //tercera comprobación, pasamos rango a minutos
                            if (horarioIntervencionEdicion.lunesInicioRango) {
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesCantidad: retornaMinutos(horarioIntervencionEdicion.lunesInicioRango, horarioIntervencionEdicion.lunesFinRango) });
                            };
                            if (horarioIntervencionEdicion.martesInicioRango) {
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesCantidad: retornaMinutos(horarioIntervencionEdicion.martesInicioRango, horarioIntervencionEdicion.martesFinRango) });
                            };
                            if (horarioIntervencionEdicion.miercolesInicioRango) {
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesCantidad: retornaMinutos(horarioIntervencionEdicion.miercolesInicioRango, horarioIntervencionEdicion.miercolesFinRango) });
                            };
                            if (horarioIntervencionEdicion.juevesInicioRango) {
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesCantidad: retornaMinutos(horarioIntervencionEdicion.juevesInicioRango, horarioIntervencionEdicion.juevesFinRango) });
                            };
                            if (horarioIntervencionEdicion.viernesInicioRango) {
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesCantidad: retornaMinutos(horarioIntervencionEdicion.viernesInicioRango, horarioIntervencionEdicion.viernesFinRango) });
                            };
                            if (horarioIntervencionEdicion.sabadoInicioRango) {
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoCantidad: retornaMinutos(horarioIntervencionEdicion.sabadoInicioRango, horarioIntervencionEdicion.sabadoFinRango) });
                            };
                            if (horarioIntervencionEdicion.domingoInicioRango) {
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoCantidad: retornaMinutos(horarioIntervencionEdicion.domingoInicioRango, horarioIntervencionEdicion.domingoFinRango) });
                            };
                            //cuarta comprobacion que no falte tipo de servicio
                            if ((horarioIntervencionEdicion.lunesInicioRango && !horarioIntervencionEdicion.lunesTipoServicio) ||
                                (!horarioIntervencionEdicion.lunesInicioRango && horarioIntervencionEdicion.lunesTipoServicio) ||
                                (horarioIntervencionEdicion.martesInicioRango && !horarioIntervencionEdicion.martesTipoServicio) ||
                                (!horarioIntervencionEdicion.martesInicioRango && horarioIntervencionEdicion.martesTipoServicio) ||
                                (horarioIntervencionEdicion.miercolesInicioRango && !horarioIntervencionEdicion.miercolesTipoServicio) ||
                                (!horarioIntervencionEdicion.miercolesInicioRango && horarioIntervencionEdicion.miercolesTipoServicio) ||
                                (horarioIntervencionEdicion.juevesInicioRango && !horarioIntervencionEdicion.juevesTipoServicio) ||
                                (!horarioIntervencionEdicion.juevesInicioRango && horarioIntervencionEdicion.juevesTipoServicio) ||
                                (horarioIntervencionEdicion.viernesInicioRango && !horarioIntervencionEdicion.viernesTipoServicio) ||
                                (!horarioIntervencionEdicion.viernesInicioRango && horarioIntervencionEdicion.viernesTipoServicio) ||
                                (horarioIntervencionEdicion.sabadoInicioRango && !horarioIntervencionEdicion.sabadoTipoServicio) ||
                                (!horarioIntervencionEdicion.sabadoInicioRango && horarioIntervencionEdicion.sabadoTipoServicio) ||
                                (horarioIntervencionEdicion.domingoInicioRango && !horarioIntervencionEdicion.domingoTipoServicio) ||
                                (!horarioIntervencionEdicion.domingoInicioRango && horarioIntervencionEdicion.domingoTipoServicio)) {
                                setAlert({
                                    mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                        };

                        if (horarioIntervencionEdicion.tipo === "rangoDescanso") {
                            //primera comprobación, que todos los campos esten vacíos
                            if (!horarioIntervencionEdicion.lunesInicio1RangoDescanso &&
                                !horarioIntervencionEdicion.lunesInicio2RangoDescanso &&
                                !horarioIntervencionEdicion.lunesFin1RangoDescanso &&
                                !horarioIntervencionEdicion.lunesFin2RangoDescanso &&
                                !horarioIntervencionEdicion.martesInicio1RangoDescanso &&
                                !horarioIntervencionEdicion.martesInicio2RangoDescanso &&
                                !horarioIntervencionEdicion.martesFin1RangoDescanso &&
                                !horarioIntervencionEdicion.martesFin2RangoDescanso &&
                                !horarioIntervencionEdicion.miercolesInicio1RangoDescanso &&
                                !horarioIntervencionEdicion.miercolesInicio2RangoDescanso &&
                                !horarioIntervencionEdicion.miercolesFin1RangoDescanso &&
                                !horarioIntervencionEdicion.miercolesFin2RangoDescanso &&
                                !horarioIntervencionEdicion.juevesInicio1RangoDescanso &&
                                !horarioIntervencionEdicion.juevesInicio2RangoDescanso &&
                                !horarioIntervencionEdicion.juevesFin1RangoDescanso &&
                                !horarioIntervencionEdicion.juevesFin2RangoDescanso &&
                                !horarioIntervencionEdicion.viernesInicio1RangoDescanso &&
                                !horarioIntervencionEdicion.viernesInicio2RangoDescanso &&
                                !horarioIntervencionEdicion.viernesFin1RangoDescanso &&
                                !horarioIntervencionEdicion.viernesFin2RangoDescanso &&
                                !horarioIntervencionEdicion.sabadoInicio1RangoDescanso &&
                                !horarioIntervencionEdicion.sabadoInicio2RangoDescanso &&
                                !horarioIntervencionEdicion.sabadoFin1RangoDescanso &&
                                !horarioIntervencionEdicion.sabadoFin2RangoDescanso &&
                                !horarioIntervencionEdicion.domingoInicio1RangoDescanso &&
                                !horarioIntervencionEdicion.domingoInicio2RangoDescanso &&
                                !horarioIntervencionEdicion.domingoFin1RangoDescanso &&
                                !horarioIntervencionEdicion.domingoFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "No has introducido ningún dato horario para registrar.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //segunda comprobación, coinciden todas las casillas en registro
                            if (!horarioIntervencionEdicion.lunesInicio1RangoDescanso && horarioIntervencionEdicion.lunesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.lunesFin1RangoDescanso && horarioIntervencionEdicion.lunesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.lunesInicio2RangoDescanso && horarioIntervencionEdicion.lunesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.lunesFin2RangoDescanso && horarioIntervencionEdicion.lunesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.martesInicio1RangoDescanso && horarioIntervencionEdicion.martesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.martesFin1RangoDescanso && horarioIntervencionEdicion.martesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.martesInicio2RangoDescanso && horarioIntervencionEdicion.martesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.martesFin2RangoDescanso && horarioIntervencionEdicion.martesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.miercolesInicio1RangoDescanso && horarioIntervencionEdicion.miercolesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.miercolesFin1RangoDescanso && horarioIntervencionEdicion.miercolesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.miercolesInicio2RangoDescanso && horarioIntervencionEdicion.miercolesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.miercolesFin2RangoDescanso && horarioIntervencionEdicion.miercolesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.juevesInicio1RangoDescanso && horarioIntervencionEdicion.juevesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.juevesFin1RangoDescanso && horarioIntervencionEdicion.juevesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.juevesInicio2RangoDescanso && horarioIntervencionEdicion.juevesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.juevesFin2RangoDescanso && horarioIntervencionEdicion.juevesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.viernesInicio1RangoDescanso && horarioIntervencionEdicion.viernesFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.viernesFin1RangoDescanso && horarioIntervencionEdicion.viernesInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.viernesInicio2RangoDescanso && horarioIntervencionEdicion.viernesFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.viernesFin2RangoDescanso && horarioIntervencionEdicion.viernesInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.sabadoInicio1RangoDescanso && horarioIntervencionEdicion.sabadoFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.sabadoFin1RangoDescanso && horarioIntervencionEdicion.sabadoInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.sabadoInicio2RangoDescanso && horarioIntervencionEdicion.sabadoFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.sabadoFin2RangoDescanso && horarioIntervencionEdicion.sabadoInicio2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.domingoInicio1RangoDescanso && horarioIntervencionEdicion.domingoFin1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.domingoFin1RangoDescanso && horarioIntervencionEdicion.domingoInicio1RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.domingoInicio2RangoDescanso && horarioIntervencionEdicion.domingoFin2RangoDescanso) {
                                setAlert({
                                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if (!horarioIntervencionEdicion.domingoFin2RangoDescanso && horarioIntervencionEdicion.domingoInicio2RangoDescanso && horarioIntervencionEdicion.domingoInicio1RangoDescanso && horarioIntervencionEdicion.domingoFin1RangoDescanso) {
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
                            if (horarioIntervencionEdicion.lunesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionEdicion.lunesInicio1RangoDescanso, horarioIntervencionEdicion.lunesFin1RangoDescanso);
                                if (horarioIntervencionEdicion.lunesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionEdicion.lunesInicio2RangoDescanso, horarioIntervencionEdicion.lunesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, lunesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionEdicion.martesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionEdicion.martesInicio1RangoDescanso, horarioIntervencionEdicion.martesFin1RangoDescanso);
                                if (horarioIntervencionEdicion.martesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionEdicion.martesInicio2RangoDescanso, horarioIntervencionEdicion.martesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, martesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionEdicion.miercolesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionEdicion.miercolesInicio1RangoDescanso, horarioIntervencionEdicion.miercolesFin1RangoDescanso);
                                if (horarioIntervencionEdicion.miercolesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionEdicion.miercolesInicio2RangoDescanso, horarioIntervencionEdicion.miercolesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, miercolesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionEdicion.juevesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionEdicion.juevesInicio1RangoDescanso, horarioIntervencionEdicion.juevesFin1RangoDescanso);
                                if (horarioIntervencionEdicion.juevesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionEdicion.juevesInicio2RangoDescanso, horarioIntervencionEdicion.juevesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, juevesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionEdicion.viernesInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionEdicion.viernesInicio1RangoDescanso, horarioIntervencionEdicion.viernesFin1RangoDescanso);
                                if (horarioIntervencionEdicion.viernesInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionEdicion.viernesInicio2RangoDescanso, horarioIntervencionEdicion.viernesFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, viernesCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionEdicion.sabadoInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionEdicion.sabadoInicio1RangoDescanso, horarioIntervencionEdicion.sabadoFin1RangoDescanso);
                                if (horarioIntervencionEdicion.sabadoInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionEdicion.sabadoInicio2RangoDescanso, horarioIntervencionEdicion.sabadoFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, sabadoCantidad: cantidadTotalRango });
                            };
                            if (horarioIntervencionEdicion.domingoInicio1RangoDescanso) {
                                cantidadRango1 = retornaMinutos(horarioIntervencionEdicion.domingoInicio1RangoDescanso, horarioIntervencionEdicion.domingoFin1RangoDescanso);
                                if (horarioIntervencionEdicion.domingoInicio2RangoDescanso) {
                                    cantidadRango2 = retornaMinutos(horarioIntervencionEdicion.domingoInicio2RangoDescanso, horarioIntervencionEdicion.domingoFin2RangoDescanso);
                                } else {
                                    cantidadRango2 = 0;
                                }
                                cantidadTotalRango = cantidadRango1 + cantidadRango2;
                                setHorarioIntervencionEdicion({ ...horarioIntervencionEdicion, domingoCantidad: cantidadTotalRango });
                            };
                            //cuarta comprobacion que no falte tipo de servicio
                            if ((horarioIntervencionEdicion.lunesInicio1RangoDescanso && !horarioIntervencionEdicion.lunesTipoServicio) ||
                                (!horarioIntervencionEdicion.lunesInicio1RangoDescanso && horarioIntervencionEdicion.lunesTipoServicio) ||
                                (horarioIntervencionEdicion.martesInicio1RangoDescanso && !horarioIntervencionEdicion.martesTipoServicio) ||
                                (!horarioIntervencionEdicion.martesInicio1RangoDescanso && horarioIntervencionEdicion.martesTipoServicio) ||
                                (horarioIntervencionEdicion.miercolesInicio1RangoDescanso && !horarioIntervencionEdicion.miercolesTipoServicio) ||
                                (!horarioIntervencionEdicion.miercolesInicio1RangoDescanso && horarioIntervencionEdicion.miercolesTipoServicio) ||
                                (horarioIntervencionEdicion.juevesInicio1RangoDescanso && !horarioIntervencionEdicion.juevesTipoServicio) ||
                                (!horarioIntervencionEdicion.juevesInicio1RangoDescanso && horarioIntervencionEdicion.juevesTipoServicio) ||
                                (horarioIntervencionEdicion.viernesInicio1RangoDescanso && !horarioIntervencionEdicion.viernesTipoServicio) ||
                                (!horarioIntervencionEdicion.viernesInicio1RangoDescanso && horarioIntervencionEdicion.viernesTipoServicio) ||
                                (horarioIntervencionEdicion.sabadoInicio1RangoDescanso && !horarioIntervencionEdicion.sabadoTipoServicio) ||
                                (!horarioIntervencionEdicion.sabadoInicio1RangoDescanso && horarioIntervencionEdicion.sabadoTipoServicio) ||
                                (horarioIntervencionEdicion.domingoInicio1RangoDescanso && !horarioIntervencionEdicion.domingoTipoServicio) ||
                                (!horarioIntervencionEdicion.domingoInicio1RangoDescanso && horarioIntervencionEdicion.domingoTipoServicio)) {
                                setAlert({
                                    mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                        };

                        if (horarioIntervencionEdicion.tipo === "cantidad") {
                            //comprobamos que no haya campos vacíos
                            if (horarioIntervencionEdicion.lunesCantidad === '' &&
                                horarioIntervencionEdicion.martesCantidad === '' &&
                                horarioIntervencionEdicion.miercolesCantidad === '' &&
                                horarioIntervencionEdicion.juevesCantidad === '' &&
                                horarioIntervencionEdicion.viernesCantidad === '' &&
                                horarioIntervencionEdicion.sabadoCantidad === '' &&
                                horarioIntervencionEdicion.domingoCantidad === '') {
                                setAlert({
                                    mensaje: "No has introducido ningún dato horario para registrar.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            //cuarta comprobacion que no falte tipo de servicio
                            if ((horarioIntervencionEdicion.lunesCantidad && !horarioIntervencionEdicion.lunesTipoServicio) ||
                                (!horarioIntervencionEdicion.lunesCantidad && horarioIntervencionEdicion.lunesTipoServicio) ||
                                (horarioIntervencionEdicion.martesCantidad && !horarioIntervencionEdicion.martesTipoServicio) ||
                                (!horarioIntervencionEdicion.martesCantidad && horarioIntervencionEdicion.martesTipoServicio) ||
                                (horarioIntervencionEdicion.miercolesCantidad && !horarioIntervencionEdicion.miercolesTipoServicio) ||
                                (!horarioIntervencionEdicion.miercolesCantidad && horarioIntervencionEdicion.miercolesTipoServicio) ||
                                (horarioIntervencionEdicion.juevesCantidad && !horarioIntervencionEdicion.juevesTipoServicio) ||
                                (!horarioIntervencionEdicion.juevesCantidad && horarioIntervencionEdicion.juevesTipoServicio) ||
                                (horarioIntervencionEdicion.viernesCantidad && !horarioIntervencionEdicion.viernesTipoServicio) ||
                                (!horarioIntervencionEdicion.viernesCantidad && horarioIntervencionEdicion.viernesTipoServicio) ||
                                (horarioIntervencionEdicion.sabadoCantidad && !horarioIntervencionEdicion.sabadoTipoServicio) ||
                                (!horarioIntervencionEdicion.sabadoCantidad && horarioIntervencionEdicion.sabadoTipoServicio) ||
                                (horarioIntervencionEdicion.domingoCantidad && !horarioIntervencionEdicion.domingoTipoServicio) ||
                                (!horarioIntervencionEdicion.domingoCantidad && horarioIntervencionEdicion.domingoTipoServicio)) {
                                setAlert({
                                    mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                        };

                        //comprobamos que array objetos trabajadores no tenga elementos vacíos

                        for (let i = 0; i < trabajadoresEdicion.cantidad; i++) {
                            if (trabajadoresEdicion.trabajadores[i]['trabajador_' + (i + 1)] === '' && trabajadoresEdicion.trabajadores[i]['suplente_' + (i + 1)] === '') {
                                setAlert({
                                    mensaje: "Alguno de los registros Trabajadores - Suplentes está vacío. Completa o cambia la cantidad de trabajadores asignados.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            }
                        };

                        //comprobamos que no haya elementos vacíos
                        if (valuesFormEdicion.nombre === '' ||
                            valuesFormEdicion.categoria === '' ||
                            valuesFormEdicion.codigo === '' ||
                            valuesFormEdicion.domicilio === '' ||
                            valuesFormEdicion.codigoPostal === '' ||
                            valuesFormEdicion.poblacion === '' ||
                            valuesFormEdicion.provincia === '' ||
                            valuesFormEdicion.nif === '' ||
                            valuesFormEdicion.formaPago === '') {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };
                        if (valuesFormEdicion.computo === '' ||
                            (valuesFormEdicion.computo === 1 && !valuesFormEdicion.mensualPactado) ||
                            (valuesFormEdicion.computo === 2 &&
                                !valuesFormEdicion.precioHora_L &&
                                !valuesFormEdicion.precioHora_C &&
                                !valuesFormEdicion.precioHora_E &&
                                !valuesFormEdicion.precioHora_I &&
                                !valuesFormEdicion.precioHora_Z &&
                                !valuesFormEdicion.precioHora_T &&
                                !valuesFormEdicion.precioHora_P) ||
                            (valuesFormEdicion.computo === 3 && (
                                !valuesFormEdicion.precioHora_L &&
                                !valuesFormEdicion.precioHora_C &&
                                !valuesFormEdicion.precioHora_E &&
                                !valuesFormEdicion.precioHora_I &&
                                !valuesFormEdicion.precioHora_Z &&
                                !valuesFormEdicion.precioHora_T &&
                                !valuesFormEdicion.precioHora_P &&
                                !valuesFormEdicion.mensualPactado))) {
                            setAlert({
                                mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };
                        if (valuesFormEdicion.computo === 3 && ((
                            valuesFormEdicion.precioHora_L ||
                            valuesFormEdicion.precioHora_C ||
                            valuesFormEdicion.precioHora_E ||
                            valuesFormEdicion.precioHora_I ||
                            valuesFormEdicion.precioHora_Z ||
                            valuesFormEdicion.precioHora_T ||
                            valuesFormEdicion.precioHora_P) && valuesFormEdicion.mensualPactado)) {
                            setAlert({
                                mensaje: "Revisa el formulario, solo puede haber un tipo de cómputo de horas.",
                                tipo: 'error'
                            })
                            setOpenSnack(true);
                            return;
                        };
                        if (valuesFormEdicion.computo === 2 || (valuesFormEdicion.computo === 3 && !valuesFormEdicion.mensualPactado)) {
                            if ((horarioIntervencionEdicion.lunesTipoServicio === 'LIM' ||
                                horarioIntervencionEdicion.martesTipoServicio === 'LIM' ||
                                horarioIntervencionEdicion.miercolesTipoServicio === 'LIM' ||
                                horarioIntervencionEdicion.juevesTipoServicio === 'LIM' ||
                                horarioIntervencionEdicion.viernesTipoServicio === 'LIM' ||
                                horarioIntervencionEdicion.sabadoTipoServicio === 'LIM' ||
                                horarioIntervencionEdicion.domingoTipoServicio === 'LIM')
                                && !valuesFormEdicion.precioHora_L) {
                                setAlert({
                                    mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if ((horarioIntervencionEdicion.lunesTipoServicio === 'CRIS' ||
                                horarioIntervencionEdicion.martesTipoServicio === 'CRIS' ||
                                horarioIntervencionEdicion.miercolesTipoServicio === 'CRIS' ||
                                horarioIntervencionEdicion.juevesTipoServicio === 'CRIS' ||
                                horarioIntervencionEdicion.viernesTipoServicio === 'CRIS' ||
                                horarioIntervencionEdicion.sabadoTipoServicio === 'CRIS' ||
                                horarioIntervencionEdicion.domingoTipoServicio === 'CRIS')
                                && !valuesFormEdicion.precioHora_C) {
                                setAlert({
                                    mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if ((horarioIntervencionEdicion.lunesTipoServicio === 'CRISE' ||
                                horarioIntervencionEdicion.martesTipoServicio === 'CRISE' ||
                                horarioIntervencionEdicion.miercolesTipoServicio === 'CRISE' ||
                                horarioIntervencionEdicion.juevesTipoServicio === 'CRISE' ||
                                horarioIntervencionEdicion.viernesTipoServicio === 'CRISE' ||
                                horarioIntervencionEdicion.sabadoTipoServicio === 'CRISE' ||
                                horarioIntervencionEdicion.domingoTipoServicio === 'CRISE')
                                && !valuesFormEdicion.precioHora_E) {
                                setAlert({
                                    mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if ((horarioIntervencionEdicion.lunesTipoServicio === 'CRISI' ||
                                horarioIntervencionEdicion.martesTipoServicio === 'CRISI' ||
                                horarioIntervencionEdicion.miercolesTipoServicio === 'CRISI' ||
                                horarioIntervencionEdicion.juevesTipoServicio === 'CRISI' ||
                                horarioIntervencionEdicion.viernesTipoServicio === 'CRISI' ||
                                horarioIntervencionEdicion.sabadoTipoServicio === 'CRISI' ||
                                horarioIntervencionEdicion.domingoTipoServicio === 'CRISI')
                                && !valuesFormEdicion.precioHora_I) {
                                setAlert({
                                    mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if ((horarioIntervencionEdicion.lunesTipoServicio === 'LIME' ||
                                horarioIntervencionEdicion.martesTipoServicio === 'LIME' ||
                                horarioIntervencionEdicion.miercolesTipoServicio === 'LIME' ||
                                horarioIntervencionEdicion.juevesTipoServicio === 'LIME' ||
                                horarioIntervencionEdicion.viernesTipoServicio === 'LIME' ||
                                horarioIntervencionEdicion.sabadoTipoServicio === 'LIME' ||
                                horarioIntervencionEdicion.domingoTipoServicio === 'LIME')
                                && !valuesFormEdicion.precioHora_Z) {
                                setAlert({
                                    mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if ((horarioIntervencionEdicion.lunesTipoServicio === 'TOL' ||
                                horarioIntervencionEdicion.martesTipoServicio === 'TOL' ||
                                horarioIntervencionEdicion.miercolesTipoServicio === 'TOL' ||
                                horarioIntervencionEdicion.juevesTipoServicio === 'TOL' ||
                                horarioIntervencionEdicion.viernesTipoServicio === 'TOL' ||
                                horarioIntervencionEdicion.sabadoTipoServicio === 'TOL' ||
                                horarioIntervencionEdicion.domingoTipoServicio === 'TOL')
                                && !valuesFormEdicion.precioHora_T) {
                                setAlert({
                                    mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                            if ((horarioIntervencionEdicion.lunesTipoServicio === 'LIMP' ||
                                horarioIntervencionEdicion.martesTipoServicio === 'LIMP' ||
                                horarioIntervencionEdicion.miercolesTipoServicio === 'LIMP' ||
                                horarioIntervencionEdicion.juevesTipoServicio === 'LIMP' ||
                                horarioIntervencionEdicion.viernesTipoServicio === 'LIMP' ||
                                horarioIntervencionEdicion.sabadoTipoServicio === 'LIMP' ||
                                horarioIntervencionEdicion.domingoTipoServicio === 'LIMP')
                                && !valuesFormEdicion.precioHora_P) {
                                setAlert({
                                    mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                        }

                        //validacion mail
                        if (valuesFormEdicion.mail) {
                            const validacionMail = dispatch(validarMailAccion(valuesFormEdicion.mail));
                            if (!validacionMail) {
                                setAlert({
                                    mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                                    tipo: 'error'
                                })
                                setOpenSnack(true);
                                return;
                            };
                        }
                        //limpieza final  
                        let horarioIntervencionEdicionRevisado;
                        if (horarioIntervencionEdicion.tipo === 'rango') {
                            horarioIntervencionEdicionRevisado = {
                                tipo: horarioIntervencionEdicion.tipo,
                                variacion: horarioIntervencionEdicion.variacion,
                                lunesInicioRango: horarioIntervencionEdicion.lunesInicioRango,
                                lunesFinRango: horarioIntervencionEdicion.lunesFinRango,
                                martesInicioRango: horarioIntervencionEdicion.martesInicioRango,
                                martesFinRango: horarioIntervencionEdicion.martesFinRango,
                                miercolesInicioRango: horarioIntervencionEdicion.miercolesInicioRango,
                                miercolesFinRango: horarioIntervencionEdicion.miercolesFinRango,
                                juevesInicioRango: horarioIntervencionEdicion.juevesInicioRango,
                                juevesFinRango: horarioIntervencionEdicion.juevesFinRango,
                                viernesInicioRango: horarioIntervencionEdicion.viernesInicioRango,
                                viernesFinRango: horarioIntervencionEdicion.viernesFinRango,
                                sabadoInicioRango: horarioIntervencionEdicion.sabadoInicioRango,
                                sabadoFinRango: horarioIntervencionEdicion.sabadoFinRango,
                                domingoInicioRango: horarioIntervencionEdicion.domingoInicioRango,
                                domingoFinRango: horarioIntervencionEdicion.domingoFinRango,
                                lunesTipoServicio: horarioIntervencionEdicion.lunesTipoServicio,
                                martesTipoServicio: horarioIntervencionEdicion.martesTipoServicio,
                                miercolesTipoServicio: horarioIntervencionEdicion.miercolesTipoServicio,
                                juevesTipoServicio: horarioIntervencionEdicion.juevesTipoServicio,
                                viernesTipoServicio: horarioIntervencionEdicion.viernesTipoServicio,
                                sabadoTipoServicio: horarioIntervencionEdicion.sabadoTipoServicio,
                                domingoTipoServicio: horarioIntervencionEdicion.domingoTipoServicio
                            };
                        };
                        if (horarioIntervencionEdicion.tipo === 'rangoDescanso') {
                            horarioIntervencionEdicionRevisado = {
                                tipo: horarioIntervencionEdicion.tipo,
                                variacion: horarioIntervencionEdicion.variacion,
                                lunesInicio1RangoDescanso: horarioIntervencionEdicion.lunesInicio1RangoDescanso,
                                lunesInicio2RangoDescanso: horarioIntervencionEdicion.lunesInicio2RangoDescanso,
                                lunesFin1RangoDescanso: horarioIntervencionEdicion.lunesFin1RangoDescanso,
                                lunesFin2RangoDescanso: horarioIntervencionEdicion.lunesFin2RangoDescanso,
                                martesInicio1RangoDescanso: horarioIntervencionEdicion.martesInicio1RangoDescanso,
                                martesInicio2RangoDescanso: horarioIntervencionEdicion.martesInicio2RangoDescanso,
                                martesFin1RangoDescanso: horarioIntervencionEdicion.martesFin1RangoDescanso,
                                martesFin2RangoDescanso: horarioIntervencionEdicion.martesFin2RangoDescanso,
                                miercolesInicio1RangoDescanso: horarioIntervencionEdicion.miercolesInicio1RangoDescanso,
                                miercolesInicio2RangoDescanso: horarioIntervencionEdicion.miercolesInicio2RangoDescanso,
                                miercolesFin1RangoDescanso: horarioIntervencionEdicion.miercolesFin1RangoDescanso,
                                miercolesFin2RangoDescanso: horarioIntervencionEdicion.miercolesFin2RangoDescanso,
                                juevesInicio1RangoDescanso: horarioIntervencionEdicion.juevesInicio1RangoDescanso,
                                juevesInicio2RangoDescanso: horarioIntervencionEdicion.juevesInicio2RangoDescanso,
                                juevesFin1RangoDescanso: horarioIntervencionEdicion.juevesFin1RangoDescanso,
                                juevesFin2RangoDescanso: horarioIntervencionEdicion.juevesFin2RangoDescanso,
                                viernesInicio1RangoDescanso: horarioIntervencionEdicion.viernesInicio1RangoDescanso,
                                viernesInicio2RangoDescanso: horarioIntervencionEdicion.viernesInicio2RangoDescanso,
                                viernesFin1RangoDescanso: horarioIntervencionEdicion.viernesFin1RangoDescanso,
                                viernesFin2RangoDescanso: horarioIntervencionEdicion.viernesFin2RangoDescanso,
                                sabadoInicio1RangoDescanso: horarioIntervencionEdicion.sabadoInicio1RangoDescanso,
                                sabadoInicio2RangoDescanso: horarioIntervencionEdicion.sabadoInicio2RangoDescanso,
                                sabadoFin1RangoDescanso: horarioIntervencionEdicion.sabadoFin1RangoDescanso,
                                sabadoFin2RangoDescanso: horarioIntervencionEdicion.sabadoFin2RangoDescanso,
                                domingoInicio1RangoDescanso: horarioIntervencionEdicion.domingoInicio1RangoDescanso,
                                domingoInicio2RangoDescanso: horarioIntervencionEdicion.domingoInicio2RangoDescanso,
                                domingoFin1RangoDescanso: horarioIntervencionEdicion.domingoFin1RangoDescanso,
                                domingoFin2RangoDescanso: horarioIntervencionEdicion.domingoFin2RangoDescanso,
                                lunesTipoServicio: horarioIntervencionEdicion.lunesTipoServicio,
                                martesTipoServicio: horarioIntervencionEdicion.martesTipoServicio,
                                miercolesTipoServicio: horarioIntervencionEdicion.miercolesTipoServicio,
                                juevesTipoServicio: horarioIntervencionEdicion.juevesTipoServicio,
                                viernesTipoServicio: horarioIntervencionEdicion.viernesTipoServicio,
                                sabadoTipoServicio: horarioIntervencionEdicion.sabadoTipoServicio,
                                domingoTipoServicio: horarioIntervencionEdicion.domingoTipoServicio
                            };
                        };
                        if (horarioIntervencionEdicion.tipo === 'cantidad') {
                            horarioIntervencionEdicionRevisado = {
                                tipo: horarioIntervencionEdicion.tipo,
                                variacion: horarioIntervencionEdicion.variacion,
                                lunesCantidad: horarioIntervencionEdicion.lunesCantidad,
                                martesCantidad: horarioIntervencionEdicion.martesCantidad,
                                miercolesCantidad: horarioIntervencionEdicion.miercolesCantidad,
                                juevesCantidad: horarioIntervencionEdicion.juevesCantidad,
                                viernesCantidad: horarioIntervencionEdicion.viernesCantidad,
                                sabadoCantidad: horarioIntervencionEdicion.sabadoCantidad,
                                domingoCantidad: horarioIntervencionEdicion.domingoCantidad,
                                lunesTipoServicio: horarioIntervencionEdicion.lunesTipoServicio,
                                martesTipoServicio: horarioIntervencionEdicion.martesTipoServicio,
                                miercolesTipoServicio: horarioIntervencionEdicion.miercolesTipoServicio,
                                juevesTipoServicio: horarioIntervencionEdicion.juevesTipoServicio,
                                viernesTipoServicio: horarioIntervencionEdicion.viernesTipoServicio,
                                sabadoTipoServicio: horarioIntervencionEdicion.sabadoTipoServicio,
                                domingoTipoServicio: horarioIntervencionEdicion.domingoTipoServicio
                            };
                        };
                        //añadimos cómputo final                           
                        const elHorarioIntervencionEditadoRevisado = {
                            ...horarioIntervencionEdicionRevisado,
                            computo: valuesFormEdicion.computo,
                            mensualPactado: parseFloat(valuesFormEdicion.mensualPactado),
                            precioHora_L: parseFloat(valuesFormEdicion.precioHora_L),
                            precioHora_C: parseFloat(valuesFormEdicion.precioHora_C),
                            precioHora_E: parseFloat(valuesFormEdicion.precioHora_E),
                            precioHora_I: parseFloat(valuesFormEdicion.precioHora_I),
                            precioHora_Z: parseFloat(valuesFormEdicion.precioHora_Z),
                            precioHora_T: parseFloat(valuesFormEdicion.precioHora_T),
                            precioHora_P: parseFloat(valuesFormEdicion.precioHora_P),
                        }
                        //registramos
                        const centroAGuardar = {
                            id: valuesFormEdicion.id,
                            nombre: valuesFormEdicion.nombre,
                            categoria: valuesFormEdicion.categoria,
                            codigo: valuesFormEdicion.codigo,
                            domicilio: valuesFormEdicion.domicilio,
                            codigo_postal: valuesFormEdicion.codigoPostal,
                            poblacion: valuesFormEdicion.poblacion,
                            provincia: valuesFormEdicion.provincia,
                            nif: valuesFormEdicion.nif,
                            mail: valuesFormEdicion.mail,
                            telefono: valuesFormEdicion.telefono,
                            forma_pago: valuesFormEdicion.formaPago,
                            horario: JSON.stringify(elHorarioIntervencionEditadoRevisado),
                            trabajadores: JSON.stringify(trabajadoresEdicion)
                        };
                        dispatch(actualizarCentroAccion('centros', centroAGuardar.id, centroAGuardar));
                        dispatch(registrarIntervencionAccion(true));
                        dispatch(activarDesactivarActualizarCentroAccion(true));
                    };
                    procesarDatosEdicion();
                    break;
                default:
            }
        }
    }));
    const reseteaContenidoEdicion = () => {
        //dispatch(obtenerCentrosAccion('centros'));
        forceUpdate();
        setValuesAutocompleteCentrosValores(null);
        setValuesFormEdicion({
            id: null,
            nombre: '',
            categoria: '',
            codigo: '',
            domicilio: '',
            codigoPostal: '',
            poblacion: '',
            provincia: '',
            nif: '',
            mail: '',
            telefono: '',
            formaPago: '',
            variacion: '',
            tipo: '',
            numeroTrabajadores: '',
            datosTrabajadores: [],
            datosSuplentes: [],
            computo: '',
            mensualPactado: null,
            precioHora_L: null,
            precioHora_C: null,
            precioHora_E: null,
            precioHora_I: null,
            precioHora_Z: null,
            precioHora_T: null,
            precioHora_P: null,
        });
        setValueTimePickerInicioEdicion({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerFinEdicion({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerInicioDescanso1Edicion({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerFinDescanso1Edicion({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerInicioDescanso2Edicion({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueTimePickerFinDescanso2Edicion({
            lunes: null,
            martes: null,
            miercoles: null,
            jueves: null,
            viernes: null,
            sabado: null,
            domingo: null
        });
        setValueCantidadHorasEdicion({
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: '',
            sabado: '',
            domingo: ''
        });
        setValueTipoServicioEdicion({
            lunesTipoServicio: '',
            martesTipoServicio: '',
            miercolesTipoServicio: '',
            juevesTipoServicio: '',
            viernesTipoServicio: '',
            sabadoTipoServicio: '',
            domingoTipoServicio: ''
        });
        setHorarioIntervencionEdicion({
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
            lunesTipoServicio: '',
            martesTipoServicio: '',
            miercolesTipoServicio: '',
            juevesTipoServicio: '',
            viernesTipoServicio: '',
            sabadoTipoServicio: '',
            domingoTipoServicio: ''
        });
        setTrabajadoresEdicion({
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
                        size="small"
                    >
                        <InputLabel>{`Trabajador-` + index}</InputLabel>
                        <Select
                            id={`form-trabajador-` + index}
                            value={valuesFormEdicion.datosTrabajadores[index - 1] || ''}
                            onChange={handleChangeFormEdicionSelectsTrabajadores('trabajador', index - 1)}
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
                        size="small"
                    >
                        <InputLabel>{`Suplente-` + index}</InputLabel>
                        <Select
                            id={`form-suplente-` + index}
                            value={valuesFormEdicion.datosSuplentes[index - 1] || ''}
                            onChange={handleChangeFormEdicionSelectsTrabajadores('suplente', index - 1)}
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
                                m={0.5}
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={clsx(classes.boxStl2, classes.mb20)}
                            >
                                Datos generales
                            </Box>
                            <FormControl
                                variant="outlined"
                                className={classes.form}
                            >
                                <Autocomplete
                                    id="form-select-centros"
                                    options={listadoCentros}
                                    onChange={handleChangeSelectCentrosEdicion}
                                    value={valuesAutocompleteCentrosValores || null}
                                    getOptionLabel={(option) => option.nombre ? option.nombre : ''}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Selecciona centro" variant="outlined" />}
                                    className={classes.mb15}
                                    size="small"
                                />
                            </FormControl>
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
                                    value={valuesFormEdicion.nombre}
                                    onChange={handleChangeFormEdicion('nombre')}
                                    labelWidth={60}
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
                                    value={valuesFormEdicion.categoria}
                                    onChange={handleChangeFormEdicion('categoria')}
                                    helpertext="Selecciona categoria"
                                    disabled={disabledItem}
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
                                            value={valuesFormEdicion.codigo}
                                            onChange={handleChangeFormEdicion('codigo')}
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
                                            value={valuesFormEdicion.nif}
                                            onChange={handleChangeFormEdicion('nif')}
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
                                    value={valuesFormEdicion.mail}
                                    onChange={handleChangeFormEdicion('mail')}
                                    labelWidth={55}
                                    disabled={disabledItem}
                                />
                            </FormControl>
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
                                    value={valuesFormEdicion.domicilio}
                                    onChange={handleChangeFormEdicion('domicilio')}
                                    labelWidth={70}
                                    disabled={disabledItem}
                                />
                            </FormControl>
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
                                            value={valuesFormEdicion.poblacion}
                                            onChange={handleChangeFormEdicion('poblacion')}
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
                                            value={valuesFormEdicion.provincia}
                                            onChange={handleChangeFormEdicion('provincia')}
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
                                        <InputLabel>Código Postal</InputLabel>
                                        <OutlinedInput
                                            className={classes.mb15}
                                            fullWidth
                                            id="form-codigoPostal-centro-edicion"
                                            value={valuesFormEdicion.codigoPostal}
                                            onChange={handleChangeFormEdicion('codigoPostal')}
                                            labelWidth={105}
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
                                        <InputLabel>Teléfono</InputLabel>
                                        <OutlinedInput
                                            className={classes.mb25}
                                            fullWidth
                                            id="form-telefono-centro-edicion"
                                            value={valuesFormEdicion.telefono}
                                            onChange={handleChangeFormEdicion('telefono')}
                                            labelWidth={65}
                                            disabled={disabledItem}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box
                                m={0.5}
                                bgcolor="secondary.light"
                                color="secondary.contrastText"
                                className={clsx(classes.boxStl2, classes.mb20)}
                            >
                                Trabajadores
                            </Box>
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
                                    {
                                        totalTrabajadores.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            {trabajadoresEdicion.cantidad !== '' ? (generarSelectsTrabajadores(trabajadoresEdicion.cantidad)) : null}
                        </Box>
                    </Grid>
                    <Grid item lg={8} sm={6} xs={12}>
                        <Box
                            m={0.5}
                            bgcolor="secondary.light"
                            color="secondary.contrastText"
                            className={clsx(classes.boxStl2, classes.mb20)}
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
                                    size="small"
                                >
                                    <InputLabel>Variaciones</InputLabel>
                                    <Select
                                        fullWidth
                                        className={classes.mb25}
                                        id="form-variaciones-edicion"
                                        label="Variaciones"
                                        value={valuesFormEdicion.variacion}
                                        onChange={handleChangeFormEdicion('variacion')}
                                        helpertext="Selecciona variaciones"
                                        disabled={disabledItem}
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
                                    m={0.5}
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={clsx(classes.boxStl2, classes.mb20)}
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
                                        {
                                            computoHoras.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))
                                        }
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
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora LIM</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_L-edicion"
                                                value={valuesFormEdicion.precioHora_L || ''}
                                                onChange={handleChangeFormEdicion('precioHora_L')}
                                                labelWidth={120}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora CRIS</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_C-edicion"
                                                value={valuesFormEdicion.precioHora_C || ''}
                                                onChange={handleChangeFormEdicion('precioHora_C')}
                                                labelWidth={125}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora CRISE</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_E-edicion"
                                                value={valuesFormEdicion.precioHora_E || ''}
                                                onChange={handleChangeFormEdicion('precioHora_E')}
                                                labelWidth={130}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora CRISI</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_I-edicion"
                                                value={valuesFormEdicion.precioHora_I || ''}
                                                onChange={handleChangeFormEdicion('precioHora_I')}
                                                labelWidth={130}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora LIME</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_Z-edicion"
                                                value={valuesFormEdicion.precioHora_Z || ''}
                                                onChange={handleChangeFormEdicion('precioHora_Z')}
                                                labelWidth={125}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora TOL</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_T-edicion"
                                                value={valuesFormEdicion.precioHora_T || ''}
                                                onChange={handleChangeFormEdicion('precioHora_T')}
                                                labelWidth={120}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                        <FormControl
                                            variant="outlined"
                                            className={classes.form}
                                            size="small"
                                        >
                                            <InputLabel>Precio hora LIMP</InputLabel>
                                            <OutlinedInput
                                                className={classes.mb15}
                                                fullWidth
                                                id="form-precio-hora_P-edicion"
                                                value={valuesFormEdicion.precioHora_P || ''}
                                                onChange={handleChangeFormEdicion('precioHora_P')}
                                                labelWidth={125}
                                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            />
                                        </FormControl>
                                    </Fragment>
                                ) : null}
                                <Box
                                    m={0.5}
                                    bgcolor="secondary.light"
                                    color="secondary.contrastText"
                                    className={clsx(classes.boxStl2, classes.mb20, classes.mt15)}
                                >
                                    Forma de pago
                                </Box>
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
                                        value={valuesFormEdicion.formaPago || ''}
                                        onChange={handleChangeFormEdicion('formaPago')}
                                        helpertext="Selecciona la forma de pago"
                                        disabled={disabledItem}
                                    >
                                        {
                                            formasDePago.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={7} sm={6} xs={12}>
                                <Box style={{ marginTop: -10 }}>
                                    <List >
                                        {valuesFormEdicion.tipo === 'rango' ? (
                                            <Fragment>
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Lunes'}
                                                    prIdInicio={'timePickerInicio-edicion-lunes'}
                                                    prIdFin={'timePickerFin-edicion-lunes'}
                                                    prValueTimePickerInicio={valueTimePickerInicioEdicion.lunes}
                                                    prValueTimePickerFin={valueTimePickerFinEdicion.lunes}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-lunes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.lunesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Martes'}
                                                    prIdInicio={'timePickerInicio-edicion-martes'}
                                                    prIdFin={'timePickerFin-edicion-martes'}
                                                    prValueTimePickerInicio={valueTimePickerInicioEdicion.martes}
                                                    prValueTimePickerFin={valueTimePickerFinEdicion.martes}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-martes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.martesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Miércoles'}
                                                    prIdInicio={'timePickerInicio-edicion-miercoles'}
                                                    prIdFin={'timePickerFin-edicion-miercoles'}
                                                    prValueTimePickerInicio={valueTimePickerInicioEdicion.miercoles}
                                                    prValueTimePickerFin={valueTimePickerFinEdicion.miercoles}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-miercoles'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.miercolesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Jueves'}
                                                    prIdInicio={'timePickerInicio-edicion-jueves'}
                                                    prIdFin={'timePickerFin-edicion-jueves'}
                                                    prValueTimePickerInicio={valueTimePickerInicioEdicion.jueves}
                                                    prValueTimePickerFin={valueTimePickerFinEdicion.jueves}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-jueves'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.juevesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Viernes'}
                                                    prIdInicio={'timePickerInicio-edicion-viernes'}
                                                    prIdFin={'timePickerFin-edicion-viernes'}
                                                    prValueTimePickerInicio={valueTimePickerInicioEdicion.viernes}
                                                    prValueTimePickerFin={valueTimePickerFinEdicion.viernes}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-viernes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.viernesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Sábado'}
                                                    prIdInicio={'timePickerInicio-edicion-sabado'}
                                                    prIdFin={'timePickerFin-edicion-sabado'}
                                                    prValueTimePickerInicio={valueTimePickerInicioEdicion.sabado}
                                                    prValueTimePickerFin={valueTimePickerFinEdicion.sabado}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-sabado'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.sabadoTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rango'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Domingo'}
                                                    prIdInicio={'timePickerInicio-edicion-domingo'}
                                                    prIdFin={'timePickerFin-edicion-domingo'}
                                                    prValueTimePickerInicio={valueTimePickerInicioEdicion.domingo}
                                                    prValueTimePickerFin={valueTimePickerFinEdicion.domingo}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-domingo'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.domingoTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                            </Fragment>
                                        ) : valuesFormEdicion.tipo === 'cantidad' ? (
                                            <Fragment>
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Lunes'}
                                                    prIdCantidad={'selectCantidad-edicion-lunes'}
                                                    prValueCantidadHoras={valueCantidadHorasEdicion.lunes}
                                                    prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-lunes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.lunesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Martes'}
                                                    prIdCantidad={'selectCantidad-edicion-martes'}
                                                    prValueCantidadHoras={valueCantidadHorasEdicion.martes}
                                                    prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-martes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.martesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Miércoles'}
                                                    prIdCantidad={'selectCantidad-edicion-miercoles'}
                                                    prValueCantidadHoras={valueCantidadHorasEdicion.miercoles}
                                                    prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-miercoles'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.miercolesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Jueves'}
                                                    prIdCantidad={'selectCantidad-edicion-jueves'}
                                                    prValueCantidadHoras={valueCantidadHorasEdicion.jueves}
                                                    prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-jueves'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.juevesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Viernes'}
                                                    prIdCantidad={'selectCantidad-edicion-viernes'}
                                                    prValueCantidadHoras={valueCantidadHorasEdicion.viernes}
                                                    prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-viernes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.viernesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Sábado'}
                                                    prIdCantidad={'selectCantidad-edicion-sabado'}
                                                    prValueCantidadHoras={valueCantidadHorasEdicion.sabado}
                                                    prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-sabado'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.sabadoTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'cantidad'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Domingo'}
                                                    prIdCantidad={'selectCantidad-edicion-domingo'}
                                                    prValueCantidadHoras={valueCantidadHorasEdicion.domingo}
                                                    prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-domingo'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.domingoTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                            </Fragment>
                                        ) : valuesFormEdicion.tipo === 'rangoDescanso' ? (
                                            <Fragment>
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Lun.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-edicion-lunes'}
                                                    prIdFin1={'timePickerFin1Descanso-edicion-lunes'}
                                                    prIdInicio2={'timePickerInicio2Descanso-edicion-lunes'}
                                                    prIdFin2={'timePickerFin2Descanso-edicion-lunes'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion.lunes}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion.lunes}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion.lunes}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion.lunes}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-lunes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.lunesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Mar.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-edicion-martes'}
                                                    prIdFin1={'timePickerFin1Descanso-edicion-martes'}
                                                    prIdInicio2={'timePickerInicio2Descanso-edicion-martes'}
                                                    prIdFin2={'timePickerFin2Descanso-edicion-martes'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion.martes}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion.martes}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion.martes}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion.martes}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-martes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.martesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Mié.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-edicion-miercoles'}
                                                    prIdFin1={'timePickerFin1Descanso-edicion-miercoles'}
                                                    prIdInicio2={'timePickerInicio2Descanso-edicion-miercoles'}
                                                    prIdFin2={'timePickerFin2Descanso-edicion-miercoles'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion.miercoles}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion.miercoles}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion.miercoles}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion.miercoles}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-miercoles'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.miercolesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Jue.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-edicion-jueves'}
                                                    prIdFin1={'timePickerFin1Descanso-edicion-jueves'}
                                                    prIdInicio2={'timePickerInicio2Descanso-edicion-jueves'}
                                                    prIdFin2={'timePickerFin2Descanso-edicion-jueves'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion.jueves}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion.jueves}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion.jueves}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion.jueves}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-jueves'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.juevesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Vie.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-edicion-viernes'}
                                                    prIdFin1={'timePickerFin1Descanso-edicion-viernes'}
                                                    prIdInicio2={'timePickerInicio2Descanso-edicion-viernes'}
                                                    prIdFin2={'timePickerFin2Descanso-edicion-viernes'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion.viernes}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion.viernes}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion.viernes}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion.viernes}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-viernes'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.viernesTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Sáb.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-edicion-sabado'}
                                                    prIdFin1={'timePickerFin1Descanso-edicion-sabado'}
                                                    prIdInicio2={'timePickerInicio2Descanso-edicion-sabado'}
                                                    prIdFin2={'timePickerFin2Descanso-edicion-sabado'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion.sabado}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion.sabado}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion.sabado}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion.sabado}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-sabado'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.sabadoTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
                                                />
                                                <ItemListTime
                                                    prTipo={'rangoDescanso'}
                                                    prDisabledItem={disabledItem}
                                                    prDia={'Dom.'}
                                                    prIdInicio1={'timePickerInicio1Descanso-edicion-domingo'}
                                                    prIdFin1={'timePickerFin1Descanso-edicion-domingo'}
                                                    prIdInicio2={'timePickerInicio2Descanso-edicion-domingo'}
                                                    prIdFin2={'timePickerFin2Descanso-edicion-domingo'}
                                                    prValueTimePickerInicio1={valueTimePickerInicioDescanso1Edicion.domingo}
                                                    prValueTimePickerFin1={valueTimePickerFinDescanso1Edicion.domingo}
                                                    prValueTimePickerInicio2={valueTimePickerInicioDescanso2Edicion.domingo}
                                                    prValueTimePickerFin2={valueTimePickerFinDescanso2Edicion.domingo}
                                                    prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                                                    prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                                                    prIdTipoServicio={'selectTipoServicio-edicion-domingo'}
                                                    prValueTipoServicio={valueTipoServicioEdicion.domingoTipoServicio}
                                                    prHandleChangeSelectTipoServicioEdicion={handleChangeSelectTipoServicioEdicion}
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
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            <DialogComponente
                prIsOpen={openDialog2}
                prHandleCloseDialogBotones={handleCloseDialogBotones}
                prTituloDialog={tituloDialog}
                prDescripcionDialog={descripcionDialog}
            />
            {/* {console.log(listadoCentros)} */}
        </div>
    )
})

export default CentrosEditar
