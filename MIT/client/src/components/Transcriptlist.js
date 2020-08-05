import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "reactstrap";
import "../css/Transcript.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IndividualTranscriptContext } from "../providers/IndividualTranscriptProvider";
import { useParams, useHistory } from "react-router-dom";
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
  const [startClicked, setClicked] = useState(false);
  const [counter, setCounter] = useState();
  const [startTime, setStartTimer] = useState(false);

  window.onbeforeunload = function () {
    stop();
  };

  const history = useHistory();

  const routeChange = () => {
    let path = `/incidents`;
    history.push(path);
  };

  let date = new Date();
  let formattedDate =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  useEffect(() => {
    getIncident(id).then(setIncident);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    editIncident(updatedIncident.id, updatedIncident).then(routeChange);
  };

  useEffect(() => {
    if (finalTranscript !== "") {
      reset();
      setIndividualTrans([
        ...individualTans,
        formattedDate + "-  " + finalTranscript,
      ]);
      addIndividualTranscript({
        startDateTime: formattedDate,
        text: finalTranscript,
        incidentId: id,
        userProfileId: userProfileId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalTranscript]);

  useEffect(() => {
    if (startTime === true) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [startTime, counter]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="transcript" style={{ height: "30rem" }}>
      <span className="listening">
        {counter > 0 ? (
          <div style={{ color: "white" }}>
            <h4 className="h4">Recording: {counter}</h4>
          </div>
        ) : (
          <h4 className="h4">Listening {listening ? "On" : "Off"}</h4>
        )}
      </span>
      <br />
      <div className="transcripting">
        {transcript.length ? <h3>"{transcript}"</h3> : ""}
      </div>

      <br />
      <Form id="addTransForm" className="savedTransContainer">
        {individualTans.map((a) => (
          <div key={a}>{a}.</div>
        ))}
      </Form>

      <div className="control">
        {!listening ? (
          <Button
            active
            onClick={(e) => {
              start(e);
              setClicked(true);
              setCounter(2);
              setStartTimer(true);
            }}
          >
            Start Transcription
          </Button>
        ) : (
          <Button
            disabled
            onClick={(e) => {
              start(e);
              setClicked(true);
              setCounter(2);
              setStartTimer(true);
            }}
          >
            Start Transcription
          </Button>
        )}
        ;
        {listening ? (
          <Button active onClick={(fullStop, stop)}>
            Stop Transcription
          </Button>
        ) : (
          <Button disabled onClick={(fullStop, stop)}>
            Stop Transcription
          </Button>
        )}
        {!listening && startClicked === true ? (
          <Button
            active
            onClick={(e) => {
              save(e);
              stop();
            }}
          >
            Save Transcript
          </Button>
        ) : (
          <Button
            disabled
            onClick={(e) => {
              save(e);
              stop();
            }}
          >
            Save Transcript
          </Button>
        )}
      </div>
    </div>
  );
};

export default Transcript;
