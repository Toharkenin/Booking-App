import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const AppointmentList = () => {

    const appointments = useSelector(selectAppointment);
    return (
        <View style={styles.container}>
            {appointments && appointments.map(appointment => {
                return (
                    <ScrollView key={id}>
                        <Text>{appointment.appointments.service}</Text>
                        <Text>{appointment.appointments.date}</Text>
                        <Text>{appointment.appointments.startTime}</Text>
                        <Text>{appointment.appointments.endTime}</Text>
                    </ScrollView>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    section: {
        
    }
});

export default AppointmentList;