import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const MAIN_PATH = dirname(fileURLToPath(import.meta.url));

export const SRC_PATH = resolve(MAIN_PATH, '../');
