import React, { useContext, useEffect, useState } from "react";
import Incident from "./Incident";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";
import { Center } from "react-center";

const IncidentList = () => {
  const { getUserIncidents } = useContext(IncidentContext);
  const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [incidentState, setIncidentState] = useState([]);

  useEffect(() => {
    getUserIncidents(currentUserId).then(setIncidentState);
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="incidentList">
        <span>
          <h1>Incidents</h1>
        </span>
        <div className="individualIncident">
          {incidentState.map((i) => (
            <Incident key={i.id} incident={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentList;
