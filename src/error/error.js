import { COLORS } from '#constants/colors.js';
import { STATUS } from '#constants/status.js';

const { BLUE, GREEN, RED } = COLORS;
const { INFO, ERROR, SUCCESS } = STATUS;

export class Status extends Error {
    constructor({ message, status }) {
        super(`${message} :|: ${status}`);
    }

    static catch(error) {
        const [message, status] = error.message.split(' :|: ');
        if (message && status) {
            if (status === SUCCESS) {
                console.log(GREEN, message);
                process.exit(0);
            }
            if (status === INFO) {
                console.log(BLUE, message);
            }
            if (status === ERROR) {
                console.log('\n');
                console.log(RED, message);
                process.exit(1);
            }
        } else throw new Error(message);
    }
}
