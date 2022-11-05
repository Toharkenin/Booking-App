import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import logo from '../assets/logo-dark.png';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { selectUser } from '../../redux/reducers/userSlice';

export default function Home ( {navigation} ) {

    const user = useSelector(selectUser);
    return (
        <View>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            {user ? 
                <Text style={styles.welcomeText}>שלום {user.firstName}, ברוך הבא</Text> : 
                <Text style={styles.welcomeText}>שלום אורח, ברוך הבא!</Text>
            }
            {/* {user ? 
            <TouchableOpacity onPress={navigation.navigate('קביעת תור חדש')} style={styles.btn}>
                <Text style={styles.btnText}>לחץ לקביעת תור</Text>
            </TouchableOpacity> : 
            <TouchableOpacity onPress={navigation.navigate('פתיחת משתמש')} style={styles.btn}>
                <Text style={styles.btnText}>לחץ לפתיחת משתמש</Text>
            </TouchableOpacity>
            } */}
        </View>
    );
  };

 const styles = StyleSheet.create({
    logo: {
        height: 130,
        width: 130,
        alignSelf: 'center',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginTop: 20,
    },
    btn: {},
    btnText: {},
 });
