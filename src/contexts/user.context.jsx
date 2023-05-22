import {createContext, useEffect, useReducer} from 'react'
import {createUserFromAuth, onUserAuthChangeListener} from "../utils/firebase/firebase.utils";

const INIT_STATE = {
    currentUser: null
}

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {currentUser: payload};
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
} 

export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INIT_STATE);
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }
    const value = {currentUser, setCurrentUser}
    useEffect(() => {
        const unsubscribe = onUserAuthChangeListener((user) => {
            if (user) {
                createUserFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}
