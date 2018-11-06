const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    userId: String,
    title: String,
    content: String,
    datetime: String,
    src: String,
    isRead: Boolean,
    extra1: String,
    extra2: String,
    extra3: String,
}, {
    timestamps: Date
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
