const Album = require('../models/album');
const Music = require('../models/music');
const mongoose = require('mongoose');
module.exports.addAlbum = async (ctx, next) => {

    let album = new Album({
        _id: new mongoose.Types.ObjectId(),
        name: '放松'
    });

    const musics = await Music.find().then(res => {
        return res;
    });

    for (let i = 0; i < musics.length; i++) {
        album.musics.push(musics[i]);
    }
    const response = await album.save().then(res => {
        console.log(res);
        return res;
    }, err => {
        console.log(err);
        throw err
    });
    if (response) {
        ctx.body = {
            code: 0,
            data: response
        }
    }
};

module.exports.albumList = async (ctx, next) => {
    const response = await Album.find().populate('musics').then(res => {
        console.log(res);
        return res;
    }, err => {
        console.log(err);
        throw err
    });
    if (response) {
        ctx.body = {
            code: 0,
            data: response
        }
    }
};

module.exports.topList = async (ctx, next) => {
    const response = await Music.find().limit(10).sort({used_time: -1}).then(res => {
        console.log(res);
        return res;
    }, err => {
        console.log(err);
        throw err
    });
    if (response) {
        ctx.body = {
            code: 0,
            data: response
        }
    }
};
