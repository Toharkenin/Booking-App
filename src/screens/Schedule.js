import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Calendar from '../components/Calendar';

const dates = [
    {
        date: '23/10/22',
        weekDay: 'היום'
    },
    {
        date: '23/10/22',
        weekDay: 'מחר'
    },
    {
        date: '23/10/22',
        weekDay: 'רביעי'
    },
    {
        date: '23/10/22',
        weekDay: 'חמישי'
    },
    {
        date: '23/10/22',
        weekDay: 'שישי'
    },
    {
        date: '23/10/22',
        weekDay: 'ראשון'
    },
]

export default function Schedule() {
    return (
        <View>
            {/* <Calendar /> */}
            <PickDay />
        </View>
    )
  };

function PickDay(props) {
    return (
        <View>
            <Text>{props.header}</Text>
            <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
                {props.dates.map((item, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={styles.pickDay}
                        activeOpacity={0.8}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.dayText}>{item.weekDay}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'space-between',
    },
    pickDay: {
        backgroundColor: '#b89c47',
        padding: 20,
        alignItems: 'center',
        borderColor: '#fff',
    },
    dateText: {},
    dayText: {},
})