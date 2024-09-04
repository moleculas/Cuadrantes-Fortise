import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Box,
    Typography
} from '@material-ui/core';
import {
    ExpandMore
} from '@material-ui/icons';

//carga componentes
import ItemListTime from './ItemListTime';

//estilos
import Clases from "../../clases";

//importaciones acciones
import {
    AccordionCen as Accordion,
    AccordionSummaryCen as AccordionSummary
} from '../../logica/logicaApp';
import {
    retornaHoraRangoAccion,
    registrarIntervencionAccion,
} from '../../redux/appDucks';
import {
    activarDesactivarActualizarCentroAccion,
} from '../../redux/centrosDucks';

const HorarioCentros = (props) => {
    const {
        tipo,
        index,
        disabledItem,
        horarioIntervencion,
        valueTimePickerInicio,
        valueTimePickerFin,
        valueTimePickerInicioDescanso1,
        valueTimePickerInicioDescanso2,
        valueTimePickerFinDescanso1,
        valueTimePickerFinDescanso2,
        valueCantidadHoras,
        valueTipoServicio,
        setHorarioIntervencion,
        setValueTimePickerInicio,
        setValueTimePickerFin,
        setValueTimePickerInicioDescanso1,
        setValueTimePickerInicioDescanso2,
        setValueTimePickerFinDescanso1,
        setValueTimePickerFinDescanso2,
        setValueTipoServicio,
        setValueCantidadHoras
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const [expandedRango, setExpandedRango] = useState(false);
    const [expandedRangoDescanso, setExpandedRangoDescanso] = useState(false);
    const [expandedCantidad, setExpandedCantidad] = useState(false);

    //funciones

    const handleChangeAccordion = (panel, tipo) => (event, isExpanded) => {
        if (tipo === 'rango') {
            setExpandedRango(isExpanded ? panel : false);
        };
        if (tipo === 'cantidad') {
            setExpandedCantidad(isExpanded ? panel : false);
        };
        if (tipo === 'rangoDescanso') {
            setExpandedRangoDescanso(isExpanded ? panel : false);
        };
    };

    const handleChangeTimePickerInicio = (id, hora) => {       
        const idSplitted = id.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1];
        const idIndex = idSplitted[2];
        let arrayValoresTimePicker, arrayValoresHorario;
        switch (idCaso) {
            case 'timePickerInicio-lunes':
                // if (valueTimePickerFin[idIndex].lunes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFin[idIndex].lunes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicio];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicioRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicioRango'] = null;
                };
                setValueTimePickerInicio(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-martes':
                // if (valueTimePickerFin[idIndex].martes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFin[idIndex].martes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicio];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicioRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicioRango'] = null;
                };
                setValueTimePickerInicio(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-miercoles':
                // if (valueTimePickerFin[idIndex].miercoles !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFin[idIndex].miercoles))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicio];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicioRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicioRango'] = null;
                };
                setValueTimePickerInicio(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-jueves':
                // if (valueTimePickerFin[idIndex].jueves !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFin[idIndex].jueves))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicio];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicioRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicioRango'] = null;
                };
                setValueTimePickerInicio(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-viernes':
                // if (valueTimePickerFin[idIndex].viernes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFin[idIndex].viernes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicio];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicioRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicioRango'] = null;
                };
                setValueTimePickerInicio(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-sabado':
                // if (valueTimePickerFin[idIndex].sabado !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFin[idIndex].sabado))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicio];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicioRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicioRango'] = null;
                };
                setValueTimePickerInicio(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio-domingo':
                // if (valueTimePickerFin[idIndex].domingo !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFin[idIndex].domingo))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicio];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicioRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicioRango'] = null;
                };
                setValueTimePickerInicio(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-lunes':
                // if (valueTimePickerFinDescanso1[idIndex].lunes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso1[idIndex].lunes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };    
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicio1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-lunes':
                // if (valueTimePickerFinDescanso2[idIndex].lunes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso2[idIndex].lunes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesInicio2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-martes':
                // if (valueTimePickerFinDescanso1[idIndex].martes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso1[idIndex].martes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicio1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-martes':
                // if (valueTimePickerFinDescanso2[idIndex].martes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso2[idIndex].martes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesInicio2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-miercoles':
                // if (valueTimePickerFinDescanso1[idIndex].miercoles !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso1[idIndex].miercoles))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicio1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-miercoles':
                // if (valueTimePickerFinDescanso2[idIndex].miercoles !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso2[idIndex].miercoles))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesInicio2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-jueves':
                // if (valueTimePickerFinDescanso1[idIndex].jueves !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso1[idIndex].jueves))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicio1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-jueves':
                // if (valueTimePickerFinDescanso2[idIndex].jueves !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso2[idIndex].jueves))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesInicio2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-viernes':
                // if (valueTimePickerFinDescanso1[idIndex].viernes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso1[idIndex].viernes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicio1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-viernes':
                // if (valueTimePickerFinDescanso2[idIndex].viernes !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso2[idIndex].viernes))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesInicio2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-sabado':
                // if (valueTimePickerFinDescanso1[idIndex].sabado !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso1[idIndex].sabado))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicio1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-sabado':
                // if (valueTimePickerFinDescanso2[idIndex].sabado !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso2[idIndex].sabado))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoInicio2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio1Descanso-domingo':
                // if (valueTimePickerFinDescanso1[idIndex].domingo !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso1[idIndex].domingo))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicio1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicio1RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerInicio2Descanso-domingo':
                // if (valueTimePickerFinDescanso2[idIndex].domingo !== null && (retornaMinutos(dispatch(retornaHoraRangoAccion(hora)), retornaHoraRango(valueTimePickerFinDescanso2[idIndex].domingo))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerInicioDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoInicio2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoInicio2RangoDescanso'] = null;
                };
                setValueTimePickerInicioDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeTimePickerFin = (id, hora) => {
        const idSplitted = id.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1];
        const idIndex = idSplitted[2];
        let arrayValoresTimePicker, arrayValoresHorario;
        switch (idCaso) {
            case 'timePickerFin-lunes':
                // if (valueTimePickerInicio[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicio[idIndex].lunes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFin];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFinRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFinRango'] = null;
                };
                setValueTimePickerFin(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-martes':
                // if (valueTimePickerInicio[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicio[idIndex].martes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFin];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFinRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFinRango'] = null;
                };
                setValueTimePickerFin(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-miercoles':
                // if (valueTimePickerInicio[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicio[idIndex].miercoles), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFin];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFinRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFinRango'] = null;
                };
                setValueTimePickerFin(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-jueves':
                // if (valueTimePickerInicio[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicio[idIndex].jueves), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFin];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFinRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFinRango'] = null;
                };
                setValueTimePickerFin(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-viernes':
                // if (valueTimePickerInicio[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicio[idIndex].viernes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFin];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFinRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFinRango'] = null;
                };
                setValueTimePickerFin(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-sabado':
                // if (valueTimePickerInicio[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicio[idIndex].sabado), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFin];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFinRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFinRango'] = null;
                };
                setValueTimePickerFin(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin-domingo':
                // if (valueTimePickerInicio[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicio[idIndex].domingo), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFin];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFinRango'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFinRango'] = null;
                };
                setValueTimePickerFin(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-lunes':
                // if (valueTimePickerInicioDescanso1[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1[idIndex].lunes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFin1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-lunes':
                // if (valueTimePickerInicioDescanso2[idIndex].lunes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2[idIndex].lunes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['lunes'] = hora;
                    arrayValoresHorario[idIndex]['lunesFin2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['lunes'] = null;
                    arrayValoresHorario[idIndex]['lunesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-martes':
                // if (valueTimePickerInicioDescanso1[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1[idIndex].martes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFin1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-martes':
                // if (valueTimePickerInicioDescanso2[idIndex].martes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2[idIndex].martes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['martes'] = hora;
                    arrayValoresHorario[idIndex]['martesFin2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['martes'] = null;
                    arrayValoresHorario[idIndex]['martesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-miercoles':
                // if (valueTimePickerInicioDescanso1[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1[idIndex].miercoles), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFin1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-miercoles':
                // if (valueTimePickerInicioDescanso2[idIndex].miercoles !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2[idIndex].miercoles), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['miercoles'] = hora;
                    arrayValoresHorario[idIndex]['miercolesFin2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['miercoles'] = null;
                    arrayValoresHorario[idIndex]['miercolesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-jueves':
                // if (valueTimePickerInicioDescanso1[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1[idIndex].jueves), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFin1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-jueves':
                // if (valueTimePickerInicioDescanso2[idIndex].jueves !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2[idIndex].jueves), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['jueves'] = hora;
                    arrayValoresHorario[idIndex]['juevesFin2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['jueves'] = null;
                    arrayValoresHorario[idIndex]['juevesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-viernes':
                // if (valueTimePickerInicioDescanso1[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1[idIndex].viernes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFin1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-viernes':
                // if (valueTimePickerInicioDescanso2[idIndex].viernes !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2[idIndex].viernes), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['viernes'] = hora;
                    arrayValoresHorario[idIndex]['viernesFin2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['viernes'] = null;
                    arrayValoresHorario[idIndex]['viernesFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-sabado':
                // if (valueTimePickerInicioDescanso1[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1[idIndex].sabado), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFin1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-sabado':
                // if (valueTimePickerInicioDescanso2[idIndex].sabado !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2[idIndex].sabado), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['sabado'] = hora;
                    arrayValoresHorario[idIndex]['sabadoFin2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['sabado'] = null;
                    arrayValoresHorario[idIndex]['sabadoFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin1Descanso-domingo':
                // if (valueTimePickerInicioDescanso1[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso1[idIndex].domingo), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso1];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFin1RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFin1RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso1(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            case 'timePickerFin2Descanso-domingo':
                // if (valueTimePickerInicioDescanso2[idIndex].domingo !== null && (retornaMinutos(retornaHoraRango(valueTimePickerInicioDescanso2[idIndex].domingo), dispatch(retornaHoraRangoAccion(hora)))) < 0) {
                //     setAlert({
                //         mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                //         tipo: 'error'
                //     })
                //     setOpenSnack(true);
                //     return;
                // };
                arrayValoresTimePicker = [...valueTimePickerFinDescanso2];
                arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
                if (hora) {
                    arrayValoresTimePicker[idIndex]['domingo'] = hora;
                    arrayValoresHorario[idIndex]['domingoFin2RangoDescanso'] = dispatch(retornaHoraRangoAccion(hora));
                } else {
                    arrayValoresTimePicker[idIndex]['domingo'] = null;
                    arrayValoresHorario[idIndex]['domingoFin2RangoDescanso'] = null;
                };
                setValueTimePickerFinDescanso2(arrayValoresTimePicker);
                setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
                break;
            default:
        }
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSelectCantidad = (e) => {
        const idSplitted = e.target.name.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1];
        
        const idIndex = idSplitted[2];
        let arrayValoresSelect, arrayValoresHorario;
        arrayValoresSelect = [...valueCantidadHoras];
        arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];
        switch (idCaso) {
            case 'selectCantidad-lunes':
                arrayValoresSelect[idIndex]['lunes'] = e.target.value;
                arrayValoresHorario[idIndex]['lunesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-martes':
                arrayValoresSelect[idIndex]['martes'] = e.target.value;
                arrayValoresHorario[idIndex]['martesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-miercoles':
                arrayValoresSelect[idIndex]['miercoles'] = e.target.value;
                arrayValoresHorario[idIndex]['miercolesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-jueves':
                arrayValoresSelect[idIndex]['jueves'] = e.target.value;
                arrayValoresHorario[idIndex]['juevesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-viernes':
                arrayValoresSelect[idIndex]['viernes'] = e.target.value;
                arrayValoresHorario[idIndex]['viernesCantidad'] = e.target.value;
                break;
            case 'selectCantidad-sabado':
                arrayValoresSelect[idIndex]['sabado'] = e.target.value;
                arrayValoresHorario[idIndex]['sabadoCantidad'] = e.target.value;
                break;
            case 'selectCantidad-domingo':
                arrayValoresSelect[idIndex]['domingo'] = e.target.value;
                arrayValoresHorario[idIndex]['domingoCantidad'] = e.target.value;
                break;
            default:
        }
        setValueCantidadHoras(arrayValoresSelect);
        setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    const handleChangeSelectTipoServicio = (e) => {       
        const idSplitted = e.target.name.split("-");
        const idCaso = idSplitted[0] + "-" + idSplitted[1];
        const idIndex = idSplitted[2];
        let arrayValoresSelect, arrayValoresHorario;
        arrayValoresSelect = [...valueTipoServicio];
        arrayValoresHorario = [...horarioIntervencion.tipoRegistroTrabajador];      
        switch (idCaso) {
            case 'selectTipoServicio-lunes':
                arrayValoresSelect[idIndex]['lunesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['lunesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-martes':
                arrayValoresSelect[idIndex]['martesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['martesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-miercoles':
                arrayValoresSelect[idIndex]['miercolesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['miercolesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-jueves':
                arrayValoresSelect[idIndex]['juevesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['juevesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-viernes':
                arrayValoresSelect[idIndex]['viernesTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['viernesTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-sabado':
                arrayValoresSelect[idIndex]['sabadoTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['sabadoTipoServicio'] = e.target.value;
                break;
            case 'selectTipoServicio-domingo':
                arrayValoresSelect[idIndex]['domingoTipoServicio'] = e.target.value;
                arrayValoresHorario[idIndex]['domingoTipoServicio'] = e.target.value;
                break;
            default:
        };      
        setValueTipoServicio(arrayValoresSelect);
        setHorarioIntervencion({ ...horarioIntervencion, tipoRegistroTrabajador: arrayValoresHorario });
        dispatch(registrarIntervencionAccion(false));
        dispatch(activarDesactivarActualizarCentroAccion(false));
    };

    if (!tipo) {
        return null
    };
    if (tipo === 'rango') {
        return (
            <Box m={0.5} key={'boxRango' + index}>              
                <Accordion
                    expanded={expandedRango === 'panelRango' + index} onChange={handleChangeAccordion('panelRango' + index, tipo)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        {horarioIntervencion.tipoRegistro === 'individual' ? (
                            <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                        ) : (
                            <Typography className={classes.heading}>Horario trabajadores</Typography>
                        )}
                    </AccordionSummary>
                    <Box m={2} >
                        <ItemListTime
                            prTipo={'rango'}
                            prDisabledItem={disabledItem}
                            prDia={'Lunes'}
                            prIdInicio={'timePickerInicio-lunes-' + index}
                            prIdFin={'timePickerFin-lunes-' + index}
                            prValueTimePickerInicio={valueTimePickerInicio[index].lunes}
                            prValueTimePickerFin={valueTimePickerFin[index].lunes}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-lunes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].lunesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rango'}
                            prDisabledItem={disabledItem}
                            prDia={'Martes'}
                            prIdInicio={'timePickerInicio-martes-' + index}
                            prIdFin={'timePickerFin-martes-' + index}
                            prValueTimePickerInicio={valueTimePickerInicio[index].martes}
                            prValueTimePickerFin={valueTimePickerFin[index].martes}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-martes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].martesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rango'}
                            prDisabledItem={disabledItem}
                            prDia={'Miércoles'}
                            prIdInicio={'timePickerInicio-miercoles-' + index}
                            prIdFin={'timePickerFin-miercoles-' + index}
                            prValueTimePickerInicio={valueTimePickerInicio[index].miercoles}
                            prValueTimePickerFin={valueTimePickerFin[index].miercoles}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-miercoles-' + index}
                            prValueTipoServicio={valueTipoServicio[index].miercolesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rango'}
                            prDisabledItem={disabledItem}
                            prDia={'Jueves'}
                            prIdInicio={'timePickerInicio-jueves-' + index}
                            prIdFin={'timePickerFin-jueves-' + index}
                            prValueTimePickerInicio={valueTimePickerInicio[index].jueves}
                            prValueTimePickerFin={valueTimePickerFin[index].jueves}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-jueves-' + index}
                            prValueTipoServicio={valueTipoServicio[index].juevesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rango'}
                            prDisabledItem={disabledItem}
                            prDia={'Viernes'}
                            prIdInicio={'timePickerInicio-viernes-' + index}
                            prIdFin={'timePickerFin-viernes-' + index}
                            prValueTimePickerInicio={valueTimePickerInicio[index].viernes}
                            prValueTimePickerFin={valueTimePickerFin[index].viernes}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-viernes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].viernesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rango'}
                            prDisabledItem={disabledItem}
                            prDia={'Sábado'}
                            prIdInicio={'timePickerInicio-sabado-' + index}
                            prIdFin={'timePickerFin-sabado-' + index}
                            prValueTimePickerInicio={valueTimePickerInicio[index].sabado}
                            prValueTimePickerFin={valueTimePickerFin[index].sabado}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-sabado-' + index}
                            prValueTipoServicio={valueTipoServicio[index].sabadoTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rango'}
                            prDisabledItem={disabledItem}
                            prDia={'Domingo'}
                            prIdInicio={'timePickerInicio-domingo-' + index}
                            prIdFin={'timePickerFin-domingo-' + index}
                            prValueTimePickerInicio={valueTimePickerInicio[index].domingo}
                            prValueTimePickerFin={valueTimePickerFin[index].domingo}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-domingo-' + index}
                            prValueTipoServicio={valueTipoServicio[index].domingoTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                    </Box>
                </Accordion>
            </Box>
        )
    };
    if (tipo === 'cantidad') {
        return (
            <Box m={0.5} key={'boxCantidad' + index}>                 
                <Accordion
                    expanded={expandedCantidad === 'panelCantidad' + index} onChange={handleChangeAccordion('panelCantidad' + index, tipo)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        {horarioIntervencion.tipoRegistro === 'individual' ? (
                            <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                        ) : (
                            <Typography className={classes.heading}>Horario trabajadores</Typography>
                        )}
                    </AccordionSummary>
                    <Box m={2} >
                        <ItemListTime
                            prTipo={'cantidad'}
                            prDisabledItem={disabledItem}
                            prDia={'Lunes'}
                            prIdCantidad={'selectCantidad-lunes-' + index}
                            prValueCantidadHoras={valueCantidadHoras[index].lunes}
                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                            prIdTipoServicio={'selectTipoServicio-lunes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].lunesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'cantidad'}
                            prDisabledItem={disabledItem}
                            prDia={'Martes'}
                            prIdCantidad={'selectCantidad-martes-' + index}
                            prValueCantidadHoras={valueCantidadHoras[index].martes}
                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                            prIdTipoServicio={'selectTipoServicio-martes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].martesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'cantidad'}
                            prDisabledItem={disabledItem}
                            prDia={'Miércoles'}
                            prIdCantidad={'selectCantidad-miercoles-' + index}
                            prValueCantidadHoras={valueCantidadHoras[index].miercoles}
                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                            prIdTipoServicio={'selectTipoServicio-miercoles-' + index}
                            prValueTipoServicio={valueTipoServicio[index].miercolesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'cantidad'}
                            prDisabledItem={disabledItem}
                            prDia={'Jueves'}
                            prIdCantidad={'selectCantidad-jueves-' + index}
                            prValueCantidadHoras={valueCantidadHoras[index].jueves}
                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                            prIdTipoServicio={'selectTipoServicio-jueves-' + index}
                            prValueTipoServicio={valueTipoServicio[index].juevesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'cantidad'}
                            prDisabledItem={disabledItem}
                            prDia={'Viernes'}
                            prIdCantidad={'selectCantidad-viernes-' + index}
                            prValueCantidadHoras={valueCantidadHoras[index].viernes}
                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                            prIdTipoServicio={'selectTipoServicio-viernes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].viernesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}

                        />
                        <ItemListTime
                            prTipo={'cantidad'}
                            prDisabledItem={disabledItem}
                            prDia={'Sábado'}
                            prIdCantidad={'selectCantidad-sabado-' + index}
                            prValueCantidadHoras={valueCantidadHoras[index].sabado}
                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                            prIdTipoServicio={'selectTipoServicio-sabado-' + index}
                            prValueTipoServicio={valueTipoServicio[index].sabadoTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'cantidad'}
                            prDisabledItem={disabledItem}
                            prDia={'Domingo'}
                            prIdCantidad={'selectCantidad-domingo-' + index}
                            prValueCantidadHoras={valueCantidadHoras[index].domingo}
                            prHandleChangeSelectCantidad={handleChangeSelectCantidad}
                            prIdTipoServicio={'selectTipoServicio-domingo-' + index}
                            prValueTipoServicio={valueTipoServicio[index].domingoTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                    </Box>
                </Accordion>
            </Box>
        )
    };
    if (tipo === 'rangoDescanso') {
        return (
            <Box m={0.5} key={'boxRangoDescanso' + index}>
                <Accordion
                    expanded={expandedRangoDescanso === 'panelRangoDescanso' + index} onChange={handleChangeAccordion('panelRangoDescanso' + index, tipo)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        {horarioIntervencion.tipoRegistro === 'individual' ? (
                            <Typography className={classes.heading}> {'Horario trabajador ' + (index + 1)}</Typography>
                        ) : (
                            <Typography className={classes.heading}>Horario trabajadores</Typography>
                        )}
                    </AccordionSummary>
                    <Box m={2} >
                        <ItemListTime
                            prTipo={'rangoDescanso'}
                            prDisabledItem={disabledItem}
                            prDia={'Lun.'}
                            prIdInicio1={'timePickerInicio1Descanso-lunes-' + index}
                            prIdFin1={'timePickerFin1Descanso-lunes-' + index}
                            prIdInicio2={'timePickerInicio2Descanso-lunes-' + index}
                            prIdFin2={'timePickerFin2Descanso-lunes-' + index}
                            prValueTimePickerInicio1={valueTimePickerInicioDescanso1[index].lunes}
                            prValueTimePickerFin1={valueTimePickerFinDescanso1[index].lunes}
                            prValueTimePickerInicio2={valueTimePickerInicioDescanso2[index].lunes}
                            prValueTimePickerFin2={valueTimePickerFinDescanso2[index].lunes}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-lunes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].lunesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rangoDescanso'}
                            prDisabledItem={disabledItem}
                            prDia={'Mar.'}
                            prIdInicio1={'timePickerInicio1Descanso-martes-' + index}
                            prIdFin1={'timePickerFin1Descanso-martes-' + index}
                            prIdInicio2={'timePickerInicio2Descanso-martes-' + index}
                            prIdFin2={'timePickerFin2Descanso-martes-' + index}
                            prValueTimePickerInicio1={valueTimePickerInicioDescanso1[index].martes}
                            prValueTimePickerFin1={valueTimePickerFinDescanso1[index].martes}
                            prValueTimePickerInicio2={valueTimePickerInicioDescanso2[index].martes}
                            prValueTimePickerFin2={valueTimePickerFinDescanso2[index].martes}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-martes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].martesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rangoDescanso'}
                            prDisabledItem={disabledItem}
                            prDia={'Mié.'}
                            prIdInicio1={'timePickerInicio1Descanso-miercoles-' + index}
                            prIdFin1={'timePickerFin1Descanso-miercoles-' + index}
                            prIdInicio2={'timePickerInicio2Descanso-miercoles-' + index}
                            prIdFin2={'timePickerFin2Descanso-miercoles-' + index}
                            prValueTimePickerInicio1={valueTimePickerInicioDescanso1[index].miercoles}
                            prValueTimePickerFin1={valueTimePickerFinDescanso1[index].miercoles}
                            prValueTimePickerInicio2={valueTimePickerInicioDescanso2[index].miercoles}
                            prValueTimePickerFin2={valueTimePickerFinDescanso2[index].miercoles}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-miercoles-' + index}
                            prValueTipoServicio={valueTipoServicio[index].miercolesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rangoDescanso'}
                            prDisabledItem={disabledItem}
                            prDia={'Jue.'}
                            prIdInicio1={'timePickerInicio1Descanso-jueves-' + index}
                            prIdFin1={'timePickerFin1Descanso-jueves-' + index}
                            prIdInicio2={'timePickerInicio2Descanso-jueves-' + index}
                            prIdFin2={'timePickerFin2Descanso-jueves-' + index}
                            prValueTimePickerInicio1={valueTimePickerInicioDescanso1[index].jueves}
                            prValueTimePickerFin1={valueTimePickerFinDescanso1[index].jueves}
                            prValueTimePickerInicio2={valueTimePickerInicioDescanso2[index].jueves}
                            prValueTimePickerFin2={valueTimePickerFinDescanso2[index].jueves}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-jueves-' + index}
                            prValueTipoServicio={valueTipoServicio[index].juevesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rangoDescanso'}
                            prDisabledItem={disabledItem}
                            prDia={'Vie.'}
                            prIdInicio1={'timePickerInicio1Descanso-viernes-' + index}
                            prIdFin1={'timePickerFin1Descanso-viernes-' + index}
                            prIdInicio2={'timePickerInicio2Descanso-viernes-' + index}
                            prIdFin2={'timePickerFin2Descanso-viernes-' + index}
                            prValueTimePickerInicio1={valueTimePickerInicioDescanso1[index].viernes}
                            prValueTimePickerFin1={valueTimePickerFinDescanso1[index].viernes}
                            prValueTimePickerInicio2={valueTimePickerInicioDescanso2[index].viernes}
                            prValueTimePickerFin2={valueTimePickerFinDescanso2[index].viernes}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-viernes-' + index}
                            prValueTipoServicio={valueTipoServicio[index].viernesTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rangoDescanso'}
                            prDisabledItem={disabledItem}
                            prDia={'Sáb.'}
                            prIdInicio1={'timePickerInicio1Descanso-sabado-' + index}
                            prIdFin1={'timePickerFin1Descanso-sabado-' + index}
                            prIdInicio2={'timePickerInicio2Descanso-sabado-' + index}
                            prIdFin2={'timePickerFin2Descanso-sabado-' + index}
                            prValueTimePickerInicio1={valueTimePickerInicioDescanso1[index].sabado}
                            prValueTimePickerFin1={valueTimePickerFinDescanso1[index].sabado}
                            prValueTimePickerInicio2={valueTimePickerInicioDescanso2[index].sabado}
                            prValueTimePickerFin2={valueTimePickerFinDescanso2[index].sabado}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-sabado-' + index}
                            prValueTipoServicio={valueTipoServicio[index].sabadoTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                        <ItemListTime
                            prTipo={'rangoDescanso'}
                            prDisabledItem={disabledItem}
                            prDia={'Dom.'}
                            prIdInicio1={'timePickerInicio1Descanso-domingo-' + index}
                            prIdFin1={'timePickerFin1Descanso-domingo-' + index}
                            prIdInicio2={'timePickerInicio2Descanso-domingo-' + index}
                            prIdFin2={'timePickerFin2Descanso-domingo-' + index}
                            prValueTimePickerInicio1={valueTimePickerInicioDescanso1[index].domingo}
                            prValueTimePickerFin1={valueTimePickerFinDescanso1[index].domingo}
                            prValueTimePickerInicio2={valueTimePickerInicioDescanso2[index].domingo}
                            prValueTimePickerFin2={valueTimePickerFinDescanso2[index].domingo}
                            prHandleChangeTimePickerInicio={handleChangeTimePickerInicio}
                            prHandleChangeTimePickerFin={handleChangeTimePickerFin}
                            prIdTipoServicio={'selectTipoServicio-domingo-' + index}
                            prValueTipoServicio={valueTipoServicio[index].domingoTipoServicio}
                            prHandleChangeSelectTipoServicio={handleChangeSelectTipoServicio}
                        />
                    </Box>
                </Accordion>
            </Box>
        )
    };
};

export default HorarioCentros