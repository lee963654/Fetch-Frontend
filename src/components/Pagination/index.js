import React from "react"

export default function Pagination ({resultsPerPage, totalResults, paginateNumber }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i)
    }



    return (
        <nav>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={paginateNumber(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
