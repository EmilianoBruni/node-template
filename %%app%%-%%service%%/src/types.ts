import type config from './configs/app.config.js';
import type { AutoloadPluginOptions } from '@fastify/autoload';

declare module 'fastify' {
    interface FastifyInstance {
        config: typeof config;
    }
}

export type AppOptions = {
    trustProxy: boolean;
    logger:
        | boolean
        | {
              level: string;
              transport: {
                  target: string;
                  options: Record<string, string | boolean>;
              };
          };
    ajv: { customOptions: Record<string, boolean> };
    maxParamLength: number;
} & Partial<AutoloadPluginOptions>;
