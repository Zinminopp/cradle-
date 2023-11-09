import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "../widgets/userWidget";
import Navbar from "../components/navbar";
import FriendListWidget from "../widgets/friendListWidget";
import PostListWidget from "../widgets/postListWidget";
import CreatePostWidget from "../widgets/createPostWidget";



const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);

    const fetchUser = async () => {
        const responseData = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await responseData.json();
        setUser(userData);
      };

      useEffect(() => {
        fetchUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      if (!user) return null;

      return (
        <Box>
          <Navbar />
          <Box
            width="100%"
            padding="2rem 6%"
            display= "flex"
            gap="2rem"
            justifyContent="center"
          >
            <Box>
              <UserWidget userId={userId} profilePicture={user.profilePicture} />
              <Box m="2rem 0" />
              <FriendListWidget userId={userId} />
            </Box>
            <Box
              flexBasis="42%"
            >
              <CreatePostWidget profilePicture={user.profilePicture} />
              <Box m="2rem 0" />
              <PostListWidget userId={userId} isProfile />
            </Box>
          </Box>
        </Box>
      );

};


export default ProfilePage;
