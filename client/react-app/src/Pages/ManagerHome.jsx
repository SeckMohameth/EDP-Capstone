import React from 'react';
import FeedbackCard from '../Components/FeedbackCard';

function ManagerHome() {
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <h2>All questions and feeback submitted below</h2>

      {/* Show submitted feedback here as a list*/}
      <FeedbackCard/>
    </div>
  );
}

export default ManagerHome;
