import 'react-native-gesture-handler';
import * as React from 'react';
// import { StyleSheet, SafeAreaView, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SetDateTime from './src/screens/newAppointment/SetDateTime';
// import Navigation from './src/navigation/Navigation';
//import Icon from 'react-native-ico';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { SafeAreaView } from 'react-navigation';
// import SignUpWithPhone from './src/screens/SignUpWithPhone';
// import SignUpWithName from './src/screens/SignUpWithName';
// import InsertCode from './src/screens/InsertCode';
// import Dashboard from './src/screens/Dashboard';

const Drawer = createDrawerNavigator ();
// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // //<SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Calander">
          <Drawer.Screen name="Calander" component={SetDateTime}/>
          {/* <Drawer.Screen name="SignupWithUserName" component={SignUpWithName}/> */}
          {/* <Drawer.Screen name="SignupWithPhoneNumber" component={SignUpWithPhone}/>
          <Drawer.Screen name="InsertCode" component={InsertCode}/>
  <Drawer.Screen name="Dashboard" component={Dashboard} /> */}
       </Drawer.Navigator>
        {/* <Stack.Navigator>
          <Stack.Screen name="Calander" component={SetDateTime}/>
         <Stack.Screen name="SignupWithUserName" component={SignUpWithName}/> */}
    {/* //       <Stack.Screen name="SignupWithPhoneNumber" component={SignUpWithPhone}/>
    //       <Stack.Screen name="InsertCode" component={InsertCode}/>
    //       <Stack.Screen name="Dashboard" component={Dashboard}/> */}
        {/* </Stack.Navigator> */}
      </NavigationContainer>  
    // //</SafeAreaView>                                                                                                     
  )
};

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: '#F9FBFC',
//   },
// });

export default App;