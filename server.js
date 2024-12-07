
const express = require('express');
const DB = require('./config/database');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const routers = require('./routes/routes');

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', routers);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


DB.connect();