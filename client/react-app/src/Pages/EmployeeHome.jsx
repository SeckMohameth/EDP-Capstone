
import React, { useState, useEffect } from 'react'
import FeedbackForm from '../Components/FeedbackForm'
import QuestionFrom from '../Components/QuestionForm'

function EmployeeHome() {
  let [currentForm, setCurrentForm] = useState('feedback')
    const [feedback, setFeedback] = useState([]);


  const handleToggle = (formname) => {
    setCurrentForm(formname)
  }

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

      <button onClick={() => handleToggle('feedback')}>Feedback</button>
      <button onClick={() => handleToggle('question')}>Question</button>

      {currentForm === 'feedback' && <FeedbackForm/>}
      {currentForm === 'question' && <QuestionFrom/>}


      <h2>Past Submitted responses</h2>
      {/* {feedback.map((x) => (
        <p key={x}>{x}</p>
      ))} */}


    </div>
  );
}

export default EmployeeHome;
