import React from "react"
import { Route, Switch } from "react-router-dom"
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";


function App() {
  return (
    <div>
      <Switch>
        <Route exact path = "/login">
          <LoginPage />
        </Route>
        <Route exact path = "/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
