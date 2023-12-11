import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export default function SearchResults({ results }) {
const history = useHistory()



    return (
        <div>
            Test search results
            {results.map(dog => (
                <div onClick={() => history.push(`/dogs/${dog.id}`)}>
                    <p>
                        {dog.name}
                    </p>
                    <img src={dog.img} style={{width: 275, height: 275}} alt="dog info"></img>
                </div>
            ))}
        </div>
    )
}
