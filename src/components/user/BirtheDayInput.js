import React, { useState } from 'react';
import {View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';
import Input from './Input';

const BirthDayInput = ({getDate}) => {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const confirm = (event, selectedDate) => {
        setOpen(false);
        setDate(selectedDate);
        let newDate = moment(selectedDate).format("DD/MM/YYYY");
        setText(newDate);
        if (event?.type === 'dismissed') {
            setDate(date);
            return;
        }
        getDate(newDate);
    };
    return (
        <View>
                <Input name="תאריך לידה"
                    style={{width: '100%',alignItems: 'center',
                    flexDirection: 'row',}}
                    value={text}
                    view={false}
                    iconName="calendar" 
                    showSoftInputOnFocus={false}
                    onPressIn={() => setOpen(true)}
                    />
            {open ? <DateTimePicker 
                value={date}
                mode="date"
                onChange={confirm}
               /> : null}
        </View>
    )
}
export default BirthDayInput;
