const Mind = require('../models/mind');
const mongoose = require('mongoose');
module.exports.createMind = async (ctx, next) => {

    let mind = new Mind({
        userId: ctx.request.body.userId,
        name: ctx.request.body.name,
        album: ctx.request.body.album,
        duration: ctx.request.body.duration,
        datetime: ctx.request.body.datetime,
        recover: ctx.request.body.recover,
        music_url: ctx.request.body.music_url
    });

    const response = await mind.save().then(res => {
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

module.exports.mindList = async (ctx, next) => {
    const response = await Mind.find({
        userId: ctx.request.query.userId
    }).then(res => {
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
