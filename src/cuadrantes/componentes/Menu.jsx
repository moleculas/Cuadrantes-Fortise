import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Button,
    FormControl,
    MenuItem,
    Tooltip,
    ListItemIcon,
    ListItemText,
    Collapse,
    InputAdornment,
    TextField,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import {
    Assignment as AssignmentIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    SystemUpdateAlt as SystemUpdateAltIcon,
    Home as HomeIcon,
    Description as DescriptionIcon,
    ExpandLess,
    ExpandMore,
    Edit as EditIcon
} from '@material-ui/icons';

//importaciones acciones
import {
    handleCloseMenuAccion,
    handleClickMenuAccion,
    goToInicioCuadrantesAccion,
    handleClickOpenDialogCuadrantes1Accion
} from '../../redux/cuadrantesHandlersDucks';
import {
    handleClickFacturarCuadranteAccion,
    handleClickFacturacionMenuAccion,
    handleClickFacturacionInteriorMenuAccion,
    handleChangeFormNumumeroFactusolAccion,
    handleClickFacturarReciboCuadranteAccion
} from '../../redux/cuadrantesFacturacionDucks';
import { StyledMenu } from '../../logica/logicaApp';
import {
    gestionarDocumentosCuadranteAccion,
    handleGenerarArchivosAccion,
    procesarDatosCuadranteAccion
} from '../../logica/logicaGestionCuadrantes';
import { gestionarMailingIndividualAccion } from '../../redux/cuadrantesMailingDucks';
import { obtenerNumeracionAccion } from '../../redux/appDucks';

//estilos
import Clases from "../../clases";

//pdf
import { pdf } from "@react-pdf/renderer";
import ReciboPDF from "../ReciboPDF";

//carga componentes
import CustomSnack from '../../comun/CustomSnack';

const Menu = () => {
    const classes = Clases();
    const dispatch = useDispatch();
    const { objetoCentro } = useSelector(store => store.variablesCentros);
    const {
        objetoCuadrante,
        esInicioCuadrantes,
        estadoActivadoDesactivadoBotonRegistrar: disabledItemBotonRegistrar,
        estadoActivadoDesactivadoBotonActualizar: disabledItemBotonActualizar,
        estadoActivadoDesactivadoBotonResetear: disabledItemBotonResetear,
        cuadranteRegistrado
    } = useSelector(store => store.variablesCuadrantes);
    const {
        anchorElMenu,
        openFacturacion,
        openFacturacionInterior,
        numeroFactusol,
        cuadranteBloqueado,
        disableCargando
    } = useSelector(store => store.variablesCuadrantesSetters);
    const {
        loadingMailing: openLoadingMailing,
        errorEnviarMail,
        exitoEnviarMail
    } = useSelector(store => store.variablesCuadrantesMailing);
    const [alert, setAlert] = useState({});
    const [openSnack, setOpenSnack] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);

    //useEffect

    useEffect(() => {
        if (errorEnviarMail) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorEnviarMail]);

    useEffect(() => {
        if (exitoEnviarMail) {
            setAlert({
                mensaje: "Factura enviada por email correctamente.",
                tipo: 'success'
            })
            setOpenSnack(true);
        }
    }, [exitoEnviarMail]);

    useEffect(() => {
        if (!openLoadingMailing) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingMailing]);

    //funciones

    const gestionarReciboPDF = async () => {
        try {
            const numRecibo = objetoCuadrante.total.procesado.numR || await dispatch(obtenerNumeracionAccion('numero_recibo'));
            if (!numRecibo) {
                console.error('Error: No se pudo obtener el número de recibo');
                return;
            }
            dispatch(gestionarDocumentosCuadranteAccion('recibo', numRecibo));
            const [anyo, mes] = objetoCuadrante.nombre.split("-");
            const element = (
                <ReciboPDF
                    objetoReciboPDF={objetoCuadrante.datosInforme.datosGestionEsp}
                    anyo={anyo}
                    mes={mes}
                    numRecibo={numRecibo}
                />
            );
            const myPdf = pdf([]);
            myPdf.updateContainer(element);
            const blob = await myPdf.toBlob();
            if (blob) {
                const file = new File([blob], `Recibo-${objetoCuadrante.nombre}.pdf`, { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                const pdfWindow = window.open();
                pdfWindow.location.href = fileURL;
            }
        } catch (error) {
            console.error('Error al obtener el número de recibo:', error);
        };
    };

    const handleClickEnviarMail = () => {
        if (!objetoCuadrante.total.mail) {
            setAlert({
                mensaje: `El centro ${objetoCuadrante.total.nombreCentro} no tiene asignado un mail para enviar factura.`,
                tipo: 'error'
            })
            setOpenSnack(true);
            return;
        };
        dispatch(gestionarMailingIndividualAccion(objetoCuadrante));
    };

    return (
        <Grid item xs={3}>
            {/* {console.log(objetoCuadrante.total)} */}
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box className={classes.alignRight}>
                <FormControl
                    className={classes.form}>
                    <Button
                        disabled={esInicioCuadrantes ? true : false}
                        style={{ marginRight: 20, width: 250 }}
                        variant="contained"
                        color='primary'
                        startIcon={<AssignmentIcon />}
                        onClick={(event) => dispatch(handleClickMenuAccion(event))}
                    >
                        Gestión cuadrantes
                    </Button>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorElMenu}
                        keepMounted
                        open={Boolean(anchorElMenu)}
                        onClose={() => dispatch(handleCloseMenuAccion())}
                    >
                        <MenuItem
                            onClick={() => dispatch(goToInicioCuadrantesAccion('menu'))}
                            disabled={disableCargando}
                        >
                            <ListItemIcon>
                                <HomeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Inicio Cuadrantes" />
                        </MenuItem>
                        <MenuItem
                            onClick={() => dispatch(procesarDatosCuadranteAccion('normal'))}
                            disabled={(cuadranteBloqueado || objetoCuadrante.estado === 'facturado') ? true :
                                cuadranteRegistrado === 'si' ? disabledItemBotonActualizar : disabledItemBotonRegistrar}
                        >
                            <ListItemIcon>
                                {cuadranteRegistrado === 'si' ? <SystemUpdateAltIcon fontSize="small" /> : <SaveIcon fontSize="small" />}
                            </ListItemIcon>
                            <ListItemText primary={cuadranteRegistrado === 'si' ? 'Actualizar Cuadrante' : 'Registrar Cuadrante'} />
                        </MenuItem>
                        <MenuItem
                            onClick={() => dispatch(handleClickFacturacionMenuAccion())}
                            disabled={(cuadranteRegistrado === 'no' || (objetoCuadrante.estado === 'registrado' && !disabledItemBotonActualizar)) ? true : false}
                        >
                            <ListItemIcon>
                                <DescriptionIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Facturar" />
                            {openFacturacion ? <ExpandLess /> : <ExpandMore />}
                        </MenuItem>
                        <Collapse in={openFacturacion} timeout="auto" unmountOnExit>
                            {((objetoCentro.nombre !== '' && objetoCentro?.horario?.horario?.some(item => item?.computo === 3)) || (objetoCentro.nombre !== '' && objetoCentro.serviciosFijos.gestionEspSF)) ? (
                                <MenuItem
                                    className={classes.nested}
                                    onClick={() => dispatch(handleClickFacturarReciboCuadranteAccion())}
                                    disabled={objetoCuadrante.estado === 'facturado' && disabledItemBotonActualizar ? true : false}
                                >
                                    <ListItemText primary="Registrar Recibo" />
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    className={classes.nested}
                                    onClick={() => dispatch(handleClickFacturarCuadranteAccion())}
                                    disabled={objetoCuadrante.estado === 'facturado' && disabledItemBotonActualizar ? true : false}
                                >
                                    <ListItemText primary="Registrar Factura" />
                                </MenuItem>
                            )}
                            <MenuItem
                                className={classes.nested}
                                onClick={() => dispatch(handleClickFacturacionInteriorMenuAccion())}
                                //modificador: No facturar
                                disabled={
                                    !objetoCuadrante.datosCuadrante?.facturar
                                      ? objetoCuadrante.estado === 'facturado' && disabledItemBotonActualizar
                                        ? false
                                        : true
                                      : objetoCuadrante.datosCuadrante.facturar === "no"
                                  }
                            >
                                <ListItemText primary={((objetoCentro.nombre !== '' && objetoCentro?.horario?.horario?.some(item => item?.computo === 3)) || (objetoCentro.nombre !== '' && objetoCentro.serviciosFijos.gestionEspSF)) ? "Generar Recibo" : "Generar Archivos"} />
                                {openFacturacionInterior ? <ExpandLess /> : <ExpandMore />}
                            </MenuItem>
                            <Collapse in={openFacturacionInterior} timeout="auto" unmountOnExit>
                                {((objetoCentro.nombre !== '' && objetoCentro?.horario?.horario?.some(item => item?.computo === 3)) || (objetoCentro.nombre !== '' && objetoCentro.serviciosFijos.gestionEspSF)) ? (
                                    objetoCuadrante.estado === 'facturado' ? (
                                        <MenuItem
                                            className={classes.nested}
                                            onClick={() => gestionarReciboPDF()}
                                        >
                                            <ListItemText primary="Emitir recibo" />
                                        </MenuItem>
                                    ) : null
                                ) : (
                                    <MenuItem
                                        className={classes.nested}
                                    >
                                        <FormControl
                                            size="small"
                                            style={{ marginRight: 15, width: 90, marginBottom: 5, }}
                                        >
                                            <Tooltip title="Último nº de factura emitida en FACTUSOL" placement="left" arrow>
                                                <TextField
                                                    id="form-numero-factusol-cuadrantes"
                                                    value={numeroFactusol || ''}
                                                    onChange={(event) => dispatch(handleChangeFormNumumeroFactusolAccion(event))}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <EditIcon className={classes.colorText} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Tooltip>
                                        </FormControl>
                                        <ListItemText
                                            onClick={() => dispatch(handleGenerarArchivosAccion())}
                                            primary="Procesar"
                                        />
                                    </MenuItem>
                                )}
                            </Collapse>
                            <MenuItem
                                className={classes.nested}
                                onClick={() => handleClickEnviarMail()}
                                disabled={!objetoCuadrante?.total?.procesado?.numF}
                                style={{ cursor: objetoCuadrante?.total?.procesado?.numF && !objetoCuadrante?.total?.mail ? 'not-allowed' : 'pointer' }}
                            >
                                <ListItemText primary="Enviar mail Factura" />
                            </MenuItem>
                        </Collapse>
                        <MenuItem
                            onClick={() => dispatch(handleClickOpenDialogCuadrantes1Accion())}
                            disabled={disabledItemBotonResetear}
                        >
                            <ListItemIcon>
                                <DeleteIcon style={{ color: 'red' }} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText style={{ color: 'red' }} primary="Resetear Cuadrante" />
                        </MenuItem>
                    </StyledMenu>
                </FormControl>
            </Box>
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
        </Grid>
    );
};

export default Menu;