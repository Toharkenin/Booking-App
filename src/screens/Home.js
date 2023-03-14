import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import logo from '../assets/logo-dark.png';
import { useSelector } from 'react-redux';
import CustomButton from '../components/user/CustomButton';

export default function Home ( {navigation} ) {

    const user = useSelector((state) => state.user.user);
    return (
        <View style={styles.container}>
            <Image source= {logo} style={styles.logo} resizeMode="contain" />
            
                {user ? 
                    <Text style={styles.welcomeText}>שלום {user.firstName}, שמחים שאתה כאן </Text> : 
                    <Text style={styles.welcomeText}>שלום אורח, ברוך הבא!</Text>
                }
                 {user ? 
                    <CustomButton 
                        onPress={() => navigation.navigate('קביעת תור חדש')}  
                        style={styles.btn}
                        text="לחץ לקביעת תור"/> :
                    <CustomButton 
                        onPress={() => navigation.navigate('הזדהות')}
                        style={styles.btn}
                        text="לחץ להתחברות"/>
                    }
            </View>
    );
  };

 const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
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
