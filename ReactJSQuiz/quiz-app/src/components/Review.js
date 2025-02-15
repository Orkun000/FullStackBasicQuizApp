import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Review() {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, userAnswers } = location.state || { score: 0, userAnswers: [] };

    return (
        <div className="container mt-5">
            <h2>Quiz Sonucu</h2>
            <h3>Toplam Puan: {score}</h3>
            <button className="btn btn-primary my-3" onClick={() => navigate("/")}>
                Ana Sayfaya Dön
            </button>
            <h4>Sorular ve Cevaplar:</h4>
            {userAnswers.map((answer, index) => (
                <div key={index} className="border p-3 my-2">
                    <p><strong>{answer.question}</strong></p>
                    <p>Senin Cevabın: <span className={answer.correct ? "text-success" : "text-danger"}>{answer.selected}</span></p>
                    {!answer.correct && <p>Doğru Cevap: <span className="text-success">{answer.correctAnswer}</span></p>}
                </div>
            ))}
        </div>
    );
}

export default Review;
