import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import {
    CircularProgress,   
    Box,
    Grid
} from '@material-ui/core';

//estilos
import Clases from "../../clases";

//importaciones acciones
import {
    obtenerNominasPorAnyoAccion,
    forzarRecargaGraficosNominasAccion
} from '../../redux/graficosDucks';

//carga componentes
import CustomSnack from '../../comun/CustomSnack';

const GraficoNominas = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const nominasPorAnyoGraficos = useSelector(store => store.variablesGraficos.nominasPorAnyoGraficos);
    const errorDeCargaGraficosNominas = useSelector(store => store.variablesGraficos.errorDeCargaGraficosNominas);
    const openLoadingGraficosNominas = useSelector(store => store.variablesGraficos.loadingGraficos);
    const forzarRecargaGraficosNominas = useSelector(store => store.variablesGraficos.forzarRecargaGraficosNominas);

    //states

    const [openLoading, setOpenLoading] = useState(true);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    //useEffect

    useEffect(() => {
        if (forzarRecargaGraficosNominas) {
            dispatch(obtenerNominasPorAnyoAccion('nominas'));
            dispatch(forzarRecargaGraficosNominasAccion(false));
        }
    }, [forzarRecargaGraficosNominas]);

    useEffect(() => {
        if (errorDeCargaGraficosNominas) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaGraficosNominas]);

    useEffect(() => {
        if (!openLoadingGraficosNominas) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingGraficosNominas]);

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
                    <LineChart
                        width={props.prWidthContenedores}
                        height={props.prHeightContenedores}
                        data={nominasPorAnyoGraficos}
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
                        <Line type="monotone" dataKey="Gastos" stroke="#ff9800" activeDot={{ r: 4 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                )}
                <CustomSnack
                    open={openSnack}
                    message={alert.mensaje}
                    severity={alert.tipo}
                    tipoCuadrante={false}
                    setOpenSnack={setOpenSnack}
                />
            </Grid>
            {/* {console.log(nominasPorAnyoGraficos)} */}
        </div>
    )
}

export default GraficoNominas
