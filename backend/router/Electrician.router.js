import { Router } from "express";
import { Complaint } from "../models/complaint.model.js";
import { Electrician } from "../models/electrician.model.js";
import jwt from 'jsonwebtoken'
const electricianRouter = Router()
const JWT_SECRET = process.env.JWT_SECRET_KEY
electricianRouter.put('/complaints/:id/close', async (req, res) => {
    const { remarks } = req.body;
    try {
    const complaint = await Complaint.findById(req.params.id);
    if(!complaint) return res.status(404).json({message:"complaint not found"})
    complaint.status = 'closed';
    complaint.details = remarks;
    await complaint.save();
    const electrician = await Electrician.findById(complaint.electricianId);
    if(!electrician) return res.status(404).json({message:"electrician not found"})
    electrician.status = 'available';
    electrician.solvedComplaints += 1;
    electrician.complaintId =""
    await electrician.save();
        
    } catch (error) {
        res.status(500).json({error:"internalserver Error"})
    }

    res.json({ message: 'Complaint closed' });
  });

  electricianRouter.post('/electricians',async (req,res)=>{
    const {name,phone} = req.body
     try {
        const newUser = new Electrician({name,phone})
        await newUser.save()
        res.status(200).json(newUser)
     } catch (error) {
        res.status(500).json({message:"internalserver Error"})
     }
  })

  electricianRouter.get("/electricians",async (req,res)=>{
   try {
      const complaints = await Electrician.find()
      return res.status(200).json(complaints)
  } catch (error) {
      res.status(500).json({message:"internal server error"})
  }
})

electricianRouter.delete('/electricians/:id', async (req, res) => {

   try {
      const electrician = await Electrician.findById(req.params.id);
      if(!electrician) return res.status(404).json({message:"electrician not found"})
      const complaint = await Complaint.findById(electrician.complaintId);
      if(!complaint) return res.status(404).json({message:"complaint not found"})
      complaint.status = 'open';
      complaint.electricianId = null;
      await complaint.save();
      await Electrician.findByIdAndDelete(req.params.id);

      } catch (error) {
          res.status(500).json({error:"internalserver Error"})
      }
  res.json({ message: 'Electrician deleted' });
  
   
 });

 electricianRouter.post('/electrician/login', async (req, res) => {
   const { name, phone } = req.body;
 
   try {
     const electrician = await Electrician.findOne({ name, phone });
     if (!electrician) {
       return res.status(400).json({ success: false, message: 'Electrician not found' });
     }
     const token = jwt.sign({ userId: electrician._id, role: 'electrician' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
   } catch (error) {
     res.status(500).json({ success: false, message: 'Server error' });
   }
 })
 
  export default electricianRouter;