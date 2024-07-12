import React from 'react'
import FeedbackForm from '../Components/FeedbackForm'

function EmployeeHome() {
  return (
    <div>
      <h1>Employee Dashboard</h1>
      <h3>Your manager is: </h3>
      <FeedbackForm />

      <h2>Past Submitted responses</h2>
    </div>
  )
}

export default EmployeeHome
