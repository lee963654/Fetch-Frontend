import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logoutThunk } from "../../store/session"
import Search from "../Search"

export default function HomePage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)

    const handleLogout = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            credentials: "include",
        }
        const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", requestOptions)
        if (response.ok) {
            dispatch(logoutThunk())
            history.push("/login")
        } else {
            dispatch(logoutThunk())
            history.push("/login")
        }
    }



    return (
        <div>
            <div>
                <h1>Welcome!</h1>
                <button onClick={handleLogout}>
                    Log Out
                </button>
            </div>
            <Search />
        </div>
    )
}
