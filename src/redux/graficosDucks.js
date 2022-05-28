import axios from 'axios';
import Constantes from "../constantes";
import { parse } from 'zipson';

//constantes
const rutaApi = Constantes.RUTA_API;
const meses = Constantes.MESES;
const dataInicial = {
    loadingGraficos: false,
    errorDeCargaGraficosCuadrantes: false,
    estadoVenimosDeGraficosCuadrantes: false,
    forzarRecargaGraficosCuadrantes: false,
    cuadrantesPorAnyoGraficos: [],
    errorDeCargaGraficosNominas: false,
    estadoVenimosDeGraficosNominas: false,
    forzarRecargaGraficosNominas: false,
    nominasPorAnyoGraficos: [],
};

//types
const LOADING_GRAFICOS = 'LOADING_GRAFICOS';
const ERROR_DE_CARGA_GRAFICOS_CUADRANTES = 'ERROR_DE_CARGA_GRAFICOS_CUADRANTES';
const VENIMOS_DE_GRAFICOS_CUADRANTES = 'VENIMOS_DE_GRAFICOS_CUADRANTES';
const FORZAR_RECARGA_GRAFICOS_CUADRANTES = 'FORZAR_RECARGA_GRAFICOS_CUADRANTES';
const OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO = 'OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO';
const ERROR_DE_CARGA_GRAFICOS_NOMINAS = 'ERROR_DE_CARGA_GRAFICOS_NOMINAS';
const VENIMOS_DE_GRAFICOS_NOMINAS = 'VENIMOS_DE_GRAFICOS_NOMINAS';
const FORZAR_RECARGA_GRAFICOS_NOMINAS = 'FORZAR_RECARGA_GRAFICOS_NOMINAS';
const OBTENER_NOMINAS_POR_ANYO_GRAFICOS_EXITO = 'OBTENER_NOMINAS_POR_ANYO_GRAFICOS_EXITO';

//reducer
export default function graficosReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_GRAFICOS:
            return { ...state, loadingGraficos: true }
        case ERROR_DE_CARGA_GRAFICOS_CUADRANTES:
            return { ...state, errorDeCargaGraficosCuadrantes: true, loadingGraficos: false }
        case VENIMOS_DE_GRAFICOS_CUADRANTES:
            return { ...state, estadoVenimosDeGraficosCuadrantes: action.payload.estado }
        case FORZAR_RECARGA_GRAFICOS_CUADRANTES:
            return { ...state, forzarRecargaGraficosCuadrantes: action.payload.estado, cuadrantesPorAnyoGraficos: [] }
        case OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO:
            return { ...state, cuadrantesPorAnyoGraficos: action.payload.elementoArray, loadingGraficos: false }
        case ERROR_DE_CARGA_GRAFICOS_NOMINAS:
            return { ...state, errorDeCargaGraficosNominas: true, loadingGraficos: false }
        case VENIMOS_DE_GRAFICOS_NOMINAS:
            return { ...state, estadoVenimosDeGraficosNominas: action.payload.estado }
        case FORZAR_RECARGA_GRAFICOS_NOMINAS:
            return { ...state, forzarRecargaGraficosNominas: action.payload.estado, nominasPorAnyoGraficos: [] }
        case OBTENER_NOMINAS_POR_ANYO_GRAFICOS_EXITO:
            return { ...state, nominasPorAnyoGraficos: action.payload.elementoArray, loadingGraficos: false }
        default:
            return { ...state }
    }
}

//acciones
export const obtenerCuadrantesPorAnyoAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: LOADING_GRAFICOS
    });
    const d = new Date();
    const year = d.getFullYear().toString();
    const arrayMeses = [year + '-1-', year + '-2-', year + '-3-', year + '-4-', year + '-5-', year + '-6-', year + '-7-', year + '-8-', year + '-9-', year + '-10-', year + '-11-', year + '-12-'];
    let apiUrl = rutaApi + "obtener_por_anyo.php";
    const formData = [];
    const axiosArray = [];
    const arrayCuadrantes = [];
    for (let i = 0; i < arrayMeses.length; i++) {
        formData[i] = new FormData();
        formData[i].append("objeto", objeto);
        formData[i].append("nombre", arrayMeses[i]);
        let newPromise = axios.post(apiUrl, formData[i], {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        axiosArray.push(newPromise);
    };
    axios
        .all(axiosArray)
        .then(axios.spread((...responses) => {
            responses.forEach(res => arrayCuadrantes.push(res.data))
            //finished all queries
            let array = [];
            let sumatorioA = 0;
            let sumatorioB = 0;
            let elObjetoTotal;
            let elEstado;
            arrayCuadrantes.forEach((mes, index) => {
                if (mes.length > 0) {
                    mes.forEach((mesInt, index) => {
                        elEstado = mesInt.estado;
                        elObjetoTotal = parse(mesInt.total);
                        if (elObjetoTotal.tocaFacturar.valor === 'si' && elEstado === 'facturado') {
                            sumatorioA += elObjetoTotal.total;
                        };
                        if (elObjetoTotal.tocaFacturar.valor === 'no' && elEstado === 'facturado') {
                            sumatorioB += elObjetoTotal.total;
                        };
                    });
                    array.push({
                        name: meses[index].substr(0, 3) + '.',
                        IngresosA: parseFloat(sumatorioA).toFixed(2),
                        IngresosB: parseFloat(sumatorioB).toFixed(2)                      
                    });
                    sumatorioA = 0;
                    sumatorioB = 0;
                } else {
                    array.push({
                        name: meses[index].substr(0, 3) + '.',
                        Ingresos: 0,
                    })
                }
            });
            dispatch({
                type: OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO,
                payload: {
                    elementoArray: array,
                }
            })
        }))
        .catch(errors => {
            dispatch({
                type: ERROR_DE_CARGA_GRAFICOS_CUADRANTES
            })
        });
}

export const obtenerNominasPorAnyoAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: LOADING_GRAFICOS
    });
    const d = new Date();
    const year = d.getFullYear().toString();
    const arrayMeses = [year + '-1-', year + '-2-', year + '-3-', year + '-4-', year + '-5-', year + '-6-', year + '-7-', year + '-8-', year + '-9-', year + '-10-', year + '-11-', year + '-12-'];
    let apiUrl = rutaApi + "obtener_por_anyo.php";
    const formData = [];
    const axiosArray = [];
    const arrayNominas = [];
    for (let i = 0; i < arrayMeses.length; i++) {
        formData[i] = new FormData();
        formData[i].append("objeto", objeto);
        formData[i].append("nombre", arrayMeses[i]);
        let newPromise = axios.post(apiUrl, formData[i], {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        axiosArray.push(newPromise);
    };
    axios
        .all(axiosArray)
        .then(axios.spread((...responses) => {
            responses.forEach(res => arrayNominas.push(res.data))
            //finished all queries
            let array = [];
            let sumatorio = 0;
            let elObjetoTotal;
            arrayNominas.forEach((mes, index) => {
                if (mes.length > 0) {
                    mes.forEach((mesInt, index) => {
                        if (mesInt.total) {
                            elObjetoTotal = parse(mesInt.total.total);
                            console.log(elObjetoTotal)
                            sumatorio += parseFloat(elObjetoTotal.total);
                        }
                    });
                    array.push({
                        name: meses[index].substr(0, 3) + '.',
                        Gastos: sumatorio,
                    });
                    sumatorio = 0;
                } else {
                    array.push({
                        name: meses[index].substr(0, 3) + '.',
                        Gastos: 0,
                    })
                }
            });
            dispatch({
                type: OBTENER_NOMINAS_POR_ANYO_GRAFICOS_EXITO,
                payload: {
                    elementoArray: array,
                }
            })
        }))
        .catch(errors => {
            dispatch({
                type: ERROR_DE_CARGA_GRAFICOS_NOMINAS
            })
        });
}

export const venimosDeGraficosCuadrantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_GRAFICOS_CUADRANTES,
        payload: {
            estado: estado
        }
    });
}

export const forzarRecargaGraficosCuadrantesAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FORZAR_RECARGA_GRAFICOS_CUADRANTES,
        payload: {
            estado: estado
        }
    });
}

export const venimosDeGraficosNominasAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_GRAFICOS_NOMINAS,
        payload: {
            estado: estado
        }
    });
}

export const forzarRecargaGraficosNominasAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FORZAR_RECARGA_GRAFICOS_NOMINAS,
        payload: {
            estado: estado
        }
    });
}