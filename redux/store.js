import {legacy_createStore as createStore, combineReducers} from 'redux';
import userSlice from './reducers/userSlice';
import dateSlice from './reducers/dateSlice';
import appointmentSlice from './reducers/appointmentSlice';

const rootReducer = combineReducers({
    appts: dateSlice,
    user: userSlice,
    appointmentDetails: appointmentSlice
})

export const store = createStore(rootReducer);
