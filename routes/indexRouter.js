const express = require('express');
const router = express.Router();
const {isLogin} = require('../middlewares/isLogin')
const productModel = require('../models/product-model');

router.get('/', function(req, res){
    let error = req.flash('error');
    res.render("index", {error});
})

router.get('/shop', isLogin , async function(req, res){
    let products = await productModel.find();
    res.render("shop", {products});
})
module.exports = router