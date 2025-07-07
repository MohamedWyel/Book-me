const express = require('express');
const cors = require('cors');
const authPath =require('./routes/auth');
const userPath =require('./routes/user')
const connectDB = require('./config/db');
require('dotenv').config();

  const app = express();
  app.use(cors());
  connectDB();
  app.use(express.json());


  app.use('/api/auth/',authPath)
  app.use('/api/user/',userPath)

const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
