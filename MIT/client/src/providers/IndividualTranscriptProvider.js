import React, { useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const IndividualTranscriptContext = React.createContext();

export const IndividualTranscriptProvider = (props) => {
  const apiUrl = "/api/IndividualTranscript";
  const { getToken } = useContext(UserProfileContext);

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

  return (
    <IndividualTranscriptContext.Provider
      value={{
        addIndividualTranscript,
      }}
    >
      {props.children}
    </IndividualTranscriptContext.Provider>
  );
};
