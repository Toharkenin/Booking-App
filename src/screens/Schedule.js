import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';
import Calendar from '../components/Calendar';
import Services from '../components/Services';
import Times from '../components/Times';
import logo from '../assets/logo-dark.png';
import { State } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';

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

    const [showModal, setShowModal] = useState({
        calendar: false,
        services: false,
        times: false,
    });

    const [actionTriggered, setActionTriggered] = useState('');

    const ModalsTriggered = () => {

        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
                {actionTriggered === '1' ?
                     <Calendar onXPressed={() => setShowModal({...State, calendar:false})}/> :
                actionTriggered === '2' ?
                     <Services onXPressed={() => setShowModal({...State, services:false})}/> : 
                actionTriggered === '3' ? 
                     <Times onXPressed={() => setShowModal({...State, times:false})}/>
                : null
                }
            </View>
        )}
    

    const onPress = (id) => {
        id === 1 ? (setActionTriggered('1'), setShowModal((prevState) => ({...prevState, calendar:true}))) : 
        id === 2 ? (setActionTriggered('2'), setShowModal((prevState) => ({...prevState, services:true}))) :
        (setActionTriggered('3'), setShowModal((prevState) => ({...prevState, times:true})))
        console.log(actionTriggered)
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
            {categories.map((item, index) => (
                <View style={{}} key={index}> 
                    <TouchableOpacity 
                        onPress={() => onPress(item.id)}
                        style={styles.button}
                        activeOpacity={0.8}>
                            <Text style={styles.text}>{item.content}</Text>
                            <View style={styles.verticleLine}></View>
                            <Text style={styles.header}>{item.header}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <CustomButton />
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
    header: {
        fontSize: 18,
        fontWeight: '600',
        color: '#b89c47',
        marginRight: 20,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        marginVertical: 15,
        width: '90%', 
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        elevation: 10, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        marginLeft: 20,
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#181818',
      }
});