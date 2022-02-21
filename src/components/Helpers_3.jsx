import { useSelector } from 'react-redux';

const Helpers_3 = () => {
    const stateFestivo = useSelector(store => store.variablesCuadrantes.stateFestivo);
    const losDiasDelMes = useSelector(store => store.variablesCuadrantes.losDiasDelMes);
    const cuadrante = useSelector(store => store.variablesCuadrantes.cuadrante);
    const calendarioAGestionar = useSelector(store => store.variablesCuadrantes.calendarioAGestionar);

    const retornaTipoBajaPorHistorico = (dia, historico) => {
        let elRetorno;
        historico.forEach((registro, index) => {
            let inicioSplitted = registro.baja[0].inicio.split("-");
            let diaInicio = parseInt(inicioSplitted[2]);
            let finSplitted = registro.baja[0].fin.split("-");
            let diaFin = parseInt(finSplitted[2]);
            const rangoHistorico = [];
            for (let i = diaInicio; i < diaFin; i++) {
                rangoHistorico.push(i)
            };
            if (rangoHistorico.includes(dia)) {
                elRetorno = registro.baja[0].tipo;
            }
        });
        return elRetorno;
    };

    const periodoBajaTrabajadorAccion = (calendarioAGestionar, inicioBaja, finBaja, diasMes) => {
        let myArrSplitCalendario = calendarioAGestionar.split("-");
        const anyoCalendario = myArrSplitCalendario[0];
        const mesCalendario = myArrSplitCalendario[1];
        let myArrSplitInicioB = inicioBaja.split("-");
        const anyoInicioB = myArrSplitInicioB[0];
        const mesInicioB = myArrSplitInicioB[1];
        const diaInicioB = myArrSplitInicioB[2];
        let anyoFinB, mesFinB, diaFinB;
        if (finBaja) {
            let myArrSplitFinB = finBaja.split("-");
            anyoFinB = myArrSplitFinB[0];
            mesFinB = myArrSplitFinB[1];
            diaFinB = myArrSplitFinB[2];
        } else {
            anyoFinB = anyoCalendario;
            mesFinB = mesCalendario;
            diaFinB = parseInt(diasMes);
        }
        let empezamosPor;
        let acabamosPor;
        if (anyoInicioB < anyoCalendario || mesInicioB < mesCalendario) {
            empezamosPor = 1;
        };
        if (anyoFinB > anyoCalendario || mesFinB > mesCalendario) {
            acabamosPor = parseInt(diasMes);
        };
        if (anyoInicioB === anyoCalendario && mesInicioB === mesCalendario) {
            empezamosPor = parseInt(diaInicioB);
        };
        if (finBaja) {
            if (anyoFinB === anyoCalendario && mesFinB === mesCalendario) {
                acabamosPor = parseInt(diaFinB - 1);
            };
        } else {
            if (anyoFinB === anyoCalendario && mesFinB === mesCalendario) {
                acabamosPor = parseInt(diaFinB);
            };
        }
        let arrayBaja = [];
        for (let i = empezamosPor; i <= acabamosPor; i++) {
            arrayBaja.push(i);
        };
        return arrayBaja;
    };

    const gestionaDatosHorarioItem = (
        elHorarioCuadrante,
        tipoTrabajador,
        tipoRegistro,
        cantidadTrabajadoresCentro,
        esInicio,
        posicionTrabajador,
        esLimpieza,
        item
    ) => {
        let comillas;
        if (item === 'lunesTipoServicio' ||
            item === 'martesTipoServicio' ||
            item === 'miercolesTipoServicio' ||
            item === 'juevesTipoServicio' ||
            item === 'viernesTipoServicio' ||
            item === 'sabadoTipoServicio' ||
            item === 'domingoTipoServicio' ||
            item === 'lunesCantidad' ||
            item === 'martesCantidad' ||
            item === 'miercolesCantidad' ||
            item === 'juevesCantidad' ||
            item === 'viernesCantidad' ||
            item === 'sabadoCantidad' ||
            item === 'domingoCantidad'
        ) {
            comillas = true;
        } else {
            comillas = false
        };
        if (tipoRegistro === 'comun') {
            if (esLimpieza) {
                if (comillas) {
                    return '';
                } else {
                    return null;
                }
            } else {
                if (elHorarioCuadrante.tipoRegistroTrabajador[0][item]) {
                    return elHorarioCuadrante.tipoRegistroTrabajador[0][item];
                } else {
                    if (comillas) {
                        return '';
                    } else {
                        return null;
                    }
                }
            }
        } else {
            if (esInicio) {
                if (esLimpieza) {
                    if (comillas) {
                        return '';
                    } else {
                        return null;
                    }
                } else {
                    if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                        return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                    } else {
                        if (comillas) {
                            return '';
                        } else {
                            return null;
                        }
                    }
                }
            } else {
                if (tipoTrabajador === 'trabajador') {
                    if (posicionTrabajador > cantidadTrabajadoresCentro) {
                        if (esLimpieza) {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        } else {
                            if (elHorarioCuadrante.tipoRegistroTrabajador[0][item]) {
                                return elHorarioCuadrante.tipoRegistroTrabajador[0][item];
                            } else {
                                if (comillas) {
                                    return '';
                                } else {
                                    return null;
                                }
                            }
                        }
                    } else {
                        if (esLimpieza) {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        } else {
                            if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                                return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                            } else {
                                if (comillas) {
                                    return '';
                                } else {
                                    return null;
                                }
                            }
                        }
                    }
                } else {
                    if (posicionTrabajador > cantidadTrabajadoresCentro) {
                        if (esLimpieza) {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        } else {
                            if (elHorarioCuadrante.tipoRegistroTrabajador[0][item]) {
                                return elHorarioCuadrante.tipoRegistroTrabajador[0][item];
                            } else {
                                if (comillas) {
                                    return '';
                                } else {
                                    return null;
                                }
                            }
                        }
                    } else {
                        if (esLimpieza) {
                            if (comillas) {
                                return '';
                            } else {
                                return null;
                            }
                        } else {
                            if (elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item]) {
                                return elHorarioCuadrante.tipoRegistroTrabajador[posicionTrabajador - 1][item];
                            } else {
                                if (comillas) {
                                    return '';
                                } else {
                                    return null;
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    const gestionaColumnaCuadranteInteriorAccion = (
        trabajador,
        tipoTrabajador,
        esRevision,
        columna,
        elHorarioCuadrante,
        posicionAnterior,
        esInicio,
        posicionTrabajador,
        esLimpieza,
        tipoHorario
    ) => {
        let columnaAnadir;
        let numeroSemana;
        let arrayBaja1 = [];
        let arrayBaja2 = [];
        let arrayBaja = [];
        let hayTrabajador;
        let arrayRegistrosHistorico = [];
        let tipoRegistro = elHorarioCuadrante.tipoRegistro;
        let cantidadTrabajadoresCentro = elHorarioCuadrante.tipoRegistroTrabajador.length;
        if (trabajador && tipoTrabajador) {
            if (esRevision) {
                columnaAnadir = {
                    nombreTrabajador: trabajador.nombre,
                    idTrabajador: trabajador.id,
                    tipoHorario: tipoHorario,
                    tipoTrabajador: tipoTrabajador,
                };
            } else {
                columnaAnadir = {
                    nombreTrabajador: trabajador.nombre,
                    idTrabajador: trabajador.id,
                    tipoHorario: tipoHorario,
                    tipoTrabajador: tipoTrabajador,
                };
            };
            hayTrabajador = true;
            if (trabajador.estado !== 'alta') {
                switch (trabajador.estado) {
                    case 'baja':
                        arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioBaja, trabajador.datosEstado.finBaja, losDiasDelMes.length);
                        break;
                    case 'vacaciones':
                        arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioVacaciones, trabajador.datosEstado.finVacaciones, losDiasDelMes.length);
                        break;
                    case 'excedencia':
                        arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioExcedencia, trabajador.datosEstado.finExcedencia, losDiasDelMes.length);
                        break;
                    case 'personales':
                        arrayBaja1 = periodoBajaTrabajadorAccion(calendarioAGestionar, trabajador.datosEstado.inicioPersonales, trabajador.datosEstado.finPersonales, losDiasDelMes.length);
                        break;
                    default:
                }
                columnaAnadir['hayBaja'] = true;
            } else {
                columnaAnadir['hayBaja'] = false;
            };
            if (trabajador.historicoBajas) {
                trabajador.historicoBajas.meses.forEach((registro, index) => {
                    if (registro.mes === calendarioAGestionar) {
                        arrayRegistrosHistorico.push(registro);
                        columnaAnadir['hayBaja'] = true;
                    } else {
                        columnaAnadir['hayBaja'] = false;
                    }
                });
                arrayRegistrosHistorico.forEach((registro, index) => {
                    const arrayBajaTraspaso = periodoBajaTrabajadorAccion(calendarioAGestionar, registro.baja[0].inicio, registro.baja[0].fin, losDiasDelMes.length);
                    arrayBaja2 = arrayBaja2.concat(arrayBajaTraspaso);
                });
            };
            arrayBaja = arrayBaja1.concat(arrayBaja2);
        };
        if (!trabajador) {
            columnaAnadir = {
                nombreTrabajador: '',
                idTrabajador: null,
                tipoHorario: tipoHorario,
                tipoTrabajador: tipoTrabajador,
            };
            hayTrabajador = false;
            columnaAnadir['hayBaja'] = false;
        };
        switch (tipoHorario) {
            case 'rango':
                losDiasDelMes.forEach((dia, index) => {
                    numeroSemana = Math.ceil((index + 1) / 7);
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Lunes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicioRango: null,
                                lunesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicioRango: null,
                                        lunesFinRango: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Lunes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Lunes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                lunesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                                lunesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicioRango'),
                                            lunesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Martes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicioRango: null,
                                martesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicioRango: null,
                                        martesFinRango: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Martes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Martes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                martesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                                martesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicioRango'),
                                            martesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Miércoles') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicioRango: null,
                                miercolesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicioRango: null,
                                        miercolesFinRango: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Miércoles') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Miércoles') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                miercolesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                                miercolesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicioRango'),
                                            miercolesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Jueves') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicioRango: null,
                                juevesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicioRango: null,
                                        juevesFinRango: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Jueves') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Jueves') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                juevesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                                juevesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicioRango'),
                                            juevesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Viernes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicioRango: null,
                                viernesFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicioRango: null,
                                        viernesFinRango: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Viernes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Viernes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                viernesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                                viernesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicioRango'),
                                            viernesFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Sábado') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicioRango: null,
                                sabadoFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicioRango: null,
                                        sabadoFinRango: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Sábado') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Sábado') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                sabadoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                                sabadoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicioRango'),
                                            sabadoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Domingo') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicioRango: null,
                                domingoFinRango: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicioRango: null,
                                        domingoFinRango: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Domingo') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Domingo') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                domingoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                                domingoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicioRango) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicioRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicioRango'),
                                            domingoFinRango: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFinRango'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                });
                break;
            case 'rangoDescanso':
                losDiasDelMes.forEach((dia, index) => {
                    numeroSemana = Math.ceil((index + 1) / 7);
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Lunes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicio1RangoDescanso: null,
                                lunesFin1RangoDescanso: null,
                                lunesInicio2RangoDescanso: null,
                                lunesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesInicio1RangoDescanso: null,
                                        lunesFin1RangoDescanso: null,
                                        lunesInicio2RangoDescanso: null,
                                        lunesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Lunes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Lunes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                lunesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                                lunesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                                lunesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                                lunesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio1RangoDescanso'),
                                            lunesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin1RangoDescanso'),
                                            lunesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesInicio2RangoDescanso'),
                                            lunesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia    
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Martes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicio1RangoDescanso: null,
                                martesFin1RangoDescanso: null,
                                martesInicio2RangoDescanso: null,
                                martesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesInicio1RangoDescanso: null,
                                        martesFin1RangoDescanso: null,
                                        martesInicio2RangoDescanso: null,
                                        martesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Martes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Martes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                martesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                                martesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                                martesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                                martesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio1RangoDescanso'),
                                            martesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin1RangoDescanso'),
                                            martesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesInicio2RangoDescanso'),
                                            martesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Miércoles') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicio1RangoDescanso: null,
                                miercolesFin1RangoDescanso: null,
                                miercolesInicio2RangoDescanso: null,
                                miercolesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesInicio1RangoDescanso: null,
                                        miercolesFin1RangoDescanso: null,
                                        miercolesInicio2RangoDescanso: null,
                                        miercolesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Miércoles') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Miércoles') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                                miercolesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                                miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                                miercolesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio1RangoDescanso'),
                                            miercolesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin1RangoDescanso'),
                                            miercolesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesInicio2RangoDescanso'),
                                            miercolesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Jueves') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicio1RangoDescanso: null,
                                juevesFin1RangoDescanso: null,
                                juevesInicio2RangoDescanso: null,
                                juevesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesInicio1RangoDescanso: null,
                                        juevesFin1RangoDescanso: null,
                                        juevesInicio2RangoDescanso: null,
                                        juevesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Jueves') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Jueves') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                juevesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                                juevesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                                juevesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                                juevesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio1RangoDescanso'),
                                            juevesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin1RangoDescanso'),
                                            juevesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesInicio2RangoDescanso'),
                                            juevesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Viernes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicio1RangoDescanso: null,
                                viernesFin1RangoDescanso: null,
                                viernesInicio2RangoDescanso: null,
                                viernesFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesInicio1RangoDescanso: null,
                                        viernesFin1RangoDescanso: null,
                                        viernesInicio2RangoDescanso: null,
                                        viernesFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Viernes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Viernes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                viernesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                                viernesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                                viernesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                                viernesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio1RangoDescanso'),
                                            viernesFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin1RangoDescanso'),
                                            viernesInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesInicio2RangoDescanso'),
                                            viernesFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Sábado') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicio1RangoDescanso: null,
                                sabadoFin1RangoDescanso: null,
                                sabadoInicio2RangoDescanso: null,
                                sabadoFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoInicio1RangoDescanso: null,
                                        sabadoFin1RangoDescanso: null,
                                        sabadoInicio2RangoDescanso: null,
                                        sabadoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Sábado') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Sábado') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                                sabadoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                                sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                                sabadoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio1RangoDescanso'),
                                            sabadoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin1RangoDescanso'),
                                            sabadoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoInicio2RangoDescanso'),
                                            sabadoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Domingo') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicio1RangoDescanso: null,
                                domingoFin1RangoDescanso: null,
                                domingoInicio2RangoDescanso: null,
                                domingoFin2RangoDescanso: null,
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoInicio1RangoDescanso: null,
                                        domingoFin1RangoDescanso: null,
                                        domingoInicio2RangoDescanso: null,
                                        domingoFin2RangoDescanso: null,
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Domingo') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Domingo') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                domingoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                                domingoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                                domingoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                                domingoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoInicio1RangoDescanso) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
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
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoInicio1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio1RangoDescanso'),
                                            domingoFin1RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin1RangoDescanso'),
                                            domingoInicio2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoInicio2RangoDescanso'),
                                            domingoFin2RangoDescanso: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoFin2RangoDescanso'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                });
                break;
            case 'cantidad':
                losDiasDelMes.forEach((dia, index) => {
                    numeroSemana = Math.ceil((index + 1) / 7);
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Lunes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Lunes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Lunes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                lunesCantidad: '',
                                                tipoServicio: '',
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                lunesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Lunes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        lunesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Lunes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            lunesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'lunesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Martes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                martesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Martes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Martes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                martesCantidad: '',
                                                tipoServicio: '',
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                martesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Martes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        martesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Martes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].martesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            martesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'martesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Miércoles') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Miércoles') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Miércoles') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                miercolesCantidad: '',
                                                tipoServicio: '',
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                miercolesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Miércoles') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        miercolesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Miércoles') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].miercolesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            miercolesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'miercolesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Jueves') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Jueves') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Jueves') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                juevesCantidad: '',
                                                tipoServicio: '',
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                juevesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Jueves') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        juevesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Jueves') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].juevesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            juevesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'juevesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Viernes') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Viernes') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Viernes') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                viernesCantidad: '',
                                                tipoServicio: '',
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                viernesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Viernes') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        viernesCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Viernes') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].viernesCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            viernesCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'viernesTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Sábado') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Sábado') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Sábado') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                sabadoCantidad: '',
                                                tipoServicio: '',
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                sabadoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Sábado') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        sabadoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Sábado') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].sabadoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            sabadoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'sabadoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                    if (stateFestivo['estadoFestivoDia' + (index + 1)] || !hayTrabajador) {
                        if (dia[1][0] === 'Domingo') {
                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoCantidad: '',
                                tipoServicio: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: true,
                                observaciones: '',
                                modificado: false,
                                visibleVariaciones: false,
                                tipoVariacion: ''
                            };
                        }
                    } else {
                        if (trabajador.estado !== 'alta' || arrayRegistrosHistorico.length > 0) {
                            if (arrayBaja.includes(index + 1)) {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        tipoServicio: '',
                                        baja: true,
                                        tipoBaja: arrayRegistrosHistorico.length > 0 ? retornaTipoBajaPorHistorico(index + 1, arrayRegistrosHistorico) : trabajador.estado,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                    if (dia[1][0] === 'Domingo') {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                } else {
                                    if (dia[1][0] === 'Domingo') {
                                        if ((tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                            cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                            (tipoTrabajador === 'suplente' &&
                                                cuadrante[posicionAnterior] &&
                                                cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                                !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                domingoCantidad: '',
                                                tipoServicio: '',
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        } else {
                                            columnaAnadir[dia[1][0] + dia[0][0]] = {
                                                domingoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad'),
                                                tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                                baja: false,
                                                tipoBaja: null,
                                                festivo: false,
                                                observaciones: '',
                                                modificado: false,
                                                visibleVariaciones: false,
                                                tipoVariacion: ''
                                            };
                                        }
                                    }
                                };
                            }
                        } else {
                            if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && elHorarioCuadrante.variacion === 'semanaSiNo') {
                                if (dia[1][0] === 'Domingo') {
                                    columnaAnadir[dia[1][0] + dia[0][0]] = {
                                        domingoCantidad: '',
                                        tipoServicio: '',
                                        baja: false,
                                        tipoBaja: null,
                                        festivo: false,
                                        observaciones: '',
                                        modificado: false,
                                        visibleVariaciones: false,
                                        tipoVariacion: ''
                                    };
                                }
                            } else {
                                if (dia[1][0] === 'Domingo') {
                                    if ((tipoTrabajador === 'suplente' &&
                                        cuadrante[posicionAnterior] &&
                                        cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
                                        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].domingoCantidad) ||
                                        (tipoTrabajador === 'suplente' &&
                                            cuadrante[posicionAnterior] &&
                                            cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
                                            !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].baja)) {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: '',
                                            tipoServicio: '',
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    } else {
                                        columnaAnadir[dia[1][0] + dia[0][0]] = {
                                            domingoCantidad: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoCantidad'),
                                            tipoServicio: gestionaDatosHorarioItem(elHorarioCuadrante, tipoTrabajador, tipoRegistro, cantidadTrabajadoresCentro, esInicio, posicionTrabajador, esLimpieza, 'domingoTipoServicio'),
                                            baja: false,
                                            tipoBaja: null,
                                            festivo: false,
                                            observaciones: '',
                                            modificado: false,
                                            visibleVariaciones: false,
                                            tipoVariacion: ''
                                        };
                                    }
                                }
                            };
                        }
                    }//final secuencia
                });
                break;
            default:
        };
        return {
            columnaAnadir,
            hayTrabajador
        };
    };


    return {
        gestionaColumnaCuadranteInteriorAccion
    }
}

export default Helpers_3