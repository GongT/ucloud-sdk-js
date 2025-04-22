import { createRequire } from 'node:module';

const require = createRequire(import.meta.filename);
export const VERSION = require('../package.json').version;
