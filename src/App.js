import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom"
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { restoreUser } from "./store/session";
import DogPage from "./components/DogPage";


function App() {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const sessionUser = useSelector(((state) => state.session.user))

  // useEffect(() => {
  //   if(sessionUser) {
  //     dispatch(restoreUser(sessionUser)).then(() => setIsLoggedIn(true))
  //   }
  // }, [dispatch])

  return (
    <div>
      <Switch>
        <Route exact path = "/login">
          <LoginPage />
        </Route>
        <Route exact path = "/">
          <HomePage />
        </Route>
        <Route exact path = "/dogs/:dogId">
          <DogPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
