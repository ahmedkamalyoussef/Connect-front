import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

const CustomNavbar = () => {
  const token=useSelector((auth)=>auth.auth.token)
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5104/api/Account/user-roles', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setUserRoles(response.data);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };

    fetchUserRoles();
  }, [token]);
  

  return (
    <Navbar expand="lg" variant="light" bg="body-tertiary">
      <Container fluid>
        {/* Navbar toggle button */}
        <Navbar.Toggle aria-controls="navbarSupportedContent">
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>

        {/* Navbar brand */}
        <Navbar.Brand href="#">
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
            height="15"
            alt="Logo"
            loading="lazy"
          />
        </Navbar.Brand>

        {/* Navbar links */}
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link to={'/home'}>Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            {userRoles.includes('Freelancer') && <Nav.Link href="#">My Business</Nav.Link>}
            {userRoles.includes('Admin') && <Nav.Link href="#">Admin Dashboard</Nav.Link>}
            <Nav.Link href="#">About us</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Right elements */}
        <div className="d-flex align-items-center">
          {/* Placeholder for other right elements like shopping cart or user avatar */}
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
