import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import {
    Tooltip,
    Fab,
    Typography
} from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';

//importaciones acciones
import { handleClickOpenDialogCuadrantes4Accion } from '../../redux/cuadrantesHandlersDucks';
import { retornaInfoFabButtonAccion } from '../../redux/cuadrantesFacturacionDucks';

//estilos
import Clases from "../../clases";

const DraggableItem = () => {
    const [isDragging, setIsDragging] = useState(false);
    const classes = Clases();
    const dispatch = useDispatch();

    return (
        <Draggable
            axis="x"
            bounds={{ right: 0 }}
            onDrag={() => setIsDragging(true)}
            onStop={() => setTimeout(() => { setIsDragging(false) }, 500)}
        >
            <Tooltip title="Informe Cuadrante" placement="left" arrow>
                <Fab
                    variant="extended"
                    className={classes.fab}
                    onClick={() => !isDragging ? dispatch(handleClickOpenDialogCuadrantes4Accion()) : null}
                >
                    <Typography variant="body2" className={classes.typoFab}>{dispatch(retornaInfoFabButtonAccion())}</Typography>
                    <AssessmentIcon />
                </Fab>
            </Tooltip>
        </Draggable>
    );
};

export default DraggableItem;