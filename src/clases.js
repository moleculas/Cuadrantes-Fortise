import { makeStyles } from "@material-ui/core";
import { amber, blueGrey, green, lime, indigo, red, grey, blue, yellow, teal, brown, lightGreen, orange, deepPurple, cyan } from '@material-ui/core/colors';

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
    btnBajas: {
        backgroundColor: `${amber[300]} !important`,
        color: '#78909c',
        "&:hover": {
            backgroundColor: `${amber[300]} !important`,
        },
        marginLeft: 5
    },
    btnLimpieza: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
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
    form2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.2),
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
        padding: 9
    },
    diaFestivo: {
        backgroundColor: theme.palette.secondary.dark,
        cursor: 'pointer',
        padding: 9
    },
    diaFestivoCierre: {
        backgroundColor: `${brown[500]} !important`,
        cursor: 'pointer',
        padding: 9
    },
    diaFestivoCierreSinComputo: {
        backgroundColor: `${deepPurple[500]} !important`,
        cursor: 'pointer',
        padding: 9
    },
    cabecera: {
        backgroundColor: theme.palette.secondary.main
    },
    cabeceraServicios: {
        backgroundColor: `${teal[500]} !important`,
    },
    cabeceraServiciosFest: {
        backgroundColor: `${cyan[500]} !important`,
    },
    cabeceraServiciosInt: {
        backgroundColor: `${lightGreen[500]} !important`,
    },
    casillaLaboral: {
        backgroundColor: `${blueGrey[50]} !important`,
        cursor: 'pointer',
        padding: 9
    },
    casillaSuplenteVacio: {
        backgroundColor: `${red[50]} !important`,
        cursor: 'pointer',
        padding: 9
    },
    casillaVaciaSF: {
        backgroundColor: `${teal[50]} !important`,
        padding: 9,
        cursor: 'pointer',
    },
    casillaSF: {
        backgroundColor: `${teal[100]} !important`,
        padding: 9,
        cursor: 'pointer',
    },
    casillaSFFest: {
        backgroundColor: `${cyan[100]} !important`,
        padding: 9,
        cursor: 'pointer',
    },
    casillaVaciaSFFest: {
        backgroundColor: `${cyan[50]} !important`,
        padding: 9,
        cursor: 'pointer',
    },
    casillaVaciaSFInt: {
        backgroundColor: `${lightGreen[50]} !important`,
        padding: 9,
        cursor: 'pointer',
    },
    casillaSFInt: {
        backgroundColor: `${lightGreen[100]} !important`,
        padding: 9,
        cursor: 'pointer',
    },
    casillaModificado: {
        backgroundColor: `${lime[100]} !important`,       
        cursor: 'pointer',
        padding: 9,
    },
    casillaVariacion1: {
        backgroundColor: `${orange[100]} !important`,       
        cursor: 'pointer',
        padding: 9,
    },
    casillaVariacion2: {
        backgroundColor: `${blue[100]} !important`,
        cursor: 'pointer',
        padding: 9,
    },
    casillaFestivo: {
        backgroundColor: `${amber[50]} !important`,
        color: '#78909c',
        cursor: 'default',
        pointerEvents: 'none',
        padding: 9
    },
    casillaFestivoCierre: {
        backgroundColor: `${brown[50]} !important`,
        color: '#78909c',
        cursor: 'default',
        pointerEvents: 'none',
        padding: 9
    },
    casillaFestivoCierreSinComputo: {
        backgroundColor: `${deepPurple[50]} !important`,
        color: '#78909c',
        cursor: 'default',
        pointerEvents: 'none',
        padding: 9
    },
    casillaBaja: {
        backgroundColor: `${amber[300]} !important`,
        color: '#78909c',
        cursor: 'default',
        pointerEvents: 'none',
        padding: 9
    },
    casillaBajaEsp: {
        backgroundColor: `${amber[100]} !important`,
        color: '#78909c',
        cursor: 'default',
        pointerEvents: 'none',
        padding: 9
    },
    casillaDisabled: {
        backgroundColor: `${blueGrey[50]} !important`,
        pointerEvents: 'none',
        padding: 9
    },
    suplente: {
        backgroundColor: `${blueGrey[200]} !important`,
        color: 'white',
    },
    suplenteVacio: {
        backgroundColor: `${red[100]} !important`,
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
    groc: {
        color: yellow[500]
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
    mb_10: {
        marginBottom: -10,
    },
    mr15: {
        marginRight: 15,
    },
    mr10: {
        marginRight: 10,
    },
    px5: {
        paddingLeft: 5,
        paddingRight: 5
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
        marginLeft: 5
    },
    btnAmpliarcolumna: {
        width: 30,
        height: 30,
        color: theme.palette.error.contrastText,
        marginTop: 5,
        marginLeft: 5
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
        cursor: 'grab',
        "&:active": {
            cursor: 'grabbing',
        },
    },
    noFacturacion: {
        backgroundColor: `${red[100]} !important`,
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
    casillaProcesados: {
        cursor: 'pointer',
        backgroundColor: `${green[50]} !important`,
        marginBottom: 5,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${green[100]} !important`,
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
    small3: {
        width: theme.spacing(3.75),
        height: theme.spacing(3.75),
    },
    small4: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
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
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    nestedIns: {
        paddingLeft: theme.spacing(4),
        height: 45,        
    },
    nestedInsLink: {
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '0.6rem'
    },
    colorText: {
        color: 'rgba(0, 0, 0, 0.54)',
    },
    tabsStl: {
        minHeight: 40,
        maxHeight: 40
    },
    boxStl: {
        minHeight: 40,
        maxHeight: 40,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 8,
    },
    boxStl2: {
        minHeight: 40,
        maxHeight: 40,
        paddingTop: 8,
        paddingLeft: 12,
    },
    fondoBaja: {
        backgroundColor: '#ffcdd2',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    fondoInactivoServicioFijo: {
        backgroundColor: '#ffebee',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    fondoAlta: {
        backgroundColor: theme.palette.secondary.light,
    },
    fondoGrisClaro: {
        backgroundColor: '#f5f5f5',
    },
    grisClaro: {
        color: grey[300],
    },
    conServicios: {
        backgroundColor: green[100]
    },
    sinServicios: {
        backgroundColor: amber[100]
    },
    conServiciosA: {
        backgroundColor: green[200]
    },
    conServiciosA2: {
        backgroundColor: teal[500]
    },
    conServiciosA2Fest: {
        backgroundColor: cyan[500]
    },
    conServiciosA2Int: {
        backgroundColor: lightGreen[500]
    },
    sinServiciosA: {
        backgroundColor: amber[300]
    },
    listConfig: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 0
    },
    boxMiniServicios: {
        marginTop: -13,
        marginBottom: 15,
        paddingLeft: 6
    },
    labelBoxMiniServicios: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '0.8rem'
    },
    floatRight: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    btnBorrarCuad: {
        backgroundColor: theme.palette.background.paper,
        color: 'red',
        marginLeft: 10
    },
    boxChekin: {
        borderRadius: 4,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 15,
        marginLeft: 3,
        marginRight: 3,
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.25)',
        "&:hover": {
            borderColor: 'rgba(0, 0, 0, 1)',
        },
    },
    boxChekinSinHover: {
        borderRadius: 4,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 15,
        marginLeft: 3,
        marginRight: 3,
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.25)'
    },
    enA: {
        backgroundColor: '#00bcd4',
    },
    enB: {
        backgroundColor: '#8884d8',
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
    rootMenuInstrucciones: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    tituloInstrucciones: {
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: 1.334,
        letterSpacing: '0em',
        position: 'relative',
        marginBottom: 10,
        marginTop: 10,
        "& > a": {
            display: 'none',
        },
        "&:hover > a": {
            display: 'inline-block',
        },
    },
    anchorLink: {
        position: 'absolute',
        marginLeft: 10,
        marginTop: 5,
        color: 'rgba(0, 0, 0, 0.87)',
        "&:hover": {
            color: 'rgba(0, 0, 0, 0.54)',
        },
    },
    cercleInstruccionsVer: {
        color: 'red', 
        fontSize: 25,
        position: 'relative',
        top: 3
    },
    cercleInstruccions: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 25,
        position: 'relative',
        top: 3
    }
}), { index: 1 });

export default Clases;