import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName : { type : String, required : true },
  email : { type : String, required : true },
  phone_number : { type : String, required : true },
  role : { type : String, enum : ["ADMIN", "USER"], required : true },
  password : { type : String, required : true },
  profile_image : { type : String, required : true }
}, { timestamps : true });

const User = mongoose.model('users', userSchema);

export default User;
