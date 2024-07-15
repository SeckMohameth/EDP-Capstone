import React from 'react'
import "./FeedbackCard.css"

function FeedbackCard(props) {
  return (
    <div className='card'>
        <div className='card-content'>
            <p>{props.content}</p>
            <div className='card-info'>
                <p>{new Date(props.date).toLocaleDateString()}</p>
                <button className='reply-button'>Reply</button>
            </div>
        </div>
    </div>
  )
}

export default FeedbackCard