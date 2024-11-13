import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../Css/Footer.css"; // Thêm CSS mới của Footer

function Footer() {
  const [isVisible, setIsVisible] = useState(true);
  let lastScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY + window.innerHeight;
      const totalHeight = document.body.scrollHeight;

      if (currentScroll < totalHeight - 10) {
        setIsVisible(false); // Ẩn Footer khi cuộn lên
      } else {
        setIsVisible(true); // Hiển thị Footer khi cuộn xuống gần cuối trang
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container
      fluid
      className={`footer ${isVisible ? "visible" : "hidden"}`} // Thêm lớp tùy thuộc vào trạng thái
    >
      <div className="footer-content">
        <p>Contact Us:</p>
        <p>Email: example@gmail.com</p>
        <p>Phone: +84 123 456 789</p>
        <p>
          Facebook:{" "}
          <a href="https://facebook.com/yourfacebookpage" target="_blank" rel="noopener noreferrer">
            Facebook Page
          </a>
        </p>
      </div>
    </Container>
  );
}

export default Footer;
