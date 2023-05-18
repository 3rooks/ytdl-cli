import { COLORS } from '#constants/colors.js';
import { DOWNLOAD_OPTIONS } from '#constants/dl.js';
import youtubeDl from 'youtube-dl-exec';
import { getChannelId, getProfileImg, getVideoId } from './cheerio.js';
import { cliProgress } from './cliprogress.js';
import { getAllVideosFromChannel } from './googleapi.js';
import { saveImage } from './miniget.js';

const { image, video, channel } = DOWNLOAD_OPTIONS;

const template = `%(channel_id)s/%(uploader)s/%(title)s_%(id)s.%(ext)s`;
const headers = ['referer:youtube.com', 'user-agent:googlebot'];
const formats = 'best/bestvideo+bestaudio';
const flags = {
    output: `${process.env.OUTPUT_PATH}/${template}`,
    format: formats,
    addHeader: headers
};

export const downloadImage = async (channelUrl) => {
    const imgUrl = await getProfileImg(channelUrl);
    const channelId = await getChannelId(channelUrl);

    const output = await saveImage(imgUrl, channelId);
    return `Image downloaded:\n[Dest]: ${output}`;
};

export const downloadVideo = async (videoUrl) => {
    // const url = `https://www.youtube.com/watch?v=${}`;
    return await youtubeDl(videoUrl, flags);
};

export const downloadChannel = async (channelUrl) => {
    console.log('\n');
    const channelId = await getChannelId(channelUrl);

    const videoIds = await getAllVideosFromChannel(channelId);

    const chunks = chunkArray(videoIds, 5);

    for (const chunk of chunks) {
        const downloadPromises = chunk.map(
            async (videoId) => await downloadVideo(videoId)
        );
        const res = await Promise.all([...downloadPromises]);
        res.map((data) => console.info(`${data}\n`));
    }

    return videoIds.length;
};

export const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};

export const toDownload = async (answer) => {
    const { type, url } = answer;

    if (type === image) await dlImg(url);

    if (type === video) await dlVideo(url);

    if (type === channel) await dlChannel(url);
};

const dlVideo = async (url) => {
    const videoId = getVideoId(url);
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const res = await youtubeDl(videoUrl, flags);
    console.log(COLORS.BLUE, res);
};

const dlImg = async (url) => {
    const channelId = await getChannelId(url);
    const imgUrl = await getProfileImg(url);

    const output = await saveImage(imgUrl, channelId);
    console.log(COLORS.BLUE, `Image downloaded:\n[Dest]: ${output}`);
};

const dlChannel = async (url) => {
    const channelId = await getChannelId(url);
    const videoIds = await getAllVideosFromChannel(channelId);

    const bar = await cliProgress(videoIds.length);
    let count = 0;
    const chunks = chunkArray(videoIds, 5);

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
        `Channel downloaded:\n[channel]: ${channelId}\n[total]: ${videoIds.length}`
    );
};
