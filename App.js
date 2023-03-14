import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navigation from './Navigation';
import Home from './src/screens/Home';
import Signup from './src/screens/Signup';
import { Provider } from "react-redux";
import { store } from './redux/store';
import 'react-native-gesture-handler';
import AdminNavigator from './AdminNavigator';

export default function App() {
  return (
        // <Navigation />
        <AdminNavigator />
  );
}

