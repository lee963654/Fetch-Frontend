import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom"
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { restoreUserThunk } from "./store/session";
import DogPage from "./components/DogPage";
import HeaderNav from "./components/HeaderNav";
import FavoritesPage from "./components/FavoritesPage";



function App() {
  const sessionUser = useSelector(state => state)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const gettingUser = JSON.parse(sessionStorage.getItem("user"))

  const gettingFavorites = JSON.parse(sessionStorage.getItem("favorites"))
  console.log("THIS IS GETTING THE session STORAGE for the user in THE APP PAGE", gettingUser)
  console.log("THIS IS GETTING THE SESSION STORAGE FOR FAVORITES IN THE APP PAGE", gettingFavorites)
  console.log("CHECKING THE IS LOGGED IN STATE", isLoggedIn)


  useEffect(() => {
    const favoritesArr = gettingFavorites ? [...gettingFavorites] : []
    const restoreUserObj = {
      name: gettingUser?.name,
      email: gettingUser?.email,
      favorites: favoritesArr
    }
    dispatch(restoreUserThunk(restoreUserObj)).then(() => setIsLoggedIn(true))

  }, [dispatch])



  return (
    <div>
      <HeaderNav />
      {isLoggedIn &&
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/favorites">
            <FavoritesPage />
          </Route>
          <Route exact path="/dogs/:dogId">
            <DogPage />
          </Route>
        </Switch>

      }
    </div>
  );
}

export default App;
