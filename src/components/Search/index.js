import React, { useEffect, useState } from "react"
import SearchResults from "../SearchResults"
import Pagination from "../Pagination"

export default function Search() {
    const [breed, setBreed] = useState("")
    const [breedList, setBreedList] = useState([])
    const [zipCode, setZipCode] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [resultsPerPage, setResultsPerPage] = useState(25)
    const [totalResults, setTotalResults] = useState("")
    const [ageMin, setAgeMin] = useState("")
    const [ageMax, setAgeMax] = useState("")
    const [sortBreed, setSortBreed] = useState("asc")


    useEffect(() => {
        const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))


    }, [currentPage])

    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage
    const currentResult = searchResults.slice(indexOfFirstResult, indexOfLastResult)


    const handleSearch = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: "GET",
            credentials: "include",
        }
        const queryParams = []
        const selectedAgeMin = ageMin ? `ageMin=${ageMin}` : ""
        const selectedAgeMax = ageMax ? `ageMax=${ageMax}` : ""
        const selectedBreed = breed ? `breeds=${breed}` : ""
        const selectedSort = `sort=breed:${sortBreed}`
        if (selectedAgeMin) queryParams.push(selectedAgeMin)
        if (selectedAgeMax) queryParams.push(selectedAgeMax)
        if (selectedBreed) queryParams.push(selectedBreed)
        queryParams.push(selectedSort)
        const selectedQueryParams = queryParams.join("&")

        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${selectedQueryParams}`, requestOptions)
        console.log("this is the search", response)
        console.log("this is the breed selection", breed)
        const specificBreed = await response.json()
        console.log("dog breed", specificBreed)
        setSearchResults(specificBreed.resultIds)
        setTotalResults(specificBreed.total)
    }

    // const handlePagination = async (pageNum) => {
    //     setCurrentPage(pageNum)
    //     const requestOptions = {
    //         method: "GET",
    //         credentials: "include",
    //     }
    //     const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&size=${resultsPerPage}&from=${}`, requestOptions)
    // }


    console.log("changing breeds", breed)
    console.log("the search results", searchResults)
    return (
        <div>
            <form onSubmit={handleSearch}>
                <label>
                    Dog Breeds
                    <select value={breed} onChange={(e) => setBreed(e.target.value)}>
                        <option key="not option" value="">
                            Choose a breed
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
                <button type="submit">Search</button>
            </form>
            <div>
                This is the search results
                <SearchResults results={currentResult} />

            </div>
            <div>
                This is the pagination
                <nav>
                    <ul>

                    </ul>
                </nav>
            </div>
        </div>
    )
}







// export default function Search() {
//     const [breed, setBreed] = useState("")
//     const [breedList, setBreedList] = useState([])
//     const [zipCode, setZipCode] = useState("")
//     const [searchResults, setSearchResults] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [currentPage, setCurrentPage] = useState(1)
//     const [resultsPerPage, setResultsPerPage] = useState(25)
//     const [totalResults, setTotalResults] = useState("")


//     useEffect(() => {
//         const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))


//     }, [currentPage])

//     const indexOfLastResult = currentPage * resultsPerPage
//     const indexOfFirstResult = indexOfLastResult - resultsPerPage
//     const currentResult = searchResults.slice(indexOfFirstResult, indexOfLastResult)


//     const handleSearch = async (e) => {
//         e.preventDefault()
//         const requestOptions = {
//             method: "GET",
//             credentials: "include",
//         }

//         const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}`, requestOptions)
//         console.log("this is the search", response)
//         const specificBreed = await response.json()
//         console.log("dog breed", specificBreed)
//         setSearchResults(specificBreed.resultIds)
//         setTotalResults(specificBreed.total)
//     }



//     console.log("changing breeds", breed)
//     console.log("the search results", searchResults)
//     return (
//         <div>
//             <form onSubmit={handleSearch}>
//                 <label>
//                     Dog Breeds
//                     <select value={breed} onChange={(e) => setBreed(e.target.value)}>
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
//                 <button type="submit">Search</button>
//             </form>
//             <div>
//                 This is the search results
//                 <SearchResults results={currentResult} />

//             </div>
//             <div>
//                 This is the pagination
//                 <nav>
//                     <ul>

//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     )
// }
