const express = require("express");
const Event = require("../models/Event");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Получение списка всех мероприятий
router.get("/", async (req, res) => {
    try {
        const events = await Event.find(); // Получение всех мероприятий
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера при загрузке мероприятий" });
    }
});

// Получение информации о конкретном мероприятии по ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Мероприятие не найдено" });
        }

        res.json(event);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера при загрузке мероприятия" });
    }
});

// Создание нового мероприятия (только администратор)
router.post("/", protect, admin, async (req, res) => {
    const { name, date, time, location, description } = req.body;

    try {
        const newEvent = new Event({ name, date, time, location, description });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: "Ошибка при создании мероприятия" });
    }
});

// Обновление мероприятия (только администратор)
router.put("/:id", protect, admin, async (req, res) => {
    const { name, date, time, location, description } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { name, date, time, location, description },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Мероприятие не найдено" });
        }

        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: "Ошибка при обновлении мероприятия" });
    }
});

// Удаление мероприятия (только администратор)
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Мероприятие не найдено" });
        }

        res.json({ message: "Мероприятие успешно удалено" });
    } catch (err) {
        res.status(500).json({ message: "Ошибка при удалении мероприятия" });
    }
});

module.exports = router;
