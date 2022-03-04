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
const calculoMensualPactado = (objetoSumatorio, index) => (dispatch, getState) => {
    let diferencia_L_gestion = 0;
    let diferencia_E_gestion = 0;
    let diferencia_P_gestion = 0;
    let diferencia_N_gestion = 0;
    let diferencia_R_gestion = 0;
    let diferencia_L1_gestion = 0;
    let diferencia_L2_gestion = 0;
    let diferencia_F_gestion = 0;
    let diferencia_L_inicial = 0;
    let diferencia_E_inicial = 0;
    let diferencia_P_inicial = 0;
    let diferencia_N_inicial = 0;
    let diferencia_R_inicial = 0;
    let diferencia_L1_inicial = 0;
    let diferencia_L2_inicial = 0;
    let diferencia_F_inicial = 0;
    let diferencia_L = 0;
    let diferencia_E = 0;
    let diferencia_P = 0;
    let diferencia_N = 0;
    let diferencia_R = 0;
    let diferencia_L1 = 0;
    let diferencia_L2 = 0;
    let diferencia_F = 0;
    let totalMensualPactado = 0;
    const { objetoCuadrante } = getState().variablesCuadrantes;
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_L) {
            diferencia_L_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_L + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L !== objetoSumatorio.sumatorioHoras_L) {
            diferencia_L_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_L * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L)));
        };
        diferencia_L = diferencia_L_inicial + diferencia_L_gestion;
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_E) {
            diferencia_E_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_E + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E !== objetoSumatorio.sumatorioHoras_E) {
            diferencia_E_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_E * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E)));
        };
        diferencia_E = diferencia_E_inicial + diferencia_E_gestion;
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_P) {
            diferencia_P_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_P + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P !== objetoSumatorio.sumatorioHoras_P) {
            diferencia_P_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_P * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P)));
        };
        diferencia_P = diferencia_P_inicial + diferencia_P_gestion;
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_N) {
            diferencia_N_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_N + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N !== objetoSumatorio.sumatorioHoras_N) {
            diferencia_N_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_N * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N)));
        };
        diferencia_N = diferencia_N_inicial + diferencia_N_gestion;
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_R) {
            diferencia_R_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_R + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R !== objetoSumatorio.sumatorioHoras_R) {
            diferencia_R_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_R * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R)));
        };
        diferencia_R = diferencia_R_inicial + diferencia_R_gestion;
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_L1) {
            diferencia_L1_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1 * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_L1 + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1 !== objetoSumatorio.sumatorioHoras_L1) {
            diferencia_L1_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_L1 * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1)));
        };
        diferencia_L1 = diferencia_L1_inicial + diferencia_L1_gestion;
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_L2) {
            diferencia_L2_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2 * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_L2 + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2 !== objetoSumatorio.sumatorioHoras_L2) {
            diferencia_L2_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_L2 * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2)));
        };
        diferencia_L2 = diferencia_L2_inicial + diferencia_L2_gestion;
    };
    if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F) {
        if (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_F) {
            diferencia_F_inicial = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    (objetoCuadrante.datosInforme.datosInforme[index].horasFestivasComputables_F + objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F))));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F !== objetoSumatorio.sumatorioHoras_F) {
            diferencia_F_gestion = (-1 * (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado -
                ((objetoSumatorio.sumatorioHoras_F * objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) /
                    objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F)));
        };
        diferencia_F = diferencia_F_inicial + diferencia_F_gestion;
    };
    totalMensualPactado = objetoCuadrante.datosInforme.datosInforme[index].mensualPactado + diferencia_L + diferencia_E + diferencia_P + diferencia_N + diferencia_R + diferencia_L1 + diferencia_L2 + diferencia_F;
    return { diferencia_L, diferencia_E, diferencia_P, diferencia_N, diferencia_R, diferencia_L1, diferencia_L2, diferencia_F, totalMensualPactado }
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
        const { totalMensualPactado } = dispatch(calculoMensualPactado(objetoSumatorio, cuadranteEnUsoCuadrantes - 1));
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1) {
            return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' + parseFloat(totalMensualPactado + sumatorioServiciosFijos).toFixed(2) + ' €'
            //return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado + sumatorioServiciosFijos).toFixed(2) + ' €'
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
                return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' + parseFloat(totalMensualPactado + sumatorioServiciosFijos).toFixed(2) + ' €'
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
            arrayInforme.push(['Cómputo de horas por precio mensual pactado: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado).toFixed(2) + ' €', 'normal']);
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
                arrayInforme.push(['Cómputo de horas (gestión especial de horas) por precio mensual pactado: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado).toFixed(2) + ' €', 'normal']);
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
        const { diferencia_L, diferencia_E, diferencia_P, diferencia_N, diferencia_R, diferencia_L1, diferencia_L2, diferencia_F, totalMensualPactado } = dispatch(calculoMensualPactado(objetoSumatorio, cuadranteEnUsoCuadrantes - 1));
        elTotalMensualPactado = totalMensualPactado;
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
            laDiferenciaTotal = ''
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
                ' = ' + parseFloat(totalMensualPactado).toFixed(2) + ' €';
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1) {
            arrayInforme.push(['Total a facturar según cómputo mensual pactado: ' +
                parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado).toFixed(2) +
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
                    parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado).toFixed(2) +
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
    if(cuadranteServiciosFijos.length >0){
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
    }
};

const calculoTotalAFacturar = () => (dispatch, getState) => {
    const { numeroCuadrantesCuadrantes } = getState().variablesCuadrantesSetters;
    const { objetoCuadrante } = getState().variablesCuadrantes;
    let elTotalGeneral = 0;
    numeroCuadrantesCuadrantes.forEach((cuadrante, index) => {
        elTotalGeneral += objetoCuadrante.datosCuadrante.datosCuadrante[index].total;
    });
    return elTotalGeneral;
};

export const handleGenerarArchivosAccion = () => (dispatch, getState) => {
    const { numeroFactusol } = getState().variablesCuadrantesSetters;
    const { objetoCuadrante, centro } = getState().variablesCuadrantes;
    if (numeroFactusol) {
        //x revisar
        const objetoDesgloseConceptos = {
            MT: objetoCuadrante.datosInforme.totalFacturado_M ? objetoCuadrante.datosInforme.totalFacturado_M : null,
            LT: objetoCuadrante.datosInforme.totalFacturado_L ? objetoCuadrante.datosInforme.totalFacturado_L : null,
            ET: objetoCuadrante.datosInforme.totalFacturado_E ? objetoCuadrante.datosInforme.totalFacturado_E : null,
            PT: objetoCuadrante.datosInforme.totalFacturado_P ? objetoCuadrante.datosInforme.totalFacturado_P : null,
            NT: objetoCuadrante.datosInforme.totalFacturado_N ? objetoCuadrante.datosInforme.totalFacturado_N : null,
            RT: objetoCuadrante.datosInforme.totalFacturado_R ? objetoCuadrante.datosInforme.totalFacturado_R : null,
            L1T: objetoCuadrante.datosInforme.totalFacturado_L1 ? objetoCuadrante.datosInforme.totalFacturado_L1 : null,
            L2T: objetoCuadrante.datosInforme.totalFacturado_L2 ? objetoCuadrante.datosInforme.totalFacturado_L2 : null,
            FT: objetoCuadrante.datosInforme.totalFacturado_F ? objetoCuadrante.datosInforme.totalFacturado_F : null,
            MH: objetoCuadrante.datosInforme.totalFacturado_M ? 1 : null,
            LH: objetoCuadrante.horas.L,
            EH: objetoCuadrante.horas.E,
            PH: objetoCuadrante.horas.P,
            NH: objetoCuadrante.horas.N,
            RH: objetoCuadrante.horas.R,
            L1H: objetoCuadrante.horas.L1,
            L2H: objetoCuadrante.horas.L2,
            FH: objetoCuadrante.horas.F
        };
        dispatch(generarArchivosXLSAccion('centros', numeroFactusol, centro, calculoTotalAFacturar(), objetoDesgloseConceptos));
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

