import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import {composeWithDevTools} from 'redux-devtools-extension';

import centrosReducer from './centrosDucks';
import usuarioReducer from './usuarioDucks';
import appReducer from './appDucks';
import trabajadoresReducer from './trabajadoresDucks';
import cuadrantesReducer from './cuadrantesDucks';
import pendientesReducer from './pendientesDucks';
import graficosReducer from './graficosDucks';
import nominasReducer from './nominasDucks';
import faltantesReducer from './faltantesDucks';
import cuadrantesGestionReducer from './cuadrantesGestionDucks';
import cuadrantesSettersReducer from './cuadrantesSettersDucks';
import cuadrantesServiciosFijosReducer from './cuadrantesServiciosFijosDucks';
import cuadrantesPopoversReducer from './cuadrantesPopoversDucks';
import cuadrantesHandlersReducer from './cuadrantesHandlersDucks';
import cuadrantesColumnasReducer from './cuadrantesColumnasDucks';
import cuadrantesFacturacionReducer from './cuadrantesFacturacionDucks';

const rootReducer = combineReducers({
    variablesCentros: centrosReducer,
    variablesUsuario: usuarioReducer,
    variablesApp: appReducer,
    variablesTrabajadores: trabajadoresReducer,
    variablesCuadrantes: cuadrantesReducer,
    variablesPendientes: pendientesReducer,
    variablesGraficos: graficosReducer,
    variablesNominas: nominasReducer,
    variablesFaltantes: faltantesReducer,
    variablesCuadrantesGestion: cuadrantesGestionReducer,
    variablesCuadrantesSetters: cuadrantesSettersReducer,
    variablesCuadrantesServiciosFijos: cuadrantesServiciosFijosReducer,
    variablesCuadrantesPopovers: cuadrantesPopoversReducer,
    variablesCuadrantesHandlers: cuadrantesHandlersReducer,
    variablesCuadrantesColumnas: cuadrantesColumnasReducer,
    variablesCuadrantesFacturacion: cuadrantesFacturacionReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}