import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import logo from '../assets/logo-dark.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/userSlice';
import CustomButton from '../components/CustomButton';

export default function Home ( {navigation} ) {

    const user = useSelector(selectUser);
    return (
        <View>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            <View style={styles.container}>
                {user ? 
                    <Text style={styles.welcomeText}>שלום {user.firstName}, שמחים שאתה כאן </Text> : 
                    <Text style={styles.welcomeText}>שלום אורח, ברוך הבא!</Text>
                }
                <View>
                    {user ? 
                    <CustomButton 
                        onPress={navigation.navigate('קביעת תור חדש')}  
                        style={styles.btn}
                        text="לחץ לקביעת תור"/> :
                    <CustomButton 
                        onPress={navigation.navigate('הזדהות')}
                        style={styles.btn}
                        text="לחץ להתחברות"/>
                    }
                </View>
            </View>
        </View>
    );
  };

 const styles = StyleSheet.create({
    logo: {
        height: 130,
        width: 130,
        alignSelf: 'center',
    },
    container: {
       backgroundColor: '#FFFFFF', 
       borderTopLeftRadius: 50,
       borderTopRightRadius: 50,
       marginTop: 20,
       paddingTop: 20,
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
