import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'


const items = [
  { name: "תספורת"},
  { name: "תספורת + זקן"},
  { name: "תספורת + שעווה"},

];
export default function Services({getService, ...props}) {

  const onServicePressed = (service) => {
    const t = service;
      getService(t);
  }

    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={props.onXPressed} style={styles.icon}>
                <Icon name="x" size={32} />
            </TouchableOpacity>
          <Text style={styles.header}>איזה טיפול תרצה לבחור?</Text>
          {items.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.btn}
                    onPress={() => onServicePressed(item.name)}>
                    <Text style={styles.btnText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
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
    width: 200,
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