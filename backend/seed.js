const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Event = require("./models/Event");
const Booking = require("./models/Booking");

const { users, events, bookings } = require("./fixtures");
require("dotenv").config();

const seedDatabase = async () => {
    try {
        // Подключение к базе данных
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Подключено к MongoDB");

        // Очистка базы данных
        await User.deleteMany();
        await Event.deleteMany();
        await Booking.deleteMany();
        console.log("Данные очищены");

        // Создание пользователей
        const createdUsers = [];
        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const newUser = await User.create({ ...user, password: hashedPassword });
            createdUsers.push(newUser);
        }
        console.log("Пользователи добавлены");

        // Создание мероприятий
        const createdEvents = await Event.insertMany(events);
        console.log("Мероприятия добавлены");

        // Создание записей
        for (const booking of bookings) {
            const user = createdUsers.find((u) => u.email === booking.userEmail);
            if (user) {
                await Booking.create({ ...booking, userId: user._id });
            }
        }
        console.log("Записи добавлены");

        process.exit();
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error.message);
        process.exit(1);
    }
};

seedDatabase();
