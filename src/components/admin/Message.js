import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, 
    FlatList, TouchableOpacity, Alert} from 'react-native';
import CustomButton from '../user/CustomButton';
import { db } from '../../../Firebase';
import Loader from '../user/Loader';
import { onSnapshot, collection, addDoc, deleteDoc, doc} from 'firebase/firestore';

export default function Message() {

    const [headerText, setHeaderText] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [allMessages, setAllMessages] = useState('');
    const [messageExsits, setMessageExits] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        const msgsCollectionRef = collection(db, 'Messages');
        const getMessages = async () => {
            setLoading(true);
            const unsubscribe = onSnapshot(msgsCollectionRef, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach(documentSnapshot => {
                msgs.push({
                    id: documentSnapshot.id,
                    header: documentSnapshot.data().header,
                    body: documentSnapshot.data().body,
                    isShown: documentSnapshot.data().isShown,
                });
                setAllMessages(msgs);
                allMessages.length > 1 ? setMessageExits(true) : setMessageExits(false);
            })
            setLoading(false);
        })};
        getMessages(); 
    }, []);

    const addMessage = async () => {
        const value1 = headerText;
        const value2 = bodyText;
        const docRef = await addDoc(collection(db, "Messages"), {
            header: value1,
            body: value2,
            isShown: true,
          }); 
        setMessageExits(true);
        setHeaderText('');
        setBodyText('');
    };

    const stopShowingMsg = async (id) => {
        Alert.alert('', 'ההודעה נמחקה בהצלחה',
        [{
            text: 'סגירה'
        }]);
        await deleteDoc(doc(db, "Messages", id));
        
        setMessageExits(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>הודעה חדשה ללקוחות</Text>
            <ScrollView>
            <View style={styles.inputsContainer}>
            <TextInput 
                placeholder="כותרת" 
                style={styles.input}
                textAlign='right'
                value={headerText}
                onChangeText={(text) => setHeaderText(text)}/>
            <TextInput 
                placeholder="גוף ההודעה"
                textAlign='right'
                multiline ={true}
                style={styles.inputMessage}
                value={bodyText}
                onChangeText={(text) => setBodyText(text)}/>
            </View>
            {messageExsits ? 
                <CustomButton text="הוספה" style={{marginTop: 30}} onPress={addMessage} disabled/> :
                <CustomButton text="הוספה" style={{marginTop: 30}} onPress={addMessage}/>
            }   
            </ScrollView>
            {!messageExsits ? 
            <Text style={styles.empty}>אין הודעות</Text> : 
            <FlatList
                data={allMessages}
                alwaysBounceHorizontal={false} 
                showsScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    item.isShown ?
                    <>
                        <View style={styles.msgStyle}>
                           <Text style={styles.msgHeader}>{item.header}</Text>
                           <Text style={styles.msgBody}>{item.body}</Text>
                        </View>
                        <TouchableOpacity onPress={() => stopShowingMsg(item.id)} style={styles.button}>
                            <Text style={styles.btnText}>הפסקת הצגה</Text>   
                        </TouchableOpacity>  
                    </> : null
            )} /> }
            {loading ? <Loader /> : null}
        </View>
    );
  };

  const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        header: {
            fontSize: 18,
            fontWeight: '800',
            alignSelf: 'center',
            marginBottom: 16,
            marginTop: 50,
        },
        inputsContainer: {
            marginTop: 20,
            alignItems: 'center',
        },
        input: {
            fontSize: 18,
            width: '80%',
            backgroundColor: '#eee',
            borderRadius: 7,
            height: 40,
        },
        inputMessage: {
            backgroundColor: '#eee',
            fontSize: 18,
            borderRadius: 7,
            marginTop: 30,
            height: 100,
            width: '80%',
        },
        msgStyle: {
            borderWidth: 1,
            borderColor: '#eee',
            alignItems: 'center',
            marginHorizontal: 30,
            padding:20,
        },
        msgHeader: {
            fontSize: 22,
            fontWeight: '800',
            alignSelf: 'center',
            marginBottom: 16,

        },
        msgBody: {
            fontSize: 20,
            fontWeight: '500',
            marginBottom: 16,

        },
        button: {
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 1,
            } ,
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          },
          btnText: {
            fontSize: 16,
            fontWeight: "bold",
            color: '#E0AA3E',
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignSelf: 'center'
          },
          empty: {
            alignSelf: 'center',
            color: '#C0C0C0',
            fontSize: 18,
          },
  });
