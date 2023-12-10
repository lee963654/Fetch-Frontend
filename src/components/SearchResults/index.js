import React, { useEffect, useState } from "react"

export default function SearchResults({ results }) {




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
