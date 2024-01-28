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
const expense = require('./controllers/expense-controller');
const want = require('./controllers/want-controller');
const need = require('./controllers/need-controller');
const todo = require('./controllers/todo-controller');
const user = require('./controllers/user-controller');


app.get('/users', user.getAllUsers)
app.post('/register', user.registerUser)
app.post('/auth', user.authenticateUser)
app.post('/finance', finance.createFinance)
app.put('/finance', finance.updateFinance)
app.delete('/finance', finance.deleteFinance)
app.get('/expense/:id', expense.getExpense)
app.post('/expense', expense.createExpense)
app.put('/expense', expense.updateExpense);
app.delete('/expense', expense.deleteExpense);
app.get('/need/:id', need.getNeeds);
app.post('/need', need.createNeed);
app.put('/need', need.updateNeed);
app.delete('/need', need.deleteNeed);
app.get('/want/:id', want.getWants);
app.post('/want', want.createWant);
app.put('/want', want.updateWant);
app.delete('/want', want.deleteWant);