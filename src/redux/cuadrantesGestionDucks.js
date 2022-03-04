
import { setNumeroCuadrantesCuadrantesAccion } from './cuadrantesSettersDucks';
import { setVenimosDeCambioCuadranteAccion } from './cuadrantesSettersDucks';
import { setFirmaActualizacionAccion } from './cuadrantesSettersDucks';
import { setCuadranteVacioAccion } from './cuadrantesSettersDucks';
import { setCuadranteServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { gestionaColumnaServiciosFijosInicioAccion } from './cuadrantesServiciosFijosDucks';
import { obtenerTrabajadorAccion } from './trabajadoresDucks';
import { obtenerSuplenteAccion } from './trabajadoresDucks';
import { setCuadranteAccion } from './cuadrantesDucks';
import { setTrabajadoresEnCuadranteAccion } from './cuadrantesSettersDucks';
import { setSuplentesEnCuadranteAccion } from './cuadrantesSettersDucks';
import { setEsInicioTraAccion } from './cuadrantesSettersDucks';
import { setEsInicioSupAccion } from './cuadrantesSettersDucks';
import { setEsCambioTraAccion } from './cuadrantesSettersDucks';
import { setEsCambioSupAccion } from './cuadrantesSettersDucks';
import { actualizarObjetoCuadranteAccion } from './cuadrantesDucks';
import { reseteaContenidoCentroAccion } from './cuadrantesSettersDucks';
import { setCuadranteEnUsoCuadrantesAccion } from './cuadrantesSettersDucks';
import { obtenerCategoriaPorCentroAccion } from './centrosDucks';
import { handleCloseMenuAccion } from './cuadrantesHandlersDucks';
import { setLosServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setStateSwitchTipoServicioFijoCuadranteAccion } from './cuadrantesServiciosFijosDucks';
import { setItemEditandoServiciosFijosAccion } from './cuadrantesServiciosFijosDucks';
import { setItemEditandoConfiguracionAccion } from './cuadrantesSettersDucks';
import { completarCuadranteAccion } from './cuadrantesColumnasDucks';
import { limpiarCuadranteAccion } from './cuadrantesColumnasDucks';
import { limpiarCuadranteInformeAccion } from './cuadrantesColumnasDucks';
import { setStateFestivoAccion } from './cuadrantesDucks';
import { registrarCuadranteAccion } from './cuadrantesDucks';
import { actualizarCuadranteAccion } from './cuadrantesDucks';
import { activarDesactivarCambioBotonActualizarAccion } from './cuadrantesDucks';
import { setControladorDeEstadoAccion } from './cuadrantesSettersDucks';
import { registrarIntervencionAccion } from './appDucks';
import { cambiarACuadranteRegistradoAccion } from './cuadrantesDucks';
import { setOpenLoadingAccion } from './cuadrantesSettersDucks';
import { setColumnaIndiceAGestionarAccion } from './cuadrantesSettersDucks';
import { setEsUnaActualizacionTrabajadorAccion } from './cuadrantesSettersDucks';
import { gestionaColumnaCuadranteAccion } from './cuadrantesColumnasDucks';
import { setAlertaAccion } from './cuadrantesSettersDucks';
import { setEstamosActualizandoCuadranteSinCargaAccion } from './cuadrantesSettersDucks';

//constantes
const dataInicial = {
};

//types

//reducer
export default function cuadrantesGestionReducer(state = dataInicial, action) {
    switch (action.type) {
        default:
            return { ...state }
    }
}

//acciones
export const calculaNumeroCuadrantesAccion = (total) => (dispatch, getState) => {
    let arrayAAnadir = [];
    for (let i = 0; i < total; i++) {
        arrayAAnadir.push({ value: i + 1, revisado: false });
    };
    dispatch(setNumeroCuadrantesCuadrantesAccion(arrayAAnadir));
};

export const gestionaCuadranteIndividualAccion = (numeroCuadrante, cambio) => (dispatch, getState) => {
    const { objetoCuadrante, cuadranteRegistrado, stateFestivo } = getState().variablesCuadrantes;
    const { venimosDeCambioCuadrante } = getState().variablesCuadrantesSetters;
    if (!cambio) {
        dispatch(calculaNumeroCuadrantesAccion(objetoCuadrante.datosCuadrante.datosCuadrante.length));
    } else {
        dispatch(setVenimosDeCambioCuadranteAccion(false));
    };
    dispatch(setFirmaActualizacionAccion(objetoCuadrante.actualizacion));
    let myObjetoServiciosFijos = {
        precioHora_TO: null,
        precioHora_CR: null,
        precioHora_CE: null,
        precioHora_CI: null,
        precioHora_MO: null,
        precioHora_OF: null,
        precioHora_AL: null,
        precioHora_LA: null,
        precioHora_TE: null,
        precioHora_FI: null,
        precioHora_FE: null,
        precioHora_AB: null,
        precioHora_MA: null,
        precioHora_PO: null,
        precioHora_BA: null,
        precioHora_FT: null,
        precioHora_C3: null,
        precioHora_C2: null,
        precioHora_ES: null,
        precioHora_PA: null,
        variacion_TO: '',
        variacion_CR: '',
        variacion_CE: '',
        variacion_CI: '',
        variacion_MO: '',
        variacion_OF: '',
        variacion_AL: '',
        variacion_LA: '',
        variacion_TE: '',
        variacion_FI: '',
        variacion_FE: '',
        variacion_AB: '',
        variacion_MA: '',
        variacion_PO: '',
        variacion_BA: '',
        variacion_FT: '',
        variacion_C3: '',
        variacion_C2: '',
        variacion_ES: '',
        variacion_PA: '',
        diaVariacion_TO: '',
        diaVariacion_CR: '',
        diaVariacion_CE: '',
        diaVariacion_CI: '',
        diaVariacion_MO: '',
        diaVariacion_OF: '',
        diaVariacion_AL: '',
        diaVariacion_LA: '',
        diaVariacion_TE: '',
        diaVariacion_FI: '',
        diaVariacion_FE: '',
        diaVariacion_AB: '',
        diaVariacion_MA: '',
        diaVariacion_PO: '',
        diaVariacion_BA: '',
        diaVariacion_FT: '',
        diaVariacion_C3: '',
        diaVariacion_C2: '',
        diaVariacion_ES: '',
        diaVariacion_PA: '',
        activo_TO: 'si',
        activo_CR: 'si',
        activo_CE: 'si',
        activo_CI: 'si',
        activo_MO: 'si',
        activo_OF: 'si',
        activo_AL: 'si',
        activo_LA: 'si',
        activo_TE: 'si',
        activo_FI: 'si',
        activo_FE: 'si',
        activo_AB: 'si',
        activo_MA: 'si',
        activo_PO: 'si',
        activo_BA: 'si',
        activo_FT: 'si',
        activo_C3: 'si',
        activo_C2: 'si',
        activo_ES: 'si',
        activo_PA: 'si'
    };
    let objetoEstadosSwitch = {
        TO: false,
        CR: false,
        CE: false,
        CI: false,
        MO: false,
        OF: false,
        AL: false,
        LA: false,
        TE: false,
        FI: false,
        FE: false,
        AB: false,
        MA: false,
        PO: false,
        BA: false,
        FT: false,
        C3: false,
        C2: false,
        ES: false,
        PA: false
    };
    if (!objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].tipoHorarioGeneral) {
        dispatch(setCuadranteVacioAccion(true));
    };
    if (objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1]) {
        objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1].forEach((servicio) => {
            if (servicio.precioHora_TO) {
                myObjetoServiciosFijos.precioHora_TO = servicio.precioHora_TO;
                myObjetoServiciosFijos.variacion_TO = servicio.variacion_TO;
                myObjetoServiciosFijos.diaVariacion_TO = servicio.diaVariacion_TO;
                myObjetoServiciosFijos.activo_TO = servicio.activo_TO;
                objetoEstadosSwitch.TO = true;
            };
            if (servicio.precioHora_CR) {
                myObjetoServiciosFijos.precioHora_CR = servicio.precioHora_CR;
                myObjetoServiciosFijos.variacion_CR = servicio.variacion_CR;
                myObjetoServiciosFijos.diaVariacion_CR = servicio.diaVariacion_CR;
                myObjetoServiciosFijos.activo_CR = servicio.activo_CR;
                objetoEstadosSwitch.CR = true;
            };
            if (servicio.precioHora_CE) {
                myObjetoServiciosFijos.precioHora_CE = servicio.precioHora_CE;
                myObjetoServiciosFijos.variacion_CE = servicio.variacion_CE;
                myObjetoServiciosFijos.diaVariacion_CE = servicio.diaVariacion_CE;
                myObjetoServiciosFijos.activo_CE = servicio.activo_CE;
                objetoEstadosSwitch.CE = true;
            };
            if (servicio.precioHora_CI) {
                myObjetoServiciosFijos.precioHora_CI = servicio.precioHora_CI;
                myObjetoServiciosFijos.variacion_CI = servicio.variacion_CI;
                myObjetoServiciosFijos.diaVariacion_CI = servicio.diaVariacion_CI;
                myObjetoServiciosFijos.activo_CI = servicio.activo_CI;
                objetoEstadosSwitch.CI = true;
            };
            if (servicio.precioHora_MO) {
                myObjetoServiciosFijos.precioHora_MO = servicio.precioHora_MO;
                myObjetoServiciosFijos.variacion_MO = servicio.variacion_MO;
                myObjetoServiciosFijos.diaVariacion_MO = servicio.diaVariacion_MO;
                myObjetoServiciosFijos.activo_MO = servicio.activo_MO;
                objetoEstadosSwitch.MO = true;
            };
            if (servicio.precioHora_OF) {
                myObjetoServiciosFijos.precioHora_OF = servicio.precioHora_OF;
                myObjetoServiciosFijos.variacion_OF = servicio.variacion_OF;
                myObjetoServiciosFijos.diaVariacion_OF = servicio.diaVariacion_OF;
                myObjetoServiciosFijos.activo_OF = servicio.activo_OF;
                objetoEstadosSwitch.OF = true;
            };
            if (servicio.precioHora_AL) {
                myObjetoServiciosFijos.precioHora_AL = servicio.precioHora_AL;
                myObjetoServiciosFijos.variacion_AL = servicio.variacion_AL;
                myObjetoServiciosFijos.diaVariacion_AL = servicio.diaVariacion_AL;
                myObjetoServiciosFijos.activo_AL = servicio.activo_AL;
                objetoEstadosSwitch.AL = true;
            };
            if (servicio.precioHora_LA) {
                myObjetoServiciosFijos.precioHora_LA = servicio.precioHora_LA;
                myObjetoServiciosFijos.variacion_LA = servicio.variacion_LA;
                myObjetoServiciosFijos.diaVariacion_LA = servicio.diaVariacion_LA;
                myObjetoServiciosFijos.activo_LA = servicio.activo_LA;
                objetoEstadosSwitch.LA = true;
            };
            if (servicio.precioHora_TE) {
                myObjetoServiciosFijos.precioHora_TE = servicio.precioHora_TE;
                myObjetoServiciosFijos.variacion_TE = servicio.variacion_TE;
                myObjetoServiciosFijos.diaVariacion_TE = servicio.diaVariacion_TE;
                myObjetoServiciosFijos.activo_TE = servicio.activo_TE
                objetoEstadosSwitch.TE = true;
            };
            if (servicio.precioHora_FI) {
                myObjetoServiciosFijos.precioHora_FI = servicio.precioHora_FI;
                myObjetoServiciosFijos.variacion_FI = servicio.variacion_FI;
                myObjetoServiciosFijos.diaVariacion_FI = servicio.diaVariacion_FI;
                myObjetoServiciosFijos.activo_FI = servicio.activo_FI;
                objetoEstadosSwitch.FI = true;
            };
            if (servicio.precioHora_FE) {
                myObjetoServiciosFijos.precioHora_FE = servicio.precioHora_FE;
                myObjetoServiciosFijos.variacion_FE = servicio.variacion_FE;
                myObjetoServiciosFijos.diaVariacion_FE = servicio.diaVariacion_FE;
                myObjetoServiciosFijos.activo_FE = servicio.activo_FE;
                objetoEstadosSwitch.FE = true;
            };
            if (servicio.precioHora_AB) {
                myObjetoServiciosFijos.precioHora_AB = servicio.precioHora_AB;
                myObjetoServiciosFijos.variacion_AB = servicio.variacion_AB;
                myObjetoServiciosFijos.diaVariacion_AB = servicio.diaVariacion_AB;
                myObjetoServiciosFijos.activo_AB = servicio.activo_AB;
                objetoEstadosSwitch.AB = true;
            };
            if (servicio.precioHora_MA) {
                myObjetoServiciosFijos.precioHora_MA = servicio.precioHora_MA;
                myObjetoServiciosFijos.variacion_MA = servicio.variacion_MA;
                myObjetoServiciosFijos.diaVariacion_MA = servicio.diaVariacion_MA;
                myObjetoServiciosFijos.activo_MA = servicio.activo_MA;
                objetoEstadosSwitch.MA = true;
            };
            if (servicio.precioHora_PO) {
                myObjetoServiciosFijos.precioHora_PO = servicio.precioHora_PO;
                myObjetoServiciosFijos.variacion_PO = servicio.variacion_PO;
                myObjetoServiciosFijos.diaVariacion_PO = servicio.diaVariacion_PO;
                myObjetoServiciosFijos.activo_PO = servicio.activo_PO;
                objetoEstadosSwitch.PO = true;
            };
            if (servicio.precioHora_BA) {
                myObjetoServiciosFijos.precioHora_BA = servicio.precioHora_BA;
                myObjetoServiciosFijos.variacion_BA = servicio.variacion_BA;
                myObjetoServiciosFijos.diaVariacion_BA = servicio.diaVariacion_BA;
                myObjetoServiciosFijos.activo_BA = servicio.activo_BA;
                objetoEstadosSwitch.BA = true;
            };
            if (servicio.precioHora_FT) {
                myObjetoServiciosFijos.precioHora_FT = servicio.precioHora_FT;
                myObjetoServiciosFijos.variacion_FT = servicio.variacion_FT;
                myObjetoServiciosFijos.diaVariacion_FT = servicio.diaVariacion_FT;
                myObjetoServiciosFijos.activo_FT = servicio.activo_FT;
                objetoEstadosSwitch.FT = true;
            };
            if (servicio.precioHora_C3) {
                myObjetoServiciosFijos.precioHora_C3 = servicio.precioHora_C3;
                myObjetoServiciosFijos.variacion_C3 = servicio.variacion_C3;
                myObjetoServiciosFijos.diaVariacion_C3 = servicio.diaVariacion_C3;
                myObjetoServiciosFijos.activo_C3 = servicio.activo_C3;
                objetoEstadosSwitch.C3 = true;
            };
            if (servicio.precioHora_C2) {
                myObjetoServiciosFijos.precioHora_C2 = servicio.precioHora_C2;
                myObjetoServiciosFijos.variacion_C2 = servicio.variacion_C2;
                myObjetoServiciosFijos.diaVariacion_C2 = servicio.diaVariacion_C2;
                myObjetoServiciosFijos.activo_C2 = servicio.activo_C2;
                objetoEstadosSwitch.C2 = true;
            };
            if (servicio.precioHora_ES) {
                myObjetoServiciosFijos.precioHora_ES = servicio.precioHora_ES;
                myObjetoServiciosFijos.variacion_ES = servicio.variacion_ES;
                myObjetoServiciosFijos.diaVariacion_ES = servicio.diaVariacion_ES;
                myObjetoServiciosFijos.activo_ES = servicio.activo_ES;
                objetoEstadosSwitch.ES = true;
            };
            if (servicio.precioHora_PA) {
                myObjetoServiciosFijos.precioHora_PA = servicio.precioHora_PA;
                myObjetoServiciosFijos.variacion_PA = servicio.variacion_PA;
                myObjetoServiciosFijos.diaVariacion_PA = servicio.diaVariacion_PA;
                myObjetoServiciosFijos.activo_PA = servicio.activo_PA;
                objetoEstadosSwitch.PA = true;
            };
        });
        dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosInicioAccion(objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1]))));
    };
    if (cuadranteRegistrado === 'no') {
        if (objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[numeroCuadrante - 1]) {
            if (objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.length === 0) {
                objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[numeroCuadrante - 1].trabajadores.forEach((trabajadorIterado, index) => {
                    setTimeout(
                        function () {
                            if (trabajadorIterado['trabajador_' + (index + 1)]) {
                                setTimeout(() => {
                                    dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado['trabajador_' + (index + 1)]));
                                }, 1);
                            };
                            if (trabajadorIterado['suplente_' + (index + 1)]) {
                                setTimeout(() => {
                                    dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado['suplente_' + (index + 1)]));
                                }, 250);
                            };
                        }, index * 500);
                });
            } else {
                dispatch(setCuadranteAccion(objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante));
            };
        };
    };
    if (cuadranteRegistrado === 'si') {
        if (!venimosDeCambioCuadrante) {
            if (objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.length > 0) {
                objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.forEach((trabajadorIterado, index) => {
                    setTimeout(
                        function () {
                            if (trabajadorIterado.tipoTrabajador === 'trabajador') {
                                setTimeout(() => {
                                    dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado.idTrabajador));
                                }, 1);
                            };
                            if (trabajadorIterado.tipoTrabajador === 'suplente') {
                                setTimeout(() => {
                                    dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado.idTrabajador));
                                }, 250);
                            };
                        }, index * 500);
                });
            };
        } else {
            dispatch(setCuadranteAccion(objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante));
        };
    };
    dispatch(setLosServiciosFijosAccion(myObjetoServiciosFijos));
    dispatch(setStateSwitchTipoServicioFijoCuadranteAccion(objetoEstadosSwitch));
    dispatch(setItemEditandoServiciosFijosAccion({
        switch: objetoEstadosSwitch,
        servicios: myObjetoServiciosFijos
    }));
    let objetoDatosCuadrante = {};
    if (objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1] && objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].tipoHorarioGeneral) {
        objetoDatosCuadrante = {
            ...objetoDatosCuadrante,
            tipoHorario: objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].tipoHorarioGeneral,
            computo: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].computo,
            mensualPactado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado : '',
            precioHora_L: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L : '',
            precioHora_E: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E : '',
            precioHora_P: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P : '',
            precioHora_N: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N : '',
            precioHora_R: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R : '',
            precioHora_L1: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 : '',
            precioHora_L2: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 : '',
            precioHora_F: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F : '',
        };
    };
    objetoDatosCuadrante = {
        ...objetoDatosCuadrante,
        observaciones: objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].observaciones ? objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].observaciones : ''
    };
    dispatch(setItemEditandoConfiguracionAccion(objetoDatosCuadrante));
    if (cuadranteRegistrado === 'si') {
        if (objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.length > 0) {
            const { arrayResultante, arrayFestivos } = dispatch(completarCuadranteAccion(objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante));
            dispatch(setCuadranteAccion(arrayResultante));
            let object = { ...stateFestivo };
            arrayFestivos.forEach((festivo, index) => {
                object['estadoFestivoDia' + festivo[1]] = true;
            });
            dispatch(setStateFestivoAccion(object));
            let objetoDatosInforme = {
                computo: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].computo,
                tipoRegistro: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].tipoRegistro,
                mensualPactado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado : null,
                precioHora_L: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L : null,
                precioHora_E: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E : null,
                precioHora_P: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P : null,
                precioHora_N: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N : null,
                precioHora_R: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R : null,
                precioHora_L1: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 : null,
                precioHora_L2: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 : null,
                precioHora_F: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F : null,
                totalFacturado_M: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_M ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_M : null,
                totalFacturado_L: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L : null,
                totalFacturado_E: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_E ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_E : null,
                totalFacturado_P: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_P ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_P : null,
                totalFacturado_N: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_N ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_N : null,
                totalFacturado_R: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_R ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_R : null,
                totalFacturado_L1: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L1 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L1 : null,
                totalFacturado_L2: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L2 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L2 : null,
                totalFacturado_F: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_F ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_F : null,
                iniciado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].iniciado,
                totalHorasInicial_L: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_L ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_L : null,
                totalHorasInicial_E: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_E ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_E : null,
                totalHorasInicial_P: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_P ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_P : null,
                totalHorasInicial_N: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_N ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_N : null,
                totalHorasInicial_R: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_R ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_R : null,
                totalHorasInicial_L1: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_L1 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_L1 : null,
                totalHorasInicial_L2: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_L2 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_L2 : null,
                totalHorasInicial_F: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_F ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial_F : null,
                totalHorasInicial: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalHorasInicial : null
            };
            let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
            elArrayDatosInforme[numeroCuadrante - 1] = objetoDatosInforme;
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
    };
};

export const cambiarEstadoCuadranteEnUsoRevisadoAccion = (estado) => (dispatch, getState) => {
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;

    let arrayNumeroCuadrantes = [...numeroCuadrantesCuadrantes];
    arrayNumeroCuadrantes = arrayNumeroCuadrantes.map(cuadrante => (cuadrante.value === cuadranteEnUsoCuadrantes ? { ...cuadrante, revisado: estado } : cuadrante));
    dispatch(setNumeroCuadrantesCuadrantesAccion(arrayNumeroCuadrantes));
};

const calculoTotalHoras = () => (dispatch, getState) => {
    const { arrayDatosInforme } = getState().variablesCuadrantesSetters;
    let sumatorioHoras_L = 0;
    let sumatorioHoras_E = 0;
    let sumatorioHoras_P = 0;
    let sumatorioHoras_N = 0;
    let sumatorioHoras_R = 0;
    let sumatorioHoras_L1 = 0;
    let sumatorioHoras_L2 = 0;
    let sumatorioHoras_F = 0;
    let sumatorioTotal = 0;
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
    };
    return { sumatorioHoras_L, sumatorioHoras_E, sumatorioHoras_P, sumatorioHoras_N, sumatorioHoras_R, sumatorioHoras_L1, sumatorioHoras_L2, sumatorioHoras_F, sumatorioTotal }
};

const procesarDatosCuadrantePromesa = (index, noHayRegistro) => (dispatch, getState) => {
    const { arrayDatosInforme } = getState().variablesCuadrantesSetters;
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { cuadrante, objetoCuadrante } = getState().variablesCuadrantes;
    //revisamos que el cuadrante no esté a 0
    let sumatorioHoras = 0;
    if (arrayDatosInforme.length > 0) {
        arrayDatosInforme.forEach((dato, index) => {
            sumatorioHoras += dato.totalHoras;
        });
    }
    let hayServiciosFijos = false;
    let arrayFinalServiciosFijos = [];
    let sumatorioServiciosFijos = 0;
    cuadranteServiciosFijos.forEach((servicio) => {
        if (servicio.tipoServiciofijo === 'TOL') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRIS') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRISE') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRISI') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'MOQ') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'OF') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'ALMC') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'LAB') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'TELÑ') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'FCH.IN') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'FCH.EX') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'ABRLL') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'MANT') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'PORT') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'BACT') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'FEST') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRTRIM') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRBIM') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'LIME') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'LIMP') {
            sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
    });
    if (sumatorioHoras < 1 && !hayServiciosFijos) {
        dispatch(setAlertaAccion({
            abierto: true,
            mensaje: "El cuadrante no se puede registrar a 0. El trabajador asignado está de baja, añade un suplente o un trabajador para computar o añade servicios extra.",
            tipo: 'error'
        }));
        return;
    };
    //revisamos que no haya columnas vacías
    for (let i = cuadrante.length - 1; i >= 0; --i) {
        if (!cuadrante[i].nombreTrabajador || arrayDatosInforme[i].totalHoras === 0) {
            cuadrante.splice(i, 1);
            arrayDatosInforme.splice(i, 1);
        }
    };
    dispatch(setTrabajadoresEnCuadranteAccion([]));
    dispatch(setSuplentesEnCuadranteAccion([]));
    dispatch(setEsCambioTraAccion(false));
    dispatch(setEsCambioSupAccion(false));
    dispatch(setEsInicioTraAccion(true));
    dispatch(setEsInicioSupAccion(true));
    const { sumatorioHoras_L, sumatorioHoras_E, sumatorioHoras_P, sumatorioHoras_N, sumatorioHoras_R, sumatorioHoras_L1, sumatorioHoras_L2, sumatorioHoras_F, sumatorioTotal } = dispatch(calculoTotalHoras());
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
    let elTotalAAFacturar_M = null;
    let elTotalAAFacturar_L = null;
    let elTotalAAFacturar_E = null;
    let elTotalAAFacturar_P = null;
    let elTotalAAFacturar_N = null;
    let elTotalAAFacturar_R = null;
    let elTotalAAFacturar_L1 = null;
    let elTotalAAFacturar_L2 = null;
    let elTotalAAFacturar_F = null;
    let elTotalAAFacturarTotal = null;
    if (objetoCuadrante.datosInforme.datosInforme[index]) {
        if (objetoCuadrante.datosInforme.datosInforme[index].computo === 1) {            
            elTotalAAFacturar_M = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].mensualPactado);
            elTotalAAFacturarTotal = elTotalAAFacturar_M;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].computo === 2) {
            if (sumatorioHoras_L) {
                elTotalAAFacturar_L = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L * sumatorioHoras_L);
            };
            if (sumatorioHoras_E) {
                elTotalAAFacturar_E = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_E * sumatorioHoras_E);
            };
            if (sumatorioHoras_P) {
                elTotalAAFacturar_P = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_P * sumatorioHoras_P);
            };
            if (sumatorioHoras_N) {
                elTotalAAFacturar_N = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_N * sumatorioHoras_N);
            };
            if (sumatorioHoras_R) {
                elTotalAAFacturar_R = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_R * sumatorioHoras_R);
            };
            if (sumatorioHoras_L1) {
                elTotalAAFacturar_L1 = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1 * sumatorioHoras_L1);
            };
            if (sumatorioHoras_L2) {
                elTotalAAFacturar_L2 = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2 * sumatorioHoras_L2);
            };
            if (sumatorioHoras_F) {
                elTotalAAFacturar_F = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_F * sumatorioHoras_F);
            };
            elTotalAAFacturarTotal = parseFloat((objetoCuadrante.datosInforme.datosInforme[index].precioHora_L * sumatorioHoras_L) +
                (objetoCuadrante.datosInforme.datosInforme[index].precioHora_E * sumatorioHoras_E) +
                (objetoCuadrante.datosInforme.datosInforme[index].precioHora_P * sumatorioHoras_P) +
                (objetoCuadrante.datosInforme.datosInforme[index].precioHora_N * sumatorioHoras_N) +
                (objetoCuadrante.datosInforme.datosInforme[index].precioHora_R * sumatorioHoras_R) +
                (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1 * sumatorioHoras_L1) +
                (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2 * sumatorioHoras_L2) +
                (objetoCuadrante.datosInforme.datosInforme[index].precioHora_F * sumatorioHoras_F));
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].computo === 3) {
            if (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) {
                elTotalAAFacturar_M = objetoCuadrante.datosInforme.datosInforme[index].mensualPactado;
                elTotalAAFacturarTotal = elTotalAAFacturar_M;
            } else {
                if (sumatorioHoras_L) {
                    elTotalAAFacturar_L = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L * sumatorioHoras_L);
                };
                if (sumatorioHoras_E) {
                    elTotalAAFacturar_E = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_E * sumatorioHoras_E);
                };
                if (sumatorioHoras_P) {
                    elTotalAAFacturar_P = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_P * sumatorioHoras_P);
                };
                if (sumatorioHoras_N) {
                    elTotalAAFacturar_N = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_N * sumatorioHoras_N);
                };
                if (sumatorioHoras_R) {
                    elTotalAAFacturar_R = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_R * sumatorioHoras_R);
                };
                if (sumatorioHoras_L1) {
                    elTotalAAFacturar_L1 = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1 * sumatorioHoras_L1);
                };
                if (sumatorioHoras_L2) {
                    elTotalAAFacturar_L2 = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2 * sumatorioHoras_L2);
                };
                if (sumatorioHoras_F) {
                    elTotalAAFacturar_F = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_F * sumatorioHoras_F);
                };
                elTotalAAFacturarTotal = parseFloat((objetoCuadrante.datosInforme.datosInforme[index].precioHora_L * sumatorioHoras_L) +
                    (objetoCuadrante.datosInforme.datosInforme[index].precioHora_E * sumatorioHoras_E) +
                    (objetoCuadrante.datosInforme.datosInforme[index].precioHora_P * sumatorioHoras_P) +
                    (objetoCuadrante.datosInforme.datosInforme[index].precioHora_N * sumatorioHoras_N) +
                    (objetoCuadrante.datosInforme.datosInforme[index].precioHora_R * sumatorioHoras_R) +
                    (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1 * sumatorioHoras_L1) +
                    (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2 * sumatorioHoras_L2) +
                    (objetoCuadrante.datosInforme.datosInforme[index].precioHora_F * sumatorioHoras_F));
            };
        };
    };
    let elObjetoDatosCuadrante = {};
    let elObjetoDatosInforme = {};
    let elObjetoHoras = {};
    let elObjetoServiciosFijos = {};
    if (cuadrante.length === 0) {
        elObjetoDatosCuadrante = {
            tipoHorarioGeneral: '',
            arrayCuadrante: [],
            observaciones: objetoCuadrante.datosCuadrante.datosCuadrante[index].observaciones,
            total: elTotalAAFacturarTotal += sumatorioServiciosFijos
        };
        elObjetoDatosInforme = null;
        elObjetoHoras = null;
        elObjetoServiciosFijos = arrayFinalServiciosFijos
    } else {
        elObjetoDatosCuadrante = {
            tipoHorarioGeneral: objetoCuadrante.datosCuadrante.datosCuadrante[index].tipoHorarioGeneral,
            arrayCuadrante: cuadrante,
            observaciones: objetoCuadrante.datosCuadrante.datosCuadrante[index].observaciones,
            total: elTotalAAFacturarTotal += sumatorioServiciosFijos
        };
        elObjetoDatosInforme = {
            computo: objetoCuadrante.datosInforme.datosInforme[index].computo,
            tipoRegistro: objetoCuadrante.datosInforme.datosInforme[index].tipoRegistro,
            totalHorasInicial: objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial
            //arrayTrabajadores: arrayDatosInforme,
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) {
            elObjetoDatosInforme['mensualPactado'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].mensualPactado);
            elObjetoDatosInforme['totalFacturado_M'] = parseFloat(elTotalAAFacturar_M);
        } else {
            elObjetoDatosInforme['mensualPactado'] = null;
            elObjetoDatosInforme['totalFacturado_M'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L) {
            elObjetoDatosInforme['precioHora_L'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L);
            elObjetoDatosInforme['totalFacturado_L'] = parseFloat(elTotalAAFacturar_L);
            elObjetoDatosInforme['totalHorasInicial_L'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L);
        } else {
            elObjetoDatosInforme['precioHora_L'] = null;
            elObjetoDatosInforme['totalFacturado_L'] = null;
            elObjetoDatosInforme['totalHorasInicial_L'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_E) {
            elObjetoDatosInforme['precioHora_E'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_E);
            elObjetoDatosInforme['totalFacturado_E'] = parseFloat(elTotalAAFacturar_E);
            elObjetoDatosInforme['totalHorasInicial_E'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_E);
        } else {
            elObjetoDatosInforme['precioHora_E'] = null;
            elObjetoDatosInforme['totalFacturado_E'] = null;
            elObjetoDatosInforme['totalHorasInicial_E'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_P) {
            elObjetoDatosInforme['precioHora_P'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_P);
            elObjetoDatosInforme['totalFacturado_P'] = parseFloat(elTotalAAFacturar_P);
            elObjetoDatosInforme['totalHorasInicial_P'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_P);
        } else {
            elObjetoDatosInforme['precioHora_P'] = null;
            elObjetoDatosInforme['totalFacturado_P'] = null;
            elObjetoDatosInforme['totalHorasInicial_P'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_N) {
            elObjetoDatosInforme['precioHora_N'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_N);
            elObjetoDatosInforme['totalFacturado_N'] = parseFloat(elTotalAAFacturar_N);
            elObjetoDatosInforme['totalHorasInicial_N'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_N);
        } else {
            elObjetoDatosInforme['precioHora_N'] = null;
            elObjetoDatosInforme['totalFacturado_N'] = null;
            elObjetoDatosInforme['totalHorasInicial_N'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_R) {
            elObjetoDatosInforme['precioHora_R'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_R);
            elObjetoDatosInforme['totalFacturado_R'] = parseFloat(elTotalAAFacturar_R);
            elObjetoDatosInforme['totalHorasInicial_R'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_R);
        } else {
            elObjetoDatosInforme['precioHora_R'] = null;
            elObjetoDatosInforme['totalFacturado_R'] = null;
            elObjetoDatosInforme['totalFacturado_R'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1) {
            elObjetoDatosInforme['precioHora_L1'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1);
            elObjetoDatosInforme['totalFacturado_L1'] = parseFloat(elTotalAAFacturar_L1);
            elObjetoDatosInforme['totalHorasInicial_L1'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L1);
        } else {
            elObjetoDatosInforme['precioHora_L1'] = null;
            elObjetoDatosInforme['totalFacturado_L1'] = null;
            elObjetoDatosInforme['totalHorasInicial_L1'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2) {
            elObjetoDatosInforme['precioHora_L2'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2);
            elObjetoDatosInforme['totalFacturado_L2'] = parseFloat(elTotalAAFacturar_L2);
            elObjetoDatosInforme['totalHorasInicial_L2'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_L2);
        } else {
            elObjetoDatosInforme['precioHora_L2'] = null;
            elObjetoDatosInforme['totalFacturado_L2'] = null;
            elObjetoDatosInforme['totalHorasInicial_L2'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_F) {
            elObjetoDatosInforme['precioHora_F'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_F);
            elObjetoDatosInforme['totalFacturado_F'] = parseFloat(elTotalAAFacturar_F);
            elObjetoDatosInforme['totalHorasInicial_F'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalHorasInicial_F);
        } else {
            elObjetoDatosInforme['precioHora_F'] = null;
            elObjetoDatosInforme['totalFacturado_F'] = null;
            elObjetoDatosInforme['totalHorasInicial_F'] = null;
        };
        elObjetoHoras = {};
        if (objetoCuadrante.datosInforme.datosInforme[index].mensualPactado) {
            elObjetoHoras['M'] = 1;
        };
        if (sumatorioHoras_L) {
            elObjetoHoras['L'] = parseFloat(sumatorioHoras_L);
        };
        if (sumatorioHoras_E) {
            elObjetoHoras['E'] = parseFloat(sumatorioHoras_E);
        };
        if (sumatorioHoras_P) {
            elObjetoHoras['P'] = parseFloat(sumatorioHoras_P);
        };
        if (sumatorioHoras_N) {
            elObjetoHoras['N'] = parseFloat(sumatorioHoras_N);
        };
        if (sumatorioHoras_R) {
            elObjetoHoras['R'] = parseFloat(sumatorioHoras_R);
        };
        if (sumatorioHoras_L1) {
            elObjetoHoras['L1'] = parseFloat(sumatorioHoras_L1);
        };
        if (sumatorioHoras_L2) {
            elObjetoHoras['L2'] = parseFloat(sumatorioHoras_L2);
        };
        if (sumatorioHoras_R) {
            elObjetoHoras['R'] = parseFloat(sumatorioHoras_R);
        };
        if (hayServiciosFijos) {
            elObjetoServiciosFijos = arrayFinalServiciosFijos
        } else {
            elObjetoServiciosFijos = null
        };
    };
    return ({ cuadranteDevuelto: elObjetoDatosCuadrante, informeDevuelto: elObjetoDatosInforme, serviciosFijosDevuelto: elObjetoServiciosFijos, horasDevuelto: elObjetoHoras });
};

export const procesarCambioCuadranteAccion = (target) => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    let elArrayDatosCuadrante = [...objetoCuadrante.datosCuadrante.datosCuadrante];
    let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
    let elArrayDatosServiciosFijos = [...objetoCuadrante.datosServicios.datosServicios];
    let elArrayHoras = [...objetoCuadrante.horas.horas];
    let losDatosCuadrante = {};
    let losDatosInforme = {};
    let losDatosServiciosFijos = {};
    let losDatosHoras = {};
    const { cuadranteDevuelto, informeDevuelto, serviciosFijosDevuelto, horasDevuelto } = dispatch(procesarDatosCuadrantePromesa(cuadranteEnUsoCuadrantes - 1, true));
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
    //dispatch(registrarIntervencionAccion(true));
    dispatch(actualizarObjetoCuadranteAccion({
        ...objetoCuadrante,
        datosCuadrante: losDatosCuadrante,
        datosInforme: losDatosInforme,
        datosServicios: losDatosServiciosFijos,
        horas: losDatosHoras
    }));
    dispatch(reseteaContenidoCentroAccion(true));
    dispatch(setCuadranteEnUsoCuadrantesAccion(target));
    dispatch(gestionaCuadranteIndividualAccion(target, true));
    dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, target - 1));

};

export const procesarDatosCuadranteAccion = (source) => (dispatch, getState) => {
    const { cuadranteRegistrado, objetoCuadrante } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const { usuarioActivo } = getState().variablesUsuario;
    dispatch(handleCloseMenuAccion());
    //revisamos que no sea cuadrante múltiple
    if (cuadranteRegistrado === 'no') {
        let faltanPorRevisar = false;
        numeroCuadrantesCuadrantes.forEach((cuadrante, index) => {
            if ((index !== cuadranteEnUsoCuadrantes - 1) && !cuadrante.revisado) {
                faltanPorRevisar = true;
            };
        });
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
    let fechaHoy = new Date().toLocaleString() + '';
    let laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
    dispatch(setFirmaActualizacionAccion(laFirmaActualizacion));
    let todosRevisados = true;
    let elTotalGeneral = 0;
    numeroCuadrantesCuadrantes.forEach((cuadrante, index) => {
        if (!cuadrante.revisado) {
            todosRevisados = false;
        } else {
            elTotalGeneral += parseFloat(objetoCuadrante.datosCuadrante.datosCuadrante[index].total);
        };
    });
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
        elTotalGeneral += parseFloat(cuadranteDevuelto.total);
        dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(true));
        dispatch(finalizaRegistroCuadrante(
            source,
            true,
            laFirmaActualizacion,
            losDatosCuadrante,
            losDatosInforme,
            losDatosServiciosFijos,
            losDatosHoras,
            elTotalGeneral
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
            elTotalGeneral
        ));
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
    elTotalGeneral
) => (dispatch, getState) => {
    const { objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    const losDatosInformeLimpiado = {
        ...losDatosInforme,
        datosInforme: []
    };
    losDatosInforme.datosInforme.forEach((informeIterado) => {
        losDatosInformeLimpiado.datosInforme.push(dispatch(limpiarCuadranteInformeAccion(informeIterado)));
    });
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
    const cuadranteAGuardar = {
        id: objetoCuadrante.id,
        nombre: objetoCuadrante.nombre,
        actualizacion: laFirmaActualizacion,
        datos_cuadrante: JSON.stringify(losDatosCuadranteLimpiado),
        datos_servicios: JSON.stringify(losDatosServiciosFijos),
        datos_informe: JSON.stringify(losDatosInformeLimpiado),
        estado: source === 'informe' ? 'facturado' : objetoCuadrante.estado,
        total: source === 'informe' ? elTotalGeneral : objetoCuadrante.estado === 'facturado' ? elTotalGeneral : null,
        horas: JSON.stringify(losDatosHoras)
    };
    if (cuadranteRegistrado === 'no') {
        dispatch(registrarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar));
        dispatch(cambiarACuadranteRegistradoAccion());
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        dispatch(setControladorDeEstadoAccion('venimosDeRegistrar'));
        //dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
        dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(cuadranteEnUsoCuadrantes));
        dispatch(reseteaContenidoCentroAccion(true));
        dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, cuadranteEnUsoCuadrantes - 1));

    };
    if (cuadranteRegistrado === 'si') {
        if (source === 'informe') {
            dispatch(setControladorDeEstadoAccion('venimosDeInforme'));
        }
        dispatch(actualizarCuadranteAccion('cuadrantes', cuadranteAGuardar.id, cuadranteAGuardar));
        dispatch(activarDesactivarCambioBotonActualizarAccion(true));
        //dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
        dispatch(registrarIntervencionAccion(false));
        dispatch(setCuadranteEnUsoCuadrantesAccion(cuadranteEnUsoCuadrantes));
        dispatch(reseteaContenidoCentroAccion(true));
        dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, true));
        dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, cuadranteEnUsoCuadrantes - 1));
    };
    dispatch(registrarIntervencionAccion(true));
    if (source !== 'informe') {
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            actualizacion: laFirmaActualizacion,
            datosCuadrante: losDatosCuadrante,
            datosInforme: losDatosInforme,
            datosServicios: losDatosServiciosFijos,
            horas: losDatosHoras
        }));
    } else {
        dispatch(actualizarObjetoCuadranteAccion({
            ...objetoCuadrante,
            actualizacion: laFirmaActualizacion,
            datosCuadrante: losDatosCuadrante,
            datosInforme: losDatosInforme,
            datosServicios: losDatosServiciosFijos,
            horas: losDatosHoras,
            estado: 'facturado'
        }));
    }
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
            let arrayTrabajadores = [];
            let arrayInforme = [];
            let arrayHoras = [];
            for (let i = 0; i < objetoCentro.categoria.categoria.length; i++) {
                objetoCentro.horario.horario[i] ? hayHorario = true : hayHorario = false;
                objetoCentro.serviciosFijos.serviciosFijos[i] ? hayServiciosFijos = true : hayServiciosFijos = false;
                objetoCentro.trabajadores.trabajadores[i] ? hayTrabajadores = true : hayTrabajadores = false;
                if (hayHorario) {
                    arrayHorario.push({
                        tipoHorarioGeneral: objetoCentro.horario.horario[i].tipo,
                        arrayCuadrante: [],
                        observaciones: ''
                    });
                    arrayInforme.push({
                        tipoRegistro: objetoCentro.horario.horario[i].tipoRegistro,
                        computo: objetoCentro.horario.horario[i].computo,
                        mensualPactado: objetoCentro.horario.horario[i].mensualPactado ? objetoCentro.horario.horario[i].mensualPactado : null,
                        precioHora_L: objetoCentro.horario.horario[i].precioHora_L ? objetoCentro.horario.horario[i].precioHora_L : null,
                        precioHora_E: objetoCentro.horario.horario[i].precioHora_E ? objetoCentro.horario.horario[i].precioHora_E : null,
                        precioHora_P: objetoCentro.horario.horario[i].precioHora_P ? objetoCentro.horario.horario[i].precioHora_P : null,
                        precioHora_N: objetoCentro.horario.horario[i].precioHora_N ? objetoCentro.horario.horario[i].precioHora_N : null,
                        precioHora_R: objetoCentro.horario.horario[i].precioHora_R ? objetoCentro.horario.horario[i].precioHora_R : null,
                        precioHora_L1: objetoCentro.horario.horario[i].precioHora_L1 ? objetoCentro.horario.horario[i].precioHora_L1 : null,
                        precioHora_L2: objetoCentro.horario.horario[i].precioHora_L2 ? objetoCentro.horario.horario[i].precioHora_L2 : null,
                        precioHora_F: objetoCentro.horario.horario[i].precioHora_F ? objetoCentro.horario.horario[i].precioHora_F : null,
                        arrayTrabajadores: [],
                        totalFacturado_M: null,
                        totalFacturado_L: null,
                        totalFacturado_E: null,
                        totalFacturado_P: null,
                        totalFacturado_N: null,
                        totalFacturado_R: null,
                        totalFacturado_L1: null,
                        totalFacturado_L2: null,
                        totalFacturado_F: null,
                        iniciado: false,
                        totalHorasInicial_L: null,
                        totalHorasInicial_E: null,
                        totalHorasInicial_P: null,
                        totalHorasInicial_N: null,
                        totalHorasInicial_R: null,
                        totalHorasInicial_L1: null,
                        totalHorasInicial_L2: null,
                        totalHorasInicial_F: null,
                        totalHorasInicial: null
                    });
                } else {
                    arrayHorario.push({
                        tipoHorarioGeneral: '',
                        arrayCuadrante: [],
                        observaciones: ''
                    });
                    arrayInforme.push(null);
                };
                if (hayServiciosFijos) {
                    arrayServiciosFijos.push(objetoCentro.serviciosFijos.serviciosFijos[i].servicio);
                } else {
                    arrayServiciosFijos.push([])
                };
                if (hayTrabajadores) {
                    arrayTrabajadores.push(objetoCentro.trabajadores.trabajadores[i]);
                } else {
                    arrayTrabajadores.push(null);
                };
                arrayHoras.push(null);
            };
            dispatch(actualizarObjetoCuadranteAccion({
                ...objetoCuadrante,
                nombre: calendarioAGestionar + '-' + objetoCentro.id,
                datosCuadrante: {
                    objeto: 'cuadrante',
                    centro: objetoCentro.id,
                    datosCuadrante: arrayHorario
                },
                datosServicios: {
                    objeto: 'serviciosFijos',
                    datosServicios: arrayServiciosFijos
                },
                datosInforme: {
                    objeto: 'informe',
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

export const gestionTrabajadorAccion = () => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { cuadranteRegistrado, objetoCuadrante, cuadrante } = getState().variablesCuadrantes;
    const {
        trabajadoresEnCuadrante,
        suplentesEnCuadrante,
        esInicioTra,
        esCambioTra,
        cuadranteEnUsoCuadrantes,
        valorPrevioAccordionAbierto,
        cuadranteVacio,
        esUnaActualizacionTrabajador,
        columnaIndiceAGestionar,
        posicionTrabajadorPrevioACambiar,
        cambiadaConfiguracionGeneral
    } = getState().variablesCuadrantesSetters;
    const { objetoTrabajador } = getState().variablesTrabajadores;

    let arrayTr = [];
    if (esInicioTra) {
        arrayTr = [...trabajadoresEnCuadrante];
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoTrabajador['laPosicionDelTrabajador'] = arrayTr.length + 1;
        };
        if (cuadranteRegistrado === 'no') {
            const arrayCuadrante = [...cuadrante];
            const laColumnaAnadir = dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', false, null, false, false, objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipo));
            if (laColumnaAnadir) {
                arrayCuadrante.push(laColumnaAnadir);
                arrayTr.push(objetoTrabajador);
                dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
            };
            dispatch(setCuadranteAccion(arrayCuadrante));
        } else {
            arrayTr.push(objetoTrabajador);
            dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
        };
    }
    if (esCambioTra) {
        arrayTr = [...trabajadoresEnCuadrante];
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoTrabajador['laPosicionDelTrabajador'] = posicionTrabajadorPrevioACambiar;
        };
        let repetidoTrabajador, repetidoSuplente;
        repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === objetoTrabajador.id);
        repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === objetoTrabajador.id);
        if (objetoTrabajador.estado !== 'alta') {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Este trabajador se encuentra de baja, selecciona otro.",
                tipo: 'error'
            }));
        } else if ((repetidoTrabajador || repetidoSuplente) && !esUnaActualizacionTrabajador) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Este trabajador ya se encuentra en el cuadrante, selecciona otro.",
                tipo: 'error'
            }));
        } else {
            if (valorPrevioAccordionAbierto) {
                const posicionTrabajador = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === valorPrevioAccordionAbierto));
                arrayTr.splice(posicionTrabajador, 1);
            };
            if (!cuadranteVacio) {
                if (!cambiadaConfiguracionGeneral) {
                    dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', true, columnaIndiceAGestionar, false, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
                } else {
                    dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
                };
            } else {
                dispatch(setCuadranteVacioAccion(false));
                dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
            };
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
    }
};

export const gestionSuplenteAccion = () => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
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
        cambiadaConfiguracionGeneral
    } = getState().variablesCuadrantesSetters;
    const { objetoSuplente } = getState().variablesTrabajadores;

    let arraySu = [];
    if (esInicioSup) {
        arraySu = [...suplentesEnCuadrante];
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoSuplente['laPosicionDelTrabajador'] = arraySu.length + 1;
        }
        if (cuadranteRegistrado === 'no') {
            const arrayCuadrante = [...cuadrante];
            const laColumnaAnadir = dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', false, null, false, false, objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipo));
            if (laColumnaAnadir) {
                arrayCuadrante.push(laColumnaAnadir);
                arraySu.push(objetoSuplente);
                dispatch(setSuplentesEnCuadranteAccion(arraySu));
            };
            dispatch(setCuadranteAccion(arrayCuadrante));
        } else {
            arraySu.push(objetoSuplente);
            dispatch(setSuplentesEnCuadranteAccion(arraySu));
        };
    };
    if (esCambioSup) {
        arraySu = [...suplentesEnCuadrante];
        if (objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoSuplente['laPosicionDelTrabajador'] = posicionSuplentePrevioACambiar;
        };
        let repetidoTrabajador, repetidoSuplente;
        repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === objetoSuplente.id);
        repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === objetoSuplente.id);
        if (objetoSuplente.estado !== 'alta') {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Este trabajador se encuentra de baja, selecciona otro.",
                tipo: 'error'
            }));
        } else if ((repetidoTrabajador || repetidoSuplente) && !esUnaActualizacionTrabajador) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Este trabajador ya se encuentra en el cuadrante, selecciona otro.",
                tipo: 'error'
            }));
        } else {
            if (valorPrevioAccordionAbierto) {
                const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === valorPrevioAccordionAbierto));
                arraySu.splice(posicionSuplente, 1);
            };
            if (!cuadranteVacio) {
                if (!cambiadaConfiguracionGeneral) {
                    dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', true, columnaIndiceAGestionar, false, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
                } else {
                    dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
                };
            } else {
                dispatch(setCuadranteVacioAccion(false));
                dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral));
            };
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
    }

};

