import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Calendar from '../../../components/Calendar';
import TimeList from '../../../components/TimesList';
import HeaderTab from '../../../components/HeaderTab';
import CustomButton from '../../../components/CustomButton';
// import NavigationMenu from '../../../components/NavigationMenu';
 
function SetDateTime () {

  return(
    <>
    
    <View style={{backgroundColor: 'black', flex: 1}}>
      <HeaderTab />
      {/* <NavigationMenu /> */}
      <Calendar />
      {/* <Text style={styles.text}>בחירת שעה עבור תאריך: </Text> */}
      <TimeList />
      <CustomButton style={styles.button} text="בחירת תור"/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 16,
    marginRight: 10,
  }
});

export default SetDateTime;
