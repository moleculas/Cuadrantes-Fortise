import Constantes from "../constantes";

//constantes
const dataInicial = {
    cuadranteServiciosFijos: [],
    losServiciosFijos: {},
    stateSwitchTipoServicioFijoCuadrante: {
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
        PA: false,
    },
    itemPrevioEditandoServiciosFijos: null,
    itemEditandoServiciosFijos: {
        switch: {
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
        },
        servicios: {
            precioHora_TO: '',
            precioHora_CR: '',
            precioHora_CE: '',
            precioHora_CI: '',
            precioHora_MO: '',
            precioHora_OF: '',
            precioHora_AL: '',
            precioHora_LA: '',
            precioHora_TE: '',
            precioHora_FI: '',
            precioHora_FE: '',
            precioHora_AB: '',
            precioHora_MA: '',
            precioHora_PO: '',
            precioHora_BA: '',
            precioHora_FT: '',
            precioHora_C3: '',
            precioHora_C2: '',
            precioHora_ES: '',
            precioHora_PA: '',
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
        }
    },
};

//types
const SET_CUADRANTE_SERVICIOS_FIJOS = 'SET_CUADRANTE_SERVICIOS_FIJOS';
const SET_LOSSERVICIOSFIJOS = 'SET_LOSSERVICIOSFIJOS';
const SET_STATESWITCHTIPOSERVICIOFIJOCUADRANTE = 'SET_STATESWITCHTIPOSERVICIOFIJOCUADRANTE';
const SET_ITEMPREVIOEDITANDOSERVICIOSFIJOS = 'SET_ITEMPREVIOEDITANDOSERVICIOSFIJOS';
const SET_ITEMEDITANDOSERVICIOSFIJOS = 'SET_ITEMEDITANDOSERVICIOSFIJOS';

//reducer
export default function cuadrantesServiciosFijosReducer(state = dataInicial, action) {
    switch (action.type) {
        case SET_CUADRANTE_SERVICIOS_FIJOS:
            return { ...state, cuadranteServiciosFijos: action.payload.array }
        case SET_LOSSERVICIOSFIJOS:
            return { ...state, losServiciosFijos: action.payload.objeto }
        case SET_STATESWITCHTIPOSERVICIOFIJOCUADRANTE:
            return { ...state, stateSwitchTipoServicioFijoCuadrante: action.payload.objeto }
        case SET_ITEMPREVIOEDITANDOSERVICIOSFIJOS:
            return { ...state, itemPrevioEditandoServiciosFijos: action.payload.objeto }
        case SET_ITEMEDITANDOSERVICIOSFIJOS:
            return { ...state, itemEditandoServiciosFijos: action.payload.objeto }
        default:
            return { ...state }
    }
}

//acciones
export const setItemPrevioEditandoServiciosFijosAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMPREVIOEDITANDOSERVICIOSFIJOS,
        payload: {
            objeto: objeto
        }
    });
};

export const setItemEditandoServiciosFijosAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ITEMEDITANDOSERVICIOSFIJOS,
        payload: {
            objeto: objeto
        }
    });
};

export const setStateSwitchTipoServicioFijoCuadranteAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_STATESWITCHTIPOSERVICIOFIJOCUADRANTE,
        payload: {
            objeto: objeto
        }
    });
};

export const setLosServiciosFijosAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_LOSSERVICIOSFIJOS,
        payload: {
            objeto: objeto
        }
    });
};

export const setCuadranteServiciosFijosAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_CUADRANTE_SERVICIOS_FIJOS,
        payload: {
            array: array
        }
    });
};

export const gestionaColumnaServiciosFijosInicioAccion = (servicios) => (dispatch, getState) => {
    const { losDiasDelMes, stateFestivo } = getState().variablesCuadrantes;
    let arrayResultante = [];
    let numeroSemana;
    let objetoResultante;
    let totalServicioFijo;
    let sumatorioDiasActivos;
    servicios.forEach((servicio, indexServicio) => {
        objetoResultante = {
            tipoServiciofijo: servicio.tipoServiciofijo,
            estados: {}
        };
        sumatorioDiasActivos = 0;
        totalServicioFijo = 0;
        for (const prop in servicio) {
            if (prop.includes('variacion')) {
                let tipoVariacion;
                if (servicio[prop] === 1) {
                    tipoVariacion = 'todas';
                };
                if (servicio[prop] === 2) {
                    tipoVariacion = 'sino';
                };
                if (servicio[prop] === 3) {
                    tipoVariacion = 'una';
                };
                losDiasDelMes.forEach((dia, index) => {
                    numeroSemana = Math.ceil((index + 1) / 7);
                    if (dia[1][0] === 'Lunes') {
                        if (servicio[dia[1][0] + dia[0][0]]) {
                            if (servicio.precioHora_TO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            sumatorioDiasActivos += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CR === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            sumatorioDiasActivos += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            sumatorioDiasActivos += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                            totalServicioFijo += servicio.precioHora_CI;
                                            sumatorioDiasActivos += servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            sumatorioDiasActivos += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_OF === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            sumatorioDiasActivos += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AL === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            sumatorioDiasActivos += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_LA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            sumatorioDiasActivos += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            sumatorioDiasActivos += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            sumatorioDiasActivos += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            sumatorioDiasActivos += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AB === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            sumatorioDiasActivos += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            sumatorioDiasActivos += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            sumatorioDiasActivos += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_BA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            sumatorioDiasActivos += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FT === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            sumatorioDiasActivos += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C3 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            sumatorioDiasActivos += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C2 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            sumatorioDiasActivos += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_ES === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            sumatorioDiasActivos += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            sumatorioDiasActivos += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            if (tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5))) {
                                if (servicio.precioHora_TO && servicio.diaVariacion_TO === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR && servicio.diaVariacion_CR === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CR === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE && servicio.diaVariacion_CE === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI && servicio.diaVariacion_CI === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CI === 'si') {
                                            if (servicio.activo_CI === 'si') {
                                                objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                                totalServicioFijo += servicio.precioHora_CI;
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                            } else {
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                            };
                                        };
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO && servicio.diaVariacion_MO === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF && servicio.diaVariacion_OF === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_OF === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL && servicio.diaVariacion_AL === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AL === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA && servicio.diaVariacion_LA === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_LA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE && servicio.diaVariacion_TE === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI && servicio.diaVariacion_FI === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FI === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE && servicio.diaVariacion_FE === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB && servicio.diaVariacion_AB === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AB === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA && servicio.diaVariacion_MA === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO && servicio.diaVariacion_PO === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA && servicio.diaVariacion_BA === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_BA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT && servicio.diaVariacion_FT === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FT === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3 && servicio.diaVariacion_C3 === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C3 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2 && servicio.diaVariacion_C2 === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C2 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES && servicio.diaVariacion_ES === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_ES === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA && servicio.diaVariacion_PA === 'lunes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (servicio.precioHora_TO) {
                                    if (servicio.activo_TO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR) {
                                    if (servicio.activo_CR === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CR
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE) {
                                    if (servicio.activo_CE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI) {
                                    if (servicio.activo_CI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO) {
                                    if (servicio.activo_MO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF) {
                                    if (servicio.activo_OF === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_OF
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL) {
                                    if (servicio.activo_AL === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AL
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA) {
                                    if (servicio.activo_LA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_LA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE) {
                                    if (servicio.activo_TE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI) {
                                    if (servicio.activo_FI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE) {
                                    if (servicio.activo_FE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB) {
                                    if (servicio.activo_AB === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AB
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA) {
                                    if (servicio.activo_MA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO) {
                                    if (servicio.activo_PO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA) {
                                    if (servicio.activo_BA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_BA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT) {
                                    if (servicio.activo_FT === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FT
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3) {
                                    if (servicio.activo_C3 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C3
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2) {
                                    if (servicio.activo_C2 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C2
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES) {
                                    if (servicio.activo_ES === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_ES
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA) {
                                    if (servicio.activo_PA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            }
                        }
                    };
                    if (dia[1][0] === 'Martes') {
                        if (servicio[dia[1][0] + dia[0][0]]) {
                            if (servicio.precioHora_TO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            sumatorioDiasActivos += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CR === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            sumatorioDiasActivos += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            sumatorioDiasActivos += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                            totalServicioFijo += servicio.precioHora_CI;
                                            sumatorioDiasActivos += servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            sumatorioDiasActivos += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_OF === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            sumatorioDiasActivos += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AL === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            sumatorioDiasActivos += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_LA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            sumatorioDiasActivos += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            sumatorioDiasActivos += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            sumatorioDiasActivos += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            sumatorioDiasActivos += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AB === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            sumatorioDiasActivos += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            sumatorioDiasActivos += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            sumatorioDiasActivos += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_BA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            sumatorioDiasActivos += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FT === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            sumatorioDiasActivos += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C3 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            sumatorioDiasActivos += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C2 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            sumatorioDiasActivos += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_ES === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            sumatorioDiasActivos += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            sumatorioDiasActivos += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            if (tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5))) {
                                if (servicio.precioHora_TO && servicio.diaVariacion_TO === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR && servicio.diaVariacion_CR === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CR === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE && servicio.diaVariacion_CE === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI && servicio.diaVariacion_CI === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CI === 'si') {
                                            if (servicio.activo_CI === 'si') {
                                                objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                                totalServicioFijo += servicio.precioHora_CI;
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                            } else {
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                            };
                                        };
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO && servicio.diaVariacion_MO === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF && servicio.diaVariacion_OF === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_OF === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL && servicio.diaVariacion_AL === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AL === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA && servicio.diaVariacion_LA === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_LA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE && servicio.diaVariacion_TE === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI && servicio.diaVariacion_FI === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FI === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE && servicio.diaVariacion_FE === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB && servicio.diaVariacion_AB === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AB === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA && servicio.diaVariacion_MA === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO && servicio.diaVariacion_PO === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA && servicio.diaVariacion_BA === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_BA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT && servicio.diaVariacion_FT === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FT === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3 && servicio.diaVariacion_C3 === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C3 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2 && servicio.diaVariacion_C2 === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C2 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES && servicio.diaVariacion_ES === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_ES === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA && servicio.diaVariacion_PA === 'martes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (servicio.precioHora_TO) {
                                    if (servicio.activo_TO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR) {
                                    if (servicio.activo_CR === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CR
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE) {
                                    if (servicio.activo_CE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI) {
                                    if (servicio.activo_CI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO) {
                                    if (servicio.activo_MO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF) {
                                    if (servicio.activo_OF === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_OF
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL) {
                                    if (servicio.activo_AL === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AL
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA) {
                                    if (servicio.activo_LA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_LA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE) {
                                    if (servicio.activo_TE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI) {
                                    if (servicio.activo_FI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE) {
                                    if (servicio.activo_FE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB) {
                                    if (servicio.activo_AB === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AB
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA) {
                                    if (servicio.activo_MA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO) {
                                    if (servicio.activo_PO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA) {
                                    if (servicio.activo_BA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_BA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT) {
                                    if (servicio.activo_FT === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FT
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3) {
                                    if (servicio.activo_C3 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C3
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2) {
                                    if (servicio.activo_C2 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C2
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES) {
                                    if (servicio.activo_ES === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_ES
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA) {
                                    if (servicio.activo_PA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            }
                        }
                    };
                    if (dia[1][0] === 'Miércoles') {
                        if (servicio[dia[1][0] + dia[0][0]]) {
                            if (servicio.precioHora_TO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            sumatorioDiasActivos += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CR === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            sumatorioDiasActivos += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            sumatorioDiasActivos += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                            totalServicioFijo += servicio.precioHora_CI;
                                            sumatorioDiasActivos += servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            sumatorioDiasActivos += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_OF === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            sumatorioDiasActivos += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AL === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            sumatorioDiasActivos += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_LA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            sumatorioDiasActivos += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            sumatorioDiasActivos += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            sumatorioDiasActivos += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            sumatorioDiasActivos += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AB === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            sumatorioDiasActivos += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            sumatorioDiasActivos += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            sumatorioDiasActivos += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_BA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            sumatorioDiasActivos += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FT === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            sumatorioDiasActivos += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C3 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            sumatorioDiasActivos += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C2 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            sumatorioDiasActivos += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_ES === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            sumatorioDiasActivos += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            sumatorioDiasActivos += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            if (tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5))) {
                                if (servicio.precioHora_TO && servicio.diaVariacion_TO === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR && servicio.diaVariacion_CR === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CR === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE && servicio.diaVariacion_CE === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI && servicio.diaVariacion_CI === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CI === 'si') {
                                            if (servicio.activo_CI === 'si') {
                                                objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                                totalServicioFijo += servicio.precioHora_CI;
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                            } else {
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                            };
                                        };
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO && servicio.diaVariacion_MO === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF && servicio.diaVariacion_OF === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_OF === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL && servicio.diaVariacion_AL === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AL === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA && servicio.diaVariacion_LA === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_LA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE && servicio.diaVariacion_TE === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI && servicio.diaVariacion_FI === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FI === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE && servicio.diaVariacion_FE === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB && servicio.diaVariacion_AB === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AB === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA && servicio.diaVariacion_MA === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO && servicio.diaVariacion_PO === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA && servicio.diaVariacion_BA === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_BA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT && servicio.diaVariacion_FT === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FT === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3 && servicio.diaVariacion_C3 === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C3 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2 && servicio.diaVariacion_C2 === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C2 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES && servicio.diaVariacion_ES === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_ES === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA && servicio.diaVariacion_PA === 'miercoles') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (servicio.precioHora_TO) {
                                    if (servicio.activo_TO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR) {
                                    if (servicio.activo_CR === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CR
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE) {
                                    if (servicio.activo_CE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI) {
                                    if (servicio.activo_CI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO) {
                                    if (servicio.activo_MO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF) {
                                    if (servicio.activo_OF === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_OF
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL) {
                                    if (servicio.activo_AL === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AL
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA) {
                                    if (servicio.activo_LA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_LA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE) {
                                    if (servicio.activo_TE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI) {
                                    if (servicio.activo_FI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE) {
                                    if (servicio.activo_FE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB) {
                                    if (servicio.activo_AB === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AB
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA) {
                                    if (servicio.activo_MA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO) {
                                    if (servicio.activo_PO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA) {
                                    if (servicio.activo_BA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_BA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT) {
                                    if (servicio.activo_FT === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FT
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3) {
                                    if (servicio.activo_C3 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C3
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2) {
                                    if (servicio.activo_C2 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C2
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES) {
                                    if (servicio.activo_ES === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_ES
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA) {
                                    if (servicio.activo_PA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            }
                        }
                    };
                    if (dia[1][0] === 'Jueves') {
                        if (servicio[dia[1][0] + dia[0][0]]) {
                            if (servicio.precioHora_TO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            sumatorioDiasActivos += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CR === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            sumatorioDiasActivos += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            sumatorioDiasActivos += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                            totalServicioFijo += servicio.precioHora_CI;
                                            sumatorioDiasActivos += servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            sumatorioDiasActivos += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_OF === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            sumatorioDiasActivos += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AL === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            sumatorioDiasActivos += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_LA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            sumatorioDiasActivos += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            sumatorioDiasActivos += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            sumatorioDiasActivos += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            sumatorioDiasActivos += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AB === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            sumatorioDiasActivos += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            sumatorioDiasActivos += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            sumatorioDiasActivos += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_BA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            sumatorioDiasActivos += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FT === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            sumatorioDiasActivos += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C3 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            sumatorioDiasActivos += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C2 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            sumatorioDiasActivos += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_ES === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            sumatorioDiasActivos += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            sumatorioDiasActivos += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            if (tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5))) {
                                if (servicio.precioHora_TO && servicio.diaVariacion_TO === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR && servicio.diaVariacion_CR === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CR === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE && servicio.diaVariacion_CE === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI && servicio.diaVariacion_CI === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CI === 'si') {
                                            if (servicio.activo_CI === 'si') {
                                                objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                                totalServicioFijo += servicio.precioHora_CI;
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                            } else {
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                            };
                                        };
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO && servicio.diaVariacion_MO === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF && servicio.diaVariacion_OF === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_OF === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL && servicio.diaVariacion_AL === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AL === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA && servicio.diaVariacion_LA === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_LA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE && servicio.diaVariacion_TE === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI && servicio.diaVariacion_FI === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FI === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE && servicio.diaVariacion_FE === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB && servicio.diaVariacion_AB === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AB === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA && servicio.diaVariacion_MA === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO && servicio.diaVariacion_PO === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA && servicio.diaVariacion_BA === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_BA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT && servicio.diaVariacion_FT === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FT === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3 && servicio.diaVariacion_C3 === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C3 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2 && servicio.diaVariacion_C2 === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C2 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES && servicio.diaVariacion_ES === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_ES === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA && servicio.diaVariacion_PA === 'jueves') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (servicio.precioHora_TO) {
                                    if (servicio.activo_TO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR) {
                                    if (servicio.activo_CR === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CR
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE) {
                                    if (servicio.activo_CE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI) {
                                    if (servicio.activo_CI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO) {
                                    if (servicio.activo_MO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF) {
                                    if (servicio.activo_OF === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_OF
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL) {
                                    if (servicio.activo_AL === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AL
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA) {
                                    if (servicio.activo_LA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_LA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE) {
                                    if (servicio.activo_TE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI) {
                                    if (servicio.activo_FI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE) {
                                    if (servicio.activo_FE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB) {
                                    if (servicio.activo_AB === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AB
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA) {
                                    if (servicio.activo_MA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO) {
                                    if (servicio.activo_PO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA) {
                                    if (servicio.activo_BA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_BA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT) {
                                    if (servicio.activo_FT === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FT
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3) {
                                    if (servicio.activo_C3 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C3
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2) {
                                    if (servicio.activo_C2 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C2
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES) {
                                    if (servicio.activo_ES === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_ES
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA) {
                                    if (servicio.activo_PA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            }
                        }
                    };
                    if (dia[1][0] === 'Viernes') {
                        if (servicio[dia[1][0] + dia[0][0]]) {
                            if (servicio.precioHora_TO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            sumatorioDiasActivos += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CR === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            sumatorioDiasActivos += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            sumatorioDiasActivos += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                            totalServicioFijo += servicio.precioHora_CI;
                                            sumatorioDiasActivos += servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            sumatorioDiasActivos += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_OF === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            sumatorioDiasActivos += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AL === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            sumatorioDiasActivos += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_LA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            sumatorioDiasActivos += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            sumatorioDiasActivos += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            sumatorioDiasActivos += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            sumatorioDiasActivos += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AB === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            sumatorioDiasActivos += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            sumatorioDiasActivos += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            sumatorioDiasActivos += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_BA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            sumatorioDiasActivos += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FT === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            sumatorioDiasActivos += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C3 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            sumatorioDiasActivos += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C2 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            sumatorioDiasActivos += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_ES === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            sumatorioDiasActivos += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            sumatorioDiasActivos += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            if (tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5))) {
                                if (servicio.precioHora_TO && servicio.diaVariacion_TO === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR && servicio.diaVariacion_CR === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CR === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE && servicio.diaVariacion_CE === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI && servicio.diaVariacion_CI === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CI === 'si') {
                                            if (servicio.activo_CI === 'si') {
                                                objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                                totalServicioFijo += servicio.precioHora_CI;
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                            } else {
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                            };
                                        };
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO && servicio.diaVariacion_MO === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF && servicio.diaVariacion_OF === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_OF === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL && servicio.diaVariacion_AL === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AL === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA && servicio.diaVariacion_LA === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_LA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE && servicio.diaVariacion_TE === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI && servicio.diaVariacion_FI === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FI === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE && servicio.diaVariacion_FE === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB && servicio.diaVariacion_AB === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AB === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA && servicio.diaVariacion_MA === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO && servicio.diaVariacion_PO === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA && servicio.diaVariacion_BA === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_BA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT && servicio.diaVariacion_FT === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FT === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3 && servicio.diaVariacion_C3 === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C3 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2 && servicio.diaVariacion_C2 === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C2 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES && servicio.diaVariacion_ES === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_ES === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA && servicio.diaVariacion_PA === 'viernes') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (servicio.precioHora_TO) {
                                    if (servicio.activo_TO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR) {
                                    if (servicio.activo_CR === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CR
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE) {
                                    if (servicio.activo_CE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI) {
                                    if (servicio.activo_CI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO) {
                                    if (servicio.activo_MO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF) {
                                    if (servicio.activo_OF === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_OF
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL) {
                                    if (servicio.activo_AL === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AL
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA) {
                                    if (servicio.activo_LA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_LA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE) {
                                    if (servicio.activo_TE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI) {
                                    if (servicio.activo_FI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE) {
                                    if (servicio.activo_FE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB) {
                                    if (servicio.activo_AB === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AB
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA) {
                                    if (servicio.activo_MA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO) {
                                    if (servicio.activo_PO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA) {
                                    if (servicio.activo_BA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_BA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT) {
                                    if (servicio.activo_FT === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FT
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3) {
                                    if (servicio.activo_C3 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C3
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2) {
                                    if (servicio.activo_C2 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C2
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES) {
                                    if (servicio.activo_ES === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_ES
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA) {
                                    if (servicio.activo_PA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            }
                        }
                    };
                    if (dia[1][0] === 'Sábado') {
                        if (servicio[dia[1][0] + dia[0][0]]) {
                            if (servicio.precioHora_TO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            sumatorioDiasActivos += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CR === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            sumatorioDiasActivos += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            sumatorioDiasActivos += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                            totalServicioFijo += servicio.precioHora_CI;
                                            sumatorioDiasActivos += servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            sumatorioDiasActivos += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_OF === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            sumatorioDiasActivos += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AL === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            sumatorioDiasActivos += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_LA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            sumatorioDiasActivos += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            sumatorioDiasActivos += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            sumatorioDiasActivos += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            sumatorioDiasActivos += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AB === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            sumatorioDiasActivos += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            sumatorioDiasActivos += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            sumatorioDiasActivos += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_BA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            sumatorioDiasActivos += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FT === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            sumatorioDiasActivos += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C3 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            sumatorioDiasActivos += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C2 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            sumatorioDiasActivos += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_ES === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            sumatorioDiasActivos += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            sumatorioDiasActivos += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            if (tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5))) {
                                if (servicio.precioHora_TO && servicio.diaVariacion_TO === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR && servicio.diaVariacion_CR === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CR === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE && servicio.diaVariacion_CE === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI && servicio.diaVariacion_CI === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CI === 'si') {
                                            if (servicio.activo_CI === 'si') {
                                                objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                                totalServicioFijo += servicio.precioHora_CI;
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                            } else {
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                            };
                                        };
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO && servicio.diaVariacion_MO === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF && servicio.diaVariacion_OF === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_OF === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL && servicio.diaVariacion_AL === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AL === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA && servicio.diaVariacion_LA === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_LA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE && servicio.diaVariacion_TE === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI && servicio.diaVariacion_FI === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FI === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE && servicio.diaVariacion_FE === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB && servicio.diaVariacion_AB === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AB === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA && servicio.diaVariacion_MA === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO && servicio.diaVariacion_PO === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA && servicio.diaVariacion_BA === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_BA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT && servicio.diaVariacion_FT === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FT === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3 && servicio.diaVariacion_C3 === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C3 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2 && servicio.diaVariacion_C2 === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C2 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES && servicio.diaVariacion_ES === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_ES === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA && servicio.diaVariacion_PA === 'sabado') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (servicio.precioHora_TO) {
                                    if (servicio.activo_TO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR) {
                                    if (servicio.activo_CR === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CR
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE) {
                                    if (servicio.activo_CE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI) {
                                    if (servicio.activo_CI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO) {
                                    if (servicio.activo_MO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF) {
                                    if (servicio.activo_OF === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_OF
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL) {
                                    if (servicio.activo_AL === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AL
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA) {
                                    if (servicio.activo_LA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_LA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE) {
                                    if (servicio.activo_TE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI) {
                                    if (servicio.activo_FI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE) {
                                    if (servicio.activo_FE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB) {
                                    if (servicio.activo_AB === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AB
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA) {
                                    if (servicio.activo_MA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO) {
                                    if (servicio.activo_PO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA) {
                                    if (servicio.activo_BA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_BA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT) {
                                    if (servicio.activo_FT === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FT
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3) {
                                    if (servicio.activo_C3 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C3
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2) {
                                    if (servicio.activo_C2 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C2
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES) {
                                    if (servicio.activo_ES === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_ES
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA) {
                                    if (servicio.activo_PA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            }
                        }
                    };
                    if (dia[1][0] === 'Domingo') {
                        if (servicio[dia[1][0] + dia[0][0]]) {
                            if (servicio.precioHora_TO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            sumatorioDiasActivos += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CR === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            sumatorioDiasActivos += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            sumatorioDiasActivos += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_CI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                            totalServicioFijo += servicio.precioHora_CI;
                                            sumatorioDiasActivos += servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            sumatorioDiasActivos += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_OF === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            sumatorioDiasActivos += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AL === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            sumatorioDiasActivos += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_LA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            sumatorioDiasActivos += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_TE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            sumatorioDiasActivos += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FI === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            sumatorioDiasActivos += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FE === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            sumatorioDiasActivos += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_AB === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            sumatorioDiasActivos += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_MA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            sumatorioDiasActivos += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PO === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            sumatorioDiasActivos += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_BA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            sumatorioDiasActivos += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_FT === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            sumatorioDiasActivos += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C3 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            sumatorioDiasActivos += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_C2 === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            sumatorioDiasActivos += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_ES === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            sumatorioDiasActivos += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio.activo_PA === 'si') {
                                        if (servicio[dia[1][0] + dia[0][0]] !== 'anulado') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            sumatorioDiasActivos += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        } else {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            if (tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5))) {
                                if (servicio.precioHora_TO && servicio.diaVariacion_TO === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                            totalServicioFijo += servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR && servicio.diaVariacion_CR === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CR === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                            totalServicioFijo += servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE && servicio.diaVariacion_CE === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                            totalServicioFijo += servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI && servicio.diaVariacion_CI === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_CI === 'si') {
                                            if (servicio.activo_CI === 'si') {
                                                objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                                totalServicioFijo += servicio.precioHora_CI;
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                            } else {
                                                objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                            };
                                        };
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO && servicio.diaVariacion_MO === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                            totalServicioFijo += servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF && servicio.diaVariacion_OF === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_OF === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                            totalServicioFijo += servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL && servicio.diaVariacion_AL === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AL === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                            totalServicioFijo += servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA && servicio.diaVariacion_LA === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_LA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                            totalServicioFijo += servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE && servicio.diaVariacion_TE === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_TE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                            totalServicioFijo += servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI && servicio.diaVariacion_FI === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FI === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                            totalServicioFijo += servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE && servicio.diaVariacion_FE === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FE === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                            totalServicioFijo += servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB && servicio.diaVariacion_AB === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_AB === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                            totalServicioFijo += servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA && servicio.diaVariacion_MA === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_MA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                            totalServicioFijo += servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO && servicio.diaVariacion_PO === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PO === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                            totalServicioFijo += servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA && servicio.diaVariacion_BA === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_BA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                            totalServicioFijo += servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT && servicio.diaVariacion_FT === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_FT === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                            totalServicioFijo += servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3 && servicio.diaVariacion_C3 === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C3 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                            totalServicioFijo += servicio.precioHora_C3;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2 && servicio.diaVariacion_C2 === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_C2 === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                            totalServicioFijo += servicio.precioHora_C2;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES && servicio.diaVariacion_ES === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_ES === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                            totalServicioFijo += servicio.precioHora_ES;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA && servicio.diaVariacion_PA === 'domingo') {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                        if (servicio.activo_PA === 'si') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                            totalServicioFijo += servicio.precioHora_PA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (servicio.precioHora_TO) {
                                    if (servicio.activo_TO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                    objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                    objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                    objetoResultante['activo_TO'] = servicio.activo_TO;
                                };
                                if (servicio.precioHora_CR) {
                                    if (servicio.activo_CR === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CR
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                    objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                    objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                    objetoResultante['activo_CR'] = servicio.activo_CR;
                                };
                                if (servicio.precioHora_CE) {
                                    if (servicio.activo_CE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                    objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                    objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                    objetoResultante['activo_CE'] = servicio.activo_CE;
                                };
                                if (servicio.precioHora_CI) {
                                    if (servicio.activo_CI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_CI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                    objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                    objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                    objetoResultante['activo_CI'] = servicio.activo_CI;
                                };
                                if (servicio.precioHora_MO) {
                                    if (servicio.activo_MO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                    objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                    objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                    objetoResultante['activo_MO'] = servicio.activo_MO;
                                };
                                if (servicio.precioHora_OF) {
                                    if (servicio.activo_OF === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_OF
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                    objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                    objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                    objetoResultante['activo_OF'] = servicio.activo_OF;
                                };
                                if (servicio.precioHora_AL) {
                                    if (servicio.activo_AL === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AL
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                    objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                    objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                    objetoResultante['activo_AL'] = servicio.activo_AL;
                                };
                                if (servicio.precioHora_LA) {
                                    if (servicio.activo_LA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_LA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                    objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                    objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                    objetoResultante['activo_LA'] = servicio.activo_LA;
                                };
                                if (servicio.precioHora_TE) {
                                    if (servicio.activo_TE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_TE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                    objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                    objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                    objetoResultante['activo_TE'] = servicio.activo_TE;
                                };
                                if (servicio.precioHora_FI) {
                                    if (servicio.activo_FI === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FI
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                    objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                    objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                    objetoResultante['activo_FI'] = servicio.activo_FI;
                                };
                                if (servicio.precioHora_FE) {
                                    if (servicio.activo_FE === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FE
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                    objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                    objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                    objetoResultante['activo_FE'] = servicio.activo_FE;
                                };
                                if (servicio.precioHora_AB) {
                                    if (servicio.activo_AB === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_AB
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                    objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                    objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                    objetoResultante['activo_AB'] = servicio.activo_AB;
                                };
                                if (servicio.precioHora_MA) {
                                    if (servicio.activo_MA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_MA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                    objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                    objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                    objetoResultante['activo_MA'] = servicio.activo_MA;
                                };
                                if (servicio.precioHora_PO) {
                                    if (servicio.activo_PO === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PO
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                    objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                    objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                    objetoResultante['activo_PO'] = servicio.activo_PO;
                                };
                                if (servicio.precioHora_BA) {
                                    if (servicio.activo_BA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_BA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                    objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                    objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                    objetoResultante['activo_BA'] = servicio.activo_BA;
                                };
                                if (servicio.precioHora_FT) {
                                    if (servicio.activo_FT === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_FT
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                    objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                    objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                    objetoResultante['activo_FT'] = servicio.activo_FT;
                                };
                                if (servicio.precioHora_C3) {
                                    if (servicio.activo_C3 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C3
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                    objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                    objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                    objetoResultante['activo_C3'] = servicio.activo_C3;
                                };
                                if (servicio.precioHora_C2) {
                                    if (servicio.activo_C2 === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_C2
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                    objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                    objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                    objetoResultante['activo_C2'] = servicio.activo_C2;
                                };
                                if (servicio.precioHora_ES) {
                                    if (servicio.activo_ES === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_ES
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                    objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                    objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                    objetoResultante['activo_ES'] = servicio.activo_ES;
                                };
                                if (servicio.precioHora_PA) {
                                    if (servicio.activo_PA === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio.precioHora_PA
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                    objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                    objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                    objetoResultante['activo_PA'] = servicio.activo_PA;
                                };
                            }
                        }
                    };
                    objetoResultante = { ...objetoResultante, totalServicioFijo: totalServicioFijo }
                });
                arrayResultante.push(objetoResultante);
            };
        };
    });
    return arrayResultante
};

export const gestionaColumnaServiciosFijosCambiosAccion = (servicios, casilla) => (dispatch, getState) => {
    const { losDiasDelMes } = getState().variablesCuadrantes;
    let arrayResultante = [];
    let objetoResultante;
    let totalServicioFijo;
    servicios.forEach((servicio, indexServicio) => {
        objetoResultante = servicio;
        totalServicioFijo = servicio.totalServicioFijo;
        for (const prop in servicio) {
            if (prop.includes('variacion')) {
                let tipoVariacion;
                if (servicio[prop] === 1) {
                    tipoVariacion = 'todas';
                };
                if (servicio[prop] === 2) {
                    tipoVariacion = 'sino';
                };
                if (servicio[prop] === 3) {
                    tipoVariacion = 'una';
                };
                losDiasDelMes.forEach((dia, index) => {
                    if (casilla.tipo !== '') {
                        //es cambio de valor casilla
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'TOL') {
                            if (servicio.precioHora_TO) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_TO;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_TO;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_TO;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'CRIS') {
                            if (servicio.precioHora_CR) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_CR;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_CR;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_CR;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'CRISE') {
                            if (servicio.precioHora_CE) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_CE;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_CE;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_CE;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'CRISI') {
                            if (servicio.precioHora_CI) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_CI;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_CI;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_CI;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'MOQ') {
                            if (servicio.precioHora_MO) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_MO;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_MO;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_MO;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'OF') {
                            if (servicio.precioHora_OF) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_OF;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_OF;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_OF;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'ALMC') {
                            if (servicio.precioHora_AL) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_AL;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_AL;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_AL;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'LAB') {
                            if (servicio.precioHora_LA) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_LA;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_LA;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_LA;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'TELÑ') {
                            if (servicio.precioHora_TE) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_TE;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_TE;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_TE;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'FCH.IN') {
                            if (servicio.precioHora_FI) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_FI;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_FI;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_FI;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'FCH.EX') {
                            if (servicio.precioHora_FE) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_FE;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_FE;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_FE;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'ABRLL') {
                            if (servicio.precioHora_AB) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_AB;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_AB;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_AB;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'MANT') {
                            if (servicio.precioHora_MA) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_MA;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_MA;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_MA;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'PORT') {
                            if (servicio.precioHora_PO) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_PO;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_PO;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_PO;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'BACT') {
                            if (servicio.precioHora_BA) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_BA;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_BA;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_BA;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'FEST') {
                            if (servicio.precioHora_FT) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_FT;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_FT;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_FT;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'CRTRIM') {
                            if (servicio.precioHora_C3) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_C3;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_C3;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_C3;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'CRBIM') {
                            if (servicio.precioHora_C2) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_C2;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_C2;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_C2;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'LIME') {
                            if (servicio.precioHora_ES) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_ES;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_ES;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_ES;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                        };
                        if (casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === 'LIMP') {
                            if (servicio.precioHora_PA) {
                                if (casilla.valor) {
                                    objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                    if (tipoVariacion === 'una') {
                                        if (objetoResultante['modificado'] === 'no') {
                                            objetoResultante['modificado'] = 'si';
                                        } else {
                                            totalServicioFijo += servicio.precioHora_PA;
                                        };
                                    } else {
                                        totalServicioFijo += servicio.precioHora_PA;
                                    };
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                } else {
                                    objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                    totalServicioFijo -= servicio.precioHora_PA;
                                    objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        };
                    } else {
                        //es cambio festivo                                
                        if (casilla.dia === (dia[1][0] + dia[0][0])) {
                            if (servicio.precioHora_TO) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TO;
                                        totalServicioFijo += servicio.precioHora_TO;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_TO;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                objetoResultante['activo_TO'] = servicio.activo_TO;
                            };
                            if (servicio.precioHora_CR) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CR;
                                        totalServicioFijo += servicio.precioHora_CR;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_CR;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                objetoResultante['activo_CR'] = servicio.activo_CR;
                            };
                            if (servicio.precioHora_CE) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CE;
                                        totalServicioFijo += servicio.precioHora_CE;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_CE;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                objetoResultante['activo_CE'] = servicio.activo_CE;
                            };
                            if (servicio.precioHora_CI) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_CI;
                                        totalServicioFijo += servicio.precioHora_CI;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_CI;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                objetoResultante['activo_CI'] = servicio.activo_CI;
                            };
                            if (servicio.precioHora_MO) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MO;
                                        totalServicioFijo += servicio.precioHora_MO;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_MO;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                objetoResultante['activo_MO'] = servicio.activo_MO;
                            };
                            if (servicio.precioHora_OF) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_OF;
                                        totalServicioFijo += servicio.precioHora_OF;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_OF;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                objetoResultante['activo_OF'] = servicio.activo_OF;
                            };
                            if (servicio.precioHora_AL) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AL;
                                        totalServicioFijo += servicio.precioHora_AL;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_AL;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                objetoResultante['activo_AL'] = servicio.activo_AL;
                            };
                            if (servicio.precioHora_LA) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_LA;
                                        totalServicioFijo += servicio.precioHora_LA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_LA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                objetoResultante['activo_LA'] = servicio.activo_LA;
                            };
                            if (servicio.precioHora_TE) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_TE;
                                        totalServicioFijo += servicio.precioHora_TE;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_TE;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                objetoResultante['activo_TE'] = servicio.activo_TE;
                            };
                            if (servicio.precioHora_FI) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FI;
                                        totalServicioFijo += servicio.precioHora_FI;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_FI;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                objetoResultante['activo_FI'] = servicio.activo_FI;
                            };
                            if (servicio.precioHora_FE) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FE;
                                        totalServicioFijo += servicio.precioHora_FE;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_FE;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                objetoResultante['activo_FE'] = servicio.activo_FE;
                            };
                            if (servicio.precioHora_AB) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_AB;
                                        totalServicioFijo += servicio.precioHora_AB;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_AB;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                objetoResultante['activo_AB'] = servicio.activo_AB;
                            };
                            if (servicio.precioHora_MA) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_MA;
                                        totalServicioFijo += servicio.precioHora_MA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_MA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                objetoResultante['activo_MA'] = servicio.activo_MA;
                            };
                            if (servicio.precioHora_PO) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PO;
                                        totalServicioFijo += servicio.precioHora_PO;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_PO;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                objetoResultante['activo_PO'] = servicio.activo_PO;
                            };
                            if (servicio.precioHora_BA) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_BA;
                                        totalServicioFijo += servicio.precioHora_BA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_BA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                objetoResultante['activo_BA'] = servicio.activo_BA;
                            };
                            if (servicio.precioHora_FT) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_FT;
                                        totalServicioFijo += servicio.precioHora_FT;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_FT;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                objetoResultante['activo_FT'] = servicio.activo_FT;
                            };
                            if (servicio.precioHora_C3) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C3;
                                        totalServicioFijo += servicio.precioHora_C3;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_C3;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_C3'] = servicio.precioHora_C3;
                                objetoResultante['diaVariacion_C3'] = servicio.diaVariacion_C3;
                                objetoResultante['variacion_C3'] = servicio.variacion_C3;
                                objetoResultante['activo_C3'] = servicio.activo_C3;
                            };
                            if (servicio.precioHora_C2) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_C2;
                                        totalServicioFijo += servicio.precioHora_C2;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_C2;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_C2'] = servicio.precioHora_C2;
                                objetoResultante['diaVariacion_C2'] = servicio.diaVariacion_C2;
                                objetoResultante['variacion_C2'] = servicio.variacion_C2;
                                objetoResultante['activo_C2'] = servicio.activo_C2;
                            };
                            if (servicio.precioHora_ES) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_ES;
                                        totalServicioFijo += servicio.precioHora_ES;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_ES;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_ES'] = servicio.precioHora_ES;
                                objetoResultante['diaVariacion_ES'] = servicio.diaVariacion_ES;
                                objetoResultante['variacion_ES'] = servicio.variacion_ES;
                                objetoResultante['activo_ES'] = servicio.activo_ES;
                            };
                            if (servicio.precioHora_PA) {
                                if (!casilla.valor) {
                                    if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio.precioHora_PA;
                                        totalServicioFijo += servicio.precioHora_PA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                } else {
                                    if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                        totalServicioFijo -= servicio.precioHora_PA;
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                };
                                objetoResultante['precioHora_PA'] = servicio.precioHora_PA;
                                objetoResultante['diaVariacion_PA'] = servicio.diaVariacion_PA;
                                objetoResultante['variacion_PA'] = servicio.variacion_PA;
                                objetoResultante['activo_PA'] = servicio.activo_PA;
                            };
                        };
                    }
                    objetoResultante = { ...objetoResultante, totalServicioFijo: totalServicioFijo }
                });
                arrayResultante.push(objetoResultante);
            };
        };
    });   
    return arrayResultante
};
