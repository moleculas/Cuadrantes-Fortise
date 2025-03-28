import Constantes from "../constantes";
import { retornaMinutosAccionEnCuadrantes } from './logicaApp';
import {
    setCambioSecuenciaSemanasAccion,
    setItemEditandoConfiguracionAccion,
    setEstamosActualizandoCuadranteSinCargaAccion
} from '../redux/cuadrantesSettersDucks';
import { actualizarObjetoCuadranteAccion } from '../redux/cuadrantesDucks';

const {
    DIAS_SEMANA: diasSemana,
    TIPO_SERVICIO: tipoServicio
} = Constantes;

export const limpiarCuadranteInformeAccion = (informe) => (dispatch) => {
    let elObjetoDatosInforme = {
        computo: informe.computo,
        iniciado: informe.iniciado,
        excepcion: informe.excepcion,
        bloqueado: informe.bloqueado,
        tipoRegistro: informe.tipoRegistro,
        seqSemSiNo: informe.seqSemSiNo || null,
    };
    if (informe.mensualPactadoInicial) {
        elObjetoDatosInforme = {
            ...elObjetoDatosInforme,
            mensualPactado: parseFloat(informe.mensualPactado),
            mensualPactadoInicial: parseFloat(informe.mensualPactadoInicial),
            proporcion: parseFloat(informe.proporcion),
        };
    } else {
        elObjetoDatosInforme = {
            ...elObjetoDatosInforme,
            precioHoraTotal: parseFloat(informe.precioHoraTotal),
        };
    };
    const keysTipoServicio = tipoServicio.map(servicio => (
        { phKey: `precioHora_${servicio.prefix}`, tfKey: `totalFacturado_${servicio.prefix}` }
    ));
    keysTipoServicio.forEach(({ phKey, tfKey }) => {
        if (informe[phKey]) {
            elObjetoDatosInforme = {
                ...elObjetoDatosInforme,
                [phKey]: parseFloat(informe[phKey]),
                [tfKey]: parseFloat(informe[tfKey]),
            };
        };
    });
    return elObjetoDatosInforme
};

export const gestionarInformeAccion = (cambioConf) => (dispatch, getState) => {
    const { cuadrante, objetoCuadrante, cuadranteRegistrado } = getState().variablesCuadrantes;
    const { cuadranteEnUsoCuadrantes, itemEditandoConfiguracion, numeroCuadrantesCuadrantes, cambioSecuenciaSemanas } = getState().variablesCuadrantesSetters;
    const { objetoCentro } = getState().variablesCentros;
    const informe = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1];
    const cantidadMensualPactadoInicial = parseFloat(informe?.mensualPactadoInicial);
    const cantidadMensualPactado = parseFloat(informe?.mensualPactado) || null;
    const cantidadPrecioHoraTotal = parseFloat(informe?.precioHoraTotal) || null;
    //modificador: correcció error canvis en configuració
    //modificador 2: correcció de cantidadMensualPactado >= 0 a (cantidadMensualPactado >= 0 && cantidadPrecioHoraTotal === null) perquè les gestiones especial de horas a precio/hora donàven error

    const esMensualPactado = (informe.computo === 1 || informe.computo === 3)
        ? (cambioConf
            ? (cantidadMensualPactado >= 0 && cantidadPrecioHoraTotal === null)
            : (cantidadMensualPactadoInicial >= 0))
        : false;
    const arrayResultante = [];
    let elTipoServicio;
    let sumatorioTotalHorasVariacion = 0;
    let sumatorioTotales = {};
    const sumarObjetosSumatorios = (objeto1, objeto2) => {
        const resultado = {};
        for (const clave in objeto1) {
            if (clave in objeto2) {
                resultado[clave] = objeto1[clave] + objeto2[clave];
            } else {
                resultado[clave] = objeto1[clave];
            };
        };
        for (const clave in objeto2) {
            if (!(clave in objeto1)) {
                resultado[clave] = objeto2[clave];
            };
        };
        return resultado;
    };
    cuadrante.forEach((cuadranteColumna, index) => {
        elTipoServicio = cuadranteColumna.tipoServicio;
        //variables a 0        
        let objSumatorios = tipoServicio.reduce((acc, curr) => {
            acc[`sumatorioHorasNormal_${curr.prefix}`] = 0;
            acc[`sumatorioHorasExtra_${curr.prefix}`] = 0;
            return acc;
        }, {});
        let totalesPorServicio;
        for (const prop in cuadranteColumna) {
            let lasHorasNormal = 0, lasHorasExtra = 0;
            const columna = cuadranteColumna[prop];
            const tipoHorario = cuadranteColumna.tipoHorario;
            const retornaHorasConVariacion = (variacion) => {
                let lasHorasNormal, lasHorasExtra;
                switch (variacion) {
                    case 1:
                    //inhabilitado de momento
                    case 2:
                        //Horas sin coste & Sustitución festivos
                        lasHorasNormal = null;
                        lasHorasExtra = null;
                        break;
                    default:
                }
                return { lasHorasNormal, lasHorasExtra }
            };
            diasSemana.forEach(diaObj => {
                if (prop.includes(diaObj.label)) {
                    switch (tipoHorario) {
                        case 'rango':
                            if (columna[`${diaObj.value}InicioRango`]) {
                                if (columna.tipoVariacion) {
                                    lasHorasExtra = retornaHorasConVariacion(columna.tipoVariacion).lasHorasExtra;
                                    lasHorasNormal = retornaHorasConVariacion(columna.tipoVariacion).lasHorasNormal;
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(
                                        columna[`${diaObj.value}InicioRango`],
                                        columna[`${diaObj.value}FinRango`]
                                    ) / 60;
                                    lasHorasExtra = null;
                                };
                            };
                            break;
                        case 'rangoDescanso':
                            if (columna[`${diaObj.value}Inicio1RangoDescanso`]) {
                                if (columna.tipoVariacion) {
                                    lasHorasExtra = retornaHorasConVariacion(columna.tipoVariacion).lasHorasExtra;
                                    lasHorasNormal = retornaHorasConVariacion(columna.tipoVariacion).lasHorasNormal;
                                } else {
                                    const rango1 = retornaMinutosAccionEnCuadrantes(
                                        columna[`${diaObj.value}Inicio1RangoDescanso`],
                                        columna[`${diaObj.value}Fin1RangoDescanso`]
                                    ) / 60;
                                    const rango2 = columna[`${diaObj.value}Inicio2RangoDescanso`] ?
                                        retornaMinutosAccionEnCuadrantes(
                                            columna[`${diaObj.value}Inicio2RangoDescanso`],
                                            columna[`${diaObj.value}Fin2RangoDescanso`]
                                        ) / 60 :
                                        0;
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                            };
                            break;
                        case 'cantidad':
                            if (columna[`${diaObj.value}Cantidad`]) {
                                if (columna.tipoVariacion) {
                                    lasHorasExtra = retornaHorasConVariacion(columna.tipoVariacion).lasHorasExtra;
                                    lasHorasNormal = retornaHorasConVariacion(columna.tipoVariacion).lasHorasNormal;
                                } else {
                                    lasHorasNormal = columna[`${diaObj.value}Cantidad`] / 60;
                                    lasHorasExtra = null;
                                };
                            };
                            break;
                        default:
                    };
                };
            });
            //parche per passar error quadrants antics
            const buscarTipoServicioEncuadrante = (arr, cadena) => {
                for (let i = 0; i < arr.length; i++) {
                    for (let clave in arr[i]) {
                        if (clave.indexOf(cadena) !== -1) {
                            return arr[i][clave];
                        };
                    };
                };
                return null;
            };
            const constTipoServicio = columna?.tipoServicio ? columna.tipoServicio : buscarTipoServicioEncuadrante(cuadranteColumna, "TipoServicio");
            tipoServicio.forEach(servicio => {
                if (constTipoServicio === servicio.value) {
                    objSumatorios[`sumatorioHorasNormal_${servicio.prefix}`] += lasHorasNormal;
                    objSumatorios[`sumatorioHorasExtra_${servicio.prefix}`] += lasHorasExtra;
                };
            });
        };
        totalesPorServicio = tipoServicio.reduce((acc, servicio) => {
            acc[`totalHorasNormal_${servicio.prefix}`] = objSumatorios[`sumatorioHorasNormal_${servicio.prefix}`];
            acc[`totalHorasExtra_${servicio.prefix}`] = objSumatorios[`sumatorioHorasExtra_${servicio.prefix}`];
            return acc;
        }, {});
        arrayResultante.push({
            trabajador: cuadranteColumna.nombreTrabajador,
            tipo: cuadranteColumna.tipoTrabajador,
            ...totalesPorServicio,
            totalHoras: Object.values(totalesPorServicio).reduce((total, valor) => {
                return total + (valor || 0);
            }, 0)
        });
        const prefTr = cuadranteColumna.tipoTrabajador === 'trabajador' ? "Tra" : cuadranteColumna.tipoTrabajador === 'suplente' ? "Sup" : null;
        const totalSumatorioHorasNormales = tipoServicio.reduce((total, servicio) => total + objSumatorios[`sumatorioHorasNormal_${servicio.prefix}`], 0);
        const sumatorioColumnaTotales = tipoServicio.reduce((acc, curr) => {
            acc[`sumatorioTotalHorasNormal${prefTr}_${curr.prefix}`] = objSumatorios[`sumatorioHorasNormal_${curr.prefix}`];
            return acc;
        }, {
            [`sumatorioHorasBajasComputables${prefTr}`]: cuadranteColumna.horasBajasComputables,
            [`sumatorioTotalHorasFestivasComputables${prefTr}`]: esMensualPactado && (totalSumatorioHorasNormales === 0) ? 0 : cuadranteColumna.horasFestivasComputables,
        });
        sumatorioTotales = sumarObjetosSumatorios(sumatorioTotales, sumatorioColumnaTotales);
    });
    let objetoDatosInforme = {
        ...informe,
        arrayDatosInforme: arrayResultante
    };
    if (esMensualPactado) {
        //gestion mensualPactado      
        const cambiosEnConfiguracion = (objetoCentro.nombre !== '' && cantidadMensualPactadoInicial && !objetoCentro.horario.horario[cuadranteEnUsoCuadrantes - 1]);
        const excepcion = informe.excepcion;
        let resultadoIniciado = false;
        if (!informe.iniciado) {
            const { trabajadoresRecorridos, trabajadoresEstimados } = cuadrante.reduce((total, empleado, i) => {
                if (empleado.tipoTrabajador === 'trabajador') {
                    const diferenciaSuplentesCalculo = i - total.sumatorioSuplentesCalculo;
                    if (cuadranteRegistrado === 'no' && empleado.hayBaja && objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[cuadranteEnUsoCuadrantes - 1].trabajadores[diferenciaSuplentesCalculo]['suplente_' + (diferenciaSuplentesCalculo + 1)]) {
                        total.trabajadoresEstimados += 1;
                    };
                    total.trabajadoresRecorridos += 1;
                };
                if (empleado.tipoTrabajador === 'suplente') {
                    total.trabajadoresRecorridos += 1;
                    total.sumatorioSuplentesCalculo += 1;
                };
                return total;
            }, { trabajadoresRecorridos: 0, trabajadoresEstimados: cuadranteRegistrado === 'no' ? objetoCuadrante.datosTrabajadoresIniciales.datosTrabajadoresIniciales[cuadranteEnUsoCuadrantes - 1].cantidad : objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].arrayCuadrante.length, sumatorioSuplentesCalculo: 0 });
            resultadoIniciado = trabajadoresRecorridos === trabajadoresEstimados;
        } else {
            resultadoIniciado = true;
        };
        const cuadranteNoIniciado = !informe.iniciado || cambioConf || cambioSecuenciaSemanas.gestion;
        const cuadranteSiIniciado = informe.iniciado && !cambioConf && !cambioSecuenciaSemanas.gestion;
        let totalMensualPactado;
        if (cuadranteNoIniciado) {
            const totalHorasInicialTra = tipoServicio.reduce((total, servicio) => total + sumatorioTotales[`sumatorioTotalHorasNormalTra_${servicio.prefix}`], 0);
            const totalHorasInicialSup = tipoServicio.reduce((total, servicio) => total + sumatorioTotales[`sumatorioTotalHorasNormalSup_${servicio.prefix}`], 0);
            const totalHorasInicial = (totalHorasInicialTra || 0) + (totalHorasInicialSup || 0) + sumatorioTotalHorasVariacion;
            const condicion1 = cuadranteRegistrado === 'no' && !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado;
            const condicion2 = cuadranteRegistrado === 'si' || (cuadranteRegistrado === 'no' && numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado)
            const retornaPreciosHora = (proporcion, condicion) => {
                return tipoServicio.reduce((acc, curr) => ({
                    ...acc,
                    [`elPrecioHora_${curr.prefix}`]:
                        condicion === "cnd1" ? (elTipoServicio === curr.value ? proporcion : null) :
                            condicion === "cnd2" ? informe[`precioHora_${curr.prefix}`] : null,
                }), {});
            };
            //control de excepciones  
            let proporcion, objPreciosHora;
            switch (excepcion) {
                case 1:
                    proporcion = condicion1
                        ? cantidadMensualPactadoInicial /
                        (totalHorasInicialTra +
                            (sumatorioTotales[`sumatorioHorasBajasComputablesTra`] || 0) +
                            (sumatorioTotales[`sumatorioTotalHorasFestivasComputablesTra`] || 0) +
                            (sumatorioTotales[`sumatorioTotalHorasFestivasComputablesSup`] || 0)
                        )
                        : condicion2 ? informe.proporcion : null;
                    objPreciosHora = condicion1
                        ? retornaPreciosHora(proporcion, "cnd1")
                        : condicion2 ? retornaPreciosHora(proporcion, "cnd2") : null;
                    totalMensualPactado = condicion1
                        ? tipoServicio.reduce(
                            (total, servicio) =>
                                total +
                                ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${servicio.prefix}`] || 0) +
                                    (sumatorioTotales[`sumatorioTotalHorasNormalSup_${servicio.prefix}`] || 0)) *
                                objPreciosHora[`elPrecioHora_${servicio.prefix}`], 0) :
                        condicion2 ? informe.mensualPactado : null;
                    break;
                case '':
                    let totalHorasGeneral = (totalHorasInicialTra +
                        (sumatorioTotales[`sumatorioHorasBajasComputablesTra`] || 0) +
                        (sumatorioTotales[`sumatorioTotalHorasFestivasComputablesTra`] || 0) +
                        (sumatorioTotales[`sumatorioTotalHorasFestivasComputablesSup`] || 0)
                    );
                    //modificador: parche per quan el total hores es 0 pq coincideix un únic registre amb festiu
                    if (totalHorasGeneral === 0) {
                        const totalHorasFestivasComputablesExcepcion = cuadrante.reduce((total, objeto) =>
                            total + (objeto.horasFestivasComputablesExcepcion || 0), 0);
                        totalHorasGeneral = totalHorasFestivasComputablesExcepcion;
                    };
                    //modificador: correcció error canvis en configuració
                    if (cambioConf) {
                        proporcion = condicion1
                            ? (cantidadMensualPactadoInicial ? cantidadMensualPactadoInicial : cantidadMensualPactado) /
                            totalHorasGeneral
                            : condicion2 ? informe.proporcion : null;
                    } else {
                        proporcion = condicion1
                            ? cantidadMensualPactadoInicial /
                            totalHorasGeneral
                            : condicion2 ? informe.proporcion : null;
                    };
                    objPreciosHora = condicion1
                        ? retornaPreciosHora(proporcion, "cnd1")
                        : condicion2 ? retornaPreciosHora(proporcion, "cnd2") : null;
                    totalMensualPactado = condicion1
                        ? tipoServicio.reduce(
                            (total, servicio) =>
                                total +
                                ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${servicio.prefix}`] || 0) +
                                    (sumatorioTotales[`sumatorioTotalHorasNormalSup_${servicio.prefix}`] || 0)) *
                                objPreciosHora[`elPrecioHora_${servicio.prefix}`], 0) :
                        condicion2 ? informe.mensualPactado : null;
                    break;
                default:
            };
            objetoDatosInforme = {
                ...objetoDatosInforme,
                iniciado: resultadoIniciado,
                proporcion: proporcion,
                mensualPactado: totalMensualPactado,
                //modificador: correcció error canvis en configuració
                mensualPactadoInicial: cambioConf ? cantidadMensualPactadoInicial ? cantidadMensualPactadoInicial : cantidadMensualPactado : objetoDatosInforme.mensualPactadoInicial,
                ...tipoServicio.reduce((acc, curr) => {
                    acc[`precioHora_${curr.prefix}`] = objPreciosHora[`elPrecioHora_${curr.prefix}`];
                    acc[`totalFacturado_${curr.prefix}`] =
                        (sumatorioTotales[`sumatorioTotalHorasNormalTra_${curr.prefix}`] + sumatorioTotales[`sumatorioTotalHorasNormalSup_${curr.prefix}`]) ?
                            (sumatorioTotales[`sumatorioTotalHorasNormalTra_${curr.prefix}`] +
                                sumatorioTotales[`sumatorioTotalHorasNormalSup_${curr.prefix}`] +
                                sumatorioTotales[`sumatorioTotalHorasFestivasComputablesTra`]) *
                            objPreciosHora[`elPrecioHora_${curr.prefix}`] :
                            null;
                    return acc;
                }, {})
            };
            const objetoDatosCuadrante = {
                ...itemEditandoConfiguracion,
                ...tipoServicio.reduce((acc, curr) => ({
                    ...acc,
                    [`precioHora_${curr.prefix}`]: objPreciosHora[`elPrecioHora_${curr.prefix}`] || '',
                }), {}),
            };
            dispatch(setItemEditandoConfiguracionAccion(objetoDatosCuadrante));
            cambioSecuenciaSemanas.gestion && (dispatch(setCambioSecuenciaSemanasAccion({ inicial: false, gestion: false })));
        };
        if (cuadranteSiIniciado) {
            const condicion1 = objetoCuadrante.datosInforme.datosInforme[cuadranteEnUsoCuadrantes - 1].bloqueado === 'no';
            switch (excepcion) {
                case 1:
                    totalMensualPactado = condicion1 ?
                        tipoServicio.reduce((total, servicio) =>
                            total +
                            ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${servicio.prefix}`] || 0) +
                                (sumatorioTotales[`sumatorioTotalHorasNormalSup_${servicio.prefix}`] || 0)) *
                            informe[`precioHora_${servicio.prefix}`], 0) :
                        informe.mensualPactado;
                    objetoDatosInforme = condicion1 ? {
                        ...objetoDatosInforme,
                        mensualPactado: totalMensualPactado,
                        ...tipoServicio.reduce((acc, curr) => {
                            acc[`totalFacturado_${curr.prefix}`] =
                                (sumatorioTotales[`sumatorioTotalHorasNormalTra_${curr.prefix}`] + sumatorioTotales[`sumatorioTotalHorasNormalSup_${curr.prefix}`]) ?
                                    ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${curr.prefix}`] +
                                        sumatorioTotales[`sumatorioTotalHorasNormalSup_${curr.prefix}`]) *
                                        informe[`elPrecioHora_${curr.prefix}`]) : null;
                            return acc;
                        }, {})
                    } : {
                        ...objetoDatosInforme,
                        mensualPactado: informe.mensualPactado,
                    };
                    break;
                case '':
                    totalMensualPactado = condicion1 ?
                        tipoServicio.reduce((total, servicio) =>
                            total +
                            ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${servicio.prefix}`] || 0) +
                                (sumatorioTotales[`sumatorioTotalHorasNormalSup_${servicio.prefix}`] || 0)) *
                            informe[`precioHora_${servicio.prefix}`],
                            0
                        ) + ((sumatorioTotales[`sumatorioTotalHorasFestivasComputablesTra`] || 0) + (sumatorioTotales[`sumatorioTotalHorasFestivasComputablesSup`] || 0)) * informe.proporcion :
                        informe.mensualPactado;
                    objetoDatosInforme = condicion1 ? {
                        ...objetoDatosInforme,
                        mensualPactado: totalMensualPactado,
                        ...tipoServicio.reduce((acc, curr) => {
                            acc[`totalFacturado_${curr.prefix}`] =
                                (sumatorioTotales[`sumatorioTotalHorasNormalTra_${curr.prefix}`] + sumatorioTotales[`sumatorioTotalHorasNormalSup_${curr.prefix}`]) ?
                                    ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${curr.prefix}`] +
                                        sumatorioTotales[`sumatorioTotalHorasNormalSup_${curr.prefix}`]) *
                                        informe[`elPrecioHora_${curr.prefix}`]) +
                                    ((sumatorioTotales[`sumatorioTotalHorasFestivasComputablesTra`] +
                                        sumatorioTotales[`sumatorioTotalHorasFestivasComputablesSup`]) *
                                        informe[`proporcion`]) : null;
                            return acc;
                        }, {})
                    } : {
                        ...objetoDatosInforme,
                        mensualPactado: informe.mensualPactado,
                    };
                    break;
                default:
            };
            const objetoDatosCuadrante = {
                ...itemEditandoConfiguracion,
                mensualPactado: totalMensualPactado
            };
            dispatch(setItemEditandoConfiguracionAccion(objetoDatosCuadrante));
        };
    } else {
        //gestion precio/hora   
        objetoDatosInforme = {
            ...objetoDatosInforme,
            precioHoraTotal: tipoServicio.reduce((total, servicio) =>
                total +
                ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${servicio.prefix}`] || 0) +
                    (sumatorioTotales[`sumatorioTotalHorasNormalSup_${servicio.prefix}`] || 0)) *
                informe[`precioHora_${servicio.prefix}`], 0),
            ...tipoServicio.reduce((acc, servicio) => {
                const cantidad = ((sumatorioTotales[`sumatorioTotalHorasNormalTra_${servicio.prefix}`] || 0) +
                    (sumatorioTotales[`sumatorioTotalHorasNormalSup_${servicio.prefix}`] || 0)) *
                    informe[`precioHora_${servicio.prefix}`];
                acc[`totalFacturado_${servicio.prefix}`] = cantidad > 0 ? cantidad : null;
                return acc;
            }, {})
        };
    };
    let elArrayDatosInforme = [...objetoCuadrante.datosInforme.datosInforme];
    elArrayDatosInforme[cuadranteEnUsoCuadrantes - 1] = objetoDatosInforme;
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


