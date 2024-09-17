import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  password: String,
  email: {
    type: String,
    unique: true
  }
});

export const Admin = mongoose.model('Admin', AdminSchema);
