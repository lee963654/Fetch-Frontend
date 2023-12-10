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
        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${selectedQueryParams}`, requestOptions)
        console.log("this is the search", response)
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
        const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))
        console.log("testing if useeffect is running")
        // TESTING PAGINATION COMP
        // getPageNum()
        // TESTING PAGINATION COMP
        // console.log("the page numbers in the useeffect", pageNumbers)
        console.log("this is the current page", currentPage)

    }, [searchResults, currentPage, totalResults])


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
                        <option key="show 25" value={25}>
                            25
                        </option>
                        <option key="show 10" value={50}>
                            50
                        </option>

                    </select>
                </label>
                <button onClick={() => { console.log("this is inside the submit button", currentPage); setCurrentPage(0); handleSearch() }} type="submit">Search</button>
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
//     const [tempDogSearch, setTempDogSearch] = useState()



//     useEffect(() => {
//         const allBreeds = fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", { credentials: "include" }).then((response) => response.json()).then((breeds) => setBreedList(breeds))
//         console.log("testing if useeffect is running")
//         getPageNum()
//         console.log("the page numbers in the useeffect", pageNumbers)
//         console.log("this is the current page", currentPage)

//     }, [searchResults, resultsPerPage, currentPage, totalResults, tempDogSearch])


//     const getPageNum = () => {
//         const pageNumbers = []
//         for (let i = 0; i <= Math.ceil(totalResults / resultsPerPage); i++) {
//             pageNumbers.push(i)
//         }
//         setPageNumbers(pageNumbers)
//         return pageNumbers
//     }


//     const handleSearch = async (e) => {
//         e.preventDefault()
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


//         setTempDogSearch(dogSearchResults.resultIds)


//         setSearchResults(dogInfoResults)
//     }
//     console.log("THIS IS THE DOG SEARCH IDS FOR PAG", tempDogSearch)


//     const handlePaginationSearch = async () => {
//         const requestOptionsPost = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(tempDogSearch),
//             credentials: "include",
//         }
//         const responseDogInfo = await fetch("https://frontend-take-home-service.fetch.com/dogs", requestOptionsPost)
//         const dogInfoResults = await responseDogInfo.json()
//         setSearchResults(dogInfoResults)
//     }


//     return (
//         <div>
//             <form onSubmit={handleSearch}>
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
//                         <option key="show 25" value={25}>
//                             25
//                         </option>
//                         <option key="show 10" value={50}>
//                             50
//                         </option>

//                     </select>
//                 </label>
//                 <button onClick={() => { console.log("this is inside the submit button", currentPage); setCurrentPage(0) }} type="submit">Search</button>
//             </form>
//             <div>
//                 This is the search results
//                 <SearchResults results={searchResults} />

//             </div>
//             <div>
//                 This is the pagination
//                 <nav>
//                     <ul>
//                         {pageNumbers.map(number => (
//                             <li key={number}>
//                                 <a onClick={() => {console.log("this is the page number", number); setCurrentPage(number);}}>{number + 1}</a>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     )
// }
