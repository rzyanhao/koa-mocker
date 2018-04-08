const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const readFile = require('./helper.js').readFile;
const rewritePath = require('./helper.js').rewritePath;
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const mocker = (config) => {
    const router = new Router();

    if (config.mock) {
        const baseDir= config.baseDir || '';
        config.apis.forEach((item) => {
            const method = item.method || 'get';
            router[method](item.path, async ctx => {
                ctx.set('Content-Type', 'application/json');
                await readFile(path.resolve(baseDir, item.data))
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

    if (config.proxy) {
        config.proxies.forEach((item) => {
            console.log(item);
            const method = item.method || 'get';
            router[method](item.path, async (ctx) => {
                ctx.respond = false;
                if (item.options.pathRewrite) {
                    const path = rewritePath(ctx.req.url, item.options.pathRewrite);
                    ctx.req.url = path;
                }
                await proxy.web(ctx.req, ctx.res, item.options);
            })
        })
    }
    return router.routes();
};

module.exports = mocker;
