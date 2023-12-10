import React, { useEffect } from "react"


export default function Pagination({ resultsPerPage, totalResults, handleSearch }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i)
    }



    return (

        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => handleSearch(number - 1) }>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>


    )
}
