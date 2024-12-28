const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

connectDB().then();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/user', userRoutes);
app.use('/events', eventRoutes);
app.use('/services', serviceRoutes);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
