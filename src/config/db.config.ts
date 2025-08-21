import mongoose from "mongoose";
 
const initDB = async () => {
  try {
     const uri = process.env.MONGO_URI!;
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed : ", error);
    process.exit(1);
  }
};

export default initDB;
