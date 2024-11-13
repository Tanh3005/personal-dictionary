import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

function AddWord({ userId }) {
  const [word, setWord] = useState("");
  const [wordType, setWordTypes] = useState("");
  const [transcription, setTranscription] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const addWord = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9999/words", {
        word,
        wordType, // Correct property
        transcription,
        definition,
        example,
        status: 1, // Status for admin
        accId: userId,
      });
      setShowSuccess(true);
      setWord("");
      setWordTypes(""); // Reset word type
      setTranscription("");
      setDefinition("");
      setExample("");
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  return (
    <Container className="p-4 border rounded shadow-sm">
      <h2 className="mb-4 text-center">Thêm từ mới</h2>
      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          Từ mới đã được thêm thành công!
        </Alert>
      )}
      <Form onSubmit={addWord}>
        <Form.Group className="mb-3">
          <Form.Label>Từ tiếng Anh</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập từ tiếng Anh"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loại từ</Form.Label>
          <Form.Control
            as="select"
            value={wordType}
            onChange={(e) => setWordTypes(e.target.value)} // Update wordType state on change
          >
            <option value="">Chọn loại từ</option>
            <option value="Noun">Noun</option>
            <option value="Verb">Verb</option>
            <option value="Adjective">Adjective</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phiên âm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập phiên âm"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nghĩa tiếng Việt</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nghĩa tiếng Việt"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ví dụ</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập ví dụ"
            value={example}
            onChange={(e) => setExample(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Thêm từ
        </Button>
      </Form>
    </Container>
  );
}

export default AddWord;
