import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logoutThunk } from "../../store/session"
import ProfileButton from "./ProfileButton"
import "./HeaderNav.css"

export default function HeaderNav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)


    return (
        <header>
            <h1 onClick={() => sessionUser ? history.push("/home") : history.push("/")}>Fetch</h1>
            {sessionUser &&
            <ProfileButton />
            }

        </header>
    )
}
