import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';

//importaciones acciones
import { obtenerCuadrantesPorAnyoAccion } from '../redux/graficosDucks';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const GraficoCuadrantes = (props) => {

    const dispatch = useDispatch();
    const cuadrantesPorAnyoGraficos = useSelector(store => store.variablesGraficos.cuadrantesPorAnyoGraficos);

    //useEffect

    useEffect(() => {
        dispatch(obtenerCuadrantesPorAnyoAccion('cuadrantes'));
    }, [dispatch]);

    useEffect(() => {
        if (cuadrantesPorAnyoGraficos.length > 0) {
            cuadrantesPorAnyoGraficos.forEach((mes, index) => {              
               if(mes.length >0){
                   mes.forEach((mesInt, index) => { 
                    // console.log(JSON.parse(mesInt['datos_informe']))
                   });
               }
            });

        }
    }, [cuadrantesPorAnyoGraficos]);

    return (
        <div>
            <LineChart
                width={props.prWidthContenedores}
                height={props.prHeightContenedores}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="pv" stroke="#3f51b5" activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
            {/* {console.log(cuadrantesPorAnyoGraficos)} */}
        </div>
    )
}

export default GraficoCuadrantes
