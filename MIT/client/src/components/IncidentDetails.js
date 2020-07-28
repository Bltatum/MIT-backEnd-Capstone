import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Toast,
  ToastBody,
  ToastHeader,
  Input,
  Form,
} from "reactstrap";
import { useParams, useLocation, useHistory } from "react-router-dom";
import React, { useState, useContext, useEffect, useRef } from "react";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";

const IncidentDetails = () => {
  const { getIncident, deleteIncidentById, editIncident } = useContext(
    IncidentContext
  );
  const [incident, setIncident] = useState({});
  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);
  const { id } = useParams();

  useEffect(() => {
    getIncident(id).then(setIncident);
  }, []);
  let formatedDate = null;
  let unformatedDate = null;

  if (incident.beginDateTime != null) {
    unformatedDate = incident.beginDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    formatedDate = month + "/" + day + "/" + year;
  }

  //   let formatedTransDate = null;
  //   let unformatedTransDate = null;

  //   if (incident.individualTranscript.startDateTime != null) {
  //     unformatedTransDate = incident.individualTranscript.startDateTime.split(
  //       "T"
  //     )[0];
  //     const [year, month, day] = unformatedTransDate.split("-");
  //     formatedTransDate = month + "/" + day + "/" + year;
  //   }

  const history = useHistory();

  const routeChange = () => {
    let path = `/incidents`;
    history.push(path);
  };
  const address = useRef();
  const edit = () => {
    const updatedIncident = {
      id: incident.id,
      userProfileId: incident.userProfileId,
      address: address.current.value,
      beginDateTime: incident.beginDateTime,
      endDateTime: incident.endDateTime,
    };
    editIncident(updatedIncident.id, updatedIncident).then(() => {
      getIncident(id).then(setIncident).then(toggleToast);
    });
  };

  const Delete = () => {
    deleteIncidentById(incident.id).then((p) => {
      history.push("/incidents");
    });
  };

  return (
    <Card>
      <CardBody>
        <p>
          <h4>Address: {incident.address}</h4>
        </p>
        <p>
          <h5>Start: {incident.beginDateTime}</h5>
        </p>
        <p>
          {incident.individualTranscript === undefined ? (
            <p>No transcript available</p>
          ) : (
            incident.individualTranscript.map((it) => (
              <p>
                {it.startDateTime}:<br /> {it.text}
              </p>
            ))
          )}
        </p>
      </CardBody>
      <Toast isOpen={showToast}>
        <ToastHeader className="bg-danger">Edit Address</ToastHeader>
        <ToastBody>
          <input
            id="address"
            ref={address}
            type="text"
            placeholder={incident.address}
            className="form-control"
          />
        </ToastBody>
        <div className="buttonContainer">
          <Button onClick={toggleToast} color="primary">
            No, Cancel
          </Button>
          <Button onClick={edit} color="danger">
            Edit
          </Button>
        </div>
      </Toast>
      <Button
        onClick={(evt) => {
          evt.preventDefault();
          routeChange();
        }}
      >
        Go Back
      </Button>
      <Button
        color="danger"
        onClick={(evt) => {
          evt.preventDefault();
          Delete();
        }}
      >
        Delete
      </Button>
      <Button
        onClick={(evt) => {
          evt.preventDefault();
          toggleToast();
        }}
      >
        Edit Address
      </Button>
    </Card>
  );
};

export default IncidentDetails;
