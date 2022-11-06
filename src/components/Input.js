import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Input(props) {

    return(
        <View style={styles.container}>
            <TextInput 
                {...props}
                placeholder={props.name} 
                style={styles.input}
                keyboardType={props.keyboardType}
                autoCapitalize='none'
                textAlign='right'
                autoFocus={props.autoFocus}
                />
            <Icon name={props.iconName} size={24} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        marginTop: 25,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        fontSize: 18,
        borderBottomColor: 'gray',
    }
});
