//constantes
const dataInicial = {
    cuadranteServiciosFijos: [],
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
        C4: false,
        ES: false,
        PA: false,
        FR: false
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
            C4: false,
            ES: false,
            PA: false,
            FR: false
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
            precioHora_C4: '',
            precioHora_ES: '',
            precioHora_PA: '',
            precioHora_FR: '',
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
            variacion_C4: '',
            variacion_ES: '',
            variacion_PA: '',
            variacion_FR: '',
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
            diaVariacion_C4: '',
            diaVariacion_ES: '',
            diaVariacion_PA: '',
            diaVariacion_FR: '',
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
            activo_C4: 'si',
            activo_ES: 'si',
            activo_PA: 'si',
            activo_FR: 'si',
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
            int_C4: false,
            int_ES: false,
            int_PA: false,
            int_FR: false,
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
            trab_C4: '',
            trab_ES: '',
            trab_PA: '',
            trab_FR: ''
        },
        bloqueado: ''
    },
    serviciosFijosPersonalizados: [],
    servicioFijoPersonalizadoEliminado: null,
};

//types
const SET_CUADRANTE_SERVICIOS_FIJOS = 'SET_CUADRANTE_SERVICIOS_FIJOS';
const SET_STATESWITCHTIPOSERVICIOFIJOCUADRANTE = 'SET_STATESWITCHTIPOSERVICIOFIJOCUADRANTE';
const SET_ITEMPREVIOEDITANDOSERVICIOSFIJOS = 'SET_ITEMPREVIOEDITANDOSERVICIOSFIJOS';
const SET_ITEMEDITANDOSERVICIOSFIJOS = 'SET_ITEMEDITANDOSERVICIOSFIJOS';
const SET_SERVICIOSFIJOSPERSONALIZADOS = 'SET_SERVICIOSFIJOSPERSONALIZADOS';
const SET_SERVICIOSFIJOPERSONALIZADOELIMINADO = 'SET_SERVICIOSFIJOPERSONALIZADOELIMINADO';

//reducer
export default function cuadrantesServiciosFijosReducer(state = dataInicial, action) {
    switch (action.type) {
        case SET_CUADRANTE_SERVICIOS_FIJOS:
            return { ...state, cuadranteServiciosFijos: action.payload.array }
        case SET_STATESWITCHTIPOSERVICIOFIJOCUADRANTE:
            return { ...state, stateSwitchTipoServicioFijoCuadrante: action.payload.objeto }
        case SET_ITEMPREVIOEDITANDOSERVICIOSFIJOS:
            return { ...state, itemPrevioEditandoServiciosFijos: action.payload.objeto }
        case SET_ITEMEDITANDOSERVICIOSFIJOS:
            return { ...state, itemEditandoServiciosFijos: action.payload.objeto }
        case SET_SERVICIOSFIJOSPERSONALIZADOS:
            return { ...state, serviciosFijosPersonalizados: action.payload.array }
        case SET_SERVICIOSFIJOPERSONALIZADOELIMINADO:
            return { ...state, servicioFijoPersonalizadoEliminado: action.payload.objeto }     
        default:
            return { ...state }
    }
}

//acciones

export const setservicioFijoPersonalizadoEliminadoAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_SERVICIOSFIJOPERSONALIZADOELIMINADO,
        payload: {
            objeto: objeto
        }
    });
};

export const setServiciosFijosPersonalizadosAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_SERVICIOSFIJOSPERSONALIZADOS,
        payload: {
            array: array
        }
    });
};

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

export const setCuadranteServiciosFijosAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_CUADRANTE_SERVICIOS_FIJOS,
        payload: {
            array: array
        }
    });
};