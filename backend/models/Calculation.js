const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
    area: { type: Number, required: true },
    floors: { type: Number, required: true },
    foundation: { type: String, required: true },
    walls: { type: String, required: true },
    roof: { type: String, required: true },
    options: { type: [String], default: [] },
    totalCost: { type: Number, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Calculation', CalculationSchema);
