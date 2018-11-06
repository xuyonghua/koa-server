const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const crypto = require('crypto');
/* jwt密钥 */
const secret = 'secret';

/* 获取一个期限为4小时的token */
function getToken(payload = {}) {
    return jwt.sign(payload, secret, {expiresIn: '4h'});
}

module.exports.register = async (ctx, next) => {

    let user = new User({
        name: ctx.request.body.name,
        password: crypto.createHash('md5').update(ctx.request.body.password).digest('hex'),     // 密码加密存储
        email: ctx.request.email
    });

    const response = await user.save().then(res => {
        console.log(res);
        return res;
    }, err => {
        console.log(err);
        throw err
    });
    if (response) {
        ctx.body = {
            code: 0,
            msg: '注册成功',
            token: getToken({
                name: ctx.request.body.name,
                password: ctx.request.body.password
            })
        }
    }
};

module.exports.login = async (ctx, next) => {
    const response = await User.find({
        name: ctx.request.body.name,
        password: crypto.createHash('md5').update(ctx.request.body.password).digest('hex')
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
            msg: '登录成功',
            token: getToken({
                name: ctx.request.body.name,
                password: ctx.request.body.password
            })
        }
    }
};

module.exports.getUserInfo = async (ctx, next) => {
    const token = ctx.header.authorization;  // 获取jwt
    if (token) {
        let payload = await jwt.verify(token.split(' ')[1], secret); // // 解密，获取payload
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: {
                name: payload.name
            }
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
};
