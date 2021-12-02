import React, { useState } from 'react';
import Constantes from "../constantes";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Inicio from './Inicio';
import Login from './Login';
import Cuadrantes from './Cuadrantes';
import Trabajadores from './Trabajadores';
import Nominas from './Nominas';
import Configuracion from './Configuracion';
import Centros from './Centros';
import { makeStyles, Hidden } from '@material-ui/core';
import Cajon from './Cajon';

const subProduccio = Constantes.SUBDIRECTORI_PRODUCCIO;
const estilos = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}))

const Contenedor = () => {

    const classes = estilos()
    const [abrir, setAbrir] = useState(false)

    const accionAbrir = () => {
        setAbrir(!abrir)
    }
    let baseName;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        baseName = '';
    } else {
        baseName = subProduccio;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Router basename={baseName} >
                <Navbar accionAbrir={accionAbrir} />
                <Hidden xsDown>
                    <Cajon
                        variant="permanent"
                        open={true}
                    />
                </Hidden>
                <Hidden smUp>
                    <Cajon
                        variant="temporary"
                        open={abrir}
                        onClose={accionAbrir}
                    />
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <Route path="/" exact>
                            <Inicio />
                        </Route>
                        <Route path="/login" >
                            <Login />
                        </Route>
                        <Route path="/cuadrantes" >
                            <Cuadrantes />
                        </Route>
                        <Route path="/trabajadores/:id/:nombre" exact>
                            <Trabajadores />
                        </Route>
                        <Route path="/trabajadores" >
                            <Trabajadores />
                        </Route>                        
                        <Route path="/centros" >
                            <Centros />
                        </Route>
                        <Route path="/nominas" >
                            <Nominas />
                        </Route>
                        <Route path="/configuracion" >
                            <Configuracion />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Contenedor
