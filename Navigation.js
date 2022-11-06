import React from 'react';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from './src/components/CustomDrawer';
import Home from './src/screens/Home';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import Schedule from './src/screens/Schedule';
import { Provider } from "react-redux";
import configureStore from "./redux/store";

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
                initialRouteName="פתיחת משתמש"
                 >
                <Drawer.Screen 
                    name='ראשי' 
                    component={Home}
                    style={{flexDirection: 'column'}}
                    options={{
                        drawerIcon: () => <Icon name="home" size={24} style={{
                            alignSelf: "center",
                            position: "absolute",
                            right: 5,
                          }}/>,
                    }} />
                <Drawer.Screen 
                    name='פתיחת משתמש' 
                    component={Signup} 
                    options={{
                        drawerIcon: () => <Icon name="home" size={24} style={{
                            alignSelf: "center",
                            position: "absolute",
                            right: 5,
                          }}/>
                    }} />
                <Drawer.Screen 
                    name='הזדהות' 
                    component={Signin} 
                    options={{
                        drawerIcon: () => <Icon name="home" size={24} style={{
                            alignSelf: "center",
                            position: "absolute",
                            right: 5,
                          }}/>
                    }}/>
                <Drawer.Screen 
                    name='קביעת תור חדש' 
                    component={Schedule} 
                    options={{
                        drawerIcon: () => <Icon name="home" size={24} style={{
                            alignSelf: "center",
                            position: "absolute",
                            right: 5,
                          }}/>
                    }}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
    );
  };


 