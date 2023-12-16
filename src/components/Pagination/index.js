import React, { useState, useEffect } from "react"
import "./Pagination.css"


export default function Pagination({ resultsPerPage, totalResults, handleSearch, hasSubmitted, setHasSubmitted }) {
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
    console.log("THIS IS THE HAS SUBMITTED IN THE PAGINATION PAGE", hasSubmitted)


    //testing
    useEffect(() => {
        console.log("USEEFFECT TEST")

        const pageBlockStart = () => {
            // console.log("TESTING THE PAGE BLOCK START FGUNCTION")
            const lastPage = pageNumbers[pageNumbers.length - 1]
            // console.log("THIS IS THE LAST PAGE VARIABLE", lastPage)
            // console.log("THIS IS THE PAGE VARIABLE", page)
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

            if (page === currentPageStart) {
                setCurrentPageStart(page - 10)
                setCurrentPageEnd(end => end - 10)
                return
            }
            if (page + 1 === lastPage) {
                const newStartNum = ((Math.floor(page / 10)) * 10) - 1
                setCurrentPageStart(newStartNum)
                setCurrentPageEnd(newStartNum + 12)
                return
            }
        }
        pageBlockStart()

        const hasSubmittedFunc = (hasSubmitted) => {
            if (hasSubmitted === true) {
                setHasSubmitted(false)
                setPage(0)
                return
            }
        }
        hasSubmittedFunc(hasSubmitted)
        console.log("THIS IS THE HAS SUBMITTED after the function IN THE USEEFFECT", hasSubmitted)

    }, [page, hasSubmitted])
    // console.log("THIS IS THE INDEX OF THE CURRENT PAGE IN THE ARRAY", pageNumbers.slice(currentPageStart, currentPageEnd).indexOf(page))
    // console.log("THE CURR PAGE START AND END", currentPageStart, currentPageEnd)
    // console.log("WE ARE SLICING THE PAGE NUMBERS BLOCK", pageNumbers.slice(currentPageStart, currentPageEnd))

    return (

        <nav>
            <ul className="page-number-container">
                {pageNumbers.length > 0 &&
                    <div>
                        <li key="first" className="page-number-nav">
                            <a onClick={() => { setPage(0); handleSearch(0) }}>First</a>
                        </li>

                        <li key="previous" className="page-number-nav">
                            <a onClick={() => handleSearch(prevPage())}>Previous</a>
                        </li>
                    </div>
                }
                {/* {pageNumbers && pageNumbers.map(number => (
                    <li key={number} className={"page-number" + (number - 1 === page ? "-highlight" : "")}>
                        <a onClick={() => { setPage(number - 1); handleSearch(number - 1) }}>{number}</a>
                    </li>
                ))} */}
                <div className="page-num-block">
                    {pageNumbers && pageNumbers.length < 12 ? pageNumbers.map(number => (
                        <li key={number} className={"page-number" + (number - 1 === page ? "-highlight" : "")}>
                            <a onClick={() => { setPage(number - 1); handleSearch(number - 1) }}>{number}</a>
                        </li>
                    ))
                        :
                        pageNumbers.slice(currentPageStart, currentPageEnd).map(number => (
                            <li key={number} className={"page-number" + (number - 1 === page ? "-highlight" : "")}>
                                <a onClick={() => { setPage(number - 1); handleSearch(number - 1) }}>{number}</a>
                            </li>
                        ))
                    }
                </div>
                {pageNumbers.length > 0 &&
                    <div>
                        <li key="last" className="page-number-nav">
                            <a onClick={() => { setPage(pageNumbers.length - 1); handleSearch(pageNumbers.length - 1) }}>Last</a>
                        </li>
                        <li key="next" className="page-number-nav">
                            <a onClick={() => handleSearch(nextPage())}>Next</a>
                        </li>
                    </div>
                }
            </ul>
        </nav>


    )
}
