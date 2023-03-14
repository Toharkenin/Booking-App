import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, Image, Pressable, 
    Keyboard, ScrollView, Alert} from 'react-native';
import Input from '../components/user/Input';
import CustomButton from '../components/user/CustomButton';
import logo from '../assets/logo-dark.png';
import Loader from '../components/user/Loader';
import Popup from '../components/user/Popup';
import { db, app } from '../../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithPhoneNumber, getAuth } from 'firebase/auth'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

export default function Signin( {navigation} ) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [displayOTPInput, setDisplayOTPInput] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading]= useState(false);
    const [welcomeMessage, setWelcomeMessage]= useState(false);

    const recaptchaVerifier = useRef(null);

    const countryCode = '+972'

    // phone validation
    function SubmitButton() { 
        if (phoneNumber.toString().length < 10 ||
            phoneNumber.toString()[0] !== "0" ||
            phoneNumber.toString()[1] !== "5") {
            return <CustomButton text="שלחו לי סיסמא ב-SMS" disabled style={{marginTop:20}}/>
        } else {
            Keyboard.dismiss();
            return <CustomButton text="שלחו לי סיסמא ב-SMS" onPress={()=>hendleOTPRequest()} />
        }
    }
    // onPress handle to request OTP
    const requestOTP = async () => {
        const auth = getAuth();
        setDisplayOTPInput(true);
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current)
            .then((confirmationResult) => {
                console.log('c...', confirmationResult);
                setCode(confirmationResult)
            })
        // phoneProvider
        // .verifyPhoneNumber(countryCode+phoneNumber, recaptchaVerifier.current)
        // .then(setVerificationId);
        // const confirmation = await auth().signInWithPhoneNumber(countryCode+phoneNumber);
        // setConfirm(confirmation);
    }

    // checks if the phone number exists in the db, and sensd OTP request
    const hendleOTPRequest = async () => {
        setLoading(true);
        const docRef = doc(db, 'Users', phoneNumber);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            setLoading(false);
            Alert.alert('אופס...', 'מספר הטלפון לא קיים במערכת',
                [{
                    text: 'סגירה'
                },
                {text: 'להרשמה',
                onPress: () => {
                     navigation.navigate('פתיחת משתמש');
                }}])
          } else {
            requestOTP();
          };
          setLoading(false);
    }

    // handle signin pressed
    const onSigninPressed = async () => {
        setLoading(true);
        try {
            await confirm.confirm(code).
            then(() => {
                setLoading(false);
                setWelcomeMessage(true);
                setTimeout(() => {
                    navigation.navigate('קביעת תור חדש');
                }, 4000)
            })  
        } catch (error) {
            console.log('Invalid code.');
            setLoading(false);
                Alert.alert('אופס...', 'הקוד שהוזן אינו תקין',
                [{
                    text: 'סגירה'
                },
                {text: 'להתחברות',
                onPress: () => {
                    navigation.navigate('הזדהות');
                }},
                {text: 'להרשמה',
                onPress: () => {
                    navigation.navigate('פתיחת משתמש');

                }}])
        }
    }

    return(
        <ScrollView style={{backgroundColor: '#fff', flex:1}}>
            {loading ? <Loader/> : null }
            {welcomeMessage ? <Popup /> : null }
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
                attemptInvisibleVerification={true}
            />
            <Image source= {logo} style={styles.logo} resizeMode="contain" />
            {!displayOTPInput ?
            <>
            <Text style={styles.text}>הזן מספר טלפון נייד להזדהות</Text>
            <View style={{marginBottom: 40}}>
                <Input 
                    value={phoneNumber}
                    name="טלפון-נייד" 
                    maxLength={10}
                    minLength={10}
                    iconName="phone"
                    keyboardType="numeric"
                    onChangeText={setPhoneNumber} />
            </View>
            <SubmitButton />
            </> : 
            <>
                <Text style={styles.text}>הזן את הקוד שקיבלת</Text>
                <Input 
                    value={code}
                    name="קוד" 
                    iconName2="message-processing-outline"
                    keyboardType="numeric"
                    onChangeText={setCode}
                    maxLength={6}
                />
                <CustomButton text="התחברות" onPress={()=>onSigninPressed()}/>
                <Pressable onPress={()=>requestOTP()}>
                    <Text style={styles.text}>
                        לא קיבלתי קוד, שלחו לי שוב
                    </Text>
                </Pressable>
            </>
            }
        </ScrollView>
    )
  };

const styles = StyleSheet.create({
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
        alignSelf: "center",
    },
    newUserText: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
        alignSelf: "center",
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginRight: 40,
        marginTop: 10,
    },
});