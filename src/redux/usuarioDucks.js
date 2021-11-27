import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;
const dataInicial = {
    activo: false,
    errorDeAcceso: false,
    objetUsuarioActivo: {
        nombre: '',
        rol: ''
    },
}

//types
const USUARIO_ERROR = 'USUARIO_ERROR';
const USUARIO_EXITO = 'USUARIO_EXITO';
const LOGOUT = 'LOGOUT';

//reducer
export default function usuarioReducer(state = dataInicial, action) {
    switch (action.type) {
        case USUARIO_ERROR:
            return { ...state, errorDeAcceso: true }
        case USUARIO_EXITO:
            return { ...state, activo: true, usuarioActivo: action.payload.objetoUsuarioActivo }
        case LOGOUT:
            return { ...dataInicial }
        default:
            return { ...state }
    }
}

//acciones
export const ingresoUsuarioAccion = (nombre, password) => async (dispatch, getState) => {
    try {
        const formData = new FormData();
        formData.append("nombre", nombre);
        let apiUrl = rutaApi + "obtener_usuario.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if ((res.data.nombre === nombre && res.data.contrasena === password)) {
            dispatch({
                type: USUARIO_EXITO,
                payload: {
                    objetoUsuarioActivo: {
                        nombre: nombre,
                        rol: res.data.rol
                    }
                }
            })
        } else {
            dispatch({
                type: USUARIO_ERROR
            })
        };
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const logoutUsuarioAccion = () => (dispatch, getState) => {
    dispatch({
        type: LOGOUT
    })
}