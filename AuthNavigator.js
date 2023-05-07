import React, {useState, useEffect} from 'react';
import AdminNavigator from './AdminNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation, SignedoutNavigator } from './Navigation';
import { useSelector, useDispatch } from 'react-redux';

export default function AuthNavigator() {
    
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(savedUser);
            setUser(currentUser);
        } catch (error) {
            console.log(error);
        }
    };
    getUser();
}, []);

  return (
    <>
      { user || reduxUser ? 
      <Navigation /> :
      user.isAdmin ?
      <AdminNavigator />
      : <SignedoutNavigator /> }
      {/* <AdminNavigator /> */}
    </>
  );
}

