
import React, { useState } from "react";
import axios from "axios";
import "./KanyeQuote.css";
import image1 from "./assets/kanye1.jpg"
const KanyeQuote = () => {
  const [quote, setQuote] = useState("");
  // Function to fetch a new quote
  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.kanye.rest");
      setQuote(response.data.quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Could not fetch a quote. Please try again.");
    }
  };
  return (
    <div className="quote-container">
      <h1>Kanye West Quote Generator</h1>
      <p className="quote">{quote || "Click the button to get inspired!"}</p>
      <button onClick={fetchQuote}>Get Kanye Quote</button>
      <img src={image1}/>
      <image1/>
    </div>
  );
};
export default KanyeQuote;