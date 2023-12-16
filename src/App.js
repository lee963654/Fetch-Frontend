import React, { useEffect } from "react"

import { Route, Switch } from "react-router-dom"
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

import DogPage from "./components/DogPage";



function App() {

useEffect(() => {
  console.log("IN THE APP")
}, [])

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
