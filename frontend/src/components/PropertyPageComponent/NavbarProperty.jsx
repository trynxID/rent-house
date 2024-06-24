import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarProperty = () => {
  const [userData, setUserData] = useState({});

  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let valUser = 0;
    if (localStorage.getItem("user")) {
      valUser = JSON.parse(localStorage.getItem("user"));
    }
    const userId = valUser.id;
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `https://rent-house-henna.vercel.app/api/users/detail/${userId}`
      );
      const user = response.data;
      setUserData(user);
      setProfileImage(user.img_url);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.put(
        `https://rent-house-henna.vercel.app/api/users/logout/${userData._id}`
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/logo-brands.png" alt="logo" width="80%" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto px-auto">
            {userData._id ? (
              <>
                <Nav.Link as={Link} to="/booking">
                  Booking
                </Nav.Link>
                <Nav.Link as={Link} to="/transaksi">
                  Transaksi
                </Nav.Link>
                <NavDropdown
                  title={
                    <>
                      <img
                        src={`https://rent-house-henna.vercel.app${profileImage}`}
                        alt="Profile"
                        width="30"
                        height="30"
                        className="rounded-circle"
                      />{" "}
                      {userData.fullname}
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/myprofile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="ms-4 border-login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarProperty;
