import React from 'react'
import "./FeedbackCard.css"

function FeedbackCard(props) {
  return (
    <div className='card'>
        <div className='card-content'>
            <p>{props.data.feedback}</p>
            <div className='card-info'>
                <p>{new Date(props.data.date).toLocaleDateString()}</p>
                <button className='reply-button'>Reply</button>
            </div>
        </div>
    </div>
  )
}

export default FeedbackCard