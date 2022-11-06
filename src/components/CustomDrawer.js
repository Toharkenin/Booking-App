import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { selectUser } from '../../redux/reducers/userSlice';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';

function CustomDrawr (props) {

    const user = useSelector(selectUser);

    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} >
            <View style={styles.drawerContent}>
              {user ? 
                <Text style={styles.userName}>היי, {user.firstName} {user.lastName}</Text> : 
                <Text style={styles.userName}>היי אורח</Text>}
              <Icon name="user" size={50} color={''} style={styles.userIcon}/>
            </View>
            <View style={{marginTop: 20}}>
                <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
      </View>
    );
  };

const styles = StyleSheet.create({
    userIcon: {
      marginLeft: 20,
    },
    drawerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: 20,
      marginTop: 20,
    },
    userName: {
      fontSize: 18,
      fontWeight: '700',
      color: '#000',
    }
});

export default CustomDrawr;