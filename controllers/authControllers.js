const User = require('../models/Users');
const bcrypt = require('bcrypt');


const authController ={
    //register
    registerUser:async(req, res)=>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create user
            const newUser = await new User({
                username:req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //save 
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //login

    loginUser:
    async(req, res)=>{
        try {
            const user = await User.findOne({username:req.body.username});
            if(!user){
                res.status(400).json("wrong username");
                return;
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            
            if(!validPassword){
                res.status(300).json("wrong passworrd");
                return;
            }
            if(user && validPassword){
                res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
module.exports=authController;