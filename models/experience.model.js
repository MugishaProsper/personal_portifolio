import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
  company_name : { type : String, required : true },
  role : { type : String, required : true },
  start_date : { type : Date, required : true },
  end_date : { type : Date, default : Date.now},
  description : { type : String, required : true },
  image : { type : String, required : true },
}, { timestamps : true });

const Experience = mongoose.model('experiences', experienceSchema);

export default Experience;
