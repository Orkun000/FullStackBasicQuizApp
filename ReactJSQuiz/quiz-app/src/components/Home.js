import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-4 text-primary">Quiz Uygulaması</h1>
            <div className="d-flex gap-3">
                <button className="btn btn-success btn-lg px-4" onClick={() => navigate("/quiz")}>
                    Teste Başla
                </button>
                <button className="btn btn-warning btn-lg px-4" onClick={() => navigate("/edit")}>
                    Düzenle
                </button>
            </div>
        </div>
    );
}

export default Home;
