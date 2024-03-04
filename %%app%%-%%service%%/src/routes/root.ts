import type { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (app): Promise<void> => {
    app.get('/', async function () {
        return { root: true };
    });
};

export default root;
