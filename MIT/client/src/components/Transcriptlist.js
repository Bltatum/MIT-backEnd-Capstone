import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Form, Input, FormGroup } from "reactstrap";
import "../css/Transcript.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IndividualTranscriptContext } from "../providers/IndividualTranscriptProvider";
import { useParams } from "react-router-dom";
import { IncidentContext } from "../providers/IncidentProvider";

const Transcript = () => {
  const { addIndividualTranscript } = useContext(IndividualTranscriptContext);
  const { editIncident, getIncident } = useContext(IncidentContext);
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const {
    transcript,
    resetTranscript,
    finalTranscript,
    listening,
  } = useSpeechRecognition();
  const start = () => SpeechRecognition.startListening({ continuous: true });
  const stop = () => SpeechRecognition.stopListening();
  const fullStop = () =>
    SpeechRecognition.startListening({ continuous: false });
  const reset = () => resetTranscript();
  const { id } = useParams();
  const [incident, setIncident] = useState();
  const [individualTans, setIndividualTrans] = useState([]);
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
    getIncident(id).then(setIncident);
  }, []);

  let endDate = new Date();
  const save = () => {
    const updatedIncident = {
      id: id,
      userProfileId: userProfileId,
      address: incident.address,
      beginDateTime: incident.beginDateTime,
      endDateTime: endDate,
    };
    editIncident(updatedIncident.id, updatedIncident).then(
      window.location.reload(false)
    );
  };

  useEffect(() => {
    if (finalTranscript !== "") {
      reset();
      setIndividualTrans([
        ...individualTans,
        formattedDate + "-" + finalTranscript,
      ]);
      addIndividualTranscript({
        startDateTime: new Date(),
        text: finalTranscript,
        incidentId: id,
        userProfileId: userProfileId,
      });
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
        {individualTans.map((a) => (
          <h6>{a}.</h6>
        ))}
      </Form>

      <div className="control">
        <Button onClick={start}>Start</Button>
        <br />
        <Button onClick={(fullStop, stop)}>Stop</Button>
        <br />
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
};
export default Transcript;
