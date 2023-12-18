import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Search from "../Search"
import "./HomePage.css"

export default function HomePage() {
    const history = useHistory()
    const sessionUser = useSelector(state => state?.session?.user)


    useEffect(() => {
        if (!sessionUser) {
            sessionStorage.clear()
            history.push("/")
        }
    }, [sessionUser])


    return (
        <div className="home-page-container">
            <section>
                <p>
                    Feel free to browse through our database of dogs. You can add dogs to your favorites page and we will find the perfect match for you!
                </p>
            </section>
            <Search />
        </div>
    )
}
