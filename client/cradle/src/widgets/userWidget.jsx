import StyledWidget from "../components/styledWidget";
import { Box, Typography, useTheme } from "@mui/material";
import UserImage from "../components/userImage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const UserWidget = ({userId, profilePicture}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
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
  
    if (!user || !user.friends) {
      return null;
    }
    
    const {
      userName,
      friends,
    } = user;
  

    return(
        <StyledWidget backgroundColor="#F7EFC5">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap : '1rem', pb: "1.1rem"}} onClick={() => navigate(`/profile/${userId}`)} >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap : '1rem'}}>
                    <UserImage image={profilePicture} />
                        <Box>
                            <Typography
                            variant="h4"
                            color={palette.primary}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                color: palette.primary,
                                cursor: "pointer",
                                },
                            }}
                            >
                            {userName}
                            </Typography>
                            <Typography color={palette.primary}>{friends.length} friends</Typography>
                        </Box>

                </Box>
            </Box>

        </StyledWidget>
    );


};


export default UserWidget;

