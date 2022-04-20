const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    token: String,
});
module.exports = mongoose.model("User", userSchema);