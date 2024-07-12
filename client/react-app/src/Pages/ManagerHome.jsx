import React, { useState } from 'react';
import FeedbackCard from '../Components/FeedbackCard';
import { useEffect} from "react"

function ManagerHome() {
  const [feedback, setFeedback] = useState([])
  const [questions, setQuestions] = useState([])
  const [currentCategory, setCurrentCategory] = useState('feedback')

  // toggle between
  const handleToggle = (category) => {
    setCurrentCategory(category)
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


  const fetchQuestions = () => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
    console.log(questions);
  };
  useEffect(fetchQuestions, []);


  return (
    <div>
      <h1>Manager Dashboard</h1>
      
      <p>Select which submissions to view</p>
      <button onClick={() => currentCategory('feedback')}>Feedback</button>
      <button onClick={() => currentCategory('question')}>Question</button>


      {/* Show submitted feedback here as a list*/}
      {currentCategory === 'feedback' && 
         feedback.map((feedback) => (
          <FeedbackCard
          key={feedback._id}
          content={feedback.content}
          date={feedback.date}
          />
        ))
      }

      {currentCategory === 'questions' && 
              feedback.map((question) => (
                <FeedbackCard
                key={question._id}
                content={question.content}
                date={question.date}
                />
              ))
            }
    </div>
  );
}

export default ManagerHome;
