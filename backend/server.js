const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const serviceRoutes = require('./routes/serviceRoutes');
const {calculateCost} = require("./controllers/calculateControllers");

require('dotenv').config();

connectDB().then();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты

app.use('/services', serviceRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
