import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from '#config/db.js';
import authRoutes from '#routes/auth.routes.js';
import courseRoutes from '#routes/cource.routes.js';
import preplogRoutes from '#routes/preplog.routes.js';
import cookieParser from "cookie-parser";
import recruiterNetworkRoutes from '#routes/recruiterNetwork.routes.js';
import chatRoutes from "#routes/chatRoutes.js";
import resourceRoutes from "#routes/resource.routes.js";
import tuitionRequestRoutes from "#routes/tuitionRequest.routes.js";
import adminRoutes from "#routes/admin.routes.js";
import unblockRequestRoutes from "#routes/unblockRequest.routes.js";

const app = express();
dotenv.config();

const previewOriginPattern = /^https:\/\/prepyatra-[a-z0-9-]+-aryankumar-devs-projects\.vercel\.app$/;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === process.env.CLIENT_URL || previewOriginPattern.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
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
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/tuition-requests', tuitionRequestRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/unblock-requests', unblockRequestRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode,
        data: err.data ?? null,
        success: false,
        errors: err.errors ?? [],
        message: err.message || "Internal Server Error",
    });
});

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
