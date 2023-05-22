import { STATUS } from '#constants/status.js';
import { Exception } from '#error/error.js';
import { getChannelId } from '#lib/cheerio.js';
import { getChannelInfo } from '#lib/googleapi.js';
import { saveImage } from '#lib/miniget.js';

export const dlImg = async (url) => {
    try {
        const channelId = await getChannelId(url);
        const { thumbnails } = await getChannelInfo(channelId);

        const img = await saveImage(thumbnails.high.url, channelId);

        return {
            status: STATUS.SUCCESS,
            message: `[image]: ${img}`
        };
    } catch (error) {
        Exception.catch(error);
    }
};
