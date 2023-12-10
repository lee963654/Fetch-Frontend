import React, { useEffect } from "react"


export default function Pagination({ resultsPerPage, totalResults, handleSearch, setCurrentPage }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {

    }, [setCurrentPage])



    return (


        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => { console.log("this is the page number", number); setCurrentPage(number - 1); return handleSearch() }}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>


    )
}
