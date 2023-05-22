import { STATUS } from '#constants/status.js';
import { Exception } from '#error/error.js';
import { getVideoId } from '#lib/cheerio.js';
import { dl } from '#lib/dl/yt-dl.js';
import { getVideoInfo } from '#lib/googleapi.js';
import { fileExists } from '#utils/file-exists.js';
import { pathToVideo } from '#utils/path-to-vid.js';

export const dlVideo = async (url) => {
    try {
        const videoId = getVideoId(url);
        const videoInfo = await getVideoInfo(videoId);

        if (!videoInfo)
            return {
                status: STATUS.ERROR,
                message: 'LIVE_VIDEO_NO_ALLOWED'
            };

        const path = pathToVideo(videoInfo);
        const exist = await fileExists(path);

        if (exist)
            return {
                status: STATUS.SUCCESS,
                message: `[exist] ${videoInfo.videoId}`
            };

        const data = await dl(videoInfo.videoId);

        return {
            status: STATUS.SUCCESS,
            message: `${data}`
        };
    } catch (error) {
        Exception.catch(error);
    }
};
