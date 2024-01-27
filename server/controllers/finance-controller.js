const Finance = require('../models/finance');
const finances = {
    createFinance: async(req, res)=>{
        const id = req.body.id;
        const newProfile = new Finance({
            user_id: id,
            credit: 0,
            debit: 0,
        });
        newProfile.save();
    },
    updateFinance: async(req, res)=>{
        const id = req.body.id;
        const credit = req.body.credit;
        const debit = req.body.debit;

        try{
            await Finance.updateOne({user_id: is}, $set{
                
            })
        }catch(e){
            console.log(e)
        }
    },
    deleteFinance: async(req, res)=>{

    }
}

module.exports = finances;