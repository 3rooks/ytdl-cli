import { ENV } from '#config/env.js';

const template = `%(channel_id)s/%(uploader)s/%(title)s_%(id)s.%(ext)s`;
const headers = ['referer:youtube.com', 'user-agent:googlebot'];
const formats = 'best/bestvideo+bestaudio';

export const FLAGS = {
    output: `${ENV.OUTPUT}/${template}`,
    format: formats,
    addHeader: headers
};
