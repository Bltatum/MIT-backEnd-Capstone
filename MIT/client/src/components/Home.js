import React, { useState, useContext } from "react";
import { Button, Form } from "reactstrap";
import { IncidentContext } from "../providers/IncidentProvider";
import { useHistory } from "react-router-dom";
import "../css/Home.css";

const HomePage = () => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [formState, setformState] = useState({ userProfileId: +userProfileId });
  const { addIncident } = useContext(IncidentContext);

  const history = useHistory();

  const routeMyIncidents = () => {
    let path = `/incidents`;
    history.push(path);
  };

  const handleUserInput = (e) => {
    const updatedState = { ...formState };
    updatedState[e.target.id] = e.target.value;
    setformState(updatedState);
  };

  const submit = (e) => {
    e.preventDefault();
    formState.userProfileId = +userProfileId;
    formState.beginDateTime = new Date();
    formState.endDateTime = null;
    addIncident(formState).then((i) => {
      history.push(`/newincident/${i.id}`);
    });
  };
  return (
    <div className="homePage">
      <div className="homePageButtons">
        <Form onSubmit={submit}>
          <input
            type="text"
            id="address"
            required
            autoFocus
            className="form-control"
            placeholder="Incident Address"
            onChange={handleUserInput}
          />
          <Button type="submit" className="addressSubmitButton">
            Start New Incident
          </Button>
          <Button onClick={routeMyIncidents} className="viewInidentsButton">
            View Incidents
          </Button>
        </Form>
        <br />
      </div>
    </div>
  );
};
export default HomePage;
