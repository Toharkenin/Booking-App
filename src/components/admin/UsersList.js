import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AddUser from './AddUser';
import { db } from '../../../Firebase';
import {collection, getDoc, deleteDoc, doc, onSnapshot, setDoc} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../user/Loader';
import Communications from 'react-native-communications';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { set } from '../../../redux/reducers/appointmentSlice';
import { array } from 'prop-types';

function UsersList ({route}) {
    const [allUsers, setAllUsers] = useState([]);
    const [usersNum, setUsersNum] = useState(0);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    //navigation depending on route
    const edditedUsersId = route.params?.usersEditing;
    const isUserEditing = !!edditedUsersId;
    const navigation = useNavigation();

    const usersCollectionRef = collection(db, 'Users');
    const appointment = useSelector((state) => state.appointmentDetails.appointment);
    
    // get list of users from firebase firestore
    useEffect(() => { 
        const getUsers = async () => {
            setLoading(true);
            const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
            const users = [];
            setUsersNum(querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
                users.push({
                    id: documentSnapshot.id,
                    firstName: documentSnapshot.data().firstName,
                    lastName: documentSnapshot.data().lastName,
                    phoneNumber: documentSnapshot.data().phoneNumber,
                });
                setAllUsers(users);
            })
            setLoading(false);
        })};
        getUsers();
        
    }, []);
    

    const onAddUserPressed = () => {
        setCreateUserModal(true);
    };

    // remove a user from firestore 
    const onDeleteUserPressed = (id) => {
        Alert.alert("הסרת משתמש", "האם אתה בטוח שברצונך להסיר את המשתמש?", 
        [{
            text: "לא"
        },
        {text: "כן", onPress: async () => {
            await deleteDoc(doc(db, "Users", id));
            console.log('User deleted!');
        }}])
    };

    // create new appointment for a user
    const onNewAppointmentPressed = async (id) => {
        setLoading(true);
        const docRef = doc(db, 'Appointments', appointment.date);
        const docSnap = await getDoc(docRef);

        let events = []
        events = docSnap.data().appointments;
        events[appointment.index].availiable = false;
        events[appointment.index].userId = id;
        const del = await deleteDoc(doc(db, "Appointments", appointment.date));
        del;
        console.log(events)
        const update = await setDoc(doc(db, "Appointments", appointment.date), {
            date: appointment.date,
            appointments: events,
        });
        update;
        setLoading(false);
        navigation.goBack();
    };

    const onPhonePressed = (id) => {
        Communications.phonecall(id, true);
    };
    

    return (
        <SafeAreaView style={{backgroundColor: '#fff', flex:1}}>
            <Modal animationType="slide"
                visible={createUserModal}
                transparent={true}> 
                   <AddUser onXPressed={() => setCreateUserModal(false)}/>
            </Modal>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                {<Text style={styles.header}>{isUserEditing ? 'משתמשים' : 'תור חדש'}</Text>}
                <Text style={{padding: 5}}>{usersNum}</Text>
                <TouchableOpacity onPress={onAddUserPressed}>
                    <Icon2 name="md-add-sharp" size={30} style={{marginHorizontal: 20, color: '#000'}}/>
                </TouchableOpacity>
            </View>
            <Divider width={0.5} />
            {isUserEditing ? null : 
                <>
                <Text style={styles.dateAndTime}>{appointment.date}</Text>
                <Text style={styles.dateAndTime}>{appointment.startTime} - {appointment.endTime}</Text>
                </>
            }
            <Divider width={0.5} />
            <FlatList
                data={allUsers}
                alwaysBounceHorizontal={false} 
                showsScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    <>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between',margin: 20,}}>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.userPhone}>{item.phoneNumber}</Text>
                            </View>
                            {isUserEditing ?
                            <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => onDeleteUserPressed(item.id)}>
                                <Icon name="trash-alt" size={25} color='#202020' style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onPhonePressed(item.id)}>
                                <Icon name="phone" size={25} color='#202020' style={styles.icon}/>
                            </TouchableOpacity>
                            </View>
                                : 
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPress={() => onNewAppointmentPressed(item.id)}>
                                        <Icon name="calendar-plus" size={25} color='#202020' style={styles.icon}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onPhonePressed(item.id)}>
                                        <Icon name="phone" size={25} color='#202020' style={styles.icon}/>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <Divider width={0.8} />
                    </>
            )} />
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{backgroundColor: '#202020', paddingVertical:10,paddingHorizontal:30, borderRadius: 30}}>
            <Text style={{color: '#fff'}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        margin: 10,
    },
    userInfo: {
        alignItems: 'flex-start',
    },
    userName:{
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
    },
    dateAndTime: {
        fontSize: 16,
        padding: 7,
        alignSelf: 'center',
    },
    userPhoneNumber:{
        fontSize:  16,
        color: '#000',
        fontWeight: '900',
    },
    icon: {
        marginHorizontal: 10,
    }
});

export default UsersList;