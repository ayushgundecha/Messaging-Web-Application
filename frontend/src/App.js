import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AgentDashboard from "./components/AgentDashboard";
import ChatWindow from "./components/ChatWindow";
import CustomerForm from "./components/CustomerForm";

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/agent" element={<AgentDashboard />} />
                <Route path="/agent/chat/:id" element={<ChatWindow />} />
                <Route path="/customer" element={<CustomerForm />} />
            </Routes>
    );
};

export default App;
