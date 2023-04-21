import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../../constantes";
import {
    Box,
    Grid,
    Tooltip,
    Avatar,
} from '@material-ui/core';
import {
    Chat as ChatIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Settings as SettingsIcon
} from '@material-ui/icons';
import clsx from 'clsx';

//importaciones acciones
import {
    alturaCasilla,
    InfoTooltip
} from '../../logica/logicaApp';
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';
import {
    setVisibleCuadranteAccion,
    setVisibleCuadranteServiciosFijosAccion,
} from '../../redux/cuadrantesSettersDucks';
import {
    abrePopoverServiciosFijosAccion,
    abrePopoverConfiguracionAccion
} from '../../redux/cuadrantesPopoversDucks';

//estilos
import Clases from "../../clases";

//constantes
const listadoServiciosFijos = Constantes.TIPO_SERVICIO_FIJO;

const CuadranteIzq = (props) => {
    const {
        esDesktop,
        scrollable,
        heightScrollable
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        objetoCuadrante,
        cuadrante,
    } = useSelector(store => store.variablesCuadrantes);
    const {
        cuadranteServiciosFijos,
        losServiciosFijos
    } = useSelector(store => store.variablesCuadrantesServiciosFijos);
    const { 
        cuadranteEnUsoCuadrantes,
        visibleCuadranteServiciosFijos,
        visibleCuadrante
     } = useSelector(store => store.variablesCuadrantesSetters);

    //funciones    

    const {
        retornoServiciosFijosEnLayoutAccion,
        retornaServiciosFijosEnLayoutAvatarsAccion
    } = logicaLayoutCuadrantes();

    const retornaBotonVisibleCuadrante = (type) => {
        const isCuadranteNotEmpty = cuadrante.length > 0 && cuadranteServiciosFijos.length > 0;
        const isVisible = type === 'SF' ? visibleCuadranteServiciosFijos : visibleCuadrante;
        const dispatchFunction = type === 'SF' ? setVisibleCuadranteServiciosFijosAccion : setVisibleCuadranteAccion;
        const tooltipTitle = isVisible
            ? type === 'SF'
                ? 'Ocultar columnas servicios extra'
                : 'Ocultar columnas trabajadores'
            : type === 'SF'
                ? 'Mostrar columnas servicios extra'
                : 'Mostrar columnas trabajadores';

        let mostramos;
        if (type === 'SF') {
            mostramos = isCuadranteNotEmpty && visibleCuadrante && (
                cuadranteServiciosFijos.length > 1 ||
                cuadranteServiciosFijos.some(item => listadoServiciosFijos.some(prefixObj => item[`activo_${prefixObj.prefix}`] === 'si'))
            );
        } else {
            mostramos = isCuadranteNotEmpty && visibleCuadranteServiciosFijos && (
                cuadranteServiciosFijos.length > 1 ||
                listadoServiciosFijos.every(prefixObj => cuadranteServiciosFijos[0][`activo_${prefixObj.prefix}`] !== 'no')
            );
        };
        const VisibilityComponent = isVisible ? VisibilityIcon : VisibilityOffIcon;
        const className = type === 'SF' ? classes.cabeceraServicios : classes.trabajador;
        const backgroundColor = type === 'SF' ? 'rgba(0, 150, 136, 0.25' : 'rgba(0, 0, 0, 0.25';
        return (
            <Tooltip title={mostramos ? tooltipTitle : ''} placement="right" arrow>
                <Avatar
                    style={{
                        cursor: mostramos ? 'pointer' : '',
                        backgroundColor: mostramos ? '' : backgroundColor
                    }}
                    className={clsx(classes.small3, mostramos ? className : '')}
                    onClick={mostramos ? () => dispatch(dispatchFunction(!isVisible)) : null}
                    disabled={mostramos ? false : true}
                >
                    <VisibilityComponent
                        style={{ fontSize: 22, color: mostramos ? undefined : 'rgba(255, 255, 255, 0.45)' }}
                    />
                </Avatar>
            </Tooltip>
        );
    };

    return (
        <Box>
            <Grid item
                style={{ width: 40, marginRight: 4, height: alturaCasilla(esDesktop) }}
                className={classes.trabajador}
            >
                <Box
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 4, cursor: 'pointer' }}
                    onClick={(event) => dispatch(abrePopoverConfiguracionAccion(event, scrollable, classes))}
                >
                    <Tooltip title="Ajustes cuadrante" placement="right" arrow>
                        <SettingsIcon style={{ fontSize: 30 }} />
                    </Tooltip>
                </Box>
            </Grid>
            <Grid item
                style={{ width: 40, marginRight: 4, marginTop: 9, paddingTop: 5, height: 122 }}
                className={classes.suplente}
            >
                <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 4 }}>
                    {objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].observaciones ?
                        (
                            <InfoTooltip title={objetoCuadrante.datosCuadrante.datosCuadrante[cuadranteEnUsoCuadrantes - 1].observaciones} placement="right" arrow>
                                <ChatIcon
                                    style={{ fontSize: 28 }}
                                    className={classes.groc}
                                />
                            </InfoTooltip>
                        ) : (
                            <ChatIcon
                                style={{ fontSize: 28 }}
                                className={classes.grisClaro}
                            />
                        )}
                </Box>
                <Box style={{ paddingLeft: 5, paddingRight: 5 }}>
                    {retornaBotonVisibleCuadrante('TR')}
                </Box>
                <Box style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 4 }}>
                    {retornaBotonVisibleCuadrante('SF')}
                </Box>
            </Grid>
            <Grid item
                style={esDesktop ? { width: 40, marginRight: 4, marginTop: 6, paddingTop: 5, height: heightScrollable - 47 - 128 } : { width: 40, marginRight: 4, marginTop: 6, paddingTop: 5, height: heightScrollable - 47 - 128 - 10 }}
                className={retornoServiciosFijosEnLayoutAccion('grid', losServiciosFijos)}
            >
                <Box style={{ padding: 4 }}>
                    <Tooltip title={retornoServiciosFijosEnLayoutAccion('tooltip', losServiciosFijos)} placement="right" arrow>
                        <Avatar
                            style={{ cursor: 'pointer' }}
                            className={retornoServiciosFijosEnLayoutAccion('avatar', losServiciosFijos)}
                            onClick={(event) => dispatch(abrePopoverServiciosFijosAccion(event, scrollable, classes))}
                        >
                            {retornoServiciosFijosEnLayoutAccion('icon', losServiciosFijos)}
                        </Avatar>
                    </Tooltip>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {cuadranteServiciosFijos.length > 0 ? (
                        cuadranteServiciosFijos.map((servicio, index) => (
                            retornaServiciosFijosEnLayoutAvatarsAccion(servicio, index)
                        ))
                    ) : null}
                </Box>
            </Grid>
        </Box>
    )
};

export default CuadranteIzq;