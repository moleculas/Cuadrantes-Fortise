import React, { useState } from 'react';
import Constantes from "../constantes";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Hidden } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import sadEmoji from '../images/sad_emoji.png';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

//carga componentes
import Cajon from './Cajon';
import Inicio from './Inicio';
import Login from './Login';
import Cuadrantes from './Cuadrantes';
import Trabajadores from './Trabajadores';
import Nominas from './Nominas';
import Configuracion from './Configuracion';
import Centros from './Centros';

//error boundary
//import { ErrorBoundary } from 'react-error-boundary'

function MyFallbackComponent({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={alert('jal')}>Try again</button>
        </div>
    )
}

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
}), { index: 1 })

const Contenedor = () => {

    const classes = estilos();
    let baseName;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        baseName = '';
    } else {
        baseName = subProduccio;
    };

    //states

    const [abrir, setAbrir] = useState(false);
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));

    //funciones    

    const accionAbrir = () => {
        setAbrir(!abrir)
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
                {esDesktop ? (
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
                                {/* <ErrorBoundary
                                    FallbackComponent={MyFallbackComponent}
                                    onError={(error, errorInfo) => console.log({ error, errorInfo })}
                                    onReset={() => {
                                        // reset the state of your app
                                    }}
                                > */}
                                    <Cuadrantes />
                                {/* </ErrorBoundary> */}
                            </Route>
                            <Route path="/trabajadores/:id/:nombre" exact>
                                <Trabajadores />
                            </Route>
                            <Route path="/trabajadores" >
                                <Trabajadores />
                            </Route>
                            <Route path="/centros/:id/:nombre" exact>
                                <Centros />
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

                ) : (<div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={6}>
                            <Box mt={4}>
                                <img src={sadEmoji} style={{ width: '100%', filter: 'sepia(100%)' }} alt="sadEmoji" />
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <Box mt={2} textAlign="center">
                                <Typography variant="h6">
                                    Aplicación no disponible para dispositivos móviles
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid></div>)}
            </Router>
        </div>
    )
}

export default Contenedor
