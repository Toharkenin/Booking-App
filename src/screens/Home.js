import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import logo from '../assets/logo-dark.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Home() {

    return (
        <View>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            <FontAwesome 
                name="tachometer"
                size={30}
                style={styles.icons} />
        </View>
    );
  };

 const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 100,
    },
    icons: {
        color: '#0081ff',
        alignSelf: 'center',
    }
 });
