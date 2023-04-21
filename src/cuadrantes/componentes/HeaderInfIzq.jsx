import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../../constantes";
import {
    Box,
    Grid,
    InputLabel,
    OutlinedInput,
    FormControl,
    MenuItem,
    Select
} from '@material-ui/core';
import 'date-fns';
import { es } from "date-fns/locale";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

//carga componentes
import HeaderInfDer from './HeaderInfDer';

//importaciones acciones
import { gestionaMaxDateCalendarAccion } from '../../redux/appDucks';
import {
    handleChangeSelectCalendarioAccion,
    handleChangeSelectCategoriaAccion,
    handleClickOpenDialogCuadrantes5Accion,
    handleChangeSelectCentroAccion
} from '../../redux/cuadrantesHandlersDucks';

//estilos
import Clases from "../../clases";

//constantes
const categorias = Constantes.CATEGORIAS_CENTROS;

const HeaderInfIzq = () => {
    const classes = Clases();
    const dispatch = useDispatch();
    const { arrayCentrosPorCategoria: centrosPorCategoria } = useSelector(store => store.variablesCentros);
    const {
        objetoCuadrante,
        categoria
    } = useSelector(store => store.variablesCuadrantes);
    const {
        valueDatePicker,
        disableSelectCentros,
        disableCargando,
        venimosDeCambioCentroSelect,
        numeroCuadrantesCuadrantes,
        cuadranteEnUsoCuadrantes
    } = useSelector(store => store.variablesCuadrantesSetters);
    const esInicioCuadrantes = useSelector(store => store.variablesCuadrantes.esInicioCuadrantes);

    return (
        <Box
            className={classes.root1}
            mt={2}
            mb={3}
        >
            <Grid item xs={2}>
                <Box pr={2}>
                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            size="small"
                            views={['month', 'year']}
                            inputVariant="outlined"
                            fullWidth
                            format="MM/yyyy"
                            label="Mes a gestionar"
                            minDate={new Date('2021-1')}
                            maxDate={new Date(dispatch(gestionaMaxDateCalendarAccion(5)))}
                            value={valueDatePicker}
                            disabled={disableCargando}
                            onChange={(newValue) => {
                                dispatch(handleChangeSelectCalendarioAccion(newValue));
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box pr={2}>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                    >
                        <InputLabel>Categoria Centro</InputLabel>
                        <Select
                            id="form-categorias"
                            value={categoria}
                            onChange={(event) => dispatch(handleChangeSelectCategoriaAccion(event))}
                            input={
                                <OutlinedInput
                                    labelWidth={130}
                                />
                            }
                            disabled={disableCargando}
                        >
                            {categorias.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box pr={2}>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        disabled={venimosDeCambioCentroSelect ? true : !disableCargando ? disableSelectCentros : disableCargando}
                        size="small"
                    >
                        <InputLabel>Centro</InputLabel>
                        <Select
                            id="form-centros"
                            value={objetoCuadrante.datosCuadrante.centro || ''}
                            onChange={(event) => dispatch(handleChangeSelectCentroAccion(event))}
                            input={
                                <OutlinedInput
                                    labelWidth={55}
                                />
                            }
                        >
                            {centrosPorCategoria.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.sub_nombre ? (option.nombre + " - " + option.sub_nombre) : option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box pr={2}>
                    <Grid
                        container
                        direction="row"
                        justifycontent="space-between"
                        alignItems="center"
                        style={{ marginTop: -5 }}
                    >
                        <HeaderInfDer
                            prHandleClickOpenDialogCuadrantes5={() => dispatch(handleClickOpenDialogCuadrantes5Accion())}
                            numeroCuadrantesCuadrantes={numeroCuadrantesCuadrantes}
                            cuadranteEnUsoCuadrantes={cuadranteEnUsoCuadrantes}
                            esInicioCuadrantes={esInicioCuadrantes}
                        />
                    </Grid>
                </Box>
            </Grid>
        </Box>
    );
};

export default HeaderInfIzq;