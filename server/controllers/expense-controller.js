const Expense = require('../models/expenses');
const User = require('../models/users')
const expenses = {
    getExpense: async (req, res) => {
        const id = req.body.id;
        try {
        const expense = await Expense.find({ user_id: id })
        res.json({expense: expense})
        } catch (error) {
           console.log(error) 
        }
    },
    createExpense: async (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const amount = req.body.amout;
        const card = req.body.card;
        try {
            const existingUser = await User.findOne({_id: id})
            if ( existingUser) {
                const newProfile = new Expense({
                    user_id: id,
                    name: name,
                    amount: amount,
                    card: card,
                });
                newProfile.save();
                res.json({ status: 200, expense: newProfile });
            }
            else {
                res.json({ status: 400, error: 'user for this expense profile does not exist or there is already a profile'})
            }
        } catch (error) {
            console.log(error);
        }
       
       
    },
    updateExpense: async (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const amount = req.body.amout;
        const card = req.body.card;
        const existing = await Expense.findOne({ user_id: id });
        if (existing) {
            try {
                await Expense.updateOne({ user_id: id }, { $set: { name: name, amount: amount, card: card } })
                res.json({ status: 200, expense: existing })
            } catch (e) {
                console.log(e)
            }
        }
        else {
            res.json({ status: 400, error: 'user for this expense profile does not exist' })
        }

    },
    deleteExpense: async (req, res) => {
        const id = req.body.id;
        try {
            await Expense.deleteOne({ user_id: id })
            res.json({ status: 200, success: 'expense profile successfully deleted' })
        } catch (error) {
            console.log(e);
        }
    }
}

module.exports = expenses;