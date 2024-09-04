import React, { useEffect, useState } from 'react';
import Constantes from "../../constantes";

//carga componentes
import TipoServicioFijo from '../../comun/TipoServicioFijo';
import TipoServicioFijoPersonalizado from '../../comun/TipoServicioFijoPersonalizado';

//constantes
const tiposServicioFijo = Constantes.TIPO_SERVICIO_FIJO;

const ServiciosFijos = (props) => {
    const {
        itemEditandoServiciosFijos,
        serviciosFijosPersonalizados
    } = props;
    const [valoresPreviosServiciosFijos, setValoresPreviosServiciosFijos] = useState({
        switch: {
            ...tiposServicioFijo.reduce((acc, curr) => {
                acc[`${curr.prefix}`] = itemEditandoServiciosFijos.switch[`${curr.prefix}`] || false;
                return acc;
            }, {})
        },
        servicios: {
            ...tiposServicioFijo.reduce((acc, curr) => {
                acc[`precioHora_${curr.prefix}`] = itemEditandoServiciosFijos.servicios[`precioHora_${curr.prefix}`] || '';
                acc[`variacion_${curr.prefix}`] = itemEditandoServiciosFijos.servicios[`variacion_${curr.prefix}`] || '';
                acc[`diaVariacion_${curr.prefix}`] = itemEditandoServiciosFijos.servicios[`diaVariacion_${curr.prefix}`] || '';
                acc[`activo_${curr.prefix}`] = itemEditandoServiciosFijos.servicios[`activo_${curr.prefix}`] || '';
                acc[`int_${curr.prefix}`] = itemEditandoServiciosFijos.servicios[`int_${curr.prefix}`] || false;
                acc[`trab_${curr.prefix}`] = itemEditandoServiciosFijos.servicios[`trab_${curr.prefix}`] || '';
                return acc;
            }, {})
        },
        bloqueado: itemEditandoServiciosFijos.bloqueado || ''
    });

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
            {/* {console.log(serviciosFijosPersonalizados)} */}
            {serviciosFijosPersonalizados && (
                [...serviciosFijosPersonalizados].reverse().map((servicioPersonalizado, index, array) => {
                    //modificador: servicios fijos personalizados
                    const originalIndex = array.length - 1 - index;
                    return (
                        <TipoServicioFijoPersonalizado
                            key={`tipoServicioPersonalizadoCuadrante-${originalIndex}`}
                            index={originalIndex}
                            servicioPersonalizado={servicioPersonalizado}
                            servicioPersonalizadoPrefix={`P${originalIndex + 1}`}
                        />
                    )
                })
            )}
            {tiposServicioFijo.map((tipo, index) => (
                <TipoServicioFijo
                    key={`tipoServicioCuadrante-${index}`}
                    formato={"cuadrantes"}
                    tipo={tipo}
                    index={index}
                    stateSwitchTipoServicioFijo={itemEditandoServiciosFijos.switch}
                    valuesForm={itemEditandoServiciosFijos.servicios}
                    handleChangeSwitchTipoServicioFijo={null}
                    disabledItem={false}
                    handleChangeForm={handleChangeFormConfiguracionServiciosFijos}
                />
            ))}
        </div>
    )
}

export default ServiciosFijos
