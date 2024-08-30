const mongoose = require('mongoose');
const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    contact: String,
    password: String,
    gstNum: String,
    picture: String
})

module.exports = mongoose.model('user', ownerSchema);