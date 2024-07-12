import React, { useState, useEffect } from 'react';
import FeedbackForm from '../Components/FeedbackForm';

function EmployeeHome() {
  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = () => {
    fetch("http://localhost:3000/feedback")
      .then((res) => res.json())
      .then((feedback) => {
        setFeedback(feedback);
      });
    console.log(feedback);
  };
  useEffect(fetchFeedback, []);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <h3>Your manager is: </h3>
      <FeedbackForm />

      <h2>Past Submitted responses</h2>
    </div>
  );
}

export default EmployeeHome;
