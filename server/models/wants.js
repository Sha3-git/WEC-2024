const mongoose = require('mongoose');

const wantSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    name: String, 
    amount: Number, 
    card: String, 
},{
    timestamp: true
})

const want = new mongoose.model('want', wantSchema);
module.exports = want;