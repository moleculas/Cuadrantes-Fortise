import Constantes from "../constantes";
import {
    setArrayInformeLineasAccion,
    setOpenFacturacionAccion,
    setOpenFacturacionInteriorAccion,
    setNumeroFactusolAccion,
    setAlertaAccion
} from './cuadrantesSettersDucks';
import { retornaFormaPagoAccion } from './cuadrantesDucks';
import { handleCloseMenuAccion } from './cuadrantesHandlersDucks';
import { isNumeric } from './appDucks';
import { procesarDatosCuadranteAccion } from '../logica/logicaGestionCuadrantes';
import { existePrefixSF } from '../logica/logicaServiciosFijos';

//constantes
const dataInicial = {
};
const {
    TIPO_SERVICIO_FIJO: tiposServicioFijo,
    TIPO_SERVICIO: tipoServicio
} = Constantes;

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
    const {
        numeroCuadrantesCuadrantes,
        cuadranteEnUsoCuadrantes,
        cuadranteVacio,
        mesConFestivosCompleto
    } = getState().variablesCuadrantesSetters;
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
    if (mesConFestivosCompleto) {
        sumatorioServiciosFijos = 0;
    } else {
        cuadranteServiciosFijos.forEach((servicio, index) => {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
        });
    };
    // if (objetoCuadrante.datosServicios.bloqueado && objetoCuadrante.datosServicios.bloqueado.length > 0 && objetoCuadrante.datosServicios.bloqueado[cuadranteEnUsoCuadrantes - 1] === 'si') {
    //     stringBloqueado = ' (bloqueado servicios)';
    //     bloqueadoSF = true;
    // };
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
                if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].bloqueado === 'si') {
                    if (bloqueadoSF) {
                        stringBloqueado = ' (bloqueado horario + servicios)'
                    } else {
                        stringBloqueado = ' (bloqueado horario)'
                    };
                };
                return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total' + stringBloqueado + ': ' +
                    parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado +
                        sumatorioServiciosFijos).toFixed(2) + ' €' + stringPeriodico;
            } else {
                return cuadranteMultiple + 'Horas: ' + parseFloat(sumatorioTotal).toFixed(2) + ' - Total' + stringBloqueado + ': ' +
                    parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHoraTotal +
                        sumatorioServiciosFijos).toFixed(2) + ' €' + stringPeriodico;
            };
        } else {
            return cuadranteMultiple + 'Horas: 0.00 - Total' + stringBloqueado + ': 0.00 €' + stringPeriodico;
        };
    };
};

export const generaInformacionCuadrantesAccion = () => (dispatch, getState) => {
    const { objetoCuadrante, calendarioAGestionar, totalesPeriodicos } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes, firmaActualizacion, mesConFestivosCompleto } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { objetoCentro } = getState().variablesCentros;
    const { intervencionRegistrada } = getState().variablesApp;
    const sumatorioHoras = {};
    tipoServicio.forEach(servicio => {
        const prefix = servicio.prefix;
        sumatorioHoras[`sumatorioHoras_${prefix}`] = 0;
    });
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
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1] && objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.length > 0) {
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
            tipoServicio.forEach(servicio => {
                const prefix = servicio.prefix;
                const label = servicio.label;
                const totalHorasNormal = dato[`totalHorasNormal_${prefix}`];
                const totalHorasExtra = dato[`totalHorasExtra_${prefix}`];
                if (totalHorasNormal || totalHorasExtra) {
                    let mensaje = `Total horas trabajadas en concepto de ${label}: `;
                    if (totalHorasNormal && totalHorasExtra) {
                        mensaje += `${parseFloat(totalHorasNormal).toFixed(2)} horas + ${parseFloat(totalHorasExtra).toFixed(2)} horas extra`;
                    } else if (totalHorasNormal) {
                        mensaje += `${parseFloat(totalHorasNormal).toFixed(2)} horas`;
                    } else {
                        mensaje = `Total horas extra trabajadas en concepto de ${label}: ${parseFloat(totalHorasExtra).toFixed(2)} horas extra`;
                    }
                    arrayInforme.push([mensaje, 'normal']);
                    sumatorioHoras[`sumatorioHoras_${prefix}`] += (totalHorasNormal || 0) + (totalHorasExtra || 0);
                }
            });
        });
        arrayInforme.push(['divider', 'normal']);
        let textoDiferenciaASumarHorasFestivas = '';
        let esUnMensualPactado = false;
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 1 || objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo === 3) {
            if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactadoInicial) {
                esUnMensualPactado = true;
                sumatorioTotal = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado;
                let contadorHayMasDeUnMensualPactado = 0;
                tipoServicio.forEach(servicio => {
                    const prefix = servicio.prefix;
                    const sumatorioKey = `sumatorioHoras_${prefix}`;
                    if (sumatorioHoras[sumatorioKey]) {
                        contadorHayMasDeUnMensualPactado += 1;
                    }
                });
                if (contadorHayMasDeUnMensualPactado !== 1) {
                    textoDiferenciaASumarHorasFestivas = ' + diferencia Horas Festivas'
                };
            } else {
                sumatorioTotal = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHoraTotal;
            };
        } else {
            sumatorioTotal = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].precioHoraTotal;
        };
        tipoServicio.forEach(servicio => {
            const prefix = servicio.prefix;
            const label = servicio.label;
            if (sumatorioHoras[`sumatorioHoras_${prefix}`]) {
                const precioHora = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1][`precioHora_${prefix}`];
                const totalFacturado = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1][`totalFacturado_${prefix}`];
                const computo = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].computo;
                if (computo === 4) {
                    arrayInforme.push([`Cómputo de horas ${stringTipoComputo} ${label}: Sin coste`, 'normal']);
                } else {
                    arrayInforme.push([`Cómputo de horas ${stringTipoComputo} ${label}: ${parseFloat(precioHora).toFixed(2)} €`, 'normal']);
                }
                arrayInforme.push([`Total horas mes cuadrante en concepto de ${label}: ${parseFloat(sumatorioHoras[`sumatorioHoras_${prefix}`]).toFixed(2)} horas`, 'normal']);
                if (!precioHora && computo !== 4) {
                    arrayInforme.push([`Total a facturar según cómputo ${stringTipoComputo} ${label}: ${parseFloat(totalFacturado).toFixed(2)} €`, 'error']);
                    arrayInforme.push(['*Debe asignarse un precio/hora en la configuración del Centro o del Cuadrante para poder computar', 'error']);
                } else {
                    if (!esUnMensualPactado) {
                        arrayInforme.push([`Total a facturar según cómputo ${stringTipoComputo} ${label}: ${parseFloat(totalFacturado).toFixed(2)} €${textoDiferenciaASumarHorasFestivas}`, 'normal']);
                    }
                }
            }
        });
        if (esUnMensualPactado) {
            arrayInforme.push(['Total a facturar según cómputo ' + stringTipoComputo + ': ' + parseFloat(objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].mensualPactado).toFixed(2) + ' €' + textoDiferenciaASumarHorasFestivas, 'normal']);
        };
    };
    arrayInforme.push(['divider', 'normal']);
    let sumatorioServiciosFijos = 0;
    if (cuadranteServiciosFijos.length > 0) {
        arrayInforme.push(['Servicios extra:', 'normal']);
        cuadranteServiciosFijos.forEach((servicio) => {
            const { propiedad, existePrefix } = existePrefixSF(servicio);
            if (existePrefix) {
                tiposServicioFijo.forEach((tipo) => {
                    const prefix = tipo.prefix;
                    const label = tipo.label;
                    if (servicio[`precioHora_${prefix}`] || servicio[`int_${prefix}`]) {
                        if (servicio[`activo_${prefix}`] === 'si') {
                            if (servicio[`int_${prefix}`]) {
                                arrayInforme.push([`Total a facturar por ${label}: 0 € (Incluido en cómputo)`, 'normal']);
                            } else {
                                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                                arrayInforme.push([`Total a facturar por ${label}: ${parseFloat(servicio.totalServicioFijo).toFixed(2)} €`, 'normal']);
                            }
                        }
                    }
                });
            } else {
                if (servicio[`precioHora_${propiedad}`] || servicio[`int_${propiedad}`]) {
                    if (servicio[`activo_${propiedad}`] === 'si') {
                        if (servicio[`int_${propiedad}`]) {
                            arrayInforme.push([`Total a facturar por ${servicio[`tipoServiciofijo`].toUpperCase()}: 0 € (Incluido en cómputo)`, 'normal']);
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                            arrayInforme.push([`Total a facturar por ${servicio[`tipoServiciofijo`].toUpperCase()}: ${parseFloat(servicio.totalServicioFijo).toFixed(2)} €`, 'normal']);
                        }
                    }
                }
            }
        });
    };
    if (mesConFestivosCompleto) {
        sumatorioServiciosFijos = 0;
    };
    sumatorioTotal += sumatorioServiciosFijos;
    arrayInforme.push(['divider', 'normal']);
    // if (objetoCuadrante.datosServicios.bloqueado.length > 0 && objetoCuadrante.datosServicios.bloqueado[cuadranteEnUsoCuadrantes - 1] === 'si') {
    //     stringBloqueado = ' (bloqueado servicios)';
    //     bloqueadoSF = true;
    // };
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