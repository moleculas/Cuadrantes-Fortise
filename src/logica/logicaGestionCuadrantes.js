import Constantes from "../constantes";
import {
    setCuadranteServiciosFijosAccion,
    setStateSwitchTipoServicioFijoCuadranteAccion,
    setItemEditandoServiciosFijosAccion,
    setServiciosFijosPersonalizadosAccion
} from '../redux/cuadrantesServiciosFijosDucks';
import { obtenerCategoriaPorCentroAccion } from '../redux/centrosDucks';
import { retornaTextoConceptoServicioAccion } from '../redux/appDucks';
import {
    configuraStateFestivoAccion,
    handleCloseMenuAccion,
    handleActualizarTrabajadoresAccion
} from '../redux/cuadrantesHandlersDucks';
import {
    obtenerTrabajadorAccion,
    obtenerSuplenteAccion
} from '../redux/trabajadoresDucks';
import {
    setCuadranteAccion,
    actualizarObjetoCuadranteAccion,
    obtenerCuadrantesPeriodicosAccion,
    activarDesactivarCambioBotonActualizarAccion,
    setStateFestivoAccion,
    registrarCuadranteAccion,
    cambiarACuadranteRegistradoAccion,
    actualizarCuadranteAccion,
    setProcesoHorasTrabajadoresAccion
} from '../redux/cuadrantesDucks';
import {
    setTrabajadoresEnCuadranteAccion,
    setSuplentesEnCuadranteAccion,
    setEsCambioTraAccion,
    setEsCambioSupAccion,
    setItemEditandoConfiguracionAccion,
    setColumnaIndiceAGestionarAccion,
    setEsUnaActualizacionTrabajadorAccion,
    setAlertaAccion,
    setEstamosActualizandoCuadranteSinCargaAccion,
    setCuadranteBloqueadoAccion,
    setDisableCargandoAccion,
    setOpenLoadingAccion,
    setNumeroCuadrantesCuadrantesAccion,
    setFirmaActualizacionAccion,
    setCuadranteVacioAccion,
    setBufferSwitchedDiasFestivosCuadranteAccion,
    setMesConFestivosCompletoAccion,
    setEsInicioTraAccion,
    setEsInicioSupAccion,
    reseteaContenidoCentroAccion,
    setCuadranteEnUsoCuadrantesAccion,
    setControladorDeEstadoAccion
} from '../redux/cuadrantesSettersDucks';
import {
    registrarIntervencionAccion,
    generarArchivosXLSAccion,
    retornaMinutosAccion
} from '../redux/appDucks';
import { setTrabajadoresInicioAccion } from '../redux/horasTrabajadoresDucks';
import {
    gestionaColumnaServiciosFijosInicioAccion,
    existePrefixSF
} from './logicaServiciosFijos';
import {
    gestionaColumnaCuadranteAccion,
    completarCuadranteAccion,
    limpiarCuadranteAccion
} from './logicaColumnasCuadrantes';
import { limpiarCuadranteInformeAccion } from './logicaInformeCuadrantes';
import { stringify } from 'zipson';

const {
    TIPO_SERVICIO_FIJO: tiposServicioFijo,
    DIAS_SEMANA: diasSemana,
    TIPO_SERVICIO: tipoServicio,
} = Constantes;

const calculaNumeroCuadrantesAccion = (total) => (dispatch, getState) => {
    dispatch(setNumeroCuadrantesCuadrantesAccion(Array.from({ length: total }, (_, index) => ({ value: index + 1, revisado: false }))));
};

export const cambiarEstadoCuadranteEnUsoRevisadoAccion = (estado) => (dispatch, getState) => {
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    let arrayNumeroCuadrantes = [...numeroCuadrantesCuadrantes];
    arrayNumeroCuadrantes = arrayNumeroCuadrantes.map(cuadrante => (cuadrante.value === cuadranteEnUsoCuadrantes ? { ...cuadrante, revisado: estado } : cuadrante));
    dispatch(setNumeroCuadrantesCuadrantesAccion(arrayNumeroCuadrantes));
};

export const centroAGestionarInicioAccion = () => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { cuadranteRegistrado, objetoCuadrante, calendarioAGestionar } = getState().variablesCuadrantes;
    dispatch(setOpenLoadingAccion(true));    
    if (objetoCentro.nombre !== '') {
        if (cuadranteRegistrado === 'no') {
            dispatch(calculaNumeroCuadrantesAccion(objetoCentro.categoria.categoria.length));
            //registramos objeto cuadrante completo
            let hayHorario, hayServiciosFijos, hayTrabajadores;
            let arrayHorario = [];
            let arrayServiciosFijos = [];
            let arrayBloqueoServiciosFijos = [];
            let arrayTrabajadores = [];
            let arrayInforme = [];
            let arrayHoras = [];
            for (let i = 0; i < objetoCentro.categoria.categoria.length; i++) {
                objetoCentro.horario.horario[i] ? hayHorario = true : hayHorario = false;
                objetoCentro.serviciosFijos.serviciosFijos[i] ? hayServiciosFijos = true : hayServiciosFijos = false;
                objetoCentro.trabajadores.trabajadores[i] ? hayTrabajadores = true : hayTrabajadores = false;
                if (hayHorario) {
                    const horario = objetoCentro.horario.horario[i];
                    arrayHorario.push({
                        tipoHorarioGeneral: horario.tipo,
                        arrayCuadrante: [],
                        observaciones: objetoCentro.observaciones.observaciones[i] ?? ''
                    });
                    arrayInforme.push({
                        tipoRegistro: horario.tipoRegistro,
                        computo: horario.computo,
                        excepcion: horario.excepcion ?? '',
                        bloqueado: 'no',
                        mensualPactado: horario.mensualPactado ?? null,
                        mensualPactadoInicial: horario.mensualPactado ?? null,
                        proporcion: null,
                        precioHoraTotal: null,
                        precioHora_L: horario.precioHora_L ?? null,
                        precioHora_E: horario.precioHora_E ?? null,
                        precioHora_P: horario.precioHora_P ?? null,
                        precioHora_N: horario.precioHora_N ?? null,
                        precioHora_R: horario.precioHora_R ?? null,
                        precioHora_L1: horario.precioHora_L1 ?? null,
                        precioHora_L2: horario.precioHora_L2 ?? null,
                        precioHora_F: horario.precioHora_F ?? null,
                        arrayTrabajadores: [],
                        totalFacturado_L: null,
                        totalFacturado_E: null,
                        totalFacturado_P: null,
                        totalFacturado_N: null,
                        totalFacturado_R: null,
                        totalFacturado_L1: null,
                        totalFacturado_L2: null,
                        totalFacturado_F: null,
                        iniciado: horario.mensualPactado ? false : true,
                        arrayDatosInforme: [],
                        seqSemSiNo: null
                    });
                } else {
                    arrayHorario.push({
                        tipoHorarioGeneral: '',
                        arrayCuadrante: [],
                        observaciones: objetoCentro.observaciones.observaciones[i] ?? ''
                    });
                    arrayInforme.push(null);
                };
                //hayServiciosFijos
                if (hayServiciosFijos) arrayBloqueoServiciosFijos.push('si');
                arrayServiciosFijos.push(hayServiciosFijos ? objetoCentro.serviciosFijos.serviciosFijos[i].servicio : []);
                //hayTrabajadores
                arrayTrabajadores.push(
                    hayTrabajadores
                        ? {
                            cantidad: objetoCentro.trabajadores.trabajadores[i].cantidad,
                            trabajadores: objetoCentro.trabajadores.trabajadores[i].trabajadores.map((trabajadorIterado, index) => {
                                return trabajadorIterado['suplente_' + (index + 1)] === ''
                                    ? {
                                        ['trabajador_' + (index + 1)]: trabajadorIterado['trabajador_' + (index + 1)],
                                        ['suplente_' + (index + 1)]: 999,
                                    }
                                    : trabajadorIterado;
                            }),
                        }
                        : null
                );
                arrayHoras.push(null);
            };
            dispatch(actualizarObjetoCuadranteAccion({
                ...objetoCuadrante,
                nombre: calendarioAGestionar + '-' + objetoCentro.id,
                datosCuadrante: {
                    objeto: 'cuadrante',
                    centro: objetoCentro.id,
                    nombreCentro: objetoCentro.nombre,
                    subNombreCentro: objetoCentro.subNombre || null,
                    codigo: objetoCentro.codigo,
                    domicilio: objetoCentro.domicilio,
                    codigoPostal: objetoCentro.codigoPostal,
                    poblacion: objetoCentro.poblacion,
                    provincia: objetoCentro.provincia,
                    nif: objetoCentro.nif,
                    formaPago: objetoCentro.formaPago,
                    telefono: objetoCentro.telefono,
                    mail: objetoCentro.mail,
                    mail2: objetoCentro.mail2 || null,
                    diaPago: objetoCentro.diaPago || null,
                    datosCuadrante: arrayHorario,
                    facturar: objetoCentro.facturar
                },
                datosServicios: {
                    objeto: 'serviciosFijos',
                    datosServicios: arrayServiciosFijos,
                    bloqueado: arrayBloqueoServiciosFijos
                },
                datosInforme: {
                    objeto: 'informe',
                    tocaFacturar: dispatch(calculaTocaFacturacionAccion()),
                    datosInforme: arrayInforme,
                    mailEnviado: 'no'
                },
                datosTrabajadoresIniciales: {
                    objeto: 'trabajadores',
                    datosTrabajadoresIniciales: arrayTrabajadores
                },
                horas: {
                    objeto: 'horas',
                    horas: arrayHoras
                }
            }));
        };
    };
    dispatch(setOpenLoadingAccion(false));
};

const calculaTocaFacturacionAccion = () => (dispatch, getState) => {
    const { calendarioAGestionar, totalesPeriodicos } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    const mes = parseInt(calendarioAGestionar.split("-")[1]);
    const { tempPago, horario, serviciosFijos, facturar } = objetoCentro;
    const horarioCentro = horario?.horario || [];
    let objetoRetornoCalculo = { valor: 'si', razon: '' };
    //modificador: No facturar
    if(facturar === "no"){
        objetoRetornoCalculo = { valor: 'no', razon: 'orig' };
    }else if (tempPago === 'bimensual' && mes % 2 === 1) {
        objetoRetornoCalculo = { valor: 'no', razon: 'temp' };
    } else if (tempPago === 'bimensual' && mes % 2 === 0) {
        if (!totalesPeriodicos.total) {
            dispatch(obtenerCuadrantesPeriodicosAccion('cuadrantes', calendarioAGestionar, 'bimensual', objetoCentro.id));
        }
    } else if (tempPago === 'trimestral' && mes % 3 !== 0) {
        objetoRetornoCalculo = { valor: 'no', razon: 'temp' };
    } else if (tempPago === 'trimestral' && mes % 3 === 0) {
        if (!totalesPeriodicos.total) {
            dispatch(obtenerCuadrantesPeriodicosAccion('cuadrantes', calendarioAGestionar, 'trimestral', objetoCentro.id));
        }
    } else if (horarioCentro.length === 1) {
        const computo = horarioCentro[0]?.computo;
        if ([3].includes(computo) || serviciosFijos.gestionEspSF) {
            objetoRetornoCalculo = { valor: 'no', razon: 'gest' };
        }
    } else if (horarioCentro.length > 1) {
        const hasValidComputo = horarioCentro.some(hor => [1, 2].includes(hor?.computo)) &&
            horarioCentro.every(hor => hor?.computo !== 3) &&
            !serviciosFijos.gestionEspSF;
        if (!hasValidComputo) {
            objetoRetornoCalculo = { valor: 'no', razon: 'gest' };
        }
    };
    return objetoRetornoCalculo;
};

export const gestionaCuadranteIndividualAccion = (numeroCuadrante, cambio) => (dispatch, getState) => {
    const { objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes } = getState().variablesCuadrantesSetters;
    const { objetoCentro } = getState().variablesCentros;
    const datosCuadrante = objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1];
    const datosInforme = objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1];
    const datosServicios = objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1];
    (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado) && dispatch(gestionaFestivosInicio());
    !cambio && dispatch(calculaNumeroCuadrantesAccion(objetoCuadrante.datosCuadrante.datosCuadrante.length));
    dispatch(setFirmaActualizacionAccion(objetoCuadrante.actualizacion));
    const myObjetoServiciosFijos = {};
    const objetoEstadosSwitch = {};
    const arrTrabajadoresInicio = [];
    tiposServicioFijo.forEach(prefixObj => {
        myObjetoServiciosFijos[`precioHora_${prefixObj.prefix}`] = null;
        myObjetoServiciosFijos[`variacion_${prefixObj.prefix}`] = '';
        myObjetoServiciosFijos[`diaVariacion_${prefixObj.prefix}`] = '';
        myObjetoServiciosFijos[`activo_${prefixObj.prefix}`] = 'si';
        myObjetoServiciosFijos[`int_${prefixObj.prefix}`] = false;
        myObjetoServiciosFijos[`trab_${prefixObj.prefix}`] = '';
        objetoEstadosSwitch[`${prefixObj.prefix}`] = false;
    });
    let bloqueadoSF = 'no';
    if (!datosCuadrante.tipoHorarioGeneral) {
        dispatch(setCuadranteVacioAccion(true));
        dispatch(setDisableCargandoAccion(false));
    };
    if (datosServicios) {
        datosServicios.forEach((servicio) => {
            //modificador: control horas servicios fijos
            if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado)) {
                if (servicio.hasOwnProperty('horas')) {
                    Object.keys(servicio).forEach(key => {
                        if (key.startsWith('trab_') && servicio[key]) {
                            arrTrabajadoresInicio.push(servicio[key]);
                        }
                    });
                };
            };
            tiposServicioFijo.forEach(prefixObj => {
                if (servicio[`precioHora_${prefixObj.prefix}`] || servicio[`int_${prefixObj.prefix}`]) {
                    myObjetoServiciosFijos[`precioHora_${prefixObj.prefix}`] = servicio[`precioHora_${prefixObj.prefix}`];
                    myObjetoServiciosFijos[`variacion_${prefixObj.prefix}`] = servicio[`variacion_${prefixObj.prefix}`];
                    myObjetoServiciosFijos[`diaVariacion_${prefixObj.prefix}`] = servicio[`diaVariacion_${prefixObj.prefix}`];
                    myObjetoServiciosFijos[`activo_${prefixObj.prefix}`] = servicio[`activo_${prefixObj.prefix}`];
                    myObjetoServiciosFijos[`int_${prefixObj.prefix}`] = servicio[`int_${prefixObj.prefix}`];
                    myObjetoServiciosFijos[`trab_${prefixObj.prefix}`] = servicio[`trab_${prefixObj.prefix}`];
                    objetoEstadosSwitch[`${prefixObj.prefix}`] = true;
                };
            });
        });
        dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosInicioAccion(objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1], false))));
        bloqueadoSF = 'si';
    };
    //modificador: servicios fijos personalizados
    if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado)) {
        if (datosServicios) {
            const arrServiciosFijosPersonalizados = datosServicios.reduce((acc, servicio) => {
                const { propiedad, existePrefix } = existePrefixSF(servicio);
                if (!existePrefix) {
                    const obj = ['variacion', 'diaVariacion', 'activo', 'int', 'trab', 'precioHora'].reduce((o, key) => {
                        o[`${key}_${propiedad}`] = servicio[`${key}_${propiedad}`];
                        return o;
                    }, {});
                    obj[`descripcion_${propiedad}`] = servicio[`tipoServiciofijo`];
                    acc.push(obj);
                }
                return acc;
            }, []);
            if (arrServiciosFijosPersonalizados.length > 0) {
                dispatch(setServiciosFijosPersonalizadosAccion(arrServiciosFijosPersonalizados));
            }
        };
    };
    const obtenElementoTrabajadorInicio = async (trabajadorIterado, index, arrayControl) => {
        return new Promise((resolve) => {
            if (trabajadorIterado['trabajador_' + (index + 1)]) {
                dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado['trabajador_' + (index + 1)])).then(({ trabajador }) => {
                    const foundTrabajador = arrayControl.some(element => element[`trabajador_${index + 1}`] === trabajadorIterado[`trabajador_${index + 1}`] && element[`suplente_${index + 1}`] === trabajadorIterado[`suplente_${index + 1}`]);
                    if (!foundTrabajador) {
                        dispatch(gestionTrabajadorAccion(trabajador)).then(({ payload }) => {
                            arrayControl.push(trabajadorIterado);
                            if (payload) {
                                if (trabajadorIterado['suplente_' + (index + 1)]) {
                                    dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado['suplente_' + (index + 1)])).then(({ suplente }) => {
                                        dispatch(gestionSuplenteAccion(suplente)).then(({ payload }) => {
                                            if (payload) {
                                                resolve({ payload: { trab: "trabajadorIterado", arrayControl } });
                                            };
                                        });
                                    });
                                } else {
                                    resolve({ payload: { trab: "trabajadorIterado", arrayControl } });
                                };
                            };
                        });
                    } else {
                        resolve({ payload: { trab: "trabajadorIterado", arrayControl } });
                    };
                });
            };
        });
    };
    const obtenElementoTrabajadorRegistrado = async (trabajadorIterado) => {
        return new Promise((resolve) => {
            if (trabajadorIterado.tipoTrabajador === 'trabajador') {
                dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado.idTrabajador)).then(({ trabajador }) => {
                    dispatch(gestionTrabajadorAccion(trabajador)).then(({ payload }) => {
                        if (payload) {
                            resolve({ payload: { trab: "trabajadorIterado" } });
                        };
                    });
                });
            };
            if (trabajadorIterado.tipoTrabajador === 'suplente') {
                dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado.idTrabajador)).then(({ suplente }) => {
                    dispatch(gestionSuplenteAccion(suplente)).then(({ payload }) => {
                        if (payload) {
                            resolve({ payload: { trab: "trabajadorIterado" } });
                        };
                    });
                });
            } else {
                resolve({ payload: { trab: "trabajadorIterado" } });
            };
        });
    };
    if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado) {
        if (objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[numeroCuadrante - 1]) {
            async function forEachAsync(array) {
                dispatch(setDisableCargandoAccion(true));
                const arrayControl = [];
                for (let index = 0; index < array.length; index++) {
                    const trabajadorIterado = array[index];
                    let valido = false;
                    while (!valido) {
                        const result = await obtenElementoTrabajadorInicio(trabajadorIterado, index, arrayControl);
                        if (result.payload.trab === "trabajadorIterado") {
                            valido = true;
                        };
                    };
                };
            };
            forEachAsync(objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[numeroCuadrante - 1].trabajadores).then(() => {
                dispatch(setDisableCargandoAccion(false));
            });
        };
    };
    if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado)) {
        if (datosCuadrante.arrayCuadrante.length > 0) {
            async function forEachAsync(array) {
                dispatch(setDisableCargandoAccion(true));
                for (let index = 0; index < array.length; index++) {
                    const trabajadorIterado = array[index];
                    //modificador: control horas servicios fijos
                    arrTrabajadoresInicio.push(trabajadorIterado.idTrabajador);
                    let valido = false;
                    while (!valido) {
                        const result = await obtenElementoTrabajadorRegistrado(trabajadorIterado);
                        if (result.payload.trab === "trabajadorIterado") {
                            valido = true;
                        };
                    };
                };
            };
            forEachAsync(datosCuadrante.arrayCuadrante).then(() => {
                dispatch(setDisableCargandoAccion(false));
            });
        };
        dispatch(setTrabajadoresInicioAccion(arrTrabajadoresInicio));
    };
    dispatch(setStateSwitchTipoServicioFijoCuadranteAccion(objetoEstadosSwitch));
    dispatch(setItemEditandoServiciosFijosAccion({
        switch: objetoEstadosSwitch,
        servicios: myObjetoServiciosFijos,
        bloqueado: bloqueadoSF
    }));
    let objetoDatosCuadrante = {};
    if (datosInforme && datosCuadrante.tipoHorarioGeneral) {
        if (objetoCentro.nombre !== '') {
            if (!objetoCentro.horario.horario[numeroCuadrante - 1]) {
                dispatch(setAlertaAccion({
                    abierto: true,
                    mensaje: "Cuadrante bloqueado. Se ha cambiado la configuración del Centro después de registrar el cuadrante. No pueden efectuarse cambios.",
                    tipo: 'warning'
                }));
                dispatch(setCuadranteBloqueadoAccion(true));
            };
        };
        objetoDatosCuadrante = {
            ...objetoDatosCuadrante,
            tipoHorario: datosCuadrante.tipoHorarioGeneral,
            computo: datosInforme.computo,
            excepcion: datosInforme.excepcion || '',
            bloqueado: datosInforme.bloqueado || 'no',
            mensualPactadoInicial: datosInforme.mensualPactadoInicial || '',
            mensualPactado: datosInforme.mensualPactado || '',
            precioHora_L: datosInforme.precioHora_L || '',
            precioHora_E: datosInforme.precioHora_E || '',
            precioHora_P: datosInforme.precioHora_P || '',
            precioHora_N: datosInforme.precioHora_N || '',
            precioHora_R: datosInforme.precioHora_R || '',
            precioHora_L1: datosInforme.precioHora_L1 || '',
            precioHora_L2: datosInforme.precioHora_L2 || '',
            precioHora_F: datosInforme.precioHora_F || '',
            seqSemSiNo: datosInforme.seqSemSiNo || null
        };
    };
    objetoDatosCuadrante = {
        ...objetoDatosCuadrante,
        observaciones: datosCuadrante.observaciones || '',
        festivos: {
            inicio: null,
            fin: null,
            tipo: '',
        }
    };
    dispatch(setItemEditandoConfiguracionAccion(objetoDatosCuadrante));
    // async function obtenerDatosGestionEspecialInterna() {
    //     if (objetoCuadrante.total && objetoCuadrante.total.procesado && !objetoCuadrante.total.procesado.numR) {
    //         if ((objetoCentro.horario.horario[0] && parseInt(objetoCentro.horario.horario[0].computo) === 3) || objetoCentro.serviciosFijos.gestionEspSF) {
    //             const numRecibo = await dispatch(obtenerNumeracionAccion('numero_recibo'));
    //             if (numRecibo) {
    //                 return numRecibo
    //             } else {
    //                 return false
    //             }
    //         };
    //     };
    //     return false;
    // };  
    if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado)) {
        let losDatosInforme;
        if (datosCuadrante.arrayCuadrante.length > 0) {
            const arrayResultante = dispatch(completarCuadranteAccion(datosCuadrante.arrayCuadrante));
            dispatch(setCuadranteAccion(arrayResultante));
            dispatch(gestionaFestivosInicio());
            let objetoDatosInforme = {
                computo: datosInforme.computo,
                excepcion: datosInforme.excepcion || '',
                bloqueado: datosInforme.bloqueado,
                tipoRegistro: datosInforme.tipoRegistro,
                mensualPactado: datosInforme.mensualPactado >= 0 ? datosInforme.mensualPactado : null,
                mensualPactadoInicial: datosInforme.mensualPactadoInicial || '',
                proporcion: datosInforme.proporcion || null,
                precioHoraTotal: datosInforme.precioHoraTotal ?? null,
                precioHora_L: datosInforme.precioHora_L || null,
                precioHora_E: datosInforme.precioHora_E || null,
                precioHora_P: datosInforme.precioHora_P || null,
                precioHora_N: datosInforme.precioHora_N || null,
                precioHora_R: datosInforme.precioHora_R || null,
                precioHora_L1: datosInforme.precioHora_L1 || null,
                precioHora_L2: datosInforme.precioHora_L2 || null,
                precioHora_F: datosInforme.precioHora_F || null,
                totalFacturado_L: datosInforme.totalFacturado_L || null,
                totalFacturado_E: datosInforme.totalFacturado_E || null,
                totalFacturado_P: datosInforme.totalFacturado_P || null,
                totalFacturado_N: datosInforme.totalFacturado_N || null,
                totalFacturado_R: datosInforme.totalFacturado_R || null,
                totalFacturado_L1: datosInforme.totalFacturado_L1 || null,
                totalFacturado_L2: datosInforme.totalFacturado_L2 || null,
                totalFacturado_F: datosInforme.totalFacturado_F || null,
                iniciado: datosInforme.iniciado,
                arrayDatosInforme: [],
                seqSemSiNo: datosInforme.seqSemSiNo || null,
            };
            let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
            elArrayDatosInforme[numeroCuadrante - 1] = objetoDatosInforme;
            losDatosInforme = {
                ...objetoCuadrante.datosInforme,
                datosInforme: elArrayDatosInforme
            };
            if (cuadranteRegistrado === 'si') {
                if (objetoCuadrante.total.totalesPeriodicos) {
                    dispatch(revisionCuadrantesPeriodicos(losDatosInforme));
                } else {
                    dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
                    dispatch(actualizarObjetoCuadranteAccion({
                        ...objetoCuadrante,
                        datosInforme: losDatosInforme
                    }));
                };
                //objetoCentro.nombre !== '' && dispatch(obtenerDatosGestionEspecialAccion());              
                // obtenerDatosGestionEspecialInterna().then((numRecibo) => {
                //     console.log(numRecibo)
                //     dispatch(setNumeracion(numRecibo));
                // });
            } else {
                dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
                dispatch(actualizarObjetoCuadranteAccion({
                    ...objetoCuadrante,
                    datosInforme: losDatosInforme
                }));
            };
        } else {
            if (cuadranteRegistrado === 'si') {
                //objetoCentro.nombre !== '' && dispatch(obtenerDatosGestionEspecialAccion());          
                // obtenerDatosGestionEspecialInterna().then((numRecibo) => {
                //     dispatch(setNumeracion(numRecibo));
                // });
                objetoCuadrante.total.totalesPeriodicos
                    ? (() => {
                        losDatosInforme = { ...objetoCuadrante.datosInforme };
                        dispatch(revisionCuadrantesPeriodicos(losDatosInforme));
                    })()
                    : dispatch(gestionaFestivosInicio());
            } else {
                dispatch(gestionaFestivosInicio());
            };
        };
    };
};

const revisionCuadrantesPeriodicos = (datosInforme) => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    let losDatosInformeFuncion = {
        ...datosInforme,
        tocaFacturar: dispatch(calculaTocaFacturacionAccion())
    };
    dispatch(activarDesactivarCambioBotonActualizarAccion(true));
    dispatch(registrarIntervencionAccion(true));
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(false));
    dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
    dispatch(actualizarObjetoCuadranteAccion({
        ...objetoCuadrante,
        datosInforme: losDatosInformeFuncion
    }));
};

export const gestionTrabajadorAccion = (objetoTrabajadorInicio) => (dispatch, getState) => {
    const { cuadranteRegistrado, objetoCuadrante, cuadrante } = getState().variablesCuadrantes;
    const {
        trabajadoresEnCuadrante,
        esInicioTra,
        esCambioTra,
        cuadranteEnUsoCuadrantes,
        valorPrevioAccordionAbierto,
        cuadranteVacio,
        esUnaActualizacionTrabajador,
        columnaIndiceAGestionar,
        posicionTrabajadorPrevioACambiar,
        cambiadaConfiguracionGeneral,
        numeroCuadrantesCuadrantes
    } = getState().variablesCuadrantesSetters;
    const { objetoTrabajador } = getState().variablesTrabajadores;
    let arrayTr = [];
    if (esInicioTra) {
        arrayTr = [...trabajadoresEnCuadrante];
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1]?.tipoRegistro === 'individual') {
            objetoTrabajadorInicio['laPosicionDelTrabajador'] = arrayTr.length + 1;
        };
        if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado) {
            const arrayCuadrante = [...cuadrante];
            return new Promise((resolve) => {
                const laColumnaAnadir = dispatch(gestionaColumnaCuadranteAccion(
                    objetoTrabajadorInicio,
                    'trabajador',
                    false,
                    null,
                    false,
                    false,
                    objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral,
                    esUnaActualizacionTrabajador
                ));
                if (laColumnaAnadir) {
                    arrayCuadrante.push(laColumnaAnadir);
                    arrayTr.push(objetoTrabajadorInicio);
                    dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
                    dispatch(setCuadranteAccion(arrayCuadrante)).then(({ payload }) => {
                        if (payload) {
                            resolve({ payload: true });
                        };
                    });
                } else {
                    resolve({ payload: true });
                };
            });
        };
        if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado)) {
            return new Promise((resolve) => {
                let estaEnElArrayTrabajadores = trabajadoresEnCuadrante.some(trabajador => trabajador['id'] === objetoTrabajadorInicio.id);
                if (!estaEnElArrayTrabajadores) {
                    arrayTr.push(objetoTrabajadorInicio);
                    dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
                };
                resolve({ payload: true });
            });
        };
    }
    if (esCambioTra) {
        //modificador: control horas trabajadores    
        dispatch(gestionCambioTrabajadorHorasTrabajadores(valorPrevioAccordionAbierto));
        arrayTr = [...trabajadoresEnCuadrante];
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoTrabajador['laPosicionDelTrabajador'] = posicionTrabajadorPrevioACambiar;
        };
        if (objetoTrabajador.estado !== 'alta' && !esUnaActualizacionTrabajador) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Este trabajador se encuentra de baja o está en reserva, selecciona otro.",
                tipo: 'error'
            }));
        } else {
            if (valorPrevioAccordionAbierto) {
                const posicionTrabajador = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === valorPrevioAccordionAbierto));
                arrayTr.splice(posicionTrabajador, 1);
            };
            cuadranteVacio && dispatch(setCuadranteVacioAccion(false));
            dispatch(gestionaColumnaCuadranteAccion(
                objetoTrabajador,
                'trabajador',
                true,
                columnaIndiceAGestionar,
                false,
                cuadranteVacio || cambiadaConfiguracionGeneral,
                objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral,
                esUnaActualizacionTrabajador
            )
            );
            if (!esUnaActualizacionTrabajador) {
                Array.prototype.insert = function (index, item) {
                    this.splice(index, 0, item);
                };
                arrayTr.insert(posicionTrabajadorPrevioACambiar - 1, objetoTrabajador);
                dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
            };
            dispatch(setEsCambioTraAccion(false));
            dispatch(setColumnaIndiceAGestionarAccion(null));
        };
        if (esUnaActualizacionTrabajador) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Trabajador actualizado exitosamente.",
                tipo: 'success'
            }));
            dispatch(setEsUnaActualizacionTrabajadorAccion(false));
        };
    };
};

export const gestionSuplenteAccion = (objetoSuplenteInicio) => (dispatch, getState) => {
    const {
        cuadranteRegistrado,
        objetoCuadrante,
        cuadrante
    } = getState().variablesCuadrantes;
    const {
        trabajadoresEnCuadrante,
        suplentesEnCuadrante,
        esInicioSup,
        esCambioSup,
        cuadranteEnUsoCuadrantes,
        valorPrevioAccordionAbierto,
        cuadranteVacio,
        esUnaActualizacionTrabajador,
        columnaIndiceAGestionar,
        posicionSuplentePrevioACambiar,
        cambiadaConfiguracionGeneral,
        numeroCuadrantesCuadrantes
    } = getState().variablesCuadrantesSetters;
    const { objetoSuplente } = getState().variablesTrabajadores;
    let arraySu = [];
    if (esInicioSup) {
        arraySu = [...suplentesEnCuadrante];
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoSuplenteInicio['laPosicionDelTrabajador'] = trabajadoresEnCuadrante.length;
        }
        if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado) {
            const arrayCuadrante = [...cuadrante];
            return new Promise((resolve) => {
                const laColumnaAnadir = dispatch(gestionaColumnaCuadranteAccion(
                    objetoSuplenteInicio,
                    'suplente',
                    false,
                    null,
                    false,
                    false,
                    objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral,
                    esUnaActualizacionTrabajador
                ));
                if (laColumnaAnadir) {
                    arrayCuadrante.push(laColumnaAnadir);
                    arraySu.push(objetoSuplenteInicio);
                    dispatch(setSuplentesEnCuadranteAccion(arraySu));
                    dispatch(setCuadranteAccion(arrayCuadrante)).then(({ payload }) => {
                        if (payload) {
                            resolve({ payload: true });
                        };
                    });
                } else {
                    resolve({ payload: true });
                };
            });
        };
        if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado)) {
            return new Promise((resolve) => {
                let estaEnElArraySuplentes = suplentesEnCuadrante.some(suplente => suplente['id'] === objetoSuplente.id);
                if (!estaEnElArraySuplentes) {
                    arraySu.push(objetoSuplente);
                    dispatch(setSuplentesEnCuadranteAccion(arraySu));
                };
                resolve({ payload: true });
            });
        };
    };
    if (esCambioSup) {
        //modificador: control horas trabajadores    
        dispatch(gestionCambioTrabajadorHorasTrabajadores(valorPrevioAccordionAbierto));
        arraySu = [...suplentesEnCuadrante];
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoSuplente['laPosicionDelTrabajador'] = posicionSuplentePrevioACambiar;
        };
        if (objetoSuplente.estado !== 'alta' && !esUnaActualizacionTrabajador) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Este trabajador se encuentra de baja, selecciona otro.",
                tipo: 'error'
            }));
        } else {
            if (valorPrevioAccordionAbierto) {
                const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === valorPrevioAccordionAbierto));
                arraySu.splice(posicionSuplente, 1);
            };
            cuadranteVacio && dispatch(setCuadranteVacioAccion(false));
            dispatch(gestionaColumnaCuadranteAccion(
                objetoSuplente,
                'suplente',
                true,
                columnaIndiceAGestionar,
                false,
                cuadranteVacio || cambiadaConfiguracionGeneral,
                objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral,
                esUnaActualizacionTrabajador
            ));
            if (!esUnaActualizacionTrabajador) {
                Array.prototype.insert = function (index, item) {
                    this.splice(index, 0, item);
                };
                arraySu.insert(posicionSuplentePrevioACambiar - 1, objetoSuplente);
                dispatch(setSuplentesEnCuadranteAccion(arraySu));
            };
            dispatch(setEsCambioSupAccion(false));
            dispatch(setColumnaIndiceAGestionarAccion(null));
        };
        if (esUnaActualizacionTrabajador) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Trabajador actualizado exitosamente.",
                tipo: 'success'
            }));
            dispatch(setEsUnaActualizacionTrabajadorAccion(false));
        };
    };
};

const gestionCambioTrabajadorHorasTrabajadores = (valorPrevioAccordionAbierto) => (dispatch, getState) => {
    const { trabajadoresInicio } = getState().variablesHorasTrabajadores;
    const { cuadranteRegistrado, procesoHorasTrabajadores } = getState().variablesCuadrantes;
    let horasTrabajadores = procesoHorasTrabajadores?.horasTrabajadores;
    let trabajadoresIniciales = [...trabajadoresInicio];
    if (horasTrabajadores && horasTrabajadores.length > 0) {
        horasTrabajadores = horasTrabajadores.filter(
            (trabajador) => trabajador.trabajadorId !== valorPrevioAccordionAbierto
        );
        dispatch(setProcesoHorasTrabajadoresAccion({
            ...procesoHorasTrabajadores,
            horasTrabajadores
        }));
    };
    if (trabajadoresIniciales && trabajadoresIniciales.length > 0 && cuadranteRegistrado === "no") {
        trabajadoresIniciales = trabajadoresIniciales.filter(
            (trabajador) => trabajador !== valorPrevioAccordionAbierto
        );
        dispatch(setTrabajadoresInicioAccion(trabajadoresIniciales));
    }
};

const numeroALetras = (function () {
    function Unidades(num) {
        switch (num) {
            case 1:
                return 'UN';
            case 2:
                return 'DOS';
            case 3:
                return 'TRES';
            case 4:
                return 'CUATRO';
            case 5:
                return 'CINCO';
            case 6:
                return 'SEIS';
            case 7:
                return 'SIETE';
            case 8:
                return 'OCHO';
            case 9:
                return 'NUEVE';
        }
        return '';
    } //Unidades()
    function Decenas(num) {
        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);
        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0:
                        return 'DIEZ';
                    case 1:
                        return 'ONCE';
                    case 2:
                        return 'DOCE';
                    case 3:
                        return 'TRECE';
                    case 4:
                        return 'CATORCE';
                    case 5:
                        return 'QUINCE';
                    default:
                        return 'DIECI' + Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0:
                        return 'VEINTE';
                    default:
                        return 'VEINTI' + Unidades(unidad);
                }
            case 3:
                return DecenasY('TREINTA', unidad);
            case 4:
                return DecenasY('CUARENTA', unidad);
            case 5:
                return DecenasY('CINCUENTA', unidad);
            case 6:
                return DecenasY('SESENTA', unidad);
            case 7:
                return DecenasY('SETENTA', unidad);
            case 8:
                return DecenasY('OCHENTA', unidad);
            case 9:
                return DecenasY('NOVENTA', unidad);
            case 0:
                return Unidades(unidad);
        }
    } //Unidades()
    function DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)
        return strSin;
    } //DecenasY()
    function Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);
        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + Decenas(decenas);
                return 'CIEN';
            case 2:
                return 'DOSCIENTOS ' + Decenas(decenas);
            case 3:
                return 'TRESCIENTOS ' + Decenas(decenas);
            case 4:
                return 'CUATROCIENTOS ' + Decenas(decenas);
            case 5:
                return 'QUINIENTOS ' + Decenas(decenas);
            case 6:
                return 'SEISCIENTOS ' + Decenas(decenas);
            case 7:
                return 'SETECIENTOS ' + Decenas(decenas);
            case 8:
                return 'OCHOCIENTOS ' + Decenas(decenas);
            case 9:
                return 'NOVECIENTOS ' + Decenas(decenas);
        }
        return Decenas(decenas);
    } //Centenas()
    function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)
        let letras = '';
        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;
        if (resto > 0)
            letras += '';
        return letras;
    } //Seccion()
    function Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)
        let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = Centenas(resto);
        if (strMiles == '')
            return strCentenas;
        return strMiles + ' ' + strCentenas;
    } //Miles()
    function Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)
        let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        let strMiles = Miles(resto);
        if (strMillones == '')
            return strMiles;
        return strMillones + ' ' + strMiles;
    } //Millones()
    return function NumeroALetras(num, currency) {
        currency = currency || {};
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
            letrasMonedaPlural: currency.plural || 'EUROS',
            letrasMonedaSingular: currency.singular || 'EURO',
            letrasMonedaCentavoPlural: currency.centPlural || 'CÉNTIMOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CÉNTIMO'
        };
        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + (function () {
                if (data.centavos == 1)
                    return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                else
                    return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
            })();
        };
        if (data.enteros == 0)
            return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros == 1)
            return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
            return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    };
})();

export const gestionaFestivosInicio = () => (dispatch, getState) => {
    const {
        objetoCuadrante,
        losDiasDelMes,
        cuadranteRegistrado
    } = getState().variablesCuadrantes;
    const {
        bufferSwitchedDiasFestivosCuadrante,
        numeroCuadrantesCuadrantes,
        cuadranteEnUsoCuadrantes
    } = getState().variablesCuadrantesSetters;
    const iterarFestivos = (objetoIterable) => {
        let contadorDias = 0;
        let object = losDiasDelMes.reduce((acc, _, index) => {
            acc[`estadoFestivoDia${index + 1}`] = false;
            acc[`tipoFestivoDia${index + 1}`] = 0;
            return acc;
        }, {});
        objetoIterable.forEach(festivo => {
            const postRef = Object.keys(festivo)[0];
            diasSemana.forEach(diaObj => {
                if (postRef.includes(diaObj.label)) {
                    const mySplitDia = postRef.split(diaObj.label);
                    if (festivo.activo) {
                        contadorDias++;
                        object[`estadoFestivoDia${mySplitDia[1]}`] = true;
                        object[`tipoFestivoDia${mySplitDia[1]}`] = festivo.tipo ? festivo.tipo : null;
                    };
                };
            });
        });
        //control mes completo vacaciones   
        losDiasDelMes.length === contadorDias && dispatch(setMesConFestivosCompletoAccion(true));
        return object;
    };
    const condicion3 = bufferSwitchedDiasFestivosCuadrante.length === 0;
    if (cuadranteRegistrado === 'si') {
        const condicion1 = !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado;
        const condicion2 = objetoCuadrante.datosBuffer.datosBuffer && objetoCuadrante.datosBuffer.datosBuffer.length > 0;
        const condicion4 = bufferSwitchedDiasFestivosCuadrante.length > 0;        
        if (condicion1) {
            if (condicion2) {
                if (condicion3) {              
                    dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(objetoCuadrante.datosBuffer.datosBuffer));
                    const objFestivos = iterarFestivos(objetoCuadrante.datosBuffer.datosBuffer[cuadranteEnUsoCuadrantes - 1]);                  
                    dispatch(setStateFestivoAccion(objFestivos));
                } else {                    
                    const objFestivos = iterarFestivos(bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]);
                    dispatch(setStateFestivoAccion(objFestivos));
                };
            } else {              
                dispatch(configuraStateFestivoAccion());
            };
        } else {
            if (condicion4) {              
                const objFestivos = iterarFestivos(bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]);
                dispatch(setStateFestivoAccion(objFestivos));
            } else {              
                dispatch(configuraStateFestivoAccion());
            };
        };
    } else if (cuadranteRegistrado === 'no') {
        if (condicion3) {                  
            dispatch(configuraStateFestivoAccion());
        } else {            
            const objFestivos = iterarFestivos(bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1]);
            dispatch(setStateFestivoAccion(objFestivos));
        };
    };
};

const calculoTotalHoras = () => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const informe = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1];
    let objSumatorios = tipoServicio.reduce((acc, curr) => {
        acc[`sumatorioHoras_${curr.prefix}`] = 0;
        return acc;
    }, { sumatorioTotal: 0 });
    if (informe && informe.arrayDatosInforme.length > 0) {
        informe.arrayDatosInforme.forEach((dato, index) => {
            tipoServicio.forEach(servicio => {
                objSumatorios[`sumatorioHoras_${servicio.prefix}`] +=
                    (dato[`totalHorasNormal_${servicio.prefix}`] + dato[`totalHorasExtra_${servicio.prefix}`]);
            });
            objSumatorios[`sumatorioTotal`] += dato.totalHoras;
        });
    };
    return objSumatorios
};

const procesarDatosCuadrantePromesa = (index, noHayRegistro) => (dispatch, getState) => {
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const {
        cuadrante,
        objetoCuadrante,
        cuadranteRegistrado,
        procesoHorasTrabajadores
    } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes, mesConFestivosCompleto } = getState().variablesCuadrantesSetters;
    const { arrayTrabajadores: listadoTrabajadores } = getState().variablesTrabajadores;
    //revisamos que el cuadrante no esté a 0
    const informe = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1];
    const informeIn = objetoCuadrante.datosInforme.datosInforme[index];
    const sumatorioHoras = informe && informe.arrayDatosInforme.length > 0
        ? informe.arrayDatosInforme.reduce((acc, dato) => acc + dato.totalHoras, 0)
        : 0;
    const arrayTrabajadoresInicialesCuadrante = cuadranteRegistrado === 'no'
        ? [...objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales]
        : [];
    let arrayFinalServiciosFijos = [];
    let sumatorioServiciosFijos = 0;
    //modificador: servicios fijos personalizados
    let hayServiciosFijos = false;
    cuadranteServiciosFijos.forEach((servicio) => {
        const { existePrefix } = existePrefixSF(servicio);
        if (existePrefix) {
            tiposServicioFijo.forEach(prefixObj => {
                if (servicio.tipoServiciofijo === prefixObj.value) {
                    if (servicio.totalServicioFijo !== null) {
                        if (mesConFestivosCompleto) {
                            sumatorioServiciosFijos = 0;
                            servicio.totalServicioFijo = 0;
                        } else {
                            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                        };
                    };
                    delete servicio.estados;
                    arrayFinalServiciosFijos.push({ ...servicio });
                    hayServiciosFijos = true;
                };
            });
        } else {
            if (servicio.totalServicioFijo !== null) {
                if (mesConFestivosCompleto) {
                    sumatorioServiciosFijos = 0;
                    servicio.totalServicioFijo = 0;
                } else {
                    sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
                };
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
    });
    if (sumatorioHoras < 1 && !hayServiciosFijos) {
        // detectar que un cuadrante está a 0, deactivado.
        // dispatch(setAlertaAccion({
        //     abierto: true,
        //     mensaje: "El cuadrante no se puede registrar a 0. El trabajador asignado está de baja, añade un suplente o un trabajador para computar o añade servicios extra.",
        //     tipo: 'error'
        // }));
        // return;
    };
    //revisamos que no haya columnas vacías (modificador, si tiene nombre pero está a 0 de horas lo dejamos)
    for (let i = cuadrante.length - 1; i >= 0; --i) {
        if (!cuadrante[i].nombreTrabajador) {
            cuadrante.splice(i, 1);
            informe.arrayDatosInforme.splice(i, 1);
            cuadranteRegistrado === 'no' && (arrayTrabajadoresInicialesCuadrante[index] = null);
        };
    };
    const objSumatorios = dispatch(calculoTotalHoras());
    const objTotalAAFacturar = informeIn && tipoServicio.reduce((acc, curr) => {
        acc[`elTotalAAFacturar_${curr.prefix}`] = informeIn[`totalFacturado_${curr.prefix}`] ?
            parseFloat(informeIn[`totalFacturado_${curr.prefix}`]) : 0;
        return acc;
    }, {
        ...(informeIn.mensualPactadoInicial ? {
            elTotalAAFacturarTotal: parseFloat(informeIn.mensualPactado)
        } : {
            elTotalAAFacturarTotal: parseFloat(informeIn.precioHoraTotal)
        })
    });
    const tieneCuadrante = cuadrante.length !== 0;
    const elObjetoDatosCuadrante = {
        tipoHorarioGeneral: tieneCuadrante ? objetoCuadrante.datosCuadrante.datosCuadrante[index].tipoHorarioGeneral : '',
        arrayCuadrante: tieneCuadrante ? cuadrante : [],
        observaciones: objetoCuadrante.datosCuadrante.datosCuadrante[index].observaciones,
        total: objTotalAAFacturar?.elTotalAAFacturarTotal + sumatorioServiciosFijos
    };
    const elObjetoDatosInforme = tieneCuadrante ? {
        iniciado: informeIn.mensualPactadoInicial ? false : true,
        computo: informeIn.computo,
        excepcion: informeIn.excepcion,
        bloqueado: informeIn.bloqueado,
        mailEnviado: informeIn.mailEnviado,
        tipoRegistro: informeIn.tipoRegistro,
        ...(informeIn.mensualPactadoInicial ? {
            mensualPactado: parseFloat(informeIn.mensualPactado),
            mensualPactadoInicial: parseFloat(informeIn.mensualPactadoInicial),
            proporcion: parseFloat(informeIn.proporcion),
            precioHoraTotal: null
        } : {
            mensualPactado: null,
            mensualPactadoInicial: null,
            proporcion: null,
            precioHoraTotal: parseFloat(informeIn.precioHoraTotal)
        }),
        ...tipoServicio.reduce((acc, curr) => {
            acc[`precioHora_${curr.prefix}`] = informeIn[`precioHora_${curr.prefix}`] ? parseFloat(informeIn[`precioHora_${curr.prefix}`]) : null;
            acc[`totalFacturado_${curr.prefix}`] = informeIn[`precioHora_${curr.prefix}`] ? parseFloat(objTotalAAFacturar[`elTotalAAFacturar_${curr.prefix}`]) : null;
            return acc;
        }, {})
    } : null;
    const elObjetoHoras = tieneCuadrante ?
        tipoServicio.reduce((acc, curr) => {
            objSumatorios[`sumatorioHoras_${curr.prefix}`] && (acc[`${curr.prefix}`] = parseFloat(objSumatorios[`sumatorioHoras_${curr.prefix}`]));
            return acc;
        }, { ...(informeIn.mensualPactado && { M: 1 }) })
        : null;
    const elObjetoServiciosFijos = tieneCuadrante ? (hayServiciosFijos ? arrayFinalServiciosFijos : null) : arrayFinalServiciosFijos;
    //modificador: control horas trabajadores     
    const datosInforme = objetoCuadrante?.datosInforme?.datosInforme;
    if (
        (datosInforme && datosInforme.some(registro => registro !== null) && procesoHorasTrabajadores) ||
        (cuadranteServiciosFijos.length > 0 && procesoHorasTrabajadores)
    ) {
        const centro = objetoCuadrante.nombre.split("-").pop();
        let horasTrabajadoresSF = [];
        if (cuadranteServiciosFijos.length > 0) {
            horasTrabajadoresSF = cuadranteServiciosFijos
                .map(registro => {
                    const { propiedad, existePrefix } = existePrefixSF(registro);
                    const trabajadorClave = Object.keys(registro).find(key => key.startsWith("trab_"));
                    if (registro?.horas && trabajadorClave) {
                        const totalHoras = (registro.horas.reduce((total, current) => total + current.horas, 0) / 60).toFixed(2);
                        const keyHoras = existePrefix
                            ? `totalHorasSF_${registro.tipoServiciofijo}`
                            : `totalHorasSF_${propiedad}_${registro.tipoServiciofijo}`;
                        return {
                            tipo: "trabajadorSF",
                            [keyHoras]: Number(totalHoras),
                            totalHoras: Number(totalHoras),
                            cuadrante: cuadranteEnUsoCuadrantes,
                            centro,
                            trabajadorId: registro[trabajadorClave]
                        };
                    }
                    return null;
                })
                .filter(Boolean);
        };
        const procesado = {
            valor: procesoHorasTrabajadores.cuadrantesProcesados.includes(cuadranteEnUsoCuadrantes),
            cuadrante: cuadranteEnUsoCuadrantes
        };
        const arrayHorasTrabajadores = procesarHorasTrabajadoresAccion(
            datosInforme,
            procesoHorasTrabajadores.horasTrabajadores,
            cuadranteEnUsoCuadrantes,
            listadoTrabajadores,
            centro,
            procesado,
            horasTrabajadoresSF
        );   
        const hayTrabajadoresNull = arrayHorasTrabajadores.some(obj => obj.trabajadorId === 999);      
        if (hayTrabajadoresNull) {
            return {
                error: true
            };
        }
        dispatch(setProcesoHorasTrabajadoresAccion({
            horasTrabajadores: arrayHorasTrabajadores,
            cuadrantesProcesados: procesoHorasTrabajadores.cuadrantesProcesados.includes(cuadranteEnUsoCuadrantes)
                ? procesoHorasTrabajadores.cuadrantesProcesados
                : [...procesoHorasTrabajadores.cuadrantesProcesados, cuadranteEnUsoCuadrantes]
        }));
    };    
    Promise.allSettled([
        dispatch(setTrabajadoresEnCuadranteAccion([])),
        dispatch(setSuplentesEnCuadranteAccion([])),
        dispatch(setEsCambioTraAccion(false)),
        dispatch(setEsCambioSupAccion(false)),
        dispatch(setEsInicioTraAccion(true)),
        dispatch(setEsInicioSupAccion(true))
    ]);
    return ({
        cuadranteDevuelto: elObjetoDatosCuadrante,
        informeDevuelto: elObjetoDatosInforme,
        serviciosFijosDevuelto: elObjetoServiciosFijos,
        horasDevuelto: elObjetoHoras,
        trabajadoresDevuelto: arrayTrabajadoresInicialesCuadrante
    });
};

//modificador: control horas trabajadores 
const procesarHorasTrabajadoresAccion = (
    datosInforme,
    horasTrabajadores,
    cuadranteEnUsoCuadrantes,
    listadoTrabajadores,
    centro,
    procesado,
    horasTrabajadoresSF
) => {
    const nuevosRegistros = [];
    datosInforme.forEach(informe => {
        if (informe?.arrayDatosInforme && informe?.arrayDatosInforme?.length > 0) {
            informe.arrayDatosInforme.forEach(registro => {
                if (registro.totalHoras === 0) {
                    return;
                }
                const registroLimpio = Object.entries(registro).reduce((acc, [key, value]) => {
                    if (key === 'trabajador' || key === 'tipo' || key === 'totalHoras' || (typeof value === 'number' && value !== 0)) {
                        if (key === 'trabajador') {
                            const trabajador = listadoTrabajadores.find(t => t.nombre === value);
                            acc['trabajadorId'] = trabajador ? trabajador.id : 999;
                        } else {
                            acc[key] = typeof acc[key] === 'number' ? Number.isInteger(value) ? value : Number(value).toFixed(2) : value;
                        }
                    }
                    return acc;
                }, {});
                registroLimpio.cuadrante = cuadranteEnUsoCuadrantes;
                registroLimpio.centro = centro;                
                nuevosRegistros.push(registroLimpio);
            });
        }
    });    
    nuevosRegistros.push(...horasTrabajadoresSF);   
    const aplicarReemplazoCondicional = (array) => {
        if (procesado.valor && procesado.cuadrante === cuadranteEnUsoCuadrantes) {
            const registrosNoCoinciden = array.filter(registro => registro.cuadrante !== cuadranteEnUsoCuadrantes);            
            array.length = 0;
            array.push(...registrosNoCoinciden, ...nuevosRegistros);
        } else {           
            array.push(...nuevosRegistros);
        }
    };    
    aplicarReemplazoCondicional(horasTrabajadores);
    aplicarReemplazoCondicional(horasTrabajadoresSF);
    return horasTrabajadores;
};

export const procesarCambioCuadranteAccion = (target) => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const {
        datosCuadrante,
        datosInforme,
        datosServicios,
        horas,
        datosTrabajadoresIniciales
    } = objetoCuadrante;
    const resultado = dispatch(procesarDatosCuadrantePromesa(cuadranteEnUsoCuadrantes - 1, true));
    if (resultado.error) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Falta seleccionar trabajador correspondiente a alguna de las columnas de trabajadores con cómputo de horas.",
            tipo: 'error'
        }));
        return;
    }
    const {
        cuadranteDevuelto,
        informeDevuelto,
        serviciosFijosDevuelto,
        horasDevuelto,
        trabajadoresDevuelto
    } = resultado;
    const losDatosCuadrante = {
        ...datosCuadrante,
        datosCuadrante: [
            ...datosCuadrante.datosCuadrante.slice(0, cuadranteEnUsoCuadrantes - 1),
            cuadranteDevuelto,
            ...datosCuadrante.datosCuadrante.slice(cuadranteEnUsoCuadrantes),
        ],
    };
    const losDatosInforme = {
        ...datosInforme,
        datosInforme: [
            ...datosInforme.datosInforme.slice(0, cuadranteEnUsoCuadrantes - 1),
            informeDevuelto,
            ...datosInforme.datosInforme.slice(cuadranteEnUsoCuadrantes),
        ],
    };
    const losDatosServiciosFijos = {
        ...datosServicios,
        datosServicios: [
            ...datosServicios.datosServicios.slice(0, cuadranteEnUsoCuadrantes - 1),
            serviciosFijosDevuelto,
            ...datosServicios.datosServicios.slice(cuadranteEnUsoCuadrantes),
        ],
    };
    const losDatosHoras = {
        ...horas,
        horas: [
            ...horas.horas.slice(0, cuadranteEnUsoCuadrantes - 1),
            horasDevuelto,
            ...horas.horas.slice(cuadranteEnUsoCuadrantes),
        ],
    };
    const losDatosTrabajadores = {
        ...datosTrabajadoresIniciales,
        datosTrabajadoresIniciales: trabajadoresDevuelto,
    };
    Promise.allSettled([
        dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(true)),
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            datosCuadrante: losDatosCuadrante,
            datosInforme: losDatosInforme,
            datosServicios: losDatosServiciosFijos,
            horas: losDatosHoras,
            datosTrabajadoresIniciales: losDatosTrabajadores
        })),
        dispatch(reseteaContenidoCentroAccion(true)),
        dispatch(setCuadranteEnUsoCuadrantesAccion(target)),
        dispatch(gestionaCuadranteIndividualAccion(target, true)),
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, target - 1))
    ]);
};

export const procesarDatosCuadranteAccion = (source) => (dispatch, getState) => {
    const { cuadranteRegistrado, objetoCuadrante } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes, bufferSwitchedDiasFestivosCuadrante } = getState().variablesCuadrantesSetters;
    dispatch(handleCloseMenuAccion());
    //revisamos que no sea cuadrante múltiple
    if (cuadranteRegistrado === 'no') {
        const faltanPorRevisar = numeroCuadrantesCuadrantes.some((cuadrante, index) =>
            index !== cuadranteEnUsoCuadrantes - 1 && !cuadrante.revisado
        );
        if (faltanPorRevisar) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Los centros no registrados con más de un cuadrante deben revisarse todos para computar y poder registrar.",
                tipo: 'error'
            }));
            return;
        };
    };
    //firmamos   
    const laFirmaActualizacion = dispatch(obtenerFirmaActualizacion());
    const todosRevisados = numeroCuadrantesCuadrantes.every(cuadrante => cuadrante.revisado);
    const losDatosBuffer = bufferSwitchedDiasFestivosCuadrante.length > 0 ?
        { ...objetoCuadrante.datosBuffer, datosBuffer: bufferSwitchedDiasFestivosCuadrante } :
        null;
    let elArrayDatosCuadrante = [...objetoCuadrante.datosCuadrante.datosCuadrante];
    let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
    let elArrayDatosServiciosFijos = [...objetoCuadrante.datosServicios.datosServicios];
    let elArrayHoras = [...objetoCuadrante.horas.horas];
    let losDatosCuadrante = {};
    let losDatosInforme = {};
    let losDatosServiciosFijos = {};
    let losDatosHoras = {};
    if (!todosRevisados) {
        const resultado = dispatch(procesarDatosCuadrantePromesa(cuadranteEnUsoCuadrantes - 1, false));
        if (resultado.error) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Falta seleccionar trabajador correspondiente a alguna de las columnas de trabajadores con cómputo de horas.",
                tipo: 'error'
            }));
            return;
        }
        const {
            cuadranteDevuelto,
            informeDevuelto,
            serviciosFijosDevuelto,
            horasDevuelto,
        } = resultado;
        elArrayDatosCuadrante[cuadranteEnUsoCuadrantes - 1] = cuadranteDevuelto;
        elArrayDatosInforme[cuadranteEnUsoCuadrantes - 1] = informeDevuelto;
        elArrayDatosServiciosFijos[cuadranteEnUsoCuadrantes - 1] = serviciosFijosDevuelto;
        elArrayHoras[cuadranteEnUsoCuadrantes - 1] = horasDevuelto;
        losDatosCuadrante = {
            ...objetoCuadrante.datosCuadrante,
            datosCuadrante: elArrayDatosCuadrante
        };
        losDatosInforme = {
            ...objetoCuadrante.datosInforme,
            datosInforme: elArrayDatosInforme
        };
        losDatosServiciosFijos = {
            ...objetoCuadrante.datosServicios,
            datosServicios: elArrayDatosServiciosFijos
        };
        losDatosHoras = {
            ...objetoCuadrante.horas,
            horas: elArrayHoras
        };
        dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(true));
        dispatch(finalizaRegistroCuadrante(
            source,
            true,
            laFirmaActualizacion,
            losDatosCuadrante,
            losDatosInforme,
            losDatosServiciosFijos,
            losDatosHoras,
            losDatosBuffer
        ));
    } else {
        losDatosCuadrante = {
            ...objetoCuadrante.datosCuadrante,
            datosCuadrante: elArrayDatosCuadrante
        };
        losDatosInforme = {
            ...objetoCuadrante.datosInforme,
            datosInforme: elArrayDatosInforme
        };
        losDatosServiciosFijos = {
            ...objetoCuadrante.datosServicios,
            datosServicios: elArrayDatosServiciosFijos
        };
        losDatosHoras = {
            ...objetoCuadrante.horas,
            horas: elArrayHoras
        };
        dispatch(finalizaRegistroCuadrante(
            source,
            false,
            laFirmaActualizacion,
            losDatosCuadrante,
            losDatosInforme,
            losDatosServiciosFijos,
            losDatosHoras,
            losDatosBuffer
        ));
    };
};

const calculoTotales = (servicios, informes, horas) => (dispatch, getState) => {
    const { objetoCuadrante, totalesPeriodicos } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    const reseteaObjGeneral = () => {
        const inicializarPropiedades = (acc, prefix, propiedades) => {
            propiedades.forEach(propiedad => {
                acc[`${propiedad}_${prefix}`] = 0;
            });
            return acc;
        };
        const serviciosAplanados = servicios.filter(arr => arr !== null).flat();
        const objServiciosFijosPersonalizados = serviciosAplanados.reduce((acc, servicio) => {
            const { propiedad, existePrefix } = existePrefixSF(servicio);
            if (!existePrefix) {
                acc = inicializarPropiedades(acc, propiedad, ['totalFacturado', 'totalHoras']);
            }
            return acc;
        }, {});
        return {
            ...tipoServicio.reduce((acc, curr) => inicializarPropiedades(acc, curr.prefix, ['totalFacturado', 'totalHoras', 'precio']), {}),
            ...tiposServicioFijo.reduce((acc, curr) => inicializarPropiedades(acc, curr.prefix, ['totalFacturado', 'totalHoras']), {
                totalFacturado_M: 0
            }),
            ...objServiciosFijosPersonalizados
        };
    };
    let objGeneral = reseteaObjGeneral();
    //control seguretat 
    let vueltasSeguridad = 0;
    let numeroInformes = 0;
    let iteracionExitosa = false;
    const verificarIteracionCompleja = () => {
        if (informes.length >= 2) {
            //verificar que hi ha algun mensualPactado, si no hi ha cap retorna array buit pq si no dona error
            const informesMensualPactado = informes.every(objeto => objeto && 'mensualPactado' in objeto) ? informes.filter(objeto => objeto.mensualPactado > 0) : [];
            if (informesMensualPactado.length >= 2) {
                //2 quadrants amb mensual pactat
                const propiedadesPriCond = tipoServicio.map(objServ => `totalFacturado_${objServ.prefix}`);
                for (let i = 0; i < informesMensualPactado.length - 1; i++) {
                    const primerObjeto = informesMensualPactado[i];
                    for (let j = i + 1; j < informesMensualPactado.length; j++) {
                        const segundoObjeto = informesMensualPactado[j];
                        //condicionPrimera = verificar si quadrant és doble i té mensual pactat als 2 i serveis diferents
                        const cumpleCondicionPrimera = propiedadesPriCond.some(propiedad =>
                            (primerObjeto[propiedad] === null && segundoObjeto[propiedad] !== null) ||
                            (primerObjeto[propiedad] !== null && segundoObjeto[propiedad] === null)
                        );
                        if (cumpleCondicionPrimera) {
                            return "primera";
                        };
                    };
                };
            } else if (informesMensualPactado.length === 1) {
                const computosCuadrantes = informes.map(obj => obj.computo);
                if (computosCuadrantes.includes(2) || computosCuadrantes.includes(3)) {
                    //1 quadrant amb mensual pactat i l'altre precio/hora o gestion especial horas
                    const propiedadesSegCond = tipoServicio.map(objServ => `precioHora_${objServ.prefix}`);
                    const primerObjeto = informesMensualPactado[0];
                    const segundoObjeto = informes.find(informe => informe.mensualPactado === null);
                    //condicionPrimera = verificar si quadrant és doble i té 1 mensual pactat, 1 precio/hora i mateixos serveis
                    const cumpleCondicionSegunda = propiedadesSegCond.some(propiedad =>
                        primerObjeto[propiedad] !== null && segundoObjeto[propiedad] !== null
                    );
                    if (cumpleCondicionSegunda) {
                        return "segunda";
                    };
                } else if (computosCuadrantes.includes(4)) {
                    //1 quadrant amb mensual pactat i l'altre sin coste
                    return false;
                };
            } else {
                return false;
            };
        };
        return false;
    };
    const iteracionCompleja = verificarIteracionCompleja();
    while (!iteracionExitosa) {
        informes.forEach((informe, index) => {
            numeroInformes += 1;
            if (informe) {
                vueltasSeguridad += 1;
                if (informe.mensualPactado) {
                    if (iteracionCompleja === "primera" || iteracionCompleja === "segunda") {
                        const servicio = tipoServicio.find(objServ => horas[index][objServ.prefix])?.prefix;
                        objGeneral[`totalFacturado_M${index}${servicio}`] = informe.mensualPactado;
                    } else {
                        objGeneral.totalFacturado_M += informe.mensualPactado;
                    };
                    tipoServicio.forEach(objServ => {
                        if (horas[index][objServ.prefix]) {
                            if (iteracionCompleja === "primera" || !iteracionCompleja) {
                                objGeneral[`totalHoras_${objServ.prefix}`] += horas[index][objServ.prefix];
                            };
                        };
                    });
                } else {
                    tipoServicio.forEach(objServ => {
                        if (informe[`precioHora_${objServ.prefix}`]) {
                            objGeneral[`totalFacturado_${objServ.prefix}`] += informe[`totalFacturado_${objServ.prefix}`]
                            horas[index][objServ.prefix] ? objGeneral[`totalHoras_${objServ.prefix}`] += horas[index][objServ.prefix] : objGeneral[`totalHoras_${objServ.prefix}`] = objGeneral[`totalHoras_${objServ.prefix}`];
                            objGeneral[`precio_${objServ.prefix}`] = informe[`precioHora_${objServ.prefix}`];
                        };
                    });
                };
            } else {
                numeroInformes -= 1;
            };
        });
        if (numeroInformes === vueltasSeguridad) {
            iteracionExitosa = true;
        } else {
            objGeneral = reseteaObjGeneral();
        };
    };
    servicios.flatMap(servicioTot => servicioTot || []).forEach(servicio => {
        if (!servicio) return;
        const { propiedad, existePrefix } = existePrefixSF(servicio);
        const calcularTotales = (prefix, totalServicioFijo, precioHora) => {
            objGeneral[`totalFacturado_${prefix}`] += Number(totalServicioFijo);
            objGeneral[`totalHoras_${prefix}`] = precioHora
                ? parseInt(objGeneral[`totalFacturado_${prefix}`] / precioHora)
                : 0;
            if (objGeneral[`totalFacturado_${prefix}`] === precioHora) {
                objGeneral[`totalHoras_${prefix}`] = 1;
            }
        };
        if (existePrefix) {
            tiposServicioFijo.forEach(({ prefix }) => {
                const precioHora = servicio[`precioHora_${prefix}`];
                if (precioHora) {
                    calcularTotales(prefix, servicio.totalServicioFijo, precioHora);
                }
            });
        } else {
            const precioHora = servicio[`precioHora_${propiedad}`];
            if (precioHora) {
                calcularTotales(propiedad, servicio.totalServicioFijo, precioHora);
            }
        }
    });
    const objetoTotales = {
        nombreCentro: objetoCuadrante.datosCuadrante.nombreCentro,
        subNombreCentro: objetoCuadrante.datosCuadrante.subNombreCentro,
        codigo: objetoCuadrante.datosCuadrante.codigo,
        domicilio: objetoCuadrante.datosCuadrante.domicilio,
        codigoPostal: objetoCuadrante.datosCuadrante.codigoPostal,
        poblacion: objetoCuadrante.datosCuadrante.poblacion,
        provincia: objetoCuadrante.datosCuadrante.provincia,
        nif: objetoCuadrante.datosCuadrante.nif,
        formaPago: objetoCuadrante.datosCuadrante.formaPago,
        telefono: objetoCuadrante.datosCuadrante.telefono,
        mail: objetoCuadrante.datosCuadrante.mail,
        mail2: objetoCuadrante.datosCuadrante.mail2,
        diaPago: objetoCuadrante.datosCuadrante.diaPago,
        tocaFacturar: objetoCuadrante.datosInforme.tocaFacturar,
        mailEnviado: objetoCuadrante.datosInforme.mailEnviado
    };
    if (iteracionCompleja === "primera" || iteracionCompleja === "segunda") {
        for (let i = 0; i <= informes.length - 1; i++) {
            tipoServicio.forEach(objServ => {
                if (objGeneral[`totalFacturado_M${i}${objServ.prefix}`]) {
                    objetoTotales[`M${i}${objServ.prefix}T`] = objGeneral[`totalFacturado_M${i}${objServ.prefix}`];
                };
                if (objGeneral[`totalHoras_${objServ.prefix}`]) {
                    objetoTotales[`${objServ.prefix}H`] = objGeneral[`totalHoras_${objServ.prefix}`];
                };
            });
        };
    } else {
        if (objGeneral.totalFacturado_M > 0) {
            objetoTotales['MT'] = objGeneral.totalFacturado_M;
            tipoServicio.forEach(objServ => {
                if (objGeneral[`totalHoras_${objServ.prefix}`]) {
                    objetoTotales[`${objServ.prefix}H`] = objGeneral[`totalHoras_${objServ.prefix}`];
                };
            });
        };
    };
    tipoServicio.forEach(objServ => {
        if (objGeneral[`totalFacturado_${objServ.prefix}`] > 0) {
            objetoTotales[`${objServ.prefix}T`] = objGeneral[`totalFacturado_${objServ.prefix}`];
            objetoTotales[`${objServ.prefix}H`] = objGeneral[`totalHoras_${objServ.prefix}`];
            objetoTotales[`${objServ.prefix}Pr`] = objGeneral[`precio_${objServ.prefix}`];
        };
    });
    servicios.flatMap(servicioTot => servicioTot || []).forEach(servicio => {
        if (!servicio) return;
        const { propiedad, existePrefix } = existePrefixSF(servicio);
        if (existePrefix) {
            tiposServicioFijo.forEach(objServ => {
                if (objGeneral[`totalFacturado_${objServ.prefix}`] > 0) {
                    objetoTotales[`${objServ.prefix}T`] = objGeneral[`totalFacturado_${objServ.prefix}`];
                    objetoTotales[`${objServ.prefix}H`] = objGeneral[`totalHoras_${objServ.prefix}`];
                };
            });
        } else {
            if (objGeneral[`totalFacturado_${propiedad}`] > 0) {
                objetoTotales[`${propiedad}T`] = Number(objGeneral[`totalFacturado_${propiedad}`]);
                objetoTotales[`${propiedad}H`] = objGeneral[`totalHoras_${propiedad}`];
                objetoTotales[`${propiedad}N`] = servicio[`tipoServiciofijo`];
            };
        };
    });
    if (objetoCentro.activoNumCuenta === 'si') {
        objetoTotales['NUMCT'] = 1;
    };
    objetoTotales['total'] = Object.keys(objGeneral)
        .filter(key => key.startsWith('totalFacturado_'))
        .reduce((total, key) => total + objGeneral[key], 0);
    objetoTotales['procesado'] = {
        valor: 'no',
        numR: null,
        numF: null
    };
    if ((objetoCentro.tempPago === 'bimensual' || objetoCentro.tempPago === 'trimestral') && objetoCuadrante.datosInforme.tocaFacturar.valor === 'si') {
        if (totalesPeriodicos.noExisteCuadrante) {
            objetoTotales['totalesPeriodicos'] = totalesPeriodicos;
        } else {
            objetoTotales['total'] = parseFloat(objetoTotales['total']) + parseFloat(totalesPeriodicos.total);
            objetoTotales['totalesPeriodicos'] = totalesPeriodicos;
            if (totalesPeriodicos.totalesServicios.MT) {
                if (objetoTotales['MT']) {
                    objetoTotales['MT'] += totalesPeriodicos.totalesServicios.MT;
                } else {
                    objetoTotales['MT'] = totalesPeriodicos.totalesServicios.MT;
                }
            };
            tipoServicio.forEach(objServ => {
                if (totalesPeriodicos.totalesServicios && Object.keys(totalesPeriodicos.totalesServicios).length > 0) {
                    if (totalesPeriodicos.totalesServicios[`${objServ.prefix}H`]) {
                        if (objetoTotales[`${objServ.prefix}H`]) {
                            objetoTotales[`${objServ.prefix}H`] += totalesPeriodicos.totalesServicios[`${objServ.prefix}H`];
                        } else {
                            objetoTotales[`${objServ.prefix}H`] = totalesPeriodicos.totalesServicios[`${objServ.prefix}H`];
                        }
                    }
                    if (totalesPeriodicos.totalesServicios[`${objServ.prefix}T`]) {
                        if (objetoTotales[`${objServ.prefix}T`]) {
                            objetoTotales[`${objServ.prefix}T`] += totalesPeriodicos.totalesServicios[`${objServ.prefix}T`];
                        } else {
                            objetoTotales[`${objServ.prefix}T`] = totalesPeriodicos.totalesServicios[`${objServ.prefix}T`];
                        }
                    }
                }
            });
            if (totalesPeriodicos.totalesServiciosFijos && Object.keys(totalesPeriodicos.totalesServiciosFijos).length > 0) {
                Object.entries(totalesPeriodicos.totalesServiciosFijos).map(([clave, valor]) => {
                    if (objetoTotales.hasOwnProperty(clave)) {
                        objetoTotales[clave] += valor;
                    } else {
                        objetoTotales[clave] = valor;
                    }
                    const claveHoras = clave.slice(0, -1) + 'H';
                    objetoTotales[claveHoras] = 1;
                });
            }
            if (totalesPeriodicos.totalesServiciosFijos.NUMCT) {
                if (objetoTotales['NUMCT']) {
                    objetoTotales['NUMCT'] = totalesPeriodicos.totalesServiciosFijos.NUMCT;
                } else {
                    objetoTotales['NUMCT'] = totalesPeriodicos.totalesServiciosFijos.NUMCT;
                };
            };
        };
    };
    objetoTotales['totalMasIva'] = ((parseFloat(objetoTotales['total']) * 21) / 100) + parseFloat(objetoTotales['total']);
    objetoTotales['totalIva'] = ((parseFloat(objetoTotales['total']) * 21) / 100);
    return objetoTotales
};

const retornaMesReciboLetra = () => (dispatch, getState) => {
    const { calendarioAGestionar } = getState().variablesCuadrantes;
    const myCalendarioSplitted = calendarioAGestionar.split("-");
    switch (parseInt(myCalendarioSplitted[1])) {
        case 1:
            return ' MES DE ENERO'
            break;
        case 2:
            return ' MES DE FEBRERO'
            break;
        case 3:
            return ' MES DE MARZO'
            break;
        case 4:
            return ' MES DE ABRIL'
            break;
        case 5:
            return ' MES DE MAYO'
            break;
        case 6:
            return ' MES DE JUNIO'
            break;
        case 7:
            return ' MES DE JULIO'
            break;
        case 8:
            return ' MES DE AGOSTO'
            break;
        case 9:
            return ' MES DE SEPTIEMBRE'
            break;
        case 10:
            return ' MES DE OCTUBRE'
            break;
        case 11:
            return ' MES DE NOVIEMBRE'
            break;
        case 12:
            return ' MES DE DICIEMBRE'
            break;
        default:
    };
};

//modificador: control horas trabajadores 
const procesarHorasTrabajadores = (objetoCuadrante, procesoHorasTrabajadores, laFirmaActualizacion, trabajadoresInicio) => {
    const centro = objetoCuadrante.nombre.split("-").pop();
    const [anyo, mes] = objetoCuadrante.nombre.split("-");
    const mesAnyo = `${anyo}-${mes}`;
    const trabajadoresMap = {};
    procesoHorasTrabajadores.horasTrabajadores.forEach(trabajador => {
        const { trabajadorId, ...datosHoraTrabajador } = trabajador;
        if (!trabajadoresMap[trabajadorId]) {
            trabajadoresMap[trabajadorId] = {
                nombre: `${mesAnyo}-${trabajadorId}`,
                actualizacion: laFirmaActualizacion,
                trabajador_id: trabajadorId,
                datos_hora_trabajador: { ...datosHoraTrabajador },
            };
        } else {
            //treballador duplicat
            const registroExistente = trabajadoresMap[trabajadorId].datos_hora_trabajador;
            if (registroExistente.cuadrante !== datosHoraTrabajador.cuadrante) {
                registroExistente.cuadrante = `${registroExistente.cuadrante}-${datosHoraTrabajador.cuadrante}`;
            }
            if (registroExistente.tipo !== datosHoraTrabajador.tipo) {
                registroExistente.tipo = `${registroExistente.tipo}-${datosHoraTrabajador.tipo}`;
            }
            for (let key in datosHoraTrabajador) {
                if (key.startsWith('totalHorasNormal_') || key.startsWith('totalHorasExtra_') || key.startsWith('totalHorasSF_')) {
                    registroExistente[key] = (registroExistente[key] || 0) + datosHoraTrabajador[key];
                }
            }
            registroExistente.totalHoras += datosHoraTrabajador.totalHoras;
        }
    });
    //modificador: control horas trabajadores; comprobació final registres esborrats
    const trabajadoresGestionados = Object.values(trabajadoresMap);
    const idsGestionados = new Set(trabajadoresGestionados.map(t => t.trabajador_id));
    const arrIdsNoCoincidentes = trabajadoresInicio
        .filter(id => !idsGestionados.has(id))
        .map(id => ({
            nombre: `${mesAnyo}-${id}`,
            actualizacion: laFirmaActualizacion,
            trabajador_id: id,
            datos_hora_trabajador: { centro, totalHoras: 0 }
        }));
    trabajadoresGestionados.push(...arrIdsNoCoincidentes);
    return trabajadoresGestionados;
};

const finalizaRegistroCuadrante = (
    source,
    faltaActualizar,
    laFirmaActualizacion,
    losDatosCuadrante,
    losDatosInforme,
    losDatosServiciosFijos,
    losDatosHoras,
    losDatosBuffer
) => (dispatch, getState) => {
    const { objetoCuadrante, cuadranteRegistrado, procesoHorasTrabajadores } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const { trabajadoresInicio } = getState().variablesHorasTrabajadores;
    //modificador: control horas trabajadores       
    const horasTrabajadoresRegistro = procesarHorasTrabajadores(objetoCuadrante, procesoHorasTrabajadores, laFirmaActualizacion, trabajadoresInicio);
    let elArrayDatosCuadranteLimpiado = [];
    losDatosCuadrante.datosCuadrante.forEach((cuadranteIterado) => {
        elArrayDatosCuadranteLimpiado.push({
            ...cuadranteIterado,
            arrayCuadrante: dispatch(limpiarCuadranteAccion(cuadranteIterado.arrayCuadrante))
        });
    });
    const losDatosCuadranteLimpiado = {
        ...losDatosCuadrante,
        datosCuadrante: elArrayDatosCuadranteLimpiado
    };
    let losDatosTotales = dispatch(calculoTotales(losDatosServiciosFijos.datosServicios, losDatosInforme.datosInforme, losDatosHoras.horas));
    dispatch(setFirmaActualizacionAccion(laFirmaActualizacion));
    if (parseFloat(losDatosTotales.total) === 0) {
        losDatosInforme = {
            ...losDatosInforme,
            tocaFacturar: {
                valor: 'no',
                razon: 'a0'
            }
        };
        losDatosTotales = {
            ...losDatosTotales,
            tocaFacturar: {
                valor: 'no',
                razon: 'a0'
            }
        };
    } else {
        if (losDatosInforme.tocaFacturar.valor === 'no' && losDatosInforme.tocaFacturar.razon === 'a0') {
            losDatosInforme = {
                ...losDatosInforme,
                tocaFacturar: {
                    valor: 'si',
                    razon: ''
                }
            };
            losDatosTotales = {
                ...losDatosTotales,
                tocaFacturar: {
                    valor: 'si',
                    razon: ''
                }
            };
        };
    };
    losDatosInforme = {
        ...losDatosInforme,
        datosGestionEsp: null
    };
    if (losDatosInforme.tocaFacturar.valor === 'no' && losDatosInforme.tocaFacturar.razon === 'gest' && source === 'informe') {
        losDatosInforme = {
            ...losDatosInforme,
            datosGestionEsp: {
                totalLetra: numeroALetras(parseFloat(losDatosTotales.total).toFixed(2)),
                centro: objetoCuadrante.datosCuadrante.nombreCentro,
                concepto: dispatch(retornaTextoConceptoServicioAccion(losDatosTotales, null, null, null)) + dispatch(retornaMesReciboLetra()),
                total: parseFloat(losDatosTotales.total).toFixed(2)
            }
        };
    };
    const losDatosInformeLimpiado = {
        ...losDatosInforme,
        datosInforme: []
    };
    losDatosInforme.datosInforme.forEach((informeIterado) => {
        if (informeIterado) {
            losDatosInformeLimpiado.datosInforme.push(dispatch(limpiarCuadranteInformeAccion(informeIterado)));
        } else {
            losDatosInformeLimpiado.datosInforme.push(null);
        };
    });
    const options = { fullPrecisionFloats: true };
    const cuadranteAGuardar = {
        id: objetoCuadrante.id,
        nombre: objetoCuadrante.nombre,
        actualizacion: laFirmaActualizacion,
        datos_cuadrante: stringify(losDatosCuadranteLimpiado, options),
        datos_servicios: stringify(losDatosServiciosFijos, options),
        datos_informe: stringify(losDatosInformeLimpiado, options),
        datos_buffer: losDatosBuffer ? stringify(losDatosBuffer, options) : null,
        estado: source === 'informe' ? 'facturado' : objetoCuadrante.estado,
        total: stringify(losDatosTotales, options),
        horas: stringify(losDatosHoras, options)
    };
    if (source !== 'informe') {
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            actualizacion: laFirmaActualizacion,
            datosCuadrante: losDatosCuadrante,
            datosInforme: losDatosInforme,
            datosServicios: losDatosServiciosFijos,
            datosBuffer: losDatosBuffer ? losDatosBuffer : objetoCuadrante.datosBuffer,
            horas: losDatosHoras,
            total: losDatosTotales
        }));
    } else {
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            actualizacion: laFirmaActualizacion,
            datosCuadrante: losDatosCuadrante,
            datosInforme: losDatosInforme,
            datosServicios: losDatosServiciosFijos,
            datosBuffer: losDatosBuffer ? losDatosBuffer : objetoCuadrante.datosBuffer,
            horas: losDatosHoras,
            estado: 'facturado',
            total: losDatosTotales
        }));
    };
    if (cuadranteRegistrado === 'no') {     
        dispatch(
            registrarCuadranteAccion(
                'cuadrantes',
                cuadranteAGuardar.id,
                cuadranteAGuardar,
                horasTrabajadoresRegistro.length === 0 ? null : horasTrabajadoresRegistro
            )
        );
        dispatch(cambiarACuadranteRegistradoAccion());
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        //dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(cuadranteEnUsoCuadrantes));
        dispatch(reseteaContenidoCentroAccion(true));
        //esborrat perquè ja es fa al useEffect de CaudranteCompleto.jsx
        //dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, cuadranteEnUsoCuadrantes - 1));
    };
    if (cuadranteRegistrado === 'si') {
        if (source === 'informe') {
            dispatch(setControladorDeEstadoAccion('venimosDeInforme'));
        };
        dispatch(
            actualizarCuadranteAccion(
                'cuadrantes',
                cuadranteAGuardar.id,
                cuadranteAGuardar,
                true,
                horasTrabajadoresRegistro.length === 0 ? null : horasTrabajadoresRegistro
            )
        );
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        //dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(cuadranteEnUsoCuadrantes));
        dispatch(reseteaContenidoCentroAccion(true));
        dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, cuadranteEnUsoCuadrantes - 1));
    };
    dispatch(registrarIntervencionAccion(true));
};

const obtenerFirmaActualizacion = () => (dispatch, getState) => {
    const { usuarioActivo } = getState().variablesUsuario;
    const fechaHoy = new Date().toLocaleString();
    const laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
    return laFirmaActualizacion;
};

export const gestionarDocumentosCuadranteAccion = (origen, numeroDocumento) => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes, numeroFactusol } = getState().variablesCuadrantesSetters;
    //firmamos   
    const laFirmaActualizacion = dispatch(obtenerFirmaActualizacion());
    dispatch(setFirmaActualizacionAccion(laFirmaActualizacion));
    if (objetoCuadrante.total.procesado.valor === 'no') {
        let objetoTotales = {
            ...objetoCuadrante.total,
            procesado: {
                valor: 'si',
                numR: origen === 'recibo' ? numeroDocumento : null,
                numF: origen === 'factura' ? parseInt(numeroFactusol) + 1 : null
            }
        };
        const options = { fullPrecisionFloats: true };
        const cuadranteAGuardar = {
            id: objetoCuadrante.id,
            nombre: objetoCuadrante.nombre,
            actualizacion: laFirmaActualizacion,
            datos_cuadrante: stringify(objetoCuadrante.datosCuadrante, options),
            datos_servicios: stringify(objetoCuadrante.datosServicios, options),
            datos_informe: stringify(objetoCuadrante.datosInforme, options),
            datos_buffer: objetoCuadrante.datosBuffer ? stringify(objetoCuadrante.datosBuffer, options) : null,
            estado: 'facturado',
            total: stringify(objetoTotales, options),
            horas: stringify(objetoCuadrante.horas, options)
        };
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            total: objetoTotales
        }));
        dispatch(setControladorDeEstadoAccion('venimosDeInforme'));
        dispatch(actualizarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar, true, null));
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        //dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(cuadranteEnUsoCuadrantes));
        dispatch(reseteaContenidoCentroAccion(true));
        dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, cuadranteEnUsoCuadrantes - 1));
        dispatch(registrarIntervencionAccion(true));
    };
};

export const handleGenerarArchivosAccion = () => (dispatch, getState) => {
    const { numeroFactusol } = getState().variablesCuadrantesSetters;
    const { objetoCuadrante } = getState().variablesCuadrantes;
    if (!numeroFactusol) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Debes introducir el último número de factura emitida en FACTUSOL para generar los archivos.",
            tipo: 'error'
        }));
        return;
    };
    if (!objetoCuadrante.total.codigo) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "El centro no dispone de un código Factusol. No puede generarse la factura.",
            tipo: 'error'
        }));
        return;
    };
    const [anyo, mes] = objetoCuadrante.nombre.split("-");
    dispatch(generarArchivosXLSAccion(numeroFactusol, objetoCuadrante.total, anyo, mes));
    dispatch(gestionarDocumentosCuadranteAccion('factura', null));
    dispatch(handleCloseMenuAccion());
};

export const resetPorCambioSecuenciaAccion = () => (dispatch, getState) => {
    const { cuadrante } = getState().variablesCuadrantes;
    if (cuadrante.length > 0) {
        cuadrante.forEach((trabajadorIterado, index) => {
            setTimeout(
                function () {
                    dispatch(handleActualizarTrabajadoresAccion(index, trabajadorIterado.tipoTrabajador, trabajadorIterado.idTrabajador))
                }, index * 1000);
        });
        setTimeout(() => {
            dispatch(setDisableCargandoAccion(false));
        }, (cuadrante.length * 1000) + 1000);
    };
};



