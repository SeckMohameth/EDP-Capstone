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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackResponse = await fetch("http://localhost:3000/feedback");
        if (!feedbackResponse.ok) {
          throw new Error("Feedback could not be fetched")
        }
        const feedbackResponseJson = await feedbackResponse.json();
        setFeedback(feedbackResponseJson);
        console.log(feedback);

        const questionsResponse = await fetch("http://localhost:3000/questions");
        if (!questionsResponse.ok) {
          throw new Error("Questions could not be fetched")
        }
        const questionsResponseJson = await questionsResponse.json();
        setQuestions(questionsResponseJson);
        console.log(questions);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
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