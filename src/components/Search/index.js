import React, { useState } from "react"


export default function Search () {
    const [breed, setBreed] = useState("")
    const getBreeds = async () => {
        const breedOptions = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {credentials: "include"})
        const res = await breedOptions.json()
        return res
    }
    const allBreeds = getBreeds()
    console.log(allBreeds)


    // const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {credentials: "include"}).then((response) => response.json()).then((breeds) => {return breeds})

    // const gettingBreeds = async () => {
    //     const test = await allBreeds
    //     return test
    // }


    return (
        <div>
            <label>
                Dog Breeds
            </label>
            {/* <select value={breed} onChange={(e) => setBreed(e.target.value)}>
            {allBreeds.map((option) =>
            <option value={option.value}>
                {option}
            </option>
            )}
            </select> */}
        </div>
    )
}
