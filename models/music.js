const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = Schema({
    album: {type: Schema.Types.ObjectId, ref: 'Album'},
    name: String,
    timestamp: String,
    duration: String,
    icon_name: String,
    latest_used: String,
    music_type: String,
    music_url: String,
    tag: Number,
    used_time: Number,
}, {
    timestamps: Date
});
const Music = mongoose.model('Music', musicSchema);
module.exports = Music;
