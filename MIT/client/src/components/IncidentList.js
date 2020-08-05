import React, { useContext, useEffect, useState } from "react";
import Incident from "./Incident";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";
import { Input, Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import debounce from "lodash.debounce";

const IncidentList = () => {
  const { Incidents, getUserIncidents, searchIncidents } = useContext(
    IncidentContext
  );
  const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [incidentState, setIncidentState] = useState([]);
  const [open, show] = useState(false);

  useEffect(() => {
    getUserIncidents(currentUserId).then(setIncidentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceSearchIncidents = debounce(searchIncidents, 500);

  const handleChange = (evt) => {
    debounceSearchIncidents(evt.target.value);

    if (evt.target.value !== "") {
      show(true);
    } else {
      show(false);
    }
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
          style={{ width: "20rem", alignSelf: "center" }}
        />
        <Dropdown nav isOpen={open}>
          <DropdownMenu
            style={{
              marginTop: "1rem",
              width: "318px",
              textAlign: "center",
              padding: ".5rem",
              height: "20rem",
              overflow: "scroll",
              marginLeft: "1.25rem",
              border: "solid",
              borderWidth: "3px",
            }}
          >
            <DropdownItem header style={{ backgroundColor: "white" }}>
              Search Results
            </DropdownItem>
            {Incidents.length ? (
              Incidents.map((r) => {
                return <Incident key={r.id} incident={r} show={show} />;
              })
            ) : (
              <div style={{ width: "318px", backgroundColor: "white" }}>
                No results found.
              </div>
            )}
          </DropdownMenu>
        </Dropdown>
        <div className="individualIncidentContainer">
          {incidentState.map((i) => (
            <Incident key={i.id} incident={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentList;
