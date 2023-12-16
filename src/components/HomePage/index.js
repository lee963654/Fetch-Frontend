import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { logoutThunk } from "../../store/session"
import Search from "../Search"
import "./HomePage.css"

export default function HomePage() {
    // const history = useHistory()
    // const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state)
    // console.log("THIS IS THE SESSION USER IN THE HOME PAGE", sessionUser)

    // const handleLogout = async (e) => {
    //     e.preventDefault()
    //     const requestOptions = {
    //         method: "POST",
    //         credentials: "include",
    //     }
    //     const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", requestOptions)
    //     if (response.ok) {
    //         sessionStorage.clear()
    //         dispatch(logoutThunk())
    //         history.push("/login")
    //     } else {
    //         sessionStorage.clear()
    //         dispatch(logoutThunk())
    //         history.push("/login")
    //     }
    // }
    // const test = JSON.parse(sessionStorage.getItem("user"))
    // console.log("THIS IS GETTING THE session STORAGE in homepage", test)




    return (
        <div className="home-page-container">
            {/* <header>
                <h1>Welcome to Fetch!</h1>
                <button onClick={handleLogout}>
                    Log Out
                </button>
            </header> */}
            <section>
                <p>
                    Feel free to browse through our database of dogs. You can add dogs to your favorites page and we will find the perfect match for you!
                </p>
            </section>
            <Search />
        </div>
    )
}
