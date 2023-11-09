import express from "express";
import mongoose from "mongoose";
import { registerUser } from './controllers/auth.js';
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import bodyParser from "body-parser";
import  authRoutes  from './routes/auth.js';
import userRoutes from './routes/users.js';
import multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import postRoutes from "./routes/posts.js";
import { MulterAzureStorage } from "multer-azure-blob-storage";


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


const resolveBlobName = (req, file) => {
  return file.originalname;

};

const blobConfig = new MulterAzureStorage({
  connectionString: process.env.BLOB_STORAGE,
  accessKey: process.env.ACCESS_KEY_AZURE,
  accountName: process.env.AZURE_ACC_NAME,
  containerName: 'cradle',
  containerAccessLevel: 'blob',
  blobName: resolveBlobName
});

const upload = multer({
  storage: blobConfig
});


//Route with files that are to be uploaded
app.post("/auth/register", upload.single("picture"), registerUser);
app.post("/posts", verifyToken, upload.single("picture"), createPost);


//Routes for other functions
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
  

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    UseUnifiedTopology: true,
}).then(()=> {
    app.listen(PORT, ()=> console.log(`Server is running on PORT: ${PORT}`));
}).catch((error) => console.log(error));