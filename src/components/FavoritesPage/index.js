import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import OpenDogModal from "../OpenDogModal"
import DogPage from "../DogPage"
import "./FavoritesPage.css"


export default function FavoritesPage() {
    const userFavorites = useSelector(state => state?.session?.user?.favorites)
    const history = useHistory()

    const handleMatch = async () => {
        const dogIdArr = []
        for (let dog of userFavorites) {
            dogIdArr.push(dog.id)
        }
        const requestOptionsPost = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogIdArr),
            credentials: "include",
        }
        const dogRes = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", requestOptionsPost)
        const matchedDog = await dogRes.json()
        history.push(`/dogs/${matchedDog.match}`)
    }

    return (
        <div className="favorite-dogs-container">
            <h1>Favorites List</h1>
            <p>Here are a list of your favorite dogs! You can only have a limit of 100 dogs in this list. Click on the match button below and we will find the best possible match for you!</p>
            <button onClick={handleMatch} disabled={userFavorites.length === 0}>Match</button>
            <div className="search-results-container">

                {userFavorites.length ?
                    userFavorites.map(dog => (
                        <OpenDogModal
                            dogInfo={dog}
                            modalComponent={<DogPage dogId={dog} />}
                        />
                    ))
                    :
                    <h2>No Dogs Added</h2>
                }
            </div>
        </div>
    )
}
