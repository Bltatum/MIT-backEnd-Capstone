import React, { useContext, useState, useRef, useEffect } from "react";
import { IncidentContext } from "../providers/IncidentProvider";
import { Button, Input } from "reactstrap";
import { HospitalContext } from "../providers/HospitalProvider";

export const IncidentInformationForm = ({
  incident,
  toggleEdit,
  refreshData,
}) => {
  const { editIncident } = useContext(IncidentContext);
  const { getAllHospitals, hospitals } = useContext(HospitalContext);

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hospitalId, setHospital] = useState(incident.hospitalId);
  const [emergency, setEmergency] = useState(incident.emergency);

  useEffect(() => {
    getAllHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const address = useRef();
  const notes = useRef();
  const drugs = useRef();

  const edit = () => {
    const updatedIncident = {
      id: incident.id,
      userProfileId: incident.userProfileId,
      address: address.current.value,
      beginDateTime: incident.beginDateTime,
      endDateTime: incident.endDateTime,
      hospitalId: parseInt(hospitalId),
      emergency: emergency,
      notes: notes.current.value,
      drugs: drugs.current.value,
      imageLocation: image ? image : incident.imageLocation,
    };

    editIncident(updatedIncident.id, updatedIncident)
      .then(toggleEdit)
      .then(() => {
        refreshData();
      });
  };

  return (
    <form className="form--UpdateIncident">
      <fieldset>
        <div className="form-group">
          <label htmlFor="address"> Address </label>
          <input
            type="text"
            name="address"
            className="form-control"
            defaultValue={incident.address}
            ref={address}
          />

          <label htmlFor="hospital">Hospital Transported</label>
          <select
            name="hospital"
            id="hospitalId"
            className="form-control"
            value={hospitalId ? hospitalId : " "}
            onChange={(e) => setHospital(parseInt(e.target.value))}
            style={{ width: "15rem", maxheight: "20rem", overflow: "scroll" }}
          >
            <option value="">Select Hospital</option>
            {hospitals.map((h) => {
              return (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              );
            })}
          </select>

          <label htmlFor="ifr"> Transport mode to Hospital</label>
          <select
            name="emergency"
            id="emergency"
            className="form-control"
            value={emergency ? emergency : " "}
            onChange={(e) =>
              setEmergency(e.target.value !== " " ? e.target.value : null)
            }
            style={{ width: "15rem" }}
          >
            <option value=" ">Tranport Mode </option>
            <option value="true">Emergency</option>
            <option value="false">Non Emergency</option>
          </select>

          <label htmlFor="drugs"> Drugs Given </label>
          <input
            type="text"
            name="drugs"
            className="form-control"
            defaultValue={incident.drugs}
            ref={drugs}
          />

          <label htmlFor="notes"> Notes </label>
          <textarea
            type="text"
            name="notes"
            className="form-control"
            defaultValue={incident.notes}
            ref={notes}
          />

          <label htmlFor="image"> Image </label>
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
        </div>
      </fieldset>
      <Button
        className="button"
        onClick={(evt) => {
          evt.preventDefault();
          edit();
        }}
      >
        Save
      </Button>
      <Button color="secondary" onClick={toggleEdit}>
        Cancel
      </Button>
    </form>
  );
};
