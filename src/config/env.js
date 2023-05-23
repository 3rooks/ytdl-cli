import { Exception } from '#error/error.js';
import { ENV_PATH, OUTPUT_PATH } from '#utils/paths.js';
import { readFile } from 'fs/promises';

const enviroment = async () => {
    try {
        const envData = await readFile(ENV_PATH, 'utf8');
        const envVars = JSON.parse(envData);

        const data = {
            GOOGLE: envVars.GOOGLE_API_KEY,
            OUTPUT: envVars.OUTPUT_PATH || OUTPUT_PATH
        };

        return data;
    } catch (error) {
        Exception.catch(error);
    }
};

export const ENV = await enviroment();
