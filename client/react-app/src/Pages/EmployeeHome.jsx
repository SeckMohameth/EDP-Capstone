import React, { useState } from 'react'
import FeedbackForm from '../Components/FeedbackForm'
import QuestionFrom from '../Components/QuestionForm'

function EmployeeHome() {
  let [currentForm, setCurrentForm] = useState('feedback')

  const handleToggle = (formname) => {
    setCurrentForm(formname)
  }

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <h3>Your manager is: </h3>

      <button onClick={() => handleToggle('feedback')}>Feedback</button>
      <button onClick={() => handleToggle('question')}>Question</button>

      {currentForm === 'feedback' && <FeedbackForm/>}
      {currentForm === 'question' && <QuestionFrom/>}


      <h2>Past Submitted responses</h2>
    </div>
  )
}

export default EmployeeHome
