import React, { useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import logo from '../assets/logo-dark.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Home() {

    const [loggedin, setLoggedin] = useState(false);
    return (
        <View>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            {loggedin ? 
            <Text style={styles.welcomeText}>אתה מחובר</Text> :
            <Text style={styles.welcomeText}>שלום אורח, ברוך הבא!</Text>
            }
        </View>
    );
  };

 const styles = StyleSheet.create({
    logo: {
        height: 130,
        width: 130,
        alignSelf: 'center',
    },
    // icons: {
    //     color: '#0081ff',
    //     alignSelf: 'center',
    // },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginTop: 20,
    },
 });
