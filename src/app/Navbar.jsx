import {
    Box,
    IconButton,
    AppBar,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../images/logo_fortise.png';

//estilos
import Clases from "../clases";

const Navbar = (props) => {
    const classes = Clases();
    const laData = () => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today = new Date();
        const data = today.toLocaleDateString("es-ES", options);
        return data;
    };

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={() => props.accionAbrir()}
                >
                    <MenuIcon />
                </IconButton>
                <Box className={classes.fonsLogo}>
                    <img src={logo} className={classes.logo} alt="logo" />
                </Box>
                <Typography className={classes.title} variant="h5">
                    Gestión Cuadrantes de Servicio Fortise SL
                </Typography>
                <p>{laData()}</p>
            </Toolbar>

        </AppBar>
    )
}

export default Navbar;
