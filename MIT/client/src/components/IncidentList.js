import React, { useContext, useEffect, useState } from "react";
import Incident from "./Incident";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";
import {
  Form,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  CardHeader,
  Card,
  CardImg,
  Modal,
} from "reactstrap";

const IncidentList = () => {
  const { getUserIncidents, searchIncidents } = useContext(IncidentContext);
  const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [incidentState, setIncidentState] = useState([]);
  const [results, setResults] = useState([]);
  const [open, show] = useState(false);

  useEffect(() => {
    getUserIncidents(currentUserId).then(setIncidentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (evt) => {
    searchIncidents(evt.target.value).then((results) => setResults(results));
    if (evt.target.value !== "") {
      show(true);
    } else {
      show(false);
    }
  };

  // return (
  //   <div className="row justify-content-center">
  //     <div className="incidentList">
  //       <span>
  //         <h1>Incidents</h1>
  //       </span>
  //       <Input
  //         className="search"
  //         type="text"
  //         onChange={handleChange}
  //         placeholder="Search Incidents"
  //       />
  //       {results.length ? (
  //         <div>
  //           {results.map((r) => (
  //             <Incident key={r.id} incident={r} />
  //           ))}
  //         </div>
  //       ) : (
  //         <div className="individualIncidentContainer">
  //           {incidentState.map((i) => (
  //             <Incident key={i.id} incident={i} />
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
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
        <Dropdown nav isOpen={open}>
          <DropdownMenu
            right
            style={{
              marginTop: "2rem",
              width: "318px",
              textAlign: "center",
              padding: ".5rem",
              height: "18rem",
              overflow: "scroll",
            }}
          >
            <DropdownItem header style={{ backgroundColor: "white" }}>
              Search Results
            </DropdownItem>
            {results.length ? (
              results.map((r) => {
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
