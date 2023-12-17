import React from "react"
import { useSelector, useDispatch } from "react-redux"
import OpenDogModal from "../OpenDogModal"
import DogPage from "../DogPage"

export default function FavoritesPage () {
    const userFavorites = useSelector(state => state?.session?.user?.favorites)

    return (
        <div className="search-results-container">
            {userFavorites.length ?
            userFavorites.map(dog => (
                // <OpenDogModal
                //     dogInfo={dog}
                //     modalComponent={<DogPage dogId={dog.id} />}

                // />
                console.log("THIS IS THE DOG INFO IN THE FAV PAGE", dog)
            ))
            :
            <h1>No Favorites</h1>
            }
        </div>
    )
}
