import { FORMATS } from '#constants/formats.js';
import { join } from 'path';
import { LOCAL_PATH } from './paths.js';

const OUT = process.env.OUTPUT_PATH || LOCAL_PATH;

export const pathToVideo = (videoInfo) =>
    join(
        `${OUT}`,
        `${videoInfo.channelId}`,
        `${videoInfo.channelTitle}`,
        `${videoInfo.title}_${videoInfo.videoId}.${FORMATS.MP4}`
    );
