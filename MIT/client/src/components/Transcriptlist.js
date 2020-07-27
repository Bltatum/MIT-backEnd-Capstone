import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Form, Input, FormGroup } from "reactstrap";
import "../css/Transcript.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IndividualTranscriptContext } from "../providers/IndividualTranscriptProvider";
import { useHistory, useParams, Route, Redirect } from "react-router-dom";
import { IncidentContext } from "../providers/IncidentProvider";
import HomePage from "./Home";

let array = [];

const Transcript = () => {
  const { addIndividualTranscript } = useContext(IndividualTranscriptContext);
  const { addIncident, editIncident, getIncident } = useContext(
    IncidentContext
  );
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const {
    transcript,
    resetTranscript,
    interimTranscript,
    finalTranscript,
    listening,
    transcribing,
  } = useSpeechRecognition();
  const start = () => SpeechRecognition.startListening({ continuous: true });
  const stop = () => SpeechRecognition.stopListening();
  const fullStop = () =>
    SpeechRecognition.startListening({ continuous: false });
  const reset = () => resetTranscript();
  const { id } = useParams();
  // const incident = getIncident(id);

  // const save = () => {
  //   const updatedIncident = {
  //     id: id,
  //     address: incident.address,
  //     endDateTime: new Date(),
  //   };
  //   editIncident(updatedIncident.id, updatedIncident)
  //    .then(
  //     window.location.reload(false)
  //    );
  // };

  let date = new Date();
  let formattedDate =
    date.getMonth() +
    "-" +
    (date.getDate() + 1) +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  useEffect(() => {
    if (finalTranscript !== "") {
      reset();
      array.push(formattedDate + "-    " + finalTranscript);
      addIndividualTranscript({
        startDateTime: new Date(),
        text: finalTranscript,
        incidentId: id,
        userProfileId: userProfileId,
      });
      console.log("final result:", array);
    }
  }, [finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="transcript">
      <span className="listening">
        <h4>Listening-</h4>
        <h4> {listening ? "On" : "Off"}</h4>
      </span>
      <br />

      <div className="transcripting">
        <h3>"{transcript}"</h3>
      </div>
      <br />
      <Form id="addTransForm" className="savedTransContainer">
        {array.map((a) => (
          <h6>{a}.</h6>
        ))}
      </Form>

      <div className="control">
        <Button onClick={start}>Start</Button>
        <br />
        <Button onClick={(fullStop, stop)}>Stop</Button>
        <br />
        {/* <Button onClick={save}>Save</Button> */}
      </div>
    </div>
  );
};
export default Transcript;
