import { ENV } from '#config/env.js';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';

export const folderExists = async (channelId) => {
    const path = join(ENV.OUTPUT, channelId);

    if (existsSync(path)) return path;

    await mkdir(path, { recursive: true });

    return path;
};
