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
    errorDeCargaGraficosHorasTrabajadores: false,
    estadoVenimosDeGraficosHorasTrabajadores: false,
    forzarRecargaGraficosHorasTrabajadores: false,
    horasTrabajadoresPorAnyoGraficos: [],
};

//types
const LOADING_GRAFICOS = 'LOADING_GRAFICOS';
const ERROR_DE_CARGA_GRAFICOS_CUADRANTES = 'ERROR_DE_CARGA_GRAFICOS_CUADRANTES';
const VENIMOS_DE_GRAFICOS_CUADRANTES = 'VENIMOS_DE_GRAFICOS_CUADRANTES';
const FORZAR_RECARGA_GRAFICOS_CUADRANTES = 'FORZAR_RECARGA_GRAFICOS_CUADRANTES';
const OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO = 'OBTENER_CUADRANTES_POR_ANYO_GRAFICOS_EXITO';
const ERROR_DE_CARGA_GRAFICOS_HORAS_TRABAJADORES = 'ERROR_DE_CARGA_GRAFICOS_HORAS_TRABAJADORES';
const VENIMOS_DE_GRAFICOS_HORAS_TRABAJADORES = 'VENIMOS_DE_GRAFICOS_HORAS_TRABAJADORES';
const FORZAR_RECARGA_GRAFICOS_HORAS_TRABAJADORES = 'FORZAR_RECARGA_GRAFICOS_HORAS_TRABAJADORES';
const OBTENER_HORAS_TRABAJADORES_POR_ANYO_GRAFICOS_EXITO = 'OBTENER_HORAS_TRABAJADORES_POR_ANYO_GRAFICOS_EXITO';

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
        case ERROR_DE_CARGA_GRAFICOS_HORAS_TRABAJADORES:
            return { ...state, errorDeCargaGraficosHorasTrabajadores: true, loadingGraficos: false }
        case VENIMOS_DE_GRAFICOS_HORAS_TRABAJADORES:
            return { ...state, estadoVenimosDeGraficosHorasTrabajadores: action.payload.estado }
        case FORZAR_RECARGA_GRAFICOS_HORAS_TRABAJADORES:
            return { ...state, forzarRecargaGraficosHorasTrabajadores: action.payload.estado, horasTrabajadoresPorAnyoGraficos: [] }
        case OBTENER_HORAS_TRABAJADORES_POR_ANYO_GRAFICOS_EXITO:
            return { ...state, horasTrabajadoresPorAnyoGraficos: action.payload.elementoArray, loadingGraficos: false }
        default:
            return { ...state }
    }
}

//acciones
export const obtenerCuadrantesPorAnyoAccion = (objeto) => (dispatch, getState) => {
    const year = new Date().getFullYear();
    dispatch({
        type: LOADING_GRAFICOS
    });
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
                        if (elObjetoTotal.tocaFacturar.valor === 'si' && elEstado === 'facturado' && elObjetoTotal.procesado.valor === 'si') {
                            sumatorioA += elObjetoTotal.total;
                        };
                        if (elObjetoTotal.tocaFacturar.valor === 'no' && elEstado === 'facturado' && elObjetoTotal.procesado.valor === 'si') {
                            sumatorioB += elObjetoTotal.total;
                        };
                    });
                    array.push({
                        name: meses[index].substr(0, 3) + '.',
                        Empresas: parseFloat(sumatorioA).toFixed(2),
                        Pisos: parseFloat(sumatorioB).toFixed(2)
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

export const obtenerHorasTrabajadoresPorAnyoAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: LOADING_GRAFICOS
    });
    const d = new Date();
    const year = d.getFullYear().toString();
    const arrayMeses = [year + '-1-', year + '-2-', year + '-3-', year + '-4-', year + '-5-', year + '-6-', year + '-7-', year + '-8-', year + '-9-', year + '-10-', year + '-11-', year + '-12-'];
    let apiUrl = rutaApi + "obtener_por_anyo.php";
    const formData = [];
    const axiosArray = [];
    const arrayHorasTrabajadores = [];
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
            responses.forEach(res => arrayHorasTrabajadores.push(res.data))
            //finished all queries
            const array = arrayHorasTrabajadores.map((mes, index) => {
                const Horas = mes.reduce((sum, mesInt) => {
                    if (mesInt.datos_hora_trabajador) {
                        const arrDatosHorasTrabajador = JSON.parse(mesInt.datos_hora_trabajador);
                        return sum + arrDatosHorasTrabajador.reduce((s, obj) => s + obj.totalHoras, 0);
                    }
                    return sum;
                }, 0);
                return {
                    name: meses[index].substr(0, 3) + '.',
                    Horas: parseFloat(Horas.toFixed(2))
                };
            });
            dispatch({
                type: OBTENER_HORAS_TRABAJADORES_POR_ANYO_GRAFICOS_EXITO,
                payload: {
                    elementoArray: array,
                }
            })
        }))
        .catch(errors => {
            dispatch({
                type: ERROR_DE_CARGA_GRAFICOS_HORAS_TRABAJADORES
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

export const venimosDeGraficosHorasTrabajadoresAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: VENIMOS_DE_GRAFICOS_HORAS_TRABAJADORES,
        payload: {
            estado: estado
        }
    });
}

export const forzarRecargaGraficosHorasTrabajadoresAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FORZAR_RECARGA_GRAFICOS_HORAS_TRABAJADORES,
        payload: {
            estado: estado
        }
    });
}