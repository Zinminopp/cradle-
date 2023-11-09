import mongoose from "mongoose";

let postSchema = new mongoose.Schema({

    userId:{
        type: String,
        required: true,
    },

    userName:{
        type: String,
        required:true
    },
    
    userProfilePicture: String,
    
    postString: String,
    
    likes:{
        type: Map,
        of: Boolean
    },
    
    postImage:String,

});


const Post = mongoose.model("Post", postSchema);
export default Post;