import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';
import Calendar from '../components/Calendar';
import Services from '../components/Services';
import Times from '../components/Times';
import Confirm from '../components/Confirm';
import logo from '../assets/logo-dark.png';
import CustomButton from '../components/CustomButton';
import { useDispatch } from 'react-redux';
import { Create_Appointment} from '../../redux/reducers/appointmentSlice';

const categories = [
    {
        id: 1,
        header: 'יום',
        content: '24/10/2022',
    },
    {
        id: 2,
        header: 'טיפול',
        content: 'תספורת',
    },
    {
        id: 3,
        header: 'שעה',
        content: '10:00'
    },
]

export default function Schedule() {

    const dispatch = useDispatch();
    
    const [showModal, setShowModal] = useState({
        calendar: false,
        services: false,
        times: false,
    });
    const [confirmModal, setConfirmModal] = useState(false);

    const [actionTriggered, setActionTriggered] = useState('');

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [service, setService] = useState('');

    const getTime = (time) => {
        setTime(time);
        setShowModal((prevState) => ({...prevState, times:false}))
    };

    const getService = (service) => {
        setService(service);
        setShowModal((prevState) => ({...prevState, services:false}))
    };

    const getDate = (date) => {
        setDate(date);
        setShowModal((prevState) => ({...prevState, calendar:false}))
    };

    const ModalsTriggered = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
                {actionTriggered === '1' ?
                     <Calendar 
                        getDate={(e)=> getDate(e)}
                        onXPressed={() =>  
                            setShowModal((prevState) => ({...prevState, calendar:false}))}/> :
                actionTriggered === '2' ?
                     <Services onXPressed={() =>  
                        setShowModal((prevState) => ({...prevState, services:false}))}
                        getService={(e)=> getService(e)}/>
                        : 
                actionTriggered === '3' ? 
                     <Times 
                        onXPressed={() =>
                            setShowModal((prevState) => ({...prevState, times:false}))}
                        getTime={(e)=> getTime(e)} />
                : null
                }
            </View>
        )};

    const onPress = (id) => {
        id === 1 ? (setActionTriggered('1'), setShowModal((prevState) => ({...prevState, calendar:true}))) : 
        id === 2 ? (setActionTriggered('2'), setShowModal((prevState) => ({...prevState, services:true}))) :
        (setActionTriggered('3'), setShowModal((prevState) => ({...prevState, times:true})))
    };
    const handleSchedule = () => {
        dispatch(Create_Appointment({
            date: date,
            service: service,
            time: time,
        }))
        setConfirmModal(true);
    };

    return (    
        <>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            <Modal animationType="slide"
                        visible={showModal.calendar || showModal.services || showModal.times}
                        transparent={true}
                   > 
                   {ModalsTriggered()}
            </Modal>
           <View style={styles.container} >
            {categories.map((item, index) => (
                <View style={{}} key={index}> 
                    <TouchableOpacity 
                        onPress={() => onPress(item.id)}
                        style={styles.categories}
                        activeOpacity={0.8}>
                            <Text style={styles.header}>{item.header}</Text>
                            <Text style={styles.text}>{item.content}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <CustomButton style={styles.button} text="להזמנת תור זה" onPress={handleSchedule}/>
            </View>
        </>
    )
  };


  const styles = StyleSheet.create ({
    logo: {
        height: 120,
        weight: 120,
        alignSelf: 'center',
        marginBottom: 20,
    },
    container: {
        paddingTop: 30,
        backgroundColor: '#fff', 
        flex:1, 
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        color: '#b89c47',
        marginRight: 20,
    },
    categories: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        marginVertical: 15,
        width: '80%', 
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        elevation: 10, 
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'grey',
        alignSelf: 'flex-end',
        right: 20,
    },
    button: {
        
    },
});