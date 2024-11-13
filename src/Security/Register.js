import React, { useState } from "react";
import axios from "axios";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra ký tự đặc biệt trong tên đăng nhập và họ tên
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(username)) {
      alert("Tên đăng nhập không được chứa ký tự đặc biệt.");
      return;
    }

    if (!alphanumericRegex.test(name.replace(/\s/g, ""))) {
      // Loại bỏ khoảng trắng khi kiểm tra họ tên
      alert("Họ tên không được chứa ký tự đặc biệt.");
      return;
    }

    // Kiểm tra cú pháp Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(gmail)) {
      alert("Vui lòng nhập Gmail có định dạng @gmail.com");
      return;
    }

    // Kiểm tra độ dài của mật khẩu
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    try {
      // Kiểm tra trùng lặp username
      const usernameCheck = await axios.get(
        `http://localhost:9999/accounts?username=${username}`
      );
      if (usernameCheck.data.length > 0) {
        alert("Tên đăng nhập đã tồn tại.");
        return;
      }

      // Kiểm tra trùng lặp gmail
      const gmailCheck = await axios.get(
        `http://localhost:9999/accounts?gmail=${gmail}`
      );
      if (gmailCheck.data.length > 0) {
        alert("Gmail đã được sử dụng.");
        return;
      }

      // Nếu không có lỗi, tiến hành đăng ký tài khoản
      await axios.post("http://localhost:9999/accounts", {
        name,
        username,
        gmail,
        password,
        role: 1, // Người dùng đăng ký có role mặc định là 1 (user)
      });

      alert("Đăng ký thành công!");
      navigate("/login"); // Chuyển hướng đến trang Login sau khi đăng ký thành công
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      alert("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <h2 className="mb-4 text-center">Đăng ký</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gmail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Đăng ký
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
