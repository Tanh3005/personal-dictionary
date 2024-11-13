import React, { useState } from "react";
import axios from "axios";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:9999/accounts", {
      params: { username, password },
    });

    if (response.data.length > 0) {
      const user = response.data[0];
      onLogin(user);

      // Redirect based on role
      if (user.role === 0) {
        navigate("/admin-panel");
      } else {
        navigate("/dictionary");
      }
    } else {
      alert("Tài khoản hoặc mật khẩu đã sai!");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <h2 className="mb-4 text-center">Đăng nhập</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
