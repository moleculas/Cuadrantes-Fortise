import { createMuiTheme } from "@material-ui/core/styles";
//import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import { indigo, blueGrey, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: blueGrey,
        error: red,
    },
    typography: {
        h1: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h2: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h3: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h4: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h5: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h6: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        //defecto
        body1: {
            fontFamily: [
                'Roboto',
            ].join(','),
            fontSize: '0.9rem',
            '@media (min-width:600px)': {
                fontSize: '1rem',
            }
        },
        body2: {
            fontFamily: [
                'Roboto',
            ].join(','),
            fontSize: '0.8rem',
            '@media (min-width:600px)': {
                fontSize: '0.9rem',
            }
        }  
    },
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '*': {
              scrollbarWidth: 'thin',
              scrollbarColor: '#B7B7B7 transparent',
              '&::-webkit-scrollbar': {
                width: 6,
                height: 6,
                backgroundColor: 'transparent',                       
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
                marginTop: 27, //modificador
                marginBottom: 10, //modificador
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 6,
                backgroundColor: '#B7B7B7',
                minHeight: 24,
                minWidth: 24,                
              },
              '&::-webkit-scrollbar-thumb:focus': {
                backgroundColor: '#adadad',
              },
              '&::-webkit-scrollbar-thumb:active': {
                backgroundColor: '#adadad',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#adadad',
              },
              '&::-webkit-scrollbar-corner': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
})

export default theme;