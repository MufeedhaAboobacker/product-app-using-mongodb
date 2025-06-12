import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
import connectDB from './db/connectDB.js';

// Initialize dotenv
dotenv.config();

// express initialize
const app = express();

// port 
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// DB connection
connectDB() 

// routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    status: false,
    message: error.message || "Something went wrong",
  });
});
