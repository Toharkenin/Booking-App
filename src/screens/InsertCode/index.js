import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';

import Background from '../../components/Background';

import logo from '../../assets/logo-light.png';

import {
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

function InsertCode({ navigation }) {

  const [codeSent, setCodeSent] = useState('');

  const onConfirmCodePressed = () => {
    console.warn('onSignUpPressed');
};

const hendelPhoneNumber = () => {
    connsole.log("onPhoneNumber");
};

  //const loading = useSelector(state => state.auth.loading);

  /*function handleSubmit() {
    dispatch(signInRequest(email, password));
  }*/
  return (
    <Background>  
      <View style={styles.container}>

        <Image source= {logo} style={styles.logo} resizeMode="center" />

        <View style={styles.form}>
          <FormInput
            autoCorrect={false}
            keyboardType="numeric"
            initialCountry="il"
            autoCapitalize="none"
            placeholder="קוד"
            returnKeyType="next"
            value={codeSent}
            onChangeText={setCodeSent}/>
          
          <SubmitButton onPress={onConfirmCodePressed}>
            כניסה
          </SubmitButton>
        </View>

         <SignLink onPress={() => navigation.navigate('Dashboard')}>
          <SignLinkText>לא קיבלתי קוד, שלחו לי שוב בבקשה!</SignLinkText>
        </SignLink>
         
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 40,
    },
    logo: {
      height: 220,
      weight: 220,
    },
    form: {
        alignSelf: 'stretch',
        marginTop: 50,
    },
});


export default InsertCode;