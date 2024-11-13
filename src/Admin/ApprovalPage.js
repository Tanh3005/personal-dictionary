import React, { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import axios from "axios";

const ApprovalPage = () => {
  const [words, setWords] = useState([]);

  const fetchWords = async () => {
    try {
      const response = await axios.get("http://localhost:9999/words");
      const pendingWords = response.data.filter((word) => word.status === 0); // Filter words with status 0
      setWords(pendingWords); // Set only pending words
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  useEffect(() => {
    fetchWords(); // Call the async function to fetch words
  }, []);

  // Accepting a word: Update status to approved (1)
  const handleAccept = (id) => {
    axios
      .patch(`http://localhost:9999/words/${id}`, { status: 1 })
      .then(() => {
        setWords(words.filter((word) => word.id !== id)); // Remove from pending list
      })
      .catch((error) => console.error("Error accepting word:", error));
  };

  // Rejecting a word: Delete it from the server
  const handleReject = (id) => {
    axios
      .delete(`http://localhost:9999/words/${id}`)
      .then(() => {
        setWords(words.filter((word) => word.id !== id)); // Remove from UI
      })
      .catch((error) => console.error("Error rejecting word:", error));
  };

  return (
    <Container>
      <h1 className="mb-4 text-center">Quản lý từ điển</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Word</th>
            <th>Word Type</th>
            <th>Transcription</th>
            <th>Definition</th>
            <th>Example</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {words.length > 0 ? (
            words
              .filter((word) => word.status === 0) // Filter pending words here
              .map((word) => (
                <tr key={word.id}>
                  <td>{word.word}</td>
                  <td>{word.wordType}</td>
                  <td>{word.transcription}</td>
                  <td>{word.definition}</td>
                  <td>{word.example}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleAccept(word.id)}
                      className="me-2"
                    >
                      Chấp nhận
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleReject(word.id)}
                    >
                      Từ chối
                    </Button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No pending words
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ApprovalPage;
