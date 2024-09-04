import { useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Chip,
    Badge,
} from '@material-ui/core';
import { Assignment as AssignmentIcon } from '@material-ui/icons';

//carga componentes
import Menu from './Menu';

//importaciones acciones
import logicaLayoutCuadrantes from '../../logica/logicaLayoutCuadrantes';

//estilos
import Clases from "../../clases";

const HeaderSup = () => {
    const classes = Clases();
    const { objetoCentro } = useSelector(store => store.variablesCentros);
    const { objetoCuadrante } = useSelector(store => store.variablesCuadrantes);
    const { estadoIntervencionRegistrada: intervencionRegistrada } = useSelector(store => store.variablesApp);
    const { firmaActualizacion } = useSelector(store => store.variablesCuadrantesSetters);

    //funciones

    const {
        retornaLabelChipAccion,
        retornaColorChipAccion,
        retornaAvatarChipAccion
    } = logicaLayoutCuadrantes();

    return (
        <Box style={{ display: 'flex', flexDirection: 'row', justifycontent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={9}>
                <Badge
                    overlap="circle"
                    classes={{
                        badge:
                            firmaActualizacion && objetoCentro.nombre && intervencionRegistrada && objetoCuadrante.estado === 'facturado' ?
                            objetoCuadrante.total.mailEnviado === 'si' ? classes.badgeBlau : classes.badgeVerd :                               
                                firmaActualizacion && objetoCentro.nombre && intervencionRegistrada && objetoCuadrante.estado === 'registrado' ?
                                    classes.badgeTaronja :
                                    firmaActualizacion && objetoCentro.nombre && !intervencionRegistrada ?
                                        classes.badgeVermell :
                                        !firmaActualizacion && objetoCentro.nombre ?
                                            classes.badgeVermell :
                                            classes.displayNone
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Chip
                        className={retornaColorChipAccion()}
                        style={{ padding: 5 }}
                        avatar={retornaAvatarChipAccion()}
                        icon={!objetoCentro.nombre ? <AssignmentIcon /> : null}
                        label={retornaLabelChipAccion()} />
                </Badge>
            </Grid>
            <Menu />
        </Box>
    );
};

export default HeaderSup;