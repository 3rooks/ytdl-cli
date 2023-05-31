#!/usr/bin/env node
import { STATUS } from '#constants/status.js';
import { Exception } from '#error/error.js';
import { downloader } from '#lib/dl/yt-dl.js';
import { initTitle } from '#lib/figlet.js';
import { userInput } from '#lib/inquierer.js';
import { status } from '#utils/status.js';

const bootstrap = async () => {
    try {
        const title = await initTitle('Youtube');
        status({ status: STATUS.TITLE, message: title });

        const { type, url } = await userInput();
        const state = await downloader(type, url);

        const code = status(state);
        process.exit(code);
    } catch (error) {
        Exception.catch(error);
    }
};

bootstrap();
