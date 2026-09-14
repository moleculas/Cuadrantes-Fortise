import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import {
    Backdrop,
    CircularProgress,
    Grid
} from '@material-ui/core';

//carga componentes
import PantallaCuadrantes from './PantallaCuadrantes';
import CuadranteCompleto from './componentes/CuadranteCompleto';
import HeaderSup from './componentes/HeaderSup';
import HeaderInfIzq from './componentes/HeaderInfIzq';

//estilos
import Clases from "../clases";

//importaciones acciones
import {
    retornaAnoMesAccion,
    diasEnElMesAccion,
    diaDeLaSemanaAccion,
    onEstemAccion
} from '../redux/appDucks';
import {
    setCalendarioAGestionarAccion,
    setLosDiasDelMesAccion
} from '../redux/cuadrantesDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';
import {
    setOpenLoadingAccion,
    reseteaContenidoCuadranteAccion,
    setDisableCargandoAccion,
    setValueDatePickerAccion
} from '../redux/cuadrantesSettersDucks';

const Cuadrantes = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        loadingCentros: openLoadingCentros,
        loadingCuadrantes: openLoadingCuadrantes
    } = useSelector(store => store.variablesCentros);
    const {
        esInicioCuadrantes,
        calendarioAGestionar,
    } = useSelector(store => store.variablesCuadrantes);
    const { activo: logged } = useSelector(store => store.variablesUsuario);
    const { loadingTrabajadores: openLoadingTrabajadores } = useSelector(store => store.variablesTrabajadores);
    const { openLoading } = useSelector(store => store.variablesCuadrantesSetters);

    //secuencia inicio

    useEffect(() => {
        !logged && props.history.push('/login');
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
        dispatch(reseteaContenidoCuadranteAccion());
        dispatch(setDisableCargandoAccion(true));
    }, []);

    useEffect(() => {
        // Al montar, el mes gestionado vuelve al actual. El picker DEBE seguirlo:
        // si no, muestra un mes y el estado interno lleva otro (incidencia
        // factura 001535, 2026-09). Ver logicaFechasCuadrante.js.
        const anyoMesActual = retornaAnoMesAccion();
        dispatch(setCalendarioAGestionarAccion(anyoMesActual));
        dispatch(setValueDatePickerAccion(new Date(anyoMesActual)));
        dispatch(forzarRecargaGraficosCuadrantesAccion(true));
        dispatch(onEstemAccion('cuadrantes'));
    }, [dispatch]);

    //secuencia gestión meses

    useEffect(() => {
        const diasMes = dispatch(diasEnElMesAccion(calendarioAGestionar));
        const [anyoAGest, mesAGest] = calendarioAGestionar.split("-");
        const array = Array.from({ length: diasMes }, (_, i) => {
            const dateStr = `${mesAGest}-${i + 1}-${anyoAGest}`;
            return [[i + 1], [dispatch(diaDeLaSemanaAccion(dateStr))]];
        });
        dispatch(setLosDiasDelMesAccion(array));
    }, [calendarioAGestionar]);

    useEffect(() => {
        if (!openLoadingCentros || !openLoadingTrabajadores || !openLoadingCuadrantes) {
            dispatch(setOpenLoadingAccion(false));
        } else {
            dispatch(setOpenLoadingAccion(true));
        }
    }, [openLoadingCentros, openLoadingTrabajadores, openLoadingCuadrantes]);

    //funciones  

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress disableShrink color="inherit" />
            </Backdrop>
            <Grid container spacing={2} style={{ marginTop: -13 }}>
                <Grid item xs={12}>
                    <HeaderSup />
                    <HeaderInfIzq />
                    {esInicioCuadrantes ?
                        <PantallaCuadrantes /> :
                        <CuadranteCompleto />}
                </Grid>
            </Grid>
        </div >
    )
}

export default withRouter(Cuadrantes);