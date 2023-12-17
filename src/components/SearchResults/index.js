import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import "./SearchResults.css"
import OpenDogModal from "../OpenDogModal"
import DogPage from "../DogPage"

export default function SearchResults({ results }) {
const history = useHistory()
const sessionUser = useSelector(state => state)


console.log("INSIDE THE SEARCH RESULTS LOKING FOR DOG", results)
    return (
        <div className="search-results-container">
            {/* {results.map(dog => (
                <div className="dog-img-container" onClick={() => history.push(`/dogs/${dog.id}`)}>
                    <img src={dog.img} alt="dog info"></img>
                </div>
            ))} */}
            {results.map(dog => (

                <OpenDogModal
                    dogInfo={dog}
                    modalComponent={<DogPage dogId={dog} />}

                />

            ))}
        </div>
    )
}
