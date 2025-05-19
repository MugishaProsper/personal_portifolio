import mongoose from "mongoose";

const reachoutSchema = new mongoose.Schema({
  name : { type : String, required : true },
  email : { type : String, required : true },
  message : { type : String, required : true },
  likes : { type : Number, default : 0 },
}, { timestamps : true });

const Reachout = mongoose.model("reachouts", reachoutSchema);

export default Reachout;
