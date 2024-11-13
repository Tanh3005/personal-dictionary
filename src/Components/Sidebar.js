import React from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Nav } from "react-bootstrap";

function Sidebar({ show, onHide, currentUser, onLogout }) {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end" // Changed to 'end' to move the Sidebar to the right
      className="bg-dark text-white" // Dark background with white text
    >
      <Offcanvas.Header closeButton className="bg-dark text-white">
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="bg-dark text-white">
        <Nav className="flex-column">
          {currentUser ? (
            currentUser.role === 0 ? (
              // Admin Links
              <>
                <Nav.Link
                  as={Link}
                  to="/dictionary"
                  onClick={onHide}
                  className="text-white"
                  style={{ padding: "10px 15px" }}
                >
                  TỪ ĐIỂN
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/admin-panel"
                  onClick={onHide}
                  className="text-white"
                  style={{ padding: "10px 15px" }}
                >
                  QUẢN LÝ
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/add-word"
                  onClick={onHide}
                  className="text-white"
                  style={{ padding: "10px 15px" }}
                >
                  THÊM TỪ MỚI
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/approval-page"
                  onClick={onHide}
                  className="text-white"
                  style={{ padding: "10px 15px" }}
                >
                  PHÊ DUYỆT
                </Nav.Link>
              </>
            ) : (
              // Regular User Link
              <>
                <Nav.Link
                  as={Link}
                  to="/dictionary"
                  onClick={onHide}
                  className="text-white"
                  style={{ padding: "10px 15px" }}
                >
                  TỪ ĐIỂN
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/add-word-user"
                  onClick={onHide}
                  className="text-white"
                  style={{ padding: "10px 15px" }}
                >
                  THÊM TỪ MỚI
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/flash-card"
                  onClick={onHide}
                  className="text-white"
                  style={{ padding: "10px 15px" }}
                >
                  HỌC GHI NHỚ
                </Nav.Link>
              </>
            )
          ) : (
            // Prompt to Login
            <p className="text-white mt-3">Please log in!</p>
          )}
          {currentUser && (
            <Nav.Link
              onClick={() => {
                onHide();
                onLogout();
              }}
              className="text-white mt-4"
              style={{ padding: "10px 15px" }}
            >
              Thoát
            </Nav.Link>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
