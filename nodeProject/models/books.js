const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    author: String,
    price: Number,
    image: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Book', bookSchema);
