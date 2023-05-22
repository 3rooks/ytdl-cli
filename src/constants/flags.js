import { LOCAL_PATH } from '#utils/paths.js';

const template = `%(channel_id)s/%(uploader)s/%(title)s_%(id)s.%(ext)s`;
const headers = ['referer:youtube.com', 'user-agent:googlebot'];
const formats = 'best/bestvideo+bestaudio';

const OUT = process.env.OUTPUT_PATH || LOCAL_PATH;

export const FLAGS = {
    output: `${OUT}/${template}`,
    format: formats,
    addHeader: headers
};
