export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

const INIT_STATE = {
    currentUser: null
}

export const userReducer = (state = INIT_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {currentUser: payload};
        default:
            return state;
    }
}
