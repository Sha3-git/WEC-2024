const express = require('express');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
mongoose.connect(process.env.MONGO_URI);
const port = 4000;
app.listen(port, () => { console.log(`listening on port http://localhost:${port}`); });

const finance = require('./controllers/finance-controller');
const todo = require('./controllers/todo-controller');
const user = require('./controllers/user-controller')


app.get('/users', user.getAllUsers)
app.post('/register', user.registerUser)
app.post('/auth', user.authenticateUser)