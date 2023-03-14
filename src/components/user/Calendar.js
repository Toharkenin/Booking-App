import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

export default function SetCalendar({getDate, ...props}) {

  LocaleConfig.locales['il'] = {
    monthNames: [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר'
    ],
    dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    dayNamesShort: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  };
  LocaleConfig.defaultLocale = 'il';
const [markedDates, setMarkedDates] = useState({});
const [selectedDate, setSelectedDates] = useState('');
    
 const onDayPress = (date) => {
    let markedDates = {};
    markedDates[date] = {selected: true, color: '#E0AA3E', textColor: '#FFFFFF'};
    let newDate = moment(date).format("YYYY-MM-DD");
    setSelectedDates(newDate);
    setMarkedDates(markedDates);
    getDate(newDate);
  };

  return (
      <View>
            <Calendar
            minDate={Date()}
            maxDate={"2030-05-30"}
            markedDates={markedDates}
            selectedDate={selectedDate}
            onDayPress={day => {
              onDayPress(day.dateString);
          }}
            style={styles.calendarStyle}
          theme={{
            calendarBackground: '#fff',
            selectedDayBackgroundColor: '#E0AA3E',
            selectedDayTextColor: '#fff',
            todayTextColor: '#E0AA3E',
            dayTextColor: 'black',
            textDisabledColor: '#A9A9A9',
            selectedDayBackgroundColor: '#E0AA3E',
            monthTextColor: '#E0AA3E',
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            arrowColor: '#E0AA3E',
          }}
            />
          </View>
  );
};

const styles = StyleSheet.create({
  calendarStyle: {
    paddingBottom: 20,
    shadowColor: "#000",
    elevation: 5, 
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  icon: {
    position:'absolute', 
    zIndex: 999, 
    alignSelf: 'flex-end', 
    right:10,
    top: 10,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    color: '#E0AA3E',
    fontWeight: '700',
    fontSize: 18,
  },
})








