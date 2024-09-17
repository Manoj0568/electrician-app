import { Router } from "express";
import { Admin } from "../models/admin.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const AdminRouter = Router()
const JWT_SECRET = process.env.JWT_SECRET_KEY
AdminRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const emailPatern = /\.admin@xyz.com$/;
    if(!emailPatern.test(email)) return res.status(400).json({ message: 'Email not for admin' })
    try {
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message:  'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Admin({
        email,
        password: hashedPassword,
      });
      await newUser.save();
  
      res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
AdminRouter.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ success: false, message: 'Admin not found' });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect password' });
      }
      const token = jwt.sign({ userId: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
export default AdminRouter