import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "reactstrap";

import { useHistory } from "react-router-dom";
import "../css/Home.css";

const MyIncidents = () => {
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

  return (
    <div className="myIncidents">
      <div>
        <h1>Your Incidents</h1>
      </div>
    </div>
  );
};
export default MyIncidents;
