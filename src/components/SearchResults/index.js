import React, { useEffect, useState } from "react"

export default function SearchResults({ results }) {
    // const [searchResults, setSearchResults] = useState([])

    // useEffect(() => {
    //     console.log("in the useeffect")
    //     const getDogInfo = async (results) => {
    //         const requestOptions = {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify([...results]),
    //             credentials: "include",
    //         }
    //         const response = await fetch("https://frontend-take-home-service.fetch.com/dogs", requestOptions)
    //         console.log("the response in the useeffect", response)
    //         if (response.ok) {
    //             const test = await response.json()
    //             console.log("this is the results after the response.ok", test)
    //             setSearchResults(test)
    //         }
    //     }
    //     getDogInfo(results)

    // }, [results])
    // console.log("the search results in the search results", searchResults)

    return (
        <div>
            Test search results
            {results.map(dog => (
                <div>
                    <p>
                        {dog.name}
                    </p>
                    <p>
                        {dog.breed}
                    </p>
                    <p>
                        {dog.age}
                    </p>
                    <img src={dog.img} style={{width: 275, height: 275}} alt="dog info"></img>
                </div>
            ))}
        </div>
    )
}
