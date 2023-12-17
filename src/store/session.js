const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"
const ADD_FAVORITE = "session/addFavorite"
const REMOVE_FAVORITE = "session/removeFavorite"

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

const addFavorite = (dogId) => {
    return {
        type: ADD_FAVORITE,
        dogId,
    }
}

const removeFavorite = (dogId) => {
    return {
        type: REMOVE_FAVORITE,
        dogId
    }
}


export const loginThunk = (user) => async (dispatch) => {
    dispatch(setUser(user))
}

export const logoutThunk = () => async (dispatch) => {
    dispatch(removeUser())
}

export const restoreUserThunk = (user) => async (dispatch) => {
    dispatch(setUser(user))
}

export const addToFavorite = (dogId) => async (dispatch) => {
    dispatch(addFavorite(dogId))
}

export const removeFavoriteThunk = (dogId) => async (dispatch) => {
    dispatch(removeFavorite(dogId))
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
        case ADD_FAVORITE: {
            const newState = {...state}
            newState.user.favorites.push(action.dogId)
            return newState
        }
        case REMOVE_FAVORITE: {
            const newState = {...state}
            for (let i = 0; i < newState.user.favorites.length; i++) {
                if (newState.user.favorites[i] === action.dogId) {
                    newState.user.favorites.splice(i, 1)
                }
            }
            return newState
        }
        default:
            return state
    }
}

export default sessionReducer
