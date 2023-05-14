import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { store } from './redux/store';
import AdminScreen from './src/screens/AdminScreen';
import UsersList from './src/components/admin/UsersList';
import ManageAppointments from './src/components/admin/ManageAppointments';
import Message from './src/components/admin/Message';
// import NewAppointment from './src/components/admin/NewAppointment';

const AdminNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="AdminScreen" >
                    <Stack.Screen name="AdminScreen" component={AdminScreen} options={{headerShown:null}}/>
                    <Stack.Screen name="משתמשים" component={UsersList} options={{
                        presentation: 'modal', title: null, headerShown: null
                    }}/>
                    <Stack.Screen name="Manage" component={ManageAppointments} options={{
                        presentation: 'modal', title: null, headerShown: null
                    }} /> 
                    <Stack.Screen name="Message" component={Message} options={{
                        presentation: 'modal', headerShown: null
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
  }

export default AdminNavigator;