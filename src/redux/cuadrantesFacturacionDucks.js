import { setArrayInformeLineasAccion } from './cuadrantesSettersDucks';
import { retornaFormaPagoAccion } from './cuadrantesDucks';
import { procesarDatosCuadranteAccion } from './cuadrantesGestionDucks';
import { handleCloseMenuAccion } from './cuadrantesHandlersDucks';
import { setOpenFacturacionAccion } from './cuadrantesSettersDucks';
import { setOpenFacturacionInteriorAccion } from './cuadrantesSettersDucks';
import { setNumeroFactusolAccion } from './cuadrantesSettersDucks';
import { isNumeric } from './appDucks';
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

export const retornaInfoFabButtonAccion = () => (dispatch, getState) => {
    const { objetoCuadrante, totalesPeriodicos } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes, cuadranteVacio } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    let cuadranteMultiple = "";
    if (numeroCuadrantesCuadrantes.length > 1) {
        cuadranteMultiple = "Cuadrante: " + cuadranteEnUsoCuadrantes + "/" + numeroCuadrantesCuadrantes.length + " - ";
    };
    let sumatorioServiciosFijos = 0;
    let sumatorioTotal = 0;
    let stringBloqueado = '';
    let stringPeriodico = '';
    let bloqueadoSF = false;
    cuadranteServiciosFijos.forEach((servicio, index) => {
        if (servicio.totalServicioFijo !== null) {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
        };
    });
    if (objetoCuadrante.datosServicios.bloqueado && objetoCuadrante.datosServicios.bloqueado.length > 0 && objetoCuadrante.datosServicios.bloqueado[cuadranteEnUsoCuadrantes - 1] === 'si') {
        stringBloqueado = ' (bloqueado servicios)';
        bloqueadoSF = true;
    };
    if ((objetoCentro.tempPago === 'bimensual' || objetoCentro.tempPago === 'trimestral') && objetoCuadrante.datosInforme.tocaFacturar.valor === 'si') {
        stringPeriodico = ' + (' + parseFloat(totalesPeriodicos.total).toFixed(2) + ' €)';
    };
    if (cuadranteVacio) {
        return cuadranteMultiple + 'Horas: 0 - Total: ' + parseFloat(sumatorioServiciosFijos).toFixed(2) + ' €' + stringPeriodico;
    } else {
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.length > 0) {
            objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.forEach((dato, index) => {
                sumatorioTotal += dato.totalHoras;
            });
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial) {
                return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' +
                    parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado +
                        sumatorioServiciosFijos).toFixed(2) + ' €' + stringPeriodico;
            } else {
                return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total: ' +
                    parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHoraTotal +
                        sumatorioServiciosFijos).toFixed(2) + ' €' + stringPeriodico;
            };
        };
    };
};

export const generaInformacionCuadrantesAccion = () => (dispatch, getState) => {
    const { objetoCuadrante, calendarioAGestionar, totalesPeriodicos } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes, firmaActualizacion } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { objetoCentro } = getState().variablesCentros;
    const { intervencionRegistrada } = getState().variablesApp;
    let sumatorioHoras_L = 0;
    let sumatorioHoras_E = 0;
    let sumatorioHoras_P = 0;
    let sumatorioHoras_N = 0;
    let sumatorioHoras_R = 0;
    let sumatorioHoras_L1 = 0;
    let sumatorioHoras_L2 = 0;
    let sumatorioHoras_F = 0;
    let sumatorioTotal = 0;
    let stringBloqueado = '';
    let stringPeriodico = '';
    let bloqueadoSF = false;
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
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.length > 0) {
        let stringTipoComputo = '';
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1) {
            stringTipoComputo = 'proporción Mensual Pactado';
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 2) {
            stringTipoComputo = 'por precio/hora';
        };
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 3) {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial) {
                stringTipoComputo = 'proporción Mensual Pactado (gestión especial de horas)';
            } else {
                stringTipoComputo = 'por precio/hora (gestión especial de horas)';
            };
        };
        arrayInforme.push(['divider', 'normal']);
        arrayInforme.push(['Trabajadores:', 'normal']);
        objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.map((dato, index) => {
            let elTipo;
            if (dato.tipo === 'trabajador') {
                elTipo = '(trabajador)'
            } else {
                elTipo = '(suplente)'
            };
            let nombreTrabajador = dato.trabajador;
            if (!nombreTrabajador) {
                nombreTrabajador = 'Trabajador por determinar';
            };
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
        arrayInforme.push(['divider', 'normal']);
        let textoDiferenciaASumarHorasFestivas = '';
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1 || objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 3) {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial) {
                sumatorioTotal = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado;
                let contadorHayMasDeUnMensualPactado = 0;
                if (sumatorioHoras_L) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (sumatorioHoras_E) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (sumatorioHoras_P) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (sumatorioHoras_N) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (sumatorioHoras_R) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (sumatorioHoras_L1) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (sumatorioHoras_L2) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (sumatorioHoras_F) {
                    contadorHayMasDeUnMensualPactado += 1;
                };
                if (contadorHayMasDeUnMensualPactado !== 1) {
                    textoDiferenciaASumarHorasFestivas = ' + diferencia Horas Festivas'
                };
            } else {
                sumatorioTotal = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHoraTotal;
            };
        } else {
            sumatorioTotal = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHoraTotal;
        };
        if (sumatorioHoras_L) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA: ' + parseFloat(sumatorioHoras_L).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_L).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_L).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
        if (sumatorioHoras_E) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(sumatorioHoras_E).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_E) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_E).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_E).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
        if (sumatorioHoras_P) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(sumatorioHoras_P).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_P) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_P).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_P).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
        if (sumatorioHoras_N) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(sumatorioHoras_N).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_N) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_N).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA NAVE 2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_N).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
        if (sumatorioHoras_R) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(sumatorioHoras_R).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_R) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_R).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA REFUERZO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_R).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
        if (sumatorioHoras_L1) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA_1: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_1: ' + parseFloat(sumatorioHoras_L1).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L1) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA_1: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_L1).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA_1: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_L1).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
        if (sumatorioHoras_L2) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA_2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA_2: ' + parseFloat(sumatorioHoras_L2).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_L2) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA_2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_L2).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA_2: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_L2).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
        if (sumatorioHoras_F) {
            arrayInforme.push(['Cómputo de horas ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F).toFixed(2) + ' €', 'normal']);
            arrayInforme.push(['Total horas mes cuadrante en concepto de SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(sumatorioHoras_F).toFixed(2) + ' horas', 'normal']);
            if (!objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHora_F) {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ' SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_F).toFixed(2) + ' €', 'error']);
                arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
            } else {
                arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + '  SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].totalFacturado_F).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
            }
        };
    };
    arrayInforme.push(['divider', 'normal']);
    let sumatorioServiciosFijos = 0;
    if (cuadranteServiciosFijos.length > 0) {
        arrayInforme.push(['Servicios extra:', 'normal']);
        cuadranteServiciosFijos.forEach((servicio) => {
            for (const prop in servicio) {
                if (servicio[prop] && (prop === 'precioHora_TO' || prop === 'int_TO')) {
                    if (servicio.activo_TO === 'si') {
                        if (servicio.int_TO) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE TOLDOS: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE TOLDOS: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_CR' || prop === 'int_CR')) {
                    if (servicio.activo_CR === 'si') {
                        if (servicio.int_CR) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE CRISTALES: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE CRISTALES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_CE' || prop === 'int_CE')) {
                    if (servicio.activo_CE === 'si') {
                        if (servicio.int_CE) {
                            arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES EXTERIORES: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES EXTERIORES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_CI' || prop === 'int_CI')) {
                    if (servicio.activo_CI === 'si') {
                        if (servicio.int_CI) {
                            arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES INTERIORES: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por LIMPIEZA CRISTALES INTERIORES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_MO' || prop === 'int_MO')) {
                    if (servicio.activo_MO === 'si') {
                        if (servicio.int_MO) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DE TOLDOS: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA MOQUETA: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_OF' || prop === 'int_OF')) {
                    if (servicio.activo_OF === 'si') {
                        if (servicio.int_OF) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA OFICINAS: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA OFICINAS: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_AL' || prop === 'int_AL')) {
                    if (servicio.activo_AL === 'si') {
                        if (servicio.int_AL) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ALMACENES: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ALMACENES: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_LA' || prop === 'int_LA')) {
                    if (servicio.activo_LA === 'si') {
                        if (servicio.int_LA) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA LABORATORIO: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA LABORATORIO: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_TE' || prop === 'int_TE')) {
                    if (servicio.activo_TE === 'si') {
                        if (servicio.int_TE) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA TELARAÑAS: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA TELARAÑAS: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_FI' || prop === 'int_FI')) {
                    if (servicio.activo_FI === 'si') {
                        if (servicio.int_FI) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA INTERIOR: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA INTERIOR: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_FE' || prop === 'int_FE')) {
                    if (servicio.activo_FE === 'si') {
                        if (servicio.int_FE) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA EXTERIOR: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA FACHADA EXTERIOR: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_AB' || prop === 'int_AB')) {
                    if (servicio.activo_AB === 'si') {
                        if (servicio.int_AB) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ABRILLANTADO: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ABRILLANTADO: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_MA' || prop === 'int_MA')) {
                    if (servicio.activo_MA === 'si') {
                        if (servicio.int_MA) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE MANTENIMIENTO MÁQUINA: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE MANTENIMIENTO MÁQUINA: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_PO' || prop === 'int_PO')) {
                    if (servicio.activo_PO === 'si') {
                        if (servicio.int_PO) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA PORTERÍA: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA PORTERÍA: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_BA' || prop === 'int_BA')) {
                    if (servicio.activo_BA === 'si') {
                        if (servicio.int_BA) {
                            arrayInforme.push(['Total a facturar por BOT. NOUBACT: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por BOT. NOUBACT: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_FT' || prop === 'int_FT')) {
                    if (servicio.activo_FT === 'si') {
                        if (servicio.int_FT) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DÍA FESTIVO: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DÍA FESTIVO: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_C3' || prop === 'int_C3')) {
                    if (servicio.activo_C3 === 'si') {
                        if (servicio.int_C3) {
                            arrayInforme.push(['Total a facturar por LIMPIEZA DE CRISTALES TRIMESTRAL: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por LIMPIEZA DE CRISTALES TRIMESTRAL: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_C2' || prop === 'int_C2')) {
                    if (servicio.activo_C2 === 'si') {
                        if (servicio.int_C2) {
                            arrayInforme.push(['Total a facturar por LIMPIEZA DE CRISTALES BIMENSUAL: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por LIMPIEZA DE CRISTALES BIMENSUAL: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_ES' || prop === 'int_ES')) {
                    if (servicio.activo_ES === 'si') {
                        if (servicio.int_ES) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ESPECIAL: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA ESPECIAL: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
                if (servicio[prop] && (prop === 'precioHora_PA' || prop === 'int_PA')) {
                    if (servicio.activo_PA === 'si') {
                        if (servicio.int_PA) {
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DEL PARKING: 0 € (Inculido en cómputo)', 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push(['Total a facturar por SERVICIO DE LIMPIEZA DEL PARKING: ' + parseFloat(servicio.totalServicioFijo).toFixed(2) + ' €', 'normal']);
                        };
                    };
                };
            };
        });
    };
    sumatorioTotal += sumatorioServiciosFijos;
    arrayInforme.push(['divider', 'normal']);
    if (objetoCuadrante.datosServicios.bloqueado.length > 0 && objetoCuadrante.datosServicios.bloqueado[cuadranteEnUsoCuadrantes - 1] === 'si') {
        stringBloqueado = ' (bloqueado servicios)';
        bloqueadoSF = true;
    };
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1] && objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].bloqueado === 'si') {
        if (bloqueadoSF) {
            stringBloqueado = ' (bloqueado horario + servicios)'
        } else {
            stringBloqueado = ' (bloqueado horario)'
        };
    };
    if ((objetoCentro.tempPago === 'bimensual' || objetoCentro.tempPago === 'trimestral') && objetoCuadrante.datosInforme.tocaFacturar.valor === 'si') {
        stringPeriodico = ' + (' + parseFloat(totalesPeriodicos.total).toFixed(2) + ' € de cuadrantes anteriores)';
    };
    arrayInforme.push(['Total General a facturar' + stringBloqueado + ': ' + parseFloat(sumatorioTotal).toFixed(2) + ' €' + stringPeriodico, 'normal']);
    if ((objetoCentro.tempPago === 'bimensual' || objetoCentro.tempPago === 'trimestral') && objetoCuadrante.datosInforme.tocaFacturar.valor === 'si') {
        if (totalesPeriodicos.noExisteCuadrante) {
            arrayInforme.push(['Falta algún cuadrante de la secuencia periódica por registrar.', 'error']);
        };
    };
    arrayInforme.push(['Forma de pago: ' + dispatch(retornaFormaPagoAccion(objetoCentro.formaPago)), 'normal']);
    if (objetoCentro.diaPago) {
        arrayInforme.push(['Día de pago: ' + objetoCentro.diaPago, 'normal']);
    };
    arrayInforme.push(['Frecuencia de pago: ' + objetoCentro.tempPago, 'normal']);
    dispatch(setArrayInformeLineasAccion(arrayInforme));
};

export const handleClickFacturarReciboCuadranteAccion = () => (dispatch, getState) => {
    dispatch(procesarDatosCuadranteAccion('informe'));
    dispatch(handleCloseMenuAccion());
};

export const handleClickFacturarCuadranteAccion = () => (dispatch, getState) => {
    const { objetoCuadrante, totalesPeriodicos } = getState().variablesCuadrantes;
    if (objetoCuadrante.datosInforme.tocaFacturar.valor === 'si') {
        if (totalesPeriodicos.noExisteCuadrante) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "No es posible facturar porque falta algún cuadrante del período por registrar.",
                tipo: 'error'
            }));
            return
        } else {
            dispatch(procesarDatosCuadranteAccion('informe'));
            dispatch(handleCloseMenuAccion());
        };
    };
    if (objetoCuadrante.datosInforme.tocaFacturar.valor === 'no' && objetoCuadrante.datosInforme.tocaFacturar.razon === 'temp') {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "No se puede procesar factura cuadrante porque por temporalización de pago no toca facturar.",
            tipo: 'error'
        }));
        return
    };
    if (objetoCuadrante.datosInforme.tocaFacturar.valor === 'no' && objetoCuadrante.datosInforme.tocaFacturar.razon === 'gest') {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "No se puede procesar factura cuadrante con Gestión especial horas.",
            tipo: 'error'
        }));
        return
    };
    if (objetoCuadrante.datosInforme.tocaFacturar.valor === 'no' && objetoCuadrante.datosInforme.tocaFacturar.razon === 'a0') {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "No se puede procesar factura cuadrante a 0 €.",
            tipo: 'error'
        }));
        return
    };
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