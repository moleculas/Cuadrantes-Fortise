import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './temaConfig';
import Contenedor from './components/Contenedor';
import { Provider } from 'react-redux';
import generateStore from './redux/store';


function App() {

  const store=generateStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Contenedor />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
