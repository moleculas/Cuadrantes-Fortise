import { setArrayInformeLineasAccion } from './cuadrantesSettersDucks';
import { obtenerObjetoPorIdAccion } from './appDucks';
import { retornaFormaPagoAccion } from './cuadrantesDucks';
import { procesarDatosCuadranteAccion } from './cuadrantesGestionDucks';
import { handleCloseMenuAccion } from './cuadrantesHandlersDucks';
import { setOpenFacturacionAccion } from './cuadrantesSettersDucks';
import { setOpenFacturacionInteriorAccion } from './cuadrantesSettersDucks';
import { setNumeroFactusolAccion } from './cuadrantesSettersDucks';
import { isNumeric } from './appDucks';
import { generarArchivosXLSAccion } from './appDucks';
import { setAlertaAccion } from './cuadrantesSettersDucks';

//constantes
const dataInicial = {
};

//types

//reducer
export default function cuadrantesFacturacionReducer(state = dataInicial, action) {
    switch (action.type) {
        default:
            return { ...state }
    }
}

//acciones
const calculoDiferenciaMensualPactado = (objetoSumatorio, index, excepcion) => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    let diferencia_L = 0;
    let diferencia_E = 0;
    let diferencia_P = 0;
    let diferencia_N = 0;
    let diferencia_R = 0;
    let diferencia_L1 = 0;
    let diferencia_L2 = 0;
    let diferencia_F = 0;
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L !== objetoSumatorio.sumatorioHoras_L) {
            diferencia_L = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_L * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L)));
        };
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E !== objetoSumatorio.sumatorioHoras_E) {
            diferencia_E = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_E * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E)));
        };
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P !== objetoSumatorio.sumatorioHoras_P) {
            diferencia_P = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_P * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P)));
        };
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N !== objetoSumatorio.sumatorioHoras_N) {
            diferencia_N = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_N * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L)));
        };
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R !== objetoSumatorio.sumatorioHoras_R) {
            diferencia_R = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_R * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R)));
        };
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1 !== objetoSumatorio.sumatorioHoras_L1) {
            diferencia_L1 = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_L1 * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1)));
        };
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2 !== objetoSumatorio.sumatorioHoras_L2) {
            diferencia_L2 = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_L2 * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2)));
        };
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F) {
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F !== objetoSumatorio.sumatorioHoras_F) {
            diferencia_F = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial -
                ((objetoSumatorio.sumatorioHoras_F * objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F)));
        };
    };
    return { diferencia_L, diferencia_E, diferencia_P, diferencia_N, diferencia_R, diferencia_L1, diferencia_L2, diferencia_F }
};

export const retornaInfoFabButtonAccion = () => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes, arrayDatosInforme, cuadranteVacio } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    let cuadranteMultiple = "";
    if (numeroCuadrantesCuadrantes.length > 1) {
        cuadranteMultiple = "Cuadrante: " + cuadranteEnUsoCuadrantes + "/" + numeroCuadrantesCuadrantes.length + " - ";
    };
    let sumatorioServiciosFijos = 0;
    let sumatorioHoras_L = 0;
    let sumatorioHoras_E = 0;
    let sumatorioHoras_P = 0;
    let sumatorioHoras_N = 0;
    let sumatorioHoras_R = 0;
    let sumatorioHoras_L1 = 0;
    let sumatorioHoras_L2 = 0;
    let sumatorioHoras_F = 0;
    let sumatorioTotal = 0;
    cuadranteServiciosFijos.forEach((servicio, index) => {
        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
    });
    if (arrayDatosInforme.length > 0) {
        arrayDatosInforme.forEach((dato, index) => {
            sumatorioHoras_L += (dato.totalHorasNormal_L + dato.totalHorasExtra_L);
            sumatorioHoras_E += (dato.totalHorasNormal_E + dato.totalHorasExtra_E);
            sumatorioHoras_P += (dato.totalHorasNormal_P + dato.totalHorasExtra_P);
            sumatorioHoras_N += (dato.totalHorasNormal_N + dato.totalHorasExtra_N);
            sumatorioHoras_R += (dato.totalHorasNormal_R + dato.totalHorasExtra_R);
            sumatorioHoras_L1 += (dato.totalHorasNormal_L1 + dato.totalHorasExtra_L1);
            sumatorioHoras_L2 += (dato.totalHorasNormal_L2 + dato.totalHorasExtra_L2);
            sumatorioHoras_F += (dato.totalHorasNormal_F + dato.totalHorasExtra_F);
            sumatorioTotal += dato.totalHoras;
        });        
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1) {
            return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado + sumatorioServiciosFijos).toFixed(2) + ' €';
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 2) {
            return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' +
                parseFloat((objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L * sumatorioHoras_L) +
                    (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E * sumatorioHoras_E) +
                    (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P * sumatorioHoras_P) +
                    (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N * sumatorioHoras_N) +
                    (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R * sumatorioHoras_R) +
                    (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1 * sumatorioHoras_L1) +
                    (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2 * sumatorioHoras_L2) +
                    (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F * sumatorioHoras_F) +
                    sumatorioServiciosFijos).toFixed(2) + ' €'
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 3) {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado) {
                return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado + sumatorioServiciosFijos).toFixed(2) + ' €'
            } else {
                return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' +
                    parseFloat((objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L * sumatorioHoras_L) +
                        (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E * sumatorioHoras_E) +
                        (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P * sumatorioHoras_P) +
                        (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N * sumatorioHoras_N) +
                        (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R * sumatorioHoras_R) +
                        (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1 * sumatorioHoras_L1) +
                        (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2 * sumatorioHoras_L2) +
                        (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F * sumatorioHoras_F) +
                        sumatorioServiciosFijos).toFixed(2) + ' €'
            };
        };
    }
    if (cuadranteVacio) {
        return cuadranteMultiple + 'Horas: 0 - Total: ' + parseFloat(sumatorioServiciosFijos).toFixed(2) + ' €'
    };
};

export const generaInformacionCuadrantesAccion = () => (dispatch, getState) => {
    const { objetoCuadrante, calendarioAGestionar } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes, arrayDatosInforme, firmaActualizacion } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { objetoCentro } = getState().variablesCentros;
    const { intervencionRegistrada } = getState().variablesApp;
    const { arrayTrabajadores } = getState().variablesTrabajadores;
    let sumatorioHoras_L = 0;
    let sumatorioHoras_E = 0;
    let sumatorioHoras_P = 0;
    let sumatorioHoras_N = 0;
    let sumatorioHoras_R = 0;
    let sumatorioHoras_L1 = 0;
    let sumatorioHoras_L2 = 0;
    let sumatorioHoras_F = 0;
    let sumatorioTotal = 0;
    const arrayInforme = [];
    arrayInforme.push(['Mes: ' + calendarioAGestionar, 'normal']);
    arrayInforme.push(['Centro: ' + objetoCentro.nombre, 'normal']);
    if (numeroCuadrantesCuadrantes.length > 1) {
        arrayInforme.push(['Cuadrante: ' + cuadranteEnUsoCuadrantes + '/' + numeroCuadrantesCuadrantes.length, 'normal']);
    };
    if (firmaActualizacion && intervencionRegistrada) {
        arrayInforme.push(['Estado: Actualizado el ' + firmaActualizacion, 'normal']);
    } else if (firmaActualizacion && !intervencionRegistrada) {
        arrayInforme.push(['Estado: Pendiente de actualizar', 'normal']);
    } else {
        arrayInforme.push(['Estado: Pendiente de registrar', 'normal']);
    };
    let elTotalMensualPactado;
    if (arrayDatosInforme.length > 0) {
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1) {
            arrayInforme.push(['Cómputo de horas por precio mensual pactado: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial).toFixed(2) + ' €', 'normal']);
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 2) {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L).toFixed(2) + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E).toFixed(2) + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P).toFixed(2) + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N).toFixed(2) + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R).toFixed(2) + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_1: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1).toFixed(2) + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2).toFixed(2) + ' €', 'normal']);
            };
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) {
                arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F).toFixed(2) + ' €', 'normal']);
            };
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 3) {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado) {
                arrayInforme.push(['Cómputo de horas (gestión especial de horas) por precio mensual pactado: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial).toFixed(2) + ' €', 'normal']);
            } else {
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L).toFixed(2) + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E).toFixed(2) + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P).toFixed(2) + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N).toFixed(2) + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R).toFixed(2) + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_1: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1).toFixed(2) + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA_2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2).toFixed(2) + ' €', 'normal']);
                };
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) {
                    arrayInforme.push(['Cómputo de horas por precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F).toFixed(2) + ' €', 'normal']);
                };
            };
        };
        arrayInforme.push(['divider', 'normal']);
        arrayInforme.push(['Trabajadores:', 'normal']);
        arrayDatosInforme.map((dato, index) => {
            let elTipo;
            if (dato.tipo === 'trabajador') {
                elTipo = '(trabajador)'
            } else {
                elTipo = '(suplente)'
            };
            let nombreTrabajador = dispatch(obtenerObjetoPorIdAccion(arrayTrabajadores, dato.trabajador));
            arrayInforme.push([nombreTrabajador + ' ' + elTipo, 'normal']);
            if (dato.totalHorasExtra_L || dato.totalHorasNormal_L) {
                if (dato.totalHorasExtra_L && dato.totalHorasNormal_L) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA: ' + parseFloat(dato.totalHorasNormal_L).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_L).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_L && dato.totalHorasNormal_L) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA: ' + parseFloat(dato.totalHorasNormal_L).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA: ' + parseFloat(dato.totalHorasExtra_L).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_L += (dato.totalHorasNormal_L + dato.totalHorasExtra_L);
            };
            if (dato.totalHorasExtra_E || dato.totalHorasNormal_E) {
                if (dato.totalHorasExtra_E && dato.totalHorasNormal_E) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(dato.totalHorasNormal_E).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_E).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_E && dato.totalHorasNormal_E) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(dato.totalHorasNormal_E).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(dato.totalHorasExtra_E).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_E += (dato.totalHorasNormal_E + dato.totalHorasExtra_E);
            };
            if (dato.totalHorasExtra_P || dato.totalHorasNormal_P) {
                if (dato.totalHorasExtra_P && dato.totalHorasNormal_P) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(dato.totalHorasNormal_P).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_P).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_P && dato.totalHorasNormal_P) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(dato.totalHorasNormal_P).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(dato.totalHorasExtra_P).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_P += (dato.totalHorasNormal_P + dato.totalHorasExtra_P);
            };
            if (dato.totalHorasExtra_N || dato.totalHorasNormal_N) {
                if (dato.totalHorasExtra_N && dato.totalHorasNormal_N) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(dato.totalHorasNormal_N).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_N).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_N && dato.totalHorasNormal_N) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(dato.totalHorasNormal_N).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(dato.totalHorasExtra_N).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_N += (dato.totalHorasNormal_N + dato.totalHorasExtra_N);
            };
            if (dato.totalHorasExtra_R || dato.totalHorasNormal_R) {
                if (dato.totalHorasExtra_R && dato.totalHorasNormal_R) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(dato.totalHorasNormal_R).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_R).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_R && dato.totalHorasNormal_R) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(dato.totalHorasNormal_R).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(dato.totalHorasExtra_R).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_R += (dato.totalHorasNormal_R + dato.totalHorasExtra_R);
            };
            if (dato.totalHorasExtra_L1 || dato.totalHorasNormal_L1) {
                if (dato.totalHorasExtra_L1 && dato.totalHorasNormal_L1) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_1: ' + parseFloat(dato.totalHorasNormal_L1).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_L1).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_L1 && dato.totalHorasNormal_L1) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_1: ' + parseFloat(dato.totalHorasNormal_L1).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA_1: ' + parseFloat(dato.totalHorasExtra_L1).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_L1 += (dato.totalHorasNormal_L1 + dato.totalHorasExtra_L1);
            };
            if (dato.totalHorasExtra_L2 || dato.totalHorasNormal_L2) {
                if (dato.totalHorasExtra_L2 && dato.totalHorasNormal_L2) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_2: ' + parseFloat(dato.totalHorasNormal_L2).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_L2).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_L2 && dato.totalHorasNormal_L2) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA_2: ' + parseFloat(dato.totalHorasNormal_L2).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA_2: ' + parseFloat(dato.totalHorasExtra_L2).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_L2 += (dato.totalHorasNormal_L2 + dato.totalHorasExtra_L2);
            };
            if (dato.totalHorasExtra_F || dato.totalHorasNormal_F) {
                if (dato.totalHorasExtra_F && dato.totalHorasNormal_F) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(dato.totalHorasNormal_F).toFixed(2) + ' horas + ' + parseFloat(dato.totalHorasExtra_F).toFixed(2) + ' horas extra', 'normal']);
                } else if (!dato.totalHorasExtra_F && dato.totalHorasNormal_F) {
                    arrayInforme.push(['Total horas trabajadas en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(dato.totalHorasNormal_F).toFixed(2) + ' horas', 'normal']);
                } else {
                    arrayInforme.push(['Total horas extra trabajadas en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(dato.totalHorasExtra_F).toFixed(2) + ' horas extra', 'normal']);
                };
                sumatorioHoras_F += (dato.totalHorasNormal_F + dato.totalHorasExtra_F);
            };
        });
        sumatorioTotal =
            (sumatorioHoras_L * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) +
            (sumatorioHoras_E * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) +
            (sumatorioHoras_P * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) +
            (sumatorioHoras_N * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) +
            (sumatorioHoras_R * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) +
            (sumatorioHoras_L1 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) +
            (sumatorioHoras_L2 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) +
            (sumatorioHoras_F * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F);
        const objetoSumatorio = {
            sumatorioHoras_L: sumatorioHoras_L,
            sumatorioHoras_E: sumatorioHoras_E,
            sumatorioHoras_P: sumatorioHoras_P,
            sumatorioHoras_N: sumatorioHoras_N,
            sumatorioHoras_R: sumatorioHoras_R,
            sumatorioHoras_L1: sumatorioHoras_L1,
            sumatorioHoras_L2: sumatorioHoras_L2,
            sumatorioHoras_F: sumatorioHoras_F
        };
        const { diferencia_L, diferencia_E, diferencia_P, diferencia_N, diferencia_R, diferencia_L1, diferencia_L2, diferencia_F } = dispatch(calculoDiferenciaMensualPactado(objetoSumatorio, cuadranteEnUsoCuadrantes - 1));
        elTotalMensualPactado = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado;
        arrayInforme.push(['divider', 'normal']);
        let laDiferencia_L = '';
        let laDiferencia_E = '';
        let laDiferencia_P = '';
        let laDiferencia_N = '';
        let laDiferencia_R = '';
        let laDiferencia_L1 = '';
        let laDiferencia_L2 = '';
        let laDiferencia_F = '';
        let laDiferenciaTotal;
        if (!diferencia_L && !diferencia_E && !diferencia_P && !diferencia_N && !diferencia_R && !diferencia_L1 && !diferencia_L2 && !diferencia_F) {
            laDiferenciaTotal = '';
        } else {
            if (diferencia_L) {
                laDiferencia_L = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA: ' + parseFloat(diferencia_L).toFixed(2) + ' €'
            };
            if (diferencia_E) {
                laDiferencia_E = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(diferencia_E).toFixed(2) + ' €'
            };
            if (diferencia_P) {
                laDiferencia_P = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(diferencia_P).toFixed(2) + ' €'
            };
            if (diferencia_N) {
                laDiferencia_N = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(diferencia_N).toFixed(2) + ' €'
            };
            if (diferencia_R) {
                laDiferencia_R = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(diferencia_R).toFixed(2) + ' €'
            };
            if (diferencia_L1) {
                laDiferencia_L1 = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA_1: ' + parseFloat(diferencia_L1).toFixed(2) + ' €'
            };
            if (diferencia_L2) {
                laDiferencia_L2 = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA_2: ' + parseFloat(diferencia_L2).toFixed(2) + ' €'
            };
            if (diferencia_F) {
                laDiferencia_F = ' + diferencia de horas en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(diferencia_F).toFixed(2) + ' €'
            };
            laDiferenciaTotal = laDiferencia_L + laDiferencia_E + laDiferencia_P + laDiferencia_N + laDiferencia_R + laDiferencia_L1 + laDiferencia_L2 + laDiferencia_F +
                ' = ' + parseFloat(elTotalMensualPactado).toFixed(2) + ' €';
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1) {
            arrayInforme.push(['Total a facturar según cómputo mensual pactado: ' +
                parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial).toFixed(2) +
                ' €' + laDiferenciaTotal, 'normal']);
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 2) {
            if (sumatorioHoras_L) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA: ' + parseFloat(sumatorioHoras_L).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + parseFloat(sumatorioHoras_L * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + parseFloat(sumatorioHoras_L * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L).toFixed(2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_E) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(sumatorioHoras_E).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(sumatorioHoras_E * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(sumatorioHoras_E * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E).toFixed(2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_P) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(sumatorioHoras_P).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(sumatorioHoras_P * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(sumatorioHoras_P * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P).toFixed(2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_N) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(sumatorioHoras_N).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(sumatorioHoras_N * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(sumatorioHoras_N * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N).toFixed(2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_R) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(sumatorioHoras_R).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(sumatorioHoras_R * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(sumatorioHoras_R * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R).toFixed(2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_L1) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_1: ' + parseFloat(sumatorioHoras_L1).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + parseFloat(sumatorioHoras_L1 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + parseFloat(sumatorioHoras_L1 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1).toFixed(2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_L2) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_2: ' + parseFloat(sumatorioHoras_L2).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + parseFloat(sumatorioHoras_L2 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + parseFloat(sumatorioHoras_L2 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2).toFixed(2) + ' €', 'normal']);
                }
            };
            if (sumatorioHoras_F) {
                arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(sumatorioHoras_F).toFixed(2) + ' horas', 'normal']);
                if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(sumatorioHoras_F * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F).toFixed(2) + ' €', 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(sumatorioHoras_F * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F).toFixed(2) + ' €', 'normal']);
                }
            };
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 3) {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado) {
                arrayInforme.push(['Total a facturar  (gestión especial de horas) según cómputo mensual pactado: ' +
                    parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial).toFixed(2) +
                    ' €' + laDiferenciaTotal, 'normal']);
            } else {
                if (sumatorioHoras_L) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA: ' + parseFloat(sumatorioHoras_L).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + parseFloat(sumatorioHoras_L * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA: ' + parseFloat(sumatorioHoras_L * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L).toFixed(2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_E) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(sumatorioHoras_E).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(sumatorioHoras_E * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(sumatorioHoras_E * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E).toFixed(2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_P) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(sumatorioHoras_P).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(sumatorioHoras_P * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(sumatorioHoras_P * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P).toFixed(2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_N) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(sumatorioHoras_N).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(sumatorioHoras_N * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(sumatorioHoras_N * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N).toFixed(2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_R) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(sumatorioHoras_R).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(sumatorioHoras_R * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(sumatorioHoras_R * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R).toFixed(2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_L1) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_1: ' + parseFloat(sumatorioHoras_L1).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + parseFloat(sumatorioHoras_L1 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_1: ' + parseFloat(sumatorioHoras_L1 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1).toFixed(2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_L2) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_2: ' + parseFloat(sumatorioHoras_L2).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + parseFloat(sumatorioHoras_L2 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA_2: ' + parseFloat(sumatorioHoras_L2 * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2).toFixed(2) + ' €', 'normal']);
                    }
                };
                if (sumatorioHoras_F) {
                    arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(sumatorioHoras_F).toFixed(2) + ' horas', 'normal']);
                    if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(sumatorioHoras_F * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F).toFixed(2) + ' €', 'error']);
                        arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                    } else {
                        arrayInforme.push(['Total a facturar según cómputo precio/hora SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(sumatorioHoras_F * objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F).toFixed(2) + ' €', 'normal']);
                    }
                };
            };
        };
    };
    arrayInforme.push(['divider', 'normal']);
    let sumatorioServiciosFijos = 0;
    if (cuadranteServiciosFijos.length > 0) {
        arrayInforme.push(['Servicios extra:', 'normal']);
        cuadranteServiciosFijos.forEach((servicio) => {
            for (const prop in servicio) {
                if (servicio[prop] && prop === 'precioHora_TO') {
                    if (servicio.activo_TO === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE TOLDOS: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_CR') {
                    if (servicio.activo_CR === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE CRISTALES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_CE') {
                    if (servicio.activo_CE === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES EXTERIORES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_CI') {
                    if (servicio.activo_CI === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES INTERIORES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_MO') {
                    if (servicio.activo_MO === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA MOQUETA: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_OF') {
                    if (servicio.activo_OF === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA OFICINAS: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_AL') {
                    if (servicio.activo_AL === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ALMACENES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_LA') {
                    if (servicio.activo_LA === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA LABORATORIO: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_TE') {
                    if (servicio.activo_TE === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA TELARAÑAS: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_FI') {
                    if (servicio.activo_FI === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA INTERIOR: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_FE') {
                    if (servicio.activo_FE === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA EXTERIOR: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_AB') {
                    if (servicio.activo_AB === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ABRILLANTADO: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_MA') {
                    if (servicio.activo_MA === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE MANTENIMIENTO MÁQUINA: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_PO') {
                    if (servicio.activo_PO === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA PORTERÍA: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_BA') {
                    if (servicio.activo_BA === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por BOT. NOUBACT: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_FT') {
                    if (servicio.activo_FT === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_C3') {
                    if (servicio.activo_C3 === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por LIMPIEZA DE CRISTALES TRIMESTRAL: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_C2') {
                    if (servicio.activo_C2 === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por LIMPIEZA DE CRISTALES BIMENSUAL: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_ES') {
                    if (servicio.activo_ES === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
                if (servicio[prop] && prop === 'precioHora_PA') {
                    if (servicio.activo_PA === 'si') {
                        sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                    };
                };
            };
        });
    };
    if (arrayDatosInforme.length > 0) {
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1 || (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 3 && objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado)) {
            sumatorioTotal = elTotalMensualPactado;
        };
    };
    sumatorioTotal += sumatorioServiciosFijos;
    arrayInforme.push(['divider', 'normal']);
    arrayInforme.push(['Total General a facturar: ' + parseFloat(sumatorioTotal).toFixed(2) + ' €', 'normal']);
    arrayInforme.push(['Forma de pago: ' + dispatch(retornaFormaPagoAccion(objetoCentro.formaPago)), 'normal']);
    if (objetoCentro.diaPago) {
        arrayInforme.push(['Día de pago: ' + objetoCentro.diaPago, 'normal']);
    };
    arrayInforme.push(['Frecuencia de pago: ' + objetoCentro.tempPago, 'normal']);
    dispatch(setArrayInformeLineasAccion(arrayInforme));
};

export const handleClickFacturarCuadranteAccion = () => (dispatch) => {
    dispatch(procesarDatosCuadranteAccion('informe'));
    dispatch(handleCloseMenuAccion());
};

export const handleClickFacturacionMenuAccion = () => (dispatch, getState) => {
    const { openFacturacion } = getState().variablesCuadrantesSetters;
    dispatch(setOpenFacturacionAccion(!openFacturacion));
};

export const handleClickFacturacionInteriorMenuAccion = () => (dispatch, getState) => {
    const { openFacturacionInterior } = getState().variablesCuadrantesSetters;
    dispatch(setOpenFacturacionInteriorAccion(!openFacturacionInterior));
};

export const handleChangeFormNumumeroFactusolAccion = (event) => (dispatch) => {
    if (isNumeric(event.target.value)) {
        dispatch(setNumeroFactusolAccion(event.target.value));
    };
};

export const handleGenerarArchivosAccion = () => (dispatch, getState) => {
    const { numeroFactusol } = getState().variablesCuadrantesSetters;
    const { objetoCuadrante } = getState().variablesCuadrantes;
    if (numeroFactusol) {
        dispatch(generarArchivosXLSAccion(numeroFactusol, objetoCuadrante.datosCuadrante.centro, objetoCuadrante.total));
        dispatch(handleCloseMenuAccion());
    } else {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Debes introducir el último número de factura emitida en FACTUSOL para generar los archivos.",
            tipo: 'error'
        }));
        return;
    };
};

