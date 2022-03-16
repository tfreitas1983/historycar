import React from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler'
//import '~/config/ReactotronConfig';

//import { Provider } from 'react-redux';
//import store from './store';

import Routes from './routes';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => (
  <PaperProvider  theme={theme}>
      <Routes />
  </PaperProvider>
);

export default App;