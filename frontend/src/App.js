import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AgentDashboard from "./pages/AgentDashboard";
import ChatWindow from "./pages/ChatWindow";
import CustomerForm from "./pages/CustomerForm";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/agent" element={<AgentDashboard />} />
                <Route path="/agent/chat/:id" element={<ChatWindow />} />
                <Route path="/customer" element={<CustomerForm />} />
            </Routes>
    );
};

export default App;
