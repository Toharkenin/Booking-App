import React from 'react';
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
                textAlign='right'
                />
            <Icon name={props.iconName} size={24}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
        alignItems: 'center',
        marginHorizontal: 35,
        marginTop: 15,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1.5,
        fontSize: 18,
    }
});
