import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, loginUser } from "../hooks/auth";
import floatingGraphic from "../assets/signin.png"; 
import { ReactComponent as SignupIcon } from "../assets/login-icon.svg"; 

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
      setTimeout(() => navigate("/agent"), 2000);
    } catch (error) {
      setError(error?.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-0 md:p-0">
      <div className="flex flex-col md:flex-row items-stretch w-full h-full shadow-xl rounded-none overflow-hidden">
        
        {/* Left Side - Graphic */}
        <div className="hidden md:block w-1/2 relative bg-white">
          <img
            src={floatingGraphic}
            alt="Signup Illustration"
            className="object-cover h-full w-full"
          />
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8 md:p-12">
          {/* Signup SVG Icon */}
          <div className="w-16 h-16 mb-4">
            <SignupIcon className="w-full h-full text-blue-500" />
          </div>

          <h2 className="text-4xl font-bold text-white text-center mb-6">
            Create Your Account 🚀
          </h2>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-400 text-sm mb-4 text-center">{successMessage}</p>
          )}

          <form onSubmit={handleSignup} className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-sm mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
