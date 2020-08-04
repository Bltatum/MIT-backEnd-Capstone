import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const HospitalContext = React.createContext();

export const HospitalProvider = (props) => {
  const apiUrl = "/api/hospital";

  const { getToken } = useContext(UserProfileContext);
  const [hospitals, setHospitals] = useState([]);

  const getAllHospitals = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setHospitals)
    );

  const getHospital = (id) => {
    getToken()
      .then((token) =>
        fetch(`/api/hospital/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json());
  };

  return (
    <HospitalContext.Provider
      value={{ hospitals, getAllHospitals, getHospital }}
    >
      {props.children}
    </HospitalContext.Provider>
  );
};
