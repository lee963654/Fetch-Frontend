import React, { useState, useEffect } from "react"
import "./Pagination.css"


export default function Pagination({ resultsPerPage, totalResults, handleSearch, hasSubmitted, setHasSubmitted }) {
    const [page, setPage] = useState(0)
    const [currentPageStart, setCurrentPageStart] = useState(0)
    const [currentPageEnd, setCurrentPageEnd] = useState(11)

    // Getting the page numbers
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




    useEffect(() => {
        // Finding out where the page numbers should start and end in the middle of the block
        const pageBlockStart = () => {

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
        // hasSubmitted function to allow for updates in state
        const hasSubmittedFunc = (hasSubmitted) => {
            if (hasSubmitted === true) {
                setHasSubmitted(false)
                setPage(0)
                return
            }
        }
        hasSubmittedFunc(hasSubmitted)


    }, [page, hasSubmitted])


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
