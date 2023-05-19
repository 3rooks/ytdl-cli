import { FORMATS } from '#constants/formats.js';
import { STATUS } from '#constants/status.js';
import { Status } from '#error/error.js';
import { fileExists } from '#utils/file-exists.js';
import { OUTPUT_PATH } from '#utils/paths.js';
import { join } from 'path';
import youtubeDl from 'youtube-dl-exec';
import { getChannelId, getProfileImg, getVideoId } from './cheerio.js';
import { cliProgress } from './cliprogress.js';
import { getAllVideosFromChannel, getVideoInfo } from './googleapi.js';
import { saveImage } from './miniget.js';

const template = `%(channel_id)s/%(title)s_%(id)s.%(ext)s`; // /%(uploader)s
const headers = ['referer:youtube.com', 'user-agent:googlebot'];
const formats = 'best/bestvideo+bestaudio';
const flags = {
    output: `${OUTPUT_PATH}/${template}`,
    format: formats,
    addHeader: headers
};

export const dlVideo = async (url) => {
    try {
        const videoId = getVideoId(url);
        const videoInfo = await getVideoInfo(videoId);

        if (!videoInfo)
            throw new Status({
                status: STATUS.ERROR,
                message: 'LIVE_VIDEO_NO_ALLOWED'
            });

        const path = resolvePath(videoInfo);
        const exist = await fileExists(path);

        if (exist)
            throw new Status({
                status: STATUS.SUCCESS,
                message: `[exist] ${videoInfo.videoId}`
            });

        const data = await dl(videoInfo.videoId);

        throw new Status({
            status: STATUS.SUCCESS,
            message: data
        });
    } catch (error) {
        throw Status.catch(error);
    }
};

export const dlImg = async (url) => {
    try {
        const channelId = await getChannelId(url);
        const imgUrl = await getProfileImg(url);

        const img = await saveImage(imgUrl, channelId);

        throw new Status({
            status: STATUS.SUCCESS,
            message: `[image]: ${img}`
        });
    } catch (error) {
        throw Status.catch(error);
    }
};

export const dlChannel = async (url) => {
    try {
        const channelId = await getChannelId(url);
        const videoIds = await getAllVideosFromChannel(channelId);

        const clean = await cleanList(videoIds);

        let count = 0;
        const bar = await cliProgress(clean.length);
        const chunks = chunkArray(clean, 5);

        for (const chunk of chunks) {
            const downloadPromises = chunk.map(async (videoId) => {
                await dl(videoId);
                count++;
                bar.update(count);
            });
            await Promise.all([...downloadPromises]);
        }

        bar.stop();

        throw new Status({
            status: STATUS.SUCCESS,
            message: `\n[channel]: ${channelId}\n[total]: ${clean.length}`
        });
    } catch (error) {
        Status.catch(error);
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

        const path = resolvePath(videoInfo);

        const exist = await fileExists(path);

        if (!exist) arr.push(videoId);
    }

    return arr;
};

const resolvePath = (videoInfo) =>
    join(
        `${OUTPUT_PATH}`,
        `${videoInfo.channelId}`,
        `${videoInfo.title}_${videoInfo.videoId}.${FORMATS.MP4}`
    );

const dl = async (videoId) =>
    await youtubeDl(`https://www.youtube.com/watch?v=${videoId}`, flags);
