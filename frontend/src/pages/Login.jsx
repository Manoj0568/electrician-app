import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../helper/axiosInterceptor';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()
  const adminEmailPattern = /\.admin@xyz\.com$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (adminEmailPattern.test(email)) {
      try {
        const adminPayload = { email, password };
        const response = await axiosInstance.post('/admin/login', adminPayload);
        
        if (response.data.success) {
          setSuccess('Admin login successful!');
          navigate("/admin")
        } else {
          setError(response.data.message || 'Admin login failed.');
        }
      } catch (err) {
        setError('Admin login error. Please try again.');
      }
    } 
    else {

      try {
        const electricianPayload = { name:email, phone:password };
        const response = await axiosInstance.post('/electrician/login', electricianPayload);
        if (response.data.success) {
          setSuccess('Electrician login successful!');
          navigate("/user")
        } else {
          setError(response.data.message || 'Electrician login failed.');
        }
      } catch (err) {
        setError('Electrician login error. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-0">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email / Name
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password / Phone No
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
