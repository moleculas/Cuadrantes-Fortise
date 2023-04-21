import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../../constantes";
import {
    Grid,
    Box,
    Typography,
    Switch,
    Popover
} from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

//importaciones acciones
import { handleChangeSFCasillasAccion } from '../../redux/cuadrantesHandlersDucks';
import {
    alturaCasilla
} from '../../logica/logicaApp';
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';

//estilos
import Clases from "../../clases";

//constantes
const listadoServiciosFijos = Constantes.TIPO_SERVICIO_FIJO;

const CasillaServiciosFijos = ({ dia, indexDia, servicio, indice, esDesktop, ampleColumnaServiciosFijos }) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const { cuadranteServiciosFijos } = useSelector(store => store.variablesCuadrantesServiciosFijos);
    const tipo = servicio.tipoServiciofijo;
    const postRef = dia[1][0] + dia[0][0];
    let hayServicio = false;
    let trab = '';
    const integrado = listadoServiciosFijos.some(prefixObj => servicio[`int_${prefixObj.prefix}`]) || false;
    for (const prop in servicio) {
        if (prop === postRef && servicio[prop] !== 'anulado') {
            hayServicio = true;
            listadoServiciosFijos.forEach(prefixObj => {
                if (servicio[`precioHora_${prefixObj.prefix}`] || servicio[`int_${prefixObj.prefix}`]) {
                    trab = servicio[`trab_${prefixObj.prefix}`];
                };
            });
        };
    };
    const isActive = listadoServiciosFijos.some(prefixObj => {
        return servicio[`activo_${prefixObj.prefix}`] === 'si';
    });

    //funciones    

    const {
        gestionaTextoCasillasServiciosFijosAccion,
        gestionaClassesColoresServiciosFijosAccion
    } = logicaLayoutCuadrantes();

    if (isActive) {
        return (
            <Grid
                container
                direction="column"
                key={'Columna_sf' + (indexDia)}
            >
                <PopupState variant="popover">
                    {(popupState) => (
                        <div>
                            < Box
                                m={0.3}
                                p={1.5}
                                className={gestionaClassesColoresServiciosFijosAccion(indexDia + 1, hayServicio, integrado, tipo) || null}
                                style={{ width: ampleColumnaServiciosFijos, minHeight: alturaCasilla(esDesktop), maxHeight: alturaCasilla(esDesktop), display: 'flex', alignItems: 'center' }}
                                {...bindTrigger(popupState)}
                            >
                                <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillasServiciosFijosAccion(indexDia + 1, trab, cuadranteServiciosFijos[indice]['estados']['estadoCasillaDia' + (indexDia + 1)])}</Typography>
                            </Box >
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                PaperProps={{
                                    style: {
                                        backgroundColor: "transparent",
                                        boxShadow: "none",
                                        borderRadius: 0
                                    }
                                }}
                            >
                                <Box
                                    className={classes.tooltip}
                                    style={{ width: ampleColumnaServiciosFijos }}>
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <Switch
                                                checked={cuadranteServiciosFijos[indice]['estados']['estadoCasillaDia' + (indexDia + 1)] || false}
                                                onChange={(event) => dispatch(handleChangeSFCasillasAccion(postRef, indice, tipo, event, popupState)) || null}
                                            />
                                        </Grid>
                                        <Grid item><Typography variant="body2" color="textPrimary">Ina./Act.</Typography></Grid>
                                    </Grid>
                                </Box>
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </Grid>
        )
    };
    return null;
};

export default CasillaServiciosFijos;