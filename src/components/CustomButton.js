import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
// import PropTypes from 'prop-types';

export default function CustomButton(props) {
  return (
    <TouchableOpacity 
        {...props}
        style={[styles.container, {backgroundColor: props.disabled ? '#e0e0e0': 'black'}]} 
        activeOpacity={0.7}
        onPress={props.onPress}>
      <Text style={[styles.text, {color: props.disabled ? '#6a6a6a' : '#fff'}]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

// Button.propTypes = {
//   children: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
// };

// Button.defaultProps = {
//   loading: false,
// };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 80,
    width: '80%',
    marginBottom: 0,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,   
  },
})