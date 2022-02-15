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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//estilos
import Clases from "../clases";

const tiposDeServicio = Constantes.TIPO_SERVICIO_FIJO;
const variacionesServiciosFijos = Constantes.VARIACIONES_SERVICIOS_FIJOS_CENTROS;
const diasSemana = Constantes.DIAS_SEMANA;

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
            precioHora_FT: props.prItemEditandoServiciosFijos.servicios.precioHora_FT || '',
            variacion_TO: props.prItemEditandoServiciosFijos.servicios.variacion_TO || '',
            variacion_CR: props.prItemEditandoServiciosFijos.servicios.variacion_CR || '',
            variacion_CE: props.prItemEditandoServiciosFijos.servicios.variacion_CE || '',
            variacion_CI: props.prItemEditandoServiciosFijos.servicios.variacion_CI || '',
            variacion_MO: props.prItemEditandoServiciosFijos.servicios.variacion_MO || '',
            variacion_OF: props.prItemEditandoServiciosFijos.servicios.variacion_OF || '',
            variacion_AL: props.prItemEditandoServiciosFijos.servicios.variacion_AL || '',
            variacion_LA: props.prItemEditandoServiciosFijos.servicios.variacion_LA || '',
            variacion_TE: props.prItemEditandoServiciosFijos.servicios.variacion_TE || '',
            variacion_FI: props.prItemEditandoServiciosFijos.servicios.variacion_FI || '',
            variacion_FE: props.prItemEditandoServiciosFijos.servicios.variacion_FE || '',
            variacion_AB: props.prItemEditandoServiciosFijos.servicios.variacion_AB || '',
            variacion_MA: props.prItemEditandoServiciosFijos.servicios.variacion_MA || '',
            variacion_PO: props.prItemEditandoServiciosFijos.servicios.variacion_PO || '',
            variacion_BA: props.prItemEditandoServiciosFijos.servicios.variacion_BA || '',
            variacion_FT: props.prItemEditandoServiciosFijos.servicios.variacion_FT || '',
            diaVariacion_TO: props.prItemEditandoServiciosFijos.servicios.diaVariacion_TO || '',
            diaVariacion_CR: props.prItemEditandoServiciosFijos.servicios.diaVariacion_CR || '',
            diaVariacion_CE: props.prItemEditandoServiciosFijos.servicios.diaVariacion_CE || '',
            diaVariacion_CI: props.prItemEditandoServiciosFijos.servicios.diaVariacion_CI || '',
            diaVariacion_MO: props.prItemEditandoServiciosFijos.servicios.diaVariacion_MO || '',
            diaVariacion_OF: props.prItemEditandoServiciosFijos.servicios.diaVariacion_OF || '',
            diaVariacion_AL: props.prItemEditandoServiciosFijos.servicios.diaVariacion_AL || '',
            diaVariacion_LA: props.prItemEditandoServiciosFijos.servicios.diaVariacion_LA || '',
            diaVariacion_TE: props.prItemEditandoServiciosFijos.servicios.diaVariacion_TE || '',
            diaVariacion_FI: props.prItemEditandoServiciosFijos.servicios.diaVariacion_FI || '',
            diaVariacion_FE: props.prItemEditandoServiciosFijos.servicios.diaVariacion_FE || '',
            diaVariacion_AB: props.prItemEditandoServiciosFijos.servicios.diaVariacion_AB || '',
            diaVariacion_MA: props.prItemEditandoServiciosFijos.servicios.diaVariacion_MA || '',
            diaVariacion_PO: props.prItemEditandoServiciosFijos.servicios.diaVariacion_PO || '',
            diaVariacion_BA: props.prItemEditandoServiciosFijos.servicios.diaVariacion_BA || '',
            diaVariacion_FT: props.prItemEditandoServiciosFijos.servicios.diaVariacion_FT || ''
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
        let checkeado, laLabelSw, elId, elValue, elPrecioHora, laClase, elValueVariaciones, laVariacion, elValueDia, elDia;
        switch (tipo.value) {
            case 'TOL':
                checkeado = props.prItemEditandoServiciosFijos.switch.TO;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE TOLDOS';
                elId = 'form-precio-hora_TO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_TO || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_TO || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_TO || '';               
                elPrecioHora = 'precioHora_TO';
                laVariacion = 'variacion_TO';
                elDia = 'diaVariacion_TO';
                break;
            case 'CRIS':
                checkeado = props.prItemEditandoServiciosFijos.switch.CR;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE CRISTALES';
                elId = 'form-precio-hora_CR-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CR || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_CR || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_CR || '';               
                elPrecioHora = 'precioHora_CR';
                laVariacion = 'variacion_CR';
                elDia = 'diaVariacion_CR';
                break;
            case 'CRISE':
                checkeado = props.prItemEditandoServiciosFijos.switch.CE;
                laLabelSw = 'LIMPIEZA CRISTALES EXTERIORES';
                elId = 'form-precio-hora_CE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CE || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_CE || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_CE || '';             
                elPrecioHora = 'precioHora_CE';
                laVariacion = 'variacion_CE';
                elDia = 'diaVariacion_CE';
                break;
            case 'CRISI':
                checkeado = props.prItemEditandoServiciosFijos.switch.CI;
                laLabelSw = 'LIMPIEZA CRISTALES INTERIORES';
                elId = 'form-precio-hora_CI-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CI || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_CI || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_CI || '';               
                elPrecioHora = 'precioHora_CI';
                laVariacion = 'variacion_CI';
                elDia = 'diaVariacion_CI';
                break;
            case 'MOQ':
                checkeado = props.prItemEditandoServiciosFijos.switch.MO;
                laLabelSw = 'SERVICIO DE LIMPIEZA MOQUETA';
                elId = 'form-precio-hora_MO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_MO || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_MO || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_MO || '';              
                elPrecioHora = 'precioHora_MO';
                laVariacion = 'variacion_MO';
                elDia = 'diaVariacion_MO';
                break;
            case 'OF':
                checkeado = props.prItemEditandoServiciosFijos.switch.OF;
                laLabelSw = 'SERVICIO DE LIMPIEZA OFICINAS';
                elId = 'form-precio-hora_OF-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_OF || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_OF || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_OF || '';              
                elPrecioHora = 'precioHora_OF';
                laVariacion = 'variacion_OF';
                elDia = 'diaVariacion_OF';
                break;
            case 'ALMC':
                checkeado = props.prItemEditandoServiciosFijos.switch.AL;
                laLabelSw = 'SERVICIO DE LIMPIEZA ALMACENES';
                elId = 'form-precio-hora_AL-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_AL || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_AL || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_AL || '';            
                elPrecioHora = 'precioHora_AL';
                laVariacion = 'variacion_AL';
                elDia = 'diaVariacion_AL';
                break;
            case 'LAB':
                checkeado = props.prItemEditandoServiciosFijos.switch.LA;
                laLabelSw = 'SERVICIO DE LIMPIEZA LABORATORIO';
                elId = 'form-precio-hora_LA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_LA || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_LA || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_LA || '';               
                elPrecioHora = 'precioHora_LA';
                laVariacion = 'variacion_LA';
                elDia = 'diaVariacion_LA';
                break;
            case 'TELÑ':
                checkeado = props.prItemEditandoServiciosFijos.switch.TE;
                laLabelSw = 'SERVICIO DE LIMPIEZA TELARAÑAS';
                elId = 'form-precio-hora_TE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_TE || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_TE || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_TE || '';                
                elPrecioHora = 'precioHora_TE';
                laVariacion = 'variacion_TE';
                elDia = 'diaVariacion_TE';
                break;
            case 'FCH.IN':
                checkeado = props.prItemEditandoServiciosFijos.switch.FI;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA INTERIOR';
                elId = 'form-precio-hora_FI-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FI || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_FI || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_FI || '';               
                elPrecioHora = 'precioHora_FI';
                laVariacion = 'variacion_FI';
                elDia = 'diaVariacion_FI';
                break;
            case 'FCH.EX':
                checkeado = props.prItemEditandoServiciosFijos.switch.FE;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA EXTERIOR';
                elId = 'form-precio-hora_FE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FE || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_FE || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_FE || '';               
                elPrecioHora = 'precioHora_FE';
                laVariacion = 'variacion_FE';
                elDia = 'diaVariacion_FE';
                break;
            case 'ABRLL':
                checkeado = props.prItemEditandoServiciosFijos.switch.AB;
                laLabelSw = 'SERVICIO DE LIMPIEZA ABRILLANTADO';
                elId = 'form-precio-hora_AB-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_AB || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_AB || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_AB || '';              
                elPrecioHora = 'precioHora_AB';
                laVariacion = 'variacion_AB';
                elDia = 'diaVariacion_AB';
                break;
            case 'MANT':
                checkeado = props.prItemEditandoServiciosFijos.switch.MA;
                laLabelSw = 'SERVICIO DE MANTENIMIENTO MÁQUINA';
                elId = 'form-precio-hora_MA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_MA || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_MA || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_MA || '';              
                elPrecioHora = 'precioHora_MA';
                laVariacion = 'variacion_MA';
                elDia = 'diaVariacion_MA';
                break;
            case 'PORT':
                checkeado = props.prItemEditandoServiciosFijos.switch.PO;
                laLabelSw = 'SERVICIO DE LIMPIEZA PORTERÍA';
                elId = 'form-precio-hora_PO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_PO || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_PO || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_PO || '';               
                elPrecioHora = 'precioHora_PO';
                laVariacion = 'variacion_PO';
                elDia = 'diaVariacion_PO';
                break;
            case 'BACT':
                checkeado = props.prItemEditandoServiciosFijos.switch.BA;
                laLabelSw = 'BOT. NOUBACT';
                elId = 'form-precio-hora_BA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_BA || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_BA || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_BA || '';             
                elPrecioHora = 'precioHora_BA';
                laVariacion = 'variacion_BA';
                elDia = 'diaVariacion_BA';
                laVariacion = 'variacion_FT';
                elDia = 'diaVariacion_FT';
                break;
            case 'FEST':
                checkeado = props.prItemEditandoServiciosFijos.switch.FT;
                laLabelSw = 'SERVICIO DE LIMPIEZA DÍA FESTIVO';
                elId = 'form-precio-hora_FT-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FT || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_FT || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_FT || '';              
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
                <Grid item xs={5} >
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
                <Grid item xs={2}>
                    <FormControl
                        variant="outlined"
                        className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                        size="small"
                    >
                        <InputLabel>Precio</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id={elId}
                            value={elValue || ''}
                            onChange={handleChangeFormConfiguracionServiciosFijos('input', elPrecioHora)}
                            labelWidth={50}
                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl
                        variant="outlined"
                        className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                        size="small"
                    >
                        <InputLabel>Variaciones</InputLabel>
                        <Select
                            fullWidth
                            value={elValueVariaciones || ''}
                            onChange={handleChangeFormConfiguracionServiciosFijos('select', laVariacion)}
                            helpertext="Selecciona variaciones"
                            label="Variaciones"
                        >
                            {variacionesServiciosFijos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl
                        variant="outlined"
                        className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                        size="small"
                    >
                        <InputLabel>Día</InputLabel>
                        <Select
                            fullWidth
                            value={elValueDia || ''}
                            onChange={handleChangeFormConfiguracionServiciosFijos('select', elDia)}
                            helpertext="Selecciona Día"
                            label="Día"
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
                            {diasSemana.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    };

    return (
        <div>
            {tiposDeServicio.map((tipo, index) => (
                retornaTipoServicioFijoCuadrantes(tipo, index)
            ))}
            {/* {console.log('valoresPreviosServicios: ',valoresPreviosServicios)} */}
        </div>
    )
}

export default ServiciosFijos
