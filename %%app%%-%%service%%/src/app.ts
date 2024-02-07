import type { AppOptions } from './types.js';
import type { FastifyPluginAsync } from 'fastify';
import * as path from 'path';
import { fileURLToPath } from 'url';
import AutoLoad from '@fastify/autoload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envToLogger = {
    development: {
        level: 'debug',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss.l',
                ignore: 'pid,hostname,req.hostname,req.remotePort',
                singleLine: true
            }
        }
    },
    production: true,
    test: false
};

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
    trustProxy: true,
    logger: envToLogger[process.env.NODE_ENV] ?? true,
    ajv: {
        customOptions: {
            strictSchema: false,
            allowUnionTypes: true
        }
    },
    maxParamLength: 300 // default 100 - max length of params in url (https://fastify.dev/docs/latest/Reference/Server/#maxparamlength)
};

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
    // Place here your custom code!

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: opts,
        forceESM: true
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: opts,
        forceESM: true
    });
};

export default app;
export { app, options };
