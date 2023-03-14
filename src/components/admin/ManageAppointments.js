import React, { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TextInput, Alert, SafeAreaView} from 'react-native';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../user/CustomButton';
import HeaderTabs from './HeaderTabs';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker'
import Popup from '../user/Popup';
import { useNavigation } from '@react-navigation/native';
import AdminCalendar from './AdminCalendar';
import { createAppointmentsList } from '../../util/firebaseApptsSettings';
import { db } from '../../../Firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ManageAppointments() {
   const [daysChecked, setDaysChecked] = useState([]);
   const [checked, setChecked] = useState({
      Sun: false,
      Mon: false,
      Tou: false,
      Wed: false,
      Thu: false,
      Fri: false,
   });
   const [counter, setCounter] = useState(0);
   const [activeBtn, setActiveBtn] = useState("הגדר ימים");
   const [inputValues, setInputValues] = useState({
      month: '',
      duration: '',
      openingTime: '',
      closingTime: '',
   });
   const [date, setDate] = useState('');
   const [showPopup, setShowPopup] = useState(false);
   const navigation = useNavigation();
   
   //hendles checkbox pressed, adds checked day to an array of days
   const onCheckBoxPressed = (checkBox, val, id) => {
      val ?
      (setChecked((prevState) => ({...prevState, [checkBox]:false})),  
          setCounter(counter - 1), removeDayFromArray(id)) :
      (setChecked((prevState)=> ({...prevState, [checkBox]:true})),
          setCounter(counter + 1), addDayToArray(id));
   };

   //add a checked day to the array
   const addDayToArray = (id) => {
      setDaysChecked((prevDay) => [
         ...prevDay, {
             id,
         },
     ])};
   
   //removes an unchecked day from the array
   const removeDayFromArray = (id) => {
      setDaysChecked((current) => 
         current.filter(day => day.id !== id));
   };

   const getDate = (date) => {
      setDate(date);
  };

   // Handler for changing the admin settings inputs
   const inputChangedHendler = (input, enteredValue) => {
      setInputValues((prevState) => {
         return{
            ...prevState, [input]: enteredValue 
      }
   })};

   // Hendler for button press events and store the data firebase
   const confirmPressedHendler = () => {
      docExistsValidation();
      const appointmentsDataByDate = {
         duration: parseInt(inputValues.duration),
         openingTime: parseInt(inputValues.openingTime),
         closingTime: parseInt(inputValues.closingTime),
         date: date,
         isDateExist: true,
      };
      // const appointmentsDataByDays = {
      //    month: inputValues.month,
      //    duration: parseInt(inputValues.duration),
      //    openingTime: parseInt(inputValues.openingTime),
      //    closingTime: parseInt(inputValues.closingTime),
      //    days: daysChecked,
      //    isDateExist: false,
      // };
      
      // activeBtn === 'הגדר ימים' ? (
      // createAppointmentsList(appointmentsDataByDays)) :
      createAppointmentsList(appointmentsDataByDate)
      setShowPopup(true);
      setTimeout(() => {
         setShowPopup(false);
         navigation.goBack;
      }, 4000);
   };

   // Form validation
   const validation = () => {
      if (!inputValues.duration ||
      !inputValues.openingTime ||
      !inputValues.closingTime ) {
         Alert.alert('', 'יש למלא את כל השדות',
         [{
             text: 'סגירה'
         }])}
      else if(inputValues.openingTime > inputValues.closingTime){
         Alert.alert('', 'יש למלא שעות תקינות',
         [{
             text: 'סגירה'
         }])}
      else {    
         docExistsValidation();
      }
   };
   
   const docExistsValidation = async () => {
      const docRef = doc(db, 'Appointments', date);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
            Alert.alert('תאריך זה כבר מוגדר', 'האם אתה בטוח שתרצה לשנות?',
            [{
               text: 'סגירה'
         },
         {text: 'המשך בכל זאת',
         onPress: () => {
            confirmPressedHendler();
         }}])}
      else {
         confirmPressedHendler();
      }
   };
   

    return (
      <View style={styles.container}>
         {showPopup ? <Popup text1="השעות עודכנו בהצלחה!" /> : null}
            <HeaderTabs activeBtn={activeBtn} setActiveBtn={setActiveBtn}/> 
            <ScrollView >
            { activeBtn === 'הגדר ימים' ?
            <View style={styles.daysCheckBoxContainer}>
               <DaysCheckBox text="א'" checked={checked.Sun} onPress={() => onCheckBoxPressed('Sun', checked.Sun, 0)}/>
               <DaysCheckBox text="ב'" checked={checked.Mon} onPress={() => onCheckBoxPressed('Mon', checked.Mon, 1)}/>
               <DaysCheckBox text="ג'" checked={checked.Tou} onPress={() => onCheckBoxPressed('Tou', checked.Tou, 2)}/>
               <DaysCheckBox text="ד'" checked={checked.Wed} onPress={() => onCheckBoxPressed('Wed', checked.Wed, 3)}/>
               <DaysCheckBox text="ה'" checked={checked.Thu} onPress={() => onCheckBoxPressed('Thu', checked.Thu, 4)}/>
               <DaysCheckBox text="ו'" checked={checked.Fri} onPress={() => onCheckBoxPressed('Fri', checked.Fri, 5)}/>
            </View>
            : <AdminCalendar getDate={(e)=>getDate(e)}/> }
            {
            counter || activeBtn === 'הגדר תאריך' ?
            <> 
               <View style={styles.adminSettingsContainer}>
                  {activeBtn === 'הגדר ימים' ? <SelectMonth onSelect={() =>inputValues.month} setSelected={(month) =>inputChangedHendler('month', month)}/> : null}
                  <DurationInput text='זמן לפגישה בדקות:' onChangeText={(duration) =>inputChangedHendler('duration', duration)}/>
                  <View style={{flexDirection: 'row'}}>
                     <TimeInput header='שעת פתיחה:' 
                        placeholder='10:00' 
                        getTime={(time) =>inputChangedHendler('openingTime', time)}
                        value={inputValues.openingTime} />
                     <TimeInput header='שעת סגירה:' 
                        placeholder='21:00' 
                        getTime={(time) =>inputChangedHendler('closingTime', time)}
                        value={inputValues.closingTime} />
                  </View>
               </View>
               <CustomButton text='אישור' onPress={validation}/>
            </> : null
            }
         </ScrollView>
      </View>
    );
  };
 
const DaysCheckBox = (props) => {
      return (
         <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>{props.text}</Text>
            <CheckBox 
               {...props}
               checkedColor='#E0AA3E'
            />
         </View>
      )
   };

  const DurationInput = (props) => {
      return (
         <View style={styles.inputContainer}>
            <Text style={styles.text}>{props.text}</Text>
            <TextInput 
               keyboardType='numeric'
               placeholder='10'
               style={styles.textInput}
               onChangeText={props.onChangeText}
               maxLength={2}
            />
         </View>
      )
  };

  const TimeInput = ( {getTime, placeholder, header}) => {
   const [open, setOpen] = useState(false);
   const [text, setText] = useState("");
   const [time, setTime] = useState("");
   // const [date, setDate] = useState(new Date());

   const onChange = (event, date) => {
      setOpen(false);
      let hours, minutes;
      // if(date !== undefined) {
      // }
      //show the selected time in the input field
      date.getHours() < 10 ? hours = 
         '0' + JSON.stringify(date.getHours()) :   
          hours = JSON.stringify(date.getHours());
      date.getMinutes() < 10 ? minutes =
         '0' + JSON.stringify(date.getMinutes()) :   
         minutes = JSON.stringify(date.getMinutes());
         setTime(date);
      setText(hours + ':' + minutes);
      getTime(hours + minutes);
  };

  const onChangeText =(time) => {
      setText(time);
  }
   return (
      <View style={styles.inputContainer}>
         <Text style={styles.text}>{header}</Text>
         <TextInput 
            placeholder={placeholder}
            style={styles.textInput}
            showSoftInputOnFocus={false}
            onPressIn={() => setOpen(true)}
            value={text}
            onChangeText={onChangeText}
         />
         { open ? <DateTimePicker 
            value={new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
            /> : null }
      </View>
   )
};

  const SelectMonth = (props) => {
      const monthsList = [
         {key: 0, value: 'ינואר'},
         {key: 1, value: 'פברואר'},
         {key: 2, value: 'מרץ'},
         {key: 3, value: 'אפריל'},
         {key: 4, value: 'מאי'},
         {key: 5, value: 'יוני'},
         {key: 6, value: 'יולי'},
         {key: 7, value: 'אוגוסט'},
         {key: 8, value: 'ספטמבר'},
         {key: 9, value: 'אוקטובר'},
         {key: 10, value: 'נובמבר'},
         {key: 11, value: 'דצמבר'},
     ];
   
      return (
         <View style={{marginHorizontal: 10}}>
            <Text style={styles.text}>לאיזה חודש</Text>
            <SelectList 
               setSelected={props.setSelected} 
               onSelect={props.onSelect}
               data={monthsList} 
               save="key"
               placeholder='בחר חודש'
               searchPlaceholder='בחר חודש'
               boxStyles={{backgroundColor: '#f5f5f5', borderWidth: 0}}
               dropdownStyles={{ borderWidth: 0}}
            />
         </View>
      )
  };

  const styles = StyleSheet.create({
      container: {
         backgroundColor: '#fff',
         flex: 1,
         position: 'relative',
      },
      daysCheckBoxContainer: {
         backgroundColor: '#f5f5f5',
         padding: 10,
         justifyContent: 'center',
         flexDirection: 'row',
         margin: 10,
         borderRadius: 10,
      },
      adminSettingsContainer: {
         flex: 1,
      },
      textInput: {
         backgroundColor: '#f5f5f5',
         borderRadius: 10,
         textAlign: 'right',
         padding: 10,
      },
      inputContainer:{
         marginHorizontal: 10,
         flex: 1,
      },
      text: {
         fontSize: 15,
         fontWeight: 'bold',
         marginVertical: 10,
         color: '#202020',
      },
      moreOptionsText: {
         fontSize: 15,
         fontWeight: 'bold',
         alignSelf: 'center',
         marginTop: 10,
      },
  });