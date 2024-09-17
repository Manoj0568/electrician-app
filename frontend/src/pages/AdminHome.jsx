import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../helper/axiosInterceptor';

const AdminHome = () => {
  const [electricians, setElectricians] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [electricianDetails, setElectricianDetails] = useState({ name: '', phone: '' });
  const [complaintDetails, setComplaintDetails] = useState({
    customerName: '',
    address: '',
    category: 'Electrical',
    description: '',
  });

  
  useEffect(() => {
    fetchElectricians();
    fetchComplaints();
  }, []);

  
  const fetchElectricians = async () => {
    try {
      const res = await axiosInstance.get('/electricians');
      setElectricians(res.data);
    } catch (err) {
      console.error(err);
    }
  };

 
  const fetchComplaints = async () => {
    try {
      const res = await axiosInstance.get('/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

 
  const addElectrician = async () => {

    if(!electricianDetails || electricianDetails.name=="" || electricianDetails.phone == "")return alert("feilds can't be empty")
        console.log("comming")
    try {
      await axiosInstance.post('/electricians', electricianDetails);
      setElectricianDetails({ name: '', phone: '' });
      fetchElectricians(); 
    } catch (err) {
      console.error(err);
    }
  };

  const deleteElectrician = async (id) => {
    try {
      await axiosInstance.delete(`/electricians/${id}`);
      fetchElectricians(); 
      fetchComplaints()
    } catch (err) {
      console.error(err);
    }
  };

  
  const addComplaint = async () => {

    if(!complaintDetails || complaintDetails.customerName=="" || complaintDetails.category=="" || complaintDetails.description =="") return alert("feild can't be empty")
    try {
      await axiosInstance.post('/complaints', complaintDetails);
      setComplaintDetails({ customerName: '', address: '', category: 'Electrical', description: '' });
      fetchComplaints(); 
    } catch (err) {
      console.error(err);
    }
  };

  
  const deleteComplaint = async (id) => {
    try {
      await axiosInstance.delete(`/complaints/${id}`);
      fetchComplaints(); 
      fetchElectricians()
    } catch (err) {
      console.error(err);
    }
  };

  const assignComplaint = async (id) =>{
    try {
        let response = await axiosInstance.put(`/complaints/${id}`)
        alert(response.data.message)
        fetchComplaints(); 
        fetchElectricians()
      } catch (err) {
        console.error(err.message);
      }
  }

  const getElectrician = (id)=>{
     let electrician = electricians.find((n)=>n._id==id)
     if(!electrician) return "no  one"
     return electrician.name
  }

  return (
    <div className="container mx-auto p-4 bg-slate-100">
      <h1 className="text-3xl font-bold mb-4 mx-16">Admin Dashboard</h1>

      <div className="mb-8 mx-16">
        <h2 className="text-xl font-semibold mb-2">Manage Electricians</h2>
        <div className="flex flex-col md:flex-row align-middle items-center space-y-1 md:space-x-1 mb-4">
          
          <input
            type="text"
            value={electricianDetails.name}
            onChange={(e) => setElectricianDetails({ ...electricianDetails, name: e.target.value })}
            placeholder="Electrician Name"
            className="border border-gray-300 p-2 rounded w-full md:w-1/3"
          />
          <input
            type="text"
            value={electricianDetails.phone}
            onChange={(e) => setElectricianDetails({ ...electricianDetails, phone: e.target.value })}
            placeholder="Phone Number"
            className="border border-gray-300 p-2 rounded w-full md:w-1/3"
          />
          <button
            onClick={addElectrician}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
          >
            Add Electrician
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300 text-center">
                <th className="p-2 ">Electrician Name</th>
                <th className="p-2 max-sm:hidden">No of complaint closed</th>
                <th className="p-2">Status</th>
                <th className="p-2 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {electricians.map((electrician) => (
                <tr key={electrician._id} className="border-b border-gray-300 text-center">
                  <td className="p-2">{electrician.name}</td>
                  <td className="p-2 max-sm:hidden">{electrician.solvedComplaints}</td>
                  <td className="p-2 ">{electrician.status}</td>
                  
                  <td className="p-2">
                    <button
                      onClick={() => deleteElectrician(electrician._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
      <div className="mb-8 mx-16" >
        <h2 className="text-xl font-semibold mb-2">Manage Complaints</h2>
        <div className="grid grid-cols-1 gap-4  mb-4">
          <input
            type="text"
            value={complaintDetails.customerName}
            onChange={(e) => setComplaintDetails({ ...complaintDetails, customerName: e.target.value })}
            placeholder="Customer Name"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            value={complaintDetails.address}
            onChange={(e) => setComplaintDetails({ ...complaintDetails, address: e.target.value })}
            placeholder="Customer Address"
            className="border border-gray-300 p-2 rounded"
          />
          <select
            value={complaintDetails.category}
            onChange={(e) => setComplaintDetails({ ...complaintDetails, category: e.target.value })}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            value={complaintDetails.description}
            onChange={(e) => setComplaintDetails({ ...complaintDetails, description: e.target.value })}
            placeholder="Complaint Description"
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={addComplaint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Complaint
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300 text-center">
                <th className="p-2 ">Customer Name</th>
                <th className="p-2 max-sm:hidden">Address</th>
                <th className="p-2 max-sm:hidden ">Category</th>
                <th className="p-2 max-sm:hidden">Description</th>
                <th className="p-2 ">Status</th>
                <th className="p-2 ">Assigned Electrician</th>
                <th className="p-2 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id} className="border-b border-gray-300 text-center">
                  <td className="p-2">{complaint.customerName}</td>
                  <td className="p-2 max-sm:hidden">{complaint.address}</td>
                  <td className="p-2 max-sm:hidden">{complaint.category}</td>
                  <td className="p-2 max-sm:hidden">{complaint.description}</td>
                  <td className="p-2">{complaint.status}</td>
                  <td className="p-2">{complaint.electricianId !== null ? getElectrician(complaint.electricianId) :<button
                      onClick={()=>assignComplaint(complaint._id) }
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Assign
                    </button> }</td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteComplaint(complaint._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
