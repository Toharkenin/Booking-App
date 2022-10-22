import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import logo from '../assets/logo-dark.png';


export default function Signin( {navigation} ) {

    const [phoneNumber, setPhoneNumber] = useState("");

    function SubmitButton({onPress}) { 
        if (phoneNumber.toString().length < 10 ||
            phoneNumber.toString()[0] !== "0" ||
            phoneNumber.toString()[1] !== "5") {
            return <CustomButton text="התחברות" disabled/>
        } else {
            return <CustomButton text="התחברות" onPress={onPress} />
        }
    }

    return(
    <View style={styles.container}>
        <Image source= {logo} style={styles.logo} resizeMode="center" />
        <Text style={styles.text}>הזן מספר טלפון נייד להזדהות</Text>
        <Input 
                value={phoneNumber}
                name="טלפון-נייד" 
                maxLength={10}
                minLength={10}
                iconName="phone-alt"
                keyboardType="numeric"
                onChangeText={setPhoneNumber}
                />
                <SubmitButton />
                <Pressable onPress={() => navigation.navigate('פתיחת משתמש')}>
                    <Text style={styles.newUserText}>לקוח חדש? לחץ לפתיחת משתמש</Text>
                </Pressable>
    </View>
    )
  };

const InputCode = () => {

    return (
        <View>
            <Text>קוד אימות</Text>
            <Input
                name="הזן קוד"/>
            <Text>לא קיבלתי את הקוד, שילחו לי קוד חדש</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 10,
        color: 'black',
    },
    logo: {
        height: 140,
        width: 140,
        marginTop: 30,
    },
    newUserText: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
    },
});