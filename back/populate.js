import 'dotenv/config';
import { connectDB } from './db/connectDB.js';
import { User } from './models/user.js';
import fs from 'fs';

const jsonUsers = JSON.parse(
  fs.readFileSync(new URL('./users.json', import.meta.url))
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany();
    await User.create(jsonUsers);
    console.log('Success')
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();