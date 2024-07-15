import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import FeedbackForm from '../Components/FeedbackForm';
import QuestionForm from '../Components/QuestionForm';
import { useAuth } from '../hooks/AuthContext';
import FeedbackCard from '../Components/FeedbackCard';
import Nav from '../Components/Nav';
import './EmployeeHome.css';

function EmployeeHome() {
  const { user } = useAuth();

  const [feedback, setFeedback] = useState([]);
  const [questions, setQuestions] = useState([]);
  let [currentForm, setCurrentForm] = useState('feedback');

  const handleToggle = (formname) => {
    setCurrentForm(formname)
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

  if (user.isManager) {
    return <Navigate to="/manager" replace />;
  }

  return (
    <div className="employee-home">
      <Nav />
      <div className="content">
        <h1>Employee Dashboard</h1>
        <h3>Your manager is: </h3>

        <div className="form-toggle">
          <button onClick={() => handleToggle('feedback')}>Feedback</button>
          <button onClick={() => handleToggle('question')}>Question</button>
        </div>

        {currentForm === 'feedback' && <FeedbackForm />}
        {currentForm === 'question' && <QuestionForm />}

        <h2>Past Submitted responses</h2>
        <div className="feedback-list">
          {feedback.map((feedback) => (
            <FeedbackCard
              key={feedback._id}
              content={feedback.content}
              date={feedback.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeHome;