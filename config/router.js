const Router = require('koa-router');
const fs = require('fs');
const router = new Router();
const path = require('path');
const AlbumController = require('./../controllers/AlbumController');
const CollectionController = require('./../controllers/CollectionController');
const MindController = require('./../controllers/MindController');
const MessageController = require('./../controllers/MessageController');
const UserController = require('./../controllers/UserController');

router.get('/api/v1', async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get('/api/v1/addAlbum', AlbumController.addAlbum);
router.get('/api/v1/albumList', AlbumController.albumList);
router.get('/api/v1/topList', AlbumController.topList);

router.post('/api/v1/addCollection', CollectionController.addCollection);
router.post('/api/v1/removeCollection', CollectionController.removeCollection);
router.post('/api/v1/isCollected', CollectionController.isCollected);
router.post('/api/v1/collectionList', CollectionController.collectionList);

router.post('/api/v1/createMind', MindController.createMind);
router.get('/api/v1/mindList', MindController.mindList);

router.post('/api/v1/message_create', MessageController.create);
router.get('/api/v1/message_list', MessageController.list);


router.post('/api/v1/register', UserController.register);
router.post('/api/v1/login', UserController.login);
router.get('/api/v1/userInfo', UserController.getUserInfo);


router.post('/api/v1/upload', async (ctx, next) => {
    console.log(ctx.request);
    console.log(ctx.request.body);

    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    console.log(file.path);
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'www/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
});
const routes = router.routes();
module.exports = routes;
