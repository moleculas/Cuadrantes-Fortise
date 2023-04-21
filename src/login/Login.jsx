import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Button,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    Paper,
    IconButton
  } from '@material-ui/core';
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';
import { withRouter } from "react-router-dom";

//estilos
import Clases from "../clases";

//importaciones acciones
import { ingresoUsuarioAccion } from '../redux/usuarioDucks';

//carga componentes
import CustomSnack from '../comun/CustomSnack';

const Login = (props) => {
    const classes = Clases();
    const dispatch = useDispatch();
    const errorDeAcceso = useSelector(store => store.variablesUsuario.errorDeAcceso);
    const logged = useSelector(store => store.variablesUsuario.activo);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    const [valuesForm, setValuesForm] = useState({
        nom: '',
        password: '',
        showPassword: false,
    });

    //useEffect

    useEffect(() => {
        if (logged) {
            props.history.push('/')
        }
    }, [logged, props.history]);

    useEffect(() => {
        if (errorDeAcceso) {
            setAlert({
                mensaje: "Datos incorrectos. Vuelve a probar.",
                tipo: 'error'
            })
            setOpenSnack(true);
            setValuesForm({
                nom: '',
                password: '',
                showPassword: false,
            });
        }
    }, [errorDeAcceso]);

    //funciones

    const handleChangeForm = (prop) => (event) => {
        setValuesForm({ ...valuesForm, [prop]: event.target.value });
    };

    const handleClickShowPasswordForm = () => {
        setValuesForm({ ...valuesForm, showPassword: !valuesForm.showPassword });
    };

    const handleMouseDownPasswordForm = (event) => {
        event.preventDefault();
    };

    const procesarDatos = (e) => {
        e.preventDefault();
        if (!valuesForm.nom.trim() || !valuesForm.password.trim()) {
            setAlert({
                mensaje: "Completa el formulario correctamente, faltan datos.",
                tipo: 'error'
            })
            setOpenSnack(true)
            return
        };
        dispatch(ingresoUsuarioAccion(valuesForm.nom, valuesForm.password));
    };

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
                style={{ minHeight: '60vh' }}
            >
                <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={3}>
                        <Box
                            p={5}
                            mt={2}
                            textAlign="center"

                        >
                            <form onSubmit={procesarDatos}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Usuario</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        className={classes.formInput}
                                        id="form-usuario"
                                        value={valuesForm.nom}
                                        onChange={handleChangeForm('nom')}
                                        labelWidth={60}

                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                >
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        className={classes.formInput}
                                        id="form-password"
                                        type={valuesForm.showPassword ? 'text' : 'password'}
                                        value={valuesForm.password}
                                        onChange={handleChangeForm('password')}
                                        labelWidth={75}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordForm}
                                                    onMouseDown={handleMouseDownPasswordForm}
                                                >
                                                    {valuesForm.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Button
                                    fullWidth
                                    className={classes.formButton}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                >
                                    Login
                                </Button>

                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <CustomSnack
                open={openSnack}
                message={alert.mensaje}
                severity={alert.tipo}
                tipoCuadrante={false}
                setOpenSnack={setOpenSnack}
            />
        </div>
    )
}

export default withRouter(Login)
