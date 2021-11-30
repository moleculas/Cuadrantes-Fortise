import React from 'react';
import { fade, makeStyles, IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import logo from '../images/logo_fortise.png';


const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    simpleButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${200}px)`,
            marginLeft: 200,
        },
    },
    logo: {
        width: '25px'
    },
    fonsLogo: {
        borderRadius: 60,
        backgroundColor: fade(theme.palette.common.white, 0.55),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 15,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }

}));

const Navbar = (props) => {

    const classes = useStyle();
    const laData = () => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today = new Date();
        const data = today.toLocaleDateString("es-ES", options);
        return data;
    }

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
                    Gestión Cuadrates de Servicio Fortise SL
                </Typography>
                <p>{laData()}</p>
            </Toolbar>
            
        </AppBar>
    )
}

export default Navbar;
