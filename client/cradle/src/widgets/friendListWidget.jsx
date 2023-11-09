import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import Friend from "../components/friend";
import StyledWidget from "../components/styledWidget";


const FriendListWidget = ({userId}) => { 
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const dispatch = useDispatch();
    const theme = useTheme();
    
    const fetchFriends = async () => {
        const responseData = await fetch(
          `http://localhost:3001/users/${userId}/friends`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const friendData = await responseData.json();
        dispatch(setFriends({ friends: friendData }));
      };
    
    useEffect(() => {
        fetchFriends();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <StyledWidget backgroundColor="#F7EFC5">
            <Typography color={theme.palette.neutral} variant="h6" fontweight="400" sx={{ mb: "1.5rem" }} >
                List of Friends
            </Typography>
            <Box display= "flex" flexDirection="column" gap="1.5rem" >
              {friends.map((friend) => (
                  <Friend
                      key={friend._id}
                      friendId={friend._id}
                      userName={friend.userName}
                      userProfilePicture={friend.profilePicture}
                  />
              ))}
            </Box>
        </StyledWidget>
    );

};

export default FriendListWidget;