import React, { useState } from 'react'

function FeedbackForm() {
    let [feedback, setFeedback] = useState("")
    

    const handlesubmit = (e) => {
        e.preventDefault()
        console.log(feedback);

        // logic for feedback submission here

        
    } 

  return (
    <div>
        <form onSubmit={handlesubmit}>
            <label>Submit a question or feedback</label><br/>
            <textarea 
            type='text' 
            name='postContent'
            rows={6}
            cols={50}
            placeholder='I have a question regarding the following...'
            value={feedback}
            onChange={(e => setFeedback(e.target.value))}
            /><br/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default FeedbackForm
