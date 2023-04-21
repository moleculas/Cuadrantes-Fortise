import { withStyles } from '@material-ui/core/styles';
import {
    Box,
    Typography,
    Accordion as MuiAccordion,
    AccordionSummary as MuiAccordionSummary,
    AccordionDetails as MuiAccordionDetails,
    Tooltip,
    Menu,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export const AccordionCen = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

export const AccordionSummaryCen = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .02)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 46,
        '&$expanded': {
            minHeight: 46,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const AccordionCua = withStyles({
    root: {
        boxShadow: 'none',
        borderRadius: '0px !important',
    },
})(MuiAccordion);

export const AccordionDetailsCua = withStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12);',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12);',
        borderRight: '1px solid rgba(0, 0, 0, 0.12);',
    },
}))(MuiAccordionDetails);

export const AccordionSummary1Cua = withStyles({
    content: {
        alignItems: 'center',
    },
    root: {
        minHeight: 38,
        maxHeight: 38,
        '&.Mui-expanded': {
            minHeight: 38,
            maxHeight: 38,
        }
    }
})(MuiAccordionSummary);

export const AccordionSummary2Cua = withStyles({
    content: {
        alignItems: 'center',
    },
    root: {
        minHeight: 48,
        maxHeight: 48,
        '&.Mui-expanded': {
            minHeight: 48,
            maxHeight: 48,
        }
    }
})(MuiAccordionSummary);

export const AccordionSummary3Cua = withStyles({
    root: {
        minHeight: 38,
        maxHeight: 38,
        '&.Mui-expanded': {
            minHeight: 38,
            maxHeight: 38,
        }
    }
})(MuiAccordionSummary);

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ paddingTop: 24, paddingRight: 24 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export const TabPanelInicio = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

export const getHeightScrollable = (alt) => (window.innerHeight - alt) || (document.documentElement.clientHeight - alt) || (document.body.clientHeight - alt);
export const getWidthWindow = (llarg) => (window.innerWidth - llarg) || (document.documentElement.clientWidth - llarg) || (document.body.clientWidth - llarg);
export const getHeightContenedoresPeq = (alt) => ((window.innerHeight / 2) - alt) || ((document.documentElement.clientHeight / 2) - alt) || ((document.body.clientHeight / 2) - alt);
export const getHeightContenedoresGra = (alt) => ((window.innerHeight) - alt) || ((document.documentElement.clientHeight) - alt) || ((document.body.clientHeight) - alt);
export const getWidthContenedores = (llarg) => ((window.innerWidth - llarg) / 2) || ((document.documentElement.clientWidth - llarg) / 2) || ((document.body.clientWidth - llarg) / 2);

export const IsNumeric = (num) => {
    return (num >= 0 || num < 0);
};

export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#009688',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);

export const LightTooltipFest = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#00bcd4',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);

export const LightTooltipInt = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#8bc34a',
        color: '#ffffff',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);

export const LightTooltipInactivo = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#ffcdd2',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 11,
        marginLeft: 5,
        borderRadius: 0,
        height: theme.spacing(3.5)
    },
}))(Tooltip);

export const InfoTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#ffeb3b',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    arrow: {
        "&:before": {
        },
        color: '#ffeb3b',
    },
}))(Tooltip);

export const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

export const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const alturaCasilla = (esDesktop) => {    
    return esDesktop ? 38 : 48;
};

export const retornaAnchoColumna = (reducido, ample) => {
    return reducido ? 40 : ample;
};

export const retornaMinutosAccionEnCuadrantes = (primeraHora, segundaHora) => {
    if (primeraHora && segundaHora) {
        const minutosTotalesPrimeraHora = parseInt(primeraHora.split(":")[0]) * 60 + parseInt(primeraHora.split(":")[1]);
        const minutosTotalesSegundaHora = parseInt(segundaHora.split(":")[0]) * 60 + parseInt(segundaHora.split(":")[1]);
        const diff = minutosTotalesSegundaHora < minutosTotalesPrimeraHora
            ? minutosTotalesSegundaHora + 1440 - minutosTotalesPrimeraHora
            : minutosTotalesSegundaHora - minutosTotalesPrimeraHora;
        return diff;
    };
};
