import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoutes from './routes/job.route.js';
import applicationRoutes from './routes/application.route.js'


dotenv.config();
const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions)); 


// Api's for user routes

app.use('/api/v1/user', userRoutes);
// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login" 
// "http://localhost:8000/api/v1/user/profile/update"

// Api's for company routes

app.use('/api/v1/company', companyRoutes);
// "http://localhost:8000/api/v1/company/register"
// "http://localhost:8000/api/v1/company/get" 
// "http://localhost:8000/api/v1/company/get/:id"
// "http://localhost:8000/api/v1/company/update/:id"

// Api's for job routes

app.use('/api/v1/job', jobRoutes);
// "http://localhost:8000/api/v1/job/create"
// "http://localhost:8000/api/v1/job/get"
// "http://localhost:8000/api/v1/job/get/:id"
// "http://localhost:8000/api/v1/job/update/:id"

// Api's for applications routes

app.use('/api/v1/application', applicationRoutes);
// "http://localhost:8000/api/v1/application/apply"
// "http://localhost:8000/api/v1/application/get"
// "http://localhost:8000/api/v1/application/get/:id"
// "http://localhost:8000/api/v1/application/update/:id"




const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server is running on http://localhost:${PORT}`);
});
