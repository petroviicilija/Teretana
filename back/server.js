import 'express-async-errors';
import express, { json } from 'express';
import 'dotenv/config';
//Data base
import { connectDB } from './db/connectDB.js';
//Routers
import memberRouter from './routes/member.js';
import adminRouter from './routes/admin.js';
import trainerRouter from './routes/trainer.js';
//Errors
import { notFound } from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
//Login
import { login } from './controllers/login.js';
//Permission and authorization
import auth from './middleware/authentication.js';
import { checkRole } from './middleware/checkRole.js';

const app = express();

app.use(express.json());

app.post('/api/v1/login', login);
app.use('/api/v1/admin', auth, checkRole('admin'), adminRouter);
app.use('/api/v1/trainer', auth, checkRole('trainer'), trainerRouter);
app.use('/api/v1/member', auth, checkRole('member'), memberRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

try {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, console.log(`Server is listening on port ${port}...`));
} catch (error) {
  console.log(error);
}