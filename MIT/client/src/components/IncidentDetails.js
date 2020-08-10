import {
  Card,
  CardBody,
  Button,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
  Toast,
  ToastBody,
} from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { IncidentContext } from "../providers/IncidentProvider";
import "../css/Incident.css";
import { IncidentInformationForm } from "./IncidentInformationForm";

const IncidentDetails = () => {
  const { getIncident, deleteIncidentById } = useContext(IncidentContext);
  const [incident, setIncident] = useState({});
  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);
  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);

  const { id } = useParams();
  const refreshData = () => {
    getIncident(id).then(setIncident);
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let formatedDate = null;
  let unformatedDate = null;

  if (incident.beginDateTime != null) {
    unformatedDate = incident.beginDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    formatedDate = month + "/" + day + "/" + year;
  }

  const history = useHistory();

  const routeChange = () => {
    let path = `/incidents`;
    history.push(path);
  };

  const Delete = () => {
    deleteIncidentById(incident.id).then((p) => {
      history.push("/incidents");
    });
  };

  return (
    <>
      <div className="detailscontainer">
        <Card>
          <CardBody className="details">
            <CardImg top src={incident.imageLocation} alt={incident.address} />
            <div className="header">
              <h4>Address: {incident.address}</h4>
            </div>
            <div>
              <h5 className="header">Date: {formatedDate}</h5>
            </div>
            {incident.hospital ? (
              <div>
                <h6 className="header">
                  Transported to: {incident.hospital.name}
                </h6>
              </div>
            ) : (
              " "
            )}
            {incident.emergency !== null ? (
              <div>
                <h6 className="header">
                  Transport Mode:{" "}
                  {incident.emergency === true ? "Emergency" : "Non Emergency"}
                </h6>
              </div>
            ) : (
              " "
            )}
            {incident.notes ? (
              <div>
                <h6 className="header">Notes: {incident.notes}</h6>
              </div>
            ) : (
              " "
            )}

            <div className="indTrans">
              {incident.individualTranscript === undefined ? (
                <p>No transcript available</p>
              ) : (
                incident.individualTranscript.map((it) => (
                  <p key={it.id}>
                    {it.startDateTime.split(/[T\\.]/)[1]}
                    <br /> {it.text}
                  </p>
                ))
              )}
            </div>
          </CardBody>
        </Card>
        <div className="toastDelete">
          <Toast isOpen={showToast}>
            <ToastBody>Confirm Delete</ToastBody>
            <div className="toastButtonContainer">
              <Button onClick={toggleToast}>Cancel</Button>
              <Button onClick={Delete} color="danger">
                Delete
              </Button>
            </div>
          </Toast>
        </div>

        <div className="buttons"></div>
        <Button
          className="button"
          onClick={(evt) => {
            evt.preventDefault();
            routeChange();
          }}
        >
          Go Back
        </Button>
        <Button
          className="button"
          onClick={() => {
            toggleToast();
          }}
        >
          Delete
        </Button>
        <Button
          className="button"
          onClick={() => {
            toggleEdit();
          }}
        >
          Add Details
        </Button>
      </div>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit} style={{ backgroundColor: "black" }}>
          Add Incident Information
        </ModalHeader>
        <ModalBody>
          <IncidentInformationForm
            key={incident.id}
            toggleEdit={toggleEdit}
            incident={incident}
            refreshData={refreshData}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default IncidentDetails;
