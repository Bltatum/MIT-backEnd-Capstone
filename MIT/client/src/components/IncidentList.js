import React, { useContext, useEffect, useState } from "react";
import Incident from "./Incident";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";
import { Input } from "reactstrap";

const IncidentList = () => {
  const { getUserIncidents, searchIncidents } = useContext(IncidentContext);
  const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [incidentState, setIncidentState] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getUserIncidents(currentUserId).then(setIncidentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (evt) => {
    searchIncidents(evt.target.value).then((results) => setResults(results));
  };

  return (
    <div className="row justify-content-center">
      <div className="incidentList">
        <span>
          <h1>Incidents</h1>
        </span>
        <Input
          className="search"
          type="text"
          onChange={handleChange}
          placeholder="Search Incidents"
        />
        {results.length ? (
          <div>
            {results.map((r) => (
              <Incident key={r.id} incident={r} />
            ))}
          </div>
        ) : (
          <div className="individualIncidentContainer">
            {incidentState.map((i) => (
              <Incident key={i.id} incident={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentList;
