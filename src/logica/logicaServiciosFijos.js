import Constantes from "../constantes";

const listadoServiciosFijos = Constantes.TIPO_SERVICIO_FIJO;

const actualizarObjetoResultante = (objeto, propiedad, servicio) => {
    return {
        ...objeto,
        [`precioHora_${propiedad}`]: servicio[`precioHora_${propiedad}`],
        [`diaVariacion_${propiedad}`]: servicio[`diaVariacion_${propiedad}`],
        [`variacion_${propiedad}`]: servicio[`variacion_${propiedad}`],
        [`activo_${propiedad}`]: servicio[`activo_${propiedad}`],
        [`int_${propiedad}`]: servicio[`int_${propiedad}`],
        [`trab_${propiedad}`]: servicio[`trab_${propiedad}`]
    };
};

export const gestionaColumnaServiciosFijosInicioAccion = (servicios, activacionServicio) => (dispatch, getState) => {
    const { losDiasDelMes, stateFestivo, cuadranteRegistrado } = getState().variablesCuadrantes;
    const arrayResultante = [];
    let objetoResultante, totalServicioFijo, sumatorioDiasActivos, totalServiciosActivosInicial, totalServiciosActivos, totalServiciosRestados;
    servicios.forEach((servicio, indexServicio) => {
        const noBloqueado = servicio.tipoServiciofijo === 'FEST' ? true : cuadranteRegistrado === 'si' ? activacionServicio : true;      
        totalServiciosActivosInicial = servicio.totalServiciosActivosInicial ? servicio.totalServiciosActivosInicial : 0;
        totalServiciosActivos = servicio.totalServiciosActivos ? servicio.totalServiciosActivos : 0;
        totalServiciosRestados = servicio.totalServiciosRestados ? servicio.totalServiciosRestados : 0;
        objetoResultante = {
            tipoServiciofijo: servicio.tipoServiciofijo,
            estados: {}
        };
        sumatorioDiasActivos = 0;
        totalServicioFijo = 0;
        for (const prop in servicio) {
            if (prop.includes('variacion')) {
                const tipoVariacion = servicio[prop] === 1 ? 'todas' : servicio[prop] === 2 ? 'sino' : 'una';
                losDiasDelMes.forEach((dia, index) => {
                    const numeroSemana = Math.ceil((index + 1) / 7);
                    const diaSFGest = { 'Lunes': 'lunes', 'Martes': 'martes', 'Miércoles': 'miercoles', 'Jueves': 'jueves', 'Viernes': 'viernes', 'Sábado': 'sabado', 'Domingo': 'domingo' }[dia[1][0]];
                    listadoServiciosFijos.forEach(prefixObj => {
                        const propiedad = prefixObj.prefix;
                        const condicion1 = servicio[dia[1][0] + dia[0][0]] >= 0;
                        const condicion2 = servicio[`precioHora_${propiedad}`] || servicio[`int_${propiedad}`];
                        if (condicion1) {
                            if (condicion2) {
                                if (!stateFestivo['estadoFestivoDia' + (index + 1)]) {
                                    if (servicio[`activo_${propiedad}`] === 'si') {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio[`precioHora_${propiedad}`];
                                        if (tipoVariacion === 'una') {
                                            const totalServicios = totalServiciosActivos + objetoResultante['totalServiciosActivosInicial'];
                                            const condicion3 = totalServicios > objetoResultante['totalServiciosActivosInicial'];
                                            const condicion4 = losDiasDelMes.length === dia[0][0] && totalServicios === objetoResultante['totalServiciosActivosInicial'];
                                            if (condicion3) {
                                                if (condicion4) {
                                                    totalServicioFijo = sumatorioDiasActivos = servicio[`precioHora_${propiedad}`];
                                                } else {
                                                    totalServicioFijo += servicio[`precioHora_${propiedad}`];
                                                    sumatorioDiasActivos += servicio[`precioHora_${propiedad}`];
                                                };
                                            } else {
                                                totalServicioFijo = sumatorioDiasActivos = servicio[`precioHora_${propiedad}`];
                                            };
                                        } else {
                                            const totalServicios = totalServiciosActivos + totalServiciosRestados + objetoResultante['totalServiciosActivosInicial'];
                                            const condicion5 = totalServicios >= objetoResultante['totalServiciosActivosInicial'];
                                            if (condicion5) {
                                                totalServicioFijo += servicio[`precioHora_${propiedad}`];
                                                sumatorioDiasActivos += servicio[`precioHora_${propiedad}`];
                                            } else {
                                                totalServicioFijo = sumatorioDiasActivos = servicio[`precioHora_${propiedad}`];
                                            };
                                        };
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    };
                                };
                                objetoResultante = actualizarObjetoResultante(objetoResultante, propiedad, servicio);
                            };
                        } else {
                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                            const condicion6 = tipoVariacion === 'todas' || (tipoVariacion === 'sino' && (numeroSemana === 1 || numeroSemana === 3 || numeroSemana === 5));
                            const condicion7 = servicio[`precioHora_${propiedad}`] && servicio[`diaVariacion_${propiedad}`] === diaSFGest;
                            if (condicion6) {
                                if (condicion7) {
                                    if (!stateFestivo['estadoFestivoDia' + (index + 1)] && servicio[`activo_${propiedad}`] === 'si' && servicio[dia[1][0] + dia[0][0]] !== "anulado") {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio[`precioHora_${propiedad}`];
                                        totalServicioFijo += servicio[`precioHora_${propiedad}`];
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        totalServiciosActivosInicial += 1;
                                    };
                                    objetoResultante = actualizarObjetoResultante(objetoResultante, propiedad, servicio);
                                };
                            } else if (tipoVariacion === 'una') {
                                objetoResultante['modificado'] = 'no';
                                if (condicion2) {
                                    if (servicio[`activo_${propiedad}`] === 'si') {
                                        sumatorioDiasActivos > 0 ? totalServicioFijo = sumatorioDiasActivos : totalServicioFijo = servicio[`precioHora_${propiedad}`];
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        totalServiciosActivosInicial = 1;
                                    };
                                    objetoResultante = actualizarObjetoResultante(objetoResultante, propiedad, servicio);
                                };
                            };
                        };
                    });
                    objetoResultante = {
                        ...objetoResultante,
                        modificado: servicio.modificado ? servicio.modificado : "no",
                        totalServiciosActivosInicial: totalServiciosActivosInicial,
                        totalServiciosActivos: totalServiciosActivos,
                        totalServiciosRestados: totalServiciosRestados,
                        totalServicioFijo: noBloqueado ? totalServicioFijo : servicio.totalServicioFijo
                    };
                });
                arrayResultante.push(objetoResultante);
            };
        };
    });
    return arrayResultante
};

export const gestionaColumnaServiciosFijosCambiosAccion = (servicios, casilla) => (dispatch, getState) => {
    const { losDiasDelMes } = getState().variablesCuadrantes;
    const arrayResultante = [];
    let objetoResultante, totalServicioFijo, totalServiciosActivos, totalServiciosRestados;
    servicios.forEach((servicio, indexServicio) => {
        const noBloqueado = servicio.tipoServiciofijo === 'FEST' ? true : false;
        totalServiciosActivos = servicio.totalServiciosActivos ? servicio.totalServiciosActivos : 0;
        totalServiciosRestados = servicio.totalServiciosRestados ? servicio.totalServiciosRestados : 0;
        objetoResultante = servicio;
        totalServicioFijo = servicio.totalServicioFijo;
        for (const prop in servicio) {
            if (prop.includes('variacion')) {
                const tipoVariacion = servicio[prop] === 1 ? 'todas' : servicio[prop] === 2 ? 'sino' : 'una';
                losDiasDelMes.forEach((dia, index) => {
                    listadoServiciosFijos.forEach(prefixObj => {
                        const { prefix: propiedad, value: nombreServicio } = prefixObj;
                        const condicion1 = casilla.tipo !== '';
                        const condicion3 = servicio[`precioHora_${propiedad}`] || servicio[`int_${propiedad}`];
                        if (condicion1) {
                            const condicion2 = casilla.dia === (dia[1][0] + dia[0][0]) && casilla.indice === indexServicio && casilla.tipo === nombreServicio;
                            if (condicion2) {
                                if (condicion3) {
                                    if (casilla.valor) {
                                        objetoResultante[dia[1][0] + dia[0][0]] = servicio[`precioHora_${propiedad}`] ? servicio[`precioHora_${propiedad}`] : 0;
                                        if (noBloqueado) {
                                            if ((tipoVariacion === 'una' && (totalServiciosActivos + objetoResultante['totalServiciosActivosInicial']) > objetoResultante['totalServiciosActivosInicial']) || (tipoVariacion !== 'una' && (totalServiciosActivos + objetoResultante['totalServiciosActivosInicial']) >= objetoResultante['totalServiciosActivosInicial'])) {
                                                totalServicioFijo += servicio[`precioHora_${propiedad}`];
                                            };
                                            totalServiciosActivos += 1;
                                        };
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                    } else {
                                        totalServiciosActivos >= objetoResultante['totalServiciosActivosInicial'] ? totalServiciosActivos -= 1 : totalServiciosRestados += 1;
                                        tipoVariacion === 'una' ?
                                            (totalServiciosActivos + objetoResultante['totalServiciosActivosInicial']) > objetoResultante['totalServiciosActivosInicial'] &&
                                            (totalServicioFijo -= servicio[`precioHora_${propiedad}`]) :
                                            (totalServiciosActivos + objetoResultante['totalServiciosActivosInicial']) >= objetoResultante['totalServiciosActivosInicial'] &&
                                            (totalServicioFijo -= servicio[`precioHora_${propiedad}`]);
                                        objetoResultante[dia[1][0] + dia[0][0]] = 'anulado';
                                        objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                    };
                                    objetoResultante = actualizarObjetoResultante(objetoResultante, propiedad, servicio);
                                };
                            };
                        } else {
                            const condicion4 = casilla.dia === (dia[1][0] + dia[0][0]);
                            if (condicion4) {
                                if (condicion3) {
                                    if (!casilla.valor) {
                                        if (objetoResultante[dia[1][0] + dia[0][0]] === 'buffer') {
                                            objetoResultante[dia[1][0] + dia[0][0]] = servicio[`precioHora_${propiedad}`] ? servicio[`precioHora_${propiedad}`] : 0;
                                            totalServicioFijo += servicio[`precioHora_${propiedad}`];
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = true;
                                        };
                                    } else {
                                        if (objetoResultante[dia[1][0] + dia[0][0]]) {
                                            objetoResultante[dia[1][0] + dia[0][0]] = 'buffer';
                                            totalServicioFijo -= servicio[`precioHora_${propiedad}`];
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                    };
                                    objetoResultante = actualizarObjetoResultante(objetoResultante, propiedad, servicio);
                                };
                            };
                        };
                        objetoResultante = {
                            ...objetoResultante,
                            totalServicioFijo: totalServicioFijo,
                            totalServiciosActivos: totalServiciosActivos,
                            totalServiciosRestados: totalServiciosRestados
                        };
                    });
                });
                arrayResultante.push(objetoResultante);
            };
        };
    });
    return arrayResultante
};