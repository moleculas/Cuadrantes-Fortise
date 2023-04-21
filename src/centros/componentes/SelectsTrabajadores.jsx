import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Select
} from '@material-ui/core';

//carga componentes
import CustomSnack from '../../comun/CustomSnack';

//estilos
import Clases from "../../clases";

//importaciones acciones
import {
    registrarIntervencionAccion,
} from '../../redux/appDucks';
import {
    activarDesactivarActualizarCentroAccion,
} from '../../redux/centrosDucks';

const SelectsTrabajadores = (props) => {
    const {
        trabajadores,
        valuesForm,
        setValuesForm,
        setTrabajadores
    } = props;
    const classes = Clases();
    const dispatch = useDispatch();
    const listadoTrabajadores = useSelector(store => store.variablesTrabajadores.arrayTrabajadores);
    const array = Array.from({ length: trabajadores.cantidad }, (_, i) => i + 1);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    //funciones

    const handleChangeFormEdicionSelectsTrabajadores = (tipo, index) => (e) => {
        let encontrado = false;
        if (e.target.value) {
            const trabajadorSeleccionado = listadoTrabajadores.find(trabajador => trabajador.id === e.target.value);
            if (trabajadorSeleccionado.estado === 'reserva') {
                setAlert({
                    mensaje: "El trabajador está en Reserva, selecciona otro o cambia su estado.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return;
            };
        };
        trabajadores.trabajadores.map((trabajador, index) => {
            if ((trabajador['trabajador_' + (index + 1)] === e.target.value || trabajador['suplente_' + (index + 1)] === e.target.value) && e.target.value) {
                setAlert({
                    mensaje: "Este trabajador ya consta como registrado, selecciona otro.",
                    tipo: 'error'
                })
                setOpenSnack(true);
                return encontrado = true;
            };
        });
        if (!encontrado) {
            if (tipo === "trabajador") {
                const arrayTr = valuesForm.datosTrabajadores.map((valor, i) => i === index ? e.target.value : valor);
                const arrayTrEd = trabajadores.trabajadores.map((trabajador, i) => i === index ? { ...trabajador, ['trabajador_' + (i + 1)]: e.target.value } : trabajador);
                setValuesForm({ ...valuesForm, datosTrabajadores: arrayTr });
                setTrabajadores({ ...trabajadores, trabajadores: arrayTrEd });
            };
            if (tipo === "suplente") {
                const arraySu = valuesForm.datosSuplentes.map((valor, i) => i === index ? e.target.value : valor);
                const arrayTrEd = trabajadores.trabajadores.map((trabajador, i) => i === index ? { ...trabajador, ['suplente_' + (i + 1)]: e.target.value } : trabajador);
                setValuesForm({ ...valuesForm, datosSuplentes: arraySu });
                setTrabajadores({ ...trabajadores, trabajadores: arrayTrEd });
            };
            dispatch(registrarIntervencionAccion(false));
            dispatch(activarDesactivarActualizarCentroAccion(false));
        };
    };

    if (listadoTrabajadores.length === 0) {
        return null
    };

    return (
        <>
            {array.map((index) => (
                <Box
                    key={`box-trabajadores-` + index}
                    p={0.5}
                    className={classes.mb15}
                >
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.mb20}
                        size="small"
                    >
                        <InputLabel>{`Trabajador-` + index}</InputLabel>
                        <Select
                            id={`form-trabajador-` + index}
                            value={valuesForm.datosTrabajadores[index - 1] || ''}
                            onChange={handleChangeFormEdicionSelectsTrabajadores('trabajador', index - 1)}
                            input={
                                <OutlinedInput
                                    labelWidth={95}
                                />
                            }
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
                            {listadoTrabajadores.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                    >
                        <InputLabel>{`Suplente-` + index}</InputLabel>
                        <Select
                            id={`form-suplente-` + index}
                            value={valuesForm.datosSuplentes[index - 1] || ''}
                            onChange={handleChangeFormEdicionSelectsTrabajadores('suplente', index - 1)}
                            input={
                                <OutlinedInput
                                    labelWidth={80}
                                />
                            }
                        >
                            <MenuItem value=''>
                                <em>No</em>
                            </MenuItem>
                            {listadoTrabajadores.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            ))}
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
        </>
    )
};

export default SelectsTrabajadores