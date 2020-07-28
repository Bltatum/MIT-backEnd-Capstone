import { Card, CardBody, CardFooter, Button } from "reactstrap";
import { useParams, useLocation, useHistory } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";
import { Redirect } from "react-router-dom";

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
        <p>Personel: {incident.userProfile.lastName}</p>
      </CardBody>
    </Card>
  );
};

export default Incident;
