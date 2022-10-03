import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

export default class SetCalendar extends React.Component {
  state = {
      markedDates: {},
      // startDate: '',
  }
    
  onDayPress = date => {
      let markedDates = {};
      markedDates[date] = { selected: true, color: '#b89c47', textColor: '#FFFFFF' };
      // let serviceDate = moment(date);
      // serviceDate = serviceDate.format("DD.MM.YYYY");
      this.setState({
          // selectedDate: serviceDate,
          markedDates: markedDates,
      });
  };

 render() {
  return (
    <View style={styles.container}>
      <Calendar
      minDate={Date()}
      maxDate={"2030-05-30"}
      markedDates={this.state.markedDates}
      onDayPress={day => {
        this.onDayPress(day.dateString);
      }}
     theme={{
      calendarBackground: '#292929',
      selectedDayBackgroundColor: '#b89c47',
      selectedDayTextColor: '#fff',
      todayTextColor: '#b89c47',
      dayTextColor: '#ffff',
      textDisabledColor: '#A9A9A9',

      monthTextColor: '#b89c47',
      textMonthFontWeight: 'bold',
      textDayFontWeight: 'bold',
      arrowColor: '#b89c47',
    }}
       />
    </View>

  );
}
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
})
