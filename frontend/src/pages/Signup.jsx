import React, { useState } from 'react';
import axiosInstance from '../helper/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const adminEmailPattern = /\.admin@xyz.com$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!adminEmailPattern.test(email)) {
      setError('Electricians cannot sign up. Only admins can create accounts.');
      return;
    }
    const payload = { email, password };

    try {
      const response = await axiosInstance.post('/signup', payload);
      console.log(response.data)
      if (response.data.success) {
        setSuccess('Signup successful!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login')
      } else {
        setError('Signup failed. Try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-0">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Admin Sign Up</h1>
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your admin email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
