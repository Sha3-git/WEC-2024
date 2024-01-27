const mongoose = require('mongoose');

const needSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    name: String, 
    amount: Number, 
    card: String, 
},{
    timestamps: true
})

const need = new mongoose.model('need', needSchema);
module.exports = need;