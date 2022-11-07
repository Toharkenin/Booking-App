import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather'

export default function SetCalendar({getDate, ...props}) {

const [markedDates, setMarkedDates] = useState({});
const [selectedDate, setSelectedDates] = useState('');
    
 const onDayPress = (date) => {
    setMarkedDates[date] = {selected: true, color: '#b89c47', textColor: '#FFFFFF'};
    let newDate = moment(date).format("DD/MM/YYYY");
    setSelectedDates(newDate);
    setMarkedDates(markedDates);
    getDate(newDate);
  };

  return (
      <View style={styles.container}>
            <TouchableOpacity onPress={props.onXPressed} style={styles.icon}>
                <Icon name="x" size={32} />
            </TouchableOpacity>
            <Calendar
            minDate={Date()}
            maxDate={"2030-05-30"}
            markedDates={markedDates}
            onDayPress={day => {
                onDayPress(day.dateString);
            }}
            style={styles.calendarStyle}
          theme={{
            calendarBackground: '#fff',
            selectedDayBackgroundColor: '#b89c47',
            selectedDayTextColor: '#fff',
            todayTextColor: '#b89c47',
            dayTextColor: 'black',
            textDisabledColor: '#A9A9A9',

            monthTextColor: '#b89c47',
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            arrowColor: '#b89c47',
          }}
            />
            {/* <Text style={styles.text}>אין תורים להציג בתאריך זה</Text> */}
            <Text style={styles.text}>{selectedDate}</Text>
          </View>
  );
};

const styles = StyleSheet.create({
  calendarStyle: {
    paddingTop: 30,
    paddingBottom: 50,
    height: 470,
    shadowColor: "#000",
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24, 
  },
  icon: {
    position:'absolute', 
    zIndex: 999, 
    alignSelf: 'flex-end', 
    right:10,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    color: '#b89c47',
    fontWeight: '700',
    fontSize: 18,
  },
})








