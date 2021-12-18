import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from "react-router-dom";

//importaciones acciones
import { ingresoUsuarioAccion } from '../redux/usuarioDucks';

const estilos = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    formInput: {
        marginBottom: '10px',
    },

}), {index: 1});

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {

    const classes = estilos();
    const dispatch = useDispatch();
    const errorDeAcceso = useSelector(store => store.variablesUsuario.errorDeAcceso);
    const logged = useSelector(store => store.variablesUsuario.activo);
    

    useEffect(() => {       
        if (logged) {
            props.history.push('/')
        }
    }, [logged, props.history]);

    //alert
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    //form
    const [valuesForm, setValuesForm] = useState({
        nom: '',
        password: '',
        showPassword: false,
    })
    const handleChangeForm = (prop) => (event) => {
        setValuesForm({ ...valuesForm, [prop]: event.target.value });
    }
    const handleClickShowPasswordForm = () => {
        setValuesForm({ ...valuesForm, showPassword: !valuesForm.showPassword });
    }
    const handleMouseDownPasswordForm = (event) => {
        event.preventDefault();
    }

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
    }

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
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default withRouter(Login)
