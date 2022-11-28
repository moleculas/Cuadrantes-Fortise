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
import { obtenerObjetoPorIdAccion } from '../redux/appDucks';

//estilos
import Clases from "../clases";

//constantes
const variaciones = Constantes.VARIACIONES_CUADRANTES;

//tooltip
const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#009688',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);
const LightTooltipFest = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#00bcd4',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);
const LightTooltipInt = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#8bc34a',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);
const LightTooltipInactivo = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#ffcdd2',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);

const HelpersLayoutCuadrantes = () => {
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

    function IsNumeric(num) {
        return (num >= 0 || num < 0);
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
        switch (servicio.tipoServiciofijo) {
            case 'TOL':
                if (servicio.int_TO) {
                    return 'L. Toldos (I)'
                } else {
                    return 'L. Toldos'
                };
                break;
            case 'CRIS':
                if (servicio.int_CR) {
                    return 'L. Cristales (I)'
                } else {
                    return 'L. Cristales'
                };

                break;
            case 'CRISE':
                if (servicio.int_CE) {
                    return 'L. Cristales E (I)'
                } else {
                    return 'L. Cristales E'
                };

                break;
            case 'CRISI':
                if (servicio.int_CI) {
                    return 'L. Cristales I (I)'
                } else {
                    return 'L. Cristales I'
                };

                break;
            case 'MOQ':
                if (servicio.int_MO) {
                    return 'L. Moqueta (I)'
                } else {
                    return 'L. Moqueta'
                };

                break;
            case 'OF':
                if (servicio.int_OF) {
                    return 'L. Oficinas (I)'
                } else {
                    return 'L. Oficinas'
                };

                break;
            case 'ALMC':
                if (servicio.int_AL) {
                    return 'L. Almacenes (I)'
                } else {
                    return 'L. Almacenes'
                };

                break;
            case 'LAB':
                if (servicio.int_LA) {
                    return 'L. Laboratorio (I)'
                } else {
                    return 'L. Laboratorio'
                };

                break;
            case 'TELÑ':
                if (servicio.int_TE) {
                    return 'L. Telarañas (I)'
                } else {
                    return 'L. Telarañas'
                };

                break;
            case 'FCH.IN':
                if (servicio.int_FI) {
                    return 'L. Fachada Int. (I)'
                } else {
                    return 'L. Fachada Int.'
                };

                break;
            case 'FCH.EX':
                if (servicio.int_FE) {
                    return 'L. Fachada Ext. (I)'
                } else {
                    return 'L. Fachada Ext.'
                };

                break;
            case 'ABRLL':
                if (servicio.int_AB) {
                    return 'L. Abrillantado (I)'
                } else {
                    return 'L. Abrillantado'
                };

                break;
            case 'MANT':
                if (servicio.int_MA) {
                    return 'M. Máquina (I)'
                } else {
                    return 'M. Máquina'
                };

                break;
            case 'PORT':
                if (servicio.int_PO) {
                    return 'L. Portería (I)'
                } else {
                    return 'L. Portería'
                };

                break;
            case 'BACT':
                if (servicio.int_BA) {
                    return 'Bot. Noubact (I)'
                } else {
                    return 'Bot. Noubact'
                };

                break;
            case 'FEST':
                if (servicio.int_FT) {
                    return 'L. Día festivo (I)'
                } else {
                    return 'L. Día festivo'
                };

                break;
            case 'CRTRIM':
                if (servicio.int_C3) {
                    return 'Crist. Tri. (I)'
                } else {
                    return 'Crist. Tri.'
                };
                break;
            case 'CRBIM':
                if (servicio.int_C2) {
                    return 'Crist. Bim. (I)'
                } else {
                    return 'Crist. Bim.'
                };
                break;
            case 'CRCUA':
                if (servicio.int_C4) {
                    return 'Crist. Cua. (I)'
                } else {
                    return 'Crist. Cua.'
                };
                break;
            case 'LIME':
                if (servicio.int_ES) {
                    return 'L. Especial (I)'
                } else {
                    return 'L. Especial'
                };
                break;
            case 'LIMP':
                if (servicio.int_PA) {
                    return 'L. Párking (I)'
                } else {
                    return 'L. Párking'
                };
                break;
            default:
        };
    };

    const gestionaColorCabeceraServiciosFijos = (servicio) => {
        if (servicio.int_TO ||
            servicio.int_CR ||
            servicio.int_CE ||
            servicio.int_CI ||
            servicio.int_MO ||
            servicio.int_OF ||
            servicio.int_AL ||
            servicio.int_LA ||
            servicio.int_TE ||
            servicio.int_FI ||
            servicio.int_FE ||
            servicio.int_AB ||
            servicio.int_MA ||
            servicio.int_PO ||
            servicio.int_BA ||
            servicio.int_FT ||
            servicio.int_C3 ||
            servicio.int_C2 ||
            servicio.int_C4 ||
            servicio.int_ES ||
            servicio.int_PA) {
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
            servicio.activo_C4 === 'si' ||
            servicio.activo_ES === 'si' ||
            servicio.activo_PA === 'si') {
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
        let hayServicios;
        if (losServiciosFijos.precioHora_TO || losServiciosFijos.int_TO ||
            losServiciosFijos.precioHora_CR || losServiciosFijos.int_CR ||
            losServiciosFijos.precioHora_CE || losServiciosFijos.int_CE ||
            losServiciosFijos.precioHora_CI || losServiciosFijos.int_CI ||
            losServiciosFijos.precioHora_MO || losServiciosFijos.int_MO ||
            losServiciosFijos.precioHora_OF || losServiciosFijos.int_OF ||
            losServiciosFijos.precioHora_AL || losServiciosFijos.int_AL ||
            losServiciosFijos.precioHora_LA || losServiciosFijos.int_LA ||
            losServiciosFijos.precioHora_TE || losServiciosFijos.int_TE ||
            losServiciosFijos.precioHora_FI || losServiciosFijos.int_FI ||
            losServiciosFijos.precioHora_FE || losServiciosFijos.int_FE ||
            losServiciosFijos.precioHora_AB || losServiciosFijos.int_AB ||
            losServiciosFijos.precioHora_MA || losServiciosFijos.int_MA ||
            losServiciosFijos.precioHora_PO || losServiciosFijos.int_PO ||
            losServiciosFijos.precioHora_BA || losServiciosFijos.int_BA ||
            losServiciosFijos.precioHora_FT || losServiciosFijos.int_FT ||
            losServiciosFijos.precioHora_C3 || losServiciosFijos.int_C3 ||
            losServiciosFijos.precioHora_C2 || losServiciosFijos.int_C2 ||
            losServiciosFijos.precioHora_C4 || losServiciosFijos.int_C4 ||
            losServiciosFijos.precioHora_ES || losServiciosFijos.int_ES ||
            losServiciosFijos.precioHora_PA || losServiciosFijos.int_PA) {
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
        let laClase, elTooltip, laLetra, elAnadidoTooltip, hayBaja, hayInt, esFest;
        if (servicio.precioHora_TO || servicio.int_TO) {
            laClase = servicio.activo_TO === 'si' ? servicio.int_TO ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_TO ? 'Servicio de limpieza de toldos incluido en el cómputo' : 'Servicio de limpieza de toldos: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_TO === 'si' ? '' : ' (Inactivo)';
            laLetra = 'TO';
            hayBaja = servicio.activo_TO === 'no' ? true : false;
            hayInt = servicio.int_TO ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_CR || servicio.int_CR) {
            laClase = servicio.activo_CR === 'si' ? servicio.int_CR ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_CR ? 'Servicio de limpieza de cristales incluido en el cómputo' : 'Servicio de limpieza de cristales: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_CR === 'si' ? '' : ' (Inactivo)';
            laLetra = 'CR';
            hayBaja = servicio.activo_CR === 'no' ? true : false;
            hayInt = servicio.int_CR ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_CE || servicio.int_CE) {
            laClase = servicio.activo_CE === 'si' ? servicio.int_CE ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_CE ? 'Limpieza cristales exteriores incluido en el cómputo' : 'Limpieza cristales exteriores: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_CE === 'si' ? '' : ' (Inactivo)';
            laLetra = 'CE';
            hayBaja = servicio.activo_CE === 'no' ? true : false;
            hayInt = servicio.int_CE ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_CI || servicio.int_CI) {
            laClase = servicio.activo_CI === 'si' ? servicio.int_CI ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_CI ? 'Limpieza cristales interiores incluido en el cómputo' : 'Limpieza cristales interiores: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_CI === 'si' ? '' : ' (Inactivo)';
            laLetra = 'CI';
            hayBaja = servicio.activo_CI === 'no' ? true : false;
            hayInt = servicio.int_CI ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_MO || servicio.int_MO) {
            laClase = servicio.activo_MO === 'si' ? servicio.int_MO ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_MO ? 'Servicio de limpieza moqueta incluido en el cómputo' : 'Servicio de limpieza moqueta: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_MO === 'si' ? '' : ' (Inactivo)';
            laLetra = 'MO';
            hayBaja = servicio.activo_MO === 'no' ? true : false;
            hayInt = servicio.int_MO ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_OF || servicio.int_OF) {
            laClase = servicio.activo_OF === 'si' ? servicio.int_OF ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_OF ? 'Servicio de limpieza oficinas incluido en el cómputo' : 'Servicio de limpieza oficinas: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_OF === 'si' ? '' : ' (Inactivo)';
            laLetra = 'OF';
            hayBaja = servicio.activo_OF === 'no' ? true : false;
            hayInt = servicio.int_OF ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_AL || servicio.int_AL) {
            laClase = servicio.activo_AL === 'si' ? servicio.int_AL ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_AL ? 'Servicio de limpieza almacenes incluido en el cómputo' : 'Servicio de limpieza almacenes: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_AL === 'si' ? '' : ' (Inactivo)';
            laLetra = 'AL';
            hayBaja = servicio.activo_AL === 'no' ? true : false;
            hayInt = servicio.int_AL ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_LA || servicio.int_LA) {
            laClase = servicio.activo_LA === 'si' ? servicio.int_LA ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_LA ? 'Servicio de limpieza laboratorio incluido en el cómputo' : 'Servicio de limpieza laboratorio: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_LA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'LA';
            hayBaja = servicio.activo_LA === 'no' ? true : false;
            hayInt = servicio.int_LA ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_TE || servicio.int_TE) {
            laClase = servicio.activo_TE === 'si' ? servicio.int_TE ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_TE ? 'Servicio de limpieza telarañas incluido en el cómputo' : 'Servicio de limpieza telarañas: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_TE === 'si' ? '' : ' (Inactivo)';
            laLetra = 'TE';
            hayBaja = servicio.activo_TE === 'no' ? true : false;
            hayInt = servicio.int_TE ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_FI || servicio.int_FI) {
            laClase = servicio.activo_FI === 'si' ? servicio.int_FI ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_FI ? 'Servicio de limpieza fachada interior incluido en el cómputo' : 'Servicio de limpieza fachada interior: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_FI === 'si' ? '' : ' (Inactivo)';
            laLetra = 'FI';
            hayBaja = servicio.activo_FI === 'no' ? true : false;
            hayInt = servicio.int_FI ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_FE || servicio.int_FE) {
            laClase = servicio.activo_FE === 'si' ? servicio.int_FE ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_FE ? 'Servicio de limpieza fachada exterior incluido en el cómputo' : 'Servicio de limpieza fachada exterior: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_FE === 'si' ? '' : ' (Inactivo)';
            laLetra = 'FE';
            hayBaja = servicio.activo_FE === 'no' ? true : false;
            hayInt = servicio.int_FE ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_AB || servicio.int_AB) {
            laClase = servicio.activo_AB === 'si' ? servicio.int_AB ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_AB ? 'Servicio de limpieza abrillantado incluido en el cómputo' : 'Servicio de limpieza abrillantado: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_AB === 'si' ? '' : ' (Inactivo)';
            laLetra = 'AB';
            hayBaja = servicio.activo_AB === 'no' ? true : false;
            hayInt = servicio.int_AB ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_MA || servicio.int_MA) {
            laClase = servicio.activo_MA === 'si' ? servicio.int_MA ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_MA ? 'Servicio de mantenimiento máquina incluido en el cómputo' : 'Servicio de mantenimiento máquina: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_MA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'MA';
            hayBaja = servicio.activo_MA === 'no' ? true : false;
            hayInt = servicio.int_MA ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_PO || servicio.int_PO) {
            laClase = servicio.activo_PO === 'si' ? servicio.int_PO ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_PO ? 'Servicio de limpieza portería incluido en el cómputo' : 'Servicio de limpieza portería: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_PO === 'si' ? '' : ' (Inactivo)';
            laLetra = 'PO';
            hayBaja = servicio.activo_PO === 'no' ? true : false;
            hayInt = servicio.int_PO ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_BA || servicio.int_BA) {
            laClase = servicio.activo_BA === 'si' ? servicio.int_BA ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_BA ? 'Bot. Noubact incluido en el cómputo' : 'Bot. Noubact: ' + servicio.precioHora_BA + ' €';
            elAnadidoTooltip = servicio.activo_BA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'BA';
            hayBaja = servicio.activo_BA === 'no' ? true : false;
            hayInt = servicio.int_BA ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_FT || servicio.int_FT) {
            laClase = servicio.activo_FT === 'si' ? servicio.int_FT ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2Fest, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_FT ? 'Servicio de limpieza día festivo incluido en el cómputo' : 'Servicio de limpieza día festivo: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_FT === 'si' ? '' : ' (Inactivo)';
            laLetra = 'FT';
            hayBaja = servicio.activo_FT === 'no' ? true : false;
            hayInt = servicio.int_FT ? true : false;
            esFest = true;
        };
        if (servicio.precioHora_C3 || servicio.int_C3) {
            laClase = servicio.activo_C3 === 'si' ? servicio.int_C3 ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_C3 ? 'Limpieza de cristales trimestral incluido en el cómputo' : 'Limpieza de cristales trimestral: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_C3 === 'si' ? '' : ' (Inactivo)';
            laLetra = 'C3';
            hayBaja = servicio.activo_C3 === 'no' ? true : false;
            hayInt = servicio.int_C3 ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_C2 || servicio.int_C2) {
            laClase = servicio.activo_C2 === 'si' ? servicio.int_C2 ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_C2 ? 'Limpieza de cristales bimensual incluido en el cómputo' : 'Limpieza de cristales bimensual: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_C2 === 'si' ? '' : ' (Inactivo)';
            laLetra = 'C2';
            hayBaja = servicio.activo_C2 === 'no' ? true : false;
            hayInt = servicio.int_C2 ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_C4 || servicio.int_C4) {
            laClase = servicio.activo_C4 === 'si' ? servicio.int_C4 ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_C4 ? 'Limpieza de cristales cuatrimestral incluido en el cómputo' : 'Limpieza de cristales cuatrimestral: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_C4 === 'si' ? '' : ' (Inactivo)';
            laLetra = 'C4';
            hayBaja = servicio.activo_C4 === 'no' ? true : false;
            hayInt = servicio.int_C4 ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_ES || servicio.int_ES) {
            laClase = servicio.activo_ES === 'si' ? servicio.int_ES ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_ES ? 'Servicio limpieza especial incluido en el cómputo' : 'Servicio limpieza especial: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_ES === 'si' ? '' : ' (Inactivo)';
            laLetra = 'ES';
            hayBaja = servicio.activo_ES === 'no' ? true : false;
            hayInt = servicio.int_ES ? true : false;
            esFest = false;
        };
        if (servicio.precioHora_PA || servicio.int_PA) {
            laClase = servicio.activo_PA === 'si' ? servicio.int_PA ? (clsx(classes.conServiciosA2Int, classes.small4)) :
                (clsx(classes.conServiciosA2, classes.small4)) : (clsx(classes.fondoBaja, classes.small4));
            elTooltip = servicio.int_PA ? 'Servicio limpieza de párking incluido en el cómputo' : 'Servicio limpieza de párking: ' + servicio.totalServicioFijo + ' €';
            elAnadidoTooltip = servicio.activo_PA === 'si' ? '' : ' (Inactivo)';
            laLetra = 'PA';
            hayBaja = servicio.activo_PA === 'no' ? true : false;
            hayInt = servicio.int_PA ? true : false;
            esFest = false;
        };

        return (
            <Box style={{ paddingTop: 5 }} key={'avatar' + index}>
                {hayBaja ? (
                    <LightTooltipInactivo title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={laClase}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltipInactivo>
                ) : (hayInt ? (
                    <LightTooltipInt title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={laClase}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltipInt>
                ) : (esFest ? (
                    <LightTooltipFest title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={laClase}>
                            <Typography style={{ fontSize: '0.7rem' }}>{laLetra}</Typography>
                        </Avatar>
                    </LightTooltipFest>
                ) : (
                    <LightTooltip title={elTooltip + elAnadidoTooltip} placement="right" classes={{ tooltip: classes.noMaxWidth }}>
                        <Avatar variant="square" className={laClase}>
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
            return 'Centro: ' + objetoCentro.nombre + estado
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

export default HelpersLayoutCuadrantes