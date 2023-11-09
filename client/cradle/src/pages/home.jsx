import { Box } from "@mui/material";
import Navbar from "../components/navbar";
import UserWidget from "../widgets/userWidget";
import FriendListWidget from "../widgets/friendListWidget";
import CreatePostWidget from "../widgets/createPostWidget";
import PostListWidget from "../widgets/postListWidget";
import { useSelector } from "react-redux";



const HomePage = () =>{

    const { _id, profilePicture } = useSelector((state) => state.user);



    return(
        <Box>
            <Navbar />
            <Box width="100%" padding="2rem 6%" display= "flex" gap="0.5rem" justifyContent="space-between">
                <Box flexBasis="28%">
                    <UserWidget userId={_id} profilePicture={profilePicture} />
                </Box>
                <Box flexBasis="40%">
                    <CreatePostWidget profilePicture={profilePicture} />
                    <PostListWidget userId={_id} />

                </Box>
                <Box flexBasis="26%">
                    <FriendListWidget userId={_id} />
                </Box>
            </Box>

        </Box>
    );
};


export default HomePage;