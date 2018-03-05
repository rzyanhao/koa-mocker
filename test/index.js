const koa = require('koa');
const Router = require('koa-router');
const mocker = require('../index.js');
const interfaceConfig = require('../interfaceConfig.js');

const app = new koa();
const router = new Router();
const env = process.env.ENV_NAME || 'dev';

if (env === 'dev') {
    app.use(mocker(interfaceConfig));
}

router.get('/ping', (ctx, next) => {
    ctx.body = 'pang';
});

app.use(router.routes());

app.listen('8888', (err) => {
    if (err) {
        console.log('error: ', err);
        return;
    }
    console.log('server start at port: 8888');
})
