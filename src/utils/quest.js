import { DOWNLOAD_OPTIONS } from '#constants/dl.js';
import { prompt } from '#lib/inquierer.js';
import {
    downloadChannel,
    downloadImage,
    downloadVideo
} from '#lib/youtubedl.js';

export const typeDownload = async () => {
    const { download } = await prompt({
        type: 'list',
        name: 'download',
        message: 'Download:',
        choices: Object.values(DOWNLOAD_OPTIONS)
    });
    return download;
};

export const toDownload = async () => {
    const type = await typeDownload();

    switch (type) {
        case DOWNLOAD_OPTIONS.image: {
            const { image } = await prompt({
                type: 'input',
                name: 'image',
                message: 'Channel URL:'
            });

            const output = await downloadImage(image);
            console.info(output);

            break;
        }

        case DOWNLOAD_OPTIONS.video: {
            const { video } = await prompt({
                type: 'input',
                name: 'video',
                message: 'Video URL:'
            });

            const output = await downloadVideo(video);
            console.info(output);

            break;
        }

        case DOWNLOAD_OPTIONS.channel: {
            const { channel } = await prompt({
                type: 'input',
                name: 'channel',
                message: 'Channel URL:'
            });

            const output = await downloadChannel(channel);
            console.info(`Downloaded:\n[TOTAL] ${output}`);

            break;
        }

        default:
            break;
    }
};
