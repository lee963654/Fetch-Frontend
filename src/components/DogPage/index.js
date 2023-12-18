import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorite, removeFavoriteThunk } from "../../store/session"
import { useModal } from "../../context/Modal"
import { logoutThunk } from "../../store/session"

import "./DogPage.css"


export default function DogPage({ dogId }) {

    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const sessionUser = useSelector((state) => state.session.user)
    const [dog, setDog] = useState({})
    console.log("CHECKING THE LENGTH OF FAVORITES ARR IN DOG PAGE", sessionUser)

    const inFavorites = () => {
        for (let dog of sessionUser?.favorites) {
            if (dogId.id === dog.id) return true
        }
        return false
    }

    const handleAdd = async () => {

        sessionStorage.setItem("favorites", JSON.stringify([...sessionUser.favorites, dogId]))
        return dispatch(addToFavorite(dogId)).then(closeModal)
    }


    const handleRemove = async () => {
        const favoritesArr = sessionUser.favorites

        for (let i = 0; i < favoritesArr.length; i++) {
            if (dogId?.id === favoritesArr[i]?.id) {
                favoritesArr.splice(i, 1)
            }
        }
        sessionStorage.setItem("favorites", JSON.stringify([...favoritesArr]))
        return dispatch(removeFavoriteThunk(dogId)).then(closeModal)
    }


    useEffect(() => {
        const getMatchedDogInfo = async () => {
            const matchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([dogId.id]),
                credentials: "include",
            }
            const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs`, matchOptions)
            if (!response.ok) {
                dispatch(logoutThunk())
                sessionStorage.clear()
                history.push("/")
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

            const newDogObj = {
                name: matchedDogObj?.name,
                age: matchedDogObj?.age,
                id: matchedDogObj?.id,
                img: matchedDogObj?.img,
                breed: matchedDogObj?.breed,
                city: locationObj?.city,
                county: locationObj?.county,
                state: locationObj?.state,
                zip_code: locationObj?.zip_code
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
                {inFavorites() &&
                    <p>{dog?.name} is already in your favorites</p>
                }
                {sessionUser?.favorites?.length > 99 &&
                    <p>You cannot add anymore dogs to your favorites</p>
                }
            </div>
            <div className="matched-button-container">

                {inFavorites() ?
                    <button onClick={handleRemove}>
                        Remove
                    </button>
                    :
                    <button disabled={sessionUser?.favorites?.length > 99} onClick={handleAdd}>
                        Add
                    </button>
                }
                <button onClick={() => closeModal()}>Close</button>
            </div>
        </div>
    )
}
