import { useSelector } from 'react-redux';

const Helpers_2 = () => {
    const stateFestivo = useSelector(store => store.variablesCuadrantes.stateFestivo);
    const losDiasDelMes = useSelector(store => store.variablesCuadrantes.losDiasDelMes);
    const cuadrante = useSelector(store => store.variablesCuadrantes.cuadrante);

    const gestionaColumnaServiciosFijosAccion = (servicios, casilla) => {
        let arrayResultante = [];
        let numeroSemana;
        let objetoResultante;
        let totalServicioFijo;
        servicios.forEach((servicio, indexServicio) => {
            if (!casilla) {
                objetoResultante = {
                    tipoServiciofijo: servicio.tipoServiciofijo,
                    estados: {}
                };
                totalServicioFijo = 0;
            };
            if (casilla) {
                objetoResultante = servicio;
                totalServicioFijo = servicio.totalServicioFijo;
            };
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
                        if (casilla) {
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
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
                                            delete objetoResultante[dia[1][0] + dia[0][0]];
                                            totalServicioFijo -= servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
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
                                };
                            };
                        } else {
                            //es inicio                           
                            if (dia[1][0] === 'Lunes') {
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
                                } else if (tipoVariacion === 'una') {
                                    objetoResultante['modificado'] = 'no';
                                    if (servicio.precioHora_TO) {
                                        if (servicio.activo_TO === 'si') {
                                            totalServicioFijo = servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                        objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                        objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                        objetoResultante['activo_TO'] = servicio.activo_TO;
                                    };
                                    if (servicio.precioHora_CR) {
                                        if (servicio.activo_CR === 'si') {
                                            totalServicioFijo = servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                        objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                        objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                        objetoResultante['activo_CR'] = servicio.activo_CR;
                                    };
                                    if (servicio.precioHora_CE) {
                                        if (servicio.activo_CE === 'si') {
                                            totalServicioFijo = servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                        objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                        objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                        objetoResultante['activo_CE'] = servicio.activo_CE;
                                    };
                                    if (servicio.precioHora_CI) {
                                        if (servicio.activo_CI === 'si') {
                                            totalServicioFijo = servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                        objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                        objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                        objetoResultante['activo_CI'] = servicio.activo_CI;
                                    };
                                    if (servicio.precioHora_MO) {
                                        if (servicio.activo_MO === 'si') {
                                            totalServicioFijo = servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                        objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                        objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                        objetoResultante['activo_MO'] = servicio.activo_MO;
                                    };
                                    if (servicio.precioHora_OF) {
                                        if (servicio.activo_OF === 'si') {
                                            totalServicioFijo = servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                        objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                        objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                        objetoResultante['activo_OF'] = servicio.activo_OF;
                                    };
                                    if (servicio.precioHora_AL) {
                                        if (servicio.activo_AL === 'si') {
                                            totalServicioFijo = servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                        objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                        objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                        objetoResultante['activo_AL'] = servicio.activo_AL;
                                    };
                                    if (servicio.precioHora_LA) {
                                        if (servicio.activo_LA === 'si') {
                                            totalServicioFijo = servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                        objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                        objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                        objetoResultante['activo_LA'] = servicio.activo_LA;
                                    };
                                    if (servicio.precioHora_TE) {
                                        if (servicio.activo_TE === 'si') {
                                            totalServicioFijo = servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                        objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                        objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                        objetoResultante['activo_TE'] = servicio.activo_TE;
                                    };
                                    if (servicio.precioHora_FI) {
                                        if (servicio.activo_FI === 'si') {
                                            totalServicioFijo = servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                        objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                        objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                        objetoResultante['activo_FI'] = servicio.activo_FI;
                                    };
                                    if (servicio.precioHora_FE) {
                                        if (servicio.activo_FE === 'si') {
                                            totalServicioFijo = servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                        objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                        objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                        objetoResultante['activo_FE'] = servicio.activo_FE;
                                    };
                                    if (servicio.precioHora_AB) {
                                        if (servicio.activo_AB === 'si') {
                                            totalServicioFijo = servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                        objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                        objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                        objetoResultante['activo_AB'] = servicio.activo_AB;
                                    };
                                    if (servicio.precioHora_MA) {
                                        if (servicio.activo_MA === 'si') {
                                            totalServicioFijo = servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                        objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                        objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                        objetoResultante['activo_MA'] = servicio.activo_MA;
                                    };
                                    if (servicio.precioHora_PO) {
                                        if (servicio.activo_PO === 'si') {
                                            totalServicioFijo = servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                        objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                        objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                        objetoResultante['activo_PO'] = servicio.activo_PO;
                                    };
                                    if (servicio.precioHora_BA) {
                                        if (servicio.activo_BA === 'si') {
                                            totalServicioFijo = servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                        objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                        objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                        objetoResultante['activo_BA'] = servicio.activo_BA;
                                    };
                                    if (servicio.precioHora_FT) {
                                        if (servicio.activo_FT === 'si') {
                                            totalServicioFijo = servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
                                    };
                                }
                            };
                            if (dia[1][0] === 'Martes') {
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
                                } else if (tipoVariacion === 'una') {
                                    if (servicio.precioHora_TO) {
                                        if (servicio.activo_TO === 'si') {
                                            totalServicioFijo = servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                        objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                        objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                        objetoResultante['activo_TO'] = servicio.activo_TO;
                                    };
                                    if (servicio.precioHora_CR) {
                                        if (servicio.activo_CR === 'si') {
                                            totalServicioFijo = servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                        objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                        objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                        objetoResultante['activo_CR'] = servicio.activo_CR;
                                    };
                                    if (servicio.precioHora_CE) {
                                        if (servicio.activo_CE === 'si') {
                                            totalServicioFijo = servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                        objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                        objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                        objetoResultante['activo_CE'] = servicio.activo_CE;
                                    };
                                    if (servicio.precioHora_CI) {
                                        if (servicio.activo_CI === 'si') {
                                            totalServicioFijo = servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                        objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                        objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                        objetoResultante['activo_CI'] = servicio.activo_CI;
                                    };
                                    if (servicio.precioHora_MO) {
                                        if (servicio.activo_MO === 'si') {
                                            totalServicioFijo = servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                        objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                        objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                        objetoResultante['activo_MO'] = servicio.activo_MO;
                                    };
                                    if (servicio.precioHora_OF) {
                                        if (servicio.activo_OF === 'si') {
                                            totalServicioFijo = servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                        objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                        objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                        objetoResultante['activo_OF'] = servicio.activo_OF;
                                    };
                                    if (servicio.precioHora_AL) {
                                        if (servicio.activo_AL === 'si') {
                                            totalServicioFijo = servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                        objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                        objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                        objetoResultante['activo_AL'] = servicio.activo_AL;
                                    };
                                    if (servicio.precioHora_LA) {
                                        if (servicio.activo_LA === 'si') {
                                            totalServicioFijo = servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                        objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                        objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                        objetoResultante['activo_LA'] = servicio.activo_LA;
                                    };
                                    if (servicio.precioHora_TE) {
                                        if (servicio.activo_TE === 'si') {
                                            totalServicioFijo = servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                        objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                        objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                        objetoResultante['activo_TE'] = servicio.activo_TE;
                                    };
                                    if (servicio.precioHora_FI) {
                                        if (servicio.activo_FI === 'si') {
                                            totalServicioFijo = servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                        objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                        objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                        objetoResultante['activo_FI'] = servicio.activo_FI;
                                    };
                                    if (servicio.precioHora_FE) {
                                        if (servicio.activo_FE === 'si') {
                                            totalServicioFijo = servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                        objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                        objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                        objetoResultante['activo_FE'] = servicio.activo_FE;
                                    };
                                    if (servicio.precioHora_AB) {
                                        if (servicio.activo_AB === 'si') {
                                            totalServicioFijo = servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                        objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                        objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                        objetoResultante['activo_AB'] = servicio.activo_AB;
                                    };
                                    if (servicio.precioHora_MA) {
                                        if (servicio.activo_MA === 'si') {
                                            totalServicioFijo = servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                        objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                        objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                        objetoResultante['activo_MA'] = servicio.activo_MA;
                                    };
                                    if (servicio.precioHora_PO) {
                                        if (servicio.activo_PO === 'si') {
                                            totalServicioFijo = servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                        objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                        objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                        objetoResultante['activo_PO'] = servicio.activo_PO;
                                    };
                                    if (servicio.precioHora_BA) {
                                        if (servicio.activo_BA === 'si') {
                                            totalServicioFijo = servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                        objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                        objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                        objetoResultante['activo_BA'] = servicio.activo_BA;
                                    };
                                    if (servicio.precioHora_FT) {
                                        if (servicio.activo_FT === 'si') {
                                            totalServicioFijo = servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
                                    };
                                }
                            };
                            if (dia[1][0] === 'Miércoles') {
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
                                } else if (tipoVariacion === 'una') {
                                    if (servicio.precioHora_TO) {
                                        if (servicio.activo_TO === 'si') {
                                            totalServicioFijo = servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                        objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                        objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                        objetoResultante['activo_TO'] = servicio.activo_TO;
                                    };
                                    if (servicio.precioHora_CR) {
                                        if (servicio.activo_CR === 'si') {
                                            totalServicioFijo = servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                        objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                        objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                        objetoResultante['activo_CR'] = servicio.activo_CR;
                                    };
                                    if (servicio.precioHora_CE) {
                                        if (servicio.activo_CE === 'si') {
                                            totalServicioFijo = servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                        objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                        objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                        objetoResultante['activo_CE'] = servicio.activo_CE;
                                    };
                                    if (servicio.precioHora_CI) {
                                        if (servicio.activo_CI === 'si') {
                                            totalServicioFijo = servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                        objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                        objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                        objetoResultante['activo_CI'] = servicio.activo_CI;
                                    };
                                    if (servicio.precioHora_MO) {
                                        if (servicio.activo_MO === 'si') {
                                            totalServicioFijo = servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                        objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                        objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                        objetoResultante['activo_MO'] = servicio.activo_MO;
                                    };
                                    if (servicio.precioHora_OF) {
                                        if (servicio.activo_OF === 'si') {
                                            totalServicioFijo = servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                        objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                        objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                        objetoResultante['activo_OF'] = servicio.activo_OF;
                                    };
                                    if (servicio.precioHora_AL) {
                                        if (servicio.activo_AL === 'si') {
                                            totalServicioFijo = servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                        objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                        objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                        objetoResultante['activo_AL'] = servicio.activo_AL;
                                    };
                                    if (servicio.precioHora_LA) {
                                        if (servicio.activo_LA === 'si') {
                                            totalServicioFijo = servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                        objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                        objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                        objetoResultante['activo_LA'] = servicio.activo_LA;
                                    };
                                    if (servicio.precioHora_TE) {
                                        if (servicio.activo_TE === 'si') {
                                            totalServicioFijo = servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                        objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                        objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                        objetoResultante['activo_TE'] = servicio.activo_TE;
                                    };
                                    if (servicio.precioHora_FI) {
                                        if (servicio.activo_FI === 'si') {
                                            totalServicioFijo = servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                        objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                        objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                        objetoResultante['activo_FI'] = servicio.activo_FI;
                                    };
                                    if (servicio.precioHora_FE) {
                                        if (servicio.activo_FE === 'si') {
                                            totalServicioFijo = servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                        objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                        objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                        objetoResultante['activo_FE'] = servicio.activo_FE;
                                    };
                                    if (servicio.precioHora_AB) {
                                        if (servicio.activo_AB === 'si') {
                                            totalServicioFijo = servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                        objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                        objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                        objetoResultante['activo_AB'] = servicio.activo_AB;
                                    };
                                    if (servicio.precioHora_MA) {
                                        if (servicio.activo_MA === 'si') {
                                            totalServicioFijo = servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                        objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                        objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                        objetoResultante['activo_MA'] = servicio.activo_MA;
                                    };
                                    if (servicio.precioHora_PO) {
                                        if (servicio.activo_PO === 'si') {
                                            totalServicioFijo = servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                        objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                        objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                        objetoResultante['activo_PO'] = servicio.activo_PO;
                                    };
                                    if (servicio.precioHora_BA) {
                                        if (servicio.activo_BA === 'si') {
                                            totalServicioFijo = servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                        objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                        objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                        objetoResultante['activo_BA'] = servicio.activo_BA;
                                    };
                                    if (servicio.precioHora_FT) {
                                        if (servicio.activo_FT === 'si') {
                                            totalServicioFijo = servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
                                    };
                                }
                            };
                            if (dia[1][0] === 'Jueves') {
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
                                } else if (tipoVariacion === 'una') {
                                    if (servicio.precioHora_TO) {
                                        if (servicio.activo_TO === 'si') {
                                            totalServicioFijo = servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                        objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                        objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                        objetoResultante['activo_TO'] = servicio.activo_TO;
                                    };
                                    if (servicio.precioHora_CR) {
                                        if (servicio.activo_CR === 'si') {
                                            totalServicioFijo = servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                        objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                        objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                        objetoResultante['activo_CR'] = servicio.activo_CR;
                                    };
                                    if (servicio.precioHora_CE) {
                                        if (servicio.activo_CE === 'si') {
                                            totalServicioFijo = servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                        objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                        objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                        objetoResultante['activo_CE'] = servicio.activo_CE;
                                    };
                                    if (servicio.precioHora_CI) {
                                        if (servicio.activo_CI === 'si') {
                                            totalServicioFijo = servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                        objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                        objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                        objetoResultante['activo_CI'] = servicio.activo_CI;
                                    };
                                    if (servicio.precioHora_MO) {
                                        if (servicio.activo_MO === 'si') {
                                            totalServicioFijo = servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                        objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                        objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                        objetoResultante['activo_MO'] = servicio.activo_MO;
                                    };
                                    if (servicio.precioHora_OF) {
                                        if (servicio.activo_OF === 'si') {
                                            totalServicioFijo = servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                        objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                        objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                        objetoResultante['activo_OF'] = servicio.activo_OF;
                                    };
                                    if (servicio.precioHora_AL) {
                                        if (servicio.activo_AL === 'si') {
                                            totalServicioFijo = servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                        objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                        objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                        objetoResultante['activo_AL'] = servicio.activo_AL;
                                    };
                                    if (servicio.precioHora_LA) {
                                        if (servicio.activo_LA === 'si') {
                                            totalServicioFijo = servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                        objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                        objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                        objetoResultante['activo_LA'] = servicio.activo_LA;
                                    };
                                    if (servicio.precioHora_TE) {
                                        if (servicio.activo_TE === 'si') {
                                            totalServicioFijo = servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                        objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                        objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                        objetoResultante['activo_TE'] = servicio.activo_TE;
                                    };
                                    if (servicio.precioHora_FI) {
                                        if (servicio.activo_FI === 'si') {
                                            totalServicioFijo = servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                        objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                        objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                        objetoResultante['activo_FI'] = servicio.activo_FI;
                                    };
                                    if (servicio.precioHora_FE) {
                                        if (servicio.activo_FE === 'si') {
                                            totalServicioFijo = servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                        objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                        objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                        objetoResultante['activo_FE'] = servicio.activo_FE;
                                    };
                                    if (servicio.precioHora_AB) {
                                        if (servicio.activo_AB === 'si') {
                                            totalServicioFijo = servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                        objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                        objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                        objetoResultante['activo_AB'] = servicio.activo_AB;
                                    };
                                    if (servicio.precioHora_MA) {
                                        if (servicio.activo_MA === 'si') {
                                            totalServicioFijo = servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                        objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                        objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                        objetoResultante['activo_MA'] = servicio.activo_MA;
                                    };
                                    if (servicio.precioHora_PO) {
                                        if (servicio.activo_PO === 'si') {
                                            totalServicioFijo = servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                        objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                        objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                        objetoResultante['activo_PO'] = servicio.activo_PO;
                                    };
                                    if (servicio.precioHora_BA) {
                                        if (servicio.activo_BA === 'si') {
                                            totalServicioFijo = servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                        objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                        objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                        objetoResultante['activo_BA'] = servicio.activo_BA;
                                    };
                                    if (servicio.precioHora_FT) {
                                        if (servicio.activo_FT === 'si') {
                                            totalServicioFijo = servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
                                    };
                                }
                            };
                            if (dia[1][0] === 'Viernes') {
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
                                } else if (tipoVariacion === 'una') {
                                    if (servicio.precioHora_TO) {
                                        if (servicio.activo_TO === 'si') {
                                            totalServicioFijo = servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                        objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                        objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                        objetoResultante['activo_TO'] = servicio.activo_TO;
                                    };
                                    if (servicio.precioHora_CR) {
                                        if (servicio.activo_CR === 'si') {
                                            totalServicioFijo = servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                        objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                        objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                        objetoResultante['activo_CR'] = servicio.activo_CR;
                                    };
                                    if (servicio.precioHora_CE) {
                                        if (servicio.activo_CE === 'si') {
                                            totalServicioFijo = servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                        objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                        objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                        objetoResultante['activo_CE'] = servicio.activo_CE;
                                    };
                                    if (servicio.precioHora_CI) {
                                        if (servicio.activo_CI === 'si') {
                                            totalServicioFijo = servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                        objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                        objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                        objetoResultante['activo_CI'] = servicio.activo_CI;
                                    };
                                    if (servicio.precioHora_MO) {
                                        if (servicio.activo_MO === 'si') {
                                            totalServicioFijo = servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                        objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                        objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                        objetoResultante['activo_MO'] = servicio.activo_MO;
                                    };
                                    if (servicio.precioHora_OF) {
                                        if (servicio.activo_OF === 'si') {
                                            totalServicioFijo = servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                        objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                        objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                        objetoResultante['activo_OF'] = servicio.activo_OF;
                                    };
                                    if (servicio.precioHora_AL) {
                                        if (servicio.activo_AL === 'si') {
                                            totalServicioFijo = servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                        objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                        objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                        objetoResultante['activo_AL'] = servicio.activo_AL;
                                    };
                                    if (servicio.precioHora_LA) {
                                        if (servicio.activo_LA === 'si') {
                                            totalServicioFijo = servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                        objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                        objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                        objetoResultante['activo_LA'] = servicio.activo_LA;
                                    };
                                    if (servicio.precioHora_TE) {
                                        if (servicio.activo_TE === 'si') {
                                            totalServicioFijo = servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                        objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                        objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                        objetoResultante['activo_TE'] = servicio.activo_TE;
                                    };
                                    if (servicio.precioHora_FI) {
                                        if (servicio.activo_FI === 'si') {
                                            totalServicioFijo = servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                        objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                        objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                        objetoResultante['activo_FI'] = servicio.activo_FI;
                                    };
                                    if (servicio.precioHora_FE) {
                                        if (servicio.activo_FE === 'si') {
                                            totalServicioFijo = servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                        objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                        objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                        objetoResultante['activo_FE'] = servicio.activo_FE;
                                    };
                                    if (servicio.precioHora_AB) {
                                        if (servicio.activo_AB === 'si') {
                                            totalServicioFijo = servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                        objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                        objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                        objetoResultante['activo_AB'] = servicio.activo_AB;
                                    };
                                    if (servicio.precioHora_MA) {
                                        if (servicio.activo_MA === 'si') {
                                            totalServicioFijo = servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                        objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                        objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                        objetoResultante['activo_MA'] = servicio.activo_MA;
                                    };
                                    if (servicio.precioHora_PO) {
                                        if (servicio.activo_PO === 'si') {
                                            totalServicioFijo = servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                        objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                        objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                        objetoResultante['activo_PO'] = servicio.activo_PO;
                                    };
                                    if (servicio.precioHora_BA) {
                                        if (servicio.activo_BA === 'si') {
                                            totalServicioFijo = servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                        objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                        objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                        objetoResultante['activo_BA'] = servicio.activo_BA;
                                    };
                                    if (servicio.precioHora_FT) {
                                        if (servicio.activo_FT === 'si') {
                                            totalServicioFijo = servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
                                    };
                                }
                            };
                            if (dia[1][0] === 'Sábado') {
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
                                } else if (tipoVariacion === 'una') {
                                    if (servicio.precioHora_TO) {
                                        if (servicio.activo_TO === 'si') {
                                            totalServicioFijo = servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                        objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                        objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                        objetoResultante['activo_TO'] = servicio.activo_TO;
                                    };
                                    if (servicio.precioHora_CR) {
                                        if (servicio.activo_CR === 'si') {
                                            totalServicioFijo = servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                        objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                        objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                        objetoResultante['activo_CR'] = servicio.activo_CR;
                                    };
                                    if (servicio.precioHora_CE) {
                                        if (servicio.activo_CE === 'si') {
                                            totalServicioFijo = servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                        objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                        objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                        objetoResultante['activo_CE'] = servicio.activo_CE;
                                    };
                                    if (servicio.precioHora_CI) {
                                        if (servicio.activo_CI === 'si') {
                                            totalServicioFijo = servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                        objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                        objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                        objetoResultante['activo_CI'] = servicio.activo_CI;
                                    };
                                    if (servicio.precioHora_MO) {
                                        if (servicio.activo_MO === 'si') {
                                            totalServicioFijo = servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                        objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                        objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                        objetoResultante['activo_MO'] = servicio.activo_MO;
                                    };
                                    if (servicio.precioHora_OF) {
                                        if (servicio.activo_OF === 'si') {
                                            totalServicioFijo = servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                        objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                        objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                        objetoResultante['activo_OF'] = servicio.activo_OF;
                                    };
                                    if (servicio.precioHora_AL) {
                                        if (servicio.activo_AL === 'si') {
                                            totalServicioFijo = servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                        objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                        objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                        objetoResultante['activo_AL'] = servicio.activo_AL;
                                    };
                                    if (servicio.precioHora_LA) {
                                        if (servicio.activo_LA === 'si') {
                                            totalServicioFijo = servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                        objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                        objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                        objetoResultante['activo_LA'] = servicio.activo_LA;
                                    };
                                    if (servicio.precioHora_TE) {
                                        if (servicio.activo_TE === 'si') {
                                            totalServicioFijo = servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                        objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                        objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                        objetoResultante['activo_TE'] = servicio.activo_TE;
                                    };
                                    if (servicio.precioHora_FI) {
                                        if (servicio.activo_FI === 'si') {
                                            totalServicioFijo = servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                        objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                        objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                        objetoResultante['activo_FI'] = servicio.activo_FI;
                                    };
                                    if (servicio.precioHora_FE) {
                                        if (servicio.activo_FE === 'si') {
                                            totalServicioFijo = servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                        objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                        objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                        objetoResultante['activo_FE'] = servicio.activo_FE;
                                    };
                                    if (servicio.precioHora_AB) {
                                        if (servicio.activo_AB === 'si') {
                                            totalServicioFijo = servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                        objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                        objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                        objetoResultante['activo_AB'] = servicio.activo_AB;
                                    };
                                    if (servicio.precioHora_MA) {
                                        if (servicio.activo_MA === 'si') {
                                            totalServicioFijo = servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                        objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                        objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                        objetoResultante['activo_MA'] = servicio.activo_MA;
                                    };
                                    if (servicio.precioHora_PO) {
                                        if (servicio.activo_PO === 'si') {
                                            totalServicioFijo = servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                        objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                        objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                        objetoResultante['activo_PO'] = servicio.activo_PO;
                                    };
                                    if (servicio.precioHora_BA) {
                                        if (servicio.activo_BA === 'si') {
                                            totalServicioFijo = servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                        objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                        objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                        objetoResultante['activo_BA'] = servicio.activo_BA;
                                    };
                                    if (servicio.precioHora_FT) {
                                        if (servicio.activo_FT === 'si') {
                                            totalServicioFijo = servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
                                    };
                                }
                            };
                            if (dia[1][0] === 'Domingo') {
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
                                } else if (tipoVariacion === 'una') {
                                    if (servicio.precioHora_TO) {
                                        if (servicio.activo_TO === 'si') {
                                            totalServicioFijo = servicio.precioHora_TO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TO'] = servicio.precioHora_TO;
                                        objetoResultante['diaVariacion_TO'] = servicio.diaVariacion_TO;
                                        objetoResultante['variacion_TO'] = servicio.variacion_TO;
                                        objetoResultante['activo_TO'] = servicio.activo_TO;
                                    };
                                    if (servicio.precioHora_CR) {
                                        if (servicio.activo_CR === 'si') {
                                            totalServicioFijo = servicio.precioHora_CR;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CR'] = servicio.precioHora_CR;
                                        objetoResultante['diaVariacion_CR'] = servicio.diaVariacion_CR;
                                        objetoResultante['variacion_CR'] = servicio.variacion_CR;
                                        objetoResultante['activo_CR'] = servicio.activo_CR;
                                    };
                                    if (servicio.precioHora_CE) {
                                        if (servicio.activo_CE === 'si') {
                                            totalServicioFijo = servicio.precioHora_CE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CE'] = servicio.precioHora_CE;
                                        objetoResultante['diaVariacion_CE'] = servicio.diaVariacion_CE;
                                        objetoResultante['variacion_CE'] = servicio.variacion_CE;
                                        objetoResultante['activo_CE'] = servicio.activo_CE;
                                    };
                                    if (servicio.precioHora_CI) {
                                        if (servicio.activo_CI === 'si') {
                                            totalServicioFijo = servicio.precioHora_CI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_CI'] = servicio.precioHora_CI;
                                        objetoResultante['diaVariacion_CI'] = servicio.diaVariacion_CI;
                                        objetoResultante['variacion_CI'] = servicio.variacion_CI;
                                        objetoResultante['activo_CI'] = servicio.activo_CI;
                                    };
                                    if (servicio.precioHora_MO) {
                                        if (servicio.activo_MO === 'si') {
                                            totalServicioFijo = servicio.precioHora_MO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MO'] = servicio.precioHora_MO;
                                        objetoResultante['diaVariacion_MO'] = servicio.diaVariacion_MO;
                                        objetoResultante['variacion_MO'] = servicio.variacion_MO;
                                        objetoResultante['activo_MO'] = servicio.activo_MO;
                                    };
                                    if (servicio.precioHora_OF) {
                                        if (servicio.activo_OF === 'si') {
                                            totalServicioFijo = servicio.precioHora_OF;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_OF'] = servicio.precioHora_OF;
                                        objetoResultante['diaVariacion_OF'] = servicio.diaVariacion_OF;
                                        objetoResultante['variacion_OF'] = servicio.variacion_OF;
                                        objetoResultante['activo_OF'] = servicio.activo_OF;
                                    };
                                    if (servicio.precioHora_AL) {
                                        if (servicio.activo_AL === 'si') {
                                            totalServicioFijo = servicio.precioHora_AL;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AL'] = servicio.precioHora_AL;
                                        objetoResultante['diaVariacion_AL'] = servicio.diaVariacion_AL;
                                        objetoResultante['variacion_AL'] = servicio.variacion_AL;
                                        objetoResultante['activo_AL'] = servicio.activo_AL;
                                    };
                                    if (servicio.precioHora_LA) {
                                        if (servicio.activo_LA === 'si') {
                                            totalServicioFijo = servicio.precioHora_LA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_LA'] = servicio.precioHora_LA;
                                        objetoResultante['diaVariacion_LA'] = servicio.diaVariacion_LA;
                                        objetoResultante['variacion_LA'] = servicio.variacion_LA;
                                        objetoResultante['activo_LA'] = servicio.activo_LA;
                                    };
                                    if (servicio.precioHora_TE) {
                                        if (servicio.activo_TE === 'si') {
                                            totalServicioFijo = servicio.precioHora_TE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_TE'] = servicio.precioHora_TE;
                                        objetoResultante['diaVariacion_TE'] = servicio.diaVariacion_TE;
                                        objetoResultante['variacion_TE'] = servicio.variacion_TE;
                                        objetoResultante['activo_TE'] = servicio.activo_TE;
                                    };
                                    if (servicio.precioHora_FI) {
                                        if (servicio.activo_FI === 'si') {
                                            totalServicioFijo = servicio.precioHora_FI;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FI'] = servicio.precioHora_FI;
                                        objetoResultante['diaVariacion_FI'] = servicio.diaVariacion_FI;
                                        objetoResultante['variacion_FI'] = servicio.variacion_FI;
                                        objetoResultante['activo_FI'] = servicio.activo_FI;
                                    };
                                    if (servicio.precioHora_FE) {
                                        if (servicio.activo_FE === 'si') {
                                            totalServicioFijo = servicio.precioHora_FE;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FE'] = servicio.precioHora_FE;
                                        objetoResultante['diaVariacion_FE'] = servicio.diaVariacion_FE;
                                        objetoResultante['variacion_FE'] = servicio.variacion_FE;
                                        objetoResultante['activo_FE'] = servicio.activo_FE;
                                    };
                                    if (servicio.precioHora_AB) {
                                        if (servicio.activo_AB === 'si') {
                                            totalServicioFijo = servicio.precioHora_AB;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_AB'] = servicio.precioHora_AB;
                                        objetoResultante['diaVariacion_AB'] = servicio.diaVariacion_AB;
                                        objetoResultante['variacion_AB'] = servicio.variacion_AB;
                                        objetoResultante['activo_AB'] = servicio.activo_AB;
                                    };
                                    if (servicio.precioHora_MA) {
                                        if (servicio.activo_MA === 'si') {
                                            totalServicioFijo = servicio.precioHora_MA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_MA'] = servicio.precioHora_MA;
                                        objetoResultante['diaVariacion_MA'] = servicio.diaVariacion_MA;
                                        objetoResultante['variacion_MA'] = servicio.variacion_MA;
                                        objetoResultante['activo_MA'] = servicio.activo_MA;
                                    };
                                    if (servicio.precioHora_PO) {
                                        if (servicio.activo_PO === 'si') {
                                            totalServicioFijo = servicio.precioHora_PO;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_PO'] = servicio.precioHora_PO;
                                        objetoResultante['diaVariacion_PO'] = servicio.diaVariacion_PO;
                                        objetoResultante['variacion_PO'] = servicio.variacion_PO;
                                        objetoResultante['activo_PO'] = servicio.activo_PO;
                                    };
                                    if (servicio.precioHora_BA) {
                                        if (servicio.activo_BA === 'si') {
                                            totalServicioFijo = servicio.precioHora_BA;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_BA'] = servicio.precioHora_BA;
                                        objetoResultante['diaVariacion_BA'] = servicio.diaVariacion_BA;
                                        objetoResultante['variacion_BA'] = servicio.variacion_BA;
                                        objetoResultante['activo_BA'] = servicio.activo_BA;
                                    };
                                    if (servicio.precioHora_FT) {
                                        if (servicio.activo_FT === 'si') {
                                            totalServicioFijo = servicio.precioHora_FT;
                                            objetoResultante['estados']['estadoCasillaDia' + (index + 1)] = false;
                                        };
                                        objetoResultante['precioHora_FT'] = servicio.precioHora_FT;
                                        objetoResultante['diaVariacion_FT'] = servicio.diaVariacion_FT;
                                        objetoResultante['variacion_FT'] = servicio.variacion_FT;
                                        objetoResultante['activo_FT'] = servicio.activo_FT;
                                    };
                                }
                            };
                        };
                        objetoResultante = { ...objetoResultante, totalServicioFijo: totalServicioFijo }
                    });
                    arrayResultante.push(objetoResultante);
                };
            };
        });
        return arrayResultante
    };

    const retornaMinutosAccionEnCuadrantes = (primeraHora, segundaHora) => {
        if (primeraHora && segundaHora) {
            let myArrSplit1 = primeraHora.split(":");
            const horasPrimeraHora = parseInt(myArrSplit1[0]);
            const minutosPrimeraHora = parseInt(myArrSplit1[1]);
            const minutosTotalesPrimeraHora = (horasPrimeraHora * 60) + minutosPrimeraHora;
            let myArrSplit2 = segundaHora.split(":");
            const horasSegundaHora = parseInt(myArrSplit2[0]);
            const minutosSegundaHora = parseInt(myArrSplit2[1]);
            const minutosTotalesSegundaHora = (horasSegundaHora * 60) + minutosSegundaHora;
            const diff = minutosTotalesSegundaHora - minutosTotalesPrimeraHora;
            return diff;
        }
    };

    const gestionarInformeAccion = (centro) => {
        let arrayResultante = [];
        let sumatorioHoras;
        let sumatorioHorasNormal_L;
        let sumatorioHorasExtra_L;
        let sumatorioHorasNormal_E;
        let sumatorioHorasExtra_E;
        let sumatorioHorasNormal_P;
        let sumatorioHorasExtra_P;
        let sumatorioHorasNormal_N;
        let sumatorioHorasExtra_N;
        let sumatorioHorasNormal_R;
        let sumatorioHorasExtra_R;
        let sumatorioHorasNormal_L1;
        let sumatorioHorasExtra_L1;
        let sumatorioHorasNormal_L2;
        let sumatorioHorasExtra_L2;
        let sumatorioHorasNormal_F;
        let sumatorioHorasExtra_F;
        let lasHorasNormal;
        let lasHorasExtra;
        cuadrante.forEach((cuadranteColumna, index) => {
            switch (cuadranteColumna.tipoHorario) {
                case 'rango':
                    arrayResultante.push({
                        trabajador: cuadranteColumna.idTrabajador,
                        tipo: cuadranteColumna.tipoTrabajador,
                        //si se quisieran contabilizar los días/hora concretos activar el array cómputo
                        computo: [],
                        totalHorasNormal_L: null,
                        totalHorasExtra_L: null,
                        totalHorasNormal_E: null,
                        totalHorasExtra_E: null,
                        totalHorasNormal_P: null,
                        totalHorasExtra_P: null,
                        totalHorasNormal_N: null,
                        totalHorasExtra_N: null,
                        totalHorasNormal_R: null,
                        totalHorasExtra_R: null,
                        totalHorasNormal_L1: null,
                        totalHorasExtra_L1: null,
                        totalHorasNormal_L2: null,
                        totalHorasExtra_L2: null,
                        totalHorasNormal_F: null,
                        totalHorasExtra_F: null,
                        totalHoras: null
                    });
                    sumatorioHoras = 0;
                    sumatorioHorasNormal_L = 0;
                    sumatorioHorasExtra_L = 0;
                    sumatorioHorasNormal_E = 0;
                    sumatorioHorasExtra_E = 0;
                    sumatorioHorasNormal_P = 0;
                    sumatorioHorasExtra_P = 0;
                    sumatorioHorasNormal_N = 0;
                    sumatorioHorasExtra_N = 0;
                    sumatorioHorasNormal_R = 0;
                    sumatorioHorasExtra_R = 0;
                    sumatorioHorasNormal_L1 = 0;
                    sumatorioHorasExtra_L1 = 0;
                    sumatorioHorasNormal_L2 = 0;
                    sumatorioHorasExtra_L2 = 0;
                    sumatorioHorasNormal_F = 0;
                    sumatorioHorasExtra_F = 0;
                    for (const prop in cuadranteColumna) {
                        if (prop.includes('Lunes')) {
                            const mySplit = prop.split('Lunes');
                            if (cuadranteColumna[prop].lunesInicioRango) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicioRango, cuadranteColumna[prop].lunesFinRango) / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Lunes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            };
                        };
                        if (prop.includes('Martes')) {
                            const mySplit = prop.split('Martes');
                            if (cuadranteColumna[prop].martesInicioRango) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicioRango, cuadranteColumna[prop].martesFinRango) / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Martes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            };
                        };
                        if (prop.includes('Miércoles')) {
                            const mySplit = prop.split('Miércoles');
                            if (cuadranteColumna[prop].miercolesInicioRango) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicioRango, cuadranteColumna[prop].miercolesFinRango) / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Miércoles-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            };
                        };
                        if (prop.includes('Jueves')) {
                            const mySplit = prop.split('Jueves');
                            if (cuadranteColumna[prop].juevesInicioRango) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicioRango, cuadranteColumna[prop].juevesFinRango) / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Jueves-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            };
                        };
                        if (prop.includes('Viernes')) {
                            const mySplit = prop.split('Viernes');
                            if (cuadranteColumna[prop].viernesInicioRango) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicioRango, cuadranteColumna[prop].viernesFinRango) / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Viernes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            };
                        };
                        if (prop.includes('Sábado')) {
                            const mySplit = prop.split('Sábado');
                            if (cuadranteColumna[prop].sabadoInicioRango) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicioRango, cuadranteColumna[prop].sabadoFinRango) / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Sábado-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            };
                        };
                        if (prop.includes('Domingo')) {
                            const mySplit = prop.split('Domingo');
                            if (cuadranteColumna[prop].domingoInicioRango) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicioRango, cuadranteColumna[prop].domingoFinRango) / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Domingo-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            };
                        };
                        arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                        arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                        arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                        arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                        arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                        arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                        arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                        arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                        arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                        arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                        arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                        arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                        arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                        arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                        arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                        arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                        arrayResultante[index].totalHoras = sumatorioHoras;
                    }
                    break;
                case 'rangoDescanso':
                    arrayResultante.push({
                        trabajador: cuadranteColumna.idTrabajador,
                        //trabajadorNombre: cuadranteColumna.nombreTrabajador,
                        tipo: cuadranteColumna.tipoTrabajador,
                        computo: [],
                        totalHorasNormal_L: null,
                        totalHorasExtra_L: null,
                        totalHorasNormal_E: null,
                        totalHorasExtra_E: null,
                        totalHorasNormal_P: null,
                        totalHorasExtra_P: null,
                        totalHorasNormal_N: null,
                        totalHorasExtra_N: null,
                        totalHorasNormal_R: null,
                        totalHorasExtra_R: null,
                        totalHorasNormal_L1: null,
                        totalHorasExtra_L1: null,
                        totalHorasNormal_L2: null,
                        totalHorasExtra_L2: null,
                        totalHorasNormal_F: null,
                        totalHorasExtra_F: null,
                        totalHoras: null
                    });
                    sumatorioHoras = 0;
                    sumatorioHorasNormal_L = 0;
                    sumatorioHorasExtra_L = 0;
                    sumatorioHorasNormal_E = 0;
                    sumatorioHorasExtra_E = 0;
                    sumatorioHorasNormal_P = 0;
                    sumatorioHorasExtra_P = 0;
                    sumatorioHorasNormal_N = 0;
                    sumatorioHorasExtra_N = 0;
                    sumatorioHorasNormal_R = 0;
                    sumatorioHorasExtra_R = 0;
                    sumatorioHorasNormal_L1 = 0;
                    sumatorioHorasExtra_L1 = 0;
                    sumatorioHorasNormal_L2 = 0;
                    sumatorioHorasExtra_L2 = 0;
                    sumatorioHorasNormal_F = 0;
                    sumatorioHorasExtra_F = 0;
                    let rango1, rango2;
                    for (const prop in cuadranteColumna) {
                        if (prop.includes('Lunes')) {
                            const mySplit = prop.split('Lunes');
                            if (cuadranteColumna[prop].lunesInicio1RangoDescanso) {
                                rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicio1RangoDescanso, cuadranteColumna[prop].lunesFin1RangoDescanso) / 60;
                                if (cuadranteColumna[prop].lunesInicio2RangoDescanso) {
                                    rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].lunesInicio2RangoDescanso, cuadranteColumna[prop].lunesFin2RangoDescanso) / 60;
                                } else {
                                    rango2 = 0;
                                };
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = rango1 + rango2;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Lunes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Martes')) {
                            const mySplit = prop.split('Martes');
                            if (cuadranteColumna[prop].martesInicio1RangoDescanso) {
                                rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicio1RangoDescanso, cuadranteColumna[prop].martesFin1RangoDescanso) / 60;
                                if (cuadranteColumna[prop].martesInicio2RangoDescanso) {
                                    rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].martesInicio2RangoDescanso, cuadranteColumna[prop].martesFin2RangoDescanso) / 60;
                                } else {
                                    rango2 = 0;
                                };
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = rango1 + rango2;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Martes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Miércoles')) {
                            const mySplit = prop.split('Miércoles');
                            if (cuadranteColumna[prop].miercolesInicio1RangoDescanso) {
                                rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicio1RangoDescanso, cuadranteColumna[prop].miercolesFin1RangoDescanso) / 60;
                                if (cuadranteColumna[prop].miercolesInicio2RangoDescanso) {
                                    rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].miercolesInicio2RangoDescanso, cuadranteColumna[prop].miercolesFin2RangoDescanso) / 60;
                                } else {
                                    rango2 = 0;
                                };
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = rango1 + rango2;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Miércoles-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Jueves')) {
                            const mySplit = prop.split('Jueves');
                            if (cuadranteColumna[prop].juevesInicio1RangoDescanso) {
                                rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicio1RangoDescanso, cuadranteColumna[prop].juevesFin1RangoDescanso) / 60;
                                if (cuadranteColumna[prop].juevesInicio2RangoDescanso) {
                                    rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].juevesInicio2RangoDescanso, cuadranteColumna[prop].juevesFin2RangoDescanso) / 60;
                                } else {
                                    rango2 = 0;
                                };
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = rango1 + rango2;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Jueves-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Viernes')) {
                            const mySplit = prop.split('Viernes');
                            if (cuadranteColumna[prop].viernesInicio1RangoDescanso) {
                                rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicio1RangoDescanso, cuadranteColumna[prop].viernesFin1RangoDescanso) / 60;
                                if (cuadranteColumna[prop].viernesInicio2RangoDescanso) {
                                    rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].viernesInicio2RangoDescanso, cuadranteColumna[prop].viernesFin2RangoDescanso) / 60;
                                } else {
                                    rango2 = 0;
                                };
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = rango1 + rango2;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Viernes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Sábado')) {
                            const mySplit = prop.split('Sábado');
                            if (cuadranteColumna[prop].sabadoInicio1RangoDescanso) {
                                rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicio1RangoDescanso, cuadranteColumna[prop].sabadoFin1RangoDescanso) / 60;
                                if (cuadranteColumna[prop].sabadoInicio2RangoDescanso) {
                                    rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].sabadoInicio2RangoDescanso, cuadranteColumna[prop].sabadoFin2RangoDescanso) / 60;
                                } else {
                                    rango2 = 0;
                                };
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = rango1 + rango2;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Sábado-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Domingo')) {
                            const mySplit = prop.split('Domingo');
                            if (cuadranteColumna[prop].domingoInicio1RangoDescanso) {
                                rango1 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicio1RangoDescanso, cuadranteColumna[prop].domingoFin1RangoDescanso) / 60;
                                if (cuadranteColumna[prop].domingoInicio2RangoDescanso) {
                                    rango2 = retornaMinutosAccionEnCuadrantes(cuadranteColumna[prop].domingoInicio2RangoDescanso, cuadranteColumna[prop].domingoFin2RangoDescanso) / 60;
                                } else {
                                    rango2 = 0;
                                };
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = rango1 + rango2;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = rango1 + rango2;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = rango1 + rango2;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Domingo-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                        arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                        arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                        arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                        arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                        arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                        arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                        arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                        arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                        arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                        arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                        arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                        arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                        arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                        arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                        arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                        arrayResultante[index].totalHoras = sumatorioHoras;
                    }
                    break;
                case 'cantidad':
                    arrayResultante.push({
                        trabajador: cuadranteColumna.idTrabajador,
                        //trabajadorNombre: cuadranteColumna.nombreTrabajador,
                        tipo: cuadranteColumna.tipoTrabajador,
                        computo: [],
                        totalHorasNormal_L: null,
                        totalHorasExtra_L: null,
                        totalHorasNormal_E: null,
                        totalHorasExtra_E: null,
                        totalHorasNormal_P: null,
                        totalHorasExtra_P: null,
                        totalHorasNormal_N: null,
                        totalHorasExtra_N: null,
                        totalHorasNormal_R: null,
                        totalHorasExtra_R: null,
                        totalHorasNormal_L1: null,
                        totalHorasExtra_L1: null,
                        totalHorasNormal_L2: null,
                        totalHorasExtra_L2: null,
                        totalHorasNormal_F: null,
                        totalHorasExtra_F: null,
                        totalHoras: null
                    });
                    sumatorioHoras = 0;
                    sumatorioHorasNormal_L = 0;
                    sumatorioHorasExtra_L = 0;
                    sumatorioHorasNormal_E = 0;
                    sumatorioHorasExtra_E = 0;
                    sumatorioHorasNormal_P = 0;
                    sumatorioHorasExtra_P = 0;
                    sumatorioHorasNormal_N = 0;
                    sumatorioHorasExtra_N = 0;
                    sumatorioHorasNormal_R = 0;
                    sumatorioHorasExtra_R = 0;
                    sumatorioHorasNormal_L1 = 0;
                    sumatorioHorasExtra_L1 = 0;
                    sumatorioHorasNormal_L2 = 0;
                    sumatorioHorasExtra_L2 = 0;
                    sumatorioHorasNormal_F = 0;
                    sumatorioHorasExtra_F = 0;
                    for (const prop in cuadranteColumna) {
                        if (prop.includes('Lunes')) {
                            const mySplit = prop.split('Lunes');
                            if (cuadranteColumna[prop].lunesCantidad) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = cuadranteColumna[prop].lunesCantidad / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = cuadranteColumna[prop].lunesCantidad / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Lunes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Martes')) {
                            const mySplit = prop.split('Martes');
                            if (cuadranteColumna[prop].martesCantidad) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = cuadranteColumna[prop].martesCantidad / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = cuadranteColumna[prop].martesCantidad / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Martes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Miércoles')) {
                            const mySplit = prop.split('Miércoles');
                            if (cuadranteColumna[prop].miercolesCantidad) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = cuadranteColumna[prop].miercolesCantidad / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = cuadranteColumna[prop].miercolesCantidad / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Miércoles-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Jueves')) {
                            const mySplit = prop.split('Jueves');
                            if (cuadranteColumna[prop].juevesCantidad) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = cuadranteColumna[prop].juevesCantidad / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = cuadranteColumna[prop].juevesCantidad / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Jueves-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Viernes')) {
                            const mySplit = prop.split('Viernes');
                            if (cuadranteColumna[prop].viernesCantidad) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = cuadranteColumna[prop].viernesCantidad / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = cuadranteColumna[prop].viernesCantidad / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Viernes-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Sábado')) {
                            const mySplit = prop.split('Sábado');
                            if (cuadranteColumna[prop].sabadoCantidad) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = cuadranteColumna[prop].sabadoCantidad / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = cuadranteColumna[prop].sabadoCantidad / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Sábado-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        if (prop.includes('Domingo')) {
                            const mySplit = prop.split('Domingo');
                            if (cuadranteColumna[prop].domingoCantidad) {
                                if (cuadranteColumna[prop].tipoVariacion) {
                                    switch (cuadranteColumna[prop].tipoVariacion) {
                                        case 1:
                                            //'Considerar como horas extra'
                                            lasHorasNormal = null;
                                            lasHorasExtra = cuadranteColumna[prop].domingoCantidad / 60;
                                            break;
                                        case 2:
                                            //'Añadir 0.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                            lasHorasExtra = 30 / 60;
                                            break;
                                        case 3:
                                            //'Añadir 1 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                            lasHorasExtra = 60 / 60;
                                            break;
                                        case 4:
                                            //'Añadir 1.5 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                            lasHorasExtra = 90 / 60;
                                            break;
                                        case 5:
                                            //'Añadir 2 horas extra de trabajo'
                                            lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                            lasHorasExtra = 120 / 60;
                                            break;
                                        case 6:
                                            //'Horas especiales (+15%)'
                                            break;
                                        default:
                                    }
                                } else {
                                    lasHorasNormal = cuadranteColumna[prop].domingoCantidad / 60;
                                    lasHorasExtra = null;
                                };
                                switch (cuadranteColumna[prop].tipoServicio) {
                                    case 'LIM':
                                        sumatorioHorasNormal_L += lasHorasNormal;
                                        sumatorioHorasExtra_L += lasHorasExtra;
                                        break;
                                    case 'LIME':
                                        sumatorioHorasNormal_E += lasHorasNormal;
                                        sumatorioHorasExtra_E += lasHorasExtra;
                                        break;
                                    case 'LIMP':
                                        sumatorioHorasNormal_P += lasHorasNormal;
                                        sumatorioHorasExtra_P += lasHorasExtra;
                                        break;
                                    case 'NAVE2':
                                        sumatorioHorasNormal_N += lasHorasNormal;
                                        sumatorioHorasExtra_N += lasHorasExtra;
                                        break;
                                    case 'REFZ':
                                        sumatorioHorasNormal_R += lasHorasNormal;
                                        sumatorioHorasExtra_R += lasHorasExtra;
                                        break;
                                    case 'LIM1':
                                        sumatorioHorasNormal_L1 += lasHorasNormal;
                                        sumatorioHorasExtra_L1 += lasHorasExtra;
                                        break;
                                    case 'LIM2':
                                        sumatorioHorasNormal_L2 += lasHorasNormal;
                                        sumatorioHorasExtra_L2 += lasHorasExtra;
                                        break;
                                    case 'FEST':
                                        sumatorioHorasNormal_F += lasHorasNormal;
                                        sumatorioHorasExtra_F += lasHorasExtra;
                                        break;
                                    default:
                                }
                                sumatorioHoras += (lasHorasNormal + lasHorasExtra);
                                arrayResultante[index].computo.push({
                                    dia: 'Domingo-' + mySplit[1],
                                    horasNormal: lasHorasNormal,
                                    horasExtra: lasHorasExtra
                                });
                            }
                        };
                        arrayResultante[index].totalHorasNormal_L = sumatorioHorasNormal_L;
                        arrayResultante[index].totalHorasExtra_L = sumatorioHorasExtra_L;
                        arrayResultante[index].totalHorasNormal_E = sumatorioHorasNormal_E;
                        arrayResultante[index].totalHorasExtra_E = sumatorioHorasExtra_E;
                        arrayResultante[index].totalHorasNormal_P = sumatorioHorasNormal_P;
                        arrayResultante[index].totalHorasExtra_P = sumatorioHorasExtra_P;
                        arrayResultante[index].totalHorasNormal_N = sumatorioHorasNormal_N;
                        arrayResultante[index].totalHorasExtra_N = sumatorioHorasExtra_N;
                        arrayResultante[index].totalHorasNormal_R = sumatorioHorasNormal_R;
                        arrayResultante[index].totalHorasExtra_R = sumatorioHorasExtra_R;
                        arrayResultante[index].totalHorasNormal_L1 = sumatorioHorasNormal_L1;
                        arrayResultante[index].totalHorasExtra_L1 = sumatorioHorasExtra_L1;
                        arrayResultante[index].totalHorasNormal_L2 = sumatorioHorasNormal_L2;
                        arrayResultante[index].totalHorasExtra_L2 = sumatorioHorasExtra_L2;
                        arrayResultante[index].totalHorasNormal_F = sumatorioHorasNormal_F;
                        arrayResultante[index].totalHorasExtra_F = sumatorioHorasExtra_F;
                        arrayResultante[index].totalHoras = sumatorioHoras;
                    }
                    break;
                default:
            }
        });
        return arrayResultante;
    };

    const limpiarCuadranteAccion = () => {
        let arrayResultante = [];
        cuadrante.forEach((cuadranteColumna, index) => {
            let objetoResultante = {};
            objetoResultante.nombreTrabajador = cuadranteColumna.nombreTrabajador;
            objetoResultante.idTrabajador = cuadranteColumna.idTrabajador;
            objetoResultante.tipoHorario = cuadranteColumna.tipoHorario;
            objetoResultante.tipoTrabajador = cuadranteColumna.tipoTrabajador;
            objetoResultante.hayBaja = cuadranteColumna.hayBaja;
            switch (cuadranteColumna.tipoHorario) {
                case 'rango':
                    for (const prop in cuadranteColumna) {
                        if (prop.includes('Lunes')) {
                            if (cuadranteColumna[prop].lunesInicioRango ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Martes')) {
                            if (cuadranteColumna[prop].martesInicioRango ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Miércoles')) {
                            if (cuadranteColumna[prop].miercolesInicioRango ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Jueves')) {
                            if (cuadranteColumna[prop].juevesInicioRango ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Viernes')) {
                            if (cuadranteColumna[prop].viernesInicioRango ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Sábado')) {
                            if (cuadranteColumna[prop].sabadoInicioRango ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Domingo')) {
                            if (cuadranteColumna[prop].domingoInicioRango ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                    };
                    break;
                case 'rangoDescanso':
                    for (const prop in cuadranteColumna) {
                        if (prop.includes('Lunes')) {
                            if (cuadranteColumna[prop].lunesInicio1RangoDescanso ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Martes')) {
                            if (cuadranteColumna[prop].martesInicio1RangoDescanso ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Miércoles')) {
                            if (cuadranteColumna[prop].miercolesInicio1RangoDescanso ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Jueves')) {
                            if (cuadranteColumna[prop].juevesInicio1RangoDescanso ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Viernes')) {
                            if (cuadranteColumna[prop].viernesInicio1RangoDescanso ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Sábado')) {
                            if (cuadranteColumna[prop].sabadoInicio1RangoDescanso ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Domingo')) {
                            if (cuadranteColumna[prop].domingoInicio1RangoDescanso ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                    };
                    break;
                case 'cantidad':
                    for (const prop in cuadranteColumna) {
                        if (prop.includes('Lunes')) {
                            if (cuadranteColumna[prop].lunesCantidad ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Martes')) {
                            if (cuadranteColumna[prop].martesCantidad ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Miércoles')) {
                            if (cuadranteColumna[prop].miercolesCantidad ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Jueves')) {
                            if (cuadranteColumna[prop].juevesCantidad ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Viernes')) {
                            if (cuadranteColumna[prop].viernesCantidad ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Sábado')) {
                            if (cuadranteColumna[prop].sabadoCantidad ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                        if (prop.includes('Domingo')) {
                            if (cuadranteColumna[prop].domingoCantidad ||
                                cuadranteColumna[prop].baja ||
                                cuadranteColumna[prop].festivo) {
                                objetoResultante[prop] = cuadranteColumna[prop];
                            };
                        };
                    };
                    break;
            };
            arrayResultante.push(objetoResultante);
        });
        return arrayResultante
    };

    const completarCuadranteAccion = (cuadrante) => {
        let arrayResultante = [];
        let arrayFestivos = [];
        cuadrante.forEach((cuadranteColumna, index) => {
            let objetoResultante = {};
            objetoResultante.nombreTrabajador = cuadranteColumna.nombreTrabajador;
            objetoResultante.idTrabajador = cuadranteColumna.idTrabajador;
            objetoResultante.tipoHorario = cuadranteColumna.tipoHorario;
            objetoResultante.tipoTrabajador = cuadranteColumna.tipoTrabajador;
            objetoResultante.hayBaja = cuadranteColumna.hayBaja;
            switch (cuadranteColumna.tipoHorario) {
                case 'rango':
                    losDiasDelMes.forEach((dia, index) => {
                        let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;
                        if (hasKey) {
                            objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                            if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                                arrayFestivos.push([dia[1][0], dia[0][0]]);
                            };
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    lunesInicioRango: null,
                                    lunesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Martes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    martesInicioRango: null,
                                    martesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Miércoles') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    miercolesInicioRango: null,
                                    miercolesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Jueves') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    juevesInicioRango: null,
                                    juevesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Viernes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    viernesInicioRango: null,
                                    viernesFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Sábado') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    sabadoInicioRango: null,
                                    sabadoFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Domingo') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    domingoInicioRango: null,
                                    domingoFinRango: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                        };
                    });
                    break;
                case 'rangoDescanso':
                    losDiasDelMes.forEach((dia, index) => {
                        let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;
                        if (hasKey) {
                            objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                            if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                                arrayFestivos.push([dia[1][0], dia[0][0]]);
                            };
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    lunesInicio1RangoDescanso: null,
                                    lunesFin1RangoDescanso: null,
                                    lunesInicio2RangoDescanso: null,
                                    lunesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Martes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    martesInicio1RangoDescanso: null,
                                    martesFin1RangoDescanso: null,
                                    martesInicio2RangoDescanso: null,
                                    martesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Miércoles') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    miercolesInicio1RangoDescanso: null,
                                    miercolesFin1RangoDescanso: null,
                                    miercolesInicio2RangoDescanso: null,
                                    miercolesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Jueves') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    juevesInicio1RangoDescanso: null,
                                    juevesFin1RangoDescanso: null,
                                    juevesInicio2RangoDescanso: null,
                                    juevesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Viernes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    viernesInicio1RangoDescanso: null,
                                    viernesFin1RangoDescanso: null,
                                    viernesInicio2RangoDescanso: null,
                                    viernesFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Sábado') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    sabadoInicio1RangoDescanso: null,
                                    sabadoFin1RangoDescanso: null,
                                    sabadoInicio2RangoDescanso: null,
                                    sabadoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Domingo') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    domingoInicio1RangoDescanso: null,
                                    domingoFin1RangoDescanso: null,
                                    domingoInicio2RangoDescanso: null,
                                    domingoFin2RangoDescanso: null,
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                        };
                    });
                    break;
                case 'cantidad':
                    losDiasDelMes.forEach((dia, index) => {
                        let hasKey = (dia[1][0] + dia[0][0]) in cuadranteColumna;
                        if (hasKey) {
                            objetoResultante[dia[1][0] + dia[0][0]] = cuadranteColumna[dia[1][0] + dia[0][0]];
                            if (cuadranteColumna[dia[1][0] + dia[0][0]].festivo) {
                                arrayFestivos.push([dia[1][0], dia[0][0]]);
                            };
                        } else {
                            if (dia[1][0] === 'Lunes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    lunesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Martes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    martesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Miércoles') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    miercolesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Jueves') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    juevesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Viernes') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    viernesCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Sábado') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    sabadoCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                            if (dia[1][0] === 'Domingo') {
                                objetoResultante[dia[1][0] + dia[0][0]] = {
                                    domingoCantidad: '',
                                    tipoServicio: '',
                                    baja: false,
                                    tipoBaja: null,
                                    festivo: false,
                                    observaciones: '',
                                    modificado: false,
                                    visibleVariaciones: false,
                                    tipoVariacion: ''
                                }
                            };
                        };
                    });
                    break;
            };
            arrayResultante.push(objetoResultante);
        });
        return {
            arrayResultante,
            arrayFestivos
        };
    };

    return {
        gestionaColumnaServiciosFijosAccion,
        gestionarInformeAccion,
        limpiarCuadranteAccion,
        completarCuadranteAccion
    }
}

export default Helpers_2