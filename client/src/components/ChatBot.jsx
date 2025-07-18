import React, { useState } from "react";
import apiClient from "../../services/apiClient.js";
import Nav from '../components/Navbar/Nav.jsx';
import Footer from '../components/Footer/Footer.jsx';
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const reply = await apiClient.getChatResponse(input);
    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
  };

  return (
    <>
      <Nav />
      <div className="chat-container">
        <h2 className="chat-heading">PrepYatra <span className="highlight">Interview Buddy</span></h2>
        <p className="content col-6 mx-auto">
          PrepYatra brings you an AI Interview Buddy to help with your interview preparation, job-related queries, and motivational support throughout your journey.
        </p>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-row ${msg.role}`}>
              {msg.role === "bot" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  alt="AI Robot"
                  className="chat-avatar"
                />
              )}

              <div className={`chat-message ${msg.role}`}>
                <b className="highlight">
                  {msg.role === "user" ? "You" : "PrepBuddy"}:
                </b>{" "}
                {msg.role === "bot" ? (
                  <div className="bot-message">
                    {msg.text.split('\n').map((line, idx) => (
                      line.trim() && <p key={idx}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>

              {msg.role === "user" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt="User Avatar"
                  className="chat-avatar"
                />
              )}
            </div>
          ))}
        </div>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatBot;
