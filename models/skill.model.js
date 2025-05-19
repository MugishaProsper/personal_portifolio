import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
  skillName : { type : String, required : true },
  skillPercentage : { type : Number, required : true },
  skillImage : { type : String, required : true },
  yearsOfExperience : { type : Number, required : true },
  description : { type : String, required : true }
}, { timestamps : true });

const Skill = mongoose.model('skills', skillSchema);

export default Skill;
