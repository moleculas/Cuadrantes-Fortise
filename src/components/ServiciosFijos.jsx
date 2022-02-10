import React, { useEffect, useState } from 'react';
import Constantes from "../constantes";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from "@material-ui/core/OutlinedInput";

//estilos
import Clases from "../clases";

const tiposDeServicio = Constantes.TIPO_SERVICIO_FIJO;

const ServiciosFijos = (props) => {

    const classes = Clases();

    const [valoresPreviosServiciosFijos, setValoresPreviosServiciosFijos] = useState({
        switch: {
            TO: props.prItemEditandoServiciosFijos.switch.TO || false,
            CR: props.prItemEditandoServiciosFijos.switch.CR || false,
            CE: props.prItemEditandoServiciosFijos.switch.CE || false,
            CI: props.prItemEditandoServiciosFijos.switch.CI || false,
            MO: props.prItemEditandoServiciosFijos.switch.MO || false,
            OF: props.prItemEditandoServiciosFijos.switch.OF || false,
            AL: props.prItemEditandoServiciosFijos.switch.AL || false,
            LA: props.prItemEditandoServiciosFijos.switch.LA || false,
            TE: props.prItemEditandoServiciosFijos.switch.TE || false,
            FI: props.prItemEditandoServiciosFijos.switch.FI || false,
            FE: props.prItemEditandoServiciosFijos.switch.FT || false,
            AB: props.prItemEditandoServiciosFijos.switch.AB || false,
            MA: props.prItemEditandoServiciosFijos.switch.MA || false,
            PO: props.prItemEditandoServiciosFijos.switch.PO || false,
            BA: props.prItemEditandoServiciosFijos.switch.BA || false,
            FT: props.prItemEditandoServiciosFijos.switch.FT || false
        },
        servicios: {
            precioHora_TO: props.prItemEditandoServiciosFijos.servicios.precioHora_TO || '',
            precioHora_CR: props.prItemEditandoServiciosFijos.servicios.precioHora_CR || '',
            precioHora_CE: props.prItemEditandoServiciosFijos.servicios.precioHora_CE || '',
            precioHora_CI: props.prItemEditandoServiciosFijos.servicios.precioHora_CI || '',
            precioHora_MO: props.prItemEditandoServiciosFijos.servicios.precioHora_MO || '',
            precioHora_OF: props.prItemEditandoServiciosFijos.servicios.precioHora_OF || '',
            precioHora_AL: props.prItemEditandoServiciosFijos.servicios.precioHora_AL || '',
            precioHora_LA: props.prItemEditandoServiciosFijos.servicios.precioHora_LA || '',
            precioHora_TE: props.prItemEditandoServiciosFijos.servicios.precioHora_TE || '',
            precioHora_FI: props.prItemEditandoServiciosFijos.servicios.precioHora_FI || '',
            precioHora_FE: props.prItemEditandoServiciosFijos.servicios.precioHora_FE || '',
            precioHora_AB: props.prItemEditandoServiciosFijos.servicios.precioHora_AB || '',
            precioHora_MA: props.prItemEditandoServiciosFijos.servicios.precioHora_MA || '',
            precioHora_PO: props.prItemEditandoServiciosFijos.servicios.precioHora_PO || '',
            precioHora_BA: props.prItemEditandoServiciosFijos.servicios.precioHora_BA || '',
            precioHora_FT: props.prItemEditandoServiciosFijos.servicios.precioHora_FT || ''
        }

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

    //retorno componentes

    const retornaTipoServicioFijoCuadrantes = (tipo, index) => {
        let checkeado, laLabelSw, laLabelIn, elId, elValue, laLabelWi, elPrecioHora, laClase;
        switch (tipo.value) {
            case 'TOL':
                checkeado = props.prItemEditandoServiciosFijos.switch.TO;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE TOLDOS';
                laLabelIn = 'Precio TOL';
                elId = 'form-precio-hora_TO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_TO || '';
                laLabelWi = 90;
                elPrecioHora = 'precioHora_TO';
                break;
            case 'CRIS':
                checkeado = props.prItemEditandoServiciosFijos.switch.CR;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE CRISTALES';
                laLabelIn = 'Precio CRIS';
                elId = 'form-precio-hora_CR-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CR || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_CR';
                break;
            case 'CRISE':
                checkeado = props.prItemEditandoServiciosFijos.switch.CE;
                laLabelSw = 'LIMPIEZA CRISTALES EXTERIORES';
                laLabelIn = 'Precio CRISE';
                elId = 'form-precio-hora_CE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CE || '';
                laLabelWi = 110;
                elPrecioHora = 'precioHora_CE';
                break;
            case 'CRISI':
                checkeado = props.prItemEditandoServiciosFijos.switch.CI;
                laLabelSw = 'LIMPIEZA CRISTALES INTERIORES';
                laLabelIn = 'Precio CRISI';
                elId = 'form-precio-hora_CI-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CI || '';
                laLabelWi = 105;
                elPrecioHora = 'precioHora_CI';
                break;
            case 'MOQ':
                checkeado = props.prItemEditandoServiciosFijos.switch.MO;
                laLabelSw = 'SERVICIO DE LIMPIEZA MOQUETA';
                laLabelIn = 'Precio MOQ';
                elId = 'form-precio-hora_MO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_MO || '';
                laLabelWi = 95;
                elPrecioHora = 'precioHora_MO';
                break;
            case 'OF':
                checkeado = props.prItemEditandoServiciosFijos.switch.OF;
                laLabelSw = 'SERVICIO DE LIMPIEZA OFICINAS';
                laLabelIn = 'Precio OF';
                elId = 'form-precio-hora_OF-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_OF || '';
                laLabelWi = 80;
                elPrecioHora = 'precioHora_OF';
                break;
            case 'ALMC':
                checkeado = props.prItemEditandoServiciosFijos.switch.AL;
                laLabelSw = 'SERVICIO DE LIMPIEZA ALMACENES';
                laLabelIn = 'Precio ALMC';
                elId = 'form-precio-hora_AL-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_AL || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_AL';
                break;
            case 'LAB':
                checkeado = props.prItemEditandoServiciosFijos.switch.LA;
                laLabelSw = 'SERVICIO DE LIMPIEZA LABORATORIO';
                laLabelIn = 'Precio LAB';
                elId = 'form-precio-hora_LA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_LA || '';
                laLabelWi = 90;
                elPrecioHora = 'precioHora_LA';
                break;
            case 'TELÑ':
                checkeado = props.prItemEditandoServiciosFijos.switch.TE;
                laLabelSw = 'SERVICIO DE LIMPIEZA TELARAÑAS';
                laLabelIn = 'Precio TELÑ';
                elId = 'form-precio-hora_TE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_TE || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_TE';
                break;
            case 'FCH.IN':
                checkeado = props.prItemEditandoServiciosFijos.switch.FI;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA INTERIOR';
                laLabelIn = 'Precio FCH.IN';
                elId = 'form-precio-hora_FI-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FI || '';
                laLabelWi = 120;
                elPrecioHora = 'precioHora_FI';
                break;
            case 'FCH.EX':
                checkeado = props.prItemEditandoServiciosFijos.switch.FE;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA EXTERIOR';
                laLabelIn = 'Precio FCH.EX';
                elId = 'form-precio-hora_FE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FE || '';
                laLabelWi = 120;
                elPrecioHora = 'precioHora_FE';
                break;
            case 'ABRLL':
                checkeado = props.prItemEditandoServiciosFijos.switch.AB;
                laLabelSw = 'SERVICIO DE LIMPIEZA ABRILLANTADO';
                laLabelIn = 'Precio ABRLL';
                elId = 'form-precio-hora_AB-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_AB || '';
                laLabelWi = 110;
                elPrecioHora = 'precioHora_AB';
                break;
            case 'MANT':
                checkeado = props.prItemEditandoServiciosFijos.switch.MA;
                laLabelSw = 'SERVICIO DE MANTENIMIENTO MÁQUINA';
                laLabelIn = 'Precio MANT';
                elId = 'form-precio-hora_MA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_MA || '';
                laLabelWi = 105;
                elPrecioHora = 'precioHora_MA';
                break;
            case 'PORT':
                checkeado = props.prItemEditandoServiciosFijos.switch.PO;
                laLabelSw = 'SERVICIO DE LIMPIEZA PORTERÍA';
                laLabelIn = 'Precio PORT';
                elId = 'form-precio-hora_PO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_PO || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_PO';
                break;
            case 'BACT':
                checkeado = props.prItemEditandoServiciosFijos.switch.BA;
                laLabelSw = 'BOT. NOUBACT';
                laLabelIn = 'Precio BACT';
                elId = 'form-precio-hora_BA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_BA || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_BA';
                break;
            case 'FEST':
                checkeado = props.prItemEditandoServiciosFijos.switch.FT;
                laLabelSw = 'SERVICIO DE LIMPIEZA DÍA FESTIVO';
                laLabelIn = 'Precio FEST';
                elId = 'form-precio-hora_FT-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FT || '';
                laLabelWi = 100;
                elPrecioHora = 'precioHora_FT';
                break;
            default:
        };
        return (
            <Grid
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="center"
                spacing={2}
                className={laClase}
                style={{ height: 65, paddingTop: 0, paddingLeft: 5, paddingBottom: 0, paddingRight: 15, marginRight: 25 }}
                key={'formServicio' + index}
            >
                <Grid item xs={8} >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checkeado}
                                name={elId}
                                color="secondary"
                                size="small"
                                onChange={handleChangeFormConfiguracionServiciosFijos('switch', null)}
                            />
                        }
                        label={<Typography style={{ fontSize: '0.8125rem' }}>{laLabelSw}</Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl
                        variant="outlined"
                        className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                        size="small"
                    >
                        <InputLabel>{laLabelIn}</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id={elId}
                            value={elValue || ''}
                            onChange={handleChangeFormConfiguracionServiciosFijos('input', elPrecioHora)}
                            labelWidth={laLabelWi}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        )
    };

    return (
        <div>
            {
                tiposDeServicio.map((tipo, index) => (
                    retornaTipoServicioFijoCuadrantes(tipo, index)
                ))
            }
            {/* {console.log('valoresPreviosServicios: ',valoresPreviosServicios)} */}
        </div>
    )
}

export default ServiciosFijos
