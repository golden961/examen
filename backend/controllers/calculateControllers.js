const Calculation = require('../models/Calculation');
const nodemailer = require('nodemailer');

exports.calculateCost = async (req, res) => {
    try {
        const { area, floors, foundation, walls, roof, options, email } = req.body;

        // Пример простой логики расчета стоимости
        const foundationCost = foundation === 'ленточный' ? 2000 : foundation === 'плитный' ? 3000 : 1000;
        const wallCost = walls === 'кирпич' ? 5000 : walls === 'дерево' ? 3000 : 2000;
        const roofCost = roof === 'плоская' ? 1500 : 2500;
        const optionsCost = options.length * 1000;

        const totalCost = (area * floors * 100) + foundationCost + wallCost + roofCost + optionsCost;

        // Сохранение расчета в базе данных
        const calculation = new Calculation({ area, floors, foundation, walls, roof, options, totalCost, email });
        await calculation.save();

        // Отправка email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Расчет стоимости строительства',
            text: `Ваш расчет: ${totalCost} руб.`
        });

        res.status(200).json({ success: true, totalCost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
