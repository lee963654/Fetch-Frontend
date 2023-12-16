import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPage.css"


export default function LoginPage() {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { name: name, email: email }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
            credentials: "include",
        }
        const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", requestOptions)
        if (response.ok) {
            history.push("/")
        } else {
            setError("Please enter a valid email address")
        }
    }

    useEffect(() => {
        setError("")
    }, [email])


    return (
        <div className="login-page-container">
            <h1>Fetch</h1>
            <section>
                <p>
                    Welcome to Fetch! We love dogs, and hope you do too! We are here to help you bring a lucky dog home. Please enter your name and email to get started.
                </p>
            </section>
            <form onSubmit={handleSubmit}>
                <div className="form-labels">
                    <label>
                        <span>Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter Your Name"
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter Your Email"
                        />
                    </label>
                    {error && <span className="errors">{error}</span>}
                </div>
                <button type="submit">Log In</button>
            </form>

        </div>
    );
}
