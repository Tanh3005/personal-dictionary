import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Login from "./Security/Login";
import Register from "./Security/Register";
import Dictionary from "./Dictionary/Dictionary";
import AddWordUser from "./Dictionary/AddWordUser";
import FlashcardPage from "./Dictionary/FlashcardPage";
import AddWord from "./Admin/AddWord";
import AdminPanel from "./Admin/AdminPanel";
import ApprovalPage from "./Admin/ApprovalPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import "./Css/MainContent.css"; // Import CSS của nội dung chính

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi ứng dụng tải lên
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user)); // Lưu vào localStorage
  };

  const handleLogout = () => {
    setCurrentUser(null); // Xóa thông tin người dùng
    setShowSidebar(false); // Đóng Sidebar khi logout
    localStorage.removeItem("currentUser"); // Xóa khỏi localStorage
  };

  const toggleSidebar = () => setShowSidebar((prev) => !prev); // Toggle Sidebar

  return (
    <Router>
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onShowSidebar={toggleSidebar}
      />
      {currentUser && (
        <Sidebar
          show={showSidebar}
          onHide={() => setShowSidebar(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
      <div className="main-content">
        {/* Thêm lớp cho nội dung chính */}
        <Routes>
          {!currentUser ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : currentUser.role === 0 ? (
            <>
              {/* Routes for admin (role = 0) */}
              <Route path="/dictionary" element={<Dictionary />} />
              <Route
                path="/admin-panel"
                element={<AdminPanel currentUser={currentUser} />}
              />
              <Route path="/add-word" element={<AddWord />} />
              <Route path="/approval-page" element={<ApprovalPage />} />
              <Route path="*" element={<Navigate to="/admin-panel" />} />
            </>
          ) : (
            <>
              {/* Routes for a regular user (role = 1) */}
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/add-word-user" element={<AddWordUser />} />
              <Route path="/flash-card" element={<FlashcardPage />} />
              <Route path="*" element={<Navigate to="/dictionary" />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
