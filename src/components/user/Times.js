import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';
import { db } from '../../../Firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Times({getTime, onXPressed}) {
    const [docExists, setDocExists] = useState(true);
    const date = useSelector(state => state.appts.date);
    const [events, setEvents] = useState([]);

    const onTimePressed = (startTime, endTime) => {
        getTime(startTime, endTime);
    };

    // const response = firestore().collection('AppointmentsByDate');
    // useEffect(() => {
    //   try{
    //   response.doc(date.date)
    //   .get().then(doc => {
    //     if (doc.exists) {
    //       setEvents(doc.data().appointments);
    //       setDocExists(true);
    //     } else {
    //       setDocExists(false);
    //     }})} catch{ error=>
    //       console.log('error', error)

    //     }
    //   }, []);
    
    return (  
        <View style={styles.container}>
              <TouchableOpacity onPress={onXPressed} style={styles.icon}>
                  <Icon name="close-outline" size={40} color="#E0AA3E" />
              </TouchableOpacity>
              {
                docExists ? 
                <>
                  <Text style={styles.header}>לאיזה שעה תרצה לקבוע?</Text>
                  <ScrollView showsVerticalScrollIndicator={false}>
                      {events.map((item, index) => (
                          <TouchableOpacity 
                              key={index} 
                              style={styles.btn}
                              onPress={() => onTimePressed(item.startTime, item.endTime)}>
                              <Text style={styles.btnText}>{item.startTime}-{item.endTime}</Text>
                          </TouchableOpacity>
                      ))}
                  </ScrollView>
                </> :
                <>
                    <Text style={styles.header}>אין תורים להציג בתאריך זה</Text>
                    <LottieView 
                        source={require('../../assets/lottie/59204-sad-look')} 
                        style={styles.emptyListedAnimation}
                        autoPlay />
                </>
              }
          </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
        height: 500,
      },
      icon: {
        position:'absolute', 
        zIndex: 999, 
        alignSelf: 'flex-start', 
        marginTop: 5,
        marginLeft: 5,
      },
      header: {
        fontSize: 18,
        fontFamily: "Helvetica",
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 16,
        color: '#000'
      },
      btn: {
        alignSelf: 'center',
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        elevation: 10, 
        marginTop: 30,
        width: 200,
        borderRadius: 10,
      },
      btnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#b89c47",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center'
      },
      emptyListedAnimation: {
          width: 80,
          height: 80,
          alignSelf: 'center',
          marginTop: 20,
      },
      loader: {
        width: 220,
        height: 220,
        alignSelf: 'center',
        marginTop: 20,
      },
});