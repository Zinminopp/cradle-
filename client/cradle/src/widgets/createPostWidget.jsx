import { EditOutlined, DeleteOutlined, ImageOutlined } from "@mui/icons-material";
import { Box, useTheme, Divider, IconButton, Typography, Button, InputBase } from "@mui/material";
import Dropzone from "react-dropzone";
import StyledWidget from "../components/styledWidget";
import UserImage from "../components/userImage";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../state";


const CreatePostWidget = ({profilePicture}) =>{

    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handlePostSubmit = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("postString", post);
        if (image) {
          formData.append("picture", image);
          formData.append("postImage", image.name);
        }
    
        const responseData = await fetch(`http://localhost:3001/posts`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const posts = await responseData.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
      };
    
    


    return (
        <StyledWidget backgroundColor="#F7EFC5">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '1rem' }}>
            <UserImage image={profilePicture} />
            <InputBase
            placeholder="Write something to post..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
                width: "100%",
                backgroundColor: palette.primary.main,
                borderRadius: "2rem",
                padding: "1rem 2rem",
            }}
            />
        </Box>
        {isImage && (
            <Box border={`1px solid ${palette.primary.main}`} borderRadius="5px" mt="1rem" p="1rem">
            <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
                {({ getRootProps, getInputProps }) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                    <input {...getInputProps()} />
                    {!image ? (
                        <p>Add Post Image Here</p>
                    ) : (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                        </Box>
                    )}
                    </Box>
                    {image && (
                    <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                        <DeleteOutlined />
                    </IconButton>
                    )}
                </Box>
                )}
            </Dropzone>
            </Box>
        )}
        <Divider sx={{ margin: "1.25rem 0" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '0.25rem' }} onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: palette.secondary }} />
            <Typography color={palette.secondary} sx={{ "&:hover": { cursor: "pointer", color: palette.secondary } }}>
                Post Image
            </Typography>
            </Box>
            <Button
            disabled={!post}
            onClick={handlePostSubmit}
            sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
            }}
            >
            POST
            </Button>
        </Box>
        </StyledWidget>
    );
};  

export default CreatePostWidget;