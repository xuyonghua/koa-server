const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    musics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Music'
        }
    ]
}, {
    timestamps: Date
});
const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
