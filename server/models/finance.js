const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    credit: Number,
    debit: Number,
    totalExpenditure: Number,
})

const finance = new mongoose.model('finance', financeSchema);

module.exports = finance;