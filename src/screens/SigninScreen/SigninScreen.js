import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/user.png';

const SigninScreen = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { height } = useWindowDimensions();
    const onSignPressed = () => {
        console.warn('Sign in');
    };
    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    };
    const onFacebookPressed = () => {
      console.warn('onFcebookPressed');
    };
    const onGooglePressed = () => {
      console.warn('onGooglePressed');
    };
    const onNewAccountPressed = () => {
      console.warn('onNewAccountPressed');
    };
    return(
      <ScrollView showsVerticalScrollIndicator={false}> 
        <View style={styles.root}>
            <Image 
              sourse={Logo}
              style={[styles.logo, { height: height *0.3}]}
              resizeMode="contain" />

            <CustomInput
              placeholder="שם משתמש" 
              value={userName}
              setValue={setUserName}
              />
            <CustomInput
              placeholder="סיסמא"
              value={password}
              setValue={setPassword}
              secureTextEntry
              />
            <CustomButton
              text="כניסה"
              onPress={onSignPressed}
              type="PRIMARY"
              />
            <CustomButton
              text="שכחתי סיסמה"
              onPress={onForgotPasswordPressed}
              type="TERTIARY"
              />  
            <CustomButton 
              text="התחבר באמצעות פייסבוק" 
              onPress={onFacebookPressed}
              bgColor="#E7EAF4"
              fgColor= "#4765a9"
              />
            <CustomButton 
              text="התחבר באמצעות גוגל" 
              onPress={onGooglePressed}
              bgColor="#FAE9EA"
              fgColor="#DD4D44"
              />
            <CustomButton 
              text="אין לי חשבון" 
              onPress={onNewAccountPressed}
              type="TERTIARY"
              />

        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: "70%",
        height: 100,
    },
    root:{
        alignItems: 'center',
        padding: 20,
    },
    
});
export default SigninScreen;