const express = require('express');
const router = express.Router();
const { isLogin } = require('../middlewares/isLogin')
const productModel = require('../models/product-model');
const userModel = require('../models/user-model')

router.get('/', function (req, res) {
    let error = req.flash('error');
    res.render("index", { error, loggedIn: false });
})

router.get('/shop', isLogin, async function (req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    let error = req.flash("error");
    res.render("shop", { products, success, error});
})

router.get('/addtocart/:productId', isLogin, async function (req, res) {
    try{let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productId);
    await user.save()
    req.flash("success", "Added to cart");
    } catch{
        req.flash("error", "failed to add product")
    }
    res.redirect('/shop');
})

router.get('/addproduct/:productId', isLogin, async function (req, res) {
    try{let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productId);
    await user.save()
    req.flash("success", "Added to cart");
    } catch{
        req.flash("error", "An error occurred while removing the product")
    }
    res.redirect('/cart');
})

router.get('/deleteproduct/:productId', isLogin, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        const productIndex = user.cart.findIndex(item => item._id.toString() === req.params.productId);
        if (productIndex > -1) {
            user.cart.splice(productIndex, 1);
            await user.save();
            req.flash("success", "Deleted from cart");
        } else {
            req.flash("error", "Product not found in cart");
        }
    } catch {
        req.flash("error", "An error occurred while removing the product")
    }
    res.redirect('/cart');
})

router.get('/cart', isLogin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    let totalPrice = 0;
    let totalDiscount = 0
    let shippingCharge = 0;
    let platformFee = 0;
    user.cart.forEach(item => {
        let discount = (item.discount * item.price) / 100;
        totalDiscount += discount;
        totalPrice += item.price - discount;
    });
    totalPrice = totalPrice + platformFee + shippingCharge;
    let success = req.flash("success");
    let error = req.flash("error");
    res.render('cart', { products: user.cart, totalPrice, totalDiscount, platformFee, shippingCharge, success, error });
})

module.exports = router