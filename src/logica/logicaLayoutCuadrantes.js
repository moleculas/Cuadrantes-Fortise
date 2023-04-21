import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import clsx from 'clsx';
import {
    Box,
    Typography,
    Avatar,
    Tooltip
} from '@material-ui/core';
import {
    Timer as TimerIcon,
    Notifications as NotificationsIcon,
    NotificationsOff as NotificationsOffIcon
} from '@material-ui/icons';

//importaciones acciones
import {
    generaFechaAccion,
    obtenerObjetoPorIdAccion
} from '../redux/appDucks';
import {
    IsNumeric,
    LightTooltip,
    LightTooltipFest,
    LightTooltipInt,
    LightTooltipInactivo
} from './logicaApp';

//estilos
import Clases from "../clases";

//constantes
const {
    TIPO_SERVICIO_FIJO: tiposServicioFijo,
    VARIACIONES_CUADRANTES: variaciones
} = Constantes;

function LogicaLayoutCuadrantes() {
    const classes = Clases();
    const dispatch = useDispatch();
    const stateFestivo = useSelector(store => store.variablesCuadrantes.stateFestivo);
    const firmaActualizacion = useSelector(store => store.variablesCuadrantesSetters.firmaActualizacion);
    const objetoCentro = useSelector(store => store.variablesCentros.objetoCentro);
    const objetoCuadrante = useSelector(store => store.variablesCuadrantes.objetoCuadrante);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const arrayTrabajadoresSubcategoria = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresSubcategoria);

    const gestionaTextoCasillasServiciosFijosAccion = (indexDia, trab, activo) => {
        let textoSF = '';
        if (activo) {
            if (trab) {
                let nombreTrabajador = dispatch(obtenerObjetoPorIdAccion(arrayTrabajadoresSubcategoria, trab));
                const longitudTrunc = 20;
                if (nombreTrabajador.length >= longitudTrunc) {
                    textoSF = nombreTrabajador.substring(0, longitudTrunc) + "…";
                } else {
                    textoSF = nombreTrabajador;
                };
            } else {
                textoSF = 'Sin trabajador';
            };
        };
        if (stateFestivo['estadoFestivoDia' + (indexDia)]) {
            if (stateFestivo['tipoFestivoDia' + (indexDia)] === 1) {
                return 'Día festivo'
            };
            if (stateFestivo['tipoFestivoDia' + (indexDia)] === 2) {
                return 'Cierre centro'
            };
            if (stateFestivo['tipoFestivoDia' + (indexDia)] === 3) {
                return 'Cierre centro facturar'
            };
        } else {
            return textoSF;
        };
    };

    const gestionaTextoCasillasAccion = (indexDia, dia, columna, diaSemana) => {
        if (stateFestivo['estadoFestivoDia' + (indexDia)]) {
            if (stateFestivo['tipoFestivoDia' + (indexDia)] === 1) {
                return 'Día festivo'
            };
            if (stateFestivo['tipoFestivoDia' + (indexDia)] === 2) {
                return 'Cierre centro'
            };
            if (stateFestivo['tipoFestivoDia' + (indexDia)] === 3) {
                return 'Cierre centro facturar'
            };
        } else if (columna[dia].baja) {
            switch (columna[dia].tipoBaja) {
                case 'bajaIT':
                    return 'Baja IT'
                case 'bajaACCTE':
                    return 'Baja ACCTE'
                case 'bajaCIA':
                    return 'Baja CIA'
                case 'vacaciones':
                    return 'Vacaciones'
                case 'excedencia':
                    return 'Excedencia'
                case 'personales':
                    return 'Motivos personales'
                case 'permisoRET':
                    return 'Permiso RET'
                case 'ausenciaINJ':
                    return 'Ausencia INJ'
                default:
            };
        } else {
            let myDatoSplitted1, myDatoSplitted2, myDatoSplitted3, myDatoSplitted4;
            switch (columna.tipoHorario) {
                case 'rango':
                    switch (diaSemana) {
                        case 'Lunes':
                            if (columna[dia].lunesInicioRango && columna[dia].lunesFinRango) {
                                myDatoSplitted1 = columna[dia].lunesInicioRango.split(":");
                                myDatoSplitted2 = columna[dia].lunesFinRango.split(":");
                            };
                            if (columna[dia].lunesInicioRango && columna[dia].lunesFinRango && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                return 'De ' + columna[dia].lunesInicioRango + ' a ' + columna[dia].lunesFinRango;
                            } else {
                                return '';
                            };
                        case 'Martes':
                            if (columna[dia].martesInicioRango && columna[dia].martesFinRango) {
                                myDatoSplitted1 = columna[dia].martesInicioRango.split(":");
                                myDatoSplitted2 = columna[dia].martesFinRango.split(":");
                            };
                            if (columna[dia].martesInicioRango && columna[dia].martesFinRango && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                return 'De ' + columna[dia].martesInicioRango + ' a ' + columna[dia].martesFinRango;
                            } else {
                                return '';
                            };
                        case 'Miércoles':
                            if (columna[dia].miercolesInicioRango && columna[dia].miercolesFinRango) {
                                myDatoSplitted1 = columna[dia].miercolesInicioRango.split(":");
                                myDatoSplitted2 = columna[dia].miercolesFinRango.split(":");
                            };
                            if (columna[dia].miercolesInicioRango && columna[dia].miercolesFinRango && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                return 'De ' + columna[dia].miercolesInicioRango + ' a ' + columna[dia].miercolesFinRango;
                            } else {
                                return '';
                            };
                        case 'Jueves':
                            if (columna[dia].juevesInicioRango && columna[dia].juevesFinRango) {
                                myDatoSplitted1 = columna[dia].juevesInicioRango.split(":");
                                myDatoSplitted2 = columna[dia].juevesFinRango.split(":");
                            };
                            if (columna[dia].juevesInicioRango && columna[dia].juevesFinRango && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                return 'De ' + columna[dia].juevesInicioRango + ' a ' + columna[dia].juevesFinRango;
                            } else {
                                return '';
                            };
                        case 'Viernes':
                            if (columna[dia].viernesInicioRango && columna[dia].viernesFinRango) {
                                myDatoSplitted1 = columna[dia].viernesInicioRango.split(":");
                                myDatoSplitted2 = columna[dia].viernesFinRango.split(":");
                            };
                            if (columna[dia].viernesInicioRango && columna[dia].viernesFinRango && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                return 'De ' + columna[dia].viernesInicioRango + ' a ' + columna[dia].viernesFinRango;
                            } else {
                                return '';
                            };
                        case 'Sábado':
                            if (columna[dia].sabadoInicioRango && columna[dia].sabadoFinRango) {
                                myDatoSplitted1 = columna[dia].sabadoInicioRango.split(":");
                                myDatoSplitted2 = columna[dia].sabadoFinRango.split(":");
                            };
                            if (columna[dia].sabadoInicioRango && columna[dia].sabadoFinRango && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                return 'De ' + columna[dia].sabadoInicioRango + ' a ' + columna[dia].sabadoFinRango;
                            } else {
                                return '';
                            };
                        case 'Domingo':
                            if (columna[dia].domingoInicioRango && columna[dia].domingoFinRango) {
                                myDatoSplitted1 = columna[dia].domingoInicioRango.split(":");
                                myDatoSplitted2 = columna[dia].domingoFinRango.split(":");
                            };
                            if (columna[dia].domingoInicioRango && columna[dia].domingoFinRango && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
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
                                myDatoSplitted1 = columna[dia].lunesInicio1RangoDescanso.split(":");
                                myDatoSplitted2 = columna[dia].lunesFin1RangoDescanso.split(":");
                            };
                            if (columna[dia].lunesInicio2RangoDescanso && columna[dia].lunesFin2RangoDescanso) {
                                myDatoSplitted3 = columna[dia].lunesInicio2RangoDescanso.split(":");
                                myDatoSplitted4 = columna[dia].lunesFin2RangoDescanso.split(":");
                            };
                            if (columna[dia].lunesInicio1RangoDescanso && columna[dia].lunesFin1RangoDescanso && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                let subRetorno;
                                if (columna[dia].lunesInicio2RangoDescanso && columna[dia].lunesFin2RangoDescanso && IsNumeric(myDatoSplitted3[0]) && IsNumeric(myDatoSplitted4[0])) {
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
                                myDatoSplitted1 = columna[dia].martesInicio1RangoDescanso.split(":");
                                myDatoSplitted2 = columna[dia].martesFin1RangoDescanso.split(":");
                            };
                            if (columna[dia].martesInicio2RangoDescanso && columna[dia].martesFin2RangoDescanso) {
                                myDatoSplitted3 = columna[dia].martesInicio2RangoDescanso.split(":");
                                myDatoSplitted4 = columna[dia].martesFin2RangoDescanso.split(":");
                            };
                            if (columna[dia].martesInicio1RangoDescanso && columna[dia].martesFin1RangoDescanso && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                let subRetorno;
                                if (columna[dia].martesInicio2RangoDescanso && columna[dia].martesFin2RangoDescanso && IsNumeric(myDatoSplitted3[0]) && IsNumeric(myDatoSplitted4[0])) {
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
                                myDatoSplitted1 = columna[dia].miercolesInicio1RangoDescanso.split(":");
                                myDatoSplitted2 = columna[dia].miercolesFin1RangoDescanso.split(":");
                            };
                            if (columna[dia].miercolesInicio2RangoDescanso && columna[dia].miercolesFin2RangoDescanso) {
                                myDatoSplitted3 = columna[dia].miercolesInicio2RangoDescanso.split(":");
                                myDatoSplitted4 = columna[dia].miercolesFin2RangoDescanso.split(":");
                            };
                            if (columna[dia].miercolesInicio1RangoDescanso && columna[dia].miercolesFin1RangoDescanso && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                let subRetorno;
                                if (columna[dia].miercolesInicio2RangoDescanso && columna[dia].miercolesFin2RangoDescanso && IsNumeric(myDatoSplitted3[0]) && IsNumeric(myDatoSplitted4[0])) {
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
                                myDatoSplitted1 = columna[dia].juevesInicio1RangoDescanso.split(":");
                                myDatoSplitted2 = columna[dia].juevesFin1RangoDescanso.split(":");
                            };
                            if (columna[dia].juevesInicio2RangoDescanso && columna[dia].juevesFin2RangoDescanso) {
                                myDatoSplitted3 = columna[dia].juevesInicio2RangoDescanso.split(":");
                                myDatoSplitted4 = columna[dia].juevesFin2RangoDescanso.split(":");
                            };
                            if (columna[dia].juevesInicio1RangoDescanso && columna[dia].juevesFin1RangoDescanso && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                let subRetorno;
                                if (columna[dia].juevesInicio2RangoDescanso && columna[dia].juevesFin2RangoDescanso && IsNumeric(myDatoSplitted3[0]) && IsNumeric(myDatoSplitted4[0])) {
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
                                myDatoSplitted1 = columna[dia].viernesInicio1RangoDescanso.split(":");
                                myDatoSplitted2 = columna[dia].viernesFin1RangoDescanso.split(":");
                            };
                            if (columna[dia].viernesInicio2RangoDescanso && columna[dia].viernesFin2RangoDescanso) {
                                myDatoSplitted3 = columna[dia].viernesInicio2RangoDescanso.split(":");
                                myDatoSplitted4 = columna[dia].viernesFin2RangoDescanso.split(":");
                            };
                            if (columna[dia].viernesInicio1RangoDescanso && columna[dia].viernesFin1RangoDescanso && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                let subRetorno;
                                if (columna[dia].viernesInicio2RangoDescanso && columna[dia].viernesFin2RangoDescanso && IsNumeric(myDatoSplitted3[0]) && IsNumeric(myDatoSplitted4[0])) {
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
                                myDatoSplitted1 = columna[dia].sabadoInicio1RangoDescanso.split(":");
                                myDatoSplitted2 = columna[dia].sabadoFin1RangoDescanso.split(":");
                            };
                            if (columna[dia].sabadoInicio2RangoDescanso && columna[dia].sabadoFin2RangoDescanso) {
                                myDatoSplitted3 = columna[dia].sabadoInicio2RangoDescanso.split(":");
                                myDatoSplitted4 = columna[dia].sabadoFin2RangoDescanso.split(":");
                            };
                            if (columna[dia].sabadoInicio1RangoDescanso && columna[dia].sabadoFin1RangoDescanso && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                let subRetorno;
                                if (columna[dia].sabadoInicio2RangoDescanso && columna[dia].sabadoFin2RangoDescanso && IsNumeric(myDatoSplitted3[0]) && IsNumeric(myDatoSplitted4[0])) {
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
                                myDatoSplitted1 = columna[dia].domingoInicio1RangoDescanso.split(":");
                                myDatoSplitted2 = columna[dia].domingoFin1RangoDescanso.split(":");
                            };
                            if (columna[dia].domingoInicio2RangoDescanso && columna[dia].domingoFin2RangoDescanso) {
                                myDatoSplitted3 = columna[dia].domingoInicio2RangoDescanso.split(":");
                                myDatoSplitted4 = columna[dia].domingoFin2RangoDescanso.split(":");
                            };
                            if (columna[dia].domingoInicio1RangoDescanso && columna[dia].domingoFin1RangoDescanso && IsNumeric(myDatoSplitted1[0]) && IsNumeric(myDatoSplitted2[0])) {
                                let subRetorno;
                                if (columna[dia].domingoInicio2RangoDescanso && columna[dia].domingoFin2RangoDescanso && IsNumeric(myDatoSplitted3[0]) && IsNumeric(myDatoSplitted4[0])) {
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
        };
    };

    const gestionaClassesColoresGeneralAccion = (dia, trabajadorDiaDeBaja, modificado, nombreTrabajador, tipoBaja, tipoVariacion) => {
        if (stateFestivo['estadoFestivoDia' + (dia)]) {
            if (stateFestivo['tipoFestivoDia' + (dia)] === 1) {
                return classes.casillaFestivo;
            };
            if (stateFestivo['tipoFestivoDia' + (dia)] === 2) {
                return classes.casillaFestivoCierre;
            };
            if (stateFestivo['tipoFestivoDia' + (dia)] === 3) {
                return classes.casillaFestivoCierreSinComputo;
            };
        };
        if (trabajadorDiaDeBaja) {
            return classes.casillaBaja;
            // if (tipoBaja === 'bajaCIA' || tipoBaja === 'excedencia') {
            //     return classes.casillaBajaEsp;
            // } else {
            //     return classes.casillaBaja;
            // };
        };
        if (modificado) {
            if (tipoVariacion) {
                if (tipoVariacion === 1) {
                    return classes.casillaVariacion1;
                };
                if (tipoVariacion === 2) {
                    return classes.casillaVariacion2;
                };
            } else {
                return classes.casillaModificado;
            };
        } else {
            if (nombreTrabajador) {
                if (nombreTrabajador === 'Suplente') {
                    return classes.casillaSuplenteVacio;
                } else {
                    return classes.casillaLaboral;
                };
            } else {
                return classes.casillaDisabled;
            };
        };
    };

    const gestionaClassesColoresServiciosFijosAccion = (dia, hayServicio, integrado, tipo) => {
        if (stateFestivo['estadoFestivoDia' + (dia)]) {
            if (stateFestivo['tipoFestivoDia' + (dia)] === 1) {
                return classes.casillaFestivo;
            };
            if (stateFestivo['tipoFestivoDia' + (dia)] === 2) {
                return classes.casillaFestivoCierre;
            };
            if (stateFestivo['tipoFestivoDia' + (dia)] === 3) {
                return classes.casillaFestivoCierreSinComputo;
            };
        } else {
            if (hayServicio) {
                if (integrado) {
                    return classes.casillaSFInt;
                } else {
                    if (tipo === 'FEST') {
                        return classes.casillaSFFest;
                    } else {
                        return classes.casillaSF;
                    };
                };
            } else {
                if (integrado) {
                    return classes.casillaVaciaSFInt;
                } else {
                    if (tipo === 'FEST') {
                        return classes.casillaVaciaSFFest;
                    } else {
                        return classes.casillaVaciaSF;
                    };
                };
            };
        }
    };

    const gestionaClassesColoresTrabajadoresAccion = (trabajadorTipo, trabajadorId) => {
        if (trabajadorTipo === 'trabajador' || !trabajadorTipo) {
            return classes.trabajador;
        } else {
            if (trabajadorId === 999) {
                return classes.suplenteVacio
            } else {
                return classes.suplente
            };
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
                    className={classes.colorText}
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

    const gestionaCabeceraServiciosFijos = (servicio) => {
        const serObj = tiposServicioFijo.find(obj => obj.value === servicio.tipoServiciofijo);
        const cabeceraServFijo = serObj ? `${serObj.cab}${servicio[`int_${serObj.prefix}`] ? ' (I)' : ''}` : null;
        return cabeceraServFijo
    };

    const gestionaColorCabeceraServiciosFijos = (servicio) => {
        const servicioFijoInt = tiposServicioFijo.some(serObj => {
            return (
                (servicio[`int_${serObj.prefix}`])
            );
        });
        if (servicioFijoInt) {
            return classes.cabeceraServiciosInt
        } else {
            if (servicio.tipoServiciofijo === 'FEST') {
                return classes.cabeceraServiciosFest;
            } else {
                return classes.cabeceraServicios;
            };
        };
    };

    const retornaHeaderServiciosFijosAccion = (servicio, index, ancho, alto) => {
        const servicioFijoAct = tiposServicioFijo.some(serObj => {
            return (
                (servicio[`activo_${serObj.prefix}`] === 'si')
            );
        });
        if (servicioFijoAct) {
            return (
                <Box
                    p={1.5}
                    mx={0.3}
                    key={'cabeceraServicios' + index}
                    className={clsx(gestionaColorCabeceraServiciosFijos(servicio), classes.inicio)}
                    color="secondary.contrastText"
                    style={{ minHeight: alto, maxHeight: alto, paddingLeft: 9, width: ancho, display: 'flex', alignItems: 'center' }}
                >
                    <Typography variant="body2">{gestionaCabeceraServiciosFijos(servicio)}</Typography>
                </Box>
            )
        };
    };

    const retornoServiciosFijosEnLayoutAccion = (elemento, losServiciosFijos) => {
        const hayServicios = tiposServicioFijo.some(serObj => {
            return (
                (losServiciosFijos[`precioHora_${serObj.prefix}`] || losServiciosFijos[`int_${serObj.prefix}`])
            );
        });
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
        let elTooltip, laLetra, elAnadidoTooltip, hayBaja, hayInt, esFest;
        tiposServicioFijo.forEach(serObj => {
            if (servicio[`precioHora_${serObj.prefix}`] || servicio[`int_${serObj.prefix}`]) {
                const etiqueta = serObj.label.charAt(0) + serObj.label.slice(1).toLowerCase();
                elTooltip = servicio[`int_${serObj.prefix}`] ? `${etiqueta} incluido en el cómputo` : `${etiqueta}: ${servicio.totalServicioFijo} €`;
                elAnadidoTooltip = servicio[`activo_${serObj.prefix}`] === 'si' ? '' : ' (Inactivo)';
                laLetra = serObj.prefix;
                hayBaja = servicio[`activo_${serObj.prefix}`] === 'no' ? true : false;
                hayInt = servicio[`int_${serObj.prefix}`] ? true : false;
                esFest = serObj.prefix === "FT" || false;
            };
        });
        return (
            <Box style={{ paddingTop: 5 }} key={'avatar' + index}>
                {hayBaja ? (
                    <LightTooltipInactivo title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={clsx(classes.fondoBaja, classes.small4)}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltipInactivo>
                ) : (hayInt ? (
                    <LightTooltipInt title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={clsx(classes.conServiciosA2Int, classes.small4)}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltipInt>
                ) : (esFest ? (
                    <LightTooltipFest title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={clsx(classes.conServiciosA2Fest, classes.small4)}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltipFest>
                ) : (
                    <LightTooltip title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={clsx(classes.conServiciosA2, classes.small4)}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltip>
                ))
                )}
            </Box>
        )
    };

    const retornaLabelChipAccion = () => {
        let estado = '';
        if (objetoCentro.nombre) {
            if (!firmaActualizacion) {
                estado = ' - Estado: Pendiente de Registrar Cuadrante';
            };
            if (firmaActualizacion &&
                !intervencionRegistrada &&
                objetoCuadrante.estado === 'registrado') {
                estado = ' - Estado: Pendiente de Actualizar Cuadrante';
            };
            if (firmaActualizacion &&
                intervencionRegistrada &&
                objetoCuadrante.estado === 'registrado') {
                estado = ' - Estado: Registrado el ' + firmaActualizacion;
            };
            if (firmaActualizacion &&
                !intervencionRegistrada &&
                objetoCuadrante.estado === 'facturado' &&
                objetoCuadrante.total &&
                (objetoCuadrante.total.procesado.valor === 'no' || objetoCuadrante.total.procesado.valor === 'si')) {
                if (objetoCuadrante.total.tocaFacturar.valor === 'si') {
                    estado = ' - Estado: Pendiente de Registrar Factura';
                } else {
                    estado = ' - Estado: Pendiente de Registrar Recibo';
                };
            };
            if (firmaActualizacion &&
                intervencionRegistrada &&
                objetoCuadrante.estado === 'facturado' &&
                objetoCuadrante.total &&
                objetoCuadrante.total.procesado.valor === 'no') {
                estado = ' - Estado: Facturado el ' + firmaActualizacion;
            };
            if (firmaActualizacion &&
                intervencionRegistrada &&
                objetoCuadrante.estado === 'facturado' &&
                objetoCuadrante.total &&
                objetoCuadrante.total.procesado.valor === 'si') {
                estado = ' - Estado: Emitido el ' + firmaActualizacion;
            };
            return 'Centro: ' + (objetoCentro.subNombre ? (objetoCentro.nombre + " - " + objetoCentro.subNombre) : objetoCentro.nombre) + estado
        } else {
            return 'Gestión de cuadrantes'
        };
    };

    const retornaColorChipAccion = () => {
        let color;
        if (objetoCuadrante.nombre) {
            if (objetoCuadrante.estado === 'facturado' &&
                objetoCuadrante.total &&
                objetoCuadrante.total.procesado.valor === 'si') {
                if (intervencionRegistrada) {
                    color = classes.conServicios;
                };
            };
            if (objetoCuadrante.estado === 'registrado') {
                if (objetoCuadrante.datosInforme.tocaFacturar.valor === 'no') {
                    if (objetoCuadrante.datosInforme.tocaFacturar.razon !== 'gest') {
                        color = classes.noFacturacion;
                    };
                } else {
                    if (objetoCuadrante.total) {
                        if (!objetoCuadrante.total.codigo) {
                            color = classes.noFacturacion;
                        };
                    };
                };
            };
        };
        if (color) {
            return color
        } else {
            return null
        };
    };

    const retornaAvatarChipAccion = () => {
        if (objetoCentro.nombre) {
            if ((objetoCentro.nombre !== '' && objetoCentro.horario.horario[0] && objetoCentro.horario.horario[0].computo === 3) || (objetoCentro.nombre !== '' && objetoCentro.serviciosFijos.gestionEspSF)) {
                return (
                    <Avatar
                        className={classes.enB}
                    >
                        <Typography style={{ color: '#ffffff' }}> </Typography>
                    </Avatar>
                )
            } else {
                return (
                    <Avatar
                        className={classes.enA}
                    >
                        <Typography style={{ color: '#ffffff' }}> </Typography>
                    </Avatar>
                )
            };
        } else {
            return null
        };
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
        retornaServiciosFijosEnLayoutAvatarsAccion,
        retornaLabelChipAccion,
        retornaColorChipAccion,
        retornaAvatarChipAccion
    }
}

export default LogicaLayoutCuadrantes