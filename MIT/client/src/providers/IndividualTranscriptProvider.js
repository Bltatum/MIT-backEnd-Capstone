import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const IndividualTranscriptContext = React.createContext();

export const IndividualTranscriptProvider = (props) => {
  const [ITs, setIT] = useState([]);

  const apiUrl = "/api/IndividualTranscript";
  const { getToken } = useContext(UserProfileContext);

  const getAllIndividualTranscripts = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setIT)
    );

  const addIndividualTranscript = (it) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(it),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const getIndividualTranscript = (id) =>
    getToken().then((token) =>
      fetch(`/api/IndividualTranscript/${id}`, {
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

  const getUserIndividualTranscripts = (id) =>
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

  return (
    <IndividualTranscriptContext.Provider
      value={{
        ITs,
        getAllIndividualTranscripts,
        getIndividualTranscript,
        addIndividualTranscript,
        getUserIndividualTranscripts,
      }}
    >
      {props.children}
    </IndividualTranscriptContext.Provider>
  );
};
