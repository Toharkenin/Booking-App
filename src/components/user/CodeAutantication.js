import React from 'react';
import {Text, Pressable} from 'react-native';
import CustomButton from './CustomButton';
import Input from './Input';

export default function CodeAutantication() {

    const [code, setCode] = useState("");
    


    return (
        <>
            <Text style={styles.text}>הזן את הקוד שקיבלת</Text>
            <Input 
                value={code}
                name="קוד" 
                iconName2="message-processing-outline"
                keyboardType="numeric"
                onChangeText={setCode}
            />
            <CustomButton text="התחברות" onPress={()=>signin()}/>
            <Pressable onPress={()=>requestOTP()}>
                <Text style={styles.text}>
                    לא קיבלתי קוד, שלחו לי שוב
                </Text>
            </Pressable>
        </>
    )
}