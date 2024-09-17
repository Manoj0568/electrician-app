import { Router } from "express";
import { Complaint } from "../models/complaint.model.js";
import { Electrician } from "../models/electrician.model.js";

const complaintRouter = Router()

complaintRouter.get("/complaints",async (req,res)=>{
     try {
        const complaints = await Complaint.find()
        return res.status(200).json(complaints)
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
})

complaintRouter.post('/complaints', async (req, res) => {
    const { category, customerName, address, description } = req.body;
    const complaint = new Complaint({ category, customerName, address, description });
    try {
        await complaint.save();
         res.json(complaint);
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
  });

complaintRouter.delete('/complaints/:id', async (req, res) => {

    try {
        const complaint = await Complaint.findById(req.params.id);
        if(!complaint) return res.status(404).json({message:"complaint not found"})
        const electrician = await Electrician.findById(complaint.electricianId);
        if(!electrician) return res.status(404).json({message:"electrician not found"})
        electrician.status = 'available';
        electrician.solvedComplaints += 1;
        electrician.complaintId = ""
        await electrician.save();
        await Complaint.findByIdAndDelete(req.params.id);
        } catch (error) {
            res.status(500).json({error:"internalserver Error"})
        }
    res.json({ message: 'Complaint deleted' });
    
  });
  complaintRouter.get('/complaints/:id', async (req, res) => {

    try {
        let response = await Complaint.findOne({electricianId:req.params.id, status:"assigned"});
        console.log(response)
        res.json(response);
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
    
  });

complaintRouter.put('/complaints/:id', async (req, res) => {
    const electricians = await Electrician.find({ status: 'available' });
    
    if (electricians.length === 0) return res.status(200).json({ message: 'No available electricians' });
    
    const complaint = await Complaint.findById(req.params.id);
    const nextElectrician = electricians[0];  
    complaint.electricianId = nextElectrician._id;
    complaint.status = 'assigned';
    await complaint.save();
    nextElectrician.complaintId = complaint._id;
    nextElectrician.status = 'busy';
    await nextElectrician.save();
    
    res.json({ message: 'Complaint assigned', complaint });
  });

  export default complaintRouter;