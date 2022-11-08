import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './src/components/CustomDrawer';
import Home from './src/screens/Home';
import Appointments from './src/screens/Appointments';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import Schedule from './src/screens/Schedule';
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import appointmentSlice from './redux/reducers/appointmentSlice';

const store = configureStore();

export default function Navigation() {

    const Drawer = createDrawerNavigator();
    const screenOptions = {
        drawerPosition: "right",
        headerTintColor: '#F2F2F2',
        headerStyle: {
             backgroundColor: "#F2F2F2"       
        },
        headerLeft: false,
        headerRight: () => <DrawerToggleButton 
        />,
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
                initialRouteName="ראשי"
                 >
                <Drawer.Screen 
                    name='ראשי' 
                    component={Home}
                    style={{flexDirection: 'column'}}
                    options={{
                        drawerIcon: () => <Icon name="home-outline" size={22} style={styles.icons}/>,
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


 const styles = StyleSheet.create({
    icons: {
        alignSelf: "center",
        position: "absolute",
        right: 5,
    }
 });