import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  category: { type: String, enum: ['Electrical', 'Plumbing', 'Other'] },
  description: String,
  status: { type: String, default: 'open' }, 
  electricianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Electrician', default:null },
  updatedAt: { type: Date, default: Date.now },
  details: String

});

export const Complaint =  mongoose.model('Complaint', ComplaintSchema);
