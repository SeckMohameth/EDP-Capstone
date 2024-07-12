import React, { useState, useEffect } from 'react';
import FeedbackForm from '../Components/FeedbackForm';

function EmployeeHome() {
  const [feedback, setFeedback] = useState([]);
  const [questions, setQuestions] = useState([]);

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
    <div>
      <h1>Employee Dashboard</h1>
      <h3>Your manager is: </h3>
      <FeedbackForm fb={feedback} qns={questions}/>

      <h2>Past Submitted responses</h2>
    </div>
  );
}

export default EmployeeHome;
