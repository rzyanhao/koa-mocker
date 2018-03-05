const Router = require('koa-router');
const readFile = require('./helper.js').readFile;
const fs = require('fs');
const PassThrough = require('stream').PassThrough;

const mocker = (config) => {
    const router = new Router();

    if (config.mock) {
        config.list.forEach((item) => {
            const method = item.method || 'get';
            router[method](item.path, async ctx => {
                ctx.set('Content-Type', 'application/json');
                await readFile(item.data)
                    .then((content) => {
                        ctx.body = content;
                    })
                    .catch((err) => {
                        ctx.status = 500;
                        ctx.body = err;
                    })
            })
        });
    }
    return router.routes();
};

module.exports = mocker;
