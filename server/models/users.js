const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: String,
},{
    timestamps: true
});


const user = new mongoose.model('user', userSchema);


module.exports = user;