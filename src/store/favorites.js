const ADD_FAVORITE = "favotie/addFavorite"

const addFavorite = (dogId) => {
    return {
        type: ADD_FAVORITE,
        dogId,
    }
}


export const addToFavorite = (dogId) => async (dispatch) => {
    dispatch(addFavorite(dogId))
}


const initialState = { favorites: [] }

const favoritesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FAVORITE: {
            const newState = { favorites: [...state.favorites]}
            newState.favorites.push(action.dogId)
            return newState
        }

        default:
            return state
    }
}

export default favoritesReducer
