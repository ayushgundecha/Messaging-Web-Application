import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, loginUser } from "../hooks/auth";

function SignupPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 
  const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccessMessage(""); 
        setIsLoading(true); 
      
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setIsLoading(false);
          return;
        }
      
        try {
          
          await signupUser({ name, email, password });
      
          await loginUser({ email, password });
      
          setSuccessMessage("Signup successful! Redirecting...");
      
          setTimeout(() => navigate("/agent"), 2000); // Redirect after 2 seconds
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false); // Reset loading state
        }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
      <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>}

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name
          </label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-8">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 rounded-lg text-white text-lg font-semibold hover:bg-blue-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
