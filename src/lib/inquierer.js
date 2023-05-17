import { COLORS } from '#constants/colors.js';
import { DOWNLOAD_OPTIONS } from '#constants/dl.js';
import { YT_DOMAIN } from '#constants/regex.js';
import { createPromptModule } from 'inquirer';

const { RED } = COLORS;
const prompt = createPromptModule();

export const userInput = async () => {
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
};

const validate = (input) => {
    if (YT_DOMAIN.test(input)) return true;
    console.log(RED, '\nINVALID_YOUTUBE_URL');
    process.exit(1);
};
