#!/usr/bin/env node
import '#config/env.js';
import { initTitle } from '#lib/figlet.js';
import { userInput } from '#lib/inquierer.js';

const bootstrap = async () => {
    await initTitle('Y T D L');
    const userAnswer = await userInput();
    console.log(userAnswer);
};

await bootstrap();
