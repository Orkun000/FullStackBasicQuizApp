import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditQuestions() {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/questions").then((response) => {
            setQuestions(response.data);
        });
    }, []);

    const addQuestion = () => {
        axios.post("http://localhost:8080/api/questions/post", newQuestion).then((response) => {
            setQuestions([...questions, response.data]);
            setNewQuestion({
                questionText: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctAnswer: "",
            });
        });
    };

    const deleteQuestion = (id) => {
        axios.delete(`http://localhost:8080/api/questions/delete/${id}`).then(() => {
            setQuestions(questions.filter((q) => q.id !== id));
        });
    };

    return (
        <div className="container mt-5">
            <h2>Soru Ekle</h2>
            <input type="text" placeholder="Soru" className="form-control mb-2" value={newQuestion.questionText} onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })} />
            <input type="text" placeholder="Şık A" className="form-control mb-2" value={newQuestion.optionA} onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })} />
            <input type="text" placeholder="Şık B" className="form-control mb-2" value={newQuestion.optionB} onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })} />
            <input type="text" placeholder="Şık C" className="form-control mb-2" value={newQuestion.optionC} onChange={(e) => setNewQuestion({ ...newQuestion, optionC: e.target.value })} />
            <input type="text" placeholder="Şık D" className="form-control mb-2" value={newQuestion.optionD} onChange={(e) => setNewQuestion({ ...newQuestion, optionD: e.target.value })} />
            <input type="text" placeholder="Doğru Cevap" className="form-control mb-2" value={newQuestion.correctAnswer} onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })} />
            <button className="btn btn-success mt-2" onClick={addQuestion}>Soru Ekle</button>

            <h3 className="mt-4">Mevcut Sorular</h3>
            {questions.map((q) => (
                <div key={q.id} className="border p-3 my-2">
                    <p><strong>{q.questionText}</strong></p>
                    <p>A) {q.optionA} | B) {q.optionB} | C) {q.optionC} | D) {q.optionD}</p>
                    <p>✅ Doğru Cevap: {q.correctAnswer}</p>
                    <button className="btn btn-danger" onClick={() => deleteQuestion(q.id)}>Sil</button>
                </div>
            ))}

            <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>Ana Sayfaya Dön</button>
        </div>
    );
}

export default EditQuestions;
