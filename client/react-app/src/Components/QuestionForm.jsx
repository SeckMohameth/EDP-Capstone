import React, { useState } from 'react'

function QuestionFrom() {
  let [question, setQuestion] = useState("") 

  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log(question);

    const newFeedback = {
      content: question,
      date: Date.now(),

    }
    // logic for feedback submission here
  try {
    let response = await fetch('http://localhost:3000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newFeedback}),
    });
    if (response.ok) {
      console.log("question submitted");
    }
  } catch(error) {
    console.error('Error:', error);
  }
    
} 

  return (
    <div>
        <form onSubmit={handlesubmit}>
            <label>Submit a question</label><br/>
            <textarea 
            type='text' 
            name='postContent'
            rows={6}
            cols={50}
            placeholder='I have a question regarding the following...'
            value={question}
            onChange={(e => setQuestion(e.target.value))}
            /><br/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default QuestionFrom
