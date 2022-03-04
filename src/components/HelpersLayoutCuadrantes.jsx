import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import TimerIcon from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { withStyles } from '@material-ui/core/styles';

//importaciones acciones
import { generaFechaAccion } from '../redux/appDucks';

//estilos
import Clases from "../clases";

const variaciones = Constantes.VARIACIONES_CUADRANTES;

//tooltip
const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#66bb6a',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5),
    },
}))(Tooltip);
const LightTooltipInactivo = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#ffcdd2',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5),
    },
}))(Tooltip);

const HelpersLayoutCuadrantes = () => {
    const classes = Clases();
    const dispatch = useDispatch();
    const stateFestivo = useSelector(store => store.variablesCuadrantes.stateFestivo);

    const gestionaTextoCasillasServiciosFijosAccion = (indexDia, precio) => {
        if (stateFestivo['estadoFestivoDia' + (indexDia)]) {
            return 'Día festivo';
        } else {
            if (precio) {
                return precio + ' €';
            } else {
                return precio;
            };
        };
    };

    const gestionaTextoCasillasAccion = (indexDia, dia, columna, diaSemana) => {
        if (columna[dia].baja) {
            switch (columna[dia].tipoBaja) {
                case 'baja':
                    return 'Trabajador de baja';
                case 'vacaciones':
                    return 'Trabajador de vacaciones';
                case 'excedencia':
                    return 'Trabajador en excedencia';
                case 'personales':
                    return 'Ausencia motivos personales';
                default:
            }
        } else if (stateFestivo['estadoFestivoDia' + (indexDia)]) {
            return 'Día festivo'
        } else {
            switch (columna.tipoHorario) {
                case 'rango':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (columna[dia].lunesInicioRango && columna[dia].lunesFinRango) {
                                return 'De ' + columna[dia].lunesInicioRango + ' a ' + columna[dia].lunesFinRango;
                            } else {
                                return '';
                            };
                        case 'Martes':
                            if (columna[dia].martesInicioRango && columna[dia].martesFinRango) {
                                return 'De ' + columna[dia].martesInicioRango + ' a ' + columna[dia].martesFinRango;
                            } else {
                                return '';
                            };
                        case 'Miércoles':
                            if (columna[dia].miercolesInicioRango && columna[dia].miercolesFinRango) {
                                return 'De ' + columna[dia].miercolesInicioRango + ' a ' + columna[dia].miercolesFinRango;
                            } else {
                                return '';
                            };
                        case 'Jueves':
                            if (columna[dia].juevesInicioRango && columna[dia].juevesFinRango) {
                                return 'De ' + columna[dia].juevesInicioRango + ' a ' + columna[dia].juevesFinRango;
                            } else {
                                return '';
                            };
                        case 'Viernes':
                            if (columna[dia].viernesInicioRango && columna[dia].viernesFinRango) {
                                return 'De ' + columna[dia].viernesInicioRango + ' a ' + columna[dia].viernesFinRango;
                            } else {
                                return '';
                            };
                        case 'Sábado':
                            if (columna[dia].sabadoInicioRango && columna[dia].sabadoFinRango) {
                                return 'De ' + columna[dia].sabadoInicioRango + ' a ' + columna[dia].sabadoFinRango;
                            } else {
                                return '';
                            };
                        case 'Domingo':
                            if (columna[dia].domingoInicioRango && columna[dia].domingoFinRango) {
                                return 'De ' + columna[dia].domingoInicioRango + ' a ' + columna[dia].domingoFinRango;
                            } else {
                                return '';
                            };
                        default:
                    }
                    break;
                case 'rangoDescanso':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (columna[dia].lunesInicio1RangoDescanso && columna[dia].lunesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].lunesInicio2RangoDescanso && columna[dia].lunesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].lunesInicio2RangoDescanso + ' a ' + columna[dia].lunesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].lunesInicio1RangoDescanso + ' a ' + columna[dia].lunesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Martes':
                            if (columna[dia].martesInicio1RangoDescanso && columna[dia].martesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].martesInicio2RangoDescanso && columna[dia].martesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].martesInicio2RangoDescanso + ' a ' + columna[dia].martesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].martesInicio1RangoDescanso + ' a ' + columna[dia].martesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Miércoles':
                            if (columna[dia].miercolesInicio1RangoDescanso && columna[dia].miercolesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].miercolesInicio2RangoDescanso && columna[dia].miercolesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].miercolesInicio2RangoDescanso + ' a ' + columna[dia].miercolesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].miercolesInicio1RangoDescanso + ' a ' + columna[dia].miercolesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Jueves':
                            if (columna[dia].juevesInicio1RangoDescanso && columna[dia].juevesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].juevesInicio2RangoDescanso && columna[dia].juevesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].juevesInicio2RangoDescanso + ' a ' + columna[dia].juevesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].juevesInicio1RangoDescanso + ' a ' + columna[dia].juevesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Viernes':
                            if (columna[dia].viernesInicio1RangoDescanso && columna[dia].viernesFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].viernesInicio2RangoDescanso && columna[dia].viernesFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].viernesInicio2RangoDescanso + ' a ' + columna[dia].viernesFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].viernesInicio1RangoDescanso + ' a ' + columna[dia].viernesFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Sábado':
                            if (columna[dia].sabadoInicio1RangoDescanso && columna[dia].sabadoFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].sabadoInicio2RangoDescanso && columna[dia].sabadoFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].sabadoInicio2RangoDescanso + ' a ' + columna[dia].sabadoFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].sabadoInicio1RangoDescanso + ' a ' + columna[dia].sabadoFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        case 'Domingo':
                            if (columna[dia].domingoInicio1RangoDescanso && columna[dia].domingoFin1RangoDescanso) {
                                let subRetorno;
                                if (columna[dia].domingoInicio2RangoDescanso && columna[dia].domingoFin2RangoDescanso) {
                                    subRetorno = ' y de ' + columna[dia].domingoInicio2RangoDescanso + ' a ' + columna[dia].domingoFin2RangoDescanso;
                                } else {
                                    subRetorno = ''
                                }
                                return 'De ' + columna[dia].domingoInicio1RangoDescanso + ' a ' + columna[dia].domingoFin1RangoDescanso + subRetorno;
                            } else {
                                return '';
                            };
                        default:
                    }
                    break;
                case 'cantidad':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (columna[dia].lunesCantidad) {
                                return parseFloat(columna[dia].lunesCantidad / 60).toFixed(2) + ' horas';
                            } else {
                                return '';
                            };
                        case 'Martes':
                            if (columna[dia].martesCantidad) {
                                return parseFloat(columna[dia].martesCantidad / 60).toFixed(2) + ' horas';
                            } else {
                                return '';
                            };
                        case 'Miércoles':
                            if (columna[dia].miercolesCantidad) {
                                return parseFloat(columna[dia].miercolesCantidad / 60).toFixed(2) + ' horas';
                            } else {
                                return '';
                            };
                        case 'Jueves':
                            if (columna[dia].juevesCantidad) {
                                return parseFloat(columna[dia].juevesCantidad / 60).toFixed(2) + ' horas';
                            } else {
                                return '';
                            };
                        case 'Viernes':
                            if (columna[dia].viernesCantidad) {
                                return parseFloat(columna[dia].viernesCantidad / 60).toFixed(2) + ' horas';
                            } else {
                                return '';
                            };
                        case 'Sábado':
                            if (columna[dia].sabadoCantidad) {
                                return parseFloat(columna[dia].sabadoCantidad / 60).toFixed(2) + ' horas';
                            } else {
                                return '';
                            };
                        case 'Domingo':
                            if (columna[dia].domingoCantidad) {
                                return parseFloat(columna[dia].domingoCantidad / 60).toFixed(2) + ' horas';
                            } else {
                                return '';
                            };
                        default:
                    }
                    break;
                default:
            }
        }
    };

    const gestionaClassesColoresGeneralAccion = (dia, trabajadorDiaDeBaja, modificado, nombreTrabajador) => {
        if (trabajadorDiaDeBaja) {
            return classes.casillaBaja;
        } else {
            if (stateFestivo['estadoFestivoDia' + (dia)]) {
                return classes.casillaFestivo;
            } else {
                if (modificado) {
                    return classes.casillaModificado;
                } else {
                    if (nombreTrabajador) {
                        return classes.casillaLaboral;
                    } else {
                        return classes.casillaDisabled;
                    }
                }
            };
        }
    };

    const gestionaClassesColoresServiciosFijosAccion = (dia, hayServicio) => {
        if (stateFestivo['estadoFestivoDia' + (dia)]) {
            return classes.casillaFestivo;
        } else {
            if (hayServicio) {
                return classes.casillaSF;
            } else {
                return classes.casillaVaciaSF;
            };
        }
    };

    const gestionaClassesColoresTrabajadoresAccion = (trabajadorTipo) => {
        if (trabajadorTipo === 'trabajador' || !trabajadorTipo) {
            return classes.trabajador;
        } else {
            return classes.suplente;
        }
    };

    const retornaIconoTipoServicioAccion = (tipo) => {
        switch (tipo) {
            case 'LIM':
                return (
                    <Tooltip title="Servicio de limpieza" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ1, classes.small2)}>L</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIME':
                return (
                    <Tooltip title="Servicio de limpieza especial" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ2, classes.small2)}>E</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIMP':
                return (
                    <Tooltip title="Limpieza de limpieza del párking" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ3, classes.small2)}>P</Avatar>
                    </Tooltip>
                )
                break;
            case 'NAVE2':
                return (
                    <Tooltip title="Limpieza de limpieza de nave 2" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ4, classes.small2)}>N</Avatar>
                    </Tooltip>
                )
                break;
            case 'REFZ':
                return (
                    <Tooltip title="Servicio de limpieza de refuerzo" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ5, classes.small2)}>R</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIM1':
                return (
                    <Tooltip title="Servicio de limpieza 1" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ6, classes.small2)}>1</Avatar>
                    </Tooltip>
                )
                break;
            case 'LIM2':
                return (
                    <Tooltip title="Servicio de limpieza 2" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ6, classes.small2)}>2</Avatar>
                    </Tooltip>
                )
                break;
            case 'FEST':
                return (
                    <Tooltip title="Servicio de limpieza día festivo" placement="top-end" arrow>
                        <Avatar className={clsx(classes.tipoServ7, classes.small2)}>F</Avatar>
                    </Tooltip>
                )
                break;
            default:
        }
    };

    const retornaIconoVariacionAccion = (columna, postRef, diaSemana) => {
        const aRetornarIcono =
            <Tooltip title={variaciones[columna[postRef].tipoVariacion - 1].label} placement="top-end" arrow >
                <TimerIcon
                    className={classes.gris}
                    style={{ marginLeft: 3 }}
                />
            </Tooltip>;
        switch (columna.tipoHorario) {
            case 'rango':
                switch (diaSemana) {
                    case 'Lunes':
                        if (columna[postRef].lunesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Martes':
                        if (columna[postRef].martesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Miércoles':
                        if (columna[postRef].miercolesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Jueves':
                        if (columna[postRef].juevesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Viernes':
                        if (columna[postRef].viernesInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Sábado':
                        if (columna[postRef].sabadoInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Domingo':
                        if (columna[postRef].domingoInicioRango) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    default:
                }
                break;
            case 'rangoDescanso':
                switch (diaSemana) {
                    case 'Lunes':
                        if (columna[postRef].lunesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Martes':
                        if (columna[postRef].martesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Miércoles':
                        if (columna[postRef].miercolesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Jueves':
                        if (columna[postRef].juevesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Viernes':
                        if (columna[postRef].viernesInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Sábado':
                        if (columna[postRef].sabadoInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Domingo':
                        if (columna[postRef].domingoInicio1RangoDescanso) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    default:
                }
                break;
            case 'cantidad':
                switch (diaSemana) {
                    case 'Lunes':
                        if (columna[postRef].lunesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Martes':
                        if (columna[postRef].martesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Miércoles':
                        if (columna[postRef].miercolesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Jueves':
                        if (columna[postRef].juevesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Viernes':
                        if (columna[postRef].viernesCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Sábado':
                        if (columna[postRef].sabadoCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    case 'Domingo':
                        if (columna[postRef].domingoCantidad) {
                            return aRetornarIcono;
                        } else {
                            return '';
                        };
                    default:
                }
                break;
            default:
        }
    };

    const gestionaValoresCasillasAccion = (indexDia, dia, columna, diaSemana, casilla) => {
        if (columna[dia].baja || stateFestivo['estadoFestivoDia' + (indexDia - 1)]) {
            if (columna.tipoHorario === 'cantidad') {
                return '';
            } else {
                return null;
            }
        } else {
            switch (columna.tipoHorario) {
                case 'rango':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (casilla === 1) {
                                return columna[dia].lunesInicioRango ? dispatch(generaFechaAccion(columna[dia].lunesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].lunesFinRango ? dispatch(generaFechaAccion(columna[dia].lunesFinRango)) : null;
                            }
                        case 'Martes':
                            if (casilla === 1) {
                                return columna[dia].martesInicioRango ? dispatch(generaFechaAccion(columna[dia].martesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].martesFinRango ? dispatch(generaFechaAccion(columna[dia].martesFinRango)) : null;
                            }
                        case 'Miércoles':
                            if (casilla === 1) {
                                return columna[dia].miercolesInicioRango ? dispatch(generaFechaAccion(columna[dia].miercolesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].miercolesFinRango ? dispatch(generaFechaAccion(columna[dia].miercolesFinRango)) : null;
                            }
                        case 'Jueves':
                            if (casilla === 1) {
                                return columna[dia].juevesInicioRango ? dispatch(generaFechaAccion(columna[dia].juevesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].juevesFinRango ? dispatch(generaFechaAccion(columna[dia].juevesFinRango)) : null;
                            }
                        case 'Viernes':
                            if (casilla === 1) {
                                return columna[dia].viernesInicioRango ? dispatch(generaFechaAccion(columna[dia].viernesInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].viernesFinRango ? dispatch(generaFechaAccion(columna[dia].viernesFinRango)) : null;
                            }
                        case 'Sábado':
                            if (casilla === 1) {
                                return columna[dia].sabadoInicioRango ? dispatch(generaFechaAccion(columna[dia].sabadoInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].sabadoFinRango ? dispatch(generaFechaAccion(columna[dia].sabadoFinRango)) : null;
                            }
                        case 'Domingo':
                            if (casilla === 1) {
                                return columna[dia].domingoInicioRango ? dispatch(generaFechaAccion(columna[dia].domingoInicioRango)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].domingoFinRango ? dispatch(generaFechaAccion(columna[dia].domingoFinRango)) : null;
                            }
                        default:
                    }
                    break;
                case 'rangoDescanso':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (casilla === 1) {
                                return columna[dia].lunesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].lunesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].lunesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].lunesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].lunesFin2RangoDescanso)) : null;
                            }
                        case 'Martes':
                            if (casilla === 1) {
                                return columna[dia].martesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].martesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].martesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].martesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].martesFin2RangoDescanso)) : null;
                            }
                        case 'Miércoles':
                            if (casilla === 1) {
                                return columna[dia].miercolesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].miercolesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].miercolesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].miercolesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].miercolesFin2RangoDescanso)) : null;
                            }
                        case 'Jueves':
                            if (casilla === 1) {
                                return columna[dia].juevesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].juevesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].juevesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].juevesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].juevesFin2RangoDescanso)) : null;
                            }
                        case 'Viernes':
                            if (casilla === 1) {
                                return columna[dia].viernesInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].viernesFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].viernesInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].viernesFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].viernesFin2RangoDescanso)) : null;
                            }
                        case 'Sábado':
                            if (casilla === 1) {
                                return columna[dia].sabadoInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].sabadoFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].sabadoInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].sabadoFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].sabadoFin2RangoDescanso)) : null;
                            }
                        case 'Domingo':
                            if (casilla === 1) {
                                return columna[dia].domingoInicio1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoInicio1RangoDescanso)) : null;
                            }
                            if (casilla === 2) {
                                return columna[dia].domingoFin1RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoFin1RangoDescanso)) : null;
                            }
                            if (casilla === 3) {
                                return columna[dia].domingoInicio2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoInicio2RangoDescanso)) : null;
                            }
                            if (casilla === 4) {
                                return columna[dia].domingoFin2RangoDescanso ? dispatch(generaFechaAccion(columna[dia].domingoFin2RangoDescanso)) : null;
                            }
                        default:
                    }
                    break;
                case 'cantidad':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (casilla === 1) {
                                return columna[dia].lunesCantidad ? columna[dia].lunesCantidad : '';
                            }
                        case 'Martes':
                            if (casilla === 1) {
                                return columna[dia].martesCantidad ? columna[dia].martesCantidad : '';
                            }
                        case 'Miércoles':
                            if (casilla === 1) {
                                return columna[dia].miercolesCantidad ? columna[dia].miercolesCantidad : '';
                            }
                        case 'Jueves':
                            if (casilla === 1) {
                                return columna[dia].juevesCantidad ? columna[dia].juevesCantidad : '';
                            }
                        case 'Viernes':
                            if (casilla === 1) {
                                return columna[dia].viernesCantidad ? columna[dia].viernesCantidad : '';
                            }
                        case 'Sábado':
                            if (casilla === 1) {
                                return columna[dia].sabadoCantidad ? columna[dia].sabadoCantidad : '';
                            }
                        case 'Domingo':
                            if (casilla === 1) {
                                return columna[dia].domingoCantidad ? columna[dia].domingoCantidad : '';
                            }
                        default:
                    }
                    break;
                default:
            }
        }
    };

    const gestionaCabeceraServiciosFijos = (tipo) => {
        switch (tipo) {
            case 'TOL':
                return 'L. Toldos'
                break;
            case 'CRIS':
                return 'L. Cristales'
                break;
            case 'CRISE':
                return 'L. Cristales E'
                break;
            case 'CRISI':
                return 'L. Cristales I'
                break;
            case 'MOQ':
                return 'L. Moqueta'
                break;
            case 'OF':
                return 'L. Oficinas'
                break;
            case 'ALMC':
                return 'L. Almacenes'
                break;
            case 'LAB':
                return 'L. Laboratorio'
                break;
            case 'TELÑ':
                return 'L. Telarañas'
                break;
            case 'FCH.IN':
                return 'L. Fachada Int.'
                break;
            case 'FCH.EX':
                return 'L. Fachada Ext.'
                break;
            case 'ABRLL':
                return 'L. Abrillantado'
                break;
            case 'MANT':
                return 'M. Máquina'
                break;
            case 'PORT':
                return 'L. Portería'
                break;
            case 'BACT':
                return 'Bot. Noubact'
                break;
            case 'FEST':
                return 'L. Día festivo'
                break;
            case 'CRTRIM':
                return 'Crist. Trim.'
                break;
            case 'CRBIM':
                return 'Crist. Bim.'
                break;
            case 'LIME':
                return 'L. Especial'
                break;
            case 'LIMP':
                return 'L. Párking.'
                break;
            default:
        };
    };

    const retornaHeaderServiciosFijosAccion = (servicio, index, ancho) => {
        if (servicio.activo_TO === 'si' ||
            servicio.activo_CR === 'si' ||
            servicio.activo_CE === 'si' ||
            servicio.activo_CI === 'si' ||
            servicio.activo_MO === 'si' ||
            servicio.activo_OF === 'si' ||
            servicio.activo_AL === 'si' ||
            servicio.activo_LA === 'si' ||
            servicio.activo_TE === 'si' ||
            servicio.activo_FI === 'si' ||
            servicio.activo_FE === 'si' ||
            servicio.activo_AB === 'si' ||
            servicio.activo_MA === 'si' ||
            servicio.activo_PO === 'si' ||
            servicio.activo_BA === 'si' ||
            servicio.activo_FT === 'si' ||
            servicio.activo_C3 === 'si' ||
            servicio.activo_C2 === 'si' ||
            servicio.activo_ES === 'si' ||
            servicio.activo_PA === 'si') {
            return (
                <Box
                    p={1.5}
                    mx={0.3}
                    key={'cabeceraServicios' + index}
                    className={clsx(classes.cabeceraServicios, classes.inicio)}
                    color="secondary.contrastText"
                    style={{ minHeight: 38, maxHeight: 38, padding: 9, width: ancho }}
                >
                    <Typography variant="body2">{gestionaCabeceraServiciosFijos(servicio.tipoServiciofijo)}</Typography>
                </Box>
            )
        };
    };

    const retornoServiciosFijosEnLayoutAccion = (elemento, losServiciosFijos) => {
        let hayServicios;
        if (losServiciosFijos.precioHora_TO ||
            losServiciosFijos.precioHora_CR ||
            losServiciosFijos.precioHora_CE ||
            losServiciosFijos.precioHora_CI ||
            losServiciosFijos.precioHora_MO ||
            losServiciosFijos.precioHora_OF ||
            losServiciosFijos.precioHora_AL ||
            losServiciosFijos.precioHora_LA ||
            losServiciosFijos.precioHora_TE ||
            losServiciosFijos.precioHora_FI ||
            losServiciosFijos.precioHora_FE ||
            losServiciosFijos.precioHora_AB ||
            losServiciosFijos.precioHora_MA ||
            losServiciosFijos.precioHora_PO ||
            losServiciosFijos.precioHora_BA ||
            losServiciosFijos.precioHora_FT ||
            losServiciosFijos.precioHora_C3 ||
            losServiciosFijos.precioHora_C2 ||
            losServiciosFijos.precioHora_ES ||
            losServiciosFijos.precioHora_PA) {
            hayServicios = true;
        };
        if (elemento === 'grid') {
            if (hayServicios) {
                return (classes.conServicios)
            } else {
                return (classes.sinServicios)
            };
        };
        if (elemento === 'avatar') {
            if (hayServicios) {
                return (clsx(classes.conServiciosA, classes.small))
            } else {
                return (clsx(classes.sinServiciosA, classes.small))
            };
        };
        if (elemento === 'icon') {
            if (hayServicios) {
                return (<NotificationsIcon />)
            } else {
                return (<NotificationsOffIcon />)
            };
        };
        if (elemento === 'tooltip') {
            if (hayServicios) {
                return ('Cuadrante con servicios extra')
            } else {
                return ('Cuadrante sin servicios extra')
            };
        };
    };

    const retornaServiciosFijosEnLayoutAvatarsAccion = (servicio, index) => {
        let laClase, elTooltip, laLetra, elAnadidoTooltip, hayBaja;
        if (servicio.precioHora_TO) {
            laClase = servicio.activo_TO === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza de toldos: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_TO === 'si' ? '' : ' (Inactivo)';
            laLetra = 'TO';
            hayBaja = servicio.activo_TO === 'no' ? true : false;
        };
        if (servicio.precioHora_CR) {
            laClase = servicio.activo_CR === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza de cristales: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_CR === 'si' ? '' : ' (Inactivo)';
            laLetra = 'CR';
            hayBaja = servicio.activo_CR === 'no' ? true : false;
        };
        if (servicio.precioHora_CE) {
            laClase = servicio.activo_CE === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Limpieza cristales exteriores: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_CE === 'si' ? '' : ' (Inactivo)';
            laLetra = 'CE';
            hayBaja = servicio.activo_CE === 'no' ? true : false;
        };
        if (servicio.precioHora_CI) {
            laClase = servicio.activo_CI === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Limpieza cristales interiores: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_CI === 'si' ? '' : ' (Inactivo)';
            laLetra = 'CI';
            hayBaja = servicio.activo_CI === 'no' ? true : false;
        };
        if (servicio.precioHora_MO) {
            laClase = servicio.activo_MO === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza moqueta: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_MO === 'si' ? '' : ' (Inactivo)';
            laLetra = 'MO';
            hayBaja = servicio.activo_MO === 'no' ? true : false;
        };
        if (servicio.precioHora_OF) {
            laClase = servicio.activo_OF === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza oficinas: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_OF === 'si' ? '' : ' (Inactivo)';
            laLetra = 'OF';
            hayBaja = servicio.activo_OF === 'no' ? true : false;
        };
        if (servicio.precioHora_AL) {
            laClase = servicio.activo_AL === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza almacenes: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_AL === 'si' ? '' : ' (Inactivo)';
            laLetra = 'AL';
            hayBaja = servicio.activo_AL === 'no' ? true : false;
        };
        if (servicio.precioHora_LA) {
            laClase = servicio.activo_LA === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza laboratorio: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_LA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'LA';
            hayBaja = servicio.activo_LA === 'no' ? true : false;
        };
        if (servicio.precioHora_TE) {
            laClase = servicio.activo_TE === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza telarañas: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_TE === 'si' ? '' : ' (Inactivo)';
            laLetra = 'TE';
            hayBaja = servicio.activo_TE === 'no' ? true : false;
        };
        if (servicio.precioHora_FI) {
            laClase = servicio.activo_FI === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza fachada interior: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_FI === 'si' ? '' : ' (Inactivo)';
            laLetra = 'FI';
            hayBaja = servicio.activo_FI === 'no' ? true : false;
        };
        if (servicio.precioHora_FE) {
            laClase = servicio.activo_FE === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza fachada exterior: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_FE === 'si' ? '' : ' (Inactivo)';
            laLetra = 'FE';
            hayBaja = servicio.activo_FE === 'no' ? true : false;
        };
        if (servicio.precioHora_AB) {
            laClase = servicio.activo_AB === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza abrillantado: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_AB === 'si' ? '' : ' (Inactivo)';
            laLetra = 'AB';
            hayBaja = servicio.activo_AB === 'no' ? true : false;
        };
        if (servicio.precioHora_MA) {
            laClase = servicio.activo_MA === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de mantenimiento máquina: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_MA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'MA';
            hayBaja = servicio.activo_MA === 'no' ? true : false;
        };
        if (servicio.precioHora_PO) {
            laClase = servicio.activo_PO === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza portería: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_PO === 'si' ? '' : ' (Inactivo)';
            laLetra = 'PO';
            hayBaja = servicio.activo_PO === 'no' ? true : false;
        };
        if (servicio.precioHora_BA) {
            laClase = servicio.activo_BA === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Bot. Noubact: ' + servicio.precioHora_BA + ' €';
            elAnadidoTooltip = servicio.activo_BA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'BA';
            hayBaja = servicio.activo_BA === 'no' ? true : false;
        };
        if (servicio.precioHora_FT) {
            laClase = servicio.activo_FT === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio de limpieza día festivo: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_FT === 'si' ? '' : ' (Inactivo)';
            laLetra = 'FT';
            hayBaja = servicio.activo_FT === 'no' ? true : false;
        };
        if (servicio.precioHora_C3) {
            laClase = servicio.activo_C3 === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Limpieza de cristales trimestral: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_C3 === 'si' ? '' : ' (Inactivo)';
            laLetra = 'C3';
            hayBaja = servicio.activo_C3 === 'no' ? true : false;
        };
        if (servicio.precioHora_C2) {
            laClase = servicio.activo_C2 === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Limpieza de cristales bimensual: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_C2 === 'si' ? '' : ' (Inactivo)';
            laLetra = 'C2';
            hayBaja = servicio.activo_C2 === 'no' ? true : false;
        };
        if (servicio.precioHora_ES) {
            laClase = servicio.activo_ES === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio limpieza especial: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_ES === 'si' ? '' : ' (Inactivo)';
            laLetra = 'ES';
            hayBaja = servicio.activo_ES === 'no' ? true : false;
        };
        if (servicio.precioHora_PA) {
            laClase = servicio.activo_PA === 'si' ? (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = 'Servicio limpieza de párking: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_PA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'PA';
            hayBaja = servicio.activo_PA === 'no' ? true : false;
        };

        return (
            <Box style={{ paddingTop: 5 }} key={'avatar' + index}>
                {hayBaja ? (
                    <LightTooltipInactivo title={elTooltip + elAnadidoTooltip} placement="right">
                        <Avatar variant="square" className={laClase}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltipInactivo>
                ) : (
                    <LightTooltip title={elTooltip + elAnadidoTooltip} placement="right">
                        <Avatar variant="square" className={laClase}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltip>
                )}
            </Box>
        )
    };

    return {
        gestionaTextoCasillasServiciosFijosAccion,
        gestionaTextoCasillasAccion,
        gestionaClassesColoresGeneralAccion,
        gestionaClassesColoresServiciosFijosAccion,
        gestionaClassesColoresTrabajadoresAccion,
        retornaIconoTipoServicioAccion,
        retornaIconoVariacionAccion,
        gestionaValoresCasillasAccion,
        retornaHeaderServiciosFijosAccion,
        retornoServiciosFijosEnLayoutAccion,
        retornaServiciosFijosEnLayoutAvatarsAccion
    }
}

export default HelpersLayoutCuadrantes