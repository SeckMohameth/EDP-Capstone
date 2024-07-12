import React, { useState } from 'react'

function QuestionFrom() {
  let [question, setQuestion] = useState("") 

  const handlesubmit = async (e) => {
    e.preventDefault()
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
