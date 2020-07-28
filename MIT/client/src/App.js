import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import "./App.css";
import Header from "./components/Header";
import { IndividualTranscriptProvider } from "./providers/IndividualTranscriptProvider";
import { IncidentProvider } from "./providers/IncidentProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <IncidentProvider>
            <IndividualTranscriptProvider>
              <Header />
              <ApplicationViews />
            </IndividualTranscriptProvider>
          </IncidentProvider>
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;
