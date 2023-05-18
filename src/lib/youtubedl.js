import { COLORS } from '#constants/colors.js';
import { DOWNLOAD_OPTIONS } from '#constants/dl.js';
import { fileExists } from '#utils/file-exists.js';
import { join } from 'path';
import youtubeDl from 'youtube-dl-exec';
import { getChannelId, getProfileImg, getVideoId } from './cheerio.js';
import { cliProgress } from './cliprogress.js';
import { getAllVideosFromChannel, getVideoInfo } from './googleapi.js';
import { saveImage } from './miniget.js';

const { image, video, channel } = DOWNLOAD_OPTIONS;

const template = `%(channel_id)s/%(title)s_%(id)s.%(ext)s`; // /%(uploader)s
const headers = ['referer:youtube.com', 'user-agent:googlebot'];
const formats = 'best/bestvideo+bestaudio';
const flags = {
    output: `${process.env.OUTPUT_PATH}/${template}`,
    format: formats,
    addHeader: headers
};

export const toDownload = async (answer) => {
    const { type, url } = answer;

    if (type === image) await dlImg(url);

    if (type === video) await dlVideo(url);

    if (type === channel) await dlChannel(url);
};

export const dlVideo = async (url) => {
    const videoId = getVideoId(url);

    const videoInfo = await getVideoInfo(videoId);

    const path = join(
        process.env.OUTPUT_PATH,
        `${videoInfo.channelId}`,
        `${videoInfo.title}_${videoInfo.videoId}.mp4`
    );
    const exist = await fileExists(path);

    if (exist) {
        console.log(COLORS.BLUE, `[exist]: ${videoInfo.videoId}`);
        process.exit(0);
    }

    const res = await youtubeDl(
        `https://www.youtube.com/watch?v=${videoId}`,
        flags
    );

    console.log(COLORS.BLUE, res);
    process.exit(0);
};

export const dlImg = async (url) => {
    const channelId = await getChannelId(url);
    const imgUrl = await getProfileImg(url);

    const output = await saveImage(imgUrl, channelId);
    console.log(COLORS.BLUE, `Image downloaded:\n[Dest]: ${output}`);
};

export const dlChannel = async (url) => {
    const channelId = await getChannelId(url);
    const videoIds = await getAllVideosFromChannel(channelId);

    const clean = await cleanList(videoIds);

    const bar = await cliProgress(clean.length);
    let count = 0;
    const chunks = chunkArray(clean, 5);

    for (const chunk of chunks) {
        const downloadPromises = chunk.map(async (videoId) => {
            await youtubeDl(
                `https://www.youtube.com/watch?v=${videoId}`,
                flags
            );
            count++;
            bar.update(count);
        });
        await Promise.all([...downloadPromises]);
    }

    bar.stop();
    console.log(
        COLORS.BLUE,
        `Channel downloaded:\n[channel]: ${channelId}\n[total]: ${clean.length}`
    );
};

export const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};

export const cleanList = async (videoIds) => {
    const arr = [];

    for (const videoId of videoIds) {
        const videoInfo = await getVideoInfo(videoId);

        if (!videoInfo) continue;

        const path = join(
            process.env.OUTPUT_PATH,
            `${videoInfo.channelId}`,
            `${videoInfo.title}_${videoInfo.videoId}.mp4`
        );

        const exist = await fileExists(path);

        if (!exist) arr.push(videoId);
    }

    return arr;
};
