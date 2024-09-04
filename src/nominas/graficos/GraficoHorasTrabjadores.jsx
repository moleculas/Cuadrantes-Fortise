import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    obtenerHorasTrabajadoresPorAnyoAccion,
    forzarRecargaGraficosHorasTrabajadoresAccion
} from '../../redux/graficosDucks';

//carga componentes
import CustomSnack from '../../comun/CustomSnack';

const GraficoHorasTrabjadores = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const {
        horasTrabajadoresPorAnyoGraficos,
        errorDeCargaGraficosHorasTrabajadores,
        loadingGraficos: openLoadingGraficosHorasTrabajadores,
        forzarRecargaGraficosHorasTrabajadores
    } = useSelector(store => store.variablesGraficos);

    //states

    const [openLoading, setOpenLoading] = useState(true);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    //useEffect

    useEffect(() => {
        if (forzarRecargaGraficosHorasTrabajadores) {
            dispatch(obtenerHorasTrabajadoresPorAnyoAccion('horas_trabajadores'));
            dispatch(forzarRecargaGraficosHorasTrabajadoresAccion(false));
        }
    }, [forzarRecargaGraficosHorasTrabajadores]);

    useEffect(() => {
        if (errorDeCargaGraficosHorasTrabajadores) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaGraficosHorasTrabajadores]);

    useEffect(() => {
        if (!openLoadingGraficosHorasTrabajadores) {
            setOpenLoading(false)
        } else {
            setOpenLoading(true)
        }
    }, [openLoadingGraficosHorasTrabajadores]);

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
                        data={horasTrabajadoresPorAnyoGraficos}
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
                        <Bar type="monotone" dataKey="Horas" fill="#ffa726" stackId="a" />                  
                    </BarChart>
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

export default GraficoHorasTrabjadores