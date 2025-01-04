import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUnassignedMessages } from "../hooks/messages";

const AgentDashboard = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    // Fetch messages from the backend
    useEffect(() => {
        const getMessages = async () => {
          try {
            const chats = await fetchUnassignedMessages();
            setMessages(chats);
          } catch (err) {
            console.error("Error fetching messages:", err);
          }
        };
        getMessages();
      }, []);

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-black text-white font-roboto">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-4 bg-gray-900 shadow-md">
                <h1 className="text-3xl font-bold text-blue-400">Agent Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-full text-white font-medium hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            {/* Message List */}
            <div className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Customer Messages</h2>
                <div className="space-y-4">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <div
                                key={message._id}
                                onClick={() => navigate(`/agent/chat/${message._id}`)}
                                className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 cursor-pointer transition"
                            >
                                <div>
                                    <p className="text-lg font-medium">{message._id}</p>
                                    <p className="text-gray-400 text-sm">{message.latest_message}</p>
                                </div>
                                {message?.latest_priority==="high" && (
                                    <span className="px-2 py-1 bg-red-500 text-xs font-semibold rounded-full">
                                        Urgent
                                    </span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgentDashboard;
