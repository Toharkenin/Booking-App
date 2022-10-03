import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, 
    TouchableOpacity } from 'react-native';

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

export default function timesList(props) {

    const[activeBtn, setActiveBtn] = useState(false);

    return (   
        <ScrollView style={styles.container}>
            {items.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={{
                        jestifyContent: 'space-between',
                        marginHorizontal: 40,
                        marginVertical: 10,
                        padding: 10,
                        borderRadius: 30,
                        borderColor: '#b89c47',
                        backgroundColor: activeBtn === item.key ? '#b89c47' :'#292929',
                        borderWidth: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'}} 
                    onPress={() => setActiveBtn(item.key)}>
                    <Text style={styles.text}>{item.time}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        backgroundColor: "#292929",
        marginBottom: 10,
        jestifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 18,  
    },
});