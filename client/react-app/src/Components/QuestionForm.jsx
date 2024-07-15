import React, { useState } from 'react'
import './QuestionForm.css'

function QuestionForm(props) {
  let [question, setQuestion] = useState("") 

  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log(question);

    const newQuestion = {
      employeeEmail: props.user.email,
      question: question,
      date: Date.now(),
    }
    
    try {
      let response = await fetch('http://localhost:3000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      if (response.ok) {
        console.log("question submitted");
        setQuestion(""); // Clear the form after submission
      }
    } catch(error) {
      console.error('Error:', error);
    }
  } 

  return (
    <div className="question-form">
        <form onSubmit={handlesubmit}>
            <label htmlFor="question">Submit a question</label>
            <textarea 
              id="question"
              name='postContent'
              rows={6}
              placeholder='I have a question regarding the following...'
              value={question}
              onChange={(e => setQuestion(e.target.value))}
            />
            <button type='submit'>Submit Question</button>
        </form>
    </div>
  )
}

export default QuestionForm