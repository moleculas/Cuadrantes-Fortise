import { useDispatch } from 'react-redux';
import { Grid, Box, Typography, Tooltip } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

//importaciones acciones
import { abrePopoverGeneralAccion } from '../../redux/cuadrantesPopoversDucks';
import {
    alturaCasilla,
    retornaAnchoColumna
} from '../../logica/logicaApp';
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';

//estilos
import Clases from "../../clases";

const CasillaGeneral = ({ dia, indexDia, columna, indexColumna, esDesktop, scrollable, boxes, ampleColumna }) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const postRef = dia[1][0] + dia[0][0];

    //funciones    

    const {
        gestionaTextoCasillasAccion,
        gestionaClassesColoresGeneralAccion,
        retornaIconoTipoServicioAccion,
        retornaIconoVariacionAccion
    } = logicaLayoutCuadrantes();

    return (
        <Grid
            container
            direction="column"
            justifycontent="flex-start"
            alignItems="flex-start"
            key={'Columna_' + (indexColumna + 1) + '_' + dia[0][0]}
        >
            {columna.reducido ? (
                < Box
                    m={0.3}
                    p={1.5}
                    className={gestionaClassesColoresGeneralAccion(indexDia + 1, columna[postRef].baja, columna[postRef].modificado, columna.nombreTrabajador, columna[postRef].tipoBaja, columna[postRef].tipoVariacion) || null}
                    style={{ width: 40, minHeight: alturaCasilla(esDesktop), maxHeight: alturaCasilla(esDesktop), pointerEvents: 'none' }}
                >
                </Box>
            ) : (
                < Box
                    m={0.3}
                    p={1.5}
                    ref={ref => { boxes.current[indexColumna] = ref }}
                    className={gestionaClassesColoresGeneralAccion(indexDia + 1, columna[postRef].baja, columna[postRef].modificado, columna.nombreTrabajador, columna[postRef].tipoBaja, columna[postRef].tipoVariacion) || null}
                    style={{ width: retornaAnchoColumna(columna.reducido, ampleColumna), minHeight: alturaCasilla(esDesktop), maxHeight: alturaCasilla(esDesktop), display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}
                    onClick={(event) => dispatch(abrePopoverGeneralAccion(postRef, indexDia, dia[1][0], columna, indexColumna, indexColumna, event, scrollable, boxes, classes))}
                >
                    <Grid item xs={10}>
                        <Typography variant='body2' style={{ color: 'secondary.contrastText' }}>{gestionaTextoCasillasAccion(indexDia + 1, postRef, columna, dia[1][0])}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {columna[postRef].observaciones && !columna[postRef].festivo && !columna[postRef].baja ? (
                                <Tooltip title={columna[postRef].observaciones} placement="top-end" arrow >
                                    <ChatIcon
                                        className={classes.colorText}
                                    />
                                </Tooltip>
                            ) : null}
                            {columna[postRef].tipoVariacion && !columna[postRef].festivo && !columna[postRef].baja ? (
                                retornaIconoVariacionAccion(columna, postRef, dia[1][0])
                            ) : null}
                            {columna[postRef].tipoServicio && !columna[postRef].festivo && !columna[postRef].baja ? (
                                retornaIconoTipoServicioAccion(columna[postRef].tipoServicio)
                            ) : null}
                        </Box>
                    </Grid>
                </Box >
            )}
        </Grid>
    );
};

export default CasillaGeneral;