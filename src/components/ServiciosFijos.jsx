import React, { useEffect, useState } from 'react';
import Constantes from "../constantes";
import { useSelector } from 'react-redux';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Checkbox from '@material-ui/core/Checkbox';

//estilos
import Clases from "../clases";

//constantes
const tiposDeServicio = Constantes.TIPO_SERVICIO_FIJO;
const variacionesServiciosFijos = Constantes.VARIACIONES_SERVICIOS_FIJOS_CENTROS;
const diasSemana = Constantes.DIAS_SEMANA;

const ServiciosFijos = (props) => {

    const classes = Clases();
    const arrayTrabajadoresSubcategoria = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresSubcategoria);

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
            FT: props.prItemEditandoServiciosFijos.switch.FT || false,
            C3: props.prItemEditandoServiciosFijos.switch.C3 || false,
            C2: props.prItemEditandoServiciosFijos.switch.C2 || false,
            ES: props.prItemEditandoServiciosFijos.switch.ES || false,
            PA: props.prItemEditandoServiciosFijos.switch.PA || false
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
            precioHora_C3: props.prItemEditandoServiciosFijos.servicios.precioHora_C3 || '',
            precioHora_C2: props.prItemEditandoServiciosFijos.servicios.precioHora_C2 || '',
            precioHora_ES: props.prItemEditandoServiciosFijos.servicios.precioHora_ES || '',
            precioHora_PA: props.prItemEditandoServiciosFijos.servicios.precioHora_PA || '',
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
            variacion_C3: props.prItemEditandoServiciosFijos.servicios.variacion_C3 || '',
            variacion_C2: props.prItemEditandoServiciosFijos.servicios.variacion_C2 || '',
            variacion_ES: props.prItemEditandoServiciosFijos.servicios.variacion_ES || '',
            variacion_PA: props.prItemEditandoServiciosFijos.servicios.variacion_PA || '',
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
            diaVariacion_FT: props.prItemEditandoServiciosFijos.servicios.diaVariacion_FT || '',
            diaVariacion_C3: props.prItemEditandoServiciosFijos.servicios.diaVariacion_C3 || '',
            diaVariacion_C2: props.prItemEditandoServiciosFijos.servicios.diaVariacion_C2 || '',
            diaVariacion_ES: props.prItemEditandoServiciosFijos.servicios.diaVariacion_ES || '',
            diaVariacion_PA: props.prItemEditandoServiciosFijos.servicios.diaVariacion_PA || '',
            activo_TO: props.prItemEditandoServiciosFijos.servicios.activo_TO || '',
            activo_CR: props.prItemEditandoServiciosFijos.servicios.activo_CR || '',
            activo_CE: props.prItemEditandoServiciosFijos.servicios.activo_CE || '',
            activo_CI: props.prItemEditandoServiciosFijos.servicios.activo_CI || '',
            activo_MO: props.prItemEditandoServiciosFijos.servicios.activo_MO || '',
            activo_OF: props.prItemEditandoServiciosFijos.servicios.activo_OF || '',
            activo_AL: props.prItemEditandoServiciosFijos.servicios.activo_AL || '',
            activo_LA: props.prItemEditandoServiciosFijos.servicios.activo_LA || '',
            activo_TE: props.prItemEditandoServiciosFijos.servicios.activo_TE || '',
            activo_FI: props.prItemEditandoServiciosFijos.servicios.activo_FI || '',
            activo_FE: props.prItemEditandoServiciosFijos.servicios.activo_FE || '',
            activo_AB: props.prItemEditandoServiciosFijos.servicios.activo_AB || '',
            activo_MA: props.prItemEditandoServiciosFijos.servicios.activo_MA || '',
            activo_PO: props.prItemEditandoServiciosFijos.servicios.activo_PO || '',
            activo_BA: props.prItemEditandoServiciosFijos.servicios.activo_BA || '',
            activo_FT: props.prItemEditandoServiciosFijos.servicios.activo_FT || '',
            activo_C3: props.prItemEditandoServiciosFijos.servicios.activo_C3 || '',
            activo_C2: props.prItemEditandoServiciosFijos.servicios.activo_C2 || '',
            activo_ES: props.prItemEditandoServiciosFijos.servicios.activo_ES || '',
            activo_PA: props.prItemEditandoServiciosFijos.servicios.activo_PA || '',
            int_TO: props.prItemEditandoServiciosFijos.servicios.int_TO || false,
            int_CR: props.prItemEditandoServiciosFijos.servicios.int_CR || false,
            int_CE: props.prItemEditandoServiciosFijos.servicios.int_CE || false,
            int_CI: props.prItemEditandoServiciosFijos.servicios.int_CI || false,
            int_MO: props.prItemEditandoServiciosFijos.servicios.int_MO || false,
            int_OF: props.prItemEditandoServiciosFijos.servicios.int_OF || false,
            int_AL: props.prItemEditandoServiciosFijos.servicios.int_AL || false,
            int_LA: props.prItemEditandoServiciosFijos.servicios.int_LA || false,
            int_TE: props.prItemEditandoServiciosFijos.servicios.int_TE || false,
            int_FI: props.prItemEditandoServiciosFijos.servicios.int_FI || false,
            int_FE: props.prItemEditandoServiciosFijos.servicios.int_FE || false,
            int_AB: props.prItemEditandoServiciosFijos.servicios.int_AB || false,
            int_MA: props.prItemEditandoServiciosFijos.servicios.int_MA || false,
            int_PO: props.prItemEditandoServiciosFijos.servicios.int_PO || false,
            int_BA: props.prItemEditandoServiciosFijos.servicios.int_BA || false,
            int_FT: props.prItemEditandoServiciosFijos.servicios.int_FT || false,
            int_C3: props.prItemEditandoServiciosFijos.servicios.int_C3 || false,
            int_C2: props.prItemEditandoServiciosFijos.servicios.int_C2 || false,
            int_ES: props.prItemEditandoServiciosFijos.servicios.int_ES || false,
            int_PA: props.prItemEditandoServiciosFijos.servicios.int_PA || false,
            trab_TO: props.prItemEditandoServiciosFijos.servicios.trab_TO || '',
            trab_CR: props.prItemEditandoServiciosFijos.servicios.trab_CR || '',
            trab_CE: props.prItemEditandoServiciosFijos.servicios.trab_CE || '',
            trab_CI: props.prItemEditandoServiciosFijos.servicios.trab_CI || '',
            trab_MO: props.prItemEditandoServiciosFijos.servicios.trab_MO || '',
            trab_OF: props.prItemEditandoServiciosFijos.servicios.trab_OF || '',
            trab_AL: props.prItemEditandoServiciosFijos.servicios.trab_AL || '',
            trab_LA: props.prItemEditandoServiciosFijos.servicios.trab_LA || '',
            trab_TE: props.prItemEditandoServiciosFijos.servicios.trab_TE || '',
            trab_FI: props.prItemEditandoServiciosFijos.servicios.trab_FI || '',
            trab_FE: props.prItemEditandoServiciosFijos.servicios.trab_FE || '',
            trab_AB: props.prItemEditandoServiciosFijos.servicios.trab_AB || '',
            trab_MA: props.prItemEditandoServiciosFijos.servicios.trab_MA || '',
            trab_PO: props.prItemEditandoServiciosFijos.servicios.trab_PO || '',
            trab_BA: props.prItemEditandoServiciosFijos.servicios.trab_BA || '',
            trab_FT: props.prItemEditandoServiciosFijos.servicios.trab_FT || '',
            trab_C3: props.prItemEditandoServiciosFijos.servicios.trab_C3 || '',
            trab_C2: props.prItemEditandoServiciosFijos.servicios.trab_C2 || '',
            trab_ES: props.prItemEditandoServiciosFijos.servicios.trab_ES || '',
            trab_PA: props.prItemEditandoServiciosFijos.servicios.trab_PA || ''
        },
        bloqueado: props.prItemEditandoServiciosFijos.bloqueado || ''
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
        let checkeado, laLabelSw, elId, elValue, elPrecioHora, laClase, elValueVariaciones, laVariacion, elValueDia, elDia, elActivo, elValueActivo, desactivadoDia, elValueInt, elInt, elValueTrab, elTrab;
        switch (tipo.value) {
            case 'TOL':
                checkeado = props.prItemEditandoServiciosFijos.switch.TO;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE TOLDOS';
                elId = 'form-precio-hora_TO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_TO || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_TO || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_TO || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_TO || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_TO || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_TO || '';
                elPrecioHora = 'precioHora_TO';
                laVariacion = 'variacion_TO';
                elDia = 'diaVariacion_TO';
                elActivo = 'activo_TO';
                elInt = 'int_TO';
                elTrab = 'trab_TO';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_TO === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_TO === 3 ? true : false;
                break;
            case 'CRIS':
                checkeado = props.prItemEditandoServiciosFijos.switch.CR;
                laLabelSw = 'SERVICIO DE LIMPIEZA DE CRISTALES';
                elId = 'form-precio-hora_CR-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CR || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_CR || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_CR || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_CR || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_CR || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_CR || '';
                elPrecioHora = 'precioHora_CR';
                laVariacion = 'variacion_CR';
                elDia = 'diaVariacion_CR';
                elActivo = 'activo_CR';
                elInt = 'int_CR';
                elTrab = 'trab_CR';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_CR === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_CR === 3 ? true : false;
                break;
            case 'CRISE':
                checkeado = props.prItemEditandoServiciosFijos.switch.CE;
                laLabelSw = 'LIMPIEZA CRISTALES EXTERIORES';
                elId = 'form-precio-hora_CE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CE || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_CE || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_CE || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_CE || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_CE || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_CE || '';
                elPrecioHora = 'precioHora_CE';
                laVariacion = 'variacion_CE';
                elDia = 'diaVariacion_CE';
                elActivo = 'activo_CE';
                elInt = 'int_CE';
                elTrab = 'trab_CE';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_CE === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_CE === 3 ? true : false;
                break;
            case 'CRISI':
                checkeado = props.prItemEditandoServiciosFijos.switch.CI;
                laLabelSw = 'LIMPIEZA CRISTALES INTERIORES';
                elId = 'form-precio-hora_CI-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_CI || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_CI || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_CI || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_CI || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_CI || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_CI || '';
                elPrecioHora = 'precioHora_CI';
                laVariacion = 'variacion_CI';
                elDia = 'diaVariacion_CI';
                elActivo = 'activo_CI';
                elInt = 'int_CI';
                elTrab = 'trab_CI';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_CI === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_CI === 3 ? true : false;
                break;
            case 'MOQ':
                checkeado = props.prItemEditandoServiciosFijos.switch.MO;
                laLabelSw = 'SERVICIO DE LIMPIEZA MOQUETA';
                elId = 'form-precio-hora_MO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_MO || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_MO || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_MO || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_MO || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_MO || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_MO || '';
                elPrecioHora = 'precioHora_MO';
                laVariacion = 'variacion_MO';
                elDia = 'diaVariacion_MO';
                elActivo = 'activo_MO';
                elInt = 'int_MO';
                elTrab = 'trab_MO';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_MO === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_MO === 3 ? true : false;
                break;
            case 'OF':
                checkeado = props.prItemEditandoServiciosFijos.switch.OF;
                laLabelSw = 'SERVICIO DE LIMPIEZA OFICINAS';
                elId = 'form-precio-hora_OF-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_OF || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_OF || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_OF || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_OF || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_OF || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_OF || '';
                elPrecioHora = 'precioHora_OF';
                laVariacion = 'variacion_OF';
                elDia = 'diaVariacion_OF';
                elActivo = 'activo_OF';
                elInt = 'int_OF';
                elTrab = 'trab_OF';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_OF === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_OF === 3 ? true : false;
                break;
            case 'ALMC':
                checkeado = props.prItemEditandoServiciosFijos.switch.AL;
                laLabelSw = 'SERVICIO DE LIMPIEZA ALMACENES';
                elId = 'form-precio-hora_AL-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_AL || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_AL || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_AL || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_AL || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_AL || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_AL || '';
                elPrecioHora = 'precioHora_AL';
                laVariacion = 'variacion_AL';
                elDia = 'diaVariacion_AL';
                elActivo = 'activo_AL';
                elInt = 'int_AL';
                elTrab = 'trab_AL';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_AL === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_AL === 3 ? true : false;
                break;
            case 'LAB':
                checkeado = props.prItemEditandoServiciosFijos.switch.LA;
                laLabelSw = 'SERVICIO DE LIMPIEZA LABORATORIO';
                elId = 'form-precio-hora_LA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_LA || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_LA || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_LA || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_LA || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_LA || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_LA || '';
                elPrecioHora = 'precioHora_LA';
                laVariacion = 'variacion_LA';
                elDia = 'diaVariacion_LA';
                elActivo = 'activo_LA';
                elInt = 'int_LA';
                elTrab = 'trab_LA';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_LA === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_LA === 3 ? true : false;
                break;
            case 'TELÑ':
                checkeado = props.prItemEditandoServiciosFijos.switch.TE;
                laLabelSw = 'SERVICIO DE LIMPIEZA TELARAÑAS';
                elId = 'form-precio-hora_TE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_TE || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_TE || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_TE || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_TE || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_TE || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_TE || '';
                elPrecioHora = 'precioHora_TE';
                laVariacion = 'variacion_TE';
                elDia = 'diaVariacion_TE';
                elActivo = 'activo_TE';
                elInt = 'int_TE';
                elTrab = 'trab_TE';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_TE === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_TE === 3 ? true : false;
                break;
            case 'FCH.IN':
                checkeado = props.prItemEditandoServiciosFijos.switch.FI;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA INTERIOR';
                elId = 'form-precio-hora_FI-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FI || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_FI || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_FI || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_FI || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_FI || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_FI || '';
                elPrecioHora = 'precioHora_FI';
                laVariacion = 'variacion_FI';
                elDia = 'diaVariacion_FI';
                elActivo = 'activo_FI';
                elInt = 'int_FI';
                elTrab = 'trab_FI';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_FI === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_FI === 3 ? true : false;
                break;
            case 'FCH.EX':
                checkeado = props.prItemEditandoServiciosFijos.switch.FE;
                laLabelSw = 'SERVICIO DE LIMPIEZA FACHADA EXTERIOR';
                elId = 'form-precio-hora_FE-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FE || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_FE || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_FE || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_FE || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_FE || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_FE || '';
                elPrecioHora = 'precioHora_FE';
                laVariacion = 'variacion_FE';
                elDia = 'diaVariacion_FE';
                elActivo = 'activo_FE';
                elInt = 'int_FE';
                elTrab = 'trab_FE';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_FE === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_FE === 3 ? true : false;
                break;
            case 'ABRLL':
                checkeado = props.prItemEditandoServiciosFijos.switch.AB;
                laLabelSw = 'SERVICIO DE LIMPIEZA ABRILLANTADO';
                elId = 'form-precio-hora_AB-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_AB || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_AB || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_AB || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_AB || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_AB || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_AB || '';
                elPrecioHora = 'precioHora_AB';
                laVariacion = 'variacion_AB';
                elDia = 'diaVariacion_AB';
                elActivo = 'activo_AB';
                elInt = 'int_AB';
                elTrab = 'trab_AB';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_AB === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_AB === 3 ? true : false;
                break;
            case 'MANT':
                checkeado = props.prItemEditandoServiciosFijos.switch.MA;
                laLabelSw = 'SERVICIO DE MANTENIMIENTO MÁQUINA';
                elId = 'form-precio-hora_MA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_MA || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_MA || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_MA || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_MA || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_MA || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_MA || '';
                elPrecioHora = 'precioHora_MA';
                laVariacion = 'variacion_MA';
                elDia = 'diaVariacion_MA';
                elActivo = 'activo_MA';
                elInt = 'int_MA';
                elTrab = 'trab_MA';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_MA === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_MA === 3 ? true : false;
                break;
            case 'PORT':
                checkeado = props.prItemEditandoServiciosFijos.switch.PO;
                laLabelSw = 'SERVICIO DE LIMPIEZA PORTERÍA';
                elId = 'form-precio-hora_PO-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_PO || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_PO || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_PO || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_PO || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_PO || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_PO || '';
                elPrecioHora = 'precioHora_PO';
                laVariacion = 'variacion_PO';
                elDia = 'diaVariacion_PO';
                elActivo = 'activo_PO';
                elInt = 'int_PO';
                elTrab = 'trab_PO';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_PO === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_PO === 3 ? true : false;
                break;
            case 'BACT':
                checkeado = props.prItemEditandoServiciosFijos.switch.BA;
                laLabelSw = 'BOT. NOUBACT';
                elId = 'form-precio-hora_BA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_BA || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_BA || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_BA || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_BA || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_BA || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_BA || '';
                elPrecioHora = 'precioHora_BA';
                laVariacion = 'variacion_BA';
                elDia = 'diaVariacion_BA';
                elActivo = 'activo_BA';
                elInt = 'int_BA';
                elTrab = 'trab_BA';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_BA === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_BA === 3 ? true : false;
                break;
            case 'FEST':
                checkeado = props.prItemEditandoServiciosFijos.switch.FT;
                laLabelSw = 'SERVICIO DE LIMPIEZA DÍA FESTIVO';
                elId = 'form-precio-hora_FT-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_FT || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_FT || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_FT || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_FT || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_FT || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_FT || '';
                elPrecioHora = 'precioHora_FT';
                laVariacion = 'variacion_FT';
                elDia = 'diaVariacion_FT';
                elActivo = 'activo_FT';
                elInt = 'int_FT';
                elTrab = 'trab_FT';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_FT === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_FT === 3 ? true : false;
                break;
            case 'CRTRIM':
                checkeado = props.prItemEditandoServiciosFijos.switch.C3;
                laLabelSw = 'LIMPIEZA DE CRISTALES TRIMESTRAL';
                elId = 'form-precio-hora_C3-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_C3 || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_C3 || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_C3 || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_C3 || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_C3 || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_C3 || '';
                elPrecioHora = 'precioHora_C3';
                laVariacion = 'variacion_C3';
                elDia = 'diaVariacion_C3';
                elActivo = 'activo_C3';
                elInt = 'int_C3';
                elTrab = 'trab_C3';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_C3 === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_C3 === 3 ? true : false;
                break;
            case 'CRBIM':
                checkeado = props.prItemEditandoServiciosFijos.switch.C2;
                laLabelSw = 'LIMPIEZA DE CRISTALES BIMENSUAL';
                elId = 'form-precio-hora_C2-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_C2 || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_C2 || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_C2 || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_C2 || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_C2 || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_C2 || '';
                elPrecioHora = 'precioHora_C2';
                laVariacion = 'variacion_C2';
                elDia = 'diaVariacion_C2';
                elActivo = 'activo_C2';
                elInt = 'int_C2';
                elTrab = 'trab_C2';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_C2 === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_C2 === 3 ? true : false;
                break;
            case 'LIME':
                checkeado = props.prItemEditandoServiciosFijos.switch.ES;
                laLabelSw = 'SERVICIO DE LIMPIEZA ESPECIAL';
                elId = 'form-precio-hora_ES-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_ES || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_ES || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_ES || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_ES || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_ES || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_ES || '';
                elPrecioHora = 'precioHora_ES';
                laVariacion = 'variacion_ES';
                elDia = 'diaVariacion_ES';
                elActivo = 'activo_ES';
                elInt = 'int_ES';
                elTrab = 'trab_ES';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_ES === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_ES === 3 ? true : false;
                break;
            case 'LIMP':
                checkeado = props.prItemEditandoServiciosFijos.switch.PA;
                laLabelSw = 'SERVICIO DE LIMPIEZA DEL PARKING';
                elId = 'form-precio-hora_PA-cuadrantes';
                elValue = props.prItemEditandoServiciosFijos.servicios.precioHora_PA || '';
                elValueVariaciones = props.prItemEditandoServiciosFijos.servicios.variacion_PA || '';
                elValueDia = props.prItemEditandoServiciosFijos.servicios.diaVariacion_PA || '';
                elValueActivo = props.prItemEditandoServiciosFijos.servicios.activo_PA || '';
                elValueInt = props.prItemEditandoServiciosFijos.servicios.int_PA || false;
                elValueTrab = props.prItemEditandoServiciosFijos.servicios.trab_PA || '';
                elPrecioHora = 'precioHora_PA';
                laVariacion = 'variacion_PA';
                elDia = 'diaVariacion_PA';
                elActivo = 'activo_PA';
                elInt = 'int_PA';
                elTrab = 'trab_PA';
                laClase =
                    (props.prItemEditandoServiciosFijos.servicios.activo_PA === 'no') ?
                        classes.fondoInactivoServicioFijo : classes.paper;
                desactivadoDia = props.prItemEditandoServiciosFijos.servicios.variacion_PA === 3 ? true : false;
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
                style={{ height: 110, paddingTop: 5, paddingBottom: 10, paddingRight: 10, paddingLeft: 10, marginBottom: 15 }}
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
                <Grid item xs={7}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        style={{ marginBottom: -10, marginTop: -10 }}
                    >
                        <RadioGroup
                            value={elValueActivo}
                            onChange={handleChangeFormConfiguracionServiciosFijos('radio', elActivo)}
                            className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                            style={{ marginRight: 15 }}
                        >
                            <FormControlLabel
                                value="si"
                                control={
                                    <Radio
                                        size='small'
                                    />
                                }
                                label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>ACTIVO</Typography>}
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="no"
                                control={
                                    <Radio
                                        size='small'
                                    />
                                }
                                label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>INACTIVO</Typography>}
                                labelPlacement="end"
                            />
                        </RadioGroup>
                        <FormControlLabel
                            className={!checkeado ? classes.displayNone : null}
                            control={
                                <Checkbox
                                    size='small'
                                    icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />}
                                    checked={elValueInt}
                                    onChange={handleChangeFormConfiguracionServiciosFijos('check', elInt)}
                                    name="checkedComputa-cuadrante"
                                    color="secondary"
                                />
                            }
                            label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>INTEGRADO EN CÓMPUTO</Typography>}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={6}>
                            <FormControl
                                variant="outlined"
                                className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                                size="small"
                                disabled={elValueInt}
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
                        <Grid item xs={6}>
                            <FormControl
                                variant="outlined"
                                className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                                size="small"                               
                            >
                                <InputLabel>Trabajador</InputLabel>
                                <Select
                                    fullWidth
                                    id="form-trabajadorSF-cuadrantes"
                                    label="Trabajador"
                                    value={elValueTrab}
                                    onChange={handleChangeFormConfiguracionServiciosFijos('select', elTrab)}
                                    helpertext="Selecciona trabajador"
                                >
                                    <MenuItem value=''>
                                        <em>Sin trabajador</em>
                                    </MenuItem>
                                    {
                                        arrayTrabajadoresSubcategoria.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>                   
                </Grid>
            </Grid>
        )
    };

    return (
        <div>
            {tiposDeServicio.map((tipo, index) => (
                retornaTipoServicioFijoCuadrantes(tipo, index)
            ))}            
        </div>
    )
}

export default ServiciosFijos
