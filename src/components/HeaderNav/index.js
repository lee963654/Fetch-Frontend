import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logoutThunk } from "../../store/session"
import ProfileButton from "./ProfileButton"

export default function HeaderNav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    console.log("THE SESSINO USER IN THE HEADER", sessionUser)

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

    return (
        <header>
            <h1>Fetch</h1>
            {/* {sessionUser &&
                <nav>
                    <button>
                        Favorites
                    </button>
                    <button onClick={handleLogout}>
                        Log Out
                    </button>

                </nav>
            } */}
            {sessionUser &&
            <ProfileButton />
            }

        </header>
    )
}
