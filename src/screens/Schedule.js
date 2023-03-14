import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';
import Calendar from '../components/user/Calendar';
import Services from '../components/user/Services';
import Times from '../components/user/Times';
import Confirm from '../components/user/Confirm';
import CustomButton from '../components/user/CustomButton';
import { useDispatch } from 'react-redux';
import { fetchAppointments } from '../../redux/reducers/dateSlice';
import { set } from '../../redux/reducers/appointmentSlice';

export default function Schedule() {
    
    const [apptsModal, setApptsModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [service, setService] = useState('');
    const dispatch = useDispatch();

    const getTime = (start, end) => {
        setTime(`${start} - ${end}`);
        setApptsModal(false);
    };

    const getService = (service) => {
        setService(service);
    };

    const getDate = (date) => {
        dispatch(fetchAppointments({
            date: date,
        }));
        setDate(date);
        setTime("");
    };

    const onPress = () => {
        setApptsModal(true);
    };

    const handleSchedule = () => {
        setConfirm(true);
        const apptDetails = {
            service: service,
            date: date,
            time: time,
        }
        dispatch(set(apptDetails));
        //1#add to firebase
        //3#remove availiability from firebase
    };

    return (    
        <View style={styles.container}>
            <Modal animationType="slide"
                visible={apptsModal}
                transparent={true} > 
                <View style={styles.ModalBackground}>
                    <Times 
                        onXPressed={() =>setApptsModal(false)}
                        getTime={(start, end)=> getTime(start, end)} 
                        />
                </View>
            </Modal>
            <Calendar getDate={(e)=> getDate(e)}/>
            {date ? (
                <>
            <Services getService={(e)=> getService(e)}/>
            <TouchableOpacity 
                onPress={onPress}
                style={styles.categories}
                activeOpacity={0.8}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.header}>לחץ לבחירת שעה</Text>
                        <Text style={styles.text}>{time}</Text>
                    </View>
                    </TouchableOpacity>
            {date && service && time ? 
            <CustomButton text="להזמנת תור זה" onPress={handleSchedule}/> 
            : <CustomButton text="להזמנת תור זה" disabled/>}
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
        backgroundColor: 'rgba(224,170,62,0.01)', 
        flex:1, 
    },
    categories: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginVertical: 15,
        width: '100%', 
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        elevation: 10, 
        borderRadius: 15,
        justifyContent: 'center',
    },
    header: {
        fontSize: 18,
        fontFamily: "Helvetica",
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