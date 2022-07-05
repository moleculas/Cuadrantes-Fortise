
import { setNumeroCuadrantesCuadrantesAccion } from './cuadrantesSettersDucks';
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
import { setBufferSwitchedDiasFestivosCuadranteAccion } from './cuadrantesSettersDucks';
import { configuraStateFestivoAccion } from './cuadrantesHandlersDucks';
import { setCuadranteBloqueadoAccion } from './cuadrantesSettersDucks';
import { obtenerCuadrantesPeriodicosAccion } from './cuadrantesDucks';
import { obtenerNumeroRecibosAccion } from './appDucks';
import { actualizarNumeroRecibosAccion } from './appDucks';
import { generarArchivosXLSAccion } from './appDucks';
import { retornaTextoConceptoServicioAccion } from './appDucks';
import { setDisableCargandoAccion } from '../redux/cuadrantesSettersDucks';
import { stringify } from 'zipson';

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

const obtenerDatosGestionEspecialAccion = () => (dispatch, getState) => {
    const { objetoCentro } = getState().variablesCentros;
    const { objetoCuadrante } = getState().variablesCuadrantes;
    if (objetoCuadrante.total && objetoCuadrante.total.procesado && !objetoCuadrante.total.procesado.numR) {
        if ((objetoCentro.horario.horario[0] && objetoCentro.horario.horario[0].computo === 3) || objetoCentro.serviciosFijos.gestionEspSF) {
            dispatch(obtenerNumeroRecibosAccion('configuracion'));
        };
    };
};

const calculaTocaFacturacionAccion = () => (dispatch, getState) => {
    const { calendarioAGestionar, totalesPeriodicos } = getState().variablesCuadrantes;
    const { objetoCentro } = getState().variablesCentros;
    let myArrSplit = calendarioAGestionar.split("-");
    const mes = parseInt(myArrSplit[1]);
    let objetoRetornoCalculo = {};
    if (objetoCentro.tempPago === 'bimensual' && (mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 9 || mes === 11)) {
        objetoRetornoCalculo = {
            valor: 'no',
            razon: 'temp'
        };
        return objetoRetornoCalculo
    };
    if (objetoCentro.tempPago === 'bimensual' && (mes === 2 || mes === 4 || mes === 6 || mes === 8 || mes === 10 || mes === 12)) {
        objetoRetornoCalculo = {
            valor: 'si',
            razon: ''
        };
        if (!totalesPeriodicos.total) {
            dispatch(obtenerCuadrantesPeriodicosAccion('cuadrantes', calendarioAGestionar, 'bimensual', objetoCentro.id));
        };
        return objetoRetornoCalculo
    };
    if (objetoCentro.tempPago === 'trimestral' && (mes === 1 || mes === 2 || mes === 4 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 11)) {
        objetoRetornoCalculo = {
            valor: 'no',
            razon: 'temp'
        };
        return objetoRetornoCalculo
    };
    if (objetoCentro.tempPago === 'trimestral' && (mes === 3 || mes === 6 || mes === 9 || mes === 12)) {
        objetoRetornoCalculo = {
            valor: 'si',
            razon: ''
        };
        if (!totalesPeriodicos.total) {
            dispatch(obtenerCuadrantesPeriodicosAccion('cuadrantes', calendarioAGestionar, 'trimestral', objetoCentro.id));
        };
        return objetoRetornoCalculo
    };
    if (objetoCentro.horario.horario[0] && objetoCentro.horario.horario[0].computo === 3) {
        objetoRetornoCalculo = {
            valor: 'no',
            razon: 'gest'
        };
        return objetoRetornoCalculo
    };
    if (objetoCentro.serviciosFijos.gestionEspSF) {
        objetoRetornoCalculo = {
            valor: 'no',
            razon: 'gest'
        };
        return objetoRetornoCalculo
    };
    objetoRetornoCalculo = {
        valor: 'si',
        razon: ''
    };
    return objetoRetornoCalculo
};

export const calculaNumeroCuadrantesAccion = (total) => (dispatch, getState) => {
    let arrayAAnadir = [];
    for (let i = 0; i < total; i++) {
        arrayAAnadir.push({ value: i + 1, revisado: false });
    };
    dispatch(setNumeroCuadrantesCuadrantesAccion(arrayAAnadir));
};

export const gestionaFestivosInicio = () => (dispatch, getState) => {
    const { objetoCuadrante, losDiasDelMes, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { bufferSwitchedDiasFestivosCuadrante, numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    let postRef;
    let mySplitDia;
    let object = {};
    if (losDiasDelMes.length > 0) {
        for (let i = 1; i <= losDiasDelMes.length; i++) {
            object['estadoFestivoDia' + i] = false;
            object['tipoFestivoDia' + i] = 0;
        };
    };
    if (cuadranteRegistrado === 'si') {
        if (!numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado) {
            if (objetoCuadrante.datosBuffer.datosBuffer && objetoCuadrante.datosBuffer.datosBuffer.length > 0) {
                if (bufferSwitchedDiasFestivosCuadrante.length === 0) {
                    dispatch(setBufferSwitchedDiasFestivosCuadranteAccion(objetoCuadrante.datosBuffer.datosBuffer));
                    objetoCuadrante.datosBuffer.datosBuffer[cuadranteEnUsoCuadrantes - 1].forEach((festivo, index) => {
                        postRef = Object.keys(festivo)[0];
                        if (postRef.includes('Lunes')) {
                            mySplitDia = postRef.split('Lunes');
                        };
                        if (postRef.includes('Martes')) {
                            mySplitDia = postRef.split('Martes');
                        };
                        if (postRef.includes('Miércoles')) {
                            mySplitDia = postRef.split('Miércoles');
                        };
                        if (postRef.includes('Jueves')) {
                            mySplitDia = postRef.split('Jueves');
                        };
                        if (postRef.includes('Viernes')) {
                            mySplitDia = postRef.split('Viernes');
                        };
                        if (postRef.includes('Sábado')) {
                            mySplitDia = postRef.split('Sábado');
                        };
                        if (postRef.includes('Domingo')) {
                            mySplitDia = postRef.split('Domingo');
                        };
                        if (festivo.activo) {
                            object['estadoFestivoDia' + mySplitDia[1]] = true;
                            if (festivo.tipo === 1) {
                                object['tipoFestivoDia' + mySplitDia[1]] = 1;
                            };
                            if (festivo.tipo === 2) {
                                object['tipoFestivoDia' + mySplitDia[1]] = 2;
                            };
                        };
                    });
                    dispatch(setStateFestivoAccion(object));
                } else {
                    bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1].forEach((festivo, index) => {
                        postRef = Object.keys(festivo)[0];
                        if (postRef.includes('Lunes')) {
                            mySplitDia = postRef.split('Lunes');
                        };
                        if (postRef.includes('Martes')) {
                            mySplitDia = postRef.split('Martes');
                        };
                        if (postRef.includes('Miércoles')) {
                            mySplitDia = postRef.split('Miércoles');
                        };
                        if (postRef.includes('Jueves')) {
                            mySplitDia = postRef.split('Jueves');
                        };
                        if (postRef.includes('Viernes')) {
                            mySplitDia = postRef.split('Viernes');
                        };
                        if (postRef.includes('Sábado')) {
                            mySplitDia = postRef.split('Sábado');
                        };
                        if (postRef.includes('Domingo')) {
                            mySplitDia = postRef.split('Domingo');
                        };
                        if (festivo.activo) {
                            object['estadoFestivoDia' + mySplitDia[1]] = true;
                            if (festivo.tipo === 1) {
                                object['tipoFestivoDia' + mySplitDia[1]] = 1;
                            };
                            if (festivo.tipo === 2) {
                                object['tipoFestivoDia' + mySplitDia[1]] = 2;
                            };
                        };
                    });
                    dispatch(setStateFestivoAccion(object));
                };
            } else {
                dispatch(configuraStateFestivoAccion());
            };
        } else {
            if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
                bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1].forEach((festivo, index) => {
                    postRef = Object.keys(festivo)[0];
                    if (postRef.includes('Lunes')) {
                        mySplitDia = postRef.split('Lunes');
                    };
                    if (postRef.includes('Martes')) {
                        mySplitDia = postRef.split('Martes');
                    };
                    if (postRef.includes('Miércoles')) {
                        mySplitDia = postRef.split('Miércoles');
                    };
                    if (postRef.includes('Jueves')) {
                        mySplitDia = postRef.split('Jueves');
                    };
                    if (postRef.includes('Viernes')) {
                        mySplitDia = postRef.split('Viernes');
                    };
                    if (postRef.includes('Sábado')) {
                        mySplitDia = postRef.split('Sábado');
                    };
                    if (postRef.includes('Domingo')) {
                        mySplitDia = postRef.split('Domingo');
                    };
                    if (festivo.activo) {
                        object['estadoFestivoDia' + mySplitDia[1]] = true;
                        if (festivo.tipo === 1) {
                            object['tipoFestivoDia' + mySplitDia[1]] = 1;
                        };
                        if (festivo.tipo === 2) {
                            object['tipoFestivoDia' + mySplitDia[1]] = 2;
                        };
                    };
                });
                dispatch(setStateFestivoAccion(object));
            } else {
                dispatch(configuraStateFestivoAccion());
            };
        };
    };
    if (cuadranteRegistrado === 'no') {
        if (bufferSwitchedDiasFestivosCuadrante.length === 0) {
            dispatch(configuraStateFestivoAccion());
        } else {
            bufferSwitchedDiasFestivosCuadrante[cuadranteEnUsoCuadrantes - 1].forEach((festivo, index) => {
                postRef = Object.keys(festivo)[0];
                if (postRef.includes('Lunes')) {
                    mySplitDia = postRef.split('Lunes');
                };
                if (postRef.includes('Martes')) {
                    mySplitDia = postRef.split('Martes');
                };
                if (postRef.includes('Miércoles')) {
                    mySplitDia = postRef.split('Miércoles');
                };
                if (postRef.includes('Jueves')) {
                    mySplitDia = postRef.split('Jueves');
                };
                if (postRef.includes('Viernes')) {
                    mySplitDia = postRef.split('Viernes');
                };
                if (postRef.includes('Sábado')) {
                    mySplitDia = postRef.split('Sábado');
                };
                if (postRef.includes('Domingo')) {
                    mySplitDia = postRef.split('Domingo');
                };
                if (festivo.activo) {
                    object['estadoFestivoDia' + mySplitDia[1]] = true;
                    if (festivo.tipo === 1) {
                        object['tipoFestivoDia' + mySplitDia[1]] = 1;
                    };
                    if (festivo.tipo === 2) {
                        object['tipoFestivoDia' + mySplitDia[1]] = 2;
                    };
                };
            });
            dispatch(setStateFestivoAccion(object));
        };
    };
};

export const gestionaCuadranteIndividualAccion = (numeroCuadrante, cambio) => (dispatch, getState) => {
    const { objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes } = getState().variablesCuadrantesSetters;
    const { objetoCentro } = getState().variablesCentros;
    if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado) {
        dispatch(gestionaFestivosInicio());
    };
    if (!cambio) {
        dispatch(calculaNumeroCuadrantesAccion(objetoCuadrante.datosCuadrante.datosCuadrante.length));
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
        activo_PA: 'si',
        int_TO: false,
        int_CR: false,
        int_CE: false,
        int_CI: false,
        int_MO: false,
        int_OF: false,
        int_AL: false,
        int_LA: false,
        int_TE: false,
        int_FI: false,
        int_FE: false,
        int_AB: false,
        int_MA: false,
        int_PO: false,
        int_BA: false,
        int_FT: false,
        int_C3: false,
        int_C2: false,
        int_ES: false,
        int_PA: false,
        trab_TO: '',
        trab_CR: '',
        trab_CE: '',
        trab_CI: '',
        trab_MO: '',
        trab_OF: '',
        trab_AL: '',
        trab_LA: '',
        trab_TE: '',
        trab_FI: '',
        trab_FE: '',
        trab_AB: '',
        trab_MA: '',
        trab_PO: '',
        trab_BA: '',
        trab_FT: '',
        trab_C3: '',
        trab_C2: '',
        trab_ES: '',
        trab_PA: ''
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
    let bloqueadoSF = 'no';
    if (!objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].tipoHorarioGeneral) {
        dispatch(setCuadranteVacioAccion(true));
    };
    if (objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1]) {
        objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1].forEach((servicio) => {
            if (servicio.precioHora_TO || servicio.int_TO) {
                myObjetoServiciosFijos.precioHora_TO = servicio.precioHora_TO;
                myObjetoServiciosFijos.variacion_TO = servicio.variacion_TO;
                myObjetoServiciosFijos.diaVariacion_TO = servicio.diaVariacion_TO;
                myObjetoServiciosFijos.activo_TO = servicio.activo_TO;
                myObjetoServiciosFijos.int_TO = servicio.int_TO;
                myObjetoServiciosFijos.trab_TO = servicio.trab_TO ? servicio.trab_TO : '';
                objetoEstadosSwitch.TO = true;
            };
            if (servicio.precioHora_CR || servicio.int_CR) {
                myObjetoServiciosFijos.precioHora_CR = servicio.precioHora_CR;
                myObjetoServiciosFijos.variacion_CR = servicio.variacion_CR;
                myObjetoServiciosFijos.diaVariacion_CR = servicio.diaVariacion_CR;
                myObjetoServiciosFijos.activo_CR = servicio.activo_CR;
                myObjetoServiciosFijos.int_CR = servicio.int_CR;
                myObjetoServiciosFijos.trab_CR = servicio.trab_CR ? servicio.trab_CR : '';
                objetoEstadosSwitch.CR = true;
            };
            if (servicio.precioHora_CE || servicio.int_CE) {
                myObjetoServiciosFijos.precioHora_CE = servicio.precioHora_CE;
                myObjetoServiciosFijos.variacion_CE = servicio.variacion_CE;
                myObjetoServiciosFijos.diaVariacion_CE = servicio.diaVariacion_CE;
                myObjetoServiciosFijos.activo_CE = servicio.activo_CE;
                myObjetoServiciosFijos.int_CE = servicio.int_CE;
                myObjetoServiciosFijos.trab_CE = servicio.trab_CE ? servicio.trab_CE : '';
                objetoEstadosSwitch.CE = true;
            };
            if (servicio.precioHora_CI || servicio.int_CI) {
                myObjetoServiciosFijos.precioHora_CI = servicio.precioHora_CI;
                myObjetoServiciosFijos.variacion_CI = servicio.variacion_CI;
                myObjetoServiciosFijos.diaVariacion_CI = servicio.diaVariacion_CI;
                myObjetoServiciosFijos.activo_CI = servicio.activo_CI;
                myObjetoServiciosFijos.int_CI = servicio.int_CI;
                myObjetoServiciosFijos.trab_CI = servicio.trab_CI ? servicio.trab_CI : '';
                objetoEstadosSwitch.CI = true;
            };
            if (servicio.precioHora_MO || servicio.int_MO) {
                myObjetoServiciosFijos.precioHora_MO = servicio.precioHora_MO;
                myObjetoServiciosFijos.variacion_MO = servicio.variacion_MO;
                myObjetoServiciosFijos.diaVariacion_MO = servicio.diaVariacion_MO;
                myObjetoServiciosFijos.activo_MO = servicio.activo_MO;
                myObjetoServiciosFijos.int_MO = servicio.int_MO;
                myObjetoServiciosFijos.trab_MO = servicio.trab_MO ? servicio.trab_MO : '';
                objetoEstadosSwitch.MO = true;
            };
            if (servicio.precioHora_OF || servicio.int_OF) {
                myObjetoServiciosFijos.precioHora_OF = servicio.precioHora_OF;
                myObjetoServiciosFijos.variacion_OF = servicio.variacion_OF;
                myObjetoServiciosFijos.diaVariacion_OF = servicio.diaVariacion_OF;
                myObjetoServiciosFijos.activo_OF = servicio.activo_OF;
                myObjetoServiciosFijos.int_OF = servicio.int_OF;
                myObjetoServiciosFijos.trab_OF = servicio.trab_OF ? servicio.trab_OF : '';
                objetoEstadosSwitch.OF = true;
            };
            if (servicio.precioHora_AL || servicio.int_AL) {
                myObjetoServiciosFijos.precioHora_AL = servicio.precioHora_AL;
                myObjetoServiciosFijos.variacion_AL = servicio.variacion_AL;
                myObjetoServiciosFijos.diaVariacion_AL = servicio.diaVariacion_AL;
                myObjetoServiciosFijos.activo_AL = servicio.activo_AL;
                myObjetoServiciosFijos.int_AL = servicio.int_AL;
                myObjetoServiciosFijos.trab_AL = servicio.trab_AL ? servicio.trab_AL : '';
                objetoEstadosSwitch.AL = true;
            };
            if (servicio.precioHora_LA || servicio.int_LA) {
                myObjetoServiciosFijos.precioHora_LA = servicio.precioHora_LA;
                myObjetoServiciosFijos.variacion_LA = servicio.variacion_LA;
                myObjetoServiciosFijos.diaVariacion_LA = servicio.diaVariacion_LA;
                myObjetoServiciosFijos.activo_LA = servicio.activo_LA;
                myObjetoServiciosFijos.int_LA = servicio.int_LA;
                myObjetoServiciosFijos.trab_LA = servicio.trab_LA ? servicio.trab_LA : '';
                objetoEstadosSwitch.LA = true;
            };
            if (servicio.precioHora_TE || servicio.int_TE) {
                myObjetoServiciosFijos.precioHora_TE = servicio.precioHora_TE;
                myObjetoServiciosFijos.variacion_TE = servicio.variacion_TE;
                myObjetoServiciosFijos.diaVariacion_TE = servicio.diaVariacion_TE;
                myObjetoServiciosFijos.activo_TE = servicio.activo_TE;
                myObjetoServiciosFijos.int_TE = servicio.int_TE;
                myObjetoServiciosFijos.trab_TE = servicio.trab_TE ? servicio.trab_TE : '';
                objetoEstadosSwitch.TE = true;
            };
            if (servicio.precioHora_FI || servicio.int_FI) {
                myObjetoServiciosFijos.precioHora_FI = servicio.precioHora_FI;
                myObjetoServiciosFijos.variacion_FI = servicio.variacion_FI;
                myObjetoServiciosFijos.diaVariacion_FI = servicio.diaVariacion_FI;
                myObjetoServiciosFijos.activo_FI = servicio.activo_FI;
                myObjetoServiciosFijos.int_FI = servicio.int_FI;
                myObjetoServiciosFijos.trab_FI = servicio.trab_FI ? servicio.trab_FI : '';
                objetoEstadosSwitch.FI = true;
            };
            if (servicio.precioHora_FE || servicio.int_FE) {
                myObjetoServiciosFijos.precioHora_FE = servicio.precioHora_FE;
                myObjetoServiciosFijos.variacion_FE = servicio.variacion_FE;
                myObjetoServiciosFijos.diaVariacion_FE = servicio.diaVariacion_FE;
                myObjetoServiciosFijos.activo_FE = servicio.activo_FE;
                myObjetoServiciosFijos.int_FE = servicio.int_FE;
                myObjetoServiciosFijos.trab_FE = servicio.trab_FE ? servicio.trab_FE : '';
                objetoEstadosSwitch.FE = true;
            };
            if (servicio.precioHora_AB || servicio.int_AB) {
                myObjetoServiciosFijos.precioHora_AB = servicio.precioHora_AB;
                myObjetoServiciosFijos.variacion_AB = servicio.variacion_AB;
                myObjetoServiciosFijos.diaVariacion_AB = servicio.diaVariacion_AB;
                myObjetoServiciosFijos.activo_AB = servicio.activo_AB;
                myObjetoServiciosFijos.int_AB = servicio.int_AB;
                myObjetoServiciosFijos.trab_AB = servicio.trab_AB ? servicio.trab_AB : '';
                objetoEstadosSwitch.AB = true;
            };
            if (servicio.precioHora_MA || servicio.int_MA) {
                myObjetoServiciosFijos.precioHora_MA = servicio.precioHora_MA;
                myObjetoServiciosFijos.variacion_MA = servicio.variacion_MA;
                myObjetoServiciosFijos.diaVariacion_MA = servicio.diaVariacion_MA;
                myObjetoServiciosFijos.activo_MA = servicio.activo_MA;
                myObjetoServiciosFijos.int_MA = servicio.int_MA;
                myObjetoServiciosFijos.trab_MA = servicio.trab_MA ? servicio.trab_MA : '';
                objetoEstadosSwitch.MA = true;
            };
            if (servicio.precioHora_PO || servicio.int_PO) {
                myObjetoServiciosFijos.precioHora_PO = servicio.precioHora_PO;
                myObjetoServiciosFijos.variacion_PO = servicio.variacion_PO;
                myObjetoServiciosFijos.diaVariacion_PO = servicio.diaVariacion_PO;
                myObjetoServiciosFijos.activo_PO = servicio.activo_PO;
                myObjetoServiciosFijos.int_PO = servicio.int_PO;
                myObjetoServiciosFijos.trab_PO = servicio.trab_PO ? servicio.trab_PO : '';
                objetoEstadosSwitch.PO = true;
            };
            if (servicio.precioHora_BA || servicio.int_BA) {
                myObjetoServiciosFijos.precioHora_BA = servicio.precioHora_BA;
                myObjetoServiciosFijos.variacion_BA = servicio.variacion_BA;
                myObjetoServiciosFijos.diaVariacion_BA = servicio.diaVariacion_BA;
                myObjetoServiciosFijos.activo_BA = servicio.activo_BA;
                myObjetoServiciosFijos.int_BA = servicio.int_BA;
                myObjetoServiciosFijos.trab_BA = servicio.trab_BA ? servicio.trab_BA : '';
                objetoEstadosSwitch.BA = true;
            };
            if (servicio.precioHora_FT || servicio.int_FT) {
                myObjetoServiciosFijos.precioHora_FT = servicio.precioHora_FT;
                myObjetoServiciosFijos.variacion_FT = servicio.variacion_FT;
                myObjetoServiciosFijos.diaVariacion_FT = servicio.diaVariacion_FT;
                myObjetoServiciosFijos.activo_FT = servicio.activo_FT;
                myObjetoServiciosFijos.int_FT = servicio.int_FT;
                myObjetoServiciosFijos.trab_FT = servicio.trab_FT ? servicio.trab_FT : '';
                objetoEstadosSwitch.FT = true;
            };
            if (servicio.precioHora_C3 || servicio.int_C3) {
                myObjetoServiciosFijos.precioHora_C3 = servicio.precioHora_C3;
                myObjetoServiciosFijos.variacion_C3 = servicio.variacion_C3;
                myObjetoServiciosFijos.diaVariacion_C3 = servicio.diaVariacion_C3;
                myObjetoServiciosFijos.activo_C3 = servicio.activo_C3;
                myObjetoServiciosFijos.int_C3 = servicio.int_C3;
                myObjetoServiciosFijos.trab_C3 = servicio.trab_C3 ? servicio.trab_C3 : '';
                objetoEstadosSwitch.C3 = true;
            };
            if (servicio.precioHora_C2 || servicio.int_C2) {
                myObjetoServiciosFijos.precioHora_C2 = servicio.precioHora_C2;
                myObjetoServiciosFijos.variacion_C2 = servicio.variacion_C2;
                myObjetoServiciosFijos.diaVariacion_C2 = servicio.diaVariacion_C2;
                myObjetoServiciosFijos.activo_C2 = servicio.activo_C2;
                myObjetoServiciosFijos.int_C2 = servicio.int_C2;
                myObjetoServiciosFijos.trab_C2 = servicio.trab_C2 ? servicio.trab_C2 : '';
                objetoEstadosSwitch.C2 = true;
            };
            if (servicio.precioHora_ES || servicio.int_ES) {
                myObjetoServiciosFijos.precioHora_ES = servicio.precioHora_ES;
                myObjetoServiciosFijos.variacion_ES = servicio.variacion_ES;
                myObjetoServiciosFijos.diaVariacion_ES = servicio.diaVariacion_ES;
                myObjetoServiciosFijos.activo_ES = servicio.activo_ES;
                myObjetoServiciosFijos.int_ES = servicio.int_ES;
                myObjetoServiciosFijos.trab_ES = servicio.trab_ES ? servicio.trab_ES : '';
                objetoEstadosSwitch.ES = true;
            };
            if (servicio.precioHora_PA || servicio.int_PA) {
                myObjetoServiciosFijos.precioHora_PA = servicio.precioHora_PA;
                myObjetoServiciosFijos.variacion_PA = servicio.variacion_PA;
                myObjetoServiciosFijos.diaVariacion_PA = servicio.diaVariacion_PA;
                myObjetoServiciosFijos.activo_PA = servicio.activo_PA;
                myObjetoServiciosFijos.int_PA = servicio.int_PA;
                myObjetoServiciosFijos.trab_PA = servicio.trab_PA ? servicio.trab_PA : '';
                objetoEstadosSwitch.PA = true;
            };
        });
        dispatch(setCuadranteServiciosFijosAccion(dispatch(gestionaColumnaServiciosFijosInicioAccion(objetoCuadrante.datosServicios.datosServicios[numeroCuadrante - 1]))));
        bloqueadoSF = (objetoCuadrante.datosServicios.bloqueado && objetoCuadrante.datosServicios.bloqueado[numeroCuadrante - 1]) ? objetoCuadrante.datosServicios.bloqueado[numeroCuadrante - 1] : 'no';
    };
    if (cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado) {
        if (objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[numeroCuadrante - 1]) {
            objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[numeroCuadrante - 1].trabajadores.forEach((trabajadorIterado, index) => {
                dispatch(setDisableCargandoAccion(true));
                setTimeout(
                    function () {
                        const funcionObtenerTrabajador = () => {
                            if (trabajadorIterado['trabajador_' + (index + 1)]) {
                                dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado['trabajador_' + (index + 1)]));
                            };
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    return resolve({ resuelto: true });
                                }, 500);
                            });
                        };
                        funcionObtenerTrabajador().then(values => {
                            if (values.resuelto) {
                                if (trabajadorIterado['suplente_' + (index + 1)]) {
                                    dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado['suplente_' + (index + 1)]));
                                };
                            }
                        });
                    }, index * 1000);
                setTimeout(() => {
                    dispatch(setDisableCargandoAccion(false));
                }, (objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[numeroCuadrante - 1].trabajadores.length * 1000) + 1000);
            });
        };
    };
    if (cuadranteRegistrado === 'si') {
        if (objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.length > 0) {
            objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.forEach((trabajadorIterado, index) => {
                dispatch(setDisableCargandoAccion(true));
                setTimeout(
                    function () {
                        const funcionObtenerTrabajador = () => {
                            if (trabajadorIterado.tipoTrabajador === 'trabajador') {
                                dispatch(obtenerTrabajadorAccion('trabajadores', trabajadorIterado.idTrabajador));
                            };
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    return resolve({ resuelto: true });
                                }, 500);
                            });
                        };
                        funcionObtenerTrabajador().then(values => {
                            if (values.resuelto) {
                                if (trabajadorIterado.tipoTrabajador === 'suplente') {
                                    dispatch(obtenerSuplenteAccion('trabajadores', trabajadorIterado.idTrabajador));
                                };
                            }
                        });
                    }, index * 1000);
                setTimeout(() => {
                    dispatch(setDisableCargandoAccion(false));
                }, (objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.length * 1000) + 1000);
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
    if (objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1] && objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].tipoHorarioGeneral) {
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
            tipoHorario: objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].tipoHorarioGeneral,
            computo: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].computo,
            excepcion: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].excepcion ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].excepcion : '',
            bloqueado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].bloqueado ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].bloqueado : 'no',
            mensualPactado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado >= 0 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado : '',
            mensualPactadoInicial: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactadoInicial ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactadoInicial : '',
            precioHora_L: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L : '',
            precioHora_E: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E : '',
            precioHora_P: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P : '',
            precioHora_N: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N : '',
            precioHora_R: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R : '',
            precioHora_L1: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 : '',
            precioHora_L2: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 : '',
            precioHora_F: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F : ''
        };
    };
    objetoDatosCuadrante = {
        ...objetoDatosCuadrante,
        observaciones: objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].observaciones ? objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].observaciones : '',
        festivos: {
            inicio: null,
            fin: null,
            tipo: '',
        }
    };
    dispatch(setItemEditandoConfiguracionAccion(objetoDatosCuadrante));
    if (cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[numeroCuadrante - 1].revisado)) {
        let losDatosInforme;
        if (objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante.length > 0) {
            const arrayResultante = dispatch(completarCuadranteAccion(objetoCuadrante.datosCuadrante.datosCuadrante[numeroCuadrante - 1].arrayCuadrante));
            dispatch(setCuadranteAccion(arrayResultante));
            dispatch(gestionaFestivosInicio());
            let objetoDatosInforme = {
                computo: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].computo,
                excepcion: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].excepcion ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].excepcion : '',
                bloqueado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].bloqueado,
                tipoRegistro: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].tipoRegistro,
                mensualPactado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado >= 0 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactado : null,
                mensualPactadoInicial: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactadoInicial ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].mensualPactadoInicial : '',
                proporcion: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].proporcion ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].proporcion : null,
                precioHoraTotal: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHoraTotal ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHoraTotal : null,
                precioHora_L: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L : null,
                precioHora_E: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_E : null,
                precioHora_P: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_P : null,
                precioHora_N: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_N : null,
                precioHora_R: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_R : null,
                precioHora_L1: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L1 : null,
                precioHora_L2: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_L2 : null,
                precioHora_F: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].precioHora_F : null,
                totalFacturado_L: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L : null,
                totalFacturado_E: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_E ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_E : null,
                totalFacturado_P: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_P ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_P : null,
                totalFacturado_N: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_N ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_N : null,
                totalFacturado_R: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_R ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_R : null,
                totalFacturado_L1: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L1 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L1 : null,
                totalFacturado_L2: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L2 ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_L2 : null,
                totalFacturado_F: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_F ? objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].totalFacturado_F : null,
                iniciado: objetoCuadrante.datosInforme.datosInforme[numeroCuadrante - 1].iniciado,
                arrayDatosInforme: []
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
                if (objetoCentro.nombre !== '') {
                    dispatch(obtenerDatosGestionEspecialAccion());
                };
            } else {
                dispatch(setEstamosActualizandoCuadranteSinCargaAccion(true));
                dispatch(actualizarObjetoCuadranteAccion({
                    ...objetoCuadrante,
                    datosInforme: losDatosInforme
                }));
            };
        } else {
            if (cuadranteRegistrado === 'si') {
                if (objetoCentro.nombre !== '') {
                    dispatch(obtenerDatosGestionEspecialAccion());
                };
                if (objetoCuadrante.total.totalesPeriodicos) {
                    losDatosInforme = { ...objetoCuadrante.datosInforme };
                    dispatch(revisionCuadrantesPeriodicos(losDatosInforme));
                } else {
                    dispatch(gestionaFestivosInicio());
                };
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

export const cambiarEstadoCuadranteEnUsoRevisadoAccion = (estado) => (dispatch, getState) => {
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    let arrayNumeroCuadrantes = [...numeroCuadrantesCuadrantes];
    arrayNumeroCuadrantes = arrayNumeroCuadrantes.map(cuadrante => (cuadrante.value === cuadranteEnUsoCuadrantes ? { ...cuadrante, revisado: estado } : cuadrante));
    dispatch(setNumeroCuadrantesCuadrantesAccion(arrayNumeroCuadrantes));
};

const calculoTotalHoras = () => (dispatch, getState) => {
    const { objetoCuadrante } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    let sumatorioHoras_L = 0;
    let sumatorioHoras_E = 0;
    let sumatorioHoras_P = 0;
    let sumatorioHoras_N = 0;
    let sumatorioHoras_R = 0;
    let sumatorioHoras_L1 = 0;
    let sumatorioHoras_L2 = 0;
    let sumatorioHoras_F = 0;
    let sumatorioTotal = 0;
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.length > 0) {
        objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.forEach((dato, index) => {
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
    const { cuadranteServiciosFijos } = getState().variablesCuadrantesServiciosFijos;
    const { cuadrante, objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes } = getState().variablesCuadrantesSetters;
    //revisamos que el cuadrante no esté a 0
    let sumatorioHoras = 0;
    if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.length > 0) {
        objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.forEach((dato, index) => {
            sumatorioHoras += dato.totalHoras;
        });
    }
    let hayServiciosFijos = false;
    let arrayFinalServiciosFijos = [];
    let sumatorioServiciosFijos = 0;
    let arrayTrabajadoresInicialesCuadrante = [];
    if (cuadranteRegistrado === 'no') {
        arrayTrabajadoresInicialesCuadrante = [...objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales];
    };
    cuadranteServiciosFijos.forEach((servicio) => {
        if (servicio.tipoServiciofijo === 'TOL') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRIS') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRISE') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRISI') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'MOQ') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'OF') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'ALMC') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'LAB') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'TELÑ') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'FCH.IN') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'FCH.EX') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'ABRLL') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'MANT') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'PORT') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'BACT') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'FEST') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRTRIM') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'CRBIM') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'LIME') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
            };
            delete servicio.estados;
            arrayFinalServiciosFijos.push({ ...servicio });
            hayServiciosFijos = true;
        };
        if (servicio.tipoServiciofijo === 'LIMP') {
            if (servicio.totalServicioFijo !== null) {
                sumatorioServiciosFijos += parseFloat(servicio.totalServicioFijo);
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
        //if (!cuadrante[i].nombreTrabajador || arrayDatosInforme[i].totalHoras === 0) {
        if (!cuadrante[i].nombreTrabajador) {
            cuadrante.splice(i, 1);
            objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].arrayDatosInforme.splice(i, 1);
            if (cuadranteRegistrado === 'no') {
                arrayTrabajadoresInicialesCuadrante[index] = null;
            };
        };
    };
    dispatch(setTrabajadoresEnCuadranteAccion([]));
    dispatch(setSuplentesEnCuadranteAccion([]));
    dispatch(setEsCambioTraAccion(false));
    dispatch(setEsCambioSupAccion(false));
    dispatch(setEsInicioTraAccion(true));
    dispatch(setEsInicioSupAccion(true));
    const { sumatorioHoras_L, sumatorioHoras_E, sumatorioHoras_P, sumatorioHoras_N, sumatorioHoras_R, sumatorioHoras_L1, sumatorioHoras_L2, sumatorioHoras_F, sumatorioTotal } = dispatch(calculoTotalHoras());
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
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_L) {
            elTotalAAFacturar_L = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_L);
        } else {
            elTotalAAFacturar_L = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_E) {
            elTotalAAFacturar_E = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_E);
        } else {
            elTotalAAFacturar_E = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_P) {
            elTotalAAFacturar_P = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_P);
        } else {
            elTotalAAFacturar_P = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_N) {
            elTotalAAFacturar_N = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_N);
        } else {
            elTotalAAFacturar_N = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_R) {
            elTotalAAFacturar_R = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_R);
        } else {
            elTotalAAFacturar_R = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_L1) {
            elTotalAAFacturar_L1 = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_L1);
        } else {
            elTotalAAFacturar_L1 = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_L2) {
            elTotalAAFacturar_L2 = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_L2);
        } else {
            elTotalAAFacturar_L2 = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_F) {
            elTotalAAFacturar_F = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].totalFacturado_F);
        } else {
            elTotalAAFacturar_F = 0
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) {
            elTotalAAFacturarTotal = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].mensualPactado);
        } else {
            elTotalAAFacturarTotal = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHoraTotal);
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
        elObjetoServiciosFijos = arrayFinalServiciosFijos;
    } else {
        elObjetoDatosCuadrante = {
            tipoHorarioGeneral: objetoCuadrante.datosCuadrante.datosCuadrante[index].tipoHorarioGeneral,
            arrayCuadrante: cuadrante,
            observaciones: objetoCuadrante.datosCuadrante.datosCuadrante[index].observaciones,
            total: elTotalAAFacturarTotal += sumatorioServiciosFijos
        };
        elObjetoDatosInforme = {
            iniciado: objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial ? false : true,
            computo: objetoCuadrante.datosInforme.datosInforme[index].computo,
            excepcion: objetoCuadrante.datosInforme.datosInforme[index].excepcion,
            bloqueado: objetoCuadrante.datosInforme.datosInforme[index].bloqueado,
            tipoRegistro: objetoCuadrante.datosInforme.datosInforme[index].tipoRegistro,
            //arrayTrabajadores: arrayDatosInforme,
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial) {
            elObjetoDatosInforme['mensualPactado'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].mensualPactado);
            elObjetoDatosInforme['mensualPactadoInicial'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].mensualPactadoInicial);
            elObjetoDatosInforme['proporcion'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].proporcion);
            elObjetoDatosInforme['precioHoraTotal'] = null;
        } else {
            elObjetoDatosInforme['mensualPactado'] = null;
            elObjetoDatosInforme['mensualPactadoInicial'] = null;
            elObjetoDatosInforme['proporcion'] = null;
            elObjetoDatosInforme['precioHoraTotal'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHoraTotal);
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L) {
            elObjetoDatosInforme['precioHora_L'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L);
            elObjetoDatosInforme['totalFacturado_L'] = parseFloat(elTotalAAFacturar_L);
        } else {
            elObjetoDatosInforme['precioHora_L'] = null;
            elObjetoDatosInforme['totalFacturado_L'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_E) {
            elObjetoDatosInforme['precioHora_E'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_E);
            elObjetoDatosInforme['totalFacturado_E'] = parseFloat(elTotalAAFacturar_E);
        } else {
            elObjetoDatosInforme['precioHora_E'] = null;
            elObjetoDatosInforme['totalFacturado_E'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_P) {
            elObjetoDatosInforme['precioHora_P'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_P);
            elObjetoDatosInforme['totalFacturado_P'] = parseFloat(elTotalAAFacturar_P);
        } else {
            elObjetoDatosInforme['precioHora_P'] = null;
            elObjetoDatosInforme['totalFacturado_P'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_N) {
            elObjetoDatosInforme['precioHora_N'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_N);
            elObjetoDatosInforme['totalFacturado_N'] = parseFloat(elTotalAAFacturar_N);
        } else {
            elObjetoDatosInforme['precioHora_N'] = null;
            elObjetoDatosInforme['totalFacturado_N'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_R) {
            elObjetoDatosInforme['precioHora_R'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_R);
            elObjetoDatosInforme['totalFacturado_R'] = parseFloat(elTotalAAFacturar_R);
        } else {
            elObjetoDatosInforme['precioHora_R'] = null;
            elObjetoDatosInforme['totalFacturado_R'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1) {
            elObjetoDatosInforme['precioHora_L1'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L1);
            elObjetoDatosInforme['totalFacturado_L1'] = parseFloat(elTotalAAFacturar_L1);
        } else {
            elObjetoDatosInforme['precioHora_L1'] = null;
            elObjetoDatosInforme['totalFacturado_L1'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2) {
            elObjetoDatosInforme['precioHora_L2'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_L2);
            elObjetoDatosInforme['totalFacturado_L2'] = parseFloat(elTotalAAFacturar_L2);
        } else {
            elObjetoDatosInforme['precioHora_L2'] = null;
            elObjetoDatosInforme['totalFacturado_L2'] = null;
        };
        if (objetoCuadrante.datosInforme.datosInforme[index].precioHora_F) {
            elObjetoDatosInforme['precioHora_F'] = parseFloat(objetoCuadrante.datosInforme.datosInforme[index].precioHora_F);
            elObjetoDatosInforme['totalFacturado_F'] = parseFloat(elTotalAAFacturar_F);
        } else {
            elObjetoDatosInforme['precioHora_F'] = null;
            elObjetoDatosInforme['totalFacturado_F'] = null;
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
    return ({ cuadranteDevuelto: elObjetoDatosCuadrante, informeDevuelto: elObjetoDatosInforme, serviciosFijosDevuelto: elObjetoServiciosFijos, horasDevuelto: elObjetoHoras, trabajadoresDevuelto: arrayTrabajadoresInicialesCuadrante });
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
    let losDatosTrabajadores = {};
    const { cuadranteDevuelto, informeDevuelto, serviciosFijosDevuelto, horasDevuelto, trabajadoresDevuelto } = dispatch(procesarDatosCuadrantePromesa(cuadranteEnUsoCuadrantes - 1, true));
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
    losDatosTrabajadores = {
        ...objetoCuadrante.datosTrabajadoresIniciales,
        datosTrabajadoresIniciales: trabajadoresDevuelto
    }
    dispatch(cambiarEstadoCuadranteEnUsoRevisadoAccion(true));
    //dispatch(registrarIntervencionAccion(true));
    dispatch(actualizarObjetoCuadranteAccion({
        ...objetoCuadrante,
        datosCuadrante: losDatosCuadrante,
        datosInforme: losDatosInforme,
        datosServicios: losDatosServiciosFijos,
        horas: losDatosHoras,
        datosTrabajadoresIniciales: losDatosTrabajadores
    }));
    dispatch(reseteaContenidoCentroAccion(true));
    dispatch(setCuadranteEnUsoCuadrantesAccion(target));
    dispatch(gestionaCuadranteIndividualAccion(target, true));
    dispatch(obtenerCategoriaPorCentroAccion('centros', objetoCuadrante.datosCuadrante.centro, target - 1));
};

export const procesarDatosCuadranteAccion = (source) => (dispatch, getState) => {
    const { cuadranteRegistrado, objetoCuadrante } = getState().variablesCuadrantes;
    const { numeroCuadrantesCuadrantes, cuadranteEnUsoCuadrantes, bufferSwitchedDiasFestivosCuadrante } = getState().variablesCuadrantesSetters;
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
    numeroCuadrantesCuadrantes.forEach((cuadrante, index) => {
        if (!cuadrante.revisado) {
            todosRevisados = false;
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
    let losDatosBuffer = {};
    if (bufferSwitchedDiasFestivosCuadrante.length > 0) {
        losDatosBuffer = {
            ...objetoCuadrante.datosBuffer,
            datosBuffer: bufferSwitchedDiasFestivosCuadrante
        };
    } else {
        losDatosBuffer = null;
    };
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
    let totalFacturado_ES = 0;
    let totalFacturado_PA = 0;
    let totalHoras_L = 0;
    let totalHoras_E = 0;
    let totalHoras_P = 0;
    let totalHoras_N = 0;
    let totalHoras_R = 0;
    let totalHoras_L1 = 0;
    let totalHoras_L2 = 0;
    let totalHoras_F = 0;
    let precio_L = 0;
    let precio_E = 0;
    let precio_P = 0;
    let precio_N = 0;
    let precio_R = 0;
    let precio_L1 = 0;
    let precio_L2 = 0;
    let precio_F = 0;
    let objetoTotales;
    servicios.forEach((servicioTot) => {
        if (servicioTot) {
            servicioTot.forEach((servicio) => {
                if (servicio) {
                    if (servicio.precioHora_TO) {
                        totalFacturado_TO += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_CR) {
                        totalFacturado_CR += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_CE) {
                        totalFacturado_CE += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_CI) {
                        totalFacturado_CI += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_MO) {
                        totalFacturado_MO += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_OF) {
                        totalFacturado_OF += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_AL) {
                        totalFacturado_AL += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_LA) {
                        totalFacturado_LA += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_TE) {
                        totalFacturado_TE += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_FI) {
                        totalFacturado_FI += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_FE) {
                        totalFacturado_FE += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_AB) {
                        totalFacturado_AB += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_MA) {
                        totalFacturado_MA += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_PO) {
                        totalFacturado_PO += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_BA) {
                        totalFacturado_BA += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_FT) {
                        totalFacturado_FT += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_C3) {
                        totalFacturado_C3 += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_C2) {
                        totalFacturado_C2 += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_ES) {
                        totalFacturado_ES += servicio.totalServicioFijo;
                    };
                    if (servicio.precioHora_PA) {
                        totalFacturado_PA += servicio.totalServicioFijo;
                    };
                };
            });
        };
    });
    informes.forEach((informe, index) => {
        if (informe) {
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
                    totalHoras_L += horas[index]['L'];
                    precio_L = informe.precioHora_L;
                };
                if (informe.precioHora_E) {
                    totalFacturado_E += informe.totalFacturado_E;
                    totalHoras_E += horas[index]['E'];
                    precio_E = informe.precioHora_E;
                };
                if (informe.precioHora_P) {
                    totalFacturado_P += informe.totalFacturado_P;
                    totalHoras_P += horas[index]['P'];
                    precio_P = informe.precioHora_P;
                };
                if (informe.precioHora_N) {
                    totalFacturado_N += informe.totalFacturado_N;
                    totalHoras_N += horas[index]['N'];
                    precio_N = informe.precioHora_N;
                };
                if (informe.precioHora_R) {
                    totalFacturado_R += informe.totalFacturado_R;
                    totalHoras_R += horas[index]['R'];
                    precio_R = informe.precioHora_R;
                };
                if (informe.precioHora_L1) {
                    totalFacturado_L1 += informe.totalFacturado_L1;
                    totalHoras_L1 += horas[index]['L1'];
                    precio_L1 = informe.precioHora_L1;
                };
                if (informe.precioHora_L2) {
                    totalFacturado_L2 += informe.totalFacturado_L2;
                    totalHoras_L2 += horas[index]['L2'];
                    precio_L2 = informe.precioHora_L2;
                };
                if (informe.precioHora_F) {
                    totalFacturado_F += informe.totalFacturado_F;
                    totalHoras_F += horas[index]['F'];
                    precio_F = informe.precioHora_F;
                };
            };
        };
    });
    objetoTotales = {
        nombreCentro: objetoCuadrante.datosCuadrante.nombreCentro,
        codigo: objetoCuadrante.datosCuadrante.codigo,
        domicilio: objetoCuadrante.datosCuadrante.domicilio,
        codigoPostal: objetoCuadrante.datosCuadrante.codigoPostal,
        poblacion: objetoCuadrante.datosCuadrante.poblacion,
        provincia: objetoCuadrante.datosCuadrante.provincia,
        nif: objetoCuadrante.datosCuadrante.nif,
        formaPago: objetoCuadrante.datosCuadrante.formaPago,
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
    };
    if (totalFacturado_CR) {
        objetoTotales['CRT'] = totalFacturado_CR;
    };
    if (totalFacturado_CE) {
        objetoTotales['CET'] = totalFacturado_CE;
    };
    if (totalFacturado_CI) {
        objetoTotales['CIT'] = totalFacturado_CI;
    };
    if (totalFacturado_MO) {
        objetoTotales['MOT'] = totalFacturado_MO;
    };
    if (totalFacturado_OF) {
        objetoTotales['OFT'] = totalFacturado_OF;
    };
    if (totalFacturado_AL) {
        objetoTotales['ALT'] = totalFacturado_AL;
    };
    if (totalFacturado_LA) {
        objetoTotales['LAT'] = totalFacturado_LA;
    };
    if (totalFacturado_TE) {
        objetoTotales['TET'] = totalFacturado_TE;
    };
    if (totalFacturado_FI) {
        objetoTotales['FIT'] = totalFacturado_FI;
    };
    if (totalFacturado_FE) {
        objetoTotales['FET'] = totalFacturado_FE;
    };
    if (totalFacturado_AB) {
        objetoTotales['ABT'] = totalFacturado_AB;
    };
    if (totalFacturado_MA) {
        objetoTotales['MAT'] = totalFacturado_MA;
    };
    if (totalFacturado_PO) {
        objetoTotales['POT'] = totalFacturado_PO;
    };
    if (totalFacturado_BA) {
        objetoTotales['BAT'] = totalFacturado_BA;
    };
    if (totalFacturado_FT) {
        objetoTotales['FTT'] = totalFacturado_FT;
    };
    if (totalFacturado_C3) {
        objetoTotales['C3T'] = totalFacturado_C3;
    };
    if (totalFacturado_C2) {
        objetoTotales['C2T'] = totalFacturado_C2;
    };
    if (totalFacturado_ES) {
        objetoTotales['EST'] = totalFacturado_ES;
    };
    if (totalFacturado_PA) {
        objetoTotales['PAT'] = totalFacturado_PA;
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
    totalFacturado_ES ? totalFacturado_ES = totalFacturado_ES : totalFacturado_ES = 0;
    totalFacturado_PA ? totalFacturado_PA = totalFacturado_PA : totalFacturado_PA = 0;
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
        totalFacturado_ES +
        totalFacturado_PA;
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
        };
    };
    objetoTotales['totalMasIva'] = ((parseFloat(objetoTotales['total']) * 21) / 100) + parseFloat(objetoTotales['total']);
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
            dispatch(actualizarNumeroRecibosAccion('configuracion', parseInt(numeroRecibos) + 1));
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
    if (numeroFactusol) {
        dispatch(generarArchivosXLSAccion(numeroFactusol, objetoCuadrante.total));
        dispatch(gestionarDocumentosCuadranteAccion('factura'));
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
                    arrayHorario.push({
                        tipoHorarioGeneral: objetoCentro.horario.horario[i].tipo,
                        arrayCuadrante: [],
                        observaciones: objetoCentro.observaciones.observaciones[i] ? objetoCentro.observaciones.observaciones[i] : ''
                    });
                    arrayInforme.push({
                        tipoRegistro: objetoCentro.horario.horario[i].tipoRegistro,
                        computo: objetoCentro.horario.horario[i].computo,
                        excepcion: objetoCentro.horario.horario[i].excepcion ? objetoCentro.horario.horario[i].excepcion : '',
                        bloqueado: 'no',
                        mensualPactado: objetoCentro.horario.horario[i].mensualPactado ? objetoCentro.horario.horario[i].mensualPactado : null,
                        mensualPactadoInicial: objetoCentro.horario.horario[i].mensualPactado ? objetoCentro.horario.horario[i].mensualPactado : null,
                        proporcion: null,
                        precioHoraTotal: null,
                        precioHora_L: objetoCentro.horario.horario[i].precioHora_L ? objetoCentro.horario.horario[i].precioHora_L : null,
                        precioHora_E: objetoCentro.horario.horario[i].precioHora_E ? objetoCentro.horario.horario[i].precioHora_E : null,
                        precioHora_P: objetoCentro.horario.horario[i].precioHora_P ? objetoCentro.horario.horario[i].precioHora_P : null,
                        precioHora_N: objetoCentro.horario.horario[i].precioHora_N ? objetoCentro.horario.horario[i].precioHora_N : null,
                        precioHora_R: objetoCentro.horario.horario[i].precioHora_R ? objetoCentro.horario.horario[i].precioHora_R : null,
                        precioHora_L1: objetoCentro.horario.horario[i].precioHora_L1 ? objetoCentro.horario.horario[i].precioHora_L1 : null,
                        precioHora_L2: objetoCentro.horario.horario[i].precioHora_L2 ? objetoCentro.horario.horario[i].precioHora_L2 : null,
                        precioHora_F: objetoCentro.horario.horario[i].precioHora_F ? objetoCentro.horario.horario[i].precioHora_F : null,
                        arrayTrabajadores: [],
                        totalFacturado_L: null,
                        totalFacturado_E: null,
                        totalFacturado_P: null,
                        totalFacturado_N: null,
                        totalFacturado_R: null,
                        totalFacturado_L1: null,
                        totalFacturado_L2: null,
                        totalFacturado_F: null,
                        iniciado: objetoCentro.horario.horario[i].mensualPactado ? false : true,
                        arrayDatosInforme: []
                    });
                } else {
                    arrayHorario.push({
                        tipoHorarioGeneral: '',
                        arrayCuadrante: [],
                        observaciones: objetoCentro.observaciones.observaciones[i] ? objetoCentro.observaciones.observaciones[i] : ''
                    });
                    arrayInforme.push(null);
                };
                if (hayServiciosFijos) {
                    arrayServiciosFijos.push(objetoCentro.serviciosFijos.serviciosFijos[i].servicio);
                    arrayBloqueoServiciosFijos.push('no');
                } else {
                    arrayServiciosFijos.push([]);
                };
                if (hayTrabajadores) {
                    let elArrayTrabajadores = [];
                    let elObjetoTrabajadores = {};
                    objetoCentro.trabajadores.trabajadores[i].trabajadores.forEach((trabajadorIterado, index) => {
                        if (trabajadorIterado['suplente_' + (index + 1)] === '') {
                            elObjetoTrabajadores = {
                                ['trabajador_' + (index + 1)]: trabajadorIterado['trabajador_' + (index + 1)],
                                ['suplente_' + (index + 1)]: 999
                            };
                        } else {
                            elObjetoTrabajadores = trabajadorIterado;
                        };
                        elArrayTrabajadores.push(elObjetoTrabajadores);
                    });
                    arrayTrabajadores.push({ cantidad: objetoCentro.trabajadores.trabajadores[i].cantidad, trabajadores: elArrayTrabajadores });
                } else {
                    arrayTrabajadores.push(null);
                };
                arrayHoras.push(null);
            };
            let objetoRetornoDatosGestionEspecial;
            if (numeroRecibos) {
                objetoRetornoDatosGestionEspecial = {
                    numeroRecibos: numeroRecibos,
                    cantidadTexto: ''
                };
            } else {
                objetoRetornoDatosGestionEspecial = null;
            };
            dispatch(actualizarObjetoCuadranteAccion({
                ...objetoCuadrante,
                nombre: calendarioAGestionar + '-' + objetoCentro.id,
                datosCuadrante: {
                    objeto: 'cuadrante',
                    centro: objetoCentro.id,
                    nombreCentro: objetoCentro.nombre,
                    codigo: objetoCentro.codigo,
                    domicilio: objetoCentro.domicilio,
                    codigoPostal: objetoCentro.codigoPostal,
                    poblacion: objetoCentro.poblacion,
                    provincia: objetoCentro.provincia,
                    nif: objetoCentro.nif,
                    formaPago: objetoCentro.formaPago,
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

export const gestionTrabajadorAccion = () => (dispatch, getState) => {
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
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoTrabajador['laPosicionDelTrabajador'] = arrayTr.length + 1;
        };
        if (cuadranteRegistrado === 'no') {
            const arrayCuadrante = [...cuadrante];
            const laColumnaAnadir = dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', false, null, false, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
            if (laColumnaAnadir) {
                arrayCuadrante.push(laColumnaAnadir);
                arrayTr.push(objetoTrabajador);
                dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
                dispatch(setCuadranteAccion(arrayCuadrante));
            };
        } else {
            let estaEnElArrayTrabajadores = trabajadoresEnCuadrante.some(trabajador => trabajador['id'] === objetoTrabajador.id);
            if (!estaEnElArrayTrabajadores) {
                arrayTr.push(objetoTrabajador);
                dispatch(setTrabajadoresEnCuadranteAccion(arrayTr));
            };
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
            if (!cuadranteVacio) {
                if (!cambiadaConfiguracionGeneral) {
                    dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', true, columnaIndiceAGestionar, false, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
                } else {
                    dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
                };
            } else {
                dispatch(setCuadranteVacioAccion(false));
                dispatch(gestionaColumnaCuadranteAccion(objetoTrabajador, 'trabajador', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
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
        // let repetidoTrabajador, repetidoSuplente;
        // repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === objetoTrabajador.id);
        // repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === objetoTrabajador.id);
        // else if ((repetidoTrabajador || repetidoSuplente) && !esUnaActualizacionTrabajador) {
        //     dispatch(setAlertaAccion({
        //         abierto: true,
        //         mensaje: "Este trabajador ya se encuentra en el cuadrante, selecciona otro.",
        //         tipo: 'error'
        //     }));
        // }
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
        if (objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].tipoRegistro === 'individual') {
            objetoSuplente['laPosicionDelTrabajador'] = trabajadoresEnCuadrante.length;
        }
        if (cuadranteRegistrado === 'no') {
            const arrayCuadrante = [...cuadrante];
            const laColumnaAnadir = dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', false, null, false, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
            if (laColumnaAnadir) {
                arrayCuadrante.push(laColumnaAnadir);
                arraySu.push(objetoSuplente);
                dispatch(setSuplentesEnCuadranteAccion(arraySu));
                dispatch(setCuadranteAccion(arrayCuadrante));
            };
        } else {
            let estaEnElArraySuplentes = suplentesEnCuadrante.some(suplente => suplente['id'] === objetoSuplente.id);
            if (!estaEnElArraySuplentes) {
                arraySu.push(objetoSuplente);
                dispatch(setSuplentesEnCuadranteAccion(arraySu));
            };
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
            if (!cuadranteVacio) {
                if (!cambiadaConfiguracionGeneral) {
                    dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', true, columnaIndiceAGestionar, false, false, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
                } else {
                    dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
                };
            } else {
                dispatch(setCuadranteVacioAccion(false));
                dispatch(gestionaColumnaCuadranteAccion(objetoSuplente, 'suplente', true, columnaIndiceAGestionar, false, true, objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral, esUnaActualizacionTrabajador));
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
        // let repetidoTrabajador, repetidoSuplente;
        // repetidoSuplente = suplentesEnCuadrante.find(suplente => suplente.id === objetoSuplente.id);
        // repetidoTrabajador = trabajadoresEnCuadrante.find(trabajador => trabajador.id === objetoSuplente.id);
        // else if ((repetidoTrabajador || repetidoSuplente) && !esUnaActualizacionTrabajador) {
        //     dispatch(setAlertaAccion({
        //         abierto: true,
        //         mensaje: "Este trabajador ya se encuentra en el cuadrante, selecciona otro.",
        //         tipo: 'error'
        //     }));
        // }
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


