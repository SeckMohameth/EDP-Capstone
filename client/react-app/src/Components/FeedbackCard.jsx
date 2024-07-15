import React, {useState, useEffect} from 'react'
import "./FeedbackCard.css"


function FeedbackCard({feedback}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState(feedback.replies || []);

//submitting a reply
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    console.log("reply submitted:" + reply);

    const newReply = {
      response: reply
    };

    const updatedReplies = [...replies, newReply]

    try {
      let reply = await fetch(`http://localhost:3000/feedback/${feedback._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReplies),
      }); 

      if (reply.ok) {
        console.log("reply submitted");
        setReplies(updatedReplies);
        setReply(""); // Clear the form after submission
        setShowReplyInput(false);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <div className='card'>
        <div className='card-content'>
            <p>{feedback.content}</p>
            <div className='card-info'>
            <p>{new Date(feedback.date).toLocaleDateString()}</p>
            
            <button onClick={() => setShowReplyInput(!showReplyInput)}>
            {showReplyInput ? 'Cancel' : 'Reply'}
            </button>
            </div>
        </div>
        {/* ==== toggle reply input ===== */}
          {showReplyInput && (
          <form onSubmit={handleReplySubmit}>
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
            />
            <button type="submit">Send</button>
          </form>
          )}

        {replies.length > 0 && (
          <div className="replies-section">
            <h4>Replies:</h4>
            <ul>
              {replies.map((reply, index) => (
                <li key={index}>{reply.response}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
    
  );
}

export default FeedbackCard;
