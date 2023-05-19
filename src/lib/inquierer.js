import { DOWNLOAD_OPTIONS } from '#constants/dl.js';
import { YT_DOMAIN } from '#constants/regex.js';
import { STATUS } from '#constants/status.js';
import { Status } from '#error/error.js';
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
        Status.catch(error);
    }
};

const validate = (input) => {
    try {
        if (YT_DOMAIN.test(input)) return true;
        else
            throw new Status({
                status: STATUS.ERROR,
                message: 'INVALID_YOUTUBE_URL'
            });
    } catch (error) {
        Status.catch(error);
    }
};
