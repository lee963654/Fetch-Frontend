import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logoutThunk } from "../../store/session";
import "./HeaderNav.css"

export default function ProfileButton({ user }) {
    const history = useHistory()

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogout = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            credentials: "include",
        }
        const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", requestOptions)
        if (response.ok) {
            sessionStorage.clear()
            dispatch(logoutThunk())
            history.push("/login")
        } else {
            sessionStorage.clear()
            dispatch(logoutThunk())
            history.push("/login")
        }
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {/* <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li> */}
                {/* <li>
                    <button onClick={handleLogout}>Log Out</button>
                </li> */}
                <li>
                    Favorites
                </li>
                <li onClick={handleLogout}>
                    Log Out
                </li>
            </ul>
        </>
    );
}
