// ES6 Typescript to run Fastify server via pm2

// Register your application as a normal plugin.
import appService, { options } from './app.js';
// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';
// Require the framework
import Fastify from 'fastify';
// use fastify-plugin to wrap a function with the correct signature
import fp from 'fastify-plugin';
// Read the .env file.
import 'dotenv/config';

function buildFastify() {
    // Instantiate Fastify with config options
    const app = Fastify(options);

    // Register app.js as a plugin.
    app.register(fp(appService));

    // delay is the number of milliseconds for the graceful close to finish
    const closeListeners = closeWithGrace(
        { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 },
        async ({ err }) => {
            if (err) app.log.error(err);
            await app.close();
        }
    );

    // Close listeners are installed, when `ready` is emitted,
    app.addHook('onClose', async () => closeListeners.uninstall());

    return app;
}

export default buildFastify;
