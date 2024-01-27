
const User = require('../models/users');

const users = {
    getAllUsers: async (req, res) =>{
        try{
            const result = User.find();
            console.log(result[0])
            res.json({users: result[0]})
        }
        catch(e){
            console.log(e)
            res.json({error:e})
        }
    },
    registerUser: async (req, res) =>{
        const email = req.body.email;
        const password = req.body.password;
        const existing = await User.findOne({ email: email });
        if (existing) {
    
          //res.redirect("Signup");
          res.json({status: 400, error: 'user already exists'})
        } else {
          // Create the user if email is not a duplicate
          const userAdd = new User({
            email: email,
            password: password
          });
         userAdd.save();
          res.json({status: 200, success: 'user created', user: userAdd})
        }
    },
    authenticateUser: async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;
        const existing = await User.findOne({ email: email });
        if (existing) {
            //check password
            const status = existing.password === password? 200: 400;
          //res.redirect("Signup");
          if (status === 200) res.json({status: status, user: existing})
          if (status === 400) res.json({status: status, error: 'incorrect password'})
        }
        else{
            res.json({status: 400, error: 'user does not exist'})
        }
    }
}

module.exports = users;