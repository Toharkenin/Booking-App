import { createSlice } from '@reduxjs/toolkit'

  export const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        appointment: null,
    },
    reducers: {
        set: (state, action) => {
            state.appointment = action.payload;
        },
        add: (state, action) => {
            state.appointment = action.payload;
        },
        complete: (state) => {
            state.appointment = null;
        },
    }
  });

  export const {set, add, complete} = appointmentSlice.actions;
  export default appointmentSlice.reducer;