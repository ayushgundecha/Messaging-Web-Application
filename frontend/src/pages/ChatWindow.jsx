import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchConversationHistory,sendMessage } from "../hooks/messages";

const ChatWindow = () => {
    const { id } = useParams(); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const getConversation = async () => {
          try {
            const conversation = await fetchConversationHistory(id);
            setMessages(conversation);
          } catch (err) {
            console.error("Error fetching conversation:", err);
          }
        };
        getConversation();
      }, []); 

    // Handle sending a new message
    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;
    
        try {
          const response = await sendMessage({ userId: id, messageBody: newMessage });
          const updatedMessage = { 
            message_body: newMessage, 
            sender_type: "agent", 
            timestamp: new Date().toISOString() 
        };

        setMessages((prevMessages) => [...prevMessages, updatedMessage]);
        setNewMessage(""); 
        } catch (err) {
            console.error("Error sending message:", err);
        }
      };


    return (
        <div className="flex flex-col h-screen bg-black text-white font-roboto">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow">
                <h1 className="text-xl font-semibold text-blue-400">Chat with Customer</h1>
                <button
                    className="bg-red-500 px-4 py-2 rounded-full text-white font-medium hover:bg-red-600"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-800">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message?.sender_type === "agent" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg ${
                                message.sender === "agent"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                            }`}
                        >
                            {message?.message_body}
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-900 flex items-center">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
