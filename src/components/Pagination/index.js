import React, { useState, useEffect } from "react"
import "./Pagination.css"


export default function Pagination({ resultsPerPage, totalResults, handleSearch }) {
    const [page, setPage] = useState(0)
    const [currentPageStart, setCurrentPageStart] = useState(0)
    const [currentPageEnd, setCurrentPageEnd] = useState(11)


    // const pageBlockStart = page % 10 === 0 ? page : 0
    // const pageBlockEnd = pageBlockStart === page ? page + 10 : 0
    // const pageBlockStart = () => {
    //     if (page % 10 === 0) {
    //         currPageStart = page
    //     }
    //     console.log("THE CURR PAGE START", currPageStart)

    // }
    // console.log("TESTING PAGEBLOCKSTART", pageBlockStart())

    //Testing
    // const [pageNumbers, setPageNumbers] = useState([])


    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i)
    }

    const nextPage = () => {
        if (page === pageNumbers.length - 1) return pageNumbers.length - 1
        const nextPageCount = page + 1
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
    useEffect(() => {
        console.log("USEEFFECT TEST")
        const pageBlockStart = () => {
            console.log("TESTING THE PAGE BLOCK START FGUNCTION")
            const lastPage = pageNumbers[pageNumbers.length - 1]
            if (page < 10 || page === 0) {
                setCurrentPageStart(0)
                setCurrentPageEnd(11)
                return
            }
            if (page % 10 === 0 && page > currentPageStart) {
                setCurrentPageStart(page - 1)
                setCurrentPageEnd(page + 11)
                return
            }
            // if (page % 10 === 0 && page <= currentPageStart) {
            //     setCurrentPageStart(page - 1)
            //     setCurrentPageEnd(page + 11)
            //     return
            // }
            if (page === currentPageStart) {
                setCurrentPageStart(page - 10)
                setCurrentPageEnd(end => end - 10)
                return
            }
            if (page + 1 === lastPage) {
                const getFirstDigit = String(page).charAt(0)
                const stringFirstDigit = `${getFirstDigit - 1}9`
                const currStart = Number(stringFirstDigit)
                console.log("THE CURR START IN THE LAST STEP", currStart)
                setCurrentPageStart(currStart)
                setCurrentPageEnd(currStart + 12)
                console.log("IN THE LAST PAGE SETUP")
            }

            console.log("CHECKING THE LAST PAGE IN THE USEEFFECT", lastPage)
        }
        pageBlockStart()
    }, [page])
    console.log("THE CURR PAGE START AND END", currentPageStart, currentPageEnd)
    console.log("WE ARE SLICING THE PAGE NUMBERS BLOCK", pageNumbers.slice(currentPageStart, currentPageEnd))

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
