// This file contains code that we reuse between our tests.
import type * as test from 'node:test';
import buildFastify from '../src/builder.js';

export type TestContext = {
    after: typeof test.after;
};

// Automatically build and tear down our instance
async function build(t: TestContext) {
    const app = buildFastify();
    // Tear down our app after we are done
    t.after(() => void app.close());
    return app;
}

export { build };
