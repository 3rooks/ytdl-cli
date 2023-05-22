import { FORMATS } from '#constants/formats.js';
import { folderExists } from '#utils/folder-exists.js';
import { createWriteStream } from 'fs';
import Miniget from 'miniget';
import { join } from 'path';
import { pipeline } from 'stream/promises';

export const saveImage = async (imgUrl, channelId) => {
    const path = await folderExists(channelId);

    const url = imgUrl.replace(/=s\d+/, '=s1080');
    const imgStream = await Miniget(url);

    const imgTemplate = `${channelId}_${Date.now()}.${FORMATS.JPG}`;
    const outputPath = join(path, imgTemplate);

    const outStream = createWriteStream(outputPath);
    await pipeline([imgStream, outStream]);

    return imgTemplate;
};
