import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import passwordRoutes from './routes/passwordRoutes';
import verificationRoutes from './routes/verificationRoutes';

dotenv.config();

// Initialize the app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/verification', verificationRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
