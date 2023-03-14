import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity} from 'react-native';

export default function AppointmentDetails(props) {

    const {height, width} = useWindowDimensions();
    return (
        <View style={[styles.container, {height,width}]}>
            <View style={styles.message}>
                 <Text style={styles.primaryText}>24.6.23</Text>
                 <Text style={styles.text2}>10:00 - 10:15</Text>
                 <Text style={styles.text2}>טוהר קנין</Text>
                 <Text style={styles.text2}>0558820156</Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{backgroundColor: '#E0AA3E'}} onPress={props.onCanclePress}>
                    <Text>ביטול תור</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#E0AA3E'}} onPress={props.onClosePress}>
                    <Text>סגירה</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
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
    primaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,

    },
    secText: {
        fontSize: 16,
        marginTop: 20,
    }
 });
