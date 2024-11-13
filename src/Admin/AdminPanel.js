import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Accordion, Button, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminPanel({ currentUser }) {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [editWord, setEditWord] = useState(null); // Holds the word to edit
  const [showEditModal, setShowEditModal] = useState(false); // Controls modal visibility

  useEffect(() => {
    if (currentUser?.role !== 0) {
      navigate("/dictionary"); // Redirect if not admin
    } else {
      fetchWords();
    }
  }, [currentUser, navigate]);

  const fetchWords = async () => {
    const response = await axios.get("http://localhost:9999/words");
    setWords(response.data);
  };

  const deleteWord = async (id) => {
    await axios.delete(`http://localhost:9999/words/${id}`);
    fetchWords();
  };

  const handleEdit = (word) => {
    setEditWord(word);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    await axios.put(`http://localhost:9999/words/${editWord.id}`, editWord);
    setShowEditModal(false);
    fetchWords();
  };

  return (
    <Container>
      <h1 className="mb-4 text-center">Quản lý từ điển</h1>
      <Accordion flush>
        {words.map((word) => (
          <Accordion.Item eventKey={word.id.toString()} key={word.id}>
            <Accordion.Header>{word.word}</Accordion.Header>
            <Accordion.Body>
              <p>
                <strong>Loại từ:</strong> {word.wordType}
              </p>
              <p>
                <strong>Phiên âm:</strong> {word.transcription}
              </p>
              <p>
                <strong>Định nghĩa:</strong> {word.definition}
              </p>
              <p>
                <strong>Ví dụ:</strong> {word.example}
              </p>
              <Button
                variant="primary"
                onClick={() => handleEdit(word)}
                className="me-2"
              >
                Sửa
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteWord(word.id)}
                className="mt-2"
              >
                Xóa
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa từ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Từ</Form.Label>
              <Form.Control
                type="text"
                value={editWord?.word || ""}
                onChange={(e) =>
                  setEditWord({ ...editWord, word: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại từ</Form.Label>
              <Form.Control
                type="text"
                value={editWord?.workType || ""}
                onChange={(e) =>
                  setEditWord({ ...editWord, workType: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phiên âm</Form.Label>
              <Form.Control
                type="text"
                value={editWord?.transcription || ""}
                onChange={(e) =>
                  setEditWord({ ...editWord, transcription: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Định nghĩa</Form.Label>
              <Form.Control
                type="text"
                value={editWord?.definition || ""}
                onChange={(e) =>
                  setEditWord({ ...editWord, definition: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ví dụ</Form.Label>
              <Form.Control
                type="text"
                value={editWord?.example || ""}
                onChange={(e) =>
                  setEditWord({ ...editWord, example: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Lưu
            </Button>
          </Modal.Footer>
        </Row>
      </Modal>
    </Container>
  );
}

export default AdminPanel;
