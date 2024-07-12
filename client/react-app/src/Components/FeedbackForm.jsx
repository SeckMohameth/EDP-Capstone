import React, { useState } from 'react'

function FeedbackForm() {
    let [feedback, setFeedback] = useState("")
    

    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log(feedback);

        const newFeedback = {
          content: feedback,
          date: Date.now(),

        }
        // logic for feedback submission here
      try {
        let response = await fetch('http://localhost:3000/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({newFeedback}),
        });
        if (response.ok) {
          console.log("feedback submitted");
        }
      } catch(error) {
        console.error('Error:', error);
      }
        
    } 

  return (
    <div>
        <form onSubmit={handlesubmit}>
            <label>Submit feedback</label><br/>
            <textarea 
            type='text' 
            name='postContent'
            rows={6}
            cols={50}
            placeholder='I have feedback regarding the following...'
            value={feedback}
            onChange={(e => setFeedback(e.target.value))}
            /><br/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default FeedbackForm
