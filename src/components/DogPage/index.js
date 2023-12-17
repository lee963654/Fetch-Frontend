import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorite, removeFavoriteThunk } from "../../store/session"
import { useModal } from "../../context/Modal"

import "./DogPage.css"


export default function DogPage(dogId) {
    // const { dogId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const sessionUser = useSelector((state) => state.session.user)

    const [dog, setDog] = useState({})

    const inFavorites = sessionUser.favorites.includes(dogId.dogId)

    const handleAdd = async () => {

        sessionStorage.setItem("favorites", JSON.stringify([...sessionUser.favorites, dogId.dogId]))
        return dispatch(addToFavorite(dogId.dogId)).then(closeModal)
    }


    const handleRemove = async () => {
        const favoritesArr = sessionUser.favorites

        for (let i = 0; i < favoritesArr.length; i++) {
            if (dogId.dogId === favoritesArr[i]) {
                favoritesArr.splice(i, 1)
            }
        }
        sessionStorage.setItem("favorites", JSON.stringify([...favoritesArr]))
        return dispatch(removeFavoriteThunk(dogId.dogId)).then(closeModal)
    }

    useEffect(() => {
        const getMatchedDogInfo = async () => {
            const matchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([dogId.dogId]),
                credentials: "include",
            }
            const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs`, matchOptions)
            if (!response.ok) {
                history.push("/login")
            }
            const matchedDog = await response.json()
            const matchedDogObj = matchedDog[0]

            const locationOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([matchedDogObj.zip_code]),
                credentials: "include",
            }
            const locationRes = await fetch(`https://frontend-take-home-service.fetch.com/locations`, locationOptions)

            const matchedLocation = await locationRes.json()

            const locationObj = matchedLocation[0]
            if (!locationRes.ok) {
                history.push("/login")
            }

            const newDogObj = {
                name: matchedDogObj.name,
                age: matchedDogObj.age,
                id: matchedDogObj.id,
                img: matchedDogObj.img,
                breed: matchedDogObj.breed,
                city: locationObj.city,
                county: locationObj.county,
                state: locationObj.state,
                zip_code: locationObj.zip_code
            }

            setDog(newDogObj)
        }
        getMatchedDogInfo()

    }, [])


    return (
        <div className="matched-dog-container">
            <h1>{dog.name}</h1>
            <div className="matched-dog-info">
                <img src={dog?.img} alt={dog.name}></img>
                <p>Name: {dog?.name}</p>
                <p>Age: {dog?.age}</p>
                <p>Breed: {dog?.breed}</p>
                <p>{`${dog.name} is located in ${dog?.county} county, city of ${dog?.city}, ${dog?.state}`}</p>
                {inFavorites &&
                <p>{dog?.name} is already in your favorites</p>
                }
            </div>
            <div className="matched-button-container">
                {/* <button disabled={inFavorites} onClick={handleAdd}>Add to Favorites</button> */}
                {inFavorites ?
                <button onClick={handleRemove}>
                    Remove from Favorites
                </button>
                :
                <button onClick={handleAdd}>
                    Add to Favorites
                </button>

                }
            </div>
        </div>
    )
}
