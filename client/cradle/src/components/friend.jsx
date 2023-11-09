import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import UserImage from "./userImage";

const Friend = ({ friendId, userName, userProfilePicture }) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
  
    const { palette } = useTheme();

    const isFriend = friends.find((friend) => friend._id === friendId);

    const fetchFriend = async () => {
        const responseData = await fetch(
          `http://localhost:3001/users/${_id}/${friendId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const friendData = await responseData.json();
        dispatch(setFriends({ friends: friendData }));
      };

    return(
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap : '1rem',}}>
                <UserImage image={userProfilePicture} size="55px" />
                <Box
                     onClick={() => {
                        navigate(`/profile/${friendId}`);
                    }}
                ></Box>
                    <Typography 
                        color={palette.primary}
                        variant="h6"
                        fontWeight="400"
                        sx={{
                            "&:hover": {
                                color: palette.secondary,
                                cursor: "pointer",
                            },
                        }}>
                        {userName}

                    </Typography>
                </Box>
                <IconButton 
                    onClick={() => fetchFriend()}
                    sx={{ backgroundColor: palette.primary, p: "0.6rem" }}
                >
                    {isFriend? (<PersonRemoveOutlined sx={{ color: palette.secondary }} />) :(<PersonAddOutlined sx={{ color: palette.secondary}} />)}

                </IconButton>
        </Box>
    );
};


export default Friend;


