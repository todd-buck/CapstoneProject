﻿const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/catalog",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7105',
        secure: false
    });

    app.use(appProxy);
};
