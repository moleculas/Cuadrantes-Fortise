
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch } from 'react-redux';

//importación acciones
import { setAlertaAccion } from '../redux/cuadrantesSettersDucks';
import { Alert } from '../logica/logicaApp';

const CustomSnack = ({ open, message, severity, tipoCuadrante, setOpenSnack }) => {
    const dispatch = useDispatch();

    //funciones
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpenSnack(false);
        if (tipoCuadrante) {
            dispatch(setAlertaAccion({
                abierto: false,
                mensaje: '',
                tipo: ''
            }));
        };
    };

    return (
        <Snackbar open={open} autoHideDuration={12000} onClose={handleClose}>
            <Alert severity={severity} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnack;