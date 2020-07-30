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
  CardImg,
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
  const [showImageToast, setShowImageToast] = useState(false);
  const toggleImageToast = () => setShowImageToast(!showImageToast);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const addImage = () => {
    const updatedIncident = {
      id: incident.id,
      userProfileId: incident.userProfileId,
      address: incident.address,
      beginDateTime: incident.beginDateTime,
      endDateTime: incident.endDateTime,
      imageLocation: image,
    };
    editIncident(updatedIncident.id, updatedIncident).then(() => {
      getIncident(id).then(setIncident).then(toggleImageToast);
    });
  };

  const Delete = () => {
    deleteIncidentById(incident.id).then((p) => {
      history.push("/incidents");
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "brennen");
    setLoading(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dxpkkasks/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="detailscontainer">
      <Card>
        <CardBody className="details">
          <CardImg top src={incident.imageLocation} alt={incident.address} />
          <p>
            <h4>Address: {incident.address}</h4>
          </p>
          <p>
            <h5>Date: {formatedDate}</h5>
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

        <Toast isOpen={showToast} className="toast">
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
            <Button onClick={toggleToast} className="cancel">
              Cancel
            </Button>
            <Button onClick={edit} className="save">
              Save
            </Button>
          </div>
        </Toast>
        <Toast isOpen={showImageToast} className="toastImage">
          <ToastBody>
            <Input
              type="file"
              name="file"
              placeholder="Upload image here"
              onChange={uploadImage}
            />
            {loading ? (
              <h4>Loading...</h4>
            ) : (
              <img src={image} style={{ width: "100px" }} alt=" " />
            )}
          </ToastBody>
          <div className="buttonContainer">
            <Button onClick={toggleImageToast} className="cancel">
              Cancel
            </Button>
            <Button onClick={addImage} className="saveImage">
              Save Image
            </Button>
          </div>
        </Toast>
      </Card>
      <div className="buttons">
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
          onClick={(evt) => {
            evt.preventDefault();
            Delete();
          }}
        >
          Delete
        </Button>
        <Button
          className="button"
          onClick={(evt) => {
            evt.preventDefault();
            toggleToast();
          }}
        >
          Edit Address
        </Button>
        <Button
          className="button"
          onClick={(evt) => {
            evt.preventDefault();
            toggleImageToast();
          }}
        >
          Add Image
        </Button>
      </div>
    </div>
  );
};

export default IncidentDetails;
