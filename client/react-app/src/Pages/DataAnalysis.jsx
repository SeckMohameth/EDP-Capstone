import React, { useState } from "react";
import Nav from '../Components/Nav';

function DataAnalysis() {
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment }),
      });
      
      if (response.ok) {
        console.log(sentiment);
        const result = await response.json();
        setSentiment(result.prediction[0]); // Accessing the first element of the prediction list
        alert(`Sentiment: ${result.prediction[0]}`);
      } else {
        alert("Error analyzing sentiment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error analyzing sentiment");
    }
  };

  return (
    <div>
      <Nav />
      <h1>Data Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here"
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Analyze Sentiment</button>
      </form>
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </div>
  );
}

export default DataAnalysis;