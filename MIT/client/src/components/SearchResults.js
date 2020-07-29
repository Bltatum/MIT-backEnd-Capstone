import React, { useState, useContext, useEffect } from "react";
import { IncidentContext } from "../providers/IncidentProvider";
import Incident from "./Incident";
import "../css/Search.css";

export const SearchResults = ({ searchTerms }) => {
  const { getUserIncidents } = useContext(IncidentContext);
  const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [filtered, setFiltered] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    getUserIncidents(currentUserId).then(setIncidents);
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = incidents.filter((i) =>
        i.address.toLowerCase().includes(searchTerms)
      );
      setFiltered(subset);
    } else {
      setFiltered([]);
    }
  }, [searchTerms, incidents]);

  return (
    <div className="searchResults">
      <div className="cards-column">
        {filtered.map((i) => (
          <Incident key={i.id} incident={i} />
        ))}
      </div>
    </div>
  );
};
