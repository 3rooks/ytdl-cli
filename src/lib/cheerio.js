import { load } from 'cheerio';
import Miniget from 'miniget';

export const getProfileImg = async (channelUrl) => {
    const html = await Miniget(channelUrl).text();
    const $ = load(html);

    let imgUrl = $('link[rel="image_src"]').attr('href');

    if (!imgUrl) imgUrl = $('meta[property="og:image"]').attr('content');

    if (!imgUrl) imgUrl = $('img.yt-img-shadow').attr('src');

    if (!imgUrl) imgUrl = $('meta[name="twitter:image"]').attr('content');

    if (!imgUrl) imgUrl = $('meta[name="og:image"]').attr('content');

    if (!imgUrl) imgUrl = $('yt-img-shadow img').attr('src');

    return imgUrl;
};

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

export const videoId = async (videoUrl) => {
    /*
        https://www.youtube.com/watch?v=[videoId]
        https://youtu.be/[videoId]
        https://www.youtube.com/embed/[videoId]
        https://www.youtube.com/v/[videoId]
        https://www.youtube.com/watch?...&v=[videoId]
     */

    const videoIdRegex =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([\w-]{11})$/;

    const match = videoUrl.match(videoIdRegex);
    const videoId = match ? match[1] : null;

    return videoId;
};
