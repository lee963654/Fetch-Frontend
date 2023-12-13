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
    const [pageNumbers, setPageNumbers] = useState([])
    const [errors, setErrors] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()

    const requestOptions = {
        method: "GET",
        credentials: "include",
    }


    const handleSearch = async (pageNum) => {
        console.log("INSIDE THE HANDLE SEARCH, THIS IS THE PAGE NUM", pageNum)
        if (ageMax && ageMin && ageMax < ageMin) {
            setErrors("Maximum age must be less than minimum age")
            return
        }

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

    const handleMatch = async () => {
        // let dogArray = []

        // const requestOptions = {
        //     method: "GET",
        //     credentials: "include",
        // }
        const queryParams = []
        const selectedAgeMin = ageMin ? `ageMin=${ageMin}` : ""
        const selectedAgeMax = ageMax ? `ageMax=${ageMax}` : ""
        const selectedBreed = breed ? `breeds=${breed}` : ""
        const selectedSort = `sort=breed:${sortBreed}`
        const selectedSize = `size=100`
        if (selectedAgeMin) queryParams.push(selectedAgeMin)
        if (selectedAgeMax) queryParams.push(selectedAgeMax)
        if (selectedBreed) queryParams.push(selectedBreed)
        queryParams.push(selectedSort)
        queryParams.push(selectedSize)

        const selectedQueryParams = queryParams.join("&")
        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${selectedQueryParams}`, requestOptions)

        const dogMatchResults = await response.json()


        // const currentTotalMatches = dogMatchResults.total
        // dogArray = [...dogArray, ...dogMatchResults.resultIds]
        // let tempURL = await fetch(`https://frontend-take-home-service.fetch.com${dogMatchResults.next}`, requestOptions)


        const matchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([...dogMatchResults.resultIds]),
            credentials: "include",
        }
        const singleDogMatch = await fetch(`https://frontend-take-home-service.fetch.com/dogs/match`, matchOptions)

        const matchedDog = await singleDogMatch.json()

        history.push(`/dogs/${matchedDog.match}`)

    }

    useEffect(() => {
        // const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))
        setErrors("")
        const gettingAllBreeds = async () => {
            const allBreeds = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" })
            console.log("IN THE USEEFFECT FOR ALL BREEDS", allBreeds)
            if (allBreeds.ok) {
                const breedRes = await allBreeds.json()
                setBreedList(breedRes)
            } else {
                dispatch(logoutThunk())
                history.push("/login")
            }
        }
        gettingAllBreeds()
    }, [searchResults, totalResults, ageMax, ageMin])

    return (
        <div className="search-container">
            {errors && <span className="errors">{errors}</span>}
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

                <div className="filter-buttons">
                    <button onClick={() => handleSearch(0)}>Search</button>
                    <button disabled={totalResults > 100 || totalResults === 0} onClick={handleMatch}>Match!</button>

                </div>
            </div>
            <div>
                {totalResults > 0 && <p className="num-results">Found {totalResults} Dogs!</p>}
                <SearchResults results={searchResults} />
            </div>
            <div>
                <Pagination resultsPerPage={resultsPerPage} totalResults={totalResults} handleSearch={handleSearch} />
            </div>
        </div>
    )
}










// let count = 0
// export default function Search() {
//     const [breed, setBreed] = useState("")
//     const [breedList, setBreedList] = useState([])
//     const [zipCode, setZipCode] = useState("")
//     const [searchResults, setSearchResults] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [currentPage, setCurrentPage] = useState(0)
//     const [resultsPerPage, setResultsPerPage] = useState(25)
//     const [totalResults, setTotalResults] = useState(0)
//     const [ageMin, setAgeMin] = useState("")
//     const [ageMax, setAgeMax] = useState("")
//     const [sortBreed, setSortBreed] = useState("asc")
//     const [pageNumbers, setPageNumbers] = useState([])



//     const handleSearch = async () => {
//         const requestOptions = {
//             method: "GET",
//             credentials: "include",
//         }
//         const queryParams = []
//         const selectedAgeMin = ageMin ? `ageMin=${ageMin}` : ""
//         const selectedAgeMax = ageMax ? `ageMax=${ageMax}` : ""
//         const selectedBreed = breed ? `breeds=${breed}` : ""
//         const selectedSort = `sort=breed:${sortBreed}`
//         const selectedSize = `size=${resultsPerPage}`
//         const selectedCurrentPage = `from=${resultsPerPage * currentPage}`
//         if (selectedAgeMin) queryParams.push(selectedAgeMin)
//         if (selectedAgeMax) queryParams.push(selectedAgeMax)
//         if (selectedBreed) queryParams.push(selectedBreed)
//         if (selectedCurrentPage) queryParams.push(selectedCurrentPage)
//         queryParams.push(selectedSort)
//         queryParams.push(selectedSize)
//         const selectedQueryParams = queryParams.join("&")
//         const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${selectedQueryParams}`, requestOptions)
//         console.log("this is the search", response)
//         const dogSearchResults = await response.json()

//         setTotalResults(dogSearchResults.total)

//         const requestOptionsPost = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(dogSearchResults.resultIds),
//             credentials: "include",
//         }
//         const responseDogInfo = await fetch("https://frontend-take-home-service.fetch.com/dogs", requestOptionsPost)
//         const dogInfoResults = await responseDogInfo.json()

//         setSearchResults(dogInfoResults)
//     }


//     useEffect(() => {
//         const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))


//     }, [searchResults, currentPage, totalResults])

//     count++
//     console.log("CHECKING FOR DOG LIST CHANGE STATE", searchResults)
//     return (
//         <div>
//             <div>
//                 <label>
//                     Dog Breeds
//                     <select value={breed} onChange={(e) => setBreed(e.target.value)}>
//                         <option key="not option" value="">
//                             All Breeds
//                         </option>
//                         {breedList.map((option) =>
//                             <option key={option} value={option.value}>
//                                 {option}
//                             </option>
//                         )}
//                     </select>
//                 </label>
//                 <label>
//                     Zip Code
//                     <input
//                         type="text"
//                         value={zipCode}
//                         onChange={(e) => setZipCode(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     Minimum Age
//                     <input
//                         type="number"
//                         value={ageMin}
//                         onChange={(e) => setAgeMin(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     Maximum Age
//                     <input
//                         type="number"
//                         value={ageMax}
//                         onChange={(e) => setAgeMax(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     Number of Results
//                     <select value={resultsPerPage} onChange={(e) => setResultsPerPage(e.target.value)}>
//                         <option key="25" value={25}>
//                             25
//                         </option>
//                         <option key="50" value={50}>
//                             50
//                         </option>
//                         <option key="75" value={75}>
//                             75
//                         </option>
//                     </select>
//                 </label>
//                 <button onClick={() => { setCurrentPage(0); handleSearch() }} type="submit">Search</button>
//             </div>
//             <div>
//                 This is the search results
//                 <SearchResults results={searchResults} />
//             </div>
//             <div>
//                 This is the pagination
//                 <Pagination resultsPerPage={resultsPerPage} totalResults={totalResults} handleSearch={handleSearch} setCurrentPage={setCurrentPage}/>
//             </div>
//         </div>
//     )
// }
