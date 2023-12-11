import React, { useEffect, useState } from "react"
import SearchResults from "../SearchResults"
import Pagination from "../Pagination"
import { useHistory } from "react-router-dom"


export default function Search() {
    const [breed, setBreed] = useState("")
    const [breedList, setBreedList] = useState([])
    const [zipCode, setZipCode] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [resultsPerPage, setResultsPerPage] = useState(25)
    const [totalResults, setTotalResults] = useState(0)
    const [ageMin, setAgeMin] = useState("")
    const [ageMax, setAgeMax] = useState("")
    const [sortBreed, setSortBreed] = useState("asc")
    const [pageNumbers, setPageNumbers] = useState([])

    const history = useHistory()



    const handleSearch = async (pageNum) => {
        console.log("INSIDE THE HANDLE SEARCH")

        const requestOptions = {
            method: "GET",
            credentials: "include",
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
        console.log("THIS IS THE DOG INFO", response)
        console.log("THIS IS THE DOG INFO AFTER RESPONSE", dogSearchResults)
        const dogInfoResults = await responseDogInfo.json()

        setSearchResults(dogInfoResults)
        console.log("THIS IS THE SEARCH RESULTS", searchResults)
    }

    const handleMatch = async () => {
        let dogArray = []

        const requestOptions = {
            method: "GET",
            credentials: "include",
        }
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
        console.log("THIS IS THE RESPONSE IN THE HANDLE MATCH", response)
        const dogMatchResults = await response.json()
        console.log("THIS IS THE DOG MATCH RESULTS IN HANDLE MATCH", dogMatchResults)

        const currentTotalMatches = dogMatchResults.total

        dogArray = [...dogArray, ...dogMatchResults.resultIds]
        console.log("THIS IS THE FIRST PUSH INTO THE DOG ARRAY", dogArray)
        console.log("THIS IS THE NEXT", dogMatchResults.next)

        let tempURL = await fetch(`https://frontend-take-home-service.fetch.com${dogMatchResults.next}`, requestOptions)
        console.log("THIS IS THE TEMP URL", tempURL)

        console.log("THIS IS THE DOG ARRAY IN THE MATCH AT THE END OF THE LOOP", dogArray)

        const matchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogArray),
            credentials: "include",
        }
        const singleDogMatch = await fetch(`https://frontend-take-home-service.fetch.com/dogs/match`, matchOptions)
        console.log("THIS IS THE SINGLE DOG MATCH", singleDogMatch)
        const matchedDog = await singleDogMatch.json()
        console.log("THIS IS THE MATCH DOG", matchedDog)
        history.push(`/dogs/${matchedDog.match}`)

    }



    useEffect(() => {
        const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))
    }, [searchResults, totalResults])




    return (
        <div>
            <div>
                <label>
                    Dog Breeds
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
                    Zip Code
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </label>
                <label>
                    Minimum Age
                    <input
                        type="number"
                        value={ageMin}
                        onChange={(e) => setAgeMin(e.target.value)}
                    />
                </label>
                <label>
                    Maximum Age
                    <input
                        type="number"
                        value={ageMax}
                        onChange={(e) => setAgeMax(e.target.value)}
                    />
                </label>
                <label>
                    Number of Results
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
                <button onClick={() => handleSearch(0)}>Search</button>
                <button disabled={totalResults > 100 || totalResults === 0} onClick={handleMatch}>Match!</button>
            </div>
            <div>
                {totalResults > 0 && <p>Found {totalResults} Dogs!</p>}
                <SearchResults results={searchResults} />
            </div>
            <div>
                This is the pagination
                <Pagination resultsPerPage={resultsPerPage} totalResults={totalResults} handleSearch={handleSearch} setCurrentPage={setCurrentPage} />
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
