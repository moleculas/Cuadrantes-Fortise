import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//carga componentes
import DialogComponente from '../../comun/DialogComponente';
import InformacionCuadrantes from './InformacionCuadrantes';

//importacion acciones
import {
    handleCloseDialogBotonesCuadrantes1Accion,
    handleCloseDialogBotonesCuadrantes3Accion,
    handleCloseDialogBotonesVacioAccion,
    handleCloseDialogBotonesCuadrantes5Accion
} from '../../redux/cuadrantesHandlersDucks';
import { generaInformacionCuadrantesAccion } from '../../redux/cuadrantesFacturacionDucks';

const DialogsCuadrante = (props) => {
    const dispatch = useDispatch();
    const {
        cuadranteEnUsoCuadrantes,
        arrayInformeLineas,
    } = useSelector(store => store.variablesCuadrantesSetters);
    const { objetoCentro } = useSelector(store => store.variablesCentros);
    const openDialog4 = useSelector(store => store.variablesApp.openDialog[3]);
    const openDialog5 = useSelector(store => store.variablesApp.openDialog[4]);
    const openDialog7 = useSelector(store => store.variablesApp.openDialog[6]);
    const openDialog8 = useSelector(store => store.variablesApp.openDialog[7]);
    const openDialog12 = useSelector(store => store.variablesApp.openDialog[11]);

    //useEffect
    useEffect(() => {
        let abortController = new AbortController();
        if (openDialog8) {
            dispatch(generaInformacionCuadrantesAccion());
        };
        return () => {
            abortController.abort();
        }
    }, [openDialog8]);

    return (
        <>
            <DialogComponente
                //resetear cuadrante
                prIsOpen={openDialog4}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesCuadrantes1Accion(respuesta))}
                prTituloDialog={"¿Estás seguro que quieres resetear el Cuadrante?"}
                prDescripcionDialog={"Para volver el cuadrante a sus valores iniciales pulsa 'De acuerdo', de lo contrario pulsa 'No'."}
            />
            <DialogComponente
                prIsOpen={openDialog5}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesVacioAccion(respuesta))}
                prTituloDialog={"Registra el cuadrante"}
                prDescripcionDialog={"Debes registrar el cuadrante nuevo antes de cambiar. Pulsa 'Registrar Cuadrante' en el menú superior."}
                prNoTieneBotones={true}
            />
            <DialogComponente
                //cambio pantalla sin guardar
                prIsOpen={openDialog7}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesCuadrantes3Accion(respuesta))}
                prTituloDialog={"¿Estás seguro que quieres cambiar de pantalla?"}
                prDescripcionDialog={"Estás tratando de cambiar de pantalla pero no has registrado los datos de tu última intervención. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'No' y registra los datos."}
            />
            <DialogComponente
                prIsOpen={openDialog8}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesVacioAccion(respuesta))}
                prTituloDialog={"Informe Cuadrante de Servicio"}
                prDescripcionDialog={<InformacionCuadrantes arrayInformeLineas={arrayInformeLineas} />}
                prNoTieneBotones={true}
                prFullWidth={true}
                prMaxWidth={true}
                prBotonImprimir={true}
            />
            <DialogComponente
                //eliminar cuadrante (múltiple)
                prIsOpen={openDialog12}
                prHandleCloseDialogBotones={(respuesta) => dispatch(handleCloseDialogBotonesCuadrantes5Accion(respuesta))}
                prTituloDialog={"¿Estás seguro que quieres borrar el Cuadrante en uso?"}
                prDescripcionDialog={"Estás tratando de borrar el cuadrante nº " + cuadranteEnUsoCuadrantes + " de la serie del Centro " + objetoCentro.nombre + ". Si estás conforme pulsa 'De acuerdo', de lo contrario pulsa 'No'."}
            />
        </>
    )
};

export default DialogsCuadrante;