import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './temaConfig';
import Contenedor from './app/Contenedor';
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import { leerUsuarioAccion } from './redux/usuarioDucks';

function App() {

  const store = generateStore();

  leerUsuarioAccion()(store.dispatch);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Contenedor />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
