import React, { useEffect, useState } from "react"
import SearchResults from "../SearchResults"
import Pagination from "../Pagination"


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



    const handleSearch = async () => {
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
        const selectedCurrentPage = `from=${resultsPerPage * currentPage}`
        if (selectedAgeMin) queryParams.push(selectedAgeMin)
        if (selectedAgeMax) queryParams.push(selectedAgeMax)
        if (selectedBreed) queryParams.push(selectedBreed)
        if (selectedCurrentPage) queryParams.push(selectedCurrentPage)
        queryParams.push(selectedSort)
        queryParams.push(selectedSize)
        const selectedQueryParams = queryParams.join("&")
        console.log("RIGHT BEFORE THE FIRST AWAIT FETCH")
        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${selectedQueryParams}`, requestOptions)
        console.log("RIGHT AFTER THE FIRST AAWAIT FETCH")
        console.log("THIS IS THE PAGE NUM INSIDE THE HANDLE SEARCH ", selectedCurrentPage)
        console.log("THIS IS THE CURRENT PAGE INSIDE THE HANDLE SEARCH", currentPage)
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
        console.log("THIS IS THE DOG INFO IN THE SUBMIT", dogInfoResults)
        setSearchResults(dogInfoResults)
    }


    const handleStartSearch = () => {
        console.log("INSIDE THE HANDLE START SEARCH PAGE NUM before", currentPage)

        // setCurrentPage(0)
        console.log("INSIDE THE HANDLE START SEARCH PAGE NUM after", currentPage)
        handleSearch()
        return
    }


    useEffect(() => {
        const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))
    }, [searchResults, totalResults])



    console.log("CHECKING THE SEARCH RESULTS ON SEARCH COMPONENT", searchResults)
    console.log("CHECKING THE PAGE NUMBER ON SEARCH COMPONENT", currentPage)
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
                <button onClick={handleStartSearch}>Search</button>
            </div>
            <div>
                This is the search results
                <SearchResults results={searchResults} />
            </div>
            <div>
                This is the pagination
                <Pagination resultsPerPage={resultsPerPage} totalResults={totalResults} handleSearch={handleSearch} setCurrentPage={setCurrentPage}/>
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
