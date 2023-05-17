import '#config/env.js';
import { toDownload } from '#utils/quest.js';

const bootstrap = async () => {
    await toDownload();
};

await bootstrap();
