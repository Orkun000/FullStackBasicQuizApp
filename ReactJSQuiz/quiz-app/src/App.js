import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Quiz from "./components/Quiz";
import Review from "./components/Review";
import EditQuestions from "./components/EditQuestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/edit" element={<EditQuestions />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
