#!/usr/bin/env node
import '#config/env.js';
import { Status } from '#error/error.js';
import { initTitle } from '#lib/figlet.js';
import { userInput } from '#lib/inquierer.js';
import { downloader } from '#utils/downloader.js';

const bootstrap = async () => {
    try {
        await initTitle('Y T D L');
        const userAnswer = await userInput();
        await downloader(userAnswer);
    } catch (error) {
        Status.catch(error);
    }
};

await bootstrap();
