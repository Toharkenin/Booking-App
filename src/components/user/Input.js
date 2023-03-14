import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Input(props) {

    return(
        <View style={styles.container}>
            <Icon name={props.iconName} size={18} color="#E0AA3E" style={{marginLeft: 7}}/>
            <Icon2 name={props.iconName2} size={18} color="#E0AA3E" style={{marginLeft: 7}}/>
            <TextInput 
                {...props}
                placeholder={props.name} 
                style={styles.input}
                keyboardType={props.keyboardType}
                autoCapitalize='none'
                textAlign='right'
                autoFocus={props.autoFocus}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '70%',
        marginTop: 40,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        fontSize: 18,
        borderBottomColor: 'gray',
    }
});
