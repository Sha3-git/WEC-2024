// finance controller
const Finance = require('../models/finance');
const User = require('../models/users')
const finances = {
    createFinance: async (req, res) => {
        const id = req.body.id;
        try {
            const existingFinance = await Finance.findOne({ user_id: id });
            const existingUser = await User.findOne({_id: id})
            if (!existingFinance && existingUser) {
                const newProfile = new Finance({
                    user_id: id,
                    credit: 0,
                    debit: 0,
                    totalExpenditure: 0
                });
                newProfile.save();
                res.json({ status: 200, finance: newProfile });
            }
            else {
                res.json({ status: 400, error: 'user for this finance profile does not exist or there is already a profile'})
            }
        } catch (error) {
            console.log(error);
        }    
    },
    updateFinance: async (req, res) => {
        const id = req.body.id;
        const credit = req.body.credit;
        const debit = req.body.debit;
        const expenditure = req.body.expenditure;
        const existing = await Finance.findOne({ user_id: id });
        if (existing) {
            try {
                await Finance.updateOne({ user_id: id }, { $set: { credit: credit, debit: debit, totalExpenditure: expenditure } })
                res.json({ status: 200, finance: existing })
            } catch (e) {
                console.log(e)
            }
        }
        else {
            res.json({ status: 400, error: 'user for this finance profile does not exist' })
        }
        
    },
    deleteFinance: async (req, res) => {
        const id = req.body.id;
        try {
            await Finance.deleteOne({ user_id: id })
            res.json({ status: 200, success: 'finance profile successfully deleted' })
        } catch (error) {
            console.log(e);
        }
    }
}

module.exports = finances;