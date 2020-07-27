import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "../css/Register.css";
import Center from "react-center";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { name, email };
      register(userProfile, password).then(() => history.push("/"));
    }
  };

  return (
    <Center>
      <Form onSubmit={registerClick} className="registerForm">
        <fieldset>
          <FormGroup>
            <Label htmlFor="name">
              <h3>Name</h3>
            </Label>
            <Input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
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
            <Label for="confirmPassword">
              <h3>Confirm Password</h3>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button className="registerButton">Register</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </Center>
  );
}
