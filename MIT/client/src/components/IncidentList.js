import React, { useContext, useEffect, useState } from "react";
import Incident from "./Incident";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";

const IncidentList = () => {
  const { getUserIncidents } = useContext(IncidentContext);
  const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [incidentState, setIncidentState] = useState([]);
  const [searchTerms, setTerms] = useState(" ");

  useEffect(() => {
    getUserIncidents(currentUserId).then(setIncidentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="incidentList">
        <span>
          <h1>Incidents</h1>
        </span>
        <SearchBar setTerms={setTerms} />
        {searchTerms !== "" ? (
          <SearchResults searchTerms={searchTerms} />
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
