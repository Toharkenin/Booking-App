import { db } from '../../Firebase';
import { setDoc, doc, getDoc, writeBatch } from 'firebase/firestore';

export function createAppointmentsList(appt) {
    let appointments = [];
    let startTime = appt.openingTime;
    let endTime;
    let minutes;
    let index = 0;

    //create a list of appointments according to the menegment form 
    while (startTime < appt.closingTime) {
        if ((startTime + appt.duration) % 100 < 60)
            endTime = startTime + appt.duration;
        else {
            minutes = startTime % 100;
            minutes + appt.duration >= 60 ? 
            minutes = minutes + appt.duration - 60 : 
            minutes = appt.duration;
            endTime = (Math.floor(startTime / 100) + 1) * 100 + minutes;
        }
        appointments.push({
            startTime: `${Math.floor(startTime / 100)}:${startTime % 100}`,
            endTime: `${Math.floor(endTime / 100)}:${endTime % 100}`,
            available: true,
            userId: "",
            index: index,
            date: appt.date,
        });
        startTime = endTime;
        index++;
    }
    if(!appt.isDateExist) {
        createArrayOfDates(appt.month, appt.days, appointments); 
    } else {
        //add or update the appointments setting in the db
        addAppointmentsToFirebase(appointments, appt.date);
    }
    
};


function createArrayOfDates(month, days, appointments) {
    const dates = [
        new Date(2023, month, 1),
        new Date(2023, month, 2),
        new Date(2023, month, 3),
        new Date(2023, month, 4),
        new Date(2023, month, 5),
        new Date(2023, month, 6),
        new Date(2023, month, 7)
    ];
    for(let i = 0; i < days.length; i++) {
        const filteredDate = dates.filter(date => {
            if(date.getDay() !== days[i].id)
                return false;
            if (date.getMonth() !== month) 
                return false
            return true;
    })
    console.log(filteredDate[0].getMonth());
    // while (filteredDate[0].getMonth()===month) {
    //     let newDate = format(filteredDate[0], 'yyyy-MM-dd');
    //     addAppointmentsToFirebase(appointments, newDate);
    //     filteredDate[0].setDate(7);
    //     }
    }
}

async function addAppointmentsToFirebase(appointments, date) {
    const docRef = doc(db, 'Appointments', date);
    const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            //TO DO: ask if the admin wants to change for sure
            // writeBatch.update(docSnap, {'appointments': appointments});
        }
        else {
            const newDate = await setDoc(doc(db, 'Appointments', date),
                {
                    date: date,
                    appointments: appointments,
                })
            newDate;
        }

};