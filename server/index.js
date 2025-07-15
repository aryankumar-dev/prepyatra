import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/cource.routes.js'; 
import preplogRoutes from './routes/preplog.routes.js'; 
import cookieParser from "cookie-parser";
import recruiterNetworkRoutes from './routes/recruiterNetwork.routes.js'; 
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.use("/api", chatRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/preplogs', preplogRoutes);
app.use('/api/v1/recruiternetwork', recruiterNetworkRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });
