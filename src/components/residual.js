const [valoresInicialesColumna, setValoresInicialesColumna] = useState(null);
const anadirColumnaCuadranteVacia = () => {
    const columnaVaciaAnadir = {
        nombreTrabajador: '',
        idTrabajador: null,
        tipoHorario: centroAGestionar.horario.tipo,
        tipoTrabajador: 'trabajador',
        hayBaja: false
    };
    let numeroSemana;
    switch (centroAGestionar.horario.tipo) {
        case 'rango':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        lunesInicioRango: null,
                        lunesFinRango: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Lunes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicioRango: null,
                                lunesFinRango: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicioRango: centroAGestionar.horario.lunesInicioRango,
                                lunesFinRango: centroAGestionar.horario.lunesFinRango,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        martesInicioRango: null,
                        martesFinRango: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Martes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicioRango: null,
                                martesFinRango: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Martes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicioRango: centroAGestionar.horario.martesInicioRango,
                                martesFinRango: centroAGestionar.horario.martesFinRango,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        miercolesInicioRango: null,
                        miercolesFinRango: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Miércoles') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicioRango: null,
                                miercolesFinRango: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Miércoles') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicioRango: centroAGestionar.horario.miercolesInicioRango,
                                miercolesFinRango: centroAGestionar.horario.miercolesFinRango,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        juevesInicioRango: null,
                        juevesFinRango: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Jueves') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicioRango: null,
                                juevesFinRango: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Jueves') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicioRango: centroAGestionar.horario.juevesInicioRango,
                                juevesFinRango: centroAGestionar.horario.juevesFinRango,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        viernesInicioRango: null,
                        viernesFinRango: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Viernes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicioRango: null,
                                viernesFinRango: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Viernes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicioRango: centroAGestionar.horario.viernesInicioRango,
                                viernesFinRango: centroAGestionar.horario.viernesFinRango,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        sabadoInicioRango: null,
                        sabadoFinRango: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Sábado') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicioRango: null,
                                sabadoFinRango: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Sábado') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicioRango: centroAGestionar.horario.sabadoInicioRango,
                                sabadoFinRango: centroAGestionar.horario.sabadoFinRango,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        domingoInicioRango: null,
                        domingoFinRango: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Domingo') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicioRango: null,
                                domingoFinRango: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Domingo') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicioRango: centroAGestionar.horario.domingoInicioRango,
                                domingoFinRango: centroAGestionar.horario.domingoFinRango,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
            });
            break;
        case 'rangoDescanso':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        lunesInicio1RangoDescanso: null,
                        lunesFin1RangoDescanso: null,
                        lunesInicio2RangoDescanso: null,
                        lunesFin2RangoDescanso: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Lunes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicio1RangoDescanso: null,
                                lunesFin1RangoDescanso: null,
                                lunesInicio2RangoDescanso: null,
                                lunesFin2RangoDescanso: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicio1RangoDescanso: centroAGestionar.horario.lunesInicio1RangoDescanso,
                                lunesFin1RangoDescanso: centroAGestionar.horario.lunesFin1RangoDescanso,
                                lunesInicio2RangoDescanso: centroAGestionar.horario.lunesInicio2RangoDescanso,
                                lunesFin2RangoDescanso: centroAGestionar.horario.lunesFin2RangoDescanso,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        martesInicio1RangoDescanso: null,
                        martesFin1RangoDescanso: null,
                        martesInicio2RangoDescanso: null,
                        martesFin2RangoDescanso: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Martes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicio1RangoDescanso: null,
                                martesFin1RangoDescanso: null,
                                martesInicio2RangoDescanso: null,
                                martesFin2RangoDescanso: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Martes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicio1RangoDescanso: centroAGestionar.horario.martesInicio1RangoDescanso,
                                martesFin1RangoDescanso: centroAGestionar.horario.martesFin1RangoDescanso,
                                martesInicio2RangoDescanso: centroAGestionar.horario.martesInicio2RangoDescanso,
                                martesFin2RangoDescanso: centroAGestionar.horario.martesFin2RangoDescanso,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        miercolesInicio1RangoDescanso: null,
                        miercolesFin1RangoDescanso: null,
                        miercolesInicio2RangoDescanso: null,
                        miercolesFin2RangoDescanso: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Miércoles') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicio1RangoDescanso: null,
                                miercolesFin1RangoDescanso: null,
                                miercolesInicio2RangoDescanso: null,
                                miercolesFin2RangoDescanso: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Miércoles') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicio1RangoDescanso: centroAGestionar.horario.miercolesInicio1RangoDescanso,
                                miercolesFin1RangoDescanso: centroAGestionar.horario.miercolesFin1RangoDescanso,
                                miercolesInicio2RangoDescanso: centroAGestionar.horario.miercolesInicio2RangoDescanso,
                                miercolesFin2RangoDescanso: centroAGestionar.horario.miercolesFin2RangoDescanso,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        juevesInicio1RangoDescanso: null,
                        juevesFin1RangoDescanso: null,
                        juevesInicio2RangoDescanso: null,
                        juevesFin2RangoDescanso: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Jueves') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicio1RangoDescanso: null,
                                juevesFin1RangoDescanso: null,
                                juevesInicio2RangoDescanso: null,
                                juevesFin2RangoDescanso: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Jueves') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicio1RangoDescanso: centroAGestionar.horario.juevesInicio1RangoDescanso,
                                juevesFin1RangoDescanso: centroAGestionar.horario.juevesFin1RangoDescanso,
                                juevesInicio2RangoDescanso: centroAGestionar.horario.juevesInicio2RangoDescanso,
                                juevesFin2RangoDescanso: centroAGestionar.horario.juevesFin2RangoDescanso,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        viernesInicio1RangoDescanso: null,
                        viernesFin1RangoDescanso: null,
                        viernesInicio2RangoDescanso: null,
                        viernesFin2RangoDescanso: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Viernes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicio1RangoDescanso: null,
                                viernesFin1RangoDescanso: null,
                                viernesInicio2RangoDescanso: null,
                                viernesFin2RangoDescanso: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Viernes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicio1RangoDescanso: centroAGestionar.horario.viernesInicio1RangoDescanso,
                                viernesFin1RangoDescanso: centroAGestionar.horario.viernesFin1RangoDescanso,
                                viernesInicio2RangoDescanso: centroAGestionar.horario.viernesInicio2RangoDescanso,
                                viernesFin2RangoDescanso: centroAGestionar.horario.viernesFin2RangoDescanso,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        sabadoInicio1RangoDescanso: null,
                        sabadoFin1RangoDescanso: null,
                        sabadoInicio2RangoDescanso: null,
                        sabadoFin2RangoDescanso: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Sábado') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicio1RangoDescanso: null,
                                sabadoFin1RangoDescanso: null,
                                sabadoInicio2RangoDescanso: null,
                                sabadoFin2RangoDescanso: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Sábado') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicio1RangoDescanso: centroAGestionar.horario.sabadoInicio1RangoDescanso,
                                sabadoFin1RangoDescanso: centroAGestionar.horario.sabadoFin1RangoDescanso,
                                sabadoInicio2RangoDescanso: centroAGestionar.horario.sabadoInicio2RangoDescanso,
                                sabadoFin2RangoDescanso: centroAGestionar.horario.sabadoFin2RangoDescanso,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        domingoInicio1RangoDescanso: null,
                        domingoFin1RangoDescanso: null,
                        domingoInicio2RangoDescanso: null,
                        domingoFin2RangoDescanso: null,
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Domingo') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicio1RangoDescanso: null,
                                domingoFin1RangoDescanso: null,
                                domingoInicio2RangoDescanso: null,
                                domingoFin2RangoDescanso: null,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Domingo') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicio1RangoDescanso: centroAGestionar.horario.domingoInicio1RangoDescanso,
                                domingoFin1RangoDescanso: centroAGestionar.horario.domingoFin1RangoDescanso,
                                domingoInicio2RangoDescanso: centroAGestionar.horario.domingoInicio2RangoDescanso,
                                domingoFin2RangoDescanso: centroAGestionar.horario.domingoFin2RangoDescanso,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
            });
            break;
        case 'cantidad':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        lunesCantidad: '',
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Lunes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesCantidad: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                lunesCantidad: centroAGestionar.horario.lunesCantidad,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        martesCantidad: '',
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Martes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                martesCantidad: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Martes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                martesCantidad: centroAGestionar.horario.martesCantidad,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        miercolesCantidad: '',
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Miércoles') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesCantidad: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Miércoles') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesCantidad: centroAGestionar.horario.miercolesCantidad,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        juevesCantidad: '',
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Jueves') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesCantidad: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Jueves') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                juevesCantidad: centroAGestionar.horario.juevesCantidad,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        viernesCantidad: '',
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Viernes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesCantidad: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Viernes') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                viernesCantidad: centroAGestionar.horario.viernesCantidad,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        sabadoCantidad: '',
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Sábado') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoCantidad: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Sábado') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoCantidad: centroAGestionar.horario.sabadoCantidad,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                        domingoCantidad: '',
                        baja: false,
                        tipoBaja: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Domingo') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoCantidad: '',
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Domingo') {
                            columnaVaciaAnadir[dia[1][0] + dia[0][0]] = {
                                domingoCantidad: centroAGestionar.horario.domingoCantidad,
                                baja: false,
                                tipoBaja: null,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
            });
            break;
        default:
    };
    const arrayCuadrante = [...cuadrante];
    arrayCuadrante.push(columnaVaciaAnadir);
    setCuadrante(arrayCuadrante);
};

const anadirColumnaCuadranteInicial = () => {
    const columnaInicialAnadir = {
        tipoHorario: centroAGestionar.horario.tipo,
    };
    let numeroSemana;
    switch (centroAGestionar.horario.tipo) {
        case 'rango':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        lunesInicioRango: null,
                        lunesFinRango: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Lunes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicioRango: null,
                                lunesFinRango: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicioRango: centroAGestionar.horario.lunesInicioRango,
                                lunesFinRango: centroAGestionar.horario.lunesFinRango,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        martesInicioRango: null,
                        martesFinRango: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Martes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicioRango: null,
                                martesFinRango: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Martes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicioRango: centroAGestionar.horario.martesInicioRango,
                                martesFinRango: centroAGestionar.horario.martesFinRango,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        miercolesInicioRango: null,
                        miercolesFinRango: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Miércoles') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicioRango: null,
                                miercolesFinRango: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Miércoles') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicioRango: centroAGestionar.horario.miercolesInicioRango,
                                miercolesFinRango: centroAGestionar.horario.miercolesFinRango,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        juevesInicioRango: null,
                        juevesFinRango: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Jueves') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicioRango: null,
                                juevesFinRango: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Jueves') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicioRango: centroAGestionar.horario.juevesInicioRango,
                                juevesFinRango: centroAGestionar.horario.juevesFinRango,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        viernesInicioRango: null,
                        viernesFinRango: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Viernes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicioRango: null,
                                viernesFinRango: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Viernes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicioRango: centroAGestionar.horario.viernesInicioRango,
                                viernesFinRango: centroAGestionar.horario.viernesFinRango,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        sabadoInicioRango: null,
                        sabadoFinRango: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Sábado') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicioRango: null,
                                sabadoFinRango: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Sábado') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicioRango: centroAGestionar.horario.sabadoInicioRango,
                                sabadoFinRango: centroAGestionar.horario.sabadoFinRango,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        domingoInicioRango: null,
                        domingoFinRango: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Domingo') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicioRango: null,
                                domingoFinRango: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Domingo') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicioRango: centroAGestionar.horario.domingoInicioRango,
                                domingoFinRango: centroAGestionar.horario.domingoFinRango,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
            });
            break;
        case 'rangoDescanso':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        lunesInicio1RangoDescanso: null,
                        lunesFin1RangoDescanso: null,
                        lunesInicio2RangoDescanso: null,
                        lunesFin2RangoDescanso: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Lunes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicio1RangoDescanso: null,
                                lunesFin1RangoDescanso: null,
                                lunesInicio2RangoDescanso: null,
                                lunesFin2RangoDescanso: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                lunesInicio1RangoDescanso: centroAGestionar.horario.lunesInicio1RangoDescanso,
                                lunesFin1RangoDescanso: centroAGestionar.horario.lunesFin1RangoDescanso,
                                lunesInicio2RangoDescanso: centroAGestionar.horario.lunesInicio2RangoDescanso,
                                lunesFin2RangoDescanso: centroAGestionar.horario.lunesFin2RangoDescanso,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        martesInicio1RangoDescanso: null,
                        martesFin1RangoDescanso: null,
                        martesInicio2RangoDescanso: null,
                        martesFin2RangoDescanso: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Martes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicio1RangoDescanso: null,
                                martesFin1RangoDescanso: null,
                                martesInicio2RangoDescanso: null,
                                martesFin2RangoDescanso: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Martes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                martesInicio1RangoDescanso: centroAGestionar.horario.martesInicio1RangoDescanso,
                                martesFin1RangoDescanso: centroAGestionar.horario.martesFin1RangoDescanso,
                                martesInicio2RangoDescanso: centroAGestionar.horario.martesInicio2RangoDescanso,
                                martesFin2RangoDescanso: centroAGestionar.horario.martesFin2RangoDescanso,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        miercolesInicio1RangoDescanso: null,
                        miercolesFin1RangoDescanso: null,
                        miercolesInicio2RangoDescanso: null,
                        miercolesFin2RangoDescanso: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Miércoles') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicio1RangoDescanso: null,
                                miercolesFin1RangoDescanso: null,
                                miercolesInicio2RangoDescanso: null,
                                miercolesFin2RangoDescanso: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Miércoles') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesInicio1RangoDescanso: centroAGestionar.horario.miercolesInicio1RangoDescanso,
                                miercolesFin1RangoDescanso: centroAGestionar.horario.miercolesFin1RangoDescanso,
                                miercolesInicio2RangoDescanso: centroAGestionar.horario.miercolesInicio2RangoDescanso,
                                miercolesFin2RangoDescanso: centroAGestionar.horario.miercolesFin2RangoDescanso,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        juevesInicio1RangoDescanso: null,
                        juevesFin1RangoDescanso: null,
                        juevesInicio2RangoDescanso: null,
                        juevesFin2RangoDescanso: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Jueves') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicio1RangoDescanso: null,
                                juevesFin1RangoDescanso: null,
                                juevesInicio2RangoDescanso: null,
                                juevesFin2RangoDescanso: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Jueves') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                juevesInicio1RangoDescanso: centroAGestionar.horario.juevesInicio1RangoDescanso,
                                juevesFin1RangoDescanso: centroAGestionar.horario.juevesFin1RangoDescanso,
                                juevesInicio2RangoDescanso: centroAGestionar.horario.juevesInicio2RangoDescanso,
                                juevesFin2RangoDescanso: centroAGestionar.horario.juevesFin2RangoDescanso,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        viernesInicio1RangoDescanso: null,
                        viernesFin1RangoDescanso: null,
                        viernesInicio2RangoDescanso: null,
                        viernesFin2RangoDescanso: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Viernes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicio1RangoDescanso: null,
                                viernesFin1RangoDescanso: null,
                                viernesInicio2RangoDescanso: null,
                                viernesFin2RangoDescanso: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Viernes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                viernesInicio1RangoDescanso: centroAGestionar.horario.viernesInicio1RangoDescanso,
                                viernesFin1RangoDescanso: centroAGestionar.horario.viernesFin1RangoDescanso,
                                viernesInicio2RangoDescanso: centroAGestionar.horario.viernesInicio2RangoDescanso,
                                viernesFin2RangoDescanso: centroAGestionar.horario.viernesFin2RangoDescanso,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        sabadoInicio1RangoDescanso: null,
                        sabadoFin1RangoDescanso: null,
                        sabadoInicio2RangoDescanso: null,
                        sabadoFin2RangoDescanso: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Sábado') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicio1RangoDescanso: null,
                                sabadoFin1RangoDescanso: null,
                                sabadoInicio2RangoDescanso: null,
                                sabadoFin2RangoDescanso: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Sábado') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoInicio1RangoDescanso: centroAGestionar.horario.sabadoInicio1RangoDescanso,
                                sabadoFin1RangoDescanso: centroAGestionar.horario.sabadoFin1RangoDescanso,
                                sabadoInicio2RangoDescanso: centroAGestionar.horario.sabadoInicio2RangoDescanso,
                                sabadoFin2RangoDescanso: centroAGestionar.horario.sabadoFin2RangoDescanso,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        domingoInicio1RangoDescanso: null,
                        domingoFin1RangoDescanso: null,
                        domingoInicio2RangoDescanso: null,
                        domingoFin2RangoDescanso: null,
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Domingo') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicio1RangoDescanso: null,
                                domingoFin1RangoDescanso: null,
                                domingoInicio2RangoDescanso: null,
                                domingoFin2RangoDescanso: null,
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Domingo') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                domingoInicio1RangoDescanso: centroAGestionar.horario.domingoInicio1RangoDescanso,
                                domingoFin1RangoDescanso: centroAGestionar.horario.domingoFin1RangoDescanso,
                                domingoInicio2RangoDescanso: centroAGestionar.horario.domingoInicio2RangoDescanso,
                                domingoFin2RangoDescanso: centroAGestionar.horario.domingoFin2RangoDescanso,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
            });
            break;
        case 'cantidad':
            losDiasDelMes.forEach((dia, index) => {
                numeroSemana = Math.ceil((index + 1) / 7);
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        lunesCantidad: '',
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Lunes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                lunesCantidad: '',
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Lunes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                lunesCantidad: centroAGestionar.horario.lunesCantidad,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        martesCantidad: '',
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Martes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                martesCantidad: '',
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Martes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                martesCantidad: centroAGestionar.horario.martesCantidad,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        miercolesCantidad: '',
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Miércoles') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesCantidad: '',
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Miércoles') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                miercolesCantidad: centroAGestionar.horario.miercolesCantidad,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        juevesCantidad: '',
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Jueves') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                juevesCantidad: '',
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Jueves') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                juevesCantidad: centroAGestionar.horario.juevesCantidad,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        viernesCantidad: '',
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Viernes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                viernesCantidad: '',
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Viernes') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                viernesCantidad: centroAGestionar.horario.viernesCantidad,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        sabadoCantidad: '',
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Sábado') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoCantidad: '',
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Sábado') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                sabadoCantidad: centroAGestionar.horario.sabadoCantidad,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
                if (stateFestivo['estadoFestivoDia' + (index + 1)]) {
                    columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                        domingoCantidad: '',
                        festivo: true
                    };
                } else {
                    if ((numeroSemana === 2 || numeroSemana === 4 || numeroSemana === 6) && centroAGestionar.horario.variacion === 'semanaSiNo') {
                        if (dia[1][0] === 'Domingo') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                domingoCantidad: '',
                                festivo: false
                            };
                        }
                    } else {
                        if (dia[1][0] === 'Domingo') {
                            columnaInicialAnadir[dia[1][0] + dia[0][0]] = {
                                domingoCantidad: centroAGestionar.horario.domingoCantidad,
                                festivo: false
                            };
                        }
                    }
                };//fin secuencia
            });
            break;
        default:
    };
    setValoresInicialesColumna(columnaInicialAnadir);
};

const handleCambioAccordionHeader = (expandedAccordion, panel) => {
    setExpandedAccordion(expandedAccordion ? panel : true);
    cambioAccordionHeaderFuncion(expandedAccordion);
    cambioAccordionGeneralFuncion(false, 'nada', null, false);
};

const handleCambioAccordionGeneral = (expandedAccordion, panel, ref, esInicio) => {
    setExpandedAccordion(expandedAccordion ? panel : false);
    let identificadorPanelSplitted = panel.split("_");
    const identificadorPanel = parseInt(identificadorPanelSplitted[1]);
    cambioAccordionHeaderFuncion(false);
    if (esInicio) {
        cambioAccordionGeneralFuncion(expandedAccordion, ref, identificadorPanel, esInicio);
    } else {
        cambioAccordionGeneralFuncion(expandedAccordion, ref, identificadorPanel, esInicio);
    }
};

const cambioAccordionHeaderFuncion = (estado) => {
    const scrollableInteriorRef = getRef('scrollableInterior');
    const scrollableRef = getRef('scrollable');
    if (!estado) {
        scrollableInteriorRef.current.className = classes.reducidoInferiorScroller;
        scrollableRef.current.className = (clsx(classes.scrollableScroll, classes.scrollable));
    } else {
        scrollableInteriorRef.current.className = classes.ampliadoInferiorScroller;
        scrollableRef.current.className = (clsx(classes.scrollableScrollAmpliado, classes.scrollable));
    }
};

const cambioAccordionGeneralFuncion = (expandedAccordion, ref, idPanel, esInicio) => {
    if (ref === 'nada') {
        if (!lastExpandedAccordion) {
            return;
        } else {
            for (let i = 0; i <= cuadrante.length; i++) {
                let accordionAMover = lastExpandedAccordion['nombre' + i];
                let accordionAMoverRef = getRef(accordionAMover);
                if (esInicio) {
                    accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionInicio);
                } else {
                    switch (centroAGestionar.horario.tipo) {
                        case 'rango':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRango);
                            break;
                        case 'rangoDescanso':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRangoDescanso);
                            break;
                        case 'cantidad':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionCantidad);
                            break;
                        default:
                    }
                }
                accordionAMoverRef.current.classList.add(classes.reducidoInferiorAccordion);
                setLastExpandedAccordion(null);
            };
            return;
        };
    };
    if (!lastExpandedAccordion && expandedAccordion) {
        const objetoIterado = {};
        for (let i = 0; i <= cuadrante.length; i++) {
            objetoIterado['nombre' + i] = 'box_' + i + '_' + ref;
            let accordionAMover = objetoIterado['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            if (i !== idPanel) {
                if (esInicio) {
                    accordionAMoverRef.current.classList.remove(classes.reducidoInferiorAccordion);
                } else {
                    switch (centroAGestionar.horario.tipo) {
                        case 'rango':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRango);
                            break;
                        case 'rangoDescanso':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRangoDescanso);
                            break;
                        case 'cantidad':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionCantidad);
                            break;
                        default:
                    }
                }
                accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionInicio);
            }
            setLastExpandedAccordion(objetoIterado);
        };
        return;
    };
    if (lastExpandedAccordion && !expandedAccordion) {
        const objetoIterado = {};
        for (let i = 0; i <= cuadrante.length; i++) {
            objetoIterado['nombre' + i] = 'box_' + i + '_' + ref;
            let accordionAMover = objetoIterado['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            if (i !== idPanel) {
                if (esInicio) {
                    accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionInicio);
                } else {
                    switch (centroAGestionar.horario.tipo) {
                        case 'rango':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRango);
                            break;
                        case 'rangoDescanso':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRangoDescanso);
                            break;
                        case 'cantidad':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionCantidad);
                            break;
                        default:
                    }
                }
                accordionAMoverRef.current.classList.add(classes.reducidoInferiorAccordion);
            }
            setLastExpandedAccordion(null);
        };
        return;
    };
    if (lastExpandedAccordion && expandedAccordion) {
        for (let i = 0; i <= cuadrante.length; i++) {
            let accordionAMover = lastExpandedAccordion['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            if (esInicio) {
                accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionInicio);
            } else {
                switch (centroAGestionar.horario.tipo) {
                    case 'rango':
                        accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRango);
                        break;
                    case 'rangoDescanso':
                        accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRangoDescanso);
                        break;
                    case 'cantidad':
                        accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionCantidad);
                        break;
                    default:
                }
            }
            accordionAMoverRef.current.classList.add(classes.reducidoInferiorAccordion);
            setLastExpandedAccordion(null);
        };
        const objetoIterado = {};
        for (let i = 0; i <= cuadrante.length; i++) {
            objetoIterado['nombre' + i] = 'box_' + i + '_' + ref;
            let accordionAMover = objetoIterado['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            if (i !== idPanel) {
                accordionAMoverRef.current.classList.remove(classes.reducidoInferiorAccordion);
                if (esInicio) {
                    accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionInicio);
                } else {
                    switch (centroAGestionar.horario.tipo) {
                        case 'rango':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionRango);
                            break;
                        case 'rangoDescanso':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionRangoDescanso);
                            break;
                        case 'cantidad':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionCantidad);
                            break;
                        default:
                    }
                }
            }
            setLastExpandedAccordion(objetoIterado);
        };
        return;
    }
};


//accordion dias
<div>
    <Accordion
        expanded={expandedAccordion === 'panel_0_' + postRef}
        onChange={(e, expandedAccordion) => { handleCambioAccordionGeneral(expandedAccordion, 'panel_0_' + postRef, postRef, true) }}
        className={clsx(classes.inicio, classes.blanc, classes.mb_5, dia[1][0] === 'Domingo' || stateFestivo['estadoFestivoDia' + (index + 1)] ? classes.diaFestivo : classes.diaLaboral)}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.blanc} />}
        >
            <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{dia[1][0] + ', ' + dia[0][0]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                    <Switch
                        checked={stateFestivo['estadoFestivoDia' + (index + 1)] || false}
                        onChange={handleChangeFestivoDia(postRef, index + 1, dia[1][0])}
                        name={"estadoFestivoDia" + (index + 1)}
                    />
                </Grid>
                <Grid item><Typography variant="body2" color="textPrimary">Lab./Fes.</Typography></Grid>
            </Grid>
        </AccordionDetails>
    </Accordion>

//accordion general

    <Accordion
        expanded={expandedAccordion === 'panel_' + (indexColumna + 1) + '_' + dia[0][0]}
        disabled={gestionaDisabledAccordion(indexDia + 1, columna[postRef].baja)}
        className={gestionaClassesColoresGeneral(indexDia + 1, columna[postRef].baja)}
        style={{ width: dimensionsColumna.width }}
        onChange={(e, expandedAccordion) => { handleCambioAccordionGeneral(expandedAccordion, 'panel_' + (indexColumna + 1) + '_' + dia[0][0], postRef, false) }}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillas(indexDia + 1, postRef, columna, dia[1][0])}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container className={classes.mt20}>
                {/* {expandedAccordion ? ( */}
                <Box style={{ width: '100%' }}>
                    {centroAGestionar.horario.tipo === 'rango' ? (
                        <Fragment>
                            <ItemCuadrante
                                prTipo={'rango'}
                                prIdInicio={'timePickerInicio-edicion-lunes'}
                                prIdFin={'timePickerFin-edicion-lunes'}
                                prValueTimePickerInicio={gestionaValoresCasillas(indexDia + 1, postRef, columna, dia[1][0], 1)}
                                prValueTimePickerFin={gestionaValoresCasillas(indexDia + 1, postRef, columna, dia[1][0], 2)}
                            // prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                            // prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                            />
                        </Fragment>
                    ) : centroAGestionar.horario.tipo === 'cantidad' ? (
                        <Fragment>
                            <ItemCuadrante
                                prTipo={'cantidad'}
                                prIdCantidad={'selectCantidad-edicion-lunes'}
                                prValueCantidadHoras={gestionaValoresCasillas(indexDia + 1, postRef, columna, dia[1][0], 1)}
                            // prHandleChangeSelectCantidadEdicion={handleChangeSelectCantidadEdicion}
                            />
                        </Fragment>
                    ) : centroAGestionar.horario.tipo === 'rangoDescanso' ? (
                        <Fragment>
                            <ItemCuadrante
                                prTipo={'rangoDescanso'}
                                prIdInicio1={'timePickerInicio1Descanso-edicion-lunes'}
                                prIdFin1={'timePickerFin1Descanso-edicion-lunes'}
                                prIdInicio2={'timePickerInicio2Descanso-edicion-lunes'}
                                prIdFin2={'timePickerFin2Descanso-edicion-lunes'}
                                prValueTimePickerInicio1={gestionaValoresCasillas(indexDia + 1, postRef, columna, dia[1][0], 1)}
                                prValueTimePickerFin1={gestionaValoresCasillas(indexDia + 1, postRef, columna, dia[1][0], 2)}
                                prValueTimePickerInicio2={gestionaValoresCasillas(indexDia + 1, postRef, columna, dia[1][0], 3)}
                                prValueTimePickerFin2={gestionaValoresCasillas(indexDia + 1, postRef, columna, dia[1][0], 4)}
                            // prHandleChangeTimePickerInicioEdicion={handleChangeTimePickerInicioEdicion}
                            // prHandleChangeTimePickerFinEdicion={handleChangeTimePickerFinEdicion}
                            />
                        </Fragment>
                    ) : null}
                </Box>
                {/* ):null}  */}
            </Grid>
        </AccordionDetails>
    </Accordion>


//accordio header

    <Accordion
        expanded={expandedAccordion === 'panel_' + (index + 1)}
        className={gestionaClassesColoresTrabajadores(columnaCabecera.tipoTrabajador)}
        style={{ width: dimensionsColumna.width }}
        onChange={(e, expandedAccordion) => { handleCambioAccordionHeader(expandedAccordion, 'panel_' + (index + 1)) }}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.blanc} />}
        >
            <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{columnaCabecera.nombreTrabajador}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container className={classes.mt5}>
                <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', justifycontent: 'flex-end', alignItems: 'flex-end' }}>
                    <Grid
                        container
                        direction="row"
                        justifycontent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={10}>
                            <Box style={{ display: 'flex', flexDirection: 'row', justifycontent: 'flex-start', alignItems: 'center' }}>
                                <Switch
                                    disabled={gestionaDisabledSwitcherTrabajadores(index, columnaCabecera.tipoTrabajador)}
                                    checked={stateTrabajador['estadoTrabajador' + (index + 1)]}
                                    onChange={handleChangeEstadoTrabajador(index, columnaCabecera.tipoTrabajador, columnaCabecera.idTrabajador)}
                                    name={"estadoTrabajador" + (index + 1)}
                                />
                                <Typography variant="body2" color="textPrimary">Supl./Trab.</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box style={{ textAlign: 'right' }}>
                                <Tooltip title="Eliminar trabajador" placement="left" arrow>
                                    <IconButton
                                        onClick={() => eliminarcolumna(index, columnaCabecera.idTrabajador)}
                                        className={clsx(classes.btnError, classes.mb10)}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.mt15}
                    >
                        <InputLabel>{(columnaCabecera.tipoTrabajador === 'trabajador' || !columnaCabecera.tipoTrabajador) ? 'Trabajador' : 'Suplente'}</InputLabel>
                        <Select
                            id={`form-trabajador-` + (index + 1)}
                            value={columnaCabecera.idTrabajador || ''}
                            onChange={handleChangeFormTrabajadores(index, columnaCabecera.tipoTrabajador)}
                            onOpen={() => setValorPrevioAccordionAbierto(columnaCabecera.idTrabajador)}
                            input={
                                <OutlinedInput
                                    labelWidth={80}
                                />
                            }
                        >
                            {listadoTrabajadores.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        </AccordionDetails>
    </Accordion>
</div>

const gestionaDisabledAccordion = (dia, trabajadorDiaDeBaja) => {
    if (trabajadorDiaDeBaja) {
        return true;
    } else {
        if (stateFestivo['estadoFestivoDia' + (dia)]) {
            return true;
        } else {
            return false;
        };
    }
};

const handleCambioAccordionGeneral = (expandedAccordion, panel, ref, esInicio) => {
    setExpandedAccordion(expandedAccordion ? panel : false);
    let identificadorPanelSplitted = panel.split("_");
    const identificadorPanel = parseInt(identificadorPanelSplitted[1]);
    cambioAccordionHeaderFuncion(false);
    if (esInicio) {
        cambioAccordionGeneralFuncion(expandedAccordion, ref, identificadorPanel, true);
    } else {
        cambioAccordionGeneralFuncion(expandedAccordion, ref, identificadorPanel, false);
    }
};

const cambioAccordionHeaderFuncion = (estado) => {
    const scrollableInteriorRef = getRef('scrollableInterior');
    const scrollableRef = getRef('scrollable');
    if (!estado) {
        scrollableInteriorRef.current.className = classes.reducidoInferiorScroller;
        scrollableRef.current.className = (clsx(classes.scrollableScroll, classes.scrollable));
    } else {
        scrollableInteriorRef.current.className = classes.ampliadoInferiorScroller;
        scrollableRef.current.className = (clsx(classes.scrollableScrollAmpliado, classes.scrollable));
    }
};

const cambioAccordionGeneralFuncion = (expandedAccordion, ref, idPanel, esInicio) => {
    if (ref === 'nada') {
        if (!lastExpandedAccordion) {
            return;
        } else {
            for (let i = 0; i <= cuadrante.length; i++) {
                let accordionAMover = lastExpandedAccordion['nombre' + i];
                let accordionAMoverRef = getRef(accordionAMover);
                if (esInicio) {
                    accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionInicio);
                } else {
                    switch (centroAGestionar.horario.tipo) {
                        case 'rango':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRango);
                            break;
                        case 'rangoDescanso':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRangoDescanso);
                            break;
                        case 'cantidad':
                            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionCantidad);
                            break;
                        default:
                    }
                }
                accordionAMoverRef.current.classList.add(classes.reducidoInferiorAccordion);
                setLastExpandedAccordion(null);
            };
            return;
        };
    };
    if (!lastExpandedAccordion && expandedAccordion) {
        const objetoIterado = {};
        for (let i = 0; i <= cuadrante.length; i++) {
            objetoIterado['nombre' + i] = 'box_' + i + '_' + ref;
            let accordionAMover = objetoIterado['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            if (i !== idPanel) {
                accordionAMoverRef.current.classList.remove(classes.reducidoInferiorAccordion);
                if (esInicio) {
                    accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionInicio);
                } else {
                    switch (centroAGestionar.horario.tipo) {
                        case 'rango':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionRango);
                            break;
                        case 'rangoDescanso':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionRangoDescanso);
                            break;
                        case 'cantidad':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionCantidad);
                            break;
                        default:
                    }
                }
            }
            setLastExpandedAccordion(objetoIterado);
        };
        return;
    };
    if (lastExpandedAccordion && !expandedAccordion) {
        const objetoIterado = {};
        for (let i = 0; i <= cuadrante.length; i++) {
            objetoIterado['nombre' + i] = 'box_' + i + '_' + ref;
            let accordionAMover = objetoIterado['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            if (i !== idPanel) {
                accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionInicio);
                switch (centroAGestionar.horario.tipo) {
                    case 'rango':
                        accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRango);
                        break;
                    case 'rangoDescanso':
                        accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRangoDescanso);
                        break;
                    case 'cantidad':
                        accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionCantidad);
                        break;
                    default:
                }
                accordionAMoverRef.current.classList.add(classes.reducidoInferiorAccordion);
            }
            setLastExpandedAccordion(null);
        };
        return;
    };
    if (lastExpandedAccordion && expandedAccordion) {
        for (let i = 0; i <= cuadrante.length; i++) {
            let accordionAMover = lastExpandedAccordion['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionInicio);
            switch (centroAGestionar.horario.tipo) {
                case 'rango':
                    accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRango);
                    break;
                case 'rangoDescanso':
                    accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionRangoDescanso);
                    break;
                case 'cantidad':
                    accordionAMoverRef.current.classList.remove(classes.ampliadoInferiorAccordionCantidad);
                    break;
                default:
            }
            accordionAMoverRef.current.classList.add(classes.reducidoInferiorAccordion);
            setLastExpandedAccordion(null);
        };
        const objetoIterado = {};
        for (let i = 0; i <= cuadrante.length; i++) {
            objetoIterado['nombre' + i] = 'box_' + i + '_' + ref;
            let accordionAMover = objetoIterado['nombre' + i];
            let accordionAMoverRef = getRef(accordionAMover);
            if (i !== idPanel) {
                accordionAMoverRef.current.classList.remove(classes.reducidoInferiorAccordion);
                if (esInicio) {
                    accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionInicio);
                } else {
                    switch (centroAGestionar.horario.tipo) {
                        case 'rango':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionRango);
                            break;
                        case 'rangoDescanso':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionRangoDescanso);
                            break;
                        case 'cantidad':
                            accordionAMoverRef.current.classList.add(classes.ampliadoInferiorAccordionCantidad);
                            break;
                        default:
                    }
                }
            }
            setLastExpandedAccordion(objetoIterado);
        };
        return;
    }
};


const handlePrevioTraspasoTimePicker = (prop) => (hora) => {
    switch (prop) {
        case 'inicioRango':
            if (valuesTimePickerCuadrante.finRango !== null && (dispatch(retornaMinutosAccion(dispatch(retornaHoraRangoAccion(hora)), dispatch(retornaHoraRangoAccion(valuesTimePickerCuadrante.finRango))))) < 0) {
                setAlert({
                    mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        case 'finRango':
            if (valuesTimePickerCuadrante.inicioRango !== null && (dispatch(retornaMinutosAccion(dispatch(retornaHoraRangoAccion(valuesTimePickerCuadrante.inicioRango)), dispatch(retornaHoraRangoAccion(hora))))) < 0) {
                setAlert({
                    mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        case 'inicio1RangoDescanso':
            if (valuesTimePickerCuadrante.fin1RangoDescanso !== null && (dispatch(retornaMinutosAccion(dispatch(retornaHoraRangoAccion(hora)), dispatch(retornaHoraRangoAccion(valuesTimePickerCuadrante.fin1RangoDescanso))))) < 0) {
                setAlert({
                    mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        case 'fin1RangoDescanso':
            if (valuesTimePickerCuadrante.inicio1RangoDescanso !== null && (dispatch(retornaMinutosAccion(dispatch(retornaHoraRangoAccion(valuesTimePickerCuadrante.inicio1RangoDescanso)), dispatch(retornaHoraRangoAccion(hora))))) < 0) {
                setAlert({
                    mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        case 'inicio2RangoDescanso':
            if (valuesTimePickerCuadrante.fin2RangoDescanso !== null && (dispatch(retornaMinutosAccion(dispatch(retornaHoraRangoAccion(hora)), dispatch(retornaHoraRangoAccion(valuesTimePickerCuadrante.fin2RangoDescanso))))) < 0) {
                setAlert({
                    mensaje: "La hora de entrada no puede ser superior a la hora de salida.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        case 'fin2RangoDescanso':
            if (valuesTimePickerCuadrante.inicio2RangoDescanso !== null && (dispatch(retornaMinutosAccion(dispatch(retornaHoraRangoAccion(valuesTimePickerCuadrante.inicio2RangoDescanso)), dispatch(retornaHoraRangoAccion(hora))))) < 0) {
                setAlert({
                    mensaje: "La hora de salida no puede ser inferior a la hora de entrada.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        default:
    };

    // if (hora) {
    //     setValuesTimePickerCuadrante({ ...valuesTimePickerCuadrante, [prop]: hora });
    // } else {
    //     setValuesTimePickerCuadrante({ ...valuesTimePickerCuadrante, [prop]: null });
    // };        
};

const handlePrevioTraspasoGeneral = (prop) => (e) => {
    setValuesTimePickerCuadrante({ ...valuesTimePickerCuadrante, [prop]: e.target.value });
};

const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnack(false);
};

const handleProcesarDatos = (tipo) => {
    switch (tipo) {
        case 'rango':
            if (!valuesTimePickerCuadrante.inicioRango &&
                !valuesTimePickerCuadrante.finRango) {
                setAlert({
                    mensaje: "No has introducido ningún dato horario para registrar.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (!valuesTimePickerCuadrante.inicioRango && valuesTimePickerCuadrante.finRango) {
                setAlert({
                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesTimePickerCuadrante.inicioRango && !valuesTimePickerCuadrante.finRango) {
                setAlert({
                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        case 'rangoDescanso':
            if (!valuesTimePickerCuadrante.inicio1RangoDescanso &&
                !valuesTimePickerCuadrante.fin1RangoDescanso &&
                !valuesTimePickerCuadrante.inicio2RangoDescanso &&
                !valuesTimePickerCuadrante.fin2RangoDescanso
            ) {
                setAlert({
                    mensaje: "No has introducido ningún dato horario para registrar.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            }
            if (!valuesTimePickerCuadrante.inicio1RangoDescanso && valuesTimePickerCuadrante.fin1RangoDescanso) {
                setAlert({
                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesTimePickerCuadrante.inicio1RangoDescanso && !valuesTimePickerCuadrante.fin1RangoDescanso) {
                setAlert({
                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (!valuesTimePickerCuadrante.inicio2RangoDescanso && valuesTimePickerCuadrante.fin2RangoDescanso) {
                setAlert({
                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            if (valuesTimePickerCuadrante.inicio2RangoDescanso && !valuesTimePickerCuadrante.fin2RangoDescanso) {
                setAlert({
                    mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        case 'cantidad':
            if (valuesTimePickerCuadrante.cantidad === '') {
                setAlert({
                    mensaje: "No has introducido ningún dato horario para registrar.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
            break;
        default:
    }
};


{
    !esInicio ? (
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <FormControl
                className={classes.form}>
                <Button
                    fullWidth
                    variant="contained"
                    color='primary'
                    startIcon={<HomeIcon />}
                    onClick={goToInicioCuadrantes}
                >
                    Inicio cuadrantes
                </Button>
            </FormControl>
            <FormControl
                className={classes.form}>
                <Button
                    fullWidth
                    variant="contained"
                    color='primary'
                    disabled={cuadranteRegistrado === 'si' ? disabledItemBotonActualizar : disabledItemBotonRegistrar}
                    startIcon={cuadranteRegistrado === 'si' ? <SystemUpdateAltIcon /> : <SaveIcon />}
                    onClick={procesarDatosCuadrante}
                >
                    {cuadranteRegistrado === 'si' ? 'Actualizar cuadrante' : 'Registrar cuadrante'}
                </Button>
            </FormControl>
            <FormControl
                className={classes.form}>
                <Button
                    fullWidth
                    variant="contained"
                    className={classes.btnError}
                    disabled={disabledItemBotonResetear}
                    startIcon={<DeleteIcon />}
                    onClick={handleClickOpenDialogCuadrantes1}
                >
                    Resetear cuadrante
                </Button>
            </FormControl>
        </Box>) : null
}


const handleChangeEstadoTrabajador = (index, tipoTrabajador, idTrabajador) => (e) => {

    setEsInicioTra(false);
    setEsInicioSup(false);
    setStateTrabajador({ ...stateTrabajador, [e.target.name]: e.target.checked });
    if (tipoTrabajador === 'trabajador') {
        const posicionTrabajador = trabajadoresEnCuadrante.indexOf(trabajadoresEnCuadrante.find(trabajador => trabajador.id === idTrabajador));
        gestionaColumnaCuadrante(trabajadoresEnCuadrante[posicionTrabajador], 'suplente', true, index);
        const arrayTr = [...trabajadoresEnCuadrante];
        arrayTr.splice(posicionTrabajador, 1);
        const arraySu = [...suplentesEnCuadrante];
        arraySu.push(trabajadoresEnCuadrante[posicionTrabajador]);
        setTrabajadoresEnCuadrante(arrayTr);
        setSuplentesEnCuadrante(arraySu);

    } else {
        const posicionSuplente = suplentesEnCuadrante.indexOf(suplentesEnCuadrante.find(suplente => suplente.id === idTrabajador));
        gestionaColumnaCuadrante(suplentesEnCuadrante[posicionSuplente], 'trabajador', true, index);
        const arraySu = [...suplentesEnCuadrante];
        arraySu.splice(posicionSuplente, 1);
        const arrayTr = [...trabajadoresEnCuadrante];
        arrayTr.push(suplentesEnCuadrante[posicionSuplente]);
        setTrabajadoresEnCuadrante(arrayTr);
        setSuplentesEnCuadrante(arraySu);
    };
    if (cuadranteRegistrado === 'si') {
        dispatch(activarDesactivarCambioBotonActualizarAccion(false));
    };
    dispatch(registrarIntervencionAccion(false));
};

const gestionaDisabledSwitcherTrabajadores = (index, trabajadorTipo) => {
    if (index === 0 || !trabajadorTipo || cuadrante[index - 1].tipoTrabajador === 'suplente') {
        return true;
    } else {
        return false;
    }
};

if ((tipoTrabajador === 'suplente' &&
    cuadrante[posicionAnterior].tipoTrabajador === 'trabajador' &&
    cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
    (tipoTrabajador === 'suplente' &&
        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
        cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango) ||
    (tipoTrabajador === 'suplente' &&
        cuadrante[posicionAnterior].tipoTrabajador === 'suplente' &&
        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].lunesInicioRango &&
        !cuadrante[posicionAnterior][dia[1][0] + dia[0][0]].hayBaja)) {
    columnaAnadir[dia[1][0] + dia[0][0]] = {
        lunesInicioRango: null,
        lunesFinRango: null,
        baja: false,
        tipoBaja: null,
        festivo: false,
        observaciones: '',
        modificado: false
    };
};
if (tipoTrabajador === 'trabajador') {
    columnaAnadir[dia[1][0] + dia[0][0]] = {
        lunesInicioRango: centroAGestionar.horario.lunesInicioRango,
        lunesFinRango: centroAGestionar.horario.lunesFinRango,
        baja: false,
        tipoBaja: null,
        festivo: false,
        observaciones: '',
        modificado: false
    };
};

<FormControl
    className={classes.form}>
    <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={onEstem === 'editarCentros' ? (disabledItemActualizacionCentro) : (disabledItemRegistroCentro)}
        startIcon={onEstem === 'editarCentros' ? <SystemUpdateAltIcon /> : <SaveIcon />}
        onClick={onEstem === 'editarCentros' ? (procesarDatosEdicionParent) : (procesarDatosRegistroParent)}
    >
        {onEstem === 'editarCentros' ? ('Actualizar centro') : ('Registrar centro')}
    </Button>
</FormControl>
{
    onEstem === 'editarCentros' ? (
        <FormControl
            className={classes.form}>
            <Button
                fullWidth
                variant="contained"
                className={classes.btnError}
                disabled={disabledItem}
                startIcon={<DeleteIcon />}
                onClick={eliminarCentroParent}
            >
                Eliminar Centro
            </Button>
        </FormControl>
    ) : (
        <FormControl
            className={classes.form}>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                disabled={disabledItemNuevoCentro}
                startIcon={<NoteAddIcon />}
                onClick={nuevoCentroParent}
            >
                Nuevo Centro
            </Button>
        </FormControl>
    )
}

<FormControl
    className={classes.form}>
    <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={onEstem === 'editarTrabajadores' ? (disabledItemActualizacionTrabajador) : (disabledItemRegistroTrabajador)}
        startIcon={onEstem === 'editarTrabajadores' ? <SystemUpdateAltIcon /> : <SaveIcon />}
        onClick={onEstem === 'editarTrabajadores' ? (procesarDatosEdicionParent) : (procesarDatosRegistroParent)}
    >
        {onEstem === 'editarTrabajadores' ? ('Actualizar trabajador') : ('Registrar trabajador')}
    </Button>
</FormControl>
{
    onEstem === 'editarTrabajadores' ? (
        <FormControl
            className={classes.form}>
            <Button
                fullWidth
                variant="contained"
                className={classes.btnError}
                disabled={disabledItem}
                startIcon={<DeleteIcon />}
                onClick={eliminarTrabajadorParent}
            >
                Eliminar trabajador
            </Button>
        </FormControl>
    ) : (
    <FormControl
        className={classes.form}>
        <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={disabledItemNuevoTrabajador}
            startIcon={<GroupAddIcon />}
            onClick={nuevoTrabajadorParent}
        >
            Nuevo trabajador
        </Button>
    </FormControl>
)
}