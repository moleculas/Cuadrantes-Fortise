import React, { useState, useEffect } from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerCuadrantesPorAnyoAccion } from '../redux/graficosDucks';
import { forzarRecargaGraficosCuadrantesAccion } from '../redux/graficosDucks';

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const GraficoCuadrantes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const cuadrantesPorAnyoGraficos = useSelector(store => store.variablesGraficos.cuadrantesPorAnyoGraficos);
    const errorDeCargaGraficosCuadrantes = useSelector(store => store.variablesGraficos.errorDeCargaGraficosCuadrantes);
    const openLoadingGraficosCuadrantes = useSelector(store => store.variablesGraficos.loadingGraficos);
    const forzarRecargaGraficosCuadrantes = useSelector(store => store.variablesGraficos.forzarRecargaGraficosCuadrantes);

    //states

    const [openLoading, setOpenLoading] = useState(true);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    //useEffect

    useEffect(() => {
        if (forzarRecargaGraficosCuadrantes) {
            dispatch(obtenerCuadrantesPorAnyoAccion('cuadrantes'));
            dispatch(forzarRecargaGraficosCuadrantesAccion(false));
        }
    }, [forzarRecargaGraficosCuadrantes]);

    useEffect(() => {
        if (errorDeCargaGraficosCuadrantes) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaGraficosCuadrantes]);

    useEffect(() => {
        if (!openLoadingGraficosCuadrantes) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingGraficosCuadrantes]);

    //funciones    

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    return (
        <div>
            <Grid
                spacing={1}
                container
                direction="column"
                justify="center"
                alignItems="center"
                p={2}
                className={classes.rootPendientes}
                style={{ minHeight: props.prHeightContenedores, maxHeight: props.prHeightContenedores }}
            >
                {openLoading ? (
                    <Box
                        className={classes.centrado}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <BarChart
                        width={props.prWidthContenedores}
                        height={props.prHeightContenedores}
                        data={cuadrantesPorAnyoGraficos}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" style={{ fontSize: '0.7rem' }} />
                        <YAxis style={{ fontSize: '0.7rem' }} />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Bar type="monotone" dataKey="Empresas" stackId="a" fill="#00bcd4" />
                        <Bar type="monotone" dataKey="Pisos" stackId="a" fill="#8884d8" />                       
                    </BarChart>
                )}
                <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                    <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                        {alert.mensaje}
                    </Alert>
                </Snackbar>
            </Grid>
            {/* {console.log(cuadrantesPorAnyoGraficos)} */}
        </div>
    )
}

export default GraficoCuadrantes
