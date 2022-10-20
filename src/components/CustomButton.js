import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
// import PropTypes from 'prop-types';

export default function CustomButton(props) {
  return (
    <TouchableOpacity 
        {...props}
        style={styles.container} 
        activeOpacity={0.7}
        disabled={props.disabled}>
      <Text style={styles.text}>{props.text}</Text>
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
    marginTop: 100,
    width: '80%',
    marginBottom: 0,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
})