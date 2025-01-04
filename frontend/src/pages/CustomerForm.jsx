import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import floatingGraphic from "../assets/cs-support.png"; 
import { ReactComponent as SupportIcon } from "../assets/login-icon.svg"; 

const CustomerForm = () => {
    const navigate = useNavigate();
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
                setSuccessMessage("Your message has been sent successfully! An agent will contact you via email shortly.");
                setErrorMessage("");
                setFormData({ name: "", email: "", message_body: "" }); // Reset form
                setTimeout(()=> navigate("/"), 2000);
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-0 md:p-0">
            <div className="flex flex-col md:flex-row items-stretch w-full h-full shadow-xl rounded-none overflow-hidden">
                

                <div className="hidden md:block w-1/2 relative bg-white">
                    <img
                        src={floatingGraphic}
                        alt="Customer Support"
                        className="object-cover h-full w-full"
                    />
                </div>


                <div className="w-full md:w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8 md:p-12">

                    <div className="w-16 h-16 mb-4">
                        <SupportIcon className="w-full h-full text-blue-500" />
                    </div>

                    <h2 className="text-4xl font-bold text-white text-center mb-6">
                        Customer Support 💬
                    </h2>

                    {errorMessage && (
                        <p className="text-red-400 text-sm mb-4 text-center">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-400 text-sm mb-4 text-center">{successMessage}</p>
                    )}

                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message_body" className="block text-sm font-medium mb-2 text-gray-300">
                                Message
                            </label>
                            <textarea
                                id="message_body"
                                name="message_body"
                                value={formData.message_body}
                                onChange={handleChange}
                                required
                                placeholder="Enter your message"
                                className="w-full p-3 h-32 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Additional Info */}
                    <div className="text-sm mt-4 text-center text-gray-400">
                        Our support team will reach out to you soon.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerForm;
