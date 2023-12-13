import React, { useState, useEffect } from "react"
import "./Pagination.css"


export default function Pagination({ resultsPerPage, totalResults, handleSearch }) {
    const [page, setPage] = useState(0)

    //Testing
    // const [pageNumbers, setPageNumbers] = useState([])


    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i)
    }

    const nextPage = () => {
        if (page === pageNumbers.length - 1) return pageNumbers.length - 1
        const nextPageCount = page + 1
        console.log("THIS IS IN THE NEXT PAGE FUNTION FOR PAGE", page)
        console.log("THIS IS IN THE NEXT PAGE FUNTION FOR NEXTPAGECOUNT", nextPageCount)
        setPage(nextPageCount)
        return nextPageCount
    }

    const prevPage = () => {
        if (page === 0) return 0
        const prevPageCount = page - 1
        setPage(prevPageCount)
        return prevPageCount
    }
    console.log("THIS IS THE CURENT PAGE IN THE PAGINATION", page)

    //testing
    // useEffect(() => {
    //     const pageNumArray = []
    //     for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    //         pageNumArray.push(i)
    //     }
    //     setPageNumbers(pageNumArray)
    // }, [])


    return (

        <nav>
            <ul className="page-number-container">
                {pageNumbers.length > 0 &&
                    <div>
                        <li key="first" className="page-number">
                            <a onClick={() => { setPage(0); handleSearch(0) }}>First Page</a>
                        </li>
                        <li key="next" className="page-number">
                            <a onClick={() => handleSearch(nextPage())}>Next</a>
                        </li>
                    </div>
                }
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number} className={"page-number" + (number - 1 === page ? "-highlight" : "")}>
                        <a onClick={() => { setPage(number - 1); handleSearch(number - 1) }}>{number}</a>
                    </li>
                ))}
                {pageNumbers.length > 0 &&
                    <div>
                        <li key="last" className="page-number">
                            <a onClick={() => { setPage(pageNumbers.length - 1); handleSearch(pageNumbers.length - 1) }}>Last Page</a>
                        </li>
                        <li key="previous" className="page-number">
                            <a onClick={() => handleSearch(prevPage())}>Previous</a>
                        </li>
                    </div>
                }
            </ul>
        </nav>


    )
}
