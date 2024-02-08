import config from '../configs/app.config.js';
import fp from 'fastify-plugin';

export default fp(
    async app => {
        app.decorate('config', config).ready(err => {
            if (err) throw err;
        });
    },
    {
        name: 'config'
    }
);
