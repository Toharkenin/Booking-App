import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, Image, Pressable, 
    Keyboard, ScrollView, Alert, SafeAreaView} from 'react-native';
import Input from '../components/user/Input';
import CustomButton from '../components/user/CustomButton';
import logo from '../assets/logo-dark.png';
import Loader from '../components/user/Loader';
import Popup from '../components/user/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/userSlice';
import { db, app } from '../../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithPhoneNumber, getAuth } from 'firebase/auth'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin( {navigation} ) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [displayOTPInput, setDisplayOTPInput] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading]= useState(false);
    const [welcomeMessage, setWelcomeMessage]= useState(false);
    const [userInfo, setUserInfo]= useState({});
    const user = useSelector((state) => state.user.user);
    

    const recaptchaVerifier = useRef(null);
    const dispatch = useDispatch();

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
    };

    const storeUser = async () => {
        const value = userInfo;
        try {
            await AsyncStorage.setItem("user", JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
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
            setUserInfo({
                firstName: docSnap.data().firstName,
                lastName: docSnap.data().lastName,
                phoneNumber: docSnap.data().phoneNumber,
                birthDay: docSnap.data().birthDay,
                isAdmin: docSnap.data().isAdmin,
            });
            requestOTP();
          };
          setLoading(false);
    };
    
    // onPress handle to request OTP
    const requestOTP = async () => {
        const auth = getAuth();
        setDisplayOTPInput(true);
        signInWithPhoneNumber(auth, countryCode+phoneNumber, recaptchaVerifier.current)
            .then((confirmationResult) => {
                console.log('c...', confirmationResult);
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.log('ee', error)
            })
    };

    // handle signin pressed
    const onSigninPressed = async () => {
        // setLoading(true);
        confirmationResult.confirm(code).then((result) => {
            setWelcomeMessage(true); 
            storeUser(); 
            setTimeout(() => {
                setWelcomeMessage(false);
                dispatch(login(userInfo)); 
                setCode("");
             }, 4000);
          }).catch((error) => {
            Alert.alert('אופס...', 'הקוד שהקשת אינו תקין',
            [{
                text: 'סגירה'
            }]
          )});
    }

    return(
        <SafeAreaView style={{backgroundColor: '#fff', flex:1}}>
            {loading ? <Loader/> : null }
            {welcomeMessage ? <Popup
                text1="שמחים שחזרת!" 
                text2="מיד תעבור לעמוד..."/> : null }
        <ScrollView >
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
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.primText}>לחץ ליצירת חשבון</Text>
                </TouchableOpacity>
            </View>
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
                <TouchableOpacity onPress={() => setDisplayOTPInput(false)}>
                        <Text style={styles.primText}>חזרה להתחברות</Text>
                </TouchableOpacity>
            </>
            }
        </ScrollView>
        </SafeAreaView>
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
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    primText: {
        marginTop: 20,
        fontSize: 18,
        alignSelf: 'center',
        color: '#000',
        marginRight: 5,
        color: '#E0AA3E'
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