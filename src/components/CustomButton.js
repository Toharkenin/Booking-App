import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
// import PropTypes from 'prop-types';

export default function CustomButton(props) {
  return (
    <TouchableOpacity style={styles.container} >
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
    height: 46,
    backgroundColor: '#b89c47',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 100,

  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})