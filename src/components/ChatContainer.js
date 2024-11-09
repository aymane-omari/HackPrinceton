// src/components/ChatContainer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Fetch chat history
  useEffect(() => {
    axios.get('/api/messages').then((response) => {
      setMessages(response.data);
    });
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    // Send message to backend
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('/api/chat/completion', {
        message: input,
      });

      const botReply = { sender: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      // Handle error
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex">
        <input
          className="flex-1 border border-gray-300 rounded-l-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
