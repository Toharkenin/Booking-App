import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, Pressable, 
    SafeAreaView, ScrollView, Animated,Linking} from 'react-native';
import logo from '../assets/logo-dark.png';
import CustomButton from '../components/user/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { login } from '../../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from '../components/user/Gallery';
import Communications from 'react-native-communications';  

export default function Home ( {navigation} ) {
    // const reduxUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(false);
    const [user, setUser] = useState('');
    useEffect(() => {
        const getUser = async () => {
            const savedUser = await AsyncStorage.getItem("user");
            const currentUser = JSON.parse(savedUser);
            setUser(currentUser);
        };
        getUser();
    }, []);

    const onBtnPress = () => {

    };

    const openInstagram = () => {
        Linking.openURL('https://instagram.com/danny_bokobza?igshid=NTc4MTIwNjQ2YQ==')
    };

    const openNavigationApps = () => {
        
    };

    const openWhatsApp = () => {
        Linking.openURL('whatsapp://send?text=&phone=+972548128044')
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source= {logo} style={styles.logo} resizeMode="contain" />
                { user ?
                    <Text style={styles.welcomeText}>שלום {user.firstName}, שמחים שאתה כאן</Text> : 
                    <Text style={styles.welcomeText}>שלום אורח, ברוך הבא!</Text>
                }
                 {user ? 
                    <CustomButton 
                        onPress={() => navigation.navigate('קביעת תור חדש')}  
                        style={styles.btn}
                        text="לחץ לקביעת תור"/> :
                    <CustomButton 
                        onPress={() => navigation.navigate('הזדהות')}
                        style={styles.btn}
                        text="לחץ להתחברות"/>
                    }
                 <ScrollView>
                <Gallery />
                </ScrollView>
                {address ?
                 <Animated.View style={{marginTop: 0, padding: 30}}>
                    <View style={styles.infoContainer}>
                        <Icon name='phone' size={20}/>
                        <Text style={styles.infoText}>טלפון: 054-8128044</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Icon name='location' size={20}/>
                        <Text style={styles.infoText}>כתובת: כפר עברי 14, ירושלים</Text>
                    </View>
                </Animated.View> : null
                }
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <Btn name='location-pin' iconColor='#fff' name2='כתובת' onPress={() => address ? setAddress(false) : setAddress(true)}/>
                    <Btn name='phone' 
                         name2='שיחה לדני' 
                         style={{backgroundColor: '#fff'}} 
                         iconColor='#E0AA3E'
                         onPress={() => Communications.phonecall('0548128044', true)}/>
                    <Btn name='instagram' iconColor='#fff' name2='אינסטגרם' onPress={openInstagram}/>
                    <Btn name='direction' iconColor='#fff' name2='ניווט' onPress={openNavigationApps}/>
                    <Btn name='message' iconColor='#fff' name2='ווצאפ' onPress={openWhatsApp}/>
                </View>
                
                <Text style={{alignSelf: 'center', marginTop: 10, fontWeight: '500'}}>אהבתם את האפליקציה? דרגו אותנו</Text>
                
            </SafeAreaView>
    );
  };

  const Btn = (props) => {
    return (
        <View>
        <Pressable 
            style={[styles.buttons, props.style]}
            onPress={props.onPress}>
            <Icon name={props.name} size={30} style={props.iconStyle} color={props.iconColor}/>
        </Pressable>
        <Text style={{alignSelf: 'center', marginTop: 5, color: '#E0AA3E', fontWeight: '500'}}>{props.name2}</Text>
        </View>
    )
  };

 const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: {
        height: 130,
        width: 130,
        alignSelf: 'center',
        marginTop: 30,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        alignSelf: 'center',
        marginTop: 20,
    },
    btn: {
        marginTop: 20,
    },
    infoContainer: {
        flexDirection: 'row',
    },
    infoText: {
        fontSize: 15,
        marginBottom: 15,
        paddingHorizontal: 7,
    },
    buttons: {
        height: 50, 
        width: 50, 
        backgroundColor: '#E0AA3E', 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 20,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
    }
    // bottomBackgroundComtainer: {
    //     backgroundColor: '#000', 
    //     flex: 1, 
    //     borderTopRightRadius: 30,
    //     borderTopLeftRadius: 30,
    //     marginTop: 50,
    // },
 });
