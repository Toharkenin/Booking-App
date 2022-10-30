import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, Pressable, Keyboard, ScrollView} from 'react-native';
import logo from '../assets/logo-dark.png';
import DatePicker from 'react-native-date-picker'
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import moment from 'moment';
import { registerCustomIconType } from 'react-native-elements';

export default function Signup({navigation}) {

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDay: '',
    });
    
    // const selected = (e) => {
    //     const value = e.target.value;
    //     setInputs.birthDay(value);
    // }

    const onChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]:text}));
    };
    function SubmitButton({onPress}) { 
        if (!inputs.firstName ||
            !inputs.lastName || 
            inputs.phoneNumber.toString().length < 10 ||
            inputs.phoneNumber.toString()[0] !== "0" ||
            inputs.phoneNumber.toString()[1] !== "5"
            ) {
            return <CustomButton text="המשך" disabled/>
        } else {
            Keyboard.dismiss();
            return <CustomButton text="המשך" onPress={onPress} />
        }
    }
    console.log(inputs)
    return (
        <ScrollView>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            <Input 
                name="שם פרטי" 
                iconName="user-alt" 
                onChangeText={text => onChange(text, 'firstName')}/>                                     
            <Input 
                name="שם משפחה" 
                iconName="user-alt"
                onChangeText={text => onChange(text, 'lastName')}/>
            <Input 
                name="טלפון-נייד" 
                maxLength={10}
                minLength={10}
                iconName="phone-alt"
                keyboardType="numeric" 
                onChangeText={text => onChange(text, 'phoneNumber')}/>
            <InputBirthDay value={inputs.birthDay}/>
            <SubmitButton onPress={() => navigation.navigate("ראשי")} />
            <Pressable onPress={() => navigation.navigate('הזדהות')}>
                <Text style={styles.text}>
                    יש לך משתמש? לחץ להתחברות
                </Text>
            </Pressable>
        </ScrollView>
    );
  };

const InputBirthDay = (props, {selected}) => {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const confirm = (selectedDate) => {
        setDate(selectedDate);
        let newDate = moment(selectedDate).format("DD/MM/YYYY");
        setText(newDate);
        setOpen(false);
        selected= text
    };
    return (
        <View>
                <Input name="תאריך לידה"
                    style={{width: '100%',alignItems: 'center',
                    flexDirection: 'row',}}
                    {...props}
                    value={text}
                    iconName="calendar-day" 
                    showSoftInputOnFocus={false}
                    onPressIn={() => setOpen(true)}
                    />
            <DatePicker 
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={confirm}
                onCancel={() => {
                    setOpen(false)
                }}/>
        </View>
    )
}


const styles = StyleSheet.create({
    logo: {
        height: 140,
        width: 140,
        marginTop: 30,
        alignSelf: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
    },
});
