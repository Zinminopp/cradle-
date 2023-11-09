import { Avatar, Box } from "@mui/material";


const UserImage= ({image, size = "60px"}) => {
    return(
        <Box width = {size} height = {size}>
            <Avatar 
                alt="user"
                //The path to image in our case the Azure blob storage
                src={`https://zinminoo.blob.core.windows.net/cradle/${image}`}
            />
        </Box>
    );
};

export default UserImage;