import React, { useState } from 'react';
import { Text, Image, StyleSheet, Pressable, Keyboard, ScrollView} from 'react-native';
import logo from '../assets/logo-dark.png';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import { useDispatch } from 'react-redux';
import {login} from '../../redux/reducers/userSlice';
import BirthDayInput from '../components/BirtheDayInput';

export default function Signup({navigation}) {

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const [birthDay, setBirthDay]= useState("");
    const dispatch = useDispatch();

    const onChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]:text}));
    };

    const getDate = (date) => {
        setBirthDay(date)
    }
    
    function SubmitButton({onPress}) { 
        if (!inputs.firstName ||
            !inputs.lastName || 
            !birthDay ||
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

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login({
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            phoneNumber: inputs.phoneNumber,
            birthDay: birthDay,
            loggedIn: true,
        }));

        navigation.navigate('קביעת תור חדש');
    }

    return (
        <ScrollView>
            <Image source= {logo} style={styles.logo} resizeMode="center" />
            <Input 
                name="שם פרטי" 
                iconName="user-alt" 
                onChangeText={text => onChange(text, 'firstName')}
                autoFocus={true}/>                                     
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
            <BirthDayInput getDate={(e)=>getDate(e)}/>
            <SubmitButton onPress={(e) => handleSubmit(e)} />
            <Pressable onPress={() => navigation.navigate('הזדהות')}>
                <Text style={styles.text}>
                    יש לך משתמש? לחץ להתחברות
                </Text>
            </Pressable>
        </ScrollView>
    );
  };


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
