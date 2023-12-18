import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import SearchResults from "../SearchResults"
import Pagination from "../Pagination"
import { useHistory } from "react-router-dom"
import { logoutThunk } from "../../store/session"

import "./Search.css"


export default function Search() {
    const [breed, setBreed] = useState("")
    const [breedList, setBreedList] = useState([])

    const [searchResults, setSearchResults] = useState([])

    const [resultsPerPage, setResultsPerPage] = useState(25)
    const [totalResults, setTotalResults] = useState(0)
    const [ageMin, setAgeMin] = useState("")
    const [ageMax, setAgeMax] = useState("")
    const [sortBreed, setSortBreed] = useState("asc")
    const [errors, setErrors] = useState("")

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [resultsToPag, setResultsToPag] = useState()

    const dispatch = useDispatch()
    const history = useHistory()

    const requestOptions = {
        method: "GET",
        credentials: "include",
    }


    const handleSearch = async (pageNum, hasSubmit) => {

        if (hasSubmit === true) {
            setHasSubmitted(true)
        }

        if (ageMax && ageMin && ageMax < ageMin) {
            setErrors("Maximum age must be less than minimum age")
            return
        }

        setResultsToPag(resultsPerPage)
        const queryParams = []
        const selectedAgeMin = ageMin ? `ageMin=${ageMin}` : ""
        const selectedAgeMax = ageMax ? `ageMax=${ageMax}` : ""
        const selectedBreed = breed ? `breeds=${breed}` : ""
        const selectedSort = `sort=breed:${sortBreed}`
        const selectedSize = `size=${resultsPerPage}`

        const selectedCurrentPage = `from=${resultsPerPage * pageNum}`


        if (selectedAgeMin) queryParams.push(selectedAgeMin)
        if (selectedAgeMax) queryParams.push(selectedAgeMax)
        if (selectedBreed) queryParams.push(selectedBreed)
        if (selectedCurrentPage) queryParams.push(selectedCurrentPage)
        queryParams.push(selectedSort)
        queryParams.push(selectedSize)
        const selectedQueryParams = queryParams.join("&")

        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${selectedQueryParams}`, requestOptions)
        if (!response.ok) {
            dispatch(logoutThunk())
            sessionStorage.clear()
            history.push("/")
        }
        const dogSearchResults = await response.json()
        setTotalResults(dogSearchResults.total)

        const requestOptionsPost = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogSearchResults.resultIds),
            credentials: "include",
        }
        const responseDogInfo = await fetch("https://frontend-take-home-service.fetch.com/dogs", requestOptionsPost)
        const dogInfoResults = await responseDogInfo.json()

        setSearchResults(dogInfoResults)

    }


    useEffect(() => {

        setErrors("")
        const gettingAllBreeds = async () => {
            const allBreeds = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" })

            if (allBreeds.ok) {
                const allBreedList = await allBreeds.json()
                setBreedList(allBreedList)
            } else {
                sessionStorage.clear()
                dispatch(logoutThunk())
                history.push("/login")
            }
        }
        gettingAllBreeds()
    }, [searchResults, totalResults, ageMax, ageMin])




    return (
        <div className="search-container">

            <div className="search-filter-container">
                <label>
                    <span>Dog Breeds</span>
                    <select value={breed} onChange={(e) => setBreed(e.target.value)}>
                        <option key="not option" value="">
                            All Breeds
                        </option>
                        {breedList.map((option) =>
                            <option key={option} value={option.value}>
                                {option}
                            </option>
                        )}
                    </select>
                </label>
                <label>
                    <span>Minimum Age</span>
                    <input
                        type="number"
                        value={ageMin}
                        onChange={(e) => setAgeMin(e.target.value)}
                        min={0}
                        max={20}
                    />
                </label>
                <label>
                    <span>Maximum Age</span>
                    <input
                        type="number"
                        value={ageMax}
                        onChange={(e) => setAgeMax(e.target.value)}
                        min={0}
                        max={20}
                    />
                </label>
                <label>
                    <span>Sort By</span>
                    <select value={sortBreed} onChange={(e) => setSortBreed(e.target.value)}>
                        <option key="asc" value="asc">
                            Asc
                        </option>
                        <option key="desc" value="desc">
                            Desc
                        </option>
                    </select>
                </label>
                <label>
                    <span>Results Per Page</span>
                    <select value={resultsPerPage} onChange={(e) => setResultsPerPage(e.target.value)}>
                        <option key="25" value={25}>
                            25
                        </option>
                        <option key="50" value={50}>
                            50
                        </option>
                        <option key="75" value={75}>
                            75
                        </option>
                    </select>
                </label>
                {errors && <span className="errors">{errors}</span>}
            </div>
            <div className="filter-buttons">
                <button onClick={() => handleSearch(0, true)}>Search</button>


            </div>
            <div>
                {totalResults > 0 && <p className="num-results">Found {totalResults} Dogs!</p>}
                <SearchResults results={searchResults} />
            </div>
            <div>
                <Pagination resultsPerPage={resultsToPag} totalResults={totalResults} handleSearch={handleSearch} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} />
            </div>
        </div>
    )
}
