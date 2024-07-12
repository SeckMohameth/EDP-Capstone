import React from 'react'
import "./FeedbackCard.css"

function FeedbackCard() {
  return (
    <div className='card'>
        <div className='card-content'>
            <p>Example of feedback being submitted here</p>
            <div className='card-info'>
                <p>October 14, 2024</p>
                <button>Reply</button>
            </div>
        </div>
    </div>
  )
}

export default FeedbackCard
