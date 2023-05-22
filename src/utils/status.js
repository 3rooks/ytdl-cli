import { CODE } from '#constants/code.js';
import { COLORS } from '#constants/colors.js';
import { STATUS } from '#constants/status.js';

const { RED, BLUE, GREEN, YELLOW } = COLORS;

export const status = ({ status, message }) => {
    if (status === STATUS.TITLE) {
        console.log(YELLOW, message);
        return CODE.OK;
    } else if (status === STATUS.INFO) {
        console.log('\n' + BLUE, message);
        return CODE.OK;
    } else if (status === STATUS.SUCCESS) {
        console.log('\n' + GREEN, message);
        return CODE.OK;
    } else if (status === STATUS.ERROR) {
        console.log('\n' + RED, message);
        return CODE.BAD;
    } else {
        return CODE.BAD;
    }
};
