module.exports = {
    // mock数据开关
    mock: true,

    // proxy开关
    proxy: true,

    apis: [
        {
            path: '/api/a',
            data: './test/mock/a.json',
            method: 'get', // 不写默认get
        },
        {
            path: '/api/b',
            data: './test/mock/b.json',
            method: 'post',
        },
        {
            path: '/api/c',
            data: './test/mock/c.json',
        },
        {
            path: '/api/d',
            data: './test/mock/d.json',
        },
    ],

    proxies: [
        {
            path: '/api/v3/*',
            method: 'all',
            // http-proxy options
            options: {
                target: 'http://10.10.120.180',
                headers: {
                    host: 'www.t1.com',
                }
            },
        },
    ],
};
