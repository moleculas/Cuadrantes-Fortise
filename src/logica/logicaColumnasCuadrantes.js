import Constantes from "../constantes";
import {
    setExpandedAccordionAccion,
    setTrabajadoresEnCuadranteAccion,
    setSuplentesEnCuadranteAccion,
    setPosicionTrabajadorPrevioACambiarAccion,
    setPosicionSuplentePrevioACambiarAccion,
    setAlertaAccion,
    setBufferSwitchedDiasFestivosCuadranteAccion,
    setYaNoEsInicioAccion
} from '../redux/cuadrantesSettersDucks';
import {
    setCuadranteAccion
} from '../redux/cuadrantesDucks';
import { retornaMinutosAccionEnCuadrantes } from './logicaApp';

const diasSemana = Constantes.DIAS_SEMANA;

export const completarCuadranteAccion = (cuadrante) => (dispatch, getState) => {
    const { losDiasDelMes } = getState().variablesCuadrantes;
    const arrayResultante = cuadrante.map(cuadranteColumna => {
        const objetoResultante = {
            nombreTrabajador: cuadranteColumna.nombreTrabajador,
            idTrabajador: cuadranteColumna.idTrabajador,
            tipoHorario: cuadranteColumna.tipoHorario,
            tipoTrabajador: cuadranteColumna.tipoTrabajador,
            hayBaja: cuadranteColumna.hayBaja,
            reducido: cuadranteColumna.reducido,
            tipoServicio: cuadranteColumna.tipoServicio,
            horasFestivasComputables: cuadranteColumna.horasFestivasComputables || 0,
            horasBajasComputables: cuadranteColumna.horasBajasComputables || 0
        };
        const tipoHorario = cuadranteColumna.tipoHorario;
        losDiasDelMes.forEach((dia, index) => {
            const hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;
            if (hasKey) {
                objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
            } else {
                diasSemana.forEach(diaObj => {
                    const horarios = {
                        'rango': [
                            `${diaObj.value}InicioRango`,
                            `${diaObj.value}FinRango`
                        ],
                        'rangoDescanso': [
                            `${diaObj.value}Inicio1RangoDescanso`,
                            `${diaObj.value}Fin1RangoDescanso`,
                            `${diaObj.value}Inicio2RangoDescanso`,
                            `${diaObj.value}Fin2RangoDescanso`
                        ],
                        'cantidad': [
                            `${diaObj.value}Cantidad`
                        ]
                    };
                    if (dia[1][0] === diaObj.label) {
                        objetoResultante[dia[1][0] + dia[0][0]] = {
                            ...(tipoHorario === 'rango' && {
                                [horarios.rango[0]]: null,
                                [horarios.rango[1]]: null,
                            }),
                            ...(tipoHorario === 'rangoDescanso' && {
                                [horarios.rangoDescanso[0]]: null,
                                [horarios.rangoDescanso[1]]: null,
                                [horarios.rangoDescanso[2]]: null,
                                [horarios.rangoDescanso[3]]: null,
                            }),
                            ...(tipoHorario === 'cantidad' && {
                                [horarios.cantidad[0]]: "",
                            }),
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: false,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                    };
                });
            };
        });
        return objetoResultante
    });
    return arrayResultante
};

export const limpiarCuadranteAccion = (elCuadrante) => (dispatch, getState) => {
    const arrayResultante = elCuadrante.map(cuadranteColumna => {
        const objetoResultante = {
            nombreTrabajador: cuadranteColumna.nombreTrabajador,
            idTrabajador: cuadranteColumna.idTrabajador,
            tipoHorario: cuadranteColumna.tipoHorario,
            tipoTrabajador: cuadranteColumna.tipoTrabajador,
            hayBaja: cuadranteColumna.hayBaja,
            reducido: cuadranteColumna.reducido,
            tipoServicio: cuadranteColumna.tipoServicio,
            horasFestivasComputables: cuadranteColumna.horasFestivasComputables || 0,
            horasBajasComputables: cuadranteColumna.horasBajasComputables || 0
        };
        const tipoHorario = cuadranteColumna.tipoHorario;
        for (const prop in cuadranteColumna) {
            diasSemana.forEach(diaObj => {
                switch (tipoHorario) {
                    case 'rango':
                        if (prop.includes(diaObj.label)) {
                            if (cuadranteColumna[prop][`${diaObj.value}InicioRango`] ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo ||
                                cuadranteColumna[prop].observaciones ||
                                cuadranteColumna[prop].modificado) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        break;
                    case 'rangoDescanso':
                        if (prop.includes(diaObj.label)) {
                            if (cuadranteColumna[prop][`${diaObj.value}Inicio1RangoDescanso`] ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo ||
                                cuadranteColumna[prop].observaciones ||
                                cuadranteColumna[prop].modificado) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        break;
                    case 'cantidad':
                        if (prop.includes(diaObj.label)) {
                            if (cuadranteColumna[prop][`${diaObj.value}Cantidad`] ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo ||
                                cuadranteColumna[prop].observaciones ||
                                cuadranteColumna[prop].modificado) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        break;
                    default:
                };
            });
        };
        return objetoResultante
    });
    return arrayResultante
};

const calculoDiasTotalesPorMes = (month, year) => {
    return new Date(year, month, 0).getDate();
};

const retornaTipoBajaPorHistorico = (dia, historico, elEstado) => (dispatch, getState) => {
    const { calendarioAGestionar } = getState().variablesCuadrantes;
    const [anyoCalendario, mesCalendario] = calendarioAGestionar.split('-').map(Number);
    let elRetorno = '';
    const rangoHistorico = [];
    historico.forEach((registro, index) => {
        let [anyoInicio, mesInicio, diaInicio] = registro.baja[0].inicio.split("-").map(Number);
        let [anyoFin, mesFin, diaFin] = registro.baja[0].fin.split("-").map(Number);
        if (anyoInicio < anyoCalendario || mesInicio < mesCalendario) {
            diaInicio = 1;
        };
        if (anyoFin > anyoCalendario || mesFin > mesCalendario) {
            diaFin = calculoDiasTotalesPorMes(mesCalendario, anyoCalendario);
        };
        if (elEstado === 'alta') {
            for (let i = diaInicio; i <= diaFin; i++) {
                rangoHistorico.push([i, registro.baja[0].tipo]);
            };
        } else {
            for (let i = diaInicio; i < diaFin; i++) {
                rangoHistorico.push([i, registro.baja[0].tipo]);
            };
        };
    });
    elRetorno = elEstado;
    rangoHistorico.forEach((elDia, index) => {
        if (elDia[0] === dia) {
            elRetorno = elDia[1];
        };
    });
    return elRetorno
};

const retornaTipoBajaSinHistorico = (dia, elEstado) => (dispatch, getState) => {
    let elRetorno = elEstado;
    return elRetorno
};

const gestionaDiasFestivosOBajas = (
    elHorarioCuadrante,
    tipoRegistro,
    cantidadTrabajadoresCentro,
    tipoHorario,
    posicionTrabajador,
    item
) => {
    const posicionArray = tipoRegistro === 'comun' ? 0 : posicionTrabajador > cantidadTrabajadoresCentro ? 0 : posicionTrabajador - 1;
    if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][item]) {
        const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        switch (tipoHorario) {
            case 'rango':
                for (let i = 0; i < diasSemana.length; i++) {
                    if (item === `${diasSemana[i]}InicioRango`) {
                        const nombreDia = diasSemana[i];
                        const laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][`${nombreDia}InicioRango`],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][`${nombreDia}FinRango`]
                        ) / 60;
                        const objetoARetornar = {
                            cantidad: laCantidad,
                            servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][`${nombreDia}TipoServicio`]
                        };
                        return objetoARetornar
                    };
                };
                break;
            case 'rangoDescanso':
                for (let i = 0; i < diasSemana.length; i++) {
                    const nombreDia = diasSemana[i];
                    const inicio1RangoDescanso = `${nombreDia}Inicio1RangoDescanso`;
                    const inicio2RangoDescanso = `${nombreDia}Inicio2RangoDescanso`;
                    const fin1RangoDescanso = `${nombreDia}Fin1RangoDescanso`;
                    const fin2RangoDescanso = `${nombreDia}Fin2RangoDescanso`;
                    if (item === inicio1RangoDescanso) {
                        let rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][inicio1RangoDescanso],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][fin1RangoDescanso]
                        ) / 60;
                        let rango2 = 0;
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][inicio2RangoDescanso]) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][inicio2RangoDescanso],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][fin2RangoDescanso]
                            ) / 60;
                        };
                        const objetoARetornar = {
                            cantidad: rango1 + rango2,
                            servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][`${nombreDia}TipoServicio`]
                        };
                        return objetoARetornar
                    };
                };
                break;
            case 'cantidad':
                for (let i = 0; i < diasSemana.length; i++) {
                    if (item === `${diasSemana[i]}Cantidad`) {
                        const nombreDia = diasSemana[i];
                        const laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][`${nombreDia}Cantidad`] / 60;
                        const objetoARetornar = {
                            cantidad: laCantidad,
                            servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][`${nombreDia}TipoServicio`]
                        };
                        return objetoARetornar
                    };
                };
                break;
            default:
        }
    } else {
        const objetoARetornar = {
            cantidad: 0,
            servicio: null
        };
        return objetoARetornar
    };
};

const gestionaDatosHorarioItem = (
    elHorarioCuadrante,
    tipoTrabajador,
    tipoRegistro,
    cantidadTrabajadoresCentro,
    esInicio,
    posicionTrabajador,
    esLimpieza,
    item,
    esActualizacion
) => {
    const itemOptions = [
        'lunesTipoServicio', 'martesTipoServicio', 'miercolesTipoServicio',
        'juevesTipoServicio', 'viernesTipoServicio', 'sabadoTipoServicio',
        'domingoTipoServicio', 'lunesCantidad', 'martesCantidad',
        'miercolesCantidad', 'juevesCantidad', 'viernesCantidad',
        'sabadoCantidad', 'domingoCantidad'
    ];
    const comillas = itemOptions.includes(item);
    if (tipoRegistro === 'comun') {
        if (esLimpieza) {
            return comillas ? '' : null;
        } else if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador][item]) {
            return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador][item];
        } else {
            return comillas ? '' : null;
        };
    } else if (esInicio) {
        if (esLimpieza) {
            return comillas ? '' : null;
        } else if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
            return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item];
        } else {
            return comillas ? '' : null;
        };
    } else {
        if (tipoTrabajador === 'trabajador') {
            if (esLimpieza) {
                return comillas ? '' : null;
            } else {
                if (esActualizacion) {
                    return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item] || (comillas ? '' : null);
                } else {
                    //modificador: Al actualitzar i carregar les baixes com que posicionTrabajador >= cantidadTrabajadoresCentro estava posat al principi de l'if no donava dades
                    //s'ha posat aqui.
                    if (posicionTrabajador >= cantidadTrabajadoresCentro) {
                        return elHorarioCuadrante.tipoRegistroTrabajador[0][item] || (comillas ? '' : null);
                    };
                };
            };
        };
        if (tipoTrabajador === 'suplente') {
            if (esLimpieza) {
                return comillas ? '' : null;
            } else {
                let indice = posicionTrabajador - 1;
                while (elHorarioCuadrante.tipoRegistroTrabajador[indice] === undefined) {
                    indice--;
                };
                return elHorarioCuadrante.tipoRegistroTrabajador[indice][item] || (comillas ? '' : null);
            };
        };
    };
};

const gestionPrimeraSemana = (
    losDiasDelMes,
    elHorarioCuadrante,
    tipoTrabajador,
    tipoRegistro,
    cantidadTrabajadoresCentro,
    esInicio,
    posicionTrabajador
) => {
    const laPosicion = tipoRegistro === 'comun' ?
        posicionTrabajador :
        esInicio || posicionTrabajador <= cantidadTrabajadoresCentro ?
            posicionTrabajador - 1 :
            0;
    const primerDiaMes = losDiasDelMes[0][1][0];
    const [luServicio, maServicio, miServicio, juServicio, viServicio, saServicio, doServicio] =
        elHorarioCuadrante.tipoRegistroTrabajador[laPosicion] ?
            [elHorarioCuadrante.tipoRegistroTrabajador[laPosicion].lunesTipoServicio,
            elHorarioCuadrante.tipoRegistroTrabajador[laPosicion].martesTipoServicio,
            elHorarioCuadrante.tipoRegistroTrabajador[laPosicion].miercolesTipoServicio,
            elHorarioCuadrante.tipoRegistroTrabajador[laPosicion].juevesTipoServicio,
            elHorarioCuadrante.tipoRegistroTrabajador[laPosicion].viernesTipoServicio,
            elHorarioCuadrante.tipoRegistroTrabajador[laPosicion].sabadoTipoServicio,
            elHorarioCuadrante.tipoRegistroTrabajador[laPosicion].domingoTipoServicio] :
            [false, false, false, false, false, false, false];
    let primeraSemanaServicio = false;
    const diasSemana = {
        Lunes: [luServicio, maServicio, miServicio, juServicio, viServicio, saServicio, doServicio],
        Martes: [maServicio, miServicio, juServicio, viServicio, saServicio, doServicio],
        Miércoles: [miServicio, juServicio, viServicio, saServicio, doServicio],
        Jueves: [juServicio, viServicio, saServicio, doServicio],
        Viernes: [viServicio, saServicio, doServicio],
        Sábado: [saServicio, doServicio],
        Domingo: [doServicio],
    };
    const diasSemanaRegex = /(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)/;
    const diaSemanaMatch = primerDiaMes.match(diasSemanaRegex);
    if (diaSemanaMatch) {
        const servicios = diasSemana[diaSemanaMatch[0]];
        if (servicios.some(servicio => servicio)) {
            primeraSemanaServicio = true;
        };
    };
    return primeraSemanaServicio
};

const numeroSemanaMes = (date) => {
    const fecha = new Date(date);
    const startWeekDayIndex = 1; // 1 MonthDay 0 Sundays
    const firstDate = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const firstDay = firstDate.getDay();
    let weekNumber = Math.ceil((fecha.getDate() + firstDay) / 7);
    if (startWeekDayIndex === 1) {
        if (fecha.getDay() === 0 && fecha.getDate() > 1) {
            weekNumber -= 1;
        }
        if (firstDate.getDate() === 1 && firstDay === 0 && fecha.getDate() > 1) {
            weekNumber += 1;
        }
    }

    return weekNumber;
};

const periodoBajaTrabajadorAccion = (calendarioAGestionar, inicioBaja, finBaja, diasMes) => {
    const [anyoCalendario, mesCalendario] = calendarioAGestionar.split("-").map(Number);
    const [anyoInicioB, mesInicioB, diaInicioB] = inicioBaja.split("-").map(Number);
    const anyoFinB = finBaja ? finBaja.split("-")[0] : anyoCalendario;
    const mesFinB = finBaja ? finBaja.split("-")[1] : mesCalendario;
    const diaFinB = finBaja ? finBaja.split("-")[2] : diasMes;
    const empezamosPor = (anyoInicioB < anyoCalendario || mesInicioB < mesCalendario) ? 1 : diaInicioB;
    const acabamosPor = (anyoFinB > anyoCalendario || mesFinB > mesCalendario) ? diasMes : (finBaja ? diaFinB - 1 : diaFinB);
    const arrayBaja = Array.from({ length: acabamosPor - empezamosPor + 1 }, (_, i) => i + empezamosPor);
    return arrayBaja;
};

const gestionaColumnaCuadranteInteriorAccion = (
    trabajador,
    tipoTrabajador,
    esRevision,
    columna,
    elHorarioCuadrante,
    posicionAnterior,
    esInicio,
    posicionTrabajador,
    esLimpieza,
    tipoHorario,
    esActualizacion
) => (dispatch, getState) => {
    const { cuadrante, calendarioAGestionar, losDiasDelMes, stateFestivo, objetoCuadrante } = getState().variablesCuadrantes;
    const { bufferSwitchedDiasFestivosCuadrante, cuadranteEnUsoCuadrantes, yaNoEsInicio } = getState().variablesCuadrantesSetters;
    const { objetoCentro } = getState().variablesCentros;
    //control trabajador repetido
    if (esInicio && trabajador.id !== 999 && cuadrante.some(columna => columna.idTrabajador === trabajador.id)) {
        const found = {};
        const haveSameValue = objetoCentro.trabajadores.trabajadores[cuadranteEnUsoCuadrantes - 1].trabajadores.some(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            if (found[value]) {
                return true;
            }
            found[value] = true;
            return false;
        });
        if (!haveSameValue) {
            return {
                columnaAnadir: null,
                hayTrabajador: false
            };
        };
    };
    let columnaAnadir, hayTrabajador;
    let arrayBaja1 = [], arrayBaja2 = [], arrayBaja = [], arrayRegistrosHistorico = [];
    const tipoRegistro = elHorarioCuadrante.tipoRegistro;
    const cantidadTrabajadoresCentro = elHorarioCuadrante.tipoRegistroTrabajador.length;
    const informe = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1];
    let [contadorHorasFestivosComputables, contadorHorasBajasComputables] = [0, 0];
    let objetoBuffer = {};
    let arrayBuffer = [...bufferSwitchedDiasFestivosCuadrante];
    if (bufferSwitchedDiasFestivosCuadrante.length > 0 && !esInicio) {
        arrayBuffer[cuadranteEnUsoCuadrantes - 1] = [...bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]];
    };
    const primeraSemanaServicio = gestionPrimeraSemana(
        losDiasDelMes,
        elHorarioCuadrante,
        tipoTrabajador,
        tipoRegistro,
        cantidadTrabajadoresCentro,
        esInicio,
        posicionTrabajador
    );
    const [priDigSem, segDigSem, terDigSem] = informe.seqSemSiNo === 2
        ? [1 + !primeraSemanaServicio, 3 + !primeraSemanaServicio, 5 + !primeraSemanaServicio]
        : [2 + !primeraSemanaServicio, 4 + !primeraSemanaServicio, 6 + !primeraSemanaServicio];
    if (trabajador && tipoTrabajador) {
        columnaAnadir = {
            nombreTrabajador: trabajador.nombre,
            idTrabajador: trabajador.id,
            tipoHorario: tipoHorario,
            tipoTrabajador: tipoTrabajador,
        };
        hayTrabajador = true;
        const periodoBajaFuncs = {
            bajaIT: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBajaIT, trabajador.datosEstado.finBajaIT, losDiasDelMes.length),
            bajaACCTE: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBajaACCTE, trabajador.datosEstado.finBajaACCTE, losDiasDelMes.length),
            bajaCIA: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBajaCIA, trabajador.datosEstado.finBajaCIA, losDiasDelMes.length),
            vacaciones: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioVacaciones, trabajador.datosEstado.finVacaciones, losDiasDelMes.length),
            excedencia: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioExcedencia, trabajador.datosEstado.finExcedencia, losDiasDelMes.length),
            personales: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioPersonales, trabajador.datosEstado.finPersonales, losDiasDelMes.length),
            permisoRET: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioPermiso, trabajador.datosEstado.finPermiso, losDiasDelMes.length),
            ausenciaINJ: () => periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioAusencia, trabajador.datosEstado.finAusencia, losDiasDelMes.length),
        };
        if (trabajador.estado !== 'alta') {
            const bajaFunc = periodoBajaFuncs[trabajador.estado];
            arrayBaja1 = bajaFunc();
            columnaAnadir['hayBaja'] = true;
        } else {
            columnaAnadir['hayBaja'] = false;
        };
        if (trabajador.historicoBajas) {
            let hayBajaEnElMes = false;
            trabajador.historicoBajas.meses.forEach((registro, index) => {
                const registroInicioSplitted = registro.baja[0].inicio.split("-");
                const elMesInicio = registroInicioSplitted[0] + '-' + registroInicioSplitted[1];
                const registroFinSplitted = registro.baja[0].fin.split("-");
                const elMesFin = registroFinSplitted[0] + '-' + registroFinSplitted[1];
                const fechaInicio = new Date(elMesInicio);
                const fechaFin = new Date(elMesFin);
                const fechaCalendario = new Date(calendarioAGestionar);
                if (((elMesFin === calendarioAGestionar) && (elMesInicio !== calendarioAGestionar)) ||
                    ((elMesFin !== calendarioAGestionar) && (elMesInicio === calendarioAGestionar)) ||
                    ((elMesFin === calendarioAGestionar) && (elMesInicio === calendarioAGestionar))) {
                    if ((elMesFin === calendarioAGestionar) && (elMesInicio !== calendarioAGestionar)) {
                        columnaAnadir['hayBaja'] = parseInt(registroFinSplitted[2]) === 1 && trabajador.estado !== 'alta' ? true : (arrayRegistrosHistorico.push(registro), hayBajaEnElMes = true, true);
                    } else {
                        arrayRegistrosHistorico.push(registro);
                        columnaAnadir['hayBaja'] = true;
                        hayBajaEnElMes = true;
                    };
                };
                if ((elMesFin !== calendarioAGestionar) && (elMesInicio !== calendarioAGestionar)) {
                    if ((fechaFin > fechaCalendario) && (fechaInicio < fechaCalendario)) {
                        arrayRegistrosHistorico.push(registro);
                        columnaAnadir['hayBaja'] = true;
                    };
                    if (((fechaFin > fechaCalendario) && (fechaInicio > fechaCalendario)) ||
                        ((fechaFin < fechaCalendario) && (fechaInicio < fechaCalendario))) {
                        columnaAnadir['hayBaja'] = hayBajaEnElMes || (trabajador.estado !== 'alta' ? true : false);
                    };
                };
            });
            arrayRegistrosHistorico.forEach((registro, index) => {
                const arrayBajaTraspaso = periodoBajaTrabajadorAccion(calendarioAGestionar, registro.baja[0].inicio, registro.baja[0].fin, losDiasDelMes.length);
                arrayBaja2 = arrayBaja2.concat(arrayBajaTraspaso);
            });
        };
        arrayBaja = arrayBaja1.concat(arrayBaja2);
    };
    if (!trabajador) {
        columnaAnadir = {
            nombreTrabajador: '',
            idTrabajador: null,
            tipoHorario: tipoHorario,
            tipoTrabajador: tipoTrabajador,
            hayBaja: false
        };
        hayTrabajador = false;
    };
    columnaAnadir['reducido'] = hayTrabajador && arrayBaja.length === losDiasDelMes.length && esInicio;
    const [anyoCalendario, mesCalendario] = calendarioAGestionar.split("-").map(Number);
    losDiasDelMes.forEach((dia, index) => {
        objetoBuffer = {};
        const numeroSemana = numeroSemanaMes(`${anyoCalendario}-${mesCalendario}-${dia[0][0]}`);
        const elDia = dia[1][0] + dia[0][0];
        diasSemana.forEach(diaObj => {
            const horarios = {
                'rango': [
                    `${diaObj.value}InicioRango`,
                    `${diaObj.value}FinRango`
                ],
                'rangoDescanso': [
                    `${diaObj.value}Inicio1RangoDescanso`,
                    `${diaObj.value}Fin1RangoDescanso`,
                    `${diaObj.value}Inicio2RangoDescanso`,
                    `${diaObj.value}Fin2RangoDescanso`
                ],
                'cantidad': [
                    `${diaObj.value}Cantidad`
                ]
            };
            const retornaObjCasilla = (tipo) => {
                const objBase = {
                    ...(tipoHorario === 'rango' && {
                        [horarios.rango[0]]: null,
                        [horarios.rango[1]]: null,
                    }),
                    ...(tipoHorario === 'rangoDescanso' && {
                        [horarios.rangoDescanso[0]]: null,
                        [horarios.rangoDescanso[1]]: null,
                        [horarios.rangoDescanso[2]]: null,
                        [horarios.rangoDescanso[3]]: null,
                    }),
                    ...(tipoHorario === 'cantidad' && {
                        [horarios.cantidad[0]]: "",
                    }),
                    tipoServicio: '',
                    baja: false,
                    tipoBaja: null,
                    festivo: false,
                    observaciones: '',
                    modificado: false,
                    visibleVariaciones: false,
                    tipoVariacion: ''
                };
                switch (tipo) {
                    case "festivo":
                        return {
                            ...objBase,
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
                            festivo: true
                        };
                        break;
                    case "baja":
                        return {
                            ...objBase,
                            baja: true,
                            tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                        }
                        break;
                    case "nulo":
                        return {
                            ...objBase
                        }
                        break;
                    case "activo":
                        return {
                            ...objBase,
                            ...(tipoHorario === 'rango' && {
                                [horarios.rango[0]]: gestionaDatosHorarioItem(
                                    elHorarioCuadrante,
                                    tipoTrabajador,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    esInicio,
                                    posicionTrabajador,
                                    esLimpieza,
                                    horarios.rango[0],
                                    esActualizacion
                                ),
                                [horarios.rango[1]]: gestionaDatosHorarioItem(
                                    elHorarioCuadrante,
                                    tipoTrabajador,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    esInicio,
                                    posicionTrabajador,
                                    esLimpieza,
                                    horarios.rango[1],
                                    esActualizacion
                                ),
                            }),
                            ...(tipoHorario === 'rangoDescanso' && {
                                [horarios.rangoDescanso[0]]: gestionaDatosHorarioItem(
                                    elHorarioCuadrante,
                                    tipoTrabajador,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    esInicio,
                                    posicionTrabajador,
                                    esLimpieza,
                                    horarios.rangoDescanso[0],
                                    esActualizacion
                                ),
                                [horarios.rangoDescanso[1]]: gestionaDatosHorarioItem(
                                    elHorarioCuadrante,
                                    tipoTrabajador,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    esInicio,
                                    posicionTrabajador,
                                    esLimpieza,
                                    horarios.rangoDescanso[1],
                                    esActualizacion
                                ),
                                [horarios.rangoDescanso[2]]: gestionaDatosHorarioItem(
                                    elHorarioCuadrante,
                                    tipoTrabajador,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    esInicio,
                                    posicionTrabajador,
                                    esLimpieza,
                                    horarios.rangoDescanso[2],
                                    esActualizacion
                                ),
                                [horarios.rangoDescanso[3]]: gestionaDatosHorarioItem(
                                    elHorarioCuadrante,
                                    tipoTrabajador,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    esInicio,
                                    posicionTrabajador,
                                    esLimpieza,
                                    horarios.rangoDescanso[3],
                                    esActualizacion
                                ),
                            }),
                            ...(tipoHorario === 'cantidad' && {
                                [horarios.cantidad[0]]: gestionaDatosHorarioItem(
                                    elHorarioCuadrante,
                                    tipoTrabajador,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    esInicio,
                                    posicionTrabajador,
                                    esLimpieza,
                                    horarios.cantidad[0],
                                    esActualizacion
                                ),
                            }),
                            tipoServicio: elTipoServicio
                        }
                        break;
                    default:
                };
            };
            let elTipoServicio;
            if (dia[1][0] === diaObj.label) {
                elTipoServicio = gestionaDatosHorarioItem(
                    elHorarioCuadrante,
                    tipoTrabajador,
                    tipoRegistro,
                    cantidadTrabajadoresCentro,
                    esInicio,
                    posicionTrabajador,
                    esLimpieza,
                    `${diaObj.value}TipoServicio`,
                    esActualizacion
                );
            };
            if (elTipoServicio) {
                columnaAnadir['tipoServicio'] = elTipoServicio
            } else {
                if (esLimpieza) {
                    const buscarTipoServicioEncuadrante = (arr, cadena) => {
                        for (let i = 0; i < arr.length; i++) {
                            for (let clave in arr[i]) {
                                if (clave.indexOf(cadena) !== -1) {
                                    return arr[i][clave];
                                };
                            };
                        };
                        return null;
                    };
                    columnaAnadir['tipoServicio'] = buscarTipoServicioEncuadrante(elHorarioCuadrante.tipoRegistroTrabajador, 'TipoServicio')
                };
            };
            if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                if (dia[1][0] === diaObj.label) {
                    columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('festivo');
                    if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                        if (arrayBuffer.length > 0 && !esInicio) {
                            const indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => dia[elDia] !== undefined);
                            if (indiceObjeto >= 0) {
                                objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                const posicionACambiar = objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF' ? cuadrante.length : cuadrante.length - 1;
                                objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                    ...horarios[tipoHorario].map((nombreHorario) =>
                                        gestionaDatosHorarioItem(
                                            elHorarioCuadrante,
                                            tipoTrabajador,
                                            tipoRegistro,
                                            cantidadTrabajadoresCentro,
                                            esInicio,
                                            posicionTrabajador,
                                            esLimpieza,
                                            nombreHorario,
                                            esActualizacion
                                        )
                                    )
                                ];
                                objetoBuffer = {
                                    ...objetoBuffer,
                                    activo: true,
                                    tipo: bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo']
                                };
                                arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                            };
                        };
                        if (!arrayBaja.includes(index + 1)) {
                            const festivoComputable = gestionaDiasFestivosOBajas(
                                elHorarioCuadrante,
                                tipoRegistro,
                                cantidadTrabajadoresCentro,
                                tipoHorario,
                                posicionTrabajador,
                                horarios[tipoHorario][0]
                            );
                            contadorHorasFestivosComputables += festivoComputable?.cantidad ?? 0;
                        };
                    };
                };
            } else {
                if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                    if (arrayBaja.includes(index + 1)) {
                        if (dia[1][0] === diaObj.label) {
                            columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('baja');
                            if ((elHorarioCuadrante.variacion === 'primSemana' && ((primeraSemanaServicio && numeroSemana === 1) || (!primeraSemanaServicio && numeroSemana === 2)))
                                || (elHorarioCuadrante.variacion === 'semanaSiNo' && numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem)
                                || elHorarioCuadrante.variacion === 'todasSemanas') {
                                const bajaComputable = gestionaDiasFestivosOBajas(
                                    elHorarioCuadrante,
                                    tipoRegistro,
                                    cantidadTrabajadoresCentro,
                                    tipoHorario,
                                    posicionTrabajador,
                                    horarios[tipoHorario][0]
                                );
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            };
                        };
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if (((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') ||
                                    (((primeraSemanaServicio && numeroSemana !== 1) || (!primeraSemanaServicio && numeroSemana !== 2)) && elHorarioCuadrante.variacion === 'primSemana')) {
                                    if (dia[1][0] === diaObj.label) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                                    };
                                } else {
                                    if (dia[1][0] === diaObj.label) {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]][horarios[tipoHorario][0]]) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('activo');
                                        };
                                    };
                                };
                            };
                        } else {
                            if (((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') ||
                                (((primeraSemanaServicio && numeroSemana !== 1) || (!primeraSemanaServicio && numeroSemana !== 2)) && elHorarioCuadrante.variacion === 'primSemana')) {
                                if (dia[1][0] === diaObj.label) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                                };
                            } else {
                                if (dia[1][0] === diaObj.label) {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]][horarios[tipoHorario][0]]) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('activo');
                                    };
                                };
                            };
                        };
                    };
                } else {
                    if (esActualizacion) {
                        if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                            columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                        } else {
                            if (((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') ||
                                (((primeraSemanaServicio && numeroSemana !== 1) || (!primeraSemanaServicio && numeroSemana !== 2)) && elHorarioCuadrante.variacion === 'primSemana')) {
                                if (dia[1][0] === diaObj.label) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                                };
                            } else {
                                if (dia[1][0] === diaObj.label) {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]][horarios[tipoHorario][0]]) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('activo');
                                    };
                                };
                            };
                        };
                    } else {
                        if (((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') ||
                            (((primeraSemanaServicio && numeroSemana !== 1) || (!primeraSemanaServicio && numeroSemana !== 2)) && elHorarioCuadrante.variacion === 'primSemana')) {
                            if (dia[1][0] === diaObj.label) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                            };
                        } else {
                            if (dia[1][0] === diaObj.label) {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]][horarios[tipoHorario][0]]) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('nulo');
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = retornaObjCasilla('activo');
                                };
                            };
                        };
                    };
                };
            };//final secuencia
        });
    });
    columnaAnadir['horasFestivasComputables'] = !objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion ? 0 :
        objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion === 1 ? contadorHorasFestivosComputables :
            null;
    //modificador: parche per quan el total hores es 0 pq coincideix un únic registre amb festiu
    columnaAnadir['horasFestivasComputablesExcepcion'] = contadorHorasFestivosComputables;
    columnaAnadir['horasBajasComputables'] = contadorHorasBajasComputables > 0 ? contadorHorasBajasComputables : 0;
    if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
        if (hayTrabajador && !esInicio) {
            dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(arrayBuffer));
        };
        if (!esInicio && !yaNoEsInicio) {
            dispatch(setYaNoEsInicioAccion(true));
        };
    };
    return {
        columnaAnadir,
        hayTrabajador
    };
};

export const gestionaColumnaCuadranteAccion = (
    trabajador,
    tipoTrabajador,
    esRevision,
    columna,
    esAnadirColumna,
    esLimpieza,
    tipoHorario,
    esActualizacion
) => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { cuadrante, objetoCuadrante } = getState().variablesCuadrantes;
    const {
        trabajadoresEnCuadrante,
        suplentesEnCuadrante,
        cuadranteEnUsoCuadrantes,
        posicionTrabajadorPrevioACambiar,
        posicionSuplentePrevioACambiar
    } = getState().variablesCuadrantesSetters;
    const posicionAnterior = !esRevision && !esAnadirColumna ? cuadrante.length - 1 : (esRevision && esAnadirColumna ? columna : columna - 1);
    const esInicio = !esRevision && !esAnadirColumna;
    let posicionTrabajador;
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
        if (tipoTrabajador === 'trabajador') {
            posicionTrabajador = posicionTrabajadorPrevioACambiar || (esAnadirColumna ? cuadrante.length + 1 : trabajador.laPosicionDelTrabajador || cuadrante.length);
            posicionTrabajadorPrevioACambiar && dispatch(setPosicionTrabajadorPrevioACambiarAccion(null));
            dispatch(setPosicionTrabajadorPrevioACambiarAccion(null));
        } else if (tipoTrabajador === 'suplente') {
            posicionTrabajador = posicionSuplentePrevioACambiar || (esAnadirColumna ? columna + 1 : esInicio ? trabajador.laPosicionDelTrabajador : cuadrante.length);
            posicionSuplentePrevioACambiar && dispatch(setPosicionSuplentePrevioACambiarAccion(null));
        };
    } else {
        posicionTrabajador = 0;
    };
    if (cuadrante.length > 0) {
        const trabajadorAnterior = cuadrante[posicionAnterior];
        if (trabajadorAnterior && tipoTrabajador === 'suplente' && !trabajadorAnterior.hayBaja && !esRevision) {
            return;
        };
        if (trabajadorAnterior && tipoTrabajador === 'suplente' && !trabajadorAnterior.hayBaja && esRevision && esAnadirColumna) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "El trabajador no está o no ha estado de baja, o no has asignado trabajador, no necesita suplente.",
                tipo: 'warning'
            }));
            return;
        };
        if (trabajadorAnterior && esInicio && trabajadorAnterior.id === trabajador.id) {
            return;
        };
    } else if (esInicio && tipoTrabajador === 'suplente') {
        return;
    };
    if (!objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1]) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Cuadrante bloqueado. Se ha cambiado la configuración del Centro después de registrar el cuadrante. No pueden efectuarse cambios.",
            tipo: 'warning'
        }));
        return;
    };
    const { columnaAnadir, hayTrabajador } = dispatch(gestionaColumnaCuadranteInteriorAccion(
        trabajador,
        tipoTrabajador,
        esRevision,
        columna,
        objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1],
        posicionAnterior,
        esInicio,
        posicionTrabajador,
        esLimpieza,
        tipoHorario,
        esActualizacion
    ));
    //control trabajador repetido
    if (!columnaAnadir && !hayTrabajador) {
        return
    };
    const arrayCuadrante = [...cuadrante];
    const randomNumber = (Math.floor(Math.random() * 100)) + 1000;
    if (!hayTrabajador) {
        const array = tipoTrabajador === 'trabajador' ? [...trabajadoresEnCuadrante] : [...suplentesEnCuadrante];
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            const trabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1];
            let laPosicion;
            if (trabajadorAnterior.tipoTrabajador === 'trabajador') {
                const trabajadorPrevioAnterior = trabajadoresEnCuadrante.find(trabajador => trabajador.id === trabajadorAnterior.idTrabajador);
                laPosicion = trabajadorPrevioAnterior?.laPosicionDelTrabajador;
            } else if (trabajadorAnterior.tipoTrabajador === 'suplente') {
                const suplentePrevioAnterior = suplentesEnCuadrante.find(suplente => suplente.id === trabajadorAnterior.idTrabajador);
                laPosicion = suplentePrevioAnterior?.laPosicionDelTrabajador;
            };
            array.push({
                id: randomNumber,
                laPosicionDelTrabajador: laPosicion + 1,
                tipoTrabajador
            });
        } else {
            array.push({
                id: randomNumber,
                tipoTrabajador
            });
        };
        if (tipoTrabajador === 'trabajador') {
            dispatch(setTrabajadoresEnCuadranteAccion(array));
            arrayCuadrante.push(columnaAnadir);
        } else {
            dispatch(setSuplentesEnCuadranteAccion(array));
            arrayCuadrante.splice(columna + 1, 0, columnaAnadir);
        };
        columnaAnadir['idTrabajador'] = randomNumber;
        dispatch(setCuadranteAccion(arrayCuadrante));
        dispatch(setExpandedAccordionAccion(false));
    } else {
        if (!esRevision) {
            return columnaAnadir;
        } else {
            const arrayCuadrante = [...cuadrante];
            arrayCuadrante[columna] = columnaAnadir;
            dispatch(setCuadranteAccion(arrayCuadrante));
        };
    };
};