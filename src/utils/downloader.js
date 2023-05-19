import { DOWNLOAD_OPTIONS } from '#constants/dl.js';
import { STATUS } from '#constants/status.js';
import { Status } from '#error/error.js';
import { dlChannel, dlImg, dlVideo } from '#lib/youtubedl.js';

export const downloader = async (answer) => {
    try {
        const { type, url } = answer;

        switch (type) {
            case DOWNLOAD_OPTIONS.image: {
                await dlImg(url);
                return;
            }

            case DOWNLOAD_OPTIONS.video: {
                await dlVideo(url);
                return;
            }

            case DOWNLOAD_OPTIONS.channel: {
                await dlChannel(url);
                return;
            }

            default: {
                throw new Status({
                    status: STATUS.ERROR,
                    message: 'NO_TYPE_NO_URL'
                });
            }
        }
    } catch (error) {
        Status.catch(error);
    }
};
