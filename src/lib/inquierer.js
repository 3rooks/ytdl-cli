import { CODE } from '#constants/code.js';
import { COLORS } from '#constants/colors.js';
import { DOWNLOAD_OPTIONS } from '#constants/dl-options.js';
import { YT_DOMAIN } from '#constants/regex.js';
import { Exception } from '#error/error.js';
import { createPromptModule } from 'inquirer';

const prompt = createPromptModule();

export const userInput = async () => {
    try {
        const answer = await prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Download:',
                choices: Object.values(DOWNLOAD_OPTIONS)
            },
            {
                type: 'input',
                name: 'url',
                message: 'Url:',
                validate
            }
        ]);

        return answer;
    } catch (error) {
        Exception.catch(error);
    }
};

const validate = (input) => {
    if (YT_DOMAIN.test(input)) return true;
    else {
        console.log('\n\n' + COLORS.RED, 'INVALID_YOUTUBE_URL');
        process.exit(CODE.BAD);
    }
};
