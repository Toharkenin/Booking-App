import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';
import { db } from '../../../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Loader from './Loader';

export default function Times({getTime, onXPressed}) {
    const [docExists, setDocExists] = useState(true);
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const date = useSelector(state => state.appts.date.date);
    let events = [];

    const onTimePressed = (startTime, endTime, index) => {
        getTime(startTime, endTime, index);
    };
 
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
          const docRef = doc(db, 'Appointments', date);
          const docSnap = await getDoc(docRef);
          let counter = 0;
          if (docSnap.exists()) {
            while (counter < docSnap.data().appointments.length){
              if(docSnap.data().appointments[counter].available === true) {
                  events.push(
                    docSnap.data().appointments[counter],
                  )
              }
              counter++;
            };
            setAppointmentsList(events);
            setLoading(false);
            setDocExists(true);
          } else {
            setLoading(false);
            setDocExists(false);
          }
          if(docSnap.exists() && events.length === 0) {
              setDocExists(false);
          }
      }
      fetchData();
      }, []);

    //   useEffect(() => {
    //     console.log('a', appointmentsList)
    // }, []);

    
    return (  
        <View style={styles.container}>
              <Pressable onPress={onXPressed} style={styles.icon}>
                  <Icon name="close-outline" size={40} color="#E0AA3E" />
              </Pressable>
              {loading ? <Loader/> :
                docExists ? 
                <>
                  <Text style={styles.header}>לאיזה שעה תרצה לקבוע?</Text>
                  <ScrollView showsVerticalScrollIndicator={false}>
                      {appointmentsList.map((item, index) => (
                          <Pressable 
                              key={index} 
                              style={styles.btn}
                              onPress={() => onTimePressed(item.startTime, item.endTime, item.index)}>
                              <Text style={styles.btnText}>{item.startTime} - {item.endTime}</Text>
                          </Pressable>
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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 16,
        color: '#E0AA3E'
      },
      btn: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        } ,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
      btnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#E0AA3E',
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