import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Transcript from "./Transcriptlist";
import HomePage from "./Home";
import MyIncidents from "./MyIncidents";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/newincident/:id">
          {isLoggedIn ? <Transcript /> : <Redirect to="/login" />}
        </Route>
        <Route path="/myincidents">
          {isLoggedIn ? <MyIncidents /> : <Redirect to="/login" />}
        </Route>

        <Route path="/" exact>
          {isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
