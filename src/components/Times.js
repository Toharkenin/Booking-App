import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

const items = [
    { time: "10:00", key: "1"},
    { time: "10:15", key: "2"},
    { time: "10:30", key: "3"},
    { time: "10:45", key: "4"},
    { time: "11:00", key: "5"},
    { time: "11:15", key: "6"},
    { time: "11:30", key: "7"},
    { time: "11:45", key: "8"},
    { time: "12:00", key: "9"},
    { time: "12:15", key: "10"},
    { time: "12:30", key: "12"},
    { time: "12:45", key: "13"},
    { time: "13:00", key: "14"},
    { time: "13:15", key: "15"},
    { time: "13:30", key: "16"},
    { time: "13:45", key: "17"},
    { time: "14:00", key: "18"},
    { time: "14:15", key: "19"},
    { time: "14:30", key: "20"},
];

export default function timesList({getTime, ...props}) {

    const onTimePressed = (time) => {
      const t = time;
        getTime(t);
    }
    return (  
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onXPressed} style={styles.icon}>
                <Icon name="x" size={32} />
            </TouchableOpacity>
          <Text style={styles.header}>לאיזה שעה תרצה לקבוע?</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.btn}
                    onPress={() => onTimePressed(item.time)}>
                    <Text style={styles.btnText}>{item.time}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
        height: 500,
      },
      icon: {
        position:'absolute', 
        zIndex: 999, 
        alignSelf: 'flex-end', 
        right:10,
      },
      header: {
        fontSize: 20,
        fontFamily: "Helvetica",
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#002'
      },
      btn: {
        alignSelf: 'center',
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        elevation: 10, 
        marginTop: 30,
        // marginBottom: 15,
        width: 200,
        borderRadius: 10,
      },
      btnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#b89c47",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center'
      },
});