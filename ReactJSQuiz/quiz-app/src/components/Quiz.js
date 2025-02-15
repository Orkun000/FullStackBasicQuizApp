import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/questions")
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Veri çekme hatası:", error));
    }, []);

    const handleAnswer = (selectedAnswer) => {
        const currentQuestion = questions[currentQuestionIndex];
        setUserAnswers([...userAnswers, selectedAnswer]);

        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            navigate("/review", {
                state: {
                    questions,
                    userAnswers: [...userAnswers, selectedAnswer],
                    score,
                    totalQuestions: questions.length
                }
            });

        }
    };

    if (questions.length === 0) {
        return <h3>Yükleniyor...</h3>;
    }

    return (
        <div className="container mt-4">
            <h2>Quiz Uygulaması</h2>
            <Card>
                <Card.Body>
                    <Card.Title>{questions[currentQuestionIndex].questionText}</Card.Title>
                    <div className="d-flex flex-column">
                        {["optionA", "optionB", "optionC", "optionD"].map((option, idx) => (
                            <Button
                                key={idx}
                                variant="outline-primary"
                                className="mb-2"
                                onClick={() => handleAnswer(questions[currentQuestionIndex][option])}
                            >
                                {questions[currentQuestionIndex][option]}
                            </Button>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Quiz;
