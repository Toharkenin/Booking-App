import {legacy_createStore as createStore} from 'redux';
import reducer from './reducers/userSlice';

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState);
    return store;
}




// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from './reducers/userSlice';

// const store = configureStore({
//   reducer: {
//     user: userSlice.reducer
//   }
// });
// export default store;