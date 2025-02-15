import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Quiz.css';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        setLoading(true); // Set loading to true before fetching
        axios.get("http://localhost:8080/api/questions")
            .then((response) => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
                // Handle error, e.g., display a message to the user
            })
            .finally(() => setLoading(false)); // Set loading to false after fetch, regardless of success/failure
    };


    const handleAnswer = (answer) => {
        const currentQuestion = questions[currentQuestionIndex]; // Store for clarity
        const isCorrect = answer === currentQuestion.correctAnswer;
        if (isCorrect) setScore(score + 1);

        setUserAnswers([
            ...userAnswers,
            { question: currentQuestion.questionText, selected: answer, correct: isCorrect, correctAnswer: currentQuestion.correctAnswer },
        ]);

        setSelectedAnswer(answer);
        setTimeout(() => {
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
            } else {
                navigate("/review", { state: { score, userAnswers } });
            }
        }, 1000);
    };

    if (loading) return <div className="loading-screen"><h2>Yükleniyor...</h2></div>; // Display loading screen

    if (questions.length === 0) return <h2>Sorular Yüklenemedi.</h2>; // Handle case where questions couldn't be fetched

    const currentQuestion = questions[currentQuestionIndex]; // Store for easier access

    return (
        <div className="quiz-container">
            <h3 className="question-title">{currentQuestion.questionText}</h3>
            <div className="options-container">
                {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
                    <button
                        key={opt}
                        className={`option-button ${selectedAnswer === currentQuestion[opt] ? (currentQuestion[opt] === currentQuestion.correctAnswer ? "correct" : "incorrect") : ""} m-2`}
                        onClick={() => handleAnswer(currentQuestion[opt])}
                        disabled={selectedAnswer !== null} // Disable buttons after an answer is selected
                    >
                        {currentQuestion[opt]}
                    </button>
                ))}
            </div>
            <div className="question-counter">
                Soru {currentQuestionIndex + 1} / {questions.length}
            </div>
        </div>
    );
}

export default Quiz;