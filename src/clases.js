import { makeStyles } from "@material-ui/core";
import { amber, blueGrey, green, lime, indigo, red, grey, blue } from '@material-ui/core/colors';

const Clases = makeStyles((theme) => ({
    //loading
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    root11: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
    },
    root: {
        width: '100%',
    },
    box20: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20%',
        },
    },
    pl_dialog: {
        paddingLeft: '0px',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '15px',
        },
    },
    //tabs
    root2: {
        flexGrow: 1
    },
    //boto
    btnError: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        },
        "&:disabled": {
            backgroundColor: theme.palette.error.light
        },
        marginLeft: 5
    },
    btnVariacion: {
        backgroundColor: `${green[200]} !important`,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: `${green[300]} !important`,
        },
        marginLeft: 5
    },
    //form
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    formTipo: {
        display: 'flex',
        marginRight: -10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    formTipo2: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    formInput: {
        marginBottom: '10px',
    },
    //tabla
    inicio: {
        width: 165
    },
    anchoColumna: {
        width: 210
    },
    diaLaboral: {
        backgroundColor: theme.palette.secondary.light,
        cursor: 'pointer',
        minHeight: 38,
        maxHeight: 38,
        padding: 9
    },
    diaFestivo: {
        backgroundColor: theme.palette.secondary.dark,
        cursor: 'pointer',
        minHeight: 38,
        maxHeight: 38,
        padding: 9
    },
    cabecera: {
        backgroundColor: theme.palette.secondary.main
    },
    casillaLaboral: {
        backgroundColor: `${blueGrey[50]} !important`,
        cursor: 'pointer',
        minHeight: 38,
        maxHeight: 38,
        padding: 9
    },
    casillaModificado: {
        backgroundColor: `${lime[100]} !important`,
        color: `${lime[900]} !important`,
        cursor: 'pointer',
        minHeight: 38,
        maxHeight: 38,
        padding: 9,
    },
    casillaFestivo: {
        backgroundColor: `${amber[50]} !important`,
        color: '#b4af9f',
        cursor: 'default',
        minHeight: 38,
        maxHeight: 38,
        pointerEvents: 'none',
        padding: 9
    },
    casillaBaja: {
        backgroundColor: `${amber[300]} !important`,
        color: '#b4af9f',
        cursor: 'default',
        minHeight: 38,
        maxHeight: 38,
        pointerEvents: 'none',
        padding: 9
    },
    casillaDisabled: {
        backgroundColor: `${blueGrey[50]} !important`,
        pointerEvents: 'none',
        minHeight: 38,
        maxHeight: 38,
        padding: 9
    },
    suplente: {
        backgroundColor: `${blueGrey[200]} !important`,
        color: 'white',
    },
    trabajador: {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
    },
    scrollable: {
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    scrollableScroll: {
        '&::-webkit-scrollbar-track': {
            marginTop: 67, //modificador
        },
    },
    sinScroll: {
        overflowY: 'hidden !important',
    },
    blanc: {
        color: 'white'
    },
    gris: {
        color: grey[400]
    },
    vermell: {
        color: red[500]
    },
    mb15: {
        marginBottom: 15,
    },
    mb10: {
        marginBottom: 10,
    },
    mb5: {
        marginBottom: 5,
    },
    mb25: {
        marginBottom: 25,
    },
    mb20: {
        marginBottom: 20,
    },
    mt15: {
        marginTop: 15,
    },
    mt10: {
        marginTop: 10,
    },
    mt20: {
        marginTop: 20,
    },
    mt5: {
        marginTop: 5,
    },
    mt_5: {
        marginTop: -5,
    },
    mt_25: {
        marginTop: -25,
    },
    btnAddTrabajador: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
        width: 30,
        height: 30,
    },
    btnAddSuplente: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
        width: 30,
        height: 30,
    },
    ampliadoInferiorScroller: {
        paddingTop: 133,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        transition: 'padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    reducidoInferiorScroller: {
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        transition: 'padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    scrollableScrollAmpliado: {
        '&::-webkit-scrollbar-track': {
            marginTop: 198,
        },
    },
    ampliadoInferiorAccordionInicio: {
        marginBottom: 63,
        transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    ampliadoInferiorAccordionRango: {
        marginBottom: 168,
        transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    ampliadoInferiorAccordionRangoDescanso: {
        marginBottom: 233,
        transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    ampliadoInferiorAccordionCantidad: {
        marginBottom: 168,
        transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    reducidoInferiorAccordion: {
        marginBottom: 2.4,
        transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    tooltipArrow: {
        position: "relative",
        marginTop: "10px",
        "&::before": {
            backgroundColor: "white",
            content: '""',
            display: "block",
            position: "absolute",
            width: 12,
            height: 12,
            top: -6,
            transform: "rotate(45deg)",
            left: "calc(50% - 6px)",
            borderBottom: '1px solid rgba(0, 0, 0, 0.12);',
            borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
            borderRight: '1px solid rgba(0, 0, 0, 0.12);',
            borderTop: '1px solid rgba(0, 0, 0, 0.12);',
        }
    },
    tooltip: {
        padding: 16,
        backgroundColor: "white",
        borderRadius: 0,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12);',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
        borderRight: '1px solid rgba(0, 0, 0, 0.12);',
        borderTop: '1px solid rgba(0, 0, 0, 0.12);',
        marginTop: 4,
    },
    openAccordion: {
        overflowY: 'hidden !important'
    },
    editando: {
        backgroundColor: '#ffffff !important',
        border: '1px solid rgba(0, 0, 0, 0.12);',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    badgeVerd: {
        backgroundColor: `${green[400]} !important`,
        color: `${green[400]} !important`,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        right: '1%',
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    badgeVermell: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.error.dark,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        right: '1%',
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    badgeTaronja: {
        backgroundColor: `${amber[500]} !important`,
        color: `${amber[500]} !important`,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        right: '1%',
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
    displayNone: {
        display: 'none !important'
    },
    displayBlock: {
        display: 'block !important'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(8),
    },
    fabPendientes: {
        position: 'absolute',
        bottom: theme.spacing(6),        
    },
    typoFab: {
        textTransform: 'none',
        marginRight: 10
    },
    alignRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
    },
    centrado: {
        minHeight: "20vh",
        display: "flex",
        alignItems: "center",
    },
    fuentePequena: {
        fontSize: '0.7rem'
    },
    rootPendientes: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justify: "center"
    },
    casilla: {
        cursor: 'pointer',
        backgroundColor: theme.palette.background.default,
        marginBottom: 5,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${indigo[50]} !important`,
        },
    },
    casillaBajas: {
        cursor: 'pointer',
        backgroundColor: theme.palette.background.default,
        marginBottom: 5,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${red[50]} !important`,
        },
    },
    casillaBajasInicio: {
        cursor: 'pointer',
        backgroundColor: `${red[50]} !important`,
        marginBottom: 5,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${red[100]} !important`,
        },
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    green: {
        color: 'white',
        backgroundColor: green[500],
    },
    orange: {
        color: theme.palette.getContrastText(amber[500]),
        backgroundColor: amber[500],
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    small2: {
        width: theme.spacing(2.75),
        height: theme.spacing(2.75),
        fontSize: '0.9rem',
        marginLeft: 5,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    casillaNominasNormal: {
        marginTop: 10,
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15
    },
    casillaNominasFinal: {
        marginTop: 10,
        backgroundColor: `${amber[50]} !important`,
        paddingTop: 15,
        paddingBottom: 15
    },
    inline: {
        display: 'inline'
    },
    cursorDefault: {
        cursor: 'default'
    },
    tipoServ1: {
        backgroundColor: green[400]
    },
    tipoServ2: {
        backgroundColor: blue[400]
    },
    tipoServ3: {
        backgroundColor: indigo[400]
    },
    tipoServ4: {
        backgroundColor: amber[400]
    },
    tipoServ5: {
        backgroundColor: red[400]
    },
    tipoServ6: {
        backgroundColor: lime[600]
    },
    tipoServ7: {
        backgroundColor: blueGrey[400]
    },
    tituloSecundario: {
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    },   
    secLight: {
        color: 'white',
        backgroundColor: theme.palette.primary.light,
    },
    sombraBox: {
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    }
}));

export default Clases;