import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const IncidentContext = React.createContext();

export const IncidentProvider = (props) => {
  const [Incidents, setIncidents] = useState([]);

  const apiUrl = "/api/incident";
  const { getToken } = useContext(UserProfileContext);

  const getAllIncidents = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setIncidents)
    );

  const addIncident = (incident) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incident),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const getIncident = (id) =>
    getToken().then((token) =>
      fetch(`/api/incident/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const getUserIncidents = (id) =>
    getToken().then((token) =>
      fetch(`/api/incident/getbyuser/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const editIncident = (id, incident) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incident),
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Unauthorized");
      })
    );
  };
  const deleteIncidentById = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Failed to delete post.");
      })
    );
  };

  const searchIncidents = (searchString) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/search?searchString=${searchString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  return (
    <IncidentContext.Provider
      value={{
        Incidents,
        getAllIncidents,
        getUserIncidents,
        getIncident,
        addIncident,
        editIncident,
        deleteIncidentById,
        searchIncidents,
      }}
    >
      {props.children}
    </IncidentContext.Provider>
  );
};
