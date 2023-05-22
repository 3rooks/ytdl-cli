import { load } from 'cheerio';
import Miniget from 'miniget';

export const getChannelId = async (url) => {
    const html = await Miniget(url).text();
    const $ = load(html);

    let channelId = $('meta[itemprop="channelId"]').attr('content');

    if (!channelId)
        channelId = $('meta[itemprop="identifier"]').attr('content');

    if (!channelId) {
        channelId = $('link[rel="canonical"]').attr('href');

        const channelIdRegex = /\/channel\/([a-zA-Z0-9_-]+)/;
        const match = channelId.match(channelIdRegex);

        if (match && match[1]) channelId = match[1];
    }

    return channelId;
};

export const getVideoId = (videoUrl) => {
    /*
        https://www.youtube.com/watch?v=[videoId]
        https://youtu.be/[videoId]
        https://www.youtube.com/embed/[videoId]
        https://www.youtube.com/v/[videoId]
        https://www.youtube.com/watch?...&v=[videoId]
        https://youtube.com/shorts/[videoId]
     */

    const videoIdRegex =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/)|youtu\.be\/)([\w-]{11})/;

    const match = videoUrl.match(videoIdRegex);
    const videoId = match ? match[1] : null;

    return videoId;
};
