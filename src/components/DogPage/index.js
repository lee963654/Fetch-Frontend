import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"


export default function DogPage() {
    const { dogId } = useParams()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)

    const [dog, setDog] = useState({})

    const { age, breed, id, img, name, zip_code } = dog
    const {email} = sessionUser

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
            const matchedDog = await response.json()
            console.log("THIS IS THE DOG INFO IN THE DOG PAGE", matchedDog)
            setDog(matchedDog[0])
        }
        getMatchedDogInfo()
        console.log("THIS IS THE DOG", dog)
    }, [])
    console.log("THIS IS THE DOG OUTSIDE THE USEEFFECT", dog)

    return (
        <div>
            <h1>Congradulations! You have matched with {name}!</h1>
            <div>
                <p>
                    {name}
                </p>
                <p>
                    {breed}
                </p>
                <p>
                    {age}
                </p>
                <p>
                    {zip_code}
                </p>
                <img src={img} style={{width: 350, height: 350}} alt={name}></img>
            </div>
            <button onClick={() => history.push("/")}>Back to Searches</button>
            <button onClick={() => alert(`An email has been sent to ${email} on how to bring ${name} home!`)}>Bring {name} home!</button>
        </div>
    )
}
