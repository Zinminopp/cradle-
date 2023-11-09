import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Friend from "../components/friend";
import StyledWidget from "../components/styledWidget";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";

const PostWidget = ({ postId, postUserId, userName, userProfilePicture, postString, likes, postImage}) =>{

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likesCount = Object.keys(likes).length;
    const theme = useTheme();

    const fetchLike = async () => {
        const responseData = await fetch(`http://localhost:3001/posts/${postId}/like`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await responseData.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return(
        <StyledWidget m="2rem 0" backgroundColor="#F7EFC5">
            <Friend friendId = {postUserId} userName ={ userName } userProfilePicture={userProfilePicture} />
            <Typography color={theme.palette.primary.test} sx={{ mt: "1.5rem" }}>
                {postString}
            </Typography>
            {postImage && (
                <img width="100%" height="auto" alt="post" style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} src={`https://zinminoo.blob.core.windows.net/cradle/${postImage}`}/>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap : '0.3rem',}}>
                <IconButton onClick={fetchLike}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: theme.palette.secondary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                </IconButton>
                <Typography>{likesCount}</Typography>
            </Box>
            
        </StyledWidget>
    );



};

export default PostWidget;






