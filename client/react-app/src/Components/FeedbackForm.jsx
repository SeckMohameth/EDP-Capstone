import React, { useState } from 'react'
import './FeedbackForm.css'

function FeedbackForm(props) {
    let [feedback, setFeedback] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log(feedback);

        const newFeedback = {
          managerEmail: props.user.managerEmail,
          feedback: feedback,
          date: Date.now(),
        }
        
        try {
          let response = await fetch('http://localhost:3000/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
          });
          if (response.ok) {
            console.log("feedback submitted");
            setFeedback(""); // Clear the form after submission
          }
        } catch(error) {
          console.error('Error:', error);
        }
    } 

  return (
    <div className="feedback-form">
        <form onSubmit={handlesubmit}>
            <label htmlFor="feedback">Submit feedback</label>
            <textarea 
              id="feedback"
              name='postContent'
              rows={6}
              placeholder='I have feedback regarding the following...'
              value={feedback}
              onChange={(e => setFeedback(e.target.value))}
            />
            <button type='submit'>Submit Feedback</button>
        </form>
    </div>
  )
}

export default FeedbackForm