import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import Search from "../Search"
import "./HomePage.css"

export default function HomePage() {
    const history = useHistory()


    const handleLogout = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            credentials: "include",
        }
        const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", requestOptions)
        if (response.ok) {
            history.push("/login")
        } else {
            history.push("/login")
        }
    }





    return (
        <div className="home-page-container">
            <header>
                <h1>Welcome to Fetch!</h1>
                <button onClick={handleLogout}>
                    Log Out
                </button>
            </header>
            <section>
                <p>
                    Feel free to browse through our database of dogs and choose which one to bring home today! If you would like us to find you a match, please filter down the results to under 100 and we'll find the right dog for you.
                </p>
            </section>
            <Search />
        </div>
    )
}
