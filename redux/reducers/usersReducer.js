let defaultState = {
    selectedItems: {
        firstName: '', 
        lastName: '',
        phoneNumber: '',
    },
}

let cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'add_new_user': {

        }
        case 'is_logged_in': {

        }
        default: 
            return state;
    }
};

export default cartReducer;