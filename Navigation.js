import React from 'react';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import gestureHandler from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './src/screens/Home';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import Schedule from './src/screens/Schedule';

export default function Navigation() {

    const Drawer = createDrawerNavigator();
    const screenOptions = {
        drawerPosition: "right",
        headerTintColor: '#FFFFFF',
        // drawerType: "back",
        // headerStyle: { backgroundColor: 'black'},
        headerLeft: false,
        headerRight: () => <DrawerToggleButton color="#fff"
        />,
    }
    

    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={screenOptions}
                initialRouteName="פתיחת משתמש"
                rightButtonIconStyle={{tintColor: '#fff'}}
                 >
                <Drawer.Screen 
                    name='ראשי' 
                    component={Home}
                    options={{
                        drawerIcon: () => <Icon name="home" size={24}/>
                    }} />
                <Drawer.Screen name='פתיחת משתמש' component={Signup} />
                <Drawer.Screen name='הזדהות' component={Signin} />
                <Drawer.Screen name='קביעת תור חדש' component={Schedule} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
  };


  const headerDrawer = (props) => {
    
  }

 