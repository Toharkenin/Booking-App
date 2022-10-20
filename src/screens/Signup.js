import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import logo from '../assets/logo-dark.png';
import DatePicker from 'react-native-date-picker'
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Signin from './Signin';
import { useState } from 'react';
import moment from 'moment';

export default function Signup({navigation}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    function SubmitButton () {
        if(firstName==="" || lastName==="" || phoneNumber===""){
            return <CustomButton text="המשך" disabled />    
        } else {
            return <CustomButton text="המשך" />}
    }

    return (
        <View style={styles.container}>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            <Input value={firstName} name="שם פרטי" iconName="user-alt" onChange={ e => setFirstName(e.target.value)}/>
            <Input value={lastName} name="שם משפחה" iconName="user-alt" onChange={ e => setLastName(e.target.value)}/>
            <Input 
                value={phoneNumber}
                name="טלפון-נייד" 
                iconName="phone-alt"
                keyboardType="numeric" 
                onChange={ e => setPhoneNumber(e.target.value)}/>
            <InputBirthDay />
            <SubmitButton/>
            <Pressable onPress={() => navigation.navigate("Signin")}>
                <Text style={styles.text}>
                    יש לך משתמש? לחץ להתחברות
                </Text>
            </Pressable>
        </View>
    );
  };

const InputBirthDay = () => {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const confirm = () => {

    };


    let time = moment().format("DD/MM/YYYY");
    return (
        <View>
        <Pressable 
             style={styles.con}>
                <Input name="תאריך לידה"
                    value={text}
                    iconName="calendar-day" 
                    showSoftInputOnFocus={false}
                    // onChange={e => e.target.value}
                    onPressIn={() => setOpen(true)}
                    />
                </Pressable>
            <DatePicker 
                modal
                open={open}
                date={date}
                mode="date"
                // dateFormat='DD/MM/YYYY'
                onConfirm={() => {setOpen(false)
                    setDate(date)
                    setText(time)}}
                onCancel={() => {
                    setOpen(false)
                }}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    con: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 140,
        width: 140,
        marginTop: 30,
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '700'
    },
    input: {

    }
});
