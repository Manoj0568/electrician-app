import mongoose from "mongoose";

const ElectricianSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    unique: true
  },
  status: { type: String, default: 'available' }, 
  solvedComplaints: { type: Number, default: 0 },
  complaintId: { type: String, default: null },
});

export const Electrician = mongoose.model('Electrician', ElectricianSchema);
