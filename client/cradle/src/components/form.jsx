import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";


const registerSchema = yup.object().shape ({
    userName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape ({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});


const initialValuesRegister = {
    userName: "",
    email: "",
    password: "",
    picture: "",
};
  
  const initialValuesLogin = {
    email: "",
    password: "",
};

const FormComponent = () =>{
    const [pageType, setPageType] = useState("login");
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoginPage = pageType === "login";
    const isRegisterPage = pageType === "register";
    
    const userLogin = async (values, onSubmitProps) => {
        const logInResponseData = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const loggedIn = await logInResponseData.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
        }
    };

    const userRegister = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let field in values) {
          formData.append(field, values[field]);
        }
        formData.append("profilePicture", values.picture.name);
    
        const saveUserResponse = await fetch(
          "http://localhost:3001/auth/register",
          {
            method: "POST",
            body: formData,
          }
        );
        const savedUser = await saveUserResponse.json();
        onSubmitProps.resetForm();
    
        if (savedUser) {
          setPageType("login");
        }
    };
    
    
    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLoginPage) await userLogin(values, onSubmitProps);
        if (isRegisterPage) await userRegister(values, onSubmitProps);
    };



    
    return(
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={isLoginPage ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLoginPage ? loginSchema : registerSchema}
        >
            {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            {isRegisterPage && (
              <>
                <TextField
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  error={
                    Boolean(touched.userName) && Boolean(errors.userName)
                  }
                  helperText={touched.userName && errors.userName}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${theme.palette.background}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptableFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptableFiles) =>
                      setFieldValue("picture", acceptableFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.neutral.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Your Profile Picture Here</p>
                        ) : (
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.neutral.main,
                color: theme.palette.background,
                "&:hover": { color: theme.palette.primary },
              }}
            >
              {isLoginPage ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLoginPage ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: theme.palette.neutral,
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.neutral,
                },
              }}
            >
              {isLoginPage
                ? "Haven't registered yet? Sign Up here."
                : "Already registered? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormComponent;