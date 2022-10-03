import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import logo from '../assets/logo-light.png';
import Icon from 'react-native-vector-icons/Ionicons';
 
export default function HeaderTab (navigation) {

    const [openMenu, setOpenMenu] = useState(false);

  return(
    <View style={styles.container}>
        <Icon style={{color: "#fff"}} name="menu" size={30} />
        <Text style={styles.text}>קביעת תור חדש</Text>
        <TouchableOpacity opasity={1} >
            <Icon style={{color: "#fff", marginRight: 10}} name="menu" size={30} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
})