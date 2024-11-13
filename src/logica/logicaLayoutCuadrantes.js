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
import { existePrefixSF } from './logicaServiciosFijos';

//estilos
import Clases from "../clases";

//constantes
const {
    TIPO_SERVICIO_FIJO: tiposServicioFijo,
    VARIACIONES_CUADRANTES: variaciones,
    TIPO_SERVICIO: tipoServicio,
    DIAS_SEMANA: diasSemana
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

    const gestionaTextoCasillasServiciosFijosAccion = (indexDia, trab, activo, horas, postRef) => {
        //modificador: control horas servicios fijos
        if (stateFestivo[`estadoFestivoDia${indexDia}`]) {
            const tipoFestivo = stateFestivo[`tipoFestivoDia${indexDia}`];
            return tipoFestivo === 1 ? 'Día festivo' :
                tipoFestivo === 2 ? 'Cierre centro' :
                    tipoFestivo === 3 ? 'Cierre centro facturar' : '';
        }
        if (activo) {
            const nombreTrabajador = trab ? dispatch(obtenerObjetoPorIdAccion(arrayTrabajadoresSubcategoria, trab)) : 'Sin trabajador';
            if (!horas) {
                return nombreTrabajador;
            }
            //modificador: temporal evitar quadrants antics horesSF
            if (horas.inicio) {
                return `De ${horas.inicio} a ${horas.fin} - ${nombreTrabajador}`;
            } else {
                if (Array.isArray(horas)) {
                    return `${parseFloat((horas.find(hora => hora.dia === postRef).horas) / 60).toFixed(2)} horas - ${nombreTrabajador}`;
                } else {
                    return `${parseFloat(horas / 60).toFixed(2)} horas - ${nombreTrabajador}`;
                }
            }
        }
        return '';
    };

    const gestionaTextoCasillasAccion = (indexDia, dia, columna, diaSemana) => {
        const diaSemanaValor = diasSemana.find(d => d.label === diaSemana)?.value;
        if (stateFestivo['estadoFestivoDia' + indexDia]) {
            const tipoFestivo = stateFestivo['tipoFestivoDia' + indexDia];
            const festivos = {
                1: 'Día festivo',
                2: 'Cierre centro',
                3: 'Cierre centro facturar',
            };
            return festivos[tipoFestivo] || '';
        }
        const bajas = {
            bajaIT: 'Baja IT',
            bajaACCTE: 'Baja ACCTE',
            bajaCIA: 'Baja CIA',
            vacaciones: 'Vacaciones',
            excedencia: 'Excedencia',
            personales: 'Motivos personales',
            permisoRET: 'Permiso RET',
            ausenciaINJ: 'Ausencia INJ',
        };
        if (columna[dia]?.baja) {
            return bajas[columna[dia]?.tipoBaja] || '';
        }
        //modificador: gestió mateix dia alta-baixa
        const contieneAltaYBaja = columna[dia]?.contieneAltaYbaja ? `${bajas[columna[dia].contieneAltaYbaja]} Mismo día` : "";
        const horarios = {
            rango: (inicio, fin) => (
                inicio && fin && IsNumeric(inicio[0]) && IsNumeric(fin[0])
                    ? `De ${inicio.join(':')} a ${fin.join(':')}`
                    : ''
            ),
            rangoDescanso: (inicio1, fin1, inicio2, fin2) => {
                if (!inicio1 || !fin1) return '';
                let subRetorno = (inicio2 && fin2 && IsNumeric(inicio2[0]) && IsNumeric(fin2[0]))
                    ? ` y de ${inicio2.join(':')} a ${fin2.join(':')}`
                    : '';
                return (IsNumeric(inicio1[0]) && IsNumeric(fin1[0]))
                    ? `De ${inicio1.join(':')} a ${fin1.join(':')}${subRetorno}`
                    : '';
            },
            cantidad: (cantidad) => cantidad ? `${parseFloat(cantidad / 60).toFixed(2)} horas` : '',
        };
        const { tipoHorario } = columna;
        let inicio1, fin1, inicio2, fin2;
        switch (tipoHorario) {
            case 'rango':
                inicio1 = columna[dia][`${diaSemanaValor}InicioRango`]?.split(':');
                fin1 = columna[dia][`${diaSemanaValor}FinRango`]?.split(':');
                return inicio1 && fin1 ? `${horarios.rango(inicio1, fin1)} ${contieneAltaYBaja}` : contieneAltaYBaja;
            case 'rangoDescanso':
                inicio1 = columna[dia][`${diaSemanaValor}Inicio1RangoDescanso`]?.split(':');
                fin1 = columna[dia][`${diaSemanaValor}Fin1RangoDescanso`]?.split(':');
                inicio2 = columna[dia][`${diaSemanaValor}Inicio2RangoDescanso`]?.split(':');
                fin2 = columna[dia][`${diaSemanaValor}Fin2RangoDescanso`]?.split(':');
                return inicio1 && fin1 ? `${horarios.rangoDescanso(inicio1, fin1, inicio2, fin2)} ${contieneAltaYBaja}` : contieneAltaYBaja;
            case 'cantidad':
                const cantidad = columna[dia][`${diaSemanaValor}Cantidad`];
                return cantidad ? `${horarios.cantidad(cantidad)} ${contieneAltaYBaja}` : contieneAltaYBaja;
            default:
                return '';
        }
    };

    const gestionaClassesColoresGeneralAccion = (
        dia,
        trabajadorDiaDeBaja,
        modificado,
        nombreTrabajador,
        tipoBaja,
        tipoVariacion,
        contieneAltaYbaja
    ) => {
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
        //modificador: gestió mateix dia alta-baixa
        if (trabajadorDiaDeBaja || contieneAltaYbaja) {
            // if (tipoBaja === 'bajaCIA' || tipoBaja === 'excedencia') {
            //     return classes.casillaBajaEsp;
            // } else {
            //     return classes.casillaBaja;
            // };
            if (contieneAltaYbaja) {
                return classes.casillaBajaActiva;
            } else {
                return classes.casillaBaja;
            }
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
        const tipoClases = {
            'LIM': classes.tipoServ1,
            'LIME': classes.tipoServ2,
            'LIMP': classes.tipoServ3,
            'NAVE2': classes.tipoServ4,
            'REFZ': classes.tipoServ5,
            'LIM1': classes.tipoServ6,
            'LIM2': classes.tipoServ6,
            'FEST': classes.tipoServ7,
        };
        const servicio = tipoServicio.find(servicio => servicio.value === tipo);
        if (!servicio) return null;
        const clase = tipoClases[tipo];
        return (
            <Tooltip title={servicio.label} placement="top-end" arrow>
                <Avatar className={clsx(clase, classes.small2)}>
                    {servicio.prefix}
                </Avatar>
            </Tooltip>
        );
    };

    const retornaIconoVariacionAccion = (columna, postRef, diaSemana) => {
        const diaSemanaValor = diasSemana.find(d => d.label === diaSemana)?.value;
        const aRetornarIcono = (
            <Tooltip title={variaciones[columna[postRef].tipoVariacion - 1]?.label} placement="top-end" arrow>
                <TimerIcon className={classes.colorText} style={{ marginLeft: 3 }} />
            </Tooltip>
        );
        const tipoHorarioMap = {
            rango: `${diaSemanaValor}InicioRango`,
            rangoDescanso: `${diaSemanaValor}Inicio1RangoDescanso`,
            cantidad: `${diaSemanaValor}Cantidad`
        };
        const propiedad = tipoHorarioMap[columna.tipoHorario];
        if (propiedad && columna[postRef][propiedad]) {
            return aRetornarIcono;
        }
        return '';
    };

    const gestionaValoresCasillasAccion = (indexDia, dia, columna, diaSemana, casilla) => {
        const diaSemanaValor = diasSemana.find(d => d.label === diaSemana)?.value;
        if (columna[dia]?.baja || stateFestivo['estadoFestivoDia' + (indexDia - 1)]) {
            return columna.tipoHorario === 'cantidad' ? '' : null;
        }
        const dispatchAction = (key) => columna[dia][key] ? dispatch(generaFechaAccion(columna[dia][key])) : null;
        const acciones = {
            rango: () => {
                const inicioKey = `${diaSemanaValor}InicioRango`;
                const finKey = `${diaSemanaValor}FinRango`;
                return casilla === 1 ? dispatchAction(inicioKey) : casilla === 2 ? dispatchAction(finKey) : null;
            },
            rangoDescanso: () => {
                const inicio1Key = `${diaSemanaValor}Inicio1RangoDescanso`;
                const fin1Key = `${diaSemanaValor}Fin1RangoDescanso`;
                const inicio2Key = `${diaSemanaValor}Inicio2RangoDescanso`;
                const fin2Key = `${diaSemanaValor}Fin2RangoDescanso`;
                if (casilla === 1) return dispatchAction(inicio1Key);
                if (casilla === 2) return dispatchAction(fin1Key);
                if (casilla === 3) return dispatchAction(inicio2Key);
                if (casilla === 4) return dispatchAction(fin2Key);
                return null;
            },
            cantidad: () => {
                const cantidadKey = `${diaSemanaValor}Cantidad`;
                return casilla === 1 ? (columna[dia][cantidadKey] || '') : null;
            }
        };
        return acciones[columna.tipoHorario]?.() || null;
    };

    const gestionaCabeceraServiciosFijos = (servicio) => {
        //modificador: servicios fijos personalizados
        const { propiedad, existePrefix } = existePrefixSF(servicio);
        const cabeceraServFijo = existePrefix
            ? tiposServicioFijo.find(obj => obj.value === servicio.tipoServiciofijo)?.cab + (servicio[`int_${tiposServicioFijo.find(obj => obj.value === servicio.tipoServiciofijo)?.prefix}`] ? ' (I)' : '') || null
            : servicio.tipoServiciofijo.charAt(0).toUpperCase() + servicio.tipoServiciofijo.slice(1) + (servicio[`int_${propiedad}`] ? ' (I)' : '');
        return cabeceraServFijo
    };

    const gestionaColorCabeceraServiciosFijos = (servicio) => {
        //modificador: servicios fijos personalizados
        const { propiedad, existePrefix } = existePrefixSF(servicio);
        const servicioFijoInt = existePrefix
            ? tiposServicioFijo.some(serObj => servicio[`int_${serObj.prefix}`])
            : servicio[`int_${propiedad}`] === true;
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
        //modificador: servicios fijos personalizados
        const { propiedad, existePrefix } = existePrefixSF(servicio);
        const servicioFijoAct = existePrefix
            ? tiposServicioFijo.some(serObj => servicio[`activo_${serObj.prefix}`] === 'si')
            : servicio[`activo_${propiedad}`] === 'si';
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

    const retornoServiciosFijosEnLayoutAccion = (elemento, cuadranteServiciosFijos) => {
        //modificador: servicios fijos personalizados
        const hayServicios = tiposServicioFijo.some(serObj => {
            return cuadranteServiciosFijos.some(obj =>
                obj[`precioHora_${serObj.prefix}`] || obj[`int_${serObj.prefix}`]
            );
        }) || cuadranteServiciosFijos.some(obj => {
            return Object.keys(obj).some(key =>
                key.startsWith("activo_") && /P\d+$/.test(key)
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
        //modificador: servicios fijos personalizados
        const { propiedad, existePrefix } = existePrefixSF(servicio);
        if (existePrefix) {
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
        } else {
            if (servicio[`precioHora_${propiedad}`] || servicio[`int_${propiedad}`]) {
                const etiqueta = servicio.tipoServiciofijo;
                elTooltip = servicio[`int_${propiedad}`] ? `${etiqueta} incluido en el cómputo` : `${etiqueta}: ${servicio.totalServicioFijo} €`;
                elAnadidoTooltip = servicio[`activo_${propiedad}`] === 'si' ? '' : ' (Inactivo)';
                laLetra = propiedad;
                hayBaja = servicio[`activo_${propiedad}`] === 'no' ? true : false;
                hayInt = servicio[`int_${propiedad}`] ? true : false;
                esFest = false;
            };
        };
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
                if (objetoCuadrante.total.mailEnviado === "si") {
                    estado = ' - Estado: Emitido y mail enviado el ' + firmaActualizacion;
                } else {
                    estado = ' - Estado: Emitido el ' + firmaActualizacion;
                };
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
                    if (objetoCuadrante.total.mailEnviado === "si") {
                        color = classes.headerMailing;
                    } else {
                        color = classes.conServicios;
                    };
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