import youtubeDl from 'youtube-dl-exec';
import { getChannelId, getProfileImg } from './cheerio.js';
import { getAllVideosFromChannel } from './googleapi.js';
import { saveImage } from './miniget.js';

const template = `%(channel_id)s/%(uploader)s/%(title)s_%(id)s.%(ext)s`;
const headers = ['referer:youtube.com', 'user-agent:googlebot'];
const formats = 'best/bestvideo+bestaudio';
const flags = {
    output: `${process.env.OUTPUT_PATH}/${template}`,
    format: formats,
    cookies: process.env.YT_COOKIES,
    addHeader: headers
};

export const downloadImage = async (channelUrl) => {
    const imgUrl = await getProfileImg(channelUrl);
    const channelId = await getChannelId(channelUrl);

    const output = await saveImage(imgUrl, channelId);
    return `Image downloaded:\n[Dest]: ${output}`;
};

export const downloadVideo = async (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return await youtubeDl(videoUrl, flags);
};

export const downloadChannel = async (channelUrl) => {
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
