import Constantes from "../constantes";
import {
    setCuadranteServiciosFijosAccion,
    setLosServiciosFijosAccion,
    setStateSwitchTipoServicioFijoCuadranteAccion,
    setItemEditandoServiciosFijosAccion
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
    actualizarCuadranteAccion
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
    obtenerNumeroRecibosAccion,
    registrarIntervencionAccion,
    actualizarNumeroRecibosAccion,
    generarArchivosXLSAccion
} from '../redux/appDucks';
import {
    gestionaColumnaServiciosFijosInicioAccion
} from './logicaServiciosFijos';
import {
    gestionaColumnaCuadranteAccion,
    completarCuadranteAccion,
    limpiarCuadranteAccion
} from './logicaColumnasCuadrantes';
import { limpiarCuadranteInformeAccion } from './logicaInformeCuadrantes';
import { stringify } from 'zipson';

const {
    TIPO_SERVICIO_FIJO: listadoServiciosFijos,
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

const obtenerDatosGestionEspecialAccion = () => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { objetoCuadrante } = getState().variablesCuadrantes;
    if (objetoCuadrante.total && objetoCuadrante.total.procesado && !objetoCuadrante.total.procesado.numR) {
        if ((objetoCentro.horario.horario[0] && parseInt(objetoCentro.horario.horario[0].computo) === 3) || objetoCentro.serviciosFijos.gestionEspSF) {
            dispatch(obtenerNumeroRecibosAccion('configuracion'));
        };
    };
};

export const centroAGestionarInicioAccion = () => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { cuadranteRegistrado, objetoCuadrante, calendarioAGestionar } = getState().variablesCuadrantes;
    const { numeroRecibos } = getState().variablesApp;
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
            const objetoRetornoDatosGestionEspecial = numeroRecibos ? { numeroRecibos, cantidadTexto: '' } : null;
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
                    datosCuadrante: arrayHorario
                },
                datosServicios: {
                    objeto: 'serviciosFijos',
                    datosServicios: arrayServiciosFijos,
                    bloqueado: arrayBloqueoServiciosFijos
                },
                datosInforme: {
                    objeto: 'informe',
                    tocaFacturar: dispatch(calculaTocaFacturacionAccion()),
                    datosInforme: arrayInforme
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
    let objetoRetornoCalculo = {};
    if (objetoCentro.tempPago === 'bimensual' && (mes % 2 === 1)) {
        objetoRetornoCalculo = { valor: 'no', razon: 'temp' };
    } else if (objetoCentro.tempPago === 'bimensual' && (mes % 2 === 0)) {
        objetoRetornoCalculo = { valor: 'si', razon: '' };
        if (!totalesPeriodicos.total) {
            dispatch(obtenerCuadrantesPeriodicosAccion('cuadrantes', calendarioAGestionar, 'bimensual', objetoCentro.id));
        };
    } else if (objetoCentro.tempPago === 'trimestral' && (mes % 3 !== 0)) {
        objetoRetornoCalculo = { valor: 'no', razon: 'temp' };
    } else if (objetoCentro.tempPago === 'trimestral' && (mes % 3 === 0)) {
        objetoRetornoCalculo = { valor: 'si', razon: '' };
        if (!totalesPeriodicos.total) {
            dispatch(obtenerCuadrantesPeriodicosAccion('cuadrantes', calendarioAGestionar, 'trimestral', objetoCentro.id));
        };
    } else if ((objetoCentro.horario.horario[0] && objetoCentro.horario.horario[0].computo === 3) || objetoCentro.serviciosFijos.gestionEspSF) {
        objetoRetornoCalculo = { valor: 'no', razon: 'gest' };
    } else {
        objetoRetornoCalculo = { valor: 'si', razon: '' };
    };
    return objetoRetornoCalculo
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
    listadoServiciosFijos.forEach(prefixObj => {
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
            listadoServiciosFijos.forEach(prefixObj => {
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
    const obtenElementoTrabajadorInicio = async (trabajadorIterado, index, arrayControl) => {
        return new Promise((resolve) => {
            if (trabajadorIterado['trabajador_' + (index + 1)]) {
                dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado['trabajador_' + (index + 1)])).then(({ trabajador }) => {
                    if (!arrayControl.includes(trabajador.id)) {
                        dispatch(gestionTrabajadorAccion(trabajador)).then(({ payload }) => {
                            arrayControl.push(trabajador.id);
                            if (payload) {
                                if (trabajadorIterado['suplente_' + (index + 1)]) {
                                    dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado['suplente_' + (index + 1)])).then(({ suplente }) => {
                                        if (suplente.id === 999) {
                                            dispatch(gestionSuplenteAccion(suplente)).then(({ payload }) => {
                                                arrayControl.push(suplente.id);
                                                if (payload) {
                                                    resolve({ payload: { trab: "trabajadorIterado", arrayControl } });
                                                };
                                            });
                                        } else {
                                            if (!arrayControl.includes(suplente.id)) {
                                                dispatch(gestionSuplenteAccion(suplente)).then(({ payload }) => {
                                                    arrayControl.push(suplente.id);
                                                    if (payload) {
                                                        resolve({ payload: { trab: "trabajadorIterado", arrayControl } });
                                                    };
                                                });
                                            } else {
                                                resolve({ payload: { trab: "trabajadorIterado", arrayControl } });
                                            };
                                        };
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
    };
    dispatch(setLosServiciosFijosAccion(myObjetoServiciosFijos));
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
                objetoCentro.nombre !== '' && dispatch(obtenerDatosGestionEspecialAccion());
            } else {
                dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
                dispatch(actualizarObjetoCuadranteAccion({
                    ...objetoCuadrante,
                    datosInforme: losDatosInforme
                }));
            };
        } else {
            if (cuadranteRegistrado === 'si') {
                objetoCentro.nombre !== '' && dispatch(obtenerDatosGestionEspecialAccion());
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
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
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
    const { cuadranteRegistrado, objetoCuadrante, cuadrante } = getState().variablesCuadrantes;
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
    const { cuadrante, objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes, mesConFestivosCompleto } = getState().variablesCuadrantesSetters;
    //revisamos que el cuadrante no esté a 0
    const informe = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1];
    const informeIn = objetoCuadrante.datosInforme.datosInforme[index];
    const sumatorioHoras = informe && informe.arrayDatosInforme.length > 0
        ? informe.arrayDatosInforme.reduce((acc, dato) => acc + dato.totalHoras, 0)
        : 0;
    const arrayTrabajadoresInicialesCuadrante = cuadranteRegistrado === 'no'
        ? [...objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales]
        : [];

    let hayServiciosFijos = false;
    let arrayFinalServiciosFijos = [];
    let sumatorioServiciosFijos = 0;
    cuadranteServiciosFijos.forEach((servicio) => {
        listadoServiciosFijos.forEach(prefixObj => {
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
    Promise.allSettled([
        dispatch(setTrabajadoresEnCuadranteAccion([])),
        dispatch(setSuplentesEnCuadranteAccion([])),
        dispatch(setEsCambioTraAccion(false)),
        dispatch(setEsCambioSupAccion(false)),
        dispatch(setEsInicioTraAccion(true)),
        dispatch(setEsInicioSupAccion(true))
    ]);
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
    return ({
        cuadranteDevuelto: elObjetoDatosCuadrante,
        informeDevuelto: elObjetoDatosInforme,
        serviciosFijosDevuelto: elObjetoServiciosFijos,
        horasDevuelto: elObjetoHoras,
        trabajadoresDevuelto: arrayTrabajadoresInicialesCuadrante
    });
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
    const {
        cuadranteDevuelto,
        informeDevuelto,
        serviciosFijosDevuelto,
        horasDevuelto,
        trabajadoresDevuelto
    } = dispatch(procesarDatosCuadrantePromesa(cuadranteEnUsoCuadrantes - 1, true));
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
    const { usuarioActivo } = getState().variablesUsuario;
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
    const fechaHoy = new Date().toLocaleString() + '';
    const laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
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
        const { cuadranteDevuelto, informeDevuelto, serviciosFijosDevuelto, horasDevuelto } = dispatch(procesarDatosCuadrantePromesa(cuadranteEnUsoCuadrantes - 1, false));
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

//por revisar

const calculoTotales = (servicios, informes, horas) => (dispatch, getState) => {
    const { objetoCuadrante, totalesPeriodicos } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    let totalFacturado_M = 0;
    let totalFacturado_L = 0;
    let totalFacturado_E = 0;
    let totalFacturado_P = 0;
    let totalFacturado_N = 0;
    let totalFacturado_R = 0;
    let totalFacturado_L1 = 0;
    let totalFacturado_L2 = 0;
    let totalFacturado_F = 0;
    let totalFacturado_TO = 0;
    let totalFacturado_CR = 0;
    let totalFacturado_CE = 0;
    let totalFacturado_CI = 0;
    let totalFacturado_MO = 0;
    let totalFacturado_OF = 0;
    let totalFacturado_AL = 0;
    let totalFacturado_LA = 0;
    let totalFacturado_TE = 0;
    let totalFacturado_FI = 0;
    let totalFacturado_FE = 0;
    let totalFacturado_AB = 0;
    let totalFacturado_MA = 0;
    let totalFacturado_PO = 0;
    let totalFacturado_BA = 0;
    let totalFacturado_FT = 0;
    let totalFacturado_C3 = 0;
    let totalFacturado_C2 = 0;
    let totalFacturado_C4 = 0;
    let totalFacturado_ES = 0;
    let totalFacturado_PA = 0;
    let totalFacturado_FR = 0;
    let totalHoras_L = 0;
    let totalHoras_E = 0;
    let totalHoras_P = 0;
    let totalHoras_N = 0;
    let totalHoras_R = 0;
    let totalHoras_L1 = 0;
    let totalHoras_L2 = 0;
    let totalHoras_F = 0;
    let totalHoras_TO = 0;
    let totalHoras_CR = 0;
    let totalHoras_CE = 0;
    let totalHoras_CI = 0;
    let totalHoras_MO = 0;
    let totalHoras_OF = 0;
    let totalHoras_AL = 0;
    let totalHoras_LA = 0;
    let totalHoras_TE = 0;
    let totalHoras_FI = 0;
    let totalHoras_FE = 0;
    let totalHoras_AB = 0;
    let totalHoras_MA = 0;
    let totalHoras_PO = 0;
    let totalHoras_BA = 0;
    let totalHoras_FT = 0;
    let totalHoras_C3 = 0;
    let totalHoras_C2 = 0;
    let totalHoras_C4 = 0;
    let totalHoras_ES = 0;
    let totalHoras_PA = 0;
    let totalHoras_FR = 0;
    let precio_L = 0;
    let precio_E = 0;
    let precio_P = 0;
    let precio_N = 0;
    let precio_R = 0;
    let precio_L1 = 0;
    let precio_L2 = 0;
    let precio_F = 0;
    let objetoTotales;
    let vueltasSeguridad = 0;
    let numeroInformes = 0;
    servicios.forEach((servicioTot) => {
        if (servicioTot) {
            servicioTot.forEach((servicio) => {
                if (servicio) {
                    if (servicio.precioHora_TO) {
                        totalFacturado_TO += servicio.totalServicioFijo;
                        if (totalFacturado_TO === servicio.precioHora_TO) {
                            totalHoras_TO = 1;
                        } else {
                            totalHoras_TO = parseInt(totalFacturado_TO / servicio.precioHora_TO);
                        };
                    };
                    if (servicio.precioHora_CR) {
                        totalFacturado_CR += servicio.totalServicioFijo;
                        if (totalFacturado_CR === servicio.precioHora_CR) {
                            totalHoras_CR = 1;
                        } else {
                            totalHoras_CR = parseInt(totalFacturado_CR / servicio.precioHora_CR);
                        };
                    };
                    if (servicio.precioHora_CE) {
                        totalFacturado_CE += servicio.totalServicioFijo;
                        if (totalFacturado_CE === servicio.precioHora_CE) {
                            totalHoras_CE = 1;
                        } else {
                            totalHoras_CE = parseInt(totalFacturado_CE / servicio.precioHora_CE);
                        };
                    };
                    if (servicio.precioHora_CI) {
                        totalFacturado_CI += servicio.totalServicioFijo;
                        if (totalFacturado_CI === servicio.precioHora_CI) {
                            totalHoras_CI = 1;
                        } else {
                            totalHoras_CI = parseInt(totalFacturado_CI / servicio.precioHora_CI);
                        };
                    };
                    if (servicio.precioHora_MO) {
                        totalFacturado_MO += servicio.totalServicioFijo;
                        if (totalFacturado_MO === servicio.precioHora_MO) {
                            totalHoras_MO = 1;
                        } else {
                            totalHoras_MO = parseInt(totalFacturado_MO / servicio.precioHora_MO);
                        };
                    };
                    if (servicio.precioHora_OF) {
                        totalFacturado_OF += servicio.totalServicioFijo;
                        if (totalFacturado_OF === servicio.precioHora_OF) {
                            totalHoras_OF = 1;
                        } else {
                            totalHoras_OF = parseInt(totalFacturado_OF / servicio.precioHora_OF);
                        };
                    };
                    if (servicio.precioHora_AL) {
                        totalFacturado_AL += servicio.totalServicioFijo;
                        if (totalFacturado_AL === servicio.precioHora_AL) {
                            totalHoras_AL = 1;
                        } else {
                            totalHoras_AL = parseInt(totalFacturado_AL / servicio.precioHora_AL);
                        };
                    };
                    if (servicio.precioHora_LA) {
                        totalFacturado_LA += servicio.totalServicioFijo;
                        if (totalFacturado_LA === servicio.precioHora_LA) {
                            totalHoras_LA = 1;
                        } else {
                            totalHoras_LA = parseInt(totalFacturado_LA / servicio.precioHora_LA);
                        };
                    };
                    if (servicio.precioHora_TE) {
                        totalFacturado_TE += servicio.totalServicioFijo;
                        if (totalFacturado_TE === servicio.precioHora_TE) {
                            totalHoras_TE = 1;
                        } else {
                            totalHoras_TE = parseInt(totalFacturado_TE / servicio.precioHora_TE);
                        };
                    };
                    if (servicio.precioHora_FI) {
                        totalFacturado_FI += servicio.totalServicioFijo;
                        if (totalFacturado_FI === servicio.precioHora_FI) {
                            totalHoras_FI = 1;
                        } else {
                            totalHoras_FI = parseInt(totalFacturado_FI / servicio.precioHora_FI);
                        };
                    };
                    if (servicio.precioHora_FE) {
                        totalFacturado_FE += servicio.totalServicioFijo;
                        if (totalFacturado_FE === servicio.precioHora_FE) {
                            totalHoras_FE = 1;
                        } else {
                            totalHoras_FE = parseInt(totalFacturado_FE / servicio.precioHora_FE);
                        };
                    };
                    if (servicio.precioHora_AB) {
                        totalFacturado_AB += servicio.totalServicioFijo;
                        if (totalFacturado_AB === servicio.precioHora_AB) {
                            totalHoras_AB = 1;
                        } else {
                            totalHoras_AB = parseInt(totalFacturado_AB / servicio.precioHora_AB);
                        };
                    };
                    if (servicio.precioHora_MA) {
                        totalFacturado_MA += servicio.totalServicioFijo;
                        if (totalFacturado_MA === servicio.precioHora_MA) {
                            totalHoras_MA = 1;
                        } else {
                            totalHoras_MA = parseInt(totalFacturado_MA / servicio.precioHora_MA);
                        };
                    };
                    if (servicio.precioHora_PO) {
                        totalFacturado_PO += servicio.totalServicioFijo;
                        if (totalFacturado_PO === servicio.precioHora_PO) {
                            totalHoras_PO = 1;
                        } else {
                            totalHoras_PO = parseInt(totalFacturado_PO / servicio.precioHora_PO);
                        };
                    };
                    if (servicio.precioHora_BA) {
                        totalFacturado_BA += servicio.totalServicioFijo;
                        if (totalFacturado_BA === servicio.precioHora_BA) {
                            totalHoras_BA = 1;
                        } else {
                            totalHoras_BA = parseInt(totalFacturado_BA / servicio.precioHora_BA);
                        };
                    };
                    if (servicio.precioHora_FT) {
                        totalFacturado_FT += servicio.totalServicioFijo;
                        if (totalFacturado_FT === servicio.precioHora_FT) {
                            totalHoras_FT = 1;
                        } else {
                            totalHoras_FT = parseInt(totalFacturado_FT / servicio.precioHora_FT);
                        };
                    };
                    if (servicio.precioHora_C3) {
                        totalFacturado_C3 += servicio.totalServicioFijo;
                        if (totalFacturado_C3 === servicio.precioHora_C3) {
                            totalHoras_C3 = 1;
                        } else {
                            totalHoras_C3 = parseInt(totalFacturado_C3 / servicio.precioHora_C3);
                        };
                    };
                    if (servicio.precioHora_C2) {
                        totalFacturado_C2 += servicio.totalServicioFijo;
                        if (totalFacturado_C2 === servicio.precioHora_C2) {
                            totalHoras_C2 = 1;
                        } else {
                            totalHoras_C2 = parseInt(totalFacturado_C2 / servicio.precioHora_C2);
                        };
                    };
                    if (servicio.precioHora_C4) {
                        totalFacturado_C4 += servicio.totalServicioFijo;
                        if (totalFacturado_C4 === servicio.precioHora_C4) {
                            totalHoras_C4 = 1;
                        } else {
                            totalHoras_C4 = parseInt(totalFacturado_C4 / servicio.precioHora_C4);
                        };
                    };
                    if (servicio.precioHora_ES) {
                        totalFacturado_ES += servicio.totalServicioFijo;
                        if (totalFacturado_ES === servicio.precioHora_ES) {
                            totalHoras_ES = 1;
                        } else {
                            totalHoras_ES = parseInt(totalFacturado_ES / servicio.precioHora_ES);
                        };
                    };
                    if (servicio.precioHora_PA) {
                        totalFacturado_PA += servicio.totalServicioFijo;
                        if (totalFacturado_PA === servicio.precioHora_PA) {
                            totalHoras_PA = 1;
                        } else {
                            totalHoras_PA = parseInt(totalFacturado_PA / servicio.precioHora_PA);
                        };
                    };
                    if (servicio.precioHora_FR) {
                        totalFacturado_FR += servicio.totalServicioFijo;
                        if (totalFacturado_FR === servicio.precioHora_FR) {
                            totalHoras_FR = 1;
                        } else {
                            totalHoras_FR = parseInt(totalFacturado_FR / servicio.precioHora_FR);
                        };
                    };
                };
            });
        };
    });
    informes.forEach((informe, index) => {
        numeroInformes += 1;
        if (informe) {
            vueltasSeguridad += 1;
            if (informe.mensualPactado) {
                totalFacturado_M += informe.mensualPactado;
                if (horas[index]['L']) {
                    totalHoras_L += horas[index]['L'];
                };
                if (horas[index]['E']) {
                    totalHoras_E += horas[index]['E'];
                };
                if (horas[index]['P']) {
                    totalHoras_P += horas[index]['P'];
                };
                if (horas[index]['N']) {
                    totalHoras_N += horas[index]['N'];
                };
                if (horas[index]['R']) {
                    totalHoras_R += horas[index]['R'];
                };
                if (horas[index]['L1']) {
                    totalHoras_L1 += horas[index]['L1'];
                };
                if (horas[index]['L2']) {
                    totalHoras_L2 += horas[index]['L2'];
                };
                if (horas[index]['F']) {
                    totalHoras_F += horas[index]['F'];
                };
            } else {
                if (informe.precioHora_L) {
                    totalFacturado_L += informe.totalFacturado_L;
                    horas[index]['L'] ? totalHoras_L += horas[index]['L'] : totalHoras_L = totalHoras_L;
                    precio_L = informe.precioHora_L;
                };
                if (informe.precioHora_E) {
                    totalFacturado_E += informe.totalFacturado_E;
                    horas[index]['E'] ? totalHoras_E += horas[index]['E'] : totalHoras_E = totalHoras_E;
                    precio_E = informe.precioHora_E;
                };
                if (informe.precioHora_P) {
                    totalFacturado_P += informe.totalFacturado_P;
                    horas[index]['P'] ? totalHoras_P += horas[index]['P'] : totalHoras_P = totalHoras_P;
                    precio_P = informe.precioHora_P;
                };
                if (informe.precioHora_N) {
                    totalFacturado_N += informe.totalFacturado_N;
                    horas[index]['N'] ? totalHoras_N += horas[index]['N'] : totalHoras_N = totalHoras_N;
                    precio_N = informe.precioHora_N;
                };
                if (informe.precioHora_R) {
                    totalFacturado_R += informe.totalFacturado_R;
                    horas[index]['R'] ? totalHoras_R += horas[index]['R'] : totalHoras_R = totalHoras_R;
                    precio_R = informe.precioHora_R;
                };
                if (informe.precioHora_L1) {
                    totalFacturado_L1 += informe.totalFacturado_L1;
                    horas[index]['L1'] ? totalHoras_L1 += horas[index]['L1'] : totalHoras_L1 = totalHoras_L1;
                    precio_L1 = informe.precioHora_L1;
                };
                if (informe.precioHora_L2) {
                    totalFacturado_L2 += informe.totalFacturado_L2;
                    horas[index]['L2'] ? totalHoras_L2 += horas[index]['L2'] : totalHoras_L2 = totalHoras_L2;
                    precio_L2 = informe.precioHora_L2;
                };
                if (informe.precioHora_F) {
                    totalFacturado_F += informe.totalFacturado_F;
                    horas[index]['F'] ? totalHoras_F += horas[index]['F'] : totalHoras_F = totalHoras_F;
                    precio_F = informe.precioHora_F;
                };
            };
        } else {
            numeroInformes -= 1;
        };
    });
    objetoTotales = {
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
        tocaFacturar: objetoCuadrante.datosInforme.tocaFacturar
    };
    if (totalFacturado_M) {
        objetoTotales['MT'] = totalFacturado_M;
        if (totalHoras_L) {
            objetoTotales['LH'] = totalHoras_L;
        };
        if (totalHoras_E) {
            objetoTotales['EH'] = totalHoras_E;
        };
        if (totalHoras_P) {
            objetoTotales['PH'] = totalHoras_P;
        };
        if (totalHoras_N) {
            objetoTotales['NH'] = totalHoras_N;
        };
        if (totalHoras_R) {
            objetoTotales['RH'] = totalHoras_R;
        };
        if (totalHoras_L1) {
            objetoTotales['L1H'] = totalHoras_L1;
        };
        if (totalHoras_L2) {
            objetoTotales['L2H'] = totalHoras_L2;
        };
        if (totalHoras_F) {
            objetoTotales['FH'] = totalHoras_F;
        };
    };
    if (totalFacturado_L) {
        objetoTotales['LT'] = totalFacturado_L;
        objetoTotales['LH'] = totalHoras_L;
        objetoTotales['LPr'] = precio_L;
    };
    if (totalFacturado_E) {
        objetoTotales['ET'] = totalFacturado_E;
        objetoTotales['EH'] = totalHoras_E;
        objetoTotales['EPr'] = precio_E;
    };
    if (totalFacturado_P) {
        objetoTotales['PT'] = totalFacturado_P;
        objetoTotales['PH'] = totalHoras_P;
        objetoTotales['PPr'] = precio_P;
    };
    if (totalFacturado_N) {
        objetoTotales['NT'] = totalFacturado_N;
        objetoTotales['NH'] = totalHoras_N;
        objetoTotales['NPr'] = precio_N;
    };
    if (totalFacturado_R) {
        objetoTotales['RT'] = totalFacturado_R;
        objetoTotales['RH'] = totalHoras_R;
        objetoTotales['RPr'] = precio_R;
    };
    if (totalFacturado_L1) {
        objetoTotales['L1T'] = totalFacturado_L1;
        objetoTotales['L1H'] = totalHoras_L1;
        objetoTotales['L1Pr'] = precio_L1;
    };
    if (totalFacturado_L2) {
        objetoTotales['L2T'] = totalFacturado_L2;
        objetoTotales['L2H'] = totalHoras_L2;
        objetoTotales['L2Pr'] = precio_L2;
    };
    if (totalFacturado_F) {
        objetoTotales['FT'] = totalFacturado_F;
        objetoTotales['FH'] = totalHoras_F;
        objetoTotales['FPr'] = precio_F;
    };
    if (totalFacturado_TO) {
        objetoTotales['TOT'] = totalFacturado_TO;
        objetoTotales['TOH'] = totalHoras_TO;
    };
    if (totalFacturado_CR) {
        objetoTotales['CRT'] = totalFacturado_CR;
        objetoTotales['CRH'] = totalHoras_CR;
    };
    if (totalFacturado_CE) {
        objetoTotales['CET'] = totalFacturado_CE;
        objetoTotales['CEH'] = totalHoras_CE;
    };
    if (totalFacturado_CI) {
        objetoTotales['CIT'] = totalFacturado_CI;
        objetoTotales['CIH'] = totalHoras_CI;
    };
    if (totalFacturado_MO) {
        objetoTotales['MOT'] = totalFacturado_MO;
        objetoTotales['MOH'] = totalHoras_MO;
    };
    if (totalFacturado_OF) {
        objetoTotales['OFT'] = totalFacturado_OF;
        objetoTotales['OFH'] = totalHoras_OF;
    };
    if (totalFacturado_AL) {
        objetoTotales['ALT'] = totalFacturado_AL;
        objetoTotales['ALH'] = totalHoras_AL;
    };
    if (totalFacturado_LA) {
        objetoTotales['LAT'] = totalFacturado_LA;
        objetoTotales['LAH'] = totalHoras_LA;
    };
    if (totalFacturado_TE) {
        objetoTotales['TET'] = totalFacturado_TE;
        objetoTotales['TEH'] = totalHoras_TE;
    };
    if (totalFacturado_FI) {
        objetoTotales['FIT'] = totalFacturado_FI;
        objetoTotales['FIH'] = totalHoras_FI;
    };
    if (totalFacturado_FE) {
        objetoTotales['FET'] = totalFacturado_FE;
        objetoTotales['FEH'] = totalHoras_FE;
    };
    if (totalFacturado_AB) {
        objetoTotales['ABT'] = totalFacturado_AB;
        objetoTotales['ABH'] = totalHoras_AB;
    };
    if (totalFacturado_MA) {
        objetoTotales['MAT'] = totalFacturado_MA;
        objetoTotales['MAH'] = totalHoras_MA;
    };
    if (totalFacturado_PO) {
        objetoTotales['POT'] = totalFacturado_PO;
        objetoTotales['POH'] = totalHoras_PO;
    };
    if (totalFacturado_BA) {
        objetoTotales['BAT'] = totalFacturado_BA;
        objetoTotales['BAH'] = totalHoras_BA;
    };
    if (totalFacturado_FT) {
        objetoTotales['FTT'] = totalFacturado_FT;
        objetoTotales['FTH'] = totalHoras_FT;
    };
    if (totalFacturado_C3) {
        objetoTotales['C3T'] = totalFacturado_C3;
        objetoTotales['C3H'] = totalHoras_C3;
    };
    if (totalFacturado_C2) {
        objetoTotales['C2T'] = totalFacturado_C2;
        objetoTotales['C2H'] = totalHoras_C2;
    };
    if (totalFacturado_C4) {
        objetoTotales['C4T'] = totalFacturado_C4;
        objetoTotales['C4H'] = totalHoras_C4;
    };
    if (totalFacturado_ES) {
        objetoTotales['EST'] = totalFacturado_ES;
        objetoTotales['ESH'] = totalHoras_ES;
    };
    if (totalFacturado_PA) {
        objetoTotales['PAT'] = totalFacturado_PA;
        objetoTotales['PAH'] = totalHoras_PA;
    };
    if (totalFacturado_FR) {
        objetoTotales['FRT'] = totalFacturado_FR;
        objetoTotales['FRH'] = totalHoras_FR;
    };
    if (objetoCentro.activoNumCuenta === 'si') {
        objetoTotales['NUMCT'] = 1;
    };
    totalFacturado_M ? totalFacturado_M = totalFacturado_M : totalFacturado_M = 0;
    totalFacturado_L ? totalFacturado_L = totalFacturado_L : totalFacturado_L = 0;
    totalFacturado_E ? totalFacturado_E = totalFacturado_E : totalFacturado_E = 0;
    totalFacturado_P ? totalFacturado_P = totalFacturado_P : totalFacturado_P = 0;
    totalFacturado_N ? totalFacturado_N = totalFacturado_N : totalFacturado_N = 0;
    totalFacturado_R ? totalFacturado_R = totalFacturado_R : totalFacturado_R = 0;
    totalFacturado_L1 ? totalFacturado_L1 = totalFacturado_L1 : totalFacturado_L1 = 0;
    totalFacturado_L2 ? totalFacturado_L2 = totalFacturado_L2 : totalFacturado_L2 = 0;
    totalFacturado_F ? totalFacturado_F = totalFacturado_F : totalFacturado_F = 0;
    totalFacturado_TO ? totalFacturado_TO = totalFacturado_TO : totalFacturado_TO = 0;
    totalFacturado_CR ? totalFacturado_CR = totalFacturado_CR : totalFacturado_CR = 0;
    totalFacturado_CE ? totalFacturado_CE = totalFacturado_CE : totalFacturado_CE = 0;
    totalFacturado_CI ? totalFacturado_CI = totalFacturado_CI : totalFacturado_CI = 0;
    totalFacturado_MO ? totalFacturado_MO = totalFacturado_MO : totalFacturado_MO = 0;
    totalFacturado_OF ? totalFacturado_OF = totalFacturado_OF : totalFacturado_OF = 0;
    totalFacturado_AL ? totalFacturado_AL = totalFacturado_AL : totalFacturado_AL = 0;
    totalFacturado_LA ? totalFacturado_LA = totalFacturado_LA : totalFacturado_LA = 0;
    totalFacturado_TE ? totalFacturado_TE = totalFacturado_TE : totalFacturado_TE = 0;
    totalFacturado_FI ? totalFacturado_FI = totalFacturado_FI : totalFacturado_FI = 0;
    totalFacturado_FE ? totalFacturado_FE = totalFacturado_FE : totalFacturado_FE = 0;
    totalFacturado_AB ? totalFacturado_AB = totalFacturado_AB : totalFacturado_AB = 0;
    totalFacturado_MA ? totalFacturado_MA = totalFacturado_MA : totalFacturado_MA = 0;
    totalFacturado_PO ? totalFacturado_PO = totalFacturado_PO : totalFacturado_PO = 0;
    totalFacturado_BA ? totalFacturado_BA = totalFacturado_BA : totalFacturado_BA = 0;
    totalFacturado_FT ? totalFacturado_FT = totalFacturado_FT : totalFacturado_FT = 0;
    totalFacturado_C3 ? totalFacturado_C3 = totalFacturado_C3 : totalFacturado_C3 = 0;
    totalFacturado_C2 ? totalFacturado_C2 = totalFacturado_C2 : totalFacturado_C2 = 0;
    totalFacturado_C4 ? totalFacturado_C4 = totalFacturado_C4 : totalFacturado_C4 = 0;
    totalFacturado_ES ? totalFacturado_ES = totalFacturado_ES : totalFacturado_ES = 0;
    totalFacturado_PA ? totalFacturado_PA = totalFacturado_PA : totalFacturado_PA = 0;
    totalFacturado_FR ? totalFacturado_FR = totalFacturado_FR : totalFacturado_FR = 0;
    objetoTotales['total'] =
        totalFacturado_M +
        totalFacturado_L +
        totalFacturado_E +
        totalFacturado_P +
        totalFacturado_N +
        totalFacturado_R +
        totalFacturado_L1 +
        totalFacturado_L2 +
        totalFacturado_F +
        totalFacturado_TO +
        totalFacturado_CR +
        totalFacturado_CE +
        totalFacturado_CI +
        totalFacturado_MO +
        totalFacturado_OF +
        totalFacturado_AL +
        totalFacturado_LA +
        totalFacturado_TE +
        totalFacturado_FI +
        totalFacturado_FE +
        totalFacturado_AB +
        totalFacturado_MA +
        totalFacturado_PO +
        totalFacturado_BA +
        totalFacturado_FT +
        totalFacturado_C3 +
        totalFacturado_C2 +
        totalFacturado_C4 +
        totalFacturado_ES +
        totalFacturado_PA +
        totalFacturado_FR;
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
            if (totalesPeriodicos.totalesHoras.LH) {
                if (objetoTotales['LH']) {
                    objetoTotales['LH'] += totalesPeriodicos.totalesHoras.LH;
                } else {
                    objetoTotales['LH'] = totalesPeriodicos.totalesHoras.LH;
                };
            };
            if (totalesPeriodicos.totalesHoras.EH) {
                if (objetoTotales['EH']) {
                    objetoTotales['EH'] += totalesPeriodicos.totalesHoras.EH;
                } else {
                    objetoTotales['EH'] = totalesPeriodicos.totalesHoras.EH;
                };
            };
            if (totalesPeriodicos.totalesHoras.PH) {
                if (objetoTotales['PH']) {
                    objetoTotales['PH'] += totalesPeriodicos.totalesHoras.PH;
                } else {
                    objetoTotales['PH'] = totalesPeriodicos.totalesHoras.PH;
                };
            };
            if (totalesPeriodicos.totalesHoras.NH) {
                if (objetoTotales['NH']) {
                    objetoTotales['NH'] += totalesPeriodicos.totalesHoras.NH;
                } else {
                    objetoTotales['NH'] = totalesPeriodicos.totalesHoras.NH;
                };
            };
            if (totalesPeriodicos.totalesHoras.RH) {
                if (objetoTotales['RH']) {
                    objetoTotales['RH'] += totalesPeriodicos.totalesHoras.RH;
                } else {
                    objetoTotales['RH'] = totalesPeriodicos.totalesHoras.RH;
                };
            };
            if (totalesPeriodicos.totalesHoras.L1H) {
                if (objetoTotales['L1H']) {
                    objetoTotales['L1H'] += totalesPeriodicos.totalesHoras.L1H;
                } else {
                    objetoTotales['L1H'] = totalesPeriodicos.totalesHoras.L1H;
                };
            };
            if (totalesPeriodicos.totalesHoras.L2H) {
                if (objetoTotales['L2H']) {
                    objetoTotales['L2H'] += totalesPeriodicos.totalesHoras.L2H;
                } else {
                    objetoTotales['L2H'] = totalesPeriodicos.totalesHoras.L2H;
                };
            };
            if (totalesPeriodicos.totalesHoras.FH) {
                if (objetoTotales['FH']) {
                    objetoTotales['FH'] += totalesPeriodicos.totalesHoras.FH;
                } else {
                    objetoTotales['FH'] = totalesPeriodicos.totalesHoras.FH;
                };
            };
            if (totalesPeriodicos.totalesServicios.MT) {
                if (objetoTotales['MT']) {
                    objetoTotales['MT'] += totalesPeriodicos.totalesServicios.MT;
                } else {
                    objetoTotales['MT'] = totalesPeriodicos.totalesServicios.MT;
                };
            };
            if (totalesPeriodicos.totalesServicios.LT) {
                if (objetoTotales['LT']) {
                    objetoTotales['LT'] += totalesPeriodicos.totalesServicios.LT;
                } else {
                    objetoTotales['LT'] = totalesPeriodicos.totalesServicios.LT;
                };
            };
            if (totalesPeriodicos.totalesServicios.ET) {
                if (objetoTotales['ET']) {
                    objetoTotales['ET'] += totalesPeriodicos.totalesServicios.ET;
                } else {
                    objetoTotales['ET'] = totalesPeriodicos.totalesServicios.ET;
                };
            };
            if (totalesPeriodicos.totalesServicios.PT) {
                if (objetoTotales['PT']) {
                    objetoTotales['PT'] += totalesPeriodicos.totalesServicios.PT;
                } else {
                    objetoTotales['PT'] = totalesPeriodicos.totalesServicios.PT;
                };
            };
            if (totalesPeriodicos.totalesServicios.NT) {
                if (objetoTotales['NT']) {
                    objetoTotales['NT'] += totalesPeriodicos.totalesServicios.NT;
                } else {
                    objetoTotales['NT'] = totalesPeriodicos.totalesServicios.NT;
                };
            };
            if (totalesPeriodicos.totalesServicios.RT) {
                if (objetoTotales['RT']) {
                    objetoTotales['RT'] += totalesPeriodicos.totalesServicios.RT;
                } else {
                    objetoTotales['RT'] = totalesPeriodicos.totalesServicios.RT;
                };
            };
            if (totalesPeriodicos.totalesServicios.L1T) {
                if (objetoTotales['L1T']) {
                    objetoTotales['L1T'] += totalesPeriodicos.totalesServicios.L1T;
                } else {
                    objetoTotales['L1T'] = totalesPeriodicos.totalesServicios.L1T;
                };
            };
            if (totalesPeriodicos.totalesServicios.L2T) {
                if (objetoTotales['L2T']) {
                    objetoTotales['L2T'] += totalesPeriodicos.totalesServicios.L2T;
                } else {
                    objetoTotales['L2T'] = totalesPeriodicos.totalesServicios.L2T;
                };
            };
            if (totalesPeriodicos.totalesServicios.FT) {
                if (objetoTotales['FT']) {
                    objetoTotales['FT'] += totalesPeriodicos.totalesServicios.FT;
                } else {
                    objetoTotales['FT'] = totalesPeriodicos.totalesServicios.FT;
                };
            };
            if (totalesPeriodicos.totalesServicios.TOT) {
                if (objetoTotales['TOT']) {
                    objetoTotales['TOT'] += totalesPeriodicos.totalesServicios.TOT;
                } else {
                    objetoTotales['TOT'] = totalesPeriodicos.totalesServicios.TOT;
                };
            };
            if (totalesPeriodicos.totalesServicios.CRT) {
                if (objetoTotales['CRT']) {
                    objetoTotales['CRT'] += totalesPeriodicos.totalesServicios.CRT;
                } else {
                    objetoTotales['CRT'] = totalesPeriodicos.totalesServicios.CRT;
                };
            };
            if (totalesPeriodicos.totalesServicios.CET) {
                if (objetoTotales['CET']) {
                    objetoTotales['CET'] += totalesPeriodicos.totalesServicios.CET;
                } else {
                    objetoTotales['CET'] = totalesPeriodicos.totalesServicios.CET;
                };
            };
            if (totalesPeriodicos.totalesServicios.CIT) {
                if (objetoTotales['CIT']) {
                    objetoTotales['CIT'] += totalesPeriodicos.totalesServicios.CIT;
                } else {
                    objetoTotales['CIT'] = totalesPeriodicos.totalesServicios.CIT;
                };
            };
            if (totalesPeriodicos.totalesServicios.MOT) {
                if (objetoTotales['MOT']) {
                    objetoTotales['MOT'] += totalesPeriodicos.totalesServicios.MOT;
                } else {
                    objetoTotales['MOT'] = totalesPeriodicos.totalesServicios.MOT;
                };
            };
            if (totalesPeriodicos.totalesServicios.OFT) {
                if (objetoTotales['OFT']) {
                    objetoTotales['OFT'] += totalesPeriodicos.totalesServicios.OFT;
                } else {
                    objetoTotales['OFT'] = totalesPeriodicos.totalesServicios.OFT;
                };
            };
            if (totalesPeriodicos.totalesServicios.ALT) {
                if (objetoTotales['ALT']) {
                    objetoTotales['ALT'] += totalesPeriodicos.totalesServicios.ALT;
                } else {
                    objetoTotales['ALT'] = totalesPeriodicos.totalesServicios.ALT;
                };
            };
            if (totalesPeriodicos.totalesServicios.LAT) {
                if (objetoTotales['LAT']) {
                    objetoTotales['LAT'] += totalesPeriodicos.totalesServicios.LAT;
                } else {
                    objetoTotales['LAT'] = totalesPeriodicos.totalesServicios.LAT;
                };
            };
            if (totalesPeriodicos.totalesServicios.TET) {
                if (objetoTotales['TET']) {
                    objetoTotales['TET'] += totalesPeriodicos.totalesServicios.TET;
                } else {
                    objetoTotales['TET'] = totalesPeriodicos.totalesServicios.TET;
                };
            };
            if (totalesPeriodicos.totalesServicios.FIT) {
                if (objetoTotales['FIT']) {
                    objetoTotales['FIT'] += totalesPeriodicos.totalesServicios.FIT;
                } else {
                    objetoTotales['FIT'] = totalesPeriodicos.totalesServicios.FIT;
                };
            };
            if (totalesPeriodicos.totalesServicios.FET) {
                if (objetoTotales['FET']) {
                    objetoTotales['FET'] += totalesPeriodicos.totalesServicios.FET;
                } else {
                    objetoTotales['FET'] = totalesPeriodicos.totalesServicios.FET;
                };
            };
            if (totalesPeriodicos.totalesServicios.ABT) {
                if (objetoTotales['ABT']) {
                    objetoTotales['ABT'] += totalesPeriodicos.totalesServicios.ABT;
                } else {
                    objetoTotales['ABT'] = totalesPeriodicos.totalesServicios.ABT;
                };
            };
            if (totalesPeriodicos.totalesServicios.MAT) {
                if (objetoTotales['MAT']) {
                    objetoTotales['MAT'] += totalesPeriodicos.totalesServicios.MAT;
                } else {
                    objetoTotales['MAT'] = totalesPeriodicos.totalesServicios.MAT;
                };
            };
            if (totalesPeriodicos.totalesServicios.POT) {
                if (objetoTotales['POT']) {
                    objetoTotales['POT'] += totalesPeriodicos.totalesServicios.POT;
                } else {
                    objetoTotales['POT'] = totalesPeriodicos.totalesServicios.POT;
                };
            };
            if (totalesPeriodicos.totalesServicios.BAT) {
                if (objetoTotales['BAT']) {
                    objetoTotales['BAT'] += totalesPeriodicos.totalesServicios.BAT;
                } else {
                    objetoTotales['BAT'] = totalesPeriodicos.totalesServicios.BAT;
                };
            };
            if (totalesPeriodicos.totalesServicios.FTT) {
                if (objetoTotales['FTT']) {
                    objetoTotales['FTT'] += totalesPeriodicos.totalesServicios.FTT;
                } else {
                    objetoTotales['FTT'] = totalesPeriodicos.totalesServicios.FTT;
                };
            };
            if (totalesPeriodicos.totalesServicios.C3T) {
                if (objetoTotales['C3T']) {
                    objetoTotales['C3T'] += totalesPeriodicos.totalesServicios.C3T;
                } else {
                    objetoTotales['C3T'] = totalesPeriodicos.totalesServicios.C3T;
                };
            };
            if (totalesPeriodicos.totalesServicios.C2T) {
                if (objetoTotales['C2T']) {
                    objetoTotales['C2T'] += totalesPeriodicos.totalesServicios.C2T;
                } else {
                    objetoTotales['C2T'] = totalesPeriodicos.totalesServicios.C2T;
                };
            };
            if (totalesPeriodicos.totalesServicios.C4T) {
                if (objetoTotales['C4T']) {
                    objetoTotales['C4T'] += totalesPeriodicos.totalesServicios.C4T;
                } else {
                    objetoTotales['C4T'] = totalesPeriodicos.totalesServicios.C4T;
                };
            };
            if (totalesPeriodicos.totalesServicios.EST) {
                if (objetoTotales['EST']) {
                    objetoTotales['EST'] += totalesPeriodicos.totalesServicios.EST;
                } else {
                    objetoTotales['EST'] = totalesPeriodicos.totalesServicios.EST;
                };
            };
            if (totalesPeriodicos.totalesServicios.PAT) {
                if (objetoTotales['PAT']) {
                    objetoTotales['PAT'] += totalesPeriodicos.totalesServicios.PAT;
                } else {
                    objetoTotales['PAT'] = totalesPeriodicos.totalesServicios.PAT;
                };
            };
            if (totalesPeriodicos.totalesServicios.FRT) {
                if (objetoTotales['FRT']) {
                    objetoTotales['FRT'] += totalesPeriodicos.totalesServicios.FRT;
                } else {
                    objetoTotales['FRT'] = totalesPeriodicos.totalesServicios.FRT;
                };
            };
            if (totalesPeriodicos.totalesServicios.NUMCT) {
                if (objetoTotales['NUMCT']) {
                    objetoTotales['NUMCT'] = totalesPeriodicos.totalesServicios.NUMCT;
                } else {
                    objetoTotales['NUMCT'] = totalesPeriodicos.totalesServicios.NUMCT;
                };
            };
        };
    };
    objetoTotales['totalMasIva'] = ((parseFloat(objetoTotales['total']) * 21) / 100) + parseFloat(objetoTotales['total']);
    objetoTotales['totalIva'] = ((parseFloat(objetoTotales['total']) * 21) / 100);
    //control seguretat    
    if (numeroInformes !== vueltasSeguridad) {
        return 'error cálculo'
    } else {
        return objetoTotales
    };
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
    const { objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const { numeroRecibos } = getState().variablesApp;
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
    if (losDatosTotales === 'error cálculo') {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "Error en el cálculo de totales vuelve a registrar el cuadrante.",
            tipo: 'error'
        }));
        return;
    } else {
        dispatch(setFirmaActualizacionAccion(laFirmaActualizacion));
    };
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
                numeroRecibos: numeroRecibos,
                totalLetra: numeroALetras(parseFloat(losDatosTotales.total).toFixed(2)),
                centro: objetoCuadrante.datosCuadrante.nombreCentro,
                concepto: dispatch(retornaTextoConceptoServicioAccion(losDatosTotales, null, null)) + dispatch(retornaMesReciboLetra()),
                total: parseFloat(losDatosTotales.total).toFixed(2)
            }
        };
        if (!objetoCuadrante.datosInforme.datosGestionEsp) {
            if (numeroRecibos) {
                dispatch(actualizarNumeroRecibosAccion('configuracion', parseInt(numeroRecibos) + 1));
            };
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
        dispatch(registrarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar));
        dispatch(cambiarACuadranteRegistradoAccion());
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        //dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(cuadranteEnUsoCuadrantes));
        dispatch(reseteaContenidoCentroAccion(true));
        dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, cuadranteEnUsoCuadrantes - 1));
    };
    if (cuadranteRegistrado === 'si') {
        if (source === 'informe') {
            dispatch(setControladorDeEstadoAccion('venimosDeInforme'));
        };
        dispatch(actualizarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar));
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        //dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(cuadranteEnUsoCuadrantes));
        dispatch(reseteaContenidoCentroAccion(true));
        dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, cuadranteEnUsoCuadrantes - 1));
    };
    dispatch(registrarIntervencionAccion(true));
};

export const gestionarDocumentosCuadranteAccion = (origen) => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes, numeroFactusol } = getState().variablesCuadrantesSetters;
    const { usuarioActivo } = getState().variablesUsuario;
    //firmamos
    let fechaHoy = new Date().toLocaleString() + '';
    let laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
    dispatch(setFirmaActualizacionAccion(laFirmaActualizacion));
    if (objetoCuadrante.total.procesado.valor === 'no') {
        let objetoTotales = {
            ...objetoCuadrante.total,
            procesado: {
                valor: 'si',
                numR: origen === 'recibo' ? objetoCuadrante.datosInforme.datosGestionEsp.numeroRecibos : null,
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
        dispatch(actualizarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar));
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
    dispatch(gestionarDocumentosCuadranteAccion('factura'));
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



