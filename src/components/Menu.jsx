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

//carga componentes
import DialogComponente from './DialogComponente';

//importaciones acciones
import { logoutUsuarioAccion } from '../redux/usuarioDucks';
import { activarDesactivarAccion } from '../redux/appDucks';
import { vaciarDatosCentrosAccion } from '../redux/centrosDucks';
import { vaciarDatosTrabajadoresAccion } from '../redux/trabajadoresDucks';
import { vaciarDatosCuadrantesAccion } from '../redux/cuadrantesDucks';
import { vaciarDatosCuadranteRegistradoAccion } from '../redux/cuadrantesDucks';
import { cambioEstadoInicioCuadrantesAccion } from '../redux/cuadrantesDucks';
import { abreObjetoDialogAccion } from '../redux/appDucks';
import { cierraObjetoDialogAccion } from '../redux/appDucks';
import { registrarIntervencionAccion } from '../redux/appDucks';

const Menu = (props) => {

    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const intervencionRegistrada = useSelector(store => store.variablesApp.estadoIntervencionRegistrada);
    const openDialog3 = useSelector(store => store.variablesApp.openDialog[2]);
    const openDialog6 = useSelector(store => store.variablesApp.openDialog[5]);
    const cuadranteNuevoRegistrado = useSelector(store => store.variablesCuadrantes.estadoIntervencionCuadranteNuevoRegistrada);
    const onEstem = useSelector(store => store.variablesApp.onEstem);

    //states   
    const [preValueLink, setPreValueLink] = useState('');

    //funciones

    const tancarSessio = () => {
        limpiezaGeneral();
        dispatch(logoutUsuarioAccion());
        props.history.push('/login');
    };

    const limpiezaGeneral = () => {
        dispatch(vaciarDatosCentrosAccion());
        dispatch(vaciarDatosTrabajadoresAccion());
        dispatch(activarDesactivarAccion(true));
        dispatch(vaciarDatosCuadrantesAccion());
        dispatch(vaciarDatosCuadranteRegistradoAccion());
        dispatch(cambioEstadoInicioCuadrantesAccion(true));
        dispatch(registrarIntervencionAccion(true));
    };

    const handleClick = (link) => {
        switch (link) {
            case '/':
                if (!cuadranteNuevoRegistrado) {
                    handleClickOpenDialogMenu2();
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
                if (!intervencionRegistrada) {
                    setPreValueLink(link);
                    handleClickOpenDialogMenu1();
                } else {
                    limpiezaGeneral();
                    props.history.push('/cuadrantes');
                }
                break;
            case '/trabajadores':
                if (!cuadranteNuevoRegistrado) {
                    handleClickOpenDialogMenu2();
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
                if (!cuadranteNuevoRegistrado) {
                    handleClickOpenDialogMenu2();
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
            case '/nominas':
                if (!cuadranteNuevoRegistrado) {
                    handleClickOpenDialogMenu2();
                } else {
                    if (!intervencionRegistrada) {
                        setPreValueLink(link);
                        handleClickOpenDialogMenu1();
                    } else {
                        limpiezaGeneral();
                        props.history.push('/nominas');
                    }
                }
                break;
            default:
        }
    }

    //dialog

    const tituloDialogMenu1 = "¿Estás seguro que quieres cambiar de pantalla?";
    const descripcionDialogMenu1 = "Estás tratando de cambiar de pantalla pero no has registrado los datos de tu última intervención. Si no deseas guardar los datos pulsa 'De acuerdo', de lo contrario pulsa 'Desacuerdo' y registra los datos.";
    const tituloDialogMenu2 = "Registra el cuadrante";
    const descripcionDialogMenu2 = "Debes registrar el cuadrante nuevo antes de cambiar. Pulsa 'Registrar Cuadrante' en el menú superior.";

    const handleClickOpenDialogMenu1 = () => {
        dispatch(abreObjetoDialogAccion('3'));
    };

    const handleClickOpenDialogMenu2 = () => {
        dispatch(abreObjetoDialogAccion('6'));
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
    // {logged ? (
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
                    onClick={() => handleClick('/cuadrantes')}
                >
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary='Cuadrantes' />
                </ListItem>
                <ListItem
                    button
                    disabled={onEstem === 'nominas' ? true : false}
                    onClick={() => handleClick('/nominas')}
                >
                    <ListItemIcon>
                        <AssignmentIndIcon />
                    </ListItemIcon>
                    <ListItemText primary='Nóminas' />
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
        </div>
    )
}

export default withRouter(Menu)
