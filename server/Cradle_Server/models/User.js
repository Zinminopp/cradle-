import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default: "",
    },
    friends:{
        type: Array,
        default: [],
    },

});

const User = mongoose.model("User", userSchema);
export default User;