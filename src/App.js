import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom"
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { restoreUserThunk } from "./store/session";
import HeaderNav from "./components/HeaderNav";
import FavoritesPage from "./components/FavoritesPage";
import MatchedDogPage from "./components/MatchedDogPage";
import "./index.css"



function App() {
  const sessionUser = useSelector(state => state)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const gettingUser = JSON.parse(sessionStorage.getItem("user"))
  const gettingFavorites = JSON.parse(sessionStorage.getItem("favorites"))



  useEffect(() => {
    // Getting the information from the session storage to put into the store
    const favoritesArr = gettingFavorites ? [...gettingFavorites] : []
    const restoreUserObj = {
      name: gettingUser?.name,
      email: gettingUser?.email,
      favorites: favoritesArr
    }
    dispatch(restoreUserThunk(restoreUserObj)).then(() => setIsLoggedIn(true))

  }, [dispatch])



  return (
    <div className="main-app-container">
      <HeaderNav />
      {isLoggedIn &&
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/favorites">
            <FavoritesPage />
          </Route>
          <Route exact path="/dogs/:dogId">
            <MatchedDogPage />
          </Route>
        </Switch>

      }
    </div>
  );
}

export default App;
