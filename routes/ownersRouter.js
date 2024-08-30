const express = require('express')
const router = express.Router();
const ownerModel = require('../models/owner-model')


if (process.env.NODE_ENV) {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(501)
                .send("You can't create a new owner");
        }
        let { fullname, email, password } = req.body;
        let createOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(203).send(createOwner);
    })
}



router.get("/", function (req, res) {
    res.send("It's working");
})

module.exports = router;