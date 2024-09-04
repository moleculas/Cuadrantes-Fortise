import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListSubheader
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { withRouter } from "react-router-dom";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SettingsIcon from '@material-ui/icons/Settings';

//carga componentes
import DialogComponente from '../comun/DialogComponente';

//importaciones acciones
import { logoutUsuarioAccion } from '../redux/usuarioDucks';
import { 
    activarDesactivarAccion,
    vaciarDatosConfiguracionAccion,
    abreObjetoDialogAccion,
    cierraObjetoDialogAccion,
    registrarIntervencionAccion,
    retornaAnoMesAccion,
    vaciarDatosUltimasIntervencionesAccion
 } from '../redux/appDucks';
import { 
    vaciarDatosCentrosAccion,
    vaciarDatosCentroAccion
 } from '../redux/centrosDucks';
import { 
    vaciarDatosTrabajadoresAccion,
    vaciarDatosTrabajadorAccion
 } from '../redux/trabajadoresDucks';
import { 
    vaciarDatosCuadrantesAccion,
    vaciarDatosCuadranteRegistradoAccion,
    cambioEstadoInicioCuadrantesAccion,
    setCalendarioAGestionarAccion,
    setCategoriaAccion
 } from '../redux/cuadrantesDucks';
import { 
    vaciarDatosNominasAccion,
    vaciarDatosCuadrantesvinculadosAccion,
    cambioEstadoInicioNominasAccion,
    setCalendarioAGestionarNominasAccion 
 } from '../redux/nominasDucks';
import { vaciarDatosPendientesAccion } from '../redux/pendientesDucks';
import { vaciarDatosHorasTrabajadoresAccion } from '../redux/horasTrabajadoresDucks';
import { 
    reseteaContenidoCuadranteAccion,
    setDisableSelectCentrosAccion,
    setAnchorElMenuAccion,
    setValueDatePickerAccion
 } from '../redux/cuadrantesSettersDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';

const Menu = (props) => {
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const openDialog3 = useSelector(store => store.variablesApp.openDialog[2]);
    const openDialog6 = useSelector(store => store.variablesApp.openDialog[5]);
    const openDialog11 = useSelector(store => store.variablesApp.openDialog[10]);
    const cuadranteNuevoRegistrado = useSelector(store => store.variablesCuadrantes.estadoIntervencionCuadranteNuevoRegistrada);
    const nominaNuevaRegistrada = useSelector(store => store.variablesNominas.estadoIntervencionNominaNuevaRegistrada);
    const nominaSinDatosEstado = useSelector(store => store.variablesNominas.nominaSinDatosEstado);
    const onEstem = useSelector(store => store.variablesApp.onEstem);

    //states   
    const [preValueLink, setPreValueLink] = useState('');

    //funciones

    const tancarSessio = () => {
        limpiezaGeneral();
        dispatch(logoutUsuarioAccion());
        localStorage.clear();
        props.history.push('/login');
    };

    const limpiezaGeneral = () => {
        if (onEstem === 'editarCentros' || onEstem === 'registrarCentros' || onEstem === 'inicio') {
            dispatch(vaciarDatosCentrosAccion());
        };
        if (onEstem === 'editarTrabajadores' || onEstem === 'registrarTrabajadores' || onEstem === 'inicio') {
            dispatch(vaciarDatosTrabajadoresAccion());
        };
        //gestión pendientes
        dispatch(vaciarDatosPendientesAccion());
        dispatch(setCalendarioAGestionarAccion(retornaAnoMesAccion()));
        //gestión faltantes
        dispatch(vaciarDatosHorasTrabajadoresAccion());
        dispatch(setCalendarioAGestionarNominasAccion(retornaAnoMesAccion()));
        //
        dispatch(activarDesactivarAccion(true));
        dispatch(vaciarDatosCuadrantesAccion());
        dispatch(vaciarDatosNominasAccion());
        dispatch(vaciarDatosConfiguracionAccion());
        dispatch(vaciarDatosCuadranteRegistradoAccion());
        dispatch(vaciarDatosCuadrantesvinculadosAccion());
        dispatch(cambioEstadoInicioCuadrantesAccion(true));
        dispatch(cambioEstadoInicioNominasAccion(true));
        dispatch(registrarIntervencionAccion(true));
        dispatch(vaciarDatosUltimasIntervencionesAccion());
        dispatch(vaciarDatosCentroAccion());
        dispatch(vaciarDatosTrabajadorAccion());
        //
        if (onEstem === 'cuadrantes') {
            dispatch(reseteaContenidoCuadranteAccion());
            dispatch(setDisableSelectCentrosAccion(true));
            dispatch(setCategoriaAccion(''));
            dispatch(setAnchorElMenuAccion(null));
            dispatch(forzarRecargaGraficosCuadrantesAccion(true));
            dispatch(vaciarDatosCentrosAccion());
            dispatch(vaciarDatosTrabajadoresAccion());
            dispatch(setValueDatePickerAccion(new Date(retornaAnoMesAccion())));
        };
    };

    const handleClick = (link) => {
        switch (link) {
            case '/':
                if (!cuadranteNuevoRegistrado || (!nominaNuevaRegistrada && !nominaSinDatosEstado)) {
                    if (!cuadranteNuevoRegistrado) {
                        handleClickOpenDialogMenu2();
                    };
                    if (!nominaNuevaRegistrada) {
                        handleClickOpenDialogMenu3();
                    };
                } else {
                    if (!intervencionRegistrada) {
                        setPreValueLink(link);
                        handleClickOpenDialogMenu1();
                    } else {
                        limpiezaGeneral();
                        props.history.push('/');
                    }
                }
                break;
            case '/cuadrantes':
                if (!nominaNuevaRegistrada && !nominaSinDatosEstado) {
                    handleClickOpenDialogMenu3();
                } else {
                    if (!intervencionRegistrada) {
                        setPreValueLink(link);
                        handleClickOpenDialogMenu1();
                    } else {
                        limpiezaGeneral();
                        props.history.push('/cuadrantes');
                    }
                }
                break;
            case '/trabajadores':
                if (!cuadranteNuevoRegistrado || (!nominaNuevaRegistrada && !nominaSinDatosEstado)) {
                    if (!cuadranteNuevoRegistrado) {
                        handleClickOpenDialogMenu2();
                    };
                    if (!nominaNuevaRegistrada) {
                        handleClickOpenDialogMenu3();
                    };
                } else {
                    if (!intervencionRegistrada) {
                        setPreValueLink(link);
                        handleClickOpenDialogMenu1();
                    } else {
                        limpiezaGeneral();
                        props.history.push('/trabajadores');
                    }
                }
                break;
            case '/centros':
                if (!cuadranteNuevoRegistrado || (!nominaNuevaRegistrada && !nominaSinDatosEstado)) {
                    if (!cuadranteNuevoRegistrado) {
                        handleClickOpenDialogMenu2();
                    };
                    if (!nominaNuevaRegistrada) {
                        handleClickOpenDialogMenu3();
                    };
                } else {
                    if (!intervencionRegistrada) {
                        setPreValueLink(link);
                        handleClickOpenDialogMenu1();
                    } else {
                        limpiezaGeneral();
                        props.history.push('/centros');
                    }
                }
                break;
            case '/horasTrabajadores':
                if (!cuadranteNuevoRegistrado) {
                    handleClickOpenDialogMenu2();
                } else {
                    if (!intervencionRegistrada) {
                        setPreValueLink(link);
                        handleClickOpenDialogMenu1();
                    } else {
                        limpiezaGeneral();
                        props.history.push('/horasTrabajadores');
                    }
                }
                break;
            case '/configuracion':
                if (!cuadranteNuevoRegistrado || (!nominaNuevaRegistrada && !nominaSinDatosEstado)) {
                    if (!cuadranteNuevoRegistrado) {
                        handleClickOpenDialogMenu2();
                    };
                    if (!nominaNuevaRegistrada) {
                        handleClickOpenDialogMenu3();
                    };
                } else {
                    if (!intervencionRegistrada) {
                        setPreValueLink(link);
                        handleClickOpenDialogMenu1();
                    } else {
                        limpiezaGeneral();
                        props.history.push('/configuracion');
                    }
                }
                break;
            default:
        }
    }

    //dialog

    const tituloDialogMenu1 = "¿Estás seguro que quieres cambiar de pantalla?";
    const descripcionDialogMenu1 = "Estás tratando de cambiar de pantalla pero no has registrado los datos de tu última intervención. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'No' y registra los datos.";
    const tituloDialogMenu2 = "Registra el cuadrante";
    const descripcionDialogMenu2 = "Debes registrar el cuadrante nuevo antes de cambiar. Pulsa 'Registrar Cuadrante' en el menú superior.";
    const tituloDialogMenu3 = "Registra la nómina";
    const descripcionDialogMenu3 = "Debes registrar la nómina nueva antes de cambiar. Pulsa 'Registrar Nómina' en el menú superior.";

    const handleClickOpenDialogMenu1 = () => {
        dispatch(abreObjetoDialogAccion('3'));
    };

    const handleClickOpenDialogMenu2 = () => {
        dispatch(abreObjetoDialogAccion('6'));
    };

    const handleClickOpenDialogMenu3 = () => {
        dispatch(abreObjetoDialogAccion('11'));
    };

    const handleCloseDialogBotonesMenu1 = (respuesta) => {
        if (respuesta === "acuerdo") {
            limpiezaGeneral();
            props.history.push(preValueLink);
        };
        dispatch(cierraObjetoDialogAccion());
    };

    const handleCloseDialogBotonesVacio = (respuesta) => {
        if (respuesta === "acuerdo") {
            dispatch(cierraObjetoDialogAccion());
        };
    };

    return (
        <div>
            <List component='nav'>
                {logged ? (
                    <ListItem
                        button
                        disabled={onEstem === 'inicio' ? true : false}
                        onClick={() => handleClick('/')}
                        style={{ marginTop: -8 }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Inicio' />
                    </ListItem>
                ) : null}
                <ListItem
                    button
                    onClick={tancarSessio}
                >
                    <ListItemIcon>
                        <LockOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary={logged ? ('Logout') : ('Login')} />
                </ListItem>
                <Divider />
            </List>
            {logged ? (
                <Fragment>
                    <List
                        component='nav'
                        subheader={
                            <ListSubheader component="div">
                                Gestión
                            </ListSubheader>
                        }
                        style={{ marginTop: -8 }}
                    >
                        <ListItem
                            button
                            disabled={onEstem === 'cuadrantes' ? true : false}
                            //disabled={true}
                            onClick={() => handleClick('/cuadrantes')}
                        >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary='Cuadrantes' />
                        </ListItem>
                        <ListItem
                            button
                            disabled={onEstem === 'horasTrabajadores' ? true : false}
                            //disabled={true}
                            onClick={() => handleClick('/horasTrabajadores')}
                        >
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary='Control Horario' />
                        </ListItem>
                        <Divider />
                    </List>
                    <List
                        component='nav'
                        subheader={
                            <ListSubheader component="div">
                                Configuración
                            </ListSubheader>
                        }
                        style={{ marginTop: -8 }}
                    >
                        <ListItem
                            button
                            disabled={onEstem === 'editarCentros' || onEstem === 'registrarCentros' ? true : false}
                            onClick={() => handleClick('/centros')}
                        >
                            <ListItemIcon>
                                <HomeWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary='Centros' />
                        </ListItem>
                        <ListItem
                            button
                            disabled={onEstem === 'editarTrabajadores' || onEstem === 'registrarTrabajadores' ? true : false}
                            onClick={() => handleClick('/trabajadores')}
                        >
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary='Trabajadores' />
                        </ListItem>
                        <ListItem
                            button
                            disabled={onEstem === 'configuracion' ? true : false}
                            onClick={() => handleClick('/configuracion')}
                        >
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary='General' />
                        </ListItem>
                        <Divider />
                    </List>
                </Fragment>
            ) : null}
            <DialogComponente
                prIsOpen={openDialog3}
                prHandleCloseDialogBotones={handleCloseDialogBotonesMenu1}
                prTituloDialog={tituloDialogMenu1}
                prDescripcionDialog={descripcionDialogMenu1}
            />
            <DialogComponente
                prIsOpen={openDialog6}
                prHandleCloseDialogBotones={handleCloseDialogBotonesVacio}
                prTituloDialog={tituloDialogMenu2}
                prDescripcionDialog={descripcionDialogMenu2}
                prNoTieneBotones={true}
            />
            <DialogComponente
                prIsOpen={openDialog11}
                prHandleCloseDialogBotones={handleCloseDialogBotonesVacio}
                prTituloDialog={tituloDialogMenu3}
                prDescripcionDialog={descripcionDialogMenu3}
                prNoTieneBotones={true}
            />
            {/* {console.log(onEstem)} */}
        </div>
    )
}

export default withRouter(Menu)
