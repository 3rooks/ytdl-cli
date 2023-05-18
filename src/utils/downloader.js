import { DOWNLOAD_OPTIONS } from '#constants/dl.js';
import { dlChannel, dlImg, dlVideo } from '#lib/youtubedl.js';

export const donwloader = async (answer) => {
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
            console.log('NO_TYPE_URL');
            process.exit(1);
        }
    }
};
