import { COLORS } from '#constants/colors.js';

export class Exception extends Error {
    static catch(error) {
        console.log('\n\n' + COLORS.RED, error.message);
        console.log(COLORS.RED, error.stack);
        process.exit(1);
    }
}
