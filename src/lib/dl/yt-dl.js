import { DOWNLOAD_OPTIONS } from '#constants/dl-options.js';
import { FLAGS } from '#constants/flags.js';
import { STATUS } from '#constants/status.js';
import { Exception } from '#error/error.js';
import { dlChannel } from '#lib/dl/dl-channel.js';
import { dlImg } from '#lib/dl/dl-img.js';
import { dlVideo } from '#lib/dl/dl-vid.js';
import youtubeDl from 'youtube-dl-exec';

export const dl = async (videoId) => {
    try {
        return await youtubeDl(
            `https://www.youtube.com/watch?v=${videoId}`,
            FLAGS
        );
    } catch (error) {
        Exception.catch(error);
    }
};

const { IMAGE, VIDEO, CHANNEL } = DOWNLOAD_OPTIONS;

export const downloader = async (type, url) => {
    try {
        if (type === IMAGE) return await dlImg(url);
        else if (type === VIDEO) return await dlVideo(url);
        else if (type === CHANNEL) return await dlChannel(url);
        else return { status: STATUS.ERROR, message: 'INVALID_INPUT' };
    } catch (error) {
        Exception.catch(error);
    }
};
