import { createWriteStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import Miniget from 'miniget';
import { join } from 'path';
import { pipeline } from 'stream/promises';

export const saveImage = async (imgUrl, channelId) => {
    const path = await existFolder(channelId);

    const url = imgUrl.replace(/=s\d+/, '=s1080');
    const imgStream = await Miniget(url);

    const imgTemplate = `${channelId}_${Date.now()}.jpg`;
    const outputPath = join(path, imgTemplate);

    const outStream = createWriteStream(outputPath);
    await pipeline([imgStream, outStream]);

    return outputPath;
};

const existFolder = async (channelId) => {
    const path = join(process.env.OUTPUT_PATH, channelId);

    if (existsSync(path)) return path;

    await mkdir(path, { recursive: true });

    return path;
};
