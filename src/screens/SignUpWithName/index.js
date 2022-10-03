import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';

import Background from '../../components/Background';

import logo from '../../assets/logo-light.png';

import {
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

function SignUpWithName({ navigation }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');

  const onSignUpPressed = () => {
    console.warn('onSignUpPressed');
  };

  function onSignLinkPressed(){
    navigation.navigate('SignupWithPhoneNumber');
  };


  // const loading = useSelector(state => state.auth.loading);

  /*function handleSubmit() {
    dispatch(signInRequest(email, password));
  }*/
  return (
    <Background>  
      <View style={styles.container}>

        <Image source= {logo} style={styles.logo} resizeMode="center" />

        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="שם פרטי"
            returnKeyType="next"
            value={firstName}
            onChangeText={setFirstName}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="שם משפחה"
            returnKeyType="next"
            value={lastName}
            onChangeText={setLastName}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="תאריך לידה"
            returnKeyType="next"
            value={birthday}
            onChangeText={setBirthday}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="אימייל"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />
          
          <SubmitButton onPress={onSignUpPressed}>
            הרשמה 
          </SubmitButton>
        </Form>

         <SignLink onPress={onSignLinkPressed}>
          <SignLinkText>יש לי כבר חשבון</SignLinkText>
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
});


export default SignUpWithName;