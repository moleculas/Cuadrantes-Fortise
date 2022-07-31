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
import { setYaNoEsInicioAccion } from './cuadrantesSettersDucks';
import { setItemEditandoConfiguracionAccion } from './cuadrantesSettersDucks';
import { setCambioSecuenciaSemanasAccion } from './cuadrantesSettersDucks';

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
    cuadrante.forEach((cuadranteColumna, index) => {
        let objetoResultante = {};
        objetoResultante.nombreTrabajador = cuadranteColumna.nombreTrabajador;
        objetoResultante.idTrabajador = cuadranteColumna.idTrabajador;
        objetoResultante.tipoHorario = cuadranteColumna.tipoHorario;
        objetoResultante.tipoTrabajador = cuadranteColumna.tipoTrabajador;
        objetoResultante.hayBaja = cuadranteColumna.hayBaja;
        objetoResultante.reducido = cuadranteColumna.reducido;
        objetoResultante.tipoServicio = cuadranteColumna.tipoServicio;
        if (cuadranteColumna.horasFestivasComputables) {
            objetoResultante.horasFestivasComputables = cuadranteColumna.horasFestivasComputables;
        } else {
            objetoResultante.horasFestivasComputables = 0;
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
    return arrayResultante
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
        objetoResultante.reducido = cuadranteColumna.reducido;
        objetoResultante.tipoServicio = cuadranteColumna.tipoServicio;
        if (cuadranteColumna.horasFestivasComputables) {
            objetoResultante.horasFestivasComputables = cuadranteColumna.horasFestivasComputables;
        } else {
            objetoResultante.horasFestivasComputables = 0;
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
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoInicioRango ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
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
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoInicio1RangoDescanso ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
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
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
                            objetoResultante[prop] = cuadranteColumna[prop];
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoCantidad ||
                            cuadranteColumna[prop].baja ||
                            cuadranteColumna[prop].festivo ||
                            cuadranteColumna[prop].observaciones ||
                            cuadranteColumna[prop].modificado) {
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
        bloqueado: informe.bloqueado,
        tipoRegistro: informe.tipoRegistro,
        seqSemSiNo: informe.seqSemSiNo,
    };
    if (informe.mensualPactadoInicial) {
        elObjetoDatosInforme['mensualPactado'] = parseFloat(informe.mensualPactado);
        elObjetoDatosInforme['mensualPactadoInicial'] = parseFloat(informe.mensualPactadoInicial);
        elObjetoDatosInforme['proporcion'] = parseFloat(informe.proporcion);
    } else {
        elObjetoDatosInforme['precioHoraTotal'] = parseFloat(informe.precioHoraTotal);
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
        elObjetoDatosInforme['totalFacturado_R'] = elObjetoDatosInforme['totalFacturado_R'] ? parseFloat(informe.totalFacturado_R) : null;
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
        let diff;
        if (minutosTotalesSegundaHora < minutosTotalesPrimeraHora) {
            diff = (minutosTotalesSegundaHora + 1440) - minutosTotalesPrimeraHora;
        } else {
            diff = minutosTotalesSegundaHora - minutosTotalesPrimeraHora;
        };
        return diff;
    }
};

export const gestionarInformeAccion = (cambioConf) => (dispatch, getState) => {
    const { cuadrante, objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes, itemEditandoConfiguracion, numeroCuadrantesCuadrantes, cambioSecuenciaSemanas } = getState().variablesCuadrantesSetters;
    const { objetoCentro } = getState().variablesCentros;
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
    let totalHorasInicial = 0;
    let totalHorasInicialTra = 0;
    let totalHorasInicialSup = 0;
    let sumatorioTotalHorasFestivasComputablesTra = 0;
    let sumatorioTotalHorasFestivasComputablesSup = 0;
    let sumatorioTotalHorasNormalTra_L = 0;
    let sumatorioTotalHorasNormalTra_E = 0;
    let sumatorioTotalHorasNormalTra_P = 0;
    let sumatorioTotalHorasNormalTra_N = 0;
    let sumatorioTotalHorasNormalTra_R = 0;
    let sumatorioTotalHorasNormalTra_L1 = 0;
    let sumatorioTotalHorasNormalTra_L2 = 0;
    let sumatorioTotalHorasNormalTra_F = 0;
    let sumatorioTotalHorasNormalSup_L = 0;
    let sumatorioTotalHorasNormalSup_E = 0;
    let sumatorioTotalHorasNormalSup_P = 0;
    let sumatorioTotalHorasNormalSup_N = 0;
    let sumatorioTotalHorasNormalSup_R = 0;
    let sumatorioTotalHorasNormalSup_L1 = 0;
    let sumatorioTotalHorasNormalSup_L2 = 0;
    let sumatorioTotalHorasNormalSup_F = 0;
    let sumatorioHorasBajasComputablesTra = 0;
    let sumatorioHorasBajasComputablesSup = 0;
    let sumatorioTotalHorasVariacion = 0;
    let cantidadMensualPactado = parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial);
    let esMensualPactado = false;
    let elTipoServicio;
    let elPrecioHora_L = null;
    let elPrecioHora_E = null;
    let elPrecioHora_P = null;
    let elPrecioHora_N = null;
    let elPrecioHora_R = null;
    let elPrecioHora_L1 = null;
    let elPrecioHora_L2 = null;
    let elPrecioHora_F = null;
    if (cantidadMensualPactado >= 0) {
        esMensualPactado = true;
    };
    cuadrante.forEach((cuadranteColumna, index) => {
        switch (cuadranteColumna.tipoHorario) {
            case 'rango':
                arrayResultante.push({
                    trabajador: cuadranteColumna.nombreTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
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
                        if (cuadranteColumna[prop].lunesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        };
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        };
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        };
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        };
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        };
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        };
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoInicioRango) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                    trabajador: cuadranteColumna.nombreTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
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
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Martes')) {
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
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Miércoles')) {
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
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Jueves')) {
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
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Viernes')) {
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
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Sábado')) {
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
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Domingo')) {
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
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                    trabajador: cuadranteColumna.nombreTrabajador,
                    tipo: cuadranteColumna.tipoTrabajador,
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
                        if (cuadranteColumna[prop].lunesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Martes')) {
                        if (cuadranteColumna[prop].martesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Miércoles')) {
                        if (cuadranteColumna[prop].miercolesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Jueves')) {
                        if (cuadranteColumna[prop].juevesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Viernes')) {
                        if (cuadranteColumna[prop].viernesCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Sábado')) {
                        if (cuadranteColumna[prop].sabadoCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
                        }
                    };
                    if (prop.includes('Domingo')) {
                        if (cuadranteColumna[prop].domingoCantidad) {
                            if (cuadranteColumna[prop].tipoVariacion) {
                                switch (cuadranteColumna[prop].tipoVariacion) {
                                    case 1:
                                    case 2:
                                        //Horas sin coste & Sustitución festivos
                                        lasHorasNormal = null;
                                        lasHorasExtra = null;
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
        elTipoServicio = cuadranteColumna.tipoServicio;
        if (cuadranteColumna.tipoTrabajador === 'trabajador') {
            sumatorioTotalHorasNormalTra_L += sumatorioHorasNormal_L;
            sumatorioTotalHorasNormalTra_E += sumatorioHorasNormal_E;
            sumatorioTotalHorasNormalTra_P += sumatorioHorasNormal_P;
            sumatorioTotalHorasNormalTra_N += sumatorioHorasNormal_N;
            sumatorioTotalHorasNormalTra_R += sumatorioHorasNormal_R;
            sumatorioTotalHorasNormalTra_L1 += sumatorioHorasNormal_L1;
            sumatorioTotalHorasNormalTra_L2 += sumatorioHorasNormal_L2;
            sumatorioTotalHorasNormalTra_F += sumatorioHorasNormal_F;
            sumatorioHorasBajasComputablesTra += cuadranteColumna.horasBajasComputables;
            if (esMensualPactado) {
                if ((sumatorioHorasNormal_L +
                    sumatorioHorasNormal_E +
                    sumatorioHorasNormal_P +
                    sumatorioHorasNormal_N +
                    sumatorioHorasNormal_R +
                    sumatorioHorasNormal_L1 +
                    sumatorioHorasNormal_L2 +
                    sumatorioHorasNormal_F) === 0) {
                    sumatorioTotalHorasFestivasComputablesTra += 0;
                } else {
                    sumatorioTotalHorasFestivasComputablesTra += cuadranteColumna.horasFestivasComputables;
                };
            };
        };
        if (cuadranteColumna.tipoTrabajador === 'suplente') {
            sumatorioTotalHorasNormalSup_L += sumatorioHorasNormal_L;
            sumatorioTotalHorasNormalSup_E += sumatorioHorasNormal_E;
            sumatorioTotalHorasNormalSup_P += sumatorioHorasNormal_P;
            sumatorioTotalHorasNormalSup_N += sumatorioHorasNormal_N;
            sumatorioTotalHorasNormalSup_R += sumatorioHorasNormal_R;
            sumatorioTotalHorasNormalSup_L1 += sumatorioHorasNormal_L1;
            sumatorioTotalHorasNormalSup_L2 += sumatorioHorasNormal_L2;
            sumatorioTotalHorasNormalSup_F += sumatorioHorasNormal_F;
            sumatorioHorasBajasComputablesSup += cuadranteColumna.horasBajasComputables;
            if (esMensualPactado) {
                if ((sumatorioHorasNormal_L +
                    sumatorioHorasNormal_E +
                    sumatorioHorasNormal_P +
                    sumatorioHorasNormal_N +
                    sumatorioHorasNormal_R +
                    sumatorioHorasNormal_L1 +
                    sumatorioHorasNormal_L2 +
                    sumatorioHorasNormal_F) === 0) {
                    sumatorioTotalHorasFestivasComputablesSup += 0;
                } else {
                    sumatorioTotalHorasFestivasComputablesSup += cuadranteColumna.horasFestivasComputables;
                };
            };
        };
    });
    let totalMensualPactado;
    let totalPrecioHora;
    let proporcion;
    let cambiosEnConfiguracion = false;
    let objetoDatosInforme = {
        ...objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1],
        arrayDatosInforme: arrayResultante
    };
    if (esMensualPactado) {
        //gestion mensualPactado 
        if (objetoCentro.nombre !== '') {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial && !objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1]) {
                cambiosEnConfiguracion = true;
            };
        };
        let resultadoIniciado;
        if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].iniciado) {
            let trabajadoresRecorridos = 0;
            let trabajadoresEstimados;
            if (cuadranteRegistrado === 'no') {
                trabajadoresEstimados = objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[cuadranteEnUsoCuadrantes - 1].cantidad;
            } else {
                trabajadoresEstimados = objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].arrayCuadrante.length;
            };
            let sumatorioSuplentesCalculo = 0;
            let diferenciaSuplentesCalculo;
            for (let i = 0; i < cuadrante.length; i++) {
                if (cuadrante[i].tipoTrabajador === 'trabajador') {
                    diferenciaSuplentesCalculo = i - sumatorioSuplentesCalculo;
                    if (cuadranteRegistrado === 'no' && cuadrante[i].hayBaja && objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[cuadranteEnUsoCuadrantes - 1].trabajadores[diferenciaSuplentesCalculo]['suplente_' + (diferenciaSuplentesCalculo + 1)]) {
                        trabajadoresEstimados += 1;
                    };
                    trabajadoresRecorridos += 1;
                };
                if (cuadrante[i].tipoTrabajador === 'suplente') {
                    trabajadoresRecorridos += 1;
                    sumatorioSuplentesCalculo += 1;
                };
            };
            if (trabajadoresRecorridos === trabajadoresEstimados) {
                resultadoIniciado = true;
            } else {
                resultadoIniciado = false;
            };
        } else {
            resultadoIniciado = true;
        };
        if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].iniciado || cambioConf || cambioSecuenciaSemanas.gestion) {
            //caudrante no iniciado 
            totalHorasInicialTra =
                sumatorioTotalHorasNormalTra_L +
                sumatorioTotalHorasNormalTra_E +
                sumatorioTotalHorasNormalTra_P +
                sumatorioTotalHorasNormalTra_N +
                sumatorioTotalHorasNormalTra_R +
                sumatorioTotalHorasNormalTra_L1 +
                sumatorioTotalHorasNormalTra_L2 +
                sumatorioTotalHorasNormalTra_F;
            totalHorasInicialSup =
                sumatorioTotalHorasNormalSup_L +
                sumatorioTotalHorasNormalSup_E +
                sumatorioTotalHorasNormalSup_P +
                sumatorioTotalHorasNormalSup_N +
                sumatorioTotalHorasNormalSup_R +
                sumatorioTotalHorasNormalSup_L1 +
                sumatorioTotalHorasNormalSup_L2 +
                sumatorioTotalHorasNormalSup_F;
            totalHorasInicial = totalHorasInicialTra + totalHorasInicialSup + sumatorioTotalHorasVariacion;
            //control de excepciones                         
            switch (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion) {
                case 1:
                    if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado) {
                        proporcion = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial / (totalHorasInicialTra + sumatorioHorasBajasComputablesTra + sumatorioTotalHorasFestivasComputablesTra);
                        switch (elTipoServicio) {
                            case 'LIM':
                                elPrecioHora_L = proporcion;
                                break;
                            case 'LIME':
                                elPrecioHora_E = proporcion;
                                break;
                            case 'LIMP':
                                elPrecioHora_P = proporcion;
                                break;
                            case 'NAVE2':
                                elPrecioHora_N = proporcion;
                                break;
                            case 'REFZ':
                                elPrecioHora_R = proporcion;
                                break;
                            case 'LIM1':
                                elPrecioHora_L1 = proporcion;
                                break;
                            case 'LIM2':
                                elPrecioHora_L2 = proporcion;
                                break;
                            case 'FEST':
                                elPrecioHora_F = proporcion;
                                break;
                            default:
                        };
                        totalMensualPactado =
                            ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * elPrecioHora_L) +
                            ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * elPrecioHora_E) +
                            ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * elPrecioHora_P) +
                            ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * elPrecioHora_N) +
                            ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * elPrecioHora_R) +
                            ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * elPrecioHora_L1) +
                            ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * elPrecioHora_L2) +
                            ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * elPrecioHora_F);
                    };
                    if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado)) {
                        proporcion = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion;
                        elPrecioHora_L = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L;
                        elPrecioHora_E = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E;
                        elPrecioHora_P = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P;
                        elPrecioHora_N = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N;
                        elPrecioHora_R = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R;
                        elPrecioHora_L1 = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1;
                        elPrecioHora_L2 = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2;
                        elPrecioHora_F = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F;
                        totalMensualPactado = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado;
                    };
                    break;
                case '':
                    if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado) {
                        //proporcion = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial / (totalHorasInicialTra + sumatorioHorasBajasComputablesTra + (sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup));
                        proporcion = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial / (totalHorasInicialTra + sumatorioHorasBajasComputablesTra);
                        switch (elTipoServicio) {
                            case 'LIM':
                                elPrecioHora_L = proporcion;
                                break;
                            case 'LIME':
                                elPrecioHora_E = proporcion;
                                break;
                            case 'LIMP':
                                elPrecioHora_P = proporcion;
                                break;
                            case 'NAVE2':
                                elPrecioHora_N = proporcion;
                                break;
                            case 'REFZ':
                                elPrecioHora_R = proporcion;
                                break;
                            case 'LIM1':
                                elPrecioHora_L1 = proporcion;
                                break;
                            case 'LIM2':
                                elPrecioHora_L2 = proporcion;
                                break;
                            case 'FEST':
                                elPrecioHora_F = proporcion;
                                break;
                            default:
                        };
                        totalMensualPactado =
                            ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * elPrecioHora_L) +
                            ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * elPrecioHora_E) +
                            ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * elPrecioHora_P) +
                            ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * elPrecioHora_N) +
                            ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * elPrecioHora_R) +
                            ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * elPrecioHora_L1) +
                            ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * elPrecioHora_L2) +
                            ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * elPrecioHora_F)
                        //((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * proporcion);
                    };
                    if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado)) {
                        proporcion = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion;
                        elPrecioHora_L = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L;
                        elPrecioHora_E = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E;
                        elPrecioHora_P = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P;
                        elPrecioHora_N = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N;
                        elPrecioHora_R = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R;
                        elPrecioHora_L1 = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1;
                        elPrecioHora_L2 = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2;
                        elPrecioHora_F = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F;
                        totalMensualPactado = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado;
                    };
                    break;
                default:
            };
            objetoDatosInforme = {
                ...objetoDatosInforme,
                iniciado: resultadoIniciado,
                precioHora_L: elPrecioHora_L,
                precioHora_E: elPrecioHora_E,
                precioHora_P: elPrecioHora_P,
                precioHora_N: elPrecioHora_N,
                precioHora_R: elPrecioHora_R,
                precioHora_L1: elPrecioHora_L1,
                precioHora_L2: elPrecioHora_L2,
                precioHora_F: elPrecioHora_F,
                proporcion: proporcion,
                totalFacturado_L: (sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) ? (sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_L : null,
                totalFacturado_E: (sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) ? (sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_E : null,
                totalFacturado_P: (sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) ? (sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_P : null,
                totalFacturado_N: (sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) ? (sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_N : null,
                totalFacturado_R: (sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) ? (sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_R : null,
                totalFacturado_L1: (sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) ? (sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1 + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_L1 : null,
                totalFacturado_L2: (sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) ? (sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2 + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_L2 : null,
                totalFacturado_F: (sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) ? (sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F + sumatorioTotalHorasFestivasComputablesTra) * elPrecioHora_F : null,
                mensualPactado: totalMensualPactado,
            };
            const objetoDatosCuadrante = {
                ...itemEditandoConfiguracion,
                precioHora_L: elPrecioHora_L ? elPrecioHora_L : '',
                precioHora_E: elPrecioHora_E ? elPrecioHora_E : '',
                precioHora_P: elPrecioHora_P ? elPrecioHora_P : '',
                precioHora_N: elPrecioHora_N ? elPrecioHora_N : '',
                precioHora_R: elPrecioHora_R ? elPrecioHora_R : '',
                precioHora_L1: elPrecioHora_L1 ? elPrecioHora_L1 : '',
                precioHora_L2: elPrecioHora_L2 ? elPrecioHora_L2 : '',
                precioHora_F: elPrecioHora_F ? elPrecioHora_F : '',
            };
            dispatch(setItemEditandoConfiguracionAccion(objetoDatosCuadrante));
            cambioSecuenciaSemanas.gestion && (dispatch(setCambioSecuenciaSemanasAccion({ inicial: false, gestion: false })));
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].iniciado && !cambioConf && !cambioSecuenciaSemanas.gestion) {
            //caudrante iniciado
            //control de excepciones           
            switch (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion) {
                case 1:
                    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].bloqueado === 'no') {
                        totalMensualPactado =
                            ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) +
                            ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) +
                            ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) +
                            ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) +
                            ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) +
                            ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) +
                            ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) +
                            ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F)
                        // ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion);
                        objetoDatosInforme = {
                            ...objetoDatosInforme,
                            totalFacturado_L: (sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) ? ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) : null,
                            totalFacturado_E: (sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) ? ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) : null,
                            totalFacturado_P: (sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) ? ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) : null,
                            totalFacturado_N: (sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) ? ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) : null,
                            totalFacturado_R: (sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) ? ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) : null,
                            totalFacturado_L1: (sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) ? ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) : null,
                            totalFacturado_L2: (sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) ? ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) : null,
                            totalFacturado_F: (sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) ? ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) : null,
                            mensualPactado: totalMensualPactado,
                        };
                    };
                    break;
                case '':
                    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].bloqueado === 'no') {
                        totalMensualPactado =
                            ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L +
                                ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) +
                                ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) +
                                ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) +
                                ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) +
                                ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) +
                                ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) +
                                ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) +
                                ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion));
                        objetoDatosInforme = {
                            ...objetoDatosInforme,
                            totalFacturado_L: (sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) ? ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            totalFacturado_E: (sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) ? ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            totalFacturado_P: (sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) ? ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            totalFacturado_N: (sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) ? ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            totalFacturado_R: (sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) ? ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            totalFacturado_L1: (sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) ? ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            totalFacturado_L2: (sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) ? ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            totalFacturado_F: (sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) ? ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) + ((sumatorioTotalHorasFestivasComputablesTra + sumatorioTotalHorasFestivasComputablesSup) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].proporcion) : null,
                            // totalFacturado_L: (sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) ? ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) : null,
                            // totalFacturado_E: (sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) ? ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) : null,
                            // totalFacturado_P: (sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) ? ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) : null,
                            // totalFacturado_N: (sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) ? ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) : null,
                            // totalFacturado_R: (sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) ? ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) : null,
                            // totalFacturado_L1: (sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) ? ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) : null,
                            // totalFacturado_L2: (sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) ? ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) : null,
                            // totalFacturado_F: (sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) ? ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) : null,
                            mensualPactado: totalMensualPactado,
                        };
                    } else {
                        totalMensualPactado = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado;
                        objetoDatosInforme = {
                            ...objetoDatosInforme,
                            mensualPactado: totalMensualPactado,
                        };
                    }
                    break;
                default:
            };
        };
    } else {
        //gestion precio/hora
        totalPrecioHora =
            ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) +
            ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) +
            ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) +
            ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) +
            ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) +
            ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) +
            ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) +
            ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F);
        objetoDatosInforme = {
            ...objetoDatosInforme,
            totalFacturado_L: (sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) ? ((sumatorioTotalHorasNormalTra_L + sumatorioTotalHorasNormalSup_L) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) : null,
            totalFacturado_E: (sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) ? ((sumatorioTotalHorasNormalTra_E + sumatorioTotalHorasNormalSup_E) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) : null,
            totalFacturado_P: (sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) ? ((sumatorioTotalHorasNormalTra_P + sumatorioTotalHorasNormalSup_P) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) : null,
            totalFacturado_N: (sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) ? ((sumatorioTotalHorasNormalTra_N + sumatorioTotalHorasNormalSup_N) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) : null,
            totalFacturado_R: (sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) ? ((sumatorioTotalHorasNormalTra_R + sumatorioTotalHorasNormalSup_R) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) : null,
            totalFacturado_L1: (sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) ? ((sumatorioTotalHorasNormalTra_L1 + sumatorioTotalHorasNormalSup_L1) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) : null,
            totalFacturado_L2: (sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) ? ((sumatorioTotalHorasNormalTra_L2 + sumatorioTotalHorasNormalSup_L2) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) : null,
            totalFacturado_F: (sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) ? ((sumatorioTotalHorasNormalTra_F + sumatorioTotalHorasNormalSup_F) * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) : null,
            precioHoraTotal: totalPrecioHora
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

function calculoDiasTotalesPorMes(month, year) {
    return new Date(year, month, 0).getDate();
};

const retornaTipoBajaPorHistorico = (dia, historico, elEstado) => (dispatch, getState) => {
    const { calendarioAGestionar } = getState().variablesCuadrantes;
    let myArrSplitCalendario = calendarioAGestionar.split("-");
    const mesCalendario = parseInt(myArrSplitCalendario[1]);
    const anyoCalendario = parseInt(myArrSplitCalendario[0]);
    let elRetorno = '';
    const rangoHistorico = [];
    historico.forEach((registro, index) => {
        let inicioSplitted = registro.baja[0].inicio.split("-");
        let finSplitted = registro.baja[0].fin.split("-");
        let mesInicio = parseInt(inicioSplitted[1]);
        let mesFin = parseInt(finSplitted[1]);
        let anyoInicio = parseInt(inicioSplitted[0]);
        let anyoFin = parseInt(finSplitted[0]);
        let diaInicio;
        let diaFin;
        diaInicio = parseInt(inicioSplitted[2]);
        diaFin = parseInt(finSplitted[2]);
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

const periodoBajaTrabajadorAccion = (calendarioAGestionar, inicioBaja, finBaja, diasMes) => {
    let myArrSplitCalendario = calendarioAGestionar.split("-");
    const anyoCalendario = parseInt(myArrSplitCalendario[0]);
    const mesCalendario = parseInt(myArrSplitCalendario[1]);
    let myArrSplitInicioB = inicioBaja.split("-");
    const anyoInicioB = parseInt(myArrSplitInicioB[0]);
    const mesInicioB = parseInt(myArrSplitInicioB[1]);
    const diaInicioB = parseInt(myArrSplitInicioB[2]);
    let anyoFinB, mesFinB, diaFinB;
    if (finBaja) {
        let myArrSplitFinB = finBaja.split("-");
        anyoFinB = parseInt(myArrSplitFinB[0]);
        mesFinB = parseInt(myArrSplitFinB[1]);
        diaFinB = parseInt(myArrSplitFinB[2]);
    } else {
        anyoFinB = anyoCalendario;
        mesFinB = mesCalendario;
        diaFinB = parseInt(diasMes);
    };
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
    };
    let arrayBaja = [];
    for (let i = empezamosPor; i <= acabamosPor; i++) {
        arrayBaja.push(i);
    };
    return arrayBaja;
};

export const gestionaDiasFestivosOBajas = (
    elHorarioCuadrante,
    tipoRegistro,
    cantidadTrabajadoresCentro,
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
        if (posicionTrabajador > cantidadTrabajadoresCentro) {
            posicionArray = 0;
        } else {
            posicionArray = posicionTrabajador - 1;
        };
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

export const gestionaDiasFestivosHandlerAccion = (
    tipoHorario,
    valor1,
    valor2,
    valor3,
    valor4
) => {
    let laCantidad;
    let rango1, rango2;
    let objetoARetornar;
    switch (tipoHorario) {
        case 'rango':
            if (valor1 && valor2) {
                laCantidad = retornaMinutosAccionEnCuadrantes(
                    valor1,
                    valor2
                ) / 60;
            } else {
                laCantidad = 0;
            };
            objetoARetornar = { cantidad: laCantidad };
            return objetoARetornar
            break;
        case 'rangoDescanso':
            if (valor1 && valor2) {
                if (valor3) {
                    rango2 = retornaMinutosAccionEnCuadrantes(
                        valor3,
                        valor4
                    ) / 60;
                } else {
                    rango2 = 0;
                };
                rango1 = retornaMinutosAccionEnCuadrantes(
                    valor1,
                    valor2
                ) / 60;
                laCantidad = rango1 + rango2;
            } else {
                laCantidad = 0;
            };
            objetoARetornar = { cantidad: laCantidad };
            return objetoARetornar
            break;
        case 'cantidad':
            if (valor1) {
                laCantidad = valor1 / 60;
            } else {
                laCantidad = 0;
            };
            objetoARetornar = { cantidad: laCantidad };
            return objetoARetornar
            break;
        default:
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
            if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador][item]) {
                return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador][item];
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
    tipoHorario,
    esActualizacion
) => (dispatch, getState) => {
    const { cuadrante, calendarioAGestionar, losDiasDelMes, stateFestivo, objetoCuadrante } = getState().variablesCuadrantes;
    const { bufferSwitchedDiasFestivosCuadrante, cuadranteEnUsoCuadrantes, yaNoEsInicio } = getState().variablesCuadrantesSetters;
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
    let contadorHorasFestivosComputables = 0;
    let contadorHorasBajasComputables = 0;
    let objetoBuffer = {};
    let elDia;
    let indiceObjeto;
    let posicionACambiar;
    let arrayBuffer = [...bufferSwitchedDiasFestivosCuadrante];
    if (bufferSwitchedDiasFestivosCuadrante.length > 0 && !esInicio) {
        arrayBuffer[cuadranteEnUsoCuadrantes - 1] = [...bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]];
    };
    let priDigSem, segDigSem, terDigSem;
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].seqSemSiNo === 1 || !objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].seqSemSiNo) {
        priDigSem = 2;
        segDigSem = 4;
        terDigSem = 6;
    };
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].seqSemSiNo === 2) {
        priDigSem = 1;
        segDigSem = 3;
        terDigSem = 5;
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
                case 'bajaIT':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBajaIT, trabajador.datosEstado.finBajaIT, losDiasDelMes.length);
                    break;
                case 'bajaACCTE':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBajaACCTE, trabajador.datosEstado.finBajaACCTE, losDiasDelMes.length);
                    break;
                case 'bajaCIA':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBajaCIA, trabajador.datosEstado.finBajaCIA, losDiasDelMes.length);
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
                case 'permisoRET':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioPermiso, trabajador.datosEstado.finPermiso, losDiasDelMes.length);
                    break;
                case 'ausenciaINJ':
                    arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioAusencia, trabajador.datosEstado.finAusencia, losDiasDelMes.length);
                    break;
                default:
            };
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
                if (((elMesFin === calendarioAGestionar) && (elMesInicio !== calendarioAGestionar)) ||
                    ((elMesFin !== calendarioAGestionar) && (elMesInicio === calendarioAGestionar)) ||
                    ((elMesFin === calendarioAGestionar) && (elMesInicio === calendarioAGestionar))) {
                    if ((elMesFin === calendarioAGestionar) && (elMesInicio !== calendarioAGestionar)) {
                        if (parseInt(registroFinSplitted[2]) === 1) {
                            if (trabajador.estado !== 'alta') {
                                columnaAnadir['hayBaja'] = true;
                            } else {
                                columnaAnadir['hayBaja'] = false;
                            };
                        } else {
                            arrayRegistrosHistorico.push(registro);
                            columnaAnadir['hayBaja'] = true;
                            hayBajaEnElMes = true;
                        }
                    } else {
                        arrayRegistrosHistorico.push(registro);
                        columnaAnadir['hayBaja'] = true;
                        hayBajaEnElMes = true;
                    };
                };
                if ((elMesFin !== calendarioAGestionar) && (elMesInicio !== calendarioAGestionar)) {
                    if ((elMesFin > calendarioAGestionar) && (elMesInicio < calendarioAGestionar)) {
                        arrayRegistrosHistorico.push(registro);
                        columnaAnadir['hayBaja'] = true;
                    };
                    if (((elMesFin > calendarioAGestionar) && (elMesInicio > calendarioAGestionar)) ||
                        ((elMesFin < calendarioAGestionar) && (elMesInicio < calendarioAGestionar))) {
                        if (hayBajaEnElMes) {
                            columnaAnadir['hayBaja'] = true;
                        } else {
                            if (trabajador.estado !== 'alta') {
                                columnaAnadir['hayBaja'] = true;
                            } else {
                                columnaAnadir['hayBaja'] = false;
                            };
                        };
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
        };
        hayTrabajador = false;
        columnaAnadir['hayBaja'] = false;
    };
    if (hayTrabajador) {
        if (arrayBaja.length === losDiasDelMes.length) {
            if (esInicio) {
                columnaAnadir['reducido'] = true;
            } else {
                columnaAnadir['reducido'] = false;
            }
        } else {
            columnaAnadir['reducido'] = false;
        };
    } else {
        columnaAnadir['reducido'] = false;
    };
    let elTipoServicio;
    switch (tipoHorario) {
        case 'rango':
            losDiasDelMes.forEach((dia, index) => {
                objetoBuffer = {};
                numeroSemana = Math.ceil((index + 1) / 7);
                if (dia[1][0] === 'Lunes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio');
                };
                if (dia[1][0] === 'Martes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio');
                };
                if (dia[1][0] === 'Miércoles') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio');
                };
                if (dia[1][0] === 'Jueves') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio');
                };
                if (dia[1][0] === 'Viernes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio');
                };
                if (dia[1][0] === 'Sábado') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio');
                };
                if (dia[1][0] === 'Domingo') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio');
                };
                if (elTipoServicio) {
                    columnaAnadir['tipoServicio'] = elTipoServicio;
                };
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesInicioRango: null,
                            lunesFinRango: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesInicioRango');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesInicioRango');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesInicioRango');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesInicioRango: null,
                            martesFinRango: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesInicioRango');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesInicioRango');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesInicioRango');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesInicioRango: null,
                            miercolesFinRango: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesInicioRango');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesInicioRango');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesInicioRango');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesInicioRango: null,
                            juevesFinRango: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesInicioRango');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesInicioRango');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesInicioRango');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesInicioRango: null,
                            viernesFinRango: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesInicioRango');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesInicioRango');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesInicioRango');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoInicioRango: null,
                            sabadoFinRango: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoInicioRango');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoInicioRango');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoInicioRango');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoInicioRango: null,
                            domingoFinRango: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoInicioRango');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoInicioRango');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoInicioRango');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
            });
            break;
        case 'rangoDescanso':
            losDiasDelMes.forEach((dia, index) => {
                objetoBuffer = {};
                numeroSemana = Math.ceil((index + 1) / 7);
                if (dia[1][0] === 'Lunes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio');
                };
                if (dia[1][0] === 'Martes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio');
                };
                if (dia[1][0] === 'Miércoles') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio');
                };
                if (dia[1][0] === 'Jueves') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio');
                };
                if (dia[1][0] === 'Viernes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio');
                };
                if (dia[1][0] === 'Sábado') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio');
                };
                if (dia[1][0] === 'Domingo') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio');
                };
                if (elTipoServicio) {
                    columnaAnadir['tipoServicio'] = elTipoServicio;
                };
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesInicio1RangoDescanso: null,
                            lunesFin1RangoDescanso: null,
                            lunesInicio2RangoDescanso: null,
                            lunesFin2RangoDescanso: null,
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesInicio1RangoDescanso');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesInicio1RangoDescanso');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesInicio1RangoDescanso');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesInicio1RangoDescanso');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesInicio1RangoDescanso');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesInicio1RangoDescanso');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesInicio1RangoDescanso');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesInicio1RangoDescanso');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesInicio1RangoDescanso');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesInicio1RangoDescanso');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesInicio1RangoDescanso');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesInicio1RangoDescanso');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesInicio1RangoDescanso');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesInicio1RangoDescanso');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesInicio1RangoDescanso');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoInicio1RangoDescanso');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoInicio1RangoDescanso');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoInicio1RangoDescanso');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoInicio1RangoDescanso');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoInicio1RangoDescanso');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoInicio1RangoDescanso');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
            });
            break;
        case 'cantidad':
            losDiasDelMes.forEach((dia, index) => {
                objetoBuffer = {};
                numeroSemana = Math.ceil((index + 1) / 7);
                if (dia[1][0] === 'Lunes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio');
                };
                if (dia[1][0] === 'Martes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio');
                };
                if (dia[1][0] === 'Miércoles') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio');
                };
                if (dia[1][0] === 'Jueves') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio');
                };
                if (dia[1][0] === 'Viernes') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio');
                };
                if (dia[1][0] === 'Sábado') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio');
                };
                if (dia[1][0] === 'Domingo') {
                    elTipoServicio = gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio');
                };
                if (elTipoServicio) {
                    columnaAnadir['tipoServicio'] = elTipoServicio;
                };
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Lunes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            lunesCantidad: '',
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesCantidad');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesCantidad');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'lunesCantidad');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Martes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            martesCantidad: '',
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesCantidad');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesCantidad');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'martesCantidad');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Miércoles') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            miercolesCantidad: '',
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesCantidad');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesCantidad');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'miercolesCantidad');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Jueves') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            juevesCantidad: '',
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesCantidad');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesCantidad');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'juevesCantidad');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Viernes') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            viernesCantidad: '',
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesCantidad');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesCantidad');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'viernesCantidad');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Sábado') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            sabadoCantidad: '',
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoCantidad');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoCantidad');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'sabadoCantidad');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                    if (dia[1][0] === 'Domingo') {
                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                            domingoCantidad: '',
                            tipoServicio: '',
                            baja: arrayBaja.includes(index + 1) ? true : false,
                            tipoBaja: arrayBaja.includes(index + 1) ? (arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado))) : null,
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
                                    if (objetoBuffer[dia[1][0] + dia[0][0]][0][0] === 'SF') {
                                        posicionACambiar = cuadrante.length;
                                    } else {
                                        posicionACambiar = cuadrante.length - 1;
                                    };
                                    objetoBuffer[dia[1][0] + dia[0][0]][posicionACambiar] = [
                                        gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad')
                                    ];
                                    objetoBuffer['activo'] = true;
                                    objetoBuffer['tipo'] = bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1][indiceObjeto]['tipo'];
                                    arrayBuffer[cuadranteEnUsoCuadrantes - 1][indiceObjeto] = objetoBuffer;
                                };
                            };
                            if (!arrayBaja.includes(index + 1)) {
                                festivoComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoCantidad');
                                if (festivoComputable.cantidad > 0) {
                                    contadorHorasFestivosComputables += festivoComputable.cantidad;
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
                                    tipoBaja: arrayRegistrosHistorico.length > 0 ? dispatch(retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico, trabajador.estado)) : dispatch(retornaTipoBajaSinHistorico(index + 1, trabajador.estado)),
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                };
                                if (elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (numeroSemana !== priDigSem && numeroSemana !== segDigSem && numeroSemana !== terDigSem) {
                                        bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoCantidad');
                                        contadorHorasBajasComputables += bajaComputable.cantidad;
                                    };
                                } else {
                                    bajaComputable = gestionaDiasFestivosOBajas(elHorarioCuadrante, tipoRegistro, cantidadTrabajadoresCentro, tipoHorario, posicionTrabajador, 'domingoCantidad');
                                    contadorHorasBajasComputables += bajaComputable.cantidad;
                                };
                            }
                        } else {
                            if (esActualizacion) {
                                if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                                } else {
                                    if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                    tipoServicio: elTipoServicio,
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
                                };
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        }
                    } else {
                        if (esActualizacion) {
                            if (cuadrante[columna][dia[1][0] + dia[0][0]].modificado) {
                                columnaAnadir[dia[1][0] + dia[0][0]] = cuadrante[columna][dia[1][0] + dia[0][0]];
                            } else {
                                if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                                tipoServicio: elTipoServicio,
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
                            };
                        } else {
                            if ((numeroSemana === priDigSem || numeroSemana === segDigSem || numeroSemana === terDigSem) && elHorarioCuadrante.variacion === 'semanaSiNo') {
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
                                            tipoServicio: elTipoServicio,
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
                        };
                    }
                }//final secuencia
            });
            break;
        default:
    };
    // columnaAnadir['horasFestivasComputables'] = contadorHorasFestivosComputables;    
    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion) {
        columnaAnadir['horasFestivasComputables'] = 0;
    } else {
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].excepcion === 1) {
            columnaAnadir['horasFestivasComputables'] = contadorHorasFestivosComputables;
        };
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
        if (!esInicio) {
            if (!yaNoEsInicio) {
                dispatch(setYaNoEsInicioAccion(true));
            };
        };
    };
    return {
        columnaAnadir,
        hayTrabajador
    };
};

export const gestionaColumnaCuadranteAccion = (trabajador, tipoTrabajador, esRevision, columna, esAnadirColumna, esLimpieza, tipoHorario, esActualizacion) => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { cuadrante, objetoCuadrante } = getState().variablesCuadrantes;
    const {
        trabajadoresEnCuadrante,
        suplentesEnCuadrante,
        cuadranteEnUsoCuadrantes,
        posicionTrabajadorPrevioACambiar,
        posicionSuplentePrevioACambiar
    } = getState().variablesCuadrantesSetters;
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
    let posicionTrabajador;
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
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
                    posicionTrabajador = columna + 1;
                } else {
                    if (esInicio) {
                        posicionTrabajador = trabajador.laPosicionDelTrabajador;
                    } else {
                        posicionTrabajador = cuadrante.length;
                    };
                }
            }
        };
    } else {
        posicionTrabajador = 0;
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
        if (cuadrante[posicionAnterior]) {
            if (esInicio && (cuadrante[posicionAnterior].idTrabajador === trabajador.id)) {
                return;
            };
        };
    };
    if (esInicio && cuadrante.length === 0 && tipoTrabajador === 'suplente') {
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
        tipoHorario,
        esActualizacion
    ));
    if (!hayTrabajador && tipoTrabajador === 'trabajador') {
        const arrayCuadrante = [...cuadrante];
        let arrayTr = [...trabajadoresEnCuadrante];
        let randomNumber = (Math.floor(Math.random() * 100)) + 1000;
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
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
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
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
        };
    };
};

