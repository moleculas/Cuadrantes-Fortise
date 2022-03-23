import { setExpandedAccordionAccion } from './cuadrantesSettersDucks';
import { setTrabajadoresEnCuadranteAccion } from './cuadrantesSettersDucks';
import { setSuplentesEnCuadranteAccion } from './cuadrantesSettersDucks';
import { setPosicionTrabajadorPrevioACambiarAccion } from '../redux/cuadrantesSettersDucks';
import { setPosicionSuplentePrevioACambiarAccion } from '../redux/cuadrantesSettersDucks';
import { setCuadranteAccion } from './cuadrantesDucks';
import { setAlertaAccion } from './cuadrantesSettersDucks';
import { actualizarObjetoCuadranteAccion } from './cuadrantesDucks';
import { setEstamosActualizandoCuadranteSinCargaAccion } from './cuadrantesSettersDucks';
import { setBufferSwitchedDiasFestivosCuadranteAccion } from './cuadrantesSettersDucks';

//constantes
const dataInicial = {
};

//types

//reducer
export default function cuadrantesColumnasReducer(state = dataInicial, action) {
    switch (action.type) {
        default:
            return { ...state }
    }
}

//acciones
export const completarCuadranteAccion = (cuadrante) => (dispatch, getState) => {
    const { losDiasDelMes } = getState().variablesCuadrantes;
    let arrayResultante = [];
    let arrayFestivos = [];
    cuadrante.forEach((cuadranteColumna, index) => {
        let objetoResultante = {};
        objetoResultante.nombreTrabajador = cuadranteColumna.nombreTrabajador;
        objetoResultante.idTrabajador = cuadranteColumna.idTrabajador;
        objetoResultante.tipoHorario = cuadranteColumna.tipoHorario;
        objetoResultante.tipoTrabajador = cuadranteColumna.tipoTrabajador;
        objetoResultante.hayBaja = cuadranteColumna.hayBaja;
        if (cuadranteColumna.horasFestivasComputables_L) {
            objetoResultante.horasFestivasComputables_L = cuadranteColumna.horasFestivasComputables_L;
        } else {
            objetoResultante.horasFestivasComputables_L = 0;
        };
        if (cuadranteColumna.horasFestivasComputables_E) {
            objetoResultante.horasFestivasComputables_E = cuadranteColumna.horasFestivasComputables_E;
        } else {
            objetoResultante.horasFestivasComputables_E = 0;
        };
        if (cuadranteColumna.horasFestivasComputables_P) {
            objetoResultante.horasFestivasComputables_P = cuadranteColumna.horasFestivasComputables_P;
        } else {
            objetoResultante.horasFestivasComputables_P = 0;
        };
        if (cuadranteColumna.horasFestivasComputables_N) {
            objetoResultante.horasFestivasComputables_N = cuadranteColumna.horasFestivasComputables_N;
        } else {
            objetoResultante.horasFestivasComputables_N = 0;
        };
        if (cuadranteColumna.horasFestivasComputables_R) {
            objetoResultante.horasFestivasComputables_R = cuadranteColumna.horasFestivasComputables_R;
        } else {
            objetoResultante.horasFestivasComputables_R = 0;
        };
        if (cuadranteColumna.horasFestivasComputables_L1) {
            objetoResultante.horasFestivasComputables_L1 = cuadranteColumna.horasFestivasComputables_L1;
        } else {
            objetoResultante.horasFestivasComputables_L1 = 0;
        };
        if (cuadranteColumna.horasFestivasComputables_L2) {
            objetoResultante.horasFestivasComputables_L2 = cuadranteColumna.horasFestivasComputables_L2;
        } else {
            objetoResultante.horasFestivasComputables_L2 = 0;
        };
        if (cuadranteColumna.horasFestivasComputables_F) {
            objetoResultante.horasFestivasComputables_F = cuadranteColumna.horasFestivasComputables_F;
        } else {
            objetoResultante.horasFestivasComputables_F = 0;
        };
        if (cuadranteColumna.horasBajasComputables) {
            objetoResultante.horasBajasComputables = cuadranteColumna.horasBajasComputables;
        } else {
            objetoResultante.horasBajasComputables = 0;
        };
        switch (cuadranteColumna.tipoHorario) {
            case 'rango':
                losDiasDelMes.forEach((dia, index) => {
                    let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;
                    if (hasKey) {
                        objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                        if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                            arrayFestivos.push([dia[1][0], dia[0][0]]);
                        };
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                lunesInicioRango: null,
                                lunesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Martes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                martesInicioRango: null,
                                martesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Miércoles') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                miercolesInicioRango: null,
                                miercolesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Jueves') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                juevesInicioRango: null,
                                juevesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Viernes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                viernesInicioRango: null,
                                viernesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Sábado') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                sabadoInicioRango: null,
                                sabadoFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Domingo') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                domingoInicioRango: null,
                                domingoFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                    };
                });
                break;
            case 'rangoDescanso':
                losDiasDelMes.forEach((dia, index) => {
                    let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;
                    if (hasKey) {
                        objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                        if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                            arrayFestivos.push([dia[1][0], dia[0][0]]);
                        };
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                lunesInicio1RangoDescanso: null,
                                lunesFin1RangoDescanso: null,
                                lunesInicio2RangoDescanso: null,
                                lunesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Martes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                martesInicio1RangoDescanso: null,
                                martesFin1RangoDescanso: null,
                                martesInicio2RangoDescanso: null,
                                martesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Miércoles') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                miercolesInicio1RangoDescanso: null,
                                miercolesFin1RangoDescanso: null,
                                miercolesInicio2RangoDescanso: null,
                                miercolesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Jueves') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                juevesInicio1RangoDescanso: null,
                                juevesFin1RangoDescanso: null,
                                juevesInicio2RangoDescanso: null,
                                juevesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Viernes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                viernesInicio1RangoDescanso: null,
                                viernesFin1RangoDescanso: null,
                                viernesInicio2RangoDescanso: null,
                                viernesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Sábado') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                sabadoInicio1RangoDescanso: null,
                                sabadoFin1RangoDescanso: null,
                                sabadoInicio2RangoDescanso: null,
                                sabadoFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Domingo') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                domingoInicio1RangoDescanso: null,
                                domingoFin1RangoDescanso: null,
                                domingoInicio2RangoDescanso: null,
                                domingoFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                    };
                });
                break;
            case 'cantidad':
                losDiasDelMes.forEach((dia, index) => {
                    let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;
                    if (hasKey) {
                        objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                        if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                            arrayFestivos.push([dia[1][0], dia[0][0]]);
                        };
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                lunesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Martes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                martesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Miércoles') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                miercolesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Jueves') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                juevesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Viernes') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                viernesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Sábado') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                sabadoCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                        if (dia[1][0] === 'Domingo') {
                            objetoResultante[dia[1][0] + dia[0][0]] = {
                                domingoCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            }
                        };
                    };
                });
                break;
        };
        arrayResultante.push(objetoResultante);
    });
    return {
        arrayResultante,
        arrayFestivos
    };
};

export const limpiarCuadranteAccion = (elCuadrante) => (dispatch, getState) => {
    let arrayResultante = [];
    elCuadrante.forEach((cuadranteColumna, index) => {
        let objetoResultante = {};
        objetoResultante.nombreTrabajador = cuadranteColumna.nombreTrabajador;
        objetoResultante.idTrabajador = cuadranteColumna.idTrabajador;
        objetoResultante.tipoHorario = cuadranteColumna.tipoHorario;
        objetoResultante.tipoTrabajador = cuadranteColumna.tipoTrabajador;
        objetoResultante.hayBaja = cuadranteColumna.hayBaja;
        if (cuadranteColumna.horasFestivasComputables_L) {
            objetoResultante.horasFestivasComputables_L = cuadranteColumna.horasFestivasComputables_L;
        };
        if (cuadranteColumna.horasFestivasComputables_E) {
            objetoResultante.horasFestivasComputables_E = cuadranteColumna.horasFestivasComputables_E;
        };
        if (cuadranteColumna.horasFestivasComputables_P) {
            objetoResultante.horasFestivasComputables_P = cuadranteColumna.horasFestivasComputables_P;
        };
        if (cuadranteColumna.horasFestivasComputables_N) {
            objetoResultante.horasFestivasComputables_N = cuadranteColumna.horasFestivasComputables_N;
        };
        if (cuadranteColumna.horasFestivasComputables_R) {
            objetoResultante.horasFestivasComputables_R = cuadranteColumna.horasFestivasComputables_R;
        };
        if (cuadranteColumna.horasFestivasComputables_L1) {
            objetoResultante.horasFestivasComputables_L1 = cuadranteColumna.horasFestivasComputables_L1;
        };
        if (cuadranteColumna.horasFestivasComputables_L2) {
            objetoResultante.horasFestivasComputables_L2 = cuadranteColumna.horasFestivasComputables_L2;
        };
        if (cuadranteColumna.horasFestivasComputables_F) {
            objetoResultante.horasFestivasComputables_F = cuadranteColumna.horasFestivasComputables_F;
        };
        if (cuadranteColumna.horasBajasComputables) {
            objetoResultante.horasBajasComputables = cuadranteColumna.horasBajasComputables;
        };
        switch (cuadranteColumna.tipoHorario) {
            case 'rango':
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        if (cuadranteColumna[prop].lunesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                };
                break;
            case 'rangoDescanso':
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        if (cuadranteColumna[prop].lunesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                };
                break;
            case 'cantidad':
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        if (cuadranteColumna[prop].lunesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                };
                break;
        };
        arrayResultante.push(objetoResultante);
    });
    return arrayResultante
};

export const limpiarCuadranteInformeAccion = (informe) => (dispatch) => {
    let elObjetoDatosInforme = {
        computo: informe.computo,
        iniciado: informe.iniciado,
        excepcion: informe.excepcion,
        tipoRegistro: informe.tipoRegistro,
        totalHorasInicial: informe.totalHorasInicial,
        proporcion: parseFloat(informe.proporcion)
    };
    if (informe.mensualPactado) {
        elObjetoDatosInforme['mensualPactado'] = parseFloat(informe.mensualPactado);
        elObjetoDatosInforme['mensualPactadoInicial'] = parseFloat(informe.mensualPactadoInicial);
        elObjetoDatosInforme['totalFacturado_M'] = parseFloat(informe.totalFacturado_M);
        if (informe.totalHorasInicial_L) {
            elObjetoDatosInforme['totalHorasInicial_L'] = parseFloat(informe.totalHorasInicial_L);
        };
        if (informe.totalHorasInicial_E) {
            elObjetoDatosInforme['totalHorasInicial_E'] = parseFloat(informe.totalHorasInicial_E);
        };
        if (informe.totalHorasInicial_P) {
            elObjetoDatosInforme['totalHorasInicial_P'] = parseFloat(informe.totalHorasInicial_P);
        };
        if (informe.totalHorasInicial_N) {
            elObjetoDatosInforme['totalHorasInicial_N'] = parseFloat(informe.totalHorasInicial_N);
        };
        if (informe.totalHorasInicial_R) {
            elObjetoDatosInforme['totalHorasInicial_R'] = parseFloat(informe.totalHorasInicial_R);
        };
        if (informe.totalHorasInicial_L1) {
            elObjetoDatosInforme['totalHorasInicial_L1'] = parseFloat(informe.totalHorasInicial_L1);
        };
        if (informe.totalHorasInicial_L2) {
            elObjetoDatosInforme['totalHorasInicial_L2'] = parseFloat(informe.totalHorasInicial_L2);
        };
        if (informe.totalHorasInicial_F) {
            elObjetoDatosInforme['totalHorasInicial_F'] = parseFloat(informe.totalHorasInicial_F);
        };
    };
    if (informe.precioHora_L) {
        elObjetoDatosInforme['precioHora_L'] = parseFloat(informe.precioHora_L);
        elObjetoDatosInforme['totalFacturado_L'] = parseFloat(informe.totalFacturado_L);
    };
    if (informe.precioHora_E) {
        elObjetoDatosInforme['precioHora_E'] = parseFloat(informe.precioHora_E);
        elObjetoDatosInforme['totalFacturado_E'] = parseFloat(informe.totalFacturado_E);
    };
    if (informe.precioHora_P) {
        elObjetoDatosInforme['precioHora_P'] = parseFloat(informe.precioHora_P);
        elObjetoDatosInforme['totalFacturado_P'] = parseFloat(informe.totalFacturado_P);
    };
    if (informe.precioHora_N) {
        elObjetoDatosInforme['precioHora_N'] = parseFloat(informe.precioHora_N);
        elObjetoDatosInforme['totalFacturado_N'] = parseFloat(informe.totalFacturado_N);
    };
    if (informe.precioHora_R) {
        elObjetoDatosInforme['precioHora_R'] = parseFloat(informe.precioHora_R);
        elObjetoDatosInforme['totalFacturado_R'] = parseFloat(informe.totalFacturado_R);
    };
    if (informe.precioHora_L1) {
        elObjetoDatosInforme['precioHora_L1'] = parseFloat(informe.precioHora_L1);
        elObjetoDatosInforme['totalFacturado_L1'] = parseFloat(informe.totalFacturado_L1);
    };
    if (informe.precioHora_L2) {
        elObjetoDatosInforme['precioHora_L2'] = parseFloat(informe.precioHora_L2);
        elObjetoDatosInforme['totalFacturado_L2'] = parseFloat(informe.totalFacturado_L2);
    };
    if (informe.precioHora_F) {
        elObjetoDatosInforme['precioHora_F'] = parseFloat(informe.precioHora_F);
        elObjetoDatosInforme['totalFacturado_F'] = parseFloat(informe.totalFacturado_F);
    };
    return elObjetoDatosInforme;
};

const retornaMinutosAccionEnCuadrantes = (primeraHora, segundaHora) => {
    if (primeraHora && segundaHora) {
        let myArrSplit1 = primeraHora.split(":");
        const horasPrimeraHora = parseInt(myArrSplit1[0]);
        const minutosPrimeraHora = parseInt(myArrSplit1[1]);
        const minutosTotalesPrimeraHora = (horasPrimeraHora * 60) + minutosPrimeraHora;
        let myArrSplit2 = segundaHora.split(":");
        const horasSegundaHora = parseInt(myArrSplit2[0]);
        const minutosSegundaHora = parseInt(myArrSplit2[1]);
        const minutosTotalesSegundaHora = (horasSegundaHora * 60) + minutosSegundaHora;
        const diff = minutosTotalesSegundaHora - minutosTotalesPrimeraHora;
        return diff;
    }
};

export const gestionarInformeAccion = () => (dispatch, getState) => {
    const { cuadrante, objetoCuadrante } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    let arrayResultante = [];
    let sumatorioHoras;
    let sumatorioHorasNormal_L;
    let sumatorioHorasExtra_L;
    let sumatorioHorasNormal_E;
    let sumatorioHorasExtra_E;
    let sumatorioHorasNormal_P;
    let sumatorioHorasExtra_P;
    let sumatorioHorasNormal_N;
    let sumatorioHorasExtra_N;
    let sumatorioHorasNormal_R;
    let sumatorioHorasExtra_R;
    let sumatorioHorasNormal_L1;
    let sumatorioHorasExtra_L1;
    let sumatorioHorasNormal_L2;
    let sumatorioHorasExtra_L2;
    let sumatorioHorasNormal_F;
    let sumatorioHorasExtra_F;
    let lasHorasNormal;
    let lasHorasExtra;
    let totalHorasInicial_L = 0;
    let totalHorasInicial_E = 0;
    let totalHorasInicial_P = 0;
    let totalHorasInicial_N = 0;
    let totalHorasInicial_R = 0;
    let totalHorasInicial_L1 = 0;
    let totalHorasInicial_L2 = 0;
    let totalHorasInicial_F = 0;
    let totalHorasInicial = 0;
    let sumatorioHorasFestivasComputables_L = 0;
    let sumatorioHorasFestivasComputables_E = 0;
    let sumatorioHorasFestivasComputables_P = 0;
    let sumatorioHorasFestivasComputables_N = 0;
    let sumatorioHorasFestivasComputables_R = 0;
    let sumatorioHorasFestivasComputables_L1 = 0;
    let sumatorioHorasFestivasComputables_L2 = 0;
    let sumatorioHorasFestivasComputables_F = 0;
    let sumatorioTotalHorasNormal_L = 0;
    let sumatorioTotalHorasNormal_E = 0;
    let sumatorioTotalHorasNormal_P = 0;
    let sumatorioTotalHorasNormal_N = 0;
    let sumatorioTotalHorasNormal_R = 0;
    let sumatorioTotalHorasNormal_L1 = 0;
    let sumatorioTotalHorasNormal_L2 = 0;
    let sumatorioTotalHorasNormal_F = 0;
    let sumatorioHorasBajasComputables = 0;
    cuadrante.forEach((cuadranteColumna, index) => {
        switch (cuadranteColumna.tipoHorario) {
            case 'rango':
                arrayResultante.push({
                    trabajador: cuadranteColumna.idTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
                    //si se quisieran contabilizar los días/hora concretos activar el array cómputo
                    computo: [],
                    totalHorasNormal_L: null,
                    totalHorasExtra_L: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHorasNormal_N: null,
                    totalHorasExtra_N: null,
                    totalHorasNormal_R: null,
                    totalHorasExtra_R: null,
                    totalHorasNormal_L1: null,
                    totalHorasExtra_L1: null,
                    totalHorasNormal_L2: null,
                    totalHorasExtra_L2: null,
                    totalHorasNormal_F: null,
                    totalHorasExtra_F: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
                sumatorioHorasNormal_N = 0;
                sumatorioHorasExtra_N = 0;
                sumatorioHorasNormal_R = 0;
                sumatorioHorasExtra_R = 0;
                sumatorioHorasNormal_L1 = 0;
                sumatorioHorasExtra_L1 = 0;
                sumatorioHorasNormal_L2 = 0;
                sumatorioHorasExtra_L2 = 0;
                sumatorioHorasNormal_F = 0;
                sumatorioHorasExtra_F = 0;
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        const mySplit = prop.split('Lunes');
                        if (cuadranteColumna[prop].lunesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Lunes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Martes')) {
                        const mySplit = prop.split('Martes');
                        if (cuadranteColumna[prop].martesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Martes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        const mySplit = prop.split('Miércoles');
                        if (cuadranteColumna[prop].miercolesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Miércoles-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Jueves')) {
                        const mySplit = prop.split('Jueves');
                        if (cuadranteColumna[prop].juevesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Jueves-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Viernes')) {
                        const mySplit = prop.split('Viernes');
                        if (cuadranteColumna[prop].viernesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Viernes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Sábado')) {
                        const mySplit = prop.split('Sábado');
                        if (cuadranteColumna[prop].sabadoInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Sábado-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    if (prop.includes('Domingo')) {
                        const mySplit = prop.split('Domingo');
                        if (cuadranteColumna[prop].domingoInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Domingo-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        };
                    };
                    arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                    arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                    arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                    arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                    arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                    arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                    arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                    arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                    arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                    arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                    arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                    arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                    arrayResultante[index].totalHoras = sumatorioHoras;
                }
                break;
            case 'rangoDescanso':
                arrayResultante.push({
                    trabajador: cuadranteColumna.idTrabajador,
                    //trabajadorNombre: cuadranteColumna.nombreTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
                    computo: [],
                    totalHorasNormal_L: null,
                    totalHorasExtra_L: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHorasNormal_N: null,
                    totalHorasExtra_N: null,
                    totalHorasNormal_R: null,
                    totalHorasExtra_R: null,
                    totalHorasNormal_L1: null,
                    totalHorasExtra_L1: null,
                    totalHorasNormal_L2: null,
                    totalHorasExtra_L2: null,
                    totalHorasNormal_F: null,
                    totalHorasExtra_F: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
                sumatorioHorasNormal_N = 0;
                sumatorioHorasExtra_N = 0;
                sumatorioHorasNormal_R = 0;
                sumatorioHorasExtra_R = 0;
                sumatorioHorasNormal_L1 = 0;
                sumatorioHorasExtra_L1 = 0;
                sumatorioHorasNormal_L2 = 0;
                sumatorioHorasExtra_L2 = 0;
                sumatorioHorasNormal_F = 0;
                sumatorioHorasExtra_F = 0;
                let rango1, rango2;
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        const mySplit = prop.split('Lunes');
                        if (cuadranteColumna[prop].lunesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicio1RangoDescanso, cuadranteColumna[prop].lunesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].lunesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicio2RangoDescanso, cuadranteColumna[prop].lunesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Lunes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Martes')) {
                        const mySplit = prop.split('Martes');
                        if (cuadranteColumna[prop].martesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicio1RangoDescanso, cuadranteColumna[prop].martesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].martesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicio2RangoDescanso, cuadranteColumna[prop].martesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Martes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Miércoles')) {
                        const mySplit = prop.split('Miércoles');
                        if (cuadranteColumna[prop].miercolesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicio1RangoDescanso, cuadranteColumna[prop].miercolesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].miercolesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicio2RangoDescanso, cuadranteColumna[prop].miercolesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Miércoles-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Jueves')) {
                        const mySplit = prop.split('Jueves');
                        if (cuadranteColumna[prop].juevesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicio1RangoDescanso, cuadranteColumna[prop].juevesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].juevesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicio2RangoDescanso, cuadranteColumna[prop].juevesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Jueves-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Viernes')) {
                        const mySplit = prop.split('Viernes');
                        if (cuadranteColumna[prop].viernesInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicio1RangoDescanso, cuadranteColumna[prop].viernesFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].viernesInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicio2RangoDescanso, cuadranteColumna[prop].viernesFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Viernes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Sábado')) {
                        const mySplit = prop.split('Sábado');
                        if (cuadranteColumna[prop].sabadoInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicio1RangoDescanso, cuadranteColumna[prop].sabadoFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].sabadoInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicio2RangoDescanso, cuadranteColumna[prop].sabadoFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Sábado-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Domingo')) {
                        const mySplit = prop.split('Domingo');
                        if (cuadranteColumna[prop].domingoInicio1RangoDescanso) {
                            rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicio1RangoDescanso, cuadranteColumna[prop].domingoFin1RangoDescanso) / 60;
                            if (cuadranteColumna[prop].domingoInicio2RangoDescanso) {
                                rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicio2RangoDescanso, cuadranteColumna[prop].domingoFin2RangoDescanso) / 60;
                            } else {
                                rango2 = 0;
                            };
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = rango1 + rango2;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = rango1 + rango2;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = rango1 + rango2;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Domingo-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                    arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                    arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                    arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                    arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                    arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                    arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                    arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                    arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                    arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                    arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                    arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                    arrayResultante[index].totalHoras = sumatorioHoras;
                }
                break;
            case 'cantidad':
                arrayResultante.push({
                    trabajador: cuadranteColumna.idTrabajador,
                    //trabajadorNombre: cuadranteColumna.nombreTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
                    computo: [],
                    totalHorasNormal_L: null,
                    totalHorasExtra_L: null,
                    totalHorasNormal_E: null,
                    totalHorasExtra_E: null,
                    totalHorasNormal_P: null,
                    totalHorasExtra_P: null,
                    totalHorasNormal_N: null,
                    totalHorasExtra_N: null,
                    totalHorasNormal_R: null,
                    totalHorasExtra_R: null,
                    totalHorasNormal_L1: null,
                    totalHorasExtra_L1: null,
                    totalHorasNormal_L2: null,
                    totalHorasExtra_L2: null,
                    totalHorasNormal_F: null,
                    totalHorasExtra_F: null,
                    totalHoras: null
                });
                sumatorioHoras = 0;
                sumatorioHorasNormal_L = 0;
                sumatorioHorasExtra_L = 0;
                sumatorioHorasNormal_E = 0;
                sumatorioHorasExtra_E = 0;
                sumatorioHorasNormal_P = 0;
                sumatorioHorasExtra_P = 0;
                sumatorioHorasNormal_N = 0;
                sumatorioHorasExtra_N = 0;
                sumatorioHorasNormal_R = 0;
                sumatorioHorasExtra_R = 0;
                sumatorioHorasNormal_L1 = 0;
                sumatorioHorasExtra_L1 = 0;
                sumatorioHorasNormal_L2 = 0;
                sumatorioHorasExtra_L2 = 0;
                sumatorioHorasNormal_F = 0;
                sumatorioHorasExtra_F = 0;
                for (const prop in cuadranteColumna) {
                    if (prop.includes('Lunes')) {
                        const mySplit = prop.split('Lunes');
                        if (cuadranteColumna[prop].lunesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].lunesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Lunes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Martes')) {
                        const mySplit = prop.split('Martes');
                        if (cuadranteColumna[prop].martesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].martesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Martes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Miércoles')) {
                        const mySplit = prop.split('Miércoles');
                        if (cuadranteColumna[prop].miercolesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].miercolesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Miércoles-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Jueves')) {
                        const mySplit = prop.split('Jueves');
                        if (cuadranteColumna[prop].juevesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].juevesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Jueves-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Viernes')) {
                        const mySplit = prop.split('Viernes');
                        if (cuadranteColumna[prop].viernesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].viernesCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Viernes-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Sábado')) {
                        const mySplit = prop.split('Sábado');
                        if (cuadranteColumna[prop].sabadoCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].sabadoCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Sábado-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    if (prop.includes('Domingo')) {
                        const mySplit = prop.split('Domingo');
                        if (cuadranteColumna[prop].domingoCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                        //'Considerar como horas extra'
                                        lasHorasNormal = null;
                                        lasHorasExtra = cuadranteColumna[prop].domingoCantidad / 60;
                                        break;
                                    case 2:
                                        //'Añadir 0.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 30 / 60;
                                        break;
                                    case 3:
                                        //'Añadir 1 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 60 / 60;
                                        break;
                                    case 4:
                                        //'Añadir 1.5 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 90 / 60;
                                        break;
                                    case 5:
                                        //'Añadir 2 horas extra de trabajo'
                                        lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                        lasHorasExtra = 120 / 60;
                                        break;
                                    case 6:
                                        //'Horas especiales (+15%)'
                                        break;
                                    default:
                                }
                            } else {
                                lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                lasHorasExtra = null;
                            };
                            switch (cuadranteColumna[prop].tipoServicio) {
                                case 'LIM':
                                    sumatorioHorasNormal_L += lasHorasNormal;
                                    sumatorioHorasExtra_L += lasHorasExtra;
                                    break;
                                case 'LIME':
                                    sumatorioHorasNormal_E += lasHorasNormal;
                                    sumatorioHorasExtra_E += lasHorasExtra;
                                    break;
                                case 'LIMP':
                                    sumatorioHorasNormal_P += lasHorasNormal;
                                    sumatorioHorasExtra_P += lasHorasExtra;
                                    break;
                                case 'NAVE2':
                                    sumatorioHorasNormal_N += lasHorasNormal;
                                    sumatorioHorasExtra_N += lasHorasExtra;
                                    break;
                                case 'REFZ':
                                    sumatorioHorasNormal_R += lasHorasNormal;
                                    sumatorioHorasExtra_R += lasHorasExtra;
                                    break;
                                case 'LIM1':
                                    sumatorioHorasNormal_L1 += lasHorasNormal;
                                    sumatorioHorasExtra_L1 += lasHorasExtra;
                                    break;
                                case 'LIM2':
                                    sumatorioHorasNormal_L2 += lasHorasNormal;
                                    sumatorioHorasExtra_L2 += lasHorasExtra;
                                    break;
                                case 'FEST':
                                    sumatorioHorasNormal_F += lasHorasNormal;
                                    sumatorioHorasExtra_F += lasHorasExtra;
                                    break;
                                default:
                            }
                            sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                            arrayResultante[index].computo.push({
                                dia: 'Domingo-' + mySplit[1],
                                horasNormal: lasHorasNormal,
                                horasExtra: lasHorasExtra
                            });
                        }
                    };
                    arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                    arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                    arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                    arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                    arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                    arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                    arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                    arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                    arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                    arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                    arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                    arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                    arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                    arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                    arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                    arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                    arrayResultante[index].totalHoras = sumatorioHoras;
                }
                break;
            default:
        };
        sumatorioHorasFestivasComputables_L += cuadranteColumna.horasFestivasComputables_L;
        sumatorioHorasFestivasComputables_E += cuadranteColumna.horasFestivasComputables_E;
        sumatorioHorasFestivasComputables_P += cuadranteColumna.horasFestivasComputables_P;
        sumatorioHorasFestivasComputables_N += cuadranteColumna.horasFestivasComputables_N;
        sumatorioHorasFestivasComputables_R += cuadranteColumna.horasFestivasComputables_R;
        sumatorioHorasFestivasComputables_L1 += cuadranteColumna.horasFestivasComputables_L1;
        sumatorioHorasFestivasComputables_L2 += cuadranteColumna.horasFestivasComputables_L2;
        sumatorioHorasFestivasComputables_F += cuadranteColumna.horasFestivasComputables_F;
        sumatorioTotalHorasNormal_L += sumatorioHorasNormal_L;
        sumatorioTotalHorasNormal_E += sumatorioHorasNormal_E;
        sumatorioTotalHorasNormal_P += sumatorioHorasNormal_P;
        sumatorioTotalHorasNormal_N += sumatorioHorasNormal_N;
        sumatorioTotalHorasNormal_R += sumatorioHorasNormal_R;
        sumatorioTotalHorasNormal_L1 += sumatorioHorasNormal_L1;
        sumatorioTotalHorasNormal_L2 += sumatorioHorasNormal_L2;
        sumatorioTotalHorasNormal_F += sumatorioHorasNormal_F;
        sumatorioHorasBajasComputables += cuadranteColumna.horasBajasComputables;
    });
    let objetoDatosInforme = {};
    let totalMensualPactado;
    let proporcion;
    let sumatorioHorasFestivasTotal;
    //gestion mensualPactado    
    let cantidadMensualPactado = parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado);   
    if (cantidadMensualPactado >= 0) {
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].iniciado) {
            //caudrante iniciado
            //control de excepciones
            switch (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion) {
                case 1:
                    sumatorioHorasFestivasTotal =
                        sumatorioHorasFestivasComputables_L +
                        sumatorioHorasFestivasComputables_E +
                        sumatorioHorasFestivasComputables_P +
                        sumatorioHorasFestivasComputables_N +
                        sumatorioHorasFestivasComputables_R +
                        sumatorioHorasFestivasComputables_L1 +
                        sumatorioHorasFestivasComputables_L2 +
                        sumatorioHorasFestivasComputables_F;
                    totalMensualPactado =
                        ((sumatorioTotalHorasNormal_L + sumatorioHorasFestivasComputables_L +
                            sumatorioTotalHorasNormal_E + sumatorioHorasFestivasComputables_E +
                            sumatorioTotalHorasNormal_P + sumatorioHorasFestivasComputables_P +
                            sumatorioTotalHorasNormal_N + sumatorioHorasFestivasComputables_N +
                            sumatorioTotalHorasNormal_R + sumatorioHorasFestivasComputables_R +
                            sumatorioTotalHorasNormal_L1 + sumatorioHorasFestivasComputables_L1 +
                            sumatorioTotalHorasNormal_L2 + sumatorioHorasFestivasComputables_L2 +
                            sumatorioTotalHorasNormal_F + sumatorioHorasFestivasComputables_F +
                            sumatorioHorasBajasComputables) *
                            (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion)) -
                        (sumatorioHorasFestivasTotal * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion);
                    objetoDatosInforme = {
                        ...objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1],
                        mensualPactado: totalMensualPactado
                    };
                    break;
                case '':
                    sumatorioHorasFestivasTotal =
                        sumatorioHorasFestivasComputables_L +
                        sumatorioHorasFestivasComputables_E +
                        sumatorioHorasFestivasComputables_P +
                        sumatorioHorasFestivasComputables_N +
                        sumatorioHorasFestivasComputables_R +
                        sumatorioHorasFestivasComputables_L1 +
                        sumatorioHorasFestivasComputables_L2 +
                        sumatorioHorasFestivasComputables_F;
                    totalMensualPactado =
                        ((sumatorioTotalHorasNormal_L + sumatorioHorasFestivasComputables_L +
                            sumatorioTotalHorasNormal_E + sumatorioHorasFestivasComputables_E +
                            sumatorioTotalHorasNormal_P + sumatorioHorasFestivasComputables_P +
                            sumatorioTotalHorasNormal_N + sumatorioHorasFestivasComputables_N +
                            sumatorioTotalHorasNormal_R + sumatorioHorasFestivasComputables_R +
                            sumatorioTotalHorasNormal_L1 + sumatorioHorasFestivasComputables_L1 +
                            sumatorioTotalHorasNormal_L2 + sumatorioHorasFestivasComputables_L2 +
                            sumatorioTotalHorasNormal_F + sumatorioHorasFestivasComputables_F +
                            sumatorioHorasBajasComputables) *
                            objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion);
                    objetoDatosInforme = {
                        ...objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1],
                        mensualPactado: totalMensualPactado
                    };
                    break;
                default:
            };
        } else {
            //caudrante no iniciado 
            //control de excepciones
            switch (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion) {
                case 1:
                    totalHorasInicial_L = sumatorioTotalHorasNormal_L + sumatorioHorasFestivasComputables_L;
                    totalHorasInicial_E = sumatorioTotalHorasNormal_E + sumatorioHorasFestivasComputables_E;
                    totalHorasInicial_P = sumatorioTotalHorasNormal_P + sumatorioHorasFestivasComputables_P;
                    totalHorasInicial_N = sumatorioTotalHorasNormal_N + sumatorioHorasFestivasComputables_N;
                    totalHorasInicial_R = sumatorioTotalHorasNormal_R + sumatorioHorasFestivasComputables_R;
                    totalHorasInicial_L1 = sumatorioTotalHorasNormal_L1 + sumatorioHorasFestivasComputables_L1;
                    totalHorasInicial_L2 = sumatorioTotalHorasNormal_L2 + sumatorioHorasFestivasComputables_L2;
                    totalHorasInicial_F = sumatorioTotalHorasNormal_F + sumatorioHorasFestivasComputables_F;
                    totalHorasInicial =
                        totalHorasInicial_L +
                        totalHorasInicial_E +
                        totalHorasInicial_P +
                        totalHorasInicial_N +
                        totalHorasInicial_R +
                        totalHorasInicial_L1 +
                        totalHorasInicial_L2 +
                        totalHorasInicial_F;
                    sumatorioHorasFestivasTotal =
                        sumatorioHorasFestivasComputables_L +
                        sumatorioHorasFestivasComputables_E +
                        sumatorioHorasFestivasComputables_P +
                        sumatorioHorasFestivasComputables_N +
                        sumatorioHorasFestivasComputables_R +
                        sumatorioHorasFestivasComputables_L1 +
                        sumatorioHorasFestivasComputables_L2 +
                        sumatorioHorasFestivasComputables_F;
                    proporcion = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado / (totalHorasInicial + sumatorioHorasBajasComputables);
                    totalMensualPactado = (totalHorasInicial * proporcion) - (sumatorioHorasFestivasTotal * proporcion);
                    if (sumatorioHorasFestivasComputables_L > 0) {
                        objetoDatosInforme['horasFestivasComputables_L'] = sumatorioHorasFestivasComputables_L;
                    };
                    if (sumatorioHorasFestivasComputables_E > 0) {
                        objetoDatosInforme['horasFestivasComputables_E'] = sumatorioHorasFestivasComputables_E;
                    };
                    if (sumatorioHorasFestivasComputables_P > 0) {
                        objetoDatosInforme['horasFestivasComputables_P'] = sumatorioHorasFestivasComputables_P;
                    };
                    if (sumatorioHorasFestivasComputables_N > 0) {
                        objetoDatosInforme['horasFestivasComputables_N'] = sumatorioHorasFestivasComputables_N;
                    };
                    if (sumatorioHorasFestivasComputables_R > 0) {
                        objetoDatosInforme['horasFestivasComputables_R'] = sumatorioHorasFestivasComputables_R;
                    };
                    if (sumatorioHorasFestivasComputables_L1 > 0) {
                        objetoDatosInforme['horasFestivasComputables_L1'] = sumatorioHorasFestivasComputables_L1;
                    };
                    if (sumatorioHorasFestivasComputables_L2 > 0) {
                        objetoDatosInforme['horasFestivasComputables_L2'] = sumatorioHorasFestivasComputables_L2;
                    };
                    if (sumatorioHorasFestivasComputables_F > 0) {
                        objetoDatosInforme['horasFestivasComputables_F'] = sumatorioHorasFestivasComputables_F;
                    };
                    if (sumatorioHorasBajasComputables > 0) {
                        objetoDatosInforme['horasBajasComputables'] = sumatorioHorasBajasComputables;
                    } else {
                        objetoDatosInforme['horasBajasComputables'] = 0;
                    };
                    objetoDatosInforme = {
                        ...objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1],
                        mensualPactado: totalMensualPactado,
                        iniciado: true,
                        totalHorasInicial_L: totalHorasInicial_L > 0 ? totalHorasInicial_L : null,
                        totalHorasInicial_E: totalHorasInicial_E > 0 ? totalHorasInicial_E : null,
                        totalHorasInicial_P: totalHorasInicial_P > 0 ? totalHorasInicial_P : null,
                        totalHorasInicial_N: totalHorasInicial_N > 0 ? totalHorasInicial_N : null,
                        totalHorasInicial_R: totalHorasInicial_R > 0 ? totalHorasInicial_R : null,
                        totalHorasInicial_L1: totalHorasInicial_L1 > 0 ? totalHorasInicial_L1 : null,
                        totalHorasInicial_L2: totalHorasInicial_L2 > 0 ? totalHorasInicial_L2 : null,
                        totalHorasInicial_F: totalHorasInicial_F > 0 ? totalHorasInicial_F : null,
                        totalHorasInicial: totalHorasInicial,
                        proporcion: proporcion,
                    };
                    break;
                case '':
                    totalHorasInicial_L = sumatorioTotalHorasNormal_L + sumatorioHorasFestivasComputables_L;
                    totalHorasInicial_E = sumatorioTotalHorasNormal_E + sumatorioHorasFestivasComputables_E;
                    totalHorasInicial_P = sumatorioTotalHorasNormal_P + sumatorioHorasFestivasComputables_P;
                    totalHorasInicial_N = sumatorioTotalHorasNormal_N + sumatorioHorasFestivasComputables_N;
                    totalHorasInicial_R = sumatorioTotalHorasNormal_R + sumatorioHorasFestivasComputables_R;
                    totalHorasInicial_L1 = sumatorioTotalHorasNormal_L1 + sumatorioHorasFestivasComputables_L1;
                    totalHorasInicial_L2 = sumatorioTotalHorasNormal_L2 + sumatorioHorasFestivasComputables_L2;
                    totalHorasInicial_F = sumatorioTotalHorasNormal_F + sumatorioHorasFestivasComputables_F;
                    totalHorasInicial =
                        totalHorasInicial_L +
                        totalHorasInicial_E +
                        totalHorasInicial_P +
                        totalHorasInicial_N +
                        totalHorasInicial_R +
                        totalHorasInicial_L1 +
                        totalHorasInicial_L2 +
                        totalHorasInicial_F;
                    proporcion = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado / (totalHorasInicial + sumatorioHorasBajasComputables);
                    totalMensualPactado = totalHorasInicial * proporcion;
                    if (sumatorioHorasFestivasComputables_L > 0) {
                        objetoDatosInforme['horasFestivasComputables_L'] = sumatorioHorasFestivasComputables_L;
                    };
                    if (sumatorioHorasFestivasComputables_E > 0) {
                        objetoDatosInforme['horasFestivasComputables_E'] = sumatorioHorasFestivasComputables_E;
                    };
                    if (sumatorioHorasFestivasComputables_P > 0) {
                        objetoDatosInforme['horasFestivasComputables_P'] = sumatorioHorasFestivasComputables_P;
                    };
                    if (sumatorioHorasFestivasComputables_N > 0) {
                        objetoDatosInforme['horasFestivasComputables_N'] = sumatorioHorasFestivasComputables_N;
                    };
                    if (sumatorioHorasFestivasComputables_R > 0) {
                        objetoDatosInforme['horasFestivasComputables_R'] = sumatorioHorasFestivasComputables_R;
                    };
                    if (sumatorioHorasFestivasComputables_L1 > 0) {
                        objetoDatosInforme['horasFestivasComputables_L1'] = sumatorioHorasFestivasComputables_L1;
                    };
                    if (sumatorioHorasFestivasComputables_L2 > 0) {
                        objetoDatosInforme['horasFestivasComputables_L2'] = sumatorioHorasFestivasComputables_L2;
                    };
                    if (sumatorioHorasFestivasComputables_F > 0) {
                        objetoDatosInforme['horasFestivasComputables_F'] = sumatorioHorasFestivasComputables_F;
                    };
                    if (sumatorioHorasBajasComputables > 0) {
                        objetoDatosInforme['horasBajasComputables'] = sumatorioHorasBajasComputables;
                    } else {
                        objetoDatosInforme['horasBajasComputables'] = 0;
                    };
                    objetoDatosInforme = {
                        ...objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1],
                        mensualPactado: totalMensualPactado,
                        iniciado: true,
                        totalHorasInicial_L: totalHorasInicial_L > 0 ? totalHorasInicial_L : null,
                        totalHorasInicial_E: totalHorasInicial_E > 0 ? totalHorasInicial_E : null,
                        totalHorasInicial_P: totalHorasInicial_P > 0 ? totalHorasInicial_P : null,
                        totalHorasInicial_N: totalHorasInicial_N > 0 ? totalHorasInicial_N : null,
                        totalHorasInicial_R: totalHorasInicial_R > 0 ? totalHorasInicial_R : null,
                        totalHorasInicial_L1: totalHorasInicial_L1 > 0 ? totalHorasInicial_L1 : null,
                        totalHorasInicial_L2: totalHorasInicial_L2 > 0 ? totalHorasInicial_L2 : null,
                        totalHorasInicial_F: totalHorasInicial_F > 0 ? totalHorasInicial_F : null,
                        totalHorasInicial: totalHorasInicial,
                        proporcion: proporcion,
                    };
                    break;
                default:
            };
        };
        let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
        elArrayDatosInforme[cuadranteEnUsoCuadrantes - 1] = objetoDatosInforme;
        const losDatosInforme = {
            ...objetoCuadrante.datosInforme,
            datosInforme: elArrayDatosInforme
        };
        dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            datosInforme: losDatosInforme
        }));
    };
    return arrayResultante;
};

const retornaTipoBajaPorHistorico = (dia, historico) => {
    let elRetorno;
    historico.forEach((registro, index) => {
        let inicioSplitted = registro.baja[0].inicio.split("-");
        let diaInicio = parseInt(inicioSplitted[2]);
        let finSplitted = registro.baja[0].fin.split("-");
        let diaFin = parseInt(finSplitted[2]);
        const rangoHistorico = [];
        for (let i = diaInicio; i < diaFin; i++) {
            rangoHistorico.push(i)
        };
        if (rangoHistorico.includes(dia)) {
            elRetorno = registro.baja[0].tipo;
        }
    });
    return elRetorno;
};

const periodoBajaTrabajadorAccion = (calendarioAGestionar, inicioBaja, finBaja, diasMes) => {
    let myArrSplitCalendario = calendarioAGestionar.split("-");
    const anyoCalendario = myArrSplitCalendario[0];
    const mesCalendario = myArrSplitCalendario[1];
    let myArrSplitInicioB = inicioBaja.split("-");
    const anyoInicioB = myArrSplitInicioB[0];
    const mesInicioB = myArrSplitInicioB[1];
    const diaInicioB = myArrSplitInicioB[2];
    let anyoFinB, mesFinB, diaFinB;
    if (finBaja) {
        let myArrSplitFinB = finBaja.split("-");
        anyoFinB = myArrSplitFinB[0];
        mesFinB = myArrSplitFinB[1];
        diaFinB = myArrSplitFinB[2];
    } else {
        anyoFinB = anyoCalendario;
        mesFinB = mesCalendario;
        diaFinB = parseInt(diasMes);
    }
    let empezamosPor;
    let acabamosPor;
    if (anyoInicioB < anyoCalendario || mesInicioB < mesCalendario) {
        empezamosPor = 1;
    };
    if (anyoFinB > anyoCalendario || mesFinB > mesCalendario) {
        acabamosPor = parseInt(diasMes);
    };
    if (anyoInicioB === anyoCalendario && mesInicioB === mesCalendario) {
        empezamosPor = parseInt(diaInicioB);
    };
    if (finBaja) {
        if (anyoFinB === anyoCalendario && mesFinB === mesCalendario) {
            acabamosPor = parseInt(diaFinB - 1);
        };
    } else {
        if (anyoFinB === anyoCalendario && mesFinB === mesCalendario) {
            acabamosPor = parseInt(diaFinB);
        };
    }
    let arrayBaja = [];
    for (let i = empezamosPor; i <= acabamosPor; i++) {
        arrayBaja.push(i);
    };
    return arrayBaja;
};

export const gestionaDiasFestivosOBajas = (
    elHorarioCuadrante,
    tipoRegistro,
    tipoHorario,
    posicionTrabajador,
    item
) => {
    let objetoARetornar;
    let laCantidad;
    let posicionArray;
    if (tipoRegistro === 'comun') {
        posicionArray = 0;
    } else {
        posicionArray = posicionTrabajador - 1;
    };
    if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray][item]) {
        let rango1, rango2;
        switch (tipoHorario) {
            case 'rango':
                switch (item) {
                    case 'lunesInicioRango':
                        laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesInicioRango'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesFinRango']
                        ) / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'martesInicioRango':
                        laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesInicioRango'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesFinRango']
                        ) / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'miercolesInicioRango':
                        laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesInicioRango'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesFinRango']
                        ) / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'juevesInicioRango':
                        laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesInicioRango'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesFinRango']
                        ) / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'viernesInicioRango':
                        laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesInicioRango'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesFinRango']
                        ) / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'sabadoInicioRango':
                        laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoInicioRango'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoFinRango']
                        ) / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'domingoInicioRango':
                        laCantidad = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoInicioRango'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoFinRango']
                        ) / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoTipoServicio'] };
                        return objetoARetornar
                        break;
                    default:
                };
                break;
            case 'rangoDescanso':
                switch (item) {
                    case 'lunesInicio1RangoDescanso':
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesInicio2RangoDescanso']) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesInicio2RangoDescanso'],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesFin2RangoDescanso']
                            ) / 60;
                        } else {
                            rango2 = 0;
                        };
                        rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesInicio1RangoDescanso'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesFin1RangoDescanso']
                        ) / 60;
                        laCantidad = rango1 + rango2;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'martesInicio1RangoDescanso':
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesInicio2RangoDescanso']) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesInicio2RangoDescanso'],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesFin2RangoDescanso']
                            ) / 60;
                        } else {
                            rango2 = 0;
                        };
                        rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesInicio1RangoDescanso'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesFin1RangoDescanso']
                        ) / 60;
                        laCantidad = rango1 + rango2;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'miercolesInicio1RangoDescanso':
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesInicio2RangoDescanso']) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesInicio2RangoDescanso'],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesFin2RangoDescanso']
                            ) / 60;
                        } else {
                            rango2 = 0;
                        };
                        rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesInicio1RangoDescanso'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesFin1RangoDescanso']
                        ) / 60;
                        laCantidad = rango1 + rango2;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'juevesInicio1RangoDescanso':
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesInicio2RangoDescanso']) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesInicio2RangoDescanso'],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesFin2RangoDescanso']
                            ) / 60;
                        } else {
                            rango2 = 0;
                        };
                        rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesInicio1RangoDescanso'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesFin1RangoDescanso']
                        ) / 60;
                        laCantidad = rango1 + rango2;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'viernesInicio1RangoDescanso':
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesInicio2RangoDescanso']) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesInicio2RangoDescanso'],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesFin2RangoDescanso']
                            ) / 60;
                        } else {
                            rango2 = 0;
                        };
                        rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesInicio1RangoDescanso'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesFin1RangoDescanso']
                        ) / 60;
                        laCantidad = rango1 + rango2;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'sabadoInicio1RangoDescanso':
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoInicio2RangoDescanso']) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoInicio2RangoDescanso'],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoFin2RangoDescanso']
                            ) / 60;
                        } else {
                            rango2 = 0;
                        };
                        rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoInicio1RangoDescanso'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoFin1RangoDescanso']
                        ) / 60;
                        laCantidad = rango1 + rango2;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'domingoInicio1RangoDescanso':
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoInicio2RangoDescanso']) {
                            rango2 = retornaMinutosAccionEnCuadrantes(
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoInicio2RangoDescanso'],
                                elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoFin2RangoDescanso']
                            ) / 60;
                        } else {
                            rango2 = 0;
                        };
                        rango1 = retornaMinutosAccionEnCuadrantes(
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoInicio1RangoDescanso'],
                            elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoFin1RangoDescanso']
                        ) / 60;
                        laCantidad = rango1 + rango2;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoTipoServicio'] };
                        return objetoARetornar
                        break;
                    default:
                };
                break;
            case 'cantidad':
                switch (item) {
                    case 'lunesCantidad':
                        laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesCantidad'] / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['lunesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'martesCantidad':
                        laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesCantidad'] / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['martesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'miercolesCantidad':
                        laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesCantidad'] / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['miercolesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'juevesCantidad':
                        laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesCantidad'] / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['juevesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'viernesCantidad':
                        laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesCantidad'] / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['viernesTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'sabadoCantidad':
                        laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoCantidad'] / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['sabadoTipoServicio'] };
                        return objetoARetornar
                        break;
                    case 'domingoCantidad':
                        laCantidad = elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoCantidad'] / 60;
                        objetoARetornar = { cantidad: laCantidad, servicio: elHorarioCuadrante.tipoRegistroTrabajador[posicionArray]['domingoTipoServicio'] };
                        return objetoARetornar
                        break;
                    default:
                };
                break;
            default:
        }
    } else {
        objetoARetornar = { cantidad: 0, servicio: null };
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
    item
) => {
    let comillas;
    if (item === 'lunesTipoServicio' ||
        item === 'martesTipoServicio' ||
        item === 'miercolesTipoServicio' ||
        item === 'juevesTipoServicio' ||
        item === 'viernesTipoServicio' ||
        item === 'sabadoTipoServicio' ||
        item === 'domingoTipoServicio' ||
        item === 'lunesCantidad' ||
        item === 'martesCantidad' ||
        item === 'miercolesCantidad' ||
        item === 'juevesCantidad' ||
        item === 'viernesCantidad' ||
        item === 'sabadoCantidad' ||
        item === 'domingoCantidad'
    ) {
        comillas = true;
    } else {
        comillas = false
    };
    if (tipoRegistro === 'comun') {
        if (esLimpieza) {
            if (comillas) {
                return '';
            } else {
                return null;
            }
        } else {
            if (elHorarioCuadrante.tipoRegistroTrabajador[0][item]) {
                return elHorarioCuadrante.tipoRegistroTrabajador[0][item];
            } else {
                if (comillas) {
                    return '';
                } else {
                    return null;
                }
            }
        }
    } else {
        if (esInicio) {
            if (esLimpieza) {
                if (comillas) {
                    return '';
                } else {
                    return null;
                }
            } else {
                if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                    return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                } else {
                    if (comillas) {
                        return '';
                    } else {
                        return null;
                    }
                }
            }
        } else {
            if (tipoTrabajador === 'trabajador') {
                if (posicionTrabajador > cantidadTrabajadoresCentro) {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (elHorarioCuadrante.tipoRegistroTrabajador[0][item]) {
                            return elHorarioCuadrante.tipoRegistroTrabajador[0][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                } else {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                            return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                }
            } else {
                if (posicionTrabajador > cantidadTrabajadoresCentro) {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (elHorarioCuadrante.tipoRegistroTrabajador[0][item]) {
                            return elHorarioCuadrante.tipoRegistroTrabajador[0][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                } else {
                    if (esLimpieza) {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    } else {
                        if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                            return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                        } else {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        }
                    }
                }
            }
        }
    }
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
    tipoHorario
) => (dispatch, getState) => {
    const { cuadrante, calendarioAGestionar, losDiasDelMes, stateFestivo } = getState().variablesCuadrantes;
    const { bufferSwitchedDiasFestivosCuadrante, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    let columnaAnadir;
    let numeroSemana;
    let arrayBaja1 = [];
    let arrayBaja2 = [];
    let arrayBaja = [];
    let hayTrabajador;
    let arrayRegistrosHistorico = [];
    let tipoRegistro = elHorarioCuadrante.tipoRegistro;
    let cantidadTrabajadoresCentro = elHorarioCuadrante.tipoRegistroTrabajador.length;
    let festivoComputable, bajaComputable;
    let contadorHorasFestivosComputables_L = 0;
    let contadorHorasFestivosComputables_E = 0;
    let contadorHorasFestivosComputables_P = 0;
    let contadorHorasFestivosComputables_N = 0;
    let contadorHorasFestivosComputables_R = 0;
    let contadorHorasFestivosComputables_L1 = 0;
    let contadorHorasFestivosComputables_L2 = 0;
    let contadorHorasFestivosComputables_F = 0;
    let contadorHorasBajasComputables = 0;
    let objetoBuffer = {};
    let elDia;
    let indiceObjeto;
    let arrayBuffer = [];
    if (bufferSwitchedDiasFestivosCuadrante.length > 0 && !esInicio) {
        arrayBuffer[cuadranteEnUsoCuadrantes - 1] = [...bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]];
    };
    if (trabajador && tipoTrabajador) {
        if (esRevision) {
            columnaAnadir = {
                nombreTrabajador: trabajador.nombre,
                idTrabajador: trabajador.id,
                tipoHorario: tipoHorario,
                tipoTrabajador: tipoTrabajador,
            };
        } else {
            columnaAnadir = {
                nombreTrabajador: trabajador.nombre,
                idTrabajador: trabajador.id,
                tipoHorario: tipoHorario,
                tipoTrabajador: tipoTrabajador,
            };
        };
        hayTrabajador = true;
        if (trabajador.estado !== 'alta') {
            switch (trabajador.estado) {
                case 'baja':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBaja, trabajador.datosEstado.finBaja, losDiasDelMes.length);
                    break;
                case 'vacaciones':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioVacaciones, trabajador.datosEstado.finVacaciones, losDiasDelMes.length);
                    break;
                case 'excedencia':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioExcedencia, trabajador.datosEstado.finExcedencia, losDiasDelMes.length);
                    break;
                case 'personales':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioPersonales, trabajador.datosEstado.finPersonales, losDiasDelMes.length);
                    break;
                default:
            }
            columnaAnadir['hayBaja'] = true;
        } else {
            columnaAnadir['hayBaja'] = false;
        };
        if (trabajador.historicoBajas) {
            trabajador.historicoBajas.meses.forEach((registro, index) => {
                if (registro.mes === calendarioAGestionar) {
                    arrayRegistrosHistorico.push(registro);
                    columnaAnadir['hayBaja'] = true;
                } else {
                    columnaAnadir['hayBaja'] = false;
                }
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
        };
        hayTrabajador = false;
        columnaAnadir['hayBaja'] = false;
    };
    switch (tipoHorario) {
        case 'rango':
            losDiasDelMes.forEach((dia, index) => {
                objetoBuffer = {};
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesInicioRango: null,
                            lunesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'lunesInicioRango');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicioRango: null,
                                    lunesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'lunesInicioRango');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: null,
                                        lunesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicioRango: null,
                                            lunesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                            lunesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicioRango: null,
                                    lunesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: null,
                                        lunesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                        lunesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesInicioRango: null,
                            martesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'martesInicioRango');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicioRango: null,
                                    martesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'martesInicioRango');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: null,
                                        martesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicioRango: null,
                                            martesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                            martesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicioRango: null,
                                    martesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: null,
                                        martesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                        martesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesInicioRango: null,
                            miercolesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'miercolesInicioRango');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicioRango: null,
                                    miercolesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'miercolesInicioRango');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: null,
                                        miercolesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicioRango: null,
                                            miercolesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                            miercolesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicioRango: null,
                                    miercolesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: null,
                                        miercolesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                        miercolesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesInicioRango: null,
                            juevesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'juevesInicioRango');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicioRango: null,
                                    juevesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'juevesInicioRango');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: null,
                                        juevesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicioRango: null,
                                            juevesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                            juevesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicioRango: null,
                                    juevesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: null,
                                        juevesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                        juevesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesInicioRango: null,
                            viernesFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'viernesInicioRango');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicioRango: null,
                                    viernesFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'viernesInicioRango');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: null,
                                        viernesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicioRango: null,
                                            viernesFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                            viernesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicioRango: null,
                                    viernesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: null,
                                        viernesFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                        viernesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoInicioRango: null,
                            sabadoFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'sabadoInicioRango');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicioRango: null,
                                    sabadoFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'sabadoInicioRango');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: null,
                                        sabadoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicioRango: null,
                                            sabadoFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                            sabadoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicioRango: null,
                                    sabadoFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: null,
                                        sabadoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                        sabadoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoInicioRango: null,
                            domingoFinRango: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'domingoInicioRango');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicioRango: null,
                                    domingoFinRango: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'domingoInicioRango');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: null,
                                        domingoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicioRango: null,
                                            domingoFinRango: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                            domingoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicioRango: null,
                                    domingoFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: null,
                                        domingoFinRango: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                        domingoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
            });
            break;
        case 'rangoDescanso':
            losDiasDelMes.forEach((dia, index) => {
                objetoBuffer = {};
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesInicio1RangoDescanso: null,
                            lunesFin1RangoDescanso: null,
                            lunesInicio2RangoDescanso: null,
                            lunesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'lunesInicio1RangoDescanso');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicio1RangoDescanso: null,
                                    lunesFin1RangoDescanso: null,
                                    lunesInicio2RangoDescanso: null,
                                    lunesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'lunesInicio1RangoDescanso');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: null,
                                        lunesFin1RangoDescanso: null,
                                        lunesInicio2RangoDescanso: null,
                                        lunesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicio1RangoDescanso: null,
                                            lunesFin1RangoDescanso: null,
                                            lunesInicio2RangoDescanso: null,
                                            lunesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                            lunesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                            lunesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                            lunesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesInicio1RangoDescanso: null,
                                    lunesFin1RangoDescanso: null,
                                    lunesInicio2RangoDescanso: null,
                                    lunesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: null,
                                        lunesFin1RangoDescanso: null,
                                        lunesInicio2RangoDescanso: null,
                                        lunesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                        lunesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                        lunesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                        lunesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia    
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesInicio1RangoDescanso: null,
                            martesFin1RangoDescanso: null,
                            martesInicio2RangoDescanso: null,
                            martesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'martesInicio1RangoDescanso');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicio1RangoDescanso: null,
                                    martesFin1RangoDescanso: null,
                                    martesInicio2RangoDescanso: null,
                                    martesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'martesInicio1RangoDescanso');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: null,
                                        martesFin1RangoDescanso: null,
                                        martesInicio2RangoDescanso: null,
                                        martesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicio1RangoDescanso: null,
                                            martesFin1RangoDescanso: null,
                                            martesInicio2RangoDescanso: null,
                                            martesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                            martesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                            martesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                            martesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesInicio1RangoDescanso: null,
                                    martesFin1RangoDescanso: null,
                                    martesInicio2RangoDescanso: null,
                                    martesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: null,
                                        martesFin1RangoDescanso: null,
                                        martesInicio2RangoDescanso: null,
                                        martesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                        martesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                        martesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                        martesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesInicio1RangoDescanso: null,
                            miercolesFin1RangoDescanso: null,
                            miercolesInicio2RangoDescanso: null,
                            miercolesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'miercolesInicio1RangoDescanso');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicio1RangoDescanso: null,
                                    miercolesFin1RangoDescanso: null,
                                    miercolesInicio2RangoDescanso: null,
                                    miercolesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'miercolesInicio1RangoDescanso');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: null,
                                        miercolesFin1RangoDescanso: null,
                                        miercolesInicio2RangoDescanso: null,
                                        miercolesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicio1RangoDescanso: null,
                                            miercolesFin1RangoDescanso: null,
                                            miercolesInicio2RangoDescanso: null,
                                            miercolesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                            miercolesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                            miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                            miercolesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesInicio1RangoDescanso: null,
                                    miercolesFin1RangoDescanso: null,
                                    miercolesInicio2RangoDescanso: null,
                                    miercolesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: null,
                                        miercolesFin1RangoDescanso: null,
                                        miercolesInicio2RangoDescanso: null,
                                        miercolesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                        miercolesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                        miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                        miercolesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesInicio1RangoDescanso: null,
                            juevesFin1RangoDescanso: null,
                            juevesInicio2RangoDescanso: null,
                            juevesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'juevesInicio1RangoDescanso');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicio1RangoDescanso: null,
                                    juevesFin1RangoDescanso: null,
                                    juevesInicio2RangoDescanso: null,
                                    juevesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'juevesInicio1RangoDescanso');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: null,
                                        juevesFin1RangoDescanso: null,
                                        juevesInicio2RangoDescanso: null,
                                        juevesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicio1RangoDescanso: null,
                                            juevesFin1RangoDescanso: null,
                                            juevesInicio2RangoDescanso: null,
                                            juevesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                            juevesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                            juevesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                            juevesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesInicio1RangoDescanso: null,
                                    juevesFin1RangoDescanso: null,
                                    juevesInicio2RangoDescanso: null,
                                    juevesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: null,
                                        juevesFin1RangoDescanso: null,
                                        juevesInicio2RangoDescanso: null,
                                        juevesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                        juevesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                        juevesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                        juevesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesInicio1RangoDescanso: null,
                            viernesFin1RangoDescanso: null,
                            viernesInicio2RangoDescanso: null,
                            viernesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'viernesInicio1RangoDescanso');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicio1RangoDescanso: null,
                                    viernesFin1RangoDescanso: null,
                                    viernesInicio2RangoDescanso: null,
                                    viernesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'viernesInicio1RangoDescanso');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: null,
                                        viernesFin1RangoDescanso: null,
                                        viernesInicio2RangoDescanso: null,
                                        viernesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicio1RangoDescanso: null,
                                            viernesFin1RangoDescanso: null,
                                            viernesInicio2RangoDescanso: null,
                                            viernesFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                            viernesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                            viernesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                            viernesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesInicio1RangoDescanso: null,
                                    viernesFin1RangoDescanso: null,
                                    viernesInicio2RangoDescanso: null,
                                    viernesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: null,
                                        viernesFin1RangoDescanso: null,
                                        viernesInicio2RangoDescanso: null,
                                        viernesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                        viernesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                        viernesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                        viernesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoInicio1RangoDescanso: null,
                            sabadoFin1RangoDescanso: null,
                            sabadoInicio2RangoDescanso: null,
                            sabadoFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'sabadoInicio1RangoDescanso');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicio1RangoDescanso: null,
                                    sabadoFin1RangoDescanso: null,
                                    sabadoInicio2RangoDescanso: null,
                                    sabadoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'sabadoInicio1RangoDescanso');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: null,
                                        sabadoFin1RangoDescanso: null,
                                        sabadoInicio2RangoDescanso: null,
                                        sabadoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicio1RangoDescanso: null,
                                            sabadoFin1RangoDescanso: null,
                                            sabadoInicio2RangoDescanso: null,
                                            sabadoFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                            sabadoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                            sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                            sabadoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoInicio1RangoDescanso: null,
                                    sabadoFin1RangoDescanso: null,
                                    sabadoInicio2RangoDescanso: null,
                                    sabadoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: null,
                                        sabadoFin1RangoDescanso: null,
                                        sabadoInicio2RangoDescanso: null,
                                        sabadoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                        sabadoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                        sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                        sabadoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoInicio1RangoDescanso: null,
                            domingoFin1RangoDescanso: null,
                            domingoInicio2RangoDescanso: null,
                            domingoFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'domingoInicio1RangoDescanso');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicio1RangoDescanso: null,
                                    domingoFin1RangoDescanso: null,
                                    domingoInicio2RangoDescanso: null,
                                    domingoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'domingoInicio1RangoDescanso');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: null,
                                        domingoFin1RangoDescanso: null,
                                        domingoInicio2RangoDescanso: null,
                                        domingoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicio1RangoDescanso: null,
                                            domingoFin1RangoDescanso: null,
                                            domingoInicio2RangoDescanso: null,
                                            domingoFin2RangoDescanso: null,
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                            domingoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                            domingoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                            domingoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoInicio1RangoDescanso: null,
                                    domingoFin1RangoDescanso: null,
                                    domingoInicio2RangoDescanso: null,
                                    domingoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: null,
                                        domingoFin1RangoDescanso: null,
                                        domingoInicio2RangoDescanso: null,
                                        domingoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                        domingoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                        domingoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                        domingoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
            });
            break;
        case 'cantidad':
            losDiasDelMes.forEach((dia, index) => {
                objetoBuffer = {};
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'lunesCantidad');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'lunesCantidad');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Lunes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    lunesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'martesCantidad');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'martesCantidad');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Martes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    martesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Martes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'miercolesCantidad');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'miercolesCantidad');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Miércoles') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    miercolesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Miércoles') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'juevesCantidad');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'juevesCantidad');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Jueves') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    juevesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Jueves') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'viernesCantidad');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'viernesCantidad');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Viernes') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    viernesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Viernes') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'sabadoCantidad');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'sabadoCantidad');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Sábado') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    sabadoCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Sábado') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoCantidad: '',
                            tipoServicio: '',
                            baja: false,
                            tipoBaja: null,
                            festivo: true,
                            observaciones: '',
                            modificado: false,
                            visibleVariaciones: false,
                            tipoVariacion: ''
                        };
                        if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                            if (arrayBuffer.length > 0 && !esInicio) {
                                elDia = dia[1][0] + dia[0][0];
                                indiceObjeto = arrayBuffer[cuadranteEnUsoCuadrantes - 1].findIndex(dia => (Object.keys(dia)[0]) === elDia);
                                if (indiceObjeto >= 0) {
                                    objetoBuffer[dia[1][0] + dia[0][0]] = [...arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto][elDia]];
                                    objetoBuffer[dia[1][0] + dia[0][0]][cuadrante.length - 1] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'domingoCantidad');
                            if (festivoComputable.cantidad > 0) {
                                switch (festivoComputable.servicio) {
                                    case 'LIM':
                                        contadorHorasFestivosComputables_L += festivoComputable.cantidad;
                                        break;
                                    case 'LIME':
                                        contadorHorasFestivosComputables_E += festivoComputable.cantidad;
                                        break;
                                    case 'LIMP':
                                        contadorHorasFestivosComputables_P += festivoComputable.cantidad;
                                        break;
                                    case 'NAVE2':
                                        contadorHorasFestivosComputables_N += festivoComputable.cantidad;
                                        break;
                                    case 'REFZ':
                                        contadorHorasFestivosComputables_R += festivoComputable.cantidad;
                                        break;
                                    case 'LIM1':
                                        contadorHorasFestivosComputables_L1 += festivoComputable.cantidad;
                                        break;
                                    case 'LIM2':
                                        contadorHorasFestivosComputables_L2 += festivoComputable.cantidad;
                                        break;
                                    case 'FEST':
                                        contadorHorasFestivosComputables_F += festivoComputable.cantidad;
                                        break;
                                    default:
                                };
                            };
                        };
                    };
                } else {
                    if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                        if (arrayBaja.includes(index + 1)) {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoCantidad: '',
                                    tipoServicio: '',
                                    baja: true,
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, tipoHorario, posicionTrabajador, 'domingoCantidad');
                                contadorHorasBajasComputables += bajaComputable.cantidad;
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                            if (dia[1][0] === 'Domingo') {
                                columnaAnadir[dia[1][0] + dia[0][0]] = {
                                    domingoCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                            }
                        } else {
                            if (dia[1][0] === 'Domingo') {
                                if ((tipoTrabajador === 'suplente' &&
                                    cuadrante[posicionAnterior] &&
                                    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                    (tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                } else {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad'),
                                        tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            }
                        };
                    }
                }//final secuencia
            });
            break;
        default:
    };
    if (contadorHorasFestivosComputables_L > 0) {
        columnaAnadir['horasFestivasComputables_L'] = contadorHorasFestivosComputables_L;
    } else {
        columnaAnadir['horasFestivasComputables_L'] = 0;
    };
    if (contadorHorasFestivosComputables_E > 0) {
        columnaAnadir['horasFestivasComputables_E'] = contadorHorasFestivosComputables_E;
    } else {
        columnaAnadir['horasFestivasComputables_E'] = 0;
    };
    if (contadorHorasFestivosComputables_P > 0) {
        columnaAnadir['horasFestivasComputables_P'] = contadorHorasFestivosComputables_P;
    } else {
        columnaAnadir['horasFestivasComputables_P'] = 0;
    };
    if (contadorHorasFestivosComputables_N > 0) {
        columnaAnadir['horasFestivasComputables_N'] = contadorHorasFestivosComputables_N;
    } else {
        columnaAnadir['horasFestivasComputables_N'] = 0;
    };
    if (contadorHorasFestivosComputables_R > 0) {
        columnaAnadir['horasFestivasComputables_R'] = contadorHorasFestivosComputables_R;
    } else {
        columnaAnadir['horasFestivasComputables_R'] = 0;
    };
    if (contadorHorasFestivosComputables_L1 > 0) {
        columnaAnadir['horasFestivasComputables_L1'] = contadorHorasFestivosComputables_L1;
    } else {
        columnaAnadir['horasFestivasComputables_L1'] = 0;
    };
    if (contadorHorasFestivosComputables_L2 > 0) {
        columnaAnadir['horasFestivasComputables_L2'] = contadorHorasFestivosComputables_L2;
    } else {
        columnaAnadir['horasFestivasComputables_L2'] = 0;
    };
    if (contadorHorasFestivosComputables_F > 0) {
        columnaAnadir['horasFestivasComputables_F'] = contadorHorasFestivosComputables_F;
    } else {
        columnaAnadir['horasFestivasComputables_F'] = 0;
    };
    if (contadorHorasBajasComputables > 0) {
        columnaAnadir['horasBajasComputables'] = contadorHorasBajasComputables;
    } else {
        columnaAnadir['horasBajasComputables'] = 0;
    };
    if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
        if (hayTrabajador && !esInicio) {
            dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(arrayBuffer));
        };
    };
    return {
        columnaAnadir,
        hayTrabajador
    };
};

export const gestionaColumnaCuadranteAccion = (trabajador, tipoTrabajador, esRevision, columna, esAnadirColumna, esLimpieza, tipoHorario) => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { cuadrante } = getState().variablesCuadrantes;
    const {
        trabajadoresEnCuadrante,
        suplentesEnCuadrante,
        cuadranteEnUsoCuadrantes,
        posicionTrabajadorPrevioACambiar,
        posicionSuplentePrevioACambiar
    } = getState().variablesCuadrantesSetters;

    let posicionTrabajador;
    if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
        if (tipoTrabajador === 'trabajador') {
            if (posicionTrabajadorPrevioACambiar) {
                posicionTrabajador = posicionTrabajadorPrevioACambiar;
                dispatch(setPosicionTrabajadorPrevioACambiarAccion(null));
            } else {
                if (esAnadirColumna) {
                    posicionTrabajador = cuadrante.length + 1;
                } else {
                    posicionTrabajador = trabajador.laPosicionDelTrabajador;
                }
            }
        };
        if (tipoTrabajador === 'suplente') {
            if (posicionSuplentePrevioACambiar) {
                posicionTrabajador = posicionSuplentePrevioACambiar;
                dispatch(setPosicionSuplentePrevioACambiarAccion(null));
            } else {
                if (esAnadirColumna) {
                    posicionTrabajador = columna;
                } else {
                    posicionTrabajador = trabajador.laPosicionDelTrabajador;
                }
            }
        };
    };
    let posicionAnterior;
    let esInicio = false;
    if (!esRevision && !esAnadirColumna) {
        posicionAnterior = cuadrante.length - 1;
        esInicio = true;
    } else if (esRevision && esAnadirColumna) {
        posicionAnterior = columna;
    } else {
        posicionAnterior = columna - 1;
    };
    if (cuadrante.length > 0) {
        if (cuadrante[posicionAnterior]) {
            if (tipoTrabajador === 'suplente' && !cuadrante[posicionAnterior].hayBaja && !esRevision) {
                // dispatch(setAlertaAccion({
                //     abierto: true,
                //     mensaje: "El trabajador no está o no ha estado de baja, no necesita suplente.",
                //     tipo: 'warning'
                // }));
                return;
            };
        };
        if (cuadrante[posicionAnterior]) {
            if (tipoTrabajador === 'suplente' && !cuadrante[posicionAnterior].hayBaja && esRevision && esAnadirColumna) {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "El trabajador no está o no ha estado de baja, o no has asignado trabajador, no necesita suplente.",
                    tipo: 'warning'
                }));
                return;
            };
        };
    };
    let elHorarioCuadrante = objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1];
    const { columnaAnadir, hayTrabajador } = dispatch(gestionaColumnaCuadranteInteriorAccion(
        trabajador,
        tipoTrabajador,
        esRevision,
        columna,
        elHorarioCuadrante,
        posicionAnterior,
        esInicio,
        posicionTrabajador,
        esLimpieza,
        tipoHorario
    ));
    if (!hayTrabajador && tipoTrabajador === 'trabajador') {
        const arrayCuadrante = [...cuadrante];
        let arrayTr = [...trabajadoresEnCuadrante];
        let randomNumber = (Math.floor(Math.random() * 100)) + 1000;
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            const idTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].idTrabajador;
            const estadoTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].tipoTrabajador;
            let laPosicion;
            if (estadoTrabajadorAnterior === 'trabajador') {
                const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                laPosicion = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
            };
            if (estadoTrabajadorAnterior === 'suplente') {
                const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                laPosicion = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
            };
            arrayTr.push({
                id: randomNumber,
                laPosicionDelTrabajador: laPosicion + 1,
                tipoTrabajador: 'trabajador'
            });
        } else {
            arrayTr.push({
                id: randomNumber,
                tipoTrabajador: 'trabajador'
            });
        };
        dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
        columnaAnadir['idTrabajador'] = randomNumber;
        arrayCuadrante.push(columnaAnadir);
        dispatch(setCuadranteAccion(arrayCuadrante));
        dispatch(setExpandedAccordionAccion(false));
    };
    if (!hayTrabajador && tipoTrabajador === 'suplente') {
        const arrayCuadrante = [...cuadrante];
        let arraySu = [...suplentesEnCuadrante];
        let randomNumber = (Math.floor(Math.random() * 100)) + 1000;
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            const idTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].idTrabajador;
            const estadoTrabajadorAnterior = arrayCuadrante[arrayCuadrante.length - 1].tipoTrabajador;
            let laPosicion;
            if (estadoTrabajadorAnterior === 'trabajador') {
                const posicionTrabajadorPrevioAnteriorIndex = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajadorAnterior));
                laPosicion = trabajadoresEnCuadrante[posicionTrabajadorPrevioAnteriorIndex].laPosicionDelTrabajador;
            };
            if (estadoTrabajadorAnterior === 'suplente') {
                const posicionSuplentePrevioAnteriorIndex = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajadorAnterior));
                laPosicion = suplentesEnCuadrante[posicionSuplentePrevioAnteriorIndex].laPosicionDelTrabajador;
            };
            arraySu.push({
                id: randomNumber,
                laPosicionDelTrabajador: laPosicion,
                tipoTrabajador: 'suplente'
            });
        } else {
            arraySu.push({
                id: randomNumber,
                tipoTrabajador: 'suplente'
            });
        };
        dispatch(setSuplentesEnCuadranteAccion(arraySu));
        columnaAnadir['idTrabajador'] = randomNumber;
        Array.prototype.insert = function (index, item) {
            this.splice(index, 0, item);
        };
        arrayCuadrante.insert(columna + 1, columnaAnadir);
        dispatch(setCuadranteAccion(arrayCuadrante));
        dispatch(setExpandedAccordionAccion(false));
    };
    if (hayTrabajador) {
        if (!esRevision) {
            return columnaAnadir;
        } else {
            const arrayCuadrante = [...cuadrante];
            arrayCuadrante[columna] = columnaAnadir;
            dispatch(setCuadranteAccion(arrayCuadrante));
        }
    };
};

