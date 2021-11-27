import React, { useEffect } from 'react';
import logo from '../images/logo_big.png';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { Link } from "react-router-dom";

//importaciones acciones
import { onEstemAccion } from '../redux/appDucks';

const estilos = makeStyles((theme) => ({

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
    logo: {
        width: '90%'
    },
    button: {
        marginBottom: 15
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }

}));

const Inicio = (props) => {

    const classes = estilos();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {       
        dispatch(onEstemAccion('inicio'));      
    }, [dispatch]);

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
                style={{ minHeight: '75vh' }}
            >
                <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={3}>
                        <Box
                            p={3}
                            mt={1}
                            textAlign="center"

                        >
                            <Box >
                                <img src={logo} className={classes.logo} alt="logo" />
                            </Box>
                            <Box
                                px={2}
                            >
                                <Link to="/cuadrantes" className={classes.link}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        className={classes.button}
                                        style={{ fontSize: 17 }}
                                        startIcon={<AssignmentIcon style={{ fontSize: 40 }}/>}
                                    >
                                        Gestión de Cuadrantes
                                    </Button>
                                </Link>
                                <Link to="/trabajadores" className={classes.link}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth                                      
                                        className={classes.button}
                                        style={{ fontSize: 17 }}
                                        startIcon={<SupervisorAccountIcon style={{ fontSize: 40 }}/>}
                                    >
                                        Gestión de Trabajadores
                                    </Button>
                                </Link>
                                <Link to="/centros" className={classes.link}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        className={classes.button}
                                        style={{ fontSize: 17 }}
                                        startIcon={<HomeWorkIcon style={{ fontSize: 40 }}/>}
                                    >
                                        Gestión de Centros
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Inicio)