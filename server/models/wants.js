const mongoose = require('mongoose');

const wantSchema = mongoose.Schema({
    name: String, 
    amount: Number, 
    card: String, 
},{
    timestamp: true
})

const want = new mongoose.model('want', wantSchema);
module.exports = want;