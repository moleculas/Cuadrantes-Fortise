import { useSelector } from 'react-redux';
import Constantes from "../constantes";
import {
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Select,
    InputAdornment,
    Switch,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
    Checkbox
} from '@material-ui/core';
import {
    RadioButtonChecked,
    RadioButtonUnchecked
} from '@material-ui/icons';
import clsx from 'clsx';

//estilos
import Clases from "../clases";

//constantes
const tiposServicioFijo = Constantes.TIPO_SERVICIO_FIJO;

const TipoServicioFijo = (props) => {
    const {
        formato,
        tipo,
        index,
        stateSwitchTipoServicioFijo,
        valuesForm,
        handleChangeSwitchTipoServicioFijo,
        disabledItem,
        handleChangeForm
    } = props;
    const classes = Clases();
    const arrayTrabajadoresSubcategoria = useSelector(store => store.variablesTrabajadores.arrayTrabajadoresSubcategoria);
    const lengthLabelServicio = {
        2: 25,
        3: 35,
        4: 45,
        5: 55,
        6: 65
    };

    //funciones

    const retornaClaseServicio = (formato, activo, precioHora, variacion) =>
        formato === 'centros'
            ? activo === 'no'
                ? classes.fondoInactivoServicioFijo
                : precioHora && variacion
                    ? classes.fondoGrisClaro
                    : classes.paper
            : formato === 'cuadrantes' && activo === 'no'
                ? classes.fondoInactivoServicioFijo
                : classes.paper;
    let checkeado, laLabelSw, laLabelIn, elId, elValue, laLabelWi, elPrecioHora, laClase, elValueVariaciones, laVariacion, elValueDia, elDia, elValueActivo, elActivo, desactivadoDia, elValueInt, elInt, elValueTrab, elTrab;
    tiposServicioFijo.forEach(servicio => {
        if (tipo.value === servicio.value) {
            checkeado = stateSwitchTipoServicioFijo[servicio.prefix];
            laLabelSw = servicio.label;
            laLabelIn = servicio.value;
            elId = `form-precio-hora_${servicio.prefix}`;
            elValue = valuesForm[`precioHora_${servicio.prefix}`] || '';
            elValueVariaciones = valuesForm[`variacion_${servicio.prefix}`] || '';
            elValueDia = valuesForm[`diaVariacion_${servicio.prefix}`] || '';
            elValueActivo = valuesForm[`activo_${servicio.prefix}`] || '';
            elValueInt = valuesForm[`int_${servicio.prefix}`] || false;
            elValueTrab = valuesForm[`trab_${servicio.prefix}`] || '';
            laLabelWi = formato === "centros" ? lengthLabelServicio[servicio.value.length] : 50;
            elPrecioHora = `precioHora_${servicio.prefix}`;
            laVariacion = `variacion_${servicio.prefix}`;
            elDia = `diaVariacion_${servicio.prefix}`;
            elActivo = `activo_${servicio.prefix}`;
            elInt = `int_${servicio.prefix}`;
            elTrab = `trab_${servicio.prefix}`;
            laClase = retornaClaseServicio(
                formato,
                valuesForm[`activo_${servicio.prefix}`],
                valuesForm[`precioHora_${servicio.prefix}`],
                valuesForm[`variacion_${servicio.prefix}`]
            );
            desactivadoDia = valuesForm[`variacion_${servicio.prefix}`] === 3 ? true : false;
        };
    });
    
    return (
        <Grid
            container
            direction="row"
            justifycontent={formato === "cuadrantes" ? "flex-start" : null}
            alignItems="center"
            spacing={formato === "cuadrantes" ? 2 : 1}
            className={laClase}
            style={{ height: 110, paddingTop: 5, paddingBottom: 10, paddingRight: 10, paddingLeft: 10, marginBottom: 15 }}
            key={'formServicio' + index}
        >
            <Grid item xs={5}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checkeado}
                            name={elId}
                            color="secondary"
                            size={formato === "cuadrantes" ? "small" : "medium"}
                            onChange={formato === "cuadrantes" ? handleChangeForm('switch', null) : handleChangeSwitchTipoServicioFijo}
                            disabled={disabledItem}
                        />
                    }
                    label={
                        formato === "cuadrantes" ?
                            <Typography style={{ fontSize: '0.8125rem' }}>{laLabelSw}</Typography> :
                            <Typography variant="body2">{laLabelSw}</Typography>
                    }
                    labelPlacement="end"
                    style={formato === "centros" ? { marginTop: 5 } : {}}
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
                        row
                        value={elValueActivo}
                        onChange={formato === "cuadrantes" ? handleChangeForm('radio', elActivo) : handleChangeForm(elActivo)}
                        className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                        style={{ marginRight: 15 }}
                    >
                        <FormControlLabel
                            value="si"
                            control={<Radio size='small' />}
                            label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>ACTIVO</Typography>}
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="no"
                            control={<Radio size='small' />}
                            label={<Typography style={{ fontSize: '0.7rem', marginLeft: -5 }}>INACTIVO</Typography>}
                            labelPlacement="end"
                        />
                    </RadioGroup>
                    <FormControlLabel
                        className={!checkeado ? classes.displayNone : null}
                        control={
                            <Checkbox
                                size='small'
                                icon={<RadioButtonUnchecked />} checkedIcon={<RadioButtonChecked />}
                                checked={elValueInt}
                                onChange={formato === "cuadrantes" ? handleChangeForm('check', elInt) : handleChangeForm(elInt)}
                                name="checkedComputa"
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
                            style={formato === "centros" ? { marginTop: 5 } : {}}
                            disabled={elValueInt}
                        >
                            <InputLabel>{formato === "centros" ? laLabelIn : "Precio"}</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id={elId}
                                value={elValue || ""}
                                onChange={formato === "cuadrantes" ? handleChangeForm('input', elPrecioHora) : handleChangeForm(elPrecioHora)}
                                labelWidth={laLabelWi}
                                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl
                            variant="outlined"
                            className={!checkeado ? clsx(classes.displayNone, classes.form) : clsx(classes.displayBlock, classes.form)}
                            size="small"
                            style={formato === "centros" ? { marginRight: 10, marginTop: 5 } : {}}
                        >
                            <InputLabel>Trabajador</InputLabel>
                            <Select
                                fullWidth
                                id="form-trabajadorSF"
                                label="Trabajador"
                                value={elValueTrab || ''}//modificat: select
                                onChange={formato === "cuadrantes" ? handleChangeForm('select', elTrab) : handleChangeForm(elTrab)}
                                helpertext="Selecciona trabajador"
                            >
                                <MenuItem value=''>
                                    <em>Sin trabajador</em>
                                </MenuItem>
                                {arrayTrabajadoresSubcategoria?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TipoServicioFijo