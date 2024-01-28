const Want = require('../models/wants'); 
const User = require('../models/users');

const wants = {
    getWants: async (req, res) => {
        console.log(req.body)
        const id = req.params.id;
        try {
            const wants = await Want.find({ user_id: id })
            res.json({ wants: wants })
        } catch (error) {
            console.log(error)
        }
    },
    createWant: async (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const amount = req.body.amount; // Corrected typo in property name
        const card = req.body.card;

        try {
            const existingUser = await User.findOne({ _id: id });

            if (existingUser) {
                const newWant = new Want({
                    user_id: id,
                    name: name,
                    amount: amount,
                    card: card,
                });

                await newWant.save();

                res.json({ status: 200, want: newWant });
            } else {
                res.json({ status: 400, error: 'User for this want profile does not exist or there is already a profile' });
            }
        } catch (error) {
            console.error(error);
        }
    },

    updateWant: async (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const amount = req.body.amount; // Corrected typo in property name
        const card = req.body.card;

        try {
            const existingWant = await Want.findOne({ user_id: id });

            if (existingWant) {
                await Want.updateOne({ user_id: id }, { $set: { name: name, amount: amount, card: card } });
                res.json({ status: 200, want: existingWant });
            } else {
                res.json({ status: 400, error: 'User for this want profile does not exist' });
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteWant: async (req, res) => {
        const id = req.body.id;

        try {
            const result = await Want.deleteOne({ user_id: id });

            if (result.deletedCount > 0) {
                res.json({ status: 200, success: 'Want profile successfully deleted' });
            } else {
                res.json({ status: 400, error: 'User for this want profile does not exist' });
            }
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = wants;
