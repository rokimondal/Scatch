const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique : true,
        trim : true
    },
    contact: {
        type : Number,
        required : true,
        unique: true,
    },
    password: {
        type: String,
        required : true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "product",
    }],
    orders: {
        type: Array,
        default: []
    },
    picture: String
})
module.exports = mongoose.models.user || mongoose.model('user', userSchema);