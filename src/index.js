import { hello } from '#lib/hello.js';
import { quest } from '#lib/quest.js';

const bootstrap = async () => {
    hello();
    const res = await quest();
    console.log('RESPONSEEEEE', res);
};

await bootstrap();
