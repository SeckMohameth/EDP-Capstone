import React, { useState, useEffect } from 'react';
import FeedbackCard from '../Components/FeedbackCard';
import QuestionCard from '../Components/QuestionCard';
import './ManagerHome.css';
import Nav from '../Components/Nav';

function ManagerHome() {
  const [feedback, setFeedback] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('feedback');

  const handleToggle = (category) => {
    setCurrentCategory(category);
  };

  const fetchFeedback = () => {
    fetch("http://localhost:3000/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data);
      })
      .catch((error) => console.error("Error fetching feedback:", error));
  };

  const fetchQuestions = () => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  useEffect(() => {
    fetchFeedback();
    fetchQuestions();
  }, []);

  return (
    <div className="manager-home">
      <Nav />
      <h1>Manager Dashboard</h1>
      <p>Select which submissions to view</p>
      <div className="form-toggle">
        <button onClick={() => handleToggle('feedback')}>Feedback</button>
        <button onClick={() => handleToggle('questions')}>Questions</button>
      </div>
      <h2>Employee Submissions</h2>
      <div className="content">
        {currentCategory === 'feedback' && 
          feedback.map((item) => (
            <FeedbackCard
              key={item._id}
              feedback={item}
            />
          ))
        }
        {currentCategory === 'questions' && 
          questions.map((item) => (
            <QuestionCard
              key={item._id}
              question={item}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ManagerHome;