import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
    name: "date",
    initialState: {
        date: null,
    },
    reducers: {
        fetchAppointments: (state, action) => {
            state.date = action.payload;
        },
        deleteAppointments: (state) => {
            state.date = null;
        },
    }
  });

  export const {fetchAppointments, deleteAppointments} = dateSlice.actions;
  export default dateSlice.reducer;