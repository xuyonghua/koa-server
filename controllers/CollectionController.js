const Music = require('../models/music');
const Collection = require('../models/collection');
const mongoose = require('mongoose');

module.exports.addCollection = async (ctx, next) => {
    let collection = new Collection({
        userId: ctx.request.body.userId,
        musicId: ctx.request.body._id,
        name: ctx.request.body.name,
        music_url: ctx.request.body.music_url,
        duration: ctx.request.body.duration,
        icon_name: ctx.request.body.icon_name,
        music_type: ctx.request.body.music_type
    });
    const response = await collection.save().then(res => {
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

module.exports.removeCollection = async (ctx, next) => {

    const response = await Collection.deleteOne({
        userId: ctx.request.body.userId,
        musicId: ctx.request.body.musicId
    }).then(res => {
        return res;
    });

    if (response) {
        ctx.body = {
            code: 0,
            data: response.ok
        }
    }
};

module.exports.isCollected = async (ctx, next) => {

    const collections = await Collection.find({
        userId: ctx.request.body.userId,
        musicId: ctx.request.body.musicId
    }).then(res => {
        return res;
    });
    if (collections.length > 0) {
        ctx.body = {
            code: 0,
            data: {isCollected: true},
            msg: '已收藏'
        }
    } else {
        ctx.body = {
            code: 0,
            data: {isCollected: false},
            msg: '未收藏'
        }
    }
};

module.exports.collectionList = async (ctx, next) => {

    const response = await Collection.find({
        userId: ctx.request.body.userId
    }).then(res => {
        return res;
    });

    if (response) {
        ctx.body = {
            code: 0,
            data: response
        }
    }
};
