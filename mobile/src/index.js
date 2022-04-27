import React from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler'
import './config/ReactotronConfig';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import App from './App';



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const Index = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    
      <PaperProvider  theme={theme}>
     
        <App/>
       
      </PaperProvider>
     
    </PersistGate>
  </Provider>
);

export default Index;