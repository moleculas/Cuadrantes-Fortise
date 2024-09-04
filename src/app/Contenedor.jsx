import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    Grid,
    Box,
    useMediaQuery,
    Hidden,
    CssBaseline,
    Typography
} from '@material-ui/core';
import sadEmoji from '../images/sad_emoji.png';

//carga componentes
import Navbar from './Navbar';
import Cajon from './Cajon';
import Inicio from '../inicio/Inicio';
import Login from '../login/Login';
import Cuadrantes from '../cuadrantes/Cuadrantes';
import Trabajadores from '../trabajadores/Trabajadores';
import HorasTrabajadores from '../nominas/HorasTrabajadores';
import Configuracion from '../configuracion/Configuracion';
import Centros from '../centros/Centros';
import NotFoundPage from './NotFoundPage';

//importación acciones
import { goToInicioCuadrantesAccion } from '../redux/cuadrantesHandlersDucks';

//estilos
import Clases from "../clases";

//error boundary
import { ErrorBoundary } from 'react-error-boundary';

function MyFallbackComponent({ error, resetErrorBoundary }) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log(error.message);
    } else {
        window.location.reload(false);
    };
};

//constantes
const subProduccio = Constantes.SUBDIRECTORI_PRODUCCIO;

const Contenedor = () => {
    const classes = Clases();
    const dispatch = useDispatch();
    const { esInicioCuadrantes } = useSelector(store => store.variablesCuadrantes);
    let baseName;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        baseName = '';
    } else {
        baseName = subProduccio;
    };
    const [abrir, setAbrir] = useState(false);
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));

    //useEffect

    useEffect(() => {
        if (!esDesktop && !esInicioCuadrantes) {
            dispatch(goToInicioCuadrantesAccion('effect'));
        };
    }, [esDesktop]);

    //funciones    

    const accionAbrir = () => {
        setAbrir(!abrir)
    };

    return (
        <div className={classes.rootContenedor}>
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
                                <ErrorBoundary
                                    FallbackComponent={MyFallbackComponent}
                                // onError={(error, errorInfo) => console.log({ error, errorInfo })}
                                // onReset={() => {
                                //     // reset the state of your app
                                // }}
                                >
                                    <Cuadrantes />
                                </ErrorBoundary>
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
                            <Route path="/horasTrabajadores" >
                                <HorasTrabajadores />
                            </Route>
                            <Route path="/configuracion" >
                                <Configuracion />
                            </Route>
                            <Route path="*" >
                                <NotFoundPage />
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
