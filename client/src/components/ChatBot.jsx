"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import apiClient from "@/services/apiClient.js";
import Nav from '@/components/Navbar/Nav.jsx';
import Footer from '@/components/Footer/Footer.jsx';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const reply = await apiClient.getChatResponse(input);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (error) {
      console.error("Chat request failed:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong. Please try again." }]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h2 className="text-center text-3xl font-extrabold">
          PrepYatra <span className="text-primary">Interview Buddy</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
          PrepYatra brings you an AI Interview Buddy to help with your interview preparation, job-related queries, and motivational support throughout your journey.
        </p>

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 min-h-[50vh]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar>
                <AvatarFallback className={msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                  {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {msg.role === "bot" ? (
                  msg.text.split('\n').map((line, idx) => line.trim() && <p key={idx}>{line}</p>)
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatBot;