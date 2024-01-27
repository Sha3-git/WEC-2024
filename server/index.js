const express = require('express');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

const finance = require('./controllers/finance-controller');
const todo = require('./controllers/todo-controller');