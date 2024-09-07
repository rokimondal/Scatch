const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolour: String,
    panelcolour: String,
    textcolour: String,
})

module.exports = mongoose.models.product || mongoose.model('product', productSchema);