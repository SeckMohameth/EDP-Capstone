import React, { useState, useEffect } from 'react';

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
    </div>
  );
}

export default EmployeeHome;
