import React, { useState, useRef } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, ScrollView, View, Alert, SafeAreaView} from 'react-native';
import logo from '../assets/logo-dark.png';
import Input from '../components/user/Input';
import CustomButton from '../components/user/CustomButton';
import BirthDayInput from '../components/user/BirtheDayInput';
import Popup from '../components/user/Popup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/userSlice';
import { db, app } from '../../Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import Loader from '../components/user/Loader';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

export default function Signup({navigation}) {

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const [birthDay, setBirthDay]= useState("");
    const [loading, setLoading]= useState(false);
    const [welcomeMessage, setWelcomeMessage]= useState(false);
    const [verificationId, setVerificationId] = useState(null);
    // const [confirm, setConfirm] = useState(null);
    const [displayOTPInput, setDisplayOTPInput] = useState(false);
    const dispatch = useDispatch();
    const [code, setCode] = useState('');

    const recaptchaVerifier = useRef(null);

    const countryCode = "+972";

    const onChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]:text}));
    };

    const getDate = (date) => {
        setBirthDay(date)
    }
    
    //form validation, activates the button if all fields are valid
    function SubmitButton({onPress}) { 
        if (!inputs.firstName ||
            !inputs.lastName || 
            !birthDay ||
            inputs.phoneNumber.toString().length < 10 
            // inputs.phoneNumber.toString()[0] !== "0" ||
            // inputs.phoneNumber.toString()[1] !== "5"
            ) {
            return <CustomButton text="המשך" disabled />
        } else {
            return <CustomButton text="המשך" onPress={onPress}/>
        }
    }

    const setRedux = () => {
        dispatch(login({
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            phoneNumber: inputs.phoneNumber,
            birthDay: birthDay,
            loggedIn: true,
        }));
    }

    //add user to firebase depending on phone number existance in the db
    const handleSubmit = async () => {
        setLoading(true);
        const docRef = doc(db, 'Users', inputs.phoneNumber);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setLoading(false);
                Alert.alert('אופס...', 'מספר הטלפון כבר קיים במערכת',
                [{
                    text: 'סגירה'
                },
                {text: 'להתחברות',
                onPress: () => {
                     navigation.navigate('הזדהות');
                }}])
          } else {
                // const newUser = await setDoc(doc(db, 'Users', inputs.phoneNumber),
                // {
                //     firstName: inputs.firstName,
                //     lastName: inputs.lastName,
                //     phoneNumber: inputs.phoneNumber,
                //     birthDay: birthDay,
                //     numOfEvents: 1
                // })
                // newUser;
                requestOTP();
                // setRedux();
                setLoading(false);
          }
          
    //         if (snapshot.empty) {
    //             firestore()
    //             .collection('Users')
    //             .add({
    //                 firstName: inputs.firstName,
    //                 lastName: inputs.lastName,
    //                 phoneNumber: inputs.phoneNumber,
    //                 birthDay: birthDay,
    //             })
    //             .then(() => {
    //                 // requestOTP();
    //                 setRedux();
    //                 console.log('worked');
    //                 setLoading(false);
    //             })
    //         } else {
    //             setLoading(false);
    //             Alert.alert('אופס...', 'מספר הטלפון כבר קיים במערכת',
    //             [{
    //                 text: 'סגירה'
    //             },
    //             {text: 'להתחברות',
    //             onPress: () => {
    //                 navigation.navigate('הזדהות');
    //             }}])
    //         }})  
        };

    const requestOTP = async () => {
        // const phoneProvider = new PhoneAuthProvider(auth);
        // signInWithPhoneNumber(
        //     auth, 
        //     countryCode + inputs.phoneNumber, 
        //     recaptchaVerifier.current)
        //         .then((confirmationResult) => {
        //             setVerificationId(confirmationResult);
        //             setDisplayOTPInput(true);
        //         }).catch((error) => {
        //             console.log('no SMS', error);
        // });
        const auth = getAuth();
        setDisplayOTPInput(true);
        signInWithPhoneNumber(auth, countryCode+inputs.phoneNumber, recaptchaVerifier.current)
            .then((confirmationResult) => {
                console.log('c...', confirmationResult);
                setCode(confirmationResult)
            })

        // phoneProvider
        // .verifyPhoneNumber(countryCode+inputs.phoneNumber, recaptchaVerifier.current)
        // .then(setVerificationId);
        // signInWithPhoneNumber(authentication, `${countryCode}${inputs.phoneNumber}`, appVerifier)
        // .then((confirmationResult) => {
        //     window.confirmationResult = confirmationResult;
        // }).catch((error) => {
        //     console.log(error);
        // });
        // const confirmation = await auth().signInWithPhoneNumber(countryCode+inputs.phoneNumber);
        // setConfirm(confirmation);
    }
    
    const onSignupPressed = async () => {
        try {
            await confirm.confirm(code);
            setWelcomeMessage(true);
        } catch (error) {
            console.log('Invalid code.');
        }
        // confirmationResult.confirm(code).then((result) => {
        // // User signed in successfully.
        
        // // ...
        // }).catch((error) => {
        // // User couldn't sign in (bad verification code?)
        // // ...
        // });

    }

    return (
        <SafeAreaView style={{backgroundColor: '#fff', flex:1}}>
            {loading ? <Loader />: null }
            {welcomeMessage ? <Popup 
                text1="נרשמת בהצלחה!" 
                text2="מיד תעבור לעמוד..."/> : null }
        <ScrollView>
        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={app.options}
            attemptInvisibleVerification={true}
            />
        {!displayOTPInput ? 
        <>
        <View style={{marginBottom: 40, paddingTop: 30}}>
            <Image source= {logo} style={styles.logo} resizeMode="contain"/>
            <Input 
                name="שם פרטי" 
                iconName="user-o" 
                onChangeText={text => onChange(text, 'firstName')}
                autoFocus={true}/>                                     
            <Input 
                name="שם משפחה" 
                iconName="user-o"
                onChangeText={text => onChange(text, 'lastName')}/>
            <Input 
                name="טלפון-נייד" 
                // maxLength={10}
                minLength={10}
                iconName="phone"
                // keyboardType="numeric" 
                onChangeText={text => onChange(text, 'phoneNumber')}/>
            <BirthDayInput getDate={(e)=>getDate(e)}/>
        </View>
            <SubmitButton onPress={(e) => handleSubmit(e)} />
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('הזדהות')}>
                        <Text style={styles.primText}>לחץ להתחברות</Text>
                </TouchableOpacity>
            </View>
        </> : 
         <View style={{marginTop: 30}}>
         <Text style={styles.header}>הזן את הקוד שקיבלת</Text>
         <Input 
             value={code}
             name="קוד" 
             iconName2="message-processing-outline"
             keyboardType="numeric"
             onChangeText={setCode}
         />
         <CustomButton text="התחברות" onPress={()=>onSignupPressed()}/>
         <TouchableOpacity onPress={()=>requestOTP()}>
             <Text style={styles.primText}>
                 לא קיבלתי קוד, שלחו לי שוב
             </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setDisplayOTPInput(false)}>
             <Text style={styles.secText}>
                 חזרה לפתיחת משתמש
             </Text>
         </TouchableOpacity>
         </View>
    }
        </ScrollView>
        </SafeAreaView>
    );
  };


  const styles = StyleSheet.create({
    logo: {
        height: 160,
        width: 160,
        alignSelf: 'center',
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
    secText: {
        marginTop: 13,
        fontSize: 16,
        alignSelf: 'center',
        color: '#000'
    },
    header: {
        fontSize: 20,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 16,
        color: '#000'
    }
});
