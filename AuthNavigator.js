import React, {useState, useEffect} from 'react';
import AdminNavigator from './AdminNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation, SignedoutNavigator } from './Navigation';
import { useDispatch } from 'react-redux';
import { login } from './redux/reducers/userSlice';


export default function AuthNavigator() {
    
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  let currentUser;

    useEffect(() => {
    const getUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      currentUser = JSON.parse(savedUser);
      setUser(currentUser);
    }
    getUser();
}, []);

    const addUser = () => {
      dispatch(login({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
      }))
    };
    addUser();

  return (
    <>
      { user ? 
      <Navigation /> :
      user.isAdmin ?
      <AdminNavigator />
      : <SignedoutNavigator /> }
      {/* <AdminNavigator /> */}
    </>
  );
}

