import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./SearchResults.css"

export default function SearchResults({ results }) {
const history = useHistory()



    return (
        <div className="search-results-container">
            {results.map(dog => (
                <div className="dog-img-container" onClick={() => history.push(`/dogs/${dog.id}`)}>
                    <img src={dog.img} alt="dog info"></img>
                </div>
            ))}
        </div>
    )
}
