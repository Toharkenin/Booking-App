import { createSlice } from '@reduxjs/toolkit'

export const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        appointment: null,
    },
    reducers: {
        Create_Appointment: (state, action) => {
            state.appointment = action.payload;
        },
        Cancle_Appointment: (state) => {
            state.appointment = null;
        },
    }
  });

  export const {Create_Appointment, Cancle_Appointment} = appointmentSlice.actions;
  export const Select_Appointment = (state) => state.appointment;
  export default appointmentSlice.reducer;