import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import React from "react";

import "../css/Incident.css";

const Incident = ({ incident }) => {
  let formatedDate = null;
  let unformatedDate = null;

  if (incident.beginDateTime != null) {
    unformatedDate = incident.beginDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    formatedDate = month + "/" + day + "/" + year;
  }

  const history = useHistory();

  const routeChange = () => {
    let path = `/incident/${incident.id}`;
    history.push(path);
  };

  return (
    <Card
      className="incident"
      onClick={(evt) => {
        evt.preventDefault();
        routeChange();
      }}
    >
      <CardBody>
        <p>Address: {incident.address}</p>
        <p>Date: {formatedDate}</p>
        <p>Personnel: {incident.userProfile.lastName}</p>
      </CardBody>
    </Card>
  );
};

export default Incident;
