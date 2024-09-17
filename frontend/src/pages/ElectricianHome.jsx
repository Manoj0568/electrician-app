

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../helper/axiosInterceptor';

const ElectricianHome = () => {
  const [complaint, setComplaint] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(true); 
  const user = "66e8405b5e7c93f8f514f1d1";

  
  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/complaints/${user}`); 
      setComplaint(res.data); 
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  

  
  
  const closeComplaint = async () => {
    if (!complaint) return;
    if(!remarks || remarks=="") return alert("enter your remarks")

    try {

      await axiosInstance.put(`/complaints/${complaint._id}/close`,{remarks});
      setRemarks(''); 
      setComplaint(null); 
      fetchComplaint(); 
      alert("complaint closed successful")
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Assigned Complaint</h1>

      {/* No task assigned */}
      {!complaint && (
        <div className="text-center text-gray-500 py-8">
          <p>No task assigned</p>
        </div>
      )}

      {/* Complaint details */}
      {complaint && (
        <div className="border border-gray-300 p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{complaint.customerName}</h2>
          <p className="text-gray-600 mb-1">Address: {complaint.address}</p>
          <p className="text-gray-600 mb-1">Category: {complaint.category}</p>
          <p className="text-gray-600 mb-1">Description: {complaint.description}</p>
          <p className="text-gray-600 mb-1">Status: {complaint.status}</p>

          {/* Remarks input */}
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter your remarks here..."
            className="border border-gray-300 w-full p-2 rounded mb-4"
            rows="4"
          ></textarea>

          {/* Close complaint button */}
          <button
            onClick={closeComplaint}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit and Close Complaint
          </button>
        </div>
      )}
    </div>
  );
};

export default ElectricianHome;
