import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './src/components/user/CustomDrawer';
import Home from './src/screens/Home';
import Appointments from './src/screens/Appointments';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import Schedule from './src/screens/Schedule';
import { Provider, useDispatch } from "react-redux";
import { store } from './redux/store';
import 'react-native-gesture-handler';
import UserInfo from './src/screens/UserInfo';

const Drawer = createDrawerNavigator();

export const Navigation = () => {
    const [user, setUser] = useState('');
    const dispatch = useDispatch(); 

    const screenOptions = {
        drawerPosition: "right",
        headerTintColor: '#fff',
        headerStyle: {
             backgroundColor: "#fff"       
        },
        drawerType: 'front',
        headerLeft: () => <DrawerToggleButton />,
        drawerLableStyle: {
            marginTop: 20,
        },
        drawerActiveBackgroundColor: '#fff',
        drawerActiveTintColor: '#000',  
        // headerShown: false,
        headerTransparent:true,
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
                drawerIcon: () => <Icon name="home" size={22} style={styles.icons}/>,
                drawerLabelStyle: {
                    alignSelf: 'flex-start',
                }
            }} />
            {/* <Drawer.Screen 
                name='משתמש' 
                component={UserInfo} 
                options={{
                    drawerIcon: () => <Icon name="ios-person-outline" size={22} style={styles.icons}/>
            }}/> */}
            <Drawer.Screen 
                name='קביעת תור חדש' 
                component={Schedule} 
                options={{
                    drawerIcon: () => <Icon name="md-calendar-sharp" size={22} style={styles.icons}/>,
                    drawerLabelStyle: {
                        alignSelf: 'flex-start',
                    }
            }}/>
            <Drawer.Screen 
                name='התורים שלי' 
                component={Appointments}
                options={{
                    drawerIcon: () => <Icon name="ios-checkmark-done-sharp" size={22} style={styles.icons}/>,
                    drawerLabelStyle: {
                        alignSelf: 'flex-start',
                    }
            }}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
    );
  };

  export const SignedoutNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Signin" >
                    <Stack.Screen name="Signin" component={Signin} options={{headerShown:null}}/>
                    <Stack.Screen name="Signup" component={Signup} options={{
                         title: null, headerShown: null
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
  };


  const styles = StyleSheet.create({
    icons: {
        alignSelf: "center",
        position: "absolute",
    }
 });