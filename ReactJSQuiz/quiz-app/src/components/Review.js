import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, userAnswers, score, totalQuestions } = location.state || {};

    if (!questions || !userAnswers) {
        return <h3>Geçerli veri bulunamadı!</h3>;
    }

    return (
        <div className="container mt-4">
            <h2>Quiz Sonucu</h2>
            <Card className="text-center mb-3">
                <Card.Body>
                    <Card.Title><h3>Puanınız: {score + 1} / {totalQuestions}</h3></Card.Title>
                </Card.Body>
            </Card>

            {questions.map((question, index) => {
                const isCorrect = userAnswers[index] === question.correctAnswer;
                return (
                    <Card key={index} className="mb-3">
                        <Card.Body>
                            <Card.Title>{index + 1}. {question.questionText}</Card.Title>
                            <div>
                                <p style={{ color: isCorrect ? "green" : "red" }}>
                                    <strong>Senin Cevabın:</strong> {userAnswers[index]}
                                </p>
                                {!isCorrect && (
                                    <p style={{ color: "blue" }}>
                                        <strong>Doğru Cevap:</strong> {question.correctAnswer}
                                    </p>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                );
            })}

            <Button variant="primary" onClick={() => navigate("/")}>Ana Sayfaya Dön</Button>
        </div>
    );
};

export default Review;
