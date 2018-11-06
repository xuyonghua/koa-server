const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = Schema({
    userId: String,
    musicId: String,
    name: String,
    music_url: String,
    duration: String,
    icon_name: String,
    music_type: String,
}, {
    timestamps: Date
});
const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
