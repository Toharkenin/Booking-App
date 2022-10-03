import React, { useRef, useState } from 'react';
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

function SignUpWithPhone({ navigation }) {
  const passwordRef = useRef();

  const [phoneNumber, setPhoneNumber] = useState('');

  //const loading = useSelector(state => state.auth.loading);

  /*function handleSubmit() {
    dispatch(signInRequest(email, password));
  }*/

  /*const onSignPressed = () => {
    console.warn('Sign in');*/
  return (
    <Background>  
      <View style={styles.container}>

        <Image source= {logo} style={styles.logo} resizeMode="center" />

        <Form>
          <FormInput
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="הכנס מספר נייד"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          
          <SubmitButton >
            {'שלחו לי קוד חד פעמי'}
          </SubmitButton>
        </Form>

         <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>לא קיבלתי SMS</SignLinkText>
        </SignLink>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>התחברות באמצעות שם משתמש</SignLinkText>
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


export default SignUpWithPhone;