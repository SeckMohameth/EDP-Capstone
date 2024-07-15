import React, { useState, useEffect } from 'react';
import FeedbackCard from '../Components/FeedbackCard';
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
      });
  };

  const fetchQuestions = () => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  };

  useEffect(fetchFeedback, []);
  useEffect(fetchQuestions, []);

  return (
    <div className="manager-home">
      <Nav />
      <h1>Manager Dashboard</h1>
      <p>Select which submissions to view</p>
      <div className="form-toggle">
        <button onClick={() => handleToggle('feedback')}>Feedback</button>
        <button onClick={() => handleToggle('questions')}>Questions</button>
      </div>
      <div className="content">
        {currentCategory === 'feedback' && 
          feedback.map((item) => (
            <FeedbackCard
              key={item._id}
              content={item.content}
              date={item.date}
            />
          ))
        }
        {currentCategory === 'questions' && 
          questions.map((item) => (
            <FeedbackCard
              key={item._id}
              content={item.content}
              date={item.date}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ManagerHome;
