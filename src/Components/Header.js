import React, { useState, useEffect } from "react";
import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Css/Header.css";

function Header({ currentUser, onShowSidebar }) {
  const [isVisible, setIsVisible] = useState(true);
  let lastScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setIsVisible(false); // Ẩn Header khi cuộn xuống
      } else {
        setIsVisible(true); // Hiển thị Header khi cuộn lên
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      expand="lg"
      className={`header ${isVisible ? "" : "hidden"}`}
    >
      <Container>
        <Navbar.Brand
          as={Link} to="/dictionary"
          style={{ fontSize: "1.8rem", fontWeight: "bold" }}
        >
          TỪ ĐIỂN
        </Navbar.Brand>
        {currentUser ? (
          <Button variant="outline-light" onClick={onShowSidebar}>
            Menu
          </Button>
        ) : (
          <Nav className="ms-auto">
            <Button variant="outline-light" href="/login" className="me-2">
              Login
            </Button>
            <Button variant="outline-light" href="/register">
              Register
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
