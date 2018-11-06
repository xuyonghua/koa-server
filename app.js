const mongoose = require('mongoose');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const koaBody = require('koa-body');
const path = require('path');
const static = require('koa-static');

// const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const jwtKoa = require('koa-jwt'); // 用于路由权限控制

//设置静态资源的路径
const staticPath = './www';

// mongodb://itdeepbaysz:Deepbayit2018mb@s-wz91a39002f293e4-pub.mongodb.rds.aliyuncs.com:3717/mvp_nap_test
mongoose.connect('mongodb://xuyonghua:200904135072p@ds013162.mlab.com:13162/deepbay', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('数据库连接成功!');
});


const routes = require('./config/router');

const app = new Koa();

/* jwt密钥 */
const secret = 'secret';

/* 当token验证异常时候的处理，如token过期、token错误 */
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                ok: false,
                msg: err.originalError ? err.originalError.message : err.message
            }
        } else {
            throw err;
        }
    });
});
/* 路由权限控制 */
app.use(jwtKoa({secret: secret}).unless({
    // 设置login、register接口，可以不需要认证访问
    path: [
        /^\/api\/v1\/login/,
        /^\/api\/v1\/register/,
        /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
}));


app.use(static(
    path.join(__dirname, staticPath)
));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(bodyParser());

app.use(routes);

app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
    console.log('Press CTRL-C to stop \n');
});
