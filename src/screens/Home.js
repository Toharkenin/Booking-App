import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, Pressable, SafeAreaView, ScrollView, Animated} from 'react-native';
import logo from '../assets/logo-dark.png';
import img from '../assets/danny.png';
import CustomButton from '../components/user/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo'
import { login } from '../../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from '../components/user/Gallery';
import Communications from 'react-native-communications';  

export default function Home ( {navigation} ) {
    const reduxUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(false);
    const [user, setUser] = useState('');

    useEffect(() => {
        const getUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem("user");
                const currentUser = JSON.parse(savedUser);
                setUser(currentUser);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
        dispatch(login({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
            }))
    }, []);

    const onBtnPress = () => {

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
                <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 60, alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <Btn name='location-pin' iconColor='#fff' name2='כתובת' onPress={() => address ? setAddress(false) : setAddress(true)}/>
                    <Btn name='phone' 
                         name2='שיחה לדני' 
                         style={{backgroundColor: '#fff', borderWidth: 2, borderColor: '#E0AA3E'}} 
                         iconColor='#E0AA3E'
                         onPress={() => Communications.phonecall('0548128044', true)}/>
                    <Btn name='direction' iconColor='#fff' name2='ניווט'/>
                </View>
                {address ?
                 <Animated.View style={{marginTop: 0, padding: 30}}>
                    <View style={styles.infoContainer}>
                        <Icon name='phone' size={20}/>
                        <Text style={styles.infoText}>טלפון: 054-8128044</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Icon name='location' size={20}/>
                        <Text style={styles.infoText}>כתובת: כפר עברי 12, ירושלים</Text>
                    </View>
                </Animated.View> : null
                }
                </ScrollView>
            </SafeAreaView>
    );
  };

  const Btn = (props) => {
    return (
        <View>
        <Pressable 
            style={[{height: 50, width: 50, backgroundColor: '#E0AA3E', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}, props.style]}
            onPress={props.onPress}>
            <Icon name={props.name} size={30} style={props.iconStyle} color={props.iconColor}/>
        </Pressable>
        <Text style={{alignSelf: 'center', marginTop: 5}}>{props.name2}</Text>
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
        fontSize: 20,
        fontWeight: '400',
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
    // bottomBackgroundComtainer: {
    //     backgroundColor: '#000', 
    //     flex: 1, 
    //     borderTopRightRadius: 30,
    //     borderTopLeftRadius: 30,
    //     marginTop: 50,
    // },
 });
