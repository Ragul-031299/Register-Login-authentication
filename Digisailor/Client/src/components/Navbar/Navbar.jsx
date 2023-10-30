import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import { FaUserCog } from 'react-icons/fa'; // Import FontAwesome icons
import "./Navbar.css";

const NavBar = () => {
  return (

    <Navbar className='px-5 ' bg="light" expand="xl" sticky="top">
      <Navbar.Brand href="/">
        <img
          src="/Assets/images/digi2.png"
          alt="Logo"
          width="100"
          height="55"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse className='ms-5 justify-content-around' id="navbar-nav">
        <Nav className="ms-2">
          <NavDropdown title="Talent Services" id="talent-services">
            <NavDropdown.Item href="#">Demo Submenu 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Demo Submenu 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Demo Submenu 3</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="#">Career Progression</Nav.Link>
          <NavDropdown title="Industry Focus" id="career-industry">
            <NavDropdown.Item href="#">Demo Submenu 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Demo Submenu 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Demo Submenu 3</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#">Knowledge Vault</Nav.Link>
          <Link className='my-lg-0 my-2' to="/employe-tab">
            <Button variant="primary">Submit CV</Button>
          </Link>
          <Link className='my-lg-0 my-2' to="/find-talent"><Button variant="info">Find a Talent</Button></Link>
          <Link className='ms-lg-5' to="/registration">
            <Button variant="outline-dark">
              <FaUserCog />
            </Button>
          </Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
};

export default NavBar;
