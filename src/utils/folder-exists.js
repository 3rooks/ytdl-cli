import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { LOCAL_PATH } from './paths.js';

const OUT = process.env.OUTPUT_PATH || LOCAL_PATH;

export const folderExists = async (channelId) => {
    const path = join(OUT, channelId);

    if (existsSync(path)) return path;

    await mkdir(path, { recursive: true });

    return path;
};
