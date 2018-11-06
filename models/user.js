const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    password: String,
    email: String
}, {
    timestamps: Date
});
const User = mongoose.model('User', userSchema);
module.exports = User;
