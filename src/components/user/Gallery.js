import React from 'react';
import {View, Text, StyleSheet, Image, Modal, Alert, SafeAreaView, ScrollView} from 'react-native';
import img from '../../assets/danny.png';
import img2 from '../../assets/drawer-img.jpg';

export default function Gallery (props) {

    return (
        <View style={{marginTop: 60}}>
        <Text style={styles.header}>קולקציית התספורות</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <Image source={img} style={styles.img} resizeMode="contain"/>
            <Image source={img} style={styles.img} resizeMode="contain"/>
            <Image source={img} style={styles.img} resizeMode="contain"/>
            <Image source={img} style={styles.img} resizeMode="contain"/>
      </ScrollView>
      </View>
    );
  };

const styles = StyleSheet.create({
   img: {
        height: 170,
        width: 170,
        marginHorizontal: 5,
        borderRadius: 20,
   },
   header: {
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center',
        marginBottom: 10,
   },
})