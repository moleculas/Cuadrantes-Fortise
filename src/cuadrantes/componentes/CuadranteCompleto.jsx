import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CircularProgress,
    Box,
    Grid,
    useMediaQuery
} from '@material-ui/core';

//carga componentes
import CuadranteDer from './CuadranteDer';
import CuadranteIzq from './CuadranteIzq';
import Popovers from './Popovers';
import CustomSnack from '../../comun/CustomSnack';
import DialogsCuadrante from './DialogsCuadrante';

//importación acciones
import {
    obtenerCentrosPorCategoriaAccion,
    obtenerCentroAccion,
    obtenerCategoriaPorCentroAccion
} from '../../redux/centrosDucks';
import {
    obtenerTrabajadoresAccion,
    obtenerTrabajadoresSubcategoriaAccion
} from '../../redux/trabajadoresDucks';
import {
    cambioEstadoInicioCuadrantesAccion,
    activarDesactivarCambioBotonRegistrarAccion,
    activarDesactivarCambioBotonResetearAccion,
    obtenerCuadranteAccion,
    actualizarObjetoCuadranteAccion,
    setCalendarioAGestionarAccion,
    setCategoriaAccion
} from '../../redux/cuadrantesDucks';
import {
    setCambioSFAccion,
    setCambioRedimensionColumnaAccion,
    setControladorDeEstadoAccion,
    setPreValueCalendarioAGestionarReseteoAccion,
    setEstamosActualizandoCuadranteSinCargaAccion,
    setOpenLoadingAccion,
    setVenimosBorrarCuadranteAccion,
    setVenimosDeCambioCentroSelectAccion,
    setDisableSelectCentrosAccion,
    setVenimosDeCambioCuadranteAccion,
    setCambioSecuenciaSemanasAccion
} from '../../redux/cuadrantesSettersDucks';
import {
    venimosDePendientesAccion,
    venimosDeRegistradosAccion
} from '../../redux/pendientesDucks';
import {
    configuraStateFestivoAccion
} from '../../redux/cuadrantesHandlersDucks';
import { getHeightScrollable } from '../../logica/logicaApp';
import {
    gestionaCuadranteIndividualAccion,
    centroAGestionarInicioAccion,
    gestionTrabajadorAccion,
    gestionSuplenteAccion,
    resetPorCambioSecuenciaAccion
} from '../../logica/logicaGestionCuadrantes';
import { gestionarInformeAccion } from '../../logica/logicaInformeCuadrantes';

//estilos
import Clases from "../../clases";

const CuadranteCompleto = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        objetoCentro,
        errorDeCargaCentros,
        categoriaPorCentro
    } = useSelector(store => store.variablesCentros);
    const {
        errorDeCargaTrabajadores,
        objetoTrabajador: trabajadorAGestionar,
        objetoSuplente: suplenteAGestionar,
        arrayTrabajadores: listadoTrabajadores,
        trabajadoresCargados
    } = useSelector(store => store.variablesTrabajadores);
    const {
        exitoRegistroCuadrante,
        exitoActualizacionCuadrante,
        exitoResetearCuadrante,
        errorDeCargaCuadrantes,
        cuadrante,
        objetoCuadrante,
        cuadranteRegistrado,
        ultimoIdRegistrado,
        centro,
        calendarioAGestionar
    } = useSelector(store => store.variablesCuadrantes);
    const {
        visibleCuadrante,
        visibleCuadranteServiciosFijos,
        cambioSF,
        cambioRedimensionColumna,
        cuadranteVacio,
        alerta,
        venimosDeCambioCuadrante,
        cuadranteEnUsoCuadrantes,
        estamosActualizandoCuadranteSinCarga,
        controladorDeEstado,
        preValueCalendarioAGestionarReseteo,
        venimosBorrarCuadrante,
        numeroCuadrantesCuadrantes,
        yaNoEsInicio,
        venimosDeCambioCentroSelect,
        cambioSecuenciaSemanas,
        disableCargando,
        esCambioTra,
        esCambioSup
    } = useSelector(store => store.variablesCuadrantesSetters);
    const { exitoGenerarArchivos } = useSelector(store => store.variablesApp);
    const { cuadranteServiciosFijos } = useSelector(store => store.variablesCuadrantesServiciosFijos);
    const {
        estadoVenimosDePendientes,
        estadoVenimosDeRegistrados,
    } = useSelector(store => store.variablesPendientes);
    const [classesDisp, setClassesDisp] = useState({
        openAccordion: classes.openAccordion,
        editando: classes.editando
    });
    const [dimensionsColumna, setDimensionsColumna] = useState({ width: 350 });
    //const [dimensionsColumnaServiciosFijos, setDimensionsColumnaServiciosFijos] = useState({ width: 165 });
    const [dimensionsColumnaServiciosFijos, setDimensionsColumnaServiciosFijos] = useState({ width: 350 });
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable(217));
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [ampleScreenModificat, setAmpleScreenModificat] = useState(false);

    //parche para actualizar popovers
    const itemPrevioEditando = useSelector(store => store.variablesCuadrantesSetters.itemPrevioEditando);

    //refs
    const scrollable = useRef();
    const boxes = useRef([]);

    //parche para actualizar popovers
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    //mediaQueries
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('desktop'));

    //per test    

    //useEffect

    useEffect(() => {
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable(217));
            !disableCargando && setAmpleScreenModificat(true);
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    //parche para actualizar popovers
    useEffect(() => {
        itemPrevioEditando && forceUpdate();
    }, [itemPrevioEditando]);

    useEffect(() => {
        listadoTrabajadores.length === 0
            ? dispatch(obtenerTrabajadoresAccion('trabajadores'))
            : trabajadoresCargados && dispatch(obtenerTrabajadoresSubcategoriaAccion(2));
    }, [listadoTrabajadores]);

    useEffect(() => {
        dispatch(actualizarObjetoCuadranteAccion({ ...objetoCuadrante, id: ultimoIdRegistrado }));
    }, [ultimoIdRegistrado]);

    useEffect(() => {
        if (cuadranteRegistrado === 'no' || cuadranteRegistrado === 'si') {
            const isCuadranteRegistrado = cuadranteRegistrado === 'si';
            if ((!isCuadranteRegistrado && !estadoVenimosDePendientes || isCuadranteRegistrado && !estadoVenimosDeRegistrados) && !venimosDeCambioCuadrante) {
                dispatch(cambioEstadoInicioCuadrantesAccion(false));
                dispatch(activarDesactivarCambioBotonRegistrarAccion(false));
            };
            dispatch(activarDesactivarCambioBotonResetearAccion(!isCuadranteRegistrado));
            dispatch(obtenerCentroAccion('centros', isCuadranteRegistrado ? objetoCuadrante.datosCuadrante.centro : centro));
        };
    }, [cuadranteRegistrado]);

    useEffect(() => {
        let abortController = new AbortController();
        dispatch(setOpenLoadingAccion(true));
        if (objetoCentro.nombre !== '') {
            dispatch(centroAGestionarInicioAccion());
        };
        dispatch(setOpenLoadingAccion(false));
        return () => {
            abortController.abort();
        }
    }, [objetoCentro]);

    useEffect(() => {
        let abortController = new AbortController();
        if (centro) {
            const nombreCuadrante = calendarioAGestionar + '-' + centro;
            if (estadoVenimosDePendientes || estadoVenimosDeRegistrados) {
                dispatch(obtenerCategoriaPorCentroAccion('centros', centro, 0));
                if (estadoVenimosDeRegistrados) {
                    dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
                };
                if (estadoVenimosDePendientes) dispatch(venimosDePendientesAccion(false));
                if (estadoVenimosDeRegistrados) dispatch(venimosDeRegistradosAccion(false));
            };
            if (venimosDeCambioCentroSelect) {
                dispatch(obtenerCuadranteAccion('cuadrantes', nombreCuadrante));
                dispatch(setVenimosDeCambioCentroSelectAccion(false));
            };
        };
        return () => {
            abortController.abort();
        };
    }, [estadoVenimosDePendientes, estadoVenimosDeRegistrados, venimosDeCambioCentroSelect]);

    useEffect(() => {
        if (controladorDeEstado === 'inicio' || controladorDeEstado === 'venimosDeResetear') {
            dispatch(setControladorDeEstadoAccion('inicio'));
            if (controladorDeEstado === 'venimosDeResetear') {
                dispatch(setCalendarioAGestionarAccion(preValueCalendarioAGestionarReseteo));
                dispatch(setPreValueCalendarioAGestionarReseteoAccion(null));
            };
        };
        if (controladorDeEstado === 'venimosDeInforme') {
            dispatch(setControladorDeEstadoAccion('inicio'));
        };
        if (objetoCuadrante.datosCuadrante.centro) {
            if (!venimosBorrarCuadrante) {
                if (!estamosActualizandoCuadranteSinCarga) {
                    dispatch(gestionaCuadranteIndividualAccion(cuadranteEnUsoCuadrantes, false));
                } else {
                    dispatch(setEstamosActualizandoCuadranteSinCargaAccion(false));
                };
            } else {
                dispatch(setVenimosBorrarCuadranteAccion(false));
            };
        };
    }, [objetoCuadrante]);

    useEffect(() => {
        let abortController = new AbortController();
        if (cuadrante.length > 0 && !disableCargando) {
            dispatch(gestionarInformeAccion(false));
        };
        return () => {
            abortController.abort();
        }
    }, [cuadrante, disableCargando]);

    useEffect(() => {
        if ((cuadrante.length > 0 || cuadranteServiciosFijos.length > 0) &&
            cuadranteRegistrado === 'no' &&
            !numeroCuadrantesCuadrantes[cuadranteEnUsoCuadrantes - 1].revisado &&
            !yaNoEsInicio) {
            dispatch(configuraStateFestivoAccion());
        };
    }, [cuadrante.length, cuadranteServiciosFijos.length]);

    useEffect(() => {
        if (
            cuadrante.length > 0 ||
            cuadranteServiciosFijos.length > 0 ||
            cambioSF ||
            cambioRedimensionColumna ||
            ampleScreenModificat
        ) {
            redimensionarEspacio();
            cambioSF && dispatch(setCambioSFAccion(false));
            cambioRedimensionColumna && dispatch(setCambioRedimensionColumnaAccion(false));
            ampleScreenModificat && setAmpleScreenModificat(false);
        };
    }, [ampleScreenModificat, cuadrante.length, cuadranteServiciosFijos.length, visibleCuadranteServiciosFijos, visibleCuadrante, cambioSF, cambioRedimensionColumna]);

    useEffect(() => {
        let abortController = new AbortController();
        if (categoriaPorCentro) {
            dispatch(setCategoriaAccion(categoriaPorCentro));
            dispatch(obtenerCentrosPorCategoriaAccion('centros', categoriaPorCentro));
            dispatch(setDisableSelectCentrosAccion(false));
        };
        return () => {
            abortController.abort();
        }
    }, [categoriaPorCentro]);

    useEffect(() => {
        if (venimosDeCambioCuadrante) {
            const existeCuadrante = objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].tipoHorarioGeneral;
            const existeCuadranteSF = objetoCuadrante.datosServicios.datosServicios[cuadranteEnUsoCuadrantes - 1] &&
                objetoCuadrante.datosServicios.datosServicios[cuadranteEnUsoCuadrantes - 1].length > 0;
            const condiciones = (cuadrante.length > 0 && cuadranteServiciosFijos.length > 0 && existeCuadrante && existeCuadranteSF) ||
                (cuadrante.length > 0 && !existeCuadranteSF) ||
                (cuadranteServiciosFijos.length > 0 && !existeCuadrante);
            if (condiciones) {
                dispatch(setVenimosDeCambioCuadranteAccion(false));
            };
        };
    }, [venimosDeCambioCuadrante, cuadrante, cuadranteServiciosFijos]);

    useEffect(() => {
        if (cambioSecuenciaSemanas.inicial) {
            dispatch(resetPorCambioSecuenciaAccion());
            dispatch(setCambioSecuenciaSemanasAccion({ inicial: false, gestion: true }));
        };
    }, [cambioSecuenciaSemanas.inicial]);

    useEffect(() => {
        if (esCambioTra || esCambioSup) {
            dispatch(esCambioTra ? gestionTrabajadorAccion() : gestionSuplenteAccion());
        };
    }, [trabajadorAGestionar, suplenteAGestionar]);

    //secuencia alertas

    useEffect(() => {
        let mensaje = '';
        let tipo = '';
        if (alerta.abierto) {
            mensaje = alerta.mensaje;
            tipo = alerta.tipo;
        } else if (errorDeCargaCuadrantes || errorDeCargaTrabajadores || errorDeCargaCentros) {
            mensaje = "Error de conexión con la base de datos.";
            tipo = 'error';
        } else if (exitoActualizacionCuadrante) {
            mensaje = "Registro actualizado correctamente.";
            tipo = 'success';
        } else if (exitoRegistroCuadrante) {
            mensaje = "Registro creado correctamente.";
            tipo = 'success';
        } else if (exitoResetearCuadrante) {
            mensaje = "Registro reseteado correctamente.";
            tipo = 'success';
        } else if (exitoGenerarArchivos) {
            mensaje = "Archivos para FACTUSOL generados exitosamente, revisa la carpeta de descargas para localizar: FAC.xlsx y LFA.xlsx.";
            tipo = 'success';
        };
        if (mensaje && tipo) {
            setAlert({ mensaje, tipo });
            setOpenSnack(true);
        };
    }, [alerta, errorDeCargaCuadrantes, errorDeCargaTrabajadores, errorDeCargaCentros, exitoActualizacionCuadrante, exitoRegistroCuadrante, exitoResetearCuadrante, exitoGenerarArchivos]);

    //funciones

    const redimensionarEspacio = () => {
        let dimServiciosAnadir = 0;
        let dimCuadrante = 0;
        let serviciosActivos = 0;
        let cuadrantesActivos = 0;
        let cuadrantesActivosReducidos = 0;
        if (cuadranteServiciosFijos.length > 0 && visibleCuadranteServiciosFijos) {
            cuadranteServiciosFijos.forEach((servicio) => {
                for (const prop in servicio) {
                    if (prop.includes('activo') && servicio[prop] === 'si') {
                        // dimServiciosAnadir += 165;
                        dimServiciosAnadir += 350;
                        serviciosActivos += 1;
                    };
                };
            })
        };
        if (cuadrante.length > 0 && visibleCuadrante) {
            cuadrante.forEach((columna) => {
                if (columna.reducido) {
                    dimCuadrante += 40;
                    cuadrantesActivosReducidos += 1;
                } else {
                    dimCuadrante += 350;
                    cuadrantesActivos += 1;
                };
            })
        };
        const { innerWidth: finestraWidth } = window;
        const ampleAGestionar = finestraWidth - 500;
        if ((dimCuadrante + dimServiciosAnadir) > ampleAGestionar) {
            setDimensionsColumna({ width: (((ampleAGestionar - (45 * cuadrantesActivosReducidos)) / (serviciosActivos + cuadrantesActivos)) - 5) });
            setDimensionsColumnaServiciosFijos({ width: (((ampleAGestionar - (45 * cuadrantesActivosReducidos)) / (serviciosActivos + cuadrantesActivos)) - 5) });
        } else {
            // if (dimensionsColumna.width < 350) {
            //     if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
            //         setDimensionsColumna({ width: 350 });
            //         setDimensionsColumnaServiciosFijos({ width: 165 });
            //     }
            // };
            // if (dimensionsColumnaServiciosFijos.width < 165) {
            //     if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
            //         setDimensionsColumnaServiciosFijos({ width: 165 });
            //     };
            // };
            if (dimensionsColumna.width < 350) {
                if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
                    setDimensionsColumna({ width: 350 });
                    setDimensionsColumnaServiciosFijos({ width: 350 });
                }
            };
            if (dimensionsColumnaServiciosFijos.width < 350) {
                if (((dimCuadrante + dimServiciosAnadir) - 5) < ampleAGestionar) {
                    setDimensionsColumnaServiciosFijos({ width: 350 });
                };
            };
        };
    };

    return (
        <>
            {/* {console.log(procesoHorasTrabajadores)} */}
            <Grid container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
            >
                {cuadrante.length > 0 || cuadranteVacio ? (
                    <CuadranteIzq
                        esDesktop={esDesktop}
                        scrollable={scrollable}
                        heightScrollable={heightScrollable}
                    />
                ) : null}
                <Grid item xs>
                    {cuadrante.length > 0 || cuadranteVacio ? (
                        <CuadranteDer
                            ampleColumna={dimensionsColumna.width}
                            ampleColumnaServiciosFijos={dimensionsColumnaServiciosFijos.width}
                            esDesktop={esDesktop}
                            scrollable={scrollable}
                            heightScrollable={heightScrollable}
                            classesDisp={classesDisp}
                            boxes={boxes}
                        />
                    ) : (
                        <Grid
                            spacing={1}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            p={2}
                            style={{ minHeight: heightScrollable - 50, maxHeight: heightScrollable - 50, width: '100%' }}
                        >
                            <Box className={classes.centrado}>
                                <CircularProgress />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Popovers
                scrollable={scrollable}
                heightScrollable={heightScrollable}
                classesDisp={classesDisp}
                boxes={boxes}
                ampleColumna={dimensionsColumna.width}
            />
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={true}
                setOpenSnack={setOpenSnack}
            />
            <DialogsCuadrante />
        </>
    )
};

export default CuadranteCompleto;