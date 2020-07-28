import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const history = useHistory();

  const routeHome = () => {
    let path = `/`;
    history.push(path);
  };

  const routeMyIncidents = () => {
    let path = `/incidents`;
    history.push(path);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          M.I.T.
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      routeHome(e);
                      toggle();
                    }}
                  >
                    Home
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      routeMyIncidents(e);
                      toggle();
                    }}
                  >
                    My Incidents
                  </a>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
