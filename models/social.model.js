import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  name : { type : String, required : true },
  link : { type : String, required : true },
  icon : { type : String, required : true },
  image : { type : String, required : true },
}, { timestamps : true });

const Social = mongoose.model("socials", socialSchema);

export default Social;


