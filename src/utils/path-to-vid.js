import { ENV } from '#config/env.js';
import { FORMATS } from '#constants/formats.js';
import { join } from 'path';

export const pathToVideo = (videoInfo) =>
    join(
        `${ENV.OUTPUT}`,
        `${videoInfo.channelId}`,
        `${videoInfo.channelTitle}`,
        `${videoInfo.title}_${videoInfo.videoId}.${FORMATS.MP4}`
    );
