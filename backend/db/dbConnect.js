import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL).then(()=>console.log("connected to Mongo db successfullly"))
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect;