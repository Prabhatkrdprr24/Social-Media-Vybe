import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/DB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import loopRouter from './routes/loop.routes.js';
import storyRouter from './routes/story.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/loop', loopRouter);
app.use('/api/story', storyRouter);


app.get('/', (req, res) => {
  res.send('Welcome to the VYBE backend!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDb(); 
    console.log(`Server is running on http://localhost:${PORT}`);
});