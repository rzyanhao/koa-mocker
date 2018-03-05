module.exports = {
    mock: true,
    list: [
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
};
