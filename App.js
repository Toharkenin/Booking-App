import React from 'react';
import { Provider } from "react-redux";
import { store } from './redux/store';
import 'react-native-gesture-handler';
import AuthNavigator from './AuthNavigator';

export default function App() {

  return (
    
    <Provider store={store}>
        <AuthNavigator />
    </Provider>
    
    
  );
}

