const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"

const setUser = (user) => {
    return {
        type: SET_USER,
        user,
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}


export const loginThunk = (user) => async (dispatch) => {
    dispatch(setUser(user))
}

export const logoutThunk = () => async (dispatch) => {
    dispatch(removeUser())
}

export const restoreUser = (user) => async (dispatch) => {
    dispatch(setUser(user))
}


const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            const newState = {...state}
            newState.user = action.user
            return newState
        }
        case REMOVE_USER: {
            const newState = {...state}
            delete newState.user
            return newState
        }
        default:
            return state
    }
}

export default sessionReducer
