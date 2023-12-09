import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/session";


export default function LoginPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {name: name, email: email}
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
            console.log("response login", response)
            dispatch(loginThunk(user))
            history.push("/")
        }
    }


    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}
