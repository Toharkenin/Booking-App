import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { selectAppointment } from '../../redux/reducers/appointmentSlice';

export default function Confirm () {

    const appointment = useSelector(selectAppointment);
    console.log("apposs", appointment.date)
    return (
        <View>{appointment ? <Text>exist {appointment.date}</Text> : <Text>not exist</Text>}</View>
    )
    
  };

 const styles = StyleSheet.create({
    
 });
