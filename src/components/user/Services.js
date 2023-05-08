import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


const servicesArray = [
  {name: 'תספורת'},
  {name: 'תספורת וזקן'},
  {name: 'תספורת ושעווה'}
]

export default function Services({getService, onXPressed}) {

  const onServicePressed = (service) => {
      getService(service);
  }

    return(
        <View style={styles.container}>
          <Pressable onPress={onXPressed} style={styles.icon}>
                  <Icon name="close-outline" size={40} color="#E0AA3E" />
          </Pressable>
          <View style={{paddingBottom: 40}}>
         <Text style={styles.header}>איזה טיפול תרצה לבחור?</Text>
        {servicesArray.map((item, index) => (
              <Pressable 
                  key={index} 
                  style={styles.btn}
                  onPress={() => onServicePressed(item.name)}>
                  <Text style={styles.btnText}>{item.name}</Text>
              </Pressable>
          ))}
          </View>
        </View>
    )
  };

const Service = (props) => {
  return (
    <Pressable activeOpacity={0.9} onPress={props.onPress}>
      <View style={[{backgroundColor: props.color}, styles.btn]} >
        <Text style={styles.btnText}>{props.text}</Text>
      </View>     
    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    marginTop: 15,
    height: 400,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 5, 
  },
  icon: {
    position:'absolute', 
    zIndex: 999, 
    alignSelf: 'flex-start', 
    marginTop: 5,
    marginLeft: 5,
  }, 
  header: {
    fontSize: 18,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 16,
        color: '#E0AA3E'
  },
  btn: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    width: 140,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#E0AA3E',
    alignSelf: 'center',
  },
});