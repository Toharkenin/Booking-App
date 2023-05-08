import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function CustomButton(props) {
  return (
    <TouchableOpacity 
        {...props}
        style={[styles.container, {backgroundColor: props.disabled ? '#DFBD69': '#E0AA3E'}, props.style]} 
        activeOpacity={0.7}
        onPress={props.onPress}>
      <Text style={[styles.text, {color: '#fff'}]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    width: '50%',
    borderRadius: 50,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,   
  },
})