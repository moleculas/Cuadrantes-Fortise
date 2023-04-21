import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

//importaciones acciones
import { abrePopoverDiasAccion } from '../../redux/cuadrantesPopoversDucks';
import { alturaCasilla } from '../../logica/logicaApp';

//estilos
import Clases from "../../clases";

const CasillaDias = ({ dia, index, esDesktop, scrollable, classesDisp }) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const { stateFestivo } = useSelector(store => store.variablesCuadrantes);
    const postRef = dia[1][0] + dia[0][0];

    //funciones

    const retornaColorDiaFestivo = (dia) => {
        const festivoClases = {
            2: classes.diaFestivoCierre,
            3: classes.diaFestivoCierreSinComputo,
        };
        return festivoClases[stateFestivo['tipoFestivoDia' + dia]] || classes.diaFestivo;
    };

    return (
        <Grid
            container
            direction="column"
            justifycontent="flex-start"
            alignItems="flex-start"
            key={dia[0][0]}
        >
            <Box
                m={0.3}
                p={1.5}
                className={clsx(
                    classes.inicio,
                    classes.blanc,
                    classes.mb_5,
                    dia[1][0] === 'Sábado' ||
                        dia[1][0] === 'Domingo' ||
                        stateFestivo['estadoFestivoDia' + (index + 1)]
                        ? retornaColorDiaFestivo(dia[0][0])
                        : classes.diaLaboral
                )}
                style={{
                    minHeight: alturaCasilla(esDesktop),
                    maxHeight: alturaCasilla(esDesktop),
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={(event) =>
                    dispatch(
                        abrePopoverDiasAccion(
                            postRef,
                            index,
                            dia[1][0],
                            event,
                            scrollable,
                            classesDisp
                        )
                    )}
            >
                <Typography variant="body2" style={{ color: 'secondary.contrastText' }}>
                    {dia[1][0] + ', ' + dia[0][0]}
                </Typography>
            </Box>
        </Grid>
    );
};

export default CasillaDias;