import React, { useState } from 'react';
import {View, Text, StyleSheet, Modal, Alert, SafeAreaView} from 'react-native';
import Calendar from '../components/user/Calendar';
import Services from '../components/user/Services';
import Times from '../components/user/Times';
import Confirm from '../components/user/Confirm';
import CustomButton from '../components/user/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../redux/reducers/dateSlice';
import { set } from '../../redux/reducers/appointmentSlice';
import { db } from '../../Firebase';
import { doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { Pressable } from 'react-native';

export default function Schedule({navigation}) {
    const [apptsModal, setApptsModal] = useState(false);
    const [serviceModal, setServiceModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [time, setTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [index, setIndex] = useState(null);
    const [date, setDate] = useState('');
    const [service, setService] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const getTime = (start, end, apptIndex) => {
        setStartTime(start);
        setEndTime(end);
        setTime(`${start} - ${end}`)
        setIndex(apptIndex);
        setApptsModal(false);
    };

    const getService = (service) => {
        setService(service);
        setServiceModal(false);
    };

    const getDate = (date) => {
        dispatch(fetchAppointments({
            date: date,
        }));
        setDate(date);
        setTime("");
    };

    const onServicePress = () => {
        setServiceModal(true);
    };

    const onTimePress = () => {
        setApptsModal(true);
    };

    const onConfirmPress = async () => {
        const userRef = doc(db, 'Users', user.phoneNumber);
        const docSnap = await getDoc(userRef);
        let eventsNum = docSnap.data().numOfEvents;
        if(docSnap.data().appointments.length === 0 || 
        (eventsNum > 1 && eventsNum > docSnap.data().appointments.length)) {
            addToRedux();
            setConfirm(true);
            createNewAppointment(docSnap.data().appointments);
        } else {
            Alert.alert('לא ניתן לקבוע תור', `ניתן לקבוע עד ${eventsNum} תורים`,
            [{
                text: 'סגירה'
            },
            {text: 'ביטול תור קיים',
            onPress: () => {
                navigation.navigate('התורים שלי')
            }}])
        }  
    };

    const addToRedux=()=>{
        dispatch(set({
        service: service,
        date: date,
        startTime: startTime,
        endTime: endTime,
    }));
}

    const createNewAppointment = async (appointmentsArray) => {
        const userRef = doc(db, 'Users', user.phoneNumber);
        let events = [];
        events = appointmentsArray;
        events.push({
            service: service,
            date: date,
            startTime: startTime,
            endTime: endTime,
            index: index,
        }); 
        await updateDoc(userRef, {
            appointments: events,
        });
        removeAppointmentFromDb();
    };
    
    const removeAppointmentFromDb = async () => {
        const docRef = doc(db, 'Appointments', date);
        const docSnap = await getDoc(docRef);

        let events = []
        events = docSnap.data().appointments;
        events[index].available = false;
        events[index].userId = user.phoneNumber;
        const del = await deleteDoc(doc(db, "Appointments", date));
        del;
        const update = await setDoc(doc(db, "Appointments", date), {
            date: date,
            appointments: events,
        });
        update;
        setService('');
        setTime('');
    };

    return (    
        <View style={styles.container}>
            <Modal animationType="slide"
                visible={serviceModal || apptsModal}
                transparent={true} > 
                <View style={styles.ModalBackground}>
                {
        serviceModal ?
            <Services 
                getService={(e)=> getService(e)}
                onXPressed={() =>setServiceModal(false)}/> :
        apptsModal ?
            <Times 
                onXPressed={() =>setApptsModal(false)}
                getTime={(start, end, index)=> getTime(start, end, index)} 
                    />
            : null
            }
                </View>
            </Modal>
            <Calendar getDate={(e)=> getDate(e)}/>
            {date ? (
                <>
            <Pressable 
                onPress={onServicePress}
                style={styles.categories}
                activeOpacity={0.8}>
                    <View style={{alignItems: 'center'}}>
                        <Icon name='face-man' size={25}/>
                        {/* <Icon name='mustache' size={25}/> */}
                        <Text style={styles.header}>לחץ לבחירת שירות</Text>
                        <Text style={styles.text}>{service}</Text>
                    </View>
            </Pressable>
            <Pressable 
                onPress={onTimePress}
                style={styles.categories}
                activeOpacity={0.8}>
                    
                    <View style={{alignItems: 'center'}}>
                    <Icon name='clock-time-ten-outline' size={25} />
                        <Text style={styles.header}>לחץ לבחירת שעה</Text>
                        <Text style={styles.text}>{time}</Text>
                    </View>
            </Pressable>
            {date && service && time ? 
            <CustomButton text="להזמנת תור זה" onPress={onConfirmPress} style={{marginTop:30}}/> 
            : <CustomButton text="להזמנת תור זה" disabled style={{marginTop:30}}/>}
            </>) : null}
            {confirm ? <Confirm onXPressed={() => setConfirm(false)}/> : null}
            </View>
        )
    };


  const styles = StyleSheet.create ({
    logo: {
        height: 120,
        weight: 120,
        alignSelf: 'center',
        marginBottom: 20,
    },
    ModalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#fff', 
        flex:1, 
    },
    categories: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginVertical: 15,
        width: '80%', 
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        justifyContent: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 10,
        color: '#000'
    },
    content: {

    },
    date: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(224,170,62,0.8)',
        borderRadius: 100,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'grey',
    },
});