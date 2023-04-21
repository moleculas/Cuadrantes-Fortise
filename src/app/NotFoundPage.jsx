import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

//carga componentes

//estilos
import Clases from "../clases";

//importaciones acciones

//tabs

//snackbar y alert

const NotFoundPage = (props) => {
    const classes = Clases();
    const logged = useSelector(store => store.variablesUsuario.activo);

    //states

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    //funciones   

    return (
        <div>
            <Grid
                spacing={1}
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
                p={2}
            >
                <Alert severity="error">Página no encontrada. Retorna al <Link to={`/`} className={classes.link}><b>Inicio</b></Link>.</Alert>
            </Grid>
            {/* {console.log(numeroCuadrantesPendientes, numeroCuadrantesRegistrados, numeroCuadrantesFacturados)} */}
        </div>
    )
}

export default NotFoundPage
