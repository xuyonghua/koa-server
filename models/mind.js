const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mindSchema = Schema({
    userId: String,
    name: String,
    album: String,
    duration: String,
    datetime: String,
    music_url: String,
    recover: Number,
    extra1: String,
    extra2: String,
    extra3: String,
}, {
    timestamps: Date
});
const Mind = mongoose.model('Mind', mindSchema);
module.exports = Mind;
