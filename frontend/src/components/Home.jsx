import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <h1 className="text-5xl font-extrabold mb-16 text-white font-mono">
                Welcome to <span className="text-blue-400">Branch Messaging App</span>
            </h1>
            <div className="flex gap-6">
                <button
                    onClick={() => handleNavigation("/agent")}
                    className="px-8 py-4 text-lg bg-blue-500 text-white rounded-full font-roboto shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                    I am an Agent
                </button>
                <button
                    onClick={() => handleNavigation("/customer")}
                    className="px-8 py-4 text-lg bg-green-500 text-white rounded-full font-roboto shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
                >
                    I am a Customer
                </button>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 text-gray-500 text-sm font-roboto">
                Built with ❤️ by Branch Team
            </footer>
        </div>
    );
};

export default Home;
