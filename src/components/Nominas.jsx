import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core';

//importaciones acciones
import { onEstemAccion } from '../redux/appDucks';

const estilos = makeStyles((theme) => ({
    //loading
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    root11: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
    },
}));

const Nominas = (props) => {

    const classes = estilos();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);    
    const onEstem = useSelector(store => store.variablesApp.onEstem);

    
    //states

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {       
        dispatch(onEstemAccion('nominas'));       
    }, [dispatch]);

    //funciones    

    return (
        <div>
            ola ke ase
        </div>
    )
}

export default withRouter(Nominas)
