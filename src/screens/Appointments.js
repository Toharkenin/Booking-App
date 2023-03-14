import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Appointments () {

    return (
        <View style={{backgroundColor: '#000', flex:1}}>
            <Text style={styles.empty}>אין תורים להציג</Text>
            {/* <LottieView
                source={require('../assets/lottie/98089-loader')} 
                style={styles.emptyListedAnimation}
                autoPlay /> */}
        </View>
    )
  };

 const styles = StyleSheet.create({
    emptyListedAnimation: {
        height: 140,
        width: 140,
        alignSelf: 'center',
    },
    empty: {
        alignSelf: 'center',
        color: 'rgba(255,255,255,1)',
        fontSize: 24,
        fontWeight: '700',
    }
 });
