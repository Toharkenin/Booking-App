import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Button, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';

export default function Confirm ({onXPressed}) {

    const {height, width} = useWindowDimensions();
    // let d = new Date();
    // console.log(d.setMonth(11));
    const apptDetails = useSelector(state => state.appointmentDetails.appointment);
    return (
        <View style={[styles.container, {height,width}]}>
            <View style={styles.message}>
                 <TouchableOpacity onPress={onXPressed} style={styles.icon}>
                    <Icon name="close-outline" size={40} color="#000" />
                </TouchableOpacity>
                <Text style={styles.header}>התור נקבע בהצלחה!</Text>
                <LottieView 
                    source={require('../../assets/lottie/84338-confirmation.json')} 
                    style={styles.checkmark}
                    autoPlay
                    loop={false} />
                <View style={styles.textContainer}>
                    <Text style={styles.secText}>{apptDetails.service}</Text>
                    <Text style={styles.secText}>{apptDetails.date}</Text>
                    <Text style={styles.secText}>{apptDetails.time}</Text>
                </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>הוספה ליומן</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
  };

 const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        flex: 1,
    },
    icon: {
        position:'absolute', 
        zIndex: 999, 
        alignSelf: 'flex-start', 
        marginTop: 5,
        marginLeft: 5,
      },
    message: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkmark: {
        height: 80,
        width: 80,
        alignSelf: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    secText: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#000'
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 10,
        
    },
    button: {
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        backgroundColor: '#3ee0aa',
    }
 });
