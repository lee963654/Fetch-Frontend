import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import OpenDogModal from "../OpenDogModal"
import DogPage from "../DogPage"

export default function FavoritesPage() {
    const userFavorites = useSelector(state => state?.session?.user?.favorites)



    // useEffect(() => {
    //     const gettingFavList = async () => {
    //         const requestOptionsPost = {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(userFavorites),
    //             credentials: "include",
    //         }
    //         const responseDogList = await fetch("https://frontend-take-home-service.fetch.com/dogs", requestOptionsPost)
    //         const favDogList = await responseDogList.json()
    //         setFavorites(favDogList)

    //     }
    //     gettingFavList()
    // }, [])





    console.log("THIS IS THE userFavorites useselector", userFavorites)

    return (
        <div>
            <h1>Favorites List</h1>
            <div className="search-results-container">

                {userFavorites.length ?
                    userFavorites.map(dog => (
                        <OpenDogModal
                            dogInfo={dog}
                            modalComponent={<DogPage dogId={dog} />}
                        />
                    ))
                    :
                    <h2>No Dogs Added</h2>
                }
            </div>
        </div>
    )
}
