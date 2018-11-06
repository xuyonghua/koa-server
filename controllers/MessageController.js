const Message = require('../models/message');
const mongoose = require('mongoose');
module.exports.create = async (ctx, next) => {

    let message = new Message({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        datetime: ctx.request.body.datetime,
        isRead: ctx.request.body.isRead,
        src: ctx.request.body.src
    });

    const response = await message.save().then(res => {
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

module.exports.list = async (ctx, next) => {
    const response = await Message.find().sort({datetime: -1}).then(res => {
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
