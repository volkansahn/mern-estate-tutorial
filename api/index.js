import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/user.auth.js';
import { error } from 'console';

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log('Database Connected');
})
.catch((err) => {
    console.log(err);
});
const app = express();

app.use(express.json());

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal SErver Error';
    return res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode
    });
});