// ES6 script to run Fastify server via pm2

import buildFastify from './builder.js';

const app = buildFastify();

// define options for fastify listen
const listenOptions = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
};

// Start listening.
app.listen(listenOptions, err => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
