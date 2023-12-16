import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import "./DogPage.css"


export default function DogPage() {
    const { dogId } = useParams()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)

    const [dog, setDog] = useState({})



    useEffect(() => {
        const getMatchedDogInfo = async () => {
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
            if (!locationRes.ok) {
                history.push("/")
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
            <h1>Congratulations! You have matched with {dog.name}!</h1>
            <div className="matched-dog-info">
                <img src={dog.img} alt={dog.name}></img>
                <p>Name: {dog.name}</p>
                <p>Age: {dog.age}</p>
                <p>Breed: {dog.breed}</p>
                <p>{`${dog.name} is located in ${dog.county} county, city of ${dog.city}, ${dog.state}`}</p>
            </div>
            <div className="matched-button-container">
                <button onClick={() => history.push("/")}>Back</button>
                <button onClick={() => alert(`An email has been sent to you with directions on how to bring ${dog.name} home!`)}>Adopt!</button>
            </div>
        </div>
    )
}
