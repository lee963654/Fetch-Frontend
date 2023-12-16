import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom"
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { restoreUserThunk } from "./store/session";
import DogPage from "./components/DogPage";
import HeaderNav from "./components/HeaderNav";



function App() {
  const sessionUser = useSelector(state => state)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const gettingUser = JSON.parse(sessionStorage.getItem("user"))
  console.log("THIS IS GETTING THE session STORAGE in THE APP PAGE", gettingUser)
  console.log("CHECKING THE IS LOGGED IN STATE", isLoggedIn)

  useEffect(() => {
    dispatch(restoreUserThunk(gettingUser)).then(() => setIsLoggedIn(true))

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
          <Route exact path="/dogs/:dogId">
            <DogPage />
          </Route>
        </Switch>

      }
    </div>
  );
}

export default App;
