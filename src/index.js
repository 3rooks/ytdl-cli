#!/usr/bin/env node
import '#config/env.js';
import { initTitle } from '#lib/figlet.js';
import { userInput } from '#lib/inquierer.js';
import { toDownload } from '#lib/youtubedl.js';

const bootstrap = async () => {
    await initTitle('Y T D L');
    const userAnswer = await userInput();
    await toDownload(userAnswer);
    process.exit(0);
};

await bootstrap();
