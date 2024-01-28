//need controller
const Need = require('../models/need');
const User = require('../models/users');

const needs = {
    getNeeds: async (req, res) => {
        const id = req.params.id;
        try {
        const needs = await Need.find({ user_id: id })
        res.json({needs: needs})
        } catch (error) {
           console.log(error) 
        }
    },
    createNeed: async (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const amount = req.body.amount; 
        const card = req.body.card;

        try {
            const existingUser = await User.findOne({ _id: id });

            if (existingUser) {
                const newNeed = new Need({
                    user_id: id,
                    name: name,
                    amount: amount,
                    card: card,
                });

                await newNeed.save();

                res.json({ status: 200, need: newNeed });
            } else {
                res.json({ status: 400, error: 'user for this need profile does not exist or there is already a profile' });
            }
        } catch (error) {
            console.error(error);
        }
    },

    updateNeed: async (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const amount = req.body.amount;
        const card = req.body.card;

        try {
            const existingNeed = await Need.findOne({ user_id: id });

            if (existingNeed) {
                await Need.updateOne({ user_id: id }, { $set: { name: name, amount: amount, card: card } });
                res.json({ status: 200, need: existingNeed });
            } else {
                res.json({ status: 400, error: 'user for this need profile does not exist' });
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteNeed: async (req, res) => {
        const id = req.body.id;

        try {
            const result = await Need.deleteOne({ user_id: id });

            if (result.deletedCount > 0) {
                res.json({ status: 200, success: 'Need profile successfully deleted' });
            } else {
                res.json({ status: 400, error: 'user for this need profile does not exist' });
            }
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = needs;
