import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../Css/FlashcardPage.css"; // Custom CSS for flip animation

function FlashcardPage() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Fetch words from the API
    fetch("http://localhost:9999/words")
      .then((response) => response.json())
      .then((data) => {
        const wordList = data.words || data;
        const approvedWords = wordList.filter((word) => word.status === 1);
        setWords(approvedWords);
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    setIsFlipped(false); // Reset flip state when moving to the next word
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? words.length - 1 : prevIndex - 1
    );
    setIsFlipped(false); // Reset flip state when moving to the previous word
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Toggle the flip state
  };

  return (
    <Container className="flashcard-page d-flex flex-column align-items-center">
      {words.length > 0 && (
        <div className={`flashcard-container ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
          <div className="flashcard">
            {/* Front Side */}
            <div className="flashcard-front">
              <h2>{words[currentIndex].word}</h2>
            </div>
            {/* Back Side */}
            <div className="flashcard-back">
              <h4>{words[currentIndex].wordType}</h4>
              <p>Transcription: {words[currentIndex].transcription}</p>
              <p>Definition: {words[currentIndex].definition}</p>
              <em>Example: {words[currentIndex].example}</em>
            </div>
          </div>
        </div>
      )}
      <Row className="w-100 mt-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={words.length === 0}
            className="mx-2"
          >
            Trước Đó
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={words.length === 0}
            className="mx-2"
          >
            Tiếp Theo
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FlashcardPage;
