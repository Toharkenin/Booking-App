import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


export default function Services({getService}) {
  const [serviceType, setServiceType] = useState("");
  const onServicePressed = (service) => {
      setServiceType(service);
      getService(serviceType);
  }

    return(
        <View style={styles.container}>
         <Text style={styles.header}>איזה טיפול תרצה לבחור?</Text>
        <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <Service color="#3ee0aa" text='תספורת' onPress={() => onServicePressed('תספורת')}/>
            <Service color="#fbf3e5" text='תספורת + זקן' onPress={() =>onServicePressed('תספורת + זקן')}/>
            <Service color="#E0AA3E" text='תספורת + שעווה' onPress={() =>onServicePressed('תספורת + שעווה')}/>
        </View>
        </View>
    )
  };

const Service = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={props.onPress}>
      <View style={[{backgroundColor: props.color}, styles.btn]} >
        <Text style={styles.btnText}>{props.text}</Text>
      </View>     
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 16,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 5, 
  },
  header: {
    fontSize: 18,
    fontFamily: "Helvetica",
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: 10,
    color: '#000'
  },
  btn: {
    alignSelf: 'center',
    shadowColor: "#000",
    elevation: 1, 
    marginTop: 20,
    width: 120,
    borderRadius: 5,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 16,
    color: "#000",
    alignSelf: 'center'
  },
});