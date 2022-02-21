import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useSelector } from 'react-redux';

const SwitchServiciosFijos = (props) => {

    //constantes

    const cuadranteServiciosFijos = useSelector(store => store.variablesCuadrantes.cuadranteServiciosFijos);
    const variablesPopoverSFCasillas = props.prVariablesPopoverSFCasillas;

    //funciones

    const handleChangeSFCasillas = (postRef, indice, tipo) => (e) => {
        props.prHandleChangeSFCasillas(postRef, indice, tipo, e);
    };
    
    return (
        <Switch
            checked={cuadranteServiciosFijos[variablesPopoverSFCasillas.indice]['estados']['estadoCasillaDia' + (variablesPopoverSFCasillas.index + 1)]}
            onChange={handleChangeSFCasillas(variablesPopoverSFCasillas.postRef, variablesPopoverSFCasillas.indice, variablesPopoverSFCasillas.tipo)}
        />
    )
}

export default SwitchServiciosFijos