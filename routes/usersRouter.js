const express = require('express');
const router = express.Router();
const { register , login, logout} = require('../controllers/authController')

router.get("/", function (req, res) {
    res.send("It's working");
})

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout)
module.exports = router;