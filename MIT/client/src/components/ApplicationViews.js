import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Transcript from "./Transcriptlist";
import HomePage from "./Home";
import IncidentList from "./IncidentList";
import IncidentDetails from "./IncidentDetails";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/newincident/:id">
          {isLoggedIn ? <Transcript /> : <Redirect to="/login" />}
        </Route>
        <Route path="/incidents">
          {isLoggedIn ? <IncidentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/" exact>
          {isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/incident/:id">
          {isLoggedIn ? <IncidentDetails /> : <Redirect to="/login" />}
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
