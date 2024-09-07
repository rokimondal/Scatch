const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utills/generateToken');

module.exports.register = async function (req, res) {
    try {
        let { fullname, email, password, contact } = req.body;
        let user = await userModel.findOne({email});
        if(user) return res.status(401).send("You have an account.")
        bcrypt.genSalt(10, function (err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        fullname,
                        email,
                        password : hash,
                        contact
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User created successfully.");
                }
            })
        })
    } catch (err) {
        console.log(err.message)
    }
};

module.exports.login = async function(req, res){
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.send("Email or Password incorrect");
    bcrypt.compare(password, user.password, function(err, result){
        if(err) return res.status(401).send(err.message);
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect('/shop');
        }else{
            res.send("Email or Password incorrect")
        }
    })
}
module.exports.logout=function(req, res){
    res.cookie("token", "");
    res.redirect('/');
}