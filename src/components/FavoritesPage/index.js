import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import OpenDogModal from "../OpenDogModal"
import DogPage from "../DogPage"

export default function FavoritesPage() {
    const userFavorites = useSelector(state => state?.session?.user?.favorites)
    const [favorites, setFavorites] = useState([])
    const [favState, setFavState] = useState()



    useEffect(() => {
        const gettingFavList = async () => {
            const requestOptionsPost = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userFavorites),
                credentials: "include",
            }
            const responseDogList = await fetch("https://frontend-take-home-service.fetch.com/dogs", requestOptionsPost)
            const favDogList = await responseDogList.json()
            setFavorites(favDogList)
        }
        gettingFavList()

    }, [])
    console.log("THE FAV DOG LIST from USE SELECTOR", userFavorites)
    console.log("THE FAV DOG LIST COUNT from USE SELECTOR", favorites)


    return (
        <div>
            <h1>Favorites List</h1>
            <div className="search-results-container">

                {favorites.length ?
                    favorites.map(dog => (
                        <OpenDogModal
                            dogInfo={dog}
                            modalComponent={<DogPage dogId={dog.id} />}

                        />
                    ))
                    :
                    <h2>No Dogs Added</h2>
                }
            </div>
        </div>
    )
}
