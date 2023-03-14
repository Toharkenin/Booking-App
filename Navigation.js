import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './src/components/user/CustomDrawer';
import Home from './src/screens/Home';
import Appointments from './src/screens/Appointments';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import Schedule from './src/screens/Schedule';
import { Provider } from "react-redux";
import { store } from './redux/store';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
const Navigation = () => {
     
    const screenOptions = {
        drawerPosition: "right",
        headerTintColor: '#fff',
        headerStyle: {
             backgroundColor: "#fff"       
        },
        headerLeft: () => <DrawerToggleButton />,
        drawerLableStyle: {
            marginTop: 20,
        },
        drawerActiveBackgroundColor: '#fff',
        drawerActiveTintColor: '#000',   
    }
    
    return (
        <Provider store={store}>
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props}/>}
                screenOptions={screenOptions}
                initialRouteName="בית">
            <Drawer.Screen 
            name='בית'
            component={Home}
            options={{
                drawerIcon: () => <Icon name="ios-person-outline" size={22} style={styles.icons}/>
            }} />
             <Drawer.Screen 
            name='פתיחת משתמש' 
            component={Signup} 
            options={{
                drawerIcon: () => <Icon name="ios-person-outline" size={22} style={styles.icons}/>
            }} />
            <Drawer.Screen 
                name='הזדהות' 
                component={Signin} 
                options={{
                    drawerIcon: () => <Icon name="ios-phone-portrait-outline" size={22} style={styles.icons}/>
            }}/>
            <Drawer.Screen 
                name='קביעת תור חדש' 
                component={Schedule} 
                options={{
                    drawerIcon: () => <Icon name="md-calendar-sharp" size={22} style={styles.icons}/>
            }}/>
            <Drawer.Screen 
                name='התורים שלך' 
                component={Appointments}
                options={{
                    drawerIcon: () => <Icon name="ios-checkmark-done-sharp" size={22} style={styles.icons}/>
            }}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
    );
  };

export default Navigation;

//   export const SignedoutNavigator = () => {

//     const Drawer = createDrawerNavigator();
//     const screenOptions = {
//         drawerPosition: "right",
//         headerTintColor: '#fff',
//         headerStyle: {
//              backgroundColor: "#fff"       
//         },
//         headerLeft: () => <DrawerToggleButton 
//         />,
//         drawerLableStyle: {
//             marginTop: 20,
//         },
//         drawerActiveBackgroundColor: '#fff',
//         drawerActiveTintColor: '#000',
        
//     };
//     return (
//         <Provider store={store}>
//         <NavigationContainer>
//         <Drawer.Navigator
//             drawerContent={(props) => <CustomDrawer {...props}/>}
//             screenOptions={screenOptions}
//             initialRouteName="בית"
//             >
//         <Drawer.Screen 
//             name='בית' 
//             options={{
//                 drawerIcon: () => <Icon name="ios-person-outline" size={22} style={styles.icons}/>
//             }} 
//             component={Home} />        
//         <Drawer.Screen 
//             name='פתיחת משתמש' 
//             component={Signup} 
//             options={{
//                 drawerIcon: () => <Icon name="ios-person-outline" size={22} style={styles.icons}/>
//             }} />
//             <Drawer.Screen 
//                 name='הזדהות' 
//                 component={Signin} 
//                 options={{
//                     drawerIcon: () => <Icon name="ios-phone-portrait-outline" size={22} style={styles.icons}/>
//             }}/>
//             <Drawer.Screen 
//                 name='קביעת תור חדש' 
//                 component={Schedule} 
//                 options={{
//                     drawerIcon: () => <Icon name="md-calendar-sharp" size={22} style={styles.icons}/>
//                 }}/>
//             <Drawer.Screen 
//                 name='התורים שלך' 
//                 component={Appointments}
//                 options={{
//                     drawerIcon: () => <Icon name="ios-checkmark-done-sharp" size={22} style={styles.icons}/>
//                 }}/>
//             </Drawer.Navigator>
//         </NavigationContainer>
//         </Provider>
//     )
//   };

 const styles = StyleSheet.create({
    icons: {
        alignSelf: "center",
        position: "absolute",
    }
 });