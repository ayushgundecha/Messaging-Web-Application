import React, { useState } from "react";
import axios from "axios";

const CustomerForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message_body: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;        
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/messages", formData); 
            if (response.status === 201) {
                setSuccessMessage("Your message has been sent successfully!");
                setErrorMessage("");
                setFormData({ name: "", email: "", message_body: "" }); // Reset form
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-roboto">
            <h1 className="text-4xl font-bold text-blue-400 mb-8">Customer Support</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md"
            >
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                    </label>
                    <textarea
                        id="message_body"
                        name="message_body"
                        value={formData.message_body}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 h-32 rounded-lg bg-gray-700 text-white focus:outline-none"
                        placeholder="Enter your message"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>

            {/* Success / Error Messages */}
            {successMessage && (
                <p className="mt-6 text-green-500 font-medium">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="mt-6 text-red-500 font-medium">{errorMessage}</p>
            )}
        </div>
    );
};

export default CustomerForm;
