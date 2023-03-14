import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { Agenda } from 'react-native-calendars';
import FooterMenu from '../components/admin/FooterMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/user/Loader';
import { db } from '../../Firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../../redux/reducers/appointmentSlice';
import AppointmentDetails from '../components/admin/AppointmentDetails';

export default function AdminScreen() {
    //hook for appointments in the calendar
    const [appointments, setAppointments] = useState({});
    const navigation = useNavigation();
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const appointment = useSelector((state) => state.appointmentDetails.appointment);

    const onDayPress = async (day) => {
        setLoading(true);
        setDate(day.dateString);
        const docRef = doc(db, "Appointments", day.dateString);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let events = []
            events = docSnap.data().appointments;
            setAppointmentsList(events);
            setAppointments((prev) => ({...prev, [day.dateString]: appointmentsList}))
          } else {
            console.log("No such document!");
          }
        setLoading(false);
    };

    const onCreateApptPressed = (start, end, availiable, index) => {
        dispatch(set({
            startTime: start,
            endTime: end,
            availiable: availiable,
            date: date,
            index: index,
        }))
        navigation.navigate("משתמשים");
    };

    const onExistingApptPresed = (index, uId) => {
        setShowPopup(true);
    }

    const renderItem = (item) => {
        return (
            <>
                <Pressable style={styles.item} >
                    <View style={{flexDirection: 'row'}}>
                        {item.availiable === true ? 
                        <Pressable onPress={() => onCreateApptPressed(item.startTime, item.endTime, item.availiable, item.index)}>
                            <Icon name="calendar-plus-o" size={40} color='#E0AA3E' style={styles.icon}/>
                        </Pressable> : 
                        <Pressable onPress={() => onExistingApptPresed(item.startTime, item.endTime, item.availiable, item.index, item.userId)}>
                            <Icon name="calendar-minus-o" size={40} color="red" style={styles.icon}/>
                        </Pressable>}
                    <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                    {item.availiable === true ? null : 
                            <Text>{item.userId}</Text> }
                    </View>
                </Pressable>
            </>
        );
    };

    const onScheduleApptPressed = () => {
        navigation.navigate('משתמשים');  
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? <Loader /> : null}
            {showPopup? <AppointmentDetails
                            onClosePress={() => setShowPopup(false)}
                            /> 
            : null }
            <Agenda
                items={appointments}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
                renderEmptyData={() => {
                    return <View />;
                }}
                // renderDay={renderDay}
                pastScrollRange={30}
                futureScrollRange={30}
                onDayPress={onDayPress}
                theme={{
                    agendaDayTextColor: '#E0AA3E',
                    agendaDayNumColor: '#E0AA3E',
                    agendaTodayColor: '#E0AA3E',
                    agendaKnobColor: '#E0AA3E',
                    selectedDayBackgroundColor: '#E0AA3E',
                    dotColor: '#E0AA3E',
                    todayTextColor: '#E0AA3E',
                }}
            />
            <FooterMenu />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        borderRadius: 5,
        paddingVertical: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        elevation: 10, 
    },
    nameText: {
        fontSize: 16,
    },
    timeText: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'center',
    },
    serviceText: {
        fontSize: 16,
    },
    icon: {
        alignSelf: 'center',
        margin: 10,
    },
});