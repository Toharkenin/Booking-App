import React, { useState } from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import Input from '../components/Input';

const BirthDayInput = ({getDate}) => {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const confirm = (selectedDate) => {
        setDate(selectedDate);
        let newDate = moment(selectedDate).format("DD/MM/YYYY");
        setText(newDate);
        setOpen(false);
        getDate(newDate);
    };
    return (
        <View>
                <Input name="תאריך לידה"
                    style={{width: '100%',alignItems: 'center',
                    flexDirection: 'row',}}
                    value={text}
                    iconName="calendar" 
                    showSoftInputOnFocus={false}
                    onPressIn={() => setOpen(true)}
                    />
            <DatePicker 
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={confirm}
                onCancel={() => {
                    setOpen(false)
                }}/>
        </View>
    )
}
export default BirthDayInput;
