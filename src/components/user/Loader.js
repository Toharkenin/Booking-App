import React from 'react';
import {View, StyleSheet, ActivityIndicator, useWindowDimensions} from 'react-native';

export default function Loader () {

    const {height, width} = useWindowDimensions();
    return (
        <View style={[styles.container, {height,width}]}>
            <ActivityIndicator size="large" color="#E0AA3E"/>
        </View>
    );
  };

 const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 10,
        flex: 1,
    },
 });
