const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    name: String, 
    amount: Number, 
    card: String, 
},{
    timestamps: true
})

const expense = new mongoose.model('expense', expenseSchema);
module.exports = expense;