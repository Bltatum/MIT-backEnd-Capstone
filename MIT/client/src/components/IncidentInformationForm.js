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
  const [modal, setModal] = useState(false);

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllHospitals();
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
  const hospital = useRef();
  const emergency = useRef();
  const notes = useRef();
  const drugs = useRef();

  const edit = () => {
    const whichHospital = parseInt(hospital.current.value);
    const emergencyTo = parseInt(emergency.current.value);
    const updatedIncident = {
      id: incident.id,
      userProfileId: incident.userProfileId,
      address: address.current.value,
      beginDateTime: incident.beginDateTime,
      endDateTime: incident.endDateTime,
      hospitalId: whichHospital,
      emergency: emergencyTo,
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
            defaultValue={incident.hospitalId}
            ref={hospital}
            style={{ width: "15rem" }}
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
            name="emergengy"
            id="emergengy"
            className="form-control"
            defaultValue={incident.emergency}
            ref={emergency}
            style={{ width: "15rem" }}
          >
            <option value="0">
              {incident.emergency === true ? "Emergency" : "Non Emergency"}
            </option>
            <option value="1">Emergency</option>
            <option value="0">Non Emergency</option>
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
