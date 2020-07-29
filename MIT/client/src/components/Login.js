import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Center from "react-center";
import "../css/Login.css";
import Register from "./Register";

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <Center>
      <Form onSubmit={loginSubmit} className="loginForm">
        <fieldset>
          <FormGroup>
            <Label for="email">
              <h3>Email</h3>
            </Label>
            <Input
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">
              <h3>Password</h3>
            </Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button className="loginButton">
              <h4 className="login">Login</h4>
            </Button>
          </FormGroup>

          <em>
            <h4 className="register">Not registered?</h4>
            <Link to="register">
              <h4 className="registerLink">Register</h4>
            </Link>
          </em>
        </fieldset>
      </Form>
    </Center>
  );
}
