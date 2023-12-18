import React from "react"
import "./SearchResults.css"
import OpenDogModal from "../OpenDogModal"
import DogPage from "../DogPage"

export default function SearchResults({ results }) {




    return (
        <div className="search-results-container">

            {results.map(dog => (

                <OpenDogModal
                    dogInfo={dog}
                    modalComponent={<DogPage dogId={dog} />}

                />

            ))}
        </div>
    )
}
