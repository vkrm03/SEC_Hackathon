import React, { useState } from "react";
import "../src/assets/chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hey! 💸 I’m your ExpenseEase assistant. Need help managing your money today?" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = { type: "bot", text: data.reply || "Sorry, couldn’t understand that 🫠" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Oops! Server took a lunch break 😅" },
      ]);
    }

    setIsThinking(false);
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">💬 ExpenseEase Assistant</h2>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        {isThinking && (
          <div className="message bot thinking">
            Calculating things...
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        )}
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Ask me anything about your expenses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
