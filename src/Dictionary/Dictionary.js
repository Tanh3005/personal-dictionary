import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Dictionary() {
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    const response = await axios.get("http://localhost:9999/words");
    setWords(response.data);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredWords = words
    .filter(
      (word) =>
        (word.word || "").toLowerCase().includes(searchTerm.toLowerCase()) &&
        word.status === 1
    )
    .sort((a, b) => (a.word || "").localeCompare(b.word || ""));

  return (
    <Container>
      <h1 className="mb-4 text-center">Từ điển cá nhân Anh - Việt</h1>
      <Form.Control
        type="text"
        placeholder="Tra từ..."
        className="mb-3 mx-auto"
        style={{ width: "80%" }}
        onChange={handleSearch}
      />
      <Accordion flush>
        {filteredWords.map((word, index) => (
          <Accordion.Item eventKey={index.toString()} key={word.id}>
            <Accordion.Header>{word.word}</Accordion.Header>
            <Accordion.Body>
              <p>
                <strong>Từ loại:</strong> {word.wordType}
              </p>
              <p>
                <strong>Phiên âm:</strong> {word.transcription}
              </p>
              <p>
                <strong>Định nghĩa:</strong> {word.definition}
              </p>
              <p>
                <strong>Ví dụ:</strong> {word.example}
              </p>``
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default Dictionary;
