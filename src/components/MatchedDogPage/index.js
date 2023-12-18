import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutThunk, removeFavoriteThunk } from "../../store/session"


export default function MatchedDogPage() {
    const { dogId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [dog, setDog] = useState({})

    const handleAdopt = async () => {
        const favoritesArr = sessionUser.favorites
        console.log("THIS IS THE SESSION FAVORITS ARRAY", favoritesArr)
        for (let i = 0; i < favoritesArr.length; i++) {
            if (dogId === favoritesArr[i]?.id) {
                favoritesArr.splice(i, 1)
            }
        }
        sessionStorage.setItem("favorites", JSON.stringify([...favoritesArr]))
        dispatch(removeFavoriteThunk(dogId))
        alert(`We have sent an email to ${sessionUser?.email} with directions on how to bring ${dog?.name} home!`)
        history.push("/favorites")

    }

    useEffect(() => {
        const matchedDog = async () => {
            const matchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([dogId]),
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
        matchedDog()
    }, [])

    console.log("THIS IS THE DOG IN THE MATCHED DOG PAGE", dog)

    return (
        <div className="matched-dog-container">
            <h1>{`We have matched you with ${dog.name}!`}</h1>
            <div className="matched-dog-info">
                <img src={dog?.img} alt={dog.name}></img>
                <p>Name: {dog?.name}</p>
                <p>Age: {dog?.age}</p>
                <p>Breed: {dog?.breed}</p>
                <p>{`${dog.name} is located in ${dog?.county} county, city of ${dog?.city}, ${dog?.state}`}</p>
            </div>
            {/* <div className="matched-button-container">
                <button onClick={alert(`We have sent an email to ${sessionUser.email}`)}>Adopt</button>
            </div> */}
            <button onClick={handleAdopt}>Adopt</button>
        </div>
    )
}
