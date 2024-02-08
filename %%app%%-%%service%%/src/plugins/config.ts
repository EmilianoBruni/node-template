import config from '../configs/app.config.js';
import fp from 'fastify-plugin';

export default fp(
    async app => {
        app.decorate('config', config);
        app.ready(err => {
            if (err) throw err;
        });
    },
    {
        name: 'config'
    }
);
