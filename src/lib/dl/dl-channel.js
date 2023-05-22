import { STATUS } from '#constants/status.js';
import { Exception } from '#error/error.js';
import { getChannelId } from '#lib/cheerio.js';
import { dlProgress } from '#lib/cliprogress.js';
import { dl } from '#lib/dl/yt-dl.js';
import { getAllVideosFromChannel, getVideoInfo } from '#lib/googleapi.js';
import { fileExists } from '#utils/file-exists.js';
import { pathToVideo } from '#utils/path-to-vid.js';

export const dlChannel = async (url) => {
    try {
        const channelId = await getChannelId(url);
        const videoIds = await getAllVideosFromChannel(channelId);

        const clean = await cleanList(videoIds);

        let count = 0;
        const chunks = chunkArray(clean, 5);
        const bar = await dlProgress(clean.length);

        for (const chunk of chunks) {
            const downloadPromises = chunk.map(async (videoId) => {
                await dl(videoId);
                count++;
                bar.update(count);
            });
            await Promise.all([...downloadPromises]);
        }

        bar.stop();

        return {
            status: STATUS.SUCCESS,
            message: `[channel]: ${channelId}\n[total]: ${clean.length}`
        };
    } catch (error) {
        Exception.catch(error);
    }
};

const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};

const cleanList = async (videoIds) => {
    const arr = [];

    for (const videoId of videoIds) {
        const videoInfo = await getVideoInfo(videoId);

        if (!videoInfo) continue;

        const path = pathToVideo(videoInfo);
        const exist = await fileExists(path);

        if (!exist) arr.push(videoId);
    }

    return arr;
};
