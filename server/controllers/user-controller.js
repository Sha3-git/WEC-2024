
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
          await User.create({
            email: email,
            password: password
          });
          res.json({status: 200, success: 'user created'})
        }
    }
}

module.exports = users;