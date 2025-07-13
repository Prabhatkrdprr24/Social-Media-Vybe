import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/DB.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the VYBE backend!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDb(); 
    console.log(`Server is running on http://localhost:${PORT}`);
});