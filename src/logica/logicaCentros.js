import { validarMailAccion } from '../redux/appDucks';
import Constantes from "../constantes";

//constantes
const {
    TIPO_SERVICIO_FIJO: tiposServicioFijo,
    TIPO_SERVICIO: tipoServicio,
    DIAS_SEMANA: diasSemana
} = Constantes;

export const procesarDatosPromesa = (
    valuesFormGenerales,
    setAlert,
    setOpenSnack,
    stateSwitchTipoServicioFijo,
    valuesForm,
    horarioIntervencion,
    trabajadores,
    listadoCentros
) => (getState, dispatch) => {
    return new Promise((resolve, reject) => {
        if (valuesFormGenerales.nombre === '') {
            setAlert({
                mensaje: "Faltan datos por completar. Campo Nombre. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (valuesForm.categoria === '') {
            setAlert({
                mensaje: "Faltan datos por completar. Campo Categoría Centro. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (valuesFormGenerales.formaPago === '') {
            setAlert({
                mensaje: "Faltan datos por completar. Campo Forma pago. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (valuesFormGenerales.tempPago === '') {
            setAlert({
                mensaje: "Faltan datos por completar. Campo Temporización. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (listadoCentros) {
            let hayNombre = listadoCentros.some(centro => centro.nombre === valuesFormGenerales.nombre);
            if (hayNombre) {
                setAlert({
                    mensaje: "Ya existe un centro registrado con el mismo nombre. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
        };
        const servicioFijoSinPrecio = tiposServicioFijo.some(servicio => {
            return (
                (stateSwitchTipoServicioFijo[`${servicio.prefix}`] && !valuesForm[`int_${servicio.prefix}`] && !valuesForm[`precioHora_${servicio.prefix}`])
            );
        });
        if (servicioFijoSinPrecio) {
            setAlert({
                mensaje: "Has selecionado un tipo de servicio extra pero no has asignado precio. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        //modificador: control horas servicios fijos
        let serviciosExtraSinTrabajador = { estado: false, servicio: null };
        tiposServicioFijo.forEach(servicio => {
            const precioHoraKey = `precioHora_${servicio.prefix}`;
            const trabKey = `trab_${servicio.prefix}`;        
            if (valuesForm[precioHoraKey] !== null && !valuesForm[trabKey]) {
                serviciosExtraSinTrabajador = { estado: true, servicio: servicio.label }
            }
        });
        if (serviciosExtraSinTrabajador.estado) {
            setAlert({
                mensaje: `Falta seleccionar un trabajador para el Servicio extra ${serviciosExtraSinTrabajador.servicio}. Revisa el formulario.`,
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        const hayPrecioHoraS = tipoServicio.some(servicio => valuesForm[`precioHora_${servicio.prefix}`]);
        const hayHorario = !(valuesForm.computo === '' && !valuesForm.mensualPactado && !hayPrecioHoraS);
        let valoresCorrectosComputo = false;
        if ((valuesForm.computo === 1 && !valuesForm.mensualPactado) ||
            (valuesForm.computo === 2 && !hayPrecioHoraS) ||
            (valuesForm.computo === 3 && (!hayPrecioHoraS && !valuesForm.mensualPactado))) {
            setAlert({
                mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        } else {
            valoresCorrectosComputo = true;
        };
        const hayServiciosFijos = tiposServicioFijo.some(servicio => {
            return (
                (valuesForm[`precioHora_${servicio.prefix}`] && valuesForm[`int_${servicio.prefix}`])
            );
        });
        const valoresServiciosIntegrados = tiposServicioFijo.some(servicio => {
            return (
                (valuesForm[`int_${servicio.prefix}`])
            );
        });
        if (valoresServiciosIntegrados && !hayHorario) {
            setAlert({
                mensaje: "Faltan datos por completar. Los Servicios Extra integrados en cómputo deben tener cómputo de horas en el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (!hayHorario && valuesForm.numeroTrabajadores) {
            setAlert({
                mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario2.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        //cuadrante en blanco
        // if (!hayServiciosFijos && !hayHorario) {
        //     setAlert({
        //         mensaje: "Faltan datos por completar. Revisa el cómputo de horas en el formulario2.",
        //         tipo: 'error'
        //     })
        //     setOpenSnack(true);
        //     return;
        // };
        if (valuesForm.numeroTrabajadores === '' &&
            valuesForm.computo &&
            valoresCorrectosComputo
        ) {
            setAlert({
                mensaje: "Falta asignar trabajadores para el cómputo de horas. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if ((valuesForm.variacion === '' ||
            valuesForm.tipo === '') &&
            valuesForm.numeroTrabajadores !== '') {
            setAlert({
                mensaje: "Falta asignar horario o variaciones para los trabajadores seleccionados. Revisa el formulario.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        if (valuesForm.computo === 3 && hayPrecioHoraS && valuesForm.mensualPactado) {
            setAlert({
                mensaje: "Revisa el formulario, solo puede haber un tipo de cómputo de horas.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        //comprobación que el tipo de servicio seleccionado corresponda con el precio/hora estipulado
        for (let i = 0; i < horarioIntervencion.tipoRegistroTrabajador.length; i++) {
            if (valuesForm.computo === 2 || (valuesForm.computo === 3 && !valuesForm.mensualPactado)) {
                const correspPreHorTipoSer = tipoServicio.some(servicio => {
                    return diasSemana.some(dia => {
                        return (horarioIntervencion.tipoRegistroTrabajador[i][`${dia.value}TipoServicio`] === servicio.value
                            && !valuesForm[`precioHora_${servicio.prefix}`])
                    });
                });
                if (correspPreHorTipoSer) {
                    setAlert({
                        mensaje: "Debe asignarse un precio/hora al tipo de servicio seleccionado o viceversa.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            };
        };
        //validacion mail
        if (valuesFormGenerales.mail) {
            const validacionMail = dispatch(validarMailAccion(valuesFormGenerales.mail));
            if (!validacionMail) {
                setAlert({
                    mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
        };
        if (valuesFormGenerales.mail2) {
            const validacionMail2 = dispatch(validarMailAccion(valuesFormGenerales.mail2));
            if (!validacionMail2) {
                setAlert({
                    mensaje: "El campo E-mail es incorrecto. Revisa el formulario.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
        };
        if (horarioIntervencion.tipo === "rango") {
            for (let i = 0; i < horarioIntervencion.tipoRegistroTrabajador.length; i++) {
                const horarioTrabajador = horarioIntervencion.tipoRegistroTrabajador[i];
                //primera comprobación, que todos los campos esten vacíos
                const camposRangoVacios = diasSemana.every(dia => {
                    return !horarioTrabajador[`${dia.value}InicioRango`] &&
                        !horarioTrabajador[`${dia.value}FinRango`];
                });
                if (camposRangoVacios) {
                    setAlert({
                        mensaje: "No has introducido ningún dato horario para registrar.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                //segunda comprobación, coinciden ambas casillas en registro
                const noCoincidenCamposRango = diasSemana.some(dia => {
                    return (!horarioTrabajador[`${dia.value}InicioRango`] &&
                        horarioTrabajador[`${dia.value}FinRango`]) ||
                        (horarioTrabajador[`${dia.value}InicioRango`] &&
                            !horarioTrabajador[`${dia.value}FinRango`]);
                });
                if (noCoincidenCamposRango) {
                    setAlert({
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                //tercera comprobacion que no falte tipo de servicio
                const noCoincideTipoServicioRango = diasSemana.some(dia => {
                    return (horarioTrabajador[`${dia.value}InicioRango`] &&
                        !horarioTrabajador[`${dia.value}TipoServicio`]) ||
                        (!horarioTrabajador[`${dia.value}InicioRango`] &&
                            horarioTrabajador[`${dia.value}TipoServicio`]);
                });
                if (noCoincideTipoServicioRango) {
                    setAlert({
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            };
        };
        if (horarioIntervencion.tipo === "rangoDescanso") {
            for (let i = 0; i < horarioIntervencion.tipoRegistroTrabajador.length; i++) {
                const horarioTrabajador = horarioIntervencion.tipoRegistroTrabajador[i];
                //primera comprobación, que todos los campos esten vacíos
                const camposRangoDescansoVacios = diasSemana.every(dia => {
                    return !horarioTrabajador[`${dia.value}Inicio1RangoDescanso`] &&
                        !horarioTrabajador[`${dia.value}Inicio2RangoDescanso`] &&
                        !horarioTrabajador[`${dia.value}Fin1RangoDescanso`] &&
                        !horarioTrabajador[`${dia.value}Fin2RangoDescanso`]
                });
                if (camposRangoDescansoVacios) {
                    setAlert({
                        mensaje: "No has introducido ningún dato horario para registrar.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                //segunda comprobación, coinciden todas las casillas en registro
                const noCoincidenCamposRangoDescanso = diasSemana.some(dia => {
                    return (!horarioTrabajador[`${dia.value}Inicio1RangoDescanso`] &&
                        horarioTrabajador[`${dia.value}Fin1RangoDescanso`]) ||
                        (!horarioTrabajador[`${dia.value}Fin1RangoDescanso`] &&
                            horarioTrabajador[`${dia.value}Inicio1RangoDescanso`]) ||
                        (!horarioTrabajador[`${dia.value}Inicio2RangoDescanso`] &&
                            horarioTrabajador[`${dia.value}Fin2RangoDescanso`]) ||
                        (!horarioTrabajador[`${dia.value}Fin2RangoDescanso`] &&
                            horarioTrabajador[`${dia.value}Inicio2RangoDescanso`]);
                });
                if (noCoincidenCamposRangoDescanso) {
                    setAlert({
                        mensaje: "El rango de horas en alguna casilla es erróneo o está incompleto.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                //tercera comprobacion que no falte tipo de servicio
                const noCoincideTipoServicioRangoDescanso = diasSemana.some(dia => {
                    return ((horarioTrabajador[`${dia.value}Inicio1RangoDescanso`] &&
                        !horarioTrabajador[`${dia.value}TipoServicio`]) ||
                        (!horarioTrabajador[`${dia.value}Inicio1RangoDescanso`] &&
                            horarioTrabajador[`${dia.value}TipoServicio`]));
                });
                if (noCoincideTipoServicioRangoDescanso) {
                    setAlert({
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            };
        };
        if (horarioIntervencion.tipo === "cantidad") {
            for (let i = 0; i < horarioIntervencion.tipoRegistroTrabajador.length; i++) {
                const horarioTrabajador = horarioIntervencion.tipoRegistroTrabajador[i];
                //comprobamos que no haya campos vacíos
                const camposCantidadVacios = diasSemana.every(dia => {
                    return horarioTrabajador[`${dia.value}Cantidad`] === '';
                });
                if (camposCantidadVacios) {
                    setAlert({
                        mensaje: "No has introducido ningún dato horario para registrar.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
                //tercera comprobacion que no falte tipo de servicio
                const noCoincideTipoServicioCantidad = diasSemana.some(dia => {
                    return ((horarioTrabajador[`${dia.value}Cantidad`] &&
                        !horarioTrabajador[`${dia.value}TipoServicio`]) ||
                        (!horarioTrabajador[`${dia.value}Cantidad`] &&
                            horarioTrabajador[`${dia.value}TipoServicio`]));
                });
                if (noCoincideTipoServicioCantidad) {
                    setAlert({
                        mensaje: "Falta seleccionar el tipo de servicio para el rango horario o viceversa.",
                        tipo: 'error'
                    })
                    setOpenSnack(true);
                    return;
                };
            };
        };
        //comprobamos que array objetos trabajadores no tenga elementos vacíos
        for (let i = 0; i < trabajadores.cantidad; i++) {
            if (trabajadores.trabajadores[i]['trabajador_' + (i + 1)] === '' && trabajadores.trabajadores[i]['suplente_' + (i + 1)] === '') {
                setAlert({
                    mensaje: "Alguno de los registros Trabajadores - Suplentes está vacío. Completa o cambia la cantidad de trabajadores asignados.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            }
        };
        //limpieza final  
        const horarioIntervencionRevisado = {
            tipo: horarioIntervencion.tipo,
            tipoRegistro: horarioIntervencion.tipoRegistro,
            variacion: horarioIntervencion.variacion,
            excepcion: horarioIntervencion.excepcion,
            tipoRegistroTrabajador:
                horarioIntervencion.tipo === 'rango' ?
                    (horarioIntervencion.tipoRegistroTrabajador.map(registro => (
                        diasSemana.reduce((acc, dia) => {
                            if (registro[`${dia.value}InicioRango`]) {
                                acc[`${dia.value}InicioRango`] = registro[`${dia.value}InicioRango`];
                                acc[`${dia.value}FinRango`] = registro[`${dia.value}FinRango`];
                                acc[`${dia.value}TipoServicio`] = registro[`${dia.value}TipoServicio`];
                            };
                            return acc;
                        }, {})
                    ))) : horarioIntervencion.tipo === 'rangoDescanso' ?
                        (horarioIntervencion.tipoRegistroTrabajador.map(registro => (
                            diasSemana.reduce((acc, dia) => {
                                if (registro[`${dia.value}Inicio1RangoDescanso`]) {
                                    acc[`${dia.value}Inicio1RangoDescanso`] = registro[`${dia.value}Inicio1RangoDescanso`];
                                    acc[`${dia.value}Fin1RangoDescanso`] = registro[`${dia.value}Fin1RangoDescanso`];
                                    if (registro[`${dia.value}Inicio2RangoDescanso`]) {
                                        acc[`${dia.value}Inicio2RangoDescanso`] = registro[`${dia.value}Inicio2RangoDescanso`];
                                        acc[`${dia.value}Fin2RangoDescanso`] = registro[`${dia.value}Fin2RangoDescanso`];
                                    };
                                    acc[`${dia.value}TipoServicio`] = registro[`${dia.value}TipoServicio`];
                                };
                                return acc;
                            }, {})
                        ))) : horarioIntervencion.tipo === 'cantidad' ?
                            (horarioIntervencion.tipoRegistroTrabajador.map(registro => (
                                diasSemana.reduce((acc, dia) => {
                                    if (registro[`${dia.value}Cantidad`]) {
                                        acc[`${dia.value}Cantidad`] = registro[`${dia.value}Cantidad`];
                                        acc[`${dia.value}TipoServicio`] = registro[`${dia.value}TipoServicio`];
                                    };
                                    return acc;
                                }, {})
                            ))) : null
        };
        //revisión horario correcto
        let errorEnHorario = false;
        horarioIntervencion.tipoRegistroTrabajador.forEach((harario, index) => {
            if (Object.values(horarioIntervencion.tipoRegistroTrabajador[index]).indexOf('NaN:NaN') > -1) {
                errorEnHorario = true;
            };
        });
        if (errorEnHorario) {
            setAlert({
                mensaje: "Alguna casilla del Horario trabajadores contiene datos erróneos. Revísalo antes de actualizar.",
                tipo: 'error'
            })
            setOpenSnack(true);
            return
        };
        //añadimos cómputo final        
        let elHorarioIntervencionEditadoRevisado = {
            ...horarioIntervencionRevisado,
            computo: valuesForm.computo,
            ...(valuesForm.mensualPactado && {
                mensualPactado: parseFloat(valuesForm.mensualPactado)
            }),
            ...tipoServicio.reduce((acc, curr) => {
                if (valuesForm[`precioHora_${curr.prefix}`]) {
                    acc[`precioHora_${curr.prefix}`] = parseFloat(valuesForm[`precioHora_${curr.prefix}`]);
                };
                return acc;
            }, {})
        };
        let serviciosFijosEdicion = {
            objeto: 'serviciosFijos',
            servicio: tiposServicioFijo.filter(servicio => (
                valuesForm[`precioHora_${servicio.prefix}`] || valuesForm[`int_${servicio.prefix}`]
            )).map(servicio => ({
                tipoServiciofijo: servicio.value,
                [`precioHora_${servicio.prefix}`]: valuesForm[`precioHora_${servicio.prefix}`] ? parseFloat(valuesForm[`precioHora_${servicio.prefix}`]) : null,
                [`variacion_${servicio.prefix}`]: 3,
                [`diaVariacion_${servicio.prefix}`]: '',
                [`activo_${servicio.prefix}`]: valuesForm[`activo_${servicio.prefix}`],
                [`int_${servicio.prefix}`]: valuesForm[`int_${servicio.prefix}`],
                [`trab_${servicio.prefix}`]: valuesForm[`trab_${servicio.prefix}`] ? parseInt(valuesForm[`trab_${servicio.prefix}`]) : null
            }))
        };
        if (serviciosFijosEdicion.servicio.length === 0) {
            serviciosFijosEdicion = null;
        };
        if (!hayHorario) {
            elHorarioIntervencionEditadoRevisado = null;
        };
        const trabajadoresRevisado = valuesForm.numeroTrabajadores === '' ? null : trabajadores;
        return resolve({ resuelto: true, horario: elHorarioIntervencionEditadoRevisado, servicios: serviciosFijosEdicion, trabajadores: trabajadoresRevisado });
    });
};