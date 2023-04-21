import React, { useEffect, useState } from 'react';
import Constantes from "../../constantes";

//carga componentes
import TipoServicioFijo from '../../comun/TipoServicioFijo';

//constantes
const tiposServicioFijo = Constantes.TIPO_SERVICIO_FIJO;

const ServiciosFijos = (props) => {
    const valoresPreviosServiciosFijos = {
        switch: {
            ...tiposServicioFijo.reduce((acc, curr) => {
                acc[`${curr.prefix}`] = props.prItemEditandoServiciosFijos.switch[`${curr.prefix}`] || false;
                return acc;
            }, {})
        },
        servicios: {
            ...tiposServicioFijo.reduce((acc, curr) => {
                acc[`precioHora_${curr.prefix}`] = props.prItemEditandoServiciosFijos.servicios[`precioHora_${curr.prefix}`] || '';
                acc[`variacion_${curr.prefix}`] = props.prItemEditandoServiciosFijos.servicios[`variacion_${curr.prefix}`] || '';
                acc[`diaVariacion_${curr.prefix}`] = props.prItemEditandoServiciosFijos.servicios[`diaVariacion_${curr.prefix}`] || '';
                acc[`activo_${curr.prefix}`] = props.prItemEditandoServiciosFijos.servicios[`activo_${curr.prefix}`] || '';
                acc[`int_${curr.prefix}`] = props.prItemEditandoServiciosFijos.servicios[`int_${curr.prefix}`] || false;
                acc[`trab_${curr.prefix}`] = props.prItemEditandoServiciosFijos.servicios[`trab_${curr.prefix}`] || '';
                return acc;
            }, {})
        },
        bloqueado: props.prItemEditandoServiciosFijos.bloqueado || ''
    };

    //useEffect

    useEffect(() => {
        gestionItemPrevioEditandoServiciosFijos(valoresPreviosServiciosFijos);
    }, []);

    //funciones

    const gestionItemPrevioEditandoServiciosFijos = (valores) => {
        props.prGestionItemPrevioEditandoServiciosFijos(valores);
    };

    const handleChangeFormConfiguracionServiciosFijos = (tipo, prop) => (e) => {
        props.prHandleChangeFormConfiguracionServiciosFijos(tipo, prop, e);
    };

    return (
        <div>
            {tiposServicioFijo.map((tipo, index) => (
                <TipoServicioFijo
                    key={"tipoServicioCuadrante-" + index}
                    formato={"cuadrantes"}
                    tipo={tipo}
                    index={index}
                    stateSwitchTipoServicioFijo={props.prItemEditandoServiciosFijos.switch}
                    valuesForm={props.prItemEditandoServiciosFijos.servicios}
                    handleChangeSwitchTipoServicioFijo={null}
                    disabledItem={false}
                    handleChangeForm={handleChangeFormConfiguracionServiciosFijos}
                />
            ))}
        </div>
    )
}

export default ServiciosFijos
