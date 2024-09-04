import axios from 'axios';
import Constantes from "../constantes";
import * as XLSX from "xlsx";
import { stringify } from 'zipson';
import { gestionArrayHorasTrabajadoresAccion } from './horasTrabajadoresDucks';

//constantes
const {
    TIPO_SERVICIO_FIJO: listadoServiciosFijos,
    TIPO_SERVICIO: tipoServicio,
    RUTA_API: rutaApi,
    MESES: meses,
    NUMERO_CUENTA_FORTISE: numeroCuentaFortise
} = Constantes;
const fileExtension = ".xlsx";

const dataInicial = {
    loadingApp: false,
    estadoActivadoDesactivado: true,
    estadoIntervencionRegistrada: true,
    onEstem: '',
    openDialog: [false, false, false, false, false, false, false, false, false, false, false, false],
    errorDeCargaConfiguracion: false,
    objetoConfiguracion: {
        precioHoraNormal: null,
        precioHoraExtra: null,
        mensajeMailCentros: '',
        cuenta1: {
            iban: '',
            bic: '',
            nombreBanco: '',
            entidad: '',
            oficina: '',
            digitosControl: '',
            numeroCuenta: ''
        },
    },
    numeracion: null,
    exitoActualizacionConfiguracion: false,
    arrayUltimasIntervenciones: [],
    errorDeCargaUltimasIntervenciones: false,
    exitoGenerarArchivos: false,
    procesandoLoteEstado: false,
    laDataFAC: [],
    laDataLFA: [],
    finalizandoLoteEstado: false,
    controladores: [],
    cuadrantesIteradosActualizar: [],
};

//types
const LOADING_APP = 'LOADING_APP';
const ACTIVAR_DESACTIVAR_COMPONENTE = 'ACTIVAR_DESACTIVAR_COMPONENTE';
const INTERVENCION_REGISTRADA = 'INTERVENCION_REGISTRADA';
const ON_ESTEM = 'ON_ESTEM';
const ABIERTO_DIALOG = 'ABIERTO_DIALOG';
const CERRADO_DIALOG = 'CERRADO_DIALOG';
const OBTENER_CONFIGURACION_EXITO = 'OBTENER_CONFIGURACION_EXITO';
const ERROR_DE_CARGA_CONFIGURACION = 'ERROR_DE_CARGA_CONFIGURACION';
const VACIAR_DATOS_CONFIGURACION = 'VACIAR_DATOS_CONFIGURACION';
const ACTUALIZAR_CONFIGURACION_EXITO = 'ACTUALIZAR_CONFIGURACION_EXITO';
const RESETEA_EXITO_CONFIGURACION = 'RESETEA_EXITO_CONFIGURACION';
const OBTENER_ULTIMAS_INTERVENCIONES_EXITO = 'OBTENER_ULTIMAS_INTERVENCIONES_EXITO';
const VACIAR_DATOS_ULTIMAS_INTERVENCIONES = 'VACIAR_DATOS_ULTIMAS_INTERVENCIONES';
const ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES = 'ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES';
const GENERAR_ARCHIVOS_EXITO = 'GENERAR_ARCHIVOS_EXITO';
const PROCESANDO_LOTE = 'PROCESANDO_LOTE';
const ITERACION_XLS_EXITO = 'ITERACION_XLS_EXITO';
const FINALIZANDO_LOTE = 'FINALIZANDO_LOTE';
const SET_NEWCONTROLLER = 'SET_NEWCONTROLLER';
const SET_CUADRANTESITERADOSACTUALIZAR = 'SET_CUADRANTESITERADOSACTUALIZAR';
const SET_NUMERACION = 'SET_NUMERACION';

//reducer
export default function appReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_APP:
            return { ...state, loadingApp: true }
        case ACTIVAR_DESACTIVAR_COMPONENTE:
            return { ...state, estadoActivadoDesactivado: action.payload.estado }
        case INTERVENCION_REGISTRADA:
            return { ...state, estadoIntervencionRegistrada: action.payload.estado }
        case ON_ESTEM:
            return { ...state, onEstem: action.payload.lloc }
        case ABIERTO_DIALOG:
            return { ...state, openDialog: action.payload.array }
        case CERRADO_DIALOG:
            return { ...state, openDialog: dataInicial.openDialog }
        case OBTENER_CONFIGURACION_EXITO:
            return { ...state, objetoConfiguracion: action.payload.objeto, errorDeCargaConfiguracion: false, loadingApp: false }
        case ERROR_DE_CARGA_CONFIGURACION:
            return { ...state, errorDeCargaConfiguracion: true, loadingApp: false }
        case VACIAR_DATOS_CONFIGURACION:
            return { ...state, objetoConfiguracion: action.payload.objetoConfiguracion }
        case ACTUALIZAR_CONFIGURACION_EXITO:
            return { ...state, errorDeCargaConfiguracion: false, loadingApp: false, exitoActualizacionConfiguracion: true }
        case RESETEA_EXITO_CONFIGURACION:
            return { ...state, exitoActualizacionConfiguracion: false, exitoGenerarArchivos: false, procesandoLoteEstado: false }
        case OBTENER_ULTIMAS_INTERVENCIONES_EXITO:
            return { ...state, arrayUltimasIntervenciones: action.payload.array, errorDeCargaUltimasIntervenciones: false, loadingApp: false }
        case ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES:
            return { ...state, errorDeCargaUltimasIntervenciones: true, loadingApp: false }
        case VACIAR_DATOS_ULTIMAS_INTERVENCIONES:
            return { ...state, arrayUltimasIntervenciones: [] }
        case GENERAR_ARCHIVOS_EXITO:
            return { ...state, exitoGenerarArchivos: true, laDataFAC: [], laDataLFA: [] }
        case PROCESANDO_LOTE:
            return { ...state, procesandoLoteEstado: true }
        case FINALIZANDO_LOTE:
            return { ...state, finalizandoLoteEstado: action.payload.estado }
        case ITERACION_XLS_EXITO:
            return { ...state, laDataFAC: [...state.laDataFAC, action.payload.elementoArray1], laDataLFA: [...state.laDataLFA, action.payload.elementoArray2] }
        case SET_NUMERACION:
            return { ...state, numeracion: action.payload.estado }
        case SET_NEWCONTROLLER:
            return { ...state, controladores: action.payload.array }
        case SET_CUADRANTESITERADOSACTUALIZAR:
            return { ...state, cuadrantesIteradosActualizar: [...state.cuadrantesIteradosActualizar, action.payload.elementoArray3] }
        default:
            return { ...state }
    }
}

//acciones

export const setNewControllerAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_NEWCONTROLLER,
        payload: {
            array: array
        }
    });
};

export const activarDesactivarAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: ACTIVAR_DESACTIVAR_COMPONENTE,
        payload: {
            estado: estado
        }
    });
};

export const registrarIntervencionAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: INTERVENCION_REGISTRADA,
        payload: {
            estado: estado
        }
    });
};

export const retornaHoraRangoAccion = (laHora) => (dispatch, getState) => {
    if (laHora) {
        const hora = laHora.getHours();
        const minuto = laHora.getMinutes();
        const laHoraRetornada = hora + ':' + minuto;
        return laHoraRetornada;
    }
};

export const retornaMinutosAccion = (primeraHora, segundaHora) => (dispatch, getState) => {
    if (primeraHora && segundaHora) {
        const [horasPrimeraHora, minutosPrimeraHora] = primeraHora.split(":").map(Number);
        const [horasSegundaHora, minutosSegundaHora] = segundaHora.split(":").map(Number);
        const minutosTotalesPrimeraHora = horasPrimeraHora * 60 + minutosPrimeraHora;
        const minutosTotalesSegundaHora = horasSegundaHora * 60 + minutosSegundaHora;
        return minutosTotalesSegundaHora - minutosTotalesPrimeraHora;
    }
};

export const generaFechaAccion = (datoHorario) => (dispatch, getState) => {
    const time = datoHorario;
    const current = new Date();
    const dateTimeTwo = new Date(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${time}`);
    return dateTimeTwo;
};

export const retornaAnoMesAccion = (fecha) => {
    let data;
    if (!fecha) {
        data = new Date();
    } else {
        data = new Date(fecha);
    }
    const mes = data.getMonth() + 1;
    const any = data.getFullYear();
    const laData = any + '-' + mes;
    return laData;
};

export const gestionaMaxDateCalendarAccion = (numeroDias) => (dispatch, getState) => {
    let data = new Date();
    let mesActual = data.getMonth() + 1;
    let mes = mesActual + numeroDias;
    let any = data.getFullYear();
    if (mes > 12) {
        let diferencia = (12 - mesActual);
        mes = (numeroDias - diferencia);
        any += 1;
    };
    const laData = any + '-' + mes;
    return laData;
};

export const gestionaRangoFechasVacacionesAccion = (periodo) => (dispatch, getState) => {
    const { calendarioAGestionar, losDiasDelMes } = getState().variablesCuadrantes;
    if (periodo === 'inicio') {
        const laData = calendarioAGestionar + '-' + losDiasDelMes[0][0];
        return laData;
    } else {
        const laData = calendarioAGestionar + '-' + losDiasDelMes[losDiasDelMes.length - 1][0];
        return laData;
    };
};

export const retornaAnoMesCuadranteAccion = (cuadrante) => (dispatch, getState) => {
    let myArrSplit = cuadrante.split("-");
    const monthNum = myArrSplit[1];
    const monthLet = meses[monthNum - 1];
    const year = myArrSplit[0];
    return { monthNum, monthLet, year }
};

export const retornaAnoMesDiaAccion = (fecha) => (dispatch, getState) => {
    const data = new Date(fecha);
    const mes = data.getMonth() + 1;
    const any = data.getFullYear();
    const dia = data.getDate();
    const laData = any + '-' + mes + '-' + dia;
    return laData;
};

export const retornaFechaEnBaseAAnoMesDiaAccion = (fecha) => (dispatch, getState) => {
    const partsData = fecha.split('-');
    const laData = new Date(partsData[0], partsData[1] - 1, partsData[2]);
    return laData;
};

export const diasEnElMesAccion = (fecha) => (dispatch, getState) => {
    let myArrSplit = fecha.split("-");
    const anyo = myArrSplit[0];
    const mes = myArrSplit[1];
    return new Date(anyo, mes, 0).getDate();
};

const conversorFechas = (fecha) => {
    let myFechaSplit = fecha.split("-");
    let elMes = myFechaSplit[0];
    let elDia = myFechaSplit[1];
    let elAnyo = myFechaSplit[2];
    return elAnyo + '/' + elMes + '/' + elDia + ' 00:00:00'
};

export const diaDeLaSemanaAccion = (dateStr) => (dispatch, getState) => {
    //formato dateStr=MM-DD-YYYY    
    //formato válido firefox dateStr=yyyy/MM/dd HH:mm:ss
    let date = new Date(conversorFechas(dateStr));
    let locale = "es-ES";
    const str = date.toLocaleDateString(locale, { weekday: 'long' });
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const onEstemAccion = (lloc) => (dispatch, getState) => {
    dispatch({
        type: ON_ESTEM,
        payload: {
            lloc: lloc
        }
    });
};

export const abreObjetoDialogAccion = (numero) => (dispatch, getState) => {
    //numeració a pujar si s'afegeix un dialog
    const totalDialogs = 12;
    let arrayDialogs = Array(totalDialogs).fill(false);
    if (numero >= 1 && numero <= totalDialogs) {
        arrayDialogs[numero - 1] = true;
    };
    dispatch({
        type: ABIERTO_DIALOG,
        payload: {
            array: arrayDialogs,
        }
    });
};

export const cierraObjetoDialogAccion = () => (dispatch, getState) => {
    dispatch({
        type: CERRADO_DIALOG
    });
};

export const obtenerConfiguracionAccion = (objeto, id) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        let apiUrl = rutaApi + "obtener.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: OBTENER_CONFIGURACION_EXITO,
            payload: {
                objeto: JSON.parse(res.data.datos_configuracion)
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const obtenerNumeracionAccion = (objeto) => async (dispatch, getState) => {
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        let apiUrl = rutaApi + "obtener_numeracion.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const numeroFactura = res.data;
        return numeroFactura;
    } catch (error) {
        console.error('Error al obtener el número de factura:', error);
        throw error;
    }
};

export const setNumeracion = (estado) => (dispatch, getState) => {
    dispatch({
        type: SET_NUMERACION,
        payload: {
            estado: estado
        }
    });
};

export const actualizarConfiguracionAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: ACTUALIZAR_CONFIGURACION_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CONFIGURACION
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const vaciarDatosConfiguracionAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_CONFIGURACION,
        payload: {
            objetoConfiguracion: {
                precioHoraNormal: null,
                precioHoraExtra: null,
                mensajeMailCentros: '',
                cuenta1: {
                    iban: '',
                    bic: '',
                    nombreBanco: '',
                    entidad: '',
                    oficina: '',
                    digitosControl: '',
                    numeroCuenta: ''
                },
            }
        }
    });
};

export const obtenerObjetoPorIdAccion = (listado, id) => (dispatch, getState) => {
    let aDevolver;
    listado.map((elemento) => {
        if (elemento.id === id) {
            aDevolver = elemento.nombre
        };
    });
    return aDevolver
};

export const validarMailAccion = (mail) => (dispatch, getState) => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return regex.test(mail);
};

export const obtenerUltimasIntervencionesAccion = () => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        let apiUrl = rutaApi + "ultimas_intervenciones.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        respuesta.sort((a, b) => a.actualizacion.localeCompare(b.actualizacion)).reverse();
        dispatch({
            type: OBTENER_ULTIMAS_INTERVENCIONES_EXITO,
            payload: {
                array: respuesta
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_ULTIMAS_INTERVENCIONES
        })
    }
};

export const vaciarDatosUltimasIntervencionesAccion = () => (dispatch, getState) => {
    dispatch({
        type: VACIAR_DATOS_ULTIMAS_INTERVENCIONES
    });
};

export const exportarAExcel = (apiData, fileName) => {
    const ws = XLSX.utils.aoa_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    XLSX.writeFile(wb, fileName + fileExtension)
};

export const obtenerServiciosPersonalizados = (objetoConceptos) => {
    const serviciosPersonalizados = [];
    const regex = /^P\d+T$/;
    Object.keys(objetoConceptos).forEach(key => {
        if (regex.test(key)) {
            serviciosPersonalizados.push(key.match(/^P\d+/)[0]);
        }
    });
    return serviciosPersonalizados;
};

export const retornaTextoConceptoServicioAccion = (objetoTotales, servicio, horas, nombreServicioFijoPersonalizado) => (dispatch, getState) => {
    let arrayConceptos = [];
    if (servicio) {
        if (servicio === 'MT') {
            tipoServicio.forEach(serv => {
                if (horas === `${serv.prefix}H`) {
                    arrayConceptos.push(serv.value, serv.label);
                };
            });
        };
        tipoServicio.forEach(serv => {
            if (servicio === `${serv.prefix}T`) {
                arrayConceptos.push(serv.value, serv.label);
            };
        });
        listadoServiciosFijos.forEach(servF => {
            if (servicio === `${servF.prefix}T`) {
                arrayConceptos.push(servF.value, servF.label);
            };
        });
        //modificador: servicios fijos personalizados
        if (objetoTotales && /^P\d+/.test(servicio)) {  
            const serviciosPersonalizados = obtenerServiciosPersonalizados(objetoTotales);
            if (serviciosPersonalizados.length > 0) {
                serviciosPersonalizados.forEach(servicioPersonalizado => {
                    if (servicio === `${servicioPersonalizado}T`) {
                        arrayConceptos.push(servicioPersonalizado, nombreServicioFijoPersonalizado.toUpperCase());
                    };
                });
            };
        };
        if (servicio === 'NUMCT') {
            arrayConceptos.push('Nº CUENTA', numeroCuentaFortise);
        };
    } else {
        if (objetoTotales['MT']) {
            tipoServicio.forEach(serv => {
                if (objetoTotales[`${serv.prefix}H`]) {
                    arrayConceptos.push(serv.label);
                };
            });
        };
        tipoServicio.forEach(serv => {
            if (objetoTotales[`${serv.prefix}T`]) {
                arrayConceptos.push(serv.label);
            };
        });
        listadoServiciosFijos.forEach(servF => {
            if (objetoTotales[`${servF.prefix}T`]) {
                arrayConceptos.push(servF.label);
            };
        });
        if (objetoTotales['NUMCT']) {
            arrayConceptos.push(numeroCuentaFortise);
        };
    };
    return servicio ? arrayConceptos : arrayConceptos.join(', ');
};

export const retornaArrayElementosAccion = (objetoConceptos) => (dispatch, getState) => {
    let arrayElementos = [];
    let retornoServicios = [];
    //verificar si quadrant és doble i complejo
    const contadorComplejo = Object.keys(objetoConceptos).filter(clave => /^M\d/.test(clave)).length;
    if (contadorComplejo > 0) {
        for (let i = 0; i <= contadorComplejo - 1; i++) {
            tipoServicio.forEach(serv => {
                if (objetoConceptos[`M${i}${serv.prefix}T`] && objetoConceptos[`${serv.prefix}H`] && !objetoConceptos[`${serv.prefix}Pr`]) {
                    //verificar si quadrant és doble i té mensual pactat als 2 i serveis diferents
                    retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', `${serv.prefix}H`, null));
                    arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos[`M${i}${serv.prefix}T`], objetoConceptos[`M${i}${serv.prefix}T`], 1]);
                } else if (objetoConceptos[`M${i}${serv.prefix}T`] && objetoConceptos[`${serv.prefix}H`] && objetoConceptos[`${serv.prefix}Pr`]) {
                    //verificar si quadrant és doble i té 1 mensual pactat, 1 precio / hora i mateixos serveis
                    retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', `${serv.prefix}H`, null));
                    arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos[`M${i}${serv.prefix}T`], objetoConceptos[`M${i}${serv.prefix}T`], 1]);
                };
            });
        };
    };
    if (objetoConceptos.MT) {
        tipoServicio.forEach(serv => {
            if (objetoConceptos[`${serv.prefix}H`] && !objetoConceptos[`${serv.prefix}Pr`]) {
                retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'MT', `${serv.prefix}H`, null));
            };
        });
        arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos.MT, objetoConceptos.MT, 1]);
    };
    tipoServicio.forEach(serv => {
        if (objetoConceptos[`${serv.prefix}T`]) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, `${serv.prefix}T`, null, null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos[`${serv.prefix}T`], objetoConceptos[`${serv.prefix}Pr`], objetoConceptos[`${serv.prefix}H`]]);
        };
    });
    listadoServiciosFijos.forEach(servF => {
        if (objetoConceptos[`${servF.prefix}T`]) {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, `${servF.prefix}T`, null, null));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos[`${servF.prefix}T`], objetoConceptos[`${servF.prefix}T`], objetoConceptos[`${servF.prefix}H`]]);
        };
    });
    //modificador: servicios fijos personalizados
    const serviciosPersonalizados = obtenerServiciosPersonalizados(objetoConceptos);
    if (serviciosPersonalizados.length > 0) {
        serviciosPersonalizados.forEach(servicio => {
            retornoServicios = dispatch(retornaTextoConceptoServicioAccion(objetoConceptos, `${servicio}T`, null, objetoConceptos[`${servicio}N`]));
            arrayElementos.push([retornoServicios[0], retornoServicios[1], objetoConceptos[`${servicio}T`], objetoConceptos[`${servicio}T`], objetoConceptos[`${servicio}H`]]);
        });
    };
    if (objetoConceptos.NUMCT) {
        retornoServicios = dispatch(retornaTextoConceptoServicioAccion(null, 'NUMCT', null, null));
        arrayElementos.push([retornoServicios[0], retornoServicios[1], 0, 0, 0]);
    }
    return arrayElementos
};

export const generarArchivosXLSAccion = (numFactusol, objetoConceptos, anyo, mes) => async (dispatch, getState) => {
    const elNumFactusol = parseInt(numFactusol) + 1;
    try {
        const objetoCentroParsear = {
            nombre: objetoConceptos.nombreCentro,
            codigo: objetoConceptos.codigo,
            domicilio: objetoConceptos.domicilio,
            codigoPostal: objetoConceptos.codigoPostal,
            poblacion: objetoConceptos.poblacion,
            provincia: objetoConceptos.provincia,
            nif: objetoConceptos.nif,
            formaPago: objetoConceptos.formaPago,
            telefono: objetoConceptos.telefono,
            mail: objetoConceptos.mail,
            total: parseFloat(objetoConceptos.total).toFixed(2),
            totalIva: parseFloat(objetoConceptos.totalIva).toFixed(2),
            totalMasIva: parseFloat(objetoConceptos.totalMasIva).toFixed(2)
        };   
        const ultimoDia = new Date(anyo, mes, 0);
        const day = ultimoDia.getDate();
        const fechaHoy = day + "/" + mes + "/" + anyo;
        const dataFAC = [[
            1,
            elNumFactusol,
            '',
            fechaHoy,
            0,
            'GEN',
            1,
            '',
            parseInt(objetoCentroParsear.codigo),
            objetoCentroParsear.nombre,
            objetoCentroParsear.domicilio,
            objetoCentroParsear.poblacion,
            objetoCentroParsear.codigoPostal,
            objetoCentroParsear.provincia,
            objetoCentroParsear.nif,
            0,
            0,
            objetoCentroParsear.telefono,
            parseFloat(objetoCentroParsear.total),
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            parseFloat(objetoCentroParsear.total),
            '',
            '',
            21,
            '',
            '',
            parseFloat(objetoCentroParsear.totalIva),
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            parseFloat(objetoCentroParsear.totalMasIva),
            objetoCentroParsear.formaPago,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            'N',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        ]];
        exportarAExcel(dataFAC, 'FAC');
        const dataLFA = [];
        const arrayElementos = dispatch(retornaArrayElementosAccion(objetoConceptos));
        arrayElementos.forEach((elemento, index) => {
            dataLFA.push([
                1,
                elNumFactusol,
                index + 1,
                elemento[0],
                elemento[1],
                elemento[4],
                '',
                '',
                '',
                elemento[3],
                elemento[2],
                0,
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ])
        });
        exportarAExcel(dataLFA, 'LFA');
        dispatch({
            type: GENERAR_ARCHIVOS_EXITO
        });
        dispatch({
            type: RESETEA_EXITO_CONFIGURACION
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const actualizarCuadrantesIteradosAccion = () => async (dispatch, getState) => {
    const { usuarioActivo } = getState().variablesUsuario;
    const { cuadrantesIteradosActualizar } = getState().variablesApp;
    let fechaHoy = new Date().toLocaleString() + '';
    let laFirmaActualizacion = fechaHoy + ' por ' + usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
    const datos = {
        actualizacion: laFirmaActualizacion,
        estado: 'facturado',
        arrayCuadrantes: cuadrantesIteradosActualizar,
    };
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", 'cuadrantes');
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar_lote.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (res.data)
            return new Promise((resolve, reject) => {
                resolve({ payload: true });
            });
    } catch (err) {
        console.error(err)
    };
};

export const generarArchivosXLSLoteAccion = (numFactusol, arrayCuadrantes, anyo, mes) => (dispatch, getState) => {
    dispatch({
        type: PROCESANDO_LOTE
    });
    const elNumFactusol = parseInt(numFactusol) + 1;
    try {
        const dataFAC = [];
        const dataLFA = [];
        arrayCuadrantes.map((cuadranteIterado, index, arr) => {
            const objetoCentroParsear = {
                nombre: cuadranteIterado.total.nombreCentro,
                codigo: cuadranteIterado.total.codigo,
                domicilio: cuadranteIterado.total.domicilio,
                codigoPostal: cuadranteIterado.total.codigoPostal,
                poblacion: cuadranteIterado.total.poblacion,
                provincia: cuadranteIterado.total.provincia,
                nif: cuadranteIterado.total.nif,
                formaPago: cuadranteIterado.total.formaPago,
                telefono: cuadranteIterado.total.telefono,
                mail: cuadranteIterado.total.mail,
                total: parseFloat(cuadranteIterado.total.total).toFixed(2),
                totalIva: parseFloat(cuadranteIterado.total.totalIva).toFixed(2),
                totalMasIva: parseFloat(cuadranteIterado.total.totalMasIva).toFixed(2)
            };
            const ultimoDia = new Date(anyo, mes, 0);
            const day = ultimoDia.getDate();
            const fechaHoy = day + "/" + mes + "/" + anyo;
            dataFAC.push([
                1,
                elNumFactusol + index,
                '',
                fechaHoy,
                0,
                'GEN',
                1,
                '',
                parseInt(objetoCentroParsear.codigo),
                objetoCentroParsear.nombre,
                objetoCentroParsear.domicilio,
                objetoCentroParsear.poblacion,
                objetoCentroParsear.codigoPostal,
                objetoCentroParsear.provincia,
                objetoCentroParsear.nif,
                0,
                0,
                objetoCentroParsear.telefono,
                parseFloat(objetoCentroParsear.total),
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                parseFloat(objetoCentroParsear.total),
                '',
                '',
                21,
                '',
                '',
                parseFloat(objetoCentroParsear.totalIva),
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                parseFloat(objetoCentroParsear.totalMasIva),
                objetoCentroParsear.formaPago,
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                'N',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]);
            const arrayElementos = dispatch(retornaArrayElementosAccion(cuadranteIterado.total));
            arrayElementos.forEach((elemento, index2) => {
                dataLFA.push([
                    1,
                    elNumFactusol + index,
                    index2 + 1,
                    elemento[0],
                    elemento[1],
                    elemento[4],
                    '',
                    '',
                    '',
                    elemento[3],
                    elemento[2],
                    0,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    ''
                ])
            });
            let elTotalActualizado = { ...cuadranteIterado.total };
            elTotalActualizado.procesado.valor = 'si';
            elTotalActualizado.procesado.numF = elNumFactusol + index;
            const options = { fullPrecisionFloats: true };
            dispatch({
                type: SET_CUADRANTESITERADOSACTUALIZAR,
                payload: {
                    elementoArray3: {
                        id: cuadranteIterado.id,
                        total: stringify(elTotalActualizado, options)
                    }
                }
            });
            dispatch({
                type: ITERACION_XLS_EXITO,
                payload: {
                    elementoArray1: dataFAC,
                    elementoArray2: dataLFA
                }
            });
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_CONFIGURACION
        })
    }
};

export const finalizarArchivosXLSLoteAccion = (estado) => (dispatch, getState) => {
    dispatch({
        type: FINALIZANDO_LOTE,
        payload: {
            estado: estado
        }
    });
};

export const emitirArchivosXLSLoteAccion = (laDataFAC, laDataLFA) => (dispatch, getState) => {
    exportarAExcel(laDataFAC[0], 'FAC');
    exportarAExcel(laDataLFA[0], 'LFA');
    dispatch({
        type: GENERAR_ARCHIVOS_EXITO
    });
    dispatch({
        type: RESETEA_EXITO_CONFIGURACION
    });
};

export const isNumeric = (num) => {
    return (num >= 0 || num < 0);
};

export const generaArchivoXLSCentrosAccion = () => (dispatch, getState) => {
    const { arrayCentros } = getState().variablesCentros;
    let elListadoCentros = [];
    arrayCentros.forEach((centro) => {
        let categoriasCentro = [];
        let elObjetoCentro = { ...centro };
        centro.categoria.forEach((cat) => {
            switch (cat) {
                case 1:
                    categoriasCentro.push('Barcelona');
                    break;
                case 2:
                    categoriasCentro.push('Comunidades de pisos');
                    break;
                case 3:
                    categoriasCentro.push('Farmacias');
                    break;
                case 4:
                    categoriasCentro.push('Fuera de Barcelona');
                    break;
                case 5:
                    categoriasCentro.push('Pisos');
                    break;
                case 6:
                    categoriasCentro.push('Residencias');
                    break;
                default:
            }
        });
        let categoriasCentroStr = categoriasCentro.toString();
        elObjetoCentro.categoria = categoriasCentroStr;
        elListadoCentros.push(elObjetoCentro);
    });
    elListadoCentros.sort((a, b) => a.categoria.localeCompare(b.categoria));
    const elListadoCentrosImprimir = [["LISTADO CENTROS"], ["CENTRO", "CATEGORÍA", "ESTADO"]];
    elListadoCentros.forEach((centro) => {
        elListadoCentrosImprimir.push([centro.nombre, centro.categoria, centro.estado]);
    });
    exportarAExcel(elListadoCentrosImprimir, 'listado_centros');
};

export const generaArchivoXLSTrabajadoresAccion = () => (dispatch, getState) => {
    const { arrayTrabajadores } = getState().variablesTrabajadores;
    const elListadoTrabajadoresImprimir = [["LISTADO TRABAJADORES"], ["NOMBRE TRABAJADOR", "ESTADO"]];
    arrayTrabajadores.forEach((trabajador) => {
        elListadoTrabajadoresImprimir.push([trabajador.nombre, trabajador.estado]);
    });
    exportarAExcel(elListadoTrabajadoresImprimir, 'listado_trabajadores');
};

export const generaArchivoXLSCuadrantesPendientesAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesPendientesArray } = getState().variablesPendientes;
    const { arrayCentros } = getState().variablesCentros;
    const elListadoCuadrantesPendientesImprimir = [["LISTADO CUADRANTES PENDIENTES MES " + mes], ["CENTRO"]];
    arrayCentros.forEach((centro) => {
        if (cuadrantesPendientesArray.includes(centro.id)) {
            elListadoCuadrantesPendientesImprimir.push([centro.sub_nombre ? (centro.nombre + " - " + centro.sub_nombre) : centro.nombre]);
        };
    });
    const nombreArchivo = 'listado_cuadrantes_pendientes_' + mes;
    exportarAExcel(elListadoCuadrantesPendientesImprimir, nombreArchivo);
};

export const generaArchivoXLSCuadrantesRegistradosAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesRegistradosArray } = getState().variablesPendientes;
    let cuadrantes = [];
    cuadrantesRegistradosArray.forEach((cuadrante, index) => {
        let objeto = {};
        objeto['nombreCentro'] = cuadrante.total.subNombreCentro ? (cuadrante.total.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.total.nombreCentro;
        objeto['tocaFacturar'] = cuadrante.total.tocaFacturar.valor;
        objeto['razon'] = cuadrante.total.tocaFacturar.razon;
        objeto['total'] = parseFloat(cuadrante.total.total).toFixed(2) + ' €';
        objeto['totalMasIva'] = parseFloat(cuadrante.total.totalMasIva).toFixed(2) + ' €';
        cuadrantes.push(objeto);
    });
    cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
    const elListadoCuadrantesFacturadosImprimir = [["LISTADO CUADRANTES REGISTRADOS MES " + mes], ["CENTRO", "TOCA FACTURAR", "RAZÓN", "TOTAL", "TOTAL + IVA"]];
    cuadrantes.forEach((cuadrante) => {
        elListadoCuadrantesFacturadosImprimir.push([cuadrante.nombreCentro, cuadrante.tocaFacturar, cuadrante.razon, cuadrante.total, cuadrante.totalMasIva]);
    });
    const nombreArchivo = 'listado_cuadrantes_registrados_' + mes;
    exportarAExcel(elListadoCuadrantesFacturadosImprimir, nombreArchivo);
};

export const generaArchivoXLSCuadrantesFacturadosEmpresasAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesFacturadosArray } = getState().variablesPendientes;
    let cuadrantes = [];
    cuadrantesFacturadosArray.forEach((cuadrante, index) => {
        let objeto = {};
        if (cuadrante.total.tocaFacturar.valor === 'si') {
            objeto['nombreCentro'] = cuadrante.total.subNombreCentro ? (cuadrante.total.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.total.nombreCentro;
            objeto['tocaFacturar'] = cuadrante.total.tocaFacturar.valor;
            objeto['razon'] = cuadrante.total.tocaFacturar.razon;
            objeto['procesado'] = cuadrante.total.procesado.valor;
            if (cuadrante.total.procesado.valor === "si") {
                if (cuadrante.total.procesado.numF) {
                    objeto['numero'] = "Número factura: " + cuadrante.total.procesado.numF;
                } else {
                    objeto['numero'] = "";
                };
            };
            objeto['total'] = parseFloat(cuadrante.total.total).toFixed(2) + ' €';
            objeto['totalMasIva'] = parseFloat(cuadrante.total.totalMasIva).toFixed(2) + ' €';
            cuadrantes.push(objeto);
        };
    });
    cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
    const elListadoCuadrantesFacturadosImprimir = [["LISTADO CUADRANTES FACTURADOS EMPRESAS MES " + mes], ["CENTRO", "TOCA FACTURAR", "RAZÓN", "EMITIDO", "NÚMERO FACTURA", "TOTAL", "TOTAL + IVA"]];
    cuadrantes.forEach((cuadrante) => {
        elListadoCuadrantesFacturadosImprimir.push([cuadrante.nombreCentro, cuadrante.tocaFacturar, cuadrante.razon, cuadrante.procesado, cuadrante.numero, cuadrante.total, cuadrante.totalMasIva]);
    });
    const nombreArchivo = 'listado_cuadrantes_facturados_empresas_' + mes;
    exportarAExcel(elListadoCuadrantesFacturadosImprimir, nombreArchivo);
};

export const generaArchivoXLSCuadrantesFacturadosPisosAccion = (mes) => (dispatch, getState) => {
    const { cuadrantesFacturadosArray } = getState().variablesPendientes;
    let cuadrantes = [];
    cuadrantesFacturadosArray.forEach((cuadrante, index) => {
        let objeto = {};
        if (cuadrante.total.tocaFacturar.valor === 'no' && cuadrante.total.tocaFacturar.razon === 'gest') {
            objeto['nombreCentro'] = cuadrante.total.subNombreCentro ? (cuadrante.total.nombreCentro + " - " + cuadrante.total.subNombreCentro) : cuadrante.total.nombreCentro;
            objeto['tocaFacturar'] = cuadrante.total.tocaFacturar.valor;
            objeto['razon'] = cuadrante.total.tocaFacturar.razon;
            objeto['procesado'] = cuadrante.total.procesado.valor;
            if (cuadrante.total.procesado.valor === "si") {
                if (cuadrante.total.procesado.numR) {
                    objeto['numero'] = "Número recibo: " + cuadrante.total.procesado.numR;
                } else {
                    objeto['numero'] = "";
                };
            };
            objeto['total'] = parseFloat(cuadrante.total.total).toFixed(2) + ' €';
            cuadrantes.push(objeto);
        };
    });
    cuadrantes.sort((a, b) => a.nombreCentro.localeCompare(b.nombreCentro));
    const elListadoCuadrantesFacturadosImprimir = [["LISTADO CUADRANTES FACTURADOS PISOS MES " + mes], ["CENTRO", "TOCA FACTURAR", "RAZÓN", "EMITIDO", "NÚMERO RECIBO", "TOTAL"]];
    cuadrantes.forEach((cuadrante) => {
        elListadoCuadrantesFacturadosImprimir.push([cuadrante.nombreCentro, cuadrante.tocaFacturar, cuadrante.razon, cuadrante.procesado, cuadrante.numero, cuadrante.total]);
    });
    const nombreArchivo = 'listado_cuadrantes_facturados_pisos_' + mes;
    exportarAExcel(elListadoCuadrantesFacturadosImprimir, nombreArchivo);
};

export const generaArchivoXLSHorasTrabajadoresAccion = (mes) => (dispatch, getState) => {
    const horasTrabajadoresGestionadas = dispatch(gestionArrayHorasTrabajadoresAccion());
    const horasTrabajadores = horasTrabajadoresGestionadas.map(horaTrabajador => ({
        trabajadorNombre: horaTrabajador.trabajadorNombre,
        totalHoras: horaTrabajador.totalHoras.toFixed(2)
    }));
    const sumaTotalHoras = horasTrabajadores.reduce((sum, { totalHoras }) => sum + parseFloat(totalHoras), 0);
    const elListadoHorasTrabajadoresImprimir = [["LISTADO HORAS TRABAJADORES MES " + mes], ["TRABAJADOR", "HORAS"]];
    horasTrabajadores.forEach((horaTrabajador) => {
        elListadoHorasTrabajadoresImprimir.push([horaTrabajador.trabajadorNombre, horaTrabajador.totalHoras]);
    });
    elListadoHorasTrabajadoresImprimir.push(["", ""]);
    elListadoHorasTrabajadoresImprimir.push([`TOTAL HORAS: ${sumaTotalHoras.toFixed(2)}`]);
    const nombreArchivo = 'listado_horas_trabajadores_' + mes;
    exportarAExcel(elListadoHorasTrabajadoresImprimir, nombreArchivo);
};