import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'react-native-elements';
import { logout } from '../../../redux/reducers/userSlice';

function CustomDrawr (props) {

  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const onSignoutPress = () => {
    dispatch(logout(user));
  } 

    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} >
            <View style={styles.drawerContent}>
            <Icon name="user-circle" size={40} color={'#E0AA3E'} style={styles.userIcon}/>
              {user ? 
                <Text style={styles.userName}>{user.firstName} {user.lastName}</Text> : 
                <Text style={styles.userName}>שלום, אורח</Text>}
            </View>
            <View style={{marginTop: 20}}>
                <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
        <Divider />
        <TouchableOpacity 
          style={styles.bottomSection}
          onPress={onSignoutPress} >
          <Text style={styles.signoutText}>יציאה</Text>
          <Icon name="sign-out" size={24} color="#000" style={styles.signoutIcon}/>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
    userIcon: {
      marginRight: 15,
    },
    drawerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      margin: 20,
    },
    userName: {
      fontSize: 18,
      fontWeight: '700',
      color: '#E0AA3E',
    },
    bottomSection: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      margin:10,
    },
    signoutIcon: {
      margin: 10,
      color: '#383838',
    },
    signoutText: {
      fontSize: 16,
      color: '#383838'
    }
});

export default CustomDrawr;