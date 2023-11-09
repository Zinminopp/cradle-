import { Box, Typography, useTheme } from "@mui/material";
import FormComponent from "../components/form";
import logo from '../assets/logo.png'






const LoginPage = () => {

    const theme = useTheme();
    return(
        <Box>
            <Box width ="100%" backgroundColor={theme.palette.primary}>
                <Typography style={{ flexGrow: 1, display: 'flex'}}>
                    <img src={logo} alt="Logo" style={{ height: '100px', width: '100px', alignItems: 'center'  }}/>
                </Typography>
            </Box>
            <Box width="50%" p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background}>
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    A social media platform for the people
                </Typography>
                <FormComponent />

            </Box>

        </Box>
    );
};

export default LoginPage;