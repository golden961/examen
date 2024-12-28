const users = [
    {
        name: "Админ",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
    },
    {
        name: "Пользователь 1",
        email: "user1@example.com",
        password: "password123",
        role: "user",
    },
    {
        name: "Пользователь 2",
        email: "user2@example.com",
        password: "password123",
        role: "user",
    },
];

const events = [
    {
        name: "Интенсив по личностному росту",
        date: "2024-03-15",
        time: "10:00",
        location: "Конференц-зал, ул. Новых идей, д. 8",
        description: "Откройте себя с новой стороны. Наш интенсив наполнит вас энергией и вдохновением.",
    },
    {
        name: "Креативная встреча",
        date: "2024-04-25",
        time: "15:00",
        location: "Творческая студия, ул. Успеха, д. 25",
        description: "Идеальное место для общения с единомышленниками и обмена идеями.",
    },
];

const bookings = [
    {
        type: "Интенсив по личностному росту",
        itemId: "645c9f7ecf1b2c5f2d9b1a6f", // Реальный ObjectId мероприятия
        userEmail: "mam11@gmail.com",
    },
];

module.exports = { users, events, bookings };
