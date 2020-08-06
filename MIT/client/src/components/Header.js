import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import SpeechRecognition from "react-speech-recognition";
import "../css/Home.css";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const stop = () => SpeechRecognition.stopListening();

  if (isLoggedIn === true) {
    return (
      <div>
        <Navbar color="dark" dark expand="lg">
          <NavbarBrand tag={RRNavLink} to="/">
            M.I.T.
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <>
                  <NavItem color="white">
                    <RRNavLink
                      to="/"
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={(e) => {
                        toggle(e);
                        stop();
                      }}
                    >
                      Home
                    </RRNavLink>
                  </NavItem>
                  <NavItem>
                    <RRNavLink
                      to="/incidents"
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={(e) => {
                        toggle(e);
                        stop();
                      }}
                    >
                      My Incidents
                    </RRNavLink>
                  </NavItem>

                  <NavItem>
                    <a
                      aria-current="page"
                      className="nav-link"
                      style={{ cursor: "pointer", color: "white" }}
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Medical Incident Transcriber</h1>
      </div>
    );
  }
}
